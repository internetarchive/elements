import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';

import type {
  StoryStylesSettings,
  StyleInputData,
  StylePalette,
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

    test('the panel still re-renders after the readout has updated', async () => {
      const el = await makeSettings(rangeData);
      const input = getInput(el, 'foos');

      input.value = '200';
      input.dispatchEvent(new Event('input'));
      await el.updateComplete;

      // Writing to the readout imperatively would eject Lit's markers, so
      // every later re-render of the panel would throw.
      el.requestUpdate();
      await el.updateComplete;

      expect(el.shadowRoot?.querySelectorAll('.style-input')).to.have.lengthOf(
        1,
      );
      expect(
        el.shadowRoot?.querySelector<HTMLOutputElement>('output.style-readout')
          ?.textContent,
      ).to.equal('200px');
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

    test('leaves the panel untouched when a story opts into nothing', async () => {
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

      // Stories that ask for no extras must render exactly as before, so
      // adding these controls for one component does not alter every demo.
      const buttons = [
        ...(el.shadowRoot?.querySelectorAll('button') ?? []),
      ].map((b) => b.textContent?.trim());
      expect(buttons).to.deep.equal(['Apply']);
      expect(el.shadowRoot?.querySelector('.style-var')).to.not.exist;
      expect(el.shadowRoot?.querySelector('.applied-palette')).to.not.exist;
    });

    test('shows the CSS variable only when the story asks for it', async () => {
      const withVars = await makeSettings({
        showCssVariables: true,
        settings: [
          { label: 'Ink', cssVariable: '--ink', defaultValue: '#ffffff' },
        ],
      });

      expect(
        withVars.shadowRoot?.querySelector('.style-var')?.textContent,
      ).to.contain('--ink');
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

  describe('palettes', () => {
    const PALETTES: StylePalette[] = [
      {
        name: 'Midnight',
        values: { '--ink': '#e0e6ed', '--paper': '#1b263b' },
      },
      {
        name: 'Forest',
        values: { '--ink': '#e8f5e9', '--paper': '#14301a' },
      },
    ];

    const paletteData: StyleInputData = {
      revertable: true,
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
      palettes: PALETTES,
    };

    /** The palette whose values currently fill the inputs, if any. */
    function activePalette(el: StoryStylesSettings): StylePalette | undefined {
      return PALETTES.find(
        (p) =>
          getInput(el, 'ink').value === p.values['--ink'] &&
          getInput(el, 'paper').value === p.values['--paper'],
      );
    }

    test('applies one whole palette rather than unrelated colors', async () => {
      const el = await makeSettings(paletteData);
      const applied = new Promise<CustomEvent>((resolve) => {
        el.addEventListener('stylesApplied', (e) => resolve(e as CustomEvent), {
          once: true,
        });
      });

      randomizeButton(el).click();

      // Every color came from the same palette — that coordination is what
      // keeps the foreground/background pairings legible.
      const palette = activePalette(el);
      expect(palette, 'inputs should match exactly one palette').to.exist;

      // The non-color input is left alone so the layout holds still.
      expect(getInput(el, 'width').value).to.equal('10px');

      // The palette is applied, not just staged in the inputs.
      const styles = (await applied).detail.styles as string;
      expect(styles).to.contain(`--ink: ${palette?.values['--ink']}`);
      expect(styles).to.contain(`--paper: ${palette?.values['--paper']}`);
    });

    test('names the theme it applied', async () => {
      const el = await makeSettings(paletteData);

      randomizeButton(el).click();
      await el.updateComplete;

      const readout =
        el.shadowRoot?.querySelector('.applied-palette')?.textContent;
      expect(readout).to.contain(activePalette(el)?.name);
    });

    test('never applies the same theme twice in a row', async () => {
      const el = await makeSettings(paletteData);
      let previous: string | undefined;

      // Each click must visibly change something, otherwise the control looks
      // broken.
      for (let i = 0; i < 6; i++) {
        randomizeButton(el).click();
        await el.updateComplete;
        const current = activePalette(el)?.name;
        expect(current, `click ${i + 1} should apply a palette`).to.exist;
        expect(
          current,
          `click ${i + 1} repeated the previous theme`,
        ).to.not.equal(previous);
        previous = current;
      }
    });

    test('reverting clears both the colors and the theme name', async () => {
      const el = await makeSettings(paletteData);

      randomizeButton(el).click();
      await el.updateComplete;
      expect(el.shadowRoot?.querySelector('.applied-palette')).to.exist;

      revertButton(el).click();
      await el.updateComplete;

      expect(getInput(el, 'ink').value).to.equal('#ffffff');
      expect(getInput(el, 'paper').value).to.equal('#000000');
      expect(el.shadowRoot?.querySelector('.applied-palette')).to.not.exist;
    });

    test('survives repeated randomize/revert cycles', async () => {
      const el = await makeSettings(paletteData);

      // Re-rendering must not disturb the settings rows. Interpolating <tr>
      // straight into <table> lets the parser hoist them into an implicit
      // tbody, ejecting Lit's markers and throwing on the next update.
      for (let i = 0; i < 3; i++) {
        randomizeButton(el).click();
        await el.updateComplete;
        revertButton(el).click();
        await el.updateComplete;
      }

      expect(el.shadowRoot?.querySelectorAll('.style-input')).to.have.lengthOf(
        3,
      );
      expect(el.shadowRoot?.querySelector('.applied-palette')).to.not.exist;
      expect(getInput(el, 'ink').value).to.equal('#ffffff');
    });

    test('offers randomize only alongside palettes, and revert only on request', async () => {
      const revertOnly = await makeSettings({
        revertable: true,
        settings: [
          {
            label: 'Ink',
            cssVariable: '--ink',
            defaultValue: '#ffffff',
            inputType: 'color',
          },
        ],
      });

      const buttons = [
        ...(revertOnly.shadowRoot?.querySelectorAll('button') ?? []),
      ].map((b) => b.textContent?.trim());
      // Color inputs alone are not enough — without themes there is nothing
      // coherent to swap in.
      expect(buttons.some((b) => b?.includes('Randomize'))).to.be.false;
      expect(buttons.some((b) => b?.includes('Revert'))).to.be.true;
    });
  });
});
