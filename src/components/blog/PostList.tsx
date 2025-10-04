import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '../../types/wordpress';
import PostCard from './PostCard';
import { PostCardSkeleton } from './SkeletonLoaders';
import ErrorDisplay from './ErrorDisplay';

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onLoadMore?: () => void;
  onRetry?: () => void;
  hasMore?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
  isRetrying?: boolean;
  retryCount?: number;
  maxRetries?: number;
}





// Pagination component
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1 sm:gap-2 mt-8 sm:mt-12 px-4" aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers - Responsive display */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 sm:px-3 py-2 text-sm text-gray-500 flex-shrink-0">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-2.5 sm:px-3 py-2.5 sm:py-2 text-sm font-medium rounded-lg transition-colors duration-200 min-h-[44px] sm:min-h-[auto] flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  currentPage === page
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:bg-gray-50'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1 px-3 sm:px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 focus:bg-gray-50 focus:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        aria-label="Go to next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  error,
  onLoadMore,
  onRetry,
  hasMore = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = '',
  isRetrying = false,
  retryCount = 0,
  maxRetries = 3
}) => {
  // Show error state
  if (error && !loading) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <ErrorDisplay 
          error={error} 
          onRetry={onRetry}
          isRetrying={isRetrying}
          retryCount={retryCount}
          maxRetries={maxRetries}
          showBackButton={false}
          showHomeButton={true}
          size="medium"
          variant="card"
        />
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Posts Grid - Optimized for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Render actual posts */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Render skeleton loaders while loading */}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <PostCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
            <p className="text-gray-600">
              There are no blog posts available at the moment. Please check back later.
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && posts.length > 0 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* Load More Button (alternative to pagination) */}
      {!loading && !error && posts.length > 0 && hasMore && onLoadMore && !onPageChange && (
        <div className="text-center mt-8 sm:mt-12 px-4">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 focus:bg-amber-600 transition-colors duration-200 shadow-lg hover:shadow-xl focus:shadow-xl transform hover:-translate-y-1 focus:-translate-y-1 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 w-full sm:w-auto"
            aria-label="Load more blog posts"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;