# Modal and drawer

> **Use instead:** a passive message → a banner or toast ([alert](alert.md)). Commands
> anchored to their trigger → [menu](menu.md). Something a page could do → a page.

archive.org's modal is `modal-manager` / `modal-template`, and offshoot — where the site is
headed — sets it up one way throughout. This spec follows offshoot: a colored header band
with a centered white title and a round white close button, over a page-colored body, the
whole framed in the band's color ([D-33](../DECISIONS.md#d-33)).

## Spec

| Part | Value |
| --- | --- |
| Frame | 2px (`--ia-size-border-width` × 2) in the band color, `--ia-radius-default`, `--ia-shadow-overlay` |
| Header band | `--ia-color-action-primary-fill` (`#194880`); `--danger` takes `--ia-color-action-danger-fill` for a destructive question. `--ia-space-2` block padding |
| Title | centered, `--ia-color-action-primary-text` (white, 9.21:1; 4.64:1 on danger), `--ia-font-size-xl` / bold |
| Close | a 24px white disc (`--ia-color-surface-raised`, `--ia-border-card`, `--ia-shadow-raised`) at the band's inline end, with the `close` glyph; its hit area is 44px. The ring is the inverse one, because it is drawn on the band |
| Body | `--ia-color-surface-page`, `--ia-space-4` padding, primary text |
| Scrim | `--ia-color-surface-scrim` (50% black) with `--ia-blur-scrim` (3px), `--ia-z-index-overlay` |
| Layer | `--ia-z-index-modal` |
| Max block size | `calc(100dvh - var(--ia-space-16))`, body scrolls |

Three widths replace the five offshoot declares:

| Size | Width | Use | offshoot |
| --- | --- | --- | --- |
| `--sm` | 40rem (400px) | confirmations, single questions | 40rem (create and delete list, loan return, unlink account); 50rem (share) |
| default | 58rem (580px) | forms | 58rem (date picker, remove items) |
| `--lg` | 85rem (850px) | content — previews, long lists | 85rem (more facets); 80rem (log in) |

### The live component

`modal-manager`'s own defaults (read from 2.0.5; offshoot locks 2.0.6) differ from how offshoot sets it, and offshoot
overrides them per modal in `app-root.ts`:

| Variable | Default | offshoot |
| --- | --- | --- |
| `headerColor` (config) | `#36a483` green | `#194880`; `#d9534f` for destructive ones (here `--ia-color-action-danger-fill`, [D-09](../DECISIONS.md#d-09)) |
| `--modalBorder` | `2px solid black` | `2px solid #194880` on more facets, date picker and remove items; the default elsewhere |
| `--modalCornerRadius` | 1rem | 0.5rem on those three, the default elsewhere (here 4px, the nearest step) |
| `--modalTitleFontSize` | 1.8rem, line-height 4rem | the same (here `--ia-font-size-xl`, off-scale 1.8rem moved up) |
| body | `#fbfbfd`, text `#333`, `0 1rem` padding | the same (here `--ia-space-4`) |
| `--modalBackdropColor` | `rgba(10, 10, 10, 0.9)` | not overridden (here 50% black and a 3px blur; offshoot is to follow) |
| close button | a 2rem white disc, top and end 1.2rem | the same |
| `showHeaderLogo` | the black round IA logo over the band | off, except unlinking an account |

## Behavior

Use `<dialog>` with `showModal()`. It gives the top layer, the scrim, focus trapping,
Escape and inertness for free — all of which are easy to get subtly wrong by hand.

- **Focus moves in** on open: to the first field or action in the body (`autofocus`), not
  the close button that comes first in the header; or to the dialog itself if it is purely
  informational.
- **Focus returns** to the trigger on close, always.
- **Escape closes** any dismissible dialog.
- **Click on the scrim closes** dismissible dialogs; it does not close a dialog with
  unsaved input.
- Background content is inert — `<dialog>` handles this; if you cannot use it,
  `inert` on the page wrapper.
- `aria-labelledby` points at the title; `aria-describedby` at the body if there is a
  single explanatory paragraph.

## Anatomy

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  2px frame in the band color
┃▓▓▓▓▓▓▓▓▓▓▓▓▓ Title ▓▓▓▓▓▓▓▓▓▓▓▓▓▓ (×) ┃  .ia-modal__header — band, centered white title
┃ Body — scrolls if it has to          ┃  .ia-modal__body, --ia-space-4 padding
┃                  [Cancel] [Confirm]  ┃  .ia-modal__actions, right, --ia-space-2 gap
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

```html
<dialog class="ia-modal ia-modal--sm ia-modal--danger" aria-labelledby="t">
  <header class="ia-modal__header">
    <h2 class="ia-modal__title" id="t">Delete This Collection?</h2>
    <button class="ia-modal__close" type="button" aria-label="Close">…close glyph…</button>
  </header>
  <div class="ia-modal__body">…<div class="ia-modal__actions">…</div></div>
</dialog>
```

- Close button: `.ia-modal__close`, `aria-label="Close"`, 44px hit area, at the band's end.
- Actions right-aligned, primary last. On mobile they stack full-width, primary on top.
- A destructive confirm uses the `danger` intent and names the action:
  "Delete Collection", not "OK".

## Confirm and alert

A yes-or-no question — "Delete this collection?" — is common enough to have a helper, the
async replacement for `window.confirm()`. It builds the dialog through `modal-manager`,
removes it once closed, and resolves `true` or `false`; `iaAlert()` is the single-button
version for something the reader must acknowledge.

```js
if (await iaConfirm({
  title: 'Delete This Collection?',
  body: 'Every item in it will be moved out of the collection.',
  confirm: 'Delete Collection', cancel: 'Cancel', tone: 'danger'
})) { … }
```

- **The page passes every label**, and the confirm label names the action. A label
  left out falls back to a `msg()` string ([Localization](README.md#localization)),
  never a bare English literal, so nothing untranslated leaks into a translated page.
- Escape and the scrim resolve `false`.
- Anything that collects input is a composed modal, not a confirm.
- A message the reader can safely miss is a toast ([alert](alert.md)), not an alert.

## Drawer

A drawer is a modal anchored to an edge — the mobile nav.

- Full width (bottom/top) or `min(90vw, 40rem)` (side).
- Radius only on the leading edge.
- Slides in over `--ia-motion-duration-slow` with `--ia-motion-easing-enter`, out over
  `--ia-motion-duration-base` with `--ia-motion-easing-exit`. Animate `transform`, never
  `right` or `left` — live's mobile menu (ia-topnav's `media-menu`) animates `top` and
  `height` over 0.2s.
- Under `prefers-reduced-motion` it appears without sliding.
- Same focus contract as a modal, and the same scrim and blur: every modal surface reads
  as the same gesture ([elevation.md](../foundations/elevation.md#overlays)).
- On touch it can be swiped away, toward its own edge: a side drawer sideways, a bottom
  sheet down. The gesture follows the placement, and in right-to-left text a start drawer is
  on the right.
- A bottom sheet with a scrolling body keeps its primary action pinned to the bottom
  edge.

## Non-modal popovers

Dropdown menus, [menus](menu.md), [tooltips](tooltip.md) and comboboxes are **not**
modals. They do not trap focus, they get neither scrim nor blur, and they close on outside
click, Escape, or focus leaving. Use `--ia-z-index-dropdown` (tooltips
`--ia-z-index-tooltip`) and `--ia-shadow-overlay`; a light panel also carries
`--ia-border-card`, because without a scrim a soft shadow alone loses its edge on the
page.

## List settings

The create-and-edit dialog for a user list, from iaux's `ia-userlist-settings` (1.1.2):
name, description and a Private switch, then Cancel and Save. It is a standard modal with
a [form](../patterns/forms.md) inside; nothing about it is special. Live departs in
three places:

- **"List name\*"** marks the required field with a bare asterisk. The rarer of
  required or optional is said in words in the label
  ([forms.md](../patterns/forms.md)): every other field is optional here, so "List Name
  (required)".
- **Fields set `outline: none`.** They take the universal focus ring
  ([D-19](../DECISIONS.md#d-19)).
- **Its own button styles.** It ships a near-copy of `ia-styles`' `.ia-button` rather than
  the system's; Cancel is `ia-button--secondary`, Save `ia-button--primary`, primary last,
  as [Anatomy](#anatomy) gives.

## Don't

- Don't open a modal from a modal.
- Don't use a modal for something a page could do — the signup flow is a page.
- Don't put a scrolling list in a modal without a visible scroll boundary.
- Don't close on scrim click when there is unsaved input.
