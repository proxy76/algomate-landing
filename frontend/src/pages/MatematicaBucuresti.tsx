import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import SectionLabel from '../components/SectionLabel';
import FaqList from '../components/FaqList';
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceMatematicaBucuresti,
} from '../seo/structuredData';
import { GROUP_MAX_STUDENTS, priceGroupLabel, priceIndividualLabel } from '../config/pricing';
import { PHONE_DISPLAY, PHONE_HREF } from '../config/contact';

/**
 * Landing page for `meditații matematică București`.
 *
 * The local-intent page. It pairs with the Google Business Profile, which is
 * what actually wins the local pack — this page is the destination that profile
 * points at, and the place the NAP has to match.
 *
 * The honesty constraint that shapes the whole page: **sessions are online.**
 * A București page that implies home visits or a classroom would convert badly
 * and would contradict every other page on the site. So the local angle is the
 * one that is true — the instructor and the students are here, the exam and the
 * schools are here, and nobody crosses the city twice a week for it.
 *
 * Do not spin this from /meditatii-matematica-online. That page argues the
 * format; this one argues the place. If a paragraph would read identically on
 * both, it belongs on neither.
 */

const FAQS = [
  {
    q: 'Meditațiile se țin fizic, la domiciliu sau într-o sală din București?',
    a: 'Nu. Toate ședințele sunt online, prin videoconferință, inclusiv pentru elevii din București. Motivul este practic: două drumuri prin oraș pentru fiecare ședință înseamnă o oră–două pierdute săptămânal, iar acel timp este mai util petrecut pe probleme. Pregătirea, materialele și corectarea temei sunt aceleași ca într-o ședință față în față.',
  },
  {
    q: 'Contează că sunt din alt sector sau din Ilfov?',
    a: 'Nu contează deloc, tocmai pentru că ședințele sunt online — nu există deplasare de niciun fel, nici a elevului, nici a profesorului. Elevii din București și din Ilfov au același program și același tarif ca oricine altcineva.',
  },
  {
    q: 'Cunoașteți programa și ritmul din liceele din București?',
    a: 'Pregătirea pornește de la programa oficială de examen, nu de la manualul sau ritmul unui anumit liceu — profesorii de la clasă parcurg materia în ordini diferite, iar un plan construit după o singură școală nu s-ar potrivi restului grupei. Ce se adaptează este nivelul elevului, măsurat la prima ședință.',
  },
  {
    q: 'Cum se plătește și se poate emite factură?',
    a: 'Plata se face prin transfer bancar, după ședință sau pe pachete de ședințe, cum este mai comod. Pentru orice detaliu legat de facturare, scrie în formular sau sună — se răspunde în 24 de ore.',
  },
  {
    q: 'Ce program aveți pentru elevii care stau la școală până târziu?',
    a: 'Ședințele se programează de comun acord, inclusiv seara și în weekend. Fiind online, ora de început nu depinde de trafic, deci un interval de seară este realist, nu o promisiune care se rupe la prima aglomerație.',
  },
  {
    q: 'Pot vorbi cu cineva înainte să mă înscriu?',
    a: `Da. Numărul de telefon este ${PHONE_DISPLAY} și formularul de înscriere primește răspuns în 24 de ore. Prima discuție nu obligă la nimic: se stabilește ce clasă, ce profil, cât timp mai este până la examen și dacă pregătirea aceasta are sens în situația respectivă.`,
  },
];

const LOCAL_POINTS = [
  {
    title: 'Zero timp pierdut pe drum',
    body:
      'La un dus-întors printr-un oraș ca Bucureștiul, o ședință de două ore ocupă trei sau patru din ziua elevului. Online, ocupă două. Diferența, adunată pe un an școlar, este de zeci de ore — timp de învățat, nu de stat în mașină.',
  },
  {
    title: 'Aceeași oră, indiferent de trafic',
    body:
      'Ședințele nu se amână pentru că s-a blocat o arteră. Programul de seară, care pentru meditațiile la domiciliu este cel mai fragil interval, aici este perfect fezabil.',
  },
  {
    title: 'Grupe mici, formate din elevi cu același obiectiv',
    body: `Maximum ${GROUP_MAX_STUDENTS} elevi într-o grupă, formată după nivel și după examenul vizat, nu după cartier. Fără constrângerea geografică, grupa poate fi omogenă — ceea ce contează mult mai mult pentru ritmul ședinței.`,
  },
  {
    title: 'Un singur profesor, de la început până la examen',
    body:
      'Nu există rotație de profesori și nici „supleanți”. Toate ședințele sunt susținute de Răzvan Rădulescu, ceea ce înseamnă că nimeni nu reîncepe evaluarea elevului de la zero la mijlocul anului.',
  },
];

const MatematicaBucuresti: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Meditații Matematică București — online, BAC și Evaluare Națională | AlgoMate"
        description={`Meditații de matematică pentru elevii din București: BAC (toate profilurile) și Evaluare Națională. Online, grupe de max ${GROUP_MAX_STUDENTS} elevi, ${priceGroupLabel}/ședință.`}
        path="/meditatii-matematica-bucuresti"
        jsonLd={[
          serviceMatematicaBucuresti,
          faqPageSchema(FAQS),
          breadcrumbSchema([
            { name: 'Meditații matematică București', path: '/meditatii-matematica-bucuresti' },
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
                § AlgoMate / București
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Online
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[2.5rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight max-w-3xl">
                Meditații <em className="italic text-[#e8734a] font-normal">matematică</em> București.
              </h1>
              <div className="flex items-center gap-3 shrink-0">
                <MapPin size={20} strokeWidth={1.5} className="text-[#e8734a]" />
                <p className="font-mono text-[11px] md:text-xs text-[#888] uppercase tracking-wider leading-relaxed">
                  → București &amp; Ilfov
                </p>
              </div>
            </div>

            <div className="max-w-3xl mt-12 md:mt-16 pt-10 border-t border-[#222] space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                <strong className="text-[#e4e4e4] font-medium">Meditații de matematică pentru
                elevii din București</strong>, pentru Bacalaureat — toate profilurile — și pentru
                Evaluarea Națională. Ședințele sunt susținute de Răzvan Rădulescu, din București,
                student la Politehnica și premiant la olimpiade și concursuri naționale.
              </p>
              <p>
                Ședințele se țin <strong className="text-[#e4e4e4] font-medium">online</strong>, și
                asta este o alegere, nu un compromis. Într-un oraș în care un drum dus-întors
                consumă mai mult decât durează lecția, formatul online nu îndepărtează profesorul
                de elev — îi returnează elevului o oră pe săptămână.
              </p>
              <p>
                Mai jos: ce înseamnă concret asta pentru un elev din București, cum sunt formate
                grupele, prețurile, și răspunsuri la întrebările care apar de obicei când
                pregătirea nu este față în față.
              </p>
            </div>
          </motion.div>

          {/* ── Why online, for a București student ────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Ce câștigă un elev din București</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Ora care se pierde pe drum.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Argumentul pentru meditațiile la domiciliu a fost întotdeauna prezența fizică.
              Merită pusă în balanță cu ce costă, într-un oraș de mărimea acestuia.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222] max-w-4xl">
              {LOCAL_POINTS.map((p) => (
                <div key={p.title} className="bg-[#0a0a0a] p-7 md:p-9">
                  <h3 className="font-sans font-semibold text-lg text-[#f0f0f0] mb-3">
                    {p.title}
                  </h3>
                  <p className="text-[0.95rem] text-[#999] leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── What is taught ─────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Pentru cine</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Două examene, patru programe.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Pentru <strong className="text-[#e4e4e4] font-medium">Bacalaureat</strong>, se
                lucrează pe programa profilului elevului — matematică-informatică, științele
                naturii, tehnologic sau pedagogic. Profilul decide programa, nu preferința; cea mai
                frecventă confuzie la începutul pregătirii este exact aici, iar cele patru variante
                sunt explicate pe pagina de{' '}
                <Link
                  to="/curriculum"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  curriculum
                </Link>
                .
              </p>
              <p>
                Pentru <strong className="text-[#e4e4e4] font-medium">Evaluarea Națională</strong>,
                pregătirea este construită în jurul tipurilor de subiecte care se repetă și al
                lacunelor din gimnaziu care se văd abia în clasa a VIII-a. Detaliile sunt pe pagina
                dedicată{' '}
                <Link
                  to="/meditatii-evaluare-nationala-matematica"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  Evaluării Naționale la matematică
                </Link>
                .
              </p>
              <p>
                Ședințele durează două ore și se țin în grupe de maximum {GROUP_MAX_STUDENTS} elevi
                ({priceGroupLabel}/ședință) sau individual ({priceIndividualLabel}/ședință). Ce
                include prețul și cum se alege între cele două formate sunt pe pagina de{' '}
                <Link
                  to="/servicii"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  servicii
                </Link>
                .
              </p>
            </div>
          </motion.section>

          {/* ── Scheduling, which is a genuinely local problem ──────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Grupe și program</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Cum se potrivește cu orarul de la școală.
            </h2>
            <div className="max-w-2xl space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                Multe școli din București lucrează în două schimburi, iar elevii din aceeași
                clasă ajung acasă la ore complet diferite de la un semestru la altul. Este motivul
                cel mai frecvent pentru care o grupă de meditații se destramă: nu lipsa de
                interes, ci un interval orar care nu mai convine nimănui după rotația
                schimburilor.
              </p>
              <p>
                Grupele se formează după nivel și după examenul vizat, iar intervalul se
                stabilește cu toți cei din grupă, nu impus dinainte. Ședințele fiind online,
                intervalul de seară este realist — nu depinde de cât durează traversarea orașului
                după ultima oră de curs. Când orarul se schimbă la semestru, ședința se poate muta
                fără ca cineva să renunțe.
              </p>
              <p>
                Elevii care nu se potrivesc cu nicio grupă ca program lucrează individual, la ore
                convenite de la săptămână la săptămână. Se poate trece de la un format la altul pe
                parcurs — câțiva elevi încep individual ca să recupereze, apoi continuă în grupă.
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
              Ce întreabă părinții din București.
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
              Prima ședință este o evaluare a nivelului real, după care primești un plan concret
              până la examen. Scrie în formular clasa, profilul și cât timp mai este până la probă
              — sau sună la{' '}
              <a
                href={PHONE_HREF}
                className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
              .
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

export default MatematicaBucuresti;
