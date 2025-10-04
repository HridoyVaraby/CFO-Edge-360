import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../../components/blog/PostList';
import BlogLayout from '../../components/blog/BlogLayout';
import { Post, Category, Tag, PostsResponse } from '../../types/wordpress';
import { wordpressAPI } from '../../services/wordpress';

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  });
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentCategory = searchParams.get('category');
  const currentTag = searchParams.get('tag');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories and tags for filters
        const [categoriesData, tagsData] = await Promise.all([
          wordpressAPI.getCategories({ hide_empty: true }),
          wordpressAPI.getTags({ hide_empty: true })
        ]);
        
        setCategories(categoriesData);
        setTags(tagsData);

        // Build query parameters for posts
        const queryParams: any = {
          page: currentPage,
          per_page: 10,
          _embed: true
        };

        // Add category filter if selected
        if (currentCategory) {
          const category = categoriesData.find(cat => cat.slug === currentCategory);
          if (category) {
            queryParams.categories = [category.id];
          }
        }

        // Add tag filter if selected
        if (currentTag) {
          const tag = tagsData.find(t => t.slug === currentTag);
          if (tag) {
            queryParams.tags = [tag.id];
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

    fetchData();
  }, [searchParams, currentPage, currentCategory, currentTag, searchQuery]);

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

  const handleTagChange = (tagSlug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (tagSlug) {
      newParams.set('tag', tagSlug);
    } else {
      newParams.delete('tag');
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
    if (currentTag) {
      const tag = tags.find(t => t.slug === currentTag);
      if (tag) {
        title = `${tag.name} - ${title}`;
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

  return (
    <BlogLayout
      title={getPageTitle()}
      description={getPageDescription()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentCategory && categories.find(cat => cat.slug === currentCategory)?.name
              ? `${categories.find(cat => cat.slug === currentCategory)?.name} Posts`
              : currentTag && tags.find(t => t.slug === currentTag)?.name
              ? `Posts tagged "${tags.find(t => t.slug === currentTag)?.name}"`
              : searchQuery
              ? `Search Results for "${searchQuery}"`
              : 'CFO Edge 360 Blog'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getPageDescription()}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search posts..."
                defaultValue={searchQuery || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchChange(e.currentTarget.value);
                  }
                }}
                onBlur={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            
            {/* Clear filters button */}
            {(currentCategory || currentTag || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Category and Tag filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category filter */}
            <div className="flex-1">
              <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category-filter"
                value={currentCategory || ''}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Tag filter */}
            <div className="flex-1">
              <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Tag
              </label>
              <select
                id="tag-filter"
                value={currentTag || ''}
                onChange={(e) => handleTagChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.slug}>
                    {tag.name} ({tag.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mb-6 text-sm text-gray-600">
            {pagination.totalPosts > 0 ? (
              <>
                Showing {((pagination.currentPage - 1) * 10) + 1} to{' '}
                {Math.min(pagination.currentPage * 10, pagination.totalPosts)} of{' '}
                {pagination.totalPosts} posts
              </>
            ) : (
              'No posts found'
            )}
          </div>
        )}
        
        {/* Post List */}
        <PostList 
          posts={posts} 
          loading={loading} 
          error={error} 
        />

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage <= 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      pageNum === pagination.currentPage
                        ? 'bg-yellow-500 text-white'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage >= pagination.totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default PostListPage;