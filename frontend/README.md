# AlgoMate — frontend

React 19 + TypeScript + Vite + Tailwind CSS v4, built to static HTML and
prerendered with Playwright. See the [root README](../README.md) for the
architecture and the reasoning behind it.

```bash
npm ci
npm run dev        # compile content, then start the Vite dev server
npm run content    # regenerate post data, sitemap, feed and route list only
npm run build      # content → tsc → vite build → prerender (writes dist/)
npm run lint
npm run check:live # probe the live site as Googlebot
```

| Path | Purpose |
| --- | --- |
| `content/posts/` | Blog posts (Markdown + front matter) — see [`docs/PUBLISHING-POSTS.md`](../docs/PUBLISHING-POSTS.md) |
| `public/descarcari/` | Free PDF guides, described by `src/config/resources.ts` |
| `scripts/build-content.mjs` | Content compiler: posts, sanitiser, sitemap, feed, `llms.txt`, route list |
| `scripts/check-live-seo.mjs` | Post-deploy regression check against production |
| `prerender.js` | Renders every route to static HTML, plus `404.html` |
| `src/config/` | Single sources of truth for prices, contact details and downloads |

Do not deploy by building into `dist/` on the server; production deploys go
through [`deploy/rebuild.sh`](../deploy/rebuild.sh).
