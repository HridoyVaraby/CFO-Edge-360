import React from 'react';

// Base skeleton component with shimmer animation
const SkeletonBase: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-200 animate-pulse relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
  </div>
);

// Skeleton loader for PostCard components
export const PostCardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 animate-fade-in ${className}`}>
    {/* Featured image skeleton */}
    <SkeletonBase className="w-full h-48 sm:h-56 rounded-none" />
    
    {/* Content skeleton */}
    <div className="p-6">
      {/* Title skeleton */}
      <div className="mb-3">
        <SkeletonBase className="h-6 rounded mb-2" />
        <SkeletonBase className="h-6 rounded w-3/4" />
      </div>
      
      {/* Excerpt skeleton */}
      <div className="mb-4 space-y-2">
        <SkeletonBase className="h-4 rounded" />
        <SkeletonBase className="h-4 rounded" />
        <SkeletonBase className="h-4 rounded w-2/3" />
      </div>
      
      {/* Meta information skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-4 w-4 rounded" />
          <SkeletonBase className="h-4 w-20 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-4 w-4 rounded" />
          <SkeletonBase className="h-4 w-24 rounded" />
        </div>
      </div>
      
      {/* Read more button skeleton */}
      <div className="flex items-center gap-2">
        <SkeletonBase className="h-4 w-20 rounded" />
        <SkeletonBase className="h-4 w-4 rounded" />
      </div>
    </div>
  </div>
);

// Skeleton loader for PostDetail page
export const PostDetailSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-4xl mx-auto">
      {/* Back button skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-4 w-4 rounded" />
          <SkeletonBase className="h-4 w-24 rounded" />
        </div>
      </div>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
        {/* Featured image skeleton */}
        <SkeletonBase className="w-full h-64 sm:h-80 lg:h-96 rounded-none" />
        
        {/* Content skeleton */}
        <div className="p-6 sm:p-8 lg:p-12">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <SkeletonBase className="h-4 w-12 rounded" />
            <span className="text-gray-300">/</span>
            <SkeletonBase className="h-4 w-8 rounded" />
            <span className="text-gray-300">/</span>
            <SkeletonBase className="h-4 w-32 rounded" />
          </div>
          
          {/* Title skeleton */}
          <div className="mb-6 space-y-3">
            <SkeletonBase className="h-8 sm:h-10 lg:h-12 rounded" />
            <SkeletonBase className="h-8 sm:h-10 lg:h-12 rounded w-3/4" />
          </div>
          
          {/* Meta information skeleton */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <SkeletonBase className="h-4 w-4 rounded" />
              <SkeletonBase className="h-4 w-24 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBase className="h-4 w-4 rounded" />
              <SkeletonBase className="h-4 w-32 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBase className="h-4 w-4 rounded" />
              <SkeletonBase className="h-4 w-20 rounded" />
            </div>
          </div>

          {/* Categories and tags skeleton */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <SkeletonBase className="h-4 w-4 rounded" />
              <div className="flex gap-2">
                <SkeletonBase className="h-6 w-16 rounded-full" />
                <SkeletonBase className="h-6 w-20 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBase className="h-4 w-4 rounded" />
              <div className="flex gap-2">
                <SkeletonBase className="h-6 w-12 rounded-full" />
                <SkeletonBase className="h-6 w-18 rounded-full" />
                <SkeletonBase className="h-6 w-14 rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-4 mb-12">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonBase 
                key={index} 
                className={`h-4 rounded ${
                  index % 4 === 3 ? 'w-2/3' : index % 7 === 0 ? 'w-5/6' : ''
                }`} 
              />
            ))}
            
            {/* Paragraph breaks */}
            <div className="py-2" />
            
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonBase 
                key={`para2-${index}`} 
                className={`h-4 rounded ${
                  index % 5 === 4 ? 'w-3/4' : index % 6 === 0 ? 'w-4/5' : ''
                }`} 
              />
            ))}
          </div>

          {/* Footer skeleton */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Author info skeleton */}
              <div className="flex items-center gap-3">
                <SkeletonBase className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <SkeletonBase className="h-4 w-24 rounded" />
                  <SkeletonBase className="h-3 w-40 rounded" />
                </div>
              </div>
              
              {/* Button skeleton */}
              <SkeletonBase className="h-12 w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
);

// Skeleton loader for PostList grid
export const PostListSkeleton: React.FC<{ 
  count?: number; 
  className?: string;
}> = ({ count = 6, className = '' }) => (
  <div className={`max-w-7xl mx-auto ${className}`}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <PostCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  </div>
);

// Skeleton for page header/title
export const PageHeaderSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`text-center mb-12 ${className}`}>
    <SkeletonBase className="h-10 sm:h-12 lg:h-14 w-64 mx-auto rounded mb-4" />
    <SkeletonBase className="h-4 w-96 mx-auto rounded" />
  </div>
);

// Skeleton for navigation breadcrumbs
export const BreadcrumbSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <nav className={`flex items-center gap-2 text-sm mb-6 ${className}`}>
    <SkeletonBase className="h-4 w-12 rounded" />
    <span className="text-gray-300">/</span>
    <SkeletonBase className="h-4 w-8 rounded" />
    <span className="text-gray-300">/</span>
    <SkeletonBase className="h-4 w-32 rounded" />
  </nav>
);

// Skeleton for pagination
export const PaginationSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <nav className={`flex items-center justify-center gap-2 mt-12 ${className}`}>
    <SkeletonBase className="h-10 w-20 rounded-lg" />
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonBase key={index} className="h-10 w-10 rounded-lg" />
      ))}
    </div>
    <SkeletonBase className="h-10 w-16 rounded-lg" />
  </nav>
);