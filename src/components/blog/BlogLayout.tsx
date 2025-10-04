import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../Header';
import Footer from '../Footer';
import SEO from './SEO';
import BlogErrorBoundary from './BlogErrorBoundary';
import { ChevronRight, Home } from 'lucide-react';

interface BlogLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
  // SEO-specific props
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  keywords?: string;
  structuredData?: object;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  title = 'CFO Edge 360 Blog',
  description = 'Insights, strategies, and expert advice to help you navigate your financial journey',
  breadcrumbs = [],
  className = '',
  canonical,
  type = 'website',
  image,
  keywords,
  structuredData
}) => {
  const location = useLocation();

  // Generate default breadcrumbs based on current path
  const getDefaultBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const defaultBreadcrumbs = [
      { label: 'Home', href: '/' }
    ];

    if (pathSegments.includes('posts')) {
      defaultBreadcrumbs.push({ label: 'Blog', href: '/posts' });
    }

    if (pathSegments.includes('post') && pathSegments.length > 1) {
      const postSlug = pathSegments[pathSegments.length - 1];
      defaultBreadcrumbs.push({ 
        label: 'Post', 
        href: `/post/${postSlug}` 
      });
    }

    if (pathSegments.includes('category') && pathSegments.length > 1) {
      const categorySlug = pathSegments[pathSegments.length - 1];
      defaultBreadcrumbs.push({ 
        label: `Category: ${categorySlug}`, 
        href: `/category/${categorySlug}` 
      });
    }

    if (pathSegments.includes('tag') && pathSegments.length > 1) {
      const tagSlug = pathSegments[pathSegments.length - 1];
      defaultBreadcrumbs.push({ 
        label: `Tag: ${tagSlug}`, 
        href: `/tag/${tagSlug}` 
      });
    }

    return defaultBreadcrumbs;
  };

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : getDefaultBreadcrumbs();

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        type={type}
        image={image}
        keywords={keywords}
        structuredData={structuredData}
      />
      
      <Helmet>
        {/* Additional blog styling */}
        <style>
          {`
            /* Blog-specific typography */
            .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6 {
              font-family: 'Playfair Display', serif;
              font-weight: 700;
              color: #000000;
              line-height: 1.2;
              margin-bottom: 1rem;
            }
            
            .blog-content h1 {
              font-size: 2.5rem;
              margin-bottom: 1.5rem;
            }
            
            .blog-content h2 {
              font-size: 2rem;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            
            .blog-content h3 {
              font-size: 1.5rem;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            
            .blog-content p {
              font-family: 'Inter', sans-serif;
              color: #374151;
              line-height: 1.7;
              margin-bottom: 1.25rem;
            }
            
            .blog-content a {
              color: #f59e0b;
              text-decoration: underline;
              transition: color 0.2s ease;
            }
            
            .blog-content a:hover {
              color: #d97706;
            }
            
            .blog-content blockquote {
              border-left: 4px solid #f59e0b;
              padding-left: 1.5rem;
              margin: 2rem 0;
              font-style: italic;
              color: #6b7280;
            }
            
            .blog-content ul, .blog-content ol {
              margin-bottom: 1.25rem;
              padding-left: 1.5rem;
            }
            
            .blog-content li {
              margin-bottom: 0.5rem;
              line-height: 1.6;
            }
            
            .blog-content img {
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              margin: 2rem 0;
            }
            
            .blog-content pre {
              background-color: #f3f4f6;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }
            
            .blog-content code {
              background-color: #f3f4f6;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-size: 0.875rem;
            }
            
            /* Smooth animations */
            .blog-fade-in {
              animation: fadeIn 0.6s ease-out;
            }
            
            .blog-slide-up {
              animation: slideUp 0.6s ease-out;
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            /* Mobile responsive adjustments */
            @media (max-width: 768px) {
              .blog-content h1 {
                font-size: 1.875rem;
                line-height: 1.3;
                margin-bottom: 1rem;
              }
              
              .blog-content h2 {
                font-size: 1.5rem;
                line-height: 1.3;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
              }
              
              .blog-content h3 {
                font-size: 1.25rem;
                line-height: 1.3;
                margin-top: 1.25rem;
                margin-bottom: 0.5rem;
              }
              
              .blog-content p {
                font-size: 1rem;
                line-height: 1.7;
                margin-bottom: 1rem;
              }
              
              .blog-content blockquote {
                padding-left: 1rem;
                margin: 1.5rem 0;
                font-size: 0.95rem;
              }
              
              .blog-content ul, .blog-content ol {
                padding-left: 1.25rem;
                margin-bottom: 1rem;
              }
              
              .blog-content li {
                margin-bottom: 0.375rem;
                line-height: 1.6;
              }
              
              .blog-content img {
                margin: 1.5rem 0;
                border-radius: 0.375rem;
              }
              
              .blog-content pre {
                padding: 0.75rem;
                margin: 1rem 0;
                font-size: 0.875rem;
              }
              
              .blog-content code {
                padding: 0.125rem 0.375rem;
                font-size: 0.8125rem;
              }
            }
            
            /* Extra small screens */
            @media (max-width: 480px) {
              .blog-content h1 {
                font-size: 1.625rem;
              }
              
              .blog-content h2 {
                font-size: 1.375rem;
              }
              
              .blog-content h3 {
                font-size: 1.125rem;
              }
              
              .blog-content p {
                font-size: 0.9375rem;
              }
            }
          `}
        </style>
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <Header />

        {/* Breadcrumb Navigation */}
        {finalBreadcrumbs.length > 1 && (
          <nav 
            className="bg-gray-50 border-b border-gray-200" 
            aria-label="Breadcrumb"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
              <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
                {finalBreadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center flex-shrink-0">
                    {index === 0 && (
                      <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-400" />
                    )}
                    
                    {crumb.href ? (
                      <Link
                        to={crumb.href}
                        className="text-gray-600 hover:text-gray-900 focus:text-gray-900 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-md px-1 py-0.5 -mx-1 -my-0.5 whitespace-nowrap"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 font-medium whitespace-nowrap">
                        {crumb.label}
                      </span>
                    )}
                    
                    {index < finalBreadcrumbs.length - 1 && (
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mx-1 sm:mx-2 text-gray-400 flex-shrink-0" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className={`flex-1 blog-content blog-fade-in ${className}`}>
          <BlogErrorBoundary>
            {children}
          </BlogErrorBoundary>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default BlogLayout;