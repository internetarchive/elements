# Voice and content

A style guide that only covers pixels leaves the most-read part of the interface
undefined. These are the rules for interface text — labels, buttons, empty states,
errors. They are derived from what archive.org already sounds like at its best.

## Voice

The Internet Archive is a library. It sounds like a helpful librarian: **plain,
accurate, unhurried, never salesy**. It does not use exclamation marks to generate
enthusiasm, it does not call things "amazing", and it does not apologize excessively.

Live gets this mostly right — "Internet Archive is a non-profit library of millions of
free texts, movies, software, music, websites, and more." is a good sentence. Keep that
register.

## Capitalization

**Title Case for interface labels** — headings, buttons, links that act as buttons, tabs,
navigation and menu items, form labels, table headers, chips: "Search This Collection",
"Show 42 More Collections", "Sort By".

**Sentence case for running text** — descriptions, helper and error text, messages, empty
states, tooltips: "We couldn't load these results. Check your connection and try again."

In Title Case, articles, coordinating conjunctions and short prepositions stay lowercase
unless they come first or last: a, an, the, and, but, or, nor, for, of, in, on, to, by,
at, with, from. "Download Options", "Books by Language", "Sign Up for Free".
[D-44](../DECISIONS.md#d-44).

Exceptions:
- Proper nouns keep their own form: Wayback Machine, Open Library, Internet Archive,
  LibriVox.
- The `.ia-type-overline` section labels ("DOWNLOAD OPTIONS") are uppercased by CSS, not
  typed in caps. That keeps the accessible name readable and lets the treatment change
  in one place.

**One string per destination.** Live labels the same page "Sign up", "SIGN UP" and "Sign
up for free" in one navigation (ia-topnav's `login-button.ts` and `data/menus.ts`). Pick one — "Sign Up" — and use it everywhere that
destination is linked.

## Buttons

Buttons say what happens. Verb first, no ellipsis unless a second step genuinely follows.

| Instead of | Write |
| --- | --- |
| Submit | Create Account |
| OK | Save Changes |
| Yes / No (in a destructive dialog) | Delete Collection / Cancel |
| Click here | (the actual action) |
| More… | Show 42 More Collections |

The live "More…" button appears once per facet group on a search page
(collection-browser's `collection-facets.ts`), each expanding a different facet, all with
identical accessible names. Name the thing.

## Numbers and units

- Thousands separators on counts: `18,905 results`, not `18905`.
- Abbreviate large counts in tight spaces with one decimal: `230.2M`, `1.2K`. Spell them
  out in the accessible name: `aria-label="230.2 million views"`.
- File sizes in binary units with a space: `305.1 TB`, `1.7 PB`.
- Dates: `17 Sep 2026` in UI, ISO `2026-09-17` in metadata and `<time datetime>`.
  Relative dates ("3 days ago") only within the last week, and always with the absolute
  date in a `title`.

## Empty states

Three sentences at most: what is not here, why, what to do next.

> **No results for "buster keaton" in Texts.**
> Try removing a filter, or search across all media types.
> [Search all media types]

Never a bare "No results." An empty state is a place a user got stuck; it should contain
the way out.

## Errors

Say what happened, and what to do. Never blame the user, never expose a stack trace,
never say "invalid".

| Instead of | Write |
| --- | --- |
| Invalid email | Enter an email address that includes an @ |
| Error 500 | Something went wrong on our end. Try again in a moment. |
| Password does not meet requirements | Use at least 8 characters |
| Login failed | We couldn't find an account with that email and password |

Field errors sit below the field, in `--ia-color-status-danger`, with an icon, and are
wired to the input with `aria-describedby`. Color is never the only signal.

## Loading

Say what is loading if it takes more than about a second. "Loading search results…"
beats a bare spinner, and it gives screen readers something to announce in an
`aria-live="polite"` region.

Prefer skeleton placeholders that match the shape of the content for grids and lists —
they prevent the layout shift that a spinner-then-content swap causes.

## Truncation

Truncate with CSS, never in the data. The full string stays in the DOM so it is
available to search, to screen readers, and on copy. Clamp with `-webkit-line-clamp`,
not a fixed height.

If a truncated string is a link, its accessible name is the full string.

## Terms to keep consistent

| Use | Not |
| --- | --- |
| item | record, object, entry |
| collection | archive (when you mean a collection) |
| screen name | username, handle, nickname |
| borrow | check out, loan (as a verb) |
| Wayback Machine | the wayback machine, WBM |
| log in (verb) / login (noun) | signin, sign-in |
| sign up (verb) / signup (noun) | register, create account (as the nav label) |

Live currently uses "Sign up", "SIGN UP" and "Sign up for free" for the same
destination, and "Log in" alongside "LOG IN". Pick one string per destination.
