/**
 * @file Right-pointing arrow shown on a section marker
 *
 * Inline so the marker can recolor it with `currentColor`, which is not
 * possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`
<svg height="10" viewBox="0 0 8 10" width="8" xmlns="http://www.w3.org/2000/svg">
  <path
    d="m4 1 5 8h-10z"
    fill="currentColor"
    fill-rule="evenodd"
    transform="matrix(0 1 -1 0 9 1)"
  />
</svg>
`;
