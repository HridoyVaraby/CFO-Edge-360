import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../../components/blog/PostList';
import BlogLayout from '../../components/blog/BlogLayout';
import SEO from '../../components/blog/SEO';
import { Post, Category, PostsResponse } from '../../types/wordpress';
import { wordpressAPI } from '../../services/wordpress';


const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  });
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories for filters
        const categoriesData = await wordpressAPI.getCategories({ hide_empty: true });
        setCategories(categoriesData);

        // Build query parameters for posts
        const queryParams: any = {
          page: currentPage,
          per_page: 12,
          _embed: true
        };

        // Add category filter if selected
        if (currentCategory) {
          const category = categoriesData.find(cat => cat.slug === currentCategory);
          if (category) {
            queryParams.categories = [category.id];
          }
        }



        // Add search query if provided
        if (searchQuery) {
          queryParams.search = searchQuery;
        }

        const response: PostsResponse = await wordpressAPI.getPosts(queryParams);

        setPosts(response.posts);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalPosts: response.totalPosts
        });
      } catch (err) {
        console.error('Error loading posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, currentCategory, searchQuery]);

  // Manual retry function
  const handleRetry = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch categories for filters
      const categoriesData = await wordpressAPI.getCategories({ hide_empty: true });
      setCategories(categoriesData);

      // Build query parameters for posts
      const queryParams: any = {
        page: currentPage,
        per_page: 12,
        _embed: true
      };

      // Add category filter if selected
      if (currentCategory) {
        const category = categoriesData.find(cat => cat.slug === currentCategory);
        if (category) {
          queryParams.categories = [category.id];
        }
      }



      // Add search query if provided
      if (searchQuery) {
        queryParams.search = searchQuery;
      }

      const response: PostsResponse = await wordpressAPI.getPosts(queryParams);

      setPosts(response.posts);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalPosts: response.totalPosts
      });
    } catch (err) {
      console.error('Error retrying posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentCategory, searchQuery]);

  // Handle filter changes
  const handleCategoryChange = (categorySlug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug) {
      newParams.set('category', categorySlug);
    } else {
      newParams.delete('category');
    }
    newParams.delete('page'); // Reset to first page when filtering
    setSearchParams(newParams);
  };



  const handleSearchChange = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (query.trim()) {
      newParams.set('search', query.trim());
    } else {
      newParams.delete('search');
    }
    newParams.delete('page'); // Reset to first page when searching
    setSearchParams(newParams);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newParams.set('page', page.toString());
    } else {
      newParams.delete('page');
    }
    setSearchParams(newParams);
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Generate page title and description based on filters
  const getPageTitle = () => {
    let title = 'CFO Edge 360 Blog';
    if (currentCategory) {
      const category = categories.find(cat => cat.slug === currentCategory);
      if (category) {
        title = `${category.name} - ${title}`;
      }
    }

    if (searchQuery) {
      title = `Search: ${searchQuery} - ${title}`;
    }
    if (currentPage > 1) {
      title = `${title} - Page ${currentPage}`;
    }
    return title;
  };

  const getPageDescription = () => {
    let description = 'Insights, strategies, and expert advice to help you navigate your financial journey';
    if (currentCategory) {
      const category = categories.find(cat => cat.slug === currentCategory);
      if (category && category.description) {
        description = category.description;
      }
    }
    if (searchQuery) {
      description = `Search results for "${searchQuery}" - ${description}`;
    }
    return description;
  };

  // Generate canonical URL for the current page
  const getCanonicalUrl = () => {
    const baseUrl = `${window.location.origin}/posts`;
    const params = new URLSearchParams();
    
    if (currentCategory) params.set('category', currentCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  return (
    <>
      {/* SEO Component for Blog List */}
      <SEO
        title={getPageTitle()}
        description={getPageDescription()}
        canonical={getCanonicalUrl()}
        type="website"
        keywords="CFO services, financial consulting, business finance, financial strategy, cash flow management"
      />
      
      <BlogLayout
        title={getPageTitle()}
        description={getPageDescription()}
        canonical={getCanonicalUrl()}
      >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white font-serif leading-tight">
              {currentCategory && categories.find(cat => cat.slug === currentCategory)?.name
                ? `${categories.find(cat => cat.slug === currentCategory)?.name} Insights`
                : searchQuery
                ? `Search Results`
                : 'Financial Insights & Expertise'}
            </h1>
            <p className="mx-auto mb-6 sm:mb-8 max-w-3xl text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4 sm:px-0">
              {searchQuery 
                ? `Showing results for "${searchQuery}"`
                : 'Strategic financial guidance and expert insights to help your business thrive in today\'s competitive landscape'}
            </p>
            <div className="mx-auto w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* Modern Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-end">
            {/* Search Bar */}
            <div className="flex-1">
              <label htmlFor="search-input" className="block text-sm font-semibold text-gray-700 mb-2">
                Search Articles
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search articles..."
                  defaultValue={searchQuery || ''}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchChange(e.currentTarget.value);
                    }
                  }}
                  onBlur={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <label htmlFor="category-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category-filter"
                value={currentCategory || ''}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-lg"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(currentCategory || searchQuery) && (
              <div className="lg:w-auto">
                <button
                  onClick={clearFilters}
                  className="w-full lg:w-auto px-6 py-4 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-gray-600">
              {pagination.totalPosts > 0 ? (
                <>
                  Showing <span className="font-semibold text-gray-900">{((pagination.currentPage - 1) * 12) + 1}</span> to{' '}
                  <span className="font-semibold text-gray-900">{Math.min(pagination.currentPage * 12, pagination.totalPosts)}</span> of{' '}
                  <span className="font-semibold text-gray-900">{pagination.totalPosts}</span> articles
                </>
              ) : (
                'No articles found'
              )}
            </div>
            {pagination.totalPages > 1 && (
              <div className="text-sm text-gray-500">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>
            )}
          </div>
        )}
        
        {/* Post List */}
        <PostList 
          posts={posts} 
          loading={loading} 
          error={error}
          onRetry={handleRetry}
          isRetrying={false}
          retryCount={0}
          maxRetries={3}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </BlogLayout>
    </>
  );
};

export default PostListPage;