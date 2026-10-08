import {
  css,
  html,
  LitElement,
  type CSSResultGroup,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { property, query } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';

import type { PropInputSettings } from '@demo/story-components/story-prop-settings';
import type { StyleInputSettings } from '@demo/story-components/story-styles-settings';
import type {
  IAInfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from './ia-infinite-scroller';

import './ia-infinite-scroller';
import './story-support/ia-infinite-scroller-demo-tile';
import '@demo/story-template';

const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Cell min width',
    cssVariable: '--infiniteScrollerCellMinWidth',
    defaultValue: '16rem',
    inputType: 'text',
  },
  {
    label: 'Cell min height',
    cssVariable: '--infiniteScrollerCellMinHeight',
    defaultValue: '8rem',
    inputType: 'text',
  },
  {
    label: 'Cell max height',
    cssVariable: '--infiniteScrollerCellMaxHeight',
    defaultValue: 'none',
    inputType: 'text',
  },
  {
    label: 'Row gap',
    cssVariable: '--infiniteScrollerRowGap',
    defaultValue: '1.7rem',
    inputType: 'text',
  },
  {
    label: 'Column gap',
    cssVariable: '--infiniteScrollerColGap',
    defaultValue: '1.7rem',
    inputType: 'text',
  },
];

const propInputSettings: PropInputSettings<IAInfiniteScrollerDemo>[] = [
  {
    label: 'Item count',
    propertyName: 'itemCount',
    defaultValue: 200,
    inputType: 'number',
  },
  {
    label: 'Estimated cell height',
    propertyName: 'estimatedCellHeight',
    defaultValue: 128,
    inputType: 'number',
  },
  {
    label: 'Min buffer margin cells',
    propertyName: 'minBufferMarginCells',
    defaultValue: 10,
    inputType: 'number',
  },
  {
    label: 'Max buffered cells',
    propertyName: 'maxBufferedCells',
    defaultValue: 500,
    inputType: 'number',
  },
  {
    label: 'Buffer margin viewport scale',
    propertyName: 'bufferMarginViewportScale',
    defaultValue: 1,
    inputType: 'number',
  },
  {
    label: 'Scroll optimizations disabled',
    propertyName: 'scrollOptimizationsDisabled',
    defaultValue: false,
    inputType: 'radio',
    radioOptions: [true, false],
  },
];

/**
 * Hosts an infinite scroller inside its own scrolling box and acts as the
 * scroller's cell provider. It exposes the scroller's main props so the story
 * settings can drive them, and the scroller grows by 50 items whenever it
 * fires `scrollThresholdReached`.
 */
@customElement('ia-infinite-scroller-demo')
export class IAInfiniteScrollerDemo
  extends LitElement
  implements InfiniteScrollerCellProviderInterface
{
  @property({ type: Number }) itemCount = 200;

  @property({ type: Number }) estimatedCellHeight = 128;

  @property({ type: Number }) minBufferMarginCells = 10;

  @property({ type: Number }) maxBufferedCells = 500;

  @property({ type: Number }) bufferMarginViewportScale = 1;

  @property({ type: Boolean }) scrollOptimizationsDisabled = false;

  @property({ type: Boolean }) showPlaceholders = true;

  @property({ type: String }) tileDesign: '1' | '2' = '1';

  @query('ia-infinite-scroller') private scroller?: IAInfiniteScroller;

  @query('#scroll-to-index') private scrollToInput?: HTMLInputElement;

  @query('#scroll-to-animated') private animatedCheckbox?: HTMLInputElement;

  private loadedCells = new Set<number>();

  private pendingCells = new Set<number>();

  cellForIndex(index: number): TemplateResult | undefined {
    if (this.showPlaceholders && !this.loadedCells.has(index)) {
      this.scheduleLoad(index);
      return undefined;
    }
    return html`<ia-infinite-scroller-demo-tile design=${this.tileDesign}
      >${index}</ia-infinite-scroller-demo-tile
    >`;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('tileDesign') || changed.has('showPlaceholders')) {
      this.scroller?.refreshAllVisibleCells();
    }
  }

  render() {
    return html`
      <div id="controls">
        <label>
          Tile design
          <select @change=${this.handleDesignChange}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
        <label>
          Placeholders
          <input
            type="checkbox"
            ?checked=${this.showPlaceholders}
            @change=${this.handlePlaceholdersChange}
          />
        </label>
        <form @submit=${this.handleScrollToSubmit}>
          <label>
            Scroll to cell
            <input id="scroll-to-index" type="number" min="0" value="0" />
          </label>
          <label>
            Animated <input id="scroll-to-animated" type="checkbox" />
          </label>
          <button type="submit">Scroll</button>
        </form>
      </div>
      <div id="scroll-box">
        <ia-infinite-scroller
          .itemCount=${this.itemCount}
          .estimatedCellHeight=${this.estimatedCellHeight}
          .minBufferMarginCells=${this.minBufferMarginCells}
          .maxBufferedCells=${this.maxBufferedCells}
          .bufferMarginViewportScale=${this.bufferMarginViewportScale}
          .scrollOptimizationsDisabled=${this.scrollOptimizationsDisabled}
          .cellProvider=${this}
          .placeholderCellTemplate=${html`<ia-infinite-scroller-demo-placeholder></ia-infinite-scroller-demo-placeholder>`}
          @scrollThresholdReached=${this.handleScrollThresholdReached}
        ></ia-infinite-scroller>
      </div>
    `;
  }

  private scheduleLoad(index: number): void {
    if (this.pendingCells.has(index)) return;
    this.pendingCells.add(index);
    setTimeout(() => {
      this.pendingCells.delete(index);
      this.loadedCells.add(index);
      this.scroller?.refreshCell(index);
    }, 500);
  }

  private handleScrollThresholdReached(): void {
    this.itemCount += 50;
  }

  private handleDesignChange(e: Event): void {
    this.tileDesign = (e.target as HTMLSelectElement).value as '1' | '2';
  }

  private handlePlaceholdersChange(e: Event): void {
    this.showPlaceholders = (e.target as HTMLInputElement).checked;
  }

  private handleScrollToSubmit(e: Event): void {
    e.preventDefault();
    const index = parseInt(this.scrollToInput?.value ?? '', 10);
    if (index >= 0) {
      this.scroller?.scrollToCell(index, !!this.animatedCheckbox?.checked);
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        display: block;
      }

      #controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      #controls form {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      #scroll-to-index {
        width: 6rem;
      }

      #scroll-box {
        height: 400px;
        overflow-y: auto;
        border: 1px solid #888;
        padding: 0 10px;
        background: #fff;
      }
    `;
  }
}

@customElement('ia-infinite-scroller-story')
export class IAInfiniteScrollerStory extends LitElement {
  render() {
    return html`
      <story-template
        elementTag="ia-infinite-scroller"
        elementClassName="IAInfiniteScroller"
        .defaultUsageProps=${'.cellProvider=${cellProvider}'}
        .styleInputData=${{ settings: styleInputSettings }}
        .propInputData=${{ settings: propInputSettings }}
      >
        <ia-infinite-scroller-demo slot="demo"></ia-infinite-scroller-demo>
      </story-template>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-infinite-scroller-demo': IAInfiniteScrollerDemo;
  }
}
