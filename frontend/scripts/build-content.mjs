/**
 * Build-time content pipeline.
 *
 * Reads content/posts/*.md, and emits three things:
 *   1. src/content/posts.generated.ts — typed post data for the app
 *   2. public/sitemap.xml             — static pages + published posts
 *   3. .generated-routes.json         — route list for prerender.js
 *
 * Markdown is rendered here rather than in the browser so no parser ships
 * in the bundle and every post is real HTML in the prerendered output.
 *
 * Scheduling: a post is published when `draft` is not true AND publishDate
 * is today or earlier. Future-dated posts stay invisible until a later
 * build — which is why a daily scheduled rebuild is what makes scheduling
 * work at all. Without it, a post dated the 14th sits unpublished until
 * the next time someone deploys.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked, Marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import katex from 'katex';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_TS = path.join(ROOT, 'src', 'content', 'posts.generated.ts');
const OUT_SITEMAP = path.join(PUBLIC_DIR, 'sitemap.xml');
const OUT_ROUTES = path.join(ROOT, '.generated-routes.json');

const SITE_URL = 'https://algomate.ro';

/**
 * Pages that exist regardless of content, with their sitemap weighting.
 * `noindex: true` still gets prerendered and served — it is only kept out of
 * the sitemap, to match the robots meta the page itself emits. Submitting a
 * URL you tell crawlers not to index is a contradictory signal.
 */
const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/servicii', changefreq: 'monthly', priority: '0.9' },
  // Subject landing pages — one query family each. Adding a route to App.tsx
  // without adding it here leaves it out of both the sitemap and the prerender
  // list, which means it 404s in production.
  { path: '/meditatii-informatica-bac', changefreq: 'monthly', priority: '0.9' },
  { path: '/curriculum', changefreq: 'monthly', priority: '0.8' },
  { path: '/inscriere', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
  { path: '/multumim', changefreq: 'yearly', priority: '0.3', noindex: true },
  { path: '/termeni-si-conditii', changefreq: 'yearly', priority: '0.3' },
  { path: '/politica-de-confidentialitate', changefreq: 'yearly', priority: '0.3' },
];

const REQUIRED = ['title', 'description', 'publishDate', 'category'];

/**
 * Rendered HTML is injected with dangerouslySetInnerHTML, and marked passes
 * inline HTML straight through — a <script> in a .md file would otherwise
 * end up in the page. Posts may be drafted by a model that read an untrusted
 * source, so the markup is whitelisted here rather than trusted because it
 * came from the repo. Allow-list covers what markdown legitimately produces.
 */
const SANITIZE_OPTIONS = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'hr', 'br',
    'strong', 'em', 'del', 'sup', 'sub',
    'code', 'pre', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    // Callout boxes, emitted by the renderer below — never written by hand.
    'aside', 'div',
  ],
  // Only the class names this build emits; anything else is dropped, so raw
  // markup in a post cannot borrow arbitrary site styling. It can still
  // reproduce a callout by hand — but that grants nothing, since `:::raspuns`
  // produces the same box. Styling is all these classes carry.
  allowedClasses: {
    aside: ['callout', 'callout--solutie', 'callout--raspuns', 'callout--atentie', 'callout--alternativa'],
    p: ['callout__label'],
    div: ['math-display'],
  },
  allowedAttributes: {
    // target/rel must be listed or the transform below has them stripped again.
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    code: ['class'], // marked emits language-xxx for fenced blocks
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  // No inline styles, no event handlers, no data: URIs.
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  transformTags: {
    a: (tagName, attribs) => {
      const href = attribs.href || '';
      const external = /^https?:\/\//i.test(href) && !href.includes('algomate.ro');
      return {
        tagName,
        attribs: external
          ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' }
          : attribs,
      };
    },
  },
};

/**
 * Comparing lengths would flag every post, because sanitize-html also
 * normalises entities and attribute quoting. Look for the constructs that
 * actually matter instead, so the warning stays worth reading.
 */
const DANGEROUS = /<\s*(script|iframe|object|embed|style|form|link|meta)\b|\son\w+\s*=|javascript:/i;

/**
 * ─── Rich mode: LaTeX maths and callout boxes ───────────────────────────────
 *
 * Opt-in per post with `math: true` in the frontmatter. Off by default so the
 * existing posts keep their exact current output — a `$` in ordinary prose
 * must not suddenly start parsing as maths.
 *
 * WHY MATHS IS RENDERED AFTER SANITISATION
 *
 * KaTeX emits <span>s carrying inline `style` attributes plus a MathML tree
 * (math, semantics, mrow, mtable...). The allow-list above strips inline
 * styles and unknown tags on purpose, and would shred that output into
 * gibberish. Loosening it is the wrong fix: `style` is exactly the attribute
 * you least want to hand to untrusted markdown.
 *
 * So the formulas never travel through the sanitiser at all. The marked
 * extensions below replace each formula with an opaque alphanumeric
 * placeholder, the author's HTML is sanitised exactly as strictly as before,
 * and the placeholders are swapped for KaTeX output afterwards. What gets
 * substituted in is generated by us from a formula string — it is trusted by
 * construction, not by permission.
 *
 * The placeholder carries a per-build random nonce so that a post which
 * literally contains the placeholder text cannot smuggle HTML into the page.
 */
const NONCE = crypto.randomBytes(6).toString('hex');
const placeholderFor = (i) => `KTX${NONCE}X${i}XKTX`;
const PLACEHOLDER_RE = new RegExp(`KTX${NONCE}X(\\d+)XKTX`, 'g');

/** Callout variants. Aliases exist because authors reach for the obvious word. */
const CALLOUTS = {
  solutie: { slug: 'solutie', label: 'Soluție' },
  rezolvare: { slug: 'solutie', label: 'Soluție' },
  raspuns: { slug: 'raspuns', label: 'Răspuns final' },
  atentie: { slug: 'atentie', label: 'Atenție' },
  greseala: { slug: 'atentie', label: 'Greșeală frecventă' },
  alternativa: { slug: 'alternativa', label: 'Metodă alternativă' },
  metoda: { slug: 'alternativa', label: 'Metodă alternativă' },
};

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Builds a marked instance whose maths tokens resolve to placeholders, and
 * collects the rendered KaTeX for substitution after sanitisation.
 */
function createRichMarked(file) {
  const formulas = [];

  const render = (tex, displayMode) => {
    try {
      return katex.renderToString(tex, {
        displayMode,
        throwOnError: true,
        strict: false,
        // \includegraphics and friends can reference URLs; nothing in an exam
        // solution needs them, and turning them off keeps the surface small.
        trust: false,
      });
    } catch (err) {
      fail(file, `formulă LaTeX invalidă — ${err.message.split('\n')[0]}\n    ${tex}`);
    }
  };

  const stash = (tex, displayMode) => {
    formulas.push(render(tex, displayMode));
    return placeholderFor(formulas.length - 1);
  };

  const blockMath = {
    name: 'blockMath',
    level: 'block',
    start(src) {
      return src.indexOf('$$');
    },
    tokenizer(src) {
      const m = /^\$\$([\s\S]+?)\$\$(?:\n+|$)/.exec(src);
      if (m) return { type: 'blockMath', raw: m[0], text: m[1].trim() };
    },
    renderer(token) {
      // Wrapped so the display formula can scroll on narrow screens instead of
      // widening the page — a long integral is easily wider than a phone.
      return `<div class="math-display">${stash(token.text, true)}</div>\n`;
    },
  };

  const inlineMath = {
    name: 'inlineMath',
    level: 'inline',
    start(src) {
      return src.indexOf('$');
    },
    tokenizer(src) {
      // No newline inside, so an unclosed "$" cannot swallow the rest of a post.
      const m = /^\$([^$\n]+?)\$/.exec(src);
      if (m) return { type: 'inlineMath', raw: m[0], text: m[1].trim() };
    },
    renderer(token) {
      return stash(token.text, false);
    },
  };

  const callout = {
    name: 'callout',
    level: 'block',
    start(src) {
      return src.indexOf(':::');
    },
    tokenizer(src) {
      const m = /^:::[ \t]*([a-zA-Zăâîșț]+)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n+|$)/.exec(src);
      if (!m) return;
      const key = m[1].toLowerCase();
      if (!CALLOUTS[key]) {
        fail(
          file,
          `tip de casetă necunoscut ":::${m[1]}". Disponibile: ${Object.keys(CALLOUTS).join(', ')}`
        );
      }
      return {
        type: 'callout',
        raw: m[0],
        variant: key,
        title: m[2].trim(),
        // Inner content is parsed as markdown, so lists, bold and maths work.
        tokens: this.lexer.blockTokens(m[3].trim()),
      };
    },
    renderer(token) {
      const cfg = CALLOUTS[token.variant];
      const label = token.title ? `${cfg.label} · ${token.title}` : cfg.label;
      const body = this.parser.parse(token.tokens);
      return (
        `<aside class="callout callout--${cfg.slug}">` +
        `<p class="callout__label">${escapeHtml(label)}</p>` +
        body +
        `</aside>\n`
      );
    },
  };

  const instance = new Marked({ extensions: [blockMath, inlineMath, callout] });
  return { instance, formulas };
}

function renderMarkdown(md, { math = false, file } = {}) {
  if (!math) {
    const raw = marked.parse(md, { async: false });
    return { clean: sanitizeHtml(raw, SANITIZE_OPTIONS), stripped: DANGEROUS.test(raw) };
  }

  const { instance, formulas } = createRichMarked(file);
  const raw = instance.parse(md, { async: false });
  const stripped = DANGEROUS.test(raw);

  // Sanitise the author's HTML first — placeholders are plain alphanumeric
  // text and pass through untouched — then substitute the trusted KaTeX.
  const sanitized = sanitizeHtml(raw, SANITIZE_OPTIONS);
  const clean = sanitized.replace(PLACEHOLDER_RE, (_, i) => formulas[Number(i)] ?? '');

  return { clean, stripped, formulaCount: formulas.length };
}

/**
 * Optional header image. Referenced root-relative from public/, e.g.
 * /blog/admitere.jpg, and checked against the filesystem here: the cover is
 * also the og:image, so a typo would degrade every share of the post as well
 * as leaving a broken masthead. Failing the build is cheaper than finding out
 * from a preview card.
 *
 * coverAlt is optional on purpose — a header image that only restates the
 * headline is decorative, and an empty alt is the correct markup for that.
 */
function resolveCover(file, data) {
  const src = data.coverImage;
  if (src === undefined || src === null || src === '') {
    return { coverImage: null, coverAlt: '' };
  }

  if (typeof src !== 'string' || !src.startsWith('/')) {
    fail(file, `coverImage must be a path rooted in public/, e.g. "/blog/name.jpg" — got "${src}"`);
  }

  const onDisk = path.join(PUBLIC_DIR, src.replace(/^\/+/, ''));
  if (!fs.existsSync(onDisk)) {
    fail(file, `coverImage "${src}" not found — expected a file at ${path.relative(ROOT, onDisk)}`);
  }

  return {
    coverImage: src,
    coverAlt: typeof data.coverAlt === 'string' ? data.coverAlt : '',
  };
}

/** YYYY-MM-DD in UTC, so scheduling doesn't drift with the build machine. */
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function fail(file, message) {
  console.error(`\n  ✗ ${path.basename(file)}: ${message}\n`);
  process.exit(1);
}

function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(POSTS_DIR, f));

  const today = todayISO();
  const published = [];
  const held = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data, content } = matter(raw);

    for (const key of REQUIRED) {
      if (!data[key]) fail(file, `missing required frontmatter field "${key}"`);
    }

    // gray-matter turns unquoted YAML dates into Date objects; normalise both forms.
    const publishDate =
      data.publishDate instanceof Date
        ? data.publishDate.toISOString().slice(0, 10)
        : String(data.publishDate).slice(0, 10);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(publishDate)) {
      fail(file, `publishDate must be YYYY-MM-DD, got "${data.publishDate}"`);
    }

    const slug =
      data.slug || path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');

    if (!/^[a-z0-9-]+$/.test(slug)) {
      fail(file, `slug must be lowercase letters, digits and hyphens, got "${slug}"`);
    }

    // Validated before the publish gate, so a broken path surfaces while the
    // post is still a draft rather than on the morning it goes live.
    const { coverImage, coverAlt } = resolveCover(file, data);

    const reason =
      data.draft === true ? 'draft' : publishDate > today ? `scheduled ${publishDate}` : null;

    if (reason) {
      held.push({ slug, reason });
      continue;
    }

    const words = content.trim().split(/\s+/).length;
    const mathMode = data.math === true;
    const { clean, stripped, formulaCount } = renderMarkdown(content, {
      math: mathMode,
      file,
    });

    if (mathMode) {
      console.log(`  ƒ "${slug}" mod matematic — ${formulaCount} formule randate`);
    }

    // Worth surfacing: markup was removed, so the source had HTML in it.
    if (stripped) {
      console.log(`  ! "${slug}" contained HTML that was stripped — check the source`);
    }

    published.push({
      slug,
      title: data.title,
      description: data.description,
      publishDate,
      updatedDate: data.updatedDate
        ? String(
            data.updatedDate instanceof Date
              ? data.updatedDate.toISOString().slice(0, 10)
              : data.updatedDate
          ).slice(0, 10)
        : null,
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage,
      coverAlt,
      readingMinutes: Math.max(1, Math.round(words / 200)),
      html: clean,
    });
  }

  published.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  if (published.length) {
    console.log(`  ✓ ${published.length} published post(s)`);
  }
  for (const h of held) {
    console.log(`  · holding "${h.slug}" (${h.reason})`);
  }

  return published;
}

function writeTs(posts) {
  const body = `// GENERATED by scripts/build-content.mjs — do not edit by hand.
// Source of truth is content/posts/*.md. Re-run \`npm run content\` after editing.

export interface Post {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  updatedDate: string | null;
  category: string;
  tags: string[];
  /** Header image, root-relative to public/. Null when the post has none. */
  coverImage: string | null;
  /** Empty when the image is decorative — see resolveCover in build-content.mjs. */
  coverAlt: string;
  readingMinutes: number;
  /** Rendered at build time; no markdown parser ships to the browser. */
  html: string;
}

export const posts: Post[] = ${JSON.stringify(posts, null, 2)};

export const postBySlug = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
`;

  fs.mkdirSync(path.dirname(OUT_TS), { recursive: true });
  fs.writeFileSync(OUT_TS, body, 'utf-8');
}

function writeSitemap(posts) {
  const today = todayISO();

  const entries = [
    ...STATIC_PAGES.filter((p) => !p.noindex).map((p) => ({
      loc: `${SITE_URL}${p.path}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.updatedDate || p.publishDate,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  fs.writeFileSync(OUT_SITEMAP, xml, 'utf-8');
}

function writeRoutes(posts) {
  const routes = [
    ...STATIC_PAGES.map((p) => p.path),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  fs.writeFileSync(OUT_ROUTES, JSON.stringify(routes, null, 2), 'utf-8');
}

const posts = readPosts();
writeTs(posts);
writeSitemap(posts);
writeRoutes(posts);
console.log(`  ✓ content built (${posts.length} post(s), ${STATIC_PAGES.length} static pages)`);
