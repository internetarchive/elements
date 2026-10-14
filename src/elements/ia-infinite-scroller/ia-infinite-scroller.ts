import {
  LitElement,
  html,
  css,
  TemplateResult,
  CSSResultGroup,
  PropertyValues,
  nothing,
} from 'lit';
import { property, query, queryAll, state } from 'lit/decorators.js';
import { customElement } from '@src/util/custom-element';
import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import {
  findScrollContainer,
  isDocumentScroller,
} from './internal/scroll-container-utils';
import { RowHeightCache } from './internal/row-height-cache';
import { ScrollAnchor, ScrollAnchorPoint } from './internal/scroll-anchor';
import { generateRange } from './internal/range-generator';

export interface InfiniteScrollerCellProviderInterface {
  cellForIndex(index: number): TemplateResult | undefined;
}

export interface InfiniteScrollerInterface extends LitElement {
  /**
   * The number of cells to display. You may not have all the data for all the cells,
   * but you can optimistically display more tiles while you load the data that can be
   * displayed when it's loaded.
   *
   * You typically would update this when you're fetching the next batch of data.
   */
  itemCount: number;

  /**
   * The cell provider to provide cells for the scroller
   */
  cellProvider?: InfiniteScrollerCellProviderInterface;

  /**
   * A placeholder cell to display before the data has loaded
   */
  placeholderCellTemplate?: TemplateResult;

  /**
   * Disable scroll optimizations, such as lazy loading of cells
   * and removal when they're not on-screen.
   *
   * Scroll optimizations are useful for most browser-usage, but when pre-rendering with Rendertron,
   * the optimizations only show the first 10 cells and with a static page, we want
   * to see them all.
   */
  scrollOptimizationsDisabled: boolean;

  /**
   * Floor on the number of cells of offscreen margin to keep buffered
   * on either side of the viewport, regardless of viewport height.
   * If this represents only a partial row of grid cells, it will be
   * rounded up to the nearest full row. The actual buffer margins will
   * take into account the viewport size and `bufferMarginViewportScale`
   * too, but set this if you want to ensure a specific number of cells
   * are always preloaded into the buffer on either side of the viewport.
   * Default is 10.
   */
  minBufferMarginCells: number;

  /**
   * Ceiling on the total number of cells in the full buffered region
   * (visible + offscreen margin on both sides). When the initial cell
   * height estimates are too small, this can prevent situations where
   * far too many cells get buffered immediately. Consumers that
   * legitimately need more cells rendered at once can increase this,
   * while consumers that know upfront they will never need this many
   * cells in practice can lower it as a safeguard. Default is 500.
   */
  maxBufferedCells: number;

  /**
   * Scale factor controlling how many viewport-heights of offscreen
   * margin to keep buffered on each side. With a scale of 1, the
   * buffer extends one full viewport-height past each edge of the
   * visible region (the default).
   */
  bufferMarginViewportScale: number;

  /**
   * Estimated height of each cell in pixels, used to size the scroll
   * spacer and position the buffer transform before real cell heights
   * have been measured. Consumers can set this to match their expected
   * content height for more accurate initial scroll positioning.
   * Defaults to the CSS `--infiniteScrollerCellMinHeight` value.
   */
  estimatedCellHeight?: number;

  /**
   * Promise that resolves when the scroller's buffer has fully stabilized
   * after initialization or any change that triggers async measurement.
   * Consumers can await this to know when the scroller is ready for interaction.
   */
  readonly bufferStabilized: Promise<void>;

  /**
   * Reload the scroller
   */
  reload(): void;

  /**
   * Refreshes the content of the cell at the given index
   * @param index Which cell to refresh content for
   */
  refreshCell(index: number): void;

  /**
   * Refreshes the content of all cells within the rendered cell buffer range.
   *
   * Prefer this to the more expensive `reload()` when it is only necessary to
   * propagate a state change in the rendered cell contents and there is no need
   * for all cells to fully reload (as in the case of a major layout change).
   */
  refreshAllVisibleCells(): void;

  /**
   * Scroll to a cell index
   *
   * @param index number
   * @param animated boolean
   * @returns boolean if scroll was successful
   */
  scrollToCell(index: number, animated: boolean): Promise<boolean>;

  /**
   * Get the indices of the cells that are currently visible
   */
  getVisibleCellIndices(): number[];
}

/**
 * When the user clicks on a cell, we emit selection details
 * including the index that was selected and the original event.
 *
 * The cell DOM element can be accessed via `originalEvent.target`
 */
export type CellSelectionDetails = {
  index: number;
  originalEvent: Event;
};

/**
 * Fallback row height in pixels, used when no `estimatedCellHeight`
 * is given by the consumer and no container is mounted yet.
 * Chosen to over- rather than under-estimate, so we don't end up
 * with a too-short scrollbar.
 */
const INITIAL_ROW_HEIGHT = 300;

@customElement('ia-infinite-scroller')
export class IAInfiniteScroller
  extends LitElement
  implements InfiniteScrollerInterface
{
  /** @inheritdoc */
  @property({ type: Number }) itemCount = 0;

  /** @inheritdoc */
  @property({ type: Object })
  cellProvider?: InfiniteScrollerCellProviderInterface;

  /** @inheritdoc */
  @property({ type: Object }) placeholderCellTemplate?: TemplateResult;

  /** @inheritdoc */
  @property({ type: Boolean }) scrollOptimizationsDisabled = false;

  /** The accessible label for the infinite scroller section landmark */
  @property({ type: String }) ariaLandmarkLabel?: string;

  /** @inheritdoc */
  @property({ type: Number }) minBufferMarginCells = 10;

  /** @inheritdoc */
  @property({ type: Number }) maxBufferedCells = 500;

  /** @inheritdoc */
  @property({ type: Number }) bufferMarginViewportScale = 1;

  /** @inheritdoc */
  @property({ type: Number }) estimatedCellHeight?: number;

  @state() private totalContentHeight = 0;

  @state() private bufferOffsetY = 0;

  @state() private bufferStart = 0;

  @state() private bufferEnd = 0;

  @state() private rowGap = 0;

  /**
   * The sentinel is our marker to know when we need to load more data
   */
  @query('#sentinel') private sentinel?: HTMLDivElement;

  @query('#container') private container?: HTMLElement;

  @query('#scroll-spacer') private scrollSpacer?: HTMLDivElement;

  @queryAll('.cell-container') private cellContainers!: HTMLElement[];

  /**
   * Cache for all the cell/row tracking to ensure row heights stay
   * updated when cell heights and placeholder states change.
   *
   * Various convenience wrappers below for interacting with it.
   */
  private rowHeightCache = new RowHeightCache(INITIAL_ROW_HEIGHT);

  private get cachedColumnsPerRow(): number {
    return this.rowHeightCache.columnsPerRow;
  }

  private set cachedColumnsPerRow(colsPerRow: number) {
    this.rowHeightCache.columnsPerRow = colsPerRow;
  }

  private get defaultRowHeight(): number {
    return this.rowHeightCache.defaultRowHeight;
  }

  private set defaultRowHeight(newHeight: number) {
    this.rowHeightCache.defaultRowHeight = newHeight;
  }

  private get rowHeights(): ReadonlyMap<number, number> {
    return this.rowHeightCache.rowHeights;
  }

  private get placeholderRowHeight(): number | undefined {
    return this.rowHeightCache.placeholderRowHeight;
  }

  private set placeholderRowHeight(newHeight: number | undefined) {
    this.rowHeightCache.placeholderRowHeight = newHeight;
  }

  //
  // Cell tracking maps
  //

  /**
   * Map of rendered cell indices to their actual DOM elements in the buffer.
   * Rebuilt whenever the buffered set changes, and allows us to avoid making
   * repeated DOM queries in the hot path.
   */
  private cellContainerByIndex = new Map<number, HTMLElement>();

  /**
   * The indices of cells currently intersecting the viewport, as reported
   * by the cell IntersectionObserver.
   */
  private visibleCellIndices = new Set<number>();

  //
  // Scroll state and timers
  //

  /** A cache of the scroll container this scroller uses */
  private scrollContainer?: Element;

  private scrollRafId = 0;

  /**
   * Promise tracking an in-flight scroll layout update, so that further
   * calls to `scheduleScrollLayoutUpdate` can be coalesced into a single
   * update. The scroll anchor for that update is captured when the promise
   * starts.
   */
  private pendingScrollLayoutUpdate: Promise<void> | null = null;

  private scrollIdleTimer = 0;

  private scrollToCellInProgress = false;

  private scrollListenersActive = false;

  /**
   * A scroll-anchoring tool to capture/restore the position that cells
   * should maintain while new content renders in, to prevent content from
   * jumping around when placeholder content is replaced and heights change.
   */
  private scrollAnchor = new ScrollAnchor({
    getScrollContainer: () => this.getScrollContainer(),
    getCellContainers: () => this.cellContainers,
    getCellByIndex: (idx: number) => this.cellContainerForIndex(idx),
    isCellRendered: (cell: Element) => cell.hasAttribute('data-rendered'),
    isActive: () => !this.scrollToCellInProgress,
    getScrollerTop: () => this.getScrollerTop(),
  });

  private sentinelIsIntersecting = false;

  /**
   * Set when `scrollThresholdReached` fires; suppresses further events until
   * `itemCount` changes and the resulting render has painted.  This prevents
   * rapid-fire threshold events from the sentinel, while still allowing the
   * event to re-fire after new content has been laid out.
   */
  private sentinelEventPending = false;

  private sentinelIntersectionObserver = new IntersectionObserver(
    this.handleSentinelIntersection.bind(this),
  );

  private cellIntersectionObserver = new IntersectionObserver(
    this.handleCellIntersection.bind(this),
  );

  /**
   * Pending animation frame ID for the next resize-driven recompute.
   * The ResizeObserver callback defers its real work to an rAF so that
   * internal layout mutations this tick don't trigger it; coalescing also
   * means rapid successive resize entries collapse into one recompute.
   */
  private resizeRafId = 0;

  private resizeObserver = new ResizeObserver(this.handleResize.bind(this));

  //
  // Stabilization promise
  //

  private bufferStabilizedResolver?: () => void;

  /**
   * The latest stabilization promise. Always set: initialized in the
   * constructor and re-created by `beginStabilization` when a new
   * stabilization cycle starts. Stays in place (in its resolved state)
   * between cycles, so the `bufferStabilized` getter can return it
   * directly without a fallback.
   */
  private bufferStabilizedPromise!: Promise<void>;

  /**
   * Initializes a new infinite scroller with a `bufferStabilized` promise.
   */
  constructor() {
    super();
    // Eagerly begin buffer stabilization as soon as the component is created,
    // so consumers that immediately read the `bufferStabilized` promise will
    // receive the real pending promise instead of just a temporary
    // already-resolved one.
    this.beginStabilization();
  }

  //
  // Lit lifecycle methods
  //

  connectedCallback() {
    super.connectedCallback?.();
    this.scrollContainer = undefined;
    this.observeSentinel();
    this.setupObservations();
    if (this.container) this.resizeObserver.observe(this.container);
  }

  disconnectedCallback() {
    this.sentinelIntersectionObserver.disconnect();
    this.cellIntersectionObserver.disconnect();
    this.teardownScrollListener();
    this.resizeObserver?.disconnect();
    this.scrollContainer = undefined;
    this.endStabilization();
    super.disconnectedCallback?.();
  }

  firstUpdated() {
    this.observeSentinel();
    this.setupVirtualization();
  }

  willUpdate(changed: PropertyValues) {
    if (changed.has('itemCount')) {
      this.pruneStaleIndices();
      if (this.scrollOptimizationsDisabled) {
        this.bufferEnd = Math.max(0, this.itemCount - 1);
      }
      this.updateScrollLayout();
      this.syncBufferToScrollPosition();
    }
  }

  updated(changed: PropertyValues) {
    if (
      changed.has('itemCount') ||
      changed.has('scrollOptimizationsDisabled')
    ) {
      if (changed.has('itemCount')) {
        this.scheduleSentinelRecheck();
      }
      this.setupObservations();
    }

    // Whenever the set of buffered cells may have changed, we need to
    // refresh the map from indices to DOM elements.
    if (
      changed.has('bufferStart') ||
      changed.has('bufferEnd') ||
      changed.has('itemCount') ||
      changed.has('scrollOptimizationsDisabled')
    ) {
      this.refreshCellContainerCache();
    }

    // Buffer position changed; ensure cells are observed and visible set is updated
    if (changed.has('bufferStart') || changed.has('bufferEnd')) {
      this.emitVisibleCellsChanged();
      this.setupObservations();
      if (!this.scrollRafId && !this.scrollToCellInProgress) {
        this.scrollRafId = requestAnimationFrame(() => {
          this.scrollRafId = 0;
          this.syncBufferToScrollPosition();
        });
      }
    }

    // A change in estimated cell heights should invalidate the row height cache & re-layout
    if (changed.has('estimatedCellHeight')) {
      const prev = changed.get('estimatedCellHeight') as number | undefined;
      const curr = this.estimatedCellHeight;
      if (prev != null && curr != null && prev !== curr) {
        requestAnimationFrame(() => {
          this.resetCellLayoutCache();
          this.defaultRowHeight = this.computeDefaultRowHeight();
          this.updateScrollLayout();
          this.syncBufferToScrollPosition();
        });
      }
    }
  }

  /** @inheritdoc */
  get bufferStabilized(): Promise<void> {
    return this.bufferStabilizedPromise;
  }

  /**
   * Range of cell indices currently in the buffer.
   */
  private get bufferRange(): number[] {
    if (this.itemCount === 0) return [];
    const start = Math.max(0, this.bufferStart);
    const end = Math.min(this.bufferEnd, this.itemCount - 1);
    if (end < start) return [];
    return generateRange(start, end, 1);
  }

  //
  // Observer setup & handlers
  //

  /**
   * Observe the sentinel for the first time (firstUpdated / connectedCallback).
   * Subsequent re-observations happen only via `scheduleSentinelRecheck`.
   */
  private observeSentinel() {
    if (this.sentinel) this.sentinelIntersectionObserver.observe(this.sentinel);
  }

  /**
   * Re-attach the sentinel observer so it fires its initial callback again
   * with the current intersection state. Used by `reload()` and
   * `scheduleSentinelRecheck()` whenever the layout has changed enough that
   * we want the IO to re-evaluate whether the user is near the end.
   */
  private reobserveSentinel() {
    if (this.sentinel) {
      this.sentinelIntersectionObserver.unobserve(this.sentinel);
      this.sentinelIntersectionObserver.observe(this.sentinel);
    }
  }

  /**
   * After `itemCount` changes, waits for the re-render (with updated
   * spacer height) and one animation frame for paint, then clears the
   * pending flag and re-observes the sentinel so the IO can re-evaluate
   * whether the user is still near the end.
   */
  private scheduleSentinelRecheck(): void {
    this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this.sentinelEventPending = false;
        this.sentinelIsIntersecting = false;
        this.reobserveSentinel();
      });
    });
  }

  /**
   * Re-attach the cell IntersectionObserver to all current cell containers
   * and (re)install the scroll listener. Call from places where the
   * buffered cell set may have changed.
   */
  private setupObservations() {
    this.cellIntersectionObserver.disconnect();
    this.visibleCellIndices.clear();

    this.cellContainers.forEach((cell) =>
      this.cellIntersectionObserver.observe(cell),
    );

    if (!this.scrollListenersActive) {
      this.setupScrollListener();
    }
  }

  /**
   * IntersectionObserver callback for the sentinel: fires a one-shot
   * `scrollThresholdReached` event when the sentinel becomes visible,
   * and resets the "intersecting" flag when it leaves the viewport
   * so the event can fire again after more content loads.
   */
  private handleSentinelIntersection(
    entries: IntersectionObserverEntry[],
  ): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.sentinelIsIntersecting) {
        this.sentinelIsIntersecting = true;
        if (!this.sentinelEventPending) {
          this.sentinelEventPending = true;
          this.dispatchEvent(new Event('scrollThresholdReached'));
        }
      } else if (!entry.isIntersecting) {
        this.sentinelIsIntersecting = false;
      }
    });
  }

  /**
   * IntersectionObserver callback for the buffered cells: maintains the
   * `visibleCellIndices` set as cells enter/leave the viewport, then
   * dispatches a visibility change event.
   */
  private handleCellIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const cellContainer = entry.target as HTMLElement;
      const indexString = cellContainer.dataset.cellIndex;
      if (!indexString) return;
      const index = parseInt(indexString, 10);
      if (entry.isIntersecting) {
        this.visibleCellIndices.add(index);
      } else {
        this.visibleCellIndices.delete(index);
      }
    });

    this.emitVisibleCellsChanged();
  }

  /**
   * ResizeObserver callback. Defers its real work to an animation frame so
   * that internal layout mutations this tick don't trigger it, and so that
   * rapid successive resize entries collapse into a single recompute.
   */
  private handleResize(): void {
    if (this.resizeRafId) return;
    this.resizeRafId = requestAnimationFrame(() => {
      this.resizeRafId = 0;
      const newCols = this.getColumnsPerRow();
      if (newCols !== this.cachedColumnsPerRow) {
        this.cachedColumnsPerRow = newCols;
        this.resetCellLayoutCache();
        this.updateScrollLayout();
        this.syncBufferToScrollPosition();
      }
      if (this.rowHeights.size > 0) {
        this.rowHeightCache.recalculateDefaultRowHeight();
      } else {
        this.defaultRowHeight = this.computeDefaultRowHeight();
      }
    });
  }

  /**
   * Clear the per-cell and per-row height caches, and clear any inline
   * styles applied to the cells themselves for those values.
   */
  private resetCellLayoutCache(): void {
    this.rowHeightCache.clear();
    for (const cell of this.cellContainers) {
      cell.style.minHeight = '';
    }
  }

  //
  // Public API methods
  //

  /** @inheritdoc */
  reload() {
    this.visibleCellIndices.clear();
    this.rowHeightCache.clear();
    this.sentinelEventPending = false;
    this.sentinelIsIntersecting = false;
    this.scrollToCellInProgress = false;
    this.totalContentHeight = 0;
    this.bufferOffsetY = 0;
    this.bufferStart = 0;
    this.bufferEnd = this.computeInitialBufferEnd();

    this.updateScrollLayout();
    this.setupObservations();

    // Re-observe the sentinel so it can fire again with a clean state
    this.reobserveSentinel();

    // Immediately stabilize the buffer
    this.stabilizeBuffer();
  }

  /** @inheritdoc */
  refreshCell(index: number): void {
    if (index < this.bufferStart || index > this.bufferEnd) {
      // If we have to refresh a cell that's outside of the buffer, we don't
      // know its actual new content height so we should just invalidate its
      // cached height until we do.
      if (this.rowHeightCache.deleteCellHeight(index)) {
        this.rowHeightCache.recalculateAllRowHeights();
        this.scheduleScrollLayoutUpdate();
      }
      return;
    }
    this.scheduleScrollLayoutUpdate();
    // Lit re-evaluates `cellForIndex` for every buffered cell on the next
    // render. Diffing handles the new content efficiently; only this cell's
    // template will actually change.
    this.requestUpdate();
  }

  /** @inheritdoc */
  refreshAllVisibleCells(): void {
    this.scheduleScrollLayoutUpdate();
    this.requestUpdate();
  }

  /** @inheritdoc */
  async scrollToCell(index: number, animated: boolean): Promise<boolean> {
    if (index < 0 || index >= this.itemCount) return false;

    const behavior = animated ? 'smooth' : 'auto';

    // We don't want to handle scroll events normally while we're scrolling
    // to a cell, so flag it for now. Stays true until either we fail to find
    // the target cell, or the synchronous scroll completes, or (in the
    // animated case) the smooth scroll settles via scrollend/timeout.
    this.scrollToCellInProgress = true;

    // Cancel any pending scroll-driven work, since we're overriding it.
    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
      this.scrollRafId = 0;
    }
    if (this.scrollIdleTimer) {
      clearTimeout(this.scrollIdleTimer);
      this.scrollIdleTimer = 0;
    }

    // Invalidate any pending anchor restores, since any captured viewport
    // positions are about to be made meaningless by the jump.
    this.scrollAnchor.invalidate();

    this.snapBufferToCell(index);

    // First we render cells for the buffer range and fill them with content.
    // Then on the next animation frame we measure their real heights and
    // recompute the scroll-layout values so we can scroll the targeted cell
    // into view accurately.
    await this.updateComplete;
    await new Promise((r) => requestAnimationFrame(r));
    this.measureBufferedCells();
    this.updateScrollLayout();
    this.requestUpdate();
    await this.updateComplete;

    const targetCell = this.cellContainerForIndex(index);
    if (!targetCell) {
      this.scrollToCellInProgress = false;
      return false;
    }
    targetCell.scrollIntoView({ behavior });

    if (!animated) {
      // Synchronous scroll has already completed.
      this.scrollToCellInProgress = false;
      return true;
    }

    // Smooth scroll: keep scrollToCellInProgress=true until the animation
    // settles. Otherwise handleScroll would fire during the animation,
    // trigger syncBufferToScrollPosition, and the buffer shift's scroll
    // anchoring would call scrollBy. That would cancel the in-flight smooth
    // scroll and strand the user well short of the target.
    await this.nextSmoothScrollEnd();

    this.scrollToCellInProgress = false;
    return true;
  }

  /** @inheritdoc */
  getVisibleCellIndices(): number[] {
    return Array.from(this.visibleCellIndices);
  }

  /**
   * Prunes any obsolete indices from the visible cell set and the row
   * height cache that lie outside the range defined by the current
   * itemCount.
   */
  private pruneStaleIndices() {
    for (const index of this.visibleCellIndices) {
      if (index >= this.itemCount) this.visibleCellIndices.delete(index);
    }
    this.rowHeightCache.pruneAtOrAbove(this.itemCount);
    this.rowHeightCache.recalculateAllRowHeights();
  }

  /**
   * Snap `bufferStart`/`bufferEnd` to the row containing `index`, with a
   * margin of `bufferRows` rows on each side. Used by `scrollToCell`
   * as the initial buffer setup, before any of the target's cells have
   * been rendered or measured (following up with accurate measurements
   * once the DOM updates).
   *
   * The bounds must be snapped to row boundaries (multiples of `cols`):
   * otherwise the CSS grid lays the buffered cells out starting from
   * column 0 instead of from the target cell's true column, producing a
   * visual misalignment that the next `syncBufferToScrollPosition` would
   * then correct with a visible jump.
   */
  private snapBufferToCell(index: number): void {
    const container = this.getScrollContainer();
    const viewportHeight = isDocumentScroller(container)
      ? window.innerHeight
      : container.clientHeight;
    const cols = this.cachedColumnsPerRow;
    const visibleRows = Math.ceil(viewportHeight / this.defaultRowHeight);
    const minMarginRows = Math.ceil(this.minBufferMarginCells / cols);
    const proportionalMarginRows = Math.ceil(
      visibleRows * this.bufferMarginViewportScale,
    );
    let marginRows = Math.max(minMarginRows, proportionalMarginRows);
    // Cap total buffer cells at maxBufferedCells. The total is the
    // visible window plus margin rows on both sides.
    const maxMarginRows = Math.max(
      0,
      Math.floor((this.maxBufferedCells - visibleRows * cols) / (2 * cols)),
    );
    marginRows = Math.min(marginRows, maxMarginRows);

    const targetRow = Math.floor(index / cols);
    const totalRows = this.getTotalRows();
    const startRow = Math.max(0, targetRow - marginRows);
    const endRow = Math.min(totalRows - 1, targetRow + marginRows);
    this.bufferStart = startRow * cols;
    this.bufferEnd = Math.min(this.itemCount - 1, (endRow + 1) * cols - 1);
    this.updateScrollLayout();
  }

  /**
   * Resolves when the next smooth-scroll animation settles. Listens for
   * the native `scrollend` event (preferred) and falls back to a 2s
   * timeout for browsers that don't fire it (older Firefox/Safari).
   * The fallback timeout is also a safety net for very long animations:
   * if the actual scroll runs longer than 2s, the buffer will resume
   * normal updates a bit early but the animation itself isn't disrupted.
   */
  private nextSmoothScrollEnd(): Promise<void> {
    return new Promise((resolve) => {
      const scrollContainer = this.getScrollContainer();
      const eventTarget: EventTarget = isDocumentScroller(scrollContainer)
        ? window
        : scrollContainer;
      let fallbackId = 0;
      let cleaned = false;
      const cleanup = (): void => {
        if (cleaned) return;
        cleaned = true;
        eventTarget.removeEventListener('scrollend', cleanup);
        if (fallbackId) window.clearTimeout(fallbackId);
        resolve();
      };
      eventTarget.addEventListener('scrollend', cleanup, { once: true });
      fallbackId = window.setTimeout(cleanup, 2000);
    });
  }

  //
  // Virtualization setup & stabilization
  //

  /**
   * Initial setup needed for virtualized rendering of cells
   */
  private setupVirtualization(): void {
    this.cachedColumnsPerRow = this.getColumnsPerRow();
    this.rowGap = this.getRowGap();
    this.defaultRowHeight = this.computeDefaultRowHeight();

    // Start with a modest initial buffer; it will be refined after first paint
    this.bufferStart = 0;
    this.bufferEnd = this.computeInitialBufferEnd();
    this.updateScrollLayout();

    this.setupScrollListener();

    // First-mount observation of the container for layout changes (column
    // count, host resize, etc.). The ResizeObserver itself is a field
    // initializer; re-observation after a disconnect/reconnect cycle is
    // handled by connectedCallback.
    if (this.container) this.resizeObserver.observe(this.container);

    this.stabilizeBuffer();
  }

  /**
   * Asynchronously attempts to stabilize the buffered range of cells.
   * Waits a frame after cells paint, measures real row heights, recomputes
   * the buffer, and finally resolves the `bufferStabilized` promise.
   */
  private async stabilizeBuffer(): Promise<void> {
    this.beginStabilization();
    await this.updateComplete;

    this.refreshCellContainerCache();
    this.emitVisibleCellsChanged();

    // After child components paint, measure real heights and (if needed) recompute
    // the buffer to fill the viewport accurately.
    requestAnimationFrame(() => {
      this.measureBufferedCells();
      this.rowHeightCache.recalculateDefaultRowHeight();
      this.syncBufferToScrollPosition();
      this.updateComplete.then(() => {
        this.endStabilization();
      });
    });
  }

  /** Sets up the bufferStabilized promise for callers to await */
  private beginStabilization(): void {
    if (!this.bufferStabilizedResolver) {
      this.bufferStabilizedPromise = new Promise((resolve) => {
        this.bufferStabilizedResolver = resolve;
      });
    }
  }

  /** Resolves the bufferStabilized promise and emits a corresponding event */
  private endStabilization(): void {
    if (!this.bufferStabilizedResolver) return;
    this.bufferStabilizedResolver();
    this.bufferStabilizedResolver = undefined;
    this.dispatchEvent(new Event('bufferStabilized'));
  }

  //
  // Scroll listener setup & teardown
  //

  private setupScrollListener(): void {
    this.teardownScrollListener();
    const container = this.getScrollContainer();
    const target = isDocumentScroller(container) ? window : container;
    target.addEventListener('scroll', this.handleScroll, { passive: true });
    this.scrollListenersActive = true;
  }

  private teardownScrollListener(): void {
    if (!this.scrollListenersActive) return;
    if (this.scrollContainer) {
      const target = isDocumentScroller(this.scrollContainer)
        ? window
        : this.scrollContainer;
      target.removeEventListener('scroll', this.handleScroll);
    }

    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
      this.scrollRafId = 0;
    }
    if (this.scrollIdleTimer) {
      clearTimeout(this.scrollIdleTimer);
      this.scrollIdleTimer = 0;
    }
    this.scrollListenersActive = false;
  }

  //
  // Scroll layout & geometry helpers
  //

  /**
   * Returns how many columns each row of the scroller grid currently contains, if
   * using CSS grid (or 1 if not).
   */
  private getColumnsPerRow(): number {
    if (!this.container) return 1;
    const cols = getComputedStyle(this.container).gridTemplateColumns;
    return cols.split(' ').filter((s) => s.length > 0).length || 1;
  }

  /**
   * Returns the row-gap style applied to the scroll container, in pixels.
   */
  private getRowGap(): number {
    if (!this.container) return 0;
    return parseFloat(getComputedStyle(this.container).rowGap) || 0;
  }

  /**
   * Returns the total number of rows the current item count could produce, given
   * the current number of columns.
   */
  private getTotalRows(): number {
    return Math.ceil(this.itemCount / this.cachedColumnsPerRow);
  }

  /**
   * Computes the initial `bufferEnd` value used by `reload()` and
   * `setupVirtualization()` when the buffer starts at index 0 (i.e. before
   * any user scrolling). Generously over-allocates compared to the
   * per-shift formula in `syncBufferToScrollPosition` because we don't yet
   * know real row heights; the buffer is refined after first paint via
   * `stabilizeBuffer()`.
   */
  private computeInitialBufferEnd(): number {
    if (this.scrollOptimizationsDisabled) {
      return Math.max(0, this.itemCount - 1);
    }
    const estimatedVisibleRows = Math.ceil(
      window.innerHeight / this.defaultRowHeight,
    );
    // The initial buffer starts at index 0, so its full extent is
    // visible + margin worth of cells. We treat both margins as
    // contributing to the below-viewport buffer since there's nothing
    // above index 0 to absorb the "above" side.
    const minBuffer = this.minBufferMarginCells * 2;
    const proportionalBuffer =
      estimatedVisibleRows *
      (1 + this.bufferMarginViewportScale * 2) *
      this.cachedColumnsPerRow;
    return Math.min(
      Math.max(minBuffer, proportionalBuffer),
      this.maxBufferedCells,
      this.itemCount - 1,
    );
  }

  private computeDefaultRowHeight(): number {
    if (this.estimatedCellHeight != null) return this.estimatedCellHeight;
    if (!this.container) return INITIAL_ROW_HEIGHT;
    const temp = document.createElement('div');
    temp.style.height = 'var(--infiniteScrollerCellMinHeight, 22.5rem)';
    this.container.appendChild(temp);
    const height = temp.offsetHeight;
    temp.remove();
    return height || INITIAL_ROW_HEIGHT;
  }

  /**
   * Finds and returns the nearest scrolling container in this component's
   * ancestry, caching the result. The cache is cleared in
   * `disconnectedCallback`/`connectedCallback` because the DOM ancestor
   * chain may differ across attachments.
   */
  private getScrollContainer(): Element {
    if (this.scrollContainer) return this.scrollContainer;
    this.scrollContainer = findScrollContainer(this);
    return this.scrollContainer;
  }

  /**
   * Returns the top of the scroller's own content area in the viewport
   * Used for performing scroll anchoring relative to the scroller itself.
   */
  private getScrollerTop(): number {
    const rectElement = this.scrollSpacer ?? this.container;
    if (!rectElement) return 0;
    return rectElement.getBoundingClientRect().top;
  }

  /**
   * Recompute the two derived scroll-layout values that depend on the
   * current per-row height estimates:
   *  - `totalContentHeight`: the height the scroll spacer needs to be
   *    so the document can scroll across the entire virtual content,
   *    including the unrendered rows above and below the buffer.
   *  - `bufferOffsetY`: the Y offset (via CSS transform) at which the
   *    rendered buffer is positioned within that virtual space, so it
   *    visually occupies the rows the user has scrolled the viewport to.
   *
   * Called after `rowHeights` changes; e.g. after `measureBufferedCells`
   * records new heights, or after a buffer shift adopts/forgets rows.
   * Cheap (one pass over the rows); safe to call frequently.
   */
  private updateScrollLayout(): void {
    const totalRows = this.getTotalRows();
    if (totalRows === 0) {
      this.totalContentHeight = 0;
      this.bufferOffsetY = 0;
      return;
    }
    const { rowGap } = this;
    this.totalContentHeight = this.rowHeightCache.sumRowHeights(
      0,
      totalRows - 1,
      rowGap,
    );
    const bufferStartRow = Math.floor(
      this.bufferStart / this.cachedColumnsPerRow,
    );
    // sumRowHeights(0, k-1) returns sum(heights) + (k-1) * rowGap.
    // Row k's top edge is at sum(heights) + k*rowGap, so add one rowGap.
    this.bufferOffsetY =
      bufferStartRow > 0
        ? this.rowHeightCache.sumRowHeights(0, bufferStartRow - 1, rowGap) +
          rowGap
        : 0;
  }

  /**
   * Event handler for passive scroll events, throttled to minimize unnecessary updates.
   */
  private handleScroll = (): void => {
    if (this.scrollOptimizationsDisabled) return;
    if (this.scrollToCellInProgress) return;
    // We just adjusted scrollTop for scroll anchoring; ignore the
    // resulting event so the recompute doesn't reverse our compensation.
    if (this.scrollAnchor.shouldSuppressNextScrollEvent()) return;

    if (!this.scrollRafId) {
      this.scrollRafId = requestAnimationFrame(() => {
        this.scrollRafId = 0;
        this.syncBufferToScrollPosition();
      });
    }
    // Fire the idle handling only once, after scrolling stops
    if (this.scrollIdleTimer) clearTimeout(this.scrollIdleTimer);
    this.scrollIdleTimer = window.setTimeout(() => {
      this.scrollIdleTimer = 0;
      this.syncBufferToScrollPosition();
    }, 150);
  };

  /**
   * Schedule a coalesced scroll-layout update: re-measure buffered cell
   * heights, recompute the spacer & buffer size/positioning, and re-anchor
   * the visible scroll position. Called after any DOM mutation that could
   * change in-buffer row heights.
   *
   * If an update is already pending, this call will be a no-op.
   */
  private scheduleScrollLayoutUpdate(): void {
    if (this.pendingScrollLayoutUpdate) return;
    const anchor = this.scrollAnchor.capture();
    this.pendingScrollLayoutUpdate = this.runScrollLayoutUpdate(anchor);
  }

  /**
   * The async body for a scheduled scroll-layout update. Holds the
   * pre-mutation `anchor` in closure scope across an animation frame,
   * then re-measures, recomputes layout, and restores the anchor once
   * Lit has rendered (when geometry changed) or immediately otherwise.
   *
   * The finally block ensures `pendingScrollLayoutUpdate` is cleared
   * regardless of errors, so the next batch can start.
   */
  private async runScrollLayoutUpdate(
    anchor: ScrollAnchorPoint | null,
  ): Promise<void> {
    try {
      await new Promise((r) => requestAnimationFrame(r));
      this.measureBufferedCells();
      this.updateScrollLayout();
      // updateScrollLayout() may trigger an update + re-render
      // We can restore the scroll anchor positioning afterwards
      await this.updateComplete;
      this.scrollAnchor.restore(anchor);
    } finally {
      this.pendingScrollLayoutUpdate = null;
    }
  }

  private measureBufferedCells(): void {
    let placeholderHeightsCleared = false;
    for (const cell of this.cellContainers) {
      const indexStr = cell.dataset.cellIndex;
      if (!indexStr) continue;
      const index = parseInt(indexStr, 10);
      if (cell.hasAttribute('data-rendered')) {
        if (cell.offsetHeight > 0) {
          this.rowHeightCache.recordCellHeight(index, cell.offsetHeight);
        }
      } else if (this.rowHeightCache.deleteCellHeight(index)) {
        // Placeholder cell with a stale measurement from when it was
        // previously rendering content; clear so the row's height estimate
        // reflects the placeholder, not the inflated content measurement.
        placeholderHeightsCleared = true;
      }
    }
    if (placeholderHeightsCleared) {
      this.rowHeightCache.recalculateAllRowHeights();
    }

    this.updatePlaceholderRowHeight();
  }

  /**
   * Estimates the typical placeholder row height by averaging the offsetHeight
   * of placeholders that lie in **placeholder-only rows** (rows containing no
   * rendered/measured siblings). Mixed rows inflate placeholder cells to the
   * row's max, which biases a single-sample capture. By restricting to
   * placeholder-only rows we get a clean signal of the placeholder's intrinsic
   * height; if no placeholder-only rows are currently buffered we keep the
   * previous estimate rather than overwriting it with an inflated value.
   */
  private updatePlaceholderRowHeight(): void {
    const { placeholdersByRow, renderedRows } = this.groupCellsByRow();
    if (placeholdersByRow.size === 0) return;

    let sum = 0;
    let count = 0;
    for (const [row, cells] of placeholdersByRow) {
      // Placeholder-height sampling must restrict to placeholder-only rows
      // because CSS grid inflates the placeholder cells in mixed rows to
      // match the row's rendered siblings, masking their intrinsic height.
      if (renderedRows.has(row)) continue;
      for (const cell of cells) {
        if (cell.offsetHeight > 0) {
          sum += cell.offsetHeight;
          count += 1;
        }
      }
    }
    if (count > 0) {
      this.placeholderRowHeight = sum / count;
    }
    // If no placeholder-only rows are currently buffered, keep the previous
    // estimate rather than overwriting with an inflated mixed-row value.
  }

  /**
   * Walks the current buffer once and groups its cells by row, splitting
   * into placeholder cells (per-row lists, for height sampling) and rows
   * that contain at least one rendered cell (a Set, for the
   * placeholder-only filter in `updatePlaceholderRowHeight`).
   *
   * We track rendered cells by row presence (not the actual cells) since
   * the placeholder-height calculation only needs "does this row have any
   * rendered siblings?", and we explicitly want to ignore historical
   * `cellHeights` from cells the user scrolled past. The DOM
   * `data-rendered` attribute on each cell reflects only its *current*
   * render, so it gives the right signal here.
   */
  private groupCellsByRow(): {
    placeholdersByRow: Map<number, HTMLElement[]>;
    renderedRows: Set<number>;
  } {
    const cols = this.cachedColumnsPerRow;
    const placeholdersByRow = new Map<number, HTMLElement[]>();
    const renderedRows = new Set<number>();
    for (const cell of this.cellContainers) {
      const indexStr = cell.dataset.cellIndex;
      if (!indexStr) continue;
      const row = Math.floor(parseInt(indexStr, 10) / cols);
      if (cell.hasAttribute('data-rendered')) {
        renderedRows.add(row);
      } else {
        const existing = placeholdersByRow.get(row);
        if (existing) existing.push(cell);
        else placeholdersByRow.set(row, [cell]);
      }
    }
    return { placeholdersByRow, renderedRows };
  }

  private syncBufferToScrollPosition(): void {
    if (this.scrollOptimizationsDisabled) return;
    // Re-measure heights of buffered cells, since child components may have
    // rendered since the cells were created
    this.measureBufferedCells();

    if (!this.container) return;
    const totalRows = this.getTotalRows();
    if (totalRows === 0) return;

    const viewport = this.getContentRelativeViewport();
    const { firstVisibleRow, lastVisibleRow } = this.findVisibleRowRange(
      viewport.relativeScrollTop,
      viewport.relativeScrollBottom,
      totalRows,
    );
    if (this.bufferHasSufficientMargin(firstVisibleRow, lastVisibleRow)) return;

    const { newStart, newEnd } = this.computeBufferBounds(
      firstVisibleRow,
      lastVisibleRow,
      totalRows,
      viewport.viewportHeight,
    );
    if (newStart === this.bufferStart && newEnd === this.bufferEnd) return;

    // Capture the visible anchor before mutating bufferStart/bufferEnd. The
    // buffer shift typically changes bufferOffsetY by a different amount
    // than the user's scrollTop just changed (e.g., when newly-absorbed
    // rows have stale content-sized rowHeights from prior browsing), which
    // would otherwise yank the visible content forward or backward.
    const anchor = this.scrollAnchor.capture();

    // Update the default-row-height estimate to track the average of the
    // currently-measured rows. We intentionally do NOT clear placeholder row
    // heights here even when the current buffer has no placeholders, because
    // there may still be placeholders elsewhere in the full span of cells.
    // Clearing it can cause the buffer offset to oscillate between a
    // placeholderRowHeight-based estimate and a defaultRowHeight-based one
    // as the user scrolls through mixed regions, producing visible jumping.
    // The placeholder estimate is reset only on reload() or a column-count
    // change.
    if (this.rowHeights.size > 0) {
      this.rowHeightCache.recalculateDefaultRowHeight();
    }
    this.bufferStart = newStart;
    this.bufferEnd = newEnd;
    this.updateScrollLayout();
    // Lit needs to re-render with the new buffer + transform before
    // bounding-rect calls will reflect the new layout.
    this.updateComplete.then(() => {
      this.scrollAnchor.restore(anchor);
    });
  }

  /**
   * Computes the current viewport's location within the scroller's content
   * area, accounting for whether the scroller is the document or a nested
   * overflow container. Returns the viewport's top/bottom expressed as
   * pixel offsets _within the scroller content_ (where 0 represents the top
   * of the scroller itself). The container element must exist, or this method
   * will throw.
   */
  private getContentRelativeViewport(): {
    relativeScrollTop: number;
    relativeScrollBottom: number;
    viewportHeight: number;
  } {
    const scrollContainer = this.getScrollContainer();
    const scrollTop = isDocumentScroller(scrollContainer)
      ? window.scrollY
      : scrollContainer.scrollTop;
    const viewportHeight = isDocumentScroller(scrollContainer)
      ? window.innerHeight
      : scrollContainer.clientHeight;

    const rectElement = this.scrollSpacer ?? this.container!;
    const spacerRect = rectElement.getBoundingClientRect();
    const containerTopInScroller = isDocumentScroller(scrollContainer)
      ? spacerRect.top + window.scrollY
      : spacerRect.top +
        scrollContainer.scrollTop -
        scrollContainer.getBoundingClientRect().top;

    const relativeScrollTop = scrollTop - containerTopInScroller;
    return {
      relativeScrollTop,
      relativeScrollBottom: relativeScrollTop + viewportHeight,
      viewportHeight,
    };
  }

  /**
   * Walks row heights to find the first and last rows currently visible
   * within the viewport range `[relativeScrollTop, relativeScrollBottom)`.
   * Uses the row height cache to acquire estimates/measurements of rows.
   */
  private findVisibleRowRange(
    relativeScrollTop: number,
    relativeScrollBottom: number,
    totalRows: number,
  ): { firstVisibleRow: number; lastVisibleRow: number } {
    const { rowGap } = this;
    let heightSoFar = 0;
    let firstVisibleRow = 0;
    let lastVisibleRow = totalRows - 1;
    let foundFirst = false;

    for (let r = 0; r < totalRows; r += 1) {
      const rowHeight = this.rowHeightCache.rowHeightFor(r);
      const rowTop = heightSoFar;
      const rowBottom = heightSoFar + rowHeight;

      if (!foundFirst && rowBottom > relativeScrollTop) {
        firstVisibleRow = r;
        foundFirst = true;
      }
      if (foundFirst && rowTop >= relativeScrollBottom) {
        lastVisibleRow = r - 1;
        break;
      }

      heightSoFar += rowHeight + rowGap;
    }

    return { firstVisibleRow, lastVisibleRow };
  }

  /**
   * Returns true if the current buffer is comfortably larger than the visible
   * range. Specifically, at least `minMargin` rows of headroom must exist on
   * each side. When the buffer has sufficient margin, we deliberately skip
   * recomputing buffer bounds to avoid jittering back and forth on every
   * scroll tick.
   */
  private bufferHasSufficientMargin(
    firstVisibleRow: number,
    lastVisibleRow: number,
  ): boolean {
    const cols = this.cachedColumnsPerRow;
    const minMarginRows = Math.ceil(this.minBufferMarginCells / cols);
    const numVisibleRows = lastVisibleRow - firstVisibleRow + 1;
    const proportionalMarginRows = Math.ceil(
      numVisibleRows * this.bufferMarginViewportScale,
    );
    const marginRows = Math.max(minMarginRows, proportionalMarginRows);

    const currentStartRow = Math.floor(this.bufferStart / cols);
    const currentEndRow = Math.floor(
      Math.min(this.bufferEnd, this.itemCount - 1) / cols,
    );
    const minMargin = Math.max(2, Math.floor(marginRows / 3));
    return (
      firstVisibleRow >= currentStartRow + minMargin &&
      lastVisibleRow <= currentEndRow - minMargin
    );
  }

  /**
   * Computes where the rendered buffer should sit given the current
   * visible row range, returning the new buffer's start and end cell indices.
   *
   * The buffer is extended past the visible rows by whichever is larger:
   * the cell-count-based floor from `minBufferMarginCells`, or an extension
   * proportional to the viewportHeight (controlled by
   * `bufferMarginViewportScale`). The total buffered region is then capped
   * at `maxBufferedCells`.
   */
  private computeBufferBounds(
    firstVisibleRow: number,
    lastVisibleRow: number,
    totalRows: number,
    viewportHeight: number,
  ): { newStart: number; newEnd: number } {
    const cols = this.cachedColumnsPerRow;
    const { rowGap } = this;
    const minMarginRows = Math.ceil(this.minBufferMarginCells / cols);

    // Walk outward from the visible range in px to size the buffer, since
    // placeholder rows can be very different sizes from fully-rendered ones
    // (using row count alone would leave blank gaps in mixed-load regions).
    const minMarginPx =
      viewportHeight * Math.max(1, this.bufferMarginViewportScale);

    let newStartRow = firstVisibleRow;
    let startPx = 0;
    while (newStartRow > 0 && startPx < minMarginPx) {
      newStartRow -= 1;
      startPx += this.rowHeightCache.rowHeightFor(newStartRow) + rowGap;
    }

    let newEndRow = lastVisibleRow;
    let endPx = 0;
    while (newEndRow < totalRows - 1 && endPx < minMarginPx) {
      newEndRow += 1;
      endPx += this.rowHeightCache.rowHeightFor(newEndRow) + rowGap;
    }

    // Apply count-based floor from minBufferMarginCells
    newStartRow = Math.min(
      newStartRow,
      Math.max(0, firstVisibleRow - minMarginRows),
    );
    newEndRow = Math.max(
      newEndRow,
      Math.min(totalRows - 1, lastVisibleRow + minMarginRows),
    );

    // Apply the cap from maxBufferedCells limiting the total buffer size.
    // If we overshoot it, trim both sides symmetrically.
    // If the min margin conflicts with the max, the min wins.
    const maxRows = Math.ceil(this.maxBufferedCells / cols);
    let bufferedRows = newEndRow - newStartRow + 1;
    if (bufferedRows > maxRows) {
      const overshoot = bufferedRows - maxRows;
      const trimLeft = Math.min(
        Math.floor(overshoot / 2),
        Math.max(0, firstVisibleRow - newStartRow - minMarginRows),
      );
      newStartRow += trimLeft;
      bufferedRows = newEndRow - newStartRow + 1;
      const trimRight = Math.min(
        bufferedRows - maxRows,
        Math.max(0, newEndRow - lastVisibleRow - minMarginRows),
      );
      newEndRow -= trimRight;
    }

    return {
      newStart: newStartRow * cols,
      newEnd: Math.min((newEndRow + 1) * cols - 1, this.itemCount - 1),
    };
  }

  //
  // Lit rendering & cell buffer operations
  //

  render(): TemplateResult {
    const { bufferRange, bufferOffsetY, totalContentHeight, itemCount } = this;
    const containerAriaLabel = this.ariaLandmarkLabel ?? nothing;
    return html`
      <div id="scroll-spacer" style="height:${totalContentHeight}px">
        <div id="sentinel" aria-hidden="true"></div>
        <section
          id="container"
          role="feed"
          aria-label=${containerAriaLabel}
          style="transform:translateY(${bufferOffsetY}px)"
          @transitionend=${this.handleContainerTransition}
        >
          ${map(bufferRange, (index) => {
            const cellTemplate = this.cellProvider?.cellForIndex(index);
            // Pin the <article> min-height to its cached row height so
            // that the cells don't collapse when their content gets shuffled.
            // Without this we risk restoring the scroll anchor to an
            // incorrect position with the collapsed cells.
            const row = Math.floor(index / this.cachedColumnsPerRow);
            const rowHeight = this.rowHeightCache.rowHeightFor(row);
            return html`<article
              class="cell-container"
              aria-posinset=${index + 1}
              aria-setsize=${itemCount}
              data-cell-index=${index}
              ?data-rendered=${cellTemplate != null}
              style="min-height: max(${rowHeight}px, var(--infiniteScrollerCellMinHeight, 22.5rem))"
              @click=${this.handleCellClick}
              @keyup=${this.handleCellKeyup}
            >
              ${keyed(
                index,
                cellTemplate ?? this.placeholderCellTemplate ?? nothing,
              )}
            </article>`;
          })}
          ${this.bufferEnd >= itemCount - 1
            ? html`<slot name="result-last-tile"></slot>`
            : nothing}
        </section>
      </div>
    `;
  }

  /**
   * Handler to update the cached row-gap value whenever it changes
   * (making use of the transitionend event).
   */
  private handleContainerTransition(e: TransitionEvent): void {
    if (e.propertyName === 'row-gap') {
      this.rowGap = this.getRowGap();
      this.updateScrollLayout();
    }
  }

  private emitVisibleCellsChanged() {
    this.dispatchEvent(
      new CustomEvent('visibleCellsChanged', {
        detail: {
          visibleCellIndices: Array.from(this.visibleCellIndices),
        },
      }),
    );
  }

  /**
   * Handler to emit an event whenever a cell is clicked
   */
  private cellSelected(e: Event, index: number) {
    const event = new CustomEvent<CellSelectionDetails>('cellSelected', {
      detail: {
        index,
        originalEvent: e,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * Click handler bound on each cell's `<article>` element. Stable identity
   * across renders (so Lit binds the listener once per element rather than
   * re-binding a fresh closure each render). Reads the cell index from
   * `data-cell-index` since the same `<article>` element represents
   * different indices as the buffer slides.
   */
  private handleCellClick = (event: Event): void => {
    const cell = event.currentTarget as HTMLElement | null;
    const indexStr = cell?.dataset.cellIndex;
    if (indexStr == null) return;
    this.cellSelected(event, parseInt(indexStr, 10));
  };

  /**
   * Enter-key handler bound on each cell's `<article>` element. Same
   * stable-identity reasoning as `handleCellClick`.
   */
  private handleCellKeyup = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter') return;
    this.handleCellClick(event);
  };

  private cellContainerForIndex(index: number): HTMLElement | null {
    // Cache populated by refreshCellContainerCache() on every render where
    // the buffered cell set changes; lookup is O(1) with no
    // shadow-DOM query.
    return this.cellContainerByIndex.get(index) ?? null;
  }

  /**
   * Rebuilds `cellContainerByIndex` from the current `.cell-container` DOM
   * elements. Call from `updated()` whenever the buffer's set of rendered
   * cells has changed (bufferStart or bufferEnd mutation). Other state
   * changes don't add/remove cells from the DOM, so the cache remains
   * valid until the next buffer shift.
   */
  private refreshCellContainerCache(): void {
    this.cellContainerByIndex.clear();
    const cells = this.cellContainers;
    for (const cell of cells) {
      const idxStr = cell.dataset.cellIndex;
      if (idxStr !== undefined) {
        this.cellContainerByIndex.set(Number(idxStr), cell);
      }
    }
  }

  //
  // Styles
  //

  static get styles(): CSSResultGroup {
    const sentinelHeightCss = css`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`;
    const rowGapSizeCss = css`var(--infiniteScrollerRowGap, 1.7rem)`;
    const colGapSizeCss = css`var(--infiniteScrollerColGap, 1.7rem)`;
    const cellMinWidth = css`var(--infiniteScrollerCellMinWidth, 16rem)`;
    const cellMaxWidth = css`var(--infiniteScrollerCellMaxWidth, 1fr)`;
    const cellMinHeight = css`var(--infiniteScrollerCellMinHeight, 22.5rem)`;
    const cellMaxHeight = css`var(--infiniteScrollerCellMaxHeight, none)`;
    const cellOutline = css`var(--infiniteScrollerCellOutline, 0)`;

    return css`
      :host {
        /**
         * We handle scroll anchoring ourselves for fine-tuning, so opt out
         * of the browser's built-in anchoring (which can interfere with ours
         * and cause undesirable content jitter). 
         */
        overflow-anchor: none;
      }

      #scroll-spacer,
      #container,
      .cell-container {
        /**
         * overflow-anchor does not cascade, so descendents need to opt out too
         */
        overflow-anchor: none;
      }

      #container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        grid-row-gap: ${rowGapSizeCss};
        row-gap: ${rowGapSizeCss};
        grid-column-gap: ${colGapSizeCss};
        column-gap: ${colGapSizeCss};

        /* This transition allows us to listen for changes to the row-gap */
        transition: row-gap 1ms linear;
      }

      @supports (display: grid) {
        #container {
          display: grid;
          flex-wrap: nowrap;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${cellMinWidth}, ${cellMaxWidth})
          );
        }
      }

      .cell-container {
        outline: ${cellOutline};
        min-height: ${cellMinHeight};
        max-height: ${cellMaxHeight};
        min-width: ${cellMinWidth};
        max-width: ${cellMaxWidth};
      }

      @supports (display: grid) {
        /* the grid takes care of the width */
        .cell-container {
          min-width: auto;
          max-width: none;
        }
      }

      #scroll-spacer {
        position: relative;
      }

      #sentinel {
        position: absolute;
        height: ${sentinelHeightCss};
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        /**
        Chrome and Firefox try to maintain scroll position when the page increases and
        decreases in size, but the scroll position is being focused on the sentinel
        so it's causing the "load more" event to keep firing because it thinks the
        user has scrolled to the sentinel. "overflow-anchor: none" prevents that anchoring
        */
        overflow-anchor: none;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-infinite-scroller': IAInfiniteScroller;
  }
}
