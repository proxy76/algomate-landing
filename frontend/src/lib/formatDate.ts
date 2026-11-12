/**
 * "2026-11-04" → "4 noi 2026". Shared by the blog index and the article page;
 * it lives here rather than in Blog.tsx so that an article does not have to
 * download the index page's code just to format its own date.
 */
const MONTHS = [
  'ian', 'feb', 'mar', 'apr', 'mai', 'iun',
  'iul', 'aug', 'sep', 'oct', 'noi', 'dec',
];

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
};
