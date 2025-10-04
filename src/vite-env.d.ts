/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORDPRESS_API_URL: string
  readonly VITE_SITE_URL: string
  readonly VITE_ENABLE_BLOG_CACHE: string
  readonly VITE_CACHE_TTL_POSTS: string
  readonly VITE_CACHE_TTL_POST: string
  readonly VITE_CACHE_TTL_MEDIA: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_API_RETRY_ATTEMPTS: string
  readonly VITE_API_RETRY_DELAY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
