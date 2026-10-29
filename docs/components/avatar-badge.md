# Avatar, badge, chip

> **Use instead:** a one-shot action → [button](button.md). One of a few exclusive options →
> [segmented control](segmented-control.md). A badge that can be clicked is a chip.

Small components that repeat everywhere and drift easily.

## Avatar

| Size | Token | Use |
| --- | --- | --- |
| `sm` | `--ia-size-icon-lg` (24px) | inline beside a name in a list |
| `md` | `--ia-size-icon-xl` (32px) | topnav user menu — already `--userIconWidth` |
| `lg` | 6.4rem (64px) | profile header on mobile |
| `xl` | 10rem (100px) | profile header on desktop — already `.profile-pic` max-width |

- `--ia-radius-circle`, `object-fit: cover`, 1:1.
- Fallback is the user's initial on `--ia-color-surface-inverse` with
  `--ia-color-text-inverse`, not a broken image.
- `alt=""` when the name is adjacent; `alt="<name>"` when the avatar stands alone.
- An avatar inside a link inherits the link's 44px target; it does not need its own.

### Changing the avatar

The profile page's picture editor, offshoot's own `ia-pic-uploader`
(`widgets/pic-uploader/`): the round avatar with a drop zone for a new image and an Upload
button. Specced here as the avatar at its
largest size, with a file input and an [ia-button](button.md):

- The drop zone is a `--ia-border-control`-weight dashed edge in `--ia-color-border-strong`,
  `--ia-radius-default`, around a real `<input type="file">` that keeps its label, so the picker is named and
  reachable however the patron gets to it.
- Errors are an inline [message](alert.md) under it, in `--ia-color-text-danger`.

Live's drop zone is a `<div role="button" tabindex="0">` with `outline: none`, so it shows
no focus, over a file input that is `display: none`; the full editor's controls sit in a
`3px solid #ccc` frame (1.6:1 on white) with the picture at a 6px radius.

## Badge

A count or short status attached to something else — unread counts, "New", media-type
labels on tiles.

| Property | Value |
| --- | --- |
| Height | 2rem (20px) |
| Padding-inline | `--ia-space-1` |
| Radius | `--ia-radius-pill` |
| Font | `--ia-font-size-xs` / 700 |
| Min width | 2rem — so a single digit is still a circle |

| Variant | Background | Text |
| --- | --- | --- |
| neutral | `--ia-color-surface-sunken` | `--ia-color-text-primary` |
| primary | `--ia-color-action-primary-fill` | white |
| danger | `--ia-color-status-danger` | white |
| new | `--ia-color-action-warning-fill` | `--ia-color-action-warning-text`, uppercase — calls out a new feature, as the profile's Lists tab does ([profile-page.md](../patterns/profile-page.md#tabs)) |

A badge is never interactive. If it can be clicked it is a chip.

Counts over 99 display as `99+`, with the true number in the accessible name.
A badge attached to a control goes in that control's accessible name:
`aria-label="Notifications, 3 unread"` — not as a separate reading.

## Chip

An interactive token — an applied filter, a tag, a selectable category.

| Property | Value |
| --- | --- |
| Height | `--ia-size-control-sm` (30px), 44px hit area |
| Padding-inline | `--ia-space-3` |
| Radius | `--ia-radius-pill` |
| Font | `--ia-font-size-sm` / 400 |
| Border | 1px `--ia-color-border-strong` |

| State | Treatment |
| --- | --- |
| rest | transparent background, `--ia-color-text-primary` |
| hover | `--ia-color-hover-overlay` |
| selected | the strong selected tier: `--ia-color-selected-strong-fill`, white text |
| removable | trailing `×` with its own 44px target and `aria-label="Remove Filter: Texts"` |

A removable chip contains **two** targets — the chip and its remove button — so they
need to be separate elements, each meeting the minimum, not a single 30px pill with a
14px `×` inside it.

Removable chips list the values chosen in a facet's "Select Filters" modal
([facet-filter.md](facet-filter.md#the-full-list)). Browse pages draw no chips above the
results: the rail shows what is applied, and "Clear All Filters" resets it.

## Don't

- Don't use a badge where a chip is needed — if it's clickable, it's a chip.
- Don't put more than two words in a chip.
- Don't let a badge overlap its parent's focus ring.
