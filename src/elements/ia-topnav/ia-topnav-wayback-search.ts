import { css, CSSResultGroup } from 'lit';
import { customElement } from '@src/util/custom-element';

import { IAWaybackSearchForm } from '@src/elements/ia-wayback-search-form/ia-wayback-search-form';
import { TOPNAV_MOBILE_BREAKPOINT } from './models';

/**
 * The Wayback Machine search form shown inside the topnav's wayback slider.
 * It is `ia-wayback-search-form` with the topnav's layout on top.
 */
@customElement('ia-topnav-wayback-search')
export class IATopNavWaybackSearch extends IAWaybackSearchForm {
  static get styles(): CSSResultGroup {
    return [
      super.styles,
      css`
        p {
          margin-bottom: 1rem;
          font-size: 1.6rem;
          text-align: center;
        }

        fieldset {
          padding: 0.5rem;
          border-radius: 5px;
          box-shadow: none;
        }

        input {
          padding-left: 3rem;
          margin-top: 0.3rem;
          font-size: 1.4rem;
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
            margin: 0 1.5rem;
          }
        }
      `,
    ];
  }
}
