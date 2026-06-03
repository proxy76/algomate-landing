import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';


const testimonials = [
  {
    id: 1,
    name: "Andrei P.",
    role: "Elev, Clasa a XII-a",
    content:
      "Datorită AlgoMate am reușit să înțeleg conceptele de bază la informatică. Profesorii explică totul foarte clar și răbdător.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria I.",
    role: "Studentă, Politehnică",
    content:
      "Pregătirea pentru BAC la matematică a fost excelentă. Am luat nota 9.80 și am intrat la buget la facultate!",
    rating: 5,
  },
  {
    id: 3,
    name: "Radu V.",
    role: "Elev, Clasa a XI-a",
    content:
      "Materialele sunt structurate perfect, iar feedback-ul constant m-a ajutat enorm. Recomand cu încredere!",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
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
              § 04
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
              Voci / Mărturii
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
            <h2 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.05] tracking-tight max-w-3xl">
              Ce spun <em className="italic text-[#e8734a] font-normal">elevii</em> noștri.
            </h2>
            <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
              → Succesul lor este cea mai bună dovadă.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#222]">
          {testimonials.map((t, idx) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-[#0a0a0a] p-7 md:p-10 flex flex-col hover:bg-[#111] transition-colors duration-500"
            >
              {/* Huge quote mark */}
              <div
                className="font-display italic text-[5rem] md:text-[7rem] leading-[0.6] text-[#e8734a]/15 group-hover:text-[#e8734a]/30 transition-colors duration-500 select-none mb-4"
                aria-hidden
              >
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill="#e8734a"
                    strokeWidth={0}
                    className="text-[#e8734a]"
                  />
                ))}
              </div>

              <p className="font-display italic text-lg text-[#ddd] leading-[1.5] mb-10 flex-1 text-balance">
                {t.content}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#222]">
                <div className="w-10 h-10 rounded-full border border-[#e8734a]/30 flex items-center justify-center font-sans font-semibold text-[#e8734a] text-base">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-[#f0f0f0] leading-tight">
                    {t.name}
                  </h4>
                  <p className="font-mono text-[9px] text-[#666] uppercase tracking-[0.25em] mt-1">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
