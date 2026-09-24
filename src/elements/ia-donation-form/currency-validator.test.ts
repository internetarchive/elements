import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import { CurrencyValidator } from './currency-validator';

/**
 * Renders an input guarded by the validator, with `value` in it and the
 * given range selected (a collapsed selection at the end by default).
 */
async function guardedInput(
  value = '',
  selection?: [number, number],
): Promise<HTMLInputElement> {
  const validator = new CurrencyValidator();
  const el = await fixture<HTMLInputElement>(
    html`<input type="text" .value=${value} @keydown=${validator.keydown} />`,
  );
  const [start, end] = selection ?? [value.length, value.length];
  el.setSelectionRange(start, end);
  return el;
}

/** Fires a cancelable keydown and reports whether the validator blocked it. */
function press(
  el: HTMLInputElement,
  init: KeyboardEventInit,
): { blocked: boolean } {
  const event = new KeyboardEvent('keydown', { ...init, cancelable: true });
  el.dispatchEvent(event);
  return { blocked: event.defaultPrevented };
}

describe('CurrencyValidator', () => {
  test('allows a digit', async () => {
    const el = await guardedInput();
    expect(press(el, { key: '3' }).blocked).to.be.false;
  });

  test('disallows a letter', async () => {
    const el = await guardedInput();
    expect(press(el, { key: 'a' }).blocked).to.be.true;
  });

  test('allows a single decimal point', async () => {
    const el = await guardedInput('3');
    expect(press(el, { key: '.' }).blocked).to.be.false;
  });

  test('disallows a second decimal point', async () => {
    const el = await guardedInput('3.3');
    expect(press(el, { key: '.' }).blocked).to.be.true;
  });

  test('allows up to two decimal places', async () => {
    const el = await guardedInput('3.4');
    expect(press(el, { key: '5' }).blocked).to.be.false;
  });

  test('disallows a third decimal place', async () => {
    const el = await guardedInput('3.45');
    expect(press(el, { key: '6' }).blocked).to.be.true;
  });

  test('judges the value after a selected range is replaced', async () => {
    const el = await guardedInput('456', [1, 2]);
    expect(press(el, { key: '3' }).blocked).to.be.false;
    expect(press(el, { key: 'a' }).blocked).to.be.true;
  });

  test('allows typing over a select-all', async () => {
    const el = await guardedInput('456', [0, 3]);
    expect(press(el, { key: '3' }).blocked).to.be.false;
  });

  test('allows anything with the meta key held', async () => {
    const el = await guardedInput('456');
    expect(press(el, { key: 'a', metaKey: true }).blocked).to.be.false;
  });

  test.each([
    'Tab',
    'Delete',
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ])('allows the %s key', async (key) => {
    const el = await guardedInput('456');
    expect(press(el, { key }).blocked).to.be.false;
  });

  test.each(['Shift', 'Control'])('disallows the %s key', async (key) => {
    const el = await guardedInput('456');
    expect(press(el, { key }).blocked).to.be.true;
  });
});
