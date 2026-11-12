import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { prefetchRoute, router } from './router.tsx'

const container = document.getElementById('root')!

/**
 * Mount only once the first route is ready.
 *
 * #root arrives full of prerendered HTML, and createRoot().render() replaces
 * it. Routes are lazy (router.tsx), so rendering straight away would swap a
 * complete page for an empty one and leave it empty until the route's chunk
 * landed. The router starts loading the moment it is created; waiting for it
 * keeps the static page on screen for those few milliseconds instead.
 */
const mount = () => {
  /**
   * The prerendered <head> already holds this page's title, description,
   * canonical and social tags. React 19 hoists the ones <SEO> renders into
   * <head> as well — as new elements, because it did not create the static
   * ones and so does not know they are its own. Left alone, every page ends
   * up with two of each, and after a client-side navigation the static pair
   * is simply wrong: the canonical still names the page the visit started on,
   * and it comes first in the document — which is the one Chrome reads when
   * someone taps "Share".
   *
   * So the static copies are collected here, before React adds anything, and
   * dropped once its first commit has put the live ones in place. Not
   * earlier: removing the only <title> before React has rendered another
   * would flash the bare URL in the tab.
   */
  const prerendered = Array.from(
    document.head.querySelectorAll(
      'title, meta[name="description"], meta[name="robots"], meta[name^="twitter:"], ' +
        'meta[property^="og:"], meta[property^="article:"], link[rel="canonical"]',
    ),
  )

  const Boot = () => {
    useEffect(() => {
      for (const el of prerendered) el.remove()
    }, [])
    return <App />
  }

  createRoot(container).render(
    <StrictMode>
      <Boot />
    </StrictMode>,
  )
}

if (router.state.initialized) {
  mount()
} else {
  const unsubscribe = router.subscribe((state) => {
    if (!state.initialized) return
    unsubscribe()
    mount()
  })
}

/**
 * Fetch a page's code when the visitor shows intent — pointer over a link,
 * finger down on it, or keyboard focus — so that by the time the click lands
 * the navigation is as immediate as when everything shipped in one file.
 */
const onIntent = (event: Event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const link = target.closest('a[href]')
  if (!(link instanceof HTMLAnchorElement)) return
  if (link.origin !== window.location.origin || link.target === '_blank' || link.hasAttribute('download')) return
  prefetchRoute(link.pathname)
}

for (const type of ['pointerover', 'touchstart', 'focusin']) {
  document.addEventListener(type, onIntent, { passive: true, capture: true })
}
