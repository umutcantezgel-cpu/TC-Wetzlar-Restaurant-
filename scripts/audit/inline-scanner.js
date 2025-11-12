#!/usr/bin/env node
/**
 * No-Inline Scanner
 * Scans HTML output for inline scripts/styles (CSP violation detector)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = './dist';

function findHTMLFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findHTMLFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function scanFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const violations = [];

  // Check for inline scripts
  const scriptMatches = content.match(/<script(?![^>]*src=)[^>]*>/gi);
  if (scriptMatches) {
    violations.push({
      type: 'inline-script',
      count: scriptMatches.length,
      examples: scriptMatches.slice(0, 3),
    });
  }

  // Check for inline styles
  const styleMatches = content.match(/<style[^>]*>/gi);
  if (styleMatches) {
    violations.push({
      type: 'inline-style',
      count: styleMatches.length,
      examples: styleMatches.slice(0, 3),
    });
  }

  // Check for style attributes
  const styleAttrMatches = content.match(/\sstyle="/gi);
  if (styleAttrMatches) {
    violations.push({
      type: 'style-attribute',
      count: styleAttrMatches.length,
      note: 'Inline style attributes detected',
    });
  }

  // Check for event handlers
  const eventHandlerMatches = content.match(/\son\w+="/gi);
  if (eventHandlerMatches) {
    violations.push({
      type: 'inline-event-handler',
      count: eventHandlerMatches.length,
      examples: eventHandlerMatches.slice(0, 3),
    });
  }

  return violations;
}

console.log('🔍 Scanning for inline scripts/styles (CSP violations)...\n');

const htmlFiles = findHTMLFiles(DIST_DIR);
let totalViolations = 0;
const results = {};

htmlFiles.forEach((file) => {
  const violations = scanFile(file);

  if (violations.length > 0) {
    results[file] = violations;
    totalViolations += violations.reduce((sum, v) => sum + v.count, 0);

    console.log(`❌ ${file}:`);
    violations.forEach((v) => {
      console.log(`   - ${v.type}: ${v.count} found`);
    });
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Files scanned: ${htmlFiles.length}`);
console.log(`   Total violations: ${totalViolations}`);

if (totalViolations === 0) {
  console.log(`\n✅ No inline scripts/styles found - CSP-strict ready!`);
  process.exit(0);
} else {
  console.log(`\n❌ Inline content detected - CSP will be violated!`);
  console.log(`\nViolations by file:`);
  console.log(JSON.stringify(results, null, 2));
  process.exit(1);
}
