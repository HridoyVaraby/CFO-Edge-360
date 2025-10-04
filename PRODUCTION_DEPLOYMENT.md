# Production Deployment Guide

This guide covers the deployment of the WordPress headless CMS blog integration to production.

## 📋 Pre-Deployment Checklist

### Environment Configuration
- [ ] **Environment Variables**: All required environment variables are set
  - `VITE_WORDPRESS_API_URL=https://cms.cfoedge360.com/wp-json/wp/v2`
  - `VITE_SITE_URL=https://cfoedge360.com`
  - `VITE_ENABLE_BLOG_CACHE=true`
  - Optional: Analytics and monitoring variables
- [ ] **WordPress API**: Verify API is accessible and returning data
- [ ] **CORS Configuration**: Ensure WordPress allows requests from production domain
- [ ] **SSL Certificates**: Both frontend and WordPress backend have valid SSL

### Build Optimization
- [ ] **Bundle Analysis**: Run `npm run build:analyze` to check bundle sizes
- [ ] **Code Splitting**: Verify blog components are properly code-split
- [ ] **Tree Shaking**: Confirm unused code is removed from bundles
- [ ] **Compression**: Gzip and Brotli compression enabled
- [ ] **Minification**: JavaScript and CSS are minified
- [ ] **Source Maps**: Disabled for production (security)

### Performance Optimization
- [ ] **Image Optimization**: All images are optimized and properly sized
- [ ] **Lazy Loading**: Images and components are lazy-loaded
- [ ] **Caching**: API response caching is configured
- [ ] **CDN**: Static assets served from CDN (if applicable)
- [ ] **Service Worker**: Consider enabling for offline support

### SEO Configuration
- [ ] **Meta Tags**: All pages have proper meta tags
- [ ] **Canonical URLs**: Point to production domain
- [ ] **Structured Data**: JSON-LD schema is implemented
- [ ] **Robots.txt**: Updated to allow indexing of blog pages
- [ ] **Sitemap**: Blog posts included in XML sitemap
- [ ] **Social Media**: Open Graph and Twitter Cards working

### Security Configuration
- [ ] **HTTPS**: All requests use HTTPS
- [ ] **Content Security Policy**: CSP headers configured
- [ ] **CORS**: Proper CORS configuration on WordPress
- [ ] **API Security**: WordPress API secured appropriately
- [ ] **Error Handling**: No sensitive information in error messages

## 🚀 Deployment Steps

### 1. Build Production Bundle
```bash
# Install dependencies
npm ci

# Run tests
npm run test:run

# Build for production
npm run build

# Analyze bundle (optional)
npm run build:analyze
```

### 2. Environment Setup
Create production `.env` file:
```env
# WordPress API Configuration
VITE_WORDPRESS_API_URL=https://cms.cfoedge360.com/wp-json/wp/v2
VITE_SITE_URL=https://cfoedge360.com

# Cache Configuration
VITE_ENABLE_BLOG_CACHE=true
VITE_CACHE_TTL_POSTS=300000
VITE_CACHE_TTL_POST=600000
VITE_CACHE_TTL_MEDIA=3600000

# API Configuration
VITE_API_TIMEOUT=10000
VITE_API_RETRY_ATTEMPTS=3
VITE_API_RETRY_DELAY=1000

# Analytics (optional)
VITE_GA_ID=G-XXXXXXXXXX
```

### 3. Server Configuration

#### Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name cfoedge360.com;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Static files
    location / {
        root /var/www/cfoedge360/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Blog routes
    location /posts {
        root /var/www/cfoedge360/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /post/ {
        root /var/www/cfoedge360/dist;
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache Configuration (.htaccess)
```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# React Router support
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### 4. WordPress Configuration

#### CORS Headers (functions.php)
```php
// Enable CORS for production domain
function add_cors_http_header(){
    $allowed_origins = [
        'https://cfoedge360.com',
        'https://www.cfoedge360.com'
    ];
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }
    
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        }
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
        exit(0);
    }
}
add_action('init','add_cors_http_header');
```

#### Robots.txt for WordPress
```
# Prevent indexing of WordPress backend
User-agent: *
Disallow: /
```

### 5. DNS Configuration
- [ ] **A Record**: Point domain to server IP
- [ ] **CNAME**: Configure www subdomain if needed
- [ ] **SSL**: Ensure SSL certificate covers all subdomains

## 🔍 Post-Deployment Verification

### Functionality Testing
- [ ] **Blog List**: `/posts` loads correctly
- [ ] **Post Detail**: Individual posts load via `/post/{slug}`
- [ ] **Navigation**: All navigation links work
- [ ] **Search**: Post search functionality works
- [ ] **Filtering**: Category and tag filtering works
- [ ] **Pagination**: Post pagination works
- [ ] **Mobile**: All features work on mobile devices

### Performance Testing
- [ ] **Page Speed**: Test with Google PageSpeed Insights
- [ ] **Core Web Vitals**: LCP, FID, CLS within acceptable ranges
- [ ] **Bundle Size**: JavaScript bundles under 1MB total
- [ ] **Image Loading**: Images load efficiently with lazy loading
- [ ] **API Response**: WordPress API responds within 2 seconds

### SEO Testing
- [ ] **Meta Tags**: Use browser dev tools to verify meta tags
- [ ] **Structured Data**: Test with Google's Rich Results Test
- [ ] **Social Sharing**: Test Facebook and Twitter sharing
- [ ] **Canonical URLs**: Verify canonical URLs are correct
- [ ] **Robots.txt**: Verify robots.txt allows blog indexing

### Security Testing
- [ ] **HTTPS**: All requests use HTTPS
- [ ] **Headers**: Security headers present
- [ ] **CORS**: Only allowed origins can access API
- [ ] **Error Handling**: No sensitive data in error messages

## 📊 Monitoring and Maintenance

### Performance Monitoring
- Set up Google Analytics (if not already configured)
- Monitor Core Web Vitals
- Track API response times
- Monitor bundle sizes over time

### Error Monitoring
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor WordPress API availability
- Track failed requests and retries

### Content Monitoring
- Verify new posts appear correctly
- Monitor image loading and optimization
- Check for broken links or missing content

### Regular Maintenance
- Update dependencies monthly
- Monitor WordPress API changes
- Review and optimize bundle sizes
- Update SEO meta tags as needed

## 🚨 Rollback Plan

If issues occur after deployment:

1. **Immediate Rollback**: Restore previous version from backup
2. **DNS Rollback**: Point domain back to previous server if needed
3. **Database Rollback**: Restore WordPress database if corrupted
4. **Cache Clear**: Clear all caches (CDN, browser, server)
5. **Monitoring**: Check all monitoring systems after rollback

## 📞 Support Contacts

- **WordPress Admin**: Access to cms.cfoedge360.com admin
- **Server Admin**: Access to production server
- **DNS Provider**: Domain and DNS management
- **SSL Provider**: Certificate management
- **CDN Provider**: Content delivery network (if applicable)

## ✅ Deployment Completion

Once all items are checked and verified:

- [ ] **Functionality**: All blog features working
- [ ] **Performance**: Page speed meets requirements
- [ ] **SEO**: All SEO elements properly configured
- [ ] **Security**: Security measures in place
- [ ] **Monitoring**: Monitoring systems active
- [ ] **Documentation**: Deployment documented
- [ ] **Team Notification**: Stakeholders notified of successful deployment

The WordPress headless CMS blog integration is now live in production! 🎉