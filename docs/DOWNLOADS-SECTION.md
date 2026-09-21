# Downloads section (`/resurse`) — design and build record

**Written:** 2026-09-10 as a brief. **Built:** 2026-09-10.
**Status: in the repo, not yet deployed** — see §6, and note the one nginx
change that is still pending.

Read `SERVER-SETUP.md` §4.3.1–4.3.2 and the SEO invariants in `CLAUDE.md`
before changing anything here: this feature touches both nginx and the
prerenderer, which is where every production bug on this site has come from.

---

## 0. What you must not do

- **Do not add an SPA fallback** (`try_files $uri /index.html`) while editing
  nginx. That is what produced soft 404s on every unknown URL (§4.3.2).
- **Do not gzip the PDFs.** They are already compressed; gzipping spends CPU
  for ~0 bytes. The `laborator` server block records the same reasoning for
  its PNGs.
- **Do not add individual PDF URLs to `sitemap.xml`** without first reading
  §7.1 — it breaks the deploy regression test in a way whose error message
  points nowhere near the cause.
- **Do not hand-type file sizes into the UI.** They are generated (§4.2).
- Do not deploy by running `npm run build` against `frontend/dist/`. Use
  `/srv/algomate-deploy/bin/rebuild.sh` (`CLAUDE.md`).

---

## 1. The capacity question — already answered, do not re-investigate

The brief assumed 7 PDFs, ~2356 KB, ~50 simultaneous users; what shipped is
7 PDFs, 2520 KB (§3.5) — 8 PDFs and 3447 KB since 2026-09-19. **The server
handles this with enormous margin.**
Measured on the box on 2026-09-10:

| Measurement | Result |
|---|---|
| 50 concurrent fetches of a 418 KB asset through the live nginx | **0.72 s** wall clock total |
| Per-request `time_total` | median **3.6 ms**, max **15.9 ms** |
| nginx capacity | `worker_processes auto` (4) × `worker_connections 768` = **3072** concurrent |
| nginx worker RSS | ~5.5 MB each |
| `sendfile` | `on` — file bytes never pass through userspace |
| Disk free at the time | 1.9 GB of 15 GB (87% used) |
| Page cache in use | ~2.9 GB |

50 users pulling the whole corpus is ~126 MB of transfer, and the 2.5 MB of
files sits in page cache permanently after the first read.

**The bigger point: algomate.ro is behind a Cloudflare tunnel.** TLS terminates
at Cloudflare (`cloudflared.service`; nginx only listens on `127.0.0.1:8080`).
Cloudflare caches `.pdf` at the edge by default, so after the first request per
PoP the origin serves *nothing*. Concurrency is not a design constraint here
and no rate limiting, queueing, or streaming cleverness is warranted.

For scale precedent: `laborator.algomate.ro` already serves ~41 MB of exam PNGs
(~116 requests per set) off this same machine.

### 1.1 The one real resource note

Disk sits at **87–90% used, ~1.9 GB free**. This feature is not the cause and
barely moves it (§3.2), but the box runs `npm ci` + Playwright on every deploy
and that headroom is thin. If a build fails on space, reclaimable without
touching anything load-bearing: `/root/.npm` (342 MB), `/var/log/journal`
(246 MB), `/var/cache/apt` (110 MB). Ask before deleting.

---

## 2. How this site works — the constraints that shaped the design

1. **The site is fully prerendered, not server-rendered.** `npm run build`
   runs `build-content.mjs` → `vite build` → `prerender.js` (Playwright).
   Every route is a static `index.html` on disk.
2. **A route lives in three places.** `src/App.tsx` (the router),
   `STATIC_PAGES` in `scripts/build-content.mjs` (sitemap + the generated
   prerender list), and the nav arrays. Adding it to `App.tsx` alone means
   **it 404s in production**.
3. **`frontend/public/` is copied verbatim into `dist/`** by Vite. No hashing,
   no processing. Filenames stay exactly as written.
4. **Nothing on this server watches the calendar.** No timer, no recurring
   rebuild (`SERVER-SETUP.md` §3.1). A file in the repo is not live until
   someone runs the deploy script.

---

## 3. The design, as built

**Route:** `/resurse`. **Files:** served from `/descarcari/`.

### 3.1 Why the page and the files are in different directories

The page prerenders to `dist/resurse/index.html` and is served at `/resurse`
by the existing `try_files $uri $uri/index.html =404`. The PDFs need their own
nginx `location` block for cache headers. If the PDFs also lived under
`/resurse/`, that `location /resurse/ { ... }` prefix block would also match
`/resurse/` and interact with the page's directory-index resolution — nginx
prefix matching and `try_files` on a trailing-slash URI is exactly the kind of
subtlety that works in testing and breaks for a crawler.

Separate directories make the two rules incapable of shadowing each other.
Do not merge them to save a directory.

### 3.2 Where the PDFs live: in the repo

`frontend/public/descarcari/`. Not on a path outside the build.

The listing page is prerendered and its sizes come from the files themselves,
so **adding a PDF requires a build regardless**. Serving from outside the build
would split the source of truth in two and buy nothing at this size. The
atomic-deploy guarantee then covers the files too — a release either has both
the page and its PDFs, or neither.

Storage cost, honestly stated: `rebuild.sh` does `cp -a dist/` into a new
release and keeps `KEEP=5`, so 2.5 MB exists in the repo, in `dist/`, and in
each retained release — **~18 MB worst case**, about 1% of free disk.

Revisit only if the corpus reaches hundreds of MB, at which point the 5
retained releases become the argument for moving files out of the build.

**Git note:** binaries are stored whole, per revision, forever. One 2.5 MB
import is fine; re-committing edited PDFs under the same names repeatedly is
what would bloat `.git`. Second reason to version filenames (§3.4).

### 3.3 The manifest — `src/config/resources.ts`

Follows the `src/config/pricing.ts` precedent: one module is the source of
truth, and the page and any nav copy import from it. No `sizeLabel` field —
sizes are generated (§4.2).

The grouping field is `category`, not `exam`: the clasa a VII-a manual
follows a school-year syllabus rather than an exam, and filing it under an exam
heading would contradict its own cover. Adding a value means adding it in three
places — `ResourceCategory`, `CATEGORY_LABEL`, `CATEGORY_ORDER` — plus
`CATEGORIES` in the build guard, which rejects anything unknown.

`build-content.mjs` reads `RESOURCES` out of that file **as source text** and
evaluates the array literal, because a `.mjs` script cannot import a `.ts`
module. That is why the file documents the array as plain data: no imports, no
expressions, no `as const`, and the closing `];` at the start of a line. The
build fails with an explicit message if it cannot parse it.

### 3.4 Filenames

Descriptive, lowercase, hyphenated, no diacritics (those belong in `title`),
and **carrying a version**: `ghid-bac-m1-subiectul-1-v1.pdf`.

The reason is Cloudflare. Edge cache is keyed on URL. Replace a PDF's contents
under the same name and readers keep getting the old one until the TTL expires
or someone purges the cache by hand. A version bump makes the revision a new
URL and sidesteps the problem — the same discipline Vite applies to build
assets via content hashes. **Bumping `-v1` to `-v2` is the correct way to
publish a revised guide**, in the manifest and on disk together.

### 3.5 What actually shipped

Eight guides, all mathematics — the corpus contains no computer-science
material, so `subject: 'informatica'` exists in the type but is currently
unused.

The clasa a V-a manual was added on 2026-09-19 and brought the `clasa-5`
category with it (§3.3: `ResourceCategory`, `CATEGORY_LABEL`, `CATEGORY_ORDER`
and `CATEGORIES` in the build guard, all four).

It went to `-v2` the same day. `-v1` shipped and was served for about an
hour before Răzvan supplied a re-export of the same guide; the text is
identical page for page, only the PDF encoding differs. Because `-v1` had
already gone through the Cloudflare edge, reusing the name would have kept
serving the old bytes (§3.4, §7.2), so the file was bumped and `-v1` deleted
from the repo. **That is the worked example of the rule** — a re-export with
no content change still needs the bump once the old name has been served.

| slug | file | category | pages | size |
|---|---|---|---|---|
| `bac-m1-subiectul-1` | `ghid-bac-m1-subiectul-1-v1.pdf` | bacalaureat | 88 | 599 KB |
| `bac-m1-subiectul-2` | `ghid-bac-m1-subiectul-2-v1.pdf` | bacalaureat | 38 | 271 KB |
| `bac-m1-subiectul-3` | `ghid-bac-m1-subiectul-3-v1.pdf` | bacalaureat | 43 | 306 KB |
| `en8-subiectul-1` | `ghid-en8-matematica-subiectul-1-v1.pdf` | evaluare-nationala | 30 | 227 KB |
| `en8-subiectul-2` | `ghid-en8-matematica-subiectul-2-v1.pdf` | evaluare-nationala | 35 | 249 KB |
| `en8-subiectul-3` | `ghid-en8-matematica-subiectul-3-v1.pdf` | evaluare-nationala | 22 | 181 KB |
| `matematica-clasa-7` | `ghid-matematica-clasa-7-v1.pdf` | clasa-7 | 108 | 687 KB |
| `matematica-clasa-5` | `ghid-matematica-clasa-5-v2.pdf` | clasa-5 | 177 | 926 KB |

Titles and descriptions were written from each guide's own cover page and
table of contents, so they list the topics the file actually contains.

**Two things the owner decided, recorded so they are not re-litigated:**

- The BAC M1 Subiectul I source folder held two editions. The **88-page one**
  (6 itemi, dated 2026-09-10) shipped; the 61-page one (5 exerciții) is
  superseded and was left out.
- **Every guide carries the line "Material realizat pentru elevii algomate.ro.
  Distribuirea publică nu este permisă." on its cover.** Răzvan holds the
  rights and decided on 2026-09-10 to publish them ungated anyway; the notice
  is aimed at readers redistributing the files, not at him. Do not raise this
  again — reword it whenever the guides are next re-exported (which means a
  `-v2` filename, §3.4).

---

## 4. Implementation

### 4.1 Files created or touched

| File | Change |
|---|---|
| `frontend/public/descarcari/*.pdf` | the guides (7 at first; 8 since 2026-09-19) |
| `frontend/src/config/resources.ts` | **new** — the manifest (§3.3) |
| `frontend/src/pages/Resources.tsx` | **new** — the listing page |
| `frontend/src/App.tsx` | the `/resurse` route |
| `frontend/scripts/build-content.mjs` | `/resurse` in `STATIC_PAGES`; the sizes pass and the manifest guard (§4.2) |
| `frontend/src/components/Header.tsx` | `navLinks` — 6th entry, after Curriculum |
| `frontend/src/components/Footer.tsx` | the inline "Navigare" array |
| `frontend/.gitignore` | `src/content/resources.generated.ts` |
| `deploy/nginx/algomate.conf.example` | the `/descarcari/` block, marked PENDING |
| `/etc/nginx/sites-available/algomate` | **not yet applied** — §5 |

### 4.2 Sizes are generated, and the same pass is a build guard

`build-content.mjs` `stat()`s every file named in the manifest and writes
`src/content/resources.generated.ts` (gitignored, alongside
`posts.generated.ts`) mapping slug → byte size. The page formats that for
display, so a "599 KB" can never drift from what downloads.

The same pass enforces:

- a manifest entry whose file is missing → **the build fails**. Otherwise it
  ships as a link that 404s and nothing in the pipeline notices — precisely the
  "fails silently in a build" class `CLAUDE.md` warns about.
- a PDF in the directory but not in the manifest → a warning, since that is
  occasionally deliberate.
- malformed slugs, non-lowercase or non-`.pdf` filenames, unknown
  subject/exam values, duplicate slugs or files → the build fails.

Both directions were exercised on 2026-09-10 before the feature was wired up.

### 4.3 The page — prerender rules apply

`prerender.js` emulates `prefers-reduced-motion: reduce` and snapshots the DOM,
so:

- **Every entry is in the DOM on first paint.** No "load more", no list
  populated in `useEffect`.
- **There is no filter state.** The guides are grouped into static sections by
  category. A filter that unmounts non-matching cards would prerender only the
  default subset — six missing FAQ answers already shipped to production that
  exact way. If filtering is ever added: hide with CSS, never unmount.
- Title, description, canonical and robots come from the `SEO` component;
  breadcrumbs from `breadcrumbSchema`.
- Copy is Romanian, with diacritics. No price appears on the page; if one ever
  does, it imports from `src/config/pricing.ts`.
- **The jump bar is plain anchors.** Added 2026-09-21 along with the per-file
  panels. It is a `<nav>` of ordinary `<a href="#ghiduri-…">` links, so it
  works in the prerendered HTML with no JavaScript; the IntersectionObserver
  only decides which one is lit. Keep it that way — a bar that scrolls via
  `onClick` alone is dead in the snapshot and for anyone middle-clicking.
  Its `scroll-mt` clears the fixed header plus the bar itself, so changing
  either height means changing that value. See §7.5 for what makes it pin.

### 4.4 The two actions per guide

Each row offers both, spelled out — because the first version did not. It made
the whole row a single `download` anchor with a small "Descarcă" label in the
margin, and a reader could neither tell the rows were files nor look inside one
before committing to a download. An 88-page guide is a reading decision.

```tsx
<a href={href} download>Descarcă PDF</a>
<a href={href} target="_blank" rel="noopener">Citește în browser</a>
```

Same URL both times; the only difference is the `download` attribute, which is
what turns a preview into a save on a same-origin anchor.

Nothing about this is server-side, and that is the point: setting
`Content-Disposition: attachment` on the nginx block would force a save in
every context — including the preview link, and including a URL someone pastes
to a friend.

Both links carry an `aria-label` naming the guide. Fourteen links reading
"Descarcă PDF" / "Citește în browser" are indistinguishable in a screen
reader's link list otherwise.

---

## 5. nginx — STILL PENDING

Not applied as of 2026-09-10. The block is in
`deploy/nginx/algomate.conf.example`, marked `PENDING`. Add it to the
`algomate.ro` server block in `/etc/nginx/sites-available/algomate`, alongside
the existing locations:

```nginx
    # Downloadable PDFs. Filenames are versioned (docs/DOWNLOADS-SECTION.md
    # §3.4), so a week of caching is safe and a revision is a new URL rather
    # than a Cloudflare purge. A missing file must 404, never fall through.
    # No gzip: PDFs are already compressed.
    location /descarcari/ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=604800";
    }
```

Then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Without it the files still serve — `location /` and `try_files $uri` already
find them — but with no `Cache-Control`, so Cloudflare applies its own default
TTL instead of the intended week. Delete the `PENDING` comment from the example
config once it is live.

`client_max_body_size 1m` in that block is an **upload** limit and has no
bearing on downloads. Leave it alone.

---

## 6. Deploy and verify

```bash
sudo -u razvan /srv/algomate-deploy/bin/rebuild.sh
node frontend/scripts/check-live-seo.mjs https://algomate.ro
```

`check-live-seo.mjs` must exit 0. Its failures are real, not style opinions.

Then check what that script does not cover — it only knows about HTML:

```bash
# each PDF is a 200 with the right type, length and cache header
for f in frontend/public/descarcari/*.pdf; do
  curl -sI "https://algomate.ro/descarcari/$(basename "$f")" \
    | grep -Ei 'HTTP/|content-type|content-length|cache-control|cf-cache-status'
done

# a missing file 404s and does not fall back to the app shell
curl -s -o /dev/null -w '%{http_code}\n' https://algomate.ro/descarcari/nu-exista.pdf   # expect 404

# the page itself prerendered with every entry present, without JS.
# grep -c counts LINES, and the built HTML is one long line — count matches.
curl -s https://algomate.ro/resurse | grep -o 'descarcari/[a-z0-9.-]*' | sort -u | wc -l   # expect 8
```

That last check is the one that catches §4.3 mistakes. Run it.

Verified locally on 2026-09-10 against `dist/` after a full
`npm run build`: all seven links present in `dist/resurse/index.html`, sizes
and page counts rendered from the generated module, canonical `/resurse`, seven
files in `dist/descarcari/`, and no PDF URL in `sitemap.xml`.

---

## 7. Traps

### 7.1 Putting PDF URLs in the sitemap breaks the deploy check

`check-live-seo.mjs` fetches **every** `<loc>` in `sitemap.xml` and requires a
`<link rel="canonical">` in the response body. A PDF has no such tag, so every
PDF in the sitemap reports:

```
✗ /descarcari/foo.pdf 200 but no canonical
```

…and the script exits non-zero, gating the deploy on a failure that has
nothing to do with what it appears to say.

**Default, and what is in place: PDFs stay out of the sitemap.** The `/resurse`
page is in the sitemap and links all seven; that is sufficient for discovery.

If the PDFs themselves should rank later (they can — Google indexes PDFs, and
"formule bac matematica pdf" is a real query family), the checker needs a
content-type branch first: skip the canonical/robots/word-count assertions for
any URL whose `Content-Type` is not `text/html`, and assert `200` + a
non-trivial `Content-Length` instead. Do that change *before* adding the URLs,
not after the deploy fails.

### 7.2 Cloudflare serves a replaced file's old contents

Covered in §3.4. Version the filename. If a name must be reused, the fix is a
manual cache purge in the Cloudflare dashboard — a human task, not something an
agent can do from the box.

### 7.3 The route registered in only one place

`App.tsx` **and** `STATIC_PAGES` in `build-content.mjs`. One without the other
yields a route that works in `npm run dev` and 404s in production.

### 7.4 The prerender snapshot

Restating §4.3: if the page's content depends on a mount, an animation frame,
or a state-driven filter that unmounts, the deployed HTML is missing content
and the build still exits 0.

### 7.5 `overflow-x: hidden` silently kills the jump bar

`RootLayout.tsx` wraps the whole site and must use **`overflow-x-clip`, not
`overflow-x-hidden`**. Both contain a stray wide element, but `hidden` also
makes that div a scroll container, and `position: sticky` inside a scroll
container that never itself scrolls does nothing at all. The bar still
renders, still looks right at the top of the page, and simply never pins —
no error, no warning, nothing in the build output.

This is easy to reintroduce, because `overflow-x-hidden` is the reflex fix
for a horizontal scrollbar. If one ever appears, find the element that is too
wide; do not swap `clip` back to `hidden`.

The Hero's own sticky is unaffected either way: its nearest overflow ancestor
is its own `overflow-hidden` section, which is exactly the pin-then-release
range it wants.

---

## 8. Ideas raised, not decided

**Gate the downloads behind an email address (lead magnet).** The obvious
commercial upgrade — declined for now (§3.5). The honest cost, for whenever it
is revisited:

- The backend is one endpoint, `POST /api/contact/`, and `models.py` is
  **empty** — there is no ORM layer at all. This needs a model, a migration, a
  new endpoint, and rate limiting.
- It needs GDPR consent copy and an update to
  `/politica-de-confidentialitate`. Romanian audience, real obligation.
- It **forfeits the Cloudflare edge cache and the SEO value** — gated files
  cannot be indexed, and every download becomes an origin request.

Recommendation stands: **ungated first.** It is a fraction of the work, it is
the version that helps search, and it can be measured before deciding whether
a gate is worth those trade-offs. Revisit as a separate piece of work.

**A per-resource landing page** (`/resurse/ghid-bac-m1-subiectul-1`) with a
description, a preview image and the download link is how a PDF earns search
traffic without being indexed as a bare file — it sidesteps §7.1 entirely and
gives something to link to. Recorded in `docs/SEO.md`; build it only if the
backlog prioritises it.

**Track downloads.** There is no analytics on this site. Do not add a tracker
as a side effect of this feature.
