# AlgoMate — server setup and handoff brief

**Audience:** a Claude session running on Răzvan's personal Linux server, with
no prior context from the conversation that produced this file.

**Written:** 2026-08-07, from the `blog` branch.

Read this whole file before running anything.

---

## 0. Prerequisites — check these first

### 0.1 The work may not be on the remote yet

At the time this file was written, the local repo was **ahead of `origin`**:

- `main` was 3 commits ahead of `origin/main` (the landing page rebuild)
- `blog` was 2 further commits ahead, and existed **only locally**

If `git fetch --all && git branch -a` on the server does not show a `blog`
branch, Răzvan has not pushed yet. **Stop and tell him** — nothing below will
work against a stale checkout.

```bash
git fetch --all --prune
git log --oneline origin/main -3
git branch -a | grep blog || echo "blog branch NOT on remote — ask Răzvan to push"
```

### 0.2 What you must not do

- **Never print, echo, log, or commit the contents of any API key**, `.env`
  file, token, or deploy key. If you need to confirm a variable is set, test
  its length or that it is non-empty — never its value.
- **Do not run destructive commands** (`rm -rf`, `DROP`, `systemctl disable`
  on unrelated units, firewall changes) without asking first.
- **Do not push to `main`.** Anything you generate goes on a branch.
- **Do not publish content.** Generated posts stay `draft: true` until a human
  merges them. See §5.
- If a step needs root, say so and ask, rather than assuming sudo is fine.

---

## 1. What this project is

A landing site for **AlgoMate** — one-person tutoring in mathematics and
computer science for Romanian school exams (Bacalaureat and Evaluarea
Națională). Owner and sole instructor: **Răzvan Rădulescu**.

Repo: `github.com/proxy76/algomate-landing`

```
landing/
├── backend/               Django + DRF. One endpoint: POST /api/contact/
│   │                      (sends an email). models.py is EMPTY — no ORM layer.
│   └── core/views.py      rate-limited contact form handler
├── frontend/              Vite + React 19 + TypeScript + Tailwind v4
│   ├── content/posts/     ← blog posts as markdown. Source of truth.
│   ├── scripts/
│   │   └── build-content.mjs   the content compiler (see §6)
│   ├── prerender.js       Playwright-based static prerenderer
│   ├── src/
│   └── package.json
├── docs/SERVER-SETUP.md        this file
└── docs/PUBLISHING-POSTS.md    how to take one post live
```

The site is a **static build**. There is no server-side rendering. Everything
a visitor sees is prerendered HTML produced at build time.

---

## 2. Current state

### Done and committed

- Landing page rebuild (hero, programs, instructor section, guarantee bar,
  inline enrollment form, results, FAQ, CTA)
- **Blog system**: markdown in `frontend/content/posts/*.md`, compiled at build
  time to typed data + sitemap + prerender route list
- HTML sanitisation of rendered post content
- Optional per-post cover image (`coverImage`), also used as the share card
- One published post: `2026-08-07-admitere-liceu-2027.md`
- **Deployed and crawlable.** nginx serves the prerendered output directly;
  `frontend/scripts/check-live-seo.mjs` passes against production (see §4.3.1)

### Not built

- **No AI/LLM integration of any kind.** No SDK, no API calls, nothing.
- No recurring rebuild — so **scheduled posts do not publish** (see §3.1)
- No mock-exam generation
- No RSS, no pagination, no tag pages

### Known issues (do not fix unless asked)

- 8 high / 1 moderate npm advisories in **production** dependencies
  (`react-router`, `vite`, `rollup`, `axios`, `postcss`, others). Pre-existing.
  Upgrading carries breakage risk; it's a separate scheduled job.

---

## 3. Architecture decision, and why

### 3.1 Why a recurring rebuild is mandatory

A post publishes when **both** hold, evaluated **at build time**:

- frontmatter `draft` is not `true`
- frontmatter `publishDate` is today or earlier (UTC)

Because that check runs during the build and the output is static, a post
dated the 14th **does not appear on the 14th** — it appears the next time a
build runs on or after the 14th.

So scheduling only works if something rebuilds on a schedule. That is the
single most valuable thing to set up, and it is independent of anything to do
with AI or exams.

### 3.2 Why generation runs on this server, not in GitHub Actions

Răzvan has a separate project exposing a mock-exam API. If that API is on this
same machine or a private network, **a GitHub Actions runner cannot reach it**.
This server can. Generation therefore belongs here.

Secondary benefit: the Anthropic API key stays on this box and never enters
GitHub secrets.

### 3.3 Target layout

```
/srv/algomate/repo/            git clone
  └── frontend/  → npm run build → frontend/dist/
/srv/algomate/.env             secrets, chmod 600, owned by the service user
nginx or Caddy  → serves  /srv/algomate/repo/frontend/dist

systemd timer ①  algomate-rebuild.timer   daily ~03:00
    git pull → npm ci → npm run build
    Makes publishDate scheduling work.

systemd timer ②  algomate-exams.timer     weekly, Sun ~04:00   [NOT YET BUILT]
    call exam API → solve with Claude → write draft posts
    → push branch  exams/YYYY-Www   → human reviews and merges
```

**Use systemd timers, not crontab.** You get `journalctl -u <unit>`, proper
exit-status handling, and `systemctl list-timers`. Cron failures vanish into
an unread mail spool.

---

## 4. PART A — facts to gather

Run these and report the output. This is the main reason the file exists.

### 4.1 System

```bash
cat /etc/os-release
uname -m
node -v 2>/dev/null || echo "node: NOT INSTALLED"
npm -v  2>/dev/null || echo "npm: NOT INSTALLED"
git --version
free -h
df -h /
nproc
```

Node **20 or newer** is required by the current Vite. Report the version; do
not upgrade anything yet.

### 4.2 How code currently reaches the server

Determine and report which of these is true:

- a git clone on the box that gets `git pull`ed
- rsync/scp from Răzvan's laptop
- a CI push
- something else

```bash
ls -la /srv /var/www /opt 2>/dev/null | head -40
find / -maxdepth 5 -name "algomate*" -not -path "*/proc/*" 2>/dev/null | head
```

### 4.3 Web server and docroot

```bash
systemctl list-units --type=service --state=running | grep -Ei 'nginx|caddy|apache|httpd'
nginx -T 2>/dev/null | grep -E 'server_name|root|listen' | head -40
# or:
cat /etc/caddy/Caddyfile 2>/dev/null
```

Report: which server, the docroot for the site, and whether it points at a
`dist/` directory directly or at a copy.

### 4.3.1 RESOLVED 2026-08-15 — redirects leaked `http://…:8080`

**Fixed and verified in production. Kept because the failure is easy to
reintroduce**: any change that puts `$uri/` back into `try_files`, or that
removes `absolute_redirect off`, brings it straight back, and nothing about
the symptom points at the cause.

Originally measured on 2026-08-15. **Every URL in the sitemap except the
homepage** 301-redirected to a downgraded origin:

```
https://algomate.ro/blog                  301 → http://algomate.ro:8080/blog/
https://algomate.ro/blog/admitere-liceu-2027
                                          301 → http://algomate.ro:8080/blog/admitere-liceu-2027/
https://algomate.ro/servicii              301 → http://algomate.ro:8080/servicii/
…and so on for /curriculum, /inscriere, /termeni-si-conditii,
   /politica-de-confidentialitate
```

Note the two changes: **`https` → `http`**, and **port 8080 exposed**. The
site sits behind Cloudflare, which terminates TLS and forwards to nginx on
8080. nginx then builds its directory-index redirect from its *own* listening
scheme and port instead of the public origin, because `absolute_redirect` is
on by default.

**Why this matters more than it looks.** The page served at the 8080 URL
declares `<link rel="canonical" href="https://algomate.ro/blog/…">` — which
301s straight back to the 8080 URL. So Google sees a canonical that points at
a redirect, and a redirect that points at a non-canonical origin. That is a
textbook reason for pages to sit in Search Console as *"Page with redirect"*
or *"Duplicate, Google chose a different canonical"* and never get indexed. It
also means the `https://algomate.ro/` Search Console property will not report
on the URLs Google actually crawled, because a different scheme and port is a
different origin.

### 4.3.2 RESOLVED 2026-08-15 — unknown URLs returned 200, not 404

Fixed by the same change as 4.3.1. Kept for the same reason: re-adding an SPA
fallback is the obvious-looking thing to do to a React site, and it is wrong
here.

There was an SPA fallback in front of the static files, so **every unknown URL
served the homepage byte-for-byte with a 200**:

```
/nu-exista-deloc    200   77599 bytes — identical to /
/blog/slug-inventat 200   77599 bytes — identical to /
/wp-login.php       200   77599 bytes — identical to /
```

Google calls this a soft 404. Every mistyped link, every stale backlink, every
bot probing for `/wp-login.php` becomes a 200 that has to be crawled and then
discarded. The homepage canonical on those responses stops them being indexed
as duplicates, which is the one saving grace, but it still burns crawl budget
on a site that has a crawl budget to spare for actual articles.

The site is fully prerendered. It has no use for an SPA fallback at all — the
same `try_files … =404` below fixes this and the redirect together.

**The fix that was applied — serve the file directly, no redirect at all.**
The live `server` block now reads as below; `deploy/nginx/algomate.conf.example`
carries the full version reconciled against production. The one line that
caused both bugs was `try_files $uri $uri/ /index.html;`.

```nginx
server {
    listen 8080;
    server_name algomate.ro www.algomate.ro;
    root /srv/algomate/dist;          # adjust to the real docroot

    # Do not emit scheme/host/port in redirects; nginx is not the public origin.
    absolute_redirect off;
    port_in_redirect off;

    # /blog serves /blog/index.html as a 200 — no trailing-slash redirect, so
    # the served URL matches the canonical the page prints.
    location / {
        try_files $uri $uri.html $uri/index.html =404;
    }
}
```

`try_files … =404` is also what stops unknown URLs becoming soft 404s. Do
**not** use an SPA fallback (`try_files $uri /index.html`) — the site is fully
prerendered and does not need one, and it would make every mistyped URL return
200 with a blank page, which Google treats as a soft 404.

A fuller reference block, with notes on what must be preserved from the
existing config, is in **`deploy/nginx/algomate.conf.example`**. Read the
warning at the top of it: it was written from outside the box and does not
include the `/api/` proxy the enrollment form needs. Do not paste it over the
live config — apply the four directives to what is already there.

**Verify after reloading nginx:**

```bash
node frontend/scripts/check-live-seo.mjs https://algomate.ro
```

That script probes the live site as Googlebot and checks the things a build
cannot: that every sitemap URL is a direct 200 whose canonical matches, that
unknown URLs 404, that no redirect leaks a different scheme or port, and that
posts are indexable without JavaScript. It exits non-zero on failure, so it
can gate a deploy.

**Verified 2026-08-15: 0 failures**, checked independently from a second
machine. Before the fix it reported 16. Also confirmed by hand after the
reload, since `=404` is the kind of change that breaks things silently:
`/blog/` and other trailing-slash variants still return 200 (so any
already-indexed URL survives) and both variants declare the same canonical;
`/assets/*.js` and `.css`, `/favicon.svg`, `/og-image.png`,
`/instructor-razvan.jpg`, `/robots.txt` and `/sitemap.xml` all still 200.

Run this after any nginx or deploy change. Test the enrollment form by hand as
well — the script does not cover `/api/`.

### 4.4 Is the Django backend on this box?

The contact form posts to `${VITE_API_URL}/api/contact/`. If the backend isn't
running and reachable, **the enrollment form on the site is broken**.

```bash
systemctl list-units --type=service | grep -Ei 'gunicorn|uwsgi|django|algomate'
ss -tlnp | head -30
```

Report what's listening on what port, and what `VITE_API_URL` is set to for
the production build (check for a `.env` or `.env.production` in `frontend/` —
report the **variable names and whether they're set**, never the values).

### 4.5 The exam API

- Is it on this machine? What port / base URL?
- Reachable from this machine? Test with a request to a harmless endpoint.
- Is it behind auth? Report the **mechanism** only.

```bash
# adapt the URL once you've found it
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:PORT/health
```

### 4.6 Playwright feasibility

The prerender step drives headless Chromium. On a fresh Linux box this fails
on missing shared libraries. Check whether it can be installed:

```bash
# Does the box have the deps already?
ldconfig -p | grep -Ec 'libnss3|libatk|libcups|libdrm|libgbm' 
```

**Do not install yet** — report whether root is available and whether Răzvan
is happy for `npx playwright install --with-deps chromium` to run (it pulls
distro packages). Budget ~500 MB for `node_modules` + Chromium.

### 4.7 Git write access

The weekly exam job needs to **push a branch**. Ask Răzvan whether the server
may hold a deploy key with write scope.

```bash
ls -la ~/.ssh/ 2>/dev/null | grep -v 'authorized_keys'   # names only, never contents
ssh -T git@github.com 2>&1 | head -2
```

If write access is refused, the fallback is that the job writes files locally
and Răzvan pulls them off manually — worse workflow, no write key. Report his
preference.

### 4.8 Outbound network

Generation needs to reach `api.anthropic.com`.

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://api.anthropic.com/v1/models
```

401 or 403 is a **success** here — it means the box reached Anthropic and was
rejected for lack of a key. A timeout or DNS failure is the actual problem.

---

## 5. PART B — set up the daily rebuild

**Do this once §4.1–4.3 are answered and Răzvan approves.** It is useful on
its own, independent of exams or AI.

### 5.1 Build the site by hand first

Never automate a build you haven't run manually.

```bash
cd /srv/algomate/repo/frontend     # adjust to the real path
npm ci
npx playwright install --with-deps chromium   # once, needs root
npm run build
```

Expected output ends with:

```
  ✓ N published post(s)
  ✓ content built (N post(s), 8 static pages)
  ...
✅ Prerendering complete!
```

Then confirm the article HTML is genuinely static — this is the whole point of
the prerender step:

```bash
grep -c '<h2' dist/blog/admitere-liceu-2027/index.html   # expect > 0
grep -o '"@type":"BlogPosting"' dist/blog/admitere-liceu-2027/index.html
```

If both succeed, point the web server at `frontend/dist` and verify the site
loads before automating anything.

### 5.2 The rebuild script

`/srv/algomate/bin/rebuild.sh`, owned by the service user, `chmod 750`:

```bash
#!/usr/bin/env bash
# Daily rebuild. This is what makes scheduled posts publish: the publishDate
# gate is evaluated at build time, so a post dated today only appears once a
# build runs today.
set -euo pipefail

REPO=/srv/algomate/repo
BRANCH=main

cd "$REPO"
git fetch --prune origin
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

cd "$REPO/frontend"
npm ci --no-audit --no-fund
npm run build

echo "rebuild ok: $(date -Is)"
```

> `git reset --hard origin/main` discards local changes in the checkout. That
> is correct for a deploy target that should mirror the remote — but confirm
> with Răzvan that nobody edits files directly on the server first. If they
> do, use `git pull --ff-only` instead and let it fail loudly on divergence.

> **Superseded — use `deploy/rebuild.sh` from the repo instead.** The script
> above builds in place, and the note that follows was wrong.

The original note here said building in place was fine at this traffic level,
and that the tradeoff was only worth flagging. That reasoning was about human
visitors. It ignored the one client whose experience decides whether the site
gets indexed at all: **Googlebot crawls at any hour, and does not retry
politely.**

What actually happened, 2026-08-15: an in-place rebuild emptied `dist/` while
Vite repopulated it. `index.html` was briefly absent, and the nginx config at
the time ended `try_files` with `/index.html`, so nginx internally redirected
to a file that did not exist, looped, and returned **500**. Googlebot hit that
window, and on 2026-08-17 Search Console reported *"Server error (5xx)"* as a
reason pages were not being indexed.

The `=404` fix in §4.3.1 means that window now serves 404s rather than 500s.
That is less alarming and no less damaging — a 404 on the homepage, seen by a
crawler, gets pages dropped.

`deploy/rebuild.sh` fixes the cause rather than the symptom: it builds into
`/srv/algomate/releases/<stamp>/`, sanity-checks the output, and publishes by
replacing a symlink in a single rename. No request can observe a half-built
site, a failed build never goes live, and rollback is another symlink swap.

It requires one nginx change:

```nginx
root /srv/algomate/current;      # was /srv/algomate/frontend/dist
```

First install:

```bash
sudo -u <service-user> mkdir -p /srv/algomate/releases
sudo install -o <service-user> -g <service-user> -m 750 \
     /srv/algomate/repo/deploy/rebuild.sh /srv/algomate/bin/rebuild.sh
sudo -u <service-user> /srv/algomate/bin/rebuild.sh        # creates /srv/algomate/current
# only now point nginx at the symlink, then:
sudo nginx -t && sudo systemctl reload nginx
node /srv/algomate/repo/frontend/scripts/check-live-seo.mjs https://algomate.ro
```

### 5.3 The systemd units

`/etc/systemd/system/algomate-rebuild.service`:

```ini
[Unit]
Description=AlgoMate daily rebuild (publishes scheduled posts)
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=algomate
WorkingDirectory=/srv/algomate/repo
ExecStart=/srv/algomate/bin/rebuild.sh
TimeoutStartSec=1800

# Hardening — the build needs the repo and npm cache, nothing else.
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/srv/algomate
```

`/etc/systemd/system/algomate-rebuild.timer`:

```ini
[Unit]
Description=Run the AlgoMate rebuild daily

[Timer]
OnCalendar=*-*-* 03:00:00
RandomizedDelaySec=600
Persistent=true

[Install]
WantedBy=timers.target
```

`Persistent=true` matters: if the box was off at 03:00, the rebuild runs on
next boot rather than silently skipping a day — and a skipped day means a
scheduled post silently doesn't publish.

```bash
systemctl daemon-reload
systemctl enable --now algomate-rebuild.timer
systemctl list-timers algomate-rebuild.timer
systemctl start algomate-rebuild.service   # test it once, now
journalctl -u algomate-rebuild.service -n 50 --no-pager
```

### 5.4 Verify scheduling actually works

Prove it end to end rather than assuming:

1. Add a post to `frontend/content/posts/` dated **tomorrow**
2. `npm run content` → it should log `· holding "<slug>" (scheduled ...)`
3. Confirm it is absent from `/blog`
4. Temporarily set the date to today, rerun, confirm it appears
5. Revert

---

## 6. Reference — how the build pipeline works

```
content/posts/*.md
      │
      ▼  scripts/build-content.mjs   (npm run content)
      │
      ├─► src/content/posts.generated.ts   typed data for the app
      ├─► .generated-routes.json           route list for prerender.js
      └─► public/sitemap.xml               static pages + posts
                    │
                    ▼
      tsc -b → vite build → node prerender.js
                    │
                    ▼
      dist/**/index.html   fully-rendered static HTML
```

**All three generated files are gitignored.** A fresh clone has none of them,
which is why `npm run dev` and `npm run build` both run the generator first.
If you ever see TypeScript complain that `posts.generated` doesn't exist, run
`npm run content`.

### Scripts

| command | does |
|---|---|
| `npm run content` | regenerate from markdown only |
| `npm run dev` | content → vite dev server |
| `npm run build` | content → tsc → vite build → prerender |

### Frontmatter contract

```yaml
---
title: "..."             # required
description: "..."       # required — standfirst + meta description + index blurb
publishDate: 2026-08-14  # required, YYYY-MM-DD
category: "Examene"      # required
tags: [".."]             # optional → JSON-LD keywords
updatedDate: 2026-09-02  # optional → "Actualizat" + sitemap lastmod
slug: "custom-slug"      # optional, defaults to filename minus date prefix
draft: true              # optional — never publishes
coverImage: /blog/x.jpg  # optional header image; must exist under public/
coverAlt: "..."          # optional; omit when the image is decorative
---
```

Filename `YYYY-MM-DD-slug.md` → URL `/blog/slug`. The date prefix is stripped
from the URL; it exists so the directory sorts chronologically.

`coverImage` is rendered above the article body in a fixed 16:9 box, and is
also used as the post's `og:image` and JSON-LD `image`. The path must be
root-relative and the file must exist under `public/` — both are checked at
build time, because a typo would break the share card as well as the page.

**The full publishing procedure is `PUBLISHING-POSTS.md`.** Follow it when the
task is "publish this post" rather than "understand the pipeline".

**Malformed frontmatter fails the build.** That is deliberate — a bad post
stops the deploy instead of publishing broken. It also means a bad generated
post will break the nightly rebuild, so the exam job must validate before it
commits.

### Sanitisation

Rendered HTML is injected via `dangerouslySetInnerHTML`, and `marked` passes
inline HTML through. `build-content.mjs` therefore runs `sanitize-html` over
the output with an allow-list. Scripts, event handlers, `javascript:` URLs and
inline styles are stripped; the build logs a warning naming any file that
contained one.

**This is load-bearing for AI-generated content.** A model that reads an
untrusted source page can be prompt-injected into emitting markup. Do not
remove or loosen the sanitiser.

### Trailing slashes

Prerendered output is `dist/blog/<slug>/index.html`, so servers serve it at
`/blog/<slug>/` **with a trailing slash**, while the SPA router uses
`/blog/<slug>`. Any path matching must tolerate both. `RootLayout.tsx` already
does — see the `isArticle` check.

---

## 7. PART C — the weekly mock-exam job (NOT YET BUILT)

Do not start this until Part A is answered. Recorded here so the design isn't
lost.

### 7.1 Intended behaviour

Weekly, on this server:

1. Call Răzvan's exam API → generate **3 mock exams**
2. Solve each with Claude (`claude-opus-5`, effort `high`)
3. For informatics: **compile and run** generated C++ against the API's test
   cases before trusting it
4. Write each as `content/posts/*.md` with `draft: true`
5. Render a printable PDF from the article page using the **already-installed
   Playwright** (`page.pdf()`) — no new dependency, and the PDF cannot drift
   from the web page because it is generated from it
6. Commit to a branch `exams/YYYY-Www`, push
7. Răzvan reviews the diff and merges; timer ① publishes it

### 7.2 Decisions already made

- **HTML page is the primary artifact, PDF is a download.** A PDF alone is
  poorly indexed, carries no internal links, and converts nobody. The exam
  lives at a real URL; `frontend/public/simulari/<date>-<slug>.pdf` is the
  printable companion.
- **Never auto-publish.** A wrong solution under Răzvan's name — with his
  olympiad credential attached — is the worst failure this system can produce.
  Volume publishing without review is also the exact pattern Google's June 2026
  scaled-content-abuse enforcement targeted.
- **Model:** `claude-opus-5`. Do not downgrade to save cost; correctness is the
  product. Estimated ~$5–15/month at 3 exams/week.
- **Key handling:** `ANTHROPIC_API_KEY` read from `/srv/algomate/.env`
  (chmod 600). Never in the repo, never in a systemd unit file, never echoed.

### 7.3 Still unknown — blocks implementation

From the exam API side (Răzvan is asking that project's maintainer):

1. Base URL, auth mechanism, reachability from this box
2. Endpoint paths, parameters, allowed values
3. **A real sample response**, verbatim
4. Whether it returns the barem / correct answers, and **test cases** for
   informatics problems
5. **Format of mathematical notation** — LaTeX, plain text, Unicode, images?
   The site currently has **no maths rendering at all**. Real notation means
   adding KaTeX, which is a meaningful chunk of work.
6. **Provenance of the problems** — original, official past papers from
   `subiecte.edu.ro`, or scraped from a copyrighted collection? These are
   being published on a commercial site, so this must be settled before a
   single page goes live.

---

## 8. How to report back

Produce one message containing:

1. **§4 answers**, as a plain list — command output is fine
2. **What you changed**, if anything, with file paths
3. **What you did not do and why** — especially anything you stopped to ask about
4. **Anything surprising** about the box that the plan above got wrong

Repeat, because it matters: **no secret values in that report.** Variable names
and set/unset status only.

If you set up the rebuild timer, include:

```bash
systemctl list-timers algomate-rebuild.timer --no-pager
journalctl -u algomate-rebuild.service -n 30 --no-pager
```

---

## 9. Quick reference

```bash
# Build the site
cd /srv/algomate/repo/frontend && npm run build

# Regenerate content only (fast — after editing markdown)
npm run content

# Rebuild now, outside the schedule
systemctl start algomate-rebuild.service

# Did last night's rebuild work?
journalctl -u algomate-rebuild.service --since yesterday --no-pager

# When does it next run?
systemctl list-timers algomate-rebuild.timer
```
