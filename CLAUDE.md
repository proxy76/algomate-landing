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

`docs/SERVER-SETUP.md` — current state, the nginx config and the two indexing
bugs it fixed, and `deploy/rebuild.sh`, which publishes atomically instead of
rebuilding in place (**written, not yet installed**). Post scheduling and the
daily timer were **dropped by decision** — do not set them up. The weekly
mock-exam job is designed but not built and blocked on unknowns. The doc also
records known issues to leave alone unless asked, including pre-existing npm
advisories.

## Conventions

- Commit subjects are lowercase and prefixed: `feat:`, `fix:`, `copy:`,
  `content:`, `docs:`. Say what changed and why, not which files moved.
- Prose styles for articles are hand-written in `src/index.css`
  (`.prose-algomate`) rather than the Tailwind typography plugin. Extend that
  block instead of adding the plugin.
- Post HTML is rendered and **sanitised at build time** against an allow-list
  in `scripts/build-content.mjs`. It is injected with `dangerouslySetInnerHTML`
  downstream, so do not loosen the allow-list casually.
