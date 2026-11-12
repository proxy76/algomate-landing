/**
 * Renders the raster icons from public/favicon.svg, with Playwright.
 *
 *   node scripts/make-icons.mjs
 *
 * Not part of the build: the outputs are committed, like post covers. Re-run
 * only if favicon.svg changes.
 *
 *   favicon.ico            32 + 48 px. What a browser requests unprompted at
 *                          /favicon.ico, and what feed readers and link
 *                          previews that cannot draw SVG fall back to.
 *   apple-touch-icon.png   180 px, square and opaque — iOS rounds the corners
 *                          itself and paints transparency black.
 *   icon-192.png, icon-512.png   for site.webmanifest (Android home screen).
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = fs.readFileSync(path.join(PUBLIC, 'favicon.svg'), 'utf-8');
/* Same mark with the corner radius removed, for platforms that mask the icon. */
const square = svg.replace(/\srx="[^"]*"/, '');

const browser = await chromium.launch();
const page = await browser.newPage();

async function png(markup, size) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${markup}`
  );
  return page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}

/** ICO container holding PNG images — every browser since IE 11 reads these. */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0);
    e.writeUInt8(size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const write = (name, data) => {
  fs.writeFileSync(path.join(PUBLIC, name), data);
  console.log(`  ✓ ${name} (${data.length} bytes)`);
};

write('favicon.ico', ico([{ size: 32, data: await png(svg, 32) }, { size: 48, data: await png(svg, 48) }]));
write('apple-touch-icon.png', await png(square, 180));
write('icon-192.png', await png(square, 192));
write('icon-512.png', await png(square, 512));

await browser.close();
