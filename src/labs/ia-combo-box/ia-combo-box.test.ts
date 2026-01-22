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
