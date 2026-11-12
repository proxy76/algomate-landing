import React from 'react';
import { useLocation, ScrollRestoration, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import InteractiveBackground from './InteractiveBackground';

const RootLayout: React.FC = () => {
  const location = useLocation();
  const outlet = useOutlet();

  /**
   * The particle field is atmosphere, and it earns that on short pages.
   * Behind a long article it runs through the text and costs legibility,
   * so article routes get a plain ground instead.
   */
  /* Trailing slash is optional: prerendered routes are served as
     /blog/<slug>/ from their directory, the SPA router uses /blog/<slug>. */
  const isArticle = /^\/blog\/[^/]+\/?$/.test(location.pathname);

  /**
   * `overflow-x-clip`, not `overflow-x-hidden`. Both stop a stray wide element
   * from scrolling the page sideways, but `hidden` also makes this div a
   * scroll container, and `position: sticky` inside a scroll container that
   * never itself scrolls simply does nothing — which is why the jump bar on
   * /resurse would not pin. `clip` contains the overflow without that side
   * effect. The Hero's own sticky is unaffected: its nearest overflow ancestor
   * is its `overflow-hidden` section, which is exactly the pin-then-release
   * range it wants.
   */
  return (
    <div className="min-h-screen text-[#f0f0f0] font-sans overflow-x-clip">
      {/* ScrollRestoration is the magic bullet for React Router v7 scroll jumping */}
      <ScrollRestoration />

      {/* Skip link: the first Tab stop on every page. Invisible until it has
          keyboard focus, then it lets a keyboard or screen-reader user jump
          past the header instead of tabbing through six nav links each time. */}
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-[#e8734a] focus:text-[#0a0a0a] focus:px-4 focus:py-2.5 focus:font-mono focus:text-[11px] focus:tracking-[0.2em] focus:uppercase focus:font-medium focus:outline-none"
      >
        Sari la conținut
      </a>

      {!isArticle && <InteractiveBackground />}
      <Header />
      
      <main id="continut" tabIndex={-1} className="relative z-10 w-full min-h-screen focus:outline-none">
        <AnimatePresence mode="wait">
          {/* React Router Data API requires cloning the outlet to pass the key for framer motion exit animations */}
          {outlet && React.cloneElement(outlet as React.ReactElement, { key: location.pathname })}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default RootLayout;
