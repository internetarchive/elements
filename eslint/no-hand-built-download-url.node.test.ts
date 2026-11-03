import { Linter } from 'eslint';
import { describe, expect, it } from 'vitest';
import elements from './index.mjs';

const linter = new Linter();
const lint = (code: string) =>
  linter.verify(code, [
    {
      languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
      plugins: { elements },
      rules: { 'elements/no-hand-built-download-url': 'error' },
    },
  ]);

describe('no-hand-built-download-url', () => {
  it('flags a template literal containing /download/', () => {
    const messages = lint('const u = `${host}/download/${id}/${name}`;');
    expect(messages).toHaveLength(1);
    expect(messages[0].message).toContain('downloadUrl()');
  });

  it('flags a string literal containing /download/', () => {
    expect(lint("const u = host + '/download/' + id;")).toHaveLength(1);
  });

  it('leaves other URLs alone', () => {
    expect(lint('const u = `${host}/details/${id}`;')).toEqual([]);
    expect(lint("const u = 'download';")).toEqual([]);
  });
});
