/**
 * Minimal structural interface for the resize observer the host injects into
 * the item navigator. Upstream imported this type from
 * `@internetarchive/shared-resize-observer`, but the navigator only calls the
 * small surface below, so declaring it locally keeps that package out of the
 * dependency tree (it was a type-only import) and consumers aren't forced to
 * install it. A real `SharedResizeObserver` satisfies this as-is.
 */

/** Handler invoked by a shared resize observer when its target resizes. */
export interface SharedResizeObserverResizeHandlerInterface {
  handleResize(entry: ResizeObserverEntry): void;
}

/** A single target/handler registration on a shared resize observer. */
export interface SharedResizeObserverConfig {
  target: Element;
  handler: SharedResizeObserverResizeHandlerInterface;
}

/**
 * The subset of `@internetarchive/shared-resize-observer` the navigator uses:
 * an object it can add/remove target-handler pairs on.
 */
export interface SharedResizeObserverInterface {
  addObserver(config: SharedResizeObserverConfig): void;
  removeObserver(config: SharedResizeObserverConfig): void;
}
