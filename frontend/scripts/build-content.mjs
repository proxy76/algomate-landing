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
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const OUT_TS = path.join(ROOT, 'src', 'content', 'posts.generated.ts');
const OUT_SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const OUT_ROUTES = path.join(ROOT, '.generated-routes.json');

const SITE_URL = 'https://algomate.ro';

/** Pages that exist regardless of content, with their sitemap weighting. */
const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/servicii', changefreq: 'monthly', priority: '0.9' },
  { path: '/curriculum', changefreq: 'monthly', priority: '0.8' },
  { path: '/inscriere', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
  { path: '/multumim', changefreq: 'yearly', priority: '0.3' },
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
  ],
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

function renderMarkdown(md) {
  const raw = marked.parse(md, { async: false });
  return {
    clean: sanitizeHtml(raw, SANITIZE_OPTIONS),
    stripped: DANGEROUS.test(raw),
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

    const reason =
      data.draft === true ? 'draft' : publishDate > today ? `scheduled ${publishDate}` : null;

    if (reason) {
      held.push({ slug, reason });
      continue;
    }

    const words = content.trim().split(/\s+/).length;
    const { clean, stripped } = renderMarkdown(content);

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
    ...STATIC_PAGES.map((p) => ({
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
