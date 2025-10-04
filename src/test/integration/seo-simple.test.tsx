import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SEO from '../../components/blog/SEO';
import { mockPost } from '../mocks/wordpress-data';

// Helper function to render components with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </HelmetProvider>
  );
};

describe('SEO Implementation - Simple Verification', () => {
  beforeEach(() => {
    // Clear document head before each test
    document.head.innerHTML = '';
  });

  describe('Meta Tags Verification', () => {
    it('should render basic meta tags correctly', () => {
      const seoProps = {
        title: 'Test Article - CFO Edge 360',
        description: 'This is a test article description for SEO testing purposes',
        canonical: 'https://cfoedge360.com/post/test-article'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check title
      expect(document.title).toBe(seoProps.title);

      // Check meta description
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta?.getAttribute('content')).toBe(seoProps.description);

      // Check canonical URL
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe(seoProps.canonical);

      // Check robots meta
      const robotsMeta = document.querySelector('meta[name="robots"]');
      expect(robotsMeta?.getAttribute('content')).toBe('index, follow');
    });

    it('should render Open Graph meta tags correctly', () => {
      const seoProps = {
        title: 'Test Article - CFO Edge 360',
        description: 'This is a test article description',
        canonical: 'https://cfoedge360.com/post/test-article',
        type: 'article' as const,
        image: 'https://cfoedge360.com/images/test-image.jpg'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check Open Graph title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute('content')).toBe(seoProps.title);

      // Check Open Graph description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      expect(ogDescription?.getAttribute('content')).toBe(seoProps.description);

      // Check Open Graph type
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType?.getAttribute('content')).toBe('article');

      // Check Open Graph image
      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogImage?.getAttribute('content')).toBe(seoProps.image);

      // Check Open Graph URL
      const ogUrl = document.querySelector('meta[property="og:url"]');
      expect(ogUrl?.getAttribute('content')).toBe(seoProps.canonical);
    });

    it('should render Twitter Card meta tags correctly', () => {
      const seoProps = {
        title: 'Test Article - CFO Edge 360',
        description: 'This is a test article description',
        canonical: 'https://cfoedge360.com/post/test-article',
        image: 'https://cfoedge360.com/images/test-image.jpg'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check Twitter card type
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');

      // Check Twitter title
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      expect(twitterTitle?.getAttribute('content')).toBe(seoProps.title);

      // Check Twitter description
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      expect(twitterDescription?.getAttribute('content')).toBe(seoProps.description);

      // Check Twitter image
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      expect(twitterImage?.getAttribute('content')).toBe(seoProps.image);
    });

    it('should render article-specific meta tags for blog posts', () => {
      const seoProps = {
        title: 'Test Blog Post - CFO Edge 360',
        description: 'This is a test blog post',
        canonical: 'https://cfoedge360.com/post/test-blog-post',
        type: 'article' as const,
        post: mockPost,
        publishedTime: '2024-01-15T10:00:00Z',
        modifiedTime: '2024-01-16T10:00:00Z',
        section: 'Finance'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check article section
      const articleSection = document.querySelector('meta[property="article:section"]');
      expect(articleSection?.getAttribute('content')).toBe('Finance');

      // Check article published time
      const articlePublished = document.querySelector('meta[property="article:published_time"]');
      expect(articlePublished?.getAttribute('content')).toBe('2024-01-15T10:00:00Z');

      // Check article modified time
      const articleModified = document.querySelector('meta[property="article:modified_time"]');
      expect(articleModified?.getAttribute('content')).toBe('2024-01-16T10:00:00Z');
    });

    it('should include mobile optimization meta tags', () => {
      const seoProps = {
        title: 'Test Page',
        description: 'Test description',
        canonical: 'https://cfoedge360.com/test'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check theme color
      const themeColor = document.querySelector('meta[name="theme-color"]');
      expect(themeColor?.getAttribute('content')).toBe('#ffffff');

      // Check format detection
      const formatDetection = document.querySelector('meta[name="format-detection"]');
      expect(formatDetection?.getAttribute('content')).toBe('telephone=no');
    });
  });

  describe('Structured Data Verification', () => {
    it('should render JSON-LD structured data for articles', () => {
      const seoProps = {
        title: 'Test Blog Post - CFO Edge 360',
        description: 'This is a test blog post for structured data',
        canonical: 'https://cfoedge360.com/post/test-blog-post',
        type: 'article' as const,
        post: mockPost,
        publishedTime: '2024-01-15T10:00:00Z',
        modifiedTime: '2024-01-16T10:00:00Z',
        section: 'Finance',
        image: 'https://cfoedge360.com/images/test-image.jpg'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check for JSON-LD script
      const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      expect(jsonLdScript).toBeTruthy();

      if (jsonLdScript?.textContent) {
        const structuredData = JSON.parse(jsonLdScript.textContent);
        
        // Verify basic structure
        expect(structuredData['@context']).toBe('https://schema.org');
        expect(structuredData['@type']).toBe('Article');
        expect(structuredData.headline).toContain('Test Blog Post');
        expect(structuredData.description).toBe(seoProps.description);
        expect(structuredData.url).toBe(seoProps.canonical);
        expect(structuredData.datePublished).toBe('2024-01-15T10:00:00Z');
        expect(structuredData.dateModified).toBe('2024-01-16T10:00:00Z');
        
        // Verify author structure
        expect(structuredData.author).toBeTruthy();
        expect(structuredData.author['@type']).toBe('Person');
        expect(structuredData.author.name).toBe('John Doe');
        
        // Verify publisher structure
        expect(structuredData.publisher).toBeTruthy();
        expect(structuredData.publisher['@type']).toBe('Organization');
        expect(structuredData.publisher.name).toBe('CFO Edge 360');
        
        // Verify image structure
        expect(structuredData.image).toBeTruthy();
        expect(structuredData.image['@type']).toBe('ImageObject');
        expect(structuredData.image.url).toBe(seoProps.image);
      }
    });

    it('should render basic structured data for non-article pages', () => {
      const seoProps = {
        title: 'CFO Edge 360 Blog',
        description: 'Financial insights and strategies',
        canonical: 'https://cfoedge360.com/posts',
        type: 'website' as const
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check for JSON-LD script
      const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
      expect(jsonLdScript).toBeTruthy();

      if (jsonLdScript?.textContent) {
        const structuredData = JSON.parse(jsonLdScript.textContent);
        
        // Verify basic structure for website
        expect(structuredData['@context']).toBe('https://schema.org');
        expect(structuredData['@type']).toBe('WebSite');
        expect(structuredData.name).toBe('CFO Edge 360 Blog');
        expect(structuredData.description).toBe(seoProps.description);
        expect(structuredData.url).toBe(seoProps.canonical);
      }
    });
  });

  describe('Canonical URLs Verification', () => {
    it('should set correct canonical URL', () => {
      const canonicalUrl = 'https://cfoedge360.com/post/test-article';
      const seoProps = {
        title: 'Test Article',
        description: 'Test description',
        canonical: canonicalUrl
      };

      renderWithProviders(<SEO {...seoProps} />);

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe(canonicalUrl);
    });

    it('should handle URLs with query parameters', () => {
      const canonicalUrl = 'https://cfoedge360.com/posts?category=finance&page=2';
      const seoProps = {
        title: 'Blog Posts - Finance',
        description: 'Finance category posts',
        canonical: canonicalUrl
      };

      renderWithProviders(<SEO {...seoProps} />);

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe(canonicalUrl);
    });
  });

  describe('SEO Best Practices', () => {
    it('should handle missing optional props gracefully', () => {
      const minimalProps = {
        title: 'Minimal SEO Test',
        description: 'Minimal description',
        canonical: 'https://cfoedge360.com/test'
      };

      renderWithProviders(<SEO {...minimalProps} />);

      // Should still set basic tags
      expect(document.title).toBe(minimalProps.title);
      
      const descriptionMeta = document.querySelector('meta[name="description"]');
      expect(descriptionMeta?.getAttribute('content')).toBe(minimalProps.description);
      
      // Should default to website type
      const ogType = document.querySelector('meta[property="og:type"]');
      expect(ogType?.getAttribute('content')).toBe('website');
    });

    it('should include proper site information', () => {
      const seoProps = {
        title: 'Test Page',
        description: 'Test description',
        canonical: 'https://cfoedge360.com/test'
      };

      renderWithProviders(<SEO {...seoProps} />);

      // Check site name
      const siteName = document.querySelector('meta[property="og:site_name"]');
      expect(siteName?.getAttribute('content')).toBe('CFO Edge 360');

      // Check locale
      const locale = document.querySelector('meta[property="og:locale"]');
      expect(locale?.getAttribute('content')).toBe('en_US');
    });

    it('should include keywords when provided', () => {
      const seoProps = {
        title: 'Test Page',
        description: 'Test description',
        canonical: 'https://cfoedge360.com/test',
        keywords: 'finance, CFO, business strategy, financial planning'
      };

      renderWithProviders(<SEO {...seoProps} />);

      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      expect(keywordsMeta?.getAttribute('content')).toBe(seoProps.keywords);
    });
  });
});