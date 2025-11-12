#!/usr/bin/env node
/**
 * SRI (Subresource Integrity) Generator
 * Generates integrity hashes for CSS, JS, and WOFF2 files
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ALGORITHM = 'sha384';
const DIST_DIR = './dist';
const OUTPUT_FILE = './public/integrity.manifest.json';

/**
 * Generate SRI hash for a file
 */
function generateSRIHash(filePath) {
  try {
    const content = readFileSync(filePath);
    const hash = createHash(ALGORITHM).update(content).digest('base64');
    return `${ALGORITHM}-${hash}`;
  } catch (error) {
    console.error(`Error generating hash for ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Recursively find files with specific extensions
 */
function findFiles(dir, extensions, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findFiles(filePath, extensions, fileList);
    } else if (extensions.includes(extname(file))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Main function
 */
function generateIntegrityManifest() {
  console.log('🔐 Generating SRI hashes...\n');

  const extensions = ['.css', '.js', '.woff2'];
  const files = findFiles(DIST_DIR, extensions);

  const manifest = {
    generated: new Date().toISOString(),
    algorithm: ALGORITHM,
    files: {},
  };

  let successCount = 0;
  let errorCount = 0;

  files.forEach((filePath) => {
    const relativePath = filePath.replace(DIST_DIR, '');
    const hash = generateSRIHash(filePath);

    if (hash) {
      manifest.files[relativePath] = {
        integrity: hash,
        type: extname(filePath).slice(1),
      };
      console.log(`✓ ${relativePath}`);
      successCount++;
    } else {
      console.error(`✗ ${relativePath}`);
      errorCount++;
    }
  });

  // Write manifest
  writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(`\n📊 Summary:`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Coverage: ${successCount > 0 ? ((successCount / (successCount + errorCount)) * 100).toFixed(2) : 0}%`);
  console.log(`\n✅ Integrity manifest written to ${OUTPUT_FILE}`);

  // Exit with error if any files failed
  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run
try {
  generateIntegrityManifest();
} catch (error) {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
}
