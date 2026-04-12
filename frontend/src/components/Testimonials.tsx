import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';


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
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#f0f0f0] mb-4">
            Ce spun elevii noștri
          </h2>
          <p className="text-[#888] max-w-xl mx-auto">
            Succesul lor este cea mai bună dovadă.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
              <div
              key={t.id}
              className="bg-[#141414] border border-[#222] rounded-xl p-6 relative group transition-all duration-300 hover:-translate-y-1 hover:border-[#e8734a]/40"
            >
              <Quote
                size={32}
                className="absolute top-5 right-5 text-[#1a1a1a] group-hover:text-[#e8734a]/10 transition-colors duration-300"
              />

              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#e8734a"
                    className="text-[#e8734a]"
                  />
                ))}
              </div>

              <p className="text-[#bbb] text-sm leading-relaxed mb-6">
                "{t.content}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#e8734a] font-semibold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#f0f0f0]">
                    {t.name}
                  </h4>
                  <p className="text-xs text-[#666]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
