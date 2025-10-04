#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * 
 * This script analyzes the build output and provides insights into bundle size,
 * chunk distribution, and optimization opportunities.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log('🔍 Analyzing bundle...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const stats = {
    totalSize: 0,
    jsFiles: [],
    cssFiles: [],
    imageFiles: [],
    otherFiles: []
  };

  function analyzeDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        analyzeDirectory(filePath, prefix + file + '/');
      } else {
        const size = stat.size;
        stats.totalSize += size;
        
        const fileInfo = {
          name: prefix + file,
          size: size,
          formattedSize: formatBytes(size)
        };
        
        if (file.endsWith('.js')) {
          stats.jsFiles.push(fileInfo);
        } else if (file.endsWith('.css')) {
          stats.cssFiles.push(fileInfo);
        } else if (/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(file)) {
          stats.imageFiles.push(fileInfo);
        } else {
          stats.otherFiles.push(fileInfo);
        }
      }
    });
  }

  analyzeDirectory(DIST_DIR);

  // Sort files by size (largest first)
  stats.jsFiles.sort((a, b) => b.size - a.size);
  stats.cssFiles.sort((a, b) => b.size - a.size);
  stats.imageFiles.sort((a, b) => b.size - a.size);

  // Display results
  console.log(`📊 Bundle Analysis Results`);
  console.log(`${'='.repeat(50)}\n`);
  
  console.log(`📦 Total Bundle Size: ${formatBytes(stats.totalSize)}\n`);

  // JavaScript files
  if (stats.jsFiles.length > 0) {
    console.log(`🟨 JavaScript Files (${stats.jsFiles.length}):`);
    stats.jsFiles.forEach(file => {
      const isLarge = file.size > 100 * 1024; // 100KB
      const icon = isLarge ? '⚠️ ' : '✅ ';
      console.log(`  ${icon}${file.name}: ${file.formattedSize}`);
    });
    console.log();
  }

  // CSS files
  if (stats.cssFiles.length > 0) {
    console.log(`🟦 CSS Files (${stats.cssFiles.length}):`);
    stats.cssFiles.forEach(file => {
      const isLarge = file.size > 50 * 1024; // 50KB
      const icon = isLarge ? '⚠️ ' : '✅ ';
      console.log(`  ${icon}${file.name}: ${file.formattedSize}`);
    });
    console.log();
  }

  // Image files
  if (stats.imageFiles.length > 0) {
    console.log(`🖼️  Image Files (${stats.imageFiles.length}):`);
    stats.imageFiles.forEach(file => {
      const isLarge = file.size > 200 * 1024; // 200KB
      const icon = isLarge ? '⚠️ ' : '✅ ';
      console.log(`  ${icon}${file.name}: ${file.formattedSize}`);
    });
    console.log();
  }

  // Performance recommendations
  console.log(`💡 Optimization Recommendations:`);
  console.log(`${'='.repeat(50)}`);
  
  const largeJsFiles = stats.jsFiles.filter(f => f.size > 100 * 1024);
  const largeCssFiles = stats.cssFiles.filter(f => f.size > 50 * 1024);
  const largeImages = stats.imageFiles.filter(f => f.size > 200 * 1024);
  
  if (largeJsFiles.length === 0 && largeCssFiles.length === 0 && largeImages.length === 0) {
    console.log('✅ All files are within recommended size limits!');
  } else {
    if (largeJsFiles.length > 0) {
      console.log(`⚠️  Large JavaScript files detected (${largeJsFiles.length})`);
      console.log('   Consider further code splitting or lazy loading');
    }
    if (largeCssFiles.length > 0) {
      console.log(`⚠️  Large CSS files detected (${largeCssFiles.length})`);
      console.log('   Consider CSS code splitting or unused CSS removal');
    }
    if (largeImages.length > 0) {
      console.log(`⚠️  Large image files detected (${largeImages.length})`);
      console.log('   Consider image optimization or WebP conversion');
    }
  }

  // Bundle size targets
  const totalSizeKB = stats.totalSize / 1024;
  console.log(`\n📏 Size Analysis:`);
  console.log(`   Total: ${formatBytes(stats.totalSize)} ${totalSizeKB > 500 ? '⚠️' : '✅'}`);
  console.log(`   Target: < 500 KB (recommended for good performance)`);
  
  if (totalSizeKB > 500) {
    console.log(`\n🚨 Bundle size exceeds recommended limit!`);
    console.log(`   Consider implementing additional optimizations.`);
  } else {
    console.log(`\n🎉 Bundle size is within recommended limits!`);
  }
}

// Run analysis
try {
  analyzeBundle();
} catch (error) {
  console.error('❌ Error analyzing bundle:', error.message);
  process.exit(1);
}