import { describe, expect, test } from 'vitest';

import './ia-image-viewer';
import './ia-imgview-slide';
import './ia-imgview-controls';

/**
 * Custom elements share one global registry, so the viewer's parts are
 * namespaced under its own prefix. Without that, names like `image-viewer`
 * collide with whatever else the host page has loaded — including offshoot,
 * which registers `image-viewer` verbatim for its own copy of this component
 * and would throw on the second registration rather than degrading.
 */
const NAMESPACED_ELEMENTS = ['ia-imgview-slide', 'ia-imgview-controls'];

/**
 * Names this component must not claim. `image-viewer` is offshoot's, and the
 * rest are generic enough that any page could want them.
 */
const NAMES_TO_AVOID = [
  'image-viewer',
  'image-viewer-slide',
  'image-viewer-controls',
  'ia-slide',
  'ia-carousel',
];

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
