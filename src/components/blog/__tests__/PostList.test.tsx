import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import PostList from '../PostList';
import { mockPosts, mockPost } from '../../../test/mocks/wordpress-data';
import { Post } from '../../../types/wordpress';

// Mock PostCard component
vi.mock('../PostCard', () => ({
  default: ({ post }: { post: Post }) => (
    <div data-testid={`post-card-${post.id}`}>
      <h3>{post.title.rendered}</h3>
      <p>{post.excerpt.rendered.replace(/<[^>]*>/g, '')}</p>
    </div>
  ),
}));

// Wrapper component for router context
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('PostList', () => {
  const defaultProps = {
    posts: mockPosts,
    loading: false,
    error: null,
  };

  const renderPostList = (props = {}) => {
    return render(
      <RouterWrapper>
        <PostList {...defaultProps} {...props} />
      </RouterWrapper>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render posts when provided', () => {
      renderPostList();

      expect(screen.getByTestId('post-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('post-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('post-card-3')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderPostList({ className: 'custom-class' });
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('should render posts in a grid layout', () => {
      const { container } = renderPostList();

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });
  });

  describe('Loading States', () => {
    it('should show skeleton loaders when loading', () => {
      renderPostList({ loading: true });

      // Should show skeleton loaders
      const skeletons = screen.getAllByTestId(/post-card-/);
      expect(skeletons.length).toBeGreaterThan(0);

      // Should also show actual posts if they exist
      if (mockPosts.length > 0) {
        expect(screen.getByTestId('post-card-1')).toBeInTheDocument();
      }
    });

    it('should show only skeleton loaders when loading with no posts', () => {
      renderPostList({ posts: [], loading: true });

      // Check for skeleton loader elements
      const skeletonElements = document.querySelectorAll('.animate-pulse');
      expect(skeletonElements.length).toBeGreaterThan(0);
    });

    it('should not show skeleton loaders when not loading', () => {
      renderPostList({ loading: false });

      const skeletonElements = document.querySelectorAll('.animate-pulse');
      expect(skeletonElements.length).toBe(0);
    });
  });

  describe('Error States', () => {
    it('should show error message when error exists and not loading', () => {
      const errorMessage = 'Failed to load posts';
      renderPostList({ error: errorMessage, loading: false });

      expect(screen.getByText('Unable to Load Posts')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should show retry button when error exists and onRetry is provided', () => {
      const onRetry = vi.fn();
      renderPostList({ 
        error: 'Network error', 
        loading: false, 
        onRetry 
      });

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();

      fireEvent.click(retryButton);
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('should not show retry button when onRetry is not provided', () => {
      renderPostList({ 
        error: 'Network error', 
        loading: false 
      });

      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });

    it('should not show error when loading is true', () => {
      renderPostList({ 
        error: 'Network error', 
        loading: true 
      });

      expect(screen.queryByText('Unable to Load Posts')).not.toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('should show empty state when no posts and not loading', () => {
      renderPostList({ 
        posts: [], 
        loading: false, 
        error: null 
      });

      expect(screen.getByText('No Posts Found')).toBeInTheDocument();
      expect(screen.getByText('There are no blog posts available at the moment. Please check back later.')).toBeInTheDocument();
    });

    it('should not show empty state when loading', () => {
      renderPostList({ 
        posts: [], 
        loading: true, 
        error: null 
      });

      expect(screen.queryByText('No Posts Found')).not.toBeInTheDocument();
    });

    it('should not show empty state when error exists', () => {
      renderPostList({ 
        posts: [], 
        loading: false, 
        error: 'Some error' 
      });

      expect(screen.queryByText('No Posts Found')).not.toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('should show pagination when onPageChange is provided', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 2, 
        totalPages: 5, 
        onPageChange 
      });

      expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('should handle page navigation clicks', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 2, 
        totalPages: 5, 
        onPageChange 
      });

      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      expect(onPageChange).toHaveBeenCalledWith(3);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('should disable previous button on first page', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 1, 
        totalPages: 5, 
        onPageChange 
      });

      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('should disable next button on last page', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 5, 
        totalPages: 5, 
        onPageChange 
      });

      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });

    it('should not show pagination when totalPages is 1 or less', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 1, 
        totalPages: 1, 
        onPageChange 
      });

      expect(screen.queryByRole('navigation', { name: /pagination/i })).not.toBeInTheDocument();
    });

    it('should show correct page numbers', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 3, 
        totalPages: 5, 
        onPageChange 
      });

      // Should show page numbers
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    });

    it('should highlight current page', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 3, 
        totalPages: 5, 
        onPageChange 
      });

      const currentPageButton = screen.getByRole('button', { name: '3' });
      expect(currentPageButton).toHaveClass('bg-blue-900');
      expect(currentPageButton).toHaveClass('text-white');
    });

    it('should handle ellipsis for many pages', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 5, 
        totalPages: 10, 
        onPageChange 
      });

      const ellipsis = screen.getAllByText('...');
      expect(ellipsis.length).toBeGreaterThan(0);
    });
  });

  describe('Load More Functionality', () => {
    it('should show load more button when hasMore is true and onLoadMore is provided', () => {
      const onLoadMore = vi.fn();
      renderPostList({ 
        hasMore: true, 
        onLoadMore,
        loading: false,
        error: null
      });

      const loadMoreButton = screen.getByRole('button', { name: /load more posts/i });
      expect(loadMoreButton).toBeInTheDocument();

      fireEvent.click(loadMoreButton);
      expect(onLoadMore).toHaveBeenCalledTimes(1);
    });

    it('should not show load more button when hasMore is false', () => {
      const onLoadMore = vi.fn();
      renderPostList({ 
        hasMore: false, 
        onLoadMore,
        loading: false,
        error: null
      });

      expect(screen.queryByRole('button', { name: /load more posts/i })).not.toBeInTheDocument();
    });

    it('should not show load more button when onLoadMore is not provided', () => {
      renderPostList({ 
        hasMore: true,
        loading: false,
        error: null
      });

      expect(screen.queryByRole('button', { name: /load more posts/i })).not.toBeInTheDocument();
    });

    it('should not show load more button when pagination is enabled', () => {
      const onLoadMore = vi.fn();
      const onPageChange = vi.fn();
      renderPostList({ 
        hasMore: true, 
        onLoadMore,
        onPageChange,
        currentPage: 1,
        totalPages: 3,
        loading: false,
        error: null
      });

      expect(screen.queryByRole('button', { name: /load more posts/i })).not.toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
    });

    it('should not show load more button when loading or error', () => {
      const onLoadMore = vi.fn();
      
      // Test with loading
      const { rerender } = renderPostList({ 
        hasMore: true, 
        onLoadMore,
        loading: true,
        error: null
      });
      expect(screen.queryByRole('button', { name: /load more posts/i })).not.toBeInTheDocument();

      // Test with error
      rerender(
        <RouterWrapper>
          <PostList 
            {...defaultProps}
            hasMore={true}
            onLoadMore={onLoadMore}
            loading={false}
            error="Some error"
          />
        </RouterWrapper>
      );
      expect(screen.queryByRole('button', { name: /load more posts/i })).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for navigation', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 2, 
        totalPages: 5, 
        onPageChange 
      });

      const nav = screen.getByRole('navigation', { name: /pagination/i });
      expect(nav).toHaveAttribute('aria-label', 'Pagination');
    });

    it('should have proper button roles and states', () => {
      const onRetry = vi.fn();
      renderPostList({ 
        error: 'Network error', 
        loading: false, 
        onRetry 
      });

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();
      expect(retryButton).not.toBeDisabled();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const { container } = renderPostList();

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
      expect(grid).toHaveClass('gap-6');
      expect(grid).toHaveClass('lg:gap-8');
    });

    it('should have responsive container classes', () => {
      const { container } = renderPostList();

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('max-w-7xl');
      expect(wrapper).toHaveClass('mx-auto');
    });
  });

  describe('Animation Classes', () => {
    it('should have animation classes on error display', () => {
      renderPostList({ 
        error: 'Network error', 
        loading: false 
      });

      const errorDisplay = screen.getByText('Unable to Load Posts').closest('div');
      expect(errorDisplay).toHaveClass('animate-fade-in');
    });

    it('should have animation classes on empty state', () => {
      renderPostList({ 
        posts: [], 
        loading: false, 
        error: null 
      });

      const emptyState = screen.getByText('No Posts Found').closest('div');
      expect(emptyState?.parentElement).toHaveClass('animate-fade-in');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single post', () => {
      renderPostList({ posts: [mockPost] });

      expect(screen.getByTestId('post-card-1')).toBeInTheDocument();
      expect(screen.queryByTestId('post-card-2')).not.toBeInTheDocument();
    });

    it('should handle empty posts array', () => {
      renderPostList({ 
        posts: [], 
        loading: false, 
        error: null 
      });

      expect(screen.getByText('No Posts Found')).toBeInTheDocument();
    });

    it('should handle very large page numbers in pagination', () => {
      const onPageChange = vi.fn();
      renderPostList({ 
        currentPage: 50, 
        totalPages: 100, 
        onPageChange 
      });

      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '100' })).toBeInTheDocument();
      const ellipsis = screen.getAllByText('...');
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('should handle simultaneous loading and error states correctly', () => {
      // Error should not show when loading is true
      renderPostList({ 
        error: 'Network error', 
        loading: true 
      });

      expect(screen.queryByText('Unable to Load Posts')).not.toBeInTheDocument();
      expect(screen.getByTestId('post-card-1')).toBeInTheDocument(); // Posts still show
    });
  });

  describe('Performance', () => {
    it('should render large number of posts efficiently', () => {
      const manyPosts = Array.from({ length: 50 }, (_, index) => ({
        ...mockPost,
        id: index + 1,
        title: { rendered: `Post ${index + 1}` },
        slug: `post-${index + 1}`,
      }));

      const startTime = performance.now();
      renderPostList({ posts: manyPosts });
      const endTime = performance.now();

      // Should render within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);

      // Should render all posts
      expect(screen.getByTestId('post-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('post-card-50')).toBeInTheDocument();
    });
  });
});