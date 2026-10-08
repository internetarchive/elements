/**
 * @file Chevron that opens and closes the quick search list
 *
 * Decorative: the button around it carries the accessible name. Inline so it
 * can take its colour from the bar.
 */
import { svg } from 'lit';

export default svg`
<svg
  height="9"
  viewBox="0 0 19 9"
  width="19"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m1 1 9 7 8-7"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
  />
</svg>
`;
