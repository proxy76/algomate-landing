/**
 * Schema.org structured data for Google rich results.
 * 
 * These JSON-LD objects are injected per-page via the SEO component.
 * Google uses them to show rich snippets (prices, FAQ dropdowns, course info).
 */

const SITE_URL = 'https://algomate.ro';

// ─── Organization Schema (site-wide) ────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'AlgoMate',
  url: SITE_URL,
  email: 'algomate.razvan@gmail.com',
  description:
    'Meditații premium de matematică și informatică pentru examenul de Bacalaureat. Pregătire structurată cu rezultate dovedite.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'București',
    addressCountry: 'RO',
  },
  sameAs: [],
};

// ─── Course Schemas (for /servicii page) ─────────────────────────────────────

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
  offers: {
    '@type': 'Offer',
    price: '60',
    priceCurrency: 'RON',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-06-01',
  },
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
  offers: {
    '@type': 'Offer',
    price: '60',
    priceCurrency: 'RON',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-06-01',
  },
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
  offers: {
    '@type': 'Offer',
    price: '60',
    priceCurrency: 'RON',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-06-01',
  },
  educationalLevel: 'Liceu',
  inLanguage: 'ro',
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
        text: 'Prețul standard este de 120 RON/ședință. În perioada promoțională de vară 2026, beneficiezi de 50% reducere — doar 60 RON/ședință.',
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
        text: 'Fiecare sesiune durează 2 ore și se desfășoară în grupe mici pentru atenție personalizată.',
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

// ─── Local Business Schema (for București targeting) ─────────────────────────

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'AlgoMate — Meditații Matematică & Informatică',
  url: SITE_URL,
  email: 'algomate.razvan@gmail.com',
  description: 'Meditații online de matematică și informatică pentru BAC, București.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'București',
    addressCountry: 'RO',
  },
  priceRange: '60-120 RON',
  areaServed: {
    '@type': 'Country',
    name: 'Romania',
  },
};
