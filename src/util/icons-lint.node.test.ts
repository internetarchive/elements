import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const script = join(repoRoot, 'scripts', 'lint-icons.mts');

let scratch: string;
let fixtureCount = 0;

const wrap = (attributes: string, inner = '<path d="M0 0h1v1z"/>') =>
  `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"${attributes}>${inner}</svg>`;

/** Lints a temp icons directory holding `icons` and an optional `.multicolor`. */
function lint(icons: Record<string, string>, multicolor?: string) {
  fixtureCount += 1;
  const dir = join(scratch, `fixture-${fixtureCount}`);
  mkdirSync(dir);
  for (const [name, source] of Object.entries(icons)) {
    writeFileSync(join(dir, `${name}.svg`), source);
  }
  if (multicolor !== undefined) {
    writeFileSync(join(dir, '.multicolor'), multicolor);
  }
  const result = spawnSync('node', [script, dir], { encoding: 'utf8' });
  return { status: result.status, output: result.stdout + result.stderr };
}

beforeAll(() => {
  scratch = mkdtempSync(join(tmpdir(), 'elements-icons-lint-'));
});

afterAll(() => {
  rmSync(scratch, { recursive: true, force: true });
});

describe('icon lint', () => {
  it('passes the real icons', () => {
    const result = spawnSync('node', [script], {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
  });

  it('accepts none, currentColor and url() references', () => {
    const { status, output } = lint({
      ok: wrap(
        '',
        '<path fill="none" stroke="currentColor"/><path fill="url(#g)"/><path style="fill: currentColor; stroke:none"/>',
      ),
    });
    expect(output).toContain('1 icons ok');
    expect(status).toBe(0);
  });

  it.each([
    [
      'a hard-coded width',
      wrap(' width="24"'),
      'icons/bad.svg',
      'hard-coded width',
    ],
    [
      'a hard-coded height',
      wrap(' height="24"'),
      'icons/bad.svg',
      'hard-coded height',
    ],
    [
      'a missing viewBox',
      '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>',
      'icons/bad.svg',
      'no viewBox',
    ],
    [
      'a hex fill',
      wrap('', '<path fill="#ff0000"/>'),
      'icons/bad.svg',
      'fill="#ff0000"',
    ],
    [
      'a named stroke',
      wrap('', '<path stroke="red"/>'),
      'icons/bad.svg',
      'stroke="red"',
    ],
    [
      'an rgb stop-color',
      wrap('', '<stop stop-color="rgb(1,2,3)"/>'),
      'icons/bad.svg',
      'stop-color',
    ],
    [
      'an inline style color',
      wrap('', '<path style="opacity:1;fill:#000"/>'),
      'icons/bad.svg',
      '<path> style fill="#000"',
    ],
    [
      'a <style> block color',
      wrap('', '<style>.a { fill: blue }</style><path class="a"/>'),
      'icons/bad.svg',
      '<style> block fill="blue"',
    ],
    [
      'an event handler',
      wrap('', '<path onclick="x()"/>'),
      'icons/bad.svg',
      'event handler onclick',
    ],
    [
      'a script',
      wrap('', '<script>alert(1)</script>'),
      'icons/bad.svg',
      'contains a <script>',
    ],
    [
      'a foreignObject',
      wrap('', '<foreignObject/>'),
      'icons/bad.svg',
      '<foreignObject>',
    ],
    [
      'an external href',
      wrap('', '<use href="https://example.com/a.svg#b"/>'),
      'icons/bad.svg',
      'external href',
    ],
    [
      'an external xlink:href',
      wrap('', '<use xlink:href="a.svg"/>'),
      'icons/bad.svg',
      'external xlink:href',
    ],
    ['an id', wrap('', '<path id="shape"/>'), 'icons/bad.svg', 'id="shape"'],
  ])('fails on %s', (_label, source, file, message) => {
    const { status, output } = lint({ bad: source });
    expect(status).toBe(1);
    expect(output).toContain(`${file}: `);
    expect(output).toContain(message);
  });

  it.each([
    [
      'a root style width',
      wrap(' style="fill:none; width: 24px"'),
      'hard-coded width',
    ],
    ['a root style height', wrap(" style='height:2em'"), 'hard-coded height'],
    ['an unquoted fill', wrap('', '<path fill=red/>'), 'unquoted fill value'],
    [
      'an unquoted handler',
      wrap('', '<path onclick=x()/>'),
      'unquoted onclick value',
    ],
    [
      'an unquoted href',
      wrap('', '<use href=http://x/>'),
      'unquoted href value',
    ],
    ['an unquoted root width', wrap(' width=1'), 'unquoted width value'],
  ])('fails on %s', (_label, source, message) => {
    const { status, output } = lint({ bad: source });
    expect(status).toBe(1);
    expect(output).toContain(message);
  });

  it('reports every problem, not just the first', () => {
    const { output } = lint({
      bad: wrap(' width="1" height="1"', '<path fill="#fff" id="a"/>'),
    });
    expect(output).toContain('hard-coded width');
    expect(output).toContain('hard-coded height');
    expect(output).toContain('fill="#fff"');
    expect(output).toContain('id="a"');
  });

  it('lets a multicolor icon keep colors and ids', () => {
    const { status } = lint(
      {
        logo: wrap(
          '',
          '<linearGradient id="g"><stop stop-color="#f00"/></linearGradient><path fill="url(#g)" stroke="blue"/>',
        ),
      },
      '# logos\nlogo # the brand mark\n',
    );
    expect(status).toBe(0);
  });

  it('still applies the other rules to a multicolor icon', () => {
    const { status, output } = lint(
      { logo: wrap(' width="24"', '<path fill="#f00" onclick="x()"/>') },
      'logo\n',
    );
    expect(status).toBe(1);
    expect(output).toContain('hard-coded width');
    expect(output).toContain('onclick');
    expect(output).not.toContain('fill=');
  });

  it('fails when .multicolor names an icon that does not exist', () => {
    const { status, output } = lint({ ok: wrap('') }, 'ghost\n');
    expect(status).toBe(1);
    expect(output).toContain('icons/.multicolor: names "ghost"');
  });
});
