/**
 * Renders a post cover — 1600×900 JPEG — from a title, with Playwright.
 *
 *   node scripts/make-cover.mjs \
 *     --out public/blog/model-bac-2027-mate-info.jpg \
 *     --kicker "BAC 2027 · Matematică M_mate-info" \
 *     --title "Modelul oficial, rezolvat integral" \
 *     --mark "∫"
 *
 * Why covers at all: a post with no image of its own shares the site-wide card,
 * and Google Discover — the feed on the left of most Android home screens —
 * effectively requires a large image of the article's own (≥1200 px wide, with
 * max-image-preview:large, which SEO.tsx already sets). These are typographic
 * on purpose: generated here, so there is no licence question, and they say
 * what the article is rather than decorating it. Once committed they are
 * ordinary files; this script is not part of the build.
 *
 * The image restates the headline, so it is decorative — leave `coverAlt`
 * empty in the frontmatter (docs/PUBLISHING-POSTS.md §3).
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), [])
);

if (!args.out || !args.title) {
  console.error('usage: make-cover.mjs --out <public/blog/x.jpg> --title <text> [--kicker <text>] [--mark <glyph>]');
  process.exit(1);
}

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const html = `<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  html, body { margin: 0; width: 1600px; height: 900px; background: #0a0a0a; overflow: hidden; }
  .frame { position: absolute; inset: 0; padding: 96px 112px; box-sizing: border-box;
           display: flex; flex-direction: column; justify-content: space-between;
           background:
             linear-gradient(#141414 1px, transparent 1px) 0 0 / 56px 56px,
             linear-gradient(90deg, #141414 1px, transparent 1px) 0 0 / 56px 56px; }
  .kicker { font: 500 26px/1 'JetBrains Mono', monospace; letter-spacing: .22em; text-transform: uppercase;
            color: #e8734a; display: flex; align-items: center; gap: 28px; }
  .kicker::after { content: ''; flex: 1; height: 2px; background: linear-gradient(90deg, #333, transparent); }
  h1 { font: 600 96px/1.04 'Fraunces', serif; font-variation-settings: 'opsz' 144; color: #f0f0f0;
       letter-spacing: -0.02em; margin: 0; max-width: 1080px; }
  .foot { font: 500 24px/1 'JetBrains Mono', monospace; letter-spacing: .2em; text-transform: uppercase; color: #777;
          display: flex; justify-content: space-between; align-items: center; }
  .foot b { color: #f0f0f0; font-weight: 500; }
  .mark { position: absolute; right: 96px; top: 150px; font: 600 360px/1 'Fraunces', serif; color: #e8734a; opacity: .14; }
</style></head>
<body><div class="frame">
  <div class="kicker">${esc(args.kicker || 'AlgoMate')}</div>
  <h1>${esc(args.title)}</h1>
  <div class="foot"><span><b>AlgoMate</b> · Răzvan Rădulescu</span><span>algomate.ro</span></div>
</div>${args.mark ? `<div class="mark">${esc(args.mark)}</div>` : ''}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
fs.mkdirSync(path.dirname(args.out), { recursive: true });
await page.screenshot({ path: args.out, type: 'jpeg', quality: 82 });
await browser.close();
console.log(`  ✓ ${args.out} (${Math.round(fs.statSync(args.out).size / 1024)} KB)`);
