import { Post, Author, Media, Category, Tag, PostsResponse } from '../../types/wordpress'

// Mock Author data
export const mockAuthor: Author = {
  id: 1,
  name: 'Test Author',
  slug: 'test-author',
  description: 'Test author description',
  link: 'https://cms.cfoedge360.com/author/test-author',
  avatar_urls: {
    '24': 'https://example.com/avatar-24.jpg',
    '48': 'https://example.com/avatar-48.jpg',
    '96': 'https://example.com/avatar-96.jpg'
  }
}

// Mock Media data
export const mockMedia: Media = {
  id: 1,
  date: '2024-01-01T10:00:00',
  slug: 'test-image',
  type: 'attachment',
  link: 'https://cms.cfoedge360.com/test-image',
  title: {
    rendered: 'Test Image'
  },
  author: 1,
  caption: {
    rendered: 'Test image caption'
  },
  alt_text: 'Test image alt text',
  media_type: 'image',
  mime_type: 'image/jpeg',
  source_url: 'https://cms.cfoedge360.com/wp-content/uploads/test-image.jpg',
  media_details: {
    width: 1200,
    height: 800,
    file: 'test-image.jpg',
    sizes: {
      thumbnail: {
        file: 'test-image-150x150.jpg',
        width: 150,
        height: 150,
        mime_type: 'image/jpeg',
        source_url: 'https://cms.cfoedge360.com/wp-content/uploads/test-image-150x150.jpg'
      },
      medium: {
        file: 'test-image-300x200.jpg',
        width: 300,
        height: 200,
        mime_type: 'image/jpeg',
        source_url: 'https://cms.cfoedge360.com/wp-content/uploads/test-image-300x200.jpg'
      }
    }
  }
}

// Mock Category data
export const mockCategory: Category = {
  id: 1,
  count: 5,
  description: 'Test category description',
  link: 'https://cms.cfoedge360.com/category/test-category',
  name: 'Test Category',
  slug: 'test-category',
  taxonomy: 'category',
  parent: 0
}

// Mock Tag data
export const mockTag: Tag = {
  id: 1,
  count: 3,
  description: 'Test tag description',
  link: 'https://cms.cfoedge360.com/tag/test-tag',
  name: 'Test Tag',
  slug: 'test-tag',
  taxonomy: 'post_tag'
}

// Mock Post data
export const mockPost: Post = {
  id: 1,
  title: {
    rendered: 'Test Blog Post'
  },
  content: {
    rendered: '<p>This is a test blog post content.</p>'
  },
  excerpt: {
    rendered: '<p>This is a test excerpt.</p>'
  },
  slug: 'test-blog-post',
  date: '2024-01-01T10:00:00',
  modified: '2024-01-01T10:00:00',
  author: 1,
  featured_media: 1,
  categories: [1, 2],
  tags: [1, 2],
  link: 'https://cms.cfoedge360.com/test-blog-post',
  status: 'publish',
  type: 'post',
  _embedded: {
    author: [mockAuthor],
    'wp:featuredmedia': [mockMedia],
    'wp:term': [[mockCategory], [mockTag]]
  }
}

// Mock Posts Response
export const mockPostsResponse: PostsResponse = {
  posts: [mockPost],
  totalPages: 1,
  totalPosts: 1,
  currentPage: 1
}

// Mock multiple posts
export const mockPosts: Post[] = [
  mockPost,
  {
    ...mockPost,
    id: 2,
    title: { rendered: 'Second Test Post' },
    slug: 'second-test-post',
    content: { rendered: '<p>Second test post content.</p>' },
    excerpt: { rendered: '<p>Second test excerpt.</p>' }
  },
  {
    ...mockPost,
    id: 3,
    title: { rendered: 'Third Test Post' },
    slug: 'third-test-post',
    content: { rendered: '<p>Third test post content.</p>' },
    excerpt: { rendered: '<p>Third test excerpt.</p>' }
  }
]

// Mock WordPress API Error Response
export const mockWordPressError = {
  code: 'rest_post_invalid_id',
  message: 'Invalid post ID.',
  data: {
    status: 404
  }
}

// Mock fetch responses
export const createMockResponse = (data: any, status = 200, headers: Record<string, string> = {}) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {
      get: (key: string) => headers[key] || null,
      ...headers
    },
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data))
  } as Response
}

// Mock successful posts response with headers
export const mockPostsResponseWithHeaders = createMockResponse(
  mockPosts,
  200,
  {
    'X-WP-Total': '3',
    'X-WP-TotalPages': '1'
  }
)

// Mock error response
export const mockErrorResponse = createMockResponse(
  mockWordPressError,
  404
)