import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { SectionMarkerMode } from './models';

import nextSectionIcon from './assets/next-section-marker';
import previousSectionIcon from './assets/previous-section-marker';

/**
 * A single section boundary drawn on the scrubber bar.
 *
 * It's a vertical divider with an arrow either side. `markerMode` decides
 * which arrows show, so the two markers surrounding the playhead can point
 * towards the section the listener would land in.
 */
@customElement('ia-section-marker')
export class IASectionMarker extends LitElement {
  /** Which arrows to reveal */
  @property({ type: String }) markerMode: SectionMarkerMode =
    SectionMarkerMode.neither;

  render(): TemplateResult {
    return html`
      <div class="container mode-${this.markerMode}">
        <div class="left-arrow arrow">${nextSectionIcon}</div>
        <div class="center-divider"></div>
        <div class="right-arrow arrow">${previousSectionIcon}</div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --section-marker-color--: var(--ia-theme-scrubber-marker-color, #fff);
        --section-marker-height-collapsed--: var(
          --ia-theme-scrubber-marker-height-collapsed,
          10px
        );
        --section-marker-height-expanded--: var(
          --ia-theme-scrubber-marker-height-expanded,
          25px
        );
        --section-marker-animation-speed--: 0.1s;

        color: var(--section-marker-color--);
      }

      .container {
        display: flex;
        justify-content: center;
        height: 100%;
      }

      .arrow {
        padding-top: 10px;
        opacity: 1;
        /*
          Hidden in every mode this component currently offers. The arrows have
          never been shown: upstream set visibility hidden here and only ever
          animated opacity in the mode rules below, which cannot bring a
          hidden element back. Kept as-is so the migration doesn't make markers
          that nobody has seen suddenly appear.
        */
        visibility: hidden;
        transition:
          opacity var(--section-marker-animation-speed--) ease-out,
          padding-top var(--section-marker-animation-speed--) ease-out;
      }

      .container.mode-left .right-arrow {
        opacity: 0;
      }

      .container.mode-right .left-arrow {
        opacity: 0;
      }

      .container.mode-neither .left-arrow,
      .container.mode-neither .right-arrow {
        opacity: 0;
        padding-top: 75%;
      }

      .container.mode-neither .center-divider {
        height: var(--section-marker-height-collapsed--);
      }

      .center-divider {
        border-left: 1px solid currentColor;
        width: 1px;
        left: 50%;
        height: var(--section-marker-height-expanded--);
        align-self: flex-end;
        transition: height var(--section-marker-animation-speed--) ease-out;
      }
    `;
  }
}
