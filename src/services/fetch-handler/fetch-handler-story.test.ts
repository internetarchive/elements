import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { FetchHandlerStory } from './fetch-handler-story';
import './fetch-handler-story';

async function story() {
  return fixture<FetchHandlerStory>(
    html`<fetch-handler-story></fetch-handler-story>`,
  );
}

async function run(
  el: FetchHandlerStory,
  options: { path?: string; sample?: boolean } = {},
) {
  const root = el.shadowRoot!;
  const path = root.querySelector('label.path input') as HTMLInputElement;
  const sample = root.querySelector(
    'input[type="checkbox"]',
  ) as HTMLInputElement;
  if (options.path !== undefined) {
    path.value = options.path;
    path.dispatchEvent(new Event('input'));
  }
  if (options.sample) {
    sample.checked = true;
    sample.dispatchEvent(new Event('change'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  // The fetch resolves on a later tick, so wait for the result to render.
  await vi.waitFor(() => {
    if (!root.querySelector('.call')) throw new Error('no result yet');
  });
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    request: root.querySelector('.request')?.textContent?.replace(/\s+/g, ' '),
    body: root.querySelector('.output')?.textContent,
    error: root.querySelector('.error')?.textContent,
  };
}

describe('fetch-handler story', () => {
  afterEach(() => vi.restoreAllMocks());

  test('shows nothing until Fetch is clicked', async () => {
    const el = await story();

    expect(el.shadowRoot!.querySelector('.call')).to.be.null;
  });

  test('answers from the sample without touching the network', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const el = await story();

    const shown = await run(el, { sample: true });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(shown.call).to.equal(
      'fetchApiPathResponse("/metadata/prelinger/metadata/title")',
    );
    expect(shown.request).to.contain(
      'GET https://archive.org/metadata/prelinger/metadata/title → 200',
    );
    expect(JSON.parse(shown.body!)).to.deep.equal({
      result: 'Prelinger Archives',
    });
  });

  test('fetches the typed path from archive.org', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{"hello":"world"}', { status: 200 }));
    const el = await story();

    const shown = await run(el, { path: '/metadata/foo' });

    expect(fetchSpy.mock.calls[0][0]).to.equal(
      'https://archive.org/metadata/foo',
    );
    expect(shown.request).to.contain('→ 200');
    expect(JSON.parse(shown.body!)).to.deep.equal({ hello: 'world' });
  });

  test('suggests the sample data when the request fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('offline'));
    const el = await story();

    const shown = await run(el);

    expect(shown.error).to.contain('offline');
    expect(shown.error).to.contain('Sample data');
    expect(shown.request).to.contain('no response');
  });

  test('rejects a path that does not start with a slash', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const el = await story();

    const shown = await run(el, { path: '.evil.com/x' });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(shown.error).to.equal('The path has to start with a /.');
  });

  test('only suggests the sample data for a network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('<html>not found</html>', { status: 404 }),
    );
    const el = await story();

    const shown = await run(el, { path: '/nope' });

    expect(shown.error).to.contain('SyntaxError');
    expect(shown.error).not.to.contain('Sample data');
  });
});
