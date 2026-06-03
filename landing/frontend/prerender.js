import { chromium } from 'playwright';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3456;
const DIST_DIR = path.resolve(__dirname, 'dist');
const ROUTES = [
  '/',
  '/servicii',
  '/curriculum',
  '/inscriere',
  '/termeni-si-conditii',
  '/politica-de-confidentialitate'
];

/**
 * Deduplicate <head> tags.
 * Since we now serve a clean index.html to every route during prerender,
 * we shouldn't get duplicates from previous routes. But we still do this
 * just in case React 19 hoists duplicate tags.
 */
function deduplicateHead(html) {
  const headStart = html.indexOf('<head>');
  const headEnd = html.indexOf('</head>');
  if (headStart === -1 || headEnd === -1) return html;

  const before = html.slice(0, headStart + 6);
  let head = html.slice(headStart + 6, headEnd);
  const after = html.slice(headEnd);

  // Helper: keep only the last match of a regex pattern
  const keepLast = (content, pattern) => {
    const matches = [...content.matchAll(pattern)];
    if (matches.length <= 1) return content;
    let kept = 0;
    const total = matches.length;
    return content.replace(pattern, (m) => (++kept < total ? '' : m));
  };

  // Unique-per-page tags
  head = keepLast(head, /<title>[^<]*<\/title>/g);
  head = keepLast(head, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/g);

  for (const name of ['description', 'robots', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    head = keepLast(head, new RegExp(`<meta\\s+[^>]*name="${name}"[^>]*>`, 'g'));
  }

  for (const prop of ['og:type', 'og:url', 'og:title', 'og:description', 'og:image', 'og:locale', 'og:site_name']) {
    const escaped = prop.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    head = keepLast(head, new RegExp(`<meta\\s+[^>]*property="${escaped}"[^>]*>`, 'g'));
  }

  return before + head + after;
}

async function prerender() {
  console.log('Starting prerender server...');

  const app = express();

  // READ the raw, clean index.html into memory BEFORE we start overwriting it!
  // This is crucial because when Playwright hits /servicii AFTER we prerendered /,
  // if we serve from disk, it would get the fully prerendered Home page HTML,
  // resulting in duplicate Home + Services tags.
  const rawIndexHtmlPath = path.join(DIST_DIR, 'index.html');
  const rawIndexHtml = fs.readFileSync(rawIndexHtmlPath, 'utf-8');

  // Serve static files from dist EXCEPT index.html (which we want to serve cleanly)
  app.use(express.static(DIST_DIR, { index: false }));

  // Fallback for SPA routing: always serve the CLEAN index.html from memory
  app.use((req, res) => {
    res.send(rawIndexHtml);
  });

  const server = app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);

    try {
      console.log('Launching Playwright...');
      const browser = await chromium.launch();
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

      for (const route of ROUTES) {
        console.log(`Prerendering route: ${route}`);
        const url = `http://localhost:${PORT}${route}`;

        await page.goto(url, { waitUntil: 'networkidle' });

        console.log(`  Scrolling page to trigger animations...`);
        await page.evaluate(async () => {
          const step = 300;
          const delay = 80;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, delay));
          }
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise(r => setTimeout(r, 200));
          window.scrollTo(0, 0);
        });

        await page.waitForTimeout(2000);

        console.log(`  Forcing visibility on remaining hidden elements...`);
        await page.evaluate(() => {
          document.querySelectorAll('[style]').forEach(el => {
            const style = el.getAttribute('style') || '';
            if (style.includes('opacity: 0') || style.includes('opacity:0')) {
              el.style.opacity = '1';
            }
            if (style.includes('translateY') || style.includes('translateX')) {
              el.style.transform = 'none';
            }
          });
        });

        let html = deduplicateHead(await page.content());

        let outPath;
        if (route === '/') {
          outPath = path.join(DIST_DIR, 'index.html');
        } else {
          const routeDir = path.join(DIST_DIR, route.substring(1));
          if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
          }
          outPath = path.join(routeDir, 'index.html');
        }

        fs.writeFileSync(outPath, html);
        console.log(`  ✓ Saved ${outPath}`);
      }

      await browser.close();
      console.log('\n✅ Prerendering complete!');
    } catch (error) {
      console.error('Error during prerendering:', error);
      process.exit(1);
    } finally {
      server.close();
    }
  });
}

prerender();
