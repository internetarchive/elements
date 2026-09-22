/**
 * @file Play icon
 *
 * Decorative: the button around it carries the accessible name, so the icon
 * is hidden from assistive tech. Inline so the button can recolor it with
 * `currentColor`, which is not possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`
<svg height="60" viewBox="0 0 60 60" width="60" xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m34.5 18 12.5 25h-25z"
    fill="currentColor"
    fill-rule="evenodd"
    transform="matrix(0 1 -1 0 65 -4)"
  />
</svg>
`;
