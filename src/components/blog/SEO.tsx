import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Post, Author, Media } from '../../types/wordpress';

interface SEOProps {
  // Basic meta data
  title: string;
  description: string;
  canonical?: string;
  
  // Open Graph data
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  siteName?: string;
  
  // Article-specific data (for blog posts)
  post?: Post;
  author?: Author;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  
  // Twitter Card data
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
  
  // Additional meta tags
  robots?: string;
  keywords?: string;
  
  // JSON-LD structured data
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  type = 'website',
  image,
  imageAlt,
  siteName = 'CFO Edge 360',
  post,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  robots = 'index, follow',
  keywords,
  structuredData
}) => {
  // Generate canonical URL
  const getCanonicalUrl = (): string => {
    if (canonical) return canonical;
    return window.location.href;
  };

  // Generate default image
  const getImageUrl = (): string => {
    if (image) return image;
    if (post?._embedded?.['wp:featuredmedia']?.[0]) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return `${window.location.origin}/logo.png`;
  };

  // Generate image alt text
  const getImageAlt = (): string => {
    if (imageAlt) return imageAlt;
    if (post?._embedded?.['wp:featuredmedia']?.[0]?.alt_text) {
      return post._embedded['wp:featuredmedia'][0].alt_text;
    }
    return title;
  };

  // Generate author name
  const getAuthorName = (): string => {
    if (author) return author.name;
    if (post?._embedded?.author?.[0]) {
      return post._embedded.author[0].name;
    }
    return 'CFO Edge 360';
  };

  // Generate article tags from post
  const getArticleTags = (): string[] => {
    if (tags.length > 0) return tags;
    if (post?._embedded?.['wp:term']) {
      const allTerms = post._embedded['wp:term'].flat();
      return allTerms.map(term => term.name);
    }
    return [];
  };

  // Generate JSON-LD structured data for blog posts
  const generateBlogPostStructuredData = (): object | null => {
    if (structuredData) return structuredData;
    if (!post) return null;

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title.rendered,
      "description": description,
      "image": {
        "@type": "ImageObject",
        "url": getImageUrl(),
        "alt": getImageAlt()
      },
      "author": {
        "@type": "Person",
        "name": getAuthorName()
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logo.png`,
          "alt": `${siteName} Logo`
        }
      },
      "datePublished": publishedTime || new Date(post.date).toISOString(),
      "dateModified": modifiedTime || new Date(post.modified).toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": getCanonicalUrl()
      },
      "url": getCanonicalUrl(),
      "articleSection": section || "Finance",
      "keywords": getArticleTags().join(", "),
      "wordCount": post.content.rendered.replace(/<[^>]*>/g, '').split(/\s+/).length,
      "inLanguage": "en-US"
    };
  };

  // Generate JSON-LD structured data for website/organization
  const generateWebsiteStructuredData = (): object => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "url": window.location.origin,
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`,
        "alt": `${siteName} Logo`
      },
      "description": "Expert financial consulting and CFO services to help businesses optimize their financial performance and strategic planning.",
      "sameAs": [
        // Add social media URLs here if available
      ]
    };
  };

  const finalStructuredData = type === 'article' 
    ? generateBlogPostStructuredData() 
    : generateWebsiteStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={getCanonicalUrl()} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={getCanonicalUrl()} />
      <meta property="og:image" content={getImageUrl()} />
      <meta property="og:image:alt" content={getImageAlt()} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={getAuthorName()} />
          <meta property="article:section" content={section || 'Finance'} />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {getArticleTags().map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={getImageUrl()} />
      <meta name="twitter:image:alt" content={getImageAlt()} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* JSON-LD Structured Data */}
      {finalStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData, null, 2)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;