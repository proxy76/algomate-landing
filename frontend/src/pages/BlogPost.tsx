import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { posts, postBySlug } from '../content/posts.generated';
import { formatDate } from './Blog';

const SITE_URL = 'https://algomate.ro';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postBySlug(slug) : undefined;

  // Unknown slug: send the reader to the index rather than a dead end.
  if (!post) return <Navigate to="/blog" replace />;

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  /** Pairs with the visible article; keep in sync if the layout changes. */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
    datePublished: post.publishDate,
    dateModified: post.updatedDate || post.publishDate,
    inLanguage: 'ro',
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Răzvan Rădulescu',
      url: `${SITE_URL}/#instructor`,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'AlgoMate',
      url: SITE_URL,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <PageTransition>
      <SEO
        title={`${post.title} | AlgoMate`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        /* Falls back to the site-wide card when the post has no cover. */
        ogImage={post.coverImage ? `${SITE_URL}${post.coverImage}` : undefined}
        jsonLd={articleSchema}
      />
      <div className="min-h-screen text-[#f0f0f0] pt-24 md:pt-28 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14"
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[#777] hover:text-[#e8734a] transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
              Toate articolele
            </Link>
          </motion.div>

          <article>
            {/* Masthead */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mb-12 md:mb-16"
            >
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#e8734a]">
                  {post.category}
                </span>
                <span className="w-1 h-1 bg-[#333] rounded-full" aria-hidden />
                <time
                  dateTime={post.publishDate}
                  className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666]"
                >
                  {formatDate(post.publishDate)}
                </time>
                <span className="w-1 h-1 bg-[#333] rounded-full" aria-hidden />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666]">
                  {post.readingMinutes} min de citit
                </span>
              </div>

              <h1 className="font-display font-semibold text-[2.5rem] sm:text-5xl md:text-[3.5rem] text-[#f0f0f0] leading-[1.06] tracking-tight mb-7">
                {post.title}
              </h1>

              {/* Standfirst. Deliberately not font-display: that utility pins
                  opsz to 144, Fraunces' display cut, whose hairlines thin out
                  to nothing at reading size — and italic made it worse. The
                  body face at the prose colour also carries the eye into the
                  article instead of breaking the tone at the first paragraph. */}
              <p className="text-lg md:text-xl text-[#b8b8b8] leading-relaxed">
                {post.description}
              </p>

              {post.updatedDate && (
                <p className="mt-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#555]">
                  Actualizat · {formatDate(post.updatedDate)}
                </p>
              )}
            </motion.header>

            {/* Cover — optional, set via `coverImage` in the post frontmatter. */}
            {post.coverImage && (
              <motion.figure
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="max-w-3xl mb-12 md:mb-16"
              >
                <img
                  src={post.coverImage}
                  alt={post.coverAlt}
                  /* Fixed box: the intrinsic size isn't known at build time, and
                     a header image that reflows the article is worse than a crop. */
                  className="w-full aspect-[16/9] object-cover border border-[#222]"
                  /* Above the fold on every article — this is the LCP element. */
                  loading="eager"
                  fetchPriority="high"
                />
              </motion.figure>
            )}

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              /* The cover already separates masthead from body; a rule under it reads as clutter. */
              className={`prose-algomate max-w-3xl ${
                post.coverImage ? '' : 'border-t border-[#222] pt-12 md:pt-14'
              }`}
              /* Rendered at build time from repo-controlled markdown. */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* Byline */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mt-16 md:mt-20 pt-10 border-t border-[#222]"
            >
              <div className="flex items-start gap-5">
                <img
                  src="/instructor-razvan.jpg"
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  /* Face sits in the upper third of the portrait, not the very top. */
                  className="w-14 h-14 md:w-16 md:h-16 object-cover object-[center_22%] grayscale-[0.4] shrink-0"
                />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#e8734a] mb-2">
                    Scris de
                  </p>
                  <p className="font-sans font-medium text-[#e4e4e4] mb-2">Răzvan Rădulescu</p>
                  <p className="text-[0.9rem] text-[#888] leading-relaxed max-w-md">
                    Fondator AlgoMate. Predau matematică și informatică pentru Bacalaureat
                    și Evaluare Națională.
                  </p>
                  <Link
                    to="/inscriere"
                    className="group/link inline-flex items-center gap-3 mt-5 font-mono text-[10px] tracking-[0.25em] uppercase text-[#e8734a] pb-2 border-b border-[#e8734a]/20 hover:border-[#e8734a]/80 transition-all duration-300"
                  >
                    Rezervă o ședință
                    <ArrowRight size={12} strokeWidth={2.5} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.footer>
          </article>

          {/* Further reading */}
          {others.length > 0 && (
            <section className="mt-20 md:mt-28">
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#666]">
                  Citește mai departe
                </span>
                <span className="h-px flex-1 bg-[#222]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222]">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group bg-[#0a0a0a] hover:bg-[#111] transition-colors duration-500 p-6 md:p-8"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8734a]">
                      {p.category}
                    </span>
                    <h3 className="font-display font-semibold text-xl md:text-2xl text-[#f0f0f0] leading-[1.2] tracking-tight mt-3 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-[0.9rem] text-[#888] leading-relaxed">{p.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPost;
