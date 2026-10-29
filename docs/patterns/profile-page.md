# Profile page

A patron's page — `/details/@screenname` — as offshoot builds it: the browse shell
([page-shells.md](page-shells.md#2-browse--search-collection-landing-user-profile)) under
a navy header that holds the patron, their page's actions, and the tabs.

```
██████████████████████████████████████████████████████████████  navy band
██  (avatar)  brewster                              ↗ Share   ██
██            Archivist since 2001                  ⌘ RSS     ██
██            Digital Librarian, Internet Archive.  ▶ Play All██
██                                                  ✎ Edit    ██
██                                                  ⚙ Settings██
██  Uploads  Loans  Favorites  Lists NEW  Posts  Reviews  …   ██
██  ‾‾‾‾‾‾‾                                                   ██
──────────────────────────────────────────────────────────────
  4 Results
  Sort By: Date Archived                           ▦ ☰ ≡
  tile  tile  tile  tile
```

## Header

`header.ia-profile-header.ia-inverse`: `--ia-color-action-primary-fill` (navy) across the
window, content on the page width. Live's is `#194880`, the same navy.

| Part | Spec | Live |
| --- | --- | --- |
| Avatar | `.ia-avatar--xl` (100px), 64px below `md` — see [avatar](../components/avatar-badge.md#avatar) | up to 100px |
| Screen name | `<h1 class="ia-profile-header__name ia-type-display">` | 3.6rem / 200 |
| Since | `.ia-profile-header__since`, bold: "Archivist since 2001" for archivists, "Member since 2015" otherwise. Admins see the account's dates and status here instead | 500 weight |
| Bio | `.ia-profile-header__bio`, prose width; its links white and underlined | sanitized HTML |
| Actions | `.ia-profile-header__actions`: a column of ghost icon-and-label buttons — Share, Favorite (another patron's page), RSS, Play All, Edit and Settings (the owner's page), Manage Items (removing from Favorites). Below `md` they wrap into a row under the patron | `action-bar`, icons inverted white |
| Tabs | the strip sits in the band: tabs in `--ia-color-text-secondary` (inverse), the selected one white, bold, with a white bar | white text and underline on `#194880` |

Inside the band every text and border token is the inverse one. Links are white and
underlined, not the inverse link blue — `#9aa8ff` on the navy is 4.13:1, under 4.5. The
focus ring is `--ia-color-border-focus-inverse`.

## Tabs

Eight, in offshoot's order: **Uploads, Loans, Favorites, Lists, Posts, Reviews,
Collections, Web Archives**. Collections shows only when the patron has collections (or
edits some, on their own page); "Web Archives" reads "Web" below `md`
(`.ia-tab__long` / `.ia-tab__short`; the tab's `aria-label` keeps the full name).

They are a `role="tablist"` of buttons over one `tabpanel`, as live's `tab-manager`
builds them. Choosing one swaps the panel in place and updates the URL
(`/details/@brewster/loans`), so a tab can be linked to, bookmarked and reloaded —
see [tabs.md](../components/tabs.md#semantics). Arrow keys move between tabs.

A tab can call out something new with a badge after its label —
`<span class="ia-badge ia-badge--new" aria-hidden="true">New</span>`, the warning yellow —
and an `aria-label` that says so: "Lists, new feature". Live draws a yellow speech-bubble
callout above the tab with a shadow; the badge says the same in the strip.

## Panels

Each panel is the browse region — results heading, sort bar, results — over that tab's
items. The owner gets upload actions on Uploads, and Web Archives adds a "Save & Share"
link to the Wayback Machine in the sort bar. An empty tab says whose and what: "brewster
hasn't posted in the forums" ([empty-loading-error.md](empty-loading-error.md#elsewhere)).

### Loans

On the owner's page, Loans replaces the sort bar with the loan filter and a way to return
everything:

| Part | Spec | Live |
| --- | --- | --- |
| Filter | "Show:" and an [`.ia-dropdown`](../components/dropdown.md): On Loan, Waiting List, History | text links in `#767676` on desktop, an `ia-dropdown` on mobile |
| Return All | `.ia-button--danger.ia-button--sm`, at the bar's end, on the On Loan list when anything is on loan; "Returning…" while it works | a red sort-bar button |
| Return | each loan's tile gets a full-width `.ia-button--danger.ia-button--sm` along its foot (`.ia-tile__actions`), named "Return <title>" | `tile-action-btn`: a 2px red outline button flush with the card's foot |
| Confirm | both open an `.ia-modal--sm` first: "Return Item" — "Are you sure you want to return “<title>”?" — or "Return All Items" — "Are you sure you want to return all 2 loaned items?"; Cancel and a danger "Yes, return it" / "Yes, return all" | a `#194880` header-band modal with a red confirm |
| Failure | a modal titled "Return Failed" (or "Some Returns Failed") saying which | the same |

Each tile action sits above the tile link's hit area (`--ia-z-index-local-1`), so pressing
it doesn't open the item.

## Don't

- Don't make the tabs links to separate pages; they swap the panel and keep the URL in step.
- Don't use the inverse link blue on the navy band.
- Don't return a loan without asking.
