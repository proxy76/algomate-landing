import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, CheckCircle, Monitor, Trophy, FileJson, Layers } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="mr-4 p-3 bg-teal-500/10 rounded-lg text-teal-400">
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

const InformaticaBacPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
            <Header />

            <main className="flex-grow pt-28 pb-16 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                            Pregătire Informatică BAC
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Stăpânește algoritmii, C++ și structurile de date pentru a obține punctajul maxim.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                <Terminal className="mr-3 text-teal-400" />
                                Ce oferim?
                            </h3>

                            <FeatureItem
                                icon={<Monitor size={24} />}
                                title="Cursuri & Laboratoare"
                                description="Învățăm practic, scriind cod, analizând eficiența algoritmilor și rezolvând variante de BAC."
                            />

                            <FeatureItem
                                icon={<Code size={24} />}
                                title="Platformă Interactivă"
                                description="Sistem automat de evaluare a problemelor, similar cu concursurile de programare."
                            />

                            <FeatureItem
                                icon={<FileJson size={24} />}
                                title="Simulări Grilă & Cod"
                                description="Teste combinate (grilă + scriere cod) pentru a acoperi toate subiectele examenului."
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                <Layers className="mr-3 text-blue-400" />
                                Evoluția ta
                            </h3>

                            <FeatureItem
                                icon={<CheckCircle size={24} />}
                                title="Code Review Personalizat"
                                description="Feedback direct pe codul tău pentru a învăța cele mai bune practici și optimizări."
                            />

                            <FeatureItem
                                icon={<Trophy size={24} />}
                                title="Catalog & Ranking"
                                description="Urmărește-ți notele și compară-ți progresul cu ceilalți cursanți pentru extra motivație."
                            />

                            <FeatureItem
                                icon={<Cpu size={24} />}
                                title="Statistici Algoritmice"
                                description="Grafice care îți arată punctele forte și capitolele unde trebuie să mai insiști."
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-16"
                    >
                        <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-teal-900/50">
                            <Terminal className="mr-2" size={20} />
                            Înscrie-te la Info
                        </a>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InformaticaBacPage;
