import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { ItemMetadataStory } from './item-metadata-story';
import './item-metadata-story';

async function parse(options: { sample?: boolean; identifier?: string } = {}) {
  const el = await fixture<ItemMetadataStory>(
    html`<item-metadata-story></item-metadata-story>`,
  );
  const root = el.shadowRoot!;
  if (options.identifier) {
    const input = root.querySelector('label.id input') as HTMLInputElement;
    input.value = options.identifier;
    input.dispatchEvent(new Event('input'));
  }
  if (options.sample) {
    const checkbox = root.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.call')) throw new Error('still loading');
  });
  await el.updateComplete;
  const rows = Object.fromEntries(
    Array.from(root.querySelectorAll('tbody tr')).map((row) => [
      row.querySelector('th')!.textContent,
      {
        type: row.querySelectorAll('td')[0].textContent,
        value: row.querySelectorAll('td')[1].textContent,
      },
    ]),
  );
  return {
    call: root.querySelector('.call')?.textContent,
    rows,
    unmodeled: root.querySelector('.unmodeled')?.textContent?.trim(),
    error: root.querySelector('.error')?.textContent,
  };
}

describe('item-metadata story', () => {
  afterEach(() => vi.restoreAllMocks());

  test('shows nothing until Parse is clicked', async () => {
    const el = await fixture<ItemMetadataStory>(
      html`<item-metadata-story></item-metadata-story>`,
    );

    expect(el.shadowRoot!.querySelector('.call')).to.be.null;
  });

  test('parses the sample item without touching the network', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const shown = await parse({ sample: true });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(shown.call).to.equal('new Metadata(sample)');
    expect(shown.rows.title).to.deep.equal({
      type: 'StringField',
      value: 'A sample item',
    });
    expect(shown.rows.downloads).to.deep.equal({
      type: 'NumberField',
      value: '42',
    });
    expect(shown.rows.subject).to.deep.equal({
      type: 'StringListField',
      value: 'sample, demo, metadata',
    });
    expect(shown.rows.addeddate.type).to.equal('DateField');
    expect(shown.rows.addeddate.value).to.match(/^2021-05-20T/);
    expect(shown.unmodeled).to.contain('mystery_field');
  });

  test('loads the typed identifier from archive.org', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        new Response(
          JSON.stringify({ metadata: { identifier: 'foo', title: 'Foo' } }),
          { status: 200 },
        ),
      );

    const shown = await parse({ identifier: 'foo' });

    expect(fetchSpy.mock.calls[0][0]).to.equal(
      'https://archive.org/metadata/foo',
    );
    expect(shown.rows.title.value).to.equal('Foo');
  });

  test('says when no item is found, with one period', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('{}', { status: 200 }),
    );

    const shown = await parse({ identifier: 'nope' });

    expect(shown.error).to.equal(
      'No item found for "nope". Try "Sample data".',
    );
  });

  test('suggests the sample data when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 500 }),
    );

    const shown = await parse();

    expect(shown.call).to.equal('fetch("https://archive.org/metadata/nasa")');
    expect(shown.error).to.equal('Request failed (500). Try "Sample data".');
  });
});
