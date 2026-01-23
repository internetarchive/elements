import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAComboBox } from './ia-combo-box';
import './ia-combo-box';

const BASIC_OPTIONS = [
  { id: 'foo', text: 'Foo' },
  { id: 'bar', text: 'Bar' },
  { id: 'baz', text: 'Baz' },
  { id: 'buzz', text: 'Buzz' },
];

describe('IA Combo Box', () => {
  describe('Basic structure & simple options', () => {
    test('renders empty component', async () => {
      const el = await fixture<IAComboBox>(html`<ia-combo-box></ia-combo-box>`);

      const textInput = el.shadowRoot?.querySelector('#text-input');
      expect(textInput).to.exist;

      const caretButton = el.shadowRoot?.querySelector('#caret-button');
      expect(caretButton).to.exist;
    });

    test('renders component with label', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box><span slot="label">Some label</span></ia-combo-box>
      `);

      const label = el.shadowRoot?.querySelector('#label');
      expect(label).to.exist;

      const labelSlot = label?.querySelector(
        'slot[name="label"]',
      ) as HTMLSlotElement;
      expect(labelSlot).to.exist;
      expect(labelSlot.assignedElements()[0].textContent).to.equal(
        'Some label',
      );
    });

    test('renders component with placeholder', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box placeholder="foo"></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector('#text-input');
      expect(textInput).to.exist;
      expect(textInput!.getAttribute('placeholder')).to.equal('foo');
    });

    test('renders component with options', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      const optionsList = el.shadowRoot?.querySelector(
        '#options-list',
      ) as HTMLUListElement;
      expect(optionsList).to.exist;

      const caretButton = el.shadowRoot?.querySelector(
        '#caret-button',
      ) as HTMLButtonElement;
      expect(caretButton).to.exist;

      caretButton.click();
      await el.updateComplete;

      const allOptionElmts = optionsList.querySelectorAll('.option');
      expect(allOptionElmts.length).to.equal(BASIC_OPTIONS.length);
      for (const [index, option] of Object.entries(BASIC_OPTIONS)) {
        const optionElmt = allOptionElmts[Number(index)];
        expect(optionElmt.textContent.trim()).to.equal(option.text);
      }
    });

    test('renders component with max 2 options shown', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          max-autocomplete-entries="2"
        ></ia-combo-box>
      `);

      const optionsList = el.shadowRoot?.querySelector(
        '#options-list',
      ) as HTMLUListElement;
      expect(optionsList).to.exist;

      const caretButton = el.shadowRoot?.querySelector(
        '#caret-button',
      ) as HTMLButtonElement;
      expect(caretButton).to.exist;

      caretButton.click();
      await el.updateComplete;

      const allOptionElmts = optionsList.querySelectorAll('.option');
      expect(allOptionElmts.length).to.equal(2);
    });
  });

  describe('Select-only behavior', () => {
    test('has non-editable text field', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          behavior="select-only"
          .options=${BASIC_OPTIONS}
        ></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.readOnly).to.be.true;
    });
  });

  describe('List behavior', () => {
    test('is the default behavior', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      expect(el.behavior).to.equal('list');
    });

    test('has editable text field', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box behavior="list" .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.readOnly).to.be.false;
    });
  });

  describe('Freeform behavior', () => {
    test('has editable text field', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          behavior="freeform"
          .options=${BASIC_OPTIONS}
        ></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.readOnly).to.be.false;
    });
  });

  describe('Filtering presets', () => {
    test('default is substring filtering', async () => {
      const el = await fixture<IAComboBox>(html`<ia-combo-box></ia-combo-box>`);
      expect(el.filter).to.equal('substring');
    });

    test('"all" filtering preset turns off filtering entirely', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box
          .options=${BASIC_OPTIONS}
          filter="all"
        ></ia-combo-box>`,
      );

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'b';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      // Options were not filtered
      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(4);
    });

    test('"prefix" filtering preset works correctly', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box
          .options=${BASIC_OPTIONS}
          filter="prefix"
        ></ia-combo-box>`,
      );

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'b';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      // Filtered options are 'Bar', 'Baz', and 'Buzz'
      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(3);
      expect(allOptionElmts?.[0].textContent.trim()).to.equal('Bar');
      expect(allOptionElmts?.[1].textContent.trim()).to.equal('Baz');
      expect(allOptionElmts?.[2].textContent.trim()).to.equal('Buzz');
    });

    test('"suffix" filtering preset works correctly', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box
          .options=${BASIC_OPTIONS}
          filter="suffix"
        ></ia-combo-box>`,
      );

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'z';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      // Filtered options are 'Baz' and 'Buzz'
      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(2);
      expect(allOptionElmts?.[0].textContent.trim()).to.equal('Baz');
      expect(allOptionElmts?.[1].textContent.trim()).to.equal('Buzz');
    });

    test('"substring" filtering preset works correctly', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box
          .options=${BASIC_OPTIONS}
          filter="substring"
        ></ia-combo-box>`,
      );

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'a';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      // Filtered options are 'Bar' and 'Baz'
      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(2);
      expect(allOptionElmts?.[0].textContent.trim()).to.equal('Bar');
      expect(allOptionElmts?.[1].textContent.trim()).to.equal('Baz');
    });

    test('"subsequence" filtering preset works correctly', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box
          .options=${BASIC_OPTIONS}
          filter="subsequence"
        ></ia-combo-box>`,
      );

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'bz';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      // Filtered options are 'Baz' and 'Buzz'
      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(2);
      expect(allOptionElmts?.[0].textContent.trim()).to.equal('Baz');
      expect(allOptionElmts?.[1].textContent.trim()).to.equal('Buzz');
    });
  });

  describe('Sorting behavior', () => {
    test('does not sort by default', async () => {
      const el = await fixture<IAComboBox>(html`<ia-combo-box></ia-combo-box>`);
      expect(el.sort).to.be.false;
    });

    test('shows options in provided order when sort=false', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box .options=${BASIC_OPTIONS} open></ia-combo-box>`,
      );

      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(4);
      expect(allOptionElmts?.[0].textContent.trim()).to.equal('Foo');
      expect(allOptionElmts?.[1].textContent.trim()).to.equal('Bar');
      expect(allOptionElmts?.[2].textContent.trim()).to.equal('Baz');
      expect(allOptionElmts?.[3].textContent.trim()).to.equal('Buzz');
    });

    test('shows options in lexicographic order when sort=true', async () => {
      const el = await fixture<IAComboBox>(
        html`<ia-combo-box .options=${BASIC_OPTIONS} sort open></ia-combo-box>`,
      );

      const allOptionElmts = el.shadowRoot?.querySelectorAll('.option');
      expect(allOptionElmts?.length).to.equal(4);
      expect(allOptionElmts?.[0].textContent.trim()).to.equal('Bar');
      expect(allOptionElmts?.[1].textContent.trim()).to.equal('Baz');
      expect(allOptionElmts?.[2].textContent.trim()).to.equal('Buzz');
      expect(allOptionElmts?.[3].textContent.trim()).to.equal('Foo');
    });
  });

  describe('Case sensitivity', () => {
    test('filters case-insensitively by default', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);
      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'b';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      const options = el.shadowRoot?.querySelectorAll('.option');
      expect(options?.length).to.equal(3); // Lowercase filter still matches 3 options starting with uppercase B
    });

    test('filters case-sensitively when case-sensitive is true', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} case-sensitive></ia-combo-box>
      `);
      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.value = 'b';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      let options = el.shadowRoot?.querySelectorAll('.option');
      expect(options?.length).to.equal(0); // No options start with lowercase b

      textInput.value = 'B';
      textInput.dispatchEvent(new InputEvent('input'));
      await el.updateComplete;

      options = el.shadowRoot?.querySelectorAll('.option');
      expect(options?.length).to.equal(3); // 3 options start with uppercase B
    });
  });

  describe('Arrow key wrapping', () => {
    test('does not wrap by default', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} open></ia-combo-box>
      `);

      const lastOption = el.shadowRoot?.querySelector(
        '.option:last-of-type',
      ) as HTMLLIElement;
      expect(lastOption).to.exist;

      // Start by highlighting the last option
      lastOption.dispatchEvent(new PointerEvent('pointerenter'));
      await el.updateComplete;
      expect(lastOption.classList.contains('highlight')).to.be.true;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      );
      await el.updateComplete;

      // After down arrow, last option should still be highlighted (didn't wrap)
      expect(lastOption.classList.contains('highlight')).to.be.true;
    });

    test('wraps from bottom to top when wrap-arrow-keys is true', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          open
          wrap-arrow-keys
        ></ia-combo-box>
      `);

      const lastOption = el.shadowRoot?.querySelector(
        '.option:last-of-type',
      ) as HTMLLIElement;
      expect(lastOption).to.exist;

      // Start by highlighting the last option
      lastOption.dispatchEvent(new PointerEvent('pointerenter'));
      await el.updateComplete;
      expect(lastOption.classList.contains('highlight')).to.be.true;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      );
      await el.updateComplete;

      // After down arrow, we wrap around to the first option
      const firstOption = el.shadowRoot?.querySelector('.option:first-of-type');
      expect(firstOption?.classList.contains('highlight')).to.be.true;
    });

    test('wraps from top to bottom when wrap-arrow-keys is true', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          open
          wrap-arrow-keys
        ></ia-combo-box>
      `);

      const firstOption = el.shadowRoot?.querySelector(
        '.option:first-of-type',
      ) as HTMLLIElement;
      expect(firstOption).to.exist;

      // Start by highlighting the first option
      firstOption.dispatchEvent(new PointerEvent('pointerenter'));
      await el.updateComplete;
      expect(firstOption.classList.contains('highlight')).to.be.true;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await el.updateComplete;

      // After up arrow, we wrap around to the last option
      const lastOption = el.shadowRoot?.querySelector('.option:last-of-type');
      expect(lastOption?.classList.contains('highlight')).to.be.true;
    });
  });

  describe('Stay-open behavior', () => {
    test('closes by default on selection', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} open></ia-combo-box>
      `);

      const firstOption = el.shadowRoot?.querySelector(
        '.option',
      ) as HTMLLIElement;
      expect(firstOption).to.exist;

      firstOption.click();
      await el.updateComplete;

      expect(el.open).to.be.false;
    });

    test('stays open on selection when stay-open is true', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} open stay-open></ia-combo-box>
      `);

      const firstOption = el.shadowRoot?.querySelector(
        '.option',
      ) as HTMLLIElement;
      expect(firstOption).to.exist;

      firstOption.click();
      await el.updateComplete;

      expect(el.open).to.be.true;
    });
  });

  describe('Clearable flag', () => {
    test('omits the clear button by default', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} value="foo"></ia-combo-box>
      `);

      const clearButton = el.shadowRoot?.querySelector(
        '#clear-button',
      ) as HTMLButtonElement;
      expect(clearButton).not.to.exist;
    });

    test('when clearable is true, shows a clear button when it has a value', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          value="foo"
          clearable
        ></ia-combo-box>
      `);

      const clearButton = el.shadowRoot?.querySelector(
        '#clear-button',
      ) as HTMLButtonElement;
      expect(clearButton).to.exist;
      expect(clearButton.hidden).to.be.false;
    });

    test('when clearable is true, hides the clear button when value is empty', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} clearable></ia-combo-box>
      `);

      const clearButton = el.shadowRoot?.querySelector(
        '#clear-button',
      ) as HTMLButtonElement;
      expect(clearButton).to.exist;
      expect(clearButton.hidden).to.be.true;
    });

    test('clicking the clear button resets the value', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          value="foo"
          clearable
        ></ia-combo-box>
      `);

      const clearButton = el.shadowRoot?.querySelector(
        '#clear-button',
      ) as HTMLButtonElement;
      expect(clearButton).to.exist;

      clearButton.click();
      await el.updateComplete;

      expect(el.value).to.be.null;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      // Also focuses the input and re-opens the options menu
      expect(el.shadowRoot?.activeElement).to.equal(textInput);
      expect(el.open).to.be.true;
    });
  });

  describe('Disabled state', () => {
    test('disables widget elements when disabled property is true', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} disabled></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.disabled).to.be.true;

      const caretButton = el.shadowRoot?.querySelector(
        '#caret-button',
      ) as HTMLButtonElement;
      expect(caretButton).to.exist;
      expect(caretButton.disabled).to.be.true;
    });
  });

  describe('Value property', () => {
    test('in list mode, updates the text box when a valid value is set', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      el.value = 'baz';
      await el.updateComplete;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.value).to.equal('Baz');
      expect(el.selectedOption?.id).to.equal('baz');
    });

    test('in list mode, clears the selection when an invalid value is set', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} value="foo"></ia-combo-box>
      `);

      el.value = 'invalid';
      await el.updateComplete;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.value).to.equal('');
      expect(el.value).to.be.null;
    });

    test('in freeform mode, updates the text box when a predefined option value is set', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          behavior="freeform"
        ></ia-combo-box>
      `);

      el.value = 'buzz';
      await el.updateComplete;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.value).to.equal('Buzz');
      expect(el.selectedOption?.id).to.equal('buzz');
    });

    test('in freeform mode, updates the text box when an arbitrary value is set', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          .options=${BASIC_OPTIONS}
          behavior="freeform"
        ></ia-combo-box>
      `);

      el.value = 'some custom text';
      await el.updateComplete;

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;
      expect(textInput.value).to.equal('some custom text');
      expect(el.selectedOption).to.be.null;
    });
  });

  describe('Common keyboard navigation', () => {
    test('Enter key opens options list w/o highlight', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await el.updateComplete;
      expect(el.open).to.be.true;

      // No option highlighted
      expect(el.shadowRoot?.querySelector('.highlight')).not.to.exist;
    });

    test('Alt + Down key combo opens options list w/o highlight', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', altKey: true }),
      );
      await el.updateComplete;
      expect(el.open).to.be.true;

      // No option highlighted
      expect(el.shadowRoot?.querySelector('.highlight')).not.to.exist;
    });

    test('Down arrow opens options list and highlights first option', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      );
      await el.updateComplete;
      expect(el.open).to.be.true;

      // Only the first option is highlighted
      const firstOption = el.shadowRoot?.querySelector('.option');
      expect(firstOption?.classList.contains('highlight')).to.be.true;
      expect(el.shadowRoot?.querySelectorAll('.highlight').length).to.equal(1);
    });

    test('Up arrow opens options list and highlights last option', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS}></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      await el.updateComplete;
      expect(el.open).to.be.true;

      // Only the last option is highlighted
      const lastOption = el.shadowRoot?.querySelector('.option:last-of-type');
      expect(lastOption?.classList.contains('highlight')).to.be.true;
      expect(el.shadowRoot?.querySelectorAll('.highlight').length).to.equal(1);
    });

    test('Escape key closes options list', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} open></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await el.updateComplete;
      expect(el.open).to.be.false;
    });

    test('Alt + Up key combo closes options list', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box .options=${BASIC_OPTIONS} open></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector(
        '#text-input',
      ) as HTMLInputElement;
      expect(textInput).to.exist;

      textInput.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', altKey: true }),
      );
      await el.updateComplete;
      expect(el.open).to.be.false;
    });
  });
});
