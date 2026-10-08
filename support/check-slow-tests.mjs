// Flags slow test files in CI. Reads the vitest JSON report the test job
// wrote, compares it against the latest report from main, and exits 1 if
// anything is slow. The workflow step is `continue-on-error`, so that shows as
// a warning on the run rather than blocking the merge.
//
// Without main's report there's nothing to tell a new slow file from one
// that's always been slow, so it lists files over the floor but passes. A
// warning people learn to ignore is worse than none.
//
// Usage: node support/check-slow-tests.mjs <vitest.json> [main's vitest.json]
import fs from 'fs';

import {
  FILE_FLOOR_MS,
  FILE_REGRESSION_FACTOR,
  RUN_REGRESSION_FACTOR,
  findSlowFiles,
  findSlowRun,
} from './slow-tests.mjs';

const [reportPath, baselinePath] = process.argv.slice(2);
if (!reportPath) {
  console.error(
    'Usage: node support/check-slow-tests.mjs <vitest.json> [baseline.json]',
  );
  process.exit(2);
}

const current = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const baseline = readBaseline(baselinePath);

const seconds = ms => `${(ms / 1000).toFixed(1)}s`;

const slowFiles = findSlowFiles(current, baseline);
const slowRun = findSlowRun(current, baseline);

if (slowFiles.length > 0) {
  console.log(`Slow test files (${slowFiles.length}):\n`);
  for (const { file, ms, mainMs } of slowFiles) {
    const onMain =
      mainMs !== undefined
        ? ` (${seconds(mainMs)} on main)`
        : baseline
          ? ' (new)'
          : '';
    console.log(`  ${seconds(ms).padStart(6)}  ${file}${onMain}`);
    annotate(`${file} took ${seconds(ms)}${onMain}`);
  }
  console.log('');
}

if (slowRun) {
  const message = `The whole run took ${seconds(slowRun.ms)}, against ${seconds(slowRun.mainMs)} on main.`;
  console.log(`${message}\n`);
  annotate(message);
}

if (!baseline) {
  console.log(
    slowFiles.length > 0
      ? `No report from main to compare against, so these are only the files over ${seconds(FILE_FLOOR_MS)}, not a warning.`
      : 'No slow test files (no report from main to compare against, so only the floor was checked).',
  );
  process.exit(0);
}

if (slowFiles.length > 0 || slowRun) {
  console.log(
    `A file is flagged when it's over ${seconds(FILE_FLOOR_MS)} and either new or ${FILE_REGRESSION_FACTOR}x slower than on main. ` +
      `The run is flagged at ${RUN_REGRESSION_FACTOR}x main. ` +
      `CI timings are noisy, so rerun the test job before digging in.`,
  );
  process.exit(1);
}

console.log('No slow test files.');

/**
 * Main's report, or null when there isn't one to read (first run after this
 * lands, expired artifacts, running outside CI).
 */
function readBaseline(path) {
  if (!path || !fs.existsSync(path)) return null;
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch (error) {
    console.log(`Couldn't read main's report: ${error}`);
    return null;
  }
}

/** A workflow annotation, so the warning shows on the run summary. */
function annotate(message) {
  if (process.env.GITHUB_ACTIONS) console.log(`::warning::${message}`);
}
