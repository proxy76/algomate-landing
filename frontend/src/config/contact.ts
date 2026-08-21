/**
 * Contact details — the single source of truth, for the same reason as
 * `pricing.ts`: these strings appear in visible copy and in JSON-LD, and local
 * search ranking depends on the name / address / phone being identical here, on
 * the Google Business Profile, and in every directory listing.
 *
 * If the phone number changes, it changes in one place and the schema follows.
 */

export const EMAIL = 'algomate.razvan@gmail.com';

/** As written for a human — Romanian mobile grouping. */
export const PHONE_DISPLAY = '0774 933 578';

/** schema.org and `tel:` want E.164, not the national form. */
export const PHONE_E164 = '+40774933578';

export const PHONE_HREF = `tel:${PHONE_E164}`;

export const LOCALITY = 'București';
export const COUNTRY = 'România';
