import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Section — visible on the homepage.
 * 
 * Pairs with the FAQPage JSON-LD schema in structuredData.ts.
 * The questions and answers here MUST stay in sync with the schema
 * to avoid Google penalties for inconsistent structured data.
 * 
 * SEO purpose: Provides keyword-rich, indexable text content
 * that targets long-tail queries like "cât costă meditațiile BAC"
 * and drives Google FAQ rich results.
 */

const faqItems = [
  {
    question: 'Cât costă meditațiile la AlgoMate?',
    answer:
      'Prețul standard este de 120 RON/ședință. În perioada promoțională de vară 2026, beneficiezi de 50% reducere — doar 60 RON/ședință în grupe sau 80 RON/ședință individuală.',
  },
  {
    question: 'Meditațiile sunt online sau fizic?',
    answer:
      'Toate sesiunile AlgoMate sunt în format online, prin videoconferință. Poți participa de oriunde, ai nevoie doar de un laptop și conexiune la internet.',
  },
  {
    question: 'Ce materii predați pentru BAC?',
    answer:
      'Oferim meditații de Informatică BAC (C/C++), Matematică BAC (M1/M2/M3) și cursuri introductive de programare (Python/C++) pentru clasa a 9-a.',
  },
  {
    question: 'Care este rata de promovabilitate?',
    answer:
      'Rata noastră de promovabilitate este de 100% la Examenul Național, cu o medie a notelor de 9.8 la BAC.',
  },
  {
    question: 'Cât durează o sesiune de meditații?',
    answer:
      'Fiecare sesiune durează 2 ore și se desfășoară în grupe mici pentru atenție personalizată.',
  },
  {
    question: 'Pot începe meditațiile în timpul verii?',
    answer:
      'Da! AlgoMate funcționează și pe timpul verii. Cursurile de introducere în programare încep pe 15 iulie, iar cele de BAC pe 15 august 2026.',
  },
];

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ question, answer, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-[#222]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 md:gap-5 flex-1 pr-4">
          <span className="font-mono text-[10px] text-[#666] tabular-nums tracking-[0.15em] pt-1.5 w-6 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] md:text-base text-[#e4e4e4] font-medium leading-snug group-hover:text-[#f0f0f0] transition-colors">
            {question}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#e8734a] shrink-0"
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-10 md:pl-11 pb-6 md:pb-7 pr-8">
              <p className="text-[14px] md:text-[15px] text-[#999] leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-14 md:mb-20">
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § 05
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                Întrebări Frecvente
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h2 className="font-display font-semibold text-[2.25rem] sm:text-5xl md:text-6xl text-[#f0f0f0] leading-[1.05] tracking-tight max-w-3xl">
                Întrebări <em className="italic text-[#e8734a] font-normal">frecvente.</em>
              </h2>
              <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
                → Răspunsuri la cele mai comune întrebări despre meditațiile noastre.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ items */}
        <div className="border-t border-[#222]">
          {faqItems.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQ);
