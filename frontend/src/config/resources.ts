/**
 * Downloadable materials — the single source of truth.
 *
 * Same contract as `pricing.ts`: one module describes the corpus, and the
 * page, the nav copy and anything else that mentions a file import from here.
 * The files themselves live in `public/descarcari/` and are copied verbatim
 * into `dist/` by Vite — filenames stay exactly as written below.
 *
 * ─── TWO RULES, BOTH LOAD-BEARING ───────────────────────────────────────────
 *
 * 1. NO `sizeLabel` FIELD. Sizes are read off disk at build time by
 *    `scripts/build-content.mjs` and emitted into `content/resources.generated.ts`.
 *    A hand-typed "599 KB" drifts the first time a PDF is re-exported and
 *    nothing catches it.
 *
 * 2. VERSION THE FILENAME — `ghid-bac-m1-subiectul-1-v1.pdf`, never an
 *    unversioned name. algomate.ro sits behind a Cloudflare tunnel and the edge
 *    caches `.pdf` keyed on URL. Replace a file's contents under the same name
 *    and readers keep getting the old one until the TTL expires or a human
 *    purges the cache from the dashboard. A version bump makes the revision a
 *    new URL and sidesteps that entirely — the same discipline Vite applies to
 *    build assets via content hashes. It also keeps `.git` from storing a fresh
 *    copy of the same path on every re-export.
 *
 * ─── THE ARRAY BELOW IS PARSED AT BUILD TIME ────────────────────────────────
 *
 * `scripts/build-content.mjs` reads `RESOURCES` out of this file as source
 * text, so keep it plain data: object literals of strings and numbers, no
 * imports, no expressions, no `as const`. The build fails with a clear message
 * if it cannot parse it — and fails, too, if an entry names a file that is not
 * in `public/descarcari/`, because the alternative is shipping a link that
 * 404s while the build still exits 0.
 */

export type ResourceSubject = 'matematica' | 'informatica';

/**
 * What the material is *for*, which is how the page groups it. Deliberately
 * not called `exam`: not every guide targets an exam — the clasa a V-a and
 * clasa a VII-a manuals follow a school-year syllabus, and filing them under
 * an exam heading would contradict their own covers.
 */
export type ResourceCategory =
  | 'bacalaureat'
  | 'evaluare-nationala'
  | 'clasa-7'
  | 'clasa-5';

export type Resource = {
  /** Stable id. Lowercase, hyphenated. Used as the React key and the size key. */
  slug: string;
  /** Filename inside public/descarcari/. Lowercase, no diacritics, versioned. */
  file: string;
  /** Romanian, with diacritics. */
  title: string;
  /** One or two sentences, Romanian. Shown under the title. */
  description: string;
  subject: ResourceSubject;
  category: ResourceCategory;
  /** Optional. Shown next to the file size when present. */
  pages?: number;
};

export const RESOURCES: Resource[] = [
  {
    slug: 'bac-m1-subiectul-1',
    file: 'ghid-bac-m1-subiectul-1-v1.pdf',
    title: 'Ghid BAC M1 — Subiectul I',
    description:
      'Toată programa de mate-info pentru Subiectul I: numere reale și complexe, progresii și șiruri, funcții și relațiile lui Viète, ecuații și inecuații, combinatorică și probabilități, vectori și trigonometrie. Teorie esențială, probleme rezolvate pas cu pas și modele de subiect.',
    subject: 'matematica',
    category: 'bacalaureat',
    pages: 88,
  },
  {
    slug: 'bac-m1-subiectul-2',
    file: 'ghid-bac-m1-subiectul-2-v1.pdf',
    title: 'Ghid BAC M1 — Subiectul al II-lea',
    description:
      'Algebră liniară și structuri algebrice: operații cu matrice, determinanți, ecuații matriceale, Cayley–Hamilton, sisteme liniare, legi de compoziție, grupuri și morfisme, inele, corpuri și polinoame. Cu modele de subiect rezolvate integral.',
    subject: 'matematica',
    category: 'bacalaureat',
    pages: 38,
  },
  {
    slug: 'bac-m1-subiectul-3',
    file: 'ghid-bac-m1-subiectul-3-v1.pdf',
    title: 'Ghid BAC M1 — Subiectul al III-lea',
    description:
      'Analiză matematică: limite și nedeterminări, asimptote, continuitate și derivabilitate, monotonie și extreme, Rolle și Lagrange, primitive, integrala definită, arii și volume de rotație. Cu rezolvări pas cu pas și formular final.',
    subject: 'matematica',
    category: 'bacalaureat',
    pages: 43,
  },
  {
    slug: 'en8-subiectul-1',
    file: 'ghid-en8-matematica-subiectul-1-v1.pdf',
    title: 'Ghid Evaluarea Națională — Subiectul I',
    description:
      'Toată algebra din programa claselor V–VIII: ordinea operațiilor, fracții și puteri, procente, rapoarte și medii, numere reale și radicali, calcul algebric, ecuații, inecuații și sisteme, funcții și probabilități. Itemi de tip grilă cu răspunsuri.',
    subject: 'matematica',
    category: 'evaluare-nationala',
    pages: 30,
  },
  {
    slug: 'en8-subiectul-2',
    file: 'ghid-en8-matematica-subiectul-2-v1.pdf',
    title: 'Ghid Evaluarea Națională — Subiectul al II-lea',
    description:
      'Toată geometria plană și în spațiu din programa claselor V–VIII: unghiuri și triunghiuri, congruență și asemănare, teorema lui Thales, Pitagora și relații metrice, patrulatere, cercul, corpuri geometrice, arii și volume. Cu formular final.',
    subject: 'matematica',
    category: 'evaluare-nationala',
    pages: 35,
  },
  {
    slug: 'en8-subiectul-3',
    file: 'ghid-en8-matematica-subiectul-3-v1.pdf',
    title: 'Ghid Evaluarea Națională — Subiectul al III-lea',
    description:
      'Partea cu rezolvare completă: cum se redactează o soluție care ia punctaj maxim în barem, plus probleme practice, geometrie plană și geometrie în spațiu, rezolvate integral și cu probleme propuse.',
    subject: 'matematica',
    category: 'evaluare-nationala',
    pages: 22,
  },
  {
    slug: 'matematica-clasa-7',
    file: 'ghid-matematica-clasa-7-v1.pdf',
    title: 'Ghid complet Matematică — clasa a VII-a',
    description:
      'Toată materia de clasa a VII-a, conform programei în vigoare: numere raționale și reale, calcul algebric, ecuații și inecuații, organizarea datelor, patrulatere, asemănarea triunghiurilor, relații metrice și cercul. Fiecare lecție are teorie explicată, formulele ei, probleme rezolvate pas cu pas și probleme propuse pe trei niveluri.',
    subject: 'matematica',
    category: 'clasa-7',
    pages: 108,
  },
  {
    slug: 'matematica-clasa-5',
    file: 'ghid-matematica-clasa-5-v2.pdf',
    title: 'Matematică distractivă — clasa a V-a',
    description:
      'Toată materia de clasa a V-a, de la recapitularea clasei a IV-a până la unitățile de măsură: numere naturale și puteri, divizibilitate, fracții ordinare și zecimale, elemente de geometrie. Fiecare lecție are explicația, motivul din spatele regulii, un model rezolvat pas cu pas și peste 50 de exerciții pe patru niveluri, cu răspunsuri.',
    subject: 'matematica',
    category: 'clasa-5',
    pages: 177,
  },
];

/** Directory the PDFs are served from. Deliberately not under `/resurse` —
 *  see docs/DOWNLOADS-SECTION.md §3.1: a `location /resurse/` prefix block in
 *  nginx would also match the page's own URL and interact with the directory
 *  index resolution that serves it. Separate paths cannot shadow each other. */
export const DOWNLOADS_BASE = '/descarcari';

export const resourceHref = (r: Resource) => `${DOWNLOADS_BASE}/${r.file}`;

export const SUBJECT_LABEL: Record<ResourceSubject, string> = {
  matematica: 'Matematică',
  informatica: 'Informatică',
};

export const CATEGORY_LABEL: Record<ResourceCategory, string> = {
  bacalaureat: 'Bacalaureat',
  'evaluare-nationala': 'Evaluarea Națională',
  'clasa-7': 'Clasa a VII-a',
  'clasa-5': 'Clasa a V-a',
};

/**
 * Display order of the sections on /resurse. The page renders a section per
 * entry here rather than filtering in state — with eight files a filter buys
 * nothing and risks prerendering only the default subset.
 */
export const CATEGORY_ORDER: ResourceCategory[] = [
  'bacalaureat',
  'evaluare-nationala',
  'clasa-7',
  'clasa-5',
];

export const resourcesForCategory = (category: ResourceCategory) =>
  RESOURCES.filter((r) => r.category === category);
