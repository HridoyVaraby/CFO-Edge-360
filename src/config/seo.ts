// SEO Configuration for CFO Edge 360 Blog

export const SEO_CONFIG = {
  // Site information
  siteName: 'CFO Edge 360',
  siteUrl: 'https://cfoedge360.com',
  cmsUrl: 'https://cms.cfoedge360.com',
  
  // Default meta data
  defaultTitle: 'CFO Edge 360 - Expert Financial Consulting & CFO Services',
  defaultDescription: 'Expert financial consulting and CFO services to help businesses optimize their financial performance and strategic planning.',
  defaultKeywords: 'CFO services, financial consulting, business finance, financial strategy, cash flow management, financial planning',
  
  // Blog-specific defaults
  blog: {
    title: 'CFO Edge 360 Blog',
    description: 'Insights, strategies, and expert advice to help you navigate your financial journey',
    keywords: 'CFO insights, financial tips, business strategy, financial planning, cash flow, budgeting',
  },
  
  // Social media
  social: {
    twitterSite: '@cfoedge360', // Add if available
    twitterCreator: '@cfoedge360', // Add if available
  },
  
  // Images
  images: {
    defaultOgImage: '/logo.png',
    logoUrl: '/logo.png',
  },
  
  // Robots configuration
  robots: {
    // Default robots directive for frontend pages
    default: 'index, follow',
    
    // Block CMS from being indexed
    cmsBlock: 'noindex, nofollow, noarchive, nosnippet',
    
    // Paths to allow in robots.txt
    allowedPaths: [
      '/',
      '/posts',
      '/post/',
      '/category/',
      '/tag/',
      '/services',
      '/contact',
      '/about'
    ],
    
    // Paths to disallow in robots.txt
    disallowedPaths: [
      '/wp-admin/',
      '/wp-includes/',
      '/wp-content/',
      '/wp-json/',
      'https://cms.cfoedge360.com/'
    ]
  },
  
  // Structured data templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CFO Edge 360',
      description: 'Expert financial consulting and CFO services to help businesses optimize their financial performance and strategic planning.',
      url: 'https://cfoedge360.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cfoedge360.com/logo.png',
        alt: 'CFO Edge 360 Logo'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: 'English'
      },
      sameAs: [
        // Add social media URLs here when available
      ]
    },
    
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'CFO Edge 360',
      url: 'https://cfoedge360.com',
      description: 'Expert financial consulting and CFO services to help businesses optimize their financial performance and strategic planning.',
      publisher: {
        '@type': 'Organization',
        name: 'CFO Edge 360'
      }
    }
  }
};

// Utility functions for SEO
export const seoUtils = {
  // Check if current domain is the CMS
  isCMSDomain: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.includes('cms.cfoedge360.com');
  },
  
  // Generate canonical URL
  getCanonicalUrl: (path?: string): string => {
    const baseUrl = SEO_CONFIG.siteUrl;
    if (!path) return window.location.href;
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  },
  
  // Generate page title with site name
  generateTitle: (pageTitle?: string): string => {
    if (!pageTitle) return SEO_CONFIG.defaultTitle;
    return `${pageTitle} - ${SEO_CONFIG.siteName}`;
  },
  
  // Clean and truncate description
  cleanDescription: (description: string, maxLength: number = 160): string => {
    // Remove HTML tags
    const cleaned = description.replace(/<[^>]*>/g, '').trim();
    
    // Truncate if too long
    if (cleaned.length <= maxLength) return cleaned;
    
    // Find last complete word within limit
    const truncated = cleaned.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 
      ? `${truncated.substring(0, lastSpace)}...`
      : `${truncated}...`;
  },
  
  // Generate robots meta content
  getRobotsContent: (customRobots?: string): string => {
    if (seoUtils.isCMSDomain()) {
      return SEO_CONFIG.robots.cmsBlock;
    }
    return customRobots || SEO_CONFIG.robots.default;
  },
  
  // Generate keywords string
  generateKeywords: (pageKeywords?: string[]): string => {
    const defaultKeywords = SEO_CONFIG.defaultKeywords.split(', ');
    const blogKeywords = SEO_CONFIG.blog.keywords.split(', ');
    
    const allKeywords = [
      ...defaultKeywords,
      ...blogKeywords,
      ...(pageKeywords || [])
    ];
    
    // Remove duplicates and return as string
    return [...new Set(allKeywords)].join(', ');
  }
};

export default SEO_CONFIG;