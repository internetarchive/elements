/**
 * Builds the files of the org's design-system artifact
 * (https://claude.ai/artifact/QH1DfJLQ5oA9KQtbnkiL8j) from this repository.
 * See README.md beside this file for how to publish them.
 *
 *   node scripts/design-system-artifact/build.mts [--out <dir>] [--source "<label>"]
 *
 * Writes <out>/project/, the artifact's files at their published paths, and
 * <out>/test/, local pages that load each preview the way the artifact does.
 * It replaces those two folders and leaves the rest of <out> alone. <out>
 * defaults to temp/design-system-artifact, outside dist/ so the package never
 * ships it.
 *
 * --source names what the artifact was built from, in its README and file
 * headers. It defaults to "elements <version> @ <commit>".
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, type Plugin } from 'esbuild';

import { COMPONENTS, type ComponentSpec } from './components.mts';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const staticDir = join(here, 'static');

const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const outDir = option('--out') ?? join(root, 'temp', 'design-system-artifact');
const project = join(outDir, 'project');
const testDir = join(outDir, 'test');

function defaultSource(): string {
  const version = JSON.parse(
    readFileSync(join(root, 'package.json'), 'utf8'),
  ).version;
  const git = (...a: string[]) =>
    execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim();
  const commit = git('rev-parse', '--short', 'HEAD');
  const dirty =
    git('status', '--porcelain') !== '' ? ' (uncommitted changes)' : '';
  return `elements ${version} @ ${commit}${dirty}`;
}
const source = option('--source') ?? defaultSource();

const write = (path: string, text: string) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
};

/** The output is spliced from files kept elsewhere; stop if one no longer has the expected shape. */
function expect<T>(value: T | null | undefined | -1, what: string): T {
  if (value === null || value === undefined || value === -1) {
    throw new Error(`Not found: ${what}`);
  }
  return value;
}

function replaceOnce(text: string, find: string, replacement: string): string {
  expect(text.includes(find) ? true : null, JSON.stringify(find));
  return text.replace(find, replacement);
}

rmSync(project, { recursive: true, force: true });
rmSync(testDir, { recursive: true, force: true });

// ---- components/bundle.js ------------------------------------------------

/** The elements import SVGs as URLs; inline them, since the bundle loads nothing. */
const svgPlugin: Plugin = {
  name: 'svg',
  setup(b) {
    // Relative to the repository: esbuild prints this path in a comment in the
    // published bundle, and an absolute one would name the build machine.
    b.onResolve({ filter: /\.svg\?raw$/ }, (a) => ({
      path: relative(root, join(a.resolveDir, a.path.replace(/\?raw$/, ''))),
      namespace: 'raw',
    }));
    b.onLoad({ filter: /.*/, namespace: 'raw' }, (a) => ({
      contents: readFileSync(join(root, a.path), 'utf8'),
      loader: 'text',
    }));
    b.onLoad({ filter: /\.svg$/ }, (a) => ({
      contents: `export default "data:image/svg+xml;base64,${readFileSync(a.path).toString('base64')}";`,
      loader: 'js',
    }));
  },
};

/** React comes from the page (window.React), as the artifact's previews load it. */
const reactGlobalPlugin: Plugin = {
  name: 'react-global',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?(\/.*)?$/ }, (a) => ({
      path: a.path,
      namespace: 'react-global',
    }));
    b.onLoad({ filter: /.*/, namespace: 'react-global' }, (a) => ({
      contents: a.path.startsWith('react-dom')
        ? 'module.exports = window.ReactDOM;'
        : 'module.exports = window.React;',
      loader: 'js',
    }));
  },
};

const bundled = await build({
  entryPoints: [join(here, 'entry.ts')],
  bundle: true,
  write: false,
  format: 'iife',
  globalName: 'IADesignSystem',
  platform: 'browser',
  // `module` before `main`: some packages (@internetarchive/icon-close) only
  // register their element from the file `module` names.
  mainFields: ['browser', 'module', 'main'],
  target: 'es2021',
  // The bundle's module comments are paths relative to this, so keep it the
  // repository wherever the script is run from.
  absWorkingDir: root,
  legalComments: 'none',
  tsconfig: join(root, 'tsconfig.json'),
  define: { 'import.meta.env': '{}' },
  plugins: [svgPlugin, reactGlobalPlugin],
  logLevel: 'warning',
});

// The artifact inlines the bundle in a <script>, so these can't appear in it.
const bundleBody = bundled.outputFiles[0].text.replace(/<!--/g, '\\x3C!--');
if (/<\/script/i.test(bundleBody)) {
  throw new Error('bundle.js contains "</script"; the artifact inlines it');
}

// The bundle is published org-wide; it mustn't name the machine it was built
// on. esbuild comments each module with its path, which has to stay relative
// to the repository.
const localPath =
  /^\s*\/\/ (?:[\w-]+:)?(?:\/(?!\/)|\.\.\/).*$|\/Users\/[^\s'"`]*|\/private\/tmp\/[^\s'"`]*/m.exec(
    bundleBody,
  );
if (localPath) {
  throw new Error(
    `bundle.js contains a path from this machine: ${localPath[0].trim()}`,
  );
}

const STATIC_COMPONENTS = readdirSync(join(staticDir, 'components'), {
  withFileTypes: true,
})
  .filter((d) => d.isDirectory() && d.name !== 'Cover')
  .map((d) => d.name);
const componentNames = [...STATIC_COMPONENTS, ...COMPONENTS.map((c) => c.name)];

// The entry's own exports, from esbuild's `__export(entry_exports, { … })`.
// Element classes keep their names elsewhere in the bundle, so a plain search
// for a name would pass even with its export gone.
const exportBlock = expect(
  /__export\(entry_exports, \{([\s\S]*?)\n {2}\}\);/.exec(bundleBody),
  "the entry's exports in bundle.js",
)[1];
const exported = new Set(
  [...exportBlock.matchAll(/^\s+(\w+): \(\) =>/gm)].map((m) => m[1]),
);
for (const name of componentNames) {
  if (!exported.has(name)) {
    throw new Error(`${name} has a card but no export in entry.ts`);
  }
}

write(
  join(project, 'components', 'bundle.js'),
  `/* @ds-bundle: ${JSON.stringify({
    format: 4,
    namespace: 'IADesignSystem',
    components: componentNames.map((name) => ({ name })),
  })} */\n` +
    `/* Built from ${source}: React wrappers over @internetarchive/elements, React external (window.React). */\n` +
    bundleBody,
);

// ---- components/bundle.css ------------------------------------------------

const pageTokens = readFileSync(
  join(root, 'demo', 'docs', 'assets', 'tokens.css'),
  'utf8',
);
const rootBlock = expect(
  /^:root \{\n([\s\S]*?)^\}/m.exec(pageTokens),
  'the :root block in demo/docs/assets/tokens.css',
)[1];
const inverseBlock = expect(
  /^\.ia-inverse,[\s\S]*?^\}/m.exec(pageTokens),
  'the .ia-inverse block in demo/docs/assets/tokens.css',
)[0];
write(
  join(project, 'components', 'bundle.css'),
  [
    '/* The tokens tokens.json has no family for: border shorthands, motion, and the',
    ' * inverse scope for dark surfaces. Generated by elements scripts/build-tokens.mts.',
    ` * The font families point at tokens.json's type families. Then the class vocabulary, ia.css. Built from ${source}. */`,
    ':root {',
    '  --ia-font-family-base: var(--font-base);',
    '  --ia-font-family-mono: var(--font-mono);',
    ...rootBlock.split('\n').filter((l) => /^\s+--ia-(border|motion)-/.test(l)),
    '}',
    '',
    inverseBlock,
    '',
    readFileSync(join(root, 'demo', 'docs', 'assets', 'ia.css'), 'utf8'),
  ].join('\n'),
);

// ---- tokens.json and tokens.css -------------------------------------------
//
// The artifact reads its own token format: a list per family, with values
// resolved to what its page accepts (hex, rgba(), or an alias of another
// color token). Lengths are px at the default font size; elements scales them
// with --ia-unit, which designs don't need.

interface DtcgNode {
  $value?: string | number;
  $description?: string;
  $extensions?: { ia?: Record<string, unknown> };
  [key: string]: unknown;
}

interface Token {
  name: string;
  value: string;
  usage: string;
}

const dtcg = JSON.parse(
  readFileSync(join(root, 'tokens', 'tokens.json'), 'utf8'),
) as DtcgNode;

const leaves = new Map<
  string,
  { path: string[]; node: DtcgNode; desc?: string }
>();
(function walk(node: DtcgNode, path: string[], desc?: string) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$') || typeof value !== 'object' || value === null)
      continue;
    const child = value as DtcgNode;
    if ('$value' in child) {
      leaves.set(`ia-${[...path, key].join('-')}`, {
        path: [...path, key],
        node: child,
        desc,
      });
    } else {
      walk(
        child,
        [...path, key],
        (child.$description as string | undefined) ?? desc,
      );
    }
  }
})(dtcg, []);

const refName = (ref: string) => `ia-${ref.replace(/\./g, '-')}`;

function resolve(value: string): string {
  return value
    .replace(/\{([^}]+)\}/g, (_, ref) =>
      resolve(String(leaves.get(refName(ref))!.node.$value)),
    )
    .replace(
      /calc\((\d+(?:\.\d+)?) \* (\d+(?:\.\d+)?)px\)/g,
      (_, n, px) => `${Number(n) * Number(px)}px`,
    );
}

const rgba = (v: string) =>
  v.replace(/^rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)$/, 'rgba($1, $2, $3, $4)');

function usage(node: DtcgNode, desc?: string): string {
  const ia = node.$extensions?.ia ?? {};
  const parts = (['use', 'contrast', 'note'] as const)
    .map((k) => ia[k])
    .filter((x): x is string => typeof x === 'string' && x !== '');
  if (parts.length === 0 && desc) parts.push(desc);
  if (typeof ia.decision === 'string' && ia.decision) parts.push(ia.decision);
  if (ia.delta) parts.push('changed from live');
  const u = parts.map((p) => p.replace(/\.+$/, '')).join('. ');
  return u.length > 1000 ? `${u.slice(0, 997)}…` : u;
}

const families: Record<string, Token[]> = {};
const add = (family: string, token: Token) =>
  (families[family] ??= []).push(token);
const FAMILY_OF: Record<string, string> = {
  space: 'spacing',
  radius: 'radius',
  shadow: 'shadow',
  size: 'size',
  blur: 'blur',
  'z-index': 'zIndex',
  breakpoint: 'layout',
  container: 'layout',
};
const FONT_FAMILY_OF: Record<string, string> = {
  size: 'fontSize',
  weight: 'fontWeight',
  'line-height': 'lineHeight',
};

for (const [name, { path, node, desc }] of leaves) {
  const value = String(node.$value);
  const group = path[0];
  if (group === 'color') {
    const alias = /^\{([^}]+)\}$/.exec(value);
    add('color', {
      name,
      value: alias ? `{${refName(alias[1])}}` : rgba(value),
      usage: usage(node, desc),
    });
  } else if (group === 'font') {
    const family = FONT_FAMILY_OF[path[1]];
    if (family)
      add(family, { name, value: resolve(value), usage: usage(node, desc) });
  } else if (FAMILY_OF[group]) {
    add(FAMILY_OF[group], {
      name,
      value: rgba(resolve(value)),
      usage: usage(node, desc),
    });
  }
}

const font = dtcg.font as Record<string, Record<string, DtcgNode>>;
const fontSize = new Map(families.fontSize.map((t) => [t.name, t.value]));
const normalLineHeight = families.lineHeight.find(
  (t) => t.name === 'ia-font-line-height-normal',
)!.value;
const SIZE_STEPS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];

const tokensJson = {
  name: 'Internet Archive Design System',
  version: 2,
  color: { themes: [{ id: 'light', name: 'Light' }], tokens: families.color },
  type: {
    fonts: [],
    families: { base: font.family.base.$value, mono: font.family.mono.$value },
    groups: [
      {
        name: 'Scale',
        family: 'base',
        styles: SIZE_STEPS.map((k) => ({
          name: `size-${k}`,
          fontSize: fontSize.get(`ia-font-size-${k}`),
          lineHeight: normalLineHeight,
          fontWeight: 400,
          usage:
            `Type size ${k}; the variable is --ia-font-size-${k}. ` +
            ((font.size[k].$extensions?.ia?.live as string | undefined) ?? ''),
        })),
      },
    ],
  },
  ...Object.fromEntries(
    [
      'spacing',
      'radius',
      'shadow',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'layout',
      'size',
      'zIndex',
      'blur',
    ].map((k) => [k, { tokens: families[k] }]),
  ),
};
write(join(project, 'tokens.json'), `${JSON.stringify(tokensJson, null, 2)}\n`);

// tokens.css as the artifact's page compiles it (its format.md).
const cssValue = (v: string) => v.replace(/^\{([^}]+)\}$/, 'var(--$1)');
write(
  join(project, 'tokens.css'),
  [
    '/* Internet Archive Design System — generated from tokens.json */',
    ':root, [data-theme="light"] {',
    ...[...families.color, ...families.shadow].map(
      (t) => `  --${t.name}: ${cssValue(t.value)};`,
    ),
    '}',
    ':root {',
    ...[
      'spacing',
      'radius',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'layout',
      'size',
      'zIndex',
      'blur',
    ].flatMap((k) => families[k].map((t) => `  --${t.name}: ${t.value};`)),
    ...Object.entries(tokensJson.type.families).map(
      ([k, v]) => `  --font-${k}: ${v};`,
    ),
    '}',
    ...tokensJson.type.groups[0].styles.map(
      (s) =>
        `.${s.name} { font-family: var(--font-base); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight}; }`,
    ),
    '',
  ].join('\n'),
);

// ---- components/ ----------------------------------------------------------

cpSync(join(staticDir, 'components'), join(project, 'components'), {
  recursive: true,
  filter: (src) => !src.endsWith('index.d.ts'),
});

// Every generated preview uses IAButton's page and swaps in its own stories.
const template = readFileSync(
  join(staticDir, 'components', 'IAButton', 'preview.html'),
  'utf8',
);
const storyStart = expect(
  template.indexOf('<script>\nvar __dsPreview'),
  "the stories script in IAButton's preview",
);
const storyEnd =
  expect(
    template.indexOf('</script>', storyStart),
    "the end of the stories script in IAButton's preview",
  ) + '</script>'.length;

const LOAD =
  '(load `tokens.css`, `components/bundle.css` and `components/bundle.js`)';

function previewHtml(c: ComponentSpec): string {
  const stories = c.stories
    .map(([name, js]) => `    ${name}: function () { return ${js}; },`)
    .join('\n')
    .replace(/,$/, '');
  const script =
    '<script>\nvar __dsPreview = (function () {\n  var h = React.createElement, DS = window.IADesignSystem;\n  ' +
    (c.setup ?? '') +
    `\n  return {\n${stories}\n  };\n})();\n</script>`;
  let html = template.slice(0, storyStart) + script + template.slice(storyEnd);
  html = replaceOnce(
    html,
    '<!-- @dsCard group="general" height=420 -->',
    `<!-- @dsCard group="general" height=${c.height ?? 420}${c.width ? ` width=${c.width}` : ''} -->`,
  );
  if (c.column) {
    html = replaceOnce(html, 'var MODE="grid";', 'var MODE="column";');
  }
  return replaceOnce(html, '_preview/IAButton.js', `${c.name} preview`);
}

function readme(c: ComponentSpec): string {
  const examples = c.stories
    .map(([name, , jsx]) =>
      jsx.includes('\n')
        ? `### ${name}\n\n\`\`\`jsx\n() => (\n  ${jsx.replace(/\n/g, '\n  ')}\n)\n\`\`\``
        : `### ${name}\n\n\`\`\`jsx\n() => ${jsx}\n\`\`\``,
    )
    .join('\n\n');
  return (
    `${c.name} from ia-design-system. Use via \`window.IADesignSystem.${c.name}\` ${LOAD}.\n\n${c.summary}\n` +
    (c.notes ? `\n${c.notes}\n` : '') +
    `\n## Props\n\n\`\`\`ts\ninterface ${c.name}Props {\n${c.props}\n}\n\`\`\`\n\n## Examples\n\n${examples}\n`
  );
}

const declaration = (c: ComponentSpec) =>
  `/**\n * ${c.name} — from ia-design-system, built from ${source}.\n */\nexport interface ${c.name}Props {\n${c.props}\n}\n\nexport declare const ${c.name}: React.ComponentType<${c.name}Props>;\n`;

for (const c of COMPONENTS) {
  const dir = join(project, 'components', c.name);
  write(join(dir, 'preview.html'), previewHtml(c));
  write(join(dir, 'README.md'), readme(c));
  write(
    join(dir, `${c.name}.d.ts`),
    `import * as React from 'react';\n\n${declaration(c)}`,
  );
}

write(
  join(project, 'components', 'index.d.ts'),
  `${readFileSync(join(staticDir, 'components', 'index.d.ts'), 'utf8')}\n${COMPONENTS.map(declaration).join('\n')}`,
);

// ---- README.md, the cover and guidelines/ ----------------------------------

const ONES = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];
const TENS = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

/** 26 → "twenty-six", for counts under 100. */
function inWords(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100)
    return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '');
  throw new Error(`No words for ${n} components`);
}

/**
 * The static files' placeholders: {{SOURCE}}, and the component count as
 * {{COUNT}} (26), {{count}} (twenty-six) or {{Count}} (Twenty-six).
 */
function fill(text: string): string {
  const words = inWords(componentNames.length);
  return text
    .replaceAll('{{SOURCE}}', source)
    .replaceAll('{{COUNT}}', String(componentNames.length))
    .replaceAll('{{count}}', words)
    .replaceAll('{{Count}}', words[0].toUpperCase() + words.slice(1));
}

write(
  join(project, 'README.md'),
  fill(readFileSync(join(staticDir, 'README.md'), 'utf8')),
);

const cover = join(project, 'components', 'Cover', 'preview.html');
write(cover, fill(readFileSync(cover, 'utf8')));

// The guidelines are docs/, with its README as their index.
const docs = join(root, 'docs');
for (const entry of readdirSync(docs, {
  recursive: true,
  withFileTypes: true,
})) {
  if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
  const rel = relative(docs, join(entry.parentPath, entry.name));
  cpSync(
    join(docs, rel),
    join(project, 'guidelines', rel === 'README.md' ? 'index.md' : rel),
  );
}

// ---- test/ ----------------------------------------------------------------
//
// Each preview as the artifact frames it: the stylesheets, React and the bundle
// preloaded, plus an error trap the sweep page reads.

const REACT = [
  'https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js',
  'https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js',
];
const preload =
  '<script>window.__errs=[];addEventListener("error",function(e){__errs.push(String(e.message))});' +
  'addEventListener("unhandledrejection",function(e){__errs.push(String(e.reason))});</script>' +
  '<link rel="stylesheet" href="../../../project/tokens.css">' +
  '<link rel="stylesheet" href="../../../project/components/bundle.css">' +
  REACT.map((src) => `<script src="${src}"></script>`).join('') +
  '<script src="../../../project/components/bundle.js"></script>';

for (const name of componentNames) {
  const preview = readFileSync(
    join(project, 'components', name, 'preview.html'),
    'utf8',
  );
  const html = replaceOnce(
    replaceOnce(preview, '<html>', '<html data-theme="light">'),
    '<meta charset="utf-8">',
    `<meta charset="utf-8">${preload}`,
  );
  write(join(testDir, 'components', name, 'test.html'), html);
}

write(
  join(testDir, 'index.html'),
  `<!doctype html><meta charset="utf-8"><title>Design-system previews</title>
<p>Loads each preview, waits, and lists its errors. Every line should read <code>errors=[]</code>.</p>
<pre id="out">running…</pre>
<script>
(async () => {
  const names = ${JSON.stringify(componentNames)};
  const lines = [];
  for (const name of names) {
    const frame = document.createElement('iframe');
    frame.style.cssText = 'width:1100px;height:900px';
    frame.src = 'components/' + name + '/test.html';
    document.body.append(frame);
    await new Promise(resolve => (frame.onload = resolve));
    await new Promise(resolve => setTimeout(resolve, 2500));
    lines.push(name + ': errors=' + JSON.stringify(frame.contentWindow.__errs));
    frame.remove();
  }
  document.getElementById('out').textContent = lines.join('\\n');
  window.__done = lines;
})();
</script>
`,
);

console.log(
  `Built ${componentNames.length} components from ${source} into ${relative(root, outDir)}/`,
);
