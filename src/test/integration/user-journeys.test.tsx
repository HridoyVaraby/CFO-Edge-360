import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { wordpressAPI } from '../../services/wordpress';
import { mockPosts, mockPost, mockCategories, mockTags } from '../mocks/wordpress-data';
import Header from '../../components/Header';
import PostCard from '../../components/blog/PostCard';
import PostDetail from '../../components/blog/PostDetail';
import PostList from '../../components/blog/PostList';

// Mock the WordPress API
vi.mock('../../services/wordpress');

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

// Mock IntersectionObserver for lazy loading
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

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

// Helper to render header with navigation
const renderHeader = (initialRoute = '/') => {
  return renderWithProviders(<Header />, [initialRoute]);
};

describe('User Journey Integration Tests', () => {
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

  describe('Navigation from Main Site to Blog', () => {
    it('should display blog link in header navigation', async () => {
      renderHeader('/');

      // Find the Blog link in the header
      const blogLink = screen.getByRole('link', { name: /blog/i });
      expect(blogLink).toBeInTheDocument();
      expect(blogLink).toHaveAttribute('href', '/posts');
    });

    it('should show blog navigation as active on blog pages', async () => {
      renderHeader('/posts');

      // Verify all navigation links are present
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();

      // Verify blog link is active
      const blogLink = screen.getByRole('link', { name: /blog/i });
      expect(blogLink).toHaveClass('text-amber-600');
    });

    it('should show blog navigation as active on post detail pages', async () => {
      renderHeader('/post/sample-post');

      // Verify blog link is active for post detail pages
      const blogLink = screen.getByRole('link', { name: /blog/i });
      expect(blogLink).toHaveClass('text-amber-600');
    });
  });

  describe('Post Browsing and Reading Flows', () => {
    it('should display post cards with proper content', async () => {
      renderWithProviders(<PostCard post={mockPosts[0]} />);

      // Verify post card content
      expect(screen.getByText(mockPosts[0].title.rendered)).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', `/post/${mockPosts[0].slug}`);
    });

    it('should display post list with loading and error states', async () => {
      renderWithProviders(
        <PostList 
          posts={mockPosts} 
          loading={false} 
          error={null}
          onRetry={() => {}}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify posts are displayed
      expect(screen.getByText(mockPosts[0].title.rendered)).toBeInTheDocument();
      expect(screen.getByText(mockPosts[1].title.rendered)).toBeInTheDocument();
    });

    it('should display post detail with proper content', async () => {
      renderWithProviders(
        <PostDetail 
          post={mockPost} 
          loading={false} 
          error={null}
          onRetry={() => {}}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify post detail content
      expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      expect(screen.getByText(/test blog post content/i)).toBeInTheDocument();
    });

    it('should handle post list loading state', async () => {
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={true} 
          error={null}
          onRetry={() => {}}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify loading state is shown
      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });

    it('should handle post list error state with retry', async () => {
      const mockRetry = vi.fn();
      const user = userEvent.setup();
      
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={false} 
          error="Network error"
          onRetry={mockRetry}
          isRetrying={false}
          retryCount={1}
          maxRetries={3}
        />
      );

      // Verify error message is shown
      expect(screen.getByText(/network error/i)).toBeInTheDocument();

      // Find and click retry button
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();

      await user.click(retryButton);

      // Verify retry function was called
      expect(mockRetry).toHaveBeenCalled();
    });

    it('should handle post detail loading state', async () => {
      renderWithProviders(
        <PostDetail 
          post={null} 
          loading={true} 
          error={null}
          onRetry={() => {}}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify loading state is shown
      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });
  });

  describe('Error Scenarios and Recovery', () => {
    it('should handle post list error state with retry functionality', async () => {
      const mockRetry = vi.fn();
      const user = userEvent.setup();
      
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={false} 
          error="Failed to load posts"
          onRetry={mockRetry}
          isRetrying={false}
          retryCount={1}
          maxRetries={3}
        />
      );

      // Verify error message is shown (the component shows generic error message)
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

      // Find and click retry button
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();

      await user.click(retryButton);

      // Verify retry function was called
      expect(mockRetry).toHaveBeenCalled();
    });

    it('should handle post detail error state', async () => {
      const mockRetry = vi.fn();
      
      renderWithProviders(
        <PostDetail 
          post={null} 
          loading={false} 
          error="Post not found"
          onRetry={mockRetry}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify error message is shown (the component shows generic error message)
      expect(screen.getByText(/content not found/i)).toBeInTheDocument();
    });

    it('should show retry count and max retries', async () => {
      const mockRetry = vi.fn();
      
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={false} 
          error="Network error"
          onRetry={mockRetry}
          isRetrying={false}
          retryCount={2}
          maxRetries={3}
        />
      );

      // Verify retry information is shown
      expect(screen.getByText(/attempt 2 of 3/i)).toBeInTheDocument();
    });

    it('should handle mobile navigation properly', async () => {
      const user = userEvent.setup();
      
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderHeader('/posts');

      // Find mobile menu button (it doesn't have accessible name, so use generic button)
      const menuButton = screen.getByRole('button');
      expect(menuButton).toBeInTheDocument();

      // Click to open mobile menu
      await user.click(menuButton);

      // Verify mobile navigation is open (check for multiple home links)
      const homeLinks = screen.getAllByRole('link', { name: /home/i });
      expect(homeLinks.length).toBeGreaterThan(1); // Should have both desktop and mobile versions
    });

    it('should handle retrying state', async () => {
      const mockRetry = vi.fn();
      
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={false} 
          error="Network error"
          onRetry={mockRetry}
          isRetrying={true}
          retryCount={1}
          maxRetries={3}
        />
      );

      // Verify retrying state is shown
      expect(screen.getByText(/retrying/i)).toBeInTheDocument();
      
      // During retry, there should be no retry button (it's replaced with retrying message)
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });

    it('should handle max retries reached', async () => {
      const mockRetry = vi.fn();
      
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={false} 
          error="Network error"
          onRetry={mockRetry}
          isRetrying={false}
          retryCount={3}
          maxRetries={3}
        />
      );

      // Verify retry count shows max attempts
      expect(screen.getByText(/retry attempt 3 of 3/i)).toBeInTheDocument();
      
      // Retry button should still be available (component allows retry even at max)
      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render post card with clickable link', async () => {
      renderWithProviders(<PostCard post={mockPosts[0]} />);

      // Verify post card content
      expect(screen.getByText(mockPosts[0].title.rendered)).toBeInTheDocument();
      
      // Verify link is correct
      const postLink = screen.getByRole('link');
      expect(postLink).toHaveAttribute('href', `/post/${mockPosts[0].slug}`);
    });

    it('should render post detail with proper content structure', async () => {
      renderWithProviders(
        <PostDetail 
          post={mockPost} 
          loading={false} 
          error={null}
          onRetry={() => {}}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify post detail content structure
      expect(screen.getByText(mockPost.title.rendered)).toBeInTheDocument();
      expect(screen.getByText(/test blog post content/i)).toBeInTheDocument();
      
      // Verify author and date information
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/january 15, 2024/i)).toBeInTheDocument();
    });

    it('should handle empty post list gracefully', async () => {
      renderWithProviders(
        <PostList 
          posts={[]} 
          loading={false} 
          error={null}
          onRetry={() => {}}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
        />
      );

      // Verify empty state message
      expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
    });

    it('should display proper navigation links in header', async () => {
      renderHeader('/posts');

      // Verify all navigation links are present
      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
      expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/posts');
      expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
    });

    it('should show active navigation state for blog pages', async () => {
      renderHeader('/posts');

      // Verify blog link is active
      const blogLink = screen.getByRole('link', { name: /blog/i });
      expect(blogLink).toHaveClass('text-amber-600');
    });

    it('should show active navigation state for post detail pages', async () => {
      renderHeader('/post/sample-post');

      // Verify blog link is active for post detail pages
      const blogLink = screen.getByRole('link', { name: /blog/i });
      expect(blogLink).toHaveClass('text-amber-600');
    });
  });
});