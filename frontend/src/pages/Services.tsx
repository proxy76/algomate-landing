import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Sigma, Calendar, Clock, Users, ArrowRight, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const services = [
  {
    icon: Terminal,
    title: "Informatică BAC",
    tech: "C / C++",
    price: "160 RON",
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
    badge: null,
  },
  {
    icon: Code,
    title: "Introducere în Informatică",
    tech: "Python / C++",
    price: "160 RON",
    discountPrice: "80 RON",
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
    badge: "50% OFF pe Vară",
  },
  {
    icon: Sigma,
    title: "Matematică BAC",
    tech: "M1 / M2 / M3",
    price: "160 RON",
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
    badge: null,
  },
];

const Services: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen text-[#f0f0f0] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Servicii</h1>
            <p className="text-[#888] max-w-xl mx-auto text-lg">
              Trei programe de pregătire, fiecare adaptat nevoilor tale.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="space-y-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative bg-[#141414] border border-[#222] rounded-xl p-8 md:p-10 group hover:border-[#333] transition-all duration-300"
              >
                {/* Badge */}
                {service.badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15 + 0.3 }}
                    className="absolute top-6 right-6 flex items-center gap-1.5 bg-[#e8734a]/10 text-[#e8734a] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e8734a]/20"
                  >
                    <Percent size={12} />
                    {service.badge}
                  </motion.div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left side */}
                  <div className="md:w-1/2">
                    <div className="w-12 h-12 rounded-xl bg-[#e8734a]/10 flex items-center justify-center mb-5 text-[#e8734a]">
                      <service.icon size={24} />
                    </div>

                    <h2 className="text-2xl font-bold text-[#f0f0f0] mb-1">{service.title}</h2>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-[#e8734a] font-medium">{service.tech}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                      <div className="flex items-center gap-2">
                        {service.discountPrice ? (
                          <>
                            <span className="text-sm text-[#666] line-through decoration-[#e8734a]/80 decoration-2 font-medium">{service.price}</span>
                            <span className="text-sm font-bold text-[#e8734a] bg-[#e8734a]/10 px-2 py-0.5 rounded-md border border-[#e8734a]/20 shadow-sm">{service.discountPrice}</span>
                          </>
                        ) : (
                          <span className="text-sm font-medium text-[#ccc] bg-[#222] px-2 py-0.5 rounded-md border border-[#333] shadow-sm">{service.price}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-[#888] text-sm leading-relaxed mb-6">{service.description}</p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#999] bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-lg">
                        <Calendar size={12} />
                        Începe: {service.startDate}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#999] bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-lg">
                        <Clock size={12} />
                        2h / sesiune
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#999] bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-lg">
                        <Users size={12} />
                        Grupe mici
                      </div>
                    </div>

                    <Link to="/inscriere">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-[#e8734a] hover:bg-[#d4622e] text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors duration-300 flex items-center gap-2"
                      >
                        Înscrie-te
                        <ArrowRight size={14} />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Right side - Features */}
                  <div className="md:w-1/2">
                    <h4 className="text-xs font-medium text-[#666] uppercase tracking-wider mb-4">
                      Ce vei învăța
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.15 + fIdx * 0.05 + 0.3 }}
                          className="flex items-start gap-3 text-sm text-[#bbb]"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#e8734a] mt-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
