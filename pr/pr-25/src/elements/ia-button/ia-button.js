import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import themeStyles from '../../themes/theme-styles';
/**
 * A button element to demo the elements library
 */
let IAButton = class IAButton extends LitElement {
    render() {
        return html `
      <button>
        <slot></slot>
      </button>
    `;
    }
    static get styles() {
        return [
            themeStyles,
            css `
        :host {
          --primary-background-color--: var(--primary-cta-fill);
          --primary-text-color--: var(--primary-cta-text-color);
        }

        button {
          padding: 8px 16px;
          background-color: var(--primary-background-color--);
          color: var(--primary-text-color--);
        }
      `,
        ];
    }
};
IAButton = __decorate([
    customElement('ia-button')
], IAButton);
export { IAButton };
//# sourceMappingURL=ia-button.js.map