import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigationType } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { hash } = useLocation();
  const navigationType = useNavigationType();

  /**
   * Put the incoming page at the top — when it actually appears.
   *
   * <ScrollRestoration /> in RootLayout scrolls at navigation time, but
   * AnimatePresence mode="wait" holds the outgoing page mounted for its 0.3s
   * exit. So that scroll lands while the old, taller document is still in
   * place, and when the swap finally happens the browser's scroll anchoring
   * adjusts scrollTop to keep its anchor element steady — undoing it. Longest
   * pages show it worst, which is why it read as a mobile-only bug.
   *
   * RootLayout keys the outlet by pathname, so this component remounts once
   * per route and this effect runs exactly when the new page mounts.
   * useLayoutEffect, not useEffect, so it lands before paint and there is no
   * visible jump.
   */
  useLayoutEffect(() => {
    // Back/forward should return you where you were — that is ScrollRestoration's job.
    if (navigationType === 'POP') return;
    // A link to /#instructor means "go to that element", not "go to the top".
    if (hash) return;
    // 'instant' overrides html { scroll-behavior: smooth }, which is there for
    // in-page anchors. A smooth scroll from y=3000 is an animation, and the
    // route's content unmounts underneath it — the animation is cancelled and
    // you are left partway down. A route change should be a jump, not a glide.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [hash, navigationType]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
