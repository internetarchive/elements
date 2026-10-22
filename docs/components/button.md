# Button

> **Use instead:** going somewhere → a [link](link.md), styled as a button if it must look
> like one. A setting that stays on or off → [switch](switch.md). A removable filter → a
> chip ([avatar, badge, chip](avatar-badge.md)). A list of commands → [menu](menu.md).

The single worst-defined component on the site. Live buttons come in heights of
19, 25, 28, 29, 30, 32, 34, 36, 42 and 55px; radii of 0, 2, 3, 4, 5, 20 and 60px; font
weights of 400, 500, 600 and 700; and paddings including `0 30px`, `0 10px`, `1px 6px`,
`7px 8px` and `5px 5px`. offshoot's theme declares
`--ia-theme-button-height: 3.6rem` (`theme-manager/themes/shared.ts`), but only
`ia-button` reads it — the primary CTA renders at 30px on search and 36px on signup.

## Anatomy

```
┌─────────────────────────────────┐
│  [icon]  Label          [icon]  │   min-height = --ia-size-control-*
└─────────────────────────────────┘   padding-inline = --ia-space-4 or -6
                                      radius = --ia-radius-default
```

## Sizes

| Size | Height | Padding-inline | Font | Use |
| --- | --- | --- | --- | --- |
| `sm` | `--ia-size-control-sm` 3.0rem / 30px | `--ia-space-4` 20px | 1.4rem / 400 | dense toolbars, inside table rows and facet panels |
| `md` | `--ia-size-control-md` 3.6rem / 36px | `--ia-space-6` 30px | 1.4rem / 400 | **the default** |
| `lg` | `--ia-size-control-lg` 4.4rem / 44px | `--ia-space-6` 30px | 1.6rem / 400 | primary form submits, touch-first contexts |

The height is a minimum ([D-51](../DECISIONS.md#d-51)). A one-line button is exactly the
token's height, so same-size controls line up; a label wider than its container — a long
translation — wraps, balanced, inside the button instead of overflowing it. A button never
shrinks below its label until its container forces it.

30px is live's usual height — `ia-styles`' 3rem minimum, the collection search button —
so `sm` is not an invention. 36px is the declared `--ia-theme-button-height`. 44px exists
so that a primary action can meet the touch target minimum on its own.

**Every size guarantees a 44×44 hit area on coarse pointers**, regardless of its visual
box. On a fine pointer the 30px `sm` size stands, which is above the 24×24 WCAG floor —
see [accessibility.md](../foundations/accessibility.md#pointer-targets):

```css
@media (pointer: coarse) {
  .ia-button { min-block-size: var(--ia-size-target-min); }
}
```

## Intents

| Intent | Fill | Border | Label | Use |
| --- | --- | --- | --- | --- |
| `primary` | `#194880` | `#c5d1df` | white | the one action the page wants — max one per view |
| `secondary` | white, `--ia-shadow-raised` | `#666666` | `#2c2c2c` | supporting actions — light, so it never outweighs the primary ([D-52](../DECISIONS.md#d-52)) |
| `danger` | `#e51c23` | `#b8161c` | white | destructive, irreversible |
| `warning` | `#ffb000` | `#cc7a00` | `#2c2c2c` | proceed-with-care |
| `donate` | `#20705a` | `#20705a` | white | donating — the Donate button and donation actions; the heart glyph beside the label takes the label's color ([D-53](../DECISIONS.md#d-53)) |
| `ghost` | transparent | none | `--ia-color-text-primary` | only where live draws a borderless button: a header's icon-and-label actions (Share, Favorite, RSS, Play All, Edit, Settings), Add Review, and icon-only controls (close, dismiss, carousel arrows, info). The label or icon identifies it, so it needs no boundary ([D-55](../DECISIONS.md#d-55)) |
| `link` | none | none | `--ia-color-text-link` | inline actions that read as links |
| `disabled` | `#666666` | `#999999` | white | see below |

A text-only action that isn't one of those is `secondary` — Cancel in a modal, Clear
Filters in an empty state, a menu trigger — and a link-colored one is `link`. A ghost
button carries an icon unless it is in a header's action column.

Two borders are load-bearing: `#ffb000` is only 1.77:1 against the page and the white
secondary 1.03:1, so on those two the fill alone does not tell a user a button is there.
Every other intent's fill carries its own boundary. The secondary's shadow is what sets it
apart from `ghost`, which has no edge and sits flat.

### Shapes and modifiers

| Class | What it does |
| --- | --- |
| `ia-button--icon` | Square: the side is the size's control height, padding 0, the glyph at the size's icon token (`sm` 16px, `md` 20px, `lg` 24px). **Always carries an `aria-label`.** 44 × 44 on a coarse pointer |
| `ia-button--circle` | With `--icon`: `--ia-radius-circle` |
| `ia-button--block` | Full width; presses at the wide scale |
| `ia-button--floating` | `--ia-shadow-floating`, for a control that always sits over media — a favorite star on a thumbnail, a player control |
| `ia-button--stacked` | The item page's actions: the glyph (`--ia-size-icon-lg`) over the label, in a 2px `--ia-color-text-primary` frame, at least 56px square. `aria-pressed="true"`, `aria-expanded="true"` or `data-active` takes the soft selected tier. Holds `.ia-button__long` and `.ia-button__short` labels; below `lg` the short one shows. See [item-page.md](../patterns/item-page.md#actions) |

An icon-only button with a name that isn't obvious from its glyph gets a
[tooltip](tooltip.md) as well.

`link` buttons are `<button>` elements that look like links — "Display Reviews",
"More…". They still need a 44px hit area, which is what makes them different from an
actual link in running text.

## States

| State | Treatment |
| --- | --- |
| rest | as above |
| hover | fill darkens one step; `secondary` and `ghost` gain `--ia-color-hover-overlay`; instantly — hover never transitions ([D-54](../DECISIONS.md#d-54)) |
| focus-visible | `2px solid var(--ia-color-border-focus)`, `outline-offset: 2px` — **non-negotiable** |
| active | fill darkens a second step, and the button squeezes by its width's press scale over `--ia-motion-duration-instant` — 0.97, 0.92 for `--icon`, 0.985 for `--block` ([D-49](../DECISIONS.md#d-49)). No transform under reduced motion; `link` buttons don't move |
| disabled | `disabled` intent, `cursor: not-allowed`, `aria-disabled` |
| loading | spinner replaces the leading icon, label stays, `aria-busy="true"`, width does not change |

A disabled button keeps its label legible (5.74:1) even though WCAG exempts it. A button
that cannot be read cannot be understood well enough to work out how to enable it.

Prefer `aria-disabled="true"` over the `disabled` attribute on form submits: a
`disabled` button is removed from the tab order, so a keyboard user who tabs into a form
and finds the submit missing has no way to discover why.

## Reference implementation

```css
.ia-button {
  --_height:  var(--ia-size-control-md);
  --_padding: var(--ia-space-6);
  --_press:   var(--ia-motion-press-scale-default);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ia-space-1);

  flex-shrink: 0;
  min-block-size: var(--_height);
  max-inline-size: 100%;
  padding-inline: var(--_padding);
  border: var(--ia-size-border-width) solid transparent;
  border-radius: var(--ia-radius-default);

  font-family: var(--ia-font-family-base);
  font-size: var(--ia-font-size-md);
  font-weight: var(--ia-font-weight-regular);
  line-height: var(--ia-font-line-height-tight);
  text-decoration: none;
  overflow-wrap: anywhere;
  text-wrap: balance;

  cursor: pointer;
  transition: transform var(--ia-motion-duration-instant) var(--ia-motion-easing-standard);   /* hover snaps */
}
.ia-button:active { transform: scale(var(--_press)); }

.ia-button--sm { --_height: var(--ia-size-control-sm); --_padding: var(--ia-space-4); }
.ia-button--lg { --_height: var(--ia-size-control-lg); font-size: var(--ia-font-size-lg); }

.ia-button--primary {
  background-color: var(--ia-color-action-primary-fill);
  border-color:     var(--ia-color-action-primary-border);
  color:            var(--ia-color-action-primary-text);
}

.ia-button:focus-visible {
  outline: var(--ia-size-focus-ring) solid var(--ia-color-border-focus);
  outline-offset: var(--ia-size-focus-ring-offset);
}

.ia-button[disabled],
.ia-button[aria-disabled='true'] {
  background-color: var(--ia-color-action-disabled-fill);
  border-color:     var(--ia-color-action-disabled-border);
  color:            var(--ia-color-action-disabled-text);
  cursor: not-allowed;
}

@media (pointer: coarse) {
  .ia-button { min-block-size: var(--ia-size-target-min); }
}
```

## Buttons vs links

A `<button>` does something on this page. An `<a href>` goes somewhere. This is not
pedantry — it decides whether Space activates it, whether middle-click opens a tab, and
what a screen reader announces.

Live gets this wrong in both directions: `<a class="cta-button">` elements that submit,
and `<div class="drop-zone" role="button">` where a real button would do. If it
navigates, it is an anchor, and it may be *styled* as a button.

## Migrating the live variants

The `.ia-button.<variant>` classes come from iaux's `ia-styles` (1.0.0, `iaButtonStyles`),
which the topnav, `ia-pic-uploader` and `ia-userlist-settings` import or copy. Its base is
a 3rem minimum height, `0 3rem` padding, a 0.4rem radius and 1.4rem text, focused with a
white `double` outline inset 4px. Its colors come from camelCase variables this system
doesn't map, so live values survive: `--primaryCTAFill`, `--primaryErrorCTAFill`
(`#d9534f`), `--primaryDisableCTAFill` (`#767676`) and the warning fill, read from a
misspelled `---primaryWarningFill` (three dashes) that nothing sets, so it is always its
`#ee8950` fallback. The package's other export, `iaSronlyStyles` (`.sr-only`), becomes
`.ia-visually-hidden`.

| Live | Becomes |
| --- | --- |
| `.cta-button.ia-button.primary` — 30px, `#194880`, r4 | `.ia-button.ia-button--sm.ia-button--primary` |
| `.cta-button.ia-button.dark` — 30px, `#333`, r4 | `.ia-button--sm.ia-button--secondary` (light) |
| `.ia-button.danger` — `#d9534f` | `.ia-button--danger` ([D-09](../DECISIONS.md#d-09)) |
| `.ia-button.warning` — `#ee8950`, white label (2.52:1) | `.ia-button--warning`: `#ffb000`, dark label ([D-11](../DECISIONS.md#d-11)) |
| `.ia-button.transparent` | `.ia-button--ghost` |
| `.ia-button.link` | `.ia-button--link` |
| "Search this collection" — 30px, `#2c2c2c`, r20 pill (offshoot's `collection-search-input.ts`) | folds into the collection's `.ia-search-bar` ([search-bar.md](search-bar.md)) |
| "Feedback" — 19px, 12px/700, `#194880` outline, r4 | `.ia-button--sm.ia-button--secondary` |
| "Add to list" / "Favorite" / "Share" / "Flag" — about 56px, glyph over label, 2px `#000` border (offshoot's `details-action-button.ts`) | `.ia-button.ia-button--stacked` ([item-page.md](../patterns/item-page.md#actions)) |
| `.more-link` — 14px, no box, link-colored | `.ia-button--link` |
| `.sort-direction-selector` — 28px, r5, `#194880` border (collection-browser's `sort-filter-bar.ts`) | `.ia-sort-bar__direction` ([sort-bar.md](sort-bar.md)) |

The 20px-radius pill on "Search this collection" is the only pill button on the site.
It goes with the collection search, which becomes a search bar; the pill radius is
reserved for search *fields*, chips and badges, where it is a recognizable affordance,
and is never a button.

## The live component

Before `ia-button` upgrades, a server-rendered one is an unstyled inline element; style
`ia-button:not(:defined)` in the page's blocking stylesheet so it takes its final box on
first paint — see [the component contract](README.md#before-it-upgrades).

`ia-button` (from `@internetarchive/elements`, 1.1.2 in offshoot) is the button Lit pages
ship, and the Claude Design card `IAButton` renders it. Its fills, borders, height,
padding, radius and font size all come from `--ia-theme-*`, so under this system's tokens
they already match the table above. What it draws itself still differs:

| Part | `ia-button` | This spec |
| --- | --- | --- |
| Disabled | the enabled colors at 50% opacity, `cursor: not-allowed` | `--ia-color-action-disabled-*` fill, border and text |
| Loading | the enabled colors at 50% opacity; the status indicator replaces the label (or sits beside `loadingText`) | width held, indicator in place of the label |
| Focus | 80% opacity and the browser's `double` outline | the shared 2px `--ia-color-border-focus` ring, offset 2px |
| Link intent | `mode="link"`, 36px tall | `ia-button--link`, 30px |
| With `href` | an `<a>` wrapping a `<button>`: two nested interactive elements, one focus stop too many | a real link, styled as a button |

The modes map one to one otherwise: `primary`, `secondary`, `danger`, `warning` and
`disabled` are this spec's intents.

Its size comes from `--ia-theme-button-width` (default `fit-content`) and
`--ia-theme-button-height`. Setting `width` on the element does nothing to the button
inside it. `ia.css` sizes the element itself from `--ia-theme-button-width`, so a
full-width `ia-button` — the equivalent of `.ia-button--block` — needs only
`--ia-theme-button-width: 100%`, on the element or any ancestor.

Buttons that are always icon-only stay `.ia-button.ia-button--icon` with an `aria-label`:
`ia-button` has no square, icon-only shape. A button that shows its label in some layouts
and only its icon in others is an `ia-button` with the icon and a visually hidden label.

## Floating Help button

The "Help" button pinned to the corner of the page, from iaux's `ia-zendesk-help-widget`
(0.3.0, as offshoot locks it). It is a primary button that stays put:

| Part | Value |
| --- | --- |
| Look | `ia-button` primary, `--ia-radius-pill`, a help glyph and the label "Help" |
| Place | `position: fixed`, `--ia-space-4` from the bottom and inline-end edges |
| Layer | `--ia-z-index-sticky`: above the page, under every menu, scrim and modal |
| Narrow | below `md` the label hides and the glyph stays; `aria-label="Help"` names it at every width |

Live departs in three places: `outline: none` with no focus style
([D-19](../DECISIONS.md#d-19)); below 767px the label is `display: none` with no
`aria-label`, so the button has no accessible name; and `z-index: 999998`, which floats it
over modals ([D-16](../DECISIONS.md#d-16)'s named layers).

## Don't

- Don't put two `primary` buttons in one view.
- Don't use size to signal importance — use intent.
- Don't remove the focus ring. Ever.
- Don't let a button's width change when it enters its loading state.
- Don't write button labels in sentence case; they take Title Case ("Sign Up", "Show More"). See
  [content-voice.md](../foundations/content-voice.md#capitalization).
