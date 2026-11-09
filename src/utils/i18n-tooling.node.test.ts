import { spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const run = (script: string, cwd: string, args: string[] = []) =>
  spawnSync(process.execPath, [join(repoRoot, 'scripts', script), ...args], {
    cwd,
    encoding: 'utf8',
  });

const XLF = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
<file target-language="es" source-language="en" original="lit-localize-inputs" datatype="plaintext">
<body>
<trans-unit id="a">
  <source>One</source>
<target>Uno</target>
</trans-unit>
<trans-unit id="b">
  <source>Two</source>
</trans-unit>
<trans-unit id="c">
  <source>Three</source>
<target state="needs-review-translation">Tres</target>
</trans-unit>
</body>
</file>
</xliff>
`;

let project: string;

beforeAll(() => {
  project = mkdtempSync(join(tmpdir(), 'i18n-tooling-'));
  mkdirSync(join(project, 'xliff'));
  writeFileSync(
    join(project, 'lit-localize.json'),
    JSON.stringify({
      sourceLocale: 'en',
      targetLocales: ['es'],
      interchange: { format: 'xliff', xliffDir: './xliff' },
    }),
  );
  writeFileSync(join(project, 'xliff', 'es.xlf'), XLF);
});

afterAll(() => rmSync(project, { recursive: true, force: true }));

describe('i18n:status', () => {
  it('lists missing and unreviewed translations and still exits 0', () => {
    const result = run('i18n-status.mts', project);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('es: 2/3 translated');
    expect(result.stdout).toContain('missing: 1\n    b');
    expect(result.stdout).toContain('unreviewed drafts: 1\n    c');
    expect(result.stdout).toContain('Warning: es need work');
  });
});

describe('strings:translate', () => {
  it('exports the pending units', () => {
    const out = join(project, 'pending.json');
    const result = run('translate-xliff.mts', project, [
      '--locale',
      'es',
      '--export',
      out,
    ]);
    expect(result.status).toBe(0);
    expect(JSON.parse(readFileSync(out, 'utf8'))).toEqual({ b: 'Two' });
  });

  it('writes drafts marked for review', () => {
    const from = join(project, 'es.json');
    writeFileSync(from, JSON.stringify({ b: 'Dos' }));
    const result = run('translate-xliff.mts', project, [
      '--locale',
      'es',
      '--from',
      from,
    ]);
    expect(result.status).toBe(0);
    const xlf = readFileSync(join(project, 'xliff', 'es.xlf'), 'utf8');
    expect(xlf).toContain(
      '<target state="needs-review-translation">Dos</target>',
    );
    expect(xlf).toContain('<target>Uno</target>');
    const status = run('i18n-status.mts', project);
    expect(status.stdout).toContain('es: 3/3 translated');
    expect(status.stdout).toContain('unreviewed drafts: 2');
  });
});
