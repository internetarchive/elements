import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import themeStyles from '@src/themes/theme-styles';

/**
 * Wraps any slotted elements in a `span` element that hides them visually but keeps them available for screen readers.
 * Useful for rendering any additional explanatory text that is only necessary for screen readers.
 */
@customElement('ia-sr-only-text')
export class IASrOnlyText extends LitElement {
  render(): TemplateResult {
    return html`
      <span class="sr-only">
        <slot></slot>
      </span>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          margin: -1px !important;
          padding: 0 !important;
          border: 0 !important;
          overflow: hidden !important;
          white-space: nowrap !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          -webkit-clip-path: inset(50%) !important;
          clip-path: inset(50%) !important;
          user-select: none !important;
        }
      `,
    ];
  }
}
