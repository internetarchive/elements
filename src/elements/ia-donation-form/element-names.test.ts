import { describe, expect, test } from 'vitest';

import './form-elements/ia-donation-section';

/**
 * Custom elements share one global registry, so the donation form's parts are
 * namespaced under `ia-donation-`. The old iaux-donation-form packages
 * register their tags verbatim, and consumers keep loading them during the
 * migration, so none of those names can be claimed here.
 */
const NAMESPACED_ELEMENTS = ['ia-donation-section'];

const NAMES_TO_AVOID = ['donation-form-section'];

describe('donation form element names', () => {
  test.each(NAMESPACED_ELEMENTS)('registers %s', (tag) => {
    expect(customElements.get(tag), `${tag} should be registered`).to.exist;
  });

  test.each(NAMES_TO_AVOID)('leaves %s free for the old packages', (tag) => {
    expect(customElements.get(tag), `${tag} should not be claimed`).to.not
      .exist;
  });
});
