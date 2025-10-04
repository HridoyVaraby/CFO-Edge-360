import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { WordPressAPIService, WordPressAPIError } from '../wordpress'
import {
  mockPost,
  mockPosts,
  mockAuthor,
  mockMedia,
  mockCategory,
  mockTag,
  mockPostsResponse,
  mockWordPressError,
  createMockResponse,
  mockPostsResponseWithHeaders,
  mockErrorResponse
} from '../../test/mocks/wordpress-data'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('WordPressAPIService', () => {
  let service: WordPressAPIService
  
  beforeEach(() => {
    // Create a new service instance for each test
    service = new WordPressAPIService({
      baseURL: 'https://test-cms.example.com/wp-json/wp/v2',
      timeout: 5000,
      retryAttempts: 2,
      retryDelay: 100
    })
    
    // Clear all mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    // Clear cache after each test
    service.clearCache()
  })

  describe('Constructor and Configuration', () => {
    it('should initialize with default configuration', () => {
      const defaultService = new WordPressAPIService()
      expect(defaultService).toBeInstanceOf(WordPressAPIService)
    })

    it('should initialize with custom configuration', () => {
      const customService = new WordPressAPIService({
        baseURL: 'https://custom.example.com/wp-json/wp/v2',
        timeout: 15000,
        retryAttempts: 5
      })
      expect(customService).toBeInstanceOf(WordPressAPIService)
    })
  })

  describe('WordPressAPIError', () => {
    it('should create error with all properties', () => {
      const error = new WordPressAPIError(
        'Test error message',
        404,
        '/posts/123',
        'POST_NOT_FOUND'
      )
      
      expect(error.message).toBe('Test error message')
      expect(error.status).toBe(404)
      expect(error.endpoint).toBe('/posts/123')
      expect(error.code).toBe('POST_NOT_FOUND')
      expect(error.name).toBe('WordPressAPIError')
    })

    it('should create error with default code', () => {
      const error = new WordPressAPIError('Test error', 500, '/posts')
      expect(error.code).toBe('UNKNOWN_ERROR')
    })
  })

  describe('getPosts', () => {
    it('should fetch posts successfully', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      const result = await service.getPosts()

      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('/posts?')
      expect(result.posts).toHaveLength(3)
      expect(result.totalPages).toBe(1)
      expect(result.totalPosts).toBe(3)
      expect(result.currentPage).toBe(1)
    })

    it('should fetch posts with custom parameters', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      await service.getPosts({
        per_page: 5,
        page: 2,
        search: 'test query',
        categories: [1, 2]
      })

      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('per_page=5')
      expect(callUrl).toContain('page=2')
      expect(callUrl).toContain('search=test+query')
      expect(callUrl).toContain('categories=1%2C2')
    })

    it('should handle API error response', async () => {
      mockFetch.mockResolvedValueOnce(mockErrorResponse)

      await expect(service.getPosts()).rejects.toThrow(WordPressAPIError)
    })

    it('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(service.getPosts()).rejects.toThrow(WordPressAPIError)
    })

    it('should handle timeout error', async () => {
      mockFetch.mockImplementationOnce(() => 
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('AbortError')), 100)
        })
      )

      await expect(service.getPosts()).rejects.toThrow(WordPressAPIError)
    })
  })

  describe('getPostBySlug', () => {
    it('should fetch post by slug successfully', async () => {
      const mockResponse = createMockResponse([mockPost], 200, {
        'X-WP-Total': '1',
        'X-WP-TotalPages': '1'
      })
      mockFetch.mockResolvedValueOnce(mockResponse)

      const result = await service.getPostBySlug('test-blog-post')

      expect(result).toEqual(mockPost)
      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('slug=test-blog-post')
    })

    it('should throw error for empty slug', async () => {
      await expect(service.getPostBySlug('')).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostBySlug('')).rejects.toThrow('Post slug is required')
    })

    it('should throw error when post not found', async () => {
      const mockResponse = createMockResponse([], 200, {
        'X-WP-Total': '0',
        'X-WP-TotalPages': '0'
      })
      mockFetch.mockResolvedValueOnce(mockResponse)

      await expect(service.getPostBySlug('non-existent-post')).rejects.toThrow(WordPressAPIError)
    })
  })

  describe('getPostById', () => {
    it('should fetch post by ID successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(mockPost))

      const result = await service.getPostById(1)

      expect(result).toEqual(mockPost)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/posts/1?_embed=true'),
        expect.any(Object)
      )
    })

    it('should throw error for invalid ID', async () => {
      await expect(service.getPostById(0)).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostById(-1)).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostById(0)).rejects.toThrow('Valid post ID is required')
    })

    it('should handle 404 error', async () => {
      mockFetch.mockResolvedValueOnce(mockErrorResponse)

      await expect(service.getPostById(999)).rejects.toThrow(WordPressAPIError)
    })
  })

  describe('getCategories', () => {
    it('should fetch categories successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([mockCategory]))

      const result = await service.getCategories()

      expect(result).toEqual([mockCategory])
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/categories?'),
        expect.any(Object)
      )
    })

    it('should fetch categories with custom parameters', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([mockCategory]))

      await service.getCategories({
        per_page: 50,
        orderby: 'count',
        order: 'desc',
        hide_empty: false
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('per_page=50'),
        expect.any(Object)
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('orderby=count'),
        expect.any(Object)
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('order=desc'),
        expect.any(Object)
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('hide_empty=false'),
        expect.any(Object)
      )
    })
  })

  describe('getTags', () => {
    it('should fetch tags successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([mockTag]))

      const result = await service.getTags()

      expect(result).toEqual([mockTag])
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/tags?'),
        expect.any(Object)
      )
    })

    it('should fetch tags with custom parameters', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([mockTag]))

      await service.getTags({
        per_page: 25,
        search: 'finance'
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('per_page=25'),
        expect.any(Object)
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=finance'),
        expect.any(Object)
      )
    })
  })

  describe('getAuthors', () => {
    it('should fetch authors successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([mockAuthor]))

      const result = await service.getAuthors()

      expect(result).toEqual([mockAuthor])
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/users?'),
        expect.any(Object)
      )
    })
  })

  describe('getAuthorById', () => {
    it('should fetch author by ID successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(mockAuthor))

      const result = await service.getAuthorById(1)

      expect(result).toEqual(mockAuthor)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/users/1'),
        expect.any(Object)
      )
    })

    it('should throw error for invalid author ID', async () => {
      await expect(service.getAuthorById(0)).rejects.toThrow(WordPressAPIError)
      await expect(service.getAuthorById(-1)).rejects.toThrow(WordPressAPIError)
      await expect(service.getAuthorById(0)).rejects.toThrow('Valid author ID is required')
    })
  })

  describe('getMediaById', () => {
    it('should fetch media by ID successfully', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(mockMedia))

      const result = await service.getMediaById(1)

      expect(result).toEqual(mockMedia)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/media/1'),
        expect.any(Object)
      )
    })

    it('should throw error for invalid media ID', async () => {
      await expect(service.getMediaById(0)).rejects.toThrow(WordPressAPIError)
      await expect(service.getMediaById(-1)).rejects.toThrow(WordPressAPIError)
      await expect(service.getMediaById(0)).rejects.toThrow('Valid media ID is required')
    })
  })

  describe('searchPosts', () => {
    it('should search posts successfully', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      const result = await service.searchPosts('test query')

      expect(result.posts).toHaveLength(3)
      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('search=test+query')
    })

    it('should throw error for empty search query', async () => {
      await expect(service.searchPosts('')).rejects.toThrow(WordPressAPIError)
      await expect(service.searchPosts('   ')).rejects.toThrow(WordPressAPIError)
      await expect(service.searchPosts('')).rejects.toThrow('Search query is required')
    })

    it('should search posts with additional parameters', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      await service.searchPosts('test', { per_page: 5, categories: [1] })

      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('search=test')
      expect(callUrl).toContain('per_page=5')
      expect(callUrl).toContain('categories=1')
    })
  })

  describe('getPostsByCategory', () => {
    it('should fetch posts by category successfully', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      const result = await service.getPostsByCategory(1)

      expect(result.posts).toHaveLength(3)
      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('categories=1')
    })

    it('should throw error for invalid category ID', async () => {
      await expect(service.getPostsByCategory(0)).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostsByCategory(-1)).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostsByCategory(0)).rejects.toThrow('Valid category ID is required')
    })
  })

  describe('getPostsByTag', () => {
    it('should fetch posts by tag successfully', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      const result = await service.getPostsByTag(1)

      expect(result.posts).toHaveLength(3)
      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('tags=1')
    })

    it('should throw error for invalid tag ID', async () => {
      await expect(service.getPostsByTag(0)).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostsByTag(-1)).rejects.toThrow(WordPressAPIError)
      await expect(service.getPostsByTag(0)).rejects.toThrow('Valid tag ID is required')
    })
  })

  describe('Error Handling and Retry Logic', () => {
    it('should retry on network failure', async () => {
      // First two calls fail, third succeeds
      mockFetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(createMockResponse(mockPost))

      const result = await service.getPostById(1)

      expect(result).toEqual(mockPost)
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })

    it('should fail after max retry attempts', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      await expect(service.getPostById(1)).rejects.toThrow(WordPressAPIError)
      expect(mockFetch).toHaveBeenCalledTimes(3) // Initial + 2 retries
    })

    it('should handle timeout errors', async () => {
      mockFetch.mockImplementationOnce(() => {
        const error = new Error('Request timeout')
        error.name = 'AbortError'
        return Promise.reject(error)
      })

      await expect(service.getPostById(1)).rejects.toThrow('Request timeout')
    })

    it('should parse WordPress error responses', async () => {
      const errorResponse = createMockResponse(mockWordPressError, 404)
      mockFetch.mockResolvedValueOnce(errorResponse)

      await expect(service.getPostById(999)).rejects.toThrow('Invalid post ID.')
    })

    it('should handle malformed error responses', async () => {
      const errorResponse = createMockResponse('Invalid JSON', 500)
      errorResponse.json = () => Promise.reject(new Error('Invalid JSON'))
      mockFetch.mockResolvedValueOnce(errorResponse)

      await expect(service.getPostById(1)).rejects.toThrow('HTTP 500: Error')
    })
  })

  describe('Response Validation', () => {
    it('should validate null responses', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(null))

      await expect(service.getPostById(1)).rejects.toThrow('Invalid response: null or undefined data')
    })

    it('should validate undefined responses', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(undefined))

      await expect(service.getPostById(1)).rejects.toThrow('Invalid response: null or undefined data')
    })

    it('should accept array responses', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([mockPost]))

      const result = await service.getAuthors()
      expect(Array.isArray(result)).toBe(true)
    })

    it('should accept object responses', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse(mockPost))

      const result = await service.getPostById(1)
      expect(typeof result).toBe('object')
    })
  })

  describe('Cache Management', () => {
    it('should clear cache', () => {
      expect(() => service.clearCache()).not.toThrow()
    })

    it('should delete specific cache entries', () => {
      const result = service.deleteCacheEntry('/posts/1')
      expect(typeof result).toBe('boolean')
    })
  })

  describe('Health Check', () => {
    it('should return true for successful health check', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      const result = await service.healthCheck()

      expect(result).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/posts?per_page=1'),
        expect.any(Object)
      )
    })

    it('should return false for failed health check', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.healthCheck()

      expect(result).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty array responses', async () => {
      mockFetch.mockResolvedValueOnce(createMockResponse([]))

      const result = await service.getAuthors()

      expect(result).toEqual([])
      expect(Array.isArray(result)).toBe(true)
    })

    it('should handle special characters in search queries', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      await service.searchPosts('test & special chars!')

      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('search=test+%26+special+chars%21')
    })

    it('should handle array parameters correctly', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      await service.getPosts({
        categories: [1, 2, 3],
        tags: [4, 5]
      })

      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).toContain('categories=1%2C2%2C3')
      expect(callUrl).toContain('tags=4%2C5')
    })

    it('should filter out null and undefined parameters', async () => {
      mockFetch.mockResolvedValueOnce(mockPostsResponseWithHeaders)

      await service.getPosts({
        search: undefined,
        author: null as any,
        per_page: 10
      })

      const callUrl = mockFetch.mock.calls[0][0] as string
      expect(callUrl).not.toContain('search=')
      expect(callUrl).not.toContain('author=')
      expect(callUrl).toContain('per_page=10')
    })
  })
})