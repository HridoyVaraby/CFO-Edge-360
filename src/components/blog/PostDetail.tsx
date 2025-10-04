import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag, Folder } from 'lucide-react';
import { Post } from '../../types/wordpress';
import { PostDetailSkeleton } from './SkeletonLoaders';
import ErrorDisplay from './ErrorDisplay';
import LazyImage from './LazyImage';

interface PostDetailProps {
  post: Post | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  className?: string;
  isRetrying?: boolean;
  retryCount?: number;
  maxRetries?: number;
}





// Breadcrumb component
const Breadcrumb: React.FC<{ postTitle: string }> = ({ postTitle }) => (
  <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto" aria-label="Breadcrumb">
    <Link 
      to="/" 
      className="hover:text-amber-600 focus:text-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md px-1 py-0.5 -mx-1 -my-0.5 whitespace-nowrap"
    >
      Home
    </Link>
    <span className="text-gray-400">/</span>
    <Link 
      to="/posts" 
      className="hover:text-amber-600 focus:text-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md px-1 py-0.5 -mx-1 -my-0.5 whitespace-nowrap"
    >
      Blog
    </Link>
    <span className="text-gray-400">/</span>
    <span className="text-gray-700 truncate max-w-[120px] sm:max-w-xs" title={postTitle}>
      {postTitle}
    </span>
  </nav>
);

// Back to posts button
const BackButton: React.FC = () => (
  <div className="mb-6 sm:mb-8">
    <Link
      to="/posts"
      className="inline-flex items-center gap-2 text-blue-900 hover:text-amber-600 focus:text-amber-600 font-semibold transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md py-2 px-3 -mx-3 -my-2 min-h-[44px] sm:min-h-[auto] sm:py-0 sm:px-0"
      aria-label="Go back to blog posts"
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
  className = '',
  isRetrying = false,
  retryCount = 0,
  maxRetries = 3
}) => {
  // Show loading state
  if (loading) {
    return <PostDetailSkeleton className={className} />;
  }

  // Show error state
  if (error || !post) {
    return (
      <div className={`py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
        <ErrorDisplay 
          error={error || 'Post not found'} 
          onRetry={onRetry}
          isRetrying={isRetrying}
          retryCount={retryCount}
          maxRetries={maxRetries}
          showBackButton={true}
          showHomeButton={true}
          size="large"
          variant="card"
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
    <div className={`py-4 sm:py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <article className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          {/* Featured Image */}
          {featuredMedia?.source_url && (
            <div className="relative">
              <LazyImage
                src={featuredMedia.source_url}
                alt={featuredMedia.alt_text || post.title.rendered}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                sizes="100vw"
                priority={true}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Breadcrumb */}
            <Breadcrumb postTitle={post.title.rendered.replace(/<[^>]*>/g, '')} />

            {/* Title */}
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-black leading-tight mb-4 sm:mb-6 blog-content"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200">
              {/* Author */}
              {author && (
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="font-medium">{author.name}</span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>

              {/* Reading time */}
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Categories and Tags */}
            {(categories.length > 0 || tags.length > 0) && (
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="flex items-start sm:items-center gap-2">
                    <Folder className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {categories.map((category: any) => (
                        <span
                          key={category.id}
                          className="px-2.5 sm:px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex items-start sm:items-center gap-2">
                    <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {tags.map((tag: any) => (
                        <span
                          key={tag.id}
                          className="px-2.5 sm:px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full"
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
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none blog-content
                prose-headings:font-serif prose-headings:text-black prose-headings:leading-tight
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg
                prose-a:text-blue-900 prose-a:no-underline hover:prose-a:text-amber-600 focus:prose-a:text-amber-600
                prose-strong:text-black prose-strong:font-semibold
                prose-blockquote:border-l-amber-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:my-4
                prose-img:rounded-lg prose-img:shadow-md prose-img:w-full prose-img:h-auto
                prose-ul:my-4 prose-ol:my-4 prose-li:my-1
                prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
                prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
                prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-5"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Post Footer */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Author info */}
                {author && (
                  <div className="flex items-start sm:items-center gap-3">
                    {author.avatar_urls?.['48'] && (
                      <LazyImage
                        src={author.avatar_urls['48']}
                        alt={author.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
                        sizes="48px"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{author.name}</p>
                      {author.description && (
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">
                          {author.description.replace(/<[^>]*>/g, '')}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Back to posts link */}
                <Link
                  to="/posts"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 focus:bg-amber-600 transition-colors duration-200 w-full sm:w-auto sm:self-start min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  aria-label="View more blog posts"
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