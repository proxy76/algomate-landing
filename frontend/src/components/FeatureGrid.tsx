import React from 'react';
import { motion } from 'framer-motion';
import {
    Monitor, Calendar, Video, BookOpen, User,
    Layers, ClipboardCheck, PenTool, Award, MessageCircle
} from 'lucide-react';

const FeatureGrid: React.FC = () => {
    const features = [
        { icon: Monitor, title: "Meditații în format ONLINE" },
        { icon: Calendar, title: "Activitate pe timpul verii" },
        { icon: Video, title: "Videoconferințe interactive" },
        { icon: BookOpen, title: "Resurse personalizate" },
        { icon: User, title: "Mentorat dedicat" },
        { icon: Layers, title: "Cursuri extra regulate" },
        { icon: ClipboardCheck, title: "Evaluări periodice" },
        { icon: PenTool, title: "Teme de consolidare" },
        { icon: Award, title: "Probleme de excelență" },
        { icon: MessageCircle, title: "Feedback săptămânal" },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <section className="py-20 bg-slate-950 relative" id="features">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[80px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">De ce să ne alegi?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Metodologie modernă, rezultate garantate.</p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 1)" }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col items-center text-center hover:border-blue-500/30 transition-colors transition-shadow duration-300 shadow-lg hover:shadow-xl"
                        >
                            <div className="w-12 h-12 bg-blue-900/20 text-blue-400 rounded-full flex items-center justify-center mb-4">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="font-semibold text-gray-200 text-sm md:text-base">{feature.title}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(FeatureGrid);
