import { css, html, LitElement, type CSSResultGroup, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';

import Snowflakes, { type SnowflakesParams } from 'magic-snowflakes';

import '@src/elements/ia-button/ia-button';

import videoIcon from './video.svg';

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

      <ia-button
        @click=${() => {
          this.stopSnowing();
          this.snowflakes?.destroy();
          this.snowflakes = undefined;
        }}
      >
        Clear Snowflakes
      </ia-button>

      <img src=${videoIcon} alt="Snowflakes icon" />
    `;
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('snowConfig')) {
      this.snowflakes?.destroy();
      this.snowflakes = undefined;
      this.startSnowing();
    }
  }

  private startSnowing() {
    if (!this.snowflakes) {
      this.snowflakes = new Snowflakes(this.snowConfig);
    }
    this.snowflakes?.start();
    this.snowing = true;
  }

  private stopSnowing() {
    this.snowflakes?.stop();
    this.snowing = false;
  }

  static get styles(): CSSResultGroup {
    return css`
      img {
        width: 16px;
      }
    `;
  }
}
