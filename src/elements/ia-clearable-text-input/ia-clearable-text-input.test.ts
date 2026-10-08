import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test, vi } from 'vitest';
import { html } from 'lit';

import type { IaClearableTextInput } from './ia-clearable-text-input';
import './ia-clearable-text-input';

let clearableTextInput: IaClearableTextInput;
let inputField: HTMLInputElement;
let clearButton: HTMLButtonElement;

describe('Clearable text input', () => {
  test('has a clear button, initially hidden', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    expect(clearButton).to.exist;
    expect(clearButton?.hidden).to.equal(true);
  });

  test('shows the clear button when forced by property, even without text', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        forceClearButton
      ></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    expect(clearButton?.hidden).to.equal(false);
  });

  test('shows the clear button when the input field has initial text', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    expect(clearButton?.hidden).to.equal(false);
  });

  test('shows the clear button when text is entered into the input field', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    inputField = clearableTextInput.shadowRoot?.querySelector(
      '#text-input',
    ) as HTMLInputElement;

    inputField.value = 'a';
    // Setting the input's value programmatically doesn't fire an input event.
    // So to simulate real user input, we need to fire the event as well.
    inputField.dispatchEvent(new Event('input'));

    await clearableTextInput.updateComplete;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    expect(clearButton?.hidden).to.equal(false);
  });

  test('clears the text field when the clear button is clicked', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    expect(clearableTextInput.value).to.equal('a');
    expect(clearButton?.hidden).to.equal(false);

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    clearButton.click();
    await clearableTextInput.updateComplete;

    expect(clearableTextInput.value).to.equal('');
    expect(clearButton?.hidden).to.equal(true);
  });

  test('focuses the text field upon clearing', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    inputField = clearableTextInput.shadowRoot?.querySelector(
      '#text-input',
    ) as HTMLInputElement;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    clearButton.click();
    await clearableTextInput.updateComplete;

    expect(clearableTextInput.shadowRoot?.activeElement).to.equal(inputField);
  });

  test('does not focus the text field upon clearing if focusOnClear is false', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .value=${'a'}
        .focusOnClear=${false}
      ></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    inputField = clearableTextInput.shadowRoot?.querySelector(
      '#text-input',
    ) as HTMLInputElement;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;
    clearButton.click();
    await clearableTextInput.updateComplete;

    expect(clearableTextInput.shadowRoot?.activeElement).to.not.equal(
      inputField,
    );
  });

  test('blurs and emits submit event upon hitting enter', async () => {
    const submitSpy = vi.fn();
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .value=${'a'}
        @submit=${submitSpy}
      ></ia-clearable-text-input>`,
    );

    inputField = clearableTextInput.shadowRoot?.querySelector(
      '#text-input',
    ) as HTMLInputElement;

    inputField.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    await clearableTextInput.updateComplete;

    expect(submitSpy).toHaveBeenCalledOnce();
    expect(clearableTextInput.shadowRoot?.activeElement).not.to.exist; // No focused element
  });

  test('accepts optional properties', async () => {
    const placeholder = 'Search...';
    const clearSRText = 'Clear search field';

    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .placeholder=${placeholder}
        .clearButtonScreenReaderLabel=${clearSRText}
      ></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    inputField = clearableTextInput.shadowRoot?.querySelector(
      '#text-input',
    ) as HTMLInputElement;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;

    expect(clearableTextInput).to.exist;
    expect(inputField.placeholder).to.equal(placeholder);
    expect(clearButton.textContent?.trim()).to.equal(clearSRText);
  });

  test('labels the text field with the screen reader label', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input
        .screenReaderLabel=${'Enter your first name'}
      ></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    const label = clearableTextInput.shadowRoot?.querySelector(
      'label[for="text-input"]',
    ) as HTMLLabelElement;

    expect(label.textContent?.trim()).to.equal('Enter your first name');
  });

  test('labels the clear button "Clear" by default', async () => {
    clearableTextInput = await fixture<IaClearableTextInput>(
      html`<ia-clearable-text-input .value=${'a'}></ia-clearable-text-input>`,
    );
    await clearableTextInput.updateComplete;

    clearButton = clearableTextInput.shadowRoot?.querySelector(
      '#clear-button',
    ) as HTMLButtonElement;

    expect(clearButton.textContent?.trim()).to.equal('Clear');
  });
});
