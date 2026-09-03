/**
 * @file Skip back ten seconds icon
 *
 * Inline so the button can recolor it with `currentColor`, which is not
 * possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`
<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <polyline
      stroke="currentColor"
      stroke-width="2"
      points="14.4444444 16.6666667 20 16.6666667 20 3.33333333 5.55555556 3.33333333"
    />
    <polygon fill="currentColor" points="5.55555556 0 5.55555556 6.66666667 1.11111111 3.33333333" />
    <text
      font-family="HelveticaNeue, Helvetica Neue"
      font-size="10"
      font-weight="normal"
      fill="currentColor"
    >
      <tspan x="0" y="17.333">10</tspan>
    </text>
  </g>
</svg>
`;
