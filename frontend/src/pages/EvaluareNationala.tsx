import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';
import FaqList from '../components/FaqList';
import {
  breadcrumbSchema,
  courseEvaluareNationala,
  faqPageSchema,
} from '../seo/structuredData';
import { GROUP_MAX_STUDENTS, priceGroupLabel, priceIndividualLabel } from '../config/pricing';

/**
 * Landing page for `meditații Evaluare Națională matematică`.
 *
 * The audience here is the parent of an eighth-grader, not the student — which
 * changes the tone from the three BAC pages: less "you", more "elevul", and the
 * anxieties are about admission and about a gap that appeared years ago.
 *
 * Two things this page must not do:
 *   - restate the admission formula. It is set annually and the weighting has
 *     changed before; the blog post owns that subject and links out to edu.ro.
 *   - promise a place at a particular high school. The pass mark moves with the
 *     cohort every year.
 */

const FAQS = [
  {
    q: 'Când ar trebui să înceapă pregătirea pentru Evaluarea Națională?',
    a: 'Ideal, la începutul clasei a VIII-a, pentru că atunci mai există timp și pentru materia nouă, și pentru recuperarea lacunelor din anii anteriori. Pregătirea începută în semestrul al doilea rămâne utilă, dar se concentrează pe tipurile de subiecte care aduc cele mai multe puncte, nu pe acoperirea integrală a materiei de gimnaziu.',
  },
  {
    q: 'Materia de Evaluare Națională este doar din clasa a VIII-a?',
    a: 'Nu. Subiectele acoperă matematica de gimnaziu în ansamblu, iar în practică cele mai multe puncte pierdute vin din capitole de clasa a VI-a și a VII-a — rapoarte și proporții, ecuații, asemănare, arii — nu din materia predată în anul examenului. De aceea prima ședință este o evaluare a bazei, nu o lecție din programa curentă.',
  },
  {
    q: 'Elevul are note bune la școală, dar la teste de examen se descurcă slab. De ce?',
    a: 'Este cel mai frecvent tipar la clasa a VIII-a. Nota de la clasă măsoară un capitol pe rând, imediat după ce a fost predat; examenul amestecă tot gimnaziul și cere aplicarea unei noțiuni fără să spună care este. Diferența nu vine din inteligență, ci din antrenamentul pe subiecte mixte, care la școală se face rar.',
  },
  {
    q: 'Se lucrează pe subiectele din anii trecuți?',
    a: 'Da, dar grupate pe tipul cerinței, nu în ordinea în care au fost date. Un elev care rezolvă zece cerințe de același tip, una după alta, ajunge să recunoască tiparul; unul care rezolvă zece variante întregi la rând obosește înainte să învețe ceva. Variantele complete vin la final, ca simulări cronometrate.',
  },
  {
    q: 'Ce notă îi trebuie ca să intre la un liceu bun?',
    a: 'Nu există un răspuns valabil dinainte. Ultima medie de admitere la fiecare liceu se stabilește de la sine, în funcție de câți elevi îl aleg și de notele lor din anul respectiv, așa că cifra de anul trecut este o orientare, nu un prag. Obiectivul realist al pregătirii este nota maximă pe care o poate obține elevul, nu un număr ales dinainte.',
  },
  {
    q: 'Pregătiți și pentru Limba română, sau doar matematică?',
    a: 'Doar matematică. AlgoMate predă matematică și informatică; pentru Limba și literatura română trebuie căutat un profesor de specialitate. Este mai onest spus acum decât după prima ședință.',
  },
];

/** Where the marks are actually lost. Distinct from the BAC chapter lists. */
const GAPS = [
  {
    n: '01',
    title: 'Calculul cu fracții și rapoarte',
    body:
      'Materie de clasa a VI-a, prezentă în aproape orice cerință de examen. Un elev care ezită la fracții pierde timp și puncte în probleme care, formal, sunt despre altceva.',
  },
  {
    n: '02',
    title: 'Ecuații și probleme care se rezolvă cu ecuații',
    body:
      'Traducerea unui enunț în ecuație este abilitatea cea mai des testată și cel mai rar exersată. Se lucrează separat de rezolvarea propriu-zisă, pentru că sunt două dificultăți diferite.',
  },
  {
    n: '03',
    title: 'Asemănare, Pitagora, elemente de trigonometrie',
    body:
      'Blocul de geometrie plană care apare an de an. Aici greșelile nu vin din formulă, ci din figura desenată prost sau deloc.',
  },
  {
    n: '04',
    title: 'Arii, perimetre, volume',
    body:
      'Corpuri geometrice și secțiuni în ele. Capitolul în care elevii pierd puncte pentru unități de măsură, nu pentru raționament.',
  },
  {
    n: '05',
    title: 'Redactarea completă a soluției',
    body:
      'La subiectele cu rezolvare, punctajul se acordă pe pași justificați. Un elev care „știe rezultatul” și nu scrie drumul pierde jumătate din cerință — și este cel mai ieftin punctaj de recuperat din toată pregătirea.',
  },
];

const EvaluareNationala: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Meditații Evaluare Națională Matematică — clasa a VIII-a | AlgoMate"
        description={`Pregătire la matematică pentru Evaluarea Națională: recuperarea lacunelor din gimnaziu, subiecte pe tipuri de cerințe și simulări. Online, grupe de max ${GROUP_MAX_STUDENTS} elevi, ${priceGroupLabel}/ședință.`}
        path="/meditatii-evaluare-nationala-matematica"
        jsonLd={[
          courseEvaluareNationala,
          faqPageSchema(FAQS),
          breadcrumbSchema([
            {
              name: 'Meditații Evaluare Națională matematică',
              path: '/meditatii-evaluare-nationala-matematica',
            },
          ]),
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
                § AlgoMate / Evaluarea Națională
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Clasa a VIII-a
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.04] tracking-tight max-w-3xl">
                Meditații <em className="italic text-[#e8734a] font-normal">Evaluare Națională</em> la matematică.
              </h1>
              <div className="flex items-center gap-3 shrink-0">
                <GraduationCap size={20} strokeWidth={1.5} className="text-[#e8734a]" />
                <p className="font-mono text-[11px] md:text-xs text-[#888] uppercase tracking-wider leading-relaxed">
                  → Pentru părinți și elevi
                </p>
              </div>
            </div>

            <div className="max-w-3xl mt-12 md:mt-16 pt-10 border-t border-[#222] space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                <strong className="text-[#e4e4e4] font-medium">Pregătire la matematică pentru
                Evaluarea Națională</strong>, pentru elevii de clasa a VIII-a. Online, în ședințe
                de două ore, susținute de Răzvan Rădulescu — student la Politehnica din București
                și premiant la olimpiade și concursuri naționale.
              </p>
              <p>
                Nota de la Evaluarea Națională decide, în bună măsură, la ce liceu ajunge elevul.
                Ceea ce face ca cea mai frecventă greșeală de pregătire să fie și cea mai
                costisitoare: se începe cu materia clasei a VIII-a, deși punctele se pierd de
                obicei în capitole de clasa a VI-a și a VII-a rămase neînțelese.
              </p>
              <p>
                Mai jos: unde se pierd efectiv punctele, cum arată un plan de pregătire care
                pornește de la nivelul real al elevului, și răspunsuri la întrebările pe care le
                pun părinții înainte de prima ședință.
              </p>
            </div>
          </motion.div>

          {/* ── Where marks are lost ───────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Unde se pierd punctele</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Rar în materia din anul examenului.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Ordinea de mai jos este cea în care se lucrează, dacă evaluarea din prima ședință
              arată lacune. Fiecare punct recuperat aici se vede în orice tip de subiect, nu doar
              în capitolul lui.
            </p>

            <div className="border-t border-[#222] max-w-4xl">
              {GAPS.map((g) => (
                <div
                  key={g.n}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7 border-b border-[#222]"
                >
                  <div className="md:col-span-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#666] tabular-nums">
                      {g.n}
                    </span>
                  </div>
                  <div className="md:col-span-11 max-w-2xl">
                    <h3 className="font-sans font-semibold text-lg text-[#e4e4e4] mb-2">
                      {g.title}
                    </h3>
                    <p className="text-[0.95rem] text-[#999] leading-relaxed">{g.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── The plan ───────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Cum se lucrează</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Un plan care pornește de la ce lipsește.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Prima ședință este o evaluare, nu o lecție. Elevul primește cerințe din subiecte
                oficiale, acoperind toate clasele de gimnaziu, și lucrează singur. Ce iese de acolo
                este o hartă a lacunelor reale — care aproape niciodată nu coincide cu ce crede
                elevul, și destul de des nici cu ce arată nota de la școală.
              </p>
              <p>
                Urmează recuperarea, în ordinea de mai sus, cu teorie scurtă și mult exercițiu. Abia
                după aceea se trece la subiecte grupate pe tipuri de cerințe și, în ultimele
                săptămâni, la simulări cronometrate pe variante întregi — pentru că un examen se
                pierde și din gestionarea timpului, nu doar din necunoaștere.
              </p>
              <p>
                Ședințele durează două ore, în grupe de maximum {GROUP_MAX_STUDENTS} elevi
                ({priceGroupLabel}/ședință) sau individual ({priceIndividualLabel}/ședință). La
                grupă, elevii sunt puși împreună după nivel și după examenul vizat. Ce include
                prețul este detaliat pe pagina de{' '}
                <Link
                  to="/servicii"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  servicii
                </Link>
                .
              </p>
              <p>
                Pentru partea de admitere — calendar, repartizare, ce se schimbă de la un an la
                altul — articolele{' '}
                <Link
                  to="/blog/admitere-liceu-2027"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  despre admiterea la liceu
                </Link>{' '}
                și{' '}
                <Link
                  to="/blog/calendar-examene-2027"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  despre calendarul examenelor
                </Link>{' '}
                sunt punctul de plecare. Regulile se stabilesc anual prin ordin de ministru, așa că
                verifică întotdeauna metodologia în vigoare pe{' '}
                <a
                  href="https://www.edu.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  edu.ro
                </a>
                .
              </p>
            </div>
          </motion.section>

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
              Ce întreabă părinții elevilor de a VIII-a.
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
              Scrie în formular în ce clasă este elevul și cum stă la matematică — sincer, nu
              diplomatic. După prima ședință primești o evaluare scrisă a nivelului și un plan
              până la examen. Se răspunde în 24 de ore, fără obligația de a te înscrie.
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

export default EvaluareNationala;
