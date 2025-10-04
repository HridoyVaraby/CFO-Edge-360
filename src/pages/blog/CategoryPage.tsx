import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostList from '../../components/blog/PostList';
import { Post } from '../../types/wordpress';
import { wordpressAPI } from '../../services/wordpress';

const CategoryPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      if (!slug) {
        setError('Category slug is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const page = parseInt(searchParams.get('page') || '1', 10);
        const perPage = parseInt(searchParams.get('per_page') || '10', 10);

        // First, get the category to get its ID and name
        const categories = await wordpressAPI.getCategories({ slug });
        const category = categories[0];

        if (!category) {
          throw new Error('Category not found');
        }

        setCategoryName(category.name);

        // Then get posts for this category
        const response = await wordpressAPI.getPosts({
          categories: [category.id],
          page,
          per_page: perPage,
          _embed: true
        });

        setPosts(response.posts);
      } catch (err) {
        console.error('Error loading category posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load category posts');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
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
            Category: {categoryName || slug}
          </h1>
          <p className="text-xl text-gray-600">
            Posts in the {categoryName || slug} category
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

export default CategoryPage;