import { maskedIcon } from '@src/util/masked-icon';

import ellipsesUrl from './icons/ellipses.svg';
import collapseSidebarUrl from './icons/collapse-sidebar.svg';

/**
 * Icons taken from the `@internetarchive/icon-ellipses` and
 * `@internetarchive/icon-collapse-sidebar` packages (v1.4.1). They ship as
 * standalone `.svg` files — rather than icon package dependencies or inline
 * templates — so their path data stays out of the JS bundle. Each is rendered
 * as a CSS-masked span (see `maskedIcon`) so host components can still recolor
 * it via their own custom properties.
 */

/** Three-dot "more options" glyph used by the menu toggle button. */
export const ellipsesIcon = maskedIcon(ellipsesUrl);

/** Circular "collapse sidebar" glyph used by the menu/panel close buttons. */
export const collapseSidebarIcon = maskedIcon(collapseSidebarUrl);
