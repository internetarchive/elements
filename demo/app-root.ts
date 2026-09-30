import { html, LitElement, nothing, type TemplateResult } from 'lit';
import { query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from '@src/util/custom-element';
// unsafeHTML is needed to render dynamic custom-element tag names;
// Lit's html`` tag cannot render variable tag names directly.
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { HASH_PREFIX, tagFromHash } from './element-hash';

// Globbed without `eager`, so the keys give us the full element list at build
// time while each module is only fetched when its story is displayed.
const storyLoaders = import.meta.glob([
  '../src/elements/**/*-story.ts',
  '../src/labs/**/*-story.ts',
]);

interface StoryEntry {
  /** The component's tag name, e.g. `ia-button`. */
  tag: string;
  /** The story wrapper's tag name, e.g. `ia-button-story`. */
  storyTag: string;
  /** Anchor id and hash fragment, e.g. `elem-ia-button`. */
  id: string;
  labs: boolean;
  load: () => Promise<unknown>;
}

type LoadState = 'loading' | 'loaded' | 'error';

const storyEntries: StoryEntry[] = Object.keys(storyLoaders)
  .map((path) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1]; // e.g. "ia-button-story.ts"
    const tag = filename.replace(/-story\.ts$/, '');
    return {
      tag,
      storyTag: `${tag}-story`,
      id: `${HASH_PREFIX}${tag}`,
      labs: path.includes('/src/labs/'),
      load: storyLoaders[path],
    };
  })
  .sort((a, b) => a.tag.localeCompare(b.tag));

const productionEntries = storyEntries.filter((e) => !e.labs);
const labsEntries = storyEntries.filter((e) => e.labs);
// Document order in the all-elements view, which the scroll spy relies on.
const ALL_ENTRIES = [...productionEntries, ...labsEntries];

/**
 * Resolves a URL hash to the element it focuses, or null for the
 * all-elements view. Hashes naming an unknown element also fall back to the
 * all-elements view, so links to renamed or removed elements still land
 * somewhere useful.
 */
function entryFromHash(hash: string): StoryEntry | undefined {
  const tag = tagFromHash(hash);
  return storyEntries.find((e) => e.tag === tag);
}

/**
 * The width at or below which the demo switches to its phone layout. The
 * sidebar is a fixed 200px, which on a phone leaves too little room to look at
 * an element in, so the phone layout drops it for one element per screen and
 * a bar along the bottom to step between them. Exported so the tests can pin
 * the query rather than guess at the width the test browser gives them.
 */
export const NARROW_VIEWPORT = '(max-width: 640px)';

function isNarrowViewport(): boolean {
  return window.matchMedia(NARROW_VIEWPORT).matches;
}

@customElement('app-root')
export class AppRoot extends LitElement {
  createRenderRoot() {
    return this;
  }

  /** The element the URL focuses, or undefined to show all of them. */
  @state() private _focused = entryFromHash(window.location.hash);

  /** Sidebar highlight in the all-elements view, driven by scroll position. */
  @state() private _activeTag?: string;

  /** Whether the viewport calls for the phone layout. */
  @state() private _narrow = isNarrowViewport();

  /** Whether the sidebar is showing. The viewport picks the opening state. */
  @state() private _navOpen = !isNarrowViewport();

  /** Whether the phone layout's element picker is open. */
  @state() private _pickerOpen = false;

  /** What the picker's search field is narrowing its list to. */
  @state() private _pickerFilter = '';

  @query('#ia-nav-toggle') private _navToggle?: HTMLButtonElement;

  @query('#ia-sidebar') private _sidebar?: HTMLElement;

  @query('#ia-picker') private _picker?: HTMLDialogElement;

  @query('#ia-bar-name') private _barName?: HTMLButtonElement;

  // Set once the toggle has been used, which is what stops a viewport change
  // from overruling the choice. Plain field: nothing renders off it.
  private _navPinned = false;

  // Plain map rather than reactive state: Lit doesn't observe mutation, so
  // _loadStory requests its own update once a module settles.
  private _loadStates = new Map<string, LoadState>();

  private _observer?: IntersectionObserver;
  private _abortController?: AbortController;

  connectedCallback() {
    super.connectedCallback();
    // Built per connection, since aborting on disconnect spends the controller
    // and its signal is what holds the listener open.
    this._abortController = new AbortController();
    const { signal } = this._abortController;
    // The hash can move while this element is detached.
    this._focused = entryFromHash(window.location.hash);
    window.addEventListener('hashchange', this._onHashChange, { signal });
    // So can the viewport, and its width is what picks the nav's default.
    const narrowQuery = window.matchMedia(NARROW_VIEWPORT);
    narrowQuery.addEventListener('change', this._onNarrowChange, { signal });
    this._applyNarrow(narrowQuery.matches);
    // A phone gets one element per screen, so arriving with no hash lands on
    // the first element rather than on all of them. The hash is written back
    // so the URL names what's showing and can be passed on as it is.
    if (narrowQuery.matches && !window.location.hash) this._focusFirstEntry();
    // updated() owns the scroll spy, and disconnecting tore it down. An
    // unchanged hash resolves to the same StoryEntry object, so the assignment
    // above requests no update on its own, which would leave the spy dead.
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._disconnectScrollSpy();
    this._abortController?.abort();
  }

  private _onHashChange = () => {
    const focused = entryFromHash(window.location.hash);
    if (focused === this._focused) return;
    this._focused = focused;
    // Cleared alongside _focused so both land in a single render: whichever
    // view we arrive at, the old scroll-driven highlight no longer applies.
    this._activeTag = undefined;
    // The browser's own anchor jump ran before this view existed, so put the
    // new one at the top of the page rather than wherever the last scroll left it.
    window.scrollTo({ top: 0 });
  };

  private _onNarrowChange = (event: MediaQueryListEvent) => {
    this._applyNarrow(event.matches);
  };

  /**
   * Takes the viewport width as the nav's default: wide enough and it starts
   * up, since that is where it earns its space, narrow and it starts hidden.
   * Someone who has worked the toggle keeps whatever they picked, so dragging
   * a window across the breakpoint doesn't undo it.
   */
  private _applyNarrow(narrow: boolean) {
    this._narrow = narrow;
    // The picker only exists in the phone layout, and leaving it takes the
    // open dialog out of the page with it.
    if (!narrow) {
      this._pickerOpen = false;
      this._pickerFilter = '';
    }
    if (this._navPinned) return;
    if (narrow) this._closeNav();
    else this._navOpen = true;
  }

  /**
   * The one way the nav closes, so every route to it lands focus somewhere
   * that still exists. The sidebar goes `display: none`, which would drop
   * focus to the body if it were sitting on a link in there.
   */
  private _closeNav() {
    this._navOpen = false;
    if (this._sidebar?.contains(document.activeElement)) {
      this._navToggle?.focus();
    }
  }

  private _toggleNav = () => {
    if (this._navOpen) this._closeNav();
    else this._navOpen = true;
    this._navPinned = true;
  };

  private _focusFirstEntry() {
    const first = ALL_ENTRIES[0];
    if (!first) return;
    this._focused = first;
    window.history.replaceState(null, '', `#${first.id}`);
  }

  /**
   * The element the phone layout's arrows would step to. From the
   * all-elements view there's nothing to step back from, so the only way on
   * is to the first element. The ends don't wrap: the name in the middle
   * already says where you are.
   */
  private _neighbour(offset: 1 | -1): StoryEntry | undefined {
    if (!this._focused) return offset > 0 ? ALL_ENTRIES[0] : undefined;
    return ALL_ENTRIES[ALL_ENTRIES.indexOf(this._focused) + offset];
  }

  /** Moves through the hash, so every step leaves a URL that can be shared. */
  private _step(offset: 1 | -1) {
    const target = this._neighbour(offset);
    if (target) window.location.hash = target.id;
  }

  private _stepBack = () => this._step(-1);

  private _stepForward = () => this._step(1);

  private _openPicker = () => {
    const picker = this._picker;
    if (!picker || picker.open) return;
    this._pickerOpen = true;
    picker.showModal();
    // Onto the entry for where you are rather than the search field, which
    // would bring the keyboard up over a list that already fits the screen.
    // The scroll-spy's position wins over "Show all elements", since in the
    // all-elements view it's the more useful place to start from.
    const current =
      picker.querySelector<HTMLElement>('[aria-current="location"]') ??
      picker.querySelector<HTMLElement>('[aria-current="page"]');
    current?.focus();
  };

  private _closePicker = () => {
    this._picker?.close();
  };

  /**
   * Every way the picker closes ends here, whether that's the close button,
   * Escape, a tap outside the sheet or a pick, so each one hands focus back
   * to the button that opened it.
   */
  private _onPickerClose = () => {
    this._pickerOpen = false;
    this._pickerFilter = '';
    this._barName?.focus();
  };

  private _onPickerClick = (event: MouseEvent) => {
    const target = event.target;
    // A tap on the backdrop is dispatched to the dialog itself, while a tap
    // anywhere on the sheet lands on something inside it.
    if (target === this._picker) {
      this._closePicker();
      return;
    }
    // A pick closes the sheet and leaves the link to change the hash.
    if (target instanceof Element && target.closest('a')) this._closePicker();
  };

  private _onPickerFilter = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this._pickerFilter = event.target.value;
    }
  };

  willUpdate() {
    const needed = this._focused ? [this._focused] : ALL_ENTRIES;
    needed.forEach((entry) => this._loadStory(entry));
  }

  updated() {
    if (this._focused) this._disconnectScrollSpy();
    else this._setUpScrollSpy();
  }

  private async _loadStory(entry: StoryEntry) {
    if (this._loadStates.has(entry.tag)) return;
    this._loadStates.set(entry.tag, 'loading');
    try {
      await entry.load();
      this._loadStates.set(entry.tag, 'loaded');
    } catch (err) {
      console.error(`Could not load the story for <${entry.tag}>`, err);
      this._loadStates.set(entry.tag, 'error');
    }
    this.requestUpdate();
  }

  /**
   * Highlights the sidebar link for whichever anchor sits nearest the top of
   * the viewport. Only meaningful when every element is on the page.
   */
  private _setUpScrollSpy() {
    if (this._observer) return;

    const visibleIds = new Set<string>();
    this._observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        }
        // Only anchors in the top 30% of the viewport count as "active".
        // The first (topmost) visible anchor wins.
        const active = ALL_ENTRIES.find((e) => visibleIds.has(e.id));
        this._activeTag = (active ?? ALL_ENTRIES[0])?.tag;
      },
      { rootMargin: '0px 0px -70% 0px' },
    );

    for (const entry of ALL_ENTRIES) {
      const el = this.querySelector(`#${entry.id}`);
      if (el) this._observer.observe(el);
    }
  }

  // Called from updated(), so it deliberately touches no reactive state.
  private _disconnectScrollSpy() {
    this._observer?.disconnect();
    this._observer = undefined;
  }

  render() {
    const contentClasses = {
      'ia-focused': !!this._focused,
      'ia-narrow': this._narrow,
    };
    // In the phone layout the bar comes first in the DOM, though it's pinned
    // to the bottom of the screen, so the tab order runs from it into the page.
    return html`
      ${this._narrow ? this._renderBar() : this._renderSidebar()}
      <div id="ia-content" class=${classMap(contentClasses)}>
        <div id="ia-content-header">
          ${this._narrow ? nothing : this._renderNavToggle()}
          <h1>Internet Archive Elements</h1>
        </div>
        ${this._focused
          ? this._renderFocused(this._focused)
          : this._renderAll()}
      </div>
      ${this._narrow ? this._renderPicker() : nothing}
    `;
  }

  private _renderNavToggle(): TemplateResult {
    return html`
      <button
        id="ia-nav-toggle"
        type="button"
        aria-expanded="${this._navOpen}"
        aria-controls="ia-sidebar"
        @click="${this._toggleNav}"
      >
        ${this._navOpen ? 'Hide nav' : 'Show nav'}
      </button>
    `;
  }

  /**
   * A link to one element, for the sidebar or the picker. They mark two
   * different things, so the two get different names and different styling:
   * `current` is the element the view is actually showing, `in-view` is only
   * where the all-elements list is scrolled to.
   */
  private _renderEntryLink(entry: StoryEntry, className: string) {
    const showingAll = !this._focused;
    const activeTag = this._focused ? this._focused.tag : this._activeTag;
    const [markClass, markAria] = showingAll
      ? ['in-view', 'location']
      : ['current', 'page'];
    const marked = entry.tag === activeTag;
    return html`
      <a
        href="#${entry.id}"
        class="${className} ${marked ? markClass : ''}"
        aria-current="${marked ? markAria : 'false'}"
        >&lt;${entry.tag}&gt;</a
      >
    `;
  }

  private _renderSidebar() {
    const showingAll = !this._focused;
    const link = (entry: StoryEntry) =>
      this._renderEntryLink(entry, 'ia-elem-link');

    return html`
      <nav id="ia-sidebar" ?hidden="${!this._navOpen}">
        <a
          id="ia-all-link"
          href="#"
          class="${showingAll ? 'current' : ''}"
          aria-current="${showingAll ? 'page' : 'false'}"
          >Show All Elements</a
        >
        <h2>Production-Ready</h2>
        ${productionEntries.map(link)}
        <h2>Labs 🧪</h2>
        ${labsEntries.map(link)}
      </nav>
    `;
  }

  /**
   * The phone layout's way around: step to the element either side, or tap
   * the name in the middle for the full list. Along the bottom of the screen
   * where a thumb reaches it, and there at any scroll position.
   */
  private _renderBar(): TemplateResult {
    const back = this._neighbour(-1);
    const forward = this._neighbour(1);
    const current = this._focused?.tag ?? 'all elements';
    // aria-disabled rather than disabled, so an arrow that has just reached
    // the end keeps the focus it was pressed with instead of dropping it.
    return html`
      <nav id="ia-bar" aria-label="Elements">
        <button
          id="ia-bar-prev"
          class="ia-bar-step"
          type="button"
          aria-label="${back
            ? `Previous element: ${back.tag}`
            : 'Previous element'}"
          aria-disabled="${back ? 'false' : 'true'}"
          @click="${this._stepBack}"
        >
          ‹
        </button>
        <button
          id="ia-bar-name"
          type="button"
          aria-label="Choose element, current: ${current}"
          aria-haspopup="dialog"
          aria-expanded="${this._pickerOpen}"
          aria-controls="ia-picker"
          @click="${this._openPicker}"
        >
          <span class="ia-bar-tag"
            >${this._focused ? `<${this._focused.tag}>` : 'All elements'}</span
          >
          <span aria-hidden="true">▾</span>
        </button>
        <button
          id="ia-bar-next"
          class="ia-bar-step"
          type="button"
          aria-label="${forward
            ? `Next element: ${forward.tag}`
            : 'Next element'}"
          aria-disabled="${forward ? 'false' : 'true'}"
          @click="${this._stepForward}"
        >
          ›
        </button>
      </nav>
    `;
  }

  /**
   * The full list for the phone layout, as a sheet up from the bottom. A
   * modal dialog, so the browser keeps focus and taps inside it while it's
   * open and closes it on Escape.
   */
  private _renderPicker(): TemplateResult {
    const filter = this._pickerFilter.trim().toLowerCase();
    const matches = (entry: StoryEntry) => entry.tag.includes(filter);
    const production = productionEntries.filter(matches);
    const labs = labsEntries.filter(matches);
    const showingAll = !this._focused;
    const group = (heading: string, entries: StoryEntry[]) =>
      entries.length
        ? html`
            <h3>${heading}</h3>
            ${entries.map((entry) => this._renderEntryLink(entry, 'ia-pick'))}
          `
        : nothing;

    return html`
      <dialog
        id="ia-picker"
        aria-labelledby="ia-picker-title"
        @close="${this._onPickerClose}"
        @click="${this._onPickerClick}"
      >
        <div class="ia-picker-sheet">
          <div class="ia-picker-head">
            <h2 id="ia-picker-title">Elements</h2>
            <button
              id="ia-picker-close"
              type="button"
              aria-label="Close"
              @click="${this._closePicker}"
            >
              ✕
            </button>
          </div>
          <input
            id="ia-picker-search"
            type="search"
            placeholder="Filter by tag"
            aria-label="Filter elements by tag"
            autocomplete="off"
            autocapitalize="none"
            spellcheck="false"
            .value="${this._pickerFilter}"
            @input="${this._onPickerFilter}"
          />
          <div class="ia-picker-list">
            <a
              href="#"
              class="ia-pick ia-pick-all ${showingAll ? 'current' : ''}"
              aria-current="${showingAll ? 'page' : 'false'}"
              >Show all elements</a
            >
            ${group('Production-Ready', production)} ${group('Labs 🧪', labs)}
            ${production.length + labs.length === 0
              ? html`<p class="ia-picker-empty">No elements match.</p>`
              : nothing}
          </div>
        </div>
      </dialog>
    `;
  }

  private _renderFocused(entry: StoryEntry): TemplateResult {
    return html`
      <h2>${entry.labs ? 'Labs Element' : 'Production-Ready Element'}</h2>
      ${this._renderStory(entry)}
    `;
  }

  private _renderAll(): TemplateResult {
    return html`
      <h2>Production-Ready Elements</h2>
      ${productionEntries.map((e) => this._renderStory(e))}
      <h2>Labs Elements</h2>
      ${labsEntries.map((e) => this._renderStory(e))}
    `;
  }

  private _renderStory(entry: StoryEntry): TemplateResult {
    const loadState = this._loadStates.get(entry.tag);

    let contents;
    if (loadState === 'loaded') {
      contents = unsafeHTML(`<${entry.storyTag}></${entry.storyTag}>`);
    } else if (loadState === 'error') {
      contents = html`
        <p class="ia-story-message">
          Could not load &lt;${entry.tag}&gt;. Check the console for details.
        </p>
      `;
    } else {
      contents = html`
        <p class="ia-story-message">Loading &lt;${entry.tag}&gt;…</p>
      `;
    }

    return html`<div id="${entry.id}" class="ia-anchor">${contents}</div>`;
  }
}
