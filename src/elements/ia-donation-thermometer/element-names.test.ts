import { describe, expect, test } from 'vitest';

import './ia-donation-thermometer';

/**
 * Custom elements share one global registry. The
 * `@internetarchive/donation-banner-thermometer` package registers
 * `donation-banner-thermometer` verbatim, and the petabox banner keeps loading
 * it during the migration, so this element must not claim that name.
 */
describe('donation thermometer element names', () => {
  test('registers the thermometer under its own name', () => {
    expect(customElements.get('ia-donation-thermometer')).to.exist;
  });

  test('leaves donation-banner-thermometer free for the old package', () => {
    expect(customElements.get('donation-banner-thermometer')).to.not.exist;
  });
});
