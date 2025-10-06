import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Post } from '../../types/wordpress';
import LazyImage from './LazyImage';

interface PostCardProps {
  post: Post;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, className = '' }) => {
  // Extract embedded data
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Clean excerpt HTML and limit length
  const cleanExcerpt = (excerpt: string) => {
    const cleaned = excerpt.replace(/<[^>]*>/g, '').trim();
    return cleaned.length > 120 ? cleaned.substring(0, 120) + '...' : cleaned;
  };

  // Estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
  };

  const readingTime = estimateReadingTime(post.content?.rendered || post.excerpt?.rendered || '');

  return (
    <article 
      className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 animate-fade-in ${className}`}
    >
      {/* Featured Image with 16:9 Aspect Ratio - No top padding */}
      <div className="relative overflow-hidden aspect-video m-0 p-0">
        <Link 
          to={`/post/${post.slug}`}
          className="absolute inset-0 block focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          aria-label={`Read full post: ${post.title.rendered.replace(/<[^>]*>/g, '')}`}
        >
          {featuredMedia?.source_url ? (
            <LazyImage
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text || post.title.rendered}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 m-0 p-0"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center m-0 p-0">
              <div className="text-slate-400">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </Link>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Reading Time Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
          {readingTime} min read
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* Meta Information - Date Only */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        {/* Title */}
        <h3 className="mb-4">
          <Link 
            to={`/post/${post.slug}`}
            className="text-xl sm:text-2xl font-bold font-serif text-gray-900 hover:text-amber-600 focus:text-amber-600 transition-colors duration-300 line-clamp-2 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg block no-underline"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h3>

        {/* Excerpt */}
        {post.excerpt.rendered && (
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {cleanExcerpt(post.excerpt.rendered)}
          </p>
        )}

        {/* Read More Button */}
        <Link
          to={`/post/${post.slug}`}
          className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-lg hover:shadow-xl no-underline"
          aria-label={`Read more about ${post.title.rendered.replace(/<[^>]*>/g, '')}`}
        >
          <span className="text-white">Read Article</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300 text-white" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;