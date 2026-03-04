import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ModuleCard from './components/ModuleCard';
import FeatureGrid from './components/FeatureGrid';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import CustomCursor from './components/CustomCursor';
import Testimonials from './components/Testimonials';
import CTASection from './components/CTASection';
import InteractiveBackground from './components/InteractiveBackground';
import MatematicaBacPage from './components/MatematicaBacPage';
import InformaticaBacPage from './components/InformaticaBacPage';
import AdminDashboard from './pages/AdminDashboard';
import API_BASE_URL from './api';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Module {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
  coming_soon_label?: string;
  icon?: string;
  link?: string;
}

const LandingPage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Meditații Matematică BAC",
      description: "Algebră, Analiză și Geometrie explicate logic.",
      is_active: true,
      icon: "Sigma",
      link: "/matematica-bac"
    },
    {
      id: 2,
      title: "Meditații Informatică BAC",
      description: "C++ și algoritmi pentru un punctaj maxim.",
      is_active: true,
      icon: "Terminal",
      link: "/informatica-bac"
    },
    {
      id: 3,
      title: "Python pentru Liceu",
      description: "Bazele programării în Python. Oportunități de carieră.",
      is_active: false,
      coming_soon_label: "În Curând",
      icon: "Code"
    }
  ]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Adjust URL based on your backend port
        const response = await axios.get(`${API_BASE_URL}/api/modules/`);
        if (response.data && response.data.length > 0) {
          const enhancedModules = response.data.map((m: Module) => ({
            ...m,
            link: m.title.includes("Matematică") ? "/matematica-bac" : m.title.includes("Informatică") ? "/informatica-bac" : undefined
          }));
          setModules(enhancedModules);
        }
      } catch (error) {
        console.log("Using default modules (Backend might be offline or empty)");
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white relative">
      <InteractiveBackground />
      <Header />
      <main>
        <Hero />
        {/* Modules Section */}
        <section className="py-24 relative z-10 overflow-hidden" id="modules">
          {/* Ambient Background Blobs */}
          <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[120px] -z-10" />

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Programele Noastre</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Cursuri structurate pentru a asigura succesul tău la examene și în carieră.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <ModuleCard
                    title={module.title}
                    description={module.description}
                    isActive={module.is_active}
                    comingSoonLabel={module.coming_soon_label}
                    icon={module.icon}
                    link={module.link}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <>
      <CustomCursor />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/matematica-bac" element={<MatematicaBacPage />} />
          <Route path="/informatica-bac" element={<InformaticaBacPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
