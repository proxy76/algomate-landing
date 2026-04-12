import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import Testimonials from '../components/Testimonials';
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
  },
];

const Home: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen text-[#f0f0f0]">
        <Hero />

        {/* Services Preview */}
        <section className="pt-12 pb-24 md:pt-16 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Programele Noastre</h2>
              <p className="text-[#888] max-w-xl mx-auto">
                Cursuri structurate pentru succesul tău la examene și în carieră.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="relative bg-[#141414] border border-[#222] rounded-xl p-6 group transition-all duration-300 hover:-translate-y-1 hover:border-[#e8734a]/30"
                >
                  {service.badge && (
                    <div className="absolute top-4 right-4 bg-[#e8734a]/10 text-[#e8734a] text-[10px] font-semibold px-2.5 py-1 rounded-full border border-[#e8734a]/20 uppercase tracking-wider">
                      {service.badge}
                    </div>
                  )}

                  <div className="w-10 h-10 rounded-lg bg-[#e8734a]/10 flex items-center justify-center mb-4 text-[#e8734a]">
                    <service.icon size={20} />
                  </div>

                  <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">{service.title}</h3>
                  <p className="text-xs text-[#e8734a] font-medium mb-3">{service.subtitle}</p>
                  <p className="text-sm text-[#888] leading-relaxed mb-4">{service.description}</p>

                  <Link
                    to={service.link}
                    className="inline-flex items-center text-sm text-[#e8734a] font-medium hover:text-[#f08c5a] transition-colors group/link"
                  >
                    Detalii
                    <ArrowRight size={14} className="ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />

        {/* Stats section */}
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "98%", label: "Rata de promovabilitate" },
                { value: "150+", label: "Elevi pregătiți" },
                { value: "9.4", label: "Media notelor" },
                { value: "3+", label: "Ani de experiență" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center py-6"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#e8734a] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#666]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />
        <CTASection />
      </div>
    </PageTransition>
  );
};

export default Home;
