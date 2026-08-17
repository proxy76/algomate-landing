# AlgoMate — landing site

One-person tutoring business: maths and computer science for Romanian school
exams (Bacalaureat, Evaluarea Națională). Owner and sole instructor: Răzvan
Rădulescu. Site copy is in **Romanian** — match it, including diacritics.

```
backend/     Django + DRF. One endpoint: POST /api/contact/ (sends an email).
frontend/    Vite + React 19 + TypeScript + Tailwind v4. Static build,
             prerendered with Playwright. No SSR.
docs/        Runbooks — read these before improvising.
```

## ⚠ Outstanding — do this BEFORE the next build on the server

**`deploy/rebuild.sh` is written but not installed.** Until it is, every deploy
rebuilds in place: `npm run build` empties `frontend/dist/` while nginx is
serving that same directory, so anything fetching the site mid-build gets an
error. A crawler that lands in that window can get pages dropped from Google.

This is not hypothetical. It happened on 2026-08-15 and put a *"Server error
(5xx)"* notice in Search Console on 2026-08-17. The nginx `=404` change made
the window serve 404s instead of 500s — quieter, not fixed.

If you are about to build or deploy on the server, install it first. Two steps,
both in `docs/SERVER-SETUP.md` §5.2:

1. install `deploy/rebuild.sh` at `/srv/algomate/bin/rebuild.sh` and run it
   once — this creates `/srv/algomate/current`
2. point nginx at the symlink: `root /srv/algomate/current;` (currently
   `/srv/algomate/frontend/dist`), then `nginx -t && systemctl reload nginx`

Afterwards, deploys are `rebuild.sh` and nothing else. Verify any deploy with:

```bash
node frontend/scripts/check-live-seo.mjs https://algomate.ro
```

That script is the regression test for the whole indexing setup — it probes
production as Googlebot and exits non-zero on failure. **Run it after any
deploy or nginx change.** It has caught two production bugs already; the
failures it reports are real, not style opinions.

## Publishing a blog post

**If asked to publish a post that was dropped into `frontend/content/posts/`,
read `docs/PUBLISHING-POSTS.md` first and follow it.** It covers the
frontmatter contract, cover images, the sanitiser warning, and what "publish"
actually requires.

The one thing to internalise: posts are compiled at **build time**. A markdown
file sitting in the folder is not live, and pushing to `main` does not publish
it — a build must run on the server. `npm run content` regenerates post data;
`npm run build` does that plus the full static build.

**Never date a post in the future.** Scheduling was dropped and there is no
recurring rebuild, so a future `publishDate` means the post never appears at
all rather than appearing later.

Generated and gitignored — never commit these:
`frontend/src/content/posts.generated.ts`, `frontend/.generated-routes.json`,
`frontend/public/sitemap.xml`.

## Server and deployment

`docs/SERVER-SETUP.md` is the reference: current state, the live nginx config,
and §4.3.1–4.3.2 on the two indexing bugs it fixed. **Read those two sections
before touching nginx** — both are easy to reintroduce, and neither symptom
points anywhere near its cause. In particular, do not add an SPA fallback
(`try_files $uri /index.html`); the site is fully prerendered and that is what
produced soft 404s on every unknown URL.

Post scheduling and the daily timer were **dropped by decision** (§3.1) — do
not set them up, and never date a post in the future. The weekly mock-exam job
is designed but not built and blocked on unknowns. The doc also records known
issues to leave alone unless asked, including pre-existing npm advisories.

## Conventions

- Commit subjects are lowercase and prefixed: `feat:`, `fix:`, `copy:`,
  `content:`, `docs:`. Say what changed and why, not which files moved.
- Prose styles for articles are hand-written in `src/index.css`
  (`.prose-algomate`) rather than the Tailwind typography plugin. Extend that
  block instead of adding the plugin.
- Post HTML is rendered and **sanitised at build time** against an allow-list
  in `scripts/build-content.mjs`. It is injected with `dangerouslySetInnerHTML`
  downstream, so do not loosen the allow-list casually.
