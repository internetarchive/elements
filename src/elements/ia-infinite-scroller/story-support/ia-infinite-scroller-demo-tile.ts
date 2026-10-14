import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

/**
 * A simple outlined tile for the infinite scroller demo. The `design`
 * attribute picks the accent color.
 */
@customElement('ia-infinite-scroller-demo-tile')
export class IAInfiniteScrollerDemoTile extends LitElement {
  @property({ type: String, reflect: true }) design: '1' | '2' = '1';

  render() {
    return html`
      <h1>Tile ${this.design}</h1>
      <h2><slot></slot></h2>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        --tile-color: #8a4fc7;
        display: block;
        box-sizing: border-box;
        outline: 1px solid var(--tile-color);
        height: 100%;
        padding: 0.5rem;
        color: var(--tile-color);
      }

      :host([design='2']) {
        --tile-color: #c9722a;
      }

      h1,
      h2 {
        margin: 0;
      }
    `;
  }
}

/**
 * The tile shown in a cell before its content has loaded.
 */
@customElement('ia-infinite-scroller-demo-placeholder')
export class IAInfiniteScrollerDemoPlaceholder extends LitElement {
  render() {
    return html`<h1>...</h1>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        outline: 1px solid #aaa;
        height: 100%;
        color: #aaa;
      }

      h1 {
        margin: 0;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-infinite-scroller-demo-tile': IAInfiniteScrollerDemoTile;
    'ia-infinite-scroller-demo-placeholder': IAInfiniteScrollerDemoPlaceholder;
  }
}
