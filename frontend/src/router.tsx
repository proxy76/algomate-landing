import type React from 'react';
import { createBrowserRouter, matchPath } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import { loadPostHtml } from './content/posts.generated';

/**
 * Every page is its own chunk.
 *
 * The site used to ship as one script: all fifteen pages, and every blog post
 * ever published, downloaded and parsed before any of them could become
 * interactive. Now the entry holds the shell — router, layout, header, footer
 * — and each route brings its own code when it is asked for.
 *
 * Three things keep that from being visible to a visitor:
 *
 *   · main.tsx does not mount until the first route's chunk has arrived, so
 *     the prerendered HTML stays on screen instead of being replaced by a
 *     blank frame while a chunk downloads.
 *   · On a link click React Router keeps the current page up until the next
 *     one is ready, and prefetchRoute() below has usually fetched it already,
 *     on hover or touch.
 *   · The prerenderer snapshots each page after its chunk has loaded, so the
 *     static HTML already carries <link rel="modulepreload"> for it and the
 *     browser fetches route and entry in parallel.
 *
 * ADDING A PAGE: add it here AND to STATIC_PAGES in scripts/build-content.mjs.
 * Missing from that list, it is in neither the sitemap nor the prerender
 * list, and 404s in production.
 */

type PageModule = { default: React.ComponentType };

/**
 * If a chunk cannot be fetched, the usual cause is a deploy since this tab
 * loaded: filenames are content-hashed, and the ones this page knows about
 * may be gone (rebuild.sh carries the previous release's assets forward, so
 * it takes two deploys). A full navigation to where the visitor was going
 * gets fresh HTML naming the current chunks.
 *
 * The promise never settles, so the page on screen stays put until the
 * browser leaves it. On the very first load there is nothing to navigate to
 * and nothing is done at all: main.tsx never mounts, and the prerendered HTML
 * — complete, with working links — simply remains. Reloading there instead
 * would loop forever if the chunk were truly missing.
 */
const recover = () =>
  new Promise<never>(() => {
    if (!router.state.initialized) return;
    const pending = router.state.navigation.location;
    if (pending) window.location.assign(pending.pathname + pending.search + pending.hash);
    else window.location.reload();
  });

const PAGES: { path: string; load: () => Promise<PageModule> }[] = [
  { path: '/', load: () => import('./pages/Home') },
  { path: '/servicii', load: () => import('./pages/Services') },
  { path: '/meditatii-informatica-bac', load: () => import('./pages/InformaticaBac') },
  { path: '/meditatii-liceu', load: () => import('./pages/MeditatiiLiceu') },
  { path: '/meditatii-matematica-bucuresti', load: () => import('./pages/MatematicaBucuresti') },
  { path: '/meditatii-matematica-online', load: () => import('./pages/MatematicaOnline') },
  { path: '/meditatii-evaluare-nationala-matematica', load: () => import('./pages/EvaluareNationala') },
  { path: '/curriculum', load: () => import('./pages/Curriculum') },
  { path: '/inscriere', load: () => import('./pages/Signup') },
  { path: '/resurse', load: () => import('./pages/Resources') },
  { path: '/blog', load: () => import('./pages/Blog') },
  { path: '/blog/:slug', load: () => import('./pages/BlogPost') },
  { path: '/multumim', load: () => import('./pages/ThankYou') },
  { path: '/termeni-si-conditii', load: () => import('./pages/TermsAndConditions') },
  { path: '/politica-de-confidentialitate', load: () => import('./pages/PrivacyPolicy') },
  // Anything else. nginx answers an unknown URL with a real 404 status and
  // the prerendered /404.html; this is what the app shows once it boots there.
  { path: '*', load: () => import('./pages/NotFound') },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: PAGES.map(({ path, load }) => ({
      path,
      lazy: () => load().then((m) => ({ Component: m.default }), () => recover()),
      // The article body is a separate chunk per post (see writeTs in
      // build-content.mjs). Loading it here, beside the page's code, means
      // the article renders complete on its first frame.
      ...(path === '/blog/:slug'
        ? {
            loader: ({ params }: { params: { slug?: string } }) =>
              loadPostHtml(params.slug ?? '').catch(() => recover()),
          }
        : {}),
    })),
  },
]);

/**
 * Warm the chunk a link points at, before it is clicked. Called from main.tsx
 * on hover, touch and keyboard focus. Failures are swallowed: this is a hint,
 * and the click itself goes through the recovering loaders above.
 */
export function prefetchRoute(pathname: string): void {
  // Prerendered pages are served from a directory, so /blog/ is /blog.
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const page = PAGES.find((p) => p.path !== '*' && matchPath({ path: p.path, end: true }, clean));
  if (!page) return;
  page.load().catch(() => {});
  if (page.path === '/blog/:slug') {
    const slug = matchPath('/blog/:slug', clean)?.params.slug;
    if (slug) loadPostHtml(slug).catch(() => {});
  }
}
