import { describe, expect, test, vi } from 'vitest';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';

import type { IaClearableTextInput } from './ia-clearable-text-input';
import './ia-clearable-text-input';

/** The clear button inside the component's shadow root. */
const clearButtonOf = (el: IaClearableTextInput): HTMLButtonElement =>
  el.shadowRoot?.querySelector('#clear-button') as HTMLButtonElement;

/** The text field inside the component's shadow root. */
const inputOf = (el: IaClearableTextInput): HTMLInputElement =>
  el.shadowRoot?.querySelector('#text-input') as HTMLInputElement;

describe('IaClearableTextInput', () => {
  test('has a clear button, initially hidden', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    const clearButton = clearButtonOf(el);
    expect(clearButton).to.exist;
    expect(clearButton.hidden).to.equal(true);
  });

  test('shows the clear button when forced by property, even without text', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        forceClearButton
      ></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    expect(clearButtonOf(el).hidden).to.equal(false);
  });

  test('shows the clear button when the input field has initial text', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    expect(clearButtonOf(el).hidden).to.equal(false);
  });

  test('shows the clear button when text is entered into the input field', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    const inputField = inputOf(el);
    inputField.value = 'a';
    // Setting the input's value programmatically doesn't fire an input event.
    // So to simulate real user input, we need to fire the event as well.
    inputField.dispatchEvent(new Event('input'));
    await el.updateComplete;

    expect(clearButtonOf(el).hidden).to.equal(false);
  });

  test('clears the text field when the clear button is clicked', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    expect(el.value).to.equal('a');
    expect(clearButtonOf(el).hidden).to.equal(false);

    clearButtonOf(el).click();
    await el.updateComplete;

    expect(el.value).to.equal('');
    expect(clearButtonOf(el).hidden).to.equal(true);
  });

  test('focuses the text field upon clearing', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    clearButtonOf(el).click();
    await el.updateComplete;

    expect(el.shadowRoot?.activeElement).to.equal(inputOf(el));
  });

  test('does not focus the text field upon clearing if focusOnClear is false', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .value=${'a'}
        .focusOnClear=${false}
      ></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    clearButtonOf(el).click();
    await el.updateComplete;

    expect(el.shadowRoot?.activeElement).to.not.equal(inputOf(el));
  });

  test('emits a clear event carrying the value it had before clearing', async () => {
    const clearListener = vi.fn();
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .value=${'a'}
        @clear=${clearListener}
      ></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    clearButtonOf(el).click();
    await el.updateComplete;

    expect(clearListener).toHaveBeenCalledOnce();
    expect(clearListener.mock.calls[0][0].detail).to.equal('a');
  });

  test('blurs and emits submit event upon hitting enter', async () => {
    const submitListener = vi.fn();
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .value=${'a'}
        @submit=${submitListener}
      ></ia-clearable-text-input>`,
    );

    inputOf(el).dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    await el.updateComplete;

    expect(submitListener).toHaveBeenCalledOnce();
    expect(el.shadowRoot?.activeElement).to.not.exist; // No focused element
  });

  test('accepts optional properties', async () => {
    const placeholder = 'Search...';
    const clearSRText = 'Clear search field';

    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .placeholder=${placeholder}
        .clearButtonScreenReaderLabel=${clearSRText}
      ></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    expect(el).to.exist;
    expect(inputOf(el).placeholder).to.equal(placeholder);
    expect(clearButtonOf(el).textContent?.trim()).to.equal(clearSRText);
  });

  test('labels the text field with the given screen reader label', async () => {
    const el = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .screenReaderLabel=${'Enter your first name'}
      ></ia-clearable-text-input>`,
    );
    await el.updateComplete;

    const label = el.shadowRoot?.querySelector('label');
    expect(label?.textContent?.trim()).to.equal('Enter your first name');
    // the label has to point at the input for it to be announced
    expect(label?.getAttribute('for')).to.equal(inputOf(el).id);
  });
});
