import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../seo/structuredData';
import { posts } from '../content/posts.generated';

/**
 * Blog index — a contents page, not a card grid.
 *
 * Rows carry the metadata a reader actually sorts on (date, category,
 * length) in the margins, and give the whole width to the title.
 */

const MONTHS = [
  'ian', 'feb', 'mar', 'apr', 'mai', 'iun',
  'iul', 'aug', 'sep', 'oct', 'noi', 'dec',
];

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
};

const Blog: React.FC = () => {
  return (
    <PageTransition>
      <SEO
        title="Blog — Examene, metodă și probleme rezolvate | AlgoMate"
        description="Articole despre Evaluarea Națională, Bacalaureat și admiterea la liceu, plus probleme rezolvate pas cu pas la matematică și informatică."
        path="/blog"
        jsonLd={breadcrumbSchema([{ name: 'Blog', path: '/blog' }])}
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] text-[#e8734a] uppercase whitespace-nowrap">
                § AlgoMate / Blog
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#333] via-[#222] to-transparent" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] md:tracking-[0.3em] text-[#666] uppercase hidden md:inline">
                {posts.length} {posts.length === 1 ? 'articol' : 'articole'}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-6">
              <h1 className="font-display font-semibold text-[3rem] sm:text-6xl md:text-7xl text-[#f0f0f0] leading-[1.02] tracking-tight">
                Blog<em className="italic text-[#e8734a] font-normal">.</em>
              </h1>
              <p className="font-mono text-[11px] md:text-xs text-[#888] md:max-w-xs uppercase tracking-wider leading-relaxed">
                → Examene, metodă și probleme rezolvate pas cu pas.
              </p>
            </div>
          </motion.div>

          {/* Contents */}
          {posts.length === 0 ? (
            <div className="border-y border-[#222] py-20 text-center">
              {/* Same reason as the article standfirst: font-display pins
                  opsz to 144 and thins out badly at this size. */}
              <p className="text-lg text-[#999]">
                Primul articol e pe drum.
              </p>
              <Link
                to="/inscriere"
                className="group/link inline-flex items-center gap-3 mt-8 font-mono text-[10px] tracking-[0.3em] uppercase text-[#e8734a] pb-2 border-b border-[#e8734a]/20 hover:border-[#e8734a]/80 transition-all duration-300"
              >
                Între timp, rezervă o ședință
                <ArrowRight size={12} strokeWidth={2.5} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="border-t border-[#222]">
              {posts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.07 }}
                  className="border-b border-[#222]"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block py-8 md:py-10 hover:bg-[#111]/60 transition-colors duration-500 -mx-4 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8734a]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                      {/* Margin metadata */}
                      <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-2">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8734a]">
                          {post.category}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#666]">
                          {formatDate(post.publishDate)}
                        </span>
                      </div>

                      {/* Title + standfirst */}
                      <div className="md:col-span-8">
                        <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-[2.1rem] text-[#f0f0f0] leading-[1.15] tracking-tight mb-3 group-hover:text-white transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[0.95rem] text-[#999] leading-relaxed max-w-2xl">
                          {post.description}
                        </p>
                      </div>

                      {/* Length */}
                      <div className="md:col-span-1 md:text-right">
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#555] whitespace-nowrap">
                          {post.readingMinutes} min
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
