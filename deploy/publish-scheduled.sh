#!/usr/bin/env bash
#
# Publish whatever has come due — run every morning by algomate-publish.timer.
#
# Install a COPY at /srv/algomate-deploy/bin/publish-scheduled.sh, beside
# rebuild.sh and for the same reason: this script runs `git reset --hard`,
# which would rewrite it mid-execution if it ran from inside the checkout.
#
# WHAT IT DOES
#
# Posts publish at build time: a post dated the 18th exists only once a build
# runs on or after the 18th (SERVER-SETUP §3.1). So every morning this script
#
#   1. brings the checkout to origin/main — refusing if anyone has work in it,
#   2. runs `npm run content`, which lists every route that should exist today,
#   3. compares that with what the live release actually contains,
#   4. and only if something is missing runs rebuild.sh, then the live SEO
#      check, then pings IndexNow with the new URLs.
#
# Most mornings step 3 finds nothing and the script exits without building.
# On the morning a post comes due it deploys exactly once. If the box was off,
# Persistent=true on the timer runs it at boot, and step 3 still catches the
# post — it compares state, not dates, so a missed morning cannot lose a post.
#
# WHY IT REFUSES ON A DIRTY OR AHEAD CHECKOUT
#
# /srv/algomate is also where changes get made by hand. rebuild.sh resets it
# to origin/main, so running unattended over uncommitted edits or unpushed
# commits would silently discard them at 05:00. Failing loudly costs one
# morning's delay; the alternative costs the work.

set -euo pipefail

REPO="${REPO:-/srv/algomate}"
BRANCH="${BRANCH:-main}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/srv/algomate-deploy}"
CURRENT="$DEPLOY_ROOT/current"
REBUILD="${REBUILD:-$DEPLOY_ROOT/bin/rebuild.sh}"
SITE="${SITE:-https://algomate.ro}"

log() { echo "[$(date -Is)] $*"; }
die() { echo "[$(date -Is)] FATAL: $*" >&2; exit 1; }

[ -x "$REBUILD" ] || die "$REBUILD missing or not executable"
[ -L "$CURRENT" ] || die "$CURRENT is not a symlink — has rebuild.sh ever run?"

cd "$REPO"

# ── Guard the checkout ──────────────────────────────────────────────────────
# Generated files are gitignored, so `npm run content` below cannot trip this.
if [ -n "$(git status --porcelain)" ]; then
    git status --short >&2
    die "uncommitted changes in $REPO — not publishing over them. Commit and push, or stash."
fi

git fetch --prune origin

ahead=$(git rev-list --count "origin/$BRANCH..$BRANCH")
if [ "$ahead" -gt 0 ]; then
    die "$BRANCH is $ahead commit(s) ahead of origin/$BRANCH — push first. rebuild.sh would reset them away."
fi

git checkout -q "$BRANCH"
git reset -q --hard "origin/$BRANCH"

# ── What should be live today ───────────────────────────────────────────────
cd "$REPO/frontend"
npm run -s content >/dev/null

missing=()
while IFS= read -r route; do
    if [ "$route" = "/" ]; then f="$CURRENT/index.html"; else f="$CURRENT${route}/index.html"; fi
    [ -s "$f" ] || missing+=("$route")
done < <(node -e 'for (const r of require("./.generated-routes.json")) console.log(r)')

if [ ${#missing[@]} -eq 0 ]; then
    log "nothing due — live release already has every route"
    exit 0
fi

log "due: ${missing[*]}"

# ── Publish ─────────────────────────────────────────────────────────────────
"$REBUILD"

node "$REPO/frontend/scripts/check-live-seo.mjs" "$SITE"

# IndexNow reaches Bing (which ChatGPT search and Copilot read from), Yandex,
# Seznam and others. A failure here is logged, not fatal: the post is live and
# the sitemap will be crawled regardless.
urls=()
for r in "${missing[@]}"; do urls+=("$SITE$r"); done
node "$REPO/frontend/scripts/indexnow.mjs" "$SITE/blog" "${urls[@]}" \
    || log "warning: IndexNow ping failed — the sitemap will still be crawled"

log "published: ${missing[*]}"
