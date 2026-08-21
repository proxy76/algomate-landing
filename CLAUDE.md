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

## Deploying — atomic, one command

**`deploy/rebuild.sh` is installed** (since 2026-08-18, at
`/srv/algomate-deploy/bin/rebuild.sh`). nginx serves
`/srv/algomate-deploy/current`, a symlink that each deploy swaps in a single
rename, so no request ever observes a half-built site and a failed build never
goes live. Deploy as the site owner (`razvan`), then verify:

```bash
sudo -u razvan /srv/algomate-deploy/bin/rebuild.sh
node frontend/scripts/check-live-seo.mjs https://algomate.ro
```

That check script is the regression test for the whole indexing setup — it
probes production as Googlebot and exits non-zero on failure. **Run it after
any deploy or nginx change.** It has caught two production bugs already; the
failures it reports are real, not style opinions.

**`deploy/INSTALL.md` is a completed one-time install — do not re-run it.** Its
warning about ordering (nginx repointed only *after* the first successful run)
describes history, not a pending step. Keep it for its rollback section: a bad
deploy is undone by pointing the symlink at an earlier release, no rebuild.

Never deploy by running `npm run build` against `frontend/dist/`. That is the
in-place rebuild this replaced — it emptied `dist/` while nginx served that
same directory, and a crawler landing in the window on 2026-08-15 produced a
*"Server error (5xx)"* notice in Search Console on 2026-08-17.

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
