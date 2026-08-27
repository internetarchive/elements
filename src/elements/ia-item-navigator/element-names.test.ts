import { describe, expect, test } from 'vitest';

import './ia-item-navigator';
import './ia-itemnav-menu-slider';
import './ia-itemnav-menu-button';
import './ia-itemnav-no-theater-available';
import './menus/ia-itemnav-viewable-files-panel';
import './menus/ia-itemnav-share-panel';
import './menus/ia-itemnav-sort-files-button';

/**
 * Custom elements share one global registry, so the navigator's parts are
 * namespaced under its own prefix. Without that, names like `ia-menu-slider`
 * collide with whatever else the host page has loaded — including older
 * releases of this same component, where a second registration throws rather
 * than degrading.
 */
const NAMESPACED_ELEMENTS = [
  'ia-itemnav-menu-slider',
  'ia-itemnav-menu-button',
  'ia-itemnav-no-theater-available',
  'ia-itemnav-viewable-files-panel',
  'ia-itemnav-share-panel',
  'ia-itemnav-sort-files-button',
];

/**
 * Names this component must not claim. The first four are generic enough that
 * any page could want them; the last three are registered verbatim by the
 * `@internetarchive/ia-item-navigator` package that consumers still load
 * during the migration.
 */
const NAMES_TO_AVOID = [
  'ia-menu-button',
  'ia-share-panel',
  'ia-viewable-files-panel',
  'ia-sort-files-button',
  'ia-menu-slider',
  'ia-itemnav-loader',
  'ia-no-theater-available',
];

describe('item navigator element names', () => {
  test('registers the navigator under its own name', () => {
    expect(customElements.get('ia-item-navigator')).to.exist;
  });

  test.each(NAMESPACED_ELEMENTS)('registers %s', (tag) => {
    expect(customElements.get(tag), `${tag} should be registered`).to.exist;
  });

  test.each(NAMES_TO_AVOID)('leaves %s free for other components', (tag) => {
    expect(customElements.get(tag), `${tag} should not be claimed`).to.not
      .exist;
  });
});
