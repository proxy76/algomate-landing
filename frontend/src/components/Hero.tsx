import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    const words = ["Excelență.", "Succes.", "Viitor.", "BAC."];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const handleType = () => {
            const fullWord = words[currentWordIndex];

            if (isDeleting) {
                setCurrentText(prev => fullWord.substring(0, prev.length - 1));
            } else {
                setCurrentText(prev => fullWord.substring(0, prev.length + 1));
            }

            if (!isDeleting && currentText === fullWord) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words]); // Added words dependency

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
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

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                        Investește în educația ta. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                            Pregătește-te pentru&nbsp;
                        </span>
                        <span>{currentText}</span>
                        <span className="animate-pulse">|</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Platforma premium de meditații pentru elevii care țintesc nota 10.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-colors transition-shadow duration-300"
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default React.memo(Hero);
