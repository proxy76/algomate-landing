import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Preload the two font files that above-the-fold text is set in.
 *
 * Fonts are self-hosted (src/fonts.css). Without a hint the browser only
 * learns a font exists after it has downloaded and parsed the stylesheet and
 * laid out text that uses it, so the headline paints in the fallback face
 * first and swaps. A preload starts the download alongside the CSS.
 *
 * Only the Latin cuts of the body and display faces: they cover almost every
 * glyph on screen at first paint. The latin-ext cuts (ș, ț, ă) follow a few
 * milliseconds later off the same warm connection; preloading those too, or
 * the mono face, would compete with the hero for bandwidth on a slow phone.
 *
 * The filenames are content-hashed, so the tags are written from the bundle
 * rather than typed into index.html.
 */
const PRELOAD_FONTS = [/^assets\/inter-latin-wght-normal-.+\.woff2$/, /^assets\/fraunces-latin-opsz-normal-.+\.woff2$/]

function preloadFonts(): Plugin {
  return {
    name: 'algomate:preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {})
        return PRELOAD_FONTS.map((pattern) => {
          const file = files.find((f) => pattern.test(f))
          // A renamed package file would silently drop the preload and bring
          // the font swap back; fail the build instead.
          if (!file) throw new Error(`preloadFonts: nothing in the bundle matches ${pattern}`)
          return {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: '' },
            // Appended, so <meta charset> stays the first thing in <head>.
            injectTo: 'head' as const,
          }
        })
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadFonts(),
  ],
  build: {
    rollupOptions: {
      output: {
        /**
         * Libraries change when a dependency is bumped; the app changes on
         * every deploy and every scheduled post. Kept in one chunk, each
         * weekly rebuild would give the framework a new hash and make every
         * returning visitor download it again.
         */
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(id)) return 'react'
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
          // Left alone, every icon and every component shared by two pages
          // becomes a chunk of its own — a dozen requests of 200 bytes each.
          // One file for the icons and one for the page furniture instead.
          if (/node_modules\/lucide-react\//.test(id)) return 'icons'
          if (/\/src\/(components\/(PageTransition|SEO|SectionLabel|FaqList|RelatedPosts)\.tsx|seo\/structuredData\.ts|config\/(pricing|contact)\.ts|lib\/)/.test(id)) return 'shared'
        },
      },
    },
  },
})
