import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/elements/ia-button/ia-button-story';
import '@src/labs/ia-snow/ia-snow-story';
import '@src/elements/ia-combo-box/ia-combo-box-story';
import '@src/elements/ia-status-indicator/ia-status-indicator-story';

const ELEMENT_IDS = [
  'elem-ia-status-indicator',
  'elem-ia-combo-box',
  'elem-ia-snow',
  'elem-ia-button',
] as const;

@customElement('app-root')
export class AppRoot extends LitElement {
  createRenderRoot() {
    return this;
  }

  private _scrollHandler?: () => void;

  render() {
    return html`
      <nav id="ia-sidebar">
        <h2>Production-Ready</h2>
        <a href="#elem-ia-status-indicator">&lt;ia-status-indicator&gt;</a>
        <a href="#elem-ia-combo-box">&lt;ia-combo-box&gt;</a>
        <h2>Labs 🧪</h2>
        <a href="#elem-ia-snow">&lt;ia-snow&gt;</a>
        <a href="#elem-ia-button">&lt;ia-button&gt;</a>
      </nav>
      <div id="ia-content">
        <h1>Internet Archive Elements</h1>

        <h2>Production-Ready Elements</h2>

        <div id="elem-ia-status-indicator" class="ia-anchor">
          <ia-status-indicator-story></ia-status-indicator-story>
        </div>
        <div id="elem-ia-combo-box" class="ia-anchor">
          <ia-combo-box-story></ia-combo-box-story>
        </div>

        <h2>Labs Elements</h2>

        <div id="elem-ia-snow" class="ia-anchor">
          <ia-snow-story></ia-snow-story>
        </div>
        <div id="elem-ia-button" class="ia-anchor">
          <ia-button-story></ia-button-story>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const links = Object.fromEntries(
      ELEMENT_IDS.map(id => [id, this.querySelector(`#ia-sidebar a[href="#${id}"]`)])
    );

    const getAnchorTops = () =>
      ELEMENT_IDS.map(id => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : null;
      });

    const updateActive = () => {
      const tops = getAnchorTops();
      let current = 0;
      for (let i = 0; i < tops.length; i++) {
        if ((tops[i] ?? Infinity) <= window.scrollY + 40) current = i;
      }
      ELEMENT_IDS.forEach((id, i) => {
        links[id]?.classList.toggle('active', i === current);
      });
    };

    ELEMENT_IDS.forEach((id, i) => {
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
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
  }
}
