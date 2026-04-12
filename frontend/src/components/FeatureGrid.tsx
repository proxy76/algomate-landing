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
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-4">
            De ce AlgoMate?
          </h2>
          <p className="text-[#888] max-w-xl mx-auto">
            Metodologie modernă, rezultate dovedite.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {features.map((feature, idx) => (
              <div
              key={idx}
              className="bg-[#141414] border border-[#222] rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 group hover:-translate-y-1 hover:border-[#e8734a]/30"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center mb-3 text-[#888] group-hover:text-[#e8734a] group-hover:border-[#e8734a]/30 transition-all duration-300">
                <feature.icon size={18} />
              </div>
              <h3 className="text-sm font-medium text-[#ccc] group-hover:text-[#f0f0f0] transition-colors">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FeatureGrid);
