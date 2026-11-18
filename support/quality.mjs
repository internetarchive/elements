#!/usr/bin/env node
// Code quality ratchet. Measures a few numbers, compares them to
// quality-baseline.json, and fails if any got worse or if the baseline is
// looser than reality (so the baseline only ever tightens).
//
//   node support/quality.mjs            check against the baseline
//   node support/quality.mjs --update   rewrite the baseline with today's numbers
//
// On a PR, set BASE_REF to the PR's base branch. The summary then says whether
// the PR improved at least one metric (goal met), which is non-blocking.
// The summary is written to $GITHUB_STEP_SUMMARY when set, and always to stdout.

import { execFileSync } from 'node:child_process';
import {
  appendFileSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const BASELINE = 'quality-baseline.json';

// Lower is better for every metric.
const METRICS = {
  eslintErrors: 'ESLint errors',
  eslintWarnings: 'ESLint warnings (includes complexity and size limits)',
  anyTypes: 'Explicit `any` types',
  tsDirectives: '@ts-ignore / @ts-expect-error / @ts-nocheck',
  eslintDisables: 'eslint-disable comments',
  duplicationPercent: 'Duplicated lines (%)',
};

const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
    ...opts,
  });

const isGenerated = (f) =>
  (f.startsWith('src/locales/') && !f.endsWith('.test.ts')) ||
  f.startsWith('src/icons/');

function trackedTsFiles() {
  return sh('git', ['ls-files', '*.ts'])
    .split('\n')
    .filter((f) => f && !f.endsWith('.d.ts') && !isGenerated(f));
}

function runEslint() {
  // eslint exits 1 when there are errors, but the JSON is still on stdout.
  let out;
  try {
    out = sh('npx', ['eslint', '.', '-f', 'json']);
  } catch (e) {
    if (!e.stdout) throw e;
    out = e.stdout;
  }
  return JSON.parse(out);
}

function countLoose(files) {
  let tsDirectives = 0;
  let eslintDisables = 0;
  const hits = {};
  for (const f of files) {
    const lines = readFileSync(f, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (/@ts-(ignore|expect-error|nocheck)\b/.test(line)) {
        tsDirectives++;
        (hits[f] ??= []).push(`${f}:${i + 1} ts directive`);
      }
      if (/eslint-disable/.test(line)) {
        eslintDisables++;
        (hits[f] ??= []).push(`${f}:${i + 1} eslint-disable`);
      }
    });
  }
  return { tsDirectives, eslintDisables, hits };
}

function duplication() {
  const dir = mkdtempSync(path.join(tmpdir(), 'jscpd-'));
  try {
    sh('npx', [
      'jscpd',
      'src',
      'demo',
      '--format',
      'typescript',
      '--ignore',
      '**/*.test.ts,**/*.d.ts,src/locales/**,src/icons/**',
      '--reporters',
      'json',
      '--output',
      dir,
      '--silent',
    ]);
    const report = JSON.parse(
      readFileSync(path.join(dir, 'jscpd-report.json')),
    );
    return Number(report.statistics.total.percentage.toFixed(2));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function measure() {
  const eslint = runEslint();
  const files = trackedTsFiles();
  const loose = countLoose(files);
  const sum = (key) => eslint.reduce((n, f) => n + f[key], 0);
  const anyTypes = eslint.reduce(
    (n, f) =>
      n +
      f.messages.filter(
        (m) => m.ruleId === '@typescript-eslint/no-explicit-any',
      ).length,
    0,
  );
  const metrics = {
    eslintErrors: sum('errorCount'),
    eslintWarnings: sum('warningCount'),
    anyTypes,
    tsDirectives: loose.tsDirectives,
    eslintDisables: loose.eslintDisables,
    duplicationPercent: duplication(),
  };
  return { metrics, eslint, loose };
}

function changedFiles(baseRef) {
  try {
    return sh('git', ['diff', '--name-only', `origin/${baseRef}`, 'HEAD'])
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

function baseBaseline(baseRef) {
  try {
    sh('git', ['fetch', '--quiet', '--depth=1', 'origin', baseRef]);
    return JSON.parse(
      sh('git', ['show', `origin/${baseRef}:${BASELINE}`], {
        stdio: ['ignore', 'pipe', 'ignore'],
      }),
    );
  } catch {
    return null;
  }
}

function easyWins(eslint, loose, changed) {
  const wins = [];
  const root = process.cwd() + path.sep;
  for (const f of eslint) {
    const rel = f.filePath.replace(root, '');
    if (!changed.includes(rel)) continue;
    for (const m of f.messages) {
      if (m.severity === 1) {
        wins.push(`${rel}:${m.line} ${m.ruleId} (${m.message})`);
      }
    }
  }
  for (const f of changed) wins.push(...(loose.hits[f] ?? []));
  return wins.slice(0, 5);
}

const update = process.argv.includes('--update');
const { metrics, eslint, loose } = measure();

if (update) {
  writeFileSync(BASELINE, JSON.stringify(metrics, null, 2) + '\n');
  console.log(`Wrote ${BASELINE}:\n${JSON.stringify(metrics, null, 2)}`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));
const worse = [];
const looser = [];
const rows = [];
for (const [key, label] of Object.entries(METRICS)) {
  const was = baseline[key];
  const now = metrics[key];
  let status = 'same';
  if (now > was) {
    status = 'worse';
    worse.push(key);
  } else if (now < was) {
    status = 'baseline is looser';
    looser.push(key);
  }
  rows.push(`| ${label} | ${was} | ${now} | ${status} |`);
}

const out = [
  '## Code quality',
  '',
  '| Metric | Baseline | Now | |',
  '| --- | --- | --- | --- |',
  ...rows,
  '',
];

if (worse.length) {
  out.push(
    `Blocking: ${worse.map((k) => METRICS[k]).join(', ')} got worse than the baseline. Bring it back to the baseline or lower.`,
    '',
  );
}
if (looser.length) {
  out.push(
    `Blocking: ${looser.map((k) => METRICS[k]).join(', ')} improved but ${BASELINE} wasn't updated. Run \`pnpm run quality:baseline\` and commit the result.`,
    '',
  );
}

const baseRef = process.env.BASE_REF;
if (baseRef) {
  const base = baseBaseline(baseRef);
  if (base) {
    const improved = Object.keys(METRICS).filter((k) => baseline[k] < base[k]);
    if (improved.length) {
      out.push(
        `Goal met: this PR improved ${improved.map((k) => METRICS[k]).join(', ')}.`,
        '',
      );
    } else {
      out.push(
        'Goal not met (not blocking): each PR should improve at least one number. Pick one, fix it, then run `pnpm run quality:baseline`.',
        '',
      );
      const wins = easyWins(eslint, loose, changedFiles(baseRef));
      if (wins.length) {
        out.push(
          'Easy wins in files this PR already touches:',
          ...wins.map((w) => `- ${w}`),
          '',
        );
      }
    }
  }
}

const text = out.join('\n');
console.log(text);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, text + '\n');
}
process.exit(worse.length || looser.length ? 1 : 0);
