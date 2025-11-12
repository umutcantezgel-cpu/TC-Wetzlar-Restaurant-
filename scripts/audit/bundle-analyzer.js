#!/usr/bin/env node
/**
 * Bundle Analyzer
 * Analyzes JS/CSS bundle sizes and checks against budgets
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import { gzipSync } from 'zlib';

const DIST_DIR = './dist';
const BUDGETS = {
  js: 35 * 1024, // 35 KB
  css: 45 * 1024, // 45 KB
};

function getFileSize(filePath) {
  const content = readFileSync(filePath);
  const gzipped = gzipSync(content);

  return {
    raw: content.length,
    gzip: gzipped.length,
  };
}

function findAssets(dir, ext, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findAssets(filePath, ext, fileList);
    } else if (file.endsWith(ext)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

console.log('📦 Analyzing bundle sizes...\n');

const results = {
  timestamp: new Date().toISOString(),
  budgets: BUDGETS,
  bundles: {
    js: [],
    css: [],
  },
  summary: {
    js: { total: 0, gzip: 0, count: 0, exceeded: false },
    css: { total: 0, gzip: 0, count: 0, exceeded: false },
  },
};

// Analyze JavaScript
const jsFiles = findAssets(DIST_DIR, '.js');
jsFiles.forEach((file) => {
  const size = getFileSize(file);
  results.bundles.js.push({
    file: file.replace(DIST_DIR, ''),
    raw: size.raw,
    gzip: size.gzip,
  });
  results.summary.js.total += size.raw;
  results.summary.js.gzip += size.gzip;
  results.summary.js.count++;
});

// Analyze CSS
const cssFiles = findAssets(DIST_DIR, '.css');
cssFiles.forEach((file) => {
  const size = getFileSize(file);
  results.bundles.css.push({
    file: file.replace(DIST_DIR, ''),
    raw: size.raw,
    gzip: size.gzip,
  });
  results.summary.css.total += size.raw;
  results.summary.css.gzip += size.gzip;
  results.summary.css.count++;
});

// Check budgets
results.summary.js.exceeded = results.summary.js.gzip > BUDGETS.js;
results.summary.css.exceeded = results.summary.css.gzip > BUDGETS.css;

// Output
console.log('📊 JavaScript Bundles:');
console.log(`   Count: ${results.summary.js.count}`);
console.log(`   Total (gzip): ${(results.summary.js.gzip / 1024).toFixed(2)} KB`);
console.log(`   Budget: ${(BUDGETS.js / 1024).toFixed(2)} KB`);
console.log(
  `   Status: ${results.summary.js.exceeded ? '❌ EXCEEDED' : '✅ Within budget'}`
);

console.log('\n📊 CSS Bundles:');
console.log(`   Count: ${results.summary.css.count}`);
console.log(`   Total (gzip): ${(results.summary.css.gzip / 1024).toFixed(2)} KB`);
console.log(`   Budget: ${(BUDGETS.css / 1024).toFixed(2)} KB`);
console.log(
  `   Status: ${results.summary.css.exceeded ? '❌ EXCEEDED' : '✅ Within budget'}`
);

// Write report
const reportPath = './docs/reports/audit/bundle-analysis.json';
writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n📄 Report written to ${reportPath}`);

if (results.summary.js.exceeded || results.summary.css.exceeded) {
  console.log('\n❌ Budget exceeded!');
  process.exit(1);
} else {
  console.log('\n✅ All budgets met!');
  process.exit(0);
}
