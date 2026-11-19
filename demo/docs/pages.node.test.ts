import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/*
 * Each demo page carries its own copy of the header and tabs, written into its
 * HTML so the page paints in its final layout. These checks keep the copies
 * the same, so a tab added to one page can't go missing from the others.
 */

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (page: string) => readFileSync(join(repoRoot, page), 'utf8');

/** The header's tabs, as [file, label, current]. */
function tabs(html: string): [string, string, boolean][] {
  const strip = html.match(/<div class="ia-tabs">([\s\S]*?)<\/div>/)?.[1] ?? '';
  return [
    ...strip.matchAll(/<a class="ia-tab" href="([^"]+)"[^>]*>([^<]+)<\/a>/g),
  ].map((m) => [m[1], m[2], m[0].includes('aria-current="page"')]);
}

// The Components page's tabs name every page, itself included.
const pages = tabs(read('index.html')).map(([file]) => file);

describe('demo pages', () => {
  it('lists at least the Components page', () => {
    expect(pages).to.include('index.html');
  });

  it.each(pages)('%s exists', (page) => {
    expect(existsSync(join(repoRoot, page))).to.be.true;
  });

  it.each(pages)('%s has the same tabs as every other page', (page) => {
    const names = tabs(read(page)).map(([file, label]) => [file, label]);
    const expected = tabs(read('index.html')).map(([file, label]) => [
      file,
      label,
    ]);
    expect(names).to.deep.equal(expected);
  });

  it.each(pages)('%s marks itself, and only itself, as current', (page) => {
    const current = tabs(read(page))
      .filter(([, , isCurrent]) => isCurrent)
      .map(([file]) => file);
    expect(current).to.deep.equal([page]);
  });

  it.each(pages.filter((page) => page !== 'index.html'))(
    '%s has the sidebar shell around its main content',
    (page) => {
      expect(read(page)).to.match(
        /<div class="doc-shell">\s*<nav class="doc-sidebar" id="doc-sidebar"[^>]*><\/nav>\s*<main class="doc-main" id="main">/,
      );
    },
  );
});
