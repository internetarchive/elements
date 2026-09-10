import { describe, expect, test } from 'vitest';

import './ia-topnav';
import './ia-topnav-desktop-subnav';
import './ia-topnav-icon-hamburger';
import './ia-topnav-login-button';
import './ia-topnav-media-button';
import './ia-topnav-media-menu';
import './ia-topnav-media-slider';
import './ia-topnav-media-subnav';
import './ia-topnav-more-slider';
import './ia-topnav-primary-nav';
import './ia-topnav-save-page-form';
import './ia-topnav-signed-out-dropdown';
import './ia-topnav-user-menu';
import './ia-topnav-wayback-search';
import './ia-topnav-wayback-slider';

/**
 * Custom elements share one global registry, so the topnav's parts are
 * namespaced under its own prefix rather than taking names on their own.
 */
const NAMESPACED_ELEMENTS = [
  'ia-topnav-desktop-subnav',
  'ia-topnav-icon-hamburger',
  'ia-topnav-login-button',
  'ia-topnav-media-button',
  'ia-topnav-media-menu',
  'ia-topnav-media-slider',
  'ia-topnav-media-subnav',
  'ia-topnav-more-slider',
  'ia-topnav-primary-nav',
  'ia-topnav-save-page-form',
  'ia-topnav-signed-out-dropdown',
  'ia-topnav-user-menu',
  'ia-topnav-wayback-search',
  'ia-topnav-wayback-slider',
];

/**
 * Names this component must not claim. Every one is registered verbatim by the
 * `@internetarchive/ia-topnav` package, which petabox and offshoot both still
 * load, and a second registration of the same name throws rather than
 * degrading. `ia-wayback-search` comes along with them because importing
 * `@internetarchive/ia-wayback-search` registers it as a side effect, and
 * `ia-icon` is generic enough that any page could want it.
 */
const NAMES_TO_AVOID = [
  'desktop-subnav',
  'dropdown-menu',
  'ia-icon',
  'ia-wayback-search',
  'icon-hamburger',
  'login-button',
  'media-button',
  'media-menu',
  'media-slider',
  'media-subnav',
  'more-slider',
  'primary-nav',
  'save-page-form',
  'signed-out-dropdown',
  'user-menu',
  'wayback-search',
  'wayback-slider',
];

describe('topnav element names', () => {
  test('registers the topnav under its own name', () => {
    expect(customElements.get('ia-topnav')).to.exist;
  });

  test.each(NAMESPACED_ELEMENTS)('registers %s', (tag) => {
    expect(customElements.get(tag), `${tag} should be registered`).to.exist;
  });

  test.each(NAMES_TO_AVOID)('leaves %s free for other components', (tag) => {
    expect(customElements.get(tag), `${tag} should not be claimed`).to.not
      .exist;
  });
});
