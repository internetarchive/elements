import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { describe, expect, test, vi } from 'vitest';

import { IAItemNavSortFilesButton } from './ia-itemnav-sort-files-button';
import './ia-itemnav-sort-files-button';
import type { ViewableFileInfo } from './models';

function file(title: string, origSort: number): ViewableFileInfo {
  return {
    title,
    orig_sort: origSort,
    url_path: `/details/${title}`,
    image: '',
    author: '',
    file_subprefix: title,
    file_source: `${title}.pdf`,
    file_prefix: title,
  };
}

describe('IAItemNavSortFilesButton', () => {
  test('starts in the default (neutral) state', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );
    expect(el.sortOrderBy).to.equal('default');
    expect(el.shadowRoot?.querySelector('.sort-by.neutral-icon')).to.exist;
  });

  test('cycles default → ascending → descending → default on click', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );

    const clickButton = async () => {
      (
        el.shadowRoot?.querySelector('button.sort-by') as HTMLButtonElement
      ).click();
      await el.updateComplete;
    };

    await clickButton();
    expect(el.sortOrderBy).to.equal('title_asc');
    expect(el.shadowRoot?.querySelector('.sort-by.asc-icon')).to.exist;

    await clickButton();
    expect(el.sortOrderBy).to.equal('title_desc');
    expect(el.shadowRoot?.querySelector('.sort-by.desc-icon')).to.exist;

    await clickButton();
    expect(el.sortOrderBy).to.equal('default');
    expect(el.shadowRoot?.querySelector('.sort-by.neutral-icon')).to.exist;
  });

  test('sorts the file list and emits fileListSorted with the ordered files', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );
    el.fileListRaw = [file('Beta', 1), file('Alpha', 0), file('Gamma', 2)];
    await el.updateComplete;

    const listener = vi.fn();
    el.addEventListener('fileListSorted', listener);

    el.sortVolumes('title_asc');

    expect(listener).toHaveBeenCalledOnce();
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.composed).to.equal(true);
    expect(event.detail.sortType).to.equal('title_asc');
    expect(
      event.detail.sortedFiles.map((f: ViewableFileInfo) => f.title),
    ).to.deep.equal(['Alpha', 'Beta', 'Gamma']);
  });

  test('sorts titles in descending order', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );
    el.fileListRaw = [file('Beta', 1), file('Alpha', 0), file('Gamma', 2)];
    await el.updateComplete;

    el.sortVolumes('title_desc');
    expect(el.fileListSorted.map((f) => f.title)).to.deep.equal([
      'Gamma',
      'Beta',
      'Alpha',
    ]);
  });

  test('restores the original order when sorting back to default', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );
    el.fileListRaw = [file('Beta', 1), file('Alpha', 0), file('Gamma', 2)];
    await el.updateComplete;

    el.sortVolumes('default');
    expect(el.fileListSorted.map((f) => f.title)).to.deep.equal([
      'Alpha',
      'Beta',
      'Gamma',
    ]);
  });

  test('does not mutate the source list in place', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );
    const raw = [file('Beta', 1), file('Alpha', 0)];
    el.fileListRaw = raw;
    await el.updateComplete;

    el.sortVolumes('title_asc');
    expect(raw.map((f) => f.title)).to.deep.equal(['Beta', 'Alpha']);
  });

  test('default sort treats a missing orig_sort as 0', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );
    const a: ViewableFileInfo = { ...file('A', 0) };
    const b: ViewableFileInfo = { ...file('B', 0) };
    delete a.orig_sort;
    delete b.orig_sort;
    el.fileListRaw = [a, b];
    await el.updateComplete;

    expect(() => el.sortVolumes('default')).to.not.throw();
    expect(el.fileListSorted).to.have.lengthOf(2);
  });

  test('paints the sort glyph with the themed icon color', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button
        style="--item-navigator-icon-color: rgb(0, 128, 64)"
      ></ia-itemnav-sort-files-button>`,
    );
    const glyph = el.shadowRoot?.querySelector('.ia-icon > svg') as SVGElement;

    // The glyph is inline svg painted with currentColor, so the theming knob
    // drives color.
    expect(getComputedStyle(glyph).color).to.equal('rgb(0, 128, 64)');
    expect(getComputedStyle(glyph).fill).to.equal('rgb(0, 128, 64)');
  });

  test('sizes the sort glyph with the header icon size knob', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button
        style="--item-navigator-header-icon-size: 24px"
      ></ia-itemnav-sort-files-button>`,
    );
    const glyph = el.shadowRoot?.querySelector('.ia-icon > svg') as SVGElement;
    const { width, height } = glyph.getBoundingClientRect();

    expect(width).to.equal(24);
    expect(height).to.equal(24);
  });

  test('keeps an accessible name on the icon-only toggle in every state', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button></ia-itemnav-sort-files-button>`,
    );

    for (const state of ['title_asc', 'title_desc', 'default'] as const) {
      el.sortVolumes(state);
      await el.updateComplete;
      const button = el.shadowRoot?.querySelector('button.sort-by');
      expect(button?.getAttribute('aria-label'), state).to.match(/^Sort/);
    }
  });

  test('recolors every state of the sort toggle', async () => {
    const el = await fixture<IAItemNavSortFilesButton>(
      html`<ia-itemnav-sort-files-button
        style="--item-navigator-icon-color: rgb(200, 100, 50)"
      ></ia-itemnav-sort-files-button>`,
    );

    for (const state of ['title_asc', 'title_desc', 'default'] as const) {
      el.sortVolumes(state);
      await el.updateComplete;
      const glyph = el.shadowRoot?.querySelector(
        '.ia-icon > svg',
      ) as SVGElement;
      expect(getComputedStyle(glyph).color, state).to.equal(
        'rgb(200, 100, 50)',
      );
    }
  });
});
