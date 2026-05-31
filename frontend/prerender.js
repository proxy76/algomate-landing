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

async function prerender() {
  console.log('Starting prerender server...');
  
  const app = express();
  
  // Serve static files from dist
  app.use(express.static(DIST_DIR));
  
  // Fallback to index.html for client-side routing
  app.use((req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);
    
    try {
      console.log('Launching Playwright...');
      const browser = await chromium.launch();
      const page = await browser.newPage();
      
      for (const route of ROUTES) {
        console.log(`Prerendering route: ${route}`);
        const url = `http://localhost:${PORT}${route}`;
        
        await page.goto(url, { waitUntil: 'networkidle' });
        
        // Wait an extra second for framer motion animations to settle and components to mount fully
        await page.waitForTimeout(1000);
        
        const html = await page.content();
        
        // Determine output path
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
        console.log(`Saved ${outPath}`);
      }
      
      await browser.close();
      console.log('Prerendering complete!');
    } catch (error) {
      console.error('Error during prerendering:', error);
      process.exit(1);
    } finally {
      server.close();
    }
  });
}

prerender();
