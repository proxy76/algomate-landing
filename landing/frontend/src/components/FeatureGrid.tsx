import React from 'react';
import { motion } from 'framer-motion';
import {
  Monitor, Calendar, Video, BookOpen, User,
  Layers, ClipboardCheck, PenTool, Award, MessageCircle,
} from 'lucide-react';


const features = [
  { icon: Monitor, title: "Meditații Online" },
  { icon: Calendar, title: "Activitate pe Vară" },
  { icon: Video, title: "Sesiuni Interactive" },
  { icon: BookOpen, title: "Resurse Personalizate" },
  { icon: User, title: "Mentorat Dedicat" },
  { icon: Layers, title: "Cursuri Suplimentare" },
  { icon: ClipboardCheck, title: "Evaluări Periodice" },
  { icon: PenTool, title: "Teme de Consolidare" },
  { icon: Award, title: "Probleme de Excelență" },
  { icon: MessageCircle, title: "Feedback Constant" },
];

const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="features">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
              § 02
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
              Metodă / Abordare
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
            <h2 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.05] tracking-tight max-w-2xl">
              De ce <em className="italic text-[#e8734a] font-normal">AlgoMate</em>?
            </h2>
            <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
              → Zece principii care transformă pregătirea în performanță.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 border-t border-[#222]">
          {features.map((feature, idx) => {
            const isLeftCol = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeftCol ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 5) * 0.05 }}
                className="group flex items-center gap-4 md:gap-5 py-5 md:py-6 border-b border-dashed border-[#222] hover:border-[#e8734a]/40 transition-colors duration-300"
              >
                <span className="font-mono text-[11px] text-[#555] tabular-nums tracking-[0.15em] w-6 md:w-8 group-hover:text-[#e8734a] transition-colors shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <feature.icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-[#666] group-hover:text-[#e8734a] transition-colors shrink-0"
                />
                <span className="font-sans font-medium text-[0.95rem] md:text-lg text-[#ddd] group-hover:text-[#f0f0f0] transition-colors flex-1 leading-tight">
                  {feature.title}
                </span>
                <span className="hidden md:inline font-mono text-[10px] text-[#333] group-hover:text-[#e8734a] transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-300">
                  ──→
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeatureGrid);
