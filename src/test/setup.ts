import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch globally for tests
global.fetch = vi.fn()

// Mock environment variables
vi.mock('../config/wordpress', () => ({
  wordpressConfig: {
    apiUrl: 'https://test-cms.example.com/wp-json/wp/v2',
    siteUrl: 'https://test.example.com',
    enableCache: true,
    cache: {
      posts: 300000,
      post: 600000,
      media: 3600000,
    },
    api: {
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
    },
  },
}))