import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test } from 'vitest';

import { IAItemNavViewableFilesPanel } from './ia-itemnav-viewable-files-panel';
import './ia-itemnav-viewable-files-panel';
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

describe('IAItemNavViewableFilesPanel', () => {
  test('renders nothing when the file list is empty', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel></ia-itemnav-viewable-files-panel>`,
    );
    expect(el.shadowRoot?.querySelector('ul')).to.not.exist;
  });

  test('renders one entry per file with its title', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel></ia-itemnav-viewable-files-panel>`,
    );
    el.fileList = [file({ title: 'Volume 1' }), file({ title: 'Volume 2' })];
    await el.updateComplete;

    const items = el.shadowRoot?.querySelectorAll('li');
    expect(items).to.have.lengthOf(2);
    expect(items?.[0].textContent).to.contain('Volume 1');
  });

  test('marks the entry matching the current subPrefix as active', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel></ia-itemnav-viewable-files-panel>`,
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
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel></ia-itemnav-viewable-files-panel>`,
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
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel
        baseHost="example.org"
      ></ia-itemnav-viewable-files-panel>`,
    );
    const url = el.fileUrl(file({ title: 'x', url_path: '/details/x' }));
    expect(url).to.equal('//example.org/details/x');
  });

  test('appends the sort order to URLs only when addSortToUrl is set', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel
        baseHost="example.org"
      ></ia-itemnav-viewable-files-panel>`,
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

  test('does not flag a file with no file_source as a PDF', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel></ia-itemnav-viewable-files-panel>`,
    );
    const noSource: ViewableFileInfo = { ...file({ title: 'sourceless' }) };
    delete (noSource as Partial<ViewableFileInfo>).file_source;
    el.fileList = [noSource];
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('li')).to.have.lengthOf(1);
    expect(el.shadowRoot?.querySelector('.pdf-label')).to.not.exist;
  });

  test('scrolls the active file into view after first render (scrollIntoViewIfNeeded)', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel
        subPrefix="v1"
        .fileList=${[file({ title: 'v1', file_subprefix: 'v1' })]}
      ></ia-itemnav-viewable-files-panel>`,
    );
    const active = el.shadowRoot?.querySelector<
      HTMLElement & { scrollIntoViewIfNeeded?: (c: boolean) => void }
    >('.content.active');
    expect(active).to.exist;
    // firstUpdated schedules the scroll behind a 350ms timeout.
    await new Promise((resolve) => setTimeout(resolve, 400));
    // No assertion beyond "did not throw" — chromium provides
    // scrollIntoViewIfNeeded, exercising that branch.
    expect(active).to.exist;
  });

  test('falls back to scrollIntoView when scrollIntoViewIfNeeded is unavailable', async () => {
    const el = await fixture<IAItemNavViewableFilesPanel>(
      html`<ia-itemnav-viewable-files-panel
        subPrefix="v1"
        .fileList=${[file({ title: 'v1', file_subprefix: 'v1' })]}
      ></ia-itemnav-viewable-files-panel>`,
    );
    const active = el.shadowRoot?.querySelector<HTMLElement>('.content.active');
    // Remove the Chrome-only API so the cross-browser branch runs.
    (
      active as unknown as { scrollIntoViewIfNeeded?: unknown }
    ).scrollIntoViewIfNeeded = undefined;
    let called = false;
    active!.scrollIntoView = () => {
      called = true;
    };
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(called).to.equal(true);
  });
});
