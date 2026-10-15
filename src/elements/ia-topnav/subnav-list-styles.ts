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
    h4 {
      margin: 0 0 calc(10 * var(--topnavUnit--)) 0;
      font-weight: 100;
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
