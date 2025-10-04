import React from 'react';
import { RefreshCw, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Post } from '../../types/wordpress';
import PostCard from './PostCard';

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
}

// Skeleton loader component for individual post cards
const PostCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
    {/* Image skeleton */}
    <div className="w-full h-48 sm:h-56 bg-gray-200"></div>
    
    {/* Content skeleton */}
    <div className="p-6">
      {/* Title skeleton */}
      <div className="mb-3">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      {/* Excerpt skeleton */}
      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      
      {/* Meta skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

// Error component
const ErrorDisplay: React.FC<{ error: string; onRetry?: () => void }> = ({ error, onRetry }) => (
  <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center animate-fade-in">
    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Posts</h3>
    <p className="text-gray-600 mb-6">{error}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors duration-200"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    )}
  </div>
);

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
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-sm text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
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
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Next
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
  className = ''
}) => {
  // Show error state
  if (error && !loading) {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <ErrorDisplay error={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
        <div className="text-center mt-12">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;