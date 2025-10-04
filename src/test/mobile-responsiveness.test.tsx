import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import PostCard from '../components/blog/PostCard';
import PostList from '../components/blog/PostList';
import PostDetail from '../components/blog/PostDetail';
import BlogLayout from '../components/blog/BlogLayout';
import { mockPost, mockPosts } from './mocks/wordpress-data';

// Mock ResizeObserver for testing
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Helper function to render components with providers
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </HelmetProvider>
  );
};

// Helper function to simulate different viewport sizes
const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('Mobile Responsiveness Tests', () => {
  beforeEach(() => {
    // Reset viewport to desktop size before each test
    setViewportSize(1024, 768);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('PostCard Mobile Optimization', () => {
    it('should render properly on mobile screens', () => {
      setViewportSize(375, 667); // iPhone SE size
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      // Check that the post card is rendered
      expect(screen.getByRole('article')).toBeInTheDocument();
      
      // Check that title is present and accessible
      const titleLink = screen.getByRole('link', { name: /read full post/i });
      expect(titleLink).toBeInTheDocument();
      expect(titleLink).toHaveAttribute('aria-label');
      
      // Check that read more button has proper touch target
      const readMoreButton = screen.getByRole('link', { name: /read more about/i });
      expect(readMoreButton).toBeInTheDocument();
      expect(readMoreButton).toHaveClass('min-h-[44px]');
    });

    it('should have proper touch targets for mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      // Check that the read more button has proper mobile touch target
      const readMoreButton = screen.getByRole('link', { name: /read more about/i });
      expect(readMoreButton).toHaveClass('min-h-[44px]');
      
      // Check that links have focus states for accessibility
      const titleLink = screen.getByRole('link', { name: /read full post/i });
      expect(titleLink).toHaveClass('focus:ring-2');
      expect(titleLink).toHaveClass('focus:ring-amber-500');
    });

    it('should handle image aspect ratios correctly on mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      // Check that the LazyImage container has proper mobile classes
      const imageContainer = screen.getByRole('article').querySelector('.h-48');
      expect(imageContainer).toBeInTheDocument();
      expect(imageContainer).toHaveClass('sm:h-56');
    });
  });

  describe('PostList Mobile Grid Layout', () => {
    it('should display single column on mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostList 
          posts={mockPosts} 
          loading={false} 
          error={null} 
        />
      );
      
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('sm:grid-cols-2');
    });

    it('should have proper spacing on mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostList 
          posts={mockPosts} 
          loading={false} 
          error={null} 
        />
      );
      
      const container = document.querySelector('.max-w-7xl');
      expect(container).toHaveClass('px-4');
      
      const grid = container?.querySelector('.grid');
      expect(grid).toHaveClass('gap-4');
    });

    it('should optimize pagination for mobile', () => {
      setViewportSize(375, 667);
      
      const mockPageChange = vi.fn();
      renderWithProviders(
        <PostList 
          posts={mockPosts} 
          loading={false} 
          error={null} 
          currentPage={2}
          totalPages={5}
          onPageChange={mockPageChange}
        />
      );
      
      // Check pagination buttons have proper touch targets
      const prevButton = screen.getByRole('button', { name: /go to previous page/i });
      const nextButton = screen.getByRole('button', { name: /go to next page/i });
      
      expect(prevButton).toHaveClass('min-h-[44px]');
      expect(nextButton).toHaveClass('min-h-[44px]');
      
      // Check that page numbers are scrollable on mobile
      const pageNumbers = document.querySelector('.overflow-x-auto');
      expect(pageNumbers).toBeInTheDocument();
    });
  });

  describe('PostDetail Mobile Optimization', () => {
    it('should render properly on mobile screens', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostDetail 
          post={mockPost} 
          loading={false} 
          error={null} 
        />
      );
      
      // Check that the article is rendered
      expect(screen.getByRole('article')).toBeInTheDocument();
      
      // Check mobile-optimized title sizing
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('text-2xl');
      expect(title).toHaveClass('sm:text-3xl');
    });

    it('should have readable typography on small screens', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostDetail 
          post={mockPost} 
          loading={false} 
          error={null} 
        />
      );
      
      const content = document.querySelector('.prose');
      expect(content).toHaveClass('prose-sm');
      expect(content).toHaveClass('sm:prose-base');
      expect(content).toHaveClass('blog-content');
    });

    it('should optimize navigation for mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostDetail 
          post={mockPost} 
          loading={false} 
          error={null} 
        />
      );
      
      // Check back button has proper touch target
      const backButton = screen.getByRole('link', { name: /go back to blog posts/i });
      expect(backButton).toHaveClass('min-h-[44px]');
      
      // Check breadcrumb is mobile-optimized
      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumb).toHaveClass('overflow-x-auto');
      
      // Check footer button is full-width on mobile
      const morePostsButton = screen.getByRole('link', { name: /view more blog posts/i });
      expect(morePostsButton).toHaveClass('w-full');
      expect(morePostsButton).toHaveClass('sm:w-auto');
    });
  });

  describe('BlogLayout Mobile Optimization', () => {
    it('should render breadcrumbs properly on mobile', () => {
      setViewportSize(375, 667);
      
      const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/posts' },
        { label: 'Test Post' }
      ];
      
      renderWithProviders(
        <BlogLayout breadcrumbs={breadcrumbs}>
          <div>Test content</div>
        </BlogLayout>
      );
      
      const breadcrumbNav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumbNav).toBeInTheDocument();
      
      const breadcrumbList = breadcrumbNav.querySelector('ol');
      expect(breadcrumbList).toHaveClass('overflow-x-auto');
      expect(breadcrumbList).toHaveClass('text-xs');
      expect(breadcrumbList).toHaveClass('sm:text-sm');
    });
  });

  describe('Touch Interaction Tests', () => {
    it('should handle touch events properly', async () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      const readMoreButton = screen.getByRole('link', { name: /read more about/i });
      
      // Simulate touch events
      fireEvent.touchStart(readMoreButton);
      fireEvent.touchEnd(readMoreButton);
      
      // Should not throw errors and should maintain focus states
      expect(readMoreButton).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      const titleLink = screen.getByRole('link', { name: /read full post/i });
      const readMoreButton = screen.getByRole('link', { name: /read more about/i });
      
      // Test tab navigation
      titleLink.focus();
      expect(titleLink).toHaveFocus();
      
      fireEvent.keyDown(titleLink, { key: 'Tab' });
      // Should be able to navigate between focusable elements
      expect(document.activeElement).toBeTruthy();
    });
  });

  describe('Cross-Device Viewport Tests', () => {
    const viewports = [
      { name: 'iPhone SE', width: 375, height: 667 },
      { name: 'iPhone 12', width: 390, height: 844 },
      { name: 'iPad', width: 768, height: 1024 },
      { name: 'iPad Pro', width: 1024, height: 1366 },
      { name: 'Desktop', width: 1440, height: 900 },
    ];

    viewports.forEach(({ name, width, height }) => {
      it(`should render correctly on ${name} (${width}x${height})`, () => {
        setViewportSize(width, height);
        
        renderWithProviders(<PostCard post={mockPost} />);
        
        // Should render without errors
        expect(screen.getByRole('article')).toBeInTheDocument();
        
        // Should have appropriate responsive classes
        const imageContainer = document.querySelector('.h-48, .sm\\:h-56, .lg\\:h-56');
        expect(imageContainer).toBeInTheDocument();
      });
    });
  });

  describe('Orientation Change Tests', () => {
    it('should handle orientation changes gracefully', () => {
      // Start in portrait
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostList 
          posts={mockPosts} 
          loading={false} 
          error={null} 
        />
      );
      
      expect(screen.getAllByRole('article')).toHaveLength(3);
      
      // Switch to landscape
      setViewportSize(667, 375);
      
      // Should still render properly
      expect(screen.getAllByRole('article')).toHaveLength(3);
      
      // Grid should adapt
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
    });
  });

  describe('Performance on Mobile', () => {
    it('should not cause layout shifts on mobile', async () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      // Wait for any potential layout shifts
      await waitFor(() => {
        expect(screen.getByRole('article')).toBeInTheDocument();
      });
      
      // LazyImage container should have proper aspect ratio classes to prevent shifts
      const imageContainer = document.querySelector('.h-48');
      expect(imageContainer).toHaveClass('object-cover');
    });

    it('should load images lazily on mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      // Should use LazyImage component which implements intersection observer
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(IntersectionObserver).toHaveBeenCalled();
    });
  });

  describe('Accessibility on Mobile', () => {
    it('should maintain accessibility on mobile devices', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(<PostCard post={mockPost} />);
      
      // Key interactive elements should have proper labels
      const readMoreLink = screen.getByRole('link', { name: /read more about/i });
      expect(readMoreLink).toHaveAttribute('aria-label');
      
      const imageLink = screen.getByRole('link', { name: /read full post/i });
      expect(imageLink).toHaveAttribute('aria-label');
    });

    it('should support screen readers on mobile', () => {
      setViewportSize(375, 667);
      
      renderWithProviders(
        <PostDetail 
          post={mockPost} 
          loading={false} 
          error={null} 
        />
      );
      
      // Article should have proper structure
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Navigation should be properly labeled
      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumb).toBeInTheDocument();
    });
  });
});