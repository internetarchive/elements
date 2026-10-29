# Navigation — topnav, subnav, breadcrumb

> **Use instead:** sections within one page → [tabs](tabs.md). Commands → [menu](menu.md).

The topnav is the single most-seen component on archive.org: it is identical across the
live pages, which is a real asset. It is also where half the keyboard-accessibility
problem lives.

## Topnav

| Property | Value |
| --- | --- |
| Background | `--ia-color-surface-chrome` (`#222`) |
| Height | 5rem (50px) desktop, 4rem (40px) at and below `lg` — live is 51 / 41, the same plus a 1px bottom border |
| Text | `--ia-color-text-inverse` primary, `--ia-color-text-inverse-secondary` for labels |
| Links | `--ia-color-text-inverse-link` (`#9aa8ff`) |
| Elevation | `--ia-shadow-raised` |
| Layer | `--ia-z-index-header` |
| Breakpoint | switches to the desktop layout at `lg` (890px) |

The whole bar sits inside `.ia-inverse`, so every text, border and focus token
re-points to its dark-surface value without each child having to know.

### What must change

**Focus.** Many of the homepage's first keyboard stops have no focus indicator, and
nearly all of them are in this component: the media menu (Web / Texts / Video /
Audio / Software / Images), the login toggle, Sign up, Log in, and Upload. The
offending rules are explicit. Eleven of them, by file in `ia-topnav`'s `src/styles/`
(iaux; offshoot locks 2.2.0, and `master`'s 2.2.1 changes only the Firefox add-on link):

```css
/* ia-topnav.ts */     primary-nav:focus { outline: none !important; }
/* primary-nav.ts */   button:focus, input:focus { outline: none; }
                       button.user-menu:hover, button.user-menu:focus { outline: none; }
                       .upload:focus-visible { outline: none; }
/* media-button.ts */  .menu-item:focus { outline: none; }
/* media-menu.ts */    :host { outline: none; }
/* login-button.ts */  .logged-out-menu:focus-visible { outline: none; }
                       span a { outline: 0; }
                       a:hover, a:active, a:focus { outline: none !important; }
/* desktop-subnav.ts */ a { outline: none; }
/* dropdown-menu.ts */ a:hover, a:active, a:focus { outline: none; }  /* recolors instead */
```

Every one of these is deleted and replaced by the shared `:focus-visible` rule from
[accessibility.md](../foundations/accessibility.md#the-rule). Because these live inside
shadow roots, the rule must be added to each component's own stylesheet — it does not
inherit from the document.

**The logo link.** `a.link-home` renders at `rgb(0, 0, 238)`, the browser default,
because it was never given a color. Give it `--ia-color-text-inverse` and a proper
focus ring; it is one of the few elements in the bar with any ring at all, and that
ring is the browser's own, offset 1px.

**Media-menu targets.** The desktop media buttons are 40px wide and 50px tall, a 40px
icon in a bar-height anchor — under the 44px minimum by a whisker across. Widen the hit
area with padding; the 40px icon can stay.

At and below `lg` the menu becomes a stack of full-width rows — `a.menu-item` is
375×40 at a 375px viewport, with a 40×40 icon and a 1.6rem/400 label. 40px is under the 44px coarse-pointer
floor, on the primary navigation of every page. The rows grow to
`--ia-size-target-min`; nothing else about them needs to change.

**Live:** `primary-nav` is 1280×51 on desktop and 375×41 on mobile, background
`#222`, with a 157×50 branding block holding a 142×30 logo lockup (a 27×30 mark and a
95×30 wordmark). The legacy item page renders it a pixel shorter, at 50/40.

**Account links.** "Sign up", "Log in" and "Upload" are `#999` on `#222`, 16px tall.
`#999` is retired as a text color ([D-08](../DECISIONS.md#d-08)); they take
`--ia-color-text-inverse-secondary` and become 30px targets, 44px on a coarse pointer
([D-17](../DECISIONS.md#d-17)). The media-menu glyphs are `#999` too, filled through CSS
`fill`; as graphics beside no text on desktop they take the same token.

**Casing.** "SIGN UP" and "Sign up for free" are the same destination. It becomes "Sign
Up" everywhere, in Title Case. Where uppercase is wanted it comes from `text-transform`,
which keeps the source string canonical. See
[content-voice.md](../foundations/content-voice.md#capitalization).

### Semantics

```html
<a class="ia-skip-link" href="#maincontent">Skip to Main Content</a>
<!-- banners, if any -->
<header class="ia-topnav ia-inverse">
  <nav aria-label="Media Types">…</nav>
  <form role="search">…</form>
  <nav aria-label="Account">…</nav>
</header>
```

The reference implementation is `.ia-topnav` in `demo/docs/assets/ia.css`, demonstrated on
the components page. It queries its own width rather than the viewport, so it collapses
at the `lg` value wherever it is placed.

**The logo** is lifted from the live topnav by `tools/make-brand.mjs` — the building-façade
mark and the wordmark, 10px apart, 132×30 — and ships as standalone SVG in two colorways
(`demo/docs/assets/brand/ia-logo-white.svg` for dark chrome, `-dark` for light surfaces). It is a
brand asset, not part of the icon set: it draws with `<mask>` and `<use>`, which the icon
allowlist excludes. Use it as an `<img alt="Internet Archive">` inside the home link.

Each `<nav>` (media types, account, subnav) needs its own distinct `aria-label`.

Dropdown menus (media menu, login menu) are `aria-expanded` disclosure buttons with a
`role="menu"` popup: Escape closes and returns focus to the trigger, Arrow keys move
between items, Tab closes and moves on.

Live does none of this yet, and each of these goes:

- The media buttons are links (`<a href>`) that open a menu, named by
  `title="Expand texts menu"`, with no `aria-expanded`. They become buttons.
- The user-menu button carries no `aria-expanded`; the panel element carries it and
  `aria-hidden` instead. The button states it.
- The open media slider takes `tabindex="1"`, which reorders the whole page's Tab
  sequence. Nothing takes a positive `tabindex`.
- Focusing Upload toggles the media menu (`@focus=${this.toggleMediaMenu}`), so tabbing
  past it opens a menu. Focus never opens anything.
- Every glyph is an `<svg>` with a `<title>` and `<desc>` named by `aria-labelledby`, so
  the description joins the link's name: the mobile donate link reads "Donate icon An
  illustration of a heart shape". Glyphs are `aria-hidden`
  ([iconography.md](../foundations/iconography.md)); the link names itself.

### Open media type

While a media type's menu is open, its button is the chosen one: `aria-expanded="true"`,
background `--ia-color-surface-chrome-secondary` (`#333`), and its glyph in that type's
color — `--ia-color-mediatype-web`, `-texts`, `-movies` (Video), `-audio`, `-software`,
`-image`. On `#333` those clear 4.0:1 (video, the lowest, 4.01:1). The selector reads
`data-type` on the button.

Live marks it `.selected`: a `#474747` background and the pre-[D-43](../DECISIONS.md#d-43)
hues (`#ffcd27`, `#faab3c`, `#f1644b`, `#00adef`, `#9ecc4f`, `#aa99c9`). On `#474747` the
D-43 colors fall to about 3.0:1, and live's video glyph is 2.95:1 — so the background
moves to `#333` rather than the glyphs moving back.

### Wide tiers

The bar has two more steps above `lg`, both from its own width:

| Width | Adds |
| --- | --- |
| 990px | the screen name beside the avatar, and the word "Upload" beside its glyph |
| 1200px | a label after each media glyph: `--ia-font-size-sm`, uppercase through `text-transform`. Web's reads "Web" |

Live uses the same widths as viewport media queries, with 1.3rem labels (off the type
scale). Below 990px Upload is its glyph alone, named by `aria-label`.

### Signed in

The account area becomes one button: the avatar, then the screen name.

| Part | Value |
| --- | --- |
| Avatar | 3rem (30px) image, `--ia-radius-circle` |
| Screen name | `--ia-font-size-md`, `--ia-color-text-inverse-secondary`, at most 16.5rem wide with an ellipsis, `dir="auto"` (screen names come in every script) |
| Menu | the [menu](menu.md) component, in a `.ia-menu-anchor--end` with the button, so it opens end-aligned |

The menu's rows, as live lists them: Upload Files, My Uploads, My Loans, My Favorites,
My Lists, My Collections, My Web Archives, Account Settings, Get Help, Log Out — in Title
Case here, where live has sentence case ([content-voice.md](../foundations/content-voice.md#capitalization)).
Staff see more, each group after a separator under a `.ia-menu__heading`: **Admins** (item,
edit XML …), **Biblio** (bookview, jp2 zip) and **Uploader** (the uploader's email, user
admin, user privs). A heading is text, not a menu item: arrows skip it.

### Environment badge

On a development or staging host, and never in production, a badge sits beside the logo
so a tab is never mistaken for the live site.

| Property | Value |
| --- | --- |
| Class | `ia-env-badge`, `data-env="development"` or `"staging"` |
| Fill | `--ia-color-environment-development` (`#20705a`) or `--ia-color-environment-staging` (`#a85216`) |
| Text | `--ia-color-text-inverse`, `--ia-font-size-xs` / bold, uppercase via `text-transform`, 0.05em tracking — 5.95:1 and 5.41:1 |
| Size | 2rem tall, `--ia-space-1` inline padding, `--ia-radius-sm` |

The host decides whether to render it; the favicon should match it, so the tab strip says
the same thing.

### The live component

`ia-topnav` from the [iaux](https://github.com/internetarchive/iaux) monorepo
(`packages/ia-topnav`). offshoot locks 2.2.0; `master` is at 2.2.1 as of 2026-10-08, which
changes only the Firefox add-on link. `@internetarchive/elements` 1.1.6 — not yet in
offshoot, which locks 1.1.2 — carries a port of it whose parts are renamed (`primary-nav` becomes
`ia-topnav-primary-nav`, and so on); the selectors on this page are the iaux package's.

| Part | Live |
| --- | --- |
| Bar | `#222`, 5rem at and above 890px and 4rem below, plus a 1px `#333` bottom border — no shadow |
| Glyphs, labels | `#999` (`--iconFill`, `--lightTextColor`); `#fff` when active |
| Links | `--linkColor: #4b64ff`, hard-coded on the host, so `--ia-theme-link-color` never reaches it |
| Breakpoints | 890 (`TOPNAV_MOBILE_BREAKPOINT`), 906 (the second logo), 990, 1200 — viewport media queries |
| Media button | a 40×50 anchor around a 40px glyph; `.selected` is `#474747` with the type's hue |
| User menu, wide | a **white** panel: `#333` text at 1.4rem, rows `.5rem 2rem`, 2px radius, `0 1px 2px 1px rgba(0,0,0,.15)`, a 12×7 caret; hover is white on `#4b64ff`; a "callout" badge in `#fee257` |
| User menu, narrow | `#333` panel, 1.6rem |
| Narrow icons | menu, donate heart (`#f00`) and search, each 40×40 |
| Font | `'Helvetica Neue', Helvetica, Arial` — no `Noto Sans` ([D-02](../DECISIONS.md#d-02)) |

Live's user menu carries the staff groups (`uploader` and `biblio` props). The account
menu here stays the dark [menu](menu.md) panel, one family with the dropdown
([D-41](../DECISIONS.md#d-41)); live's white panel is the one place a menu is light.

## Subnav

The "ABOUT / BLOG / EVENTS / PROJECTS / HELP / DONATE / CONTACT / JOBS / VOLUNTEER" row.

| Property | Value |
| --- | --- |
| Background | `--ia-color-surface-chrome-secondary` (`#333`) |
| Text | `--ia-color-text-inverse-secondary` (`#ccc`) |
| Size | `--ia-font-size-sm`, uppercase via `text-transform` |
| Layout | one centered row under the bar; wide layout only (hidden below `lg`, as live) |
| Links | `a.ia-topnav__subnav-link` in `nav.ia-topnav__subnav[aria-label="Site"]`, `--ia-space-3` either side |
| Link height | `--ia-size-control-sm` (30px); `--ia-size-target-min` on a coarse pointer. Live rows are 33px with 14px-tall links |

Live uses `#aaa` on `#333` (5.44:1) which passes, but the same `#aaa` also appears on
`#474747` (4.00:1) which does not. `#ccc` clears every dark surface in the system, so
it is the single inverse-secondary value.

`DONATE` keeps the red heart in `--ia-color-brand-donate` (`#f00`, live's value for this
heart and the mobile one); it is 3.98:1 on `#222` and 3.16:1 on the `#333` subnav, both
fine for the heart glyph but not for text, so the word itself stays `#ccc` with the red
heart beside it — which is what live does. The heart's red is its own: the danger reds
are `#e51c23` and `#b8161c` ([D-09](../DECISIONS.md#d-09)). A Donate *button* elsewhere is the green
`ia-button--donate` ([D-53](../DECISIONS.md#d-53)).

## Skip link

The page's first focusable element — before the donation banner, any other banner and
the header, as offshoot's app root renders it — and off screen until it takes focus:
`a.ia-skip-link[href="#maincontent"]`, "Skip to Main Content", on the raised surface in
link color. Its target is `<main id="maincontent" tabindex="-1">`, which takes focus so the
next Tab starts inside the page; the main element draws no ring of its own. offshoot
scrolls to it smoothly and focuses it after 250ms. Live it works, and it is one of the few
elements that reliably shows focus.

## Activity bar

While a page or its results load, offshoot's `horizontal-activity-indicator` draws a 3px
bar under the header. `.ia-activity-bar` (`role="progressbar"`, `aria-label="Loading"`) is
its spec: a sibling straight after the header, overlapping the page's first 3px rather
than pushing it down; a bar 40% wide sweeps across in `--ia-color-text-link` every
1.4s (`--ia-motion-duration-spin` × 2) on `--ia-motion-easing-standard`. Under
`prefers-reduced-motion` it holds still, full width at half strength. It shows while
anything is loading and goes when the last request finishes. Live's is dodgerblue,
sweeping over the track's width ÷ 200 seconds (at least 3s; 7.5s until its width is known),
with no reduced-motion handling.

## Footer

One line: "Terms of Service (last updated 12/31/2014)", linking to the terms.
`footer.ia-footer.ia-inverse`: `--ia-color-surface-chrome`, `--ia-font-size-xs` regular,
centered, the link in inverse text and underlined on hover. Where it appears follows
offshoot's footer modes:

| Page | Mode |
| --- | --- |
| Homepage | fixed to the viewport's foot (`.ia-footer--fixed`, `--ia-z-index-sticky`) |
| Item page | at the end of the page |
| Every other page | none |

Live (offshoot's `app-footer`) draws it at black 70% over a 2rem backdrop blur, the text at weight 200; the system
uses its chrome surface and regular weight ([D-03](../DECISIONS.md#d-03)).

## Breadcrumb

Not on the live pages but needed for collection hierarchies.

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/details/texts">Texts</a></li>
    <li><a href="/details/americana">American Libraries</a></li>
    <li><a aria-current="page">The history of Little Goody Two-Shoes</a></li>
  </ol>
</nav>
```

- `.ia-type-meta`, `--ia-color-text-secondary`; the current page is
  `--ia-color-text-primary` and not a link.
- Separator is a CSS `::before` with `aria-hidden` semantics — never a text character
  in the DOM, which a screen reader reads aloud between every crumb.
- Collapse the middle on narrow screens: first · … · last, with the ellipsis expanding
  on click.

## Don't

- Don't remove a focus outline anywhere in the chrome.
- Don't put a `<nav>` without an `aria-label` when there is more than one on the page.
- Don't use a hard-coded white inside the chrome — use `--ia-color-text-inverse` so the
  inverse context can be re-themed.
- Don't let the topnav exceed two rows at any width.
