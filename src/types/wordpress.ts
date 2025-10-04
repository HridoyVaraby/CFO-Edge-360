// WordPress API data models and types

// Core WordPress Post interface
export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  link: string;
  status: 'publish' | 'draft' | 'private';
  type: string;
  _embedded?: {
    author: Author[];
    'wp:featuredmedia': Media[];
    'wp:term': Term[][];
  };
}

// Author interface
export interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  link: string;
  avatar_urls: {
    [size: string]: string;
  };
}

// Media/Featured Image interface
export interface Media {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [size: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
}

// Category interface
export interface Category {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

// Tag interface
export interface Tag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

// Generic term interface for categories and tags
export interface Term {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link: string;
}

// API Response types
export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  totalPosts: number;
  currentPage: number;
}

export interface APIResponse<T> {
  data: T;
  status: number;
  headers: {
    'x-wp-total': string;
    'x-wp-totalpages': string;
  };
}

// Error handling interfaces
export interface WordPressAPIError {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

export interface APIErrorResponse {
  error: WordPressAPIError;
  endpoint: string;
  timestamp: string;
}

// Query parameter types
export interface PostQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  author?: number;
  categories?: number[];
  tags?: number[];
  slug?: string;
  status?: 'publish' | 'draft' | 'private';
  orderby?: 'date' | 'id' | 'include' | 'title' | 'slug';
  order?: 'asc' | 'desc';
  exclude?: number[];
  _embed?: boolean;
}

export interface CategoryQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
  order?: 'asc' | 'desc';
  hide_empty?: boolean;
  parent?: number;
  post?: number;
  slug?: string;
}

export interface TagQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
  order?: 'asc' | 'desc';
  hide_empty?: boolean;
  post?: number;
  slug?: string;
}

// Pagination utility types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Cache configuration types
export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items to cache
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// API Service configuration
export interface WordPressAPIConfig {
  baseURL: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  cache?: {
    posts: CacheConfig;
    post: CacheConfig;
    media: CacheConfig;
    categories: CacheConfig;
    tags: CacheConfig;
  };
}