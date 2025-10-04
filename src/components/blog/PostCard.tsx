import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Post } from '../../types/wordpress';

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
          <Link to={`/post/${post.slug}`}>
            <img
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text || post.title.rendered}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </Link>
          {/* Overlay gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="mb-3">
          <Link 
            to={`/post/${post.slug}`}
            className="text-xl sm:text-2xl font-bold font-serif text-black hover:text-amber-600 transition-colors duration-200 line-clamp-2 leading-tight"
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            {/* Author */}
            {author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="font-medium">{author.name}</span>
              </div>
            )}

            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <Link
          to={`/post/${post.slug}`}
          className="group/btn inline-flex items-center gap-2 text-blue-900 hover:text-amber-600 font-semibold text-sm transition-colors duration-200"
        >
          Read More
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};

export default PostCard;