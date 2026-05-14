import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
// import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import CTASection from '../components/CTASection';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Sigma, Terminal } from 'lucide-react';


const services = [
  {
    icon: Terminal,
    title: "Informatică BAC",
    subtitle: "C / C++",
    description: "Algoritmi, structuri de date și rezolvări de subiecte pentru un punctaj maxim la BAC.",
    link: "/servicii",
    badge: "50% OFF Vara",
  },
  {
    icon: Code,
    title: "Introducere în Informatică",
    subtitle: "Python / C++",
    description: "Bazele programării pentru clasa a 9-a. Construiește fundația unei cariere în tech.",
    link: "/servicii",
    badge: "50% OFF Vara",
  },
  {
    icon: Sigma,
    title: "Matematică BAC",
    subtitle: "M1 / M2 / M3",
    description: "Algebră, analiză și geometrie — metoda structurată pentru nota 10.",
    link: "/servicii",
    badge: "50% OFF Vara",
  },
];

const stats = [
  { value: "100%", label: "Promovabilitate", meta: "Ex. Național" },
  { value: "34", label: "Premianți", meta: "Începând cu 2024" },
  { value: "9.8", label: "Media notelor", meta: "La BAC" },
  { value: "3+", label: "Ani experiență", meta: "Meditații" },
];

const SectionHeader: React.FC<{
  number: string;
  kicker: string;
  title: React.ReactNode;
  subtitle: string;
}> = ({ number, kicker, title, subtitle }) => (
  <div className="mb-14 md:mb-20">
    <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
      <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
        § {number}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
      <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
        {kicker}
      </span>
    </div>
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
      <h2 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.05] tracking-tight max-w-3xl">
        {title}
      </h2>
      <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
        → {subtitle}
      </p>
    </div>
  </div>
);

const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen text-[#f0f0f0]">
        <Hero />

        {/* § 01 — Programele */}
        <section className="pt-8 pb-20 md:pt-16 md:pb-28 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeader
                number="01"
                kicker="Oferta / Programe"
                title={
                  <>
                    Programele <em className="italic text-[#e8734a] font-normal">noastre.</em>
                  </>
                }
                subtitle="Cursuri structurate pentru examene și pentru o carieră reală în tech."
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#222]">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`group relative px-5 sm:px-6 md:px-8 pt-8 md:pt-10 pb-10 md:pb-12 border-b border-[#222] md:border-b-0 ${idx !== 0 ? 'md:border-l border-[#222]' : ''
                    } ${service.badge ? 'bg-[#e8734a]/[0.02]' : ''} hover:bg-[#141414] transition-colors duration-500`}
                >
                  {/* Counter row */}
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[#666] uppercase">
                      / 00{idx + 1}
                    </span>
                    <service.icon
                      size={20}
                      strokeWidth={1.5}
                      className={`transition-colors duration-300 ${service.badge ? 'text-[#e8734a]' : 'text-[#555] group-hover:text-[#e8734a]'
                        }`}
                    />
                  </div>

                  {service.badge && (
                    <div className="inline-flex items-center gap-2 mb-5 bg-[#e8734a] text-[#0a0a0a] px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] uppercase font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] animate-pulse" />
                      {service.badge}
                    </div>
                  )}

                  <h3 className="font-sans font-semibold text-xl md:text-2xl text-[#f0f0f0] mb-2 leading-[1.2] tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-mono text-[11px] text-[#e8734a] mb-6 tracking-[0.25em] uppercase">
                    {service.subtitle}
                  </p>
                  <p className="text-[0.95rem] text-[#bbb] leading-relaxed mb-8 md:min-h-[4rem]">
                    {service.description}
                  </p>

                  <Link
                    to={service.link}
                    className="group/link inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#e8734a] pb-2 border-b border-[#e8734a]/20 hover:border-[#e8734a]/80 transition-all duration-300"
                  >
                    Detalii
                    <ArrowRight size={12} strokeWidth={2.5} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />

        {/* § 03 — Rezultate */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="mb-16"
            >
              <div className="flex items-baseline gap-3 md:gap-4 mb-8">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                  § 03
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                  Rezultate / Cifre
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#222]">
              {stats.map((stat, idx) => {
                const mobileBorderL = idx % 2 === 1;
                const mobileBorderT = idx >= 2;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className={`py-10 md:py-12 px-4 md:px-6 text-center relative border-[#222]
                      ${mobileBorderL ? 'border-l' : ''}
                      ${mobileBorderT ? 'border-t md:border-t-0' : ''}
                      ${idx !== 0 ? 'md:border-l' : ''}
                    `}
                  >
                    <div className="font-display font-semibold text-4xl md:text-7xl text-[#e8734a] mb-3 md:mb-4 leading-none tracking-tight">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] text-[#ccc] uppercase tracking-[0.25em] md:tracking-[0.3em] mb-1">
                      {stat.label}
                    </div>
                    <div className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em] md:tracking-[0.25em]">
                      {stat.meta}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* <Testimonials /> */}
        <HowItWorks />
        <CTASection />
      </div>
    </PageTransition>
  );
};

export default Home;
