import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardEdit, BookOpen, TrendingUp,
  ShieldCheck, CreditCard, BookOpenCheck, Undo2,
} from 'lucide-react';


/* ─── Data ───────────────────────────────────────────────── */

const steps = [
  {
    icon: ClipboardEdit,
    number: '01',
    title: 'Te Înscrii',
    description:
      'Completezi formularul online — durează sub 2 minute. Noi te contactăm în maxim 24h pentru a stabili prima sesiune.',
    accent: 'Rapid & Simplu',
  },
  {
    icon: BookOpen,
    number: '02',
    title: 'Înveți cu Structură',
    description:
      'Fiecare sesiune urmează un plan clar: teorie, exemple rezolvate, exerciții practice. Materiale digitale incluse, mereu la un click distanță.',
    accent: 'Metodă Dovedită',
  },
  {
    icon: TrendingUp,
    number: '03',
    title: 'Progresezi Vizibil',
    description:
      'Sesiuni săptămânale, teste regulate, feedback constant. Părinții primesc update-uri, iar rezultatele se văd rapid.',
    accent: 'Rezultate Garantate',
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    text: 'Transparență totală',
    detail: 'Fără costuri ascunse',
  },
  {
    icon: Undo2,
    text: 'Anulezi oricând',
    detail: 'Zero penalizări',
  },
  {
    icon: BookOpenCheck,
    text: 'Materiale incluse',
    detail: 'Digital & actualizate',
  },
  {
    icon: CreditCard,
    text: 'Plata per sesiune',
    detail: 'Fără abonamente',
  },
];


/* ─── Component ──────────────────────────────────────────── */

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
              § 04
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
              Proces / Garanție
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
            <h2 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.05] tracking-tight max-w-3xl">
              Cum <em className="italic text-[#e8734a] font-normal">funcționează.</em>
            </h2>
            <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
              → Trei pași simpli de la înscriere la rezultate reale.
            </p>
          </div>
        </motion.div>


        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 relative">


          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`group relative px-5 sm:px-6 md:px-8 pt-8 md:pt-10 pb-10 md:pb-12 border-b md:border-b-0 border-[#222]
                ${idx !== 0 ? 'md:border-l border-[#222]' : ''}
                hover:bg-[#111]/60 transition-colors duration-500`}
            >
              {/* Step number circle */}
              <div className="relative z-[2] flex items-center gap-4 mb-8">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#333] group-hover:border-[#e8734a]/60 flex items-center justify-center transition-all duration-500 bg-[#0a0a0a] relative">
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#e8734a]/0 group-hover:bg-[#e8734a]/10 transition-all duration-500 blur-sm" />
                  <step.icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#666] group-hover:text-[#e8734a] transition-colors duration-300 relative z-10"
                  />
                </div>
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#888] group-hover:text-[#e8734a] uppercase transition-colors duration-300">
                  Pasul {step.number}
                </span>
              </div>

              {/* Accent tag */}
              <div className="inline-flex items-center gap-2 mb-5 border border-[#e8734a]/20 group-hover:border-[#e8734a]/50 px-3 py-1.5 transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8734a] animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#e8734a] uppercase">
                  {step.accent}
                </span>
              </div>

              <h3 className="font-sans font-semibold text-xl md:text-2xl text-[#f0f0f0] mb-3 leading-[1.2] tracking-tight">
                {step.title}
              </h3>
              <p className="text-[0.95rem] text-[#999] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>


        {/* ── Guarantee Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 md:mt-28"
        >
          {/* Guarantee header */}
          <div className="flex items-center gap-3 md:gap-4 mb-10 md:mb-12">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#222] to-[#333]" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] md:tracking-[0.4em] text-[#e8734a] uppercase whitespace-nowrap flex items-center gap-2">
              <ShieldCheck size={14} strokeWidth={1.5} />
              Garanția AlgoMate
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#222] to-[#333]" />
          </div>

          {/* Headline */}
          <div className="text-center mb-12 md:mb-14">
            <h3 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-[#f0f0f0] mb-4 leading-[1.1] tracking-tight">
              Fără surprize, fără <span className="italic text-[#e8734a] font-normal">obligații.</span>
            </h3>
            <p className="font-display italic text-base text-[#888] max-w-lg mx-auto leading-relaxed text-balance">
              Plătești doar per sesiune, anulezi oricând, iar materialele sunt mereu incluse. Simplu și corect.
            </p>
          </div>

          {/* Guarantee badges grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#222]">
            {guarantees.map((g, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group py-8 md:py-10 px-4 md:px-6 text-center relative border-[#222]
                  ${idx % 2 === 1 ? 'border-l' : ''}
                  ${idx >= 2 ? 'border-t md:border-t-0' : ''}
                  ${idx !== 0 ? 'md:border-l' : ''}
                  hover:bg-[#111]/40 transition-colors duration-500`}
              >
                <g.icon
                  size={24}
                  strokeWidth={1.5}
                  className="mx-auto mb-4 text-[#555] group-hover:text-[#e8734a] transition-colors duration-300"
                />
                <div className="font-sans font-medium text-sm md:text-base text-[#ddd] group-hover:text-[#f0f0f0] mb-1.5 transition-colors">
                  {g.text}
                </div>
                <div className="font-mono text-[9px] md:text-[10px] text-[#555] group-hover:text-[#888] uppercase tracking-[0.2em] md:tracking-[0.25em] transition-colors">
                  {g.detail}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(HowItWorks);
