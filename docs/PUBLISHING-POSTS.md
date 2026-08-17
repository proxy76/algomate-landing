# Publishing a blog post

Read this when Răzvan says some variant of *"I dropped an .md in the posts
folder, publish it."* It is the whole procedure — you should not need to
reverse-engineer the pipeline from the source.

Background on the build system and the server is in `SERVER-SETUP.md`. This
file is only about getting one post live.

---

## 0. The one thing to understand first

**Nothing about a post is read at runtime.** The markdown is compiled to HTML,
baked into a generated TypeScript file, and prerendered into static pages at
build time. Dropping a file into `frontend/content/posts/` changes *nothing*
on the live site until a build runs.

So "publish it" always means: validate → build → deploy. Never just "the file
is in the folder, it's live."

---

## 1. Find the file

Posts live in **`frontend/content/posts/*.md`** — flat, one level deep. The
scan is not recursive (`build-content.mjs`, `readdirSync` + `.endsWith('.md')`),
so a file in a subfolder is **silently invisible**. If Răzvan says he added a
post and the build reports fewer posts than expected, check for a subfolder
before anything else.

Naming convention: `YYYY-MM-DD-slug-in-kebab-case.md`. The date prefix is
stripped to form the URL slug, so `2026-08-07-admitere-liceu-2027.md` becomes
`/blog/admitere-liceu-2027`.

---

## 2. Check the frontmatter

Required — the build **exits 1** if any is missing, it does not skip the post:

```yaml
---
title: "Admitere la liceu 2027: ce se schimbă, de fapt"
description: "Standfirst. Also the meta description and the share-card text."
publishDate: 2026-08-07
category: "Examene"
---
```

Optional:

```yaml
tags:                        # stored; no tag pages exist yet
  - Admitere 2027
updatedDate: 2026-08-20      # renders an "Actualizat" line
slug: custom-slug            # overrides the filename-derived slug
draft: true                  # held back regardless of date
coverImage: /blog/name.jpg   # header image — see §3
coverAlt: "Ce se vede"       # omit if the image is decorative
```

Validate before building:

- `publishDate` must be `YYYY-MM-DD`. Unquoted YAML dates arrive as `Date`
  objects and are normalised; both forms work.
- `slug` must match `[a-z0-9-]+` — no diacritics, no uppercase. Romanian
  titles need transliteration: `ș→s`, `ț→t`, `ă/â→a`, `î→i`.
- `description` is the share-card text. If it is missing or weak, say so
  before publishing rather than after.

**A post goes live only when `draft` is not `true` AND `publishDate` is today
or earlier (UTC).** Held posts print `· holding "<slug>" (draft)` or
`(scheduled YYYY-MM-DD)` in the build log and produce no page.

**Never set a future `publishDate`.** Post scheduling was dropped as an idea
(SERVER-SETUP §3.1) and there is no recurring rebuild, so a future-dated post
does not publish late — it does not publish at all. Nothing on the server
watches the calendar; the date is only ever read during a build. If a post is
meant to go live, date it today or earlier. If you are handed one dated in the
future, say so rather than silently publishing it early.

---

## 3. Cover images

Optional header image, shown full-width above the article body. It is also the
`og:image` and the `image` in the post's JSON-LD, so it is what appears when
the post is shared on WhatsApp, Facebook or in a group chat.

**Files go in `frontend/public/blog/`.** Reference them root-relative:

```yaml
coverImage: /blog/admitere-2027.jpg
coverAlt: "Elevi în sală de clasă"
```

Rules the build enforces (it exits 1 on either):

- the path must start with `/` and resolve inside `public/`
- the file must actually exist on disk

This is deliberate — a typo would otherwise ship a broken masthead *and* break
every share card, and you would only find out from a preview.

Practical guidance:

- The image is rendered in a fixed **16:9** box with `object-cover`, so it will
  be cropped to that. Supply something at least **1600×900** and check the crop
  looks right — a face or text near the top or bottom edge will be cut.
- Under ~200 KB where possible. There is no image optimisation step; the file
  ships exactly as committed.
- `coverAlt` is optional on purpose. If the image only restates the headline it
  is decorative and an **empty alt is the correct markup** — do not invent
  filler alt text. Write alt only when the image carries information the text
  does not.
- Check the licence before committing anything Răzvan did not shoot or make.
  The site is commercial; a stock image with an unclear licence is a real
  liability, not a detail. If provenance is unclear, ask.

Inline images in the body (`![alt](/blog/foo.jpg)`) also work and are styled,
but get no size validation.

---

## 4. Build and check

```bash
cd frontend
npm run content     # fast: regenerates post data, sitemap, route list
```

Read the output. It tells you exactly what happened:

```
  ✓ 2 published post(s)
  · holding "titlu-nou" (scheduled 2026-09-01)
  ! "titlu-nou" contained HTML that was stripped — check the source
```

That `!` line matters. Rendered HTML is sanitised against an allow-list, so a
`<script>`, an `onerror=`, an iframe or an inline `style` in the markdown is
removed. If it fires, **open the source and find out why there was raw HTML in
it** — especially if the post was drafted with model assistance from a web
source. Do not wave it through.

Then look at the post in the browser:

```bash
npm run dev         # runs `npm run content` first
```

Check: the cover crop, headings, any tables, external links, and that the
reading-time estimate is not absurd. Then the full build:

```bash
npm run build       # content → tsc → vite build → prerender
```

Confirm the new route appears in the prerender log
(`Prerendering route: /blog/<slug>`) and that `dist/blog/<slug>/index.html`
contains the real article text — not an empty `<div id="root">`.

---

## 5. Commit

Generated artefacts are gitignored and must not be committed:
`src/content/posts.generated.ts`, `.generated-routes.json`,
`public/sitemap.xml`.

So a normal post commit contains only the markdown and any cover image:

```
frontend/content/posts/2026-09-01-titlu.md
frontend/public/blog/titlu.jpg
```

Write the commit message as `content:` and say what the post argues, not that a
file was added.

---

## 6. Deploy

**Deploys are manual. There is no timer** — post scheduling was dropped
(SERVER-SETUP §3.1). Pushing to `main` publishes nothing on its own; a build
must run on the server after the commit lands. Copying the markdown across is
not enough, because it is not read at runtime.

So publishing is always: commit → push → **build on the server**.

**Build with `deploy/rebuild.sh`. If it is not installed yet, install it before
you deploy** — steps in SERVER-SETUP §5.2, and check whether
`/srv/algomate/current` exists to tell.

This matters more than it looks. A plain `npm run build` on the server empties
`dist/` while nginx is serving that same directory, so anything fetching the
site mid-build gets an error. That is not hypothetical: it is what put a
*"Server error (5xx)"* notice in Search Console on 2026-08-17, from a single
deploy. `rebuild.sh` builds to a staging directory, refuses to publish output
that failed to prerender, and swaps a symlink in one rename — the live site is
never half-built, and rollback is another swap.

Afterwards, confirm the post is actually reachable:

```bash
node frontend/scripts/check-live-seo.mjs https://algomate.ro
```

---

## 7. Things that are not built

Do not promise these without implementing them: RSS, pagination, tag pages,
author pages, related-post logic beyond "the two most recent others", search,
comments, and maths rendering (no KaTeX — LaTeX in a post renders as literal
text).
