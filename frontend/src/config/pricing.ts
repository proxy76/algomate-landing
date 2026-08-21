/**
 * Session pricing — the single source of truth.
 *
 * The same two numbers appear in visible copy, in meta descriptions and in the
 * Course / FAQPage / LocalBusiness JSON-LD. Structured data that disagrees with
 * the page it sits on is a manual-action risk, so nothing hard-codes a price:
 * every one of those places imports from here.
 *
 * Changing a price here changes the page and the schema together. Grep for a
 * bare "RON" before assuming that still holds.
 */

export const PRICE_GROUP = 100;
export const PRICE_INDIVIDUAL = 150;
export const CURRENCY = 'RON';

/** Group size cap. Quoted in the same breath as the group price, everywhere. */
export const GROUP_MAX_STUDENTS = 3;

export const priceGroupLabel = `${PRICE_GROUP} ${CURRENCY}`;
export const priceIndividualLabel = `${PRICE_INDIVIDUAL} ${CURRENCY}`;

/** schema.org `priceRange`, and any "de la … la …" copy. */
export const priceRangeLabel = `${PRICE_GROUP}-${PRICE_INDIVIDUAL} ${CURRENCY}`;

/**
 * The pricing answer, verbatim. Used both as visible FAQ copy and as the
 * `acceptedAnswer` text in the FAQPage schema — one string, so the two cannot
 * drift apart.
 */
export const pricingAnswer =
  `Prețul standard este de ${PRICE_GROUP} ${CURRENCY}/ședință în grupe de maximum ` +
  `${GROUP_MAX_STUDENTS} elevi și ${PRICE_INDIVIDUAL} ${CURRENCY}/ședință pentru ` +
  `meditații individuale.`;

/** The tail of every page's meta description that quotes a price. */
export const pricingSummary =
  `${PRICE_GROUP} ${CURRENCY}/ședință în grupe de max ${GROUP_MAX_STUDENTS} elevi, ` +
  `${PRICE_INDIVIDUAL} ${CURRENCY} individual.`;

/** Group vs one-on-one, as answered on /servicii. */
export const groupVsIndividualAnswer =
  `În grupă (maximum ${GROUP_MAX_STUDENTS} elevi, ${PRICE_GROUP} ${CURRENCY}/ședință) ` +
  `elevii lucrează pe aceeași programă și învață și din întrebările celorlalți. ` +
  `Individual (${PRICE_INDIVIDUAL} ${CURRENCY}/ședință) ritmul și conținutul se ` +
  `adaptează complet elevului, ceea ce ajută când sunt lacune mari de recuperat sau ` +
  `când pregătirea vizează un obiectiv specific, cum ar fi o olimpiadă.`;
