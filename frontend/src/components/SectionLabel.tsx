import React from 'react';

/**
 * The rule-and-label section heading used across the content pages.
 *
 * Was copy-pasted into Services and then into each landing page; extracted so
 * the four of them cannot drift apart typographically.
 */
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-baseline gap-4 mb-10">
    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#e8734a] whitespace-nowrap">
      {children}
    </span>
    <span className="h-px flex-1 bg-[#222]" />
  </div>
);

export default React.memo(SectionLabel);
