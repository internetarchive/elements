import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, queryAll, state } from 'lit/decorators.js';

import { IAStatusIndicator } from './ia-status-indicator';

import './ia-status-indicator';
import '@demo/story-template';

@customElement('ia-status-indicator-story')
export class IAStatusIndicatorStory extends LitElement {
  @queryAll('.style-input')
  private styleInputs?: NodeListOf<HTMLInputElement>;

  @query('#loading-title')
  private loadingTitleInput!: HTMLInputElement;

  /* Applied styles for the component, in "--my-variable: #f00;" format */
  @state()
  private stringifiedStyles: string = '';

  /* Applied properties fro the component in .myprop=${'foo'} format */
  @state()
  private stringifiedProps: string = '';

  @query('ia-status-indicator')
  private component!: IAStatusIndicator;

  render() {
    return html`
      <story-template
        elementTag="ia-status-indicator"
        backgroundStyle="light"
        .exampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <ia-status-indicator
            style=${this.stringifiedStyles}
          ></ia-status-indicator>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Title</td>
              <td>
                <input
                  class="prop-input"
                  type="text"
                  id="loading-title"
                  data-prop="title"
                  value="Content loading..."
                />
              </td>
              <td>Color</td>
              <td>
                ${this.createStyleInput(
                  'color',
                  '--ia-theme-primary-text-color',
                  '#3d7581',
                  'color',
                )}
              </td>
              <td>Width</td>
              <td>
                ${this.createStyleInput(
                  'width',
                  '--ia-theme-icon-width',
                  '30px',
                )}
              </td>
            </tr>
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-status-indicator${this.stringifiedProps ? ' ' + this.stringifiedProps : ''}${this.stringifiedStyles ? ` style="${this.stringifiedStyles}"` : ''}></ia-status-indicator>`;
  }

  private createStyleInput(
    id: string,
    cssVariable: string,
    defaultValue: string = '',
    type: 'text' | 'color' = 'text',
  ): TemplateResult {
    return html`
      <input
        id=${id}
        type=${type}
        class="style-input"
        value=${defaultValue}
        data-variable=${cssVariable}
      />
    `;
  }

  private apply() {
    const loadingTitle = this.loadingTitleInput.value;
    this.component.loadingTitle = loadingTitle;
    this.stringifiedProps = `.loadingTitle=\${'${loadingTitle}'}`;

    const appliedStyles: string[] = [];

    this.styleInputs?.forEach((input) => {
      if (!input.dataset.variable || !input.value) return;
      appliedStyles.push(`${input.dataset.variable}: ${input.value};`);
    });

    this.stringifiedStyles = appliedStyles.join(' ');
  }
}
