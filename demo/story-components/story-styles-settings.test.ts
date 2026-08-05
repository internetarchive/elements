import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type {
  StoryStylesSettings,
  StyleInputData,
} from './story-styles-settings';
import './story-styles-settings';

async function makeSettings(
  data: StyleInputData,
): Promise<StoryStylesSettings> {
  const el = await fixture<StoryStylesSettings>(html`
    <story-styles-settings .styleInputData=${data}></story-styles-settings>
  `);
  await el.updateComplete;
  return el;
}

function getInput(el: StoryStylesSettings, id: string): HTMLInputElement {
  const input = el.shadowRoot?.querySelector<HTMLInputElement>(`#${id}`);
  expect(input, `input #${id} should exist`).to.exist;
  return input as HTMLInputElement;
}

/** Finds one of the panel's action buttons by its visible label. */
function button(el: StoryStylesSettings, label: string): HTMLButtonElement {
  const match = [...(el.shadowRoot?.querySelectorAll('button') ?? [])].find(
    (b) => b.textContent?.includes(label),
  );
  expect(match, `button "${label}" should exist`).to.exist;
  return match as HTMLButtonElement;
}

const randomizeButton = (el: StoryStylesSettings) => button(el, 'Randomize');
const revertButton = (el: StoryStylesSettings) => button(el, 'Revert');

describe('StoryStylesSettings', () => {
  describe('range inputs', () => {
    const rangeData: StyleInputData = {
      settings: [
        {
          label: 'Foos',
          cssVariable: '--foo',
          defaultValue: 50,
          inputType: 'range',
          min: 0,
          max: 250,
          step: 10,
          unit: 'px',
        },
      ],
    };

    test('renders an input of type range with min/max/step set', async () => {
      const el = await makeSettings(rangeData);
      const input = getInput(el, 'foos');

      expect(input.type).to.equal('range');
      expect(input.min).to.equal('0');
      expect(input.max).to.equal('250');
      expect(input.step).to.equal('10');
      expect(input.value).to.equal('50');
      expect(input.dataset.unit).to.equal('px');
    });

    test('renders a readout linked to the input', async () => {
      const el = await makeSettings(rangeData);

      const readout = el.shadowRoot?.querySelector<HTMLOutputElement>(
        'output.style-readout',
      );
      expect(readout).to.exist;
      expect(readout?.getAttribute('for')).to.equal('foos');
      expect(readout?.textContent).to.equal('50px');
    });

    test('readout updates on input event with value + unit', async () => {
      const el = await makeSettings(rangeData);
      const input = getInput(el, 'foos');

      input.value = '200';
      input.dispatchEvent(new Event('input'));
      await el.updateComplete;

      const readout = el.shadowRoot?.querySelector<HTMLOutputElement>(
        'output.style-readout',
      );
      expect(readout?.textContent).to.equal('200px');
    });

    test('readout omits unit when unit is not provided', async () => {
      const el = await makeSettings({
        settings: [
          {
            label: 'Foos',
            cssVariable: '--foo',
            defaultValue: 0.5,
            inputType: 'range',
            min: 0,
            max: 1,
            step: 0.1,
          },
        ],
      });
      const input = getInput(el, 'foos');

      const readout = el.shadowRoot?.querySelector<HTMLOutputElement>(
        'output.style-readout',
      );
      expect(readout?.textContent).to.equal('0.5');

      input.value = '0.8';
      input.dispatchEvent(new Event('input'));
      await el.updateComplete;

      expect(readout?.textContent).to.equal('0.8'); // No unit included
    });
  });

  describe('number inputs', () => {
    const numberData: StyleInputData = {
      settings: [
        {
          label: 'Foos',
          cssVariable: '--foo',
          defaultValue: 1,
          inputType: 'number',
          min: 0,
          step: 1,
        },
      ],
    };

    test('renders an input of type number with min/step set', async () => {
      const el = await makeSettings(numberData);
      const input = getInput(el, 'foos');

      expect(input.type).to.equal('number');
      expect(input.min).to.equal('0');
      expect(input.step).to.equal('1');
      expect(input.value).to.equal('1');
    });
  });

  describe('non-numeric inputs', () => {
    test('text input ignores min/max/step even when set on the settings object', async () => {
      const el = await makeSettings({
        settings: [
          {
            label: 'Foos',
            cssVariable: '--foos',
            defaultValue: '200px',
            inputType: 'text',
            // These should be ignored for non-numeric input types
            min: 0,
            max: 100,
            step: 1,
          },
        ],
      });
      const input = getInput(el, 'foos');

      expect(input.type).to.equal('text');
      expect(input.hasAttribute('min')).to.be.false;
      expect(input.hasAttribute('max')).to.be.false;
      expect(input.hasAttribute('step')).to.be.false;
    });

    test('randomizing recolors every color input and applies the result', async () => {
      const el = await makeSettings({
        settings: [
          {
            label: 'Ink',
            cssVariable: '--ink',
            defaultValue: '#ffffff',
            inputType: 'color',
          },
          {
            label: 'Paper',
            cssVariable: '--paper',
            defaultValue: '#000000',
            inputType: 'color',
          },
          { label: 'Width', cssVariable: '--width', defaultValue: '10px' },
        ],
      });
      const applied = new Promise<CustomEvent>((resolve) => {
        el.addEventListener('stylesApplied', (e) => resolve(e as CustomEvent), {
          once: true,
        });
      });

      randomizeButton(el).click();

      // Both colors moved off their defaults...
      expect(getInput(el, 'ink').value).to.not.equal('#ffffff');
      expect(getInput(el, 'paper').value).to.not.equal('#000000');
      // ...and each is a usable hex color.
      expect(getInput(el, 'ink').value).to.match(/^#[0-9a-f]{6}$/);

      // The non-color input is deliberately untouched.
      expect(getInput(el, 'width').value).to.equal('10px');

      // The new colors are applied, not just staged in the inputs.
      const detail = (await applied).detail.styles as string;
      expect(detail).to.contain(`--ink: ${getInput(el, 'ink').value}`);
      expect(detail).to.contain('--width: 10px');
    });

    test('reverting after randomizing restores the defaults', async () => {
      const el = await makeSettings({
        settings: [
          {
            label: 'Ink',
            cssVariable: '--ink',
            defaultValue: '#ffffff',
            inputType: 'color',
          },
        ],
      });

      randomizeButton(el).click();
      expect(getInput(el, 'ink').value).to.not.equal('#ffffff');

      const reverted = new Promise<CustomEvent>((resolve) => {
        el.addEventListener('stylesApplied', (e) => resolve(e as CustomEvent), {
          once: true,
        });
      });
      revertButton(el).click();

      expect(getInput(el, 'ink').value).to.equal('#ffffff');
      // An empty payload clears overrides, falling back to component defaults.
      expect((await reverted).detail.styles).to.equal('');
    });

    test('input without inputType defaults to type=text', async () => {
      const el = await makeSettings({
        settings: [
          {
            label: 'Untyped',
            cssVariable: '--untyped',
            defaultValue: 'foo',
          },
        ],
      });
      const input = getInput(el, 'untyped');

      expect(input.type).to.equal('text');
    });
  });
});
