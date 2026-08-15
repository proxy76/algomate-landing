/**
 * Live crawlability check against a deployed site.
 *
 *   node scripts/check-live-seo.mjs [baseUrl]
 *
 * Everything here is about what the *server* does — the things a build cannot
 * verify, because they depend on web-server config rather than on the output
 * in dist/. Run it after any change to the nginx config, and after a deploy.
 *
 * Exits non-zero on failure, so it can gate a deploy step.
 */

const BASE = (process.argv[2] || 'https://algomate.ro').replace(/\/$/, '');
const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

let failed = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const bad = (m) => { failed++; console.log(`  ✗ ${m}`); };

const req = async (url, redirect = 'manual') => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect });
  const body = r.status < 300 || r.status >= 400 ? await r.text() : '';
  return { status: r.status, location: r.headers.get('location'), body };
};

const pick = (html, re) => { const m = html.match(re); return m ? m[1] : null; };

console.log(`\nChecking ${BASE} as Googlebot\n${'─'.repeat(64)}`);

// ── robots.txt ──────────────────────────────────────────────────────────────
console.log('\nrobots.txt');
const robots = await req(`${BASE}/robots.txt`);
if (robots.status !== 200) bad(`robots.txt returned ${robots.status}`);
else {
  ok('reachable');
  // Only a global disallow matters here; per-bot AI blocks are deliberate.
  const globalBlock = /^user-agent:\s*\*\s*$([\s\S]*?)(?=^user-agent:|\Z)/gim;
  let blocksAll = false;
  for (const m of robots.body.matchAll(globalBlock)) {
    if (/^\s*disallow:\s*\/\s*$/im.test(m[1])) blocksAll = true;
  }
  blocksAll ? bad('a User-agent: * group contains Disallow: /') : ok('does not block crawling');
  robots.body.match(/^\s*sitemap:\s*(\S+)/im)
    ? ok('declares a sitemap')
    : bad('no Sitemap: directive');
}

// ── sitemap ─────────────────────────────────────────────────────────────────
console.log('\nsitemap.xml');
const sm = await req(`${BASE}/sitemap.xml`);
let urls = [];
if (sm.status !== 200) bad(`sitemap.xml returned ${sm.status}`);
else {
  urls = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  urls.length ? ok(`${urls.length} URLs listed`) : bad('sitemap contains no URLs');
  const offHost = urls.filter((u) => !u.startsWith(BASE));
  if (offHost.length) bad(`${offHost.length} URL(s) not on ${BASE}: ${offHost[0]}`);
}

// ── every sitemap URL must be a direct 200 whose canonical matches ──────────
// A sitemap URL that redirects is the single most common reason a page never
// gets indexed: Google treats the submitted URL as non-canonical, and if the
// destination points its canonical back at the redirecting URL, neither wins.
console.log('\nsitemap URLs resolve directly');
for (const u of urls) {
  const r = await req(u);
  const path = u.replace(BASE, '') || '/';
  if (r.status >= 300 && r.status < 400) {
    bad(`${path} → ${r.status} ${r.location}`);
    continue;
  }
  if (r.status !== 200) { bad(`${path} → ${r.status}`); continue; }

  const canonical = pick(r.body, /<link rel="canonical" href="([^"]*)"/i);
  if (!canonical) bad(`${path} 200 but no canonical`);
  else if (canonical !== u) bad(`${path} 200, canonical points elsewhere: ${canonical}`);
  else ok(`${path} 200, canonical matches`);
}

// ── unknown URLs must 404, not fall back to the app shell ──────────────────
// An SPA fallback returns 200 for everything, so every mistyped or scraped
// link becomes a soft 404 and burns crawl budget.
console.log('\nunknown URLs return 404');
const home = await req(`${BASE}/`);
for (const p of ['/nu-exista-deloc', '/blog/slug-inventat', '/wp-login.php']) {
  const r = await req(`${BASE}${p}`);
  if (r.status === 404) ok(`${p} → 404`);
  else if (r.status === 200 && home.status === 200 && r.body.length === home.body.length) {
    bad(`${p} → 200 serving the homepage byte-for-byte (soft 404)`);
  } else bad(`${p} → ${r.status} (expected 404)`);
}

// ── no scheme or port leaking out of the origin ────────────────────────────
// nginx behind a TLS-terminating proxy will build redirects from its own
// listening scheme and port unless absolute_redirect/port_in_redirect are off.
console.log('\nredirects stay on the public origin');
let leaks = 0;
for (const u of [`${BASE}/blog`, `${BASE}/servicii`, ...urls.slice(0, 4)]) {
  const r = await req(u);
  if (r.location && /^https?:\/\/[^/]*(:\d+|^http:)/.test(r.location) && !r.location.startsWith(BASE)) {
    bad(`${u.replace(BASE, '') || '/'} redirects off-origin → ${r.location}`);
    leaks++;
  }
}
if (!leaks) ok('no redirect leaks a different scheme, host or port');

// ── indexability of the article pages ──────────────────────────────────────
console.log('\nblog posts are indexable');
const posts = urls.filter((u) => /\/blog\/./.test(u));
if (!posts.length) console.log('  · no blog post URLs in the sitemap yet');
for (const u of posts) {
  const r = await req(u, 'follow');
  const robotsMeta = pick(r.body, /<meta name="robots" content="([^"]*)"/i) || '';
  const path = u.replace(BASE, '');
  if (/noindex/i.test(robotsMeta)) bad(`${path} is noindex`);
  else ok(`${path} indexable`);
  /max-image-preview:large/i.test(robotsMeta)
    ? ok(`${path} eligible for large previews / Discover`)
    : bad(`${path} lacks max-image-preview:large`);
  const text = r.body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ').trim();
  text.length > 1000
    ? ok(`${path} serves ${text.length} chars without JS`)
    : bad(`${path} only ${text.length} chars — content may need JS`);
}

console.log(`\n${'─'.repeat(64)}`);
console.log(failed ? `\n${failed} check(s) FAILED\n` : '\nAll checks passed\n');
process.exit(failed ? 1 : 0);
