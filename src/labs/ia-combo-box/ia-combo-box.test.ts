import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type { IAComboBox } from './ia-combo-box';
import './ia-combo-box';

const BASIC_OPTIONS = [
  { id: 'foo', text: 'Foo Option' },
  { id: 'bar', text: 'Bar Option' },
  { id: 'baz', text: 'Baz Option' },
  { id: 'boop', text: 'Boop Option' },
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
        <ia-combo-box><span>Some label</span></ia-combo-box>
      `);

      const label = el.shadowRoot?.querySelector('#label');
      expect(label).to.exist;

      const unnamedSlot = label?.querySelector(
        'slot:not([name])',
      ) as HTMLSlotElement;
      expect(unnamedSlot).to.exist;
      expect(unnamedSlot.assignedElements()[0].textContent).to.equal(
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

      const textInput = el.shadowRoot?.querySelector('#text-input');
      expect(textInput?.classList.contains('editable')).to.be.false;
    });

    // TODO ...
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

      const textInput = el.shadowRoot?.querySelector('#text-input');
      expect(textInput?.classList.contains('editable')).to.be.true;
    });

    // TODO ...
  });

  describe('Freeform behavior', () => {
    test('has editable text field', async () => {
      const el = await fixture<IAComboBox>(html`
        <ia-combo-box
          behavior="freeform"
          .options=${BASIC_OPTIONS}
        ></ia-combo-box>
      `);

      const textInput = el.shadowRoot?.querySelector('#text-input');
      expect(textInput?.classList.contains('editable')).to.be.true;
    });

    // TODO ...
  });

  describe('Filtering presets', () => {
    test('default is substring filtering', async () => {
      const el = await fixture<IAComboBox>(html`<ia-combo-box></ia-combo-box>`);
      expect(el.filter).to.equal('substring');
    });

    // TODO ...
  });

  describe('Sorting behavior', () => {
    test('does not sort by default', async () => {
      const el = await fixture<IAComboBox>(html`<ia-combo-box></ia-combo-box>`);
      expect(el.sort).to.be.false;
    });

    // TODO ...
  });

  describe('Keyboard navigation', () => {
    test('Enter key opens options list', async () => {
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

    // TODO ...
  });
});
