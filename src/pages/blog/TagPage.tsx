import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostList from '../../components/blog/PostList';
import { Post } from '../../types/wordpress';
import { wordpressAPI } from '../../services/wordpress';

const TagPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tagName, setTagName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchTagPosts = async () => {
      if (!slug) {
        setError('Tag slug is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const page = parseInt(searchParams.get('page') || '1', 10);
        const perPage = parseInt(searchParams.get('per_page') || '10', 10);

        // First, get the tag to get its ID and name
        const tags = await wordpressAPI.getTags({ slug });
        const tag = tags[0];

        if (!tag) {
          throw new Error('Tag not found');
        }

        setTagName(tag.name);

        // Then get posts for this tag
        const response = await wordpressAPI.getPosts({
          tags: [tag.id],
          page,
          per_page: perPage,
          _embed: true
        });

        setPosts(response.posts);
      } catch (err) {
        console.error('Error loading tag posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tag posts');
      } finally {
        setLoading(false);
      }
    };

    fetchTagPosts();
  }, [slug, searchParams]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <Link 
            to="/posts" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tag: {tagName || slug}
          </h1>
          <p className="text-xl text-gray-600">
            Posts tagged with {tagName || slug}
          </p>
        </div>
        
        <PostList 
          posts={posts} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default TagPage;