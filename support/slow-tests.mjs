// Compares a vitest JSON report against a baseline report (the latest one
// from main) and picks out the test files that are slow enough to flag.
//
// Per-file CI timings swing a lot between runs, since every file shares one
// runner. So a file is only flagged when it's both over an absolute floor AND
// at least twice as slow as on main. A file main doesn't have yet (a new test
// file) only has to clear the floor.

/** A file under this is never flagged, however much slower than main. */
export const FILE_FLOOR_MS = 3000;

/** How much slower than main a file has to be before it's flagged. */
export const FILE_REGRESSION_FACTOR = 2;

/** How much slower than main the whole run has to be before it's flagged. */
export const RUN_REGRESSION_FACTOR = 1.5;

/**
 * Report paths are absolute to wherever the run happened, so key files by
 * their path from `src/` or `demo/` on.
 */
export function relativeTestPath(name) {
  const match = name.match(/\/((?:src|demo)\/.*)$/);
  return match ? match[1] : name;
}

/** Map of test file path to wall time in ms. */
export function fileDurations(report) {
  const durations = new Map();
  for (const result of report.testResults ?? []) {
    durations.set(
      relativeTestPath(result.name),
      result.endTime - result.startTime,
    );
  }
  return durations;
}

/** Wall time of the whole run in ms, from start to the last file finishing. */
export function runDuration(report) {
  const ends = (report.testResults ?? []).map(result => result.endTime);
  if (ends.length === 0) return 0;
  return Math.max(...ends) - report.startTime;
}

/**
 * Test files to flag, slowest first. `baseline` may be null (no report from
 * main to compare against), in which case every file over the floor counts.
 */
export function findSlowFiles(current, baseline) {
  const baselineDurations = baseline ? fileDurations(baseline) : new Map();
  const slow = [];
  for (const [file, ms] of fileDurations(current)) {
    const mainMs = baselineDurations.get(file);
    if (ms <= FILE_FLOOR_MS) continue;
    const isNew = mainMs === undefined;
    const regressed = !isNew && ms > mainMs * FILE_REGRESSION_FACTOR;
    if (isNew || regressed) {
      slow.push({ file, ms, mainMs });
    }
  }
  return slow.sort((a, b) => b.ms - a.ms);
}

/**
 * The whole run's time against main's, when it's slower than main by more
 * than RUN_REGRESSION_FACTOR. Null when it isn't, or there's no baseline.
 */
export function findSlowRun(current, baseline) {
  if (!baseline) return null;
  const ms = runDuration(current);
  const mainMs = runDuration(baseline);
  if (mainMs <= 0 || ms <= mainMs * RUN_REGRESSION_FACTOR) return null;
  return { ms, mainMs };
}
