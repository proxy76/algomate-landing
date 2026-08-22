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

## 3.5 Maths and callout boxes

Opt in per post, in the frontmatter:

```yaml
math: true
```

**Off by default, deliberately.** Without the flag a `$` in ordinary prose is
just a dollar sign; with it, `$...$` starts parsing as LaTeX. Never add the
flag to a post that talks about prices.

### LaTeX

`$inline$` and `$$display$$`, rendered by KaTeX **at build time** — no maths
JavaScript ships, and the formulas are in the prerendered HTML, so they are
readable with JS disabled and by crawlers.

```markdown
Funcția $f(x) = 2x - 3$ este de gradul I.

$$
A(a) = \begin{pmatrix} 1 & a-1 \\ 3a-3 & 3a-2 \end{pmatrix}
$$
```

Useful for exam solutions: `\frac{a}{b}`, `\sqrt{x}`, `x^{2}`, `x_{1}`,
`\begin{pmatrix}...\end{pmatrix}` (`&` separates columns, `\\` separates
rows), `\int_0^1`, `\lim_{x \to 0}`, `\implies`, `\neq`, `\mathbb{R}`,
`\mathcal{M}`, `\cdot`.

Romanian decimals need `{,}` — write `1{,}2`, not `1,2`, or the comma gets
spaced as a list separator.

**A malformed formula fails the build** with the file and the offending LaTeX,
rather than shipping a red error into the page.

Two things that do not work inside `$...$`: unicode symbols with no maths
glyph (`✔`, emoji — KaTeX warns and drops them; put them in the prose
instead), and inline maths spanning a line break.

### Callout boxes

Four variants, styled distinctly. Content inside is normal markdown — lists,
bold and maths all work.

```markdown
:::solutie
Pașii rezolvării. $$2a - 3 - 5 = 4 \implies a = 6$$
:::

:::raspuns
$a = 6$
:::

:::atentie Procentul se aplică prețului vechi
Text opțional după numele casetei devine subtitlu.
:::

:::alternativa
Metoda scurtă, pentru cine o preferă.
:::
```

| Variant | Aliases | Reads as |
|---|---|---|
| `solutie` | `rezolvare` | Filled block — the worked solution |
| `raspuns` | — | Bright panel — the final answer, scannable |
| `atentie` | `greseala` | Amber caution — a mistake that costs points |
| `alternativa` | `metoda` | Quiet dashed aside — secondary method |

An unknown variant name fails the build rather than rendering an unstyled box.

### Why maths bypasses the sanitiser

KaTeX emits inline `style` attributes and a MathML tree, which the allow-list
in `build-content.mjs` strips by design. Rather than loosening it — `style` is
the last attribute you want to grant untrusted markdown — formulas are pulled
out before parsing, replaced with a nonce-tagged placeholder, and substituted
back **after** sanitisation. Author HTML is still sanitised exactly as
strictly as before; verified with `<script>`, `onerror=`, `javascript:` hrefs
and a `position:fixed` overlay, all stripped. **Do not "fix" this by adding
`style` to `allowedAttributes`.**

---

## 3.6 Code and problems in a post

Two rules for any post that teaches, added after the first informatics posts.
Both exist because the site's credibility rests on one named instructor with an
olympiad credential attached to every byline.

**Compile and run every snippet before publishing.** If the prose quotes what a
program outputs, that string must be the program's actual output, not what it
ought to be. `g++` is on the development machine:

```bash
g++ -std=c++14 -Wall -o /tmp/x snippet.cpp && /tmp/x
```

This is what `SERVER-SETUP.md` §7.2 requires of generated code; hand-written
code gets no exemption. A wrong solution published under Răzvan's name is the
worst failure this site can produce.

**Never present an invented problem as an official subject.** Solving a real
past paper is the strongest format there is — do that when you have the paper,
and say which session and variant it is. When the problems are your own, say so
in an `:::atentie` callout and link to
[subiecte.edu.ro](https://subiecte.edu.ro) for the official ones. See
`2026-08-21-recursivitate-bac-informatica.md` for the wording. Blurring the two
is a claim a reader cannot check and a competitor can disprove.

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
