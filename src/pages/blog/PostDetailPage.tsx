import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostDetail from '../../components/blog/PostDetail';
import BlogLayout from '../../components/blog/BlogLayout';
import SEO from '../../components/blog/SEO';
import { Post } from '../../types/wordpress';
import { wordpressAPI } from '../../services/wordpress';
import { useRetryWithMessages } from '../../hooks/useRetry';

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  // Create fetch function for retry hook
  const fetchPost = useCallback(async () => {
    if (!slug) {
      throw new Error('Post slug is required');
    }

    const fetchedPost = await wordpressAPI.getPostBySlug(slug);
    setPost(fetchedPost);
    return fetchedPost;
  }, [slug]);

  // Set up retry hook
  const retryLogic = useRetryWithMessages(fetchPost, {
    maxAttempts: 3,
    initialDelay: 1000,
    retryMessage: (attempt) => `Retrying to load post... (attempt ${attempt})`,
    maxAttemptsMessage: 'Unable to load post after multiple attempts. Please try again later.',
    onRetry: (attempt, error) => {
      console.warn(`Retry attempt ${attempt} for post ${slug}:`, error);
    },
    onMaxAttemptsReached: (error) => {
      console.error(`Max retry attempts reached for post ${slug}:`, error);
    }
  });

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Post slug is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        await retryLogic.execute();
      } catch (err) {
        console.error('Error loading post:', err);
        if (err instanceof Error && err.message.includes('not found')) {
          setError('Post not found');
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load post');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, retryLogic]);

  // Manual retry function
  const handleRetry = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await retryLogic.retry();
    } catch (err) {
      console.error('Error retrying post:', err);
      if (err instanceof Error && err.message.includes('not found')) {
        setError('Post not found');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      }
    } finally {
      setLoading(false);
    }
  }, [retryLogic]);

  // Helper functions for SEO data
  const getPostTitle = () => {
    if (!post) return 'CFO Edge 360 Blog';
    return `${post.title.rendered} - CFO Edge 360 Blog`;
  };

  const getPostDescription = () => {
    if (!post) return 'Insights, strategies, and expert advice to help you navigate your financial journey';
    
    // Extract text from excerpt, removing HTML tags
    const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
    return excerpt || 'Read this insightful post from CFO Edge 360 Blog';
  };

  const getPostImage = () => {
    if (!post?._embedded?.['wp:featuredmedia']?.[0]) {
      return `${window.location.origin}/logo.png`; // Fallback to site logo
    }
    return post._embedded['wp:featuredmedia'][0].source_url;
  };



  const getCanonicalUrl = () => {
    return `${window.location.origin}/post/${slug}`;
  };

  const getPublishedDate = () => {
    if (!post) return new Date().toISOString();
    return new Date(post.date).toISOString();
  };

  const getModifiedDate = () => {
    if (!post) return new Date().toISOString();
    return new Date(post.modified).toISOString();
  };



  // Generate custom breadcrumbs for post detail page
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/posts' }
    ];
    
    if (post) {
      breadcrumbs.push({ 
        label: post.title.rendered.length > 50 
          ? `${post.title.rendered.substring(0, 50)}...` 
          : post.title.rendered,
        href: `/post/${slug}`
      });
    }
    
    return breadcrumbs;
  };

  return (
    <>
      {/* SEO Component for Article */}
      {post && (
        <SEO
          title={getPostTitle()}
          description={getPostDescription()}
          canonical={getCanonicalUrl()}
          type="article"
          image={getPostImage()}
          post={post}
          publishedTime={getPublishedDate()}
          modifiedTime={getModifiedDate()}
          section="Finance"
        />
      )}
      
      <BlogLayout
        title={getPostTitle()}
        description={getPostDescription()}
        breadcrumbs={getBreadcrumbs()}
        canonical={getCanonicalUrl()}
        type="article"
        image={getPostImage()}
      >

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link 
            to="/posts" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
        
        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {error === 'Post not found' ? 'Post Not Found' : 'Error Loading Post'}
              </h1>
              <p className="text-gray-600 mb-6">
                {error === 'Post not found' 
                  ? "The post you're looking for doesn't exist or has been moved."
                  : 'There was an error loading this post. Please try again later.'
                }
              </p>
              <Link 
                to="/posts"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
          </div>
        )}
        
        {/* Post Content */}
        {!error && (
          <PostDetail 
            post={post} 
            loading={loading} 
            error={error}
            onRetry={handleRetry}
            isRetrying={retryLogic.state.isRetrying}
            retryCount={retryLogic.state.attemptCount}
            maxRetries={3}
          />
        )}
      </div>
    </BlogLayout>
    </>
  );
};

export default PostDetailPage;