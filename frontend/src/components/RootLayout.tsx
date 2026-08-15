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

  return (
    <div className="min-h-screen text-[#f0f0f0] font-sans overflow-x-hidden">
      {/* ScrollRestoration is the magic bullet for React Router v7 scroll jumping */}
      <ScrollRestoration />

      {!isArticle && <InteractiveBackground />}
      <Header />
      
      <main className="relative z-10 w-full min-h-screen">
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
