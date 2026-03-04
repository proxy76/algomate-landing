import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, BarChart2, CheckCircle, Calculator, GraduationCap, ClipboardList, PenTool } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start mb-6">
        <div className="mr-4 p-3 bg-blue-500/10 rounded-lg text-blue-400">
            {icon}
        </div>
        <div>
            <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

const MatematicaBacPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white flex flex-col">
            <Header />

            <main className="flex-grow pt-28 pb-16 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                            Pregătire Matematică BAC
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                            Un program complet și structurat pentru a-ți asigura nota maximă la examenul de Bacalaureat.
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
                                <BookOpen className="mr-3 text-blue-400" />
                                Ce include programul?
                            </h3>

                            <FeatureItem
                                icon={<Video size={24} />}
                                title="Cursuri & Seminarii"
                                description="Sesiuni interactive unde explicăm teoria și rezolvăm probleme tipice de examen, pas cu pas."
                            />

                            <FeatureItem
                                icon={<PenTool size={24} />}
                                title="Platformă Interactivă E-learning"
                                description="Acces la o platformă modernă cu sute de exerciții, probleme și teme organizate pe capitole."
                            />

                            <FeatureItem
                                icon={<ClipboardList size={24} />}
                                title="Simulări de Examen"
                                description="Teste periodice în condiții de examen pentru a te obișnui cu presiunea și formatul subiectelor."
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-slate-800/50 backdrop-blur-sm border border-white/10 p-8 rounded-3xl"
                        >
                            <h3 className="text-2xl font-bold mb-8 flex items-center">
                                <BarChart2 className="mr-3 text-teal-400" />
                                Monitorizarea Progresului
                            </h3>

                            <FeatureItem
                                icon={<CheckCircle size={24} />}
                                title="Teme Notate"
                                description="Primești feedback detaliat la fiecare temă pentru a înțelege exact unde mai ai de lucrat."
                            />

                            <FeatureItem
                                icon={<GraduationCap size={24} />}
                                title="Catalog de Note"
                                description="Un sistem transparent de notare pentru a-ți urmări evoluția pe parcursul anului."
                            />

                            <FeatureItem
                                icon={<BarChart2 size={24} />}
                                title="Statistici de Performanță"
                                description="Vezi grafice și rapoarte despre progresul tău la algebră, analiză matematică și geometrie."
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-16"
                    >
                        <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-900/50">
                            <Calculator className="mr-2" size={20} />
                            Înscrie-te Acum
                        </a>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MatematicaBacPage;
