import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false
    }),
    // Brotli compression (better compression ratio)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Enable tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      }
    },
    // Configure rollup options for better chunking
    rollupOptions: {
      output: {
        // Manual chunks for better caching and smaller bundles
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('react-helmet-async')) {
              return 'helmet-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
          
          // Blog-specific chunks
          if (id.includes('/src/components/blog/')) {
            return 'blog-components';
          }
          if (id.includes('/src/pages/blog/')) {
            return 'blog-pages';
          }
          if (id.includes('/src/services/wordpress') || 
              id.includes('/src/types/wordpress') || 
              id.includes('/src/config/wordpress')) {
            return 'wordpress-api';
          }
          
          // Page chunks
          if (id.includes('/src/pages/') && !id.includes('/src/pages/blog/')) {
            return 'main-pages';
          }
          
          // Component chunks
          if (id.includes('/src/components/') && !id.includes('/src/components/blog/')) {
            return 'main-components';
          }
          
          // Utility chunks
          if (id.includes('/src/hooks/') || id.includes('/src/config/')) {
            return 'utils';
          }
        },
        // Optimize chunk file names
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || '')) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || '')) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true
  },
  // Server configuration
  server: {
    host: true
  }
});
