/**
 * Schema.org structured data for Google rich results.
 * 
 * These JSON-LD objects are injected per-page via the SEO component.
 * Google uses them to show rich snippets (prices, FAQ dropdowns, course info).
 */

import { EMAIL, LOCALITY, PHONE_E164 } from '../config/contact';
import {
  CURRENCY,
  PRICE_GROUP,
  PRICE_INDIVIDUAL,
  GROUP_MAX_STUDENTS,
  priceRangeLabel,
  pricingAnswer,
  groupVsIndividualAnswer,
} from '../config/pricing';

const SITE_URL = 'https://algomate.ro';

// ─── Organization Schema (site-wide) ────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'AlgoMate',
  url: SITE_URL,
  email: EMAIL,
  telephone: PHONE_E164,
  description:
    'Meditații premium de matematică și informatică pentru examenul de Bacalaureat. Pregătire structurată cu rezultate dovedite.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCALITY,
    addressCountry: 'RO',
  },
  /**
   * Populate as profiles go live — Google Business Profile first, then the
   * tutoring marketplaces (see docs/SEO.md §6). Only list profiles that exist
   * and that are demonstrably the same business; a `sameAs` pointing at
   * somebody else's page is worse than an empty array.
   */
  sameAs: [],
};

// ─── Person Schema (the instructor section on the homepage) ─────────────────

/**
 * Pairs with the Instructor component. The credentials below MUST stay in sync
 * with the copy rendered in Instructor.tsx — inconsistent structured data is
 * penalised by Google.
 */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Răzvan Rădulescu',
  jobTitle: 'Instructor și fondator AlgoMate',
  description:
    'Student la Universitatea Politehnica din București și programator, premiant la olimpiade și concursuri naționale de Informatică. 2 ani de meditații de matematică și informatică, cu rezultate la Bacalaureat și Evaluare Națională.',
  image: `${SITE_URL}/instructor-razvan.jpg`,
  email: EMAIL,
  telephone: PHONE_E164,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitatea Politehnica din București',
  },
  worksFor: {
    '@type': 'EducationalOrganization',
    name: 'AlgoMate',
    url: SITE_URL,
  },
  knowsAbout: [
    'Matematică',
    'Informatică',
    'Algoritmi',
    'C++',
    'Python',
    'Pregătire Bacalaureat',
    'Evaluare Națională',
  ],
  knowsLanguage: 'ro',
};

// ─── Course Schemas (for /servicii page) ─────────────────────────────────────

/**
 * Standard pricing, identical across all courses. The numbers come from
 * `config/pricing.ts`, which is also what the visible price blocks render —
 * schema and page cannot disagree.
 */
const standardOffers = [
  {
    '@type': 'Offer',
    name: `Ședință în grupă (max ${GROUP_MAX_STUDENTS} elevi)`,
    price: String(PRICE_GROUP),
    priceCurrency: CURRENCY,
    availability: 'https://schema.org/InStock',
  },
  {
    '@type': 'Offer',
    name: 'Ședință individuală',
    price: String(PRICE_INDIVIDUAL),
    priceCurrency: CURRENCY,
    availability: 'https://schema.org/InStock',
  },
];

export const courseInformaticaBac = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Meditații Informatică BAC — C/C++',
  description:
    'Pregătire completă pentru BAC la Informatică: algoritmi, structuri de date, rezolvări complete de subiecte. Feedback personalizat pe cod.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'AlgoMate',
    url: SITE_URL,
  },
  offers: standardOffers,
  educationalLevel: 'Liceu',
  inLanguage: 'ro',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    startDate: '2026-08-15',
  },
};

export const courseIntroductionProgramming = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Introducere în Informatică — Python / C++',
  description:
    'Curs introductiv de programare pentru clasa a 9-a. Bazele programării cu exerciții practice și proiecte reale.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'AlgoMate',
    url: SITE_URL,
  },
  offers: standardOffers,
  educationalLevel: 'Liceu',
  inLanguage: 'ro',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    startDate: '2026-07-15',
  },
};

export const courseMatematicaBac = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Meditații Matematică BAC — M1/M2/M3',
  description:
    'Pregătire intensivă pentru BAC la Matematică: algebră, analiză, geometrie. Metodă structurată cu accent pe înțelegere.',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'AlgoMate',
    url: SITE_URL,
  },
  offers: standardOffers,
  educationalLevel: 'Liceu',
  inLanguage: 'ro',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    startDate: '2026-08-15',
  },
};

/**
 * The `/meditatii-informatica-bac` landing page.
 *
 * Deliberately a separate object from `courseInformaticaBac` rather than the
 * same one emitted twice: this page is the canonical description of that
 * programme, so its Course carries `url` and `mainEntityOfPage` pointing here,
 * and its own wording. Two URLs emitting an identical Course is a duplicate
 * signal for no gain.
 */
export const courseInformaticaBacLanding = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Meditații Informatică BAC — C++',
  description:
    'Pregătire pentru proba de informatică de la Bacalaureat, în C/C++: algoritmi, tablouri, șiruri de caractere, subprograme, recursivitate, structuri de date și grafuri, cu rezolvări de subiecte oficiale și cod scris la fiecare ședință.',
  url: `${SITE_URL}/meditatii-informatica-bac`,
  mainEntityOfPage: `${SITE_URL}/meditatii-informatica-bac`,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'AlgoMate',
    url: SITE_URL,
  },
  offers: standardOffers,
  educationalLevel: 'Liceu',
  inLanguage: 'ro',
  teaches: [
    'Algoritmi elementari în C++',
    'Tablouri unidimensionale și bidimensionale',
    'Șiruri de caractere',
    'Subprograme și pointeri',
    'Recursivitate și backtracking',
    'Structuri de date: liste, stive, cozi, arbori',
    'Grafuri neorientate și orientate',
    'Fișiere text',
  ],
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    startDate: '2026-08-15',
  },
};

// ─── FAQ Schema (drives Google FAQ rich results) ─────────────────────────────

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Cât costă meditațiile la AlgoMate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: pricingAnswer,
      },
    },
    {
      '@type': 'Question',
      name: 'Meditațiile sunt online sau fizic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toate sesiunile AlgoMate sunt în format online, prin videoconferință. Poți participa de oriunde, ai nevoie doar de un laptop și conexiune la internet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce materii predați pentru BAC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oferim meditații de Informatică BAC (C/C++), Matematică BAC (M1/M2/M3) și cursuri introductive de programare (Python/C++) pentru clasa a 9-a.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cine predă meditațiile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Toate ședințele sunt susținute de Răzvan Rădulescu, fondatorul AlgoMate — student la Universitatea Politehnica din București, programator și premiant la olimpiade și concursuri naționale de Informatică, cu 2 ani de experiență în meditații.',
      },
    },
    {
      '@type': 'Question',
      name: 'Care este rata de promovabilitate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rata noastră de promovabilitate este de 100% la Examenul Național, cu o medie a notelor de 9.8 la BAC.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cât durează o sesiune de meditații?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fiecare sesiune durează 2 ore și se desfășoară în grupe de maximum 3 elevi pentru atenție personalizată.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pot începe meditațiile în timpul verii?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da! AlgoMate funcționează și pe timpul verii. Cursurile de introducere în programare încep pe 15 iulie, iar cele de BAC pe 15 august 2026.',
      },
    },
  ],
};

/**
 * FAQ for /servicii. Deliberately different questions from `faqSchema` on the
 * homepage — two pages emitting the same FAQPage is a duplicate signal, and
 * the questions people ask on a pricing page are not the ones they ask on a
 * landing page. Every answer here must match the visible text on the page;
 * schema that disagrees with the page is a manual-action risk.
 */
export const servicesFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Care este diferența dintre meditațiile în grupă și cele individuale?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: groupVsIndividualAnswer,
      },
    },
    {
      '@type': 'Question',
      name: 'Cât durează o ședință de meditații?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ședință durează 2 ore, de regulă o dată pe săptămână. În perioada de dinaintea examenului, frecvența poate crește la două ședințe pe săptămână.',
      },
    },
    {
      '@type': 'Question',
      name: 'Elevul meu stă foarte prost la matematică. Are sens să înceapă acum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da, dacă mai este timp până la examen. Prima ședință este o evaluare a nivelului real, iar planul de recuperare pornește de la ce lipsește efectiv, nu de la programa clasei. Recuperarea unor lacune acumulate în mai mulți ani cere însă timp: cu câteva săptămâni înainte de examen se poate consolida ce există deja, nu se poate construi de la zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum se desfășoară o ședință online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ședințele au loc prin videoconferință, cu tablă digitală partajată pe care se scrie în timp real. Pentru informatică se lucrează direct în cod, cu compilare și rulare pe loc. La final, elevul primește notițele ședinței și tema pentru acasă.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ce se întâmplă dacă elevul lipsește de la o ședință?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ședință anunțată cu cel puțin 24 de ore înainte se reprogramează fără costuri. La meditațiile în grupă, elevul primește materialele și tema ședinței pierdute.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cu cât timp înainte de BAC ar trebui începută pregătirea?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ideal, din septembrie–octombrie al clasei a XII-a, ceea ce lasă timp pentru parcurgerea întregii programe și pentru simulări. Pregătirea începută în primăvară rămâne utilă, dar se concentrează pe tipurile de subiecte care aduc cele mai multe puncte, nu pe acoperirea completă a materiei.',
      },
    },
  ],
};

// ─── Local Business Schema (for București targeting) ─────────────────────────

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AlgoMate — Meditații Matematică & Informatică',
  url: SITE_URL,
  email: EMAIL,
  telephone: PHONE_E164,
  description: 'Meditații online de matematică și informatică pentru BAC, București.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: LOCALITY,
    addressCountry: 'RO',
  },
  priceRange: priceRangeLabel,
  /**
   * București first: sessions are online and open to the whole country, but the
   * local pack is the realistic near-term win and it keys off the city. No
   * street address and no `openingHours` — there is no premises to visit and no
   * published hours, and inventing either to fill the schema out would break
   * the NAP consistency this is here to establish.
   */
  areaServed: [
    { '@type': 'City', name: LOCALITY },
    { '@type': 'Country', name: 'Romania' },
  ],
};

// ─── FAQ, built from the page's own copy ─────────────────────────────────────

/**
 * Build a FAQPage from the same array the page renders.
 *
 * The two FAQPage objects above predate this and keep their answers as literal
 * strings, which is exactly how the homepage ended up declaring seven questions
 * while showing one. New pages should define their Q&A once, render it, and
 * pass it through here — then the schema cannot describe anything the visitor
 * cannot read.
 *
 * Keep the questions distinct per page: the same FAQPage on several URLs is a
 * duplicate signal, and the questions someone asks on a subject landing page
 * are not the ones they ask on a pricing page.
 */
export const faqPageSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
});

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────

/**
 * BreadcrumbList for a page below the homepage.
 *
 * Google renders this as the site-hierarchy line in place of the raw URL in a
 * search result, which is why it is worth having on a site with only two levels.
 * The trail here mirrors the site's actual structure, not an invented taxonomy —
 * breadcrumbs that describe a hierarchy the site does not have are ignored at
 * best.
 *
 * Pass the trail below the homepage, in order:
 *   breadcrumbSchema([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${slug}` }])
 */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Acasă', path: '/' }, ...trail].map(
    (crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })
  ),
});
