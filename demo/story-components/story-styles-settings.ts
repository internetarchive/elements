import {
  css,
  html,
  LitElement,
  nothing,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { ifDefined } from 'lit/directives/if-defined.js';

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

export type StyleInputData = {
  settings: StyleInputSettings[];
};

/**
 * A template for displaying the style options.
 */
@customElement('story-styles-settings')
export class StoryStylesSettings extends LitElement {
  @property({ type: Object }) styleInputData?: StyleInputData;

  @queryAll('.style-input')
  private styleInputs?: NodeListOf<HTMLInputElement>;

  render() {
    if (!this.styleInputData) return nothing;

    return html`
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map((input) =>
            this.renderStyleRow(input),
          )}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `;
  }

  /* Renders one row of the settings table for the given style input. */
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
                >${input.defaultValue}${input.unit ?? ''}</output
              >`
            : nothing}
        </td>
      </tr>
    `;
  }

  /* Updates the live readout next to a range slider as it moves. */
  private updateRangeReadout(e: Event): void {
    const input = e.currentTarget as HTMLInputElement;
    const output = this.renderRoot.querySelector<HTMLOutputElement>(
      `output[for="${CSS.escape(input.id)}"]`,
    );
    if (!output) return;
    const unit = input.dataset.unit ?? '';
    output.textContent = `${input.value}${unit}`;
  }

  /* Applies styles to demo component. */
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

        input[type='range'] {
          margin: 5px;
        }
      `,
    ];
  }
}
