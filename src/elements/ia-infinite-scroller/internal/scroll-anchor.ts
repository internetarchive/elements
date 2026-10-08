import { isDocumentScroller } from './scroll-container-utils';

/**
 * A captured anchor cell + its `top` position relative to its scroll
 * container at the time the anchor was captured. Restoring the anchor
 * adjusts the scroll position so that the cell ends up back at the
 * same offset within the scroller.
 */
export type ScrollAnchorPoint = {
  cellIndex: number;
  /**
   * `cell.top - scroller.top` in viewport coordinates at capture time.
   */
  cellOffsetWithinScroller: number;
  /**
   * Snapshot of the scroll anchor validity key when this anchor point was
   * captured. If the key gets invalidated (e.g., by a scrollToCell call),
   * we can skip restoring this anchor point.
   */
  validityKey: number;
};

/**
 * Methods the `ScrollAnchor` needs to read host state without owning
 * the underlying fields.
 */
export interface ScrollAnchorHostInterface {
  /** Nearest scrolling ancestor (cached by the host). */
  getScrollContainer(): Element;

  /** All cell containers currently in DOM order. */
  getCellContainers(): Iterable<HTMLElement>;

  /**
   * Finds the cell container for the given index, or null if that cell
   * is not currently in the buffer.
   */
  getCellByIndex(cellIndex: number): HTMLElement | null;

  /**
   * True if this cell is currently rendering real content (not a placeholder).
   * Used at capture-time to prefer anchoring on stable content cells.
   */
  isCellRendered(cell: Element): boolean;

  /**
   * Returns false when anchor capture should short-circuit, typically
   * because virtualization is off or a programmatic scroll is in progress.
   */
  isActive(): boolean;

  /**
   * Returns the top of the scroller's own content area in the viewport, which
   * will form the basis for the scroll anchoring.
   */
  getScrollerTop(): number;
}

/**
 * Captures and restores a "scroll anchor": a reference to a cell in the
 * buffer, plus its position within the scroller's own coordinate space.
 * The host can use this to keep the user's view of the cells stable
 * across operations that shift cell positions within the scroller, while
 * leaving external content shifts (above/around the scroller) alone.
 *
 * Also owns the "suppress next scroll event" flag, which prevents the
 * recursive case where restoring a scroll anchor triggers scroll listeners
 * that would then attempt to re-anchor and oscillate.
 *
 * The host is responsible for the timing of capture/restore, typically
 * capturing before mutating the cell buffer, holding the anchor until needed,
 * then restoring once the layout has settled.
 */
export class ScrollAnchor {
  /**
   * Prevents the next anchoring adjustment from itself triggering a re-anchor.
   */
  private suppressNextScrollEvent = false;

  /**
   * Validity key that can be invalidated to indicate that previously-captured
   * anchors should no longer be restored.
   */
  private currentValidityKey = 0;

  private host: ScrollAnchorHostInterface;

  constructor(host: ScrollAnchorHostInterface) {
    this.host = host;
  }

  /**
   * Invalidates all pending anchors captured up to this point, causing
   * subsequent attempts to restore them to no-op. Use this when something
   * is about to change the scroll position in a way that makes any pending
   * anchor positions meaningless (e.g., a `scrollToCell` jump).
   */
  invalidate(): void {
    this.currentValidityKey += 1;
  }

  /**
   * Find a cell to use as the scroll anchor and record its top position
   * within the scroller's own coordinate space. Pair each call with `restore`
   * to perform the actual anchoring behavior.
   *
   * The capture prioritizes cells in this order:
   *  1. The topmost visible rendered cell that follows a visible placeholder.
   *  2. The topmost visible rendered cell (regardless of placeholders).
   *  3. The topmost rendered cell below the viewport, if no visible ones exist.
   *  4. The topmost visible placeholder cell as a last-resort fallback.
   */
  capture(): ScrollAnchorPoint | null {
    if (!this.host.isActive()) return null;

    const scrollContainer = this.host.getScrollContainer();
    const isDoc = isDocumentScroller(scrollContainer);
    const viewportTop = isDoc ? 0 : scrollContainer.getBoundingClientRect().top;
    const viewportBottom = isDoc
      ? window.innerHeight
      : viewportTop + scrollContainer.clientHeight;
    const scrollerTop = this.host.getScrollerTop();
    const validityKey = this.currentValidityKey;

    let firstVisibleRendered: ScrollAnchorPoint | null = null;
    let visibleFallback: ScrollAnchorPoint | null = null;
    let belowRendered: ScrollAnchorPoint | null = null;
    let seenVisiblePlaceholder = false;
    for (const cell of this.host.getCellContainers()) {
      const idxStr = cell.dataset.cellIndex;
      if (idxStr === undefined) continue;
      const rect = cell.getBoundingClientRect();
      const anchor: ScrollAnchorPoint = {
        cellIndex: parseInt(idxStr, 10),
        cellOffsetWithinScroller: rect.top - scrollerTop,
        validityKey,
      };
      if (rect.bottom < viewportTop) {
        // Still fully above the viewport, skip.
      } else if (rect.top >= viewportBottom) {
        // Below the viewport. The first rendered cell we find here
        // is a good fallback for when nothing visible is rendered.
        if (this.host.isCellRendered(cell)) {
          belowRendered = anchor;
          break;
        }
      } else if (this.host.isCellRendered(cell)) {
        // Visible & rendered. If we've already passed a visible
        // placeholder, this is the preferred anchor.
        if (seenVisiblePlaceholder) {
          return anchor;
        }
        if (!firstVisibleRendered) {
          firstVisibleRendered = anchor;
        }
      } else {
        // Visible placeholder. Save it as a last resort in case
        // we never find any rendered cells.
        seenVisiblePlaceholder = true;
        if (!visibleFallback) {
          visibleFallback = anchor;
        }
      }
    }

    return firstVisibleRendered ?? belowRendered ?? visibleFallback;
  }

  /**
   * After a state mutation that may have shifted the cells, calling this
   * will adjust the scroll position so the previously-captured anchor cell
   * stays at the same offset within the scroller. Does not account for
   * external layout shifts that moved the entire scroll container.
   */
  restore(anchor: ScrollAnchorPoint | null): void {
    if (!anchor) return;
    if (anchor.validityKey !== this.currentValidityKey) {
      // The host invalidated this anchor, so restoring would apply a
      // stale viewport correction; skip it.
      return;
    }
    // The anchor cell may have fallen out of the buffer if the buffer
    // shifted far enough. In that case we can just skip anchoring
    // altogether as there's no longer much point.
    const cell = this.host.getCellByIndex(anchor.cellIndex);
    if (!cell) return;

    const scrollerTopNow = this.host.getScrollerTop();
    const newRect = cell.getBoundingClientRect();
    const newCellOffsetWithinScroller = newRect.top - scrollerTopNow;
    const delta = newCellOffsetWithinScroller - anchor.cellOffsetWithinScroller;

    // For very small deltas, we just skip them to avoid scroll jitter.
    if (Math.abs(delta) < 0.5) return;

    this.suppressNextScrollEvent = true;
    const scrollContainer = this.host.getScrollContainer();
    if (isDocumentScroller(scrollContainer)) {
      window.scrollBy(0, delta);
    } else {
      scrollContainer.scrollTop += delta;
    }
  }

  /**
   * Returns true exactly once after a call to `restore()` that actually
   * adjusted the scroll position. Use this to prevent anchoring adjustments
   * from themselves re-triggering a buffer recompute.
   */
  shouldSuppressNextScrollEvent(): boolean {
    if (!this.suppressNextScrollEvent) return false;
    this.suppressNextScrollEvent = false;
    return true;
  }
}
