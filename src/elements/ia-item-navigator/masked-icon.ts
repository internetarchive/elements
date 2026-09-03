import { html, type TemplateResult } from 'lit';

/**
 * Renders an icon from a standalone `.svg` file as a CSS-masked element.
 *
 * The glyphs live as `.svg` assets rather than inline templates so their path
 * data stays out of the JS bundle. They are drawn with `mask-image` (not
 * `<img>`) so host components can still recolor them: the mask supplies the
 * shape and `background-color` supplies the paint, which keeps the
 * `--item-navigator-icon-color` theming working.
 *
 * The mask geometry is set inline so an icon renders correctly wherever it is
 * slotted — including inside a consumer's shadow DOM, for the icons this
 * package exports publicly. Hosts only supply `background-color` and a size,
 * both of which legitimately vary per host. Icons are decorative (always
 * labelled by adjacent text or an `aria-label` on the control), so the span is
 * `aria-hidden`.
 *
 * The `url()` is quoted deliberately: bundlers inline small SVGs as `data:`
 * URIs whose markup contains apostrophes, and an *unquoted* CSS `url()` token
 * cannot contain them — the whole `mask-image` declaration would be dropped
 * and the glyph would paint as a solid block.
 */
export const maskedIcon = (url: string): TemplateResult => html`
  <span
    class="ia-icon"
    aria-hidden="true"
    style='-webkit-mask-image:url("${url}");mask-image:url("${url}");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain;display:inline-block'
  ></span>
`;
