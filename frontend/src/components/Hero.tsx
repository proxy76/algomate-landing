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

        {/* Editorial corner meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="hidden md:flex absolute top-28 left-8 items-center gap-3 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-[#666]"
        >
          <span className="text-[#e8734a]">◆</span>
          <span>Cap. 00 — Debut</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="hidden md:flex absolute top-28 right-8 items-center gap-3 z-20 font-mono text-[10px] uppercase tracking-[0.3em] text-[#666]"
        >
          <span>București · Anul 2026</span>
          <span className="text-[#e8734a]">◆</span>
        </motion.div>

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
            {/* Monospace promo tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 md:gap-3 mb-10 flex-wrap justify-center"
            >
              <span className="hidden sm:inline-block h-px w-8 bg-[#e8734a]/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8734a] animate-pulse" />
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase">
                [ Reducere 50% · Vara 2026 ]
              </span>
              <span className="hidden sm:inline-block h-px w-8 bg-[#e8734a]/40" />
            </motion.div>

            <h1
              className="font-display font-semibold leading-[1.05] tracking-tight mb-8 text-balance"
              style={{ fontSize: 'clamp(1.75rem, 5.6vw, 5.4rem)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="block text-[#f0f0f0]"
              >
                Meditații de <em className="italic text-[#e8734a] font-normal">matematică</em> și <em className="italic text-[#e8734a] font-normal">informatică.</em>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="block mt-3 italic font-normal"
                style={{ fontSize: '0.78em' }}
              >
                <span className="text-[#999]">Pregătește-te pentru </span>
                <span className="not-italic font-semibold text-[#f0f0f0] whitespace-nowrap">
                  {currentText}
                  <span className="text-[#e8734a] animate-pulse not-italic">|</span>
                </span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-base md:text-lg text-[#888] max-w-xl mx-auto mb-12 leading-relaxed text-balance"
            >
              Meditații de matematică și informatică pentru elevii care
              țintesc nota maximă. Metodă structurată, rezultate dovedite.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center sm:justify-center gap-3"
            >
              <Link to="/servicii">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 flex items-center gap-3 justify-center"
                >
                  Explorează Programele
                  <ArrowRight size={14} strokeWidth={2.5} />
                </motion.button>
              </Link>
              <Link to="/inscriere">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="border border-[#333] hover:border-[#e8734a]/60 text-[#ccc] hover:text-white px-8 py-4 font-mono text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-200"
                >
                  Înscrie-te Acum
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — editorial style */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          style={{ opacity: indicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="font-mono text-[9px] text-[#666] uppercase tracking-[0.4em]">
            ─── Descoperă ───
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-[#e8734a]/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Hero);
