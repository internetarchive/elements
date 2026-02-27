import { css, html, LitElement, nothing, type CSSResultGroup } from 'lit';
import { property, queryAll } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';

import themeStyles from '@src/themes/theme-styles';
import { labelToId } from '../story-utils';

export type StyleInputSettings = {
  label: string;
  cssVariable: string;
  defaultValue?: string;
  inputType?: 'color' | 'text';
};

export type StyleInputData = {
  settings: StyleInputSettings[];
};

/**
 * A template for display the style options.
 */
@customElement('story-styles-settings')
export class StoryTemplate extends LitElement {
  @property({ type: Object }) styleInputData?: StyleInputData;

  @queryAll('.style-input')
  private styleInputs?: NodeListOf<HTMLInputElement>;

  render() {
    if (!this.styleInputData) return nothing;

    return html`
      <h3>Styles</h3>
      <div class="settings-options">
        <table>
          ${this.styleInputData.settings.map(
            (input) => html`
              <tr>
                <td>
                  <label for=${labelToId(input.label)}>${input.label}</label>
                </td>
                <td>
                  <input
                    id=${labelToId(input.label)}
                    class="style-input"
                    type=${input.inputType ?? 'text'}
                    value=${input.defaultValue ?? ''}
                    data-variable=${input.cssVariable}
                  />
                </td>
              </tr>
            `,
          )}
        </table>
        <button @click=${this.applyStyles}>Apply</button>
      </div>
    `;
  }

  /* Applies styles to demo component. */
  private applyStyles(): void {
    const appliedStyles: string[] = [];

    this.styleInputs?.forEach((input) => {
      if (!input.dataset.variable || !input.value) return;
      appliedStyles.push(`${input.dataset.variable}: ${input.value};`);
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
      `,
    ];
  }
}
