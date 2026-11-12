#!/usr/bin/env bash
#
# Deploy script for algomate.ro — pull, build, publish atomically.
#
# Install a COPY at /srv/algomate-deploy/bin/rebuild.sh — outside the checkout.
# Running it from inside the repo is unsafe: bash reads a script incrementally,
# and `git reset --hard` below rewrites the file mid-execution.
#
# Run by hand for every deploy, and by publish-scheduled.sh on the mornings a
# scheduled post comes due (SERVER-SETUP §3.1). The value here is atomic
# publishing, which matters on a manual deploy just as much.
#
# WHY THE SYMLINK DANCE
#
# The obvious version of this script builds straight into the directory nginx
# serves. That has a window — `vite build` empties dist/ before repopulating it,
# and prerendering nine routes through Playwright keeps it empty-ish for tens of
# seconds. Anything fetching the site in that window gets an error.
#
# That is not theoretical. On 2026-08-15 an in-place rebuild produced exactly
# this, and because the nginx config at the time ended `try_files` with
# `/index.html`, a missing index.html made nginx internally redirect to itself
# until it gave up with a 500. Googlebot hit it and Search Console raised
# "Server error (5xx)" as a reason pages were not being indexed.
#
# The current config ends in `=404`, so the same window would now serve 404s
# instead of 500s. That is less alarming and no less damaging: a 404 on the
# homepage, seen by a crawler, can get pages dropped from the index.
#
# So: build somewhere else, verify, then swap a symlink. The swap is a single
# rename — no request can observe a half-published site. In-flight requests
# finish against the old release, which is why old releases are kept for a
# while rather than deleted immediately.
#
# REQUIRES nginx to serve the symlink, not the build directory:
#     root /srv/algomate-deploy/current;
# (was: root /srv/algomate/frontend/dist)
#
# PATHS: the defaults below are inferred from the live nginx `root`, which was
# /srv/algomate/frontend/dist — so the checkout is /srv/algomate. They are not
# confirmed. Every one is overridable from the environment, and the preflight
# below refuses to run rather than guessing:
#
#     REPO=/actual/path /srv/algomate/bin/rebuild.sh
#
# Releases live OUTSIDE the checkout on purpose. Putting them inside it puts
# build output in the path of `git reset --hard` and `git clean`.

set -euo pipefail

REPO="${REPO:-/srv/algomate}"
BRANCH="${BRANCH:-main}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/srv/algomate-deploy}"
RELEASES="$DEPLOY_ROOT/releases"
CURRENT="$DEPLOY_ROOT/current"
KEEP="${KEEP:-5}"
# How long a superseded /assets/ file stays downloadable — see "Carry" below.
ASSET_GRACE_DAYS="${ASSET_GRACE_DAYS:-14}"

log()  { echo "[$(date -Is)] $*"; }
die()  { echo "[$(date -Is)] FATAL: $*" >&2; exit 1; }

# ── Preflight ───────────────────────────────────────────────────────────────
# Fail with a specific, actionable message rather than half-deploying. Each
# check names what to do about it.

[ -d "$REPO" ] || die "REPO=$REPO does not exist.
  Find the checkout with:  sudo find /srv /var/www /opt -maxdepth 3 -name package.json -path '*frontend*'
  Then re-run as:          REPO=/the/real/path $0"

git -C "$REPO" rev-parse --git-dir >/dev/null 2>&1 \
  || die "REPO=$REPO is not a git checkout. See the hint above."

[ -f "$REPO/frontend/package.json" ] || die \
  "No frontend/package.json under REPO=$REPO — wrong directory."

command -v npm >/dev/null || die "npm not on PATH for user $(id -un).
  Systemd and cron do not load a login shell; use an absolute path or set PATH."

mkdir -p "$RELEASES" 2>/dev/null \
  || die "Cannot create $RELEASES as $(id -un). Create it and chown to this user."

[ -w "$DEPLOY_ROOT" ] || die "$DEPLOY_ROOT is not writable by $(id -un)."

log "repo=$REPO  branch=$BRANCH  deploy_root=$DEPLOY_ROOT"

# ── Source ──────────────────────────────────────────────────────────────────
cd "$REPO"
git fetch --prune origin
git checkout "$BRANCH"
# Mirrors the remote exactly. If anyone edits files directly on this box, swap
# for `git pull --ff-only` so divergence fails loudly instead of being erased.
git reset --hard "origin/$BRANCH"

# ── Build ───────────────────────────────────────────────────────────────────
cd "$REPO/frontend"
npm ci --no-audit --no-fund
npm run build

# ── Stage ───────────────────────────────────────────────────────────────────
STAMP=$(date -u +%Y%m%d-%H%M%S)
NEW="$RELEASES/$STAMP"
mkdir -p "$RELEASES"
cp -a "$REPO/frontend/dist" "$NEW"

# ── Carry the outgoing release's assets forward ─────────────────────────────
# Everything under /assets/ has a content hash in its name, and every page is
# split into chunks that are fetched as the visitor navigates (router.tsx). The
# symlink swap below is atomic for a *request*, but a *visit* spans many
# requests: a tab opened before the swap holds HTML that names the old
# chunks, and will ask for them after it. Without this block those requests
# 404 — a stylesheet that fails to load, or a link that does nothing — for
# anyone on the site at 05:00 on a publishing morning, and for any crawler
# midway through rendering a page.
#
# So files the new build did not produce are copied over from the release
# being replaced. Names cannot collide (same name = same bytes). `cp -p`
# keeps each file's original mtime, which is what ages it out: once a file
# has not been part of a build for ASSET_GRACE_DAYS it stops being carried,
# so the directory does not grow without bound.
if [ -d "$CURRENT/assets" ] && [ -d "$NEW/assets" ]; then
    carried=0
    while IFS= read -r -d '' old; do
        dest="$NEW/assets/$(basename "$old")"
        if [ ! -e "$dest" ]; then
            cp -p "$old" "$dest"
            carried=$((carried + 1))
        fi
    done < <(find -L "$CURRENT/assets" -maxdepth 1 -type f -mtime "-$ASSET_GRACE_DAYS" -print0)
    log "carried $carried asset(s) forward from the outgoing release"
fi

# ── Verify before publishing ────────────────────────────────────────────────
# A build can fail in ways that still exit 0 — a prerender step that silently
# produced nothing, a content script that emitted an empty sitemap. Refuse to
# publish rather than take the site down.
for f in index.html robots.txt sitemap.xml blog/index.html 404.html; do
    if [ ! -s "$NEW/$f" ]; then
        log "FATAL: $f missing or empty in the new build — not switching"
        rm -rf "$NEW"
        exit 1
    fi
done

# The homepage must contain real prerendered text, not just the SPA shell.
if ! grep -q 'rel="canonical"' "$NEW/index.html"; then
    log "FATAL: index.html has no canonical — prerendering did not run"
    rm -rf "$NEW"
    exit 1
fi

# Every script and stylesheet the homepage names must be in the release. A
# page whose CSS 404s still "builds", and still passes the checks above.
missing_asset=0
while IFS= read -r asset; do
    if [ ! -s "$NEW$asset" ]; then
        log "FATAL: index.html references $asset, which is not in the build"
        missing_asset=1
    fi
done < <(grep -oE '(src|href)="/assets/[^"]+"' "$NEW/index.html" | sed -E 's/^(src|href)="//; s/"$//' | sort -u)
if [ "$missing_asset" -ne 0 ]; then
    rm -rf "$NEW"
    exit 1
fi

# ── Publish atomically ──────────────────────────────────────────────────────
# ln -sfn writes a new symlink beside the live one; mv -T replaces it in a
# single rename. There is no instant at which $CURRENT does not resolve.
ln -sfn "$NEW" "$CURRENT.tmp"
mv -Tf "$CURRENT.tmp" "$CURRENT"
log "published $STAMP"

# ── Prune ───────────────────────────────────────────────────────────────────
# Keep recent releases: in-flight requests may still be reading the previous
# one, and a rollback is then just another symlink swap.
if [ -d "$RELEASES" ]; then
    # shellcheck disable=SC2012
    ls -1dt "$RELEASES"/*/ 2>/dev/null | tail -n +$((KEEP + 1)) | while read -r old; do
        log "pruning $old"
        rm -rf "$old"
    done
fi

log "rebuild ok"

# ── Rollback ────────────────────────────────────────────────────────────────
# To go back to a previous release — no rebuild, no nginx reload, the symlink
# is resolved per request:
#
#     ls -1dt /srv/algomate-deploy/releases/*/          # pick one
#     ln -sfn /srv/algomate-deploy/releases/<stamp> /srv/algomate-deploy/current.tmp
#     mv -Tf  /srv/algomate-deploy/current.tmp        /srv/algomate-deploy/current
#
# Then confirm:
#     node /srv/algomate/frontend/scripts/check-live-seo.mjs https://algomate.ro
