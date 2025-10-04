// WordPress API configuration management

export interface WordPressConfig {
  apiUrl: string;
  siteUrl: string;
  enableCache: boolean;
  cache: {
    posts: number;
    post: number;
    media: number;
  };
  api: {
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
}

// Get configuration from environment variables with defaults
export const getWordPressConfig = (): WordPressConfig => {
  return {
    apiUrl: import.meta.env.VITE_WORDPRESS_API_URL || 'https://cms.cfoedge360.com/wp-json/wp/v2',
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://cfoedge360.com',
    enableCache: import.meta.env.VITE_ENABLE_BLOG_CACHE === 'true',
    cache: {
      posts: parseInt(import.meta.env.VITE_CACHE_TTL_POSTS) || 300000, // 5 minutes
      post: parseInt(import.meta.env.VITE_CACHE_TTL_POST) || 600000,   // 10 minutes
      media: parseInt(import.meta.env.VITE_CACHE_TTL_MEDIA) || 3600000, // 1 hour
    },
    api: {
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
      retryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
      retryDelay: parseInt(import.meta.env.VITE_API_RETRY_DELAY) || 1000,
    },
  };
};

// Validate configuration
export const validateWordPressConfig = (config: WordPressConfig): boolean => {
  if (!config.apiUrl || !config.siteUrl) {
    console.error('WordPress configuration error: API URL and Site URL are required');
    return false;
  }

  try {
    new URL(config.apiUrl);
    new URL(config.siteUrl);
  } catch (error) {
    console.error('WordPress configuration error: Invalid URL format', error);
    return false;
  }

  return true;
};

// Export default configuration instance
export const wordpressConfig = getWordPressConfig();