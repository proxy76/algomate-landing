import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import {
  Sigma,
  Terminal,
  Code2,
  Compass,
  Flag,
  ArrowDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../seo/structuredData';

/* ----------------------------------------------------------------------------
 * Data
 * -------------------------------------------------------------------------- */

type Topic = {
  chapter: string;
  title: string;
  description: string;
  items: string[];
  duration: string;
};

type Course = {
  id: 'mate-bac' | 'info-bac' | 'intro-info';
  label: string;
  tag: string;
  blurb: string;
  icon: LucideIcon;
  origin: string;
  destination: string;
  topics: Topic[];
};

const COURSES: Course[] = [
  {
    id: 'mate-bac',
    label: 'Mate BAC',
    tag: 'M1 / M2',
    blurb: 'Programă BAC · analiză, algebră, geometrie',
    icon: Sigma,
    origin: 'Punct de pornire',
    destination: 'Examenul de Bacalaureat',
    topics: [
      {
        chapter: '01',
        title: 'Mulțimi, ecuații, inecuații',
        description:
          'Fundația pe care se sprijină restul programei — fără ea, orice capitol următor se prăbușește.',
        items: [
          'Numere reale, module, radicali',
          'Ecuații de gradul II și sisteme',
          'Inecuații — semnul trinomului',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '02',
        title: 'Funcții — proprietăți, grafice',
        description:
          'Limbajul în care vei gândi matematica de liceu. Domeniu, codomeniu, monotonie, paritate, inversă.',
        items: [
          'Funcții elementare & compunere',
          'Monotonie, bijectivitate, inversă',
          'Citirea unui grafic',
        ],
        duration: '4 săpt.',
      },
      {
        chapter: '03',
        title: 'Șiruri de numere',
        description:
          'Progresii, recurențe, mărginire și convergență. Primul pas real către analiză.',
        items: [
          'Progresii aritmetice și geometrice',
          'Șiruri monotone și mărginite',
          'Recurențe liniare',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '04',
        title: 'Limite de funcții',
        description:
          'Instrumentul care deschide calculul diferențial. Nedeterminări, asimptote, cazuri speciale.',
        items: [
          'Limite laterale, la ∞, nedeterminări',
          'Limite remarcabile (sin x / x, e)',
          'Asimptote orizontale, verticale, oblice',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '05',
        title: 'Derivate — reguli și aplicații',
        description:
          'Panta tangentei, viteza instantanee, fundația studiului funcțiilor.',
        items: [
          'Regulile de derivare',
          'Tangenta la grafic, puncte critice',
          'Aproximări liniare',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '06',
        title: 'Studiul funcțiilor',
        description:
          'Puneri cap la cap. Tablou de variație, concavitate, extreme, trasarea graficului.',
        items: [
          'Tabloul de variație complet',
          'Concavitate, puncte de inflexiune',
          'Probleme de extrem',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '07',
        title: 'Integrale',
        description:
          'Primitive, integrale definite, arii. Tot ce vine după derivată, în oglindă.',
        items: [
          'Primitive uzuale, substituție',
          'Integrarea prin părți',
          'Aplicații — arii și volume',
        ],
        duration: '4 săpt.',
      },
      {
        chapter: '08',
        title: 'Geometrie — sinteză',
        description:
          'Vectori, plane, drepte. Reluare M1 / M2 pentru subiectele de geometrie din variante.',
        items: [
          'Vectori în plan și spațiu',
          'Produse scalar & vectorial',
          'Locuri geometrice',
        ],
        duration: '3 săpt.',
      },
    ],
  },
  {
    id: 'info-bac',
    label: 'Info BAC',
    tag: 'C / C++',
    blurb: 'Programă BAC Informatică · intensiv & neintensiv',
    icon: Terminal,
    origin: 'Setup C/C++',
    destination: 'Examen scris & subiect III',
    topics: [
      {
        chapter: '01',
        title: 'Algoritmi elementari',
        description:
          'Cifre, divizori, prime, cmmdc. Rutina de dimineață a oricărui programator de BAC.',
        items: [
          'Prelucrări pe cifre',
          'Divizibilitate, prime, Eratostene',
          'Algoritmul lui Euclid',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '02',
        title: 'Tablouri 1D și 2D',
        description:
          'Sortări, căutări, parcurgeri de matrice. Rezolvi 70% din subiectul II cu instrumentele de aici.',
        items: [
          'Sortări O(n²) și binară',
          'Parcurgeri pe matrice',
          'Interclasare',
        ],
        duration: '4 săpt.',
      },
      {
        chapter: '03',
        title: 'Șiruri de caractere',
        description:
          'Manipulare string, cuvinte, palindroame, conversii. Capitol favorit la subiectul II.',
        items: [
          'strlen, strcpy, strcat, strstr',
          'Despărțire în cuvinte',
          'Conversii număr ↔ șir',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '04',
        title: 'Subprograme',
        description:
          'Apel prin valoare vs. referință, funcții care întorc valori, pointeri. Baza modularizării.',
        items: [
          'Transmitere prin valoare / referință',
          'Funcții cu tablouri & șiruri',
          'Pointeri ca argumente',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '05',
        title: 'Recursivitate',
        description:
          'Bază și pas inductiv. Fibonacci, factorial, backtracking. Gândirea în arbori de apel.',
        items: [
          'Recurențe directe & indirecte',
          'Divide et impera',
          'Backtracking — generări',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '06',
        title: 'Structuri (struct)',
        description:
          'Înregistrări, tablouri de structuri, sortare după câmpuri. Date "reale", nu doar numere.',
        items: [
          'Definire și inițializare',
          'Tablouri de struct',
          'Sortări după mai multe criterii',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '07',
        title: 'Fișiere text',
        description:
          'Intrare/ieșire din fișier, delimitatori, formate. Punte între cod și lumea reală.',
        items: [
          'fstream / ifstream / ofstream',
          'Citire până la EOF',
          'Prelucrări pe fișiere mari',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '08',
        title: 'Alocare dinamică & liste',
        description:
          'Memorie la cerere, new/delete, liste simplu și dublu înlănțuite.',
        items: [
          'Alocare dinamică de tablouri',
          'Liste simplu și dublu înlănțuite',
          'Inserări și ștergeri',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '09',
        title: 'Arbori binari',
        description:
          'Reprezentare, parcurgeri, arbori de căutare. Apare garantat la subiectul III.',
        items: [
          'Parcurgeri preordine / inordine / postordine',
          'Arbori binari de căutare',
          'Operații: inserare, ștergere',
        ],
        duration: '3 săpt.',
      },
      {
        chapter: '10',
        title: 'Grafuri',
        description:
          'Reprezentări, BFS, DFS, conexitate. Capitolul final, cel care face diferența între 9 și 10.',
        items: [
          'Matrice / liste de adiacență',
          'Parcurgeri DF și BF',
          'Componente conexe, ciclu',
        ],
        duration: '4 săpt.',
      },
    ],
  },
  {
    id: 'intro-info',
    label: 'Intro în Info',
    tag: 'Python / C++',
    blurb: 'Pentru clasele IX–X · fără experiență prealabilă',
    icon: Code2,
    origin: 'Primul „hello, world"',
    destination: 'Pregătit pentru clasa a XI-a',
    topics: [
      {
        chapter: '01',
        title: 'Variabile și tipuri de date',
        description:
          'Int, float, string, bool. Cum gândește calculatorul despre informație.',
        items: [
          'Declarații și atribuiri',
          'Citire & afișare',
          'Conversii de tip',
        ],
        duration: '1 săpt.',
      },
      {
        chapter: '02',
        title: 'Operatori și expresii',
        description:
          'Aritmetici, logici, de comparație. Prioritate și asociativitate.',
        items: [
          'Operatori aritmetici & modulo',
          'Operatori logici & relaționali',
          'Prioritate & paranteze',
        ],
        duration: '1 săpt.',
      },
      {
        chapter: '03',
        title: 'Structuri condiționale',
        description:
          'if / else / elif. Ramificarea logicii. Primul pas către programe care „gândesc".',
        items: [
          'if / else / else if',
          'switch / match',
          'Condiții compuse',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '04',
        title: 'Structuri repetitive',
        description:
          'for, while, do-while. Automatizarea repetiției — puterea reală a programării.',
        items: [
          'for, while, do-while',
          'break & continue',
          'Bucle imbricate',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '05',
        title: 'Funcții și modularizare',
        description:
          'Abstracții, argumente, valori de return. Împarte problema, apoi compune soluția.',
        items: [
          'Definire & apel',
          'Parametri & return',
          'Scope și variabile locale',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '06',
        title: 'Lucru cu fișiere',
        description:
          'Scrie & citește persistent. Programul nu mai uită totul la închidere.',
        items: [
          'open / read / write',
          'Moduri de deschidere',
          'Parsare text',
        ],
        duration: '1 săpt.',
      },
      {
        chapter: '07',
        title: 'Liste și structuri de date',
        description:
          'Liste, tupluri, dicționare. Primele colecții de date.',
        items: [
          'Liste & indexare',
          'Dicționare & seturi',
          'Iterare',
        ],
        duration: '2 săpt.',
      },
      {
        chapter: '08',
        title: 'Sortare și căutare',
        description:
          'Primii algoritmi clasici. Bubble, selection, binary search. Punți către clasa a XI-a.',
        items: [
          'Bubble, selection, insertion',
          'Căutare liniară & binară',
          'Complexitate — O(n), O(n²), O(log n)',
        ],
        duration: '2 săpt.',
      },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * Roadmap
 * -------------------------------------------------------------------------- */

const Roadmap: React.FC<{ course: Course }> = ({ course }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 20%'],
  });

  const trunkLength = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.6,
  });

  const trunkGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0.15, 0.6, 0.6, 0.15]
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-5xl px-6 pb-28 pt-4"
    >
      {/* Central trunk — drawn as user scrolls */}
      <div className="pointer-events-none absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2">
        {/* Background rail */}
        <div className="absolute inset-0 w-px bg-[linear-gradient(to_bottom,transparent_0%,#2a2a2a_8%,#2a2a2a_92%,transparent_100%)]" />

        {/* Glow rail */}
        <motion.div
          className="absolute inset-0 w-px blur-[2px]"
          style={{
            opacity: trunkGlowOpacity,
            background:
              'linear-gradient(to bottom, transparent, rgba(232,115,74,0.55) 20%, rgba(232,115,74,0.55) 80%, transparent)',
          }}
        />

        {/* Drawing line */}
        <motion.div
          className="absolute left-0 top-0 w-px origin-top"
          style={{
            scaleY: trunkLength,
            background:
              'linear-gradient(to bottom, #e8734a 0%, #f4a577 60%, #e8734a 100%)',
            height: '100%',
            boxShadow: '0 0 12px rgba(232,115,74,0.55)',
          }}
        />
      </div>

      {/* Origin marker */}
      <OriginNode label={course.origin} icon={Compass} />

      {/* Topic nodes */}
      <div className="relative">
        {course.topics.map((topic, idx) => (
          <TopicRow
            key={`${course.id}-${topic.chapter}`}
            topic={topic}
            index={idx}
            total={course.topics.length}
          />
        ))}
      </div>

      {/* Terminal marker */}
      <TerminalNode label={course.destination} />
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * Row components
 * -------------------------------------------------------------------------- */

const OriginNode: React.FC<{ label: string; icon: LucideIcon }> = ({
  label,
  icon: Icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-6 flex items-center gap-4 pl-16 md:justify-center md:pl-0"
    >
      {/* Dot on trunk */}
      <span
        className="absolute left-6 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#e8734a] bg-[#0a0a0a] md:left-1/2 shadow-[0_0_20px_rgba(232,115,74,0.6)]"
        aria-hidden="true"
      >
        <span className="absolute inset-1 rounded-full bg-[#e8734a]" />
      </span>

      <div className="flex items-center gap-3 rounded-full border border-[#2a2a2a] bg-[#111] px-4 py-1.5 backdrop-blur-sm">
        <Icon size={13} className="text-[#e8734a]" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#888] font-mono">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

const TerminalNode: React.FC<{ label: string }> = ({ label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-8 flex items-center gap-4 pl-16 md:justify-center md:pl-0"
    >
      <div className="relative z-10 flex items-center gap-3 rounded-lg border border-[#e8734a]/40 bg-[#e8734a]/10 px-5 py-2.5">
        <Flag size={14} className="text-[#e8734a]" />
        <span
          className="text-sm text-[#f0f0f0] tracking-tight"
          style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic' }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
};

const TopicRow: React.FC<{
  topic: Topic;
  index: number;
  total: number;
}> = ({ topic, index, total }) => {
  // On desktop: odd-index cards sit on the right of the trunk, even on the left.
  // On mobile: all cards sit on the right of the trunk (trunk at left-6).
  const sideRight = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
      }}
      className="relative py-5 md:py-10"
    >
      <div
        className={`
          relative ml-20 md:ml-0 md:w-[calc(50%-3.5rem)]
          ${sideRight
            ? 'md:ml-[calc(50%+3.5rem)]'
            : 'md:mr-[calc(50%+3.5rem)]'}
        `}
      >
        {/* Mobile branch — trunk always on the left of the card */}
        <BranchSVG trunkOnLeft={true} className="md:hidden" />

        {/* Desktop branch — depends on card side */}
        <BranchSVG
          trunkOnLeft={sideRight}
          className="hidden md:block"
        />

        <TopicCard topic={topic} total={total} sideRight={sideRight} />
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------------------
 * Branch SVG — curved connector from trunk to card
 *
 * `trunkOnLeft`: whether the trunk sits on the LEFT of this SVG.
 *   If true, path goes from (0, yTrunk) out to (W, yCard) — curving to the right.
 *   If false, path goes from (W, yTrunk) out to (0, yCard) — curving to the left.
 *
 * The SVG is absolutely positioned outside the card's left or right edge, so
 * the trunk endpoint sits exactly on the trunk line and the card endpoint
 * meets the card's edge.
 * -------------------------------------------------------------------------- */

const BranchSVG: React.FC<{
  trunkOnLeft: boolean;
  className?: string;
}> = ({ trunkOnLeft, className = '' }) => {
  // 56px wide = 3.5rem — matches the gap between trunk and card column.
  const W = 56;
  const H = 160;
  const yTrunk = 44;
  const yCard = H - 28;

  const path = trunkOnLeft
    ? `M 0 ${yTrunk} C ${W * 0.45} ${yTrunk + 2}, ${W * 0.55} ${yCard - 20}, ${W} ${yCard}`
    : `M ${W} ${yTrunk} C ${W * 0.55} ${yTrunk + 2}, ${W * 0.45} ${yCard - 20}, 0 ${yCard}`;

  // Position the SVG on the trunk-facing side of the card.
  const positionClass = trunkOnLeft
    ? 'left-[-3.5rem]'
    : 'right-[-3.5rem]';

  const gradientId = `branch-grad-${trunkOnLeft ? 'l' : 'r'}`;
  const trunkX = trunkOnLeft ? 0 : W;
  const cardX = trunkOnLeft ? W : 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className={`pointer-events-none absolute top-0 h-[160px] w-14 ${positionClass} ${className}`}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1={trunkOnLeft ? '0%' : '100%'}
          y1="0%"
          x2={trunkOnLeft ? '100%' : '0%'}
          y2="100%"
        >
          <stop offset="0%" stopColor="#e8734a" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#e8734a" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e8734a" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Soft blurred glow behind the path */}
      <motion.path
        d={path}
        fill="none"
        stroke="#e8734a"
        strokeOpacity="0.25"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ filter: 'blur(4px)' }}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main branch path */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1 },
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Junction dot — sits ON the trunk */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${trunkX}px ${yTrunk}px` }}
      >
        <circle
          cx={trunkX}
          cy={yTrunk}
          r="8"
          fill="#e8734a"
          fillOpacity="0.18"
          style={{ filter: 'blur(3px)' }}
        />
        <circle
          cx={trunkX}
          cy={yTrunk}
          r="4.5"
          fill="#0a0a0a"
          stroke="#e8734a"
          strokeWidth="1.5"
        />
        <circle cx={trunkX} cy={yTrunk} r="2" fill="#e8734a" />
      </motion.g>

      {/* Leaf dot at card-end */}
      <motion.circle
        cx={cardX}
        cy={yCard}
        r="2.5"
        fill="#e8734a"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        }}
        transition={{ delay: 0.7, duration: 0.4 }}
      />
    </svg>
  );
};

/* ----------------------------------------------------------------------------
 * Topic card
 * -------------------------------------------------------------------------- */

const TopicCard: React.FC<{
  topic: Topic;
  total: number;
  sideRight: boolean;
}> = ({ topic, total, sideRight }) => {
  // On desktop: when card is on the LEFT of the trunk (sideRight = false),
  // mirror content so the chapter number & text align toward the trunk (right side).
  const mirrorDesktop = !sideRight;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, x: sideRight ? -10 : 10 },
        visible: { opacity: 1, y: 0, x: 0 },
      }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${mirrorDesktop ? 'md:text-right' : ''
        }`}
    >
      {/* Meta row */}
      <div
        className={`mb-3 flex items-center gap-3 ${mirrorDesktop ? 'md:flex-row-reverse' : ''
          }`}
      >
        <span
          className="text-[54px] leading-none text-[#e8734a] tabular-nums"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 300,
            letterSpacing: '-0.04em',
          }}
        >
          {topic.chapter}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-[#555]"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          / {String(total).padStart(2, '0')}
        </span>
        <span
          className={`ml-auto text-[10px] tracking-[0.25em] uppercase text-[#666] hidden sm:inline-block ${mirrorDesktop ? 'md:ml-0 md:mr-auto' : ''
            }`}
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {topic.duration}
        </span>
      </div>

      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-xl border border-[#232323] bg-[#0f0f0f]/85 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-[#e8734a]/40 group-hover:bg-[#121212]"
        style={{
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.02) inset, 0 30px 60px -20px rgba(0,0,0,0.55)',
        }}
      >
        {/* Ambient inner glow on the trunk-facing side */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 w-24 opacity-60 ${sideRight ? 'left-0' : 'md:right-0 left-0 md:left-auto'
            }`}
          style={{
            background: sideRight
              ? 'linear-gradient(to right, rgba(232,115,74,0.07), transparent)'
              : 'linear-gradient(to left, rgba(232,115,74,0.07), transparent)',
          }}
        />

        {/* Corner tick — on the trunk-facing corner */}
        <span
          className={`absolute top-3 h-3 w-3 border-[#e8734a]/60 ${sideRight
            ? 'left-3 border-l border-t'
            : 'left-3 border-l border-t md:left-auto md:right-3 md:border-l-0 md:border-r'
            }`}
          aria-hidden="true"
        />

        <h3
          className="relative mb-2 text-[22px] font-medium leading-tight text-[#f0f0f0] tracking-tight"
          style={{ fontFamily: '"Fraunces", serif' }}
        >
          {topic.title}
        </h3>

        <p className="relative mb-5 text-[13.5px] leading-relaxed text-[#9a9a9a]">
          {topic.description}
        </p>

        <ul
          className={`relative space-y-2 text-[12.5px] text-[#bbb] ${mirrorDesktop ? 'md:text-right' : ''
            }`}
        >
          {topic.items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-2.5 ${mirrorDesktop ? 'md:flex-row-reverse' : ''
                }`}
            >
              <span
                className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-[#e8734a]/75"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Duration (mobile, shown inside card) */}
        <div
          className="relative mt-5 border-t border-[#1c1c1c] pt-3 text-[10px] uppercase tracking-[0.25em] text-[#555] sm:hidden"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {topic.duration}
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------------------
 * Hero + course tabs
 * -------------------------------------------------------------------------- */

const CourseTabs: React.FC<{
  active: Course['id'];
  onChange: (id: Course['id']) => void;
}> = ({ active, onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Programe"
      className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-[#222] bg-[#0d0d0d]/80 p-2 backdrop-blur-sm sm:flex-row"
    >
      {COURSES.map((course) => {
        const isActive = active === course.id;
        const Icon = course.icon;
        return (
          <button
            key={course.id}
            id={`course-tab-${course.id}`}
            onClick={() => onChange(course.id)}
            className={`group relative flex-1 overflow-hidden rounded-xl px-5 py-4 text-left transition-colors duration-300 ${isActive
              ? 'bg-[#e8734a]/10'
              : 'hover:bg-[#151515]'
              }`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`course-panel-${course.id}`}
          >
            {/* Active indicator — animated background */}
            {isActive && (
              <motion.span
                layoutId="course-tab-active"
                className="absolute inset-0 rounded-xl border border-[#e8734a]/40"
                style={{
                  background:
                    'radial-gradient(120% 120% at 0% 0%, rgba(232,115,74,0.12), transparent 60%)',
                  boxShadow:
                    '0 0 0 1px rgba(232,115,74,0.15) inset, 0 10px 30px -10px rgba(232,115,74,0.25)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                aria-hidden="true"
              />
            )}

            <div className="relative flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${isActive
                  ? 'border-[#e8734a]/50 bg-[#e8734a]/15 text-[#e8734a]'
                  : 'border-[#222] bg-[#0f0f0f] text-[#888] group-hover:text-[#ccc]'
                  }`}
              >
                <Icon size={16} />
              </span>
              <div className="flex flex-col">
                <span
                  className={`text-[15px] font-medium transition-colors duration-300 ${isActive ? 'text-[#f0f0f0]' : 'text-[#ccc]'
                    }`}
                  style={{ fontFamily: '"Fraunces", serif' }}
                >
                  {course.label}
                </span>
                <span
                  className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#666]"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {course.tag}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * Main page
 * -------------------------------------------------------------------------- */

const Curriculum: React.FC = () => {
  const [activeId, setActiveId] = useState<Course['id']>('mate-bac');
  const active = COURSES.find((c) => c.id === activeId)!;

  return (
    <PageTransition>
      <SEO
        title="Curriculum Meditații — Programa Completă BAC Informatică & Matematică | AlgoMate"
        description="Descoperă programa detaliată: algoritmi, structuri de date, C++, algebră, analiză matematică, integrale. Cursuri aliniate cu cerințele oficiale BAC."
        path="/curriculum"
        jsonLd={breadcrumbSchema([{ name: 'Curriculum', path: '/curriculum' }])}
      />
      <div className="relative min-h-screen overflow-x-hidden pt-24 text-[#f0f0f0]">
        {/* Blueprint grid background layer — adds schematic depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse at 50% 30%, #000 30%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at 50% 30%, #000 30%, transparent 80%)',
          }}
        />

        {/* Hero */}
        <section className="relative mx-auto max-w-5xl px-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#333]" />
              <span
                className="text-[10px] uppercase tracking-[0.4em] text-[#666]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Curriculum · v.2026
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#333]" />
            </div>

            <h1
              className="mb-5 text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-[-0.03em] text-[#f0f0f0]"
              style={{ fontFamily: '"Fraunces", serif', fontWeight: 400 }}
            >
              Programa completă<br />
              <span className="italic text-[#e8734a]">pentru BAC.</span>
            </h1>

            <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-[#888]">
              Fiecare program e o hartă detaliată. Alege-ți cursul și urmărește
              exact ce vei studia, în ce ordine, și cât durează fiecare capitol. (Programele se pot schimba)
            </p>

            {/* Course tabs */}
            <CourseTabs active={activeId} onChange={setActiveId} />

            {/* Active course blurb */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id + '-blurb'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="mt-6 text-[12px] tracking-[0.15em] text-[#666]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {active.blurb.toUpperCase()}
              </motion.p>
            </AnimatePresence>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 flex items-center justify-center gap-2 text-[#555]"
            >
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={14} />
              </motion.span>
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Derulează pentru a explora
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Roadmap — all three courses are rendered, only the active one shown.
            This used to mount just the active course so its animations replayed
            on every switch, which meant the prerendered page carried the
            syllabus for `mate-bac` and nothing else: the chapter titles for
            informatics — the page's best keywords — were absent from the HTML
            entirely. Hiding with CSS keeps them in the document. */}
        <div className="relative mt-20">
          {COURSES.map((course) => {
            const isActive = course.id === activeId;
            return (
              <div
                key={course.id}
                id={`course-panel-${course.id}`}
                role="tabpanel"
                aria-labelledby={`course-tab-${course.id}`}
                hidden={!isActive}
              >
                {/* No remount on switch, and none is needed: the scroll-reveal
                    animations are IntersectionObserver-driven, and the observers
                    do fire once a hidden panel gets layout. Verified by driving
                    the built page in a browser — the incoming roadmap animates
                    in exactly as it does on production. */}
                <Roadmap course={course} />
              </div>
            );
          })}
        </div>

        {/* Written explanation. The roadmap above is interactive and mostly
            labels; this is where the page actually explains itself — to a
            parent deciding, and to a crawler that cannot click a tab. */}
        <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-28 md:pt-36">
          <div className="mb-10 flex items-baseline gap-4">
            <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-[#e8734a]">
              Cum e construită programa
            </span>
            <span className="h-px flex-1 bg-[#222]" />
          </div>

          <div className="space-y-5 leading-relaxed text-[#b8b8b8]">
            <p>
              Programa de mai sus urmează{' '}
              <strong className="font-medium text-[#e4e4e4]">
                programa oficială de examen publicată de Ministerul Educației
              </strong>
              , nu manualul unei anumite edituri. Ordinea capitolelor este însă diferită de
              cea din manual: se începe cu noțiunile de care depind cele mai multe subiecte,
              nu cu cele care apar primele în carte.
            </p>
            <p>
              Motivul e practic. Un elev care intră în pregătire în februarie nu mai are timp
              să parcurgă totul în ordinea din manual. Dacă primele capitole acoperite sunt
              cele care apar an de an în subiecte, fiecare ședință adaugă puncte, chiar dacă
              materia nu ajunge să fie parcursă integral.
            </p>
          </div>

          <h2 className="mt-16 mb-5 font-display text-2xl font-semibold tracking-tight text-[#f0f0f0] md:text-3xl">
            Ce programă de matematică dai
          </h2>
          <div className="space-y-5 leading-relaxed text-[#b8b8b8]">
            <p>
              La Bacalaureat nu există o singură probă de matematică. Programa diferă în
              funcție de profilul liceului, iar elevul nu alege — profilul decide pentru el.
              Este cea mai frecventă confuzie la începutul pregătirii.
            </p>
            <p>
              Vei auzi frecvent denumirile „M1”, „M2” și „M3”. Sunt prescurtări din vorbirea
              curentă, folosite inconsecvent de la un liceu la altul — programa
              științelor naturii apare uneori ca „M1-2”. Mai jos folosim numele profilului,
              pentru că acela e neechivoc.
            </p>
          </div>

          <dl className="mt-8 border-t border-[#222]">
            {[
              {
                t: 'Matematică-informatică',
                d: 'Programa cea mai amplă, pentru filiera teoretică, profil real, specializarea matematică-informatică. Include analiză matematică extinsă și algebră superioară. Este și varianta cerută la majoritatea admiterilor la facultăți tehnice.',
              },
              {
                t: 'Științele naturii',
                d: 'Pentru profilul real, specializarea științe ale naturii — profilul cunoscut și ca bio-chimie. Acoperă aceleași domenii mari ca mate-info, dar cu mai puțină profunzime la analiză matematică.',
              },
              {
                t: 'Tehnologic',
                d: 'Pentru filiera tehnologică, indiferent de domeniul de pregătire. Accentul cade pe aplicații și pe calcul, mai puțin pe demonstrație.',
              },
              {
                t: 'Pedagogic',
                d: 'Pentru profilul pedagogic din filiera vocațională. Programa cea mai restrânsă dintre cele patru, centrată pe noțiunile de bază și pe aplicarea lor directă.',
              },
            ].map((m) => (
              <div key={m.t} className="border-b border-[#222] py-6">
                <dt className="mb-2 font-sans text-[1.05rem] font-semibold text-[#e4e4e4]">
                  {m.t}
                </dt>
                <dd className="text-[0.95rem] leading-relaxed text-[#999]">{m.d}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[0.9rem] leading-relaxed text-[#777]">
            Denumirile și conținutul exact se stabilesc anual prin ordin de ministru. Înainte
            de a-ți construi planul de pregătire, verifică programa în vigoare pe{' '}
            <a
              href="https://www.edu.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[#e8734a]/30 text-[#e8734a] transition-colors hover:border-[#e8734a]"
            >
              edu.ro
            </a>
            .
          </p>

          <h2 className="mt-16 mb-5 font-display text-2xl font-semibold tracking-tight text-[#f0f0f0] md:text-3xl">
            Informatică: ce se cere efectiv
          </h2>
          <div className="space-y-5 leading-relaxed text-[#b8b8b8]">
            <p>
              Proba de informatică se susține în{' '}
              <strong className="font-medium text-[#e4e4e4]">C/C++ sau Pascal</strong>, la
              alegerea elevului. Pregătirea de aici se face în C++, care este și limbajul
              folosit la olimpiade și la admiterile la facultățile de profil — deci efortul
              se reciclează.
            </p>
            <p>
              Ce contează cel mai mult la această probă nu este numărul de noțiuni, ci
              capacitatea de a scrie cod care compilează și se comportă corect pe cazurile
              limită. Din acest motiv, fiecare capitol se încheie cu probleme rulate efectiv,
              nu doar citite: un algoritm înțeles teoretic și un algoritm implementat corect
              sunt două lucruri diferite, iar examenul îl notează pe al doilea.
            </p>
            <p>
              Structurile de date — vectori, matrice, liste, arbori, grafuri — și
              recursivitatea sunt zonele care aduc cele mai multe puncte și, în același timp,
              cele în care se pierd cele mai multe. Le alocăm cel mai mult timp.
            </p>
          </div>

          <h2 className="mt-16 mb-5 font-display text-2xl font-semibold tracking-tight text-[#f0f0f0] md:text-3xl">
            Evaluarea Națională
          </h2>
          <div className="space-y-5 leading-relaxed text-[#b8b8b8]">
            <p>
              Pentru clasa a VIII-a, pregătirea urmează programa de Evaluare Națională la
              matematică: algebră, geometrie plană și noțiuni de geometrie în spațiu. Structura
              subiectelor este stabilă de la an la an, ceea ce face ca lucrul pe modele
              oficiale să fie deosebit de eficient.
            </p>
            <p>
              Din 2027 intervine o schimbare la admiterea la liceu, care nu modifică
              Evaluarea Națională în sine, dar schimbă miza ei. Am scris separat{' '}
              <Link
                to="/blog/admitere-liceu-2027"
                className="border-b border-[#e8734a]/30 text-[#e8734a] transition-colors hover:border-[#e8734a]"
              >
                despre ce se schimbă la admiterea din 2027
              </Link>
              .
            </p>
          </div>

          <div className="mt-16 border-t border-[#222] pt-10">
            <p className="mb-7 leading-relaxed text-[#b8b8b8]">
              Programa arată ce se studiază. Dacă vrei să vezi cum decurge efectiv o ședință,
              cât costă și în ce format,{' '}
              <Link
                to="/servicii"
                className="border-b border-[#e8734a]/30 text-[#e8734a] transition-colors hover:border-[#e8734a]"
              >
                detaliile programelor de meditații
              </Link>{' '}
              sunt pe pagina de servicii.
            </p>
            <Link
              to="/inscriere"
              className="group inline-flex items-center gap-3 border-b border-[#e8734a]/20 pb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#e8734a] transition-all duration-300 hover:border-[#e8734a]/80"
            >
              Rezervă prima ședință
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Curriculum;
