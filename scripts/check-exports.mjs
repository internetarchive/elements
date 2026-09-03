/**
 * Checks that every element can actually be imported by the subpath consumers use,
 * ie `@internetarchive/elements/ia-button/ia-button`.
 *
 * The exports map sends those subpaths into `dist`, so a source file that never got
 * built, or an exports pattern that points at the wrong place, leaves an element that
 * looks fine in the repo but can't be imported from the published package.
 */
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

/**
 * Resolves a subpath through the package's exports map the way Node does.
 * Node picks the most specific matching pattern (longest prefix before the `*`),
 * so `./labs/*` wins over `./*` regardless of the order they're declared in.
 */
function resolveExport(subpath) {
  const matches = Object.entries(pkg.exports)
    .filter(([pattern]) => pattern.includes('*'))
    .map(([pattern, target]) => ({ ...splitPattern(pattern), target }))
    .filter(
      ({ prefix, suffix }) =>
        subpath.startsWith(prefix) && subpath.endsWith(suffix),
    )
    .sort((a, b) => b.prefix.length - a.prefix.length);

  const best = matches[0];
  if (!best) return null;

  const wildcard = subpath.slice(
    best.prefix.length,
    subpath.length - best.suffix.length,
  );
  return best.target.replace('*', wildcard);
}

function splitPattern(pattern) {
  const [prefix, suffix] = pattern.split('*');
  return { prefix, suffix };
}

/** Every element directory under `dir` that has a matching entry file. */
function elementsIn(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => existsSync(join(dir, entry.name, `${entry.name}.ts`)))
    .map((entry) => entry.name);
}

const subpaths = [
  ...elementsIn('src/elements').map((name) => `./${name}/${name}`),
  ...elementsIn('src/labs').map((name) => `./labs/${name}/${name}`),
];

const problems = [];
for (const subpath of subpaths) {
  const target = resolveExport(subpath);
  if (!target) {
    problems.push(`${subpath} is not covered by any exports pattern`);
    continue;
  }
  for (const file of [target, target.replace(/\.js$/, '.d.ts')]) {
    if (!existsSync(file))
      problems.push(`${subpath} resolves to ${file}, which does not exist`);
  }
}

if (problems.length) {
  console.error('Broken element exports:');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`All ${subpaths.length} element exports resolve.`);
