/**
 * @file Close Icon
 *
 * Kept as an inline Lit `svg` template rather than an imported `.svg` file so
 * that the clear button can recolor it from the component's own styles, which
 * is not possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`
  <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      fill-rule="evenodd"
      d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z"
    />
  </svg>
`;
