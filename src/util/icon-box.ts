import { css, html, type SVGTemplateResult, type TemplateResult } from 'lit';

/**
 * Wraps a generated icon (`@src/icons/<name>`) in a box the host sizes and
 * recolors.
 *
 * The icon paints with `currentColor`, so a host sets `color` on `.ia-icon` to
 * recolor it and `width`/`height` to resize it. The box is a span rather than
 * the bare svg so a host can tell its own glyphs from an inline svg a consumer
 * slotted in.
 */
export const iconBox = (glyph: SVGTemplateResult): TemplateResult =>
  html`<span class="ia-icon">${glyph}</span>`;

/**
 * Layout for `iconBox`. Add it to the host's styles: the svg fills the box, so
 * the host's `width` and `height` on `.ia-icon` are the rendered size.
 */
export const iconBoxStyles = css`
  .ia-icon {
    display: inline-block;
  }

  .ia-icon > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
