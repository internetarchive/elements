import { describe, expect, test } from 'vitest';

import './ia-image-viewer';
import './ia-imgview-slide';
import './ia-imgview-controls';

/**
 * Custom elements share one global registry, so the viewer's parts are
 * namespaced under its own prefix rather than taking names on their own.
 */
const NAMESPACED_ELEMENTS = ['ia-imgview-slide', 'ia-imgview-controls'];

/**
 * Names generic enough that another component could reasonably want them, so
 * the viewer's internals shouldn't claim them.
 */
const NAMES_TO_AVOID = ['ia-slide', 'ia-carousel', 'ia-image'];

describe('image viewer element names', () => {
  test('registers the viewer under its own name', () => {
    expect(customElements.get('ia-image-viewer')).to.exist;
  });

  test.each(NAMESPACED_ELEMENTS)('registers %s', (tag) => {
    expect(customElements.get(tag), `${tag} should be registered`).to.exist;
  });

  test.each(NAMES_TO_AVOID)('leaves %s free for other components', (tag) => {
    expect(customElements.get(tag), `${tag} should not be claimed`).to.not
      .exist;
  });
});
