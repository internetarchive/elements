import { __decorate } from "tslib";
import { css, html, LitElement, } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';
import flakeIcon from './flake.svg';
import { lazyLoadTemplate, } from '../../util/lazy-load-template';
/**
 * An element that shows snowflakes to demo the elements library
 */
let IASnow = class IASnow extends LitElement {
    constructor() {
        super(...arguments);
        this.snowing = false;
    }
    render() {
        return html `
      ${this.startButtonTemplate} ${this.clearButtonTemplate}
      <img src=${flakeIcon} alt="Snowflakes icon" />
    `;
    }
    willUpdate(_changedProperties) {
        if (_changedProperties.has('snowConfig')) {
            this.snowflakes?.destroy();
            this.snowflakes = undefined;
            this.startSnowing();
        }
    }
    // Consider lazy loading external templates if they are large,
    // below the fold or not needed immediately. This will reduce the initial
    // bundle size.
    //
    // Note: In this case, ia-button is visible immediately so it's not a great
    // example, but it demonstrates the lazy loading pattern.
    get startButtonTemplate() {
        return lazyLoadTemplate(async () => {
            await import('../../elements/ia-button/ia-button');
        }, () => html `
        <ia-button
          @click=${() => {
            if (this.snowing) {
                this.stopSnowing();
            }
            else {
                this.startSnowing();
            }
        }}
        >
          ${this.snowing ? 'Stop Snowflakes' : 'Start Snowflakes'}
        </ia-button>
      `);
    }
    get clearButtonTemplate() {
        return lazyLoadTemplate(async () => {
            await import('../../elements/ia-button/ia-button');
        }, () => html `
        <ia-button
          @click=${() => {
            this.snowflakes?.destroy();
        }}
        >
          Clear Snowflakes
        </ia-button>
      `);
    }
    async startSnowing() {
        if (!this.snowflakes) {
            // lazy load dependencies when possible to reduce initial bundle size
            const SnowflakesModule = await import('magic-snowflakes');
            const Snowflakes = SnowflakesModule.default;
            this.snowflakes = new Snowflakes(this.snowConfig);
        }
        this.snowflakes?.start();
        this.snowing = true;
    }
    stopSnowing() {
        this.snowflakes?.stop();
        this.snowing = false;
    }
    static get styles() {
        return css `
      img {
        width: 16px;
        filter: invert(1);
        vertical-align: middle;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], IASnow.prototype, "snowConfig", void 0);
__decorate([
    state()
], IASnow.prototype, "snowing", void 0);
IASnow = __decorate([
    customElement('ia-snow')
], IASnow);
export { IASnow };
//# sourceMappingURL=ia-snow.js.map