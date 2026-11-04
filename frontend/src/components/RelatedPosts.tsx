import React from 'react';
import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';
import { posts } from '../content/posts.generated';

/**
 * Links from a landing page into the posts that match its subject.
 *
 * Driven by tags rather than a hand-kept list of slugs, for one reason: posts
 * are scheduled. A hard-coded link to next week's post would 404 until the
 * morning it publishes, while `posts` only ever contains what this build
 * actually published — so each scheduled rebuild adds the new post to every
 * landing page it belongs on, and nothing links ahead of time.
 *
 * Renders nothing when no post matches, so a page never shows an empty block.
 */
const RelatedPosts: React.FC<{
  tags: string[];
  heading: string;
  /** Slugs the page already links to in its own copy. */
  exclude?: string[];
  limit?: number;
}> = ({ tags, heading, exclude = [], limit = 4 }) => {
  const wanted = new Set(tags);
  const matches = posts
    .filter((p) => !exclude.includes(p.slug) && p.tags.some((t) => wanted.has(t)))
    .slice(0, limit);
  if (matches.length === 0) return null;

  return (
    <section className="mt-24 md:mt-32">
      <SectionLabel>Din blog</SectionLabel>
      <h2 className="font-display font-semibold text-3xl md:text-[2.5rem] text-[#f0f0f0] leading-[1.1] tracking-tight mb-10 max-w-2xl">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222] border border-[#222] max-w-4xl">
        {matches.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="group bg-[#0a0a0a] hover:bg-[#111] transition-colors duration-500 p-6 md:p-8"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#e8734a]">
              {p.category}
            </span>
            <h3 className="font-display font-semibold text-xl text-[#f0f0f0] leading-[1.25] tracking-tight mt-3 mb-2 group-hover:text-white">
              {p.title}
            </h3>
            <p className="text-[0.9rem] text-[#888] leading-relaxed">{p.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
