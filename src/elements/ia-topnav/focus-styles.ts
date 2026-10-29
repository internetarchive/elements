import { css } from 'lit';

/**
 * The shared focus ring, in its dark-surface color, for every part of the
 * topnav. Focus styles don't cross a shadow boundary, so each part includes
 * this itself. Parts that fill the bar or a menu row draw the ring inside
 * their edge (`--topnav-focus-offset`), where the bar would otherwise clip it.
 */
const topnavFocusStyles = css`
  :focus-visible {
    outline: var(--ia-size-focus-ring--) solid
      var(--ia-color-border-focus-inverse--);
    outline-offset: var(
      --topnav-focus-offset,
      var(--ia-size-focus-ring-offset--)
    );
  }
`;

export default topnavFocusStyles;
