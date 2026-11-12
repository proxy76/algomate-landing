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
  return { status: r.status, location: r.headers.get('location'), body, headers: r.headers };
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

  // Not every sitemap URL is a page: the PDF guides are listed too. A file
  // has no <head>, so there is no canonical to demand of it — what can go
  // wrong instead is a manifest entry whose file is missing or truncated, or
  // an nginx change that starts answering /descarcari/ with the 404 page.
  const type = (r.headers.get('content-type') || '').split(';')[0].trim();
  if (type !== 'text/html') {
    const bytes = Number(r.headers.get('content-length')) || r.body.length;
    if (path.endsWith('.pdf') && type !== 'application/pdf') bad(`${path} 200 but served as ${type || 'no content-type'}`);
    else if (bytes < 10_000) bad(`${path} 200 but only ${bytes} bytes`);
    else ok(`${path} 200, ${type}, ${Math.round(bytes / 1024)} kB`);
    continue;
  }

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

// The 404 *body* is the site's own prerendered page (nginx: error_page 404
// /404.html). The status above is what matters to a crawler; this is what
// matters to a person — and it must say noindex and must not claim a
// canonical, or it would be nominating itself for every dead URL.
{
  const r = await req(`${BASE}/nu-exista-deloc`);
  const robotsMeta = pick(r.body, /<meta name="robots" content="([^"]*)"/i) || '';
  if (!/Pagina nu a fost/i.test(r.body)) bad('404 response is not the branded page (is error_page 404 /404.html still in nginx?)');
  else if (!/noindex/i.test(robotsMeta)) bad('404 page is not noindex');
  else if (/<link rel="canonical"/i.test(r.body)) bad('404 page declares a canonical');
  else ok('404 body is the site page: noindex, no canonical');

  // The page must have no address at which it answers 200.
  const direct = await req(`${BASE}/404.html`);
  direct.status === 404 ? ok('/404.html itself → 404') : bad(`/404.html → ${direct.status} (expected 404 — \`internal\` missing?)`);
}

// Files that are never content. A stray .env or .git in the docroot is the
// classic way a static site leaks a secret.
for (const p of ['/.env', '/.git/config', '/blog/.gitkeep']) {
  const r = await req(`${BASE}${p}`);
  r.status === 404 ? ok(`${p} → 404`) : bad(`${p} → ${r.status} (dotfiles must not be served)`);
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

// ── transport and response headers ─────────────────────────────────────────
// All of this is nginx config (deploy/nginx/algomate.conf.example), and all of
// it is the kind of thing that vanishes without a trace: one add_header inside
// a location block drops every header inherited from the server block.
console.log('\nsecurity headers');
const isHttps = BASE.startsWith('https://');
{
  const h = home.headers;
  const expectHeader = (name, test, why) => {
    const v = h.get(name);
    if (!v) bad(`${name} missing — ${why}`);
    else if (!test(v)) bad(`${name} is "${v}" — ${why}`);
    else ok(`${name}: ${v.length > 70 ? v.slice(0, 67) + '…' : v}`);
  };
  if (isHttps) {
    expectHeader('strict-transport-security', (v) => /max-age=\d{7,}/.test(v), 'browsers may be downgraded to http');
  }
  expectHeader('x-content-type-options', (v) => /nosniff/i.test(v), 'MIME sniffing is not disabled');
  expectHeader('referrer-policy', (v) => v.length > 0, 'full URLs leak to other sites');
  expectHeader(
    'content-security-policy',
    (v) => /frame-ancestors 'none'/.test(v) && /script-src [^;]*'self'/.test(v) && !/script-src[^;]*'unsafe-inline'/.test(v),
    'must forbid framing and inline script'
  );
  expectHeader('x-frame-options', (v) => /deny|sameorigin/i.test(v), 'the page can be framed by older browsers');

  // Headers must survive on error responses and on downloads too.
  const nf = await req(`${BASE}/nu-exista-deloc`);
  nf.headers.get('content-security-policy')
    ? ok('headers are present on a 404 as well')
    : bad('404 responses carry no Content-Security-Policy (add_header … always)');
}

if (isHttps) {
  console.log('\nplain http redirects to https');
  const plain = await req(BASE.replace(/^https:/, 'http:') + '/servicii');
  if (plain.status >= 301 && plain.status <= 308 && (plain.location || '').startsWith(`${BASE}/servicii`)) {
    ok(`http → ${plain.status} ${plain.location}`);
  } else {
    bad(`http://…/servicii answered ${plain.status}${plain.location ? ' → ' + plain.location : ''} (expected a redirect to ${BASE}/servicii)`);
  }
}

// ── the files a page needs are there, and cacheable ────────────────────────
console.log('\nassets');
{
  const assets = [...new Set([...home.body.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]))];
  if (!assets.length) bad('homepage references nothing under /assets/');
  let missing = 0, uncached = 0;
  for (const a of assets) {
    const r = await fetch(`${BASE}${a}`, { method: 'HEAD', headers: { 'User-Agent': UA } });
    if (r.status !== 200) { missing++; bad(`${a} → ${r.status}`); continue; }
    if (!/immutable|max-age=(\d{7,})/.test(r.headers.get('cache-control') || '')) uncached++;
  }
  if (assets.length && !missing) ok(`all ${assets.length} scripts, styles and fonts named by the homepage load`);
  if (assets.length) {
    uncached
      ? bad(`${uncached} fingerprinted asset(s) are not served with a long Cache-Control`)
      : ok('fingerprinted assets are cached long-term');
  }
  // A missing chunk must not be cached as if it were one.
  const gone = await fetch(`${BASE}/assets/nu-exista-0000.js`, { method: 'HEAD', headers: { 'User-Agent': UA } });
  gone.status === 404 && !/immutable/.test(gone.headers.get('cache-control') || '')
    ? ok('a missing asset is a 404 and is not marked immutable')
    : bad(`a missing asset answered ${gone.status} with Cache-Control "${gone.headers.get('cache-control')}"`);
}

// ── the enrolment form's backend ───────────────────────────────────────────
// The endpoint is POST-only, so a GET that reaches Django comes back 405.
// 502/504 means gunicorn is down; 404 means the nginx proxy block is gone.
// Either way the form on the site is silently broken.
console.log('\nenrolment API');
{
  const r = await req(`${BASE}/api/contact/`);
  r.status === 405
    ? ok('/api/contact/ reaches the backend (405 to a GET)')
    : bad(`/api/contact/ → ${r.status} (expected 405 — the form cannot submit)`);
}

console.log(`\n${'─'.repeat(64)}`);
console.log(failed ? `\n${failed} check(s) FAILED\n` : '\nAll checks passed\n');
process.exit(failed ? 1 : 0);
