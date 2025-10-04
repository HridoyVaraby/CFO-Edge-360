// Production configuration for WordPress headless CMS blog
export const productionConfig = {
  // WordPress API Configuration
  wordpress: {
    apiUrl: import.meta.env.VITE_WORDPRESS_API_URL || 'https://cms.cfoedge360.com/wp-json/wp/v2',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000'),
  },

  // Site Configuration
  site: {
    url: import.meta.env.VITE_SITE_URL || 'https://cfoedge360.com',
    name: 'CFO Edge 360',
    description: 'Insights, strategies, and expert advice to help you navigate your financial journey',
  },

  // Cache Configuration
  cache: {
    enabled: import.meta.env.VITE_ENABLE_BLOG_CACHE === 'true',
    ttl: {
      posts: parseInt(import.meta.env.VITE_CACHE_TTL_POSTS || '300000'), // 5 minutes
      post: parseInt(import.meta.env.VITE_CACHE_TTL_POST || '600000'),   // 10 minutes
      media: parseInt(import.meta.env.VITE_CACHE_TTL_MEDIA || '3600000'), // 1 hour
      categories: parseInt(import.meta.env.VITE_CACHE_TTL_CATEGORIES || '1800000'), // 30 minutes
      tags: parseInt(import.meta.env.VITE_CACHE_TTL_TAGS || '1800000'), // 30 minutes
    },
  },

  // Performance Configuration
  performance: {
    lazyLoadImages: true,
    enableCompression: true,
    enableServiceWorker: false, // Can be enabled if needed
    prefetchLinks: true,
    optimizeImages: true,
  },

  // SEO Configuration
  seo: {
    defaultTitle: 'CFO Edge 360 Blog',
    titleSuffix: ' - CFO Edge 360',
    defaultDescription: 'Insights, strategies, and expert advice to help you navigate your financial journey',
    defaultImage: '/logo.png',
    twitterHandle: '@cfoedge360', // Update if available
    facebookAppId: '', // Update if available
  },

  // Error Handling Configuration
  errorHandling: {
    enableErrorBoundary: true,
    enableRetry: true,
    maxRetryAttempts: 3,
    retryDelay: 1000,
    enableErrorReporting: false, // Can be enabled with error reporting service
  },

  // Analytics Configuration (optional)
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
    enableGoogleAnalytics: !!import.meta.env.VITE_GA_ID,
    enableHotjar: false,
    enableMixpanel: false,
  },

  // Security Configuration
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableXFrameOptions: true,
    enableXContentTypeOptions: true,
    enableReferrerPolicy: true,
  },

  // Build Configuration
  build: {
    enableSourceMaps: false,
    enableTreeShaking: true,
    enableMinification: true,
    enableCompression: true,
    chunkSizeWarningLimit: 1000,
  },
};

// Environment validation
export const validateProductionConfig = () => {
  const errors: string[] = [];

  // Required environment variables
  if (!productionConfig.wordpress.apiUrl) {
    errors.push('VITE_WORDPRESS_API_URL is required');
  }

  if (!productionConfig.site.url) {
    errors.push('VITE_SITE_URL is required');
  }

  // Validate URLs
  try {
    new URL(productionConfig.wordpress.apiUrl);
  } catch {
    errors.push('VITE_WORDPRESS_API_URL must be a valid URL');
  }

  try {
    new URL(productionConfig.site.url);
  } catch {
    errors.push('VITE_SITE_URL must be a valid URL');
  }

  // Validate numeric values
  if (productionConfig.wordpress.timeout < 1000) {
    errors.push('API timeout should be at least 1000ms');
  }

  if (productionConfig.wordpress.retryAttempts < 1 || productionConfig.wordpress.retryAttempts > 10) {
    errors.push('Retry attempts should be between 1 and 10');
  }

  if (errors.length > 0) {
    throw new Error(`Production configuration errors:\n${errors.join('\n')}`);
  }

  return true;
};

// Export for use in components
export default productionConfig;