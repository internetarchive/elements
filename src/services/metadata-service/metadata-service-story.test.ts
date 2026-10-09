import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { MetadataServiceStory } from './metadata-service-story';
import './metadata-service-story';

async function fetchItem(
  options: { sample?: boolean; identifier?: string; keypath?: string } = {},
) {
  const el = await fixture<MetadataServiceStory>(
    html`<metadata-service-story></metadata-service-story>`,
  );
  const root = el.shadowRoot!;
  const [identifier, keypath] = Array.from(
    root.querySelectorAll('label.id input'),
  ) as HTMLInputElement[];
  const type = (input: HTMLInputElement, value?: string) => {
    if (value === undefined) return;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  type(identifier, options.identifier);
  type(keypath, options.keypath);
  if (options.sample) {
    const checkbox = root.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.call')) throw new Error('still fetching');
  });
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    request: root.querySelector('.request')?.textContent,
    lines: Array.from(root.querySelectorAll('.lines li')).map(
      (li) => li.textContent,
    ),
    error: root.querySelector('.error')?.textContent,
  };
}

describe('metadata-service story', () => {
  afterEach(() => vi.restoreAllMocks());

  test('shows nothing until Fetch is clicked', async () => {
    const el = await fixture<MetadataServiceStory>(
      html`<metadata-service-story></metadata-service-story>`,
    );

    expect(el.shadowRoot!.querySelector('.call')).to.be.null;
  });

  test('models the sample item without touching the network', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const shown = await fetchItem({ sample: true });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(shown.call).to.equal('fetchMetadata("nasa")');
    expect(shown.request).to.equal('GET https://archive.org/metadata/nasa');
    expect(shown.lines[0]).to.contain("NASA TV's This Week @NASA");
    expect(shown.lines).to.include('files: 2');
  });

  test('fetches one value when a path is given', async () => {
    const shown = await fetchItem({
      sample: true,
      keypath: 'metadata/mediatype',
    });

    expect(shown.call).to.equal(
      'fetchMetadataValue("nasa", "metadata/mediatype")',
    );
    expect(shown.request).to.equal(
      'GET https://archive.org/metadata/nasa/metadata/mediatype',
    );
    expect(shown.lines).to.deep.equal(['"movies"']);
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

    const shown = await fetchItem({ identifier: 'foo' });

    expect(String(fetchSpy.mock.calls[0][0])).to.contain(
      'https://archive.org/metadata/foo',
    );
    expect(shown.lines[0]).to.equal('title: Foo');
  });

  test('suggests the sample data when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));

    const shown = await fetchItem();

    expect(shown.error).to.contain('MetadataService.NetworkError');
    expect(shown.error).to.contain('Try "Sample data"');
  });

  test('sends no request for an identifier that climbs out of /metadata/', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    const shown = await fetchItem({ identifier: '..' });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(shown.request).to.be.undefined;
    expect(shown.error).to.contain('Invalid identifier or path');
  });
});
