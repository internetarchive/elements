# Building with the Internet Archive design system

**Source:** built from {{SOURCE}}. The tokens, guidelines and components below are that commit's.

This system has two layers, and both load through `tokens.css` and `components/bundle.css`:

- **{{Count}} React components** over archive.org's real Lit elements, as the live site ships
  them (`window.IADesignSystem.*`). Use them wherever they fit.
- **Design tokens plus a CSS class vocabulary** (`ia.css`) for everything else: build with
  ordinary JSX elements and put the `ia-*` classes on them.

Never invent `ia-*` class names or restyle the system's classes, and never hard-code a color,
type size, spacing, radius, shadow, border width or control height: use a component, a class,
or a `var(--ia-*)` token. Page-local layout classes of your own are fine when they follow
the same rule. Two exceptions, because no token can cover them:

- **Layout dimensions of elements unique to a page** — a book cover's size, a viewer's
  width, a column's maximum width — may be literal rem values.
- **Media queries** can't read tokens: use the `--ia-breakpoint-*` values directly
  (below `md` is `max-width: 767px`, below `lg` is `max-width: 889px`).

## Components (use these first)

| Need | Component |
| --- | --- |
| Site search | `IADropdownSearchBar` with `categories` (the 13 search types). It has no size of its own: copy the placement styles from its card (topnav, search page, homepage), which are offshoot's placements in this system's tokens |
| Buttons | `IAButton` for every action button, including form submits (`type="submit"`) and link-styled actions (`mode="link"`). Modes: primary, secondary, danger, warning, donate (green, for donating), ghost, link — `ghost` only where live draws a borderless button: a header's icon-and-label actions (Share, Favorite, RSS, Play All, Edit, Settings) and Add Review; a text-only Cancel or Clear Filters is `secondary`; `transparent` is deprecated: it renders as `ghost`. `size`: `sm` (30px), `md` (36px, the default) or `lg` (44px); `loading`, `disabled`, `href`. Size it with `--ia-theme-button-width` / `--ia-theme-button-height` in `style`; full width (a form submit, a panel's main action) is `--ia-theme-button-width: 100%` on the button or any ancestor — nothing else; `width` or `display` on the element does nothing. Controls that have their own class — tabs, chips, facet rows, the facet toggles, Clear All Filters and "Show More", the letter bar, sort direction, view switch — keep that class, and so do buttons that are *always* icon-only (`ia-button ia-button--ghost ia-button--icon` with `aria-label`), which `IAButton` has no shape for. A button that shows its label in some layouts and only its icon in others is still an `IAButton` |
| Loading, success and error states | `IAStatusIndicator` (`mode`, optional `mediatype` glyph; size via `--icon-width` set on the element itself (inherited from a parent it does nothing), or `--ia-theme-icon-width` on any ancestor: `var(--ia-size-icon-2xl)` on a page) |
| Sort field and other value pickers | `IADropdown` with a `<span slot="dropdown-label">` and plain-text option labels. Its list is dark by default, in the inverse tokens; copy its card's styling for the sort field |
| Year facet | `IAHistogramDateRange` (`bins`, `minDate`, `maxDate`, optional selected range); copy its card's token colors |
| Filterable picker | `IAComboBox` (`options`, `behavior`, a `<span slot="label">`); the TV search filters are the live use |
| One-time code entry | `IAOtpForm` (`validationStatus`); just the boxes, `IAOtpInput` |
| A fundraiser's progress | `IADonationThermometer` (`currentAmount`, `goalAmount`) |
| A text field with a clear button | `IAClearableTextInput` (`value`, `placeholder`, `onSubmit`) |
| The live masthead | `IATopnav` (`username`, `screenName` when signed in; `hideSearch` on the search page and homepage). It is archive.org's real topnav; the `ia-topnav` classes below are the spec's reference markup for static pages |
| The Wayback search in the topnav menu | `IAWaybackSearchForm` (`queryHandler`), on a dark surface |
| An item's reviews | `IAReviews` (`identifier`, `reviews` as `Review` objects; writing needs a `reviewService`) |
| Beta feedback on a feature | `IAFeatureFeedback` (`featureIdentifier`, `displayMode`; needs a service, a reCAPTCHA manager and a resize observer) |
| An audio player | `IARadioPlayer` (`config`, `transcriptConfig`, `searchHandler`), or its parts: `IAPlaybackControls`, `IAWaveformProgress`, `IAScrubberBar`, `IATranscriptView`, `IAExpandableSearchBar`. All but the scrubber are drawn for the black theater surface |
| A donation form | `IADonationForm` (the real `ia-donation-form-controller`: frequency, amount, payment method, contact details). In a design, pass `{...IADesignSystem.demo.donationFormServices()}`; a real page passes Braintree and reCAPTCHA keys instead |
| A dialog | `IAModal` with `config={new ModalConfig({ title, headline, message, headerColor })}` draws archive.org's dialog in place. On a page, open it through `IAModalManager` (`<modal-manager>`): `showModal({ config })`. The donation dialogs' bodies are `IADonationUpsellModalContent`, `IADonationConfirmModal` and `IADonationErrorModalContent`, as `IAModal` children |
| An image carousel | `IAImageViewer` (`images` as `{ name, title, url }`); it fills the box you give it, on a dark backdrop |
| The item page's theater | `IAItemNavigator`: a side menu of panels (`menuContents`, `menuShortcuts`) beside a viewer you slot into `slot="main"`. `IADesignSystem.demo.itemNavigatorMenus()` builds the files and share panels |
| The book lending bar | `IABookActions` (`lendingStatus`, `userid`, `bookTitle`, `fetchHandler`); black, full width, over the book reader |
| A long grid of results | `IAInfiniteScroller` (`itemCount`, `cellProvider`): a virtualized grid with no look of its own; the cells are yours |

`window.IADesignSystem` also carries the classes these components take as data: `Review`, `TranscriptConfig`, `TranscriptEntryConfig`, `ModalConfig`, and `SearchHandler`, `TranscriptIndex` and `LocalSearchBackend` for the radio player's search, plus lit's `html` tag for the few props that take a lit template (`ModalConfig` text, scroller cells, navigator panels).

`IADesignSystem.demo` holds stand-ins for the services some components need, so a prototype works without a backend:

- `IAFeatureFeedback`: `MockFeatureFeedbackService`, `MockRecaptchaManager`, `SharedResizeObserver`.
- `IADonationForm`: `donationFormServices()`, a mock Braintree manager that reports every payment method as available, a local reCAPTCHA and a hidden `<modal-manager>`. Nothing is charged, and the card-number boxes stay empty because Braintree draws them.
- `IABookActions`: `mockLendingFetchHandler`, which answers every lending request with success; `modalManager()`, which adds the page's hidden `<modal-manager>`; and `guardNavigation()`, which stops the page loads a borrow or return would start.
- `IAImageViewer` and `IAItemNavigator`: `demoImages()` (placeholder images), `itemNavigatorMenus()` (made-up files and the share panel).
- `IAInfiniteScroller`: `demoCellProvider(delayMs)`, which draws item tiles, and `demoPlaceholderCell`.

Never ship the mocks.

They render in shadow DOM: only CSS custom properties reach inside. Each component reads the `--ia-*`
tokens directly, so a token set on an ancestor changes it inside them; the older `--ia-theme-*` hooks still work. Events arrive as `onX` props with a
`CustomEvent` (`onSearchRequested={e => e.detail.query}`). Each card shows the realistic
compositions to copy.

## Which elements follow the tokens

All {{count}} components above are bundled. Six of them, `IADonationForm`, `IAModal`, `IAImageViewer`, `IAItemNavigator`, `IABookActions` and `IAInfiniteScroller`, depend on services a design can't reach (Braintree, the lending service, item files), so their previews run over the `IADesignSystem.demo` mocks. Their specs: [donation](guidelines/components/donation.md), [item page](guidelines/patterns/item-page.md), [modal](guidelines/components/modal.md).

In `@internetarchive/elements` as a whole:

Where each element stands. "On tokens" means its colors and sizes come from the tokens; a few px values (hairlines, offsets) stay literal on purpose.

| | Elements |
| --- | --- |
| On tokens | `ia-button`, `ia-otp-form`, `ia-otp-input`, `ia-donation-thermometer` · `ia-radio-player`, `ia-waveform-progress`, `ia-scrubber-bar`, `ia-transcript-view`, `ia-playback-controls`, `ia-expandable-search-bar` · `ia-topnav` · `ia-dropdown`, `ia-dropdown-search-bar`, `ia-combo-box`, `ia-clearable-text-input`, `ia-wayback-search-form` · `ia-donation-form`, `ia-feature-feedback`, `ia-reviews`, `ia-histogram-date-range`, `ia-image-viewer`, `ia-item-navigator`, `ia-infinite-scroller` |
| Partly | `ia-book-actions`, `modal-manager`: their own styles are on tokens, but the modal header colors they pass to `modal-manager`, `ModalConfig`'s default header and body colors, and the inline styles on book-actions' light-DOM modal buttons are still literal |
| Nothing to convert | `ia-icon`, `ia-status-indicator`, `ia-sr-only-text`, `ia-audio-element`: they inherit their colors or have no styles of their own |

The donation form's light-DOM styles read the tokens by their public names, with the token's value as the fallback, since the private aliases exist only inside a shadow root. Its hosted payment fields keep literal colors: the payment provider styles them inside an iframe, which CSS custom properties can't reach.

## Setup

- No provider or wrapper is needed. Every token length is **px** at the browser's default font size;
  on a real page the components scale them with the reader's font-size setting through `--ia-unit`.
  `components/bundle.css` sets `html { font-size: 62.5% }`, because the class vocabulary's own rem
  values assume 1rem = 10px. It also sets border-box sizing and gives `body` the body type role.
- Page background `var(--ia-color-surface-page)`; cards and fields
  `var(--ia-color-surface-raised)`.
- **Dark chrome**: wrap dark areas (the topnav, footers) in `className="ia-inverse"`.
  Text, border and focus tokens re-point there automatically.

## Class vocabulary (BEM: `ia-block`, `ia-block__part`, `ia-block--variant`)

| Need | Classes |
| --- | --- |
| Button (only where a React component can't go, such as static HTML) | `ia-button` + `ia-button--primary` / `--secondary` / `--danger` / `--warning` / `--donate` (green, for donating) / `--ghost` (only a header's icon-and-label actions, Add Review, and icon-only controls) / `--link`; sizes `ia-button--sm` / `--lg`; `ia-button--icon` (square, icon-only, always with `aria-label`) + `--circle`; `ia-button--block` (full width); `ia-button--floating` (over media); `ia-button--stacked` (the item page's actions: an icon over the label, with `ia-button__long` + `ia-button__short` labels; `aria-pressed`, `aria-expanded` or `data-active` for the pressed look) |
| Segmented control (two to four options that fit) | `div.ia-segmented[role=radiogroup]` (`--sm`, `--block`) > `button.ia-segmented__option[role=radio][aria-checked]`; one tab stop, arrows move the choice |
| Switch (a setting that applies at once) | `button.ia-switch[role=switch][aria-checked]` > `span.ia-switch__track` + a label span (optional `ia-switch__description`) |
| Menu (commands, not a value) | `span.ia-menu-anchor` (`--end` at the end of a bar) > a trigger with `aria-haspopup="menu"` `aria-controls`, then `ul.ia-menu.ia-inverse[role=menu]` > `li[role=none]` > `.ia-menu__item[role=menuitem]` (or `menuitemradio` + `aria-checked`); `li.ia-menu__separator[role=separator]` |
| Tooltip (names an icon-only control) | `span.ia-tooltip-anchor` > the control + `span.ia-tooltip[aria-hidden=true]` (`--below`) |
| Carousel | `section.ia-carousel` > `ia-carousel__header` (heading + `ia-carousel__controls` with two `ia-button--ghost ia-button--icon ia-button--sm` buttons, `data-carousel="prev"` / `"next"`) + `ul.ia-carousel__viewport[tabindex=0]` > `li` per tile |
| Read more (long prose) | `ia-read-more` > `ia-read-more__body` + `button.ia-button--link.ia-read-more__toggle[aria-expanded]` |
| Banner | `ia-message ia-message--banner`, above the topnav (up to three stacked), edge to edge > `ia-message__icon` + `ia-message__body` + optional `button.ia-message__dismiss` |
| Environment badge (dev and staging only) | `span.ia-env-badge` with `data-env="development"` or `"staging"`, beside the topnav logo |
| Text field | `ia-field` > `ia-field__label` + `ia-field__hint` + `ia-input` (`ia-input--sm` / `--lg`) + `ia-field__error`; `ia-select`, `ia-textarea` |
| Checkbox / radio row | `label.ia-choice` > `input.ia-choice__control` + `ia-choice__label` + `ia-choice__count` |
| Search bar (prefer `IADropdownSearchBar`) | `form.ia-search-bar` (`--lg` on the homepage) > `select.ia-dropdown.ia-search-bar__type` + `ia-search-bar__field` > `ia-search-bar__input` + `ia-search-bar__clear`, then `ia-search-bar__submit` |
| Tabs | `ia-tabs` > `button.ia-tab[role=tab][aria-selected]` |
| Result tile | `ia-tile ia-tile--item` / `--collection` / `--account` / `--search` > `ia-tile__thumb` > `img.ia-tile__img` (a search: `ia-tile__search-well` with the `search` icon); `a.ia-tile__link` > `ia-tile__title`; then `ia-tile__creator` or `ia-tile__detail` (a sort's date, volume and issue, "Archivist since"), `ia-tile__snippet` (with `<mark>`); `ul.ia-tile__stats` > `li.ia-tile__stat` (collections: `ia-tile__meta`; searches: no footer); grid `ia-tile-grid` (fifty a page); `ia-tile__info` (the info button: touch only, it hides itself on hover-capable pointers), `ia-tile__meta-text`, `ia-tile__thumb--empty` (no image), `ia-tile__thumb--restricted` + `p.ia-tile__overlay` (blurred, with the reason). Hover pane: `ia-hover-pane[role=dialog]` > `ia-hover-pane__header` + `ia-hover-pane__body` holding a list row. List view: `ul.ia-tile-list` > `li.ia-tile-list__row` > `ia-tile-list__thumb`, `ia-tile-list__title-line` (`ia-tile-list__title` + `ia-tile-list__type[data-mediatype]`), `ia-tile-list__details` > `ia-tile-list__line` (`ia-tile-list__label`), `ia-tile-list__clamp`, `ia-tile-list__description`, `ia-tile-list__snippet`. Compact view: `ia-tile-compact[role=table]` > `ia-tile-compact__row[role=row]` (`--header` first) > cells: `ia-tile-compact__thumb`, `ia-tile-compact__title`, creator, date, `ia-tile-compact__type[data-mediatype]`, `ia-tile-compact__views`. Both views go inside `ia-facets__results` or `ia-results` |
| Sort bar | `ia-sort-bar` > `ia-sort-bar__sort` (`ia-sort-bar__direction[data-direction=asc\|desc]` with the `sort` icon, or `aria-disabled` for Relevance; `ia-sort-bar__label`, `select.ia-dropdown`) + `ia-segmented ia-segmented--sm` > `ia-segmented__option ia-sort-bar__view[role=radio]`. Title or Creator sorts add `ul.ia-alpha-bar` > `li` > `button[aria-pressed]` per letter (disabled with no results) after the bar |
| Facets | `ia-facets` (+ `ia-facets--opt-in` signed out) > `ia-facets__layout` > `aside.ia-facet-rail` > `ia-facet-rail__header` (`h2.ia-facet-rail__heading` > `button.ia-facets__toggle[aria-expanded]` + `ia-facet-rail__heading-text`; "Clear All Filters", a `mode="link"` `IAButton`, when anything is applied) + `ia-facet-rail__body` > `fieldset.ia-facet-group` > `legend.ia-facet-group__legend` (`button.ia-facet-group__toggle[aria-expanded]` + `ia-facet-group__title`, both "Media Type") + six `ia-facet-row`s, each `input.ia-choice__control` + `button.ia-facet-row__hide` (both `ia-facet-row__eye` and `ia-facet-row__eye-off` icons) + `label.ia-facet-row__label` > `ia-choice__label` + `ia-choice__count`; `ia-facets__results` beside it. Groups in order: Year Published (histogram), then Media Type, Year, Subject, Collection (labels are links), Creator, Language; collections add `section.ia-facet-group` "Part Of" > `ul.ia-facet-links`. Also `ia-facet-more` ("Show More Subjects", opens the "Select Filters" `ia-modal--lg` > `ia-more-facets`: `ia-more-facets__title`, `__controls` > `__control`, `ul.__chosen` > `li.__chip`, `__pages` > `__columns`), `ia-facet-range` (year inputs), `ia-facet-histogram` > `ia-facet-histogram__bar` (a static picture: prefer `IAHistogramDateRange`). No applied-filter chips. Narrow, the rail is an accordion above the results by itself — don't add a sheet or a "Show N Results" button |
| Topnav | first in the page, `a.ia-skip-link[href="#maincontent"]` ("Skip to Main Content", pointing at `main#maincontent[tabindex="-1"]`); then any site banners (`ia-message ia-message--banner`, up to three, above the topnav); then `header.ia-topnav.ia-inverse` > `ia-topnav__bar` > `ia-topnav__brand`, `ia-topnav__media`, `ia-topnav__search`, `ia-topnav__account` > `ia-topnav__link`. `ia-topnav__search` holds an `IADropdownSearchBar` (the short bar, type dropdown included). Leave `ia-topnav__search` out on the search results page and the homepage: their main content already has a search bar, and there is only ever one. The search page also drops the narrow-width search icon (`ia-topnav__icon-button`); the homepage keeps it. Then, after the bar, `nav.ia-topnav__subnav[aria-label="Site"]` > `ul` > `li` > `a.ia-topnav__subnav-link` (About, Blog, Events, Projects, Help, Donate + `donate` icon, Contact, Jobs, Volunteer); it hides itself at narrow widths. Parts: `img.ia-topnav__logo` in the brand, `ia-topnav__media-item` per media type, `ia-topnav__upload`, `ia-topnav__link ia-topnav__icon-button` on each narrow-width icon button (both classes: the link class sizes and colors it, the icon-button class shows it only at narrow widths; don't size it yourself), `ia-topnav__drawer` > `ia-topnav__drawer-item` (the narrow menu). While loading, `div.ia-activity-bar[role=progressbar][aria-label=Loading]` straight after the header. Footer: `footer.ia-footer.ia-inverse` > one link, "Terms of Service (last updated 12/31/2014)" — `--fixed` on the homepage, at the page's end on an item page, none elsewhere |
| Page layout | `ia-page`, `ia-container` (`--form` / `--prose`), `ia-shell` (+ `--task` on single-task pages) > `ia-shell__header` > `ia-shell__title` + `ia-shell__lede` + `ia-shell__actions`, then `ia-shell__section`s. Browse: `ia-masthead` > `ia-masthead__logo`; `h2.ia-results-heading[aria-live=polite]` (+ `ia-results-heading__scope`) above the sort bar; search: `ia-search-band` > `ia-search-band__inner` > `ia-search-band__title` + `__bar` + `__links` + `__actions`, and `section.ia-suggestions` (a carousel in a pale box); collection: `ia-collection-search` > an `ia-search-bar` without its type picker + `ia-collection-search__links`; no results: `ia-results-placeholder` > `ia-results-placeholder__title` + `__actions` + `__art` + `__details`. Record (the item page — patterns/item-page.md): `section.ia-record__theater.ia-inverse` > `ia-record__viewer` (full window, before the `ia-shell`; `ia-lending-bar` > `ia-lending-bar__status` + `ia-lending-bar__actions` with an `ia-split-button` over a lendable book), then in the `ia-shell`: `ia-record__peek` > `ia-record__type[data-mediatype]` (the media-type icon, 2xl) + `ia-record__heading` (`h1.ia-record__title.ia-type-display` + `ia-record__byline`) + `ia-record__actions` (`ia-button ia-button--stacked`, each with `ia-button__long` + `ia-button__short`; Flag opens `ia-flag-panel` > `ia-flag-panel__title` + `ia-menu__item[role=menuitemcheckbox]`, Add to List opens an `ia-menu`); `ia-record__body` > `ia-record__main` (`dl.ia-meta`, `ul.ia-record__alerts`, `ia-record__description.ia-type-prose`, `ia-read-more ia-read-more--list ia-record__all-metadata` holding the full `dl.ia-meta.ia-read-more__body`, `ia-record__reviews-icon` + `ia-record__reviews-head` (`h2.ia-record__reviews-title` + a ghost Add Review) + `ia-record__reviews-rule` + `ul.ia-reviews` > `li.ia-review` > `ia-review__title`, `ia-review__meta` > `ia-review__stars`, `ia-review__body`) + `aside.ia-record__sidebar` > `ia-record__box` (`--condensed`) boxes: `ul.ia-record__stats` (+ `ia-record__stream-only`), purchase, `ul.ia-downloads` > `li.ia-downloads__row` (`ia-downloads__format` with `ia-downloads__size` + `ia-downloads__pill`, or a caret; `ia-downloads__count`) + `ia-downloads__footer`, `ul.ia-record__collections`, `p.ia-record__uploader`; then `section.ia-record__similar.ia-carousel`. Not found: `ia-record-missing` > `ia-record-missing__error`. Profile (patterns/profile-page.md): `header.ia-profile-header.ia-inverse` > `ia-profile-header__inner` > `img.ia-avatar.ia-avatar--xl.ia-profile-header__avatar` + `ia-profile-header__summary` (`h1.ia-profile-header__name.ia-type-display` + `ia-profile-header__since` + `ia-profile-header__bio`) + `ia-profile-header__actions` (ghost `--sm` buttons, icon then label) + `ia-tabs` (eight `ia-tab`s; `ia-badge ia-badge--new` after a label; `ia-tab__long` + `ia-tab__short`); a loan tile adds `ia-tile__actions` > a danger `--sm` Return button. Settings (patterns/account-settings.md): `form.ia-settings` > `ia-settings__header` (`h1.ia-settings__title` + Cancel + Save Changes + `ia-settings__summary` holding an `ia-message`) + `section.ia-settings__section`s; `ia-settings__picture`; preferences `ia-pref-row` > `ia-pref-row__name` (`label` + `ia-pref-row__info`) + `ia-pref-row__control` + `p.ia-pref-row__desc`. Task: `ia-task-card` > `ia-task-card__head` (`img.ia-task-card__logo`, the mark, + title + the link to the other page), Google, "Email Me a Code", `ia-divider-text` (the "Or" rule), an error summary (`ia-message--danger[role=alert]`), fields; a password is `ia-password` > `input.ia-input` + `button.ia-password__toggle[aria-pressed]` |
| Other | `ia-card` (`--interactive` / `--media`), `ia-chip`, `ia-badge` (`--primary` / `--danger` / `--new`), `ia-avatar` (`--lg` / `--xl`), `ia-message` (`--success` / `--warning` / `--danger`) with `ia-message__icon`, `dialog.ia-modal` (`--sm` / `--lg`, `--danger`) > `header.ia-modal__header` (`ia-modal__title` + `button.ia-modal__close`) + `ia-modal__body` > `ia-modal__actions`, `ia-pagination` > `ia-pagination__number` + `ia-pagination__summary`, `ia-skeleton`, `ia-link` (`--prose` inside `ia-prose` text), `ia-icon` (`--sm` / `--lg` / `--xl` / `--2xl`; `iconSvg()` output carries it), `ia-focus-ring` (the focus ring on an element that isn't focusable itself), `ia-visually-hidden`. `ia-dropdown-preview` is documentation-only: don't use it |
| Type | `ia-type-display`, `ia-type-page-title`, `ia-type-section`, `ia-type-subsection`, `ia-type-body`, `ia-type-body-strong`, `ia-type-prose`, `ia-type-meta`, `ia-type-caption`, `ia-type-overline` |

Heading level follows document structure; the look comes from an `ia-type-*` class.

## Tokens for your own layout

Spacing is `var(--ia-space-N)` for N = 1, 2, 3, 4, 6, 8, 12, 16 only (N × 5px: 1=5px, 4=20px,
16=80px). There is no `space-5`, `space-10` or other step: an undefined token resolves to
nothing and the spacing silently disappears. `--ia-space-page-block` (80px, 40px below
768px) goes above and below a page; zero space is plain `0`.

Radius: `var(--ia-radius-default)` (4px, almost everything), `--ia-radius-sm` (2px),
`--ia-radius-lg` (8px, media cards), `--ia-radius-pill`, `--ia-radius-circle`. Shadow by job: `var(--ia-shadow-raised)`,
`--ia-shadow-hover`, `--ia-shadow-overlay`, `--ia-shadow-floating`. Borders:
`var(--ia-border-control)`, `--ia-border-card`, `--ia-border-divider`. Text
`var(--ia-color-text-primary)` / `--ia-color-text-secondary` / `--ia-color-text-link`,
`var(--ia-container-page)`. Media-type accents: `var(--ia-color-mediatype-texts)` and the
like.

- **Hover** on rows and non-filled controls is `background-image:
  linear-gradient(var(--ia-color-hover-overlay), var(--ia-color-hover-overlay))` — never a
  sunken fill, which vanishes on the sunken results area.
- **Selected** is one of two tiers: `--ia-color-selected-strong-fill` / `-strong-text` for
  a current page, applied filter or checked box; `--ia-color-selected-soft-fill` /
  `-soft-border` / `-soft-text` for one option chosen among neutral controls. A segmented
  control's chosen label and glyph stay ink, `--ia-color-text-primary`.
- **Messages** use `--ia-color-status-*` for the icon, `-subtle` for the fill, `-border`
  for the edge, and primary text.
- **Layering**: page chrome takes a `--ia-z-index-*` band; layers inside a component take
  `--ia-z-index-local-1…5` under `isolation: isolate`. Never a raw number.

Use these semantic color tokens, never `--ia-color-palette-*`: the palette is the raw
values behind them, and a design that uses it skips theming and the inverse re-pointing. A
white sheet is `--ia-color-surface-raised`; dark type on it is `--ia-color-text-primary`.

## Icons and logo

`window.IADesignSystem.iconSvg(name, { size: 'sm'|'md'|'lg'|'xl'|'2xl', label })` returns SVG
markup in `currentColor`. `iconNames` lists the set (e.g. `search`, `close`, `caret`, `eye`,
`eye-off`, `star`, `comment`, `movies`, `book`, `audio`, `collection`, `view-grid`). A
show-password toggle shows `eye` while the password is hidden and `eye-off` while it is shown. Pass `label` only
when the icon is a control's only name. `logoSvg({ part: 'logo'|'mark'|'wordmark',
colorway: 'white'|'dark' })` returns the logo: white on dark chrome.

```jsx
const Icon = ({ name, size }) =>
  <span dangerouslySetInnerHTML={{ __html: IADesignSystem.iconSvg(name, { size }) }} />;
```

## Copy

**Title Case** for headings, buttons, tabs, labels and nav items ("Show 42 More
Collections"). **Sentence case** for running text, help and errors.

## Where the truth lives

Read `guidelines/` before building. `guidelines/components/<component>.md` holds the
markup, states and accessibility rules for each component (`search-bar.md`, `item-tile.md`,
`facet-filter.md`…); `guidelines/foundations/` covers color, type, spacing and layout;
`guidelines/patterns/page-shells.md` the page layouts. `tokens.json` lists every token (compiled to `tokens.css`).

```jsx
const { IADropdownSearchBar } = window.IADesignSystem;

<div className="ia-topnav__search">
  <IADropdownSearchBar
    style={{ '--search-bar-width': '100%', '--search-bar-height': 'var(--ia-size-control-sm)', '--dropdownFontSize': 'var(--ia-font-size-md)', display: 'block', fontSize: 'var(--ia-font-size-lg)' }}
    categories={[{ id: 'all', label: 'All' }, { id: 'texts', label: 'Books/Documents' }]}
    query="buster keaton"
    onSearchRequested={e => console.log(e.detail.query, e.detail.category)}
  />
</div>
```

# IADesignSystem (ia-design-system@1.0.0)

This design system is the published ia-design-system React library, bundled as a single
browser global. All {{COUNT}} components are the real upstream code, built from {{SOURCE}}.

## Where things are

- `components/bundle.js` — the whole-DS bundle; loads every component to `window.IADesignSystem`. First line is a `/* @ds-bundle: … */` metadata header.
- `tokens.css` and `components/bundle.css` — the stylesheets: the tokens, then the component styles. Link both, in that order.
- `components/<Name>/README.md` (example JSX + variants), `components/<Name>/<Name>.d.ts` (types), `components/<Name>/preview.html` (variant grid).
- `tokens.json` — the tokens, names verbatim from upstream; `tokens.css` is compiled from it.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).
- `guidelines/` — the design system's own usage guidance (43 doc(s), see `guidelines/index.md`). Read these before composing larger layouts.

For a specific component, `read_file("components/<Name>/README.md")`.

## Loading

Add these three lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="components/bundle.js"></script>
```

Components are then available at `window.IADesignSystem.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { IAButton } = window.IADesignSystem;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<IAButton />);
```

## Tokens

223 CSS custom properties, from elements' `tokens/tokens.json`. `tokens.json` holds every
one with a family here; the font-family aliases, border shorthands, motion tokens and the inverse scope are at the top of
`components/bundle.css`.

- **blur** (1): `--ia-blur-scrim`
- **border** (4): `--ia-border-card`, `--ia-border-control`, `--ia-border-divider`, …
- **breakpoint** (4): `--ia-breakpoint-lg`, `--ia-breakpoint-md`, `--ia-breakpoint-sm`, …
- **color** (133): `--ia-color-action-danger-border`, `--ia-color-action-danger-fill`, `--ia-color-action-danger-text`, …
- **container** (5): `--ia-container-form`, `--ia-container-gutter`, `--ia-container-gutter-narrow`, …
- **font** (15): `--ia-font-line-height-normal`, `--ia-font-line-height-relaxed`, `--ia-font-line-height-tight`, …
- **motion** (13): `--ia-motion-duration-base`, `--ia-motion-duration-fast`, `--ia-motion-duration-instant`, …
- **radius** (5): `--ia-radius-circle`, `--ia-radius-default`, `--ia-radius-lg`, …
- **shadow** (6): `--ia-shadow-floating`, `--ia-shadow-focus-band`, `--ia-shadow-focus-band-inverse`, …
- **size** (14): `--ia-size-border-width`, `--ia-size-control-lg`, `--ia-size-control-md`, …
- **space** (10): `--ia-space-1`, `--ia-space-12`, `--ia-space-16`, …
- **z** (13): `--ia-z-index-dropdown`, `--ia-z-index-header`, `--ia-z-index-local-1`, …

## Components

### general
- `IAButton` — Button (ia-button) in primary, secondary, danger and other modes.
- `IAComboBox` — Combo box (ia-combo-box): a text field over a filtered list of options.
- `IADropdown` — Dropdown menu (ia-dropdown), as used for the sort field.
- `IADropdownSearchBar` — The site search bar (ia-dropdown-search-bar) with its search-type dropdown.
- `IAHistogramDateRange` — Date-range histogram (ia-histogram-date-range), the facets' year filter.
- `IAOtpForm` — One-time-code form (ia-otp-form) for email sign-in codes.
- `IAStatusIndicator` — Status indicator (ia-status-indicator) for loading, success and error.
- `IADonationThermometer` — The donation progress bar (ia-donation-thermometer) for fundraising banners.
- `IAClearableTextInput` — A text field (ia-clearable-text-input) with a clear button.
- `IAOtpInput` — The row of one-time-code boxes (ia-otp-input) on its own.
- `IAExpandableSearchBar` — A search field (ia-expandable-search-bar) with suggested searches beneath it.
- `IAWaybackSearchForm` — The Wayback Machine search form (ia-wayback-search-form) from the topnav's Wayback menu.
- `IAScrubberBar` — A media scrubber (ia-scrubber-bar) with optional section markers.
- `IAPlaybackControls` — Transport controls (ia-playback-controls): play and pause, skips, speed and volume.
- `IAWaveformProgress` — A waveform image (ia-waveform-progress) that fills in as audio plays.
- `IAFeatureFeedback` — The "Beta Feedback" button and vote prompt (ia-feature-feedback).
- `IATopnav` — The archive.org masthead (ia-topnav).
- `IAReviews` — An item's reviews (ia-reviews) and the form for writing one.
- `IATranscriptView` — A scrolling transcript (ia-transcript-view) that follows playback.
- `IARadioPlayer` — The TV and radio archive's audio player (ia-radio-player).
- `IADonationForm` — The donation form (ia-donation-form-controller), previewed over mock payment services.
- `IAModal` — The archive.org dialog (ia-modal-manager-template), drawn in place; open real ones through `IAModalManager`.
- `IAImageViewer` — A swipeable image carousel (ia-image-viewer).
- `IAItemNavigator` — The item page's theater frame (ia-item-navigator) with its side menu.
- `IABookActions` — The book lending bar (ia-book-actions), previewed over a mock lending service.
- `IAInfiniteScroller` — A virtualized grid (ia-infinite-scroller) for long result lists.
