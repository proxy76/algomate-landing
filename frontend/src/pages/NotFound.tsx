import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

/**
 * The 404 page.
 *
 * Two ways to arrive here. A visitor follows a dead link from outside: nginx
 * finds no file, answers with a real 404 status and the prerendered copy of
 * this page (`error_page 404 /404.html` — the status is what keeps it from
 * being a soft 404, see docs/SERVER-SETUP.md §4.3.2). Or the app is already
 * running and the router matches nothing, or a post slug that does not exist.
 *
 * It does not use <SEO>: that component always emits a canonical URL, and a
 * page that stands in for every address that does not exist has none. noindex
 * is belt and braces — the status code already says it.
 */

const destinations = [
  { to: '/servicii', label: 'Programe și prețuri' },
  { to: '/blog', label: 'Subiecte rezolvate și articole' },
  { to: '/resurse', label: 'Ghiduri PDF gratuite' },
  { to: '/inscriere', label: 'Înscriere' },
];

const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <title>Pagina nu a fost găsită | AlgoMate</title>
      <meta name="robots" content="noindex, follow" />
      <meta
        name="description"
        content="Pagina căutată nu există sau a fost mutată. Vezi programele de meditații, articolele și ghidurile AlgoMate."
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-[#2a2a2a] bg-[#0c0c0c] px-6 sm:px-10 md:px-14 py-14 sm:py-16 md:py-20 rounded-sm"
          >
            {/* Corner ticks */}
            <span className="absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-[#e8734a]" aria-hidden />
            <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-[#e8734a]" aria-hidden />

            <p className="font-mono text-[10px] tracking-[0.3em] text-[#e8734a] uppercase mb-6">
              § Eroare 404
            </p>

            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-[#f0f0f0] mb-5 leading-[1.05] tracking-tight">
              Pagina nu a fost{' '}
              <em className="italic text-[#e8734a] font-normal">găsită.</em>
            </h1>

            <p className="text-[#bbb] text-base md:text-lg mb-10 max-w-md leading-relaxed">
              Adresa nu există sau pagina a fost mutată. Ce căutai este probabil într-unul
              dintre locurile de mai jos.
            </p>

            <ul className="border-t border-[#222] mb-10">
              {destinations.map((d) => (
                <li key={d.to} className="border-b border-[#222]">
                  <Link
                    to={d.to}
                    className="group flex items-center justify-between gap-4 py-4 text-[0.95rem] text-[#ccc] hover:text-[#f0f0f0] transition-colors focus-visible:outline-none focus-visible:text-[#e8734a]"
                  >
                    {d.label}
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="text-[#e8734a] group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/"
              className="group inline-flex items-center gap-3 bg-[#e8734a] hover:bg-[#f08c5a] text-[#0a0a0a] font-mono text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-4 transition-all duration-200 rounded-sm shadow-[0_0_0_1px_rgba(232,115,74,0.2),0_20px_40px_-20px_rgba(232,115,74,0.4)]"
            >
              <Home size={14} strokeWidth={2.5} />
              Pagina Principală
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
