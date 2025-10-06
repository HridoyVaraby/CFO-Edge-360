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


  return (
    <article className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 ${className}`}>
      {/* Featured Image - Absolutely no gap */}
      <Link
        to={`/post/${post.slug}`}
        className="block relative w-full h-56 overflow-hidden bg-gray-100"
        style={{ display: 'block', lineHeight: 0 }}
        aria-label={`Read full post: ${post.title.rendered.replace(/<[^>]*>/g, '')}`}
      >
        {featuredMedia?.source_url ? (
          <img
            src={featuredMedia.source_url}
            alt={featuredMedia.alt_text || post.title.rendered}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ display: 'block', margin: 0, padding: 0, verticalAlign: 'top' }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </Link>

      {/* Content Section */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        {/* Title */}
        <h3 className="mb-3">
          <Link 
            to={`/post/${post.slug}`}
            className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors line-clamp-2 no-underline"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h3>

        {/* Excerpt */}
        {post.excerpt.rendered && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {cleanExcerpt(post.excerpt.rendered)}
          </p>
        )}

        {/* Read More Link */}
        <Link
          to={`/post/${post.slug}`}
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm group/link no-underline"
          aria-label={`Read more about ${post.title.rendered.replace(/<[^>]*>/g, '')}`}
        >
          <span>Read Article</span>
          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;