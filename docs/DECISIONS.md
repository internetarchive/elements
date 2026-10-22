<!-- Generated in the style guide repo by tools/make-decisions.mjs. Copied into elements, where it is edited by hand. -->

# Decisions

Every judgment call made while deriving this style guide from the live site.
60 in total.

Each entry records what is live, what the conflict is, what
was decided, why, and what it costs to implement. Nothing here has been applied to
archive.org — these are proposals with a default already chosen, so that the review is
"do we disagree with this?" rather than "what should we do?".

**To review interactively**, open `site/decisions.html` in the style guide repo: you can
set each decision to accepted / amended / rejected, add notes, and export the result as
JSON to hand back.

---

## All decisions

| | Decision | Area | Needs a call |
| --- | --- | --- | --- |
| D-01 | [Extend the existing --ia-theme-* token layer rather than replace it](#d-01) | architecture |  |
| D-02 | [One font stack: "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif](#d-02) | typography |  |
| D-03 | [Two font weights: 400 and 700. Retire 200, 300, 500 and 600](#d-03) | typography |  |
| D-04 | [Body line-height is 1.45](#d-04) | typography |  |
| D-05 | [Heading level is document structure; heading appearance is a class](#d-05) | typography |  |
| D-06 | [Eight-step type scale](#d-06) | typography |  |
| D-07 | [Darken the link color from #4b64ff to #3a4fd6](#d-07) | color |  |
| D-08 | [#999 and #888 are banned as text; #666 is the lightest text color](#d-08) | color |  |
| D-09 | [Consolidate three reds onto #e51c23 (fill) and #b8161c (ink and border)](#d-09) | color |  |
| D-10 | [Darken success from #31a481 to #20705a](#d-10) | color |  |
| D-11 | [Warning is a bright #ffb000 with a dark label and a #cc7a00 edge](#d-11) | color |  |
| D-12 | [Three container widths: 1350 / 1000 / 600. Retire 1170px](#d-12) | layout |  |
| D-13 | [Five border radii](#d-13) | shape |  |
| D-14 | [Four translucent shadows, named by job; retire the opaque offset shadows](#d-14) | shape |  |
| D-15 | [Four breakpoints: 480 / 768 / 890 / 1200 — and 890 stays](#d-15) | layout |  |
| D-16 | [Named z-index scale in steps of 100](#d-16) | layout |  |
| D-17 | [44×44 pointer targets on touch, 24×24 everywhere](#d-17) | accessibility |  |
| D-18 | [Converge on inline SVG icons; deprecate Iconochive and Glyphicons](#d-18) | components |  |
| D-19 | [One universal :focus-visible ring; delete every outline: none](#d-19) | accessibility |  |
| D-20 | [Style the signup form's inputs](#d-20) | components |  |
| D-21 | [Inputs render at 16px below the md breakpoint](#d-21) | accessibility |  |
| D-22 | [5px spacing base, with comfortable and compact densities](#d-22) | layout |  |
| D-23 | [Named motion durations and cubic-bezier easings, plus a global prefers-reduced-motion reset](#d-23) | motion |  |
| D-25 | [The document never scrolls horizontally](#d-25) | layout |  |
| D-26 | [Sentence case everywhere, and one string per destination](#d-26) (replaced by D-44) | content |  |
| D-27 | [Infinite scroll has no Load More and no position indicator](#d-27) | components |  |
| D-28 | [The search page's media-type strip is presented as tabs](#d-28) | accessibility |  |
| D-29 | [Facet groups get fieldset/legend, and 'Show More' names its group](#d-29) | accessibility |  |
| D-30 | [The pill radius is for search fields, chips and badges — never a button](#d-30) | shape |  |
| D-31 | ['Search this collection' becomes a standard button](#d-31) | components |  |
| D-32 | [Form submits use aria-disabled, not the disabled attribute](#d-32) | accessibility |  |
| D-33 | [The modal follows offshoot: a colored header band and frame; three widths instead of five](#d-33) | components |  |
| D-34 | [Tile titles move from a 1.07 line-height to 1.25](#d-34) | typography |  |
| D-35 | [Do not style :visited](#d-35) | color |  |
| D-36 | [The display and page-title roles step down below 890px](#d-36) | typography |  |
| D-37 | [Keep 1rem = 10px](#d-37) | architecture |  |
| D-38 | [WCAG 2.2 level AA is the bar](#d-38) | accessibility |  |
| D-39 | [The result grid uses auto-fill, not counted columns](#d-39) | layout |  |
| D-40 | [Tile footers keep their two layouts, with two glyph sizes](#d-40) | components |  |
| D-41 | [One ia-dropdown panel: one dark, one radius](#d-41) | components |  |
| D-42 | [Facet labels and counts move to 14px; the rail widens to 210px](#d-42) | components |  |
| D-43 | [Media-type colors become tokens; six are darkened to 3:1](#d-43) | color |  |
| D-44 | [Title Case for interface labels; sentence case for running text](#d-44) | content |  |
| D-45 | [One selected look, in two token tiers: strong and soft](#d-45) | color |  |
| D-46 | [Hover is a translucent overlay, not a surface](#d-46) | color |  |
| D-47 | [Messages take a status tint and border; the leading stripe goes](#d-47) | components |  |
| D-48 | [Specs name a step on the 5px scale; one responsive page token](#d-48) | layout |  |
| D-49 | [Controls squeeze on press, tiered by width](#d-49) | motion |  |
| D-50 | [Layers inside a component use isolation and local ordinals; no z-index 0 token](#d-50) | layout |  |
| D-51 | [Buttons set a minimum height and wrap a label that doesn't fit](#d-51) | components |  |
| D-52 | [The secondary button is light](#d-52) | components |  |
| D-53 | [Donating is green; the heart stays red](#d-53) | color |  |
| D-54 | [Hover snaps; it doesn't fade](#d-54) | motion |  |
| D-55 | [Ghost buttons are borderless](#d-55) | components |  |
| D-56 | [Palette names are ordinal: 50 lightest, 900 darkest](#d-56) | color |  |
| D-57 | [Tabs reserve the width of their bold label](#d-57) | components |  |
| D-58 | [Browse pages follow offshoot's collection-browser](#d-58) | components |  |
| D-59 | [The item page follows offshoot's details page](#d-59) | components |  |
| D-60 | [Profile, account settings and login follow offshoot](#d-60) | components |  |
| D-61 | [Banners go above the topnav; the chrome gains offshoot's footer and loading bar](#d-61) | components |  |
| D-62 | [The donation amount picker keeps its gold, as its own tokens](#d-62) | components |  |

---

## Architecture

<a id="d-01"></a>

### D-01 · Extend the existing --ia-theme-* token layer rather than replace it

**Status:** `accepted` · **Area:** architecture

**What's live.** About 30 --ia-theme-* custom properties are declared, backed by --default-* fallbacks inside each component. The architecture — a consumer-facing override layer in front of component defaults — is sound. It is just incomplete, and a lot of CSS ignores it and hard-codes values instead.

**The conflict.** A new design system could introduce its own naming and leave --ia-theme-* stranded, which would mean every component needs rewriting before anything improves.

**The decision.** Introduce --ia-* as the full token set, and ship a compatibility block that maps every existing --ia-theme-* name onto it. Existing components pick up the new values with no code change; --ia-theme-* names are removed one at a time as consumers migrate.

**Why.** It makes the first commit useful instead of the fiftieth. It also means the guide can be adopted incrementally by team, rather than requiring a coordinated cutover.

**Blast radius.** None on day one — the compatibility block is additive. Color values change (see D-07 to D-11), so components reading --ia-theme-link-color will visibly change.

*See:* `tokens/tokens.css`

---

<a id="d-37"></a>

### D-37 · Keep 1rem = 10px

**Status:** `accepted` · **Area:** architecture

**What's live.** offshoot sets html { font-size: 10px } (public/offshoot_assets/index.css), so 1rem = 10px site-wide, at a fixed size that ignores the reader's browser font-size setting. <body> is also 10px, so nothing inherits a usable size and every component sets its own.

**The conflict.** A 10px root makes rem readable, but a fixed pixel root overrides the reader's font-size preference, and a 62.5% root is sometimes argued against as less predictable than a 100% base.

**The decision.** Keep 1rem = 10px, written as html { font-size: 62.5% }. Every token in this guide is expressed in rem against that base.

**Why.** It is universal on the site and makes rem values readable (1.4rem = 14px). Written as 62.5% rather than 10px, it is the same at the default setting and still scales with the reader's browser font-size setting. Changing the base would mean rewriting every length on the site for no user-visible benefit. <body> takes the body role, so unstyled text inherits something sane.

**Blast radius.** offshoot's root changes from 10px to 62.5%: identical at the default setting, larger for readers who set a larger default. <body> already takes the body role, which also fixes the 13.333px unstyled-button text.

*See:* [`foundations/typography.md#the-rem-basis`](foundations/typography.md#the-rem-basis)


## Typography

<a id="d-02"></a>

### D-02 · One font stack: "Helvetica Neue", Helvetica, Arial, "Noto Sans", sans-serif

**Status:** `accepted` · **Area:** typography

**What's live.** Two stacks ship: `"Helvetica Neue", Helvetica, Arial, sans-serif` (the legacy CSS, and --ia-theme-base-font-family) and `"Helvetica Neue", ui-sans-serif, system-ui, sans-serif` (newer components). Bare `Arial` and `sans-serif` show where text was never styled.

**The conflict.** On a Mac both resolve to Helvetica Neue and the difference is invisible. On Android or Linux the first falls back to Arial/Liberation Sans and the second to Roboto or the system UI face — so the topnav and the search results beneath it render in different typefaces.

**The decision.** Standardize on the legacy stack, which is already declared as --ia-theme-base-font-family, with "Noto Sans" added ahead of the generic family for the scripts Arial lacks. Retire the ui-sans-serif / system-ui variant.

**Why.** Consistency across platforms beats a marginally nicer default on Linux. The legacy stack is already the declared theme token, so it is also the smaller change.

**Blast radius.** Search, collection and profile pages change typeface on non-Mac platforms. No change on macOS or iOS.

*See:* [`foundations/typography.md#one-font-stack`](foundations/typography.md#one-font-stack)

---

<a id="d-03"></a>

### D-03 · Two font weights: 400 and 700. Retire 200, 300, 500 and 600

**Status:** `accepted` · **Area:** typography

**What's live.** Six weights in use: 200, 300, 400, 500, 600 and 700. Display text is often thin — offshoot sets the profile name at 3.6rem/200 and metadata values at 200 — and its item title is 3rem/500.

**The conflict.** There is no rule for what a weight means, and the thin weights are used at display sizes where they carry the most visual identity.

**The decision.** 400 and 700 only. 400: body, button and chip labels, segmented options, the display title. 700: headings, page titles, tile titles, field labels, body-strong. Page titles move to 400 (display) or 700 (page-title).

**Why.** Helvetica Neue Thin and Light are not installed on most Android and Linux machines, so those 35px/200 titles already render at 400 for a large share of visitors — the design intent does not survive the fallback. The same is true of 500: without Helvetica Neue the stack falls to Arial or Liberation Sans, which have no medium face, so on Windows and most Linux desktops every 500 renders as 400 and a tile title can no longer be told from its creator line. Keeping only the weights every fallback has means the site looks the same whoever is looking.

**Blast radius.** On macOS the collection landing title, profile name and mission statement get heavier, the item title and button labels get lighter, and tile titles and field labels get bolder. On Windows and Linux tile titles and field labels get bolder; everything else already rendered at 400.

*See:* [`foundations/typography.md#two-weights`](foundations/typography.md#two-weights)

---

<a id="d-04"></a>

### D-04 · Body line-height is 1.45

**Status:** `accepted` · **Area:** typography

**What's live.** Two body line-heights at the same 14px size, both on the same search page: 14/20 (1.43) in the legacy chrome and 14/17 (1.21) in collection-browser.

**The conflict.** Text of the same size and role sits on two different rhythms depending on which stack rendered it.

**The decision.** Three line heights: 1.45 for body copy; 1.25 (`tight`) for headings, dense UI — tile titles, facet labels, table cells — and control labels; 1.6 for long-form prose.

**Why.** 1.45 matches the larger of the two live values and reads better at 14px; 1.21 is tight for running text. The dense contexts that wanted 1.21 get 1.25, which keeps descenders; headings share it, since 1.2 and 1.25 are indistinguishable at any size on the scale.

**Blast radius.** collection-browser text blocks get about 3px more leading per line. Result grids grow slightly taller.

*See:* [`foundations/typography.md#line-heights`](foundations/typography.md#line-heights)

---

<a id="d-05"></a>

### D-05 · Heading level is document structure; heading appearance is a class

**Status:** `accepted` · **Area:** typography

**What's live.** Heading tags are chosen for their look. Petabox's legacy item page, /details/goody, renders 32 <h1> elements, 27 of them view and favorite counts; offshoot's details page, which replaces it, has three.

**The conflict.** Heading tags are being chosen for how they look, so the document outline is meaningless and a screen reader's heading navigation is unusable on the most important page type on the site.

**The decision.** Ten named type roles (`display`, `page-title`, `section`, `subsection`, `overline`, `body`, `body-strong`, `prose`, `meta`, `caption`). The tag comes from the outline; the role class comes from the design. One <h1> per page. The classes are the API: each writes the size, weight and line-height steps directly, with no per-role tokens.

**Why.** This is the single change that fixes the most accessibility surface for the least code. It also removes the pressure that created six different <h1>s — a designer who wants big text no longer has to reach for a heading tag.

**Blast radius.** Markup changes on every page. Offshoot's details page goes from three <h1>s to one; petabox's legacy item page needs the most work, but it is being replaced.

*See:* [`foundations/typography.md#type-roles`](foundations/typography.md#type-roles) · [`foundations/accessibility.md#headings`](foundations/accessibility.md#headings)

---

<a id="d-06"></a>

### D-06 · Eight-step type scale

**Status:** `accepted` · **Area:** typography

**What's live.** No scale: sizes run from 8px to 36px with near-duplicates — 12/13, 20/21/22, 35/36 — and 13.333px, the browser's default button size, wherever text was never styled.

**The conflict.** No scale, so every new component invents a size, and near-duplicates (20/21/22, 35/36, 12/13) accumulate.

**The decision.** 1.1 / 1.2 / 1.4 / 1.6 / 2.0 / 2.4 / 2.8 / 3.6 rem. The two anchors already exist as tokens: 1.4rem is --ia-theme-font-size-standard and 3.6rem is --ia-theme-font-size-lg.

**Why.** Building outward from the two declared tokens means the body size — by far the most-used value on the site — does not move at all. Nothing below 1.1rem: the 8px and 9px item-page stats are too small to read and are not preserved.

**Blast radius.** Small shifts almost everywhere; the largest single change is 9px stats moving to 11px.

*See:* [`foundations/typography.md#the-scale`](foundations/typography.md#the-scale)

---

<a id="d-34"></a>

### D-34 · Tile titles move from a 1.07 line-height to 1.25

**Status:** `accepted` · **Area:** typography

> **Superseded in part by** [D-58 · Browse pages follow offshoot's collection-browser](#d-58): titles clamp at three lines (four on saved-search tiles), not two.

**What's live.** Result and collection tile titles are 14px with a 15px line-height — a ratio of 1.07.

**The conflict.** Descenders clip on wrapped two-line titles, and it fails WCAG 1.4.12 text spacing.

**The decision.** The `tight` line-height, 1.25.

**Why.** Costs 2.5px per line at 14px. Titles clamp at three lines (four on saved-search tiles), so a tile grows by 7.5–10px at most.

**Blast radius.** Result grids get slightly taller. Very visible in aggregate, trivial per tile.

*See:* [`components/item-tile.md#grid-tile`](components/item-tile.md#grid-tile)

---

<a id="d-36"></a>

### D-36 · The display and page-title roles step down below 890px

**Status:** `accepted` · **Area:** typography

**What's live.** Petabox's legacy item title renders at 36px/500 at both 1280px and 375px, with no responsive step; offshoot's is 3rem/500 at a 1.1 line-height.

**The conflict.** 36px on a 375px screen consumes roughly a third of the first viewport for a title the user already knows they clicked.

**The decision.** The `display` role is 3.6rem above lg and 2.8rem below it. `page-title` steps 2.8 → 2.4 the same way.

**Why.** Only the two largest roles step; body text is the same size at every width.

**Blast radius.** Item, collection and profile page titles on mobile. On desktop offshoot's 30px item title grows to the display role's 36px.

*See:* [`foundations/typography.md#responsive-behavior`](foundations/typography.md#responsive-behavior)


## Color

<a id="d-07"></a>

### D-07 · Darken the link color from #4b64ff to #3a4fd6

**Status:** `accepted` · **Area:** color

**What's live.** --ia-theme-link-color: #4b64ff. Measured: 4.60:1 on white, 4.45:1 on the #fbfbfd page background, 4.08:1 on the #f1f1f4 sunken surface, 3.46:1 on the #222 topnav.

**The conflict.** The link color passes AA only on pure white, which is not the background of most of the site. On the page background and the sunken surface it fails 1.4.3, and on the topnav it fails badly.

**The decision.** #3a4fd6 on light surfaces (6.42 / 6.22 / 5.70) and #9aa8ff on dark ones — the topnav and the item page's #000 theater (7.14:1 on #222, 9.42:1 on #000) — where links hover to white. Same hue in both cases; only lightness changes. .ia-inverse re-points both.

**Why.** Links are the primary interaction on a library catalog. A link color that only passes on one of three surfaces is the highest-traffic accessibility defect on the site. Darkening within the same hue keeps it recognizably the same blue.

**Blast radius.** Every link on the site changes color. Highly visible; also the single largest accessibility win available.

*See:* [`foundations/color.md#links`](foundations/color.md#links)

---

<a id="d-08"></a>

### D-08 · #999 and #888 are banned as text; #666 is the lightest text color

**Status:** `accepted` · **Area:** color

**What's live.** #999 (--grey60) and #888 are used as text, including item-page metadata. On white they are 2.85:1 and 3.54:1.

**The conflict.** Both fail WCAG 1.4.3 AA as body text by a wide margin.

**The decision.** #666 (--grey40) is the lightest permitted text color on any light surface — it clears 4.5:1 even on the sunken #f1f1f4 surface at 5.09:1. #999 and #888 are demoted to borders and disabled states.

**Why.** #666 is already the declared --ia-theme-secondary-text-color, so this is enforcing a token the site already has rather than introducing a new one. #757575 would also pass on white but fails on the sunken surface, so #666 is the honest floor.

**Blast radius.** Item metadata and various secondary labels get darker. No layout change.

*See:* [`foundations/color.md#text`](foundations/color.md#text)

---

<a id="d-09"></a>

### D-09 · Consolidate three reds onto #e51c23 (fill) and #b8161c (ink and border)

**Status:** `accepted` · **Area:** color

**What's live.** Three near-identical reds: --ia-theme-danger-cta-fill #d9534f, --ia-theme-danger-cta-border #d43f3a, and --classic-red #e51c23. (The donate heart is a separate, hard-coded #f00.) White on #d9534f is 3.96:1.

**The conflict.** The danger button's label fails contrast, and three reds exist where one would do.

**The decision.** Danger fill is #e51c23 — already in the palette as --classic-red, 4.64:1 with white. Danger ink (error text) and the button border are #b8161c, 6.63:1 on white. #d9534f and #d43f3a retire.

**Why.** Fixes the contrast failure and removes two colors in the same move. #e51c23 as text is 4.49:1 on the page background — one hundredth short of AA — which is why error text gets the darker #b8161c rather than reusing the fill.

**Blast radius.** Danger buttons and error text shift slightly redder and darker respectively.

*See:* [`foundations/color.md#actions`](foundations/color.md#actions)

---

<a id="d-10"></a>

### D-10 · Darken success from #31a481 to #20705a

**Status:** `accepted` · **Area:** color

**What's live.** --ia-theme-color-success / --mint-green #31a481. White on it is 3.11:1; as text on the page background it is 4.37:1.

**The conflict.** Fails as a fill with a white label and fails as text on the page background.

**The decision.** #20705a. White on it is 5.95:1; as text it is 5.28:1 even on the sunken surface. One value serves as both fill and ink.

**Why.** A single darker green covers both uses, which is one fewer token than splitting it. #31a481 stays in the palette for reference but is not a text or fill color.

**Blast radius.** Success states darken. Low traffic — success messaging is sparse on the site today.

*See:* [`foundations/color.md#status`](foundations/color.md#status)

---

<a id="d-11"></a>

### D-11 · Warning is a bright #ffb000 with a dark label and a #cc7a00 edge

**Status:** `accepted` · **Area:** color

**What's live.** --ia-theme-warning-cta-fill #ee8950 with a white label (2.52:1) and a #ec7939 border (2.76:1 against the page). The fill itself is 2.44:1 against the page. No measured page draws a warning button; it appears only in ia-button's and ia-styles' demos.

**The conflict.** The white label fails badly. And because the fill barely differs from the page background, the button's own boundary fails 1.4.11 too — so the border has to carry it, and the current border does not.

**The decision.** Fill #ffb000, label #2c2c2c (7.62:1), edge #cc7a00 (3.20:1 against the page). The warning ink for text and icons is #a85216.

**Why.** #ee8950 is a muted salmon that reads poorly beside the danger red and the donate green, and with no live warning button there is no recognizable color to keep. Darkening an orange enough for white text turns it brown, so the label goes dark and the orange goes bright. The edge is not cosmetic: at 1.77:1 the fill alone doesn't show where the button is, and #cc7a00 is the lightest orange that does.

**Blast radius.** Warning buttons change from white-on-salmon to dark-on-bright-orange. Nothing measured draws one today.

*See:* [`foundations/color.md#actions`](foundations/color.md#actions)

---

<a id="d-35"></a>

### D-35 · Do not style :visited

**Status:** `accepted` · **Area:** color

**What's live.** No :visited styling is applied today.

**The conflict.** None — this is codifying the status quo before someone adds it.

**The decision.** Links do not get a visited color.

**Why.** archive.org pages are frequently revisited deliberately — a researcher returning to the same item is the normal case, not a wrong turn. A visited color would add a second blue to reason about, and would need its own contrast budget on three surfaces.

**Blast radius.** None.

*See:* [`components/link.md#states`](components/link.md#states)

---

<a id="d-43"></a>

### D-43 · Media-type colors become tokens; six are darkened to 3:1

**Status:** `accepted` · **Area:** color

**What's live.** tile-mediatype-icon colors each item tile's media-type glyph from its own map: texts #faab3c, movies/video/tv #f1644b, audio/etree #00adef, software #9ecc4f, image #aa99c9, web #ffcd27, data #333333, collection #4666ff, radio #8fdaef, film #bf1b2c. The topnav's media menu uses the same hues for its selected states. On the tile's white card, web is 1.50:1, radio 1.56:1, software 1.87:1, texts 1.92:1, audio 2.55:1 and image 2.59:1.

**The conflict.** The glyph's shape is what tells a text from a film at a glance, so it needs 3:1 against the card (WCAG 1.4.11). Half the palette cannot be seen well enough on white to read the shape.

**The decision.** `--ia-color-mediatype-*`, one token per type and one value everywhere: tiles, list and compact rows, the record's type glyph, and the topnav's open media item, which sits on #333. Keep every live hue; darken the six that fall below 3:1 on white just far enough to reach it — texts #c5872f, audio #009fdc, software #7b9f3e, image #9c8db9, web #b28f1b, radio #679dac. The four that pass keep their live values.

**Why.** The color coding is a real convention — it matches the topnav, and it makes a mixed grid scannable — so dropping it would lose information. Darkening along the same hue keeps each type recognizable as itself while making the glyph legible.

**Blast radius.** Every item tile's first stat glyph, and anywhere else a media type is color-coded. Yellow and light-blue types change most visibly: web goes from bright yellow to mustard.

*See:* [`components/item-tile.md#footer`](components/item-tile.md#footer) · [`foundations/iconography.md`](foundations/iconography.md)

---

<a id="d-45"></a>

### D-45 · One selected look, in two token tiers: strong and soft

**Status:** `accepted` · **Area:** color

> **Superseded in part by** [D-58 · Browse pages follow offshoot's collection-browser](#d-58): applied-filter chips are gone, so the strong tier marks a chosen filter chip or letter.

**What's live.** Each component picks its own surface for 'this one is chosen': chips, pagination and checkboxes a solid #194880 fill; the dropdown's selected option white at 30% over the dark panel; the sort bar's chosen view nothing but a darker glyph.

**The conflict.** Three components answer the same question three ways, and every new component would pick its own surface for it. A reader can't tell that a tinted option and a filled chip mean the same thing.

**The decision.** `--ia-color-selected-strong-*` (navy fill, white text) where the state is the content — the current page, a chosen filter chip or letter, a checked box, the active tab's bar. `--ia-color-selected-soft-*` (navy at 10% into white, a navy edge, navy text) where one option is chosen among neutral controls — the view switch, a segmented control, a dropdown or menu option, a stacked action's pressed state. A segmented control keeps its chosen label and glyph in ink, `--ia-color-text-primary`. Inside `.ia-inverse` the soft tier re-points to `--ia-color-selected-soft-fill-inverse` (`#666`), the dropdown's existing value.

**Why.** Two tiers are enough to cover every case the specs have, and naming them forces the choice between them instead of a choice among surfaces. The strong tier is today's primary fill, so chips, pagination and checkboxes look the same. Soft text is 7.82:1 on its fill.

**Blast radius.** The view switch changes from a sunken fill to a navy tint. Everything else keeps its current look and gains a token.

*See:* [`foundations/color.md#selected`](foundations/color.md#selected) · [`components/segmented-control.md`](components/segmented-control.md)

---

<a id="d-46"></a>

### D-46 · Hover is a translucent overlay, not a surface

**Status:** `accepted` · **Area:** color

**What's live.** Hover is whatever background each component chose: #f1f1f4 on light rows, #333 in the topnav, white at 30% in the dropdown.

**The conflict.** The obvious hover for a light row — painting --ia-color-surface-sunken — is invisible on a surface that is itself sunken: the change is 1.00:1. An opaque hover has to be chosen per surface, and gets chosen wrong.

**The decision.** `--ia-color-hover-overlay`, black at 6%, applied as a background layer over the element's own fill. Inside `.ia-inverse` and dark panels it re-points to white at 12%. Light-surface rows, ghost controls, chips, pagination and dropdown triggers use it; the topnav keeps live's `#333`.

**Why.** A translucent layer darkens whatever it sits on, so one token works on white, on sunken and on dark chrome. It is how the live dropdown already marks its options.

**Blast radius.** Hover shades only, on light surfaces. On white the difference from the old sunken hover is imperceptible; on sunken surfaces hover becomes visible.

*See:* [`foundations/color.md#hover`](foundations/color.md#hover)

---

<a id="d-53"></a>

### D-53 · Donating is green; the heart stays red

**Status:** `accepted` · **Area:** color

**What's live.** The donate heart is a hard-coded #f00 in the topnav (3.98:1 on #222), its own red, apart from the danger reds D-09 settles. There is no donate button style: donation actions borrow whichever intent is nearest.

**The conflict.** A red Donate button would read like a Delete button, and a donation action has no color of its own.

**The decision.** The heart keeps live's #f00 as --ia-color-brand-donate — it is the recognizable mark. Every other donation element is green: an ia-button--donate intent with --ia-color-action-donate-fill #20705a, a matching border and a white label (5.95:1; 5.76:1 against the page). Inside a donate button the heart takes the label's color.

**Why.** The heart is brand and stays as it is; the action needs a color that means give, not destroy. #20705a is the one green in the palette that carries white text — live's mint #31a481 is 3.11:1 with white.

**Blast radius.** Donate buttons and donation actions. The subnav heart is unchanged.

*See:* [`foundations/color.md#brand`](foundations/color.md#brand) · [`components/button.md#intents`](components/button.md#intents)

---

<a id="d-56"></a>

### D-56 · Palette names are ordinal: 50 lightest, 900 darkest

**Status:** `accepted` · **Area:** color

**What's live.** The live grays are named by lightness percentage (--grey13, --grey40) or by description (--dark-gray, --off-white).

**The conflict.** Neither live scheme says where a value sits: --dark-gray and --off-white give no order, and names derived from hex bytes sort out of lightness order, so a gray named for #6f6f6f lands beside the one for #999 though it is far darker.

**The decision.** gray-50 #fbfbfd, 100 #f1f1f4, 200 #ddd, 300 #ccc, 400 #aaa, 500 #999, 600 #666, 700 #474747, 800 #333, 850 #2c2c2c, 900 #222; navy-50/100/300/700; blue-300/600; red-400/500/700; orange-300/600/700; green-700. White, black and the Wayback cream are named, not numbered. Legacy values follow the same scheme. Each token keeps its live name in tokens.json.

**Why.** An ordinal name says where a value sits, so a reader can choose between two grays without looking them up. Product code never uses palette names, so nothing outside tokens.json changes.

**Blast radius.** tokens.json and the generated tokens.css. No role changes value.

*See:* [`foundations/color.md#the-rule`](foundations/color.md#the-rule)


## Layout

<a id="d-12"></a>

### D-12 · Three container widths: 1350 / 1000 / 600. Retire 1170px

**Status:** `accepted` · **Area:** layout

> **Superseded in part by** [D-60 · Profile, account settings and login follow offshoot](#d-60): account settings takes a page-specific 700px width, because a preference row needs three columns.

**What's live.** Petabox's item page uses Bootstrap 3's 1170px .container-ia, and offshoot's details page keeps 1170px (--pageMaxWidth--); search, collection and profile are 1350px (--app-page-max-width). Signup forms were 600 and 570px.

**The conflict.** The item-details page is 1170px wide while search, collection and profile are 1350px, so moving between them shifts the whole layout. Signup uses 600 and 570 on the same page.

**The decision.** --ia-container-page 1350px (already a token), --ia-container-prose 1000px for anything read as continuous text, --ia-container-form 600px for forms. 1170 and 570 retire: the guide puts the item page on 1350px, so offshoot's details page widens. Account settings is the one page-specific width, 700px, because a preference row needs three columns.

**Why.** 1350 is already the declared page width for three of the six pages. 1000 exists because a 1350px line of 14px text is about 190 characters — roughly triple a comfortable reading measure.

**Blast radius.** Real work: both item pages are 1170px — petabox's Bootstrap 3 markup and offshoot's details page — and widening to 1350 means reworking their grids. This is the largest single implementation cost in the guide.

*See:* [`foundations/layout.md#containers`](foundations/layout.md#containers)

---

<a id="d-15"></a>

### D-15 · Four breakpoints: 480 / 768 / 890 / 1200 — and 890 stays

**Status:** `accepted` · **Area:** layout

**What's live.** Media queries hit about thirty pixel breakpoints, with near-duplicates that disagree at one pixel: 767/768/769, 880/889/890, 990/991/992, 1199/1200/1201.

**The conflict.** Layouts break in one-pixel windows, and nobody can say what the site's breakpoints are.

**The decision.** sm 480, md 768, lg 890, xl 1200. A query is written at a breakpoint, `min-width: <bp>`, or just below it, `max-width: <bp − 1px>` (767, 889, 479), as offshoot does — never a near-duplicate. The result grid's 880px and 360px column steps are collection-browser's own and stay with the grid (D-39). 890 is kept despite being an unusual number.

**Why.** 890 is the dominant live breakpoint, and it is where ia-topnav swaps between its mobile and desktop layouts.

**Blast radius.** Retiring the near-duplicates requires touching a lot of CSS, but each change is mechanical.

*See:* [`foundations/layout.md#breakpoints`](foundations/layout.md#breakpoints)

---

<a id="d-16"></a>

### D-16 · Named z-index scale in steps of 100

**Status:** `accepted` · **Area:** layout

> **Superseded in part by** [D-50 · Layers inside a component use isolation and local ordinals; no z-index 0 token](#d-50): the base 0 layer is gone, and a component orders its own layers with isolation and local ordinals.

**What's live.** z-index values of 1, 2, 3, 4, 5, 6, 10, 101, and one third-party widget at 2000000000.

**The conflict.** Layers are assigned locally, so conflicts get resolved by incrementing — which is how you end up at 101.

**The decision.** Page chrome: raised 10, sticky 100, dropdown 200, header 300, overlay 400, modal 500, toast 600, tooltip 700. Layers inside a component use isolation and --ia-z-index-local-1 to -5 (D-50). Nothing in product code sets a raw z-index.

**Why.** Gaps of 100 leave room to slot a layer in without renumbering. Naming the layers also forces the question of which layer something belongs to, which is usually the real bug.

**Blast radius.** Mechanical. Worth doing alongside the modal and dropdown work.

*See:* [`foundations/layout.md#layering`](foundations/layout.md#layering)

---

<a id="d-22"></a>

### D-22 · 5px spacing base, with comfortable and compact densities

**Status:** `accepted` · **Area:** layout

**What's live.** Padding already clusters on multiples of five — `5px`, `0 5px`, `5px 10px`, `0 15px`, `0 30px` — with exceptions at 3, 6, 7 and 2.5px.

**The conflict.** The scale exists but was never written down, so odd values creep in around the edges.

**The decision.** 0.5 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 rem (5–80px). Two densities: comfortable for prose, forms and record pages; compact for facet panels, result grids and metadata tables.

**Why.** Adopting the scale already in use means most of the site already complies. Two densities are needed because a results grid of fifty items and a four-field signup form genuinely should not share a padding value.

**Blast radius.** Small and mechanical.

*See:* [`foundations/spacing.md`](foundations/spacing.md)

---

<a id="d-25"></a>

### D-25 · The document never scrolls horizontally

**Status:** `accepted` · **Area:** layout

**What's live.** At 375px the homepage's "New to the Archive?" carousel (offshoot's basic-carousel, a fixed 1.75 tiles of 240px plus its arrows) pushes the document wider than the viewport.

**The conflict.** The whole page scrolls sideways on a phone, which also breaks WCAG 1.4.10 reflow.

**The decision.** Every scrolling track sits inside a wrapper bounded to the container width, with overflow-x on the wrapper. The document's scrollWidth must equal its clientWidth at 375px.

**Why.** A scrolling region is a legitimate pattern; a scrolling document is not. The fix is structural and prevents recurrence.

**Blast radius.** Homepage carousels. The search and profile tab strips already do this correctly and are the model.

*See:* [`patterns/responsive.md#horizontal-overflow`](patterns/responsive.md#horizontal-overflow)

---

<a id="d-39"></a>

### D-39 · The result grid uses auto-fill, not counted columns

**Status:** `accepted` · **Area:** layout

**What's live.** collection-browser's grid floors are 17rem, 15rem at 880px and below, and 12rem at 360px and below, with a 1.7rem gap and no width cap beyond the 1350px page; it loads 50 results a page.

**The conflict.** None — this is codifying an existing good decision so that new grids follow it.

**The decision.** repeat(auto-fill, minmax(17rem, 1fr)); 15rem at 880px and below; 12rem at 360px and below. Gap --ia-space-4. No cap: the grid fills the results column. 50 results a page. Column counts in the docs are indicative, not prescriptive.

**Why.** Auto-fill degrades correctly at every width, including the ones nobody tested, and it survives the facet rail appearing and disappearing. The floors are collection-browser's own, so the spec and the live grid lay out the same columns; the gap stays on the spacing scale.

**Blast radius.** None against live: the floors and gap are collection-browser's own.

*See:* [`foundations/layout.md#grid`](foundations/layout.md#grid) · [`components/item-tile.md#grid`](components/item-tile.md#grid)

---

<a id="d-48"></a>

### D-48 · Specs name a step on the 5px scale; one responsive page token

**Status:** `accepted` · **Area:** layout

**What's live.** The 5px scale, and a page-rhythm list in prose.

**The conflict.** A spec that names a pixel step rather than a relationship drifts from the next spec describing the same thing: the gap between a label and its field can be written as 5px in one place and 10px in another, and both look reasonable.

**The decision.** Specs write the step: `--ia-space-1` (5px) through `--ia-space-16` (80px). The named spacing tokens are `--ia-space-page-block`, 80px, which halves below md by itself, and the container gutters, `--ia-container-gutter` and `--ia-container-gutter-narrow`. No inline/stack/inset aliases, and no `--ia-space-0`: zero space is written `0`. Label to control is `--ia-space-1`, 5px.

**Why.** Aliases that rename a step under three axes (inline, stack and inset xs were all 5px) tripled the vocabulary for no distinction. The scale already forces the choice between distinct values; the page block earns a name because it changes at the breakpoint, and the gutters because every container shares them.

**Blast radius.** Token names only. No visible change: every use moves to the step it already resolved to.

*See:* [`foundations/spacing.md#page-block`](foundations/spacing.md#page-block)

---

<a id="d-50"></a>

### D-50 · Layers inside a component use isolation and local ordinals; no z-index 0 token

**Status:** `accepted` · **Area:** layout

> **Supersedes part of** [D-16 · Named z-index scale in steps of 100](#d-16): the base 0 layer is gone, and a component orders its own layers with isolation and local ordinals.

**What's live.** The tile's info button sets a raw z-index: 1.

**The conflict.** D-16's bands are for page chrome, but a component that layers its own parts has nowhere to go, so it writes a raw number. A shadow root is not a stacking context, so that number competes with the whole page. D-16 also names `base: 0`, which orders nothing: z-index 0 paints the same as auto.

**The decision.** A component that layers its parts sets `isolation: isolate` on its root and orders them with `--ia-z-index-local-1` to `-5`. The page bands stay for page chrome. `--ia-z-index-base` is removed. verify.mjs fails any stylesheet that sets a raw z-index.

**Why.** Isolation keeps a component's layers inside it, so its ordinals can't collide with anything outside. The explicit way to create a stacking context is isolation, not z-index 0.

**Blast radius.** Mechanical. One raw value in ia.css.

*See:* [`foundations/layout.md#layering`](foundations/layout.md#layering)


## Shape and depth

<a id="d-13"></a>

### D-13 · Five border radii

**Status:** `accepted` · **Area:** shape

**What's live.** No radius scale: values from 2px to 60px, including a 3.25px rounding artifact, and mixed corner sets. Both tile types use 4px on the card and `4px 4px 0 0` on the thumbnail well.

**The conflict.** Sibling components in the same view have different corner treatments for no reason.

**The decision.** 0.2rem (small objects — checkboxes, tags), 0.4rem (the default — already --ia-theme-button-border-radius and by far the most common live value), 0.8rem (media imagery and large panels: the hero, the segmented track, the search suggestions), pill, circle. A flush edge is written `0`, not a token. No job-named radius tokens: most jobs share 4px, so a role per job would add names without distinguishing anything. Mixed corner sets are built from these, not from new numbers.

**Why.** 4px is already dominant and is what both tile cards actually use, so most of the site already complies. 8px is live on collection thumbnails' images, so it is kept for media imagery and the larger panels.

**Blast radius.** Small. Tiles do not change: they are already 4px. The 'Search this collection' pill goes with the collection search, which becomes a search bar (D-30).

*See:* [`foundations/radius.md`](foundations/radius.md)

---

<a id="d-14"></a>

### D-14 · Four translucent shadows, named by job; retire the opaque offset shadows

**Status:** `accepted` · **Area:** shape

**What's live.** Shadows are unrelated, and the commonest is opaque and offset: `rgb(44,44,44) 1px 1px 2px`, on the collection tile.

**The conflict.** An opaque offset shadow reads as a border drawn on two sides, not as depth. There is no scale, so hover states have nowhere to go.

**The decision.** raised `0 1px 2px rgba(0,0,0,.15)` (close to the topnav's live shadow), hover `0 2px 6px rgba(0,0,0,.15)`, overlay `0 4px 16px rgba(0,0,0,.18)`, and floating `0 1px 4px rgba(0,0,0,.35)` for controls that sit over media. All straight down, no horizontal offset. No size-named scale, no inset shadow.

**Why.** A light source that moves between components is what makes an interface feel assembled rather than designed. Naming each shadow for its job means a component picks by what it is, not by how big a shadow looks right, and there is one name per value. Keeping the topnav's existing value as `raised` means the most visible use of elevation does not change.

**Blast radius.** Homepage and collection tiles lose their hard gray offset. Noticeable but small.

*See:* [`foundations/elevation.md`](foundations/elevation.md)

---

<a id="d-30"></a>

### D-30 · The pill radius is for search fields, chips and badges — never a button

**Status:** `accepted` · **Area:** shape

**What's live.** 20px radius appears on the collection search field, the Wayback search field, and the 'Search this collection' button.

**The conflict.** The same shape means two different things — a field in two places, a button in a third.

**The decision.** --ia-radius-pill is for search fields, chips, badges and the switch track. Every other control uses --ia-radius-default, and no button is a pill.

**Why.** The pill is a widely recognized search affordance and is worth keeping where it does that job. Using it on a button dilutes the signal.

**Blast radius.** One button: 'Search this collection' goes with the collection search, which becomes a search bar (search-bar.md).

*See:* [`foundations/radius.md`](foundations/radius.md) · [`components/search-bar.md`](components/search-bar.md)


## Accessibility

<a id="d-17"></a>

### D-17 · 44×44 pointer targets on touch, 24×24 everywhere

**Status:** `accepted` · **Area:** accessibility

**What's live.** At 375px every page has targets under 44px: facet checkboxes 15×15 in 24px rows, radios and signup checkboxes 13×13, the item page's 'Search inside' and 'Fullscreen view' 15×12, tile info buttons 24×24, Share and RSS 25×25.

**The conflict.** WCAG 2.2 AA (2.5.8) requires 24×24. Much of the site fails even that, and on a phone — where the pointer is a thumb — 24 is not enough either.

**The decision.** Two floors. Wherever the pointer is coarse, the minimum hit area is 44×44; everywhere else it is 24×24. Dense desktop UI may render a 30px control on a mouse provided it expands to 44 under `@media (pointer: coarse)`. The visual box may always be smaller than the hit area. Links inside running text are exempt.

**Why.** A single 44px rule everywhere is simpler to state but it is not what the token scale can deliver — `--ia-size-control-sm` is 30px and exists because facet panels and toolbars genuinely need it. Splitting by pointer capability rather than by screen width is also more accurate: a touch laptop is wide and coarse, and a phone in landscape is not narrow.

**Blast radius.** Facet rows go from roughly 24px to 44px on touch, which makes a seventy-item facet list much taller on a phone. That is what the 'Show N more' truncation and the independently scrolling rail are for. On desktop the rows can stay compact.

*See:* [`foundations/accessibility.md#touch-targets`](foundations/accessibility.md#touch-targets)

---

<a id="d-19"></a>

### D-19 · One universal :focus-visible ring; delete every outline: none

**Status:** `accepted` · **Area:** accessibility

**What's live.** Measured by pressing Tab and reading the computed outline: half the keyboard stops on the desktop pages have no visible focus indicator — the entire media menu, the login and upload controls, and the search input among them. Where an indicator survives it is the browser default at nine different width/offset combinations.

**The conflict.** Site-wide WCAG 2.4.7 failure, caused by blanket rules like `button:focus, input:focus { outline: none }` and `a:hover, a:active, a:focus { outline: none }`.

**The decision.** `:focus-visible { outline: 2px solid var(--ia-color-border-focus); outline-offset: 2px }` on every focusable element, including inside every shadow root. Where a container clips or wraps the control — facet rows, choices, the search field, menu items — the ring is inset (a negative offset) instead. `outline: none` is acceptable only when the same declaration block provides an equally visible replacement.

**Why.** This is the largest accessibility defect found, it affects every page, and it is close to a pure win — :focus-visible means mouse users never see the ring, which is the reason the outlines were removed in the first place.

**Blast radius.** Touches every component that currently suppresses outlines, and because most of them live in shadow roots the rule has to be added to each component's own stylesheet rather than inherited.

*See:* [`foundations/accessibility.md#focus-the-biggest-problem-on-the-site`](foundations/accessibility.md#focus-the-biggest-problem-on-the-site)

---

<a id="d-21"></a>

### D-21 · Inputs render at 16px below the md breakpoint

**Status:** `accepted` · **Area:** accessibility

**What's live.** Input font sizes on a phone range from 12px (date filters) to 17px (collection search). The signup form already renders at 16px.

**The conflict.** iOS Safari zooms the viewport whenever a focused input's text is under 16px, and the user has to pinch back out.

**The decision.** Every input, textarea and select renders at 16px below md (under 768px), regardless of its type role.

**Why.** It is a one-line media query that removes a recurring and quite annoying mobile failure. The signup form already does it; this makes it a rule.

**Blast radius.** Mobile-only, and only for inputs.

*See:* [`components/input.md`](components/input.md) · [`patterns/responsive.md#inputs-zoom-ios`](patterns/responsive.md#inputs-zoom-ios)

---

<a id="d-28"></a>

### D-28 · The search page's media-type strip is presented as tabs

**Status:** `accepted` · **Area:** accessibility

**What's live.** 'All / Books/Documents / Text Contents / Radio / TV / Video / Audio / Software / Images / Live Music / Collections / Data / Web Sites' is a role=tablist of 13 tabs in tab-manager, with the same treatment as the collection page's Collection/Forum/About tabs. Choosing a tab re-runs the search with that search type. The same 13 choices are also the search bar's search-type dropdown.

**The conflict.** The strip usually works as a filter: choosing a tab re-runs the search rather than revealing a panel that is already on the page. It is still presented, and announced, as tabs.

**The decision.** Keep it a tablist, as live. Make the relationship real: the results region is the single tabpanel, labeled by the selected tab, and each tab's aria-controls points at it. Activate manually — arrow keys move focus, Enter or Space selects — because selecting runs a search. Announce the new result count in a polite live region, keep focus on the tab, and keep the strip and the search bar's dropdown in sync: they are two controls for one setting.

**Why.** Reviewed: the strip is presented as tabs, as it is today. The measures above make a filter-shaped tablist behave predictably for keyboard and screen-reader users.

**Blast radius.** Markup, ARIA and keyboard handling on the search page. No visual change from live.

*See:* [`components/tabs.md#semantics`](components/tabs.md#semantics)

---

<a id="d-29"></a>

### D-29 · Facet groups get fieldset/legend, and 'Show More' names its group

**Status:** `accepted` · **Area:** accessibility

> **Superseded in part by** [D-58 · Browse pages follow offshoot's collection-browser](#d-58): the rest of a group opens in the Select Filters modal rather than inline.

**What's live.** Facet groups are bare lists of checkboxes with no grouping element. One search page has eight 'More…' buttons, all with the identical accessible name.

**The conflict.** A screen reader user hears seventy ungrouped checkboxes and cannot tell which filter any of them belongs to, and eight indistinguishable 'More…' controls.

**The decision.** Every facet group is a <fieldset> with a <legend>. The control that opens the rest of a group names it — 'Show More Media Types' — and opens every value in the Select Filters modal. Counts go into each option's accessible name.

**Why.** Markup-only change with a large effect on the densest interactive surface on the site.

**Blast radius.** collection-browser facet panel. No visual change.

*See:* [`components/facet-filter.md#semantics`](components/facet-filter.md#semantics)

---

<a id="d-32"></a>

### D-32 · Form submits use aria-disabled, not the disabled attribute

**Status:** `accepted` · **Area:** accessibility

**What's live.** Not an issue on live pages yet, but the pattern is common and worth settling before it appears.

**The conflict.** A disabled button is removed from the tab order, so a keyboard user tabs to the end of a form and finds nothing there, with no explanation of why they cannot submit.

**The decision.** Never block submit with a disabled button. Use aria-disabled="true", let the user submit, and show what failed in a role=alert summary above the form.

**Why.** Being told what is wrong is strictly better than being silently prevented from acting.

**Blast radius.** Applies to new form work.

*See:* [`patterns/forms.md#validation`](patterns/forms.md#validation) · [`components/button.md#states`](components/button.md#states)

---

<a id="d-38"></a>

### D-38 · WCAG 2.2 level AA is the bar

**Status:** `accepted` · **Area:** accessibility

**What's live.** No stated conformance target. On the live pages: half the keyboard stops have no focus indicator, nine color pairings fail contrast, every page has sub-44px touch targets, and petabox's item page has 32 <h1> elements.

**The conflict.** Without a stated target, accessibility work is negotiated case by case and loses to whatever ships next.

**The decision.** WCAG 2.2 level AA, checked where it can be: src/themes/tokens.node.test.ts checks every recommended color pairing.

**Why.** A library that is publicly funded and globally used has a strong case for AA as a floor. Stating it turns individual arguments into a single decision already made.

**Blast radius.** It is a commitment, not a change. The work it implies is D-07 through D-11, D-17, D-19, D-21, D-25, D-28 and D-29.

*See:* [`foundations/accessibility.md`](foundations/accessibility.md)


## Components

<a id="d-18"></a>

### D-18 · Converge on inline SVG icons; deprecate Iconochive and Glyphicons

**Status:** `accepted` · **Area:** components

**What's live.** Three icon systems ship simultaneously: the Iconochive icon font, Bootstrap 3's Glyphicons Halflings font, and <ia-icon-*> Lit components wrapping inline SVG. Rendered sizes include 12×8, 16, 20, 24, 30, 32 and 40.

**The conflict.** Two of the three are icon fonts. Icon fonts render as text: they disappear under forced-colors, they are replaced by user font-override stylesheets and some ad blockers, and they block on a font download.

**The decision.** New code uses the shared inline-SVG set: a sprite with <use> in server-rendered petabox markup, the icon element inside Lit templates and shadow roots, where <use> against a document sprite is unreliable. Touched code migrates. Glyphicons leaves with Bootstrap 3. Six sizes on a 4px grid: 12 / 16 / 20 / 24 / 32 / 40, all square; 12 is for carets and disclosure chevrons beside small text.

**Why.** The SVG system already exists and already covers the most-used icons. Making it the only rule for new work stops the problem growing without requiring a migration project.

**Blast radius.** Iconochive has a long tail — media types, file formats, social links — so it stays for a long time. Nothing breaks while it does.

*See:* [`foundations/iconography.md`](foundations/iconography.md)

---

<a id="d-20"></a>

### D-20 · Style the signup form's inputs

**Status:** `accepted` · **Area:** components

**What's live.** Petabox's legacy signup page draws its email, screen-name and password fields with the browser default — `border: 2px inset #767676`, no radius, no focus or error state. Offshoot's signup replaces it.

**The conflict.** The most conversion-critical form on the site looks unfinished and has no error affordance, so validation falls back to native browser bubbles.

**The decision.** `.ia-input` at the `lg` size (44px): 4px radius, 1px #666 border, focus ring, and a proper error state wired up with aria-invalid and aria-describedby.

**Why.** It is the highest-value single component fix available and it is self-contained — one page, one component.

**Blast radius.** Signup, login, and any other form still on native inputs.

*See:* [`components/input.md`](components/input.md) · [`patterns/forms.md`](patterns/forms.md)

---

<a id="d-27"></a>

### D-27 · Infinite scroll has no Load More and no position indicator

**Status:** `accepted` · **Area:** components

**What's live.** Search, collection and profile results use <infinite-scroller>. There is no Load more button, no 'showing X of Y', and the URL does not reflect the loaded range.

**The conflict.** A keyboard user cannot load more results, nobody can link to result 400, and the back button does not return you to where you were.

**The decision.** Keep infinite scroll with neither a Load More button nor a position indicator. Load the next page when the end of the list comes into view by scrolling or by keyboard focus reaching the last result, and keep the loaded range in the URL.

**Why.** Reviewed: no Load More and no position indicator on the infinite scrollers. Loading on focus as well as on scroll keeps the list reachable by keyboard; the URL fixes linking and the back button.

**Blast radius.** Product behavior on the three busiest page types, plus URL state handling.

*See:* [`components/pagination.md`](components/pagination.md)

---

<a id="d-31"></a>

### D-31 · 'Search this collection' becomes a standard button

**Status:** `rejected` · **Area:** components

**What's live.** 30px tall, #2c2c2c fill, 20px radius, 14px/700 — the only pill-shaped button on the site.

**The conflict.** It is the only button of its kind, and its shape says 'search field'.

**The decision.** .ia-button--sm.ia-button--secondary: 30px, #333 fill, 4px radius, 14px/500.

**Why.** Rejected: the collection's own search becomes an .ia-search-bar without its picker (search-bar.md), so the button goes with it; and D-52 made the secondary button white, so a #333 secondary no longer exists. Proposed rationale: follows from D-30. The button is prominent enough from its position and fill without a unique shape.

**Blast radius.** One component on collection pages.

*See:* [`components/search-bar.md`](components/search-bar.md) · [`components/button.md#migrating-the-live-variants`](components/button.md#migrating-the-live-variants)

---

<a id="d-33"></a>

### D-33 · The modal follows offshoot: a colored header band and frame; three widths instead of five

**Status:** `accepted` · **Area:** components

**What's live.** offshoot sets modal-manager's header to #194880 (#d9534f for destructive modals), a white centered 1.8rem title, a round white close button, a #fbfbfd body, --modalBorder: 2px solid #194880, a 0.5rem radius, the default rgba(10,10,10,0.9) backdrop, and five widths (40, 50, 58, 80, 85rem).

**The conflict.** An earlier draft of this spec dropped the band and the border for a plain white dialog on a light scrim, which matched nothing the site ships. offshoot is where the site is headed, and every offshoot modal has the band.

**The decision.** Follow offshoot: the header band and a 2px frame in --ia-color-action-primary-fill (--ia-color-action-danger-fill with --danger), a centered white --ia-font-size-xl title, a 24px white close disc with a 44px hit area, a --ia-color-surface-page body, and --ia-radius-default, over the system's 50% black scrim with its 3px blur (offshoot's 90% backdrop is to follow). Three widths: sm 40rem, md 58rem, lg 85rem.

**Why.** The band is what an archive.org modal looks like; matching it means a modal built from this spec drops into offshoot unchanged. Values map onto tokens: the band and frame take the action colors (so a destructive modal is the system's red, not #d9534f), the 1.8rem title moves to the scale. The 50rem share and 80rem login widths fold into sm and lg.

**Blast radius.** Specced modals gain the band and frame. offshoot's own modals change only in the danger red, the 4px radius and the title size.

*See:* [`components/modal.md`](components/modal.md)

---

<a id="d-40"></a>

### D-40 · Tile footers keep their two layouts, with two glyph sizes

**Status:** `accepted` · **Area:** components

**What's live.** The item tile's stat row is a flex row spread with space-between: four cells, each a block glyph centered with margin-inline: auto over a 14px/17px count. The glyphs are four sizes — 25px media type, 13px views, 13px favorites, 11px reviews, the last nudged 2px down. The collection tile's footer is a different structure: a 25px glyph beside a column of two 14px/15px lines. Cards are content-height, so footers sit wherever the title ends.

**The conflict.** Four glyph sizes in a row of four read as misalignment rather than hierarchy. 17px and 15px are off the line-height scale. In a grid row of mixed title lengths the footers are ragged.

**The decision.** Keep both structures as live builds them — space-between for the item row, glyph-beside-stack for the collection footer. The media-type glyph is `--ia-size-icon-lg` (24px); the three counters are `--ia-size-icon-sm` (16px). Both footers set `--ia-font-line-height-tight`. Both pin to the bottom of the card with `margin-block-start: auto`.

**Why.** Two sizes keep the one real distinction live draws — the media type is a category, the rest are counts — and drop the accidental ones. Pinning costs nothing on a card whose title fills two lines and aligns every footer in a row when titles differ.

**Blast radius.** Small. Counter glyphs grow 3–5px; the stat row is otherwise where it was.

*See:* [`components/item-tile.md#footer`](components/item-tile.md#footer)

---

<a id="d-41"></a>

### D-41 · One ia-dropdown panel: one dark, one radius

**Status:** `accepted` · **Area:** components

**What's live.** The same ia-dropdown component opens a #333 panel in the sort bar and a #2c2c2c panel in the search bar. The sort bar's panel has 4px corners on the bottom only; the search bar's has 4px all round. The selected option is marked by a translucent white fill alone.

**The conflict.** Two darks and two corner treatments for one component, a hair apart — close enough to look like a mistake. Selection carried by fill alone fails WCAG 1.4.1.

**The decision.** `--ia-color-surface-inverse` (#2c2c2c) and `--ia-radius-default` on all four corners, in every host. The selected option gets a check mark as well as the `--ia-color-selected-soft-fill-inverse` fill (`#666`).

**Why.** #2c2c2c is already the primary text color and the inverse surface elsewhere; #333 exists nowhere else as a panel. Floating panels read as separate layers, so all four corners round.

**Blast radius.** Invisible in the search bar; a one-step color change and two rounded corners in the sort bar.

*See:* [`components/dropdown.md`](components/dropdown.md)

---

<a id="d-42"></a>

### D-42 · Facet labels and counts move to 14px; the rail widens to 210px

**Status:** `accepted` · **Area:** components

**What's live.** Facet labels and counts are 12px/500 at a 17.14px line-height, in a 180px rail. Rows are 24px tall and carry two 15×15 checkboxes 0px apart.

**The conflict.** 12px is small for the densest primary control on the site, and 17.14px is off the scale. At 180px, 44px touch rows and a larger label leave long facet names almost no room before they truncate.

**The decision.** Label `--ia-font-size-md` in primary text; count `--ia-font-size-sm` in secondary text, tabular, right-aligned. `--ia-font-line-height-normal`. Rail 21rem (210px) above `lg`. Rows are 30px on a fine pointer and 44px on a coarse one (D-17). The hide toggle (the eye) is its own target, between the checkbox and the label, as live places it.

**Why.** The row's label is its accessible hit area, so a larger label is a larger target as well as easier reading. Beside a row's checkbox, count and exclude toggle, a 14px label gets about 80px at 180px — roughly 11 characters — and about 110px at 210px, roughly 15. 210px is the balance between truncation and the result grid.

**Blast radius.** The rail takes 30px more of the page above `lg`, so the result grid loses roughly a sixth of a tile column at 1280px.

*See:* [`components/facet-filter.md#spec`](components/facet-filter.md#spec)

---

<a id="d-47"></a>

### D-47 · Messages take a status tint and border; the leading stripe goes

**Status:** `accepted` · **Area:** components

> **Superseded in part by** [D-61 · Banners go above the topnav; the chrome gains offshoot's footer and loading bar](#d-61): the page banner goes above the topnav, not under it.

**What's live.** No consistent message component; signup errors are native browser bubbles. Offshoot's alert-banner, for site notices, is a solid fill with no icon.

**The conflict.** A message has to be told apart by intent at a glance and keep an edge on every surface, a sunken surface included. A shared background with a thin colored stripe does neither: the intents differ only by a 3px line, and on sunken the message has no edge.

**The decision.** Each status gets `-subtle` (the status color at 8% into white) and `-border` (at 35%). A message is the tint with a 1px tinted border and the icon in the status color. Body text stays `--ia-color-text-primary`, 12.14:1 or better on every tint. A page banner (`--banner`) runs edge to edge above the topnav (D-61): no radius, no side edges, a bottom edge, and its content aligned to the page container.

**Why.** The tint separates intents at a glance and gives the message an edge on any surface; the icon still carries the meaning, so color is never the only signal. Status-colored body text was considered and rejected: tinted 14px text is harder to read for no gain.

**Blast radius.** Every message, banner and toast.

*See:* [`components/alert.md`](components/alert.md) · [`foundations/color.md#status`](foundations/color.md#status)

---

<a id="d-51"></a>

### D-51 · Buttons set a minimum height and wrap a label that doesn't fit

**Status:** `accepted` · **Area:** components

**What's live.** Buttons are nowrap; a label longer than its container overflows it.

**The conflict.** A fixed block-size and nowrap line controls up exactly, and push a German or Spanish label straight out of a narrow container — the Playground's long-content cases fail.

**The decision.** `min-block-size` from the size token instead of `block-size`, `max-inline-size: 100%`, and the label wraps (balanced) only when the container forces it. The button doesn't shrink below its label otherwise. One-line buttons are exactly the token height, as before.

**Why.** Height-not-padding is what makes controls align, and a minimum keeps that for every one-line button. What it gives up is the guarantee for a two-line one — which was never going to line up; it was going to overflow.

**Blast radius.** Only buttons whose label is wider than their container.

*See:* [`components/button.md#sizes`](components/button.md#sizes) · `playground.html` in the demo

---

<a id="d-52"></a>

### D-52 · The secondary button is light

**Status:** `accepted` · **Area:** components

> **Superseded in part by** [D-55 · Ghost buttons are borderless](#d-55): ghost is borderless, so the secondary no longer shares its edge.

**What's live.** --ia-theme-secondary-cta-fill #333333 with white text, used for supporting actions beside the navy primary.

**The conflict.** The #333 secondary is heavier than the primary it supports: 12.22:1 against the page to the navy's 8.91:1. Beside each other, the eye lands on Cancel.

**The decision.** Secondary is white (--ia-color-surface-raised) with a #666 edge, #2c2c2c text and --ia-shadow-raised. The other intents are unchanged. The border carries the boundary (5.56:1 against the page), as the warning button's does; the shadow separates it from ghost, which is borderless and sits flat (D-55).

**Why.** Emphasis should follow importance: the one action the page wants is the heaviest thing on it. A light secondary keeps the supporting action visible without competing.

**Blast radius.** Every secondary button, including ia-button's mode="secondary" through --ia-theme-secondary-cta-*, and live's dark .cta-button variant, which migrates to it.

*See:* [`components/button.md#intents`](components/button.md#intents) · [`foundations/color.md#actions`](foundations/color.md#actions)

---

<a id="d-55"></a>

### D-55 · Ghost buttons are borderless

**Status:** `accepted` · **Area:** components

> **Supersedes part of** [D-52 · The secondary button is light](#d-52): ghost is borderless, so the secondary no longer shares its edge.

**What's live.** ia-button's mode="transparent" draws no border; the spec gave ghost a 1px #666 edge.

**The conflict.** With the secondary button white and edged in #666 (D-52), a bordered ghost looks the same as a secondary, told apart only by a faint shadow.

**The decision.** Ghost is borderless: transparent, no border, primary text, and the hover overlay. It keeps its padding and control height. It is used only where live draws a borderless button — a header's icon-and-label actions (offshoot's action bar: Share, Favorite, RSS, Play All, Edit, Settings), Add Review, and icon-only controls (close, dismiss, carousel arrows, info) — and nowhere else; a text-only Cancel, Clear Filters or menu trigger is secondary.

**Why.** Three emphases need three looks — filled, raised, and flat. A ghost's label or icon identifies it as a control, so it needs no visual boundary under WCAG 1.4.11. It matches ia-button's own transparent mode and offshoot's action bar, which are the only places live draws a button without a box; everywhere else live's actions have a fill or an edge, so the system's do too.

**Blast radius.** Header action rows, Add Review and icon-only buttons stay ghost. Modal Cancel buttons, empty-state actions and menu triggers become secondary.

*See:* [`components/button.md#intents`](components/button.md#intents)

---

<a id="d-57"></a>

### D-57 · Tabs reserve the width of their bold label

**Status:** `accepted` · **Area:** components

**What's live.** offshoot's tab-manager bolds the selected tab and reserves its bold width with a hidden copy of the label (::before { content: attr(data-sizing) }), so the strip doesn't shift.

**The conflict.** Bolding the selected tab without reserving its width widens it and shifts every tab after it: a strip that jumps when you click it feels broken, and across the search page's thirteen search types the shift is visible along the whole row.

**The decision.** Keep the bold selected tab. Each tab carries its label in data-label, drawn as a hidden, zero-height bold copy with empty alternative text, so every tab is always its bold width.

**Why.** Keeps the three signals for the selected tab — weight, color and the bar — without the layout cost of the weight change.

**Blast radius.** Tab markup gains data-label. Unselected tabs are a few pixels wider.

*See:* [`components/tabs.md#spec`](components/tabs.md#spec)

---

<a id="d-58"></a>

### D-58 · Browse pages follow offshoot's collection-browser

**Status:** `accepted` · **Area:** components

> **Supersedes part of** [D-29 · Facet groups get fieldset/legend, and 'Show More' names its group](#d-29): the rest of a group opens in the Select Filters modal rather than inline.
>
> **Supersedes part of** [D-34 · Tile titles move from a 1.07 line-height to 1.25](#d-34): titles clamp at three lines (four on saved-search tiles), not two.
>
> **Supersedes part of** [D-45 · One selected look, in two token tiers: strong and soft](#d-45): applied-filter chips are gone, so the strong tier marks a chosen filter chip or letter.

**What's live.** offshoot's search and collection pages run collection-browser 4.8: four tile kinds; a hover pane on hover-capable pointers and an ⓘ button only on touch; list and compact views; six values per facet group with the eye beside the checkbox at 30%; no applied-filter chips, a "Clear all filters" link; a "Filters" accordion above the results on narrow screens and a collapsed disclosure for signed-out visitors; a "Select filters" modal for every value of a facet; an A–Z letter bar for Title and Creator sorts; and empty and error states that replace the whole browser.

**The conflict.** The spec drew two tile kinds, an always-visible info button, a grid view only, five values per group with the eye after the count, chips above the results, a full-screen filter sheet with a "Show N Results" button, an inline "Show N more" list, and an icon-first empty state with no raw error text.

**The decision.** Adopt collection-browser's structure on the system's tokens: the four tile kinds, sort-driven date lines, weekly views, volume and issue, snippets and the restricted overlay; titles clamped at three lines; the hover pane (300ms, beside the pointer, Down Arrow into it) with ⓘ only where the pointer cannot hover; list and compact views; six values per group in live's order; the eye before the label at 30%, closed on hover; "Clear all filters" instead of chips; the narrow accordion and the signed-out disclosure in place of the sheet; the "Select filters" modal (sort, filter, chosen chips, sideways pages, Cancel and Apply filters); the letter bar; the results heading above the sort bar; and the placeholder that replaces the browser, with the engine's "Error details". The system keeps its own action buttons and pulsing skeletons, and checked rows move to the top only the next time the list opens.

**Why.** offshoot is where the site is headed, and collection-browser is the component it ships on every browse page; a spec that draws a different browser describes nothing anyone will build. Where the system had a reason of its own — a way out of an empty state, a skeleton that says something is coming, rows that never move under the pointer — it keeps it.

**Blast radius.** Every browse page in the spec: the tile, facet, sort-bar and empty-state specs, the search and collection screens, and the reference CSS. The 30% eye is under 3:1 at rest; the label beside it, not the eye, identifies the row.

*See:* [`components/item-tile.md`](components/item-tile.md) · [`components/facet-filter.md`](components/facet-filter.md) · [`components/sort-bar.md`](components/sort-bar.md) · [`patterns/page-shells.md#2-browse--search-collection-landing-user-profile`](patterns/page-shells.md#2-browse--search-collection-landing-user-profile) · [`patterns/empty-loading-error.md#empty`](patterns/empty-loading-error.md#empty)

---

<a id="d-59"></a>

### D-59 · The item page follows offshoot's details page

**Status:** `accepted` · **Area:** components

**What's live.** offshoot's details page: a black theater across the window; a 4.5rem media-type icon, the title and stacked icon-over-label actions (Add to list, Borrow, Favorite, Share, Flag) in 2px #000 frames, each with its own pressed color; the main column holds the top metadata, player alerts, the description in full, notes and credits, and the whole metadata list collapsed after twelve rows, then the reviews with a gutter icon; the sidebar is a column of bordered boxes — stats, purchase options, downloads that open a format's files in place, collections with round thumbnails, uploaded by — and similar items run underneath. It stacks at 767px and is 1170px wide.

**The conflict.** The spec drew a rounded viewer inside the page, an overline instead of the icon, inline ghost actions, the metadata in the sidebar, reviews as a full-width row below, a sidebar of unboxed lists with fixed "Download" links, and no description, review list, similar items, or any of the page's other states.

**The decision.** Adopt offshoot's structure and states on the system's tokens: the full-window theater with the player on the 1350px page width; the media-type glyph before the title; `.ia-button--stacked` actions with one pressed look (the soft selected tier) and short labels below lg; offshoot's main-column order with the description in full and the full metadata in a list form of read more (twelve rows); reviews in the main column with the glyph in a gutter and a ghost Add Review; the sidebar's boxes and their contents; similar items as a carousel; and the lending bar, stream-only, log-in, not-found, flag-panel and list-picker states. The system keeps its lg breakpoint and 32rem sidebar.

**Why.** offshoot's details page is replacing petabox's; the spec describes the page that will ship. Per-action pressed colors and a 200-weight metadata value are the only parts with no counterpart in the system, and they resolve to its selected tier and its two weights.

**Blast radius.** The item screen, page-shells.md's record shell, the reference CSS for the record, button.md's stacked action, and read-more, which now collapses long lists as well as prose. Four glyphs come from offshoot's SVG files: share, add, email and download.

*See:* [`patterns/item-page.md`](patterns/item-page.md) · [`patterns/page-shells.md#3-record--item-details`](patterns/page-shells.md#3-record--item-details)

---

<a id="d-60"></a>

### D-60 · Profile, account settings and login follow offshoot

**Status:** `accepted` · **Area:** components

> **Supersedes part of** [D-12 · Three container widths: 1350 / 1000 / 600. Retire 1170px](#d-12): account settings takes a page-specific 700px width, because a preference row needs three columns.

**What's live.** offshoot's profile puts the patron in a #194880 band — avatar, screen name at 3.6rem/200, "Archivist since", bio, a column of icon-and-label actions — with eight white-on-navy tabs that swap the panel in place and update the URL, and a yellow "NEW" callout on Lists. Its Loans tab replaces the sort bar with On Loan / Waiting List / History and adds red Return All and per-tile Return actions, each confirmed in a modal. Account settings is a 700px column under a sticky header whose Save is disabled until something changes, with preferences as three-column checkbox rows. Login and signup run logo, title, Google, "Email me a code", the Or divider, then the form, with no card and an auto-width or centered submit.

**The conflict.** The spec drew a light profile header with seven tabs as links, said seven was the ceiling, called account preferences switches, had no settings page or Loans spec, and put the Or divider straight after Google with no logo.

**The decision.** Adopt the profile's navy band (the primary fill, inverse tokens, white underlined links), its action column and its tab strip; eight tabs as a tablist that keeps the URL in step, with a "New" badge; the Loans filter (a dropdown in the sort bar's place), danger Return All and Return with confirm modals. Spec account settings at 700px with the sticky header, Save always enabled and validated on submit, the summary as a message, offshoot's sections, and preferences as checkbox rows with the description behind an info button on narrow screens. Login and signup take offshoot's order, logo and code button; the system keeps its card, full-width primary submit, error summary and inline errors, and adds the login page.

**Why.** offshoot is the site these pages are moving to. Where it disables a submit, colors links below 4.5:1 on navy, or reports errors as one line of red text, the system's own rules in forms.md and accessibility.md hold.

**Blast radius.** The profile, settings and login screens (new) and signup; tabs.md, switch.md, forms.md and layout.md; the badge gains --new and the avatar its xl size; four more glyphs come from offshoot's SVG files: rss, play, edit and gear.

*See:* [`patterns/profile-page.md`](patterns/profile-page.md) · [`patterns/account-settings.md`](patterns/account-settings.md) · [`patterns/page-shells.md#4-focused-task--signup-login-upload`](patterns/page-shells.md#4-focused-task--signup-login-upload)

---

<a id="d-61"></a>

### D-61 · Banners go above the topnav; the chrome gains offshoot's footer and loading bar

**Status:** `accepted` · **Area:** components

> **Supersedes part of** [D-47 · Messages take a status tint and border; the leading stripe goes](#d-47): the page banner goes above the topnav, not under it.

**What's live.** offshoot's header holds the public and staff notices and a browser-compatibility warning ahead of the topnav, with the donation banner prepended above the whole app; after the topnav sits a 3px dodgerblue loading bar sweeping over 7.5s. The skip link comes first and points at <main id="maincontent" tabindex="-1">. A one-line Terms of Service footer is fixed on the homepage, at the page's end on item pages, and off elsewhere.

**The conflict.** The spec put one banner under the topnav and said not to stack three, pointed the skip link at #main from inside the header, and had no footer or loading bar.

**The decision.** Banners go above the topnav, up to three stacked under the donation banner, keeping the system's tints, icons, 31px height, accessible dismiss and four intents. The skip link is the page's first element and targets #maincontent. Spec offshoot's footer (on the chrome surface, regular weight, in its three modes) and its 3px activity bar (link color, a 1.4s sweep from the motion tokens, still under reduced motion). The root font size stays 62.5%.

**Why.** A notice about the whole site reads before the site's own navigation, as offshoot already orders it. The footer and the loading bar exist on every offshoot page that needs them; specifying them on tokens keeps them from being the two parts of the chrome nobody designed.

**Blast radius.** Every screen gains the skip link and the #maincontent target; the item screen gains the footer. alert.md, navigation.md and page-shells.md change; ia.css gains .ia-activity-bar and .ia-footer.

*See:* [`components/alert.md#banners`](components/alert.md#banners) · [`components/navigation.md#skip-link`](components/navigation.md#skip-link) · [`patterns/page-shells.md`](patterns/page-shells.md)


## Motion

<a id="d-23"></a>

### D-23 · Named motion durations and cubic-bezier easings, plus a global prefers-reduced-motion reset

**Status:** `accepted` · **Area:** motion

**What's live.** Durations already cluster at 50 / 100 / 200 / 300ms. Easing is always a bare keyword: `ease`, `ease-out`, `ease-in`, `ease-in-out`, `linear`. No live stylesheet declares prefers-reduced-motion. Several transitions animate `top`, `right`, `max-height` and `row-gap`.

**The conflict.** Every transition accelerates slightly differently depending on which keyword the author reached for, and none of them can be turned off.

**The decision.** Four durations matching the live clusters, plus a 700ms spin; three named cubic-bezier easings plus linear; a global prefers-reduced-motion reset; and a rule that only transform and opacity are animated for anything that moves.

**Why.** The durations are already right; only the easing and the reduced-motion support are missing. Animating max-height on a facet panel with sixty checkboxes inside it is a visible stutter on a mid-range phone.

**Blast radius.** Low risk. The reduced-motion reset is additive.

*See:* [`foundations/motion.md`](foundations/motion.md)

---

<a id="d-49"></a>

### D-49 · Controls squeeze on press, tiered by width

**Status:** `accepted` · **Area:** motion

**What's live.** Tiles scale on press over 0.05s. Buttons darken and don't move.

**The conflict.** The button spec said 'no transform' while the tile, the most-repeated element on the site, already has one. And a single scale cannot serve both: 3% of a 30px icon button is sub-pixel, 3% of a 460px bar is a lurch.

**The decision.** `--ia-motion-press-scale-compact` 0.92 (square icon controls), `-default` 0.97 (text buttons), `-wide` 0.985 (full-width buttons, tiles), applied on :active over `--ia-motion-duration-instant`, so the edge moves about 1.5px whatever the width. The darkened fill stays. Rows and surfaces never scale. Under reduced motion there is no transform.

**Why.** Press feedback makes a control feel like it heard you even when the server is slow; tiering by width keeps it the same gesture at every size. It codifies the tile press live already has.

**Blast radius.** Buttons and tiles, on press only.

*See:* [`foundations/motion.md#press`](foundations/motion.md#press) · [`components/button.md#states`](components/button.md#states)

---

<a id="d-54"></a>

### D-54 · Hover snaps; it doesn't fade

**Status:** `accepted` · **Area:** motion

**What's live.** Hover color and background changes fade over 0.1s ease-out.

**The conflict.** A fade on hover looks refined when you watch it, and reads as lag under your own cursor: the control answers a tenth of a second late.

**The decision.** Hover changes — fill, border, color, shadow — apply at once, with no transition. --ia-motion-duration-fast is for small state changes (checked, selected, expanded) with --ia-motion-easing-state. Press and state changes still animate.

**Why.** Everything answers back: a pointer landing gets its response on the same frame. Motion is kept for things that change state or move.

**Blast radius.** Every hover on the site. Visually subtle; it makes the interface feel faster.

*See:* [`foundations/motion.md#hover-snaps`](foundations/motion.md#hover-snaps)


## Content

<a id="d-26"></a>

### D-26 · Sentence case everywhere, and one string per destination

**Status:** `rejected` · **Area:** content

> **Replaced by** [D-44 · Title Case for interface labels; sentence case for running text](#d-44).

**Review note.** Title case is preferred

**What's live.** The same destination is labeled 'Sign up', 'SIGN UP' and 'Sign up for free' in the same navigation. 'Log in' appears alongside 'LOG IN'. Uppercase comes from CSS text-transform on sentence-case source text, which is the right mechanism, applied inconsistently.

**The conflict.** Users cannot tell whether three differently-labeled links go to the same place, and screen readers read each differently.

**The decision.** Sentence case for all interface text. Uppercase, where wanted, comes from text-transform on the .ia-type-overline role. One canonical string per destination.

**Why.** Sentence case is easier to read, easier to translate, and keeps the accessible name matching the visible label. Doing the casing in CSS means the treatment can change in one place.

**Blast radius.** Copy changes across the navigation and buttons. Low technical risk, but it is editorial work and needs someone to own the string list.

*See:* [`foundations/content-voice.md#capitalization`](foundations/content-voice.md#capitalization)

---

<a id="d-44"></a>

### D-44 · Title Case for interface labels; sentence case for running text

**Status:** `accepted` · **Area:** content

> **Replaces** [D-26 · Sentence case everywhere, and one string per destination](#d-26).

**What's live.** Mixed. 'Sign up', 'SIGN UP' and 'Sign up for free' label the same destination; buttons and headings use sentence case and title case more or less at random.

**The conflict.** D-26 proposed sentence case everywhere and was rejected in review: title case is preferred. The rule still has to say where title case applies, or it will be applied inconsistently in its turn.

**The decision.** Title Case for interface labels: headings, buttons, links that act as buttons, tabs, navigation and menu items, form labels, table headers, and chip text. Sentence case for running text: descriptions, helper and error text, messages, empty states, and tooltips. Articles, coordinating conjunctions and prepositions of four letters or fewer (a, an, the, and, but, or, nor, for, of, in, on, to, by, at, with, from) stay lowercase unless first or last. Uppercase, where wanted, still comes from text-transform on .ia-type-overline. One canonical string per destination.

**Why.** Title Case is the reviewed preference and matches how archive.org names its own products and sections. Keeping running text in sentence case keeps a sentence reading as a sentence; a title-cased error message reads as shouting. The canonical-string rule is carried over from D-26 because the review objected to its casing, not to consistency.

**Blast radius.** Every button, heading, tab and label in the guide's demos and screens. Editorial, not technical.

*See:* [`foundations/content-voice.md#capitalization`](foundations/content-voice.md#capitalization)

---

<a id="d-62"></a>

### D-62 · The donation amount picker keeps its gold, as its own tokens

**Status:** `accepted` · **Area:** components

**What's live.** The donation form's amount picker draws each amount as a white button with a `#333` border and the chosen one in gold, `#f9bf3b`, hard-coded in `ia-donation-edit-donation`. Nothing else on the site uses the gold.

**The conflict.** The system's selected look for one choice among neutral options is the soft tier: `--ia-color-selected-soft-fill` (pale navy) with navy text. By that rule the chosen amount would turn navy.

**The decision.** Keep the gold. The picker gets its own tokens in `color.donation`: `amount-fill`, `amount-text`, `amount-border`, `amount-selected-fill` (the new `palette.gold-400`, `#f9bf3b`) and `amount-selected-text`. The chosen amount still pairs the gold with `aria-checked` on its radio, never color alone.

**Why.** The donation form has its own appearance, and the gold is part of it. Naming it as tokens puts it in the system, where it is checked for contrast and changed in one place, instead of leaving a one-off value in a component.

**Blast radius.** None visible: the picker renders as before. `tokens.json` gains the palette entry and the group; the contrast test gains three pairs.

*See:* [`components/donation.md#amount-picker`](components/donation.md#amount-picker)
