import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';
import FaqList from '../components/FaqList';
import RelatedPosts from '../components/RelatedPosts';
import { breadcrumbSchema, courseLiceu, faqPageSchema } from '../seo/structuredData';
import { GROUP_MAX_STUDENTS, priceGroupLabel, priceIndividualLabel } from '../config/pricing';

/**
 * Landing page for `meditații liceu` (and `meditații matematică liceu`,
 * `meditații informatică liceu`).
 *
 * This page argues the *year*: what a student in each of the four high-school
 * grades should be doing in maths and informatics, and which programme fits.
 * The other landing pages argue the subject (/meditatii-informatica-bac), the
 * format (/meditatii-matematica-online), the audience (/meditatii-evaluare-
 * nationala-matematica) and the place (/meditatii-matematica-bucuresti) —
 * nothing here should read the same on any of them.
 *
 * Chapter lists are the usual teaching order, not a ministerial quote: school
 * plans differ by specialisation and by teacher, and the programme is set by
 * order. The copy says so and points at edu.ro rather than going stale.
 */

const FAQS = [
  {
    q: 'Are sens să încep meditațiile în clasa a IX-a, dacă BAC-ul e abia peste patru ani?',
    a: 'Da, dacă scopul este să nu rămână goluri, nu să „faci BAC” de pe acum. Subiectul de matematică de la BAC conține cerințe din toți cei patru ani de liceu, iar la informatică primele capitole din clasa a IX-a sunt baza pe care se construiește tot restul. Un elev care trece prin clasa a IX-a fără să stăpânească funcția de gradul al II-lea sau algoritmii pe cifre plătește asta în fiecare an care urmează.',
  },
  {
    q: 'Faceți meditații pentru materia de la clasă sau doar pentru BAC?',
    a: 'Pentru amândouă, pentru că în liceu ele se suprapun aproape complet. Matematica din clasele a IX-a – a XII-a este chiar programa de BAC, împărțită pe ani. Ședințele urmează capitolul la care este elevul la școală și îl duc până la nivelul cerut la examen, nu doar până la lucrarea de săptămâna viitoare.',
  },
  {
    q: 'Elevul are note bune la școală. Mai are nevoie de meditații?',
    a: 'Nu neapărat. Nota de la clasă și nota de la BAC măsoară lucruri diferite: la clasă se testează un capitol proaspăt predat, la examen se amestecă toți anii, cronometrat. Un 9 la lucrarea de la finalul capitolului nu garantează un 9 la BAC. Dacă rezultatele la o simulare cu subiect oficial sunt bune, meditațiile nu sunt necesare.',
  },
  {
    q: 'Profilul real și uman fac aceeași matematică la BAC?',
    a: 'Nu. La profilul real, specializarea matematică-informatică dă proba M_mate-info, iar științele naturii dau M_șt-nat. Profilul uman susține la proba obligatorie a profilului istoria, nu matematica. Liceele tehnologice dau M_tehnologic, iar cele pedagogice M_pedagogic. Fiecare are o programă proprie, publicată de minister.',
  },
  {
    q: 'Informatica se poate începe direct din clasa a XI-a?',
    a: 'Se poate, dar înseamnă recuperarea a doi ani în paralel cu materia nouă. Capitolele de clasa a XI-a — subprograme, recursivitate, backtracking, grafuri — presupun că tablourile și algoritmii elementari sunt automatisme. Un elev care vine de la zero în a XI-a lucrează la început pe ambele planuri, iar primele săptămâni sunt despre fundație, nu despre capitolul de la clasă.',
  },
  {
    q: 'Câte ședințe pe săptămână sunt recomandate în liceu?',
    a: 'De regulă una, de două ore, în clasele a IX-a – a XI-a. În clasa a XII-a, de la simulare până la examen, frecvența poate crește la două. Mai multe ședințe fără timp de lucru individual între ele nu ajută: progresul real se face la temă, iar ședința următoare pornește de la greșelile din ea.',
  },
];

/** One block per grade. The order of the copy is the order of the years. */
const YEARS = [
  {
    grade: 'Clasa a IX-a',
    focus: 'Fundația',
    math:
      'Mulțimi și logică, funcția de gradul I și de gradul al II-lea, progresii, vectori și primele noțiuni de trigonometrie. Funcția de gradul al II-lea apare la BAC sub o formă sau alta aproape în fiecare an — e capitolul care merită lucrat până devine reflex.',
    info:
      'Algoritmi elementari: prelucrarea cifrelor unui număr, divizori, numere prime, cel mai mare divizor comun. Aici se învață să gândești în pași. Cine sare peste anul acesta scrie la BAC cod care „aproape” merge.',
    programme: { label: 'Introducere în programare', to: '/curriculum?curs=intro-info' },
  },
  {
    grade: 'Clasa a X-a',
    focus: 'Funcțiile și tablourile',
    math:
      'Puteri, radicali și logaritmi, funcția exponențială și logaritmică, numere complexe, combinatorică și probabilități. O bună parte din Subiectul I de la BAC se rezolvă cu materie de clasa a X-a.',
    info:
      'Tablouri unidimensionale și bidimensionale, sortări, căutare binară, fișiere text. Este anul în care se scrie mult cod, iar diferența dintre un elev care compilează la fiecare temă și unul care scrie pe hârtie devine vizibilă.',
    programme: { label: 'Introducere în programare', to: '/curriculum?curs=intro-info' },
  },
  {
    grade: 'Clasa a XI-a',
    focus: 'Anul greu',
    math:
      'Matrice și determinanți, sisteme de ecuații, limite de funcții, continuitate, derivate și studiul funcțiilor. Subiectul al II-lea și primul exercițiu de la Subiectul al III-lea de la BAC vin, în mare, de aici.',
    info:
      'Subprograme, recursivitate, backtracking, șiruri de caractere, structuri și grafuri. Este capitolul cu cele mai multe puncte la proba de informatică și cel în care elevii rămân cel mai des în urmă.',
    programme: { label: 'Informatică BAC', to: '/meditatii-informatica-bac' },
  },
  {
    grade: 'Clasa a XII-a',
    focus: 'Examenul',
    math:
      'Legi de compoziție, grupuri, inele și polinoame, primitive și integrale — apoi recapitularea pe tipuri de subiect, cu modele și variante oficiale lucrate cronometrat. Simularea din martie arată ce a rămas de lucrat.',
    info:
      'Puțină materie nouă, multă recapitulare: subiecte oficiale complete, cronometrate, și cerința de la Subiectul al III-lea cu fișiere și algoritm eficient, lucrată până nu mai sperie.',
    programme: { label: 'Matematică BAC', to: '/curriculum?curs=mate-bac' },
  },
];

const linkClass =
  'text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors';

const MeditatiiLiceu: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Meditații Liceu — Matematică și Informatică, clasele IX–XII | AlgoMate"
        description={`Meditații de liceu la matematică și informatică, online, pe clase: ce contează în a IX-a, a X-a, a XI-a și a XII-a până la BAC. Grupe de max ${GROUP_MAX_STUDENTS} elevi, ${priceGroupLabel}/ședință.`}
        path="/meditatii-liceu"
        jsonLd={[
          courseLiceu,
          faqPageSchema(FAQS),
          breadcrumbSchema([{ name: 'Meditații liceu', path: '/meditatii-liceu' }]),
        ]}
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* ── Header ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Liceu
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Clasele IX–XII
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[2.5rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight max-w-3xl">
                Meditații <em className="italic text-[#e8734a] font-normal">liceu</em>, an cu an.
              </h1>
              <div className="flex items-center gap-3 shrink-0">
                <GraduationCap size={20} strokeWidth={1.5} className="text-[#e8734a]" />
                <p className="font-mono text-[11px] md:text-xs text-[#888] uppercase tracking-wider leading-relaxed">
                  → Matematică · Informatică
                </p>
              </div>
            </div>

            <div className="max-w-3xl mt-12 md:mt-16 pt-10 border-t border-[#222] space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                <strong className="text-[#e4e4e4] font-medium">
                  Meditații de matematică și informatică pentru liceu
                </strong>
                , online, de la clasa a IX-a până la Bacalaureat. Ședințele sunt susținute de Răzvan
                Rădulescu, student la Politehnica din București, programator și premiant la
                olimpiade și concursuri naționale de informatică.
              </p>
              <p>
                În liceu, „materia de la clasă” și „materia de BAC” sunt de fapt același lucru,
                împărțit pe patru ani. Subiectul de matematică de la examen are cerințe din fiecare
                an, iar la informatică fiecare capitol se sprijină pe cel de dinainte. De aceea
                pagina aceasta este organizată pe clase: ce contează în fiecare an și ce se pierde
                dacă anul acela trece fără să fie consolidat.
              </p>
            </div>
          </motion.div>

          {/* ── Year by year ───────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Pe clase</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Ce contează în fiecare an de liceu.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Ordinea de mai jos este cea în care se predau de obicei capitolele la
              specializarea matematică-informatică; planurile diferă de la un liceu și de la o
              specializare la alta, iar programa oficială se publică pe{' '}
              <a href="https://www.edu.ro" className={linkClass}>
                edu.ro
              </a>
              .
            </p>

            <div className="border-t border-[#222] max-w-5xl">
              {YEARS.map((y) => (
                <div
                  key={y.grade}
                  className="grid grid-cols-1 md:grid-cols-[12rem_1fr_1fr] gap-6 md:gap-10 py-10 border-b border-[#222]"
                >
                  <div>
                    <h3 className="font-display font-semibold text-2xl text-[#f0f0f0] tracking-tight">
                      {y.grade}
                    </h3>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#e8734a] mt-2">
                      {y.focus}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666] mb-3">
                      Matematică
                    </p>
                    <p className="text-[0.95rem] text-[#aaa] leading-relaxed">{y.math}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666] mb-3">
                      Informatică
                    </p>
                    <p className="text-[0.95rem] text-[#aaa] leading-relaxed">{y.info}</p>
                    <Link
                      to={y.programme.to}
                      className="group inline-flex items-center gap-2 mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-[#e8734a]"
                    >
                      Program: {y.programme.label}
                      <ArrowRight size={12} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── When to start ──────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Când are sens</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Trei situații, trei răspunsuri diferite.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                <strong className="text-[#e4e4e4] font-medium">Un gol dintr-un an anterior.</strong>{' '}
                Elevul de a XI-a care nu știe logaritmi nu are o problemă cu derivatele, ci una cu
                clasa a X-a. Prima ședință este o evaluare a nivelului tocmai pentru asta: planul
                pornește de la ce lipsește, nu de la capitolul din catalog.
              </p>
              <p>
                <strong className="text-[#e4e4e4] font-medium">Un capitol nou care nu se leagă.</strong>{' '}
                Recursivitatea, limitele, grafurile — capitole la care o explicație în plus, cu
                exemple lucrate pe loc, scurtează săptămâni de confuzie. Aici ședințele merg în
                paralel cu școala.
              </p>
              <p>
                <strong className="text-[#e4e4e4] font-medium">Clasa a XII-a.</strong> Recapitulare pe
                tipuri de subiect și simulări cronometrate cu{' '}
                <a href="https://subiecte.edu.ro" className={linkClass}>
                  subiecte oficiale
                </a>
                . Pentru informatică, detaliile sunt pe pagina de{' '}
                <Link to="/meditatii-informatica-bac" className={linkClass}>
                  meditații informatică BAC
                </Link>
                ; pentru elevii de clasa a VIII-a, pe cea de{' '}
                <Link to="/meditatii-evaluare-nationala-matematica" className={linkClass}>
                  Evaluare Națională
                </Link>
                .
              </p>
              <p className="text-[0.95rem] text-[#888]">
                Ședințele durează două ore și se țin online, în grupă de maximum{' '}
                {GROUP_MAX_STUDENTS} elevi ({priceGroupLabel}) sau individual (
                {priceIndividualLabel}). Detaliile despre format sunt pe pagina de{' '}
                <Link to="/meditatii-matematica-online" className={linkClass}>
                  meditații online
                </Link>
                .
              </p>
            </div>
          </motion.section>

          <RelatedPosts
            tags={['Matematică M1', 'Informatică BAC', 'Bacalaureat 2027']}
            heading="Subiecte de liceu, rezolvate pas cu pas."
          />

          {/* ── FAQ ────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Întrebări frecvente</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-10 max-w-2xl">
              Despre liceu, nu doar despre examen.
            </h2>
            <FaqList items={FAQS} />
          </motion.section>

          {/* ── CTA ────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mt-24 md:mt-32 pt-10 border-t border-[#222]"
          >
            <p className="text-[#b8b8b8] leading-relaxed mb-7">
              Scrie în formular clasa, specializarea și materia. Prima ședință este o evaluare a
              nivelului, iar răspunsul vine în 24 de ore.
            </p>
            <Link to="/inscriere">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 inline-flex items-center gap-3"
              >
                Rezervă prima ședință
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </Link>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default MeditatiiLiceu;
