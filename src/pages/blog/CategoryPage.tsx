import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PostList from '../../components/blog/PostList';
import BlogLayout from '../../components/blog/BlogLayout';
import SEO from '../../components/blog/SEO';
import { Post, Category } from '../../types/wordpress';
import { wordpressAPI } from '../../services/wordpress';

const CategoryPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
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
        const foundCategory = categories[0];

        if (!foundCategory) {
          throw new Error('Category not found');
        }

        setCategory(foundCategory);

        // Then get posts for this category
        const response = await wordpressAPI.getPosts({
          categories: [foundCategory.id],
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

  // Generate SEO data
  const getPageTitle = () => {
    const categoryName = category?.name || slug;
    const page = parseInt(searchParams.get('page') || '1', 10);
    let title = `${categoryName} - CFO Edge 360 Blog`;
    if (page > 1) {
      title += ` - Page ${page}`;
    }
    return title;
  };

  const getPageDescription = () => {
    const categoryName = category?.name || slug;
    return category?.description || `Browse all posts in the ${categoryName} category from CFO Edge 360 Blog.`;
  };

  const getCanonicalUrl = () => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    const baseUrl = `${window.location.origin}/category/${slug}`;
    return page > 1 ? `${baseUrl}?page=${page}` : baseUrl;
  };

  const getBreadcrumbs = () => [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/posts' },
    { label: `Category: ${category?.name || slug}`, href: `/category/${slug}` }
  ];

  return (
    <>
      {/* SEO Component for Category Page */}
      <SEO
        title={getPageTitle()}
        description={getPageDescription()}
        canonical={getCanonicalUrl()}
        type="website"
        keywords={`${category?.name || slug}, CFO services, financial consulting, business finance`}
      />
      
      <BlogLayout
        title={getPageTitle()}
        description={getPageDescription()}
        breadcrumbs={getBreadcrumbs()}
        canonical={getCanonicalUrl()}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Category: {category?.name || slug}
            </h1>
            <p className="text-xl text-gray-600">
              {getPageDescription()}
            </p>
          </div>
          
          <PostList 
            posts={posts} 
            loading={loading} 
            error={error} 
          />
        </div>
      </BlogLayout>
    </>
  );
};

export default CategoryPage;