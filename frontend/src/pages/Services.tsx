import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Sigma, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const services = [
  {
    icon: Code,
    title: "Introducere în Informatică",
    tech: "Python / C++",
    price: "120 RON",
    discountPrice: "60 RON",
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
    icon: Terminal,
    title: "Informatică BAC",
    tech: "C / C++",
    price: "120 RON",
    discountPrice: "60 RON",
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
    badge: "50% OFF pe Vară",
  },
  {
    icon: Sigma,
    title: "Matematică BAC",
    tech: "M1 / M2 / M3",
    price: "120 RON",
    discountPrice: "60 RON",
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
    badge: "50% OFF pe Vară",
  },
];

const Services: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Servicii
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Anul 2026
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[3rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight">
                Servicii<span className="text-[#e8734a]">.</span>
              </h1>
              <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
                → Trei programe de pregătire, fiecare adaptat nevoilor tale.
              </p>
            </div>
          </motion.div>

          {/* Service cards */}
          <div className="border-t border-[#222]">
            {services.map((service, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`relative px-5 sm:px-6 md:px-10 py-12 sm:py-14 md:py-20 border-b border-[#222] ${service.badge ? 'bg-[#e8734a]/[0.02]' : ''
                  }`}
              >
                {/* Top strip */}
                <div className="flex items-center justify-between gap-3 mb-8 md:mb-10 flex-wrap">
                  <div className="flex items-center gap-4 md:gap-5">
                    <span className="font-mono text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase">
                      / 00{idx + 1}
                    </span>
                    <service.icon
                      size={22}
                      strokeWidth={1.5}
                      className={service.badge ? 'text-[#e8734a]' : 'text-[#888]'}
                    />
                  </div>
                  {service.badge && (
                    <div className="inline-flex items-center gap-2 bg-[#e8734a] text-[#0a0a0a] px-3 py-1.5 font-mono text-[10px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] animate-pulse" />
                      {service.badge}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                  {/* Left — primary */}
                  <div className="md:col-span-7">
                    <h2 className="font-sans font-semibold text-[1.65rem] sm:text-3xl md:text-4xl text-[#f0f0f0] mb-3 leading-[1.15] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="font-mono text-[11px] text-[#e8734a] tracking-[0.3em] uppercase mb-8">
                      {service.tech}
                    </p>

                    <p className="text-base text-[#bbb] leading-relaxed mb-10 max-w-xl">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="mb-10 pb-10 border-b border-dashed border-[#222]">
                      <div className="font-mono text-[10px] tracking-[0.3em] text-[#666] uppercase mb-3">
                        Preț / ședință
                      </div>
                      <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
                        {service.discountPrice ? (
                          <>
                            <span className="font-display font-semibold text-[2.75rem] sm:text-5xl md:text-6xl text-[#e8734a] leading-none">
                              {service.discountPrice}
                            </span>
                            <span className="font-display text-xl sm:text-2xl md:text-3xl text-[#555] line-through decoration-[#e8734a]/60 decoration-2 leading-none">
                              {service.price}
                            </span>
                          </>
                        ) : (
                          <span className="font-display font-semibold text-[2.75rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-none">
                            {service.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                        <Calendar size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                        Start · {service.startDate}
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                        <Clock size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                        2h / sesiune
                      </div>
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#ccc] uppercase tracking-[0.2em]">
                        <Users size={13} className="text-[#e8734a]" strokeWidth={1.75} />
                        Grupe mici
                      </div>
                    </div>

                    <Link to="/inscriere">
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                        className="bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 inline-flex items-center gap-3"
                      >
                        Înscrie-te
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Right — features */}
                  <div className="md:col-span-5 md:pl-10 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-dashed md:border-solid border-[#222]">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="font-mono text-[10px] text-[#e8734a] uppercase tracking-[0.3em]">
                        Ce vei învăța
                      </span>
                      <span className="h-px flex-1 bg-[#222]" />
                    </div>
                    <ul>
                      {service.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + fIdx * 0.05 + 0.2, duration: 0.4 }}
                          className="flex items-start gap-5 py-4 border-b border-dashed border-[#222] last:border-b-0"
                        >
                          <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-[0.15em] pt-0.5 w-6 shrink-0">
                            {String(fIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm text-[#ccc] leading-relaxed flex-1">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Closing flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4 font-mono text-[9px] tracking-[0.4em] text-[#444] uppercase"
          >
            <span className="h-px w-16 bg-[#222]" />
            <span>◆ Fin · AlgoMate MMXXVI ◆</span>
            <span className="h-px w-16 bg-[#222]" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
