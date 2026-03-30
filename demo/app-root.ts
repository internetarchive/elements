import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
// unsafeHTML is needed to render dynamic custom-element tag names;
// Lit's html`` tag cannot render variable tag names directly.
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const storyModules = import.meta.glob(
  ['../src/elements/**/*-story.ts', '../src/labs/**/*-story.ts'],
  { eager: true }
);

const storyEntries = Object.keys(storyModules)
  .map(path => {
    const labs = path.includes('/src/labs/');
    const parts = path.split('/');
    const filename = parts[parts.length - 1]; // e.g. "ia-button-story.ts"
    const tag = filename.replace(/-story\.ts$/, '');
    return { tag, storyTag: `${tag}-story`, id: `elem-${tag}`, labs };
  })
  .sort((a, b) => a.tag.localeCompare(b.tag));

const productionEntries = storyEntries.filter(e => !e.labs);
const labsEntries = storyEntries.filter(e => e.labs);
const ALL_ENTRIES = [...productionEntries, ...labsEntries];

@customElement('app-root')
export class AppRoot extends LitElement {
  createRenderRoot() { return this; }

  private _observer?: IntersectionObserver;
  private _abortController = new AbortController();

  render() {
    return html`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        ${productionEntries.map(e => html`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
        <h2>Labs 🧪</h2>
        ${labsEntries.map(e => html`<a href="#${e.id}">&lt;${e.tag}&gt;</a>`)}
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>
        <h2>Production-Ready Elements</h2>
        ${productionEntries.map(e => html`
          <div id="${e.id}" class="ia-anchor">
            ${unsafeHTML(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
        <h2>Labs Elements</h2>
        ${labsEntries.map(e => html`
          <div id="${e.id}" class="ia-anchor">
            ${unsafeHTML(`<${e.storyTag}></${e.storyTag}>`)}
          </div>
        `)}
      </div>
    `;
  }

  firstUpdated() {
    const allIds = ALL_ENTRIES.map(e => e.id);

    const links = Object.fromEntries(
      allIds.map(id => [id, this.querySelector(`#ia-sidebar a[href="#${id}"]`)])
    );

    const visible = new Set<string>();

    // Only anchors in the top 30% of the viewport count as "active".
    // The first (topmost) visible anchor wins.
    this._observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const activeId = allIds.find(id => visible.has(id)) ?? allIds[0];
        allIds.forEach(id => links[id]?.classList.toggle('active', id === activeId));
      },
      { rootMargin: '0px 0px -70% 0px' },
    );

    allIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) this._observer!.observe(el);
    });

    allIds.forEach(id => {
      links[id]?.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: Math.max(0, top - 16), behavior: 'smooth' });
        }
      }, { signal: this._abortController.signal });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
    this._abortController.abort();
  }
}
