import { fixture, fixtureCleanup, oneEvent } from '@open-wc/testing-helpers';
import { afterEach, describe, expect, test } from 'vitest';
import { html, TemplateResult } from 'lit';
import type {
  CellSelectionDetails,
  IAInfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from './ia-infinite-scroller';
import './ia-infinite-scroller';

afterEach(() => {
  fixtureCleanup();
});

/**
 * Asynchronously pause execution for a given number of milliseconds.
 */
function promisedSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for one animation frame + a microtask
 */
function waitForFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

/**
 * Gets all rendered .cell-container elements as an array, so
 * tests can iterate with for/of and index without optional chaining.
 */
function cellsOf(el: IAInfiniteScroller): HTMLElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll('.cell-container'));
}

/**
 * Trivial cell provider that just renders `cell-<index>` into a div.
 * Used in tests that don't care about per-cell heights or behavior;
 * they just need the scroller to have a populated cellProvider.
 */
const trivialCellProvider: InfiniteScrollerCellProviderInterface = {
  cellForIndex: (index: number): TemplateResult | undefined =>
    html`<div>cell-${index}</div>`,
};

describe('Infinite Scroller', () => {
  test('should render with a sentinel and number of cells', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${3}></ia-infinite-scroller>`,
    );

    const sentinel = el.shadowRoot?.querySelector('#sentinel');
    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(sentinel).to.exist;
    expect(cells?.length).to.equal(3);
  });

  test('emits a cellSelected event when a tile is clicked', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${3}></ia-infinite-scroller>`,
    );
    const cell = el.shadowRoot?.querySelector('.cell-container');

    const clickEvent = new MouseEvent('click');
    setTimeout(() => {
      cell?.dispatchEvent(clickEvent);
    });
    const event: CustomEvent<CellSelectionDetails> = await oneEvent(
      el,
      'cellSelected',
    );
    expect(event).to.exist;
    expect(event.detail.index).to.equal(0);
    expect(event.detail.originalEvent).to.exist;
  });

  test('populates cell containers with provided content', async () => {
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`cell-${index}`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${3}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;
    const cells = cellsOf(el);
    expect(cells.length).to.equal(3);
    expect(cells[0].textContent?.trim()).to.equal('cell-0');
    expect(cells[1].textContent?.trim()).to.equal('cell-1');
    expect(cells[2].textContent?.trim()).to.equal('cell-2');
  });

  test('refreshes specific cell content when requested', async () => {
    const cellData = ['foo', 'bar', 'baz'];
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`cell-${index} ${cellData[index]}`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${3}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;
    const cells = cellsOf(el);
    expect(cells.length).to.equal(3);

    cellData.splice(0, 3, 'a', 'b', 'c');
    el.refreshCell(1);
    await el.updateComplete;

    expect(cells[1].textContent?.trim()).to.equal('cell-1 b');
  });

  test('refreshes all visible cell content when requested', async () => {
    const cellData = ['foo', 'bar', 'baz'];
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`cell-${index} ${cellData[index]}`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${3}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;
    const cells = cellsOf(el);
    expect(cells.length).to.equal(3);

    cellData.splice(0, 3, 'a', 'b', 'c');
    el.refreshAllVisibleCells();
    await el.updateComplete;

    expect(cells[0].textContent?.trim()).to.equal('cell-0 a');
    expect(cells[1].textContent?.trim()).to.equal('cell-1 b');
    expect(cells[2].textContent?.trim()).to.equal('cell-2 c');
  });

  test('updates rendered cells when itemCount increases in non-virtualized mode', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${5}
        .cellProvider=${cellProvider}
        scrollOptimizationsDisabled
      ></ia-infinite-scroller>`,
    );

    const cellsBefore = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cellsBefore?.length).to.equal(5);

    el.itemCount = 10;
    await el.updateComplete;

    const cellsAfter = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cellsAfter?.length).to.equal(10);
  });
});

describe('Infinite Scroller Virtualization', () => {
  afterEach(() => {
    window.scrollTo(0, 0);
  });

  test('renders fewer DOM elements than itemCount for large lists', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells?.length).to.be.lessThan(1000);
    expect(cells?.length).to.be.greaterThan(0);
  });

  test('renders scroll-spacer and transformed container in virtualized mode', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const scrollSpacer = el.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const container = el.shadowRoot?.querySelector('#container') as HTMLElement;
    expect(scrollSpacer).to.exist;
    expect(container).to.exist;
    expect(parseFloat(scrollSpacer.style.height)).to.be.greaterThan(0);
    expect(container.style.transform).to.equal('translateY(0px)');
  });

  test('scrollToCell places target cell in DOM for far-away indices', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const result = await el.scrollToCell(500, false);
    expect(result).to.be.true;

    const targetCell = el.shadowRoot?.querySelector(
      '.cell-container[data-cell-index="500"]',
    );
    expect(targetCell).to.exist;
    expect(targetCell?.textContent?.trim()).to.equal('cell-500');
  });

  test('scrollToCell returns false when index is out of bounds', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    expect(await el.scrollToCell(-1, false)).to.be.false;
    expect(await el.scrollToCell(1000, false)).to.be.false;
  });

  test('scrollToCell snaps the buffer to a row boundary', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // 503 is intentionally NOT divisible by typical grid column counts (2..8),
    // so the bug manifests for any realistic viewport width.
    await el.scrollToCell(503, false);
    await el.updateComplete;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cols = (el as any).cachedColumnsPerRow as number;
    if (cols <= 1) {
      // Single-column grid is always row-aligned trivially; skip the assertion.
      return;
    }
    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    const firstIndex = Number(
      (cells?.[0] as HTMLElement | undefined)?.dataset.cellIndex ?? '0',
    );
    expect(
      firstIndex % cols,
      `bufferStart should be row-aligned (got firstIndex=${firstIndex}, cols=${cols})`,
    ).to.equal(0);
  });

  test('animated scrollToCell lands at the target cell, not stranded short of it', async () => {
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`<div style="height:${50 + (index % 5) * 10}px">
          cell-${index}
        </div>`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${2000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    const result = await el.scrollToCell(1000, true);
    expect(result).to.be.true;

    // After the promise resolves, the smooth-scroll animation has settled
    // (we wait for scrollend or the fallback timer). The target cell must
    // still be in the rendered buffer AND its bounding rect should be at
    // or near the top of the viewport, where scrollIntoView with
    // default 'block: start' should leave it.
    const target = el.shadowRoot?.querySelector(
      '.cell-container[data-cell-index="1000"]',
    ) as HTMLElement | null;
    expect(target, 'target cell should remain buffered after smooth scroll').to
      .exist;

    const rect = target!.getBoundingClientRect();
    // The target's top should be near the top of the viewport. Tolerate
    // up to half a viewport of slop for browser-specific scroll behavior
    // (sticky headers, grid alignment, etc.) but reject "stopped 90% of
    // the way short" symptoms where the target is far below the viewport.
    expect(
      rect.top,
      `target cell ended up at viewport-top ${rect.top.toFixed(
        1,
      )}, too far down`,
    ).to.be.lessThan(window.innerHeight / 2);
  });

  test('renders all cells immediately when scrollOptimizationsDisabled is true', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${50}
        scrollOptimizationsDisabled
      ></ia-infinite-scroller>`,
    );

    await el.updateComplete;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells?.length).to.equal(50);
  });

  test('sets correct aria set attributes on buffered cells', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = cellsOf(el);
    expect(cells.length).to.be.greaterThan(0);
    const firstCell = cells[0];
    // With bufferStart=0 the topmost cell is index 0, whose aria-posinset
    // (1-based) must be exactly 1.
    expect(firstCell.getAttribute('aria-posinset')).to.equal('1');
    expect(firstCell.getAttribute('aria-setsize')).to.equal('1000');
  });

  test('updates aria-setsize when itemCount increases', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    let firstCell = el.shadowRoot?.querySelector('.cell-container');
    expect(firstCell?.getAttribute('aria-setsize')).to.equal('1000');

    el.itemCount = 2000;
    await el.updateComplete;

    // Should reflect the new itemCount
    firstCell = el.shadowRoot?.querySelector('.cell-container');
    expect(firstCell?.getAttribute('aria-setsize')).to.equal('2000');
  });

  test('has correct data-cell-index attributes on buffered cells', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = cellsOf(el);
    expect(cells.length).to.be.greaterThan(0);
    expect(cells[0].dataset.cellIndex).to.equal('0');
  });

  test('populates cell content in virtualized mode', async () => {
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`cell-${index}`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells?.length).to.be.greaterThan(0);
    const firstCell = cells?.[0] as HTMLElement;
    expect(firstCell.textContent?.trim()).to.equal('cell-0');
  });

  test('can refresh a specific cell in virtualized mode', async () => {
    const cellContent = new Map<number, string>();
    for (let i = 0; i < 1000; i += 1) {
      cellContent.set(i, `foo-${i}`);
    }

    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`${cellContent.get(index)}`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const firstCell = el.shadowRoot?.querySelector(
      '.cell-container[data-cell-index="0"]',
    ) as HTMLElement;
    expect(firstCell).to.exist;
    expect(firstCell.textContent?.trim()).to.equal('foo-0');

    // Update cell contents but only refresh cell 0
    cellContent.set(0, 'bar-0');
    cellContent.set(1, 'bar-1');
    el.refreshCell(0);
    await el.updateComplete;

    expect(firstCell.textContent?.trim()).to.equal('bar-0');

    const secondCell = el.shadowRoot?.querySelector(
      '.cell-container[data-cell-index="1"]',
    ) as HTMLElement;
    expect(secondCell.textContent?.trim()).to.equal('bar-1');
  });

  test('can refresh all visible cells in virtualized mode', async () => {
    const cellData = new Map<number, string>();
    for (let i = 0; i < 1000; i += 1) {
      cellData.set(i, `foo-${i}`);
    }
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        html`${cellData.get(index)}`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    // New cell data
    for (let i = 0; i < 1000; i += 1) {
      cellData.set(i, `bar-${i}`);
    }

    el.refreshAllVisibleCells();
    await el.updateComplete;

    // All buffered cells should have updated content; verify them all.
    const cells = cellsOf(el);
    expect(cells.length).to.be.greaterThan(0);
    for (const cell of cells) {
      const idx = Number(cell.dataset.cellIndex);
      expect(cell.textContent?.trim()).to.equal(`bar-${idx}`);
    }
  });

  test('emits cellSelected event when cells are clicked', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cell = el.shadowRoot?.querySelector('.cell-container');
    expect(cell).to.exist;

    setTimeout(() => {
      cell!.dispatchEvent(new MouseEvent('click'));
    }, 0);

    const event: CustomEvent<CellSelectionDetails> = await oneEvent(
      el,
      'cellSelected',
    );
    expect(event?.detail?.index).to.equal(0);
  });

  test('has non-zero spacer height when buffer does not cover all rows', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const scrollSpacer = el.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    expect(scrollSpacer).to.exist;
    expect(parseFloat(scrollSpacer.style.height)).to.be.greaterThan(0);
  });

  test('renders all cells with zero offset when all items fit in buffer', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${5}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells?.length).to.equal(5);

    const scrollSpacer = el.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const container = el.shadowRoot?.querySelector('#container') as HTMLElement;
    expect(parseFloat(scrollSpacer.style.height)).to.be.greaterThan(0);
    expect(container.style.transform).to.equal('translateY(0px)');
  });

  test('does not render cells beyond itemCount', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${200}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells).to.exist;
    for (let i = 0; i < cells!.length; i += 1) {
      const cell = cells![i] as HTMLElement;
      const idx = Number(cell.dataset.cellIndex);
      expect(idx).to.be.at.least(0);
      expect(idx).to.be.lessThan(200);
    }
  });

  test('clears internal state and re-renders cells after reload', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;
    expect(cellsOf(el).length).to.be.greaterThan(0);

    el.reload();
    await el.bufferStabilized;

    // The user is still at scrollY=0 (no scrolling happened), so after
    // reload the buffer remains anchored at index 0 with the transform
    // back at translateY(0px).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((el as any).bufferStart).to.equal(0);
    expect(cellsOf(el).length).to.be.greaterThan(0);

    const container = el.shadowRoot?.querySelector('#container') as HTMLElement;
    expect(container.style.transform).to.equal('translateY(0px)');
  });

  test('getVisibleCellIndices returns an array of indices for all cells in the viewport', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    // visibleCellIndices is populated asynchronously by an
    // IntersectionObserver, so even after bufferStabilized the callback
    // may not have fired yet. Wait an animation frame + a small delay so
    // the IO has time to observe the freshly-rendered cells.
    await waitForFrame();
    await promisedSleep(50);

    const visible = el.getVisibleCellIndices();
    expect(visible).to.be.an('array');
    // At scrollY=0 with bufferStart=0 there must be cells in the viewport.
    expect(
      visible.length,
      'at least one cell must be visible at scrollY=0',
    ).to.be.greaterThan(0);
    for (const idx of visible) {
      expect(idx).to.be.at.least(0);
      // With itemCount=1000 nothing remotely near the back of the dataset
      // should be in view; spot-check that getVisibleCellIndices isn't
      // returning the entire buffer or something equally wrong.
      expect(idx).to.be.lessThan(500);
    }
  });

  test('respects minBufferMarginCells as minimum floor when bufferMarginViewportScale is 0', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
        .bufferMarginViewportScale=${0}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    // With scale=0, the minimum floor (minBufferMarginCells=10) should still
    // apply so we should have at least some cells rendered
    expect(cells?.length).to.be.at.least(10);
  });

  test('refreshCell replaces a placeholder cell with real content', async () => {
    // Return undefined (placeholder) for the first cell, and real content for the rest
    let returnContent = false;
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined => {
        if (index === 0 && !returnContent) return undefined;
        return html`<div style="height:50px">cell-${index}</div>`;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${5}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:20px">loading</div>`}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    // First cell should have placeholder content
    const firstCell = el.shadowRoot?.querySelector(
      '.cell-container[data-cell-index="0"]',
    ) as HTMLElement;
    expect(firstCell).to.exist;
    expect(firstCell.textContent).to.contain('loading');

    // Return real content for first cell now too
    returnContent = true;
    el.refreshCell(0);
    await el.updateComplete;

    // Cell 0 should now have real content
    expect(firstCell.textContent).to.contain('cell-0');
  });

  test('buffer does not skip cell indices within its range (all contiguous)', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = cellsOf(el);
    expect(
      cells.length,
      'precondition: virtualized buffer should render multiple cells',
    ).to.be.greaterThan(1);
    const indices = cells.map((c) => Number(c.dataset.cellIndex));
    // Indices should be sorted and contiguous
    for (let i = 1; i < indices.length; i += 1) {
      expect(indices[i]).to.equal(indices[i - 1] + 1);
    }
  });
});

describe('scrollThresholdReached sentinel behavior', () => {
  afterEach(() => {
    window.scrollTo(0, 0);
  });

  test('fires scrollThresholdReached when sentinel is visible', async () => {
    // When itemCount is small, the sentinel is initially already in the viewport,
    // so the event should fire immediately.
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${5}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    let eventCount = 0;
    el.addEventListener('scrollThresholdReached', () => {
      eventCount += 1;
    });

    await promisedSleep(200);
    expect(eventCount).to.equal(1);
  });

  test('fires scrollThresholdReached again after itemCount increases', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${5}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    let eventCount = 0;
    el.addEventListener('scrollThresholdReached', () => {
      eventCount += 1;
    });

    // Initial event
    await promisedSleep(100);
    expect(eventCount).to.equal(1);

    // Increasing the itemCount causes the sentinel to fire the event again
    el.itemCount = 10;
    await el.updateComplete;
    await waitForFrame();
    await promisedSleep(100);

    expect(eventCount).to.equal(2);
  });

  test('does not rapid-fire when itemCount changes multiple times quickly', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${5}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    let eventCount = 0;
    el.addEventListener('scrollThresholdReached', () => {
      eventCount += 1;
    });

    // Initial event
    await promisedSleep(100);
    const initialCount = eventCount;

    // Rapidly increase itemCount several times, as if the user is hovering at the end
    // of the buffer continuously
    const numIterations = 10;
    for (let i = 0; i < numIterations; i += 1) {
      el.itemCount += 10;

      await el.updateComplete;
    }

    // Wait for all pending sentinel rechecks to settle
    await waitForFrame();
    await promisedSleep(200);

    // Ten rapid itemCount changes must produce far fewer than ten extra
    // events. Each scheduleSentinelRecheck cancels the previous pending IO
    // callback, so they collapse to a single settled recheck and in practice
    // add no extra events.
    expect(
      eventCount,
      `${numIterations} rapid itemCount changes produced ${
        eventCount - initialCount
      } extra events; debouncing failed`,
    ).to.be.lessThan(initialCount + numIterations / 2);
  });

  test('resets sentinel pending state after reload', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${5}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    let eventCount = 0;
    el.addEventListener('scrollThresholdReached', () => {
      eventCount += 1;
    });

    await promisedSleep(100);
    expect(eventCount).to.equal(1);

    // Reload should reset all sentinel state
    el.reload();
    await el.bufferStabilized;
    await promisedSleep(100);

    // Sentinel should be able to fire again after reload
    expect(eventCount).to.be.greaterThan(1);
  });

  test('fires exactly once when a listener is attached before stabilization', async () => {
    const el = document.createElement(
      'ia-infinite-scroller',
    ) as IAInfiniteScroller;
    let eventCount = 0;
    el.addEventListener('scrollThresholdReached', () => {
      eventCount += 1;
    });
    el.itemCount = 5;
    document.body.appendChild(el);
    try {
      await el.bufferStabilized;
      await promisedSleep(200);
      expect(eventCount).to.equal(1);
    } finally {
      el.remove();
    }
  });
});

describe('Scroll layout and placeholder edge cases', () => {
  afterEach(() => {
    window.scrollTo(0, 0);
  });

  test('spacer height increases when itemCount grows', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${1000}></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const scrollSpacer = el.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const initialHeight = parseFloat(scrollSpacer.style.height);
    expect(initialHeight).to.be.greaterThan(0);

    // If we double the item count, the spacer should grow
    el.itemCount = 2000;
    await el.updateComplete;

    const newHeight = parseFloat(scrollSpacer.style.height);
    expect(newHeight).to.be.greaterThan(initialHeight);
  });

  test('all buffered placeholder cells render the placeholder template', async () => {
    // Cell provider that returns undefined for everything, which should mean only
    // placeholders get rendered
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (): TemplateResult | undefined => undefined,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${20}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div class="placeholder">loading</div>`}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    const cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells?.length).to.be.greaterThan(0);
    cells?.forEach((cell) => {
      const placeholder = cell.querySelector('.placeholder');
      expect(placeholder).to.exist;
      expect(placeholder!.textContent).to.equal('loading');
    });
  });

  test('cells correctly render placeholders after reload', async () => {
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (): TemplateResult | undefined => undefined,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${5}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div class="ph">placeholder</div>`}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;

    let cells = el.shadowRoot?.querySelectorAll('.cell-container');
    cells?.forEach((cell) => {
      expect(cell.querySelector('.ph')).to.exist;
    });

    el.reload();
    await el.bufferStabilized;

    // All cells should still have placeholder content
    cells = el.shadowRoot?.querySelectorAll('.cell-container');
    expect(cells?.length).to.be.greaterThan(0);
    cells?.forEach((cell) => {
      expect(cell.querySelector('.ph')).to.exist;
    });
  });

  test('row heights shrink when placeholders are replaced with shorter content', async () => {
    // Placeholders are 200px; real content is 20px. The spacer for the cells
    // that have loaded should not still be using the inflated placeholder
    // height. Override --infiniteScrollerCellMinHeight so the cell-container
    // doesn't impose a 22.5rem floor that would mask the height change.
    let returnContent = false;
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        returnContent
          ? html`<div style="height:20px">cell-${index}</div>`
          : undefined,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${50}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:200px">
          loading
        </div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    const spacer = el.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const placeholderTotal = parseFloat(spacer.style.height);
    expect(placeholderTotal).to.be.greaterThan(0);

    // Flip the provider so cells return real (shorter) content.
    returnContent = true;
    el.refreshAllVisibleCells();
    await el.updateComplete;

    // Force a scroll event so syncBufferToScrollPosition re-measures.
    window.dispatchEvent(new Event('scroll'));
    await promisedSleep(200);
    await el.updateComplete;

    const contentTotal = parseFloat(spacer.style.height);
    // After loading 20px content into all 50 cells we expect roughly
    // 50/cols * 20 + gaps, definitely far less than the placeholder total.
    expect(
      contentTotal,
      `spacer should shrink from ${placeholderTotal} towards content height`,
    ).to.be.lessThan(placeholderTotal * 0.6);
  });

  test('spacer height updates after refreshAllVisibleCells without an explicit scroll', async () => {
    let returnContent = false;
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        returnContent
          ? html`<div style="height:20px">cell-${index}</div>`
          : undefined,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${50}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:200px">
          loading
        </div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    const spacer = el.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const placeholderTotal = parseFloat(spacer.style.height);

    returnContent = true;
    el.refreshAllVisibleCells();
    await el.updateComplete;
    // No scroll event here, should still update.
    await waitForFrame();
    await el.updateComplete;

    const contentTotal = parseFloat(spacer.style.height);
    expect(
      contentTotal,
      `spacer should update without an explicit scroll (was ${placeholderTotal}, still ${contentTotal})`,
    ).to.be.lessThan(placeholderTotal * 0.8);
  });

  test('placeholderRowHeight reflects placeholder-only rows, not row-mixed first sample', async () => {
    // Cell 0 returns tall content immediately; the rest are placeholders.
    // With cols >= 2, row 0 mixes a 200px content cell with placeholder cells
    // that get inflated by the grid layout to match. The first placeholder
    // by iteration order (cell 1) is in that inflated row, so capturing
    // from it alone produces a biased ~200 estimate, even though the
    // typical placeholder-only row is only ~50px tall.
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (index: number): TemplateResult | undefined =>
        index === 0
          ? html`<div style="height:200px">cell-${index}</div>`
          : undefined,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${100}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:50px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cols = (el as any).cachedColumnsPerRow as number;
    if (cols < 2) {
      // cols=1 puts every cell in its own row, so no row-mixing is possible
      // and the bug scenario doesn't apply. Skip to keep the test stable
      // across viewport widths.
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ph = (el as any).placeholderRowHeight as number | undefined;
    expect(ph, 'placeholderRowHeight should be set').to.be.a('number');
    expect(
      ph!,
      `placeholderRowHeight ${ph} should reflect typical placeholder-only rows (~50)`,
    ).to.be.closeTo(50, 30);
  });

  test('placeholderRowHeight is not poisoned by stale cellHeights from previously-content cells', async () => {
    // A user scrolls through a large list while it renders content
    // (populating cellHeights across many rows), then switches behavior so
    // future renders return placeholders. When previously-content cells
    // re-enter the buffer as placeholders, their row's stale cellHeights
    // entries shouldn't make `updatePlaceholderRowHeight` treat the row as
    // mixed; that would leave the placeholder estimate permanently
    // undefined and produce blank space in the viewport.
    let phase: 1 | 2 = 1;
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (i: number): TemplateResult | undefined => {
        if (phase === 1) {
          return html`<div style="height:200px">cell-${i}</div>`;
        }
        // Phase 2: only the first 10 cells return content; the rest go
        // back to being placeholders.
        return i < 10
          ? html`<div style="height:200px">cell-${i}</div>`
          : undefined;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${500}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:50px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Scroll through several positions in phase 1 to accumulate cellHeights
    // entries spread across many rows.
    await el.scrollToCell(100, false);
    await el.updateComplete;
    await el.scrollToCell(200, false);
    await el.updateComplete;
    await el.scrollToCell(300, false);
    await el.updateComplete;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cellHeightsSize = (el as any).rowHeightCache.cellHeights
      .size as number;
    // We need a meaningful number of stale entries to exercise the
    // mixed-row detection path. Assert this as a precondition rather
    // than silently skipping. If the test's viewport stops producing
    // enough cellHeights entries, we want to know rather than have the
    // test report a false pass.
    expect(
      cellHeightsSize,
      `precondition: phase 1 should populate >=50 cellHeights entries (got ${cellHeightsSize})`,
    ).to.be.at.least(50);

    // Phase 2: future renders return placeholders for high-index cells.
    phase = 2;

    // Scroll back to a previously-visited region. The cells there had
    // their `cellHeights` entries set during phase 1, but with `phase=2`
    // and the cells having left the buffer in the meantime, they
    // re-enter as placeholders.
    await el.scrollToCell(200, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ph = (el as any).placeholderRowHeight as number | undefined;
    expect(
      ph,
      'placeholderRowHeight should be set even with stale cellHeights',
    ).to.be.a('number');
    expect(
      ph!,
      `placeholderRowHeight ${ph} should reflect ~50 placeholders, not stale measurements`,
    ).to.be.closeTo(50, 30);
  });

  test('rowHeights reflect current placeholder rendering, not stale content measurements', async () => {
    // rowHeights derives from cellHeights, and a cell that was once content
    // (with cellHeights[i]=200) but is now back in the buffer as a
    // placeholder should not leave rowHeights pointing at the stale 200.
    // Otherwise sumRowHeights would treat each row as content-sized, fits
    // only ~half as many rows in the viewport as it should, and the buffer
    // extension stops short, leaving blank space below the rendered
    // placeholders.
    let phase: 1 | 2 = 1;
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (i: number): TemplateResult | undefined => {
        if (phase === 1) {
          return html`<div style="height:200px">cell-${i}</div>`;
        }
        return undefined;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${500}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:50px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    await el.scrollToCell(100, false);
    await el.updateComplete;
    await el.scrollToCell(200, false);
    await el.updateComplete;
    await el.scrollToCell(300, false);
    await el.updateComplete;

    phase = 2;

    await el.scrollToCell(200, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cols = (el as any).cachedColumnsPerRow as number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowHeights = (el as any).rowHeights as Map<number, number>;

    // Sample a few rows around the target. Any of them currently containing
    // placeholders in the buffer should NOT still report the content-sized
    // height (~200); that would be a stale measurement.
    const targetRow = Math.floor(200 / cols);
    const stale: { row: number; height: number }[] = [];
    for (let r = targetRow - 1; r <= targetRow + 1; r += 1) {
      const h = rowHeights.get(r);
      if (h !== undefined && h > 100) {
        stale.push({ row: r, height: h });
      }
    }
    expect(
      stale,
      `stale content-sized rowHeights around row ${targetRow}: ${JSON.stringify(
        stale,
      )}`,
    ).to.deep.equal([]);
  });
});

describe('Buffer margin scale and estimatedCellHeight', () => {
  test('higher bufferMarginViewportScale produces a larger initial buffer', async () => {
    const cellProvider = trivialCellProvider;

    // With scale=0, only minBufferMarginCells floor applies
    const elSmall = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${10000}
        .cellProvider=${cellProvider}
        .bufferMarginViewportScale=${0}
      ></ia-infinite-scroller>`,
    );
    // Read the initial buffer size before stabilization settles
    await elSmall.updateComplete;
    const smallCount =
      elSmall.shadowRoot?.querySelectorAll('.cell-container').length ?? 0;

    const elLarge = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${10000}
        .cellProvider=${cellProvider}
        .bufferMarginViewportScale=${3}
        .maxBufferedCells=${5000}
      ></ia-infinite-scroller>`,
    );
    await elLarge.updateComplete;
    const largeCount =
      elLarge.shadowRoot?.querySelectorAll('.cell-container').length ?? 0;

    // With scale=3, the initial buffer should be larger than with 0
    expect(largeCount).to.be.greaterThan(smallCount);
  });

  test('estimatedCellHeight affects spacer height before stabilization', async () => {
    // Use a very large estimated height vs a small one to see the difference
    // in how the initial geometry is computed (before measured heights take over)
    const elTall = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${100}
        .estimatedCellHeight=${500}
      ></ia-infinite-scroller>`,
    );
    // Read spacer height right after first render, before stabilization completes
    await elTall.updateComplete;
    const tallSpacer = elTall.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const tallHeight = parseFloat(tallSpacer.style.height);

    const elShort = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${100}
        .estimatedCellHeight=${50}
      ></ia-infinite-scroller>`,
    );
    await elShort.updateComplete;
    const shortSpacer = elShort.shadowRoot?.querySelector(
      '#scroll-spacer',
    ) as HTMLElement;
    const shortHeight = parseFloat(shortSpacer.style.height);

    // Taller estimate should produce a taller spacer
    expect(tallHeight).to.be.greaterThan(shortHeight);
    expect(shortHeight).to.be.greaterThan(0);
  });
});

describe('Lifecycle (connect/disconnect/stabilization)', () => {
  test('remains functional after disconnect and reconnect', async () => {
    const cellProvider = trivialCellProvider;
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        .itemCount=${1000}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );

    await el.bufferStabilized;
    expect(cellsOf(el).length).to.be.greaterThan(0);

    // Remove from DOM (triggers disconnectedCallback) and let any pending
    // rAFs / timers fire on a detached element.
    const parent = el.parentElement!;
    parent.removeChild(el);
    await promisedSleep(50);

    // Re-append (triggers connectedCallback) and verify the scroller is
    // still functional. Core operations (scrollToCell, refreshCell) should
    // still work without errors on the reconnected element (no missing
    // observations etc).
    parent.appendChild(el);
    await el.bufferStabilized;

    expect(cellsOf(el).length).to.be.greaterThan(0);

    const scrolled = await el.scrollToCell(500, false);
    expect(scrolled, 'scrollToCell should succeed after reconnect').to.equal(
      true,
    );

    const target = el.shadowRoot?.querySelector(
      '.cell-container[data-cell-index="500"]',
    );
    expect(
      target,
      'target cell should be in the buffer after reconnect + scrollToCell',
    ).to.exist;
  });

  test('does not dispatch bufferStabilized when disconnecting an already-stable scroller', async () => {
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller .itemCount=${100}></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    let fired = false;
    el.addEventListener('bufferStabilized', () => {
      fired = true;
    });

    el.parentElement?.removeChild(el);
    await promisedSleep(20);

    expect(fired).to.equal(false);
  });

  test('ResizeObserver continues to react after disconnect/reconnect', async () => {
    const wrapper = await fixture<HTMLDivElement>(html`
      <div style="width:800px;height:600px;overflow:auto">
        <ia-infinite-scroller .itemCount=${500}></ia-infinite-scroller>
      </div>
    `);
    const el = wrapper.querySelector(
      'ia-infinite-scroller',
    ) as IAInfiniteScroller;
    await el.bufferStabilized;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialCols = (el as any).cachedColumnsPerRow as number;

    // Detach and reattach.
    wrapper.removeChild(el);
    await promisedSleep(20);
    wrapper.appendChild(el);
    await el.updateComplete;
    await promisedSleep(20);

    // Now shrink the wrapper. This should fire the ResizeObserver and reduce
    // the column count (or at least re-measure cachedColumnsPerRow).
    wrapper.style.width = '200px';
    await promisedSleep(100);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newCols = (el as any).cachedColumnsPerRow as number;
    expect(
      newCols,
      `column count should drop after width shrinks (was ${initialCols}, now ${newCols})`,
    ).to.be.lessThan(initialCols);
  });

  test('bufferStabilized promise does not resolve before firstUpdated runs', async () => {
    const el = document.createElement(
      'ia-infinite-scroller',
    ) as IAInfiniteScroller;
    el.itemCount = 100;

    let resolved = false;
    el.bufferStabilized.then(() => {
      resolved = true;
    });

    // Give microtasks a chance to drain before any DOM attachment.
    await Promise.resolve();
    await Promise.resolve();

    expect(
      resolved,
      'bufferStabilized resolved before the element was even attached',
    ).to.equal(false);

    document.body.appendChild(el);
    try {
      await el.bufferStabilized;
      expect(resolved).to.equal(true);
    } finally {
      el.remove();
    }
  });
});

describe('Scroll anchoring', () => {
  afterEach(() => {
    window.scrollTo(0, 0);
  });

  test('ScrollAnchor.capture + restore compensate for layout shifts', async () => {
    // Unit test of the ScrollAnchor primitives directly: an anchor
    // captured before a simulated layout shift should drive a scrollTop
    // adjustment afterward that returns the anchor cell to its captured
    // viewport position. (The full integration scenario, buffer
    // extension during upward scroll with stale rowHeights, is hard to
    // reproduce deterministically with accumulated test fixtures
    // changing the document layout; see the smoke test below for an
    // end-to-end version.)
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (i: number): TemplateResult | undefined =>
        html`<div style="height:80px">cell-${i}</div>`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${200}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Scroll a bit so there's a non-trivial anchor cell to find.
    window.scrollTo(0, window.scrollY + 200);
    await waitForFrame();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { scrollAnchor } = el as any;
    const anchor = scrollAnchor.capture();
    expect(anchor, 'capture() should find an anchor cell').to.not.be.null;
    expect(anchor.cellIndex, 'anchor.cellIndex should be a number').to.be.a(
      'number',
    );
    expect(
      anchor.cellOffsetWithinScroller,
      'cellOffsetWithinScroller should be a number',
    ).to.be.a('number');

    // Simulate a layout shift: change the container's translateY,
    // which moves the anchor cell up in the viewport by 200px.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initialBufferOffsetY = (el as any).bufferOffsetY as number;
    const container = el.shadowRoot?.querySelector('#container') as HTMLElement;
    container.style.transform = `translateY(${initialBufferOffsetY - 200}px)`;

    // The anchor cell is now 200px higher in the viewport than where it
    // was captured. restore() should adjust scrollY by -200 (scrolling
    // up to bring the content back down so the anchor stays at its
    // captured viewport position).
    const scrollYBefore = window.scrollY;
    scrollAnchor.restore(anchor);
    const scrollYAfter = window.scrollY;
    const scrollDelta = scrollYAfter - scrollYBefore;

    expect(
      scrollDelta,
      `restore() should have adjusted scrollY by ~-200, got ${scrollDelta}`,
    ).to.be.closeTo(-200, 5);
  });

  test('upward scroll does not yank the viewport forward when prior content rows enter the buffer (smoke)', async () => {
    // When the user browses content, enables placeholders, jumps to a
    // far cell, then scrolls upward, the buffer extension that absorbs
    // the previously-measured content rows can shift bufferOffsetY by
    // far more than the user's scrollTop just moved. Without scroll
    // anchoring the visible content leaps forward (higher-indexed cells
    // appear at the viewport top).
    //
    // Test strategy: measure the anchor cell's exact viewport-relative
    // position (in pixels) before and after the upward scroll. With
    // anchoring it should stay almost the same. Without anchoring the
    // anchor cell would shift up off-screen by hundreds of pixels.
    let phase: 1 | 2 = 1;
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (i: number): TemplateResult | undefined => {
        if (phase === 1) {
          return html`<div style="height:106px">cell-${i}</div>`;
        }
        return undefined;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${2000}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:58px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Phase 1: scroll through a region that overlaps the cells the upward
    // scroll in phase 2 will absorb into the buffer. scrollToCell(900)
    // populates rowHeights for rows ~85..95 at content height (~106).
    await el.scrollToCell(900, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // Phase 2: enable placeholders and jump to cell 1000. The buffer is
    // now around row 100; rows just above (90..99) have stale rowHeights
    // from phase 1 but are not yet in the current buffer.
    phase = 2;
    await el.scrollToCell(1000, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // Pick a stable anchor cell: take a cell from the rendered buffer
    // that's currently visible-ish and record its bounding rect.
    const cells = cellsOf(el);
    expect(cells.length, 'buffer should be populated').to.be.greaterThan(0);

    // Find a cell that's roughly in the viewport. Its bounding rect's top
    // should be near 0 (top of viewport for a document scroller).
    let anchorCell: HTMLElement | null = null;
    for (const cell of cells) {
      const r = cell.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        anchorCell = cell;
        break;
      }
    }
    expect(anchorCell, 'should find at least one cell in the viewport').to.not
      .be.null;
    const anchorIndex = Number(anchorCell!.dataset.cellIndex);
    const topBefore = anchorCell!.getBoundingClientRect().top;

    // Scroll up by enough to trigger a buffer extension (well past
    // minMargin). With ~6 visible rows and minMargin=2, we need to clear
    // at least 2 rows of margin then trigger extension; 500px is solidly
    // past that threshold.
    window.scrollBy(0, -500);
    await waitForFrame();
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // Re-query for the anchor cell's *current* DOM element. The position-
    // keyed `map` in the template reuses `<article>` elements as the
    // buffer slides, so the same DOM node we captured before the scroll
    // may now hold a different `data-cell-index`. Looking the cell up by
    // its index gives us whichever element currently represents it.
    const anchorCellAfter = el.shadowRoot?.querySelector(
      `.cell-container[data-cell-index="${anchorIndex}"]`,
    ) as HTMLElement | null;
    expect(
      anchorCellAfter,
      `anchor cell ${anchorIndex} was evicted from the buffer after the 500px scroll-up`,
    ).to.not.be.null;

    const topAfter = anchorCellAfter!.getBoundingClientRect().top;
    // The anchor cell should appear to move by the user's scroll amount
    // (~500px down in the viewport, since scrolling up reveals upper
    // content and pushes existing cells down). With the bug, the buffer
    // extension shifts bufferOffsetY by more than the user's scroll, so
    // the anchor cell moves by far less than 500 (often near 0, or even
    // negative, disappearing off the top of the viewport). With
    // anchoring applied, the anchor moves by the expected 500.
    const expectedTopChange = 500;
    const actualTopChange = topAfter - topBefore;
    const deviation = Math.abs(actualTopChange - expectedTopChange);
    expect(
      deviation,
      `anchor cell ${anchorIndex} viewport-top moved ${actualTopChange.toFixed(
        1,
      )}px (expected ~${expectedTopChange}px)`,
    ).to.be.lessThan(100);
  });

  test('refreshCell on a top-of-viewport placeholder does not visibly shift the rendered cells below it', async () => {
    // When in-viewport placeholders transition to taller real content,
    // the rendered cells below them in the buffer must stay visually
    // anchored; they shouldn't be pushed down by the row growth. The
    // anchor cell has to be selected from cells that already render
    // content (not from the cells whose content is being inserted right
    // now), so that restore() compensates for the actual shift rather
    // than for the freshly-grown row that contains the refreshed cell
    // itself.
    const heights = new Map<number, number>();
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex(i: number): TemplateResult | undefined {
        const h = heights.get(i);
        if (h === undefined) return undefined;
        return html`<div style="height:${h}px">cell-${i}</div>`;
      },
    };
    // Start with all cells unloaded (placeholders).
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${500}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:30px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Jump to a far cell. scrollToCell positions cell 200 at viewport top.
    await el.scrollToCell(200, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // Load cells starting a bit below the viewport top. Cells 200-202 stay
    // as placeholders so they're the top-of-viewport candidates, simulating
    // "user scrolled up just enough that placeholders are now visible at
    // the top, while rendered cells from prior browsing are still below".
    for (let i = 203; i <= 260; i += 1) heights.set(i, 100);
    for (let i = 203; i <= 260; i += 1) el.refreshCell(i);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // Pick a rendered cell that's currently visible (must be one of the
    // loaded 203+ cells).
    const cells = cellsOf(el);
    let anchorCell: HTMLElement | null = null;
    for (const cell of cells) {
      const r = cell.getBoundingClientRect();
      const idx = Number(cell.dataset.cellIndex);
      if (r.bottom > 0 && r.top < window.innerHeight && heights.has(idx)) {
        anchorCell = cell;
        break;
      }
    }
    expect(anchorCell, 'should find a visible rendered cell').to.not.be.null;
    const anchorIndex = Number(anchorCell!.dataset.cellIndex);
    const topBefore = anchorCell!.getBoundingClientRect().top;

    // Now "load" placeholders 200-202 that are IN the viewport at the top.
    // Their heights transition from 30px (placeholder) to 100px (content),
    // which grows the rows containing them. This pushes rendered cells
    // below (in the viewport) down: the user-reported symptom.
    const aboveIndices: number[] = [200, 201, 202];
    for (const i of aboveIndices) heights.set(i, 100);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bufferStart = (el as any).bufferStart as number;
    expect(
      aboveIndices.length,
      `no above-viewport placeholders to refresh (bufferStart=${bufferStart})`,
    ).to.be.greaterThan(0);

    for (const i of aboveIndices) el.refreshCell(i);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    expect(
      anchorCell!.isConnected,
      'anchor cell should still be in DOM after refresh batch',
    ).to.equal(true);
    const topAfter = anchorCell!.getBoundingClientRect().top;
    const delta = topAfter - topBefore;
    expect(
      Math.abs(delta),
      `anchor cell ${anchorIndex} shifted ${delta.toFixed(1)}px ` +
        `(top went from ${topBefore.toFixed(1)} to ${topAfter.toFixed(1)})`,
    ).to.be.lessThan(20);
  });

  test('refreshCell on placeholders sandwiched between rendered cells anchors on a cell after the placeholders', async () => {
    // Guards against the case where the viewport contains a block of placeholder
    // cells in between two blocks of fully-rendered ones, in which case we want
    // to ensure we anchor the scroll on the lower ones.
    const heights = new Map<number, number>();
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex(i: number): TemplateResult | undefined {
        const h = heights.get(i);
        if (h === undefined) return undefined;
        return html`<div style="height:${h}px">cell-${i}</div>`;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${500}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:30px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Set up three regions of cells, all 100px when rendered:
    //  - 190-199: above top of viewport top (partially clipped), already rendered
    //  - 200-204: placeholders, at top of viewport
    //  - 205-260: bottom of viewport below the placeholders, already rendered
    for (let i = 190; i <= 199; i += 1) heights.set(i, 100);
    for (let i = 205; i <= 260; i += 1) heights.set(i, 100);

    // Ensure cell 199 is partially clipped
    await el.scrollToCell(200, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;
    window.scrollBy(0, -50);
    await waitForFrame();
    await el.updateComplete;

    // Pick the topmost visible cell from the lower region
    // Its position shouldn't shift when the placeholders grow
    const cells = cellsOf(el);
    let belowAnchor: HTMLElement | null = null;
    for (const cell of cells) {
      const r = cell.getBoundingClientRect();
      const idx = Number(cell.dataset.cellIndex);
      if (
        idx >= 205 &&
        r.bottom > 0 &&
        r.top < window.innerHeight &&
        heights.has(idx)
      ) {
        belowAnchor = cell;
        break;
      }
    }
    expect(belowAnchor, 'no rendered cell visible below placeholder gap').to.not
      .be.null;
    const belowIdx = Number(belowAnchor!.dataset.cellIndex);
    const topBefore = belowAnchor!.getBoundingClientRect().top;

    // A cell from the upper region should also be visible
    let aboveClipped: HTMLElement | null = null;
    for (const cell of cells) {
      const idx = Number(cell.dataset.cellIndex);
      if (idx >= 190 && idx <= 199 && heights.has(idx)) {
        const r = cell.getBoundingClientRect();
        if (r.bottom > 0 && r.top < 0) {
          aboveClipped = cell;
          break;
        }
      }
    }
    expect(
      aboveClipped,
      'precondition: no rendered cell partially clipped above viewport',
    ).to.not.be.null;

    for (let i = 200; i <= 204; i += 1) heights.set(i, 100);
    for (let i = 200; i <= 204; i += 1) el.refreshCell(i);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    expect(belowAnchor!.isConnected, 'anchor cell missing from DOM').to.equal(
      true,
    );
    const topAfter = belowAnchor!.getBoundingClientRect().top;
    const delta = topAfter - topBefore;
    expect(
      Math.abs(delta),
      `cell ${belowIdx} shifted ${delta.toFixed(1)}px`,
    ).to.be.lessThan(20);
  });

  test('user scroll between capture and restore is preserved, not reverted by restore', async () => {
    const heights = new Map<number, number>();
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex(i: number): TemplateResult | undefined {
        const h = heights.get(i);
        if (h === undefined) return undefined;
        return html`<div style="height:${h}px">cell-${i}</div>`;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${500}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:30px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Same sandwich setup as the previous test
    for (let i = 190; i <= 199; i += 1) heights.set(i, 100);
    for (let i = 205; i <= 260; i += 1) heights.set(i, 100);
    await el.scrollToCell(200, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;
    window.scrollBy(0, -50);
    await waitForFrame();
    await el.updateComplete;

    // Track the position of a cell below the placeholders
    const cells = cellsOf(el);
    let belowCell: HTMLElement | null = null;
    for (const cell of cells) {
      const idx = Number(cell.dataset.cellIndex);
      if (idx >= 205 && heights.has(idx)) {
        const r = cell.getBoundingClientRect();
        if (r.top > 0 && r.top < window.innerHeight) {
          belowCell = cell;
          break;
        }
      }
    }
    expect(belowCell, 'no below-gap cell visible in viewport').to.not.be.null;
    const topBefore = belowCell!.getBoundingClientRect().top;

    for (let i = 200; i <= 204; i += 1) heights.set(i, 100);
    for (let i = 200; i <= 204; i += 1) el.refreshCell(i);

    // Simulate the user scrolling in between anchor capture and restore
    const simulatedUserScroll = 80;
    window.scrollBy(0, simulatedUserScroll);

    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // After the cycle, the below-gap cell should sit at roughly
    // (topBefore - simulatedUserScroll). I.e., the restore compensated
    // for the content shift only, but the intervening scroll is preserved.
    const topAfter = belowCell!.getBoundingClientRect().top;
    const cellShiftInViewport = topAfter - topBefore;
    expect(
      cellShiftInViewport,
      `cell shifted ${cellShiftInViewport.toFixed(1)}px`,
    ).to.be.lessThan(-simulatedUserScroll * 0.6);
  });

  test('articles carry inline min-height matching their cached row height', async () => {
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex: (i: number): TemplateResult | undefined =>
        html`<div style="height:${100 + (i % 7) * 15}px">cell-${i}</div>`,
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${300}
        .cellProvider=${cellProvider}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Force a shift in the buffer
    await el.scrollToCell(100, false);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cols = (el as any).cachedColumnsPerRow as number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowHeightCache = (el as any).rowHeightCache as {
      rowHeightFor(row: number): number;
    };

    const cells = cellsOf(el);
    expect(
      cells.length,
      'expected some cells to be rendered',
    ).to.be.greaterThan(0);
    const missingInlineMinHeight: number[] = [];
    const wrongCachedValue: {
      index: number;
      style: string;
      expected: number;
    }[] = [];
    for (const cell of cells) {
      const idxStr = cell.dataset.cellIndex;
      if (idxStr === undefined) continue;
      const index = parseInt(idxStr, 10);
      const inline = cell.style.minHeight;
      if (!inline) {
        missingInlineMinHeight.push(index);
        continue;
      }
      const row = Math.floor(index / cols);
      const expected = rowHeightCache.rowHeightFor(row);
      if (!inline.includes(`${expected}`)) {
        wrongCachedValue.push({ index, style: inline, expected });
      }
    }
    expect(
      missingInlineMinHeight,
      `articles missing inline min-height: ${missingInlineMinHeight.join(',')}`,
    ).to.deep.equal([]);
    expect(
      wrongCachedValue,
      `articles with min-height not reflecting cached row height: ${JSON.stringify(wrongCachedValue.slice(0, 3))}`,
    ).to.deep.equal([]);
  });

  test('does not compensate for external layout shifts above the scroller', async () => {
    // Anchor positions should be measured relative to the scroll container,
    // so changing the height of an external element above the scroller should
    // not trigger scroll anchoring compensation.
    const heights = new Map<number, number>();
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex(i: number): TemplateResult | undefined {
        const h = heights.get(i);
        if (h === undefined) return undefined;
        return html`<div style="height:${h}px">cell-${i}</div>`;
      },
    };
    const wrapper = await fixture<HTMLElement>(html`
      <div>
        <div id="header" style="height:50px">short header</div>
        <ia-infinite-scroller
          style="--infiniteScrollerCellMinHeight:0"
          .itemCount=${500}
          .cellProvider=${cellProvider}
          .placeholderCellTemplate=${html`<div style="height:30px">
            loading
          </div>`}
        ></ia-infinite-scroller>
      </div>
    `);
    const el = wrapper.querySelector(
      'ia-infinite-scroller',
    ) as IAInfiniteScroller;
    await el.bufferStabilized;

    expect(window.scrollY, 'page must start at top').to.equal(0);

    // Consumer's data arrives at the same time as the tall header content,
    // mimicking the production paint cycle.
    for (let i = 0; i <= 50; i += 1) heights.set(i, 100);
    for (let i = 0; i <= 50; i += 1) el.refreshCell(i);
    const header = wrapper.querySelector('#header') as HTMLElement;
    header.style.height = '450px';

    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    expect(
      window.scrollY,
      `page should remain at top; got scrollY=${window.scrollY}`,
    ).to.be.lessThan(20);
  });

  test('compensates for internal layout shifts above the viewport', async () => {
    // Opposite case to the above test: when cells INSIDE the scroller
    // the scroller grow, the we SHOULD compensate for the shift via
    // scroll anchoring on the visible cells.
    const heights = new Map<number, number>();
    const cellProvider: InfiniteScrollerCellProviderInterface = {
      cellForIndex(i: number): TemplateResult | undefined {
        const h = heights.get(i);
        if (h === undefined) return undefined;
        return html`<div style="height:${h}px">cell-${i}</div>`;
      },
    };
    const el = await fixture<IAInfiniteScroller>(
      html`<ia-infinite-scroller
        style="--infiniteScrollerCellMinHeight:0"
        .itemCount=${500}
        .cellProvider=${cellProvider}
        .placeholderCellTemplate=${html`<div style="height:30px">loading</div>`}
      ></ia-infinite-scroller>`,
    );
    await el.bufferStabilized;

    // Render the visible region so we have non-placeholder cells to anchor on.
    for (let i = 0; i <= 60; i += 1) heights.set(i, 100);
    for (let i = 0; i <= 60; i += 1) el.refreshCell(i);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    window.scrollTo(0, 300);
    await waitForFrame();

    // Find a visible rendered cell and record its viewport-relative top.
    const cells = cellsOf(el);
    let anchorCell: HTMLElement | null = null;
    for (const cell of cells) {
      const r = cell.getBoundingClientRect();
      const idx = Number(cell.dataset.cellIndex);
      if (r.bottom > 0 && r.top < window.innerHeight && heights.has(idx)) {
        anchorCell = cell;
        break;
      }
    }
    expect(anchorCell, 'visible rendered cell').to.not.be.null;
    const anchorIndex = Number(anchorCell!.dataset.cellIndex);
    const topBefore = anchorCell!.getBoundingClientRect().top;

    // Grow cells above the viewport; anchoring should compensate so the
    // chosen anchor cell stays at the same viewport-relative position.
    for (let i = 0; i <= 2; i += 1) heights.set(i, 400);
    for (let i = 0; i <= 2; i += 1) el.refreshCell(i);
    await el.updateComplete;
    await waitForFrame();
    await el.updateComplete;

    const anchorCellAfter = el.shadowRoot?.querySelector(
      `.cell-container[data-cell-index="${anchorIndex}"]`,
    ) as HTMLElement | null;
    expect(anchorCellAfter, 'anchor cell still in buffer').to.not.be.null;
    const topAfter = anchorCellAfter!.getBoundingClientRect().top;
    const delta = topAfter - topBefore;
    expect(
      Math.abs(delta),
      `anchor cell ${anchorIndex} shifted ${delta.toFixed(1)}px in viewport`,
    ).to.be.lessThan(20);
  });
});
