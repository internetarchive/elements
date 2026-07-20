import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import { IAViewableFilesPanel } from './ia-viewable-files-panel';
import './ia-viewable-files-panel';
import type { ViewableFileInfo } from './models';

function file(
  overrides: Partial<ViewableFileInfo> & { title: string },
): ViewableFileInfo {
  return {
    url_path: `/details/${overrides.title}`,
    image: '',
    author: '',
    file_subprefix: overrides.title,
    file_source: `${overrides.title}.txt`,
    file_prefix: overrides.title,
    ...overrides,
  };
}

describe('IAViewableFilesPanel', () => {
  test('renders nothing when the file list is empty', async () => {
    const el = await fixture<IAViewableFilesPanel>(
      html`<ia-viewable-files-panel></ia-viewable-files-panel>`,
    );
    expect(el.shadowRoot?.querySelector('ul')).to.not.exist;
  });

  test('renders one entry per file with its title', async () => {
    const el = await fixture<IAViewableFilesPanel>(
      html`<ia-viewable-files-panel></ia-viewable-files-panel>`,
    );
    el.fileList = [file({ title: 'Volume 1' }), file({ title: 'Volume 2' })];
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll('li');
    expect(items).to.have.lengthOf(2);
    expect(items?.[0].textContent).to.contain('Volume 1');
  });

  test('marks the entry matching the current subPrefix as active', async () => {
    const el = await fixture<IAViewableFilesPanel>(
      html`<ia-viewable-files-panel></ia-viewable-files-panel>`,
    );
    el.fileList = [
      file({ title: 'V1', file_subprefix: 'v1' }),
      file({ title: 'V2', file_subprefix: 'v2' }),
    ];
    el.subPrefix = 'v2';
    await el.updateComplete;

    const active = el.shadowRoot?.querySelectorAll('.content.active');
    expect(active).to.have.lengthOf(1);
    expect(active?.[0].textContent).to.contain('V2');
  });

  test('flags PDF sources with a PDF label', async () => {
    const el = await fixture<IAViewableFilesPanel>(
      html`<ia-viewable-files-panel></ia-viewable-files-panel>`,
    );
    el.fileList = [
      file({ title: 'A book', file_source: 'book.pdf' }),
      file({ title: 'A text', file_source: 'plain.txt' }),
    ];
    await el.updateComplete;

    const labels = el.shadowRoot?.querySelectorAll('.pdf-label');
    expect(labels).to.have.lengthOf(1);
  });

  test('builds file URLs against the base host', async () => {
    const el = await fixture<IAViewableFilesPanel>(
      html`<ia-viewable-files-panel
        baseHost="example.org"
      ></ia-viewable-files-panel>`,
    );
    const url = el.fileUrl(file({ title: 'x', url_path: '/details/x' }));
    expect(url).to.equal('//example.org/details/x');
  });

  test('appends the sort order to URLs only when addSortToUrl is set', async () => {
    const el = await fixture<IAViewableFilesPanel>(
      html`<ia-viewable-files-panel
        baseHost="example.org"
      ></ia-viewable-files-panel>`,
    );
    el.addSortToUrl = true;
    el.sortOrderBy = 'title_asc';
    await el.updateComplete;

    expect(el.fileUrl(file({ title: 'x', url_path: '/details/x' }))).to.equal(
      '//example.org/details/x?sort=title_asc',
    );

    el.sortOrderBy = 'default';
    expect(el.fileUrl(file({ title: 'x', url_path: '/details/x' }))).to.equal(
      '//example.org/details/x',
    );
  });
});
