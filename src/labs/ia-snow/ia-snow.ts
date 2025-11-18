import { html, LitElement, type PropertyValues } from 'lit';
import { state } from 'lit/decorators/state.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators.js';

import Snowflakes, { type SnowflakesParams } from 'magic-snowflakes';

import '../../components/ia-button/ia-button';

@customElement('ia-snow')
export class IASnow extends LitElement {
  @property({ type: Object }) snowConfig?: SnowflakesParams;

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

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('snowConfig') && this.snowConfig) {
      this.snowflakes?.destroy();
      this.snowflakes = new Snowflakes(this.snowConfig);
      this.startSnowing();
    }
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
