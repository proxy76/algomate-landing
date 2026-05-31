import React from 'react';

/**
 * SEO Component — uses React 19's native document metadata hoisting.
 * 
 * React 19 automatically hoists <title>, <meta>, and <link> tags
 * rendered anywhere in the component tree into the document <head>.
 * No need for react-helmet-async or any third-party library.
 */

interface SEOProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/servicii" */
  path: string;
  /** Optional Open Graph image URL */
  ogImage?: string;
  /** Optional JSON-LD structured data object(s) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://algomate.ro';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  // If jsonLd is an array, render multiple script tags; otherwise render one
  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    : [];

  return (
    <>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ro_RO" />
      <meta property="og:site_name" content="AlgoMate" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLdArray.map((data, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
};

export default React.memo(SEO);
