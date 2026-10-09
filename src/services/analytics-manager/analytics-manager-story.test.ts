import { fixture } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { AnalyticsManagerStory } from './analytics-manager-story';
import './analytics-manager-story';

async function story() {
  return fixture<AnalyticsManagerStory>(
    html`<analytics-manager-story></analytics-manager-story>`,
  );
}

async function send(
  el: AnalyticsManagerStory,
  fields: { category: string; action: string; label?: string },
  method?: string,
) {
  const root = el.shadowRoot!;
  if (method) {
    const select = root.querySelector('select') as HTMLSelectElement;
    select.value = method;
    select.dispatchEvent(new Event('change'));
    await el.updateComplete;
  }
  const [category, action, label] = Array.from(
    root.querySelectorAll('input[type="text"]'),
  ) as HTMLInputElement[];
  const fill = (input: HTMLInputElement, value: string) => {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };
  fill(category, fields.category);
  fill(action, fields.action);
  fill(label, fields.label ?? '');
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await el.updateComplete;
}

function params(el: AnalyticsManagerStory): Record<string, string> {
  const rows = Array.from(el.shadowRoot!.querySelectorAll('tr'));
  return Object.fromEntries(
    rows.map((row) => [
      row.querySelector('th')!.textContent!,
      row.querySelector('td')!.textContent!,
    ]),
  );
}

describe('analytics-manager story', () => {
  afterEach(() => vi.restoreAllMocks());

  test('shows nothing until an event is sent', async () => {
    const el = await story();

    expect(el.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test('shows the ping an event would send', async () => {
    const el = await story();

    await send(el, { category: 'foo', action: 'bar', label: 'baz' });

    const shown = params(el);
    expect(shown.kind).to.equal('event');
    expect(shown.ec).to.equal('foo');
    expect(shown.ea).to.equal('bar');
    expect(shown.el).to.equal('baz');
    expect(shown.service).to.equal('ao_2');
    expect(el.shadowRoot!.querySelector('.output')?.textContent).to.equal(
      'https://athena.archive.org/0.gif',
    );
  });

  test('sends the unsampled event on the no-sampling service', async () => {
    const el = await story();

    await send(el, { category: 'foo', action: 'bar' }, 'sendEventNoSampling');

    expect(params(el).service).to.equal('ao_no_sampling');
  });

  test('tracks the iax parameter as an unsampled event', async () => {
    const el = await story();

    await send(el, { category: 'foo', action: 'bar' }, 'trackIaxParameter');

    const shown = params(el);
    expect(shown.ec).to.equal('foo');
    expect(shown.ea).to.equal('bar');
    expect(shown.service).to.equal('ao_no_sampling');
  });

  test('never sends a real beacon, and puts sendBeacon back', async () => {
    const original = navigator.sendBeacon;
    const el = await story();

    await send(el, { category: 'foo', action: 'bar' });

    expect(navigator.sendBeacon).to.equal(original);
  });
});
