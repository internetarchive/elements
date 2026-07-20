import { html } from 'lit';

/**
 * Icons inlined from the `@internetarchive/icon-ellipses` and
 * `@internetarchive/icon-collapse-sidebar` packages (v1.4.1). They are inlined
 * as templates — rather than added as dependencies — because the navigator
 * only needs these two glyphs, and inlining lets each host component style the
 * `.fill-color` path directly via its own CSS custom properties. The `svg` is
 * marked `aria-hidden` at the call site; each icon is decorative next to a
 * labelled control.
 */

/** Three-dot "more options" glyph used by the menu toggle button. */
export const ellipsesIcon = html`
  <svg
    class="ia-icon"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m10.5 17.5c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5c-1.38071187 0-2.5-1.1192881-2.5-2.5s1.11928813-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5z"
      fill-rule="evenodd"
    />
  </svg>
`;

/** Circular "collapse sidebar" glyph used by the menu/panel close buttons. */
export const collapseSidebarIcon = html`
  <svg
    class="ia-icon"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      class="fill-color"
      d="m9 0c4.9705627 0 9 4.02943725 9 9 0 4.9705627-4.0294373 9-9 9-4.97056275 0-9-4.0294373-9-9 0-4.97056275 4.02943725-9 9-9zm1.6976167 5.28352881c-.365258-.3556459-.9328083-.37581056-1.32099801-.06558269l-.09308988.0844372-3 3.08108108-.08194436.09533317c-.27484337.36339327-.26799482.87009349.01656959 1.22592581l.084491.09308363 3 2.91891889.09533796.0818904c.3633964.2746544.8699472.2677153 1.2256839-.0167901l.093059-.0844712.0818904-.095338c.2746544-.3633964.2677153-.8699472-.0167901-1.2256839l-.0844712-.093059-2.283355-2.2222741 2.3024712-2.36338332.0819252-.09530804c.2997677-.39632298.2644782-.96313393-.1007797-1.31877983z"
      fill-rule="evenodd"
    />
  </svg>
`;
