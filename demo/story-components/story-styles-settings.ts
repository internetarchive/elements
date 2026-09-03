import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { property, queryAll, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import themeStyles from '@src/themes/theme-styles';
import { labelToId } from '../story-utils';

export type StyleInputType = 'color' | 'text' | 'number' | 'range';

export type StyleInputSettings = {
  label: string;
  cssVariable: string;
  defaultValue: string | number;
  inputType?: StyleInputType;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

/**
 * A named set of coordinated color values, keyed by CSS custom property.
 * Supplying these lets the randomize control swap in a whole coherent theme
 * instead of assigning each color independently — which keeps every
 * foreground/background pairing legible.
 */
export type StylePalette = {
  name: string;
  values: Record<string, string>;
};

export type StyleInputData = {
  settings: StyleInputSettings[];

  /**
   * Alternate themes. Supplying them adds a control that swaps between them,
   * which is a quick way to check that every part of a component follows its
   * color knobs.
   */
  palettes?: StylePalette[];

  /** Adds a control that restores this story's default styling. */
  revertable?: boolean;

  /** Shows the CSS custom property each control sets, beside it. */
  showCssVariables?: boolean;
};

/**
 * A template for displaying the style options.
 */
@customElement('story-styles-settings')
export class StoryStylesSettings extends LitElement {
  @property({ type: Object }) styleInputData?: StyleInputData;

  /** Name of the palette currently showing, if any. */
  @state() private appliedPaletteName?: string;

  /** Live range-slider readouts, keyed by CSS variable. */
  @state() private rangeReadouts: Record<string, string> = {};

  @queryAll('.style-input')
  private styleInputs?: NodeListOf<HTMLInputElement>;

  render() {
    if (!this.styleInputData) return nothing;

    return html`
      <div class="settings-options">
        <table>
          <!-- The tbody is explicit on purpose: rows interpolated straight
               into <table> get hoisted into an implicit tbody by the parser,
               which ejects Lit's marker nodes and breaks later re-renders. -->
          <tbody>
            ${this.styleInputData.settings.map((input) =>
              this.renderStyleRow(input),
            )}
          </tbody>
        </table>
        <button @click=${this.applyStyles}>Apply</button>
        ${when(
          this.styleInputData.palettes?.length,
          () => html`
            <button @click=${this.randomizeColors}>🎲 Randomize colors</button>
          `,
        )}
        ${when(
          this.styleInputData.revertable,
          () => html`<button @click=${this.resetStyles}>Revert</button>`,
        )}
        ${when(
          this.appliedPaletteName,
          () =>
            html`<span class="applied-palette"
              >Theme: ${this.appliedPaletteName}</span
            >`,
        )}
      </div>
    `;
  }

  /**
   * Swaps in one of the story's themes, so a single click reveals any part of
   * the component that fails to pick up its color knobs — anything still
   * wearing its old color stands out against the rest.
   *
   * A whole theme is applied at once rather than a color at a time, so the
   * foreground/background pairings stay legible. Values the theme does not
   * name (sizes, timings) are left alone so the layout holds still.
   */
  private randomizeColors(): void {
    const palette = this.nextPalette();
    if (!palette) return;

    this.appliedPaletteName = palette.name;
    this.styleInputs?.forEach((input) => {
      const value = palette.values[input.dataset.variable ?? ''];
      if (value) input.value = value;
    });

    this.applyStyles();
  }

  /**
   * Picks a palette other than the one already showing, so every click
   * visibly changes something.
   */
  private nextPalette(): StylePalette | undefined {
    const palettes = this.styleInputData?.palettes ?? [];
    if (!palettes.length) return undefined;

    const candidates =
      palettes.length > 1
        ? palettes.filter((p) => p.name !== this.appliedPaletteName)
        : palettes;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  /**
   * Restores every input to its default and clears the applied styles, so the
   * demo component falls back to its own default styling.
   */
  private resetStyles(): void {
    this.appliedPaletteName = undefined;
    const defaults = new Map(
      (this.styleInputData?.settings ?? []).map((s) => [s.cssVariable, s]),
    );
    this.rangeReadouts = {};
    this.styleInputs?.forEach((input) => {
      const setting = defaults.get(input.dataset.variable ?? '');
      if (!setting) return;
      input.value = String(setting.defaultValue);
    });

    this.dispatchEvent(
      new CustomEvent('stylesApplied', { detail: { styles: '' } }),
    );
  }

  /**
   * Renders one row of the settings table for the given style input.
   */
  private renderStyleRow(input: StyleInputSettings): TemplateResult {
    const inputId = labelToId(input.label);
    const isNumeric =
      input.inputType === 'number' || input.inputType === 'range';
    return html`
      <tr>
        <td>
          <label for=${inputId}>${input.label}</label>
        </td>
        <td class="style-input-cell">
          <input
            id=${inputId}
            class="style-input"
            type=${input.inputType ?? 'text'}
            min=${ifDefined(isNumeric ? input.min : undefined)}
            max=${ifDefined(isNumeric ? input.max : undefined)}
            step=${ifDefined(isNumeric ? input.step : undefined)}
            value=${input.defaultValue}
            data-variable=${input.cssVariable}
            data-unit=${ifDefined(input.unit)}
            @input=${input.inputType === 'range'
              ? this.updateRangeReadout
              : undefined}
          />
          ${input.inputType === 'range'
            ? html`<output class="style-readout" for=${inputId}
                >${this.readoutFor(input)}</output
              >`
            : nothing}
          ${when(
            this.styleInputData?.showCssVariables,
            () =>
              html`<code class="style-var" title=${input.cssVariable}
                >${input.cssVariable}</code
              >`,
          )}
        </td>
      </tr>
    `;
  }

  /**
   * Updates the live readout next to a range slider as it moves.
   *
   * This records the value in reactive state rather than writing to the
   * `<output>` directly: that element holds Lit-rendered content, and
   * overwriting its text would eject Lit's markers and break every later
   * re-render of the panel.
   */
  private updateRangeReadout(e: Event): void {
    const input = e.currentTarget as HTMLInputElement;
    const variable = input.dataset.variable;
    if (!variable) return;
    const unit = input.dataset.unit ?? '';
    this.rangeReadouts = {
      ...this.rangeReadouts,
      [variable]: `${input.value}${unit}`,
    };
  }

  /** The text to show beside a range slider — live value, else its default. */
  private readoutFor(input: StyleInputSettings): string {
    return (
      this.rangeReadouts[input.cssVariable] ??
      `${input.defaultValue}${input.unit ?? ''}`
    );
  }

  /**
   * Applies styles to demo component.
   */
  private applyStyles(): void {
    const appliedStyles: string[] = [];

    this.styleInputs?.forEach((input) => {
      if (!input.dataset.variable || !input.value) return;
      const unit = input.dataset.unit ?? '';
      appliedStyles.push(`${input.dataset.variable}: ${input.value}${unit};`);
    });

    this.dispatchEvent(
      new CustomEvent('stylesApplied', {
        detail: { styles: appliedStyles.join('\n ') },
      }),
    );
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        .settings-options {
          background-color: var(--primary-background-color);
          padding: 1em;
        }

        .style-input-cell {
          display: flex;
          align-items: center;
        }

        .style-readout {
          min-width: 3.5em;
          text-align: right;
        }

        /* The CSS custom property each control sets, shown to its right. */
        .style-var {
          margin-left: 0.75em;
          font-family: monospace;
          font-size: 0.72rem;
          color: #767676;
          white-space: nowrap;
        }

        input[type='range'] {
          margin: 5px;
        }

        /* Names the theme the randomize control just applied. */
        .applied-palette {
          margin-left: 0.75em;
          font-size: 0.78rem;
          color: #595959;
        }
      `,
    ];
  }
}
