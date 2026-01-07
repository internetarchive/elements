import { html, LitElement, TemplateResult } from 'lit';
import { customElement, queryAll, state } from 'lit/decorators.js';

import './ia-loading-indicator';
import '@demo/story-template';

@customElement('ia-loading-indicator-story')
export class IALoadingIndicatorStory extends LitElement {
  @queryAll('.style-input')
  private styleInputs?: NodeListOf<HTMLInputElement>;

  /* Applied styles for the component, in "--my-variable: #f00;" format */
  @state()
  private stringifiedStyles: string = '';

  render() {
    return html`
      <story-template
        elementTag="ia-loading-indicator"
        .exampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <ia-loading-indicator
            style=${this.stringifiedStyles}
          ></ia-loading-indicator>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Color</td>
              <td>
                ${this.createStyleInput(
                  '--primary-text-color',
                  '#8be6fa',
                  'color',
                )}
              </td>
              <td>Width</td>
              <td>${this.createStyleInput('--icon-width', '30px')}</td>
            </tr>
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-loading-indicator${this.stringifiedStyles ? ` style="${this.stringifiedStyles}"` : ''}></ia-loading-indicator>`;
  }

  private createStyleInput(
    cssVariable: string,
    defaultValue: string = '',
    type: 'text' | 'color' = 'text',
  ): TemplateResult {
    return html`
      <input
        type=${type}
        class="style-input"
        value=${defaultValue}
        data-variable=${cssVariable}
      />
    `;
  }

  private apply() {
    const appliedStyles: string[] = [];

    this.styleInputs?.forEach((input) => {
      if (!input.dataset.variable || !input.value) return;
      appliedStyles.push(`${input.dataset.variable}: ${input.value};`);
    });

    this.stringifiedStyles = appliedStyles.join(' ');
  }
}
