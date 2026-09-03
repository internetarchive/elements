/**
 * @file Jump to previous section icon
 *
 * Inline so the button can recolor it with `currentColor`, which is not
 * possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20">
  <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
    <polygon fill="currentColor" points="9 2 18 16 0 16" transform="rotate(-90 9 9)" />
    <line x1=".5" x2=".5" y1="18" stroke="currentColor" stroke-width="2" />
  </g>
</svg>
`;
