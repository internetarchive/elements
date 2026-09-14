/**
 * @file Muted icon, a speaker with a cross beside it
 *
 * Inline so the button can recolor it with `currentColor`, which is not
 * possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
  <g fill="none" fill-rule="evenodd">
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
      d="M16,7 L16,15"
      transform="rotate(-45 16 11)"
    />
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
      d="M16,7 L16,15"
      transform="rotate(-135 16 11)"
    />
    <polygon
      fill="currentColor"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-width="2"
      points="10 3.5 6 7.31 1 7.31 1 15.69 6 15.69 10 19.5"
    />
  </g>
</svg>
`;
