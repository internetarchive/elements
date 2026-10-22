# Color

archive.org's palette is not broken — it is undocumented. A coherent gray ramp, a navy
CTA and a bright blue link already exist and are already named as CSS custom properties.
What is missing is a rule for which name to reach for, and a handful of the values fail
contrast against the surfaces they are actually drawn on.

This page keeps the live palette, gives every color a job, and changes the six values
that fail contrast where they are drawn. Every change is flagged and
carries a decision number.

## The rule

**Never reference a palette value directly.** Product code uses a semantic role —
`--ia-color-text-secondary`, not `--ia-color-palette-gray-600`. Roles can be re-pointed
when a surface changes; raw hexes cannot. If no role fits, add one, named for its job.

Palette names are ordinal, as in most ramps: `gray-50` is the lightest gray and `gray-900`
the darkest, so a name says where a value sits ([D-56](../DECISIONS.md#d-56)). The live
name each value came from — `--grey13`, `--dark-gray` — is kept in `tokens.json` beside it.

## Which token do I use?

Most role names say what they are for. The ones that don't:

| You are styling… | Use |
| --- | --- |
| Metadata — bylines, counts, dates | `--ia-color-text-secondary`, the lightest text allowed on any light surface |
| An edge that tells you where a control begins | `--ia-color-border-strong` (or the `--ia-border-control` shorthand). Decoration → `-default`; dividers → `-subtle` |
| A row, chip or ghost control on hover | `--ia-color-hover-overlay`, as a layer — it works on sunken and dark surfaces too |
| The chosen item in a set | `--ia-color-selected-strong-*` or `-soft-*` — see [Selected](#selected) |
| A message or banner | the status color for the icon, `-subtle` for the fill, `-border` for the edge, primary text |
| A destructive button | `--ia-color-action-danger-*` — never `--ia-color-brand-donate` |
| Anything on the topnav or a dark panel | wrap it in `.ia-inverse` and use the ordinary roles |

## Surfaces

Four surfaces, all already live.

| Token | Value | Where it is live today |
| --- | --- | --- |
| `--ia-color-surface-page` | `#fbfbfd` | `<body>` — the default page background (offshoot's light theme) |
| `--ia-color-surface-raised` | `#ffffff` | cards, tiles, modals, form panels |
| `--ia-color-surface-sunken` | `#f1f1f4` | collection-browser's tile thumbnail well (`--imageBlockBackgroundColor`) |
| `--ia-color-surface-inverse` | `#2c2c2c` | dark controls — collection-browser's chosen A–Z letter and the more-facets Cancel button |
| `--ia-color-surface-chrome` | `#222222` | the topnav |
| `--ia-color-surface-chrome-secondary` | `#333333` | the subnav and media menu |
| `--ia-color-surface-collection` | `#666666` | the collection tile's card and thumbnail well — 5.74:1 with white text |
| `--ia-color-surface-theater` | `#000000` | the item page's theater, behind the player and BookReader — with `.ia-inverse .ia-inverse--theater` |

The light surfaces carry a faint cool cast (`#fbfbfd`, `#f1f1f4`) rather than a warm one.
archive.org frames film stills, scanned pages and screenshots, and a warm surround shifts
how they read; the recognizable part of the palette is the dark frame, not the page.

`page` and `raised` are only 1.03:1 apart. That is deliberate — the difference reads as
a subtle lift, not a boundary. If you need a visible boundary, use a border or elevation,
not these two together.

## Text

| Token | Value | On page | On raised | On sunken |
| --- | --- | --- | --- | --- |
| `--ia-color-text-primary` | `#2c2c2c` | 13.51:1 | 13.97:1 | 12.39:1 |
| `--ia-color-text-secondary` | `#666666` | 5.56:1 | 5.74:1 | 5.09:1 |
| `--ia-color-text-link` | `#3a4fd6` **[changed]** | 6.22:1 | 6.42:1 | 5.70:1 |
| `--ia-color-text-link-hover` | `#194880` | 8.91:1 | 9.21:1 | 8.17:1 |
| `--ia-color-text-danger` | `#b8161c` **[changed]** | 6.41:1 | 6.63:1 | 5.88:1 |

**`#666` is the lightest text color permitted on any light surface.** It clears 4.5:1
even on the sunken surface. Live currently uses `#999` (2.85:1) and `#888` (3.54:1) as
text; both are banned — they are demoted to borders and disabled states. See
[D-08](../DECISIONS.md#d-08).

### On dark chrome

Wrap the subtree in `.ia-inverse` (or `data-ia-surface="inverse"`) and the text, border
and focus tokens re-point automatically.

| Token | Value | On `#000` | On `#222` | On `#2c2c2c` | On `#474747` |
| --- | --- | --- | --- | --- | --- |
| `--ia-color-text-inverse` | `#ffffff` | 21:1 | 15.91:1 | 13.97:1 | 9.29:1 |
| `--ia-color-text-inverse-secondary` | `#cccccc` | 13.08:1 | 9.91:1 | 8.70:1 | 5.79:1 |
| `--ia-color-text-inverse-link` | `#9aa8ff` **[changed]** | 9.42:1 | 7.14:1 | 6.26:1 | — |
| `--ia-color-text-inverse-link-hover` | `#ffffff` | 21:1 | 15.91:1 | 13.97:1 | 9.29:1 |

The live `#aaa` subnav link is 5.44:1 on `#333` and fine there, but only 4.00:1 on
`#474747` — which is also a live surface. `#ccc` clears every dark surface, so it is the
single inverse-secondary value.

## Links

The live link color `#4b64ff` is 4.60:1 on white — a tenth of a point over AA — but the
page background is `#fbfbfd`, not white, where it is **4.45:1**, and on the `#f1f1f4`
sunken surface it is **4.08:1**. On the `#222` topnav it is 3.46:1. So the live
link color fails on most of the surfaces it is actually used on.

`#3a4fd6` is the same hue, darker, with real headroom on every light surface.
`#9aa8ff` is its counterpart on dark chrome. See [D-07](../DECISIONS.md#d-07).

Links are underlined on hover everywhere, and underlined at rest inside prose — item
descriptions, collection blurbs, help text. Color alone is never the only signal that
something is a link (WCAG 1.4.1).

## Actions

Five CTA intents, already named in live as `--ia-theme-*-cta-*` (offshoot's
`theme-manager/themes/light.ts`).

| Intent | Fill | Border | Label | Label contrast |
| --- | --- | --- | --- | --- |
| primary | `#194880` | `#c5d1df` | `#ffffff` | 9.21:1 |
| secondary | `#ffffff` **[changed]** | `#666666` | `#2c2c2c` **[changed]** | 13.97:1 |
| danger | `#e51c23` **[changed]** | `#b8161c` **[changed]** | `#ffffff` | 4.64:1 |
| warning | `#ffb000` **[changed]** | `#cc7a00` **[changed]** | `#2c2c2c` **[changed]** | 7.62:1 |
| donate | `#20705a` | `#20705a` | `#ffffff` | 5.95:1 |
| disabled | `#666666` | `#999999` | `#ffffff` | 5.74:1 |

Three notes on the changes:

- **Danger.** Live had three near-identical reds: `#d9534f` fill, `#d43f3a` border and
  `#e51c23` as `--classic-red`. The fill failed with white text (3.96:1). Consolidating
  onto `#e51c23` — which already exists and already passes at 4.64:1 — removes two colors
  and fixes the contrast in one move. [D-09](../DECISIONS.md#d-09)
- **Secondary.** Live's `#333` secondary is heavier than the navy primary beside it —
  12.22:1 against the page to the primary's 8.91:1 — so the supporting action out-shouts
  the one the page wants. Secondary is a white button with a `#666` edge and primary text,
  raised by `--ia-shadow-raised`. [D-52](../DECISIONS.md#d-52)
- **Warning.** Live's `#ee8950` takes a white label at 2.52:1, badly failing, and though
  offshoot's theme defines it, no live page draws it. Darkening an orange far enough for white text
  turns it brown, so the warning goes the other way: a bright `#ffb000` with a `#2c2c2c`
  label, 7.62:1, that reads as orange beside the red and the green.
  [D-11](../DECISIONS.md#d-11)
- **Two borders are load-bearing.** `#ffb000` against the page is only 1.77:1, and the
  white secondary fill is 1.03:1, so on those two buttons the fill alone does not tell you
  a button is there. Their borders have to clear 3:1 by themselves: `#cc7a00` does at
  3.20:1, `#666` at 5.56:1. Every other intent's fill carries its own boundary and its
  border is decorative.

## Status

| Token | Value | Use |
| --- | --- | --- |
| `--ia-color-status-success` | `#20705a` **[changed]** | confirmations, "saved", upload complete |
| `--ia-color-status-warning` | `#a85216` **[changed]** | "this may take a while", partial results |
| `--ia-color-status-danger` | `#b8161c` **[changed]** | validation errors, failed operations |
| `--ia-color-status-info` | `#194880` | neutral notices |

Each of these clears 4.5:1 as text on all three light surfaces. The live `#31a481`
mint green is 3.11:1 with white and 4.37:1 as text on the page background; it is kept
as a [legacy](#legacy) value for reference but is not a text or fill color.
[D-10](../DECISIONS.md#d-10)

Each status also has a tint and an edge, for messages and banners
([D-47](../DECISIONS.md#d-47)): the status color mixed 8% and 35% into white.

| Status | `-subtle` | `-border` | Primary text on the tint | Status text on the tint |
| --- | --- | --- | --- | --- |
| info | `#edf0f5` | `#afbfd3` | 12.23:1 | 8.06:1 |
| success | `#edf4f2` | `#b1cdc5` | 12.52:1 | 5.34:1 |
| warning | `#f8f1ec` | `#e1c2ad` | 12.49:1 | 4.84:1 |
| danger | `#f9eced` | `#e6adb0` | 12.14:1 | 5.76:1 |

The borders are decorative — the icon carries the meaning. Message text stays
`--ia-color-text-primary`; status-colored body text is harder to read at 14px for no gain.

**Status as a shape.** A dot, a bar or a switch track in a status color is a graphic, and
needs 3:1 against what surrounds it (WCAG 1.4.11), not 4.5:1. The status colors clear that
everywhere. When a component needs a brighter status shape, add an `-object` role for it
then, checked against the surface it sits on.

## Hover

`--ia-color-hover-overlay` is black at 6%, applied as a layer over the element's own fill
rather than replacing it ([D-46](../DECISIONS.md#d-46)):

```css
.ia-choice:hover {
  background-image: linear-gradient(var(--ia-color-hover-overlay), var(--ia-color-hover-overlay));
}
```

Because it is translucent it darkens whatever it sits on: `#fff` becomes `#f0f0f0`, the
sunken `#f1f1f4` becomes `#e3e3e5`. A hover that painted
`--ia-color-surface-sunken` instead would be invisible on a sunken surface. Inside
`.ia-inverse` and dark panels it re-points to `--ia-color-hover-overlay-inverse`, white at
12%. The topnav keeps its live `#333` hover (ia-topnav's `--activeButtonBg`).

## Selected

One look for "this one is chosen", in two tiers ([D-45](../DECISIONS.md#d-45)). Pick by
what the state means, not by which looks right:

| Tier | Tokens | Where | Contrast |
| --- | --- | --- | --- |
| **strong** — the state *is* the content | `--ia-color-selected-strong-fill` `#194880`, `-strong-text` white | the current page, an applied filter chip, a checked box or radio, the active tab's bar | 9.21:1 |
| **soft** — one chosen among neutral controls | `--ia-color-selected-soft-fill` `#e8edf2`, `-soft-border` `#98adc6`, `-soft-text` `#194880` | the result-view switch and any segmented control, whose label and glyph stay ink (`--ia-color-text-primary`, 11.86:1); a chosen dropdown or menu option | 7.82:1 |

Inside `.ia-inverse` and dark panels the soft fill re-points to `--ia-color-selected-soft-fill-inverse` (`#666`)
and its text to white. Selection is never color alone: strong pairs with a check or
`aria-current` styling, soft with its border and, in lists, a check.

## Environment

| Token | Value | Use |
| --- | --- | --- |
| `--ia-color-environment-development` | `#20705a` | the topnav badge on a development host |
| `--ia-color-environment-staging` | `#a85216` | the topnav badge on a staging host |

White text on each clears 4.5:1. The badge never renders in production — see
[navigation.md](../components/navigation.md#environment-badge).

## Borders

| Token | Value | Use |
| --- | --- | --- |
| `--ia-color-border-subtle` | `#dddddd` | decorative separators only — 1.36:1 |
| `--ia-color-border-default` | `#cccccc` | card edges, table rules |
| `--ia-color-border-strong` | `#666666` | **any border that defines a control** — 5.74:1 |
| `--ia-color-border-focus` | `#3a4fd6` | the focus ring on light surfaces |
| `--ia-color-border-focus-inverse` | `#9aa8ff` | the focus ring on dark chrome |

If a border is the only thing telling a user where an input or a control begins, it must
be `strong`. `subtle` and `default` are for edges that are decoration — remove them and
the interface still makes sense.

## Legacy

Live values that no role points at, kept so a live name can still be traced to a value:
`--ia-color-legacy-gray-550` (`#6f6f6f`), `-blue-500` (`#4b64ff`, the live link color),
`-orange-400` (`#ee8950`, the old warning fill), `-orange-500` (`#ec7939`) and
`-green-500` (`#31a481`). New code never uses them. A value is
deleted once nothing on the live site declares it.

The `--ia-theme-*` hooks in `src/themes/theme-styles.ts` work the same way: they
map the names archive.org's components read today onto the new roles, and each line goes
once its consumers read `--ia-*` directly. New code never writes a `--ia-theme-*` name;
code touched for another reason migrates the names it uses.

## Brand

| Token | Value | Reserved for |
| --- | --- | --- |
| `--ia-color-brand-donate` | `#f00` | the donate heart, and nothing else |
| `--ia-color-brand-navy` | `#194880` | primary actions, the institutional blue |
| `--ia-color-brand-wayback` | `#fcf5e6` | the Wayback Machine hero panel |

The heart is red and only the heart is red. Everything else about donating — a Donate
button, a donation banner's action — is green: `--ia-color-action-donate-*`, `#20705a`
with a white label (5.95:1), the one green that carries white text
([D-53](../DECISIONS.md#d-53)). Inside a donate button the heart takes the label's color.
`--ia-color-action-donate-subtle` (`#b8f5e2`), a pale mint, is the donation thermometer's
track; donate green on it is 4.88:1. It is never a background for body text.
Don't use the donate red for generic errors — use `--ia-color-status-danger`.

## Checking your work

```bash
pnpm exec vitest run src/themes/tokens.node.test.ts
```

Eighty pairings, every one the guide recommends, checked against WCAG 2.2 AA. It
exits non-zero on any failure, so it belongs in CI. If you add a color role, add its
pairings to the check in the same commit.
