#!/usr/bin/env node

/**
 * Production Validation Script
 * Validates the production build and configuration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`)
};

let errors = 0;
let warnings = 0;

function checkFile(filePath, description) {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    log.success(`${description}: ${filePath}`);
    return true;
  } else {
    log.error(`${description} missing: ${filePath}`);
    errors++;
    return false;
  }
}

function checkFileSize(filePath, maxSize, description) {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeKB = Math.round(stats.size / 1024);
    if (sizeKB <= maxSize) {
      log.success(`${description}: ${sizeKB}KB (limit: ${maxSize}KB)`);
    } else {
      log.warning(`${description}: ${sizeKB}KB exceeds limit of ${maxSize}KB`);
      warnings++;
    }
    return sizeKB;
  } else {
    log.error(`${description} file not found: ${filePath}`);
    errors++;
    return 0;
  }
}

function checkEnvironmentVariables() {
  log.header('Environment Variables');
  
  const requiredVars = [
    'VITE_WORDPRESS_API_URL',
    'VITE_SITE_URL'
  ];
  
  const optionalVars = [
    'VITE_ENABLE_BLOG_CACHE',
    'VITE_CACHE_TTL_POSTS',
    'VITE_CACHE_TTL_POST',
    'VITE_CACHE_TTL_MEDIA',
    'VITE_API_TIMEOUT',
    'VITE_API_RETRY_ATTEMPTS',
    'VITE_API_RETRY_DELAY'
  ];
  
  // Check if .env.example exists
  checkFile('.env.example', '.env.example template');
  
  // Check required variables in example
  if (fs.existsSync(path.join(rootDir, '.env.example'))) {
    const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf8');
    
    requiredVars.forEach(varName => {
      if (envExample.includes(varName)) {
        log.success(`Required variable documented: ${varName}`);
      } else {
        log.error(`Required variable missing from .env.example: ${varName}`);
        errors++;
      }
    });
    
    optionalVars.forEach(varName => {
      if (envExample.includes(varName)) {
        log.success(`Optional variable documented: ${varName}`);
      } else {
        log.warning(`Optional variable missing from .env.example: ${varName}`);
        warnings++;
      }
    });
  }
}

function checkBuildOutput() {
  log.header('Build Output');
  
  // Check main build files
  checkFile('dist/index.html', 'Main HTML file');
  
  // Check for compressed files
  const distFiles = fs.readdirSync(path.join(rootDir, 'dist'), { recursive: true });
  const gzipFiles = distFiles.filter(file => file.endsWith('.gz'));
  const brotliFiles = distFiles.filter(file => file.endsWith('.br'));
  
  if (gzipFiles.length > 0) {
    log.success(`Gzip compression: ${gzipFiles.length} files`);
  } else {
    log.error('No Gzip compressed files found');
    errors++;
  }
  
  if (brotliFiles.length > 0) {
    log.success(`Brotli compression: ${brotliFiles.length} files`);
  } else {
    log.error('No Brotli compressed files found');
    errors++;
  }
  
  // Check chunk sizes
  const jsFiles = distFiles.filter(file => file.endsWith('.js') && !file.endsWith('.gz') && !file.endsWith('.br'));
  let totalJSSize = 0;
  
  jsFiles.forEach(file => {
    const filePath = path.join('dist', file);
    const size = checkFileSize(filePath, 500, `JS chunk ${file}`);
    totalJSSize += size;
  });
  
  if (totalJSSize <= 1000) {
    log.success(`Total JS size: ${totalJSSize}KB (limit: 1000KB)`);
  } else {
    log.warning(`Total JS size: ${totalJSSize}KB exceeds recommended limit of 1000KB`);
    warnings++;
  }
  
  // Check CSS files
  const cssFiles = distFiles.filter(file => file.endsWith('.css') && !file.endsWith('.gz') && !file.endsWith('.br'));
  cssFiles.forEach(file => {
    checkFileSize(path.join('dist', file), 100, `CSS file ${file}`);
  });
}

function checkStaticAssets() {
  log.header('Static Assets');
  
  const requiredAssets = [
    'dist/favicon.ico',
    'dist/logo.png',
    'dist/robots.txt'
  ];
  
  requiredAssets.forEach(asset => {
    checkFile(asset, 'Required asset');
  });
  
  // Check robots.txt content
  if (fs.existsSync(path.join(rootDir, 'dist/robots.txt'))) {
    const robotsContent = fs.readFileSync(path.join(rootDir, 'dist/robots.txt'), 'utf8');
    if (robotsContent.includes('Allow: /')) {
      log.success('robots.txt allows indexing');
    } else {
      log.warning('robots.txt may not allow proper indexing');
      warnings++;
    }
  }
}

function checkConfiguration() {
  log.header('Configuration Files');
  
  // Check package.json
  if (checkFile('package.json', 'Package configuration')) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
    
    // Check build script
    if (packageJson.scripts && packageJson.scripts.build) {
      log.success('Build script configured');
    } else {
      log.error('Build script missing from package.json');
      errors++;
    }
    
    // Check required dependencies
    const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'];
    requiredDeps.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        log.success(`Required dependency: ${dep}`);
      } else {
        log.error(`Required dependency missing: ${dep}`);
        errors++;
      }
    });
  }
  
  // Check Vite config
  checkFile('vite.config.ts', 'Vite configuration');
  
  // Check TypeScript config
  checkFile('tsconfig.json', 'TypeScript configuration');
  
  // Check Tailwind config
  checkFile('tailwind.config.js', 'Tailwind CSS configuration');
}

function checkBlogComponents() {
  log.header('Blog Components');
  
  const blogComponents = [
    'src/components/blog/PostCard.tsx',
    'src/components/blog/PostList.tsx',
    'src/components/blog/PostDetail.tsx',
    'src/components/blog/BlogLayout.tsx',
    'src/components/blog/SEO.tsx'
  ];
  
  blogComponents.forEach(component => {
    checkFile(component, 'Blog component');
  });
  
  const blogPages = [
    'src/pages/blog/PostListPage.tsx',
    'src/pages/blog/PostDetailPage.tsx'
  ];
  
  blogPages.forEach(page => {
    checkFile(page, 'Blog page');
  });
  
  const blogServices = [
    'src/services/wordpress.ts',
    'src/types/wordpress.ts',
    'src/config/wordpress.ts'
  ];
  
  blogServices.forEach(service => {
    checkFile(service, 'Blog service');
  });
}

function checkTests() {
  log.header('Test Coverage');
  
  const testFiles = [
    'src/test/integration/user-journeys.test.tsx',
    'src/test/integration/seo-verification.test.tsx',
    'src/test/seo-verification-checklist.md'
  ];
  
  testFiles.forEach(test => {
    checkFile(test, 'Test file');
  });
  
  // Check if test script exists
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  if (packageJson.scripts && packageJson.scripts.test) {
    log.success('Test script configured');
  } else {
    log.warning('Test script missing from package.json');
    warnings++;
  }
}

function checkDocumentation() {
  log.header('Documentation');
  
  const docs = [
    'PRODUCTION_DEPLOYMENT.md',
    'src/test/seo-verification-checklist.md'
  ];
  
  docs.forEach(doc => {
    checkFile(doc, 'Documentation');
  });
}

function printSummary() {
  log.header('Validation Summary');
  
  if (errors === 0 && warnings === 0) {
    log.success('🎉 All checks passed! Ready for production deployment.');
  } else if (errors === 0) {
    log.warning(`⚠️  ${warnings} warning(s) found. Review before deployment.`);
  } else {
    log.error(`❌ ${errors} error(s) and ${warnings} warning(s) found. Fix before deployment.`);
  }
  
  console.log(`\nErrors: ${errors}`);
  console.log(`Warnings: ${warnings}`);
  
  if (errors > 0) {
    process.exit(1);
  }
}

// Run all checks
async function main() {
  console.log(`${colors.bold}${colors.blue}🚀 Production Validation${colors.reset}\n`);
  
  checkEnvironmentVariables();
  checkBuildOutput();
  checkStaticAssets();
  checkConfiguration();
  checkBlogComponents();
  checkTests();
  checkDocumentation();
  
  printSummary();
}

main().catch(console.error);