/**
 * @file Circled cross that clears the search
 *
 * Decorative: the button around it carries the accessible name. The disc and
 * the cross are themed separately, since one sits on top of the other.
 */
import { svg } from 'lit';

export default svg`
<svg
  height="12"
  viewBox="0 0 12 12"
  width="12"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <g fill="none" fill-rule="evenodd">
    <circle cx="6" cy="6" r="6" class="clear-disc" />
    <g class="clear-cross" stroke-linecap="round">
      <path d="m3.375 3.375 5.18412641 5.18412641" />
      <path
        d="m3.375 3.375 5.18412641 5.18412641"
        transform="matrix(-1 0 0 1 12 0)"
      />
    </g>
  </g>
</svg>
`;
