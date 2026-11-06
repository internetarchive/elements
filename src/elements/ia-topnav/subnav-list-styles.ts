import { css } from 'lit';
import { TOPNAV_MOBILE_BREAKPOINT } from './models';

export const subnavListCSS = css`
  h4 {
    font-size: calc(16 * var(--topnavUnit--));
  }

  a {
    text-decoration: none;
    color: var(--activeColor);
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li + li {
    padding-top: calc(15 * var(--topnavUnit--));
  }

  @media (min-width: ${TOPNAV_MOBILE_BREAKPOINT}px) {
    /* A column's heading, as the menu spec's group heading: small, bold,
       uppercase and secondary, so it labels the links rather than competing
       with them. */
    h4 {
      margin: 0 0 calc(10 * var(--topnavUnit--)) 0;
      font-size: calc(11 * var(--topnavUnit--));
      font-weight: var(--ia-font-weight-bold--);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--ia-color-text-inverse-secondary--);
    }

    ul {
      font-size: calc(13 * var(--topnavUnit--));
    }

    li {
      padding-bottom: calc(5 * var(--topnavUnit--));
    }

    li + li {
      padding-top: 0;
    }

    li a {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
