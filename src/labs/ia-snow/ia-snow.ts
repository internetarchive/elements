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

import flakeIcon from './flake.svg';
import {
  lazyLoadTemplate,
  type LazyLoadedTemplate,
} from '@src/util/lazy-load-template';

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
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
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

  // Consider lazy loading templates if they are large,
  // below the fold or not needed immediately. This will reduce the initial
  // bundle size.
  //
  // Note: In this case, ia-button is visible immediately so it's not a great
  // example, but it demonstrates the lazy loading pattern.
  private get startButtonTemplate(): LazyLoadedTemplate {
    return lazyLoadTemplate(
      async () => {
        await import('@src/elements/ia-button/ia-button');
      },
      () => html`
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
      `,
    );
  }

  private get clearButtonTemplate(): LazyLoadedTemplate {
    return lazyLoadTemplate(
      async () => {
        await import('@src/elements/ia-button/ia-button');
      },
      () => html`
        <ia-button
          @click=${() => {
            this.snowflakes?.destroy();
          }}
        >
          Clear Snowflakes
        </ia-button>
      `,
    );
  }

  private async startSnowing() {
    if (!this.snowflakes) {
      // lazy load dependencies when possible to reduce initial bundle size
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
