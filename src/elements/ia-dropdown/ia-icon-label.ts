import { html, css, LitElement, TemplateResult, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

import themeStyles from '@src/themes/theme-styles';

/**
 * Lays out an icon beside a label, for use as the content of an
 * `ia-dropdown` option or main button.
 */
@customElement('ia-icon-label')
export class IAIconLabel extends LitElement {
  render(): TemplateResult {
    return html`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `;
  }

  static styles: CSSResultGroup = [
    themeStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }

      :host(.invert-icon-at-hover:hover) slot[name='icon'] {
        filter: invert(1);
      }

      :host(.selected) {
        background-color: var(--selectedBgColor, #fff);
        color: var(--selectedTextColor, #2c2c2c);
      }

      :host(.invert-icon-at-selected.selected) slot[name='icon'] {
        filter: invert(1);
      }

      div.icon-label-container {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: nowrap;
        flex-direction: var(--iconLabelFlexDirection, row);
        height: 100%;
      }

      slot[name='icon'] {
        width: var(--iconWidth, 20px);
        margin-right: var(--iconLabelGutterWidth, 10px);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: nowrap;
        white-space: nowrap;
        height: 100%;
      }

      /* https://css-tricks.com/flexbox-truncated-text/ */
      ::slotted(div.truncate) {
        display: flex;
        width: var(--labelWidth, 100%);
        text-align: left;
        word-wrap: break-word; /* Important for long words! */
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }

      @supports not (-webkit-line-clamp: 2) {
        ::slotted(div.truncate) {
          min-width: 0;
        }
      }
      @supports (-webkit-line-clamp: 2) {
        ::slotted(div.truncate) {
          min-width: 0;
          display: -webkit-box;
          overflow-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          /* Fixed line-height needed to fit unicode and emojis
          https://stackoverflow.com/a/67807146
        */
          line-height: 1.2em;
          /* max-height needed for Safari browser */
          max-height: var(--labelTruncateHeight, 30px);
          max-width: var(--labelWidth, 100%);
        }
      }
    `,
  ];
}
