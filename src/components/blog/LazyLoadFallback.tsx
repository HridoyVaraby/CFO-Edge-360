import React from 'react';

interface LazyLoadFallbackProps {
  error?: Error;
  retry?: () => void;
  pastDelay?: boolean;
  timedOut?: boolean;
}

const LazyLoadFallback: React.FC<LazyLoadFallbackProps> = ({ 
  error, 
  retry, 
  pastDelay = true 
}) => {
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load page
          </h2>
          <p className="text-gray-600 mb-4">
            Something went wrong while loading this page.
          </p>
          {retry && (
            <button
              onClick={retry}
              className="inline-flex items-center px-4 py-2 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors duration-200"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!pastDelay) {
    return null; // Don't show loading immediately
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Loading spinner */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
        
        {/* Loading text */}
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">
          Please wait while we load the page
        </p>
        
        {/* Loading skeleton for blog content */}
        <div className="mt-8 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            {/* Title skeleton */}
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            
            {/* Content skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
            </div>
            
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            
            {/* More content skeleton */}
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazyLoadFallback;