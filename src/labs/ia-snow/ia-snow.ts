import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
} from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';

import type Snowflakes from 'magic-snowflakes';
import type { SnowflakesParams } from 'magic-snowflakes';

import '@src/elements/ia-button/ia-button';

import flakeIcon from './flake.svg';

/**
 * An element that shows snowflakes to demo the elements library
 */
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

      <img src=${flakeIcon} alt="Snowflakes icon" />
    `;
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    if (_changedProperties.has('snowConfig')) {
      this.snowflakes?.destroy();
      this.snowflakes = undefined;
      this.startSnowing();
    }
  }

  private async startSnowing() {
    if (!this.snowflakes) {
      const SnowflakesModule = await import('magic-snowflakes');
      const Snowflakes = SnowflakesModule.default;
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
        filter: invert(1);
        vertical-align: middle;
      }
    `;
  }
}
