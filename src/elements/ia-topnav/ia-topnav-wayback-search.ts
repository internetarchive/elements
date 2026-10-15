import { css, CSSResultGroup } from 'lit';
import { customElement } from '@src/util/custom-element';

import { IAWaybackSearchForm } from '@src/elements/ia-wayback-search-form/ia-wayback-search-form';
import { TOPNAV_MOBILE_BREAKPOINT } from './models';

/**
 * The Wayback Machine search form shown inside the topnav's wayback slider.
 * It is `ia-wayback-search-form` with the topnav's layout on top, sized from
 * the topnav's own scale unit instead of the page's root font size.
 */
@customElement('ia-topnav-wayback-search')
export class IATopNavWaybackSearch extends IAWaybackSearchForm {
  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        :host {
          font: normal calc(12 * var(--topnavUnit--)) / 1.5
            var(--themeFontFamily);
        }

        fieldset {
          padding: calc(7 * var(--topnavUnit--)) calc(20 * var(--topnavUnit--));
        }

        input {
          height: calc(30 * var(--topnavUnit--));
          padding: calc(5 * var(--topnavUnit--)) calc(10 * var(--topnavUnit--))
            calc(5 * var(--topnavUnit--)) calc(30 * var(--topnavUnit--));
          font: normal calc(12 * var(--topnavUnit--)) / 1.5
            var(--themeFontFamily);
          border-radius: calc(20 * var(--topnavUnit--));
        }

        .search-field svg {
          width: calc(24 * var(--topnavUnit--));
          height: calc(24 * var(--topnavUnit--));
        }

        @media not all and (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          fieldset {
            margin: calc(15 * var(--topnavUnit--)) 0;
          }

          img {
            margin-bottom: calc(13 * var(--topnavUnit--));
          }
        }
      `,
      css`
        p {
          margin-bottom: calc(10 * var(--topnavUnit--));
          font-size: calc(16 * var(--topnavUnit--));
          text-align: center;
        }

        fieldset {
          padding: calc(5 * var(--topnavUnit--));
          border-radius: 5px;
          box-shadow: none;
        }

        input {
          padding-left: calc(30 * var(--topnavUnit--));
          margin-top: calc(3 * var(--topnavUnit--));
          font-size: calc(14 * var(--topnavUnit--));
          border-color: #bca38e;
          background: #fff;
        }

        input::placeholder,
        input::-webkit-input-placeholder {
          color: #8e8e8e;
        }

        .search-field svg {
          top: 50%;
          transform: translateY(-50%);
        }

        @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
          fieldset a,
          .search-field {
            display: block;
            width: auto;
          }

          fieldset a {
            margin: 0 calc(15 * var(--topnavUnit--));
          }
        }
      `,
    ];
  }
}
