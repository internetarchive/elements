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

  /** Renders the panel inside a short, scrolling box like the drawer's. */
  async function scrollingPanel(
    subPrefix: string,
    count = 25,
  ): Promise<{ el: IAItemNavViewableFilesPanel; box: HTMLElement }> {
    const files = Array.from({ length: count }, (_, i) =>
      file({ title: `v${i}`, file_subprefix: `v${i}` }),
    );
    const box = await fixture<HTMLElement>(
      html`<div style="height: 80px; overflow: auto">
        <ia-itemnav-viewable-files-panel
          .subPrefix=${subPrefix}
          .fileList=${files}
        ></ia-itemnav-viewable-files-panel>
      </div>`,
    );
    const el = box.querySelector(
      'ia-itemnav-viewable-files-panel',
    ) as IAItemNavViewableFilesPanel;
    await el.updateComplete;
    return { el, box };
  }

  /** Whether the active row is actually within the scrolling box. */
  function activeRowIsVisible(
    el: IAItemNavViewableFilesPanel,
    box: HTMLElement,
  ): boolean {
    const active = el.shadowRoot?.querySelector('.content.active');
    if (!active) return false;
    const row = active.getBoundingClientRect();
    const view = box.getBoundingClientRect();
    return row.top >= view.top - 1 && row.bottom <= view.bottom + 1;
  }

  test('brings the active file into view without waiting on a timer', async () => {
    const { el, box } = await scrollingPanel('v20');

    // No sleep: the row is in place as soon as the update completes.
    expect(activeRowIsVisible(el, box), 'active row should be scrolled to').to
      .be.true;
  });

  test('follows the active file when the selection moves', async () => {
    const { el, box } = await scrollingPanel('v0');
    expect(activeRowIsVisible(el, box)).to.be.true;

    el.subPrefix = 'v24';
    await el.updateComplete;
    await el.updateComplete;

    expect(activeRowIsVisible(el, box), 'should follow the new selection').to.be
      .true;
  });

  test('scrolls once the file list arrives, not only on first render', async () => {
    // Hosts commonly build the panel first and hand it a list afterwards.
    const box = await fixture<HTMLElement>(
      html`<div style="height: 80px; overflow: auto">
        <ia-itemnav-viewable-files-panel
          .subPrefix=${'v20'}
        ></ia-itemnav-viewable-files-panel>
      </div>`,
    );
    const el = box.querySelector(
      'ia-itemnav-viewable-files-panel',
    ) as IAItemNavViewableFilesPanel;
    await el.updateComplete;

    el.fileList = Array.from({ length: 25 }, (_, i) =>
      file({ title: `v${i}`, file_subprefix: `v${i}` }),
    );
    await el.updateComplete;
    await el.updateComplete;

    expect(activeRowIsVisible(el, box)).to.be.true;
  });

  test('leaves an already-visible row where it is', async () => {
    const { el, box } = await scrollingPanel('v0');
    expect(box.scrollTop).to.equal(0);
    expect(activeRowIsVisible(el, box)).to.be.true;
  });
});
