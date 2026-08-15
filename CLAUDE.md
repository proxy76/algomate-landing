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
file sitting in the folder is not live, and a post dated in the future never
publishes unless a build runs on or after that date. `npm run content`
regenerates post data; `npm run build` does that plus the full static build.

Generated and gitignored — never commit these:
`frontend/src/content/posts.generated.ts`, `frontend/.generated-routes.json`,
`frontend/public/sitemap.xml`.

## Server and deployment

`docs/SERVER-SETUP.md` — current state, the mandatory daily rebuild (designed,
**not yet deployed**), and the design for the weekly mock-exam job (not built,
blocked on unknowns). It also records known issues that should be left alone
unless asked, including pre-existing npm advisories.

## Conventions

- Commit subjects are lowercase and prefixed: `feat:`, `fix:`, `copy:`,
  `content:`, `docs:`. Say what changed and why, not which files moved.
- Prose styles for articles are hand-written in `src/index.css`
  (`.prose-algomate`) rather than the Tailwind typography plugin. Extend that
  block instead of adding the plugin.
- Post HTML is rendered and **sanitised at build time** against an allow-list
  in `scripts/build-content.mjs`. It is injected with `dangerouslySetInnerHTML`
  downstream, so do not loosen the allow-list casually.
