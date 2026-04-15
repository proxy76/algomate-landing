import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative">
      {/* Subtle background glow — unclipped so it bleeds softly into neighbors */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[#e8734a]/[0.06] rounded-full blur-[140px] md:blur-[180px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Section marker */}
          <div className="inline-flex items-center gap-2 md:gap-3 mb-10 md:mb-12">
            <span className="h-px w-8 md:w-12 bg-[#e8734a]/40" />
            <span className="font-mono text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-[#e8734a] uppercase">
              § 05 · Începe
            </span>
            <span className="h-px w-8 md:w-12 bg-[#e8734a]/40" />
          </div>

          <h2 className="font-display font-semibold text-[2.5rem] sm:text-5xl md:text-7xl text-[#f0f0f0] mb-8 md:mb-10 leading-[1.02] tracking-tight">
            Construiește-ți drumul
            <br />
            <span className="italic text-[#e8734a] font-normal">spre succes.</span>
          </h2>

          <p className="font-display italic text-base sm:text-lg md:text-xl text-[#999] mb-10 md:mb-12 max-w-xl mx-auto leading-relaxed text-balance">
            Nu lăsa pregătirea pentru BAC pe ultima sută de metri. Investește
            în tine cu AlgoMate.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3">
            <Link to="/inscriere">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 flex items-center gap-3 justify-center"
              >
                Înscrie-te Acum
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.button>
            </Link>
            <Link to="/servicii">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="border border-[#333] hover:border-[#e8734a]/60 text-[#ccc] hover:text-white px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-200"
              >
                Vezi Serviciile
              </motion.button>
            </Link>
          </div>

          {/* Closing flourish */}
          <div className="mt-16 md:mt-24 flex items-center justify-center gap-3 md:gap-4 font-mono text-[9px] tracking-[0.3em] md:tracking-[0.4em] text-[#444] uppercase">
            <span className="h-px w-10 md:w-16 bg-[#222]" />
            <span>◆ AlgoMate · MMXXVI ◆</span>
            <span className="h-px w-10 md:w-16 bg-[#222]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
