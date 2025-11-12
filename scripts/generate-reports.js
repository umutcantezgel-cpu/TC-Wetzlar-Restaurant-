#!/usr/bin/env node
/**
 * Report Generator
 * Collects all test reports into docs/reports/
 */

import { mkdirSync, existsSync } from 'fs';

console.log('📊 Generating reports...\n');

// Create report directories if they don't exist
const reportDirs = [
  './docs/reports',
  './docs/reports/lighthouse',
  './docs/reports/a11y',
  './docs/reports/security',
  './docs/reports/performance',
];

reportDirs.forEach((dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

console.log('\n✅ Report structure created');
console.log('📝 Note: Run individual test commands to generate reports');
console.log('   - npm run lhci (Lighthouse)');
console.log('   - npm run a11y (Accessibility)');
console.log('   - npm run security (Security)');

process.exit(0);
