# Iconography

Three icon systems ship on archive.org simultaneously:

| System | How | Live |
| --- | --- | --- |
| **Inline SVG** | drawn into the component, some via `<ia-icon-*>` Lit wrappers | offshoot, collection-browser and ia-topnav; the glyphs lifted into `tools/live-icons.json` |
| **Iconochive** | `@font-face` icon font, `<span class="iconochive-download">` | petabox (legacy) pages; in offshoot, only the forum widget's `email` and `rss` |
| **Glyphicons Halflings** | Bootstrap 3's icon font | loaded with Bootstrap on petabox's legacy item page |

Two of them are icon fonts, which is the part that matters. Icon fonts render as text:
they disappear under `forced-colors`, they get replaced by user font-override
stylesheets and by some content blockers, they are announced as glyphs by screen readers
if the markup is careless, and they block on a font download.

## The set

The SVG icons are the system's, and they are taken from the site rather than redrawn:
`tools/live-icons.json` holds the shape elements and geometry attributes lifted from the
site's `<svg>`s, `tools/make-icons.mjs` turns that into `demo/docs/assets/icons.js`, and the
spec site renders from it. No markup, script, style or external reference from
the page is carried over, and fill and stroke colors are dropped so every glyph inherits
`currentColor`.

`icons.html` in the demo shows the whole set with each icon's source, the
name the site gives it, the sizes it renders at and how often it is used.

`alert` has no SVG live, and `flag` is drawn in place of offshoot's `flag-hollow.svg`; both
are on a 24-unit grid and marked `proposed` in the set, so nobody mistakes them for lifted
geometry. Chevrons are the site's own
`caret`, rotated.

offshoot draws a few icons from SVG files in its own source (`src/assets/img/`) rather than
inline, so they were never lifted from the page. The item page's `share`, `add` (Add to List, Add
Review) and `email` (Borrow), the header actions' `rss`, `play` (Play All), `edit` and
`gear` (Settings), and `info`, `check` and `eye-off` (offshoot's `eye-crossed.svg`, the
show-password toggle's hidden state) are lifted from those files path for path, and
marked `offshoot` in the set. Its download glyph is stroked, so `download` is redrawn filled and
marked `proposed`.

The source viewBoxes vary — `0 0 40 40` in the topnav, `0 0 100 100` in the tiles,
`0 0 300 300` for media types, `0 0 8 4` for the caret — and all normalize to the size
scale below.

**Media types have two glyph sets.** The topnav's (`web`, `texts`, `video`, `software`,
`images`) are drawn small inside a 40-unit box, to sit in a 40px button. An item tile's
stat row uses its own, from `tile-mediatype-icon` (`book`, `movies`, `audio`, `image`, `tv`,
`browser`, `data`, `collection`), which fill their box. Use the set that belongs to the
context; a topnav glyph in a tile reads a size smaller than its neighbors.

**Audio has one glyph: the filled `audio`, everywhere.** The live topnav also draws an
outline-style audio glyph; it is not in the system and nothing uses it. Because `audio`
fills its box, the topnav draws it at `--ia-size-icon-lg` (24px) inside the same 40px slot
as its neighbors, so it reads the same size.

## Color

Glyphs take `currentColor`, so they follow the text around them, re-point inside
`.ia-inverse`, and survive `forced-colors`. Live colors many of them through the CSS
`fill` property instead — `#999` in the topnav's media menu, `#333` for a tile's
counters — and draws the collection tile's glyph black and flips it white with
`filter: invert(1)`. None of that carries over.

One exception, deliberately: **the media-type glyph in an item tile takes its type's
accent**, `--ia-color-mediatype-*` — texts, movies, audio, software, image, web, data,
collection, tv, radio, film. The hues are live's own; six are darkened to reach 3:1 on
the white card ([D-43](../DECISIONS.md#d-43)). The glyph's shape still carries the
meaning, and a visually-hidden label names the type, so the color is never the only
signal.

## The direction

**Converge on inline SVG via `<ia-icon-*>`.** That system already exists, already
covers the most-used icons, and already works inside shadow DOM.
[D-18](../DECISIONS.md#d-18)

This is a migration, not a flag day. Iconochive has a long tail of icons — media types,
file formats, social links — and nothing breaks while it stays. The rule for new work:

- **New code uses the SVG set.** No new Iconochive or Glyphicon classes.
- **Touched code migrates.** If you are editing a component that uses an icon font,
  swap that icon while you are in there.
- **Glyphicons goes with Bootstrap.** It has no independent reason to exist; it leaves
  when `.container-ia` and the rest of Bootstrap 3 do ([D-12](../DECISIONS.md#d-12)).

### Which technique

Both draw from the same source SVGs, so an icon looks identical either way. Pick by who
renders the markup:

| Where the icon lives | Use |
| --- | --- |
| A petabox page, rendered on the server | An inline `<svg class="ia-icon"><use href="…/icons.svg#download"/></svg>` against one sprite file, cached across the site. No JavaScript, no layout shift. It replaces an Iconochive class one for one |
| An offshoot page, a Lit template, or any component's own shadow root | The icon element, which inlines the glyph into its own shadow root. `<use>` against a document-level sprite is unreliable across a shadow boundary, so it isn't used there |

One element that takes a `name` is worth weighing against today's one package per glyph
(`<ia-icon-dl>`, …) when the migration starts: a new icon is then a file, not a package.

### Adding an icon

1. **Draw it in the canonical form.** `viewBox="0 0 24 24"`, `fill="currentColor"`, no
   `width` or `height`, no `id`s, no stroke-only shapes — the set is filled, and a stroke
   glyph reads as a different family beside it. Align to the pixel grid at 16 and 24px.
2. **Name it** in kebab-case for what it shows, not what it does on one page: `flag`, not
   `report-item`. The name is how it is referenced everywhere.
3. **Record where it came from.** A glyph lifted from the live site goes in
   `tools/live-icons.json`. A new drawing is `proposed` until it ships, and the icons page marks it so. A glyph
   adapted from an outside library carries that library's license, and is redrawn to the
   canonical form first so the set still reads as one family.
4. **Rebuild** with `node tools/make-icons.mjs`, then check it on the icons page at every
   size and inside `.ia-inverse`.

Don't import a stroke-based library — Lucide, Feather, Heroicons' outline set — wholesale
to fill gaps. The lifted set is filled; a second style beside it is the "three icon
systems" problem again.

## Sizes

Live renders icons at 12×8, 16, 20, 24, 30, 32 and 40 — including one non-square size.
Six sizes on a 4px grid:

| Token | Value | Use |
| --- | --- | --- |
| `--ia-size-icon-xs` | 1.2rem (12px) | carets and disclosure chevrons beside small text — the dropdown trigger, a collapsible list |
| `--ia-size-icon-sm` | 1.6rem (16px) | inline with 1.2rem text, dense table rows |
| `--ia-size-icon-md` | 2rem (20px) | **the default** — inline with body text, buttons. Already `--ia-theme-icon-width` |
| `--ia-size-icon-lg` | 2.4rem (24px) | standalone icon buttons, toolbar actions |
| `--ia-size-icon-xl` | 3.2rem (32px) | avatars, user menu. Already `--userIconWidth` |
| `--ia-size-icon-2xl` | 4rem (40px) | the topnav media buttons, empty-state illustrations |

Icons are **square**. The live `12×8` caret is drawn inside a square viewBox at
`--ia-size-icon-xs`, and the glyph is whatever shape it needs to be.

## Drawing rules

- Keep the source `viewBox`; the rendered size comes from the size token, not the
  coordinate system. New icons use `0 0 24 24`.
- `fill="currentColor"` — never a hard-coded hex. That is what makes icons work inside
  `.ia-inverse`, in dark chrome, and under `forced-colors`. A media-type accent is set
  as the element's `color`, from a token, never baked into the glyph.
- 2px stroke at 24px, scaled proportionally. Don't mix stroke and fill styles in one set.
- Align to the pixel grid at 16px and 24px; a 24px icon that only looks right at 40px
  will look soft in a table row.

## Accessibility

An icon is either **decorative** or **meaningful**, and the markup differs:

```html
<!-- Decorative: the adjacent text already says it -->
<button>
  <ia-icon-dl aria-hidden="true"></ia-icon-dl>
  Download
</button>

<!-- Meaningful: the icon is the only label -->
<button aria-label="Download">
  <ia-icon-dl aria-hidden="true"></ia-icon-dl>
</button>
```

In both cases the SVG itself is `aria-hidden`, with no `<title>`, `<desc>` or
`aria-labelledby` of its own; the name lives on the control. Live topnav glyphs carry all
three (ia-topnav's `assets/img/`), with IDs (`donateTitleID`, `audioTitleID`) repeated in every shadow root that draws
them, so the description joins the control's name: the mobile donate link reads "Donate
icon An illustration of a heart shape". The hamburger also hard-codes `fill="#999"`; a
glyph here fills with `currentColor`. An
icon-only control always has an `aria-label`, and its hit area is still
`--ia-size-target-min` (44px) even when the glyph is 20px —
see [accessibility.md](accessibility.md#touch-targets).

Never use an icon as the sole indicator of state. Pair it with text or with a change
that survives `forced-colors`.

## Optical alignment

An icon sitting next to text aligns to the text's cap height, not its box. In practice
that means `vertical-align: -0.125em` on an inline icon at `--ia-size-icon-md` beside
`--ia-font-size-md` text, or — better — a flex container with `align-items: center` and
a `--ia-space-1` gap, which is what the topnav already does.
