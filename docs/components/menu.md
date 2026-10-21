# Menu

> **Use instead:** a value that is read or submitted later → [dropdown](dropdown.md). Two to
> four values that fit on screen → [segmented control](segmented-control.md). Site
> navigation → the [topnav](navigation.md)'s links.

A list of commands behind a trigger: an item's "More actions", the topnav's account
menu. (Share is not one: in offshoot it opens a [modal](modal.md) of links and embed
fields.) A dropdown and a menu can look alike; pick by what
activating an item does. A dropdown holds a value and moves its selection as you arrow
through it. A menu runs a command, and **arrowing through it does nothing until Enter,
Space or a click** — which is what makes it safe to wire to navigation. Arrowing past
"Report This Item" must not report it.

## Spec

A dark panel, the same surface as the dropdown's ([D-41](../DECISIONS.md#d-41)), so the two
read as one family. Live's topnav account menu is the exception: a white panel on wide
screens ([navigation.md](navigation.md#the-live-component)). It joins the family. The panel carries `.ia-inverse`, so its text, focus ring, hover and soft
selected look re-point themselves.

| Part | Value |
| --- | --- |
| Panel | `--ia-color-surface-inverse`, `--ia-radius-default`, `--ia-shadow-overlay`, `--ia-space-1` above and below the rows |
| Placement | below the trigger, `--ia-space-1` away, start-aligned with it: the trigger and menu share a `.ia-menu-anchor`. `.ia-menu-anchor--end` aligns it to the trigger's end, for a trigger at the end of a bar |
| Layer | `--ia-z-index-dropdown` |
| Row | `--ia-size-control-sm` (30px) **minimum** height (44px on coarse pointers); padding `0 --ia-space-4 0 --ia-space-2`; 1.4rem |
| Row hover | `--ia-color-hover-overlay` (white at 12% on the dark panel) |
| Row focus | the inverse focus ring, inset |
| Current item | soft selected tier and a check, for menus whose items are states (a sort order) |
| Separator | `--ia-border-divider`, `--ia-space-1` above and below |
| Group heading | `.ia-menu__heading`: `--ia-font-size-xs` / bold, uppercase through `text-transform`, `--ia-color-text-secondary`, the row's inline padding. Text, not an item: arrows skip it |
| Row icon | optional, `--ia-size-icon-md`, secondary text color |

### The menu-row contract

Every row inside a panel — menu, dropdown, the topnav's media menu — follows the same rules:

- **One row height, as a minimum.** `--ia-size-control-sm`, applied as `min-block-size`, never
  `block-size`, so a row with a second line grows instead of clipping.
- **Rows run edge to edge** of the panel, with the panel's own padding above the first and
  below the last.
- **Hover is the overlay**, so it works on any panel color.

## Keyboard

| Key | On the trigger | In the menu |
| --- | --- | --- |
| Enter / Space | opens, focus on the first item (or the current one) | activates the item and closes |
| Down | opens, focus on the current item | next item, wrapping |
| Up | — | previous item, wrapping |
| Home / End | — | first / last item |
| Escape | — | closes, focus back on the trigger |
| Tab | — | closes, focus moves on |

A roving `tabindex` keeps the open menu one tab stop. A click outside closes it without
moving focus.

## Semantics

```html
<span class="ia-menu-anchor">
  <button class="ia-button ia-button--secondary" type="button"
          aria-haspopup="menu" aria-expanded="false" aria-controls="more-menu">More</button>
  <ul class="ia-menu ia-inverse" id="more-menu" role="menu" aria-label="More" hidden>
    <li role="none"><button class="ia-menu__item" role="menuitem" tabindex="-1">Edit Item</button></li>
    <li role="none"><button class="ia-menu__item" role="menuitem" tabindex="-1">View History</button></li>
    <li role="separator" class="ia-menu__separator"></li>
    <li role="none"><button class="ia-menu__item" role="menuitem" tabindex="-1">Report This Item</button></li>
  </ul>
</span>
```

- **The anchor is the trigger's box.** `.ia-menu-anchor` wraps exactly the trigger and the
  menu, so the menu is placed against the trigger, not against whatever container the
  trigger happens to sit in. The menu follows the trigger in the DOM, so Tab order and
  reading order match.

- Items that navigate are `<a class="ia-menu__item" role="menuitem" href>`; items that act are
  `<button>`s.
- A menu whose items are states — "Most Recent / Most Viewed / Title" — uses
  `menuitemradio` with `aria-checked`, and **the trigger names the current state**:
  `aria-label="Sort By, Most Recent"`. Otherwise it announces a bare value with no clue what
  it is a value of.
- A group of items under a heading is a nested list:
  `<li role="none"><span class="ia-menu__heading" id="h">Admins</span><ul role="group" aria-labelledby="h">…</ul></li>`,
  after a separator.
- The menu is not modal: no scrim, no focus trap.

## Contract

- **Events.** Each item's native `click` (or navigation, for links).
- **Keyboard.** As the table above.
- **Rendering.** Light DOM. The trigger is any button with `aria-haspopup="menu"`.

## Don't

- Don't use a menu to pick a value a form submits; that is a dropdown.
- Don't act on arrow keys; only on Enter, Space or a click.
- Don't nest menus.
- Don't put more than about ten items in one, or a scroll inside one.
