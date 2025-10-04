import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag, Folder, AlertCircle } from 'lucide-react';
import { Post } from '../../types/wordpress';

interface PostDetailProps {
  post: Post | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  className?: string;
}

// Loading skeleton for post detail
const PostDetailSkeleton: React.FC = () => (
  <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    {/* Featured image skeleton */}
    <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-200"></div>
    
    {/* Content skeleton */}
    <div className="p-6 sm:p-8 lg:p-12">
      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
      
      {/* Title skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      {/* Meta skeleton */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  </article>
);

// Error display component
const ErrorDisplay: React.FC<{ error: string; onRetry?: () => void }> = ({ error, onRetry }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center animate-fade-in">
    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
    <h2 className="text-2xl font-bold font-serif text-gray-900 mb-2">Unable to Load Post</h2>
    <p className="text-gray-600 mb-6">{error}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
      <Link
        to="/posts"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Posts
      </Link>
    </div>
  </div>
);

// Breadcrumb component
const Breadcrumb: React.FC<{ postTitle: string }> = ({ postTitle }) => (
  <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
    <Link 
      to="/" 
      className="hover:text-amber-600 transition-colors duration-200"
    >
      Home
    </Link>
    <span>/</span>
    <Link 
      to="/posts" 
      className="hover:text-amber-600 transition-colors duration-200"
    >
      Blog
    </Link>
    <span>/</span>
    <span className="text-gray-700 truncate max-w-xs" title={postTitle}>
      {postTitle}
    </span>
  </nav>
);

// Back to posts button
const BackButton: React.FC = () => (
  <div className="mb-8">
    <Link
      to="/posts"
      className="inline-flex items-center gap-2 text-blue-900 hover:text-amber-600 font-semibold transition-colors duration-200 group"
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
      Back to Posts
    </Link>
  </div>
);

const PostDetail: React.FC<PostDetailProps> = ({
  post,
  loading,
  error,
  onRetry,
  className = ''
}) => {
  // Show loading state
  if (loading) {
    return (
      <div className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
        <PostDetailSkeleton />
      </div>
    );
  }

  // Show error state
  if (error || !post) {
    return (
      <div className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
        <ErrorDisplay 
          error={error || 'Post not found'} 
          onRetry={onRetry} 
        />
      </div>
    );
  }

  // Extract embedded data
  const author = post._embedded?.author?.[0];
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Estimate reading time (rough calculation: 200 words per minute)
  const estimateReadingTime = (content: string) => {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
  };

  const readingTime = estimateReadingTime(post.content.rendered);

  return (
    <div className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <article className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          {/* Featured Image */}
          {featuredMedia?.source_url && (
            <div className="relative">
              <img
                src={featuredMedia.source_url}
                alt={featuredMedia.alt_text || post.title.rendered}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Breadcrumb */}
            <Breadcrumb postTitle={post.title.rendered.replace(/<[^>]*>/g, '')} />

            {/* Title */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-black leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
              {/* Author */}
              {author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{author.name}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>

              {/* Reading time */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Categories and Tags */}
            {(categories.length > 0 || tags.length > 0) && (
              <div className="flex flex-wrap gap-4 mb-8">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category: any) => (
                        <span
                          key={category.id}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: any) => (
                        <span
                          key={tag.id}
                          className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-900 prose-a:no-underline hover:prose-a:text-amber-600 prose-strong:text-black prose-blockquote:border-l-amber-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Post Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Author info */}
                {author && (
                  <div className="flex items-center gap-3">
                    {author.avatar_urls?.['48'] && (
                      <img
                        src={author.avatar_urls['48']}
                        alt={author.name}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{author.name}</p>
                      {author.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {author.description.replace(/<[^>]*>/g, '')}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Back to posts link */}
                <Link
                  to="/posts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors duration-200 self-start sm:self-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  More Posts
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;