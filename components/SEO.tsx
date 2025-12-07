import * as React from 'react';
import Head from 'next/head';

export interface SEOProps {
  /**
   * Page title (50-60 characters recommended)
   */
  title: string;

  /**
   * Page description (150-160 characters recommended)
   */
  description: string;

  /**
   * Keywords for the page (optional, less important for modern SEO)
   */
  keywords?: string[];

  /**
   * Open Graph image URL
   */
  ogImage?: string;

  /**
   * Open Graph type
   * @default 'website'
   */
  ogType?: 'website' | 'article' | 'profile';

  /**
   * Twitter Card type
   * @default 'summary_large_image'
   */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';

  /**
   * Canonical URL for the page
   */
  canonical?: string;

  /**
   * Whether to prevent search engines from indexing this page
   * @default false
   */
  noindex?: boolean;

  /**
   * Whether to prevent search engines from following links on this page
   * @default false
   */
  nofollow?: boolean;

  /**
   * JSON-LD structured data
   */
  structuredData?: object | object[];

  /**
   * Additional meta tags
   */
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

/**
 * SEO component for centralized metadata management
 * Generates meta tags, Open Graph tags, Twitter Card tags, and JSON-LD structured data
 *
 * @example
 * ```tsx
 * <SEO
 *   title="Home | MakeYou"
 *   description="Professional web development services"
 *   ogImage="https://example.com/og-image.jpg"
 *   canonical="https://example.com"
 *   structuredData={{
 *     "@context": "https://schema.org",
 *     "@type": "Organization",
 *     "name": "MakeYou"
 *   }}
 * />
 * ```
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical,
  noindex = false,
  nofollow = false,
  structuredData,
  additionalMetaTags = [],
}) => {
  // Get the current URL if canonical is not provided
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://makeyou.online';
  const currentUrl = canonical || siteUrl;

  // Default OG image if not provided
  const defaultOgImage = `${siteUrl}/og-image.jpg`;
  const ogImageUrl = ogImage || defaultOgImage;

  // Robots meta tag
  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  if (nofollow) robotsContent.push('nofollow');
  const robots = robotsContent.length > 0 ? robotsContent.join(', ') : 'index, follow';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="robots" content={robots} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="MakeYou" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Additional Meta Tags */}
      {additionalMetaTags.map((tag, index) => {
        if (tag.name) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        }
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        return null;
      })}

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              Array.isArray(structuredData) ? structuredData : [structuredData]
            ),
          }}
        />
      )}
    </Head>
  );
};

/**
 * Helper function to generate Organization schema
 */
export const generateOrganizationSchema = (data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[]; // Social media URLs
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    email: data.email,
    telephone: data.telephone,
    address: data.address ? {
      '@type': 'PostalAddress',
      ...data.address,
    } : undefined,
    sameAs: data.sameAs,
  };
};

/**
 * Helper function to generate Service schema
 */
export const generateServiceSchema = (data: {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  serviceType?: string;
  areaServed?: string | string[];
  offers?: {
    price?: string;
    priceCurrency?: string;
    description?: string;
  };
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider.name,
      url: data.provider.url,
    },
    serviceType: data.serviceType,
    areaServed: data.areaServed,
    offers: data.offers ? {
      '@type': 'Offer',
      ...data.offers,
    } : undefined,
  };
};

/**
 * Helper function to generate WebSite schema
 */
export const generateWebSiteSchema = (data: {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    potentialAction: data.potentialAction ? {
      '@type': 'SearchAction',
      target: data.potentialAction.target,
      'query-input': data.potentialAction.queryInput,
    } : undefined,
  };
};
