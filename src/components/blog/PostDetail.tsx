import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Folder, ArrowRight } from 'lucide-react';
import { Post } from '../../types/wordpress';
import { PostDetailSkeleton } from './SkeletonLoaders';
import ErrorDisplay from './ErrorDisplay';
import LazyImage from './LazyImage';
import { wordpressAPI } from '../../services/wordpress';

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

  // State for related posts
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // Extract embedded data
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const categories = post._embedded?.['wp:term']?.[0] || [];

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

  // Fetch related posts based on categories
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post || categories.length === 0) return;

      try {
        setLoadingRelated(true);
        const categoryIds = categories.map((cat: any) => cat.id);
        
        const response = await wordpressAPI.getPosts({
          categories: categoryIds,
          per_page: 3,
          exclude: [post.id],
          _embed: true
        });

        setRelatedPosts(response.posts);
      } catch (err) {
        console.error('Error fetching related posts:', err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelatedPosts();
  }, [post, categories]);

  return (
    <div className={`bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen ${className}`}>
      <div>
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in border border-gray-100">
          {/* Featured Image */}
          {featuredMedia?.source_url && (
            <div className="relative aspect-video overflow-hidden">
              <LazyImage
                src={featuredMedia.source_url}
                alt={featuredMedia.alt_text || post.title.rendered}
                className="w-full h-full object-cover"
                sizes="100vw"
                priority={true}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-12">


            {/* Title */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-gray-900 leading-tight mb-6 lg:mb-8 blog-content"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <time dateTime={post.date} className="font-medium text-gray-900">
                    {formatDate(post.date)}
                  </time>
                  <p className="text-xs text-gray-500">Published</p>
                </div>
              </div>

              {/* Reading time */}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <span className="font-medium text-gray-900">{readingTime} min</span>
                  <p className="text-xs text-gray-500">Read time</p>
                </div>
              </div>
            </div>

            {/* Categories Only */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-10">
                <Folder className="h-5 w-5 text-gray-400 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: any) => (
                    <span
                      key={category.id}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm font-semibold rounded-full"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none blog-content
                prose-headings:font-serif prose-headings:text-gray-900 prose-headings:leading-tight
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
                prose-a:text-blue-900 prose-a:no-underline hover:prose-a:text-amber-600 focus:prose-a:text-amber-600 prose-a:font-semibold prose-a:decoration-0
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-50 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8 prose-blockquote:italic
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:w-full prose-img:h-auto prose-img:my-8
                prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-li:text-gray-700
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:first:mt-0
                prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10
                prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 mb-8">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => {
                    const relatedMedia = relatedPost._embedded?.['wp:featuredmedia']?.[0];
                    return (
                      <Link
                        key={relatedPost.id}
                        to={`/post/${relatedPost.slug}`}
                        className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 no-underline"
                      >
                        {relatedMedia?.source_url && (
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={relatedMedia.source_url}
                              alt={relatedMedia.alt_text || relatedPost.title.rendered}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 
                            className="font-bold font-serif text-gray-900 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 mb-2"
                            dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                          />
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <time dateTime={relatedPost.date}>
                              {new Date(relatedPost.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <Link
                to="/posts"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-gray-900 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 no-underline"
                aria-label="View more blog posts"
              >
                <span className="text-white">Explore More Articles</span>
                <ArrowRight className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;