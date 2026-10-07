/**
 * Keeps the per-element short import paths in package.json's `exports` in
 * step with the folders under `src/elements` and `src/labs`.
 *
 * A folder `ia-foobar` whose main file is `ia-foobar/ia-foobar.ts` gets
 *
 *   "./ia-foobar": "./dist/src/elements/ia-foobar/ia-foobar.js"
 *
 * so `@internetarchive/elements/ia-foobar` resolves. Node and bundlers pick an
 * exact key over a pattern, so the wildcards stay and
 * `@internetarchive/elements/ia-foobar/ia-foobar` keeps working, as do the
 * other files in the folder. A folder with no file named after it, like
 * `ia-donation-form`, has no short path and is reachable by its deep paths only.
 *
 * `node scripts/build-exports.mts` rewrites package.json.
 * `node scripts/build-exports.mts --check` exits 1 if it is out of date.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const PACKAGE_JSON = new URL('../package.json', import.meta.url);

const GROUPS = [
  { source: 'src/elements', prefix: './' },
  { source: 'src/labs', prefix: './labs/' },
];

const WILDCARDS = {
  './*': './dist/src/elements/*.js',
  './labs/*': './dist/src/labs/*.js',
  './locales/*.js': './dist/src/locales/*.js',
};

function shortExports(): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const { source, prefix } of GROUPS) {
    const folders = readdirSync(new URL(`../${source}`, import.meta.url), {
      withFileTypes: true,
    })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
    for (const name of folders) {
      const main = new URL(`../${source}/${name}/${name}.ts`, import.meta.url);
      if (existsSync(main)) {
        entries[`${prefix}${name}`] = `./dist/${source}/${name}/${name}.js`;
      }
    }
  }
  return entries;
}

const raw = readFileSync(PACKAGE_JSON, 'utf8');
const pkg = JSON.parse(raw);
pkg.exports = { ...shortExports(), ...WILDCARDS };
const next = `${JSON.stringify(pkg, null, 2)}\n`;

if (process.argv.includes('--check')) {
  if (next !== raw) {
    console.error(
      'package.json "exports" is out of date. Run `pnpm run exports` and commit the result.',
    );
    process.exit(1);
  }
} else if (next !== raw) {
  writeFileSync(PACKAGE_JSON, next);
  console.log('Updated package.json "exports".');
}
