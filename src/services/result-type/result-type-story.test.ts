import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { ResultTypeStory } from './result-type-story';
import './result-type-story';

async function divide(a: string, b: string) {
  const el = await fixture<ResultTypeStory>(
    html`<result-type-story></result-type-story>`,
  );
  const root = el.shadowRoot!;
  const [inputA, inputB] = Array.from(
    root.querySelectorAll('input[type="text"]'),
  ) as HTMLInputElement[];
  inputA.value = a;
  inputA.dispatchEvent(new Event('input'));
  inputB.value = b;
  inputB.dispatchEvent(new Event('input'));
  (root.querySelector('form') as HTMLFormElement).requestSubmit();
  await el.updateComplete;
  return {
    call: root.querySelector('.call')?.textContent,
    output: root.querySelector('.output')?.textContent,
  };
}

describe('result-type story', () => {
  test('shows no result until the form is submitted', async () => {
    const el = await fixture<ResultTypeStory>(
      html`<result-type-story></result-type-story>`,
    );

    expect(el.shadowRoot!.querySelector('.output')).to.be.null;
  });

  test('returns a success value', async () => {
    const { call, output } = await divide('10', '4');

    expect(call).to.equal('divide("10", "4")');
    expect(output).to.equal('{ success: 2.5 }');
  });

  test('returns an error for a zero divisor', async () => {
    const { output } = await divide('1', '0');

    expect(output).to.equal('{ error: DivisionError("divide-by-zero") }');
  });

  test('returns an error for input that is not a number', async () => {
    const { output } = await divide('abc', '2');

    expect(output).to.equal('{ error: DivisionError("not-a-number") }');
  });
});
