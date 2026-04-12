import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const CTASection: React.FC = () => {
  return (
    <section className="py-32 relative">
      {/* Subtle background glow — unclipped so it bleeds softly into neighbors */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#e8734a]/[0.06] rounded-full blur-[180px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Divider line */}
          <div className="w-12 h-px bg-[#e8734a]/40 mx-auto mb-8" />

          <h2 className="text-3xl md:text-5xl font-bold text-[#f0f0f0] mb-6 leading-tight tracking-tight">
            Construiește-ți drumul
            <br />
            <span className="text-[#e8734a]">spre succes.</span>
          </h2>

          <p className="text-[#888] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Nu lăsa pregătirea pentru BAC pe ultima sută de metri.
            Investește în tine cu AlgoMate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inscriere">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#e8734a] hover:bg-[#d4622e] text-white px-8 py-3.5 rounded-lg font-medium text-sm tracking-wide transition-colors duration-300 flex items-center gap-2 justify-center"
              >
                Înscrie-te Acum
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link to="/servicii">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-[#333] hover:border-[#555] text-[#ccc] hover:text-white px-8 py-3.5 rounded-lg font-medium text-sm tracking-wide transition-all duration-300"
              >
                Vezi Serviciile
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
