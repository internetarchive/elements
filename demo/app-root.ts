import { html, LitElement, type TemplateResult } from 'lit';
import { query, state } from 'lit/decorators.js';
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
 * The width at or below which the sidebar starts hidden. The sidebar is a
 * fixed 200px, so on a phone it takes most of the page and leaves too little
 * room to look at an element in. Exported so the tests can pin the query
 * rather than guess at the width the test browser gives them.
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

  /** Whether the viewport is narrow enough for the sidebar to be in the way. */
  @state() private _narrow = isNarrowViewport();

  /** Whether the sidebar is showing. The viewport picks the opening state. */
  @state() private _navOpen = !isNarrowViewport();

  @query('#ia-nav-toggle') private _navToggle?: HTMLButtonElement;

  @query('#ia-sidebar') private _sidebar?: HTMLElement;

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

  /**
   * Closes the nav once a link in it has been followed, but only where it was
   * covering the page to begin with. On a phone the sidebar and the element
   * being looked at compete for the same width, so leaving it up after a pick
   * lands you back where you started.
   */
  private _onSidebarClick = (event: Event) => {
    if (!this._narrow) return;
    const target = event.target;
    if (!(target instanceof Element) || !target.closest('a')) return;
    this._closeNav();
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
    return html`
      ${this._renderSidebar()}
      <div id="ia-content" class="${this._focused ? 'ia-focused' : ''}">
        <div id="ia-content-header">
          <button
            id="ia-nav-toggle"
            type="button"
            aria-expanded="${this._navOpen}"
            aria-controls="ia-sidebar"
            @click="${this._toggleNav}"
          >
            ${this._navOpen ? 'Hide nav' : 'Show nav'}
          </button>
          <h1>Internet Archive Elements</h1>
        </div>
        ${this._focused
          ? this._renderFocused(this._focused)
          : this._renderAll()}
      </div>
    `;
  }

  private _renderSidebar() {
    const showingAll = !this._focused;
    const activeTag = this._focused ? this._focused.tag : this._activeTag;
    // The sidebar marks two different things, so they get different names and
    // different styling: `current` is the element the view is actually
    // showing, `in-view` is only where the all-elements list is scrolled to.
    const [markClass, markAria] = showingAll
      ? ['in-view', 'location']
      : ['current', 'page'];
    const link = (entry: StoryEntry) => {
      const marked = entry.tag === activeTag;
      return html`
        <a
          href="#${entry.id}"
          class="ia-elem-link ${marked ? markClass : ''}"
          aria-current="${marked ? markAria : 'false'}"
          >&lt;${entry.tag}&gt;</a
        >
      `;
    };

    return html`
      <nav
        id="ia-sidebar"
        ?hidden="${!this._navOpen}"
        @click="${this._onSidebarClick}"
      >
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
