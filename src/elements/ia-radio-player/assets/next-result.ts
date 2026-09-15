/**
 * @file Right chevron on the search results switcher
 *
 * Decorative: the button around it carries the accessible name. Inline so it
 * can take its colour from the switcher.
 */
import { svg } from 'lit';

export default svg`
<svg
  height="13"
  viewBox="0 0 8 13"
  width="8"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m-1.5 8.5 5-5 5 5"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    transform="matrix(0 -1 -1 0 10 9.7)"
  />
</svg>
`;
