import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Mouse interaction for background
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            ref={sectionRef}
            className="py-32 relative overflow-hidden flex items-center justify-center min-h-[60vh]"
            onMouseMove={handleMouseMove}
        >
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                {/* Mouse Spotlight */}
                <motion.div
                    className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ x: mouseX, y: mouseY }}
                />

                {/* Ambient Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950/20 to-slate-900" />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div style={{ y, opacity }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md px-6 py-2 rounded-full text-blue-300 text-sm font-semibold mb-8"
                    >
                        <Sparkles size={16} className="text-blue-400" />
                        <span>Viitorul tău începe azi</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                        Construiește-ți <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Drumul spre Succes
                        </span>
                    </h2>

                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Nu lăsa pregătirea pentru BAC sau carieră pe ultima sută de metri.
                        Investește în tine cu AlgoMate.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-shadow duration-300 flex items-center gap-2 group ring-1 ring-white/10"
                        >
                            Înscrie-te Acum
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 rounded-2xl font-bold text-lg text-slate-300 border border-slate-700 hover:text-white transition-colors"
                        >
                            Contactează-ne
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
