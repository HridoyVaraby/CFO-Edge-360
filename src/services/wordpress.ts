// WordPress API Service Layer
import {
  Post,
  Author,
  Media,
  Category,
  Tag,
  PostsResponse,
  PostQueryParams,
  CategoryQueryParams,
  TagQueryParams,
  WordPressAPIConfig,
  CacheEntry,
} from '../types/wordpress';
import { wordpressConfig } from '../config/wordpress';

// WordPress API Error class for structured error handling
export class WordPressAPIError extends Error {
  public status: number;
  public endpoint: string;
  public code: string;

  constructor(message: string, status: number, endpoint: string, code?: string) {
    super(message);
    this.name = 'WordPressAPIError';
    this.status = status;
    this.endpoint = endpoint;
    this.code = code || 'UNKNOWN_ERROR';
  }
}

// In-memory cache implementation
class APICache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  set<T>(key: string, data: T, ttl: number): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // Clear expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// WordPress API Service class
export class WordPressAPIService {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;
  private cache: APICache;
  private enableCache: boolean;

  constructor(config?: Partial<WordPressAPIConfig>) {
    this.baseURL = config?.baseURL || wordpressConfig.apiUrl;
    this.timeout = config?.timeout || wordpressConfig.api.timeout;
    this.retryAttempts = config?.retryAttempts || wordpressConfig.api.retryAttempts;
    this.retryDelay = config?.retryDelay || wordpressConfig.api.retryDelay;
    this.enableCache = wordpressConfig.enableCache;
    this.cache = new APICache();

    // Clean up expired cache entries every 5 minutes
    if (this.enableCache) {
      setInterval(() => this.cache.cleanup(), 5 * 60 * 1000);
    }
  }

  // Generic fetch method with error handling and retry logic
  private async fetchWithRetry<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorCode = 'HTTP_ERROR';

        // Try to parse WordPress error response
        try {
          const errorData = await response.json();
          if (errorData.code && errorData.message) {
            errorMessage = errorData.message;
            errorCode = errorData.code;
          }
        } catch {
          // Use default error message if parsing fails
        }

        throw new WordPressAPIError(
          errorMessage,
          response.status,
          endpoint,
          errorCode
        );
      }

      const data = await response.json();
      return this.validateResponse(data, endpoint);
    } catch (error) {
      // Handle network errors and timeouts
      if (error instanceof WordPressAPIError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new WordPressAPIError(
          'Request timeout',
          408,
          endpoint,
          'TIMEOUT_ERROR'
        );
      }

      // Retry logic for network errors
      if (retryCount < this.retryAttempts) {
        await this.delay(this.retryDelay * Math.pow(2, retryCount)); // Exponential backoff
        return this.fetchWithRetry<T>(endpoint, options, retryCount + 1);
      }

      throw new WordPressAPIError(
        error instanceof Error ? error.message : 'Network error',
        0,
        endpoint,
        'NETWORK_ERROR'
      );
    }
  }

  // Response validation
  private validateResponse<T>(data: any, endpoint: string): T {
    if (data === null || data === undefined) {
      throw new WordPressAPIError(
        'Invalid response: null or undefined data',
        500,
        endpoint,
        'INVALID_RESPONSE'
      );
    }

    // Basic validation for array responses
    if (Array.isArray(data)) {
      return data as T;
    }

    // Basic validation for object responses
    if (typeof data === 'object') {
      return data as T;
    }

    return data as T;
  }

  // Utility method for delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Cache key generation
  private getCacheKey(endpoint: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `${endpoint}${paramString}`;
  }

  // Get cached data or fetch from API
  private async getCachedOrFetch<T>(
    endpoint: string,
    ttl: number,
    params?: Record<string, any>
  ): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);

    // Try to get from cache first
    if (this.enableCache) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Fetch from API
    const data = await this.fetchWithRetry<T>(endpoint);

    // Cache the result
    if (this.enableCache) {
      this.cache.set(cacheKey, data, ttl);
    }

    return data;
  }  
// Fetch multiple posts with optional parameters
  async getPosts(params: PostQueryParams = {}): Promise<PostsResponse> {
    const queryParams = new URLSearchParams();
    
    // Set default parameters
    const defaultParams: PostQueryParams = {
      status: 'publish',
      _embed: true,
      per_page: 10,
      page: 1,
      ...params,
    };

    // Build query string
    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const endpoint = `/posts?${queryParams.toString()}`;
    const ttl = wordpressConfig.cache.posts;

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      
      if (!response.ok) {
        throw new WordPressAPIError(
          `Failed to fetch posts: ${response.statusText}`,
          response.status,
          endpoint
        );
      }

      const posts = await response.json();
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
      const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);

      const result: PostsResponse = {
        posts: this.validateResponse<Post[]>(posts, endpoint),
        totalPages,
        totalPosts,
        currentPage: defaultParams.page || 1,
      };

      // Cache the result
      if (this.enableCache) {
        const cacheKey = this.getCacheKey(endpoint);
        this.cache.set(cacheKey, result, ttl);
      }

      return result;
    } catch (error) {
      if (error instanceof WordPressAPIError) {
        throw error;
      }
      throw new WordPressAPIError(
        error instanceof Error ? error.message : 'Failed to fetch posts',
        500,
        endpoint
      );
    }
  }

  // Fetch a single post by slug
  async getPostBySlug(slug: string): Promise<Post> {
    if (!slug) {
      throw new WordPressAPIError(
        'Post slug is required',
        400,
        '/posts',
        'MISSING_SLUG'
      );
    }

    const params: PostQueryParams = {
      slug,
      status: 'publish',
      _embed: true,
    };

    const response = await this.getPosts(params);
    
    if (!response.posts || response.posts.length === 0) {
      throw new WordPressAPIError(
        `Post not found: ${slug}`,
        404,
        `/posts?slug=${slug}`,
        'POST_NOT_FOUND'
      );
    }

    return response.posts[0];
  }

  // Fetch a single post by ID
  async getPostById(id: number): Promise<Post> {
    if (!id || id <= 0) {
      throw new WordPressAPIError(
        'Valid post ID is required',
        400,
        '/posts',
        'INVALID_POST_ID'
      );
    }

    const endpoint = `/posts/${id}?_embed=true`;
    const ttl = wordpressConfig.cache.post;

    return this.getCachedOrFetch<Post>(endpoint, ttl);
  }

  // Fetch categories
  async getCategories(params: CategoryQueryParams = {}): Promise<Category[]> {
    const queryParams = new URLSearchParams();
    
    // Set default parameters
    const defaultParams: CategoryQueryParams = {
      per_page: 100,
      orderby: 'name',
      order: 'asc',
      hide_empty: true,
      ...params,
    };

    // Build query string
    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const endpoint = `/categories?${queryParams.toString()}`;
    const ttl = wordpressConfig.cache.media; // Use media TTL for categories

    return this.getCachedOrFetch<Category[]>(endpoint, ttl, defaultParams);
  }

  // Fetch tags
  async getTags(params: TagQueryParams = {}): Promise<Tag[]> {
    const queryParams = new URLSearchParams();
    
    // Set default parameters
    const defaultParams: TagQueryParams = {
      per_page: 100,
      orderby: 'name',
      order: 'asc',
      hide_empty: true,
      ...params,
    };

    // Build query string
    Object.entries(defaultParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });

    const endpoint = `/tags?${queryParams.toString()}`;
    const ttl = wordpressConfig.cache.media; // Use media TTL for tags

    return this.getCachedOrFetch<Tag[]>(endpoint, ttl, defaultParams);
  }

  // Fetch authors/users
  async getAuthors(): Promise<Author[]> {
    const endpoint = '/users?per_page=100&orderby=name&order=asc';
    const ttl = wordpressConfig.cache.media; // Use media TTL for authors

    return this.getCachedOrFetch<Author[]>(endpoint, ttl);
  }

  // Fetch author by ID
  async getAuthorById(id: number): Promise<Author> {
    if (!id || id <= 0) {
      throw new WordPressAPIError(
        'Valid author ID is required',
        400,
        '/users',
        'INVALID_AUTHOR_ID'
      );
    }

    const endpoint = `/users/${id}`;
    const ttl = wordpressConfig.cache.media; // Use media TTL for author

    return this.getCachedOrFetch<Author>(endpoint, ttl);
  }

  // Fetch media by ID
  async getMediaById(id: number): Promise<Media> {
    if (!id || id <= 0) {
      throw new WordPressAPIError(
        'Valid media ID is required',
        400,
        '/media',
        'INVALID_MEDIA_ID'
      );
    }

    const endpoint = `/media/${id}`;
    const ttl = wordpressConfig.cache.media;

    return this.getCachedOrFetch<Media>(endpoint, ttl);
  }

  // Search posts
  async searchPosts(query: string, params: Omit<PostQueryParams, 'search'> = {}): Promise<PostsResponse> {
    if (!query || query.trim().length === 0) {
      throw new WordPressAPIError(
        'Search query is required',
        400,
        '/posts',
        'MISSING_SEARCH_QUERY'
      );
    }

    return this.getPosts({
      ...params,
      search: query.trim(),
    });
  }

  // Get posts by category
  async getPostsByCategory(categoryId: number, params: Omit<PostQueryParams, 'categories'> = {}): Promise<PostsResponse> {
    if (!categoryId || categoryId <= 0) {
      throw new WordPressAPIError(
        'Valid category ID is required',
        400,
        '/posts',
        'INVALID_CATEGORY_ID'
      );
    }

    return this.getPosts({
      ...params,
      categories: [categoryId],
    });
  }

  // Get posts by tag
  async getPostsByTag(tagId: number, params: Omit<PostQueryParams, 'tags'> = {}): Promise<PostsResponse> {
    if (!tagId || tagId <= 0) {
      throw new WordPressAPIError(
        'Valid tag ID is required',
        400,
        '/posts',
        'INVALID_TAG_ID'
      );
    }

    return this.getPosts({
      ...params,
      tags: [tagId],
    });
  }

  // Cache management methods
  clearCache(): void {
    this.cache.clear();
  }

  deleteCacheEntry(endpoint: string, params?: Record<string, any>): boolean {
    const cacheKey = this.getCacheKey(endpoint, params);
    return this.cache.delete(cacheKey);
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      const endpoint = '/posts?per_page=1';
      await this.fetchWithRetry(endpoint);
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const wordpressAPI = new WordPressAPIService();

// Export class for custom instances
export default WordPressAPIService;