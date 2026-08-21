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

**Therefore:** the winnable ground is (a) low-competition subject niches and
(b) long-tail exam-intent queries. The local pack, which an earlier revision
listed third, is not available at all — see §1.3. Head terms are a by-product of
winning the first two, not a starting target.

### 1.2 Where this site can actually win

Ordered by expected time-to-result:

| Tier | Query shape | Why winnable |
|---|---|---|
| 1 | `meditații informatică BAC`, `pregătire BAC informatică C++`, `subiecte informatică BAC rezolvate` | Far thinner competition than maths. The instructor's differentiator (national informatics olympiad results, UPB, working programmer) is strongest here. |
| 2 | `rezolvare subiect BAC matematică M2`, `variante Evaluare Națională rezolvate`, `programa BAC matematică 2027`, `cum se calculează media la BAC` | Long-tail exam intent. Aggregator profile pages cannot serve this; worked solutions can. One such post already exists and is the correct template. |
| 3 | `meditații matematică online`, `meditații Evaluare Națională matematică` | Format and audience intent. Won with a dedicated page, which now exists for both. |
| 4 | `meditații matematică București` | **Organic only — the local pack is not available.** See §1.3. Worth a page, but do not expect the map results. |
| 5 | Head terms | Downstream of tiers 1–3. Not a task. |

### 1.3 There is no Google Business Profile, and there cannot be

**Confirmed by the owner, 2026-08-21.** AlgoMate teaches exclusively online and
never meets students in person. Google Business Profile requires a business to
have either a physical location customers can visit or in-person contact at the
customer's address; an online-only service is not eligible. So:

- **The local pack is out of reach.** Earlier revisions of this file called a
  Business Profile "the fastest realistic route to a page one placement" for
  `meditații matematică București`. That route does not exist. The city query is
  now tier 4 and is an ordinary organic ranking problem, competing against
  aggregators for the results *below* the map — which is harder, not easier.
- **Google reviews are out too**, since they attach to a profile. Any review
  strategy has to run on third-party platforms instead (§6).
- **Do not "solve" this by inventing an address.** Listing a home address to
  obtain a profile is a suspension risk and would put a false address in the
  site's schema, which is the opposite of what NAP consistency is for.

What survives from the local angle: the instructor is in București, the students
largely are, and `/meditatii-matematica-bucuresti` says so honestly while being
explicit that sessions are online. That page targets the organic result. It is
not a substitute for the pack and should not be measured as one.

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
  `EducationalOrganization`, `Person` (Răzvan), `LocalBusiness`, `Course`
  objects for `/servicii` and one per landing page, a `Service` for the
  București page, two hand-written `FAQPage` objects (homepage and `/servicii`),
  plus `faqPageSchema()` and `breadcrumbSchema()` helpers. Wiring:
  - `pages/Home.tsx` → organization + person + faq + localBusiness
  - `pages/Services.tsx` → the three courses + servicesFaq + breadcrumb
  - the four landing pages → their own Course/Service + `faqPageSchema(FAQS)` +
    breadcrumb
  - `pages/Curriculum.tsx`, `pages/Blog.tsx`, `pages/Signup.tsx` → breadcrumb
  - `pages/BlogPost.tsx` → an inline `articleSchema` + breadcrumb
- **Pricing and contact details have one source of truth**:
  `frontend/src/config/pricing.ts` and `frontend/src/config/contact.ts`. Visible
  copy, meta descriptions and JSON-LD all import from them — see §5.
- **Four single-query landing pages** (`/meditatii-informatica-bac`,
  `/meditatii-matematica-bucuresti`, `/meditatii-matematica-online`,
  `/meditatii-evaluare-nationala-matematica`), linked site-wide from the
  footer's "Meditații" column.
- **`FaqList` and `SectionLabel`** in `src/components/` — the FAQ block exists
  once, on `<details>`, which is what keeps every answer in the document.
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

### D-4 (P1) — `LocalBusiness` was too thin to earn local results — PARTLY FIXED 2026-08-21

`localBusinessSchema` had `name`, `url`, `email`, `priceRange`,
`addressLocality: 'București'` and `areaServed: Romania` — **no `telephone`**,
no street address, no `openingHours`, no `geo`, and an empty
`organizationSchema.sameAs`. The live site exposed no phone number either.

The reasoning at the time: local ranking leans on NAP consistency (name /
address / phone) between the site, the Business Profile and third-party
directories, and with no P and no A there was nothing to be consistent with.
Half of that premise has since collapsed — there is no Business Profile and
cannot be (§1.3) — but the phone still has to match the aggregator listings in
§6, which are now the only external presence.

**Done:** the owner's number, `0774 933 578`, now renders as text in the footer
(a `tel:` href alone does not count as the visible NAP) and appears as
`telephone` on `LocalBusiness`, `EducationalOrganization` and `Person`, from
`src/config/contact.ts`. `areaServed` leads with the city.

**Re-scoped by §1.3.** This defect was written on the assumption that a Google
Business Profile would exist and that the schema had to match it. It will not.
The phone number is still worth having — it is a conversion path and the NAP for
the aggregator listings in §6 — but nothing here is going to produce a map
result. Do not invest further in local markup expecting one.

**Still open, and deliberately so:**

- `sameAs` is still empty — populate it as the profiles in §6 go live, and only
  with profiles that demonstrably belong to this business.
- No street address and no `openingHours`. There is no premises and no published
  hours. Adding an address to look more local would be false in the schema and,
  if used to chase a profile, a suspension risk.
- `localBusinessSchema` keeps its `LocalBusiness` type. Structured data is not a
  business listing, and the type still communicates geography and price range
  usefully. `OnlineBusiness` would be more literally accurate but has almost no
  consumer support. Revisit only if something concrete depends on it.

### D-5 (P2) — no page targets any commercial keyword — FIXED 2026-08-21

All four landing pages are built. Each has its own `<h1>`, 950–1400 words, three
to five `<h2>`s, six FAQs shared with no other page, a page-specific `Course` or
`Service`, a breadcrumb, and a link to `/inscriere`. The footer links all four
site-wide; `/servicii` links to the informatics page; the two maths pages link
to each other.

Measured after the build, not assumed: 5% eight-gram overlap between the
București and online pages, and no FAQ question appearing on two pages.

The original defect, for context:

`App.tsx` defines exactly 8 routes: `/`, `/servicii`, `/curriculum`,
`/inscriere`, `/blog`, `/blog/:slug`, `/multumim`, `/termeni-si-conditii`,
`/politica-de-confidentialitate`.

`/servicii` covers three programmes at once under the title *"Servicii Meditații
BAC — Informatică C++, Matematică M1/M2/M3"*. No URL is dedicated to a single
query. There is no `/meditatii-matematica-bucuresti`-shaped page anywhere.

**Acceptance:** the four landing pages in Phase 2 exist, are in `STATIC_PAGES`,
appear in the sitemap, prerender to >1000 chars of text, and pass
`check-live-seo.mjs`.

### D-6 (P1) — `/curriculum` rendered one course at a time — FIXED 2026-08-21

Not in the original audit. `Curriculum.tsx` kept the active course in `useState`
and mounted only that one, so the prerendered page carried the maths syllabus
and nothing else — every informatics chapter title (recursivitate, backtracking,
grafuri, structuri de date) was absent from the HTML, on a page that is a
plausible target for `programa BAC informatică`. Same class of problem as D-2.

All three roadmaps now render as `role="tabpanel"` and the inactive two are
hidden with CSS. The `AnimatePresence` wrapper that remounted the active course
is gone, so the roadmap no longer cross-fades on switch; the scroll reveals
inside it still run, which was verified by driving the built page in a browser
rather than assumed — an IntersectionObserver does fire once a hidden panel gets
layout.

**Acceptance (met):** `dist/curriculum/index.html` contains chapter titles from
all three programmes.

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
- **T-1.4** ◑ D-4, phone published in copy and schema. `sameAs` still empty and
  no address — see D-4.
- **T-1.5** ✅ `BreadcrumbList` JSON-LD on `/servicii`, `/curriculum`,
  `/inscriere`, `/blog` and post pages.
- **T-1.6** ✅ D-6, all three syllabuses in `/curriculum`.

Everything ticked above is **built and verified against `dist/`, not deployed.**
A build must run on the server before any of it is live.

### Phase 2 — landing pages (D-5) — DONE 2026-08-21

All four routes exist, are in `STATIC_PAGES`, and pass the acceptance criteria
in D-5.

| Route | Primary target | Angle it argues |
|---|---|---|
| `/meditatii-informatica-bac` | `meditații informatică BAC`, `pregătire BAC informatică C++` | The subject. What the paper asks, chapters in order of marks earned. |
| `/meditatii-matematica-online` | `meditații matematică online` | The format. What the two hours contain, and who it does not suit. |
| `/meditatii-evaluare-nationala-matematica` | `meditații Evaluare Națională matematică` | The audience. Parents of eighth-graders; where marks are actually lost. |
| `/meditatii-matematica-bucuresti` | `meditații matematică București` | The place. Organic only — no local pack, see §1.3. |

**If a fifth page is ever added, copy the pattern:**

- Q&A defined once as `FAQS` and passed to `faqPageSchema(FAQS)`, so the schema
  cannot claim an answer the page does not render. Render it with `<FaqList>`.
- A page-specific `Course` or `Service` in `structuredData.ts` carrying `url`,
  rather than re-emitting an existing object on a second URL.
- Claims about the exam kept to what has been stable for years, with a pointer
  to edu.ro for the rest. The syllabus changes by ministerial order; copy that
  quotes a point breakdown goes stale silently.
- An angle no existing page already argues. If a paragraph would read the same
  on two pages, it belongs on neither — that is the failure mode that makes
  Google pick one of them and drop the other.
- Links in both directions, plus an entry in the footer's "Meditații" column.

**Mechanical requirement:** adding a route means adding it to `STATIC_PAGES` in
`frontend/scripts/build-content.mjs`, or it will be missing from both the
sitemap and the prerender route list, and will 404 in production. This is the
easiest thing to forget in this codebase.

**Open on the landing pages:** none of them link to specific posts yet, because
no post matches them closely enough — the informatics page links to `/blog`
instead. Wire real links in as Phase 3 produces the posts.

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
  `src/config/pricing.ts` and contact details from `src/config/contact.ts` —
  never type a price, a phone number or an email into a component, a meta
  description or a schema object.**
- **A new page's FAQ goes through `faqPageSchema()`**, built from the array the
  page renders. Do not hand-write a second copy of the answers as schema.
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

**A Google Business Profile is not on this list and is not a task** — the
business is online-only and therefore ineligible (§1.3). Neither are Google
reviews, which require one. That removes what earlier revisions called the
single highest-leverage off-site action, so the weight shifts to the rest:

1. **Profiles on the aggregators that currently outrank the site** —
   `meditatii.ro`, `superprof.com.ro`, `buki-meditatii.ro`, `olx.ro`,
   `publi24.ro`, `anunturi-meditatii.ro` — each linking back to algomate.ro.
   **Now the most important item here.** It is simultaneously lead generation,
   the site's first inbound links, and the only realistic place to accumulate
   public reviews. Once live, add the URLs to `organizationSchema.sameAs` (they
   are the reason that array exists and is still empty).
2. **Reviews, on those platforms.** Zero anywhere today. For a one-person
   tutoring business this still outweighs most on-page work — it just cannot
   happen on Google. Ask past students on whichever platforms get set up in (1).
3. **Search Console** access for T-0.3 and for ongoing monitoring.
4. **Paid search.** SEO will not produce enrolments this session, and with the
   local pack unavailable the organic path for commercial queries is longer than
   it looked. If the owner needs students now, Google Ads on the exam-intent
   terms is the parallel track while content matures.

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
