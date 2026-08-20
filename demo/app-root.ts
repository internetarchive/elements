import { html, LitElement, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
// unsafeHTML is needed to render dynamic custom-element tag names;
// Lit's html`` tag cannot render variable tag names directly.
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Globbed without `eager`, so the keys give us the full element list at build
// time while each module is only fetched when its story is displayed.
const storyLoaders = import.meta.glob([
  '../src/elements/**/*-story.ts',
  '../src/labs/**/*-story.ts',
]);

// Prefix for both the anchor ids and the URL hash, e.g. `#elem-ia-button`.
const HASH_PREFIX = 'elem-';

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
  if (!hash.startsWith(`#${HASH_PREFIX}`)) return undefined;
  const tag = hash.slice(HASH_PREFIX.length + 1);
  return storyEntries.find((e) => e.tag === tag);
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
    // The hash can move while this element is detached.
    this._focused = entryFromHash(window.location.hash);
    window.addEventListener('hashchange', this._onHashChange, {
      signal: this._abortController.signal,
    });
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
        <h1>Internet Archive Elements</h1>
        ${this._focused
          ? this._renderFocused(this._focused)
          : this._renderAll()}
      </div>
    `;
  }

  private _renderSidebar() {
    const activeTag = this._focused ? this._focused.tag : this._activeTag;
    const link = (entry: StoryEntry) => html`
      <a
        href="#${entry.id}"
        class="${entry.tag === activeTag ? 'active' : ''}"
        aria-current="${entry.tag === activeTag ? 'page' : 'false'}"
        >&lt;${entry.tag}&gt;</a
      >
    `;

    return html`
      <nav id="ia-sidebar">
        <a id="ia-all-link" href="#">All elements</a>
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
