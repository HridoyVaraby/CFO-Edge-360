# Design Document

## Overview

This design outlines the integration of WordPress hosted at cms.cfoedge360.com as a headless CMS for the CFO EDGE360 website. The solution will create a seamless blog experience that maintains brand consistency while leveraging WordPress's content management capabilities through its REST API.

## Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   WordPress     │    │   React Frontend │    │   User Browser  │
│ cms.cfoedge360  │◄───┤  cfoedge360.com  │◄───┤                 │
│                 │    │                  │    │                 │
│ - Content Mgmt  │    │ - Post Display   │    │ - SEO Friendly  │
│ - REST API      │    │ - Brand Design   │    │ - Fast Loading  │
│ - Media Storage │    │ - Caching        │    │ - Mobile Ready  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Data Flow

1. **Content Creation**: Content creators use WordPress admin at cms.cfoedge360.com
2. **API Consumption**: React frontend fetches data via WordPress REST API
3. **Rendering**: Posts rendered with CFO EDGE360 branding and design
4. **SEO Optimization**: Meta tags and structured data added for search engines
5. **Caching**: API responses cached for performance optimization

## Components and Interfaces

### Core Components

#### 1. PostList Component
```typescript
interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
}
```

**Responsibilities:**
- Display responsive grid of post cards
- Handle loading and error states
- Implement pagination or infinite scroll
- Maintain consistent spacing and layout

#### 2. PostCard Component
```typescript
interface PostCardProps {
  post: Post;
  className?: string;
}
```

**Responsibilities:**
- Display post preview with featured image
- Show title, excerpt, author, and date
- Provide navigation to full post
- Apply hover animations and interactions

#### 3. PostDetail Component
```typescript
interface PostDetailProps {
  post: Post;
  loading: boolean;
  error: string | null;
}
```

**Responsibilities:**
- Render full post content with HTML
- Display featured image and metadata
- Handle SEO meta tags
- Provide navigation breadcrumbs

#### 4. BlogLayout Component
```typescript
interface BlogLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}
```

**Responsibilities:**
- Maintain consistent header/footer
- Handle SEO meta tags
- Provide breadcrumb navigation
- Apply blog-specific styling

### API Service Layer

#### WordPress API Service
```typescript
class WordPressAPIService {
  private baseURL = 'https://cms.cfoedge360.com/wp-json/wp/v2';
  
  async getPosts(params?: PostQueryParams): Promise<PostsResponse>;
  async getPostBySlug(slug: string): Promise<Post>;
  async getPostById(id: number): Promise<Post>;
  async getCategories(): Promise<Category[]>;
  async getTags(): Promise<Tag[]>;
  async getAuthors(): Promise<Author[]>;
}
```

### Data Models

#### Post Interface
```typescript
interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  link: string;
  _embedded?: {
    author: Author[];
    'wp:featuredmedia': Media[];
    'wp:term': Term[][];
  };
}
```

#### Author Interface
```typescript
interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_urls: {
    [size: string]: string;
  };
}
```

#### Media Interface
```typescript
interface Media {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [size: string]: {
        source_url: string;
        width: number;
        height: number;
      };
    };
  };
}
```

## Error Handling

### Error Boundary Implementation
```typescript
class BlogErrorBoundary extends React.Component {
  // Catch and handle component errors
  // Display fallback UI for broken components
  // Log errors for monitoring
}
```

### API Error Handling
```typescript
class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'WordPressAPIError';
  }
}
```

### Error States
- **Network Errors**: Display retry button with friendly message
- **404 Errors**: Show custom 404 page with navigation options
- **Loading Errors**: Skeleton loaders with timeout fallbacks
- **Content Errors**: Graceful degradation for missing images/content

## Testing Strategy

### Unit Testing
- **Component Testing**: React Testing Library for component behavior
- **API Service Testing**: Mock WordPress API responses
- **Utility Function Testing**: Date formatting, text processing, etc.
- **Error Handling Testing**: Verify error boundaries and fallbacks

### Integration Testing
- **API Integration**: Test actual WordPress API endpoints
- **Route Testing**: Verify React Router navigation
- **SEO Testing**: Validate meta tags and structured data
- **Performance Testing**: Measure loading times and bundle sizes

### End-to-End Testing
- **User Flows**: Complete post browsing and reading journeys
- **Mobile Testing**: Responsive design across devices
- **SEO Validation**: Search engine crawling and indexing
- **Accessibility Testing**: Screen reader and keyboard navigation

## Performance Optimization

### Caching Strategy
```typescript
// API Response Caching
const cacheConfig = {
  posts: { ttl: 300000 }, // 5 minutes
  post: { ttl: 600000 },  // 10 minutes
  media: { ttl: 3600000 }, // 1 hour
};
```

### Image Optimization
- **Lazy Loading**: Intersection Observer for images
- **Responsive Images**: Multiple sizes from WordPress
- **WebP Support**: Modern format with fallbacks
- **Placeholder Images**: Blur-up effect during loading

### Code Splitting
```typescript
// Route-based code splitting
const PostList = lazy(() => import('./components/PostList'));
const PostDetail = lazy(() => import('./components/PostDetail'));
```

### Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression
- **Minification**: Terser for JavaScript optimization
- **CSS Optimization**: PurgeCSS for unused styles

## Security Considerations

### API Security
- **CORS Configuration**: Restrict origins to cfoedge360.com
- **Rate Limiting**: Prevent API abuse
- **Input Sanitization**: Clean HTML content from WordPress
- **Error Information**: Avoid exposing sensitive data in errors

### Content Security
- **HTML Sanitization**: DOMPurify for user-generated content
- **XSS Prevention**: Escape dynamic content appropriately
- **Content Validation**: Verify data structure from API
- **Image Security**: Validate image URLs and sources

### SEO Security
- **Robots.txt**: Block cms.cfoedge360.com from indexing
- **Canonical URLs**: Prevent duplicate content issues
- **Meta Tag Validation**: Ensure proper Open Graph data
- **Sitemap Generation**: Include blog posts in main sitemap

## Design System Integration

### Typography
```css
/* Blog-specific typography */
.blog-title {
  font-family: 'Playfair Display', serif; /* Bold serif for titles */
  font-weight: 700;
  color: #000000;
}

.blog-body {
  font-family: 'Inter', sans-serif; /* Clean sans-serif for body */
  color: #374151;
  line-height: 1.7;
}
```

### Color Palette
```css
:root {
  --blog-primary: #000000;      /* Black text */
  --blog-background: #ffffff;   /* White background */
  --blog-accent: #f59e0b;       /* Gold accents */
  --blog-button: #1e3a8a;       /* Navy buttons */
  --blog-secondary: #6b7280;    /* Gray secondary text */
  --blog-border: #e5e7eb;       /* Light gray borders */
}
```

### Component Styling
- **Card Design**: Clean white cards with subtle shadows
- **Button Styles**: Navy primary buttons with gold hover states
- **Animation**: Subtle fade-in and slide-up transitions
- **Spacing**: Consistent 8px grid system
- **Responsive**: Mobile-first approach with breakpoints

## Routing Strategy

### Route Structure
```typescript
const blogRoutes = [
  {
    path: '/posts',
    element: <PostListPage />,
    loader: postsLoader,
  },
  {
    path: '/post/:slug',
    element: <PostDetailPage />,
    loader: postLoader,
  },
  {
    path: '/category/:slug',
    element: <CategoryPage />,
    loader: categoryLoader,
  },
  {
    path: '/tag/:slug',
    element: <TagPage />,
    loader: tagLoader,
  },
];
```

### SEO-Friendly URLs
- **Post URLs**: `/post/financial-planning-tips`
- **Category URLs**: `/category/financial-strategy`
- **Tag URLs**: `/tag/cash-flow`
- **Archive URLs**: `/posts?page=2`

### Navigation Integration
```typescript
// Add to main navigation
const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/posts' }, // New blog link
  { label: 'Contact', href: '/contact' },
];
```

## Deployment Considerations

### Build Configuration
```typescript
// Vite configuration for blog integration
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'blog': ['./src/components/blog/index.ts'],
          'wordpress-api': ['./src/services/wordpress.ts'],
        },
      },
    },
  },
});
```

### Environment Variables
```env
VITE_WORDPRESS_API_URL=https://cms.cfoedge360.com/wp-json/wp/v2
VITE_SITE_URL=https://cfoedge360.com
VITE_ENABLE_BLOG_CACHE=true
```

### Production Optimizations
- **Static Generation**: Pre-render popular posts
- **CDN Integration**: Serve images from CDN
- **Monitoring**: Track API performance and errors
- **Analytics**: Measure blog engagement and performance