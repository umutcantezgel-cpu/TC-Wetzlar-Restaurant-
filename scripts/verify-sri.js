#!/usr/bin/env node
/**
 * SRI Verification Script
 * Verifies that all required files have SRI hashes
 */

import { readFileSync, existsSync } from 'fs';

const MANIFEST_FILE = './public/integrity.manifest.json';
const REQUIRED_COVERAGE = 100; // Percentage

/**
 * Main verification function
 */
function verifySRI() {
  console.log('🔍 Verifying SRI coverage...\n');

  // Check if manifest exists
  if (!existsSync(MANIFEST_FILE)) {
    console.error('❌ Integrity manifest not found. Run npm run sri:gen first.');
    process.exit(1);
  }

  // Load manifest
  const manifest = JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8'));

  const totalFiles = Object.keys(manifest.files).length;

  console.log(`📊 SRI Manifest Statistics:`);
  console.log(`   Generated: ${manifest.generated}`);
  console.log(`   Algorithm: ${manifest.algorithm}`);
  console.log(`   Total files: ${totalFiles}`);

  // Verify each file has integrity hash
  let validCount = 0;
  let invalidCount = 0;

  Object.entries(manifest.files).forEach(([path, data]) => {
    if (data.integrity && data.integrity.startsWith(`${manifest.algorithm}-`)) {
      validCount++;
    } else {
      console.error(`❌ Invalid integrity for: ${path}`);
      invalidCount++;
    }
  });

  const coverage = totalFiles > 0 ? (validCount / totalFiles) * 100 : 0;

  console.log(`\n📈 Coverage:`);
  console.log(`   Valid: ${validCount}`);
  console.log(`   Invalid: ${invalidCount}`);
  console.log(`   Coverage: ${coverage.toFixed(2)}%`);
  console.log(`   Required: ${REQUIRED_COVERAGE}%`);

  // Check if coverage meets requirement
  if (coverage < REQUIRED_COVERAGE) {
    console.error(`\n❌ SRI coverage (${coverage.toFixed(2)}%) below required ${REQUIRED_COVERAGE}%`);
    process.exit(1);
  }

  console.log(`\n✅ SRI verification passed!`);
}

// Run
try {
  verifySRI();
} catch (error) {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
}
