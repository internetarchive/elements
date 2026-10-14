/**
 * Lints the SVG sources in `icons/` (or the directory given as the first
 * argument, or in `ICONS_DIR`). Every problem in every icon is printed as
 * `icons/<file>: <problem and fix>`, and the exit code is 1 if there were any.
 *
 * Rules, per icon:
 *
 * - The root `<svg>` has a `viewBox` and no `width` or `height`. The build
 *   sets the size itself.
 * - Colors are `currentColor`. A `fill`, `stroke`, `stop-color`, `flood-color`
 *   or `lighting-color` (attribute, inline `style` or `<style>` block) may
 *   only be `none`, `currentColor`, `inherit` or a `url(#...)` reference.
 * - No `<script>`, `on*` handler attributes, `<foreignObject>` or `href`
 *   that doesn't start with `#`.
 * - No `id` attributes, because icons are inlined into pages where ids from
 *   different icons would collide.
 *
 * Icons named in `icons/.multicolor` (one name per line, `#` starts a comment)
 * are exempt from the color rule and the id rule, so a logo can carry its
 * brand colors and the gradients that need an id. They are still checked for
 * everything else.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAttributes, stripPrologue } from './icon-source.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = resolve(
  process.argv[2] ?? process.env.ICONS_DIR ?? join(root, 'icons'),
);

const COLOR_PROPERTIES = new Set([
  'fill',
  'stroke',
  'stop-color',
  'flood-color',
  'lighting-color',
]);
const ALLOWED_COLORS = new Set(['none', 'currentcolor', 'inherit']);

const TAG = /<([a-zA-Z][\w:.-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;

const problems: string[] = [];

function report(file: string, message: string): void {
  problems.push(`icons/${file}: ${message}`);
}

function isAllowedColor(value: string): boolean {
  const v = value.trim().toLowerCase();
  return ALLOWED_COLORS.has(v) || /^url\(\s*['"]?#[^)]+\)$/.test(v);
}

/** The `property: value` pairs of a style attribute or `<style>` body. */
function declarations(css: string): [string, string][] {
  return [...css.matchAll(/([a-z-]+)\s*:\s*([^;}]+)/gi)].map((match) => [
    match[1].toLowerCase(),
    match[2],
  ]);
}

function lintColors(file: string, source: string): void {
  const flag = (where: string, property: string, value: string): void =>
    report(
      file,
      `${where} ${property}="${value.trim()}" is not a theme color. Use currentColor (or none), or list the icon in icons/.multicolor if it needs its own colors.`,
    );

  for (const tag of source.matchAll(TAG)) {
    for (const [key, value] of parseAttributes(tag[2])) {
      const name = key.toLowerCase();
      if (COLOR_PROPERTIES.has(name) && !isAllowedColor(value)) {
        flag(`<${tag[1]}>`, name, value);
      }
      if (name === 'style') {
        for (const [property, propertyValue] of declarations(value)) {
          if (
            COLOR_PROPERTIES.has(property) &&
            !isAllowedColor(propertyValue)
          ) {
            flag(`<${tag[1]}> style`, property, propertyValue);
          }
        }
      }
    }
  }
  for (const block of source.matchAll(/<style[\s>][\s\S]*?<\/style>/gi)) {
    for (const [property, value] of declarations(
      block[0].replace(/^<style[^>]*>/i, ''),
    )) {
      if (COLOR_PROPERTIES.has(property) && !isAllowedColor(value)) {
        flag('<style> block', property, value);
      }
    }
  }
}

function lintIcon(file: string, multicolor: boolean): void {
  const source = stripPrologue(readFileSync(join(sourceDir, file), 'utf8'));
  const root = source.match(/^<svg(\s(?:[^>"']|"[^"]*"|'[^']*')*)?>/);
  if (!root) {
    report(file, 'has to be a single <svg> element.');
    return;
  }
  const rootAttributes = parseAttributes(root[1] ?? '');
  const rootStyle = rootAttributes
    .filter(([key]) => key.toLowerCase() === 'style')
    .flatMap(([, value]) => declarations(value))
    .map(([property]) => property);
  for (const dimension of ['width', 'height']) {
    if (
      rootAttributes.some(([key]) => key === dimension) ||
      rootStyle.includes(dimension)
    ) {
      report(
        file,
        `root <svg> has a hard-coded ${dimension}. Remove it, the build sizes the icon from the viewBox.`,
      );
    }
  }
  if (!rootAttributes.find(([key]) => key === 'viewBox')?.[1]) {
    report(
      file,
      'root <svg> has no viewBox. Add one, like viewBox="0 0 24 24".',
    );
  }

  for (const tag of source.matchAll(TAG)) {
    const quoted = tag[2].replace(/"[^"]*"|'[^']*'/g, '""');
    for (const match of quoted.matchAll(/([^\s=/"']+)\s*=\s*[^\s"'>]/g)) {
      report(
        file,
        `<${tag[1]}> has an unquoted ${match[1]} value. Quote it, like ${match[1]}="...".`,
      );
    }
  }

  if (/<script[\s>/]/i.test(source)) {
    report(file, 'contains a <script>. Remove it.');
  }
  if (/<foreignObject[\s>/]/i.test(source)) {
    report(
      file,
      'contains a <foreignObject>. Draw it with SVG shapes instead.',
    );
  }
  for (const tag of source.matchAll(TAG)) {
    for (const [key, value] of parseAttributes(tag[2])) {
      const name = key.toLowerCase();
      if (/^on[a-z]/.test(name)) {
        report(file, `<${tag[1]}> has the event handler ${key}. Remove it.`);
      }
      if (
        (name === 'href' || name === 'xlink:href') &&
        !value.trim().startsWith('#')
      ) {
        report(
          file,
          `<${tag[1]}> has an external ${key}="${value}". Only references that start with # are allowed.`,
        );
      }
      if (name === 'id' && !multicolor) {
        report(
          file,
          `<${tag[1]}> has id="${value}". Ids collide when icons share a page. Remove it.`,
        );
      }
    }
  }
  if (!multicolor) {
    lintColors(file, source);
  }
}

const files = readdirSync(sourceDir)
  .filter((file) => !file.startsWith('.'))
  .sort();
const names = new Set(files.map((file) => basename(file, '.svg')));

const multicolor = new Set<string>();
const listPath = join(sourceDir, '.multicolor');
if (existsSync(listPath)) {
  for (const line of readFileSync(listPath, 'utf8').split('\n')) {
    const name = line.replace(/#.*/, '').trim();
    if (!name) continue;
    if (!names.has(name)) {
      problems.push(
        `icons/.multicolor: names "${name}", but icons/${name}.svg doesn't exist. Remove the line or fix the name.`,
      );
    }
    multicolor.add(name);
  }
}

for (const file of files) {
  if (file.endsWith('.svg')) {
    lintIcon(file, multicolor.has(basename(file, '.svg')));
  }
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  console.error(
    `\nlint-icons: ${problems.length} problem${problems.length === 1 ? '' : 's'}`,
  );
  process.exit(1);
}
console.log(`lint-icons: ${files.length} icons ok`);
