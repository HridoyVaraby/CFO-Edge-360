import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import PostCard from '../PostCard';
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

describe('PostCard', () => {
  const renderPostCard = (post: Post, className?: string) => {
    return render(
      <RouterWrapper>
        <PostCard post={post} className={className} />
      </RouterWrapper>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render post card with all basic elements', () => {
      renderPostCard(mockPost);

      // Check title
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
      
      // Check excerpt
      expect(screen.getByText('This is a test excerpt.')).toBeInTheDocument();
      
      // Check author name
      expect(screen.getByText('Test Author')).toBeInTheDocument();
      
      // Check date
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
      
      // Check read more link
      expect(screen.getByText('Read More')).toBeInTheDocument();
    });

    it('should render featured image when available', () => {
      renderPostCard(mockPost);

      const image = screen.getByAltText('Test image alt text');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockMedia.source_url);
      expect(image).toHaveAttribute('loading', 'lazy');
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

      renderPostCard(postWithoutImage);

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('should render without author when not available', () => {
      const postWithoutAuthor: Post = {
        ...mockPost,
        _embedded: {
          ...mockPost._embedded,
          author: undefined,
        },
      };

      renderPostCard(postWithoutAuthor);

      expect(screen.queryByText('Test Author')).not.toBeInTheDocument();
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('should render without excerpt when not available', () => {
      const postWithoutExcerpt: Post = {
        ...mockPost,
        excerpt: { rendered: '' },
      };

      renderPostCard(postWithoutExcerpt);

      expect(screen.queryByText('This is a test excerpt.')).not.toBeInTheDocument();
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderPostCard(mockPost, 'custom-class');
      
      const article = container.querySelector('article');
      expect(article).toHaveClass('custom-class');
    });
  });

  describe('Content Processing', () => {
    it('should clean HTML from excerpt', () => {
      const postWithHtmlExcerpt: Post = {
        ...mockPost,
        excerpt: {
          rendered: '<p>This is a <strong>test</strong> excerpt with <a href="#">HTML</a>.</p>',
        },
      };

      renderPostCard(postWithHtmlExcerpt);

      expect(screen.getByText('This is a test excerpt with HTML.')).toBeInTheDocument();
    });

    it('should render HTML in title using dangerouslySetInnerHTML', () => {
      const postWithHtmlTitle: Post = {
        ...mockPost,
        title: {
          rendered: 'Test <em>Blog</em> Post',
        },
      };

      renderPostCard(postWithHtmlTitle);

      const titleLink = screen.getByRole('link', { name: /test blog post/i });
      expect(titleLink.innerHTML).toContain('<em>Blog</em>');
    });

    it('should format date correctly', () => {
      const postWithDifferentDate: Post = {
        ...mockPost,
        date: '2024-12-25T15:30:00',
      };

      renderPostCard(postWithDifferentDate);

      expect(screen.getByText('December 25, 2024')).toBeInTheDocument();
    });

    it('should use featured media alt text or post title as image alt', () => {
      renderPostCard(mockPost);

      const image = screen.getByAltText('Test image alt text');
      expect(image).toBeInTheDocument();

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
          <PostCard post={postWithoutAltText} />
        </RouterWrapper>
      );

      rerender(
        <RouterWrapper>
          <PostCard post={postWithoutAltText} />
        </RouterWrapper>
      );

      const imageWithoutAlt = screen.getByAltText('Test Blog Post');
      expect(imageWithoutAlt).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should have correct links to post detail page', () => {
      renderPostCard(mockPost);

      const titleLink = screen.getByRole('link', { name: /test blog post/i });
      expect(titleLink).toHaveAttribute('href', '/post/test-blog-post');

      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toHaveAttribute('href', '/post/test-blog-post');

      // Check that all links point to the correct post
      const allLinks = screen.getAllByRole('link');
      allLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/post/test-blog-post');
      });
    });

    it('should have proper time element with datetime attribute', () => {
      renderPostCard(mockPost);

      const timeElement = screen.getByText('January 1, 2024').closest('time');
      expect(timeElement).toHaveAttribute('datetime', '2024-01-01T10:00:00');
    });
  });

  describe('Interactions', () => {
    it('should handle hover effects on card', () => {
      const { container } = renderPostCard(mockPost);
      
      const article = container.querySelector('article');
      expect(article).toHaveClass('group');
      expect(article).toHaveClass('hover:shadow-xl');
      expect(article).toHaveClass('hover:-translate-y-1');
    });

    it('should handle hover effects on title link', () => {
      renderPostCard(mockPost);

      const titleLink = screen.getByRole('link', { name: /test blog post/i });
      expect(titleLink).toHaveClass('hover:text-amber-600');
    });

    it('should handle hover effects on read more button', () => {
      renderPostCard(mockPost);

      const readMoreLink = screen.getByRole('link', { name: /read more/i });
      expect(readMoreLink).toHaveClass('hover:text-amber-600');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      renderPostCard(mockPost);

      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('should have proper link accessibility', () => {
      renderPostCard(mockPost);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });

    it('should have proper image accessibility', () => {
      renderPostCard(mockPost);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive classes for different screen sizes', () => {
      const { container } = renderPostCard(mockPost);

      const article = container.querySelector('article');
      expect(article).toHaveClass('rounded-xl');
      expect(article).toHaveClass('shadow-lg');

      // Check for responsive image classes
      const image = screen.getByRole('img');
      expect(image).toHaveClass('h-48');
      expect(image).toHaveClass('sm:h-56');

      // Check for responsive text classes
      const titleLink = screen.getByRole('link', { name: /test blog post/i });
      expect(titleLink).toHaveClass('text-xl');
      expect(titleLink).toHaveClass('sm:text-2xl');
    });
  });

  describe('Animation Classes', () => {
    it('should have animation classes applied', () => {
      const { container } = renderPostCard(mockPost);

      const article = container.querySelector('article');
      expect(article).toHaveClass('animate-fade-in');
      expect(article).toHaveClass('transition-all');
      expect(article).toHaveClass('duration-300');
    });
  });

  describe('Edge Cases', () => {
    it('should handle post with minimal data', () => {
      const minimalPost: Post = {
        id: 1,
        title: { rendered: 'Minimal Post' },
        content: { rendered: '' },
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

      renderPostCard(minimalPost);

      expect(screen.getByText('Minimal Post')).toBeInTheDocument();
      expect(screen.getByText('Read More')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('should handle very long titles gracefully', () => {
      const postWithLongTitle: Post = {
        ...mockPost,
        title: {
          rendered: 'This is a very long title that should be truncated properly when displayed in the post card component to maintain good visual hierarchy and readability',
        },
      };

      renderPostCard(postWithLongTitle);

      const titleLink = screen.getByRole('link', { name: /this is a very long title/i });
      expect(titleLink).toHaveClass('line-clamp-2');
    });

    it('should handle very long excerpts gracefully', () => {
      const postWithLongExcerpt: Post = {
        ...mockPost,
        excerpt: {
          rendered: 'This is a very long excerpt that should be truncated properly when displayed in the post card component to maintain good visual hierarchy and readability across different screen sizes and devices.',
        },
      };

      renderPostCard(postWithLongExcerpt);

      const excerpt = screen.getByText(/this is a very long excerpt/i);
      expect(excerpt).toHaveClass('line-clamp-3');
    });
  });
});