import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const storyModules = import.meta.glob(
  ['../src/elements/**/*-story.ts', '../src/labs/**/*-story.ts'],
  { eager: true }
);

const storyEntries = Object.keys(storyModules)
  .map(path => {
    const labs = path.includes('/src/labs/');
    const tag = path.split('/').at(-2)!;
    return { tag, storyTag: `${tag}-story`, id: `elem-${tag}`, labs };
  })
  .sort((a, b) => a.tag.localeCompare(b.tag));

const productionEntries = storyEntries.filter(e => !e.labs);
const labsEntries       = storyEntries.filter(e => e.labs);
const ALL_ENTRIES       = [...productionEntries, ...labsEntries];

@customElement('app-root')
export class AppRoot extends LitElement {
  createRenderRoot() { return this; }

  private _scrollHandler?: () => void;

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

    const getAnchorTops = () =>
      allIds.map(id => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : null;
      });

    const updateActive = () => {
      const tops = getAnchorTops();
      let current = 0;
      for (let i = 0; i < tops.length; i++) {
        if ((tops[i] ?? Infinity) <= window.scrollY + 40) current = i;
      }
      allIds.forEach((id, i) => {
        links[id]?.classList.toggle('active', i === current);
      });
    };

    allIds.forEach((id, i) => {
      links[id]?.addEventListener('click', e => {
        e.preventDefault();
        const top = getAnchorTops()[i];
        if (top !== null) window.scrollTo({ top: Math.max(0, top - 16), behavior: 'smooth' });
      });
    });

    this._scrollHandler = updateActive;
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._scrollHandler) window.removeEventListener('scroll', this._scrollHandler);
  }
}
