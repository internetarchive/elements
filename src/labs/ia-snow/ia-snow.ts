import { html, LitElement } from 'lit';
import { state } from 'lit/decorators/state.js';
import { customElement } from 'lit/decorators/custom-element.js';

import Snowflakes from 'magic-snowflakes';

import '@internetarchive/ia-components/components/ia-button/ia-button.js';

@customElement('ia-snow')
export class Snow extends LitElement {
  @state()
  private snowing = false;

  private snowflakes?: Snowflakes;

  render() {
    return html`
      <ia-button
        @click=${() => {
        if (this.snowing) {
          this.stopSnowing();
        } else {
          this.startSnowing();
        }
      }}
      >
        ${this.snowing ? 'Stop Snowflakes' : 'Start Snowflakes'}
      </ia-button>
    `;
  }

  private startSnowing() {
    if (!this.snowflakes) {
      this.snowflakes = new Snowflakes();
    }
    this.snowflakes?.start();
    this.snowing = true;
  }

  private stopSnowing() {
    this.snowflakes?.stop();
    this.snowing = false;
  }
}
