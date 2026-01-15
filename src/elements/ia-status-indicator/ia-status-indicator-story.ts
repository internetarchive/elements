import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { StyleInputSettings } from '@demo/story-template';
import { IAStatusIndicator } from './ia-status-indicator';

import './ia-status-indicator';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Color',
    cssVariable: '--ia-theme-primary-text-color',
    defaultValue: '#2c2c2c',
    inputType: 'color',
  },
  {
    label: 'Width',
    cssVariable: '--ia-theme-icon-width',
    defaultValue: '1.25rem',
  },
];

@customElement('ia-status-indicator-story')
export class IAStatusIndicatorStory extends LitElement {
  /* Applied properties fro the component in .myprop=${'foo'} format */
  @state()
  private stringifiedProps: string = '';

  @query('#loading-title')
  private loadingTitleInput!: HTMLInputElement;

  @query('ia-status-indicator')
  private component!: IAStatusIndicator;

  render() {
    return html`
      <story-template
        elementTag="ia-status-indicator"
        .exampleUsage=${this.exampleUsage}
        .styleInputData=${{ settings: styleInputSettings }}
      >
        <div slot="demo">
          <ia-status-indicator></ia-status-indicator>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Loading State Accessible Title</td>
              <td>
                <input
                  class="prop-input"
                  type="text"
                  id="loading-title"
                  data-prop="title"
                  value="Loading..."
                />
              </td>
            </tr>
          </table>
          <button @click=${this.apply}>Apply</button>
        </div>
      </story-template>
    `;
  }

  private get exampleUsage(): string {
    return `<ia-status-indicator${this.stringifiedProps ? ' ' + this.stringifiedProps : ''}></ia-status-indicator>`;
  }

  private apply() {
    const loadingTitle = this.loadingTitleInput.value;
    this.component.loadingTitle = loadingTitle;
    this.stringifiedProps = `.loadingTitle=\${'${loadingTitle}'}`;
  }
}
