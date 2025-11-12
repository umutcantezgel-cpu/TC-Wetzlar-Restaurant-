#!/usr/bin/env node
/**
 * Comprehensive Audit Runner
 * Executes all audit scripts and generates summary report
 */

import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

console.log('🔍 Running comprehensive audit suite...\n');

const REPORTS_DIR = './docs/reports/audit';

// Ensure reports directory exists
if (!existsSync(REPORTS_DIR)) {
  mkdirSync(REPORTS_DIR, { recursive: true });
}

const audits = [
  {
    name: 'Bundle Analysis',
    command: 'npm run audit:bundle',
    optional: true,
  },
  {
    name: 'Asset Profile',
    command: 'npm run audit:assets',
    optional: true,
  },
  {
    name: 'Security Headers',
    command: 'npm run audit:security',
    optional: false,
  },
  {
    name: 'No Inline Scripts/Styles',
    command: 'npm run audit:inline',
    optional: false,
  },
  {
    name: 'Accessibility',
    command: 'npm run a11y',
    optional: true,
  },
];

const results = {
  timestamp: new Date().toISOString(),
  audits: {},
  summary: {
    total: audits.length,
    passed: 0,
    failed: 0,
    skipped: 0,
  },
};

for (const audit of audits) {
  console.log(`\n📊 Running: ${audit.name}...`);

  try {
    const output = execSync(audit.command, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    results.audits[audit.name] = {
      status: 'passed',
      output: output.substring(0, 500), // Truncate
    };
    results.summary.passed++;
    console.log(`✅ ${audit.name} passed`);
  } catch (error) {
    if (audit.optional) {
      results.audits[audit.name] = {
        status: 'skipped',
        reason: 'Optional audit not available',
      };
      results.summary.skipped++;
      console.log(`⚠️  ${audit.name} skipped (optional)`);
    } else {
      results.audits[audit.name] = {
        status: 'failed',
        error: error.message.substring(0, 500),
      };
      results.summary.failed++;
      console.log(`❌ ${audit.name} failed`);
    }
  }
}

// Write results
const reportPath = `${REPORTS_DIR}/audit-results.json`;
writeFileSync(reportPath, JSON.stringify(results, null, 2));

console.log(`\n📊 Audit Summary:`);
console.log(`   Total: ${results.summary.total}`);
console.log(`   Passed: ${results.summary.passed}`);
console.log(`   Failed: ${results.summary.failed}`);
console.log(`   Skipped: ${results.summary.skipped}`);
console.log(`\n✅ Report written to ${reportPath}`);

process.exit(results.summary.failed > 0 ? 1 : 0);
