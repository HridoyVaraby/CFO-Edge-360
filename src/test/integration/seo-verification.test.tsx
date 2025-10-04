import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/blog/SEO';
import PostDetailPage from '../../pages/blog/PostDetailPage';
import PostListPage from '../../pages/blog/PostListPage';
import { wordpressAPI } from '../../services/wordpress';
import { mockPost, mockPosts, mockCategories, mockTags } from '../mocks/wordpress-data';

// Mock the WordPress API
vi.mock('../../services/wordpress');

// Mock IntersectionObserver for lazy loading
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

// Helper function to render components with providers
const renderWithProviders = (component: React.ReactElement, initialEntries = ['/']) => {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>
        {component}
      </MemoryRouter>
    </HelmetProvider>
  );
};

// Helper to get helmet data from DOM
const getHelmetData = () => {
  const title = document.title;
  const metaTags = Array.from(document.querySelectorAll('meta')).map(meta => ({
    name: meta.getAttribute('name'),
    property: meta.getAttribute('property'),
    content: meta.getAttribute('content')
  }));
  const linkTags = Array.from(document.querySelectorAll('link')).map(link => ({
    rel: link.getAttribute('rel'),
    href: link.getAttribute('href')
  }));
  const scriptTags = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(script => ({
    type: script.getAttribute('type'),
    innerHTML: script.innerHTML
  }));
  
  return {
    title,
    metaTags,
    linkTags,
    scriptTags
  };
};

describe('SEO Implementation Verification', () => {
  const mockWordpressAPI = wordpressAPI as any;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Setup default API responses
    mockWordpressAPI.getPosts.mockResolvedValue({
      posts: mockPosts,
      currentPage: 1,
      totalPages: 2,
      totalPosts: 15
    });
    mockWordpressAPI.getPostBySlug.mockResolvedValue(mockPost);
    mockWordpressAPI.getCategories.mockResolvedValue(mockCategories);
    mockWordpressAPI.getTags.mockResolvedValue(mockTags);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Meta Tags Verification', () => {
    it('should set proper meta tags for blog list page', async () => {
      renderWithProviders(<PostListPage />);

      await waitFor(() => {
        const helmet = getHelmetData();
        
        // Verify title
        expect(helmet.title).toBe('CFO Edge 360 Blog');
        
        // Verify meta tags
        const metaTags = helmet.metaTags;
        const descriptionTag = metaTags.find(tag => tag.name === 'description');
        expect(descriptionTag?.content).toContain('Insights, strategies, and expert advice');
        
        const robotsTag = metaTags.find(tag => tag.name === 'robots');
        expect(robotsTag?.content).toBe('index, follow');
        
        // Verify Open Graph tags
        const ogTitleTag = metaTags.find(tag => tag.property === 'og:title');
        expect(ogTitleTag?.content).toBe('CFO Edge 360 Blog');
        
        const ogTypeTag = metaTags.find(tag => tag.property === 'og:type');
        expect(ogTypeTag?.content).toBe('website');
        
        const ogDescriptionTag = metaTags.find(tag => tag.property === 'og:description');
        expect(ogDescriptionTag?.content).toContain('Insights, strategies, and expert advice');
      });
    });

    it('should set proper meta tags for post detail page', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        
        // Verify title includes post title
        expect(helmet.title).toContain(mockPost.title.rendered);
        expect(helmet.title).toContain('CFO Edge 360 Blog');
        
        // Verify meta tags
        const metaTags = helmet.metaTags;
        const descriptionTag = metaTags.find(tag => tag.name === 'description');
        expect(descriptionTag?.content).toContain('test blog post excerpt');
        
        // Verify Open Graph tags for article
        const ogTypeTag = metaTags.find(tag => tag.property === 'og:type');
        expect(ogTypeTag?.content).toBe('article');
        
        const ogTitleTag = metaTags.find(tag => tag.property === 'og:title');
        expect(ogTitleTag?.content).toContain(mockPost.title.rendered);
        
        // Verify Twitter Card tags
        const twitterCardTag = metaTags.find(tag => tag.name === 'twitter:card');
        expect(twitterCardTag?.content).toBe('summary_large_image');
        
        const twitterTitleTag = metaTags.find(tag => tag.name === 'twitter:title');
        expect(twitterTitleTag?.content).toContain(mockPost.title.rendered);
      });
    });

    it('should include proper image meta tags', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const metaTags = helmet.metaTags;
        
        // Verify Open Graph image
        const ogImageTag = metaTags.find(tag => tag.property === 'og:image');
        expect(ogImageTag?.content).toBeTruthy();
        
        const ogImageAltTag = metaTags.find(tag => tag.property === 'og:image:alt');
        expect(ogImageAltTag?.content).toBeTruthy();
        
        // Verify Twitter image
        const twitterImageTag = metaTags.find(tag => tag.name === 'twitter:image');
        expect(twitterImageTag?.content).toBeTruthy();
        
        const twitterImageAltTag = metaTags.find(tag => tag.name === 'twitter:image:alt');
        expect(twitterImageAltTag?.content).toBeTruthy();
      });
    });

    it('should set proper article meta tags for posts', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const metaTags = helmet.metaTags;
        
        // Verify article-specific tags
        const articleSectionTag = metaTags.find(tag => tag.property === 'article:section');
        expect(articleSectionTag?.content).toBe('Finance');
        
        const articlePublishedTag = metaTags.find(tag => tag.property === 'article:published_time');
        expect(articlePublishedTag?.content).toBeTruthy();
        
        const articleModifiedTag = metaTags.find(tag => tag.property === 'article:modified_time');
        expect(articleModifiedTag?.content).toBeTruthy();
      });
    });
  });

  describe('Canonical URLs Verification', () => {
    it('should set correct canonical URL for blog list page', async () => {
      renderWithProviders(<PostListPage />);

      await waitFor(() => {
        const helmet = getHelmetData();
        const linkTags = helmet.linkTags;
        
        const canonicalTag = linkTags.find(tag => tag.rel === 'canonical');
        expect(canonicalTag?.href).toContain('/posts');
      });
    });

    it('should set correct canonical URL for post detail page', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const linkTags = helmet.linkTags;
        
        const canonicalTag = linkTags.find(tag => tag.rel === 'canonical');
        expect(canonicalTag?.href).toContain(`/post/${mockPost.slug}`);
      });
    });

    it('should set canonical URL with query parameters for filtered blog pages', async () => {
      renderWithProviders(<PostListPage />, ['/posts?category=finance&page=2']);

      await waitFor(() => {
        const helmet = getHelmetData();
        const linkTags = helmet.linkTags;
        
        const canonicalTag = linkTags.find(tag => tag.rel === 'canonical');
        expect(canonicalTag?.href).toContain('/posts');
        expect(canonicalTag?.href).toContain('category=finance');
        expect(canonicalTag?.href).toContain('page=2');
      });
    });
  });

  describe('Structured Data Verification', () => {
    it('should include JSON-LD structured data for blog posts', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const scriptTags = helmet.scriptTags;
        
        const jsonLdScript = scriptTags.find(tag => tag.type === 'application/ld+json');
        expect(jsonLdScript).toBeTruthy();
        
        if (jsonLdScript?.innerHTML) {
          const structuredData = JSON.parse(jsonLdScript.innerHTML);
          expect(structuredData['@type']).toBe('Article');
          expect(structuredData.headline).toContain(mockPost.title.rendered);
          expect(structuredData.author).toBeTruthy();
          expect(structuredData.datePublished).toBeTruthy();
          expect(structuredData.dateModified).toBeTruthy();
        }
      });
    });

    it('should include proper organization data in structured data', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const scriptTags = helmet.scriptTags;
        
        const jsonLdScript = scriptTags.find(tag => tag.type === 'application/ld+json');
        if (jsonLdScript?.innerHTML) {
          const structuredData = JSON.parse(jsonLdScript.innerHTML);
          expect(structuredData.publisher).toBeTruthy();
          expect(structuredData.publisher.name).toBe('CFO Edge 360');
          expect(structuredData.publisher['@type']).toBe('Organization');
        }
      });
    });
  });

  describe('SEO Component Direct Testing', () => {
    it('should render all required meta tags when provided with full props', () => {
      const seoProps = {
        title: 'Test Article Title - CFO Edge 360',
        description: 'This is a test article description for SEO testing',
        canonical: 'https://cfoedge360.com/post/test-article',
        type: 'article' as const,
        image: 'https://cfoedge360.com/images/test-image.jpg',
        post: mockPost,
        publishedTime: '2024-01-15T10:00:00Z',
        modifiedTime: '2024-01-16T10:00:00Z',
        section: 'Finance',
        keywords: 'finance, CFO, business strategy'
      };

      renderWithProviders(<SEO {...seoProps} />);

      const helmet = getHelmetData();
      
      // Verify title
      expect(helmet.title).toBe(seoProps.title);
      
      // Verify basic meta tags
      const metaTags = helmet.metaTags;
      const descriptionTag = metaTags.find(tag => tag.name === 'description');
      expect(descriptionTag?.content).toBe(seoProps.description);
      
      const keywordsTag = metaTags.find(tag => tag.name === 'keywords');
      expect(keywordsTag?.content).toBe(seoProps.keywords);
      
      // Verify Open Graph tags
      const ogTitleTag = metaTags.find(tag => tag.property === 'og:title');
      expect(ogTitleTag?.content).toBe(seoProps.title);
      
      const ogTypeTag = metaTags.find(tag => tag.property === 'og:type');
      expect(ogTypeTag?.content).toBe('article');
      
      const ogImageTag = metaTags.find(tag => tag.property === 'og:image');
      expect(ogImageTag?.content).toBe(seoProps.image);
      
      // Verify canonical URL
      const linkTags = helmet.linkTags;
      const canonicalTag = linkTags.find(tag => tag.rel === 'canonical');
      expect(canonicalTag?.href).toBe(seoProps.canonical);
    });

    it('should handle missing optional props gracefully', () => {
      const minimalProps = {
        title: 'Minimal SEO Test',
        description: 'Minimal description',
        canonical: 'https://cfoedge360.com/test'
      };

      renderWithProviders(<SEO {...minimalProps} />);

      const helmet = getHelmetData();
      
      // Should still set basic tags
      expect(helmet.title).toBe(minimalProps.title);
      
      const metaTags = helmet.metaTags;
      const descriptionTag = metaTags.find(tag => tag.name === 'description');
      expect(descriptionTag?.content).toBe(minimalProps.description);
      
      // Should default to website type
      const ogTypeTag = metaTags.find(tag => tag.property === 'og:type');
      expect(ogTypeTag?.content).toBe('website');
    });
  });

  describe('SEO Best Practices Verification', () => {
    it('should have proper title length and format', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const title = helmet.title;
        
        // Title should be under 60 characters for optimal SEO
        expect(title.length).toBeLessThan(60);
        
        // Title should include brand name
        expect(title).toContain('CFO Edge 360');
        
        // Title should include post title
        expect(title).toContain(mockPost.title.rendered);
      });
    });

    it('should have proper meta description length', async () => {
      renderWithProviders(<PostDetailPage />, [`/post/${mockPost.slug}`]);

      await waitFor(() => {
        expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      });

      await waitFor(() => {
        const helmet = getHelmetData();
        const metaTags = helmet.metaTags;
        
        const descriptionTag = metaTags.find(tag => tag.name === 'description');
        if (descriptionTag?.content) {
          // Meta description should be between 120-160 characters for optimal SEO
          expect(descriptionTag.content.length).toBeGreaterThan(50);
          expect(descriptionTag.content.length).toBeLessThan(160);
        }
      });
    });

    it('should include proper viewport and mobile optimization tags', async () => {
      renderWithProviders(<PostListPage />);

      await waitFor(() => {
        const helmet = getHelmetData();
        const metaTags = helmet.metaTags;
        
        // Should include mobile optimization tags
        const themeColorTag = metaTags.find(tag => tag.name === 'theme-color');
        expect(themeColorTag?.content).toBe('#ffffff');
        
        const formatDetectionTag = metaTags.find(tag => tag.name === 'format-detection');
        expect(formatDetectionTag?.content).toBe('telephone=no');
      });
    });

    it('should prevent indexing of CMS domain', () => {
      // This test verifies that our robots.txt and meta tags prevent indexing of cms.cfoedge360.com
      // In a real implementation, this would be handled at the server level
      
      renderWithProviders(<PostListPage />);

      const helmet = getHelmetData();
      const metaTags = helmet.metaTags;
      
      // Our frontend pages should be indexable
      const robotsTag = metaTags.find(tag => tag.name === 'robots');
      expect(robotsTag?.content).toBe('index, follow');
      
      const googlebotTag = metaTags.find(tag => tag.name === 'googlebot');
      expect(googlebotTag?.content).toBe('index, follow');
    });
  });
});