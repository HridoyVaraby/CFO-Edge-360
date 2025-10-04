import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Post } from '../../types/wordpress';
import LazyImage from './LazyImage';

interface PostCardProps {
  post: Post;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, className = '' }) => {
  // Extract embedded data
  const author = post._embedded?.author?.[0];
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Clean excerpt HTML
  const cleanExcerpt = (excerpt: string) => {
    return excerpt.replace(/<[^>]*>/g, '').trim();
  };

  return (
    <article 
      className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 animate-fade-in ${className}`}
    >
      {/* Featured Image */}
      {featuredMedia?.source_url && (
        <div className="relative overflow-hidden">
          <Link 
            to={`/post/${post.slug}`}
            className="block focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-t-xl"
            aria-label={`Read full post: ${post.title.rendered.replace(/<[^>]*>/g, '')}`}
          >
            <LazyImage
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text || post.title.rendered}
              className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>
          {/* Overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="mb-3">
          <Link 
            to={`/post/${post.slug}`}
            className="text-lg sm:text-xl lg:text-2xl font-bold font-serif text-black hover:text-amber-600 focus:text-amber-600 transition-colors duration-200 line-clamp-2 leading-tight focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md block"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h3>

        {/* Excerpt */}
        {post.excerpt.rendered && (
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
            {cleanExcerpt(post.excerpt.rendered)}
          </p>
        )}

        {/* Meta information */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Author */}
            {author && (
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="font-medium truncate">{author.name}</span>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <time dateTime={post.date} className="truncate">
                {formatDate(post.date)}
              </time>
            </div>
          </div>
        </div>

        {/* Read More Button - Enhanced for mobile touch */}
        <Link
          to={`/post/${post.slug}`}
          className="group/btn inline-flex items-center gap-2 text-blue-900 hover:text-amber-600 focus:text-amber-600 font-semibold text-sm sm:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md py-1 px-2 -mx-2 min-h-[44px] sm:min-h-[auto] sm:py-0 sm:px-0"
          aria-label={`Read more about ${post.title.rendered.replace(/<[^>]*>/g, '')}`}
        >
          Read More
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;