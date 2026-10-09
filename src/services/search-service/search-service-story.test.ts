import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { SearchServiceStory } from './search-service-story';
import './search-service-story';

async function search(options: { sample?: boolean; query?: string } = {}) {
  const el = await fixture<SearchServiceStory>(
    html`<search-service-story></search-service-story>`,
  );
  const root = el.shadowRoot!;
  if (options.query) {
    const input = root.querySelector('label.query input') as HTMLInputElement;
    input.value = options.query;
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
    if (!root.querySelector('.call')) throw new Error('still searching');
  });
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    summary: root.querySelector('.summary')?.textContent,
    rows: Array.from(root.querySelectorAll('tbody tr')).map((row) => [
      row.querySelector('th')!.textContent,
      ...Array.from(row.querySelectorAll('td')).map((td) => td.textContent),
    ]),
    error: root.querySelector('.error')?.textContent,
  };
}

describe('search-service story', () => {
  afterEach(() => vi.restoreAllMocks());

  test('shows nothing until Search is clicked', async () => {
    const el = await fixture<SearchServiceStory>(
      html`<search-service-story></search-service-story>`,
    );

    expect(el.shadowRoot!.querySelector('.call')).to.be.null;
  });

  test('models the sample response without touching the network', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const shown = await search({ sample: true });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(shown.call).to.equal('new SearchResponse(sampleResponse)');
    expect(shown.summary).to.equal('3 of 1234 results');
    expect(shown.rows[0]).to.deep.equal([
      'sample-moon-landing',
      'Sample: the moon landing',
      'movies',
    ]);
  });

  test('searches archive.org for the typed query', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          request: { client_parameters: { user_query: 'apollo' } },
          response: {
            header: { succeeded: true },
            hit_schema: { hit_type: 'item', field_properties: {} },
            body: {
              hits: {
                total: 1,
                returned: 1,
                hits: [{ fields: { identifier: 'foo', title: 'Foo' } }],
              },
            },
          },
        }),
        { status: 200 },
      ),
    );

    const shown = await search({ query: 'apollo' });

    const url = String(fetchSpy.mock.calls[0][0]);
    expect(url).to.contain('https://archive.org/services/search/beta/');
    expect(url).to.contain('user_query=apollo');
    expect(shown.summary).to.equal('1 of 1 results');
    expect(shown.rows).to.deep.equal([['foo', 'Foo', '']]);
  });

  test('suggests the sample data when the search fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));

    const shown = await search();

    expect(shown.error).to.contain('SearchService.NetworkError');
    expect(shown.error).to.contain('Try "Sample data"');
  });
});
