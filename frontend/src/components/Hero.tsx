import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const WORDS = ["Excelență.", "Succes.", "Viitor.", "10 la BAC."];

const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [ready, setReady] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const typeSpeed = 90;
    const deleteSpeed = 45;
    const pauseTime = 2200;

    const handleType = () => {
      const fullWord = WORDS[currentWordIndex];

      if (isDeleting) {
        setCurrentText((prev) => fullWord.substring(0, prev.length - 1));
      } else {
        setCurrentText((prev) => fullWord.substring(0, prev.length + 1));
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
  }, [currentText, isDeleting, currentWordIndex, ready]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[105vh] flex items-start justify-center overflow-hidden"
    >
      <motion.div
        className="sticky top-0 h-screen w-full flex items-center justify-center"
        style={{ opacity: heroOpacity }}
      >
        {/* Subtle gradient orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#e8734a]/[0.04] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#e8734a]/[0.03] rounded-full blur-[120px]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 w-full px-6 text-center"
          style={{ y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 border border-[#2a2a2a] bg-[#1a1a1a]/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs text-[#999] font-medium mb-8 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8734a] animate-pulse" />
              REDUCERE 50% PENTRU MEDITAȚIILE DIN VARĂ
            </motion.div>

            <h1
              className="font-bold leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: 'clamp(1.125rem, 4.3vw, 4.5rem)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="block whitespace-nowrap text-[#f0f0f0]"
              >
                Investește în educația ta.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="block whitespace-nowrap mt-2"
              >
                <span className="text-[#e8734a]">Pregătește-te pentru </span>
                <span className="text-[#f0f0f0]">{currentText}</span>
                <span className="text-[#e8734a] animate-pulse">|</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Meditații de matematică și informatică pentru elevii care
              țintesc nota maximă. Metodă structurată, rezultate dovedite.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/servicii">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#e8734a] hover:bg-[#d4622e] text-white px-8 py-3.5 rounded-lg font-medium text-sm tracking-wide transition-colors duration-300 flex items-center gap-2 justify-center"
                >
                  Explorează Programele
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/inscriere">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border border-[#333] hover:border-[#555] text-[#ccc] hover:text-white px-8 py-3.5 rounded-lg font-medium text-sm tracking-wide transition-all duration-300"
                >
                  Înscrie-te Acum
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ opacity: indicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-[10px] text-[#666] uppercase tracking-[0.3em] font-medium">
            Descoperă
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-[#666]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
