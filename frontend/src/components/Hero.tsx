import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const WORDS = ["Excelență.", "Succes.", "Viitor.", "BAC."];

const Hero: React.FC = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasEntryAnimFinished, setHasEntryAnimFinished] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);

    // Scroll-linked transforms: as user scrolls, hero text fades up and disappears
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // Start typewriter only after the fade-in completes (~1.2s)
    useEffect(() => {
        const timer = setTimeout(() => setHasEntryAnimFinished(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!hasEntryAnimFinished) return;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const handleType = () => {
            const fullWord = WORDS[currentWordIndex];

            if (isDeleting) {
                setCurrentText(prev => fullWord.substring(0, prev.length - 1));
            } else {
                setCurrentText(prev => fullWord.substring(0, prev.length + 1));
            }

            if (!isDeleting && currentText === fullWord) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, hasEntryAnimFinished]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[110vh] flex items-start justify-center overflow-hidden"
        >
            {/* Sticky inner container — stays fixed while section scrolls */}
            <motion.div
                className="sticky top-0 h-screen w-full flex items-center justify-center"
                style={{ opacity: heroOpacity }}
            >
                {/* Background Animation (Abstract Blobs) */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            x: [0, 100, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px]"
                    />
                </div>

                {/* Hero Content */}
                <motion.div
                    className="relative z-10 container mx-auto px-6 text-center"
                    style={{ y: heroY }}
                >
                    {/* Cinematic fade-in: stagger children */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-block"
                            >
                                Investește în educația ta.
                            </motion.span>
                            <br />
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 inline-block"
                            >
                                Pregătește-te pentru&nbsp;
                            </motion.span>
                            <span>{currentText}</span>
                            <span className="animate-pulse">|</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
                        >
                            Platforma premium de meditații pentru elevii care țintesc nota 10.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col md:flex-row justify-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-colors duration-300"
                            >
                                Explorează Programele
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-colors duration-300"
                            >
                                Contactează-ne
                            </motion.button>
                        </motion.div>
                    </motion.div>

                </motion.div>

                {/* Scroll indicator — fixed to bottom of viewport */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                    style={{ opacity: indicatorOpacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <span className="text-xs text-gray-400 uppercase tracking-[0.25em] font-medium">
                        Descoperă mai mult
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={24} className="text-gray-400" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default React.memo(Hero);
