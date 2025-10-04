import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { vi } from 'vitest';
import PostListPage from '../PostListPage';
import { wordpressAPI } from '../../../services/wordpress';
import { mockPosts } from '../../../test/mocks/wordpress-data';

// Mock the WordPress API
vi.mock('../../../services/wordpress', () => ({
  wordpressAPI: {
    getPosts: vi.fn(),
    getCategories: vi.fn(),
    getTags: vi.fn(),
  },
}));

const mockWordpressAPI = wordpressAPI as any;

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('PostListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock categories and tags API calls
    mockWordpressAPI.getCategories.mockResolvedValue([]);
    mockWordpressAPI.getTags.mockResolvedValue([]);
  });

  it('should render page title and description', async () => {
    mockWordpressAPI.getPosts.mockResolvedValue({
      posts: mockPosts,
      totalPages: 1,
      totalPosts: mockPosts.length,
      currentPage: 1,
    });

    renderWithRouter(<PostListPage />);

    expect(screen.getByText('CFO Edge 360 Blog')).toBeInTheDocument();
    expect(screen.getByText(/Insights, strategies, and expert advice/)).toBeInTheDocument();
  });

  it('should fetch and display posts on mount', async () => {
    mockWordpressAPI.getPosts.mockResolvedValue({
      posts: mockPosts,
      totalPages: 1,
      totalPosts: mockPosts.length,
      currentPage: 1,
    });

    renderWithRouter(<PostListPage />);

    await waitFor(() => {
      expect(mockWordpressAPI.getCategories).toHaveBeenCalledWith({ hide_empty: true });
      expect(mockWordpressAPI.getTags).toHaveBeenCalledWith({ hide_empty: true });
      expect(mockWordpressAPI.getPosts).toHaveBeenCalledWith({
        page: 1,
        per_page: 10,
        _embed: true,
      });
    });

    // Wait for posts to be displayed
    await waitFor(() => {
      expect(screen.getByText(mockPosts[0].title.rendered)).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to fetch posts';
    mockWordpressAPI.getPosts.mockRejectedValue(new Error(errorMessage));

    renderWithRouter(<PostListPage />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should show loading state initially', () => {
    mockWordpressAPI.getPosts.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithRouter(<PostListPage />);

    // Check for skeleton loaders instead of text
    const skeletonCards = screen.getAllByRole('generic').filter(el => 
      el.className.includes('animate-pulse')
    );
    expect(skeletonCards.length).toBeGreaterThan(0);
  });
});