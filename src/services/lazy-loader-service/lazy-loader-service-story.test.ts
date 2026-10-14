import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { LazyLoaderServiceStory } from './lazy-loader-service-story';
import './lazy-loader-service-story';

async function load(options: {
  target?: 'sample' | 'missing';
  retries?: number;
}) {
  const el = await fixture<LazyLoaderServiceStory>(
    html`<lazy-loader-service-story></lazy-loader-service-story>`,
  );
  const root = el.shadowRoot!;
  if (options.target) {
    const select = root.querySelector('select') as HTMLSelectElement;
    select.value = options.target;
    select.dispatchEvent(new Event('change'));
  }
  const [retries, interval] = Array.from(
    root.querySelectorAll('input[type="number"]'),
  ) as HTMLInputElement[];
  retries.value = String(options.retries ?? 2);
  retries.dispatchEvent(new Event('input'));
  interval.value = '0.01';
  interval.dispatchEvent(new Event('input'));
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await vi.waitFor(() => {
    if (!root.querySelector('.output')) throw new Error('still loading');
  });
  await el.updateComplete;
  return {
    outcome: root.querySelector('.output')?.textContent ?? '',
    events: Array.from(root.querySelectorAll('.events li')).map(
      (li) => li.textContent,
    ),
    tags: root.querySelector('.tags')?.textContent ?? '',
  };
}

describe('lazy-loader-service story', () => {
  test('shows nothing until Load is clicked', async () => {
    const el = await fixture<LazyLoaderServiceStory>(
      html`<lazy-loader-service-story></lazy-loader-service-story>`,
    );

    expect(el.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test('loads the sample script with one script tag and no events', async () => {
    const shown = await load({ target: 'sample' });

    expect(shown.outcome).to.contain('resolved');
    expect(shown.events).to.deep.equal([]);
    expect(shown.tags.match(/<script/g)).to.have.length(1);
  });

  test('retries a missing script, then reports the failure once', async () => {
    const shown = await load({ target: 'missing', retries: 2 });

    expect(shown.outcome).to.contain('rejected');
    expect(shown.events).to.deep.equal([
      'scriptLoadRetried (retry 1)',
      'scriptLoadRetried (retry 2)',
      'scriptLoadFailed',
    ]);
    expect(shown.tags.match(/<script/g)).to.have.length(3);
  });

  test('fails straight away with no retries', async () => {
    const shown = await load({ target: 'missing', retries: 0 });

    expect(shown.events).to.deep.equal(['scriptLoadFailed']);
  });
});
