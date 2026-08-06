import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Trophy, Code2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Instructor Section — § 03 on the homepage.
 *
 * Pairs with the `personSchema` JSON-LD in structuredData.ts; the credentials
 * listed here MUST stay in sync with the `knowsAbout` / `alumniOf` fields there.
 */

const credentials = [
  {
    icon: GraduationCap,
    title: 'Universitatea Politehnica din București',
    meta: 'Studii în curs',
  },
  {
    icon: Trophy,
    title: 'Premiant la olimpiade și concursuri naționale de Informatică',
    meta: 'Palmares',
  },
  {
    icon: Code2,
    title: 'Programator — experiență practică, nu doar teorie de manual',
    meta: 'Profesie',
  },
  {
    icon: Users,
    title: '2 ani de meditații, cu rezultate deosebite la BAC și Evaluare Națională',
    meta: 'Predare',
  },
];

const Instructor: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative z-10" id="instructor">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
              § 03
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
              Instructor / Fondator
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
            <h2 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.05] tracking-tight max-w-3xl">
              Cine te <em className="italic text-[#e8734a] font-normal">învață.</em>
            </h2>
            <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
              → Un singur profesor, prezent la fiecare ședință.
            </p>
          </div>
        </motion.div>

        {/* ── Portrait + Bio ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 border-t border-[#222] pt-12 md:pt-16">

          {/* Left — portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <div className="relative group max-w-sm md:max-w-none">
              {/* Offset editorial frame */}
              <span
                className="absolute -top-3 -left-3 w-full h-full border border-[#e8734a]/25 group-hover:border-[#e8734a]/50 transition-colors duration-500 pointer-events-none"
                aria-hidden
              />
              <div className="relative overflow-hidden bg-[#111]">
                <img
                  src="/instructor-razvan.jpg"
                  alt="Răzvan Rădulescu — instructor și fondator AlgoMate"
                  width={694}
                  height={741}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover grayscale-[0.35] contrast-[1.05] group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Tonal wash keeps the photo inside the palette */}
                <span
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent mix-blend-multiply pointer-events-none"
                  aria-hidden
                />
              </div>

              {/* Caption strip */}
              <div className="flex items-baseline gap-3 mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#666]">
                <span className="text-[#e8734a]">◆</span>
                <span>Fig. 01 — Portret</span>
                <span className="h-px flex-1 bg-[#222]" />
                <span className="hidden sm:inline">București</span>
              </div>
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="md:col-span-7"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#e8734a] uppercase mb-4">
              Fondator AlgoMate
            </p>
            <h3 className="font-display font-semibold text-[2rem] sm:text-4xl md:text-[2.75rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-8">
              Răzvan Rădulescu
            </h3>

            <div className="space-y-5 text-[0.95rem] md:text-base text-[#bbb] leading-relaxed">
              <p>
                Student la <span className="text-[#e4e4e4]">Universitatea Politehnica din
                București</span> și programator, cu un palmares de premii la olimpiade și
                concursuri naționale de Informatică. Aceleași metode care m-au dus la
                rezultate în competiție stau astăzi la baza fiecărei ședințe.
              </p>
              <p>
                De <span className="text-[#e4e4e4]">2 ani predau meditații</span> de
                matematică și informatică, cu rezultate deosebite la Bacalaureat și Evaluare
                Națională. Nu predau după un manual: explic de ce funcționează un algoritm
                sau o demonstrație, până când elevul poate reconstrui singur raționamentul.
              </p>
              <p className="font-display italic text-[#999] pt-2 border-l border-[#e8734a]/30 pl-5">
                AlgoMate a pornit din convingerea că un elev nu are nevoie de mai multe ore
                de meditații, ci de ore mai bine construite.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Credentials — full width beneath the portrait row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 border-t border-[#222] mt-14 md:mt-20">
          {credentials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (idx % 2) * 0.08 }}
              className="group flex items-start gap-4 md:gap-5 py-5 md:py-6 border-b border-dashed border-[#222] hover:border-[#e8734a]/40 transition-colors duration-300"
            >
              <span className="font-mono text-[11px] text-[#555] tabular-nums tracking-[0.15em] w-6 md:w-8 pt-0.5 group-hover:text-[#e8734a] transition-colors shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <item.icon
                size={18}
                strokeWidth={1.5}
                className="text-[#666] group-hover:text-[#e8734a] transition-colors shrink-0 mt-0.5"
              />
              <div className="flex-1">
                <div className="font-sans font-medium text-[0.95rem] md:text-base text-[#ddd] group-hover:text-[#f0f0f0] transition-colors leading-snug">
                  {item.title}
                </div>
                <div className="font-mono text-[9px] text-[#555] uppercase tracking-[0.25em] mt-1.5">
                  {item.meta}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-16"
        >
          <Link
            to="/inscriere"
            className="group/link inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#e8734a] pb-2 border-b border-[#e8734a]/20 hover:border-[#e8734a]/80 transition-all duration-300"
          >
            Rezervă prima ședință
            <ArrowRight size={12} strokeWidth={2.5} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Instructor);
