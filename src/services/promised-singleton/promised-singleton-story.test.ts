import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { PromisedSingletonStory } from './promised-singleton-story';
import './promised-singleton-story';

async function story() {
  return fixture<PromisedSingletonStory>(
    html`<promised-singleton-story></promised-singleton-story>`,
  );
}

async function get(el: PromisedSingletonStory, count?: number) {
  const root = el.shadowRoot!;
  if (count !== undefined) {
    const input = root.querySelector(
      'input[type="number"]',
    ) as HTMLInputElement;
    input.value = String(count);
    input.dispatchEvent(new Event('input'));
  }
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  // The generator takes half a second, so wait for the result to change.
  await vi.waitFor(
    () => {
      const lines = root.querySelectorAll('.lines li');
      if (!lines.length) throw new Error('still running');
    },
    { timeout: 3000 },
  );
  await el.updateComplete;
  return Array.from(root.querySelectorAll('.lines li')).map(
    (li) => li.textContent,
  );
}

function runs(el: PromisedSingletonStory) {
  return el.shadowRoot!.querySelector('.runs')!.textContent!.trim();
}

describe('promised-singleton story', () => {
  test('starts with no result and no generator runs', async () => {
    const el = await story();

    expect(el.shadowRoot!.querySelector('.lines')).to.be.null;
    expect(runs(el)).to.equal('Generator has run 0 times');
  });

  test('runs the generator once for many concurrent requests', async () => {
    const el = await story();

    const lines = await get(el, 4);

    expect(lines).to.have.length(4);
    expect(
      new Set(lines.map((line) => line!.replace(/^get\(\) \d+ /, ''))),
    ).to.have.property('size', 1);
    expect(lines[0]).to.contain('resolved: result of run 1');
    expect(runs(el)).to.equal('Generator has run 1 times');
  });

  test('shares one error between concurrent requests', async () => {
    const el = await story();
    const checkbox = el.shadowRoot!.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));

    const lines = await get(el, 3);

    expect(
      lines.every((line) => line!.includes('rejected: generator run 1 failed')),
    ).to.be.true;
    expect(runs(el)).to.equal('Generator has run 1 times');
  });

  test('runs the generator again after Reset', async () => {
    const el = await story();
    await get(el, 2);

    (
      el.shadowRoot!.querySelector('button[type="button"]') as HTMLButtonElement
    ).click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.lines')).to.be.null;
    const lines = await get(el, 2);

    expect(lines[0]).to.contain('result of run 2');
    expect(runs(el)).to.equal('Generator has run 2 times');
  });
});
