import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import PostDetail from '../PostDetail';
import { mockPost, mockAuthor, mockMedia } from '../../../test/mocks/wordpress-data';
import { Post } from '../../../types/wordpress';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Wrapper component for router context
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('PostDetail', () => {
  const defaultProps = {
    post: mockPost,
    loading: false,
    error: null,
  };

  const renderPostDetail = (props = {}) => {
    return render(
      <RouterWrapper>
        <PostDetail {...defaultProps} {...props} />
      </RouterWrapper>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render post detail with all elements when post is provided', () => {
      renderPostDetail();

      // Check title
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Blog Post');
      
      // Check content
      expect(screen.getByText('This is a test blog post content.')).toBeInTheDocument();
      
      // Check author (appears in meta section)
      const authorElements = screen.getAllByText('Test Author');
      expect(authorElements.length).toBeGreaterThan(0);
      
      // Check date
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
      
      // Check reading time
      expect(screen.getByText(/min read/)).toBeInTheDocument();
    });

    it('should render featured image when available', () => {
      renderPostDetail();

      const featuredImage = screen.getByAltText('Test image alt text');
      expect(featuredImage).toHaveAttribute('src', mockMedia.source_url);
      expect(featuredImage).toHaveAttribute('alt', mockMedia.alt_text);
    });

    it('should render without featured image when not available', () => {
      const postWithoutImage: Post = {
        ...mockPost,
        featured_media: 0,
        _embedded: {
          ...mockPost._embedded,
          'wp:featuredmedia': undefined,
        },
      };

      renderPostDetail({ post: postWithoutImage });

      // Should not have the featured image (but may still have author avatar)
      const featuredImage = screen.queryByAltText('Test image alt text');
      expect(featuredImage).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderPostDetail({ className: 'custom-class' });
      
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });
  });

  describe('Loading States', () => {
    it('should show skeleton loader when loading', () => {
      renderPostDetail({ loading: true, post: null });

      // Check for skeleton loader elements
      const skeletonElements = document.querySelectorAll('.animate-pulse');
      expect(skeletonElements.length).toBeGreaterThan(0);

      // Should not show actual content
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });

    it('should not show skeleton loader when not loading', () => {
      renderPostDetail({ loading: false });

      const skeletonElements = document.querySelectorAll('.animate-pulse');
      expect(skeletonElements.length).toBe(0);
    });
  });

  describe('Error States', () => {
    it('should show error message when error exists', () => {
      const errorMessage = 'Failed to load post';
      renderPostDetail({ 
        error: errorMessage, 
        loading: false, 
        post: null 
      });

      expect(screen.getByText('Unable to Load Post')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should show error message when post is null', () => {
      renderPostDetail({ 
        error: null, 
        loading: false, 
        post: null 
      });

      expect(screen.getByText('Unable to Load Post')).toBeInTheDocument();
      expect(screen.getByText('Post not found')).toBeInTheDocument();
    });

    it('should show retry button when error exists and onRetry is provided', () => {
      const onRetry = vi.fn();
      renderPostDetail({ 
        error: 'Network error', 
        loading: false, 
        post: null,
        onRetry 
      });

      const retryButton = screen.getByRole('button', { name: /try again/i });
      expect(retryButton).toBeInTheDocument();

      fireEvent.click(retryButton);
      expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('should not show retry button when onRetry is not provided', () => {
      renderPostDetail({ 
        error: 'Network error', 
        loading: false, 
        post: null 
      });

      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });

    it('should always show back to posts link in error state', () => {
      renderPostDetail({ 
        error: 'Network error', 
        loading: false, 
        post: null 
      });

      const backLink = screen.getByRole('link', { name: /back to posts/i });
      expect(backLink).toHaveAttribute('href', '/posts');
    });
  });

  describe('Content Rendering', () => {
    it('should render HTML content using dangerouslySetInnerHTML', () => {
      const postWithHtmlContent: Post = {
        ...mockPost,
        content: {
          rendered: '<p>This is <strong>bold</strong> text with <a href="#">a link</a>.</p>',
        },
      };

      renderPostDetail({ post: postWithHtmlContent });

      const content = screen.getByText('bold').closest('div');
      expect(content?.innerHTML).toContain('<strong>bold</strong>');
      expect(content?.innerHTML).toContain('<a href="#">a link</a>');
    });

    it('should render HTML title using dangerouslySetInnerHTML', () => {
      const postWithHtmlTitle: Post = {
        ...mockPost,
        title: {
          rendered: 'Test <em>Blog</em> Post',
        },
      };

      renderPostDetail({ post: postWithHtmlTitle });

      const title = screen.getByRole('heading', { level: 1 });
      expect(title.innerHTML).toContain('<em>Blog</em>');
    });

    it('should calculate and display reading time', () => {
      const postWithLongContent: Post = {
        ...mockPost,
        content: {
          rendered: '<p>' + 'word '.repeat(400) + '</p>', // ~400 words = 2 min read
        },
      };

      renderPostDetail({ post: postWithLongContent });

      // Should show reading time (may be 1 min due to calculation)
      expect(screen.getByText(/\d+ min read/)).toBeInTheDocument();
    });

    it('should format date correctly', () => {
      const postWithDifferentDate: Post = {
        ...mockPost,
        date: '2024-12-25T15:30:00',
      };

      renderPostDetail({ post: postWithDifferentDate });

      expect(screen.getByText('December 25, 2024')).toBeInTheDocument();
    });

    it('should use featured media alt text or post title as image alt', () => {
      renderPostDetail();

      const featuredImage = screen.getByAltText('Test image alt text');
      expect(featuredImage).toHaveAttribute('alt', mockMedia.alt_text);

      // Test with missing alt text
      const postWithoutAltText: Post = {
        ...mockPost,
        _embedded: {
          ...mockPost._embedded,
          'wp:featuredmedia': [{
            ...mockMedia,
            alt_text: '',
          }],
        },
      };

      const { rerender } = render(
        <RouterWrapper>
          <PostDetail post={postWithoutAltText} loading={false} error={null} />
        </RouterWrapper>
      );

      rerender(
        <RouterWrapper>
          <PostDetail post={postWithoutAltText} loading={false} error={null} />
        </RouterWrapper>
      );

      const imageWithoutAlt = screen.getByAltText('Test Blog Post');
      expect(imageWithoutAlt).toHaveAttribute('alt', 'Test Blog Post');
    });
  });

  describe('Navigation', () => {
    it('should render breadcrumb navigation', () => {
      renderPostDetail();

      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumb).toBeInTheDocument();

      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/posts');
      // Check breadcrumb specifically (not the title)
      const breadcrumbTitle = screen.getByTitle('Test Blog Post');
      expect(breadcrumbTitle).toBeInTheDocument();
    });

    it('should render back to posts button at top', () => {
      renderPostDetail();

      const backButtons = screen.getAllByRole('link', { name: /back to posts/i });
      expect(backButtons.length).toBeGreaterThan(0);
      
      backButtons.forEach(button => {
        expect(button).toHaveAttribute('href', '/posts');
      });
    });

    it('should render more posts button at bottom', () => {
      renderPostDetail();

      const morePostsButton = screen.getByRole('link', { name: /more posts/i });
      expect(morePostsButton).toHaveAttribute('href', '/posts');
    });

    it('should have proper time element with datetime attribute', () => {
      renderPostDetail();

      const timeElement = screen.getByText('January 1, 2024').closest('time');
      expect(timeElement).toHaveAttribute('datetime', '2024-01-01T10:00:00');
    });
  });

  describe('Meta Information', () => {
    it('should display author information when available', () => {
      renderPostDetail();

      // Use getAllByText since "Test Author" appears multiple times (in meta and footer)
      const authorElements = screen.getAllByText('Test Author');
      expect(authorElements.length).toBeGreaterThan(0);
    });

    it('should display author avatar when available', () => {
      renderPostDetail();

      const avatar = screen.getByAltText('Test Author');
      expect(avatar).toHaveAttribute('src', mockAuthor.avatar_urls['48']);
    });

    it('should not display author section when author is not available', () => {
      const postWithoutAuthor: Post = {
        ...mockPost,
        _embedded: {
          ...mockPost._embedded,
          author: undefined,
        },
      };

      renderPostDetail({ post: postWithoutAuthor });

      expect(screen.queryByText('Test Author')).not.toBeInTheDocument();
    });

    it('should display categories when available', () => {
      renderPostDetail();

      expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    it('should display tags when available', () => {
      renderPostDetail();

      expect(screen.getByText('Test Tag')).toBeInTheDocument();
    });

    it('should not display categories/tags section when none available', () => {
      const postWithoutTerms: Post = {
        ...mockPost,
        _embedded: {
          ...mockPost._embedded,
          'wp:term': undefined,
        },
      };

      renderPostDetail({ post: postWithoutTerms });

      expect(screen.queryByText('Test Category')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Tag')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      renderPostDetail();

      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();

      const nav = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(nav).toBeInTheDocument();
    });

    it('should have proper link accessibility', () => {
      renderPostDetail();

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have proper image accessibility', () => {
      renderPostDetail();

      const images = screen.getAllByRole('img');
      images.forEach(image => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).toBeTruthy();
      });
    });

    it('should have proper time element accessibility', () => {
      renderPostDetail();

      const timeElement = screen.getByText('January 1, 2024').closest('time');
      expect(timeElement).toHaveAttribute('datetime');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive classes for different screen sizes', () => {
      const { container } = renderPostDetail();

      // Check container classes
      const wrapper = container.querySelector('.max-w-4xl');
      expect(wrapper).toBeInTheDocument();

      // Check responsive image classes - get the featured image specifically
      const images = screen.getAllByRole('img');
      const featuredImage = images.find(img => img.getAttribute('alt') === 'Test image alt text');
      expect(featuredImage).toHaveClass('h-64');
      expect(featuredImage).toHaveClass('sm:h-80');
      expect(featuredImage).toHaveClass('lg:h-96');

      // Check responsive text classes
      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('text-3xl');
      expect(title).toHaveClass('sm:text-4xl');
      expect(title).toHaveClass('lg:text-5xl');
    });

    it('should have responsive padding classes', () => {
      const { container } = renderPostDetail();

      const contentWrapper = container.querySelector('.p-6');
      expect(contentWrapper).toHaveClass('sm:p-8');
      expect(contentWrapper).toHaveClass('lg:p-12');
    });
  });

  describe('Animation Classes', () => {
    it('should have animation classes applied', () => {
      const { container } = renderPostDetail();

      const article = container.querySelector('article');
      expect(article).toHaveClass('animate-fade-in');
    });

    it('should have hover animation classes on buttons', () => {
      renderPostDetail();

      const backButton = screen.getAllByRole('link', { name: /back to posts/i })[0];
      expect(backButton).toHaveClass('group');
    });
  });

  describe('Styling and Design', () => {
    it('should have proper typography classes', () => {
      renderPostDetail();

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('font-bold');
      expect(title).toHaveClass('font-serif');
      expect(title).toHaveClass('text-black');
    });

    it('should have proper prose classes for content', () => {
      const { container } = renderPostDetail();

      const contentDiv = container.querySelector('.prose');
      expect(contentDiv).toHaveClass('prose-lg');
      expect(contentDiv).toHaveClass('max-w-none');
    });

    it('should have proper card styling', () => {
      const { container } = renderPostDetail();

      const article = container.querySelector('article');
      expect(article).toHaveClass('bg-white');
      expect(article).toHaveClass('rounded-xl');
      expect(article).toHaveClass('shadow-lg');
    });
  });

  describe('Edge Cases', () => {
    it('should handle post with minimal data', () => {
      const minimalPost: Post = {
        id: 1,
        title: { rendered: 'Minimal Post' },
        content: { rendered: '<p>Minimal content</p>' },
        excerpt: { rendered: '' },
        slug: 'minimal-post',
        date: '2024-01-01T10:00:00',
        modified: '2024-01-01T10:00:00',
        author: 1,
        featured_media: 0,
        categories: [],
        tags: [],
        link: 'https://cms.cfoedge360.com/minimal-post',
        status: 'publish',
        type: 'post',
      };

      renderPostDetail({ post: minimalPost });

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Minimal Post');
      expect(screen.getByText('Minimal content')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('should handle very long titles gracefully', () => {
      const postWithLongTitle: Post = {
        ...mockPost,
        title: {
          rendered: 'This is a very long title that should be displayed properly without breaking the layout or causing any visual issues in the post detail component',
        },
      };

      renderPostDetail({ post: postWithLongTitle });

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveClass('leading-tight');
    });

    it('should handle empty content gracefully', () => {
      const postWithEmptyContent: Post = {
        ...mockPost,
        content: { rendered: '' },
      };

      renderPostDetail({ post: postWithEmptyContent });

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      // Content div should still exist even if empty
      const contentDiv = document.querySelector('.prose');
      expect(contentDiv).toBeInTheDocument();
    });

    it('should calculate reading time for very short content', () => {
      const postWithShortContent: Post = {
        ...mockPost,
        content: {
          rendered: '<p>Short content.</p>',
        },
      };

      renderPostDetail({ post: postWithShortContent });

      expect(screen.getByText('1 min read')).toBeInTheDocument();
    });

    it('should handle missing embedded data gracefully', () => {
      const postWithoutEmbedded: Post = {
        ...mockPost,
        _embedded: undefined,
      };

      renderPostDetail({ post: postWithoutEmbedded });

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Author')).not.toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render large content efficiently', () => {
      const postWithLargeContent: Post = {
        ...mockPost,
        content: {
          rendered: '<p>' + 'Lorem ipsum dolor sit amet. '.repeat(1000) + '</p>',
        },
      };

      const startTime = performance.now();
      renderPostDetail({ post: postWithLargeContent });
      const endTime = performance.now();

      // Should render within reasonable time (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });
});