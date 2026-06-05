import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Home, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const ThankYou: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Mulțumim pentru Înscriere — AlgoMate"
        description="Înscrierea ta a fost trimisă cu succes. Te vom contacta în cel mai scurt timp cu toate detaliile necesare."
        path="/multumim"
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 w-full">
          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-[#2a2a2a] bg-[#0c0c0c] px-6 sm:px-10 md:px-14 py-14 sm:py-16 md:py-20 rounded-sm text-center"
          >
            {/* Corner ticks */}
            <span className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#e8734a]" aria-hidden />

            {/* Radial glow behind the icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(232,115,74,0.08) 0%, transparent 70%)',
              }}
            />

            {/* Animated checkmark icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 160, damping: 12 }}
              className="relative w-24 h-24 border-2 border-emerald-500/60 bg-emerald-500/5 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              {/* Subtle pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-emerald-400/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ delay: 0.5, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              />
              <CheckCircle size={42} strokeWidth={1.5} />
            </motion.div>

            {/* Status tag */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-[10px] tracking-[0.3em] text-emerald-400 uppercase mb-5 flex items-center justify-center gap-2"
            >
              <Sparkles size={12} strokeWidth={2} />
              ◆ Confirmat cu succes
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-[#f0f0f0] mb-5 leading-[1.05] tracking-tight"
            >
              Mulțumim pentru{' '}
              <em className="italic text-[#e8734a] font-normal">înscriere.</em>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-[#bbb] text-base md:text-lg mb-4 max-w-md mx-auto leading-relaxed"
            >
              Înscrierea ta a fost primită. Te vom contacta pe email-ul furnizat cu toate detaliile despre curs.
            </motion.p>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-[#888] uppercase mb-12 border border-[#222] bg-[#0a0a0a] px-5 py-2.5 rounded-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8734a] animate-pulse" />
              Răspundem de obicei în 24h
            </motion.div>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-[#333] to-transparent mb-10 origin-center"
            />

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/"
                className="group flex items-center gap-3 bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] font-mono text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-4 transition-all duration-200 rounded-sm shadow-[0_0_0_1px_rgba(232,115,74,0.2),0_20px_40px_-20px_rgba(232,115,74,0.4)]"
              >
                <Home size={14} strokeWidth={2.5} />
                Pagina Principală
              </Link>
              <Link
                to="/inscriere"
                className="group flex items-center gap-3 border border-[#333] hover:border-[#555] bg-[#0e0e0e] hover:bg-[#161616] text-[#ccc] hover:text-[#f0f0f0] font-mono text-[11px] tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 rounded-sm"
              >
                <ArrowLeft size={14} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                Altă Înscriere
              </Link>
            </motion.div>
          </motion.div>

          {/* Closing flourish */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex items-center justify-center gap-4 font-mono text-[9px] tracking-[0.4em] text-[#444] uppercase"
          >
            <span className="h-px w-16 bg-[#222]" />
            <span>◆ AlgoMate · MMXXVI ◆</span>
            <span className="h-px w-16 bg-[#222]" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ThankYou;
