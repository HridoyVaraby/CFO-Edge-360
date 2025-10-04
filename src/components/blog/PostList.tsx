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





// Modern Pagination component
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-4">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-sm text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                    currentPage === page
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
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
          className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
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
    <div className={className}>
      {/* Posts Grid - Modern responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {/* Render actual posts */}
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}

        {/* Render skeleton loaders while loading */}
        {loading && (
          <>
            {Array.from({ length: 12 }).map((_, index) => (
              <PostCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3">No Articles Found</h3>
            <p className="text-gray-600 leading-relaxed">
              We couldn't find any articles matching your criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        </div>
      )}

      {/* Modern Pagination */}
      {!loading && !error && posts.length > 0 && onPageChange && (
        <div className="mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* Load More Button (alternative to pagination) */}
      {!loading && !error && posts.length > 0 && hasMore && onLoadMore && !onPageChange && (
        <div className="text-center mt-16">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 no-underline"
            aria-label="Load more blog posts"
          >
            <span className="text-white">Load More Articles</span>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;