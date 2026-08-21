import React from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqItem = { q: string; a: string };

/**
 * The FAQ block used by /servicii and the subject landing pages.
 *
 * Built on <details>, deliberately. Every answer is in the document whether or
 * not it is open, which is what the FAQPage markup requires — the homepage
 * accordion once mounted only the open answer and shipped one answer against
 * seven in its schema. Pass the same array to `faqPageSchema()` and the two
 * cannot disagree.
 *
 * Questions must differ per page. The same FAQPage on several URLs is a
 * duplicate signal, and the questions asked on a subject page are not the ones
 * asked on a pricing page.
 */
const FaqList: React.FC<{ items: FaqItem[] }> = ({ items }) => (
  <div className="max-w-3xl border-t border-[#222]">
    {items.map((item) => (
      <details key={item.q} className="group border-b border-[#222]">
        {/* The affordance is the whole row: full-width hover ground and a
            chevron in a circle on the right, where accordions put it. */}
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm px-4 py-6 transition-colors duration-200 hover:bg-[#141414] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8734a] [&::-webkit-details-marker]:hidden">
          <span className="font-sans text-[1.05rem] font-medium text-[#d8d8d8] transition-colors group-hover:text-white group-open:text-white">
            {item.q}
          </span>
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#333] text-[#e8734a] transition-all duration-300 group-hover:border-[#e8734a]/60 group-hover:bg-[#e8734a]/10 group-open:rotate-180"
            aria-hidden
          >
            <ChevronDown size={15} strokeWidth={2} />
          </span>
        </summary>
        <p className="max-w-2xl px-4 pb-7 text-[0.95rem] leading-relaxed text-[#999]">
          {item.a}
        </p>
      </details>
    ))}
  </div>
);

export default React.memo(FaqList);
