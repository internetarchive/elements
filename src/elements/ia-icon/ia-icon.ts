import type { TemplateResult, CSSResultGroup } from 'lit';
import { html, LitElement, css, nothing } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import themeStyles from '@src/themes/theme-styles';

/**
 * Renders an icon from the given source, inheriting the surrounding text
 * color by default. Set --ia-theme-icon-color to give it a color of its own.
 *
 * Icons are square, sized by --ia-theme-icon-width, and --ia-theme-icon-height
 * sets the height on its own if a non-square icon is needed.
 *
 * Browsers that support masking render the icon as a masked element so it can
 * take on the current color, with --ia-icon-transition available to animate
 * color changes. The rest fall back to a plain image, which --ia-icon-filter
 * can recolor.
 */
@customElement('ia-icon')
export class IAIcon extends LitElement {
  /* Source for the icon */
  @property({ type: String }) src: string = '';

  render(): TemplateResult | typeof nothing {
    if (!this.src) return nothing;
    const encodedSrc = this.src.replace(/'/g, '%27').replace(/"/g, '%22');

    return html`
      <div
        class="icon masked"
        part="icon"
        style="mask-image: url('${encodedSrc}')"
      ></div>
      <img class="icon fallback" part="icon" src=${this.src} alt="" />
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --icon-height--: var(--icon-height);
          --icon-width--: var(--icon-width);
          --icon-color--: var(--icon-color);
          --ia-icon-filter--: var(--ia-icon-filter, none);
          --ia-icon-transition--: var(--ia-icon-transition, none);
        }

        .icon {
          height: var(--icon-height--);
          width: var(--icon-width--);
          filter: var(--ia-icon-filter--);
        }

        .icon.masked {
          display: none;
        }

        /* Icons inherit font color when possible */
        @supports (mask-image: url()) and (background: currentColor) {
          .icon.masked {
            display: block;
            mask-repeat: no-repeat;
            /* Scale the icon to fit the box, whatever its aspect ratio */
            mask-size: contain;
            mask-position: center;
            background: var(--icon-color--);
            filter: none;
            transition: var(--ia-icon-transition--);
          }

          .icon.fallback {
            display: none;
          }
        }
      `,
    ];
  }
}
