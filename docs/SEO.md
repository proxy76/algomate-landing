# SEO — strategy and backlog

**Audience:** an agent session with a checkout of `github.com/proxy76/algomate-landing`
and no prior conversation context.

**Written:** 2026-08-21, from an audit of `main` plus a live crawl of
`https://algomate.ro`. Phase 0 and most of Phase 1 were applied the same day —
see the status markers in §3.

This is the counterpart to `docs/SERVER-SETUP.md` (infrastructure) and
`docs/PUBLISHING-POSTS.md` (content mechanics): this file is *strategy plus a
task backlog*, and it assumes you have read both of those first.

---

## 0. Read this before planning anything

Three files constrain everything below. Read them in this order:

1. `CLAUDE.md` — project conventions, commit prefixes, the sanitiser rule.
2. `docs/SERVER-SETUP.md` — current server state, nginx, the two indexing bugs
   in §4.3.1–4.3.2, and the decisions in §3.1 that are not up for revisiting.
3. `docs/PUBLISHING-POSTS.md` — the frontmatter contract and what "publish"
   actually requires.

**The single most important mechanical fact:** the site is a static prerender.
`npm run content` regenerates post data, routes and sitemap; `npm run build`
does that plus the full static build. **Pushing to `main` publishes nothing.**
A build must run on the server.

**The verification gate for every change:**

```bash
node frontend/scripts/check-live-seo.mjs https://algomate.ro
```

It probes production as Googlebot and exits non-zero on failure. Run it after
every deploy and every nginx change. Failures it reports are real.

---

## 1. Business and search context

One-person tutoring business. Sole instructor: Răzvan Rădulescu. Online
sessions, Bucharest-based. Subjects: mathematics and computer science for
Bacalaureat and Evaluarea Națională. Site copy is **Romanian, with diacritics**.

### 1.1 The stated goal, and the honest read on it

The owner's goal is page-one Google results for head terms like
`meditații matematică`, `meditații BAC matematică`, `profesor matematică`.

**Do not plan work around winning those terms in the short term.** A live SERP
check on 2026-08-21 shows page one for those queries is occupied almost
entirely by aggregators and long-established centres:

- Aggregators/marketplaces: `meditatii.ro`, `superprof.com.ro`,
  `buki-meditatii.ro`, `anunturi-meditatii.ro`, `cautmeditator.ro`,
  `publi24.ro`, `olx.ro`, `starofservice.ro`
- Established centres: `centrulunirea.ro`, `academiademate.ro`,
  `centralacademy.ro`, `intelectica.ro`, `matematiciana.ro`,
  `meditatii-orice.ro`, `centruldemeditatiialgorithm.ro`

These have thousands of programmatically generated city/subject/level pages and
years of accumulated links. AlgoMate has 8 routes and, as of this audit, **no
discoverable inbound links from any third-party domain** — a search for the bare
domain string surfaces unrelated companies of the same name and no mention of
the tutoring site. The site is also new enough that it has almost no crawl
history.

**Therefore:** the winnable ground is (a) low-competition subject niches,
(b) long-tail exam-intent queries, (c) the local pack. Head terms are a
by-product of winning those first, not a starting target.

### 1.2 Where this site can actually win

Ordered by expected time-to-result:

| Tier | Query shape | Why winnable |
|---|---|---|
| 1 | `meditații informatică BAC`, `pregătire BAC informatică C++`, `subiecte informatică BAC rezolvate` | Far thinner competition than maths. The instructor's differentiator (national informatics olympiad results, UPB, working programmer) is strongest here. |
| 2 | `rezolvare subiect BAC matematică M2`, `variante Evaluare Națională rezolvate`, `programa BAC matematică 2027`, `cum se calculează media la BAC` | Long-tail exam intent. Aggregator profile pages cannot serve this; worked solutions can. One such post already exists and is the correct template. |
| 3 | `meditații matematică București`, `meditații matematică online` | Won through Google Business Profile + reviews + a dedicated landing page, not through body copy. |
| 4 | Head terms | Downstream of tiers 1–3. Not a task. |

---

## 2. Verified state — what already exists, do not rebuild it

This section exists so you do not waste a session re-implementing things.
Everything here was confirmed by reading the code on 2026-08-21.

### 2.1 Already done and working

- **Per-page meta.** `frontend/src/components/SEO.tsx` uses React 19 native
  metadata hoisting: `<title>`, description, canonical, `og:*`, `twitter:*`,
  and a robots meta that already includes
  `max-image-preview:large, max-snippet:-1`. It supports `noindex` and accepts
  one or many JSON-LD objects. This component is good. Extend it, don't replace
  it, and don't add react-helmet.
- **Structured data** in `frontend/src/seo/structuredData.ts`:
  `EducationalOrganization`, `Person` (Răzvan), three `Course` objects with
  `offers`, two distinct `FAQPage` objects (homepage vs `/servicii` —
  deliberately different questions), `LocalBusiness`, and a `breadcrumbSchema()`
  helper. Wiring:
  - `pages/Home.tsx` → organization + person + faq + localBusiness
  - `pages/Services.tsx` → the three courses + servicesFaq + breadcrumb
  - `pages/Curriculum.tsx`, `pages/Blog.tsx`, `pages/Signup.tsx` → breadcrumb
  - `pages/BlogPost.tsx` → an inline `articleSchema` + breadcrumb
- **Pricing has one source of truth**: `frontend/src/config/pricing.ts`. Visible
  copy, meta descriptions and JSON-LD all import from it — see §5.
- **robots.txt** (`frontend/public/robots.txt`) allows crawling and declares the
  sitemap. Correct.
- **Sitemap + prerender route list** are generated by
  `frontend/scripts/build-content.mjs` from a `STATIC_PAGES` array plus
  published posts, with `lastmod`/`changefreq`/`priority`, and noindex pages
  excluded from the sitemap.
- **Atomic deploys**, installed 2026-08-18. nginx serves a `current` symlink; a
  deploy is never observable half-done. This replaced the in-place rebuild that
  caused the 5xx window and the Search Console notice of 2026-08-17.
- **No SPA fallback** in nginx — unknown URLs 404 rather than soft-404. This is
  deliberate; `check-live-seo.mjs` asserts it. Do not add
  `try_files $uri /index.html`.
- **A worked-solution blog post exists** and is the right content template:
  `frontend/content/posts/2026-08-20-rezolvare-subiect-mate-bac-m2-august.md`
  (explicit `slug`, `math: true`, tags including `Subiecte rezolvate`).

### 2.2 Deliberately not built — do not build these

From `docs/SERVER-SETUP.md` §2–3.1:

- No post scheduling, no recurring rebuild. **Never set a `publishDate` in the
  future** — there is no timer, so a future date means the post never appears.
- No RSS, no pagination, no tag pages.
- No AI/LLM integration.
- The npm advisories (8 high / 1 moderate) are known and are a separate
  scheduled job. Leave them alone unless explicitly asked.

### 2.3 Production is in sync with `main` — verified 2026-08-21

An earlier revision of this brief claimed production was behind `main`, on the
strength of a price discrepancy (150 in the repo vs 120 live) and the
2026-08-20 post being absent from `/blog`. **Both claims were wrong.** Checked
against the live site as Googlebot on 2026-08-21:

- `https://algomate.ro/` serves `100 RON` and `150 RON`, matching the repo.
  There is no 120 anywhere on the live site.
- `/blog` lists all three posts, and
  `https://algomate.ro/blog/rezolvare-subiect-mate-bac-m2-august-2026` is live
  and in the sitemap. Note the slug: the post sets an explicit `slug:` in
  frontmatter that ends `-2026`, so it does not match the filename.

The lesson worth keeping: **check the live HTML before concluding production is
stale**, and remember that an explicit `slug:` overrides the filename.

---

## 3. Defects

Each has a file, a cause, and an acceptance criterion. Verified by reading the
source, not inferred.

### D-1 (P0) — the prerendered `<h1>` contained a half-typed word — FIXED 2026-08-21

**File:** `frontend/src/components/Hero.tsx`

The `<h1>` embeds `{currentText}`, driven by a typewriter effect over
`WORDS = ["Excelență.", "Succes.", "Viitor.", "10 la BAC."]`. `currentText`
started as `""` and typed at 90 ms/char after a 1000 ms delay, while
`frontend/prerender.js` serialises at an arbitrary later moment. Production
shipped:

> `Meditații de matematică și informatică. Pregătește-te pentru Excele|`

— trailing cursor pipe included. That string was the page's only `<h1>`.

**Why the obvious fix is not enough.** Seeding `currentText` with `WORDS[0]`
alone only moves the arbitrary frame: prerender scrolls the whole page (~2 s on
the homepage) and then waits another 2 s, by which time the cycle has deleted
the first word and is mid-way through typing the second. Lengthening or
shortening either wait just trades one race for another.

**What was done instead** — make the snapshot deterministic rather than lucky:

1. `currentText` is seeded with `WORDS[0]`, so the first painted frame is
   already a complete phrase.
2. The typewriter does not start at all under `prefers-reduced-motion: reduce`,
   which is correct behaviour for that setting on its own merits.
3. `prerender.js` calls `page.emulateMedia({ reducedMotion: 'reduce' })`, so
   every snapshot is taken with the animation opted out. Framer Motion's default
   `reducedMotion: "never"` means the scroll-reveal animations still run and the
   existing prerender flow is unaffected.
4. The caret is a bar element (`aria-hidden`, background colour, no glyph)
   rather than a `|` character, so it is not in the heading's text content.

**Acceptance (met):** the `<h1>` in `dist/index.html` extracts to
`Meditații de matematică și informatică. Pregătește-te pentru Excelență.` — a
complete sentence, no `|`.

**If you add another text animation, apply the same contract:** render the
finished state under reduced motion. The prerenderer relies on it.

### D-2 (P0) — six of seven FAQ answers were absent from the DOM — FIXED 2026-08-21

**File:** `frontend/src/components/FAQ.tsx`

`FAQItem` rendered its answer inside `<AnimatePresence>{isOpen && (...)}`, and
`openIndex` defaults to `0` — so the prerendered HTML contained **one** answer
while `faqSchema` declared **seven** Q&A pairs. Google's FAQ policy accepts
content behind an expander but not content missing from the HTML.

Fixed by always mounting the answer panel and animating `height` (with
`overflow-hidden`) instead of mounting and unmounting, plus `aria-controls`,
`role="region"` and `aria-labelledby` on the pair.

**Acceptance (met):** all seven answer strings appear verbatim in
`dist/index.html`; collapsed panels serialise as `height: 0px`. Still worth
confirming in Google's Rich Results Test after the next deploy.

### D-3 (P1) — no single source of truth for pricing — FIXED 2026-08-21

The numbers agreed across the repo and production, but they were typed out in
nine places across `FAQ.tsx`, `structuredData.ts`, `Services.tsx`, `Home.tsx`
and `Signup.tsx` — including inside meta descriptions and inside `Offer.price`.
Nothing forced the next price change to reach all of them, and
`structuredData.ts` carries its own warning that schema disagreeing with the
page is a manual-action risk.

`frontend/src/config/pricing.ts` now holds `PRICE_GROUP`, `PRICE_INDIVIDUAL`,
`GROUP_MAX_STUDENTS` and the shared answer strings. Everything else imports it.

**Acceptance (met):** built HTML for `/`, `/servicii` and `/inscriere` contains
only `100 RON` / `150 RON`, and `/servicii` JSON-LD contains only
`"price":"100"` / `"price":"150"`.

**To change a price:** edit `config/pricing.ts` only, rebuild, and confirm with
a grep of `dist/` that no stray number survives.

### D-4 (P1) — `LocalBusiness` is too thin to earn local results — BLOCKED

`localBusinessSchema` has `name`, `url`, `email`, `priceRange`,
`addressLocality: 'București'` and `areaServed: Romania`. It has **no
`telephone`**, no street address, no `openingHours`, no `geo`, and
`organizationSchema.sameAs` is an empty array.

The live site likewise exposes no phone number and no address beyond
"București, România" in the footer — the only contact channel is a
Cloudflare-obfuscated email link.

Local ranking leans on NAP consistency (name / address / phone) between the
site, the Google Business Profile, and third-party directories. With no P and no
A, there is nothing to be consistent with.

**Blocked on the owner**, and deliberately left undone: a phone number and a
service address are facts, not code decisions, and inventing either would be
worse than the gap. Ask for (a) a public phone number, (b) whether an address
should be published at all for an online-only business, (c) the profile URLs
from §6 once they exist.

**Acceptance:** a real phone number rendered as visible text and in `telephone`;
`sameAs` populated once profiles exist; `areaServed` narrowed to București +
online.

### D-5 (P2) — no page targets any commercial keyword — OPEN

`App.tsx` defines exactly 8 routes: `/`, `/servicii`, `/curriculum`,
`/inscriere`, `/blog`, `/blog/:slug`, `/multumim`, `/termeni-si-conditii`,
`/politica-de-confidentialitate`.

`/servicii` covers three programmes at once under the title *"Servicii Meditații
BAC — Informatică C++, Matematică M1/M2/M3"*. No URL is dedicated to a single
query. There is no `/meditatii-matematica-bucuresti`-shaped page anywhere.

**Acceptance:** the four landing pages in Phase 2 exist, are in `STATIC_PAGES`,
appear in the sitemap, prerender to >1000 chars of text, and pass
`check-live-seo.mjs`.

### Observed, not yet triaged — `/curriculum` renders one course at a time

`Curriculum.tsx` keeps the active course in `useState`, so the prerendered page
contains the syllabus for `mate-bac` only; the other programmes' content is not
in the HTML. This is the same class of problem as D-2 and the page is a
plausible ranking target for `programa BAC informatică`. Not in the original
audit and not fixed — measure the size of the missing text before deciding.

### Non-defect — do not "fix" this

The HTML comment in `frontend/index.html` explaining that meta tags are handled
by the `<SEO />` component is **correct and harmless**. Some text extractors
surface comment text, which can make it look like leaked content in a scrape. It
is inside `<head>` and invisible to renderers. Leave it.

---

## 4. Task backlog

Phases are ordered by dependency. Do not start a later phase to avoid an earlier
one.

### Phase 0 — restore truth — DONE 2026-08-21

- **T-0.1** ✅ `CLAUDE.md` records atomic deploys as installed (commit
  `636faf4`) and now points at this file.
- **T-0.2** ✅ No deploy gap existed — see §2.3. Nothing to reconcile.
- **T-0.3** ⏳ Confirm Search Console state: sitemap submitted and readable, the
  2026-08-17 5xx notice cleared, and each of the 8 routes returns *Indexed* on
  URL inspection. **Requires the owner's Search Console access — an agent cannot
  do it.**

### Phase 1 — fix what is actively broken

- **T-1.1** ✅ D-1, the `<h1>`.
- **T-1.2** ✅ D-2, FAQ answers in the DOM.
- **T-1.3** ✅ D-3, single source of truth for pricing.
- **T-1.4** ⛔ D-4, phone + address in copy and schema; `sameAs` scaffolding.
  Blocked on the owner.
- **T-1.5** ✅ `BreadcrumbList` JSON-LD on `/servicii`, `/curriculum`,
  `/inscriere`, `/blog` and post pages.

Everything ticked above is **built and verified against `dist/`, not deployed.**
A build must run on the server before any of it is live.

### Phase 2 — landing pages (D-5)

Create four routes. Each one needs its own `<h1>`, ≥800 words of non-duplicated
Romanian copy, its own FAQ block (distinct questions per page — duplicated
`FAQPage` across pages is a duplicate signal, as `structuredData.ts` already
notes), an internal link to `/inscriere`, and a `Course` or `Service` schema.

| Route | Primary target | Notes |
|---|---|---|
| `/meditatii-informatica-bac` | `meditații informatică BAC`, `pregătire BAC informatică C++` | **Build this first.** Thinnest competition, strongest credibility. |
| `/meditatii-matematica-bucuresti` | `meditații matematică București` | Pairs with the Google Business Profile. |
| `/meditatii-matematica-online` | `meditații matematică online` | Distinct angle from the București page — do not spin the same text. |
| `/meditatii-evaluare-nationala-matematica` | `meditații Evaluare Națională matematică` | Different audience (parents of 8th-graders); adjust tone. |

**Mechanical requirement:** adding a route means adding it to `STATIC_PAGES` in
`frontend/scripts/build-content.mjs`, or it will be missing from both the
sitemap and the prerender route list, and will 404 in production. This is the
easiest thing to forget in this codebase.

### Phase 3 — content engine

Two posts per week. Use the 2026-08-20 worked-solution post as the template —
that format (full official exam problem, solved step by step, alternative
methods, common point-losing mistakes) is exactly what the aggregators cannot
produce.

Priority order, matching §1.2:

1. Solved informatics BAC problems, C++ (the tier-1 opening)
2. Solved maths BAC subjects, per profile M1/M2/M3, per session
3. Evaluare Națională solved variants
4. Explainers: exam calendar, grade calculation, syllabus changes, M1-vs-M2
   choice, what a first tutoring session looks like

Every post: real `description`, correct `category`, `math: true` where formulas
appear, explicit `slug` for long titles, tags reused rather than invented, and
**never a future `publishDate`**.

Internal linking is the cheapest untapped lever here: every solved-problem post
should link to the relevant Phase-2 landing page, and each landing page should
link to its three most relevant posts.

### Phase 4 — off-site (mostly human tasks, see §6)

---

## 5. Guardrails — invariants an agent must not break

- Never add an nginx SPA fallback. It produced soft 404s on every unknown URL.
- Never set `publishDate` in the future.
- Never commit the generated files: `src/content/posts.generated.ts`,
  `.generated-routes.json`, `public/sitemap.xml`.
- Do not loosen the HTML sanitiser allow-list in `scripts/build-content.mjs`
  casually — its output is injected with `dangerouslySetInnerHTML`.
- Extend `.prose-algomate` in `src/index.css` rather than adding the Tailwind
  typography plugin.
- Keep JSON-LD and visible page copy in agreement. Always. **Prices come from
  `src/config/pricing.ts` — never type a price into a component, a meta
  description or a schema object.**
- **Never render text that only exists while an animation is running.** The
  prerenderer emulates `prefers-reduced-motion: reduce`; a component that
  animates text must render its finished state under that setting (D-1).
- **Never gate content behind a mount.** Collapsed, tabbed or accordion content
  must be in the DOM and hidden with CSS, or it is absent from the static HTML
  and from Google's view of the page (D-2).
- Don't invent credentials, results or reviews in copy or schema. The site
  already claims 100% pass rate, 34 prize-winners and a 9.8 average alongside
  "2 years of experience"; do not amplify unverifiable claims, and never add
  `aggregateRating` without real, attributable reviews — fake review markup is a
  manual-action risk, not a growth tactic.
- Commit prefixes: `feat:`, `fix:`, `copy:`, `content:`, `docs:`. Lowercase
  subjects. Say what changed and why.
- Run `check-live-seo.mjs` after every deploy. Do not mark a task done on the
  strength of a local build.

---

## 6. Human-only tasks — an agent cannot do these, so surface them

These matter more than most of the code work, and none of them are in the repo:

1. **Google Business Profile.** Does not exist. This is the fastest realistic
   route to a page-one placement for `meditații matematică București`, via the
   local pack. Requires the owner to create and verify it.
2. **Reviews.** Zero anywhere. Ask past students for Google reviews. For a
   one-person tutoring business, this outweighs on-page work.
3. **Profiles on the aggregators that currently outrank the site** —
   `meditatii.ro`, `superprof.com.ro`, `buki-meditatii.ro`, `olx.ro`,
   `publi24.ro`, `anunturi-meditatii.ro` — each linking back to algomate.ro.
   This is both lead generation and the site's first inbound links. Once live,
   add the URLs to `organizationSchema.sameAs`.
4. **Search Console** access for T-0.3 and for ongoing monitoring.
5. **A phone number** (D-4) — nothing local can be built without one.
6. **Paid search.** SEO will not produce enrolments this session. If the owner
   needs students now, Google Ads on the exam-intent terms is the parallel track
   while content matures.

---

## 7. Definition of done, per change

1. `npm run content && npm run build` succeeds locally.
2. The acceptance criterion in §3 for the defect is met, verified by grepping
   built HTML — not by reading the JSX.
3. Deployed via `rebuild.sh`.
4. `node frontend/scripts/check-live-seo.mjs https://algomate.ro` exits zero.
5. For anything touching JSON-LD: Google Rich Results Test passes on the
   affected URL.
6. Commit follows the prefix convention; docs updated if behaviour changed.
