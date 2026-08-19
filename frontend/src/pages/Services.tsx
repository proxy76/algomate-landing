import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Sigma, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import {
  courseInformaticaBac,
  courseIntroductionProgramming,
  courseMatematicaBac,
  servicesFaqSchema,
} from '../seo/structuredData';

const services = [
  {
    icon: Sigma,
    title: "Matematică BAC",
    tech: "M1 / M2 / M3",
    priceGroup: "100 RON",
    priceIndividual: "150 RON",
    description:
      "Pregătire intensivă pentru BAC la Matematică, adaptată profilului tău. Metodă structurată cu accent pe înțelegere, nu memorare.",
    startDate: "15 August",
    features: [
      "Algebră: ecuații, inecuații, sisteme",
      "Analiză matematică: limite, derivate, integrale",
      "Geometrie: sinteză și probleme tip",
      "Rezolvări pas-cu-pas de subiecte oficiale",
      "Teste de evaluare periodice",
    ],
  },
  {
    icon: Code,
    title: "Introducere în Informatică",
    tech: "Python / C++",
    priceGroup: "100 RON",
    priceIndividual: "150 RON",
    description:
      "Curs introductiv pentru clasa a 9-a. Învață bazele programării cu exerciții practice și proiecte reale care îți construiesc fundația pentru o carieră în tech.",
    startDate: "15 Iulie",
    features: [
      "Fundamentele programării (variabile, condiții, bucle)",
      "Funcții și modularizare",
      "Lucru cu fișiere și structuri de date",
      "Proiecte practice ghidate",
      "Introducere în gândirea algoritmică",
    ],
  },
  {
    icon: Terminal,
    title: "Informatică BAC",
    tech: "C / C++",
    priceGroup: "100 RON",
    priceIndividual: "150 RON",
    description:
      "Pregătire completă pentru examenul de Bacalaureat la Informatică. Acoperim toți algoritmii, structurile de date și tipurile de subiecte din programa oficială.",
    startDate: "15 August",
    features: [
      "Algoritmi fundamentali și avansați",
      "Structuri de date (arbori, grafuri, liste)",
      "Rezolvări complete de subiecte BAC",
      "Simulări de examen săptămânale",
      "Feedback personalizat pe cod",
    ],
  },
];

/** How a session actually runs. The single most-asked question before booking. */
const sessionFlow = [
  {
    span: '0–15 min',
    title: 'Tema și ce a rămas neclar',
    body: 'Ședința începe cu tema de data trecută. Nu ca formalitate: greșelile din temă arată exact unde s-a rupt înțelegerea, iar acolo se intervine.',
  },
  {
    span: '15–60 min',
    title: 'Noțiunea nouă, construită de la zero',
    body: 'Fiecare concept pornește de la problema pe care o rezolvă, nu de la definiție. La matematică se scrie pe tabla digitală partajată; la informatică se scrie cod care compilează și rulează în timp real.',
  },
  {
    span: '60–100 min',
    title: 'Probleme, în ordinea dificultății',
    body: 'Se lucrează pe subiecte oficiale din anii anteriori. Primele se rezolvă împreună, ultimele singur, cu intervenție doar când elevul se blochează.',
  },
  {
    span: '100–120 min',
    title: 'Recapitulare și temă',
    body: 'Se reia ce s-a făcut, se notează ce a rămas fragil, și se stabilește tema. Elevul primește notițele ședinței în scris.',
  },
];

/** Group vs one-on-one. Written to help someone choose, not to upsell. */
const formats = [
  {
    name: 'În grupă',
    price: '100 RON',
    unit: 'ședință · max 3 elevi',
    fit: 'Potrivit când',
    points: [
      'Elevul are baza materiei și vrea să o consolideze',
      'Ritmul de lucru e apropiat de al colegilor din grupă',
      'Întrebările altora ajută — de multe ori sunt aceleași',
      'Bugetul contează, iar diferența de preț e semnificativă',
    ],
  },
  {
    name: 'Individual',
    price: '150 RON',
    unit: 'ședință · unu la unu',
    fit: 'Potrivit când',
    points: [
      'Sunt lacune mari de recuperat, din ani anteriori',
      'Obiectivul e specific: olimpiadă, admitere, un anumit tip de subiect',
      'Elevul nu pune întrebări în prezența altora',
      'Programul e imprevizibil și are nevoie de flexibilitate',
    ],
  },
];

/** What the price covers. Removes the "what am I actually paying for" doubt. */
const included = [
  'Ședința propriu-zisă de 2 ore, săptămânal',
  'Notițele ședinței, trimise în scris după fiecare întâlnire',
  'Temă pentru acasă, corectată individual înainte de ședința următoare',
  'Subiecte oficiale din anii anteriori, selectate pe capitol',
  'Simulări de examen în condiții de timp real, înainte de BAC',
  'Răspuns la întrebări între ședințe, pe mesaje',
];

/** Who this is not for. Counterintuitive, but it is what builds trust. */
const notForYou = [
  'Cauți pe cineva care să rezolve temele în locul elevului. Tema se corectează împreună, nu se face în locul lui.',
  'Mai sunt două săptămâni până la examen și materia nu a fost parcursă deloc. În acel interval se consolidează ce există, nu se construiește de la zero.',
  'Elevul nu vrea să facă meditații și vine pentru că insistă părintele. Fără minimum de acord din partea lui, ședințele nu produc nimic.',
  'Ai nevoie de pregătire la altă materie decât matematică sau informatică.',
];

const faqs = [
  {
    q: 'Care este diferența dintre meditațiile în grupă și cele individuale?',
    a: 'În grupă (maximum 3 elevi, 100 RON/ședință) elevii lucrează pe aceeași programă și învață și din întrebările celorlalți. Individual (150 RON/ședință) ritmul și conținutul se adaptează complet elevului, ceea ce ajută când sunt lacune mari de recuperat sau când pregătirea vizează un obiectiv specific, cum ar fi o olimpiadă.',
  },
  {
    q: 'Cât durează o ședință de meditații?',
    a: 'O ședință durează 2 ore, de regulă o dată pe săptămână. În perioada de dinaintea examenului, frecvența poate crește la două ședințe pe săptămână.',
  },
  {
    q: 'Elevul meu stă foarte prost la matematică. Are sens să înceapă acum?',
    a: 'Da, dacă mai este timp până la examen. Prima ședință este o evaluare a nivelului real, iar planul de recuperare pornește de la ce lipsește efectiv, nu de la programa clasei. Recuperarea unor lacune acumulate în mai mulți ani cere însă timp: cu câteva săptămâni înainte de examen se poate consolida ce există deja, nu se poate construi de la zero.',
  },
  {
    q: 'Cum se desfășoară o ședință online?',
    a: 'Ședințele au loc prin videoconferință, cu tablă digitală partajată pe care se scrie în timp real. Pentru informatică se lucrează direct în cod, cu compilare și rulare pe loc. La final, elevul primește notițele ședinței și tema pentru acasă.',
  },
  {
    q: 'Ce se întâmplă dacă elevul lipsește de la o ședință?',
    a: 'O ședință anunțată cu cel puțin 24 de ore înainte se reprogramează fără costuri. La meditațiile în grupă, elevul primește materialele și tema ședinței pierdute.',
  },
  {
    q: 'Cu cât timp înainte de BAC ar trebui începută pregătirea?',
    a: 'Ideal, din septembrie–octombrie al clasei a XII-a, ceea ce lasă timp pentru parcurgerea întregii programe și pentru simulări. Pregătirea începută în primăvară rămâne utilă, dar se concentrează pe tipurile de subiecte care aduc cele mai multe puncte, nu pe acoperirea completă a materiei.',
  },
];

/** Section heading, matching the rule-and-label pattern used across the site. */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-baseline gap-4 mb-10">
    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#e8734a] whitespace-nowrap">
      {children}
    </span>
    <span className="h-px flex-1 bg-[#222]" />
  </div>
);

const Services: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Servicii Meditații BAC — Informatică C++, Matematică M1/M2/M3 | AlgoMate"
        description="Meditații de matematică BAC (M1/M2/M3), informatică BAC (C/C++) și introducere în programare (Python). 100 RON/ședință în grupe de max 3 elevi, 150 RON individual."
        path="/servicii"
        jsonLd={[
          courseMatematicaBac,
          courseIntroductionProgramming,
          courseInformaticaBac,
          servicesFaqSchema,
        ]}
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Servicii
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Anul 2026
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[3rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight">
                Meditații <em className="italic text-[#e8734a] font-normal">BAC.</em>
              </h1>
              <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
                → Trei programe de pregătire, fiecare adaptat nevoilor tale.
              </p>
            </div>

            {/* Standfirst — the positioning paragraph, and the first place a
                reader (or a crawler) sees what this page is actually about. */}
            <div className="max-w-3xl mt-12 md:mt-16 pt-10 border-t border-[#222] space-y-5 text-[#b8b8b8] leading-relaxed">
              <p>
                AlgoMate oferă <strong className="text-[#e4e4e4] font-medium">meditații de
                matematică și informatică</strong> pentru Bacalaureat și Evaluarea Națională,
                online, din București. Ședințele sunt susținute de Răzvan Rădulescu — student
                la Politehnica din București, programator și premiant la olimpiade naționale
                de informatică.
              </p>
              <p>
                Programele acoperă <strong className="text-[#e4e4e4] font-medium">matematică
                M1, M2 și M3</strong>, <strong className="text-[#e4e4e4] font-medium">informatică
                în C și C++</strong>, și un curs de introducere în programare pentru clasa a
                IX-a. Se lucrează în grupe de maximum trei elevi sau individual, în ședințe de
                două ore.
              </p>
              <p>
                Mai jos găsești ce se predă la fiecare program, prețul, cum decurge efectiv o
                ședință și — la fel de important — în ce situații pregătirea aceasta{' '}
                <em className="text-[#e4e4e4] not-italic font-medium">nu</em> este alegerea
                potrivită.
              </p>
            </div>
          </motion.div>

          {/* Service cards */}
          <div className="border-t border-[#222]">
            {services.map((service, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative px-5 sm:px-6 md:px-10 py-12 sm:py-14 md:py-20 border-b border-[#222]"
              >
                {/* Top strip */}
                <div className="flex items-center justify-between gap-3 mb-8 md:mb-10 flex-wrap">
                  <div className="flex items-center gap-4 md:gap-5">
                    <span className="font-mono text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase">
                      / 00{idx + 1}
                    </span>
                    <service.icon size={22} strokeWidth={1.5} className="text-[#e8734a]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                  {/* Left — primary */}
                  <div className="md:col-span-7">
                    <h2 className="font-sans font-semibold text-[1.65rem] sm:text-3xl md:text-4xl text-[#f0f0f0] mb-3 leading-[1.15] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="font-mono text-[11px] text-[#e8734a] tracking-[0.3em] uppercase mb-8">
                      {service.tech}
                    </p>

                    <p className="text-base text-[#bbb] leading-relaxed mb-10 max-w-xl">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="mb-10 pb-10 border-b border-dashed border-[#222]">
                      <div className="font-mono text-[10px] tracking-[0.3em] text-[#666] uppercase mb-5">
                        Preț / ședință
                      </div>
                      <div className="flex flex-wrap items-end gap-x-8 md:gap-x-10 gap-y-6">
                        <div>
                          <div className="font-display font-semibold text-[2.75rem] sm:text-5xl md:text-6xl text-[#e8734a] leading-none">
                            {service.priceGroup}
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mt-3">
                            Grupă · max 3 elevi
                          </div>
                        </div>
                        <span className="hidden sm:block w-px h-16 bg-[#222] mb-1" />
                        <div>
                          <div className="font-display font-semibold text-[2rem] sm:text-4xl md:text-[2.75rem] text-[#f0f0f0] leading-none">
                            {service.priceIndividual}
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mt-3">
                            Individual
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                        <Calendar size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                        Start · {service.startDate}
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                        <Clock size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                        2h / sesiune
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                        <Users size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                        Grupe de max 3
                      </div>
                    </div>

                    <Link to="/inscriere">
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 inline-flex items-center gap-3"
                      >
                        Înscrie-te
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Right — features */}
                  <div className="md:col-span-5 md:pl-10 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-dashed md:border-solid border-[#222]">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="font-mono text-[10px] text-[#e8734a] uppercase tracking-[0.3em]">
                        Ce vei învăța
                      </span>
                      <span className="h-px flex-1 bg-[#222]" />
                    </div>
                    <ul>
                      {service.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + fIdx * 0.05 + 0.2, duration: 0.4 }}
                          className="flex items-start gap-5 py-4 border-b border-dashed border-[#222] last:border-b-0"
                        >
                          <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-[0.15em] pt-0.5 w-6 shrink-0">
                            {String(fIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm text-[#ccc] leading-relaxed flex-1">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* ── How a session runs ─────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Cum decurge o ședință</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Două ore, în patru etape.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Structura este aceeași de fiecare dată, la matematică și la informatică. Nu
              pentru rigiditate, ci pentru că un elev care știe ce urmează vine pregătit.
            </p>

            <div className="border-t border-[#222]">
              {sessionFlow.map((step) => (
                <div
                  key={step.span}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 border-b border-[#222]"
                >
                  <div className="md:col-span-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8734a] tabular-nums">
                      {step.span}
                    </span>
                  </div>
                  <div className="md:col-span-9 max-w-2xl">
                    <h3 className="font-sans font-semibold text-lg text-[#e4e4e4] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[0.95rem] text-[#999] leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Group vs one-on-one ────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Grupă sau individual</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Care dintre ele ți se potrivește.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-12">
              Diferența de preț este reală, așa că merită aleasă în cunoștință de cauză.
              Individual nu înseamnă automat mai bine — înseamnă altceva.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
              {formats.map((f) => (
                <div key={f.name} className="bg-[#0a0a0a] p-7 md:p-9">
                  <h3 className="font-sans font-semibold text-xl text-[#f0f0f0] mb-5">
                    {f.name}
                  </h3>
                  <div className="font-display font-semibold text-4xl md:text-5xl text-[#e8734a] leading-none mb-2">
                    {f.price}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#777] mb-8">
                    {f.unit}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666] mb-4">
                    {f.fit}
                  </div>
                  <ul className="space-y-3">
                    {f.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-[0.92rem] text-[#aaa] leading-relaxed"
                      >
                        <span className="text-[#e8734a] shrink-0" aria-hidden>—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-[0.95rem] text-[#888] leading-relaxed max-w-2xl mt-8">
              Se poate trece de la un format la altul pe parcurs. Câțiva elevi încep individual
              ca să recupereze, apoi continuă în grupă.
            </p>
          </motion.section>

          {/* ── What the price includes ────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Ce include prețul</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
              {included.map((item, i) => (
                <div
                  key={item}
                  className="flex gap-4 py-4 border-b border-dashed border-[#222]"
                >
                  <span className="font-mono text-[10px] text-[#666] tabular-nums pt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.95rem] text-[#bbb] leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Who this is not for ────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <SectionLabel>Cui nu i se potrivește</SectionLabel>
            <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-6 max-w-2xl">
              Când nu are sens să începi.
            </h2>
            <p className="text-[#b8b8b8] leading-relaxed max-w-2xl mb-10">
              O ședință introductivă pierdută costă timp de ambele părți. E mai onest spus
              dinainte.
            </p>
            <ul className="max-w-2xl border-t border-[#222]">
              {notForYou.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 py-5 border-b border-[#222] text-[0.95rem] text-[#999] leading-relaxed"
                >
                  <span className="text-[#555] shrink-0 font-mono text-xs pt-1" aria-hidden>
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
            <div className="max-w-3xl border-t border-[#222]">
              {faqs.map((f) => (
                <details key={f.q} className="group border-b border-[#222] py-6">
                  <summary className="flex items-start gap-5 cursor-pointer list-none font-sans font-medium text-[1.05rem] text-[#e4e4e4] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8734a]">
                    <span
                      className="text-[#e8734a] font-mono text-sm shrink-0 pt-1 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                    <span className="flex-1">{f.q}</span>
                  </summary>
                  <p className="text-[0.95rem] text-[#999] leading-relaxed mt-4 pl-9 max-w-2xl">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="max-w-3xl mt-12 pt-10 border-t border-[#222]">
              <p className="text-[#b8b8b8] leading-relaxed mb-7">
                Ai o întrebare care nu e aici? Scrie-o în formular — se răspunde în 24 de ore,
                fără obligația de a te înscrie. Poți vedea și{' '}
                <Link
                  to="/curriculum"
                  className="text-[#e8734a] border-b border-[#e8734a]/30 hover:border-[#e8734a] transition-colors"
                >
                  programa completă pentru BAC
                </Link>{' '}
                înainte să decizi.
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
            </div>
          </motion.section>

          {/* Closing flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4 font-mono text-[9px] tracking-[0.4em] text-[#444] uppercase"
          >
            <span className="h-px w-16 bg-[#222]" />
            <span>◆ Fin · AlgoMate MMXXVI ◆</span>
            <span className="h-px w-16 bg-[#222]" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
