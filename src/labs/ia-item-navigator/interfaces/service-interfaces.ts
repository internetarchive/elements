/**
 * Minimal structural interfaces for services that the host injects into the
 * item navigator. The upstream `@internetarchive/iaux-item-navigator` imported
 * these types from `@internetarchive/modal-manager` and
 * `@internetarchive/shared-resize-observer`, but the navigator only ever holds
 * / forwards these instances — it never constructs them or relies on anything
 * beyond the small surface below. Declaring local interfaces keeps those two
 * packages out of the dependency tree (they were type-only imports) so
 * consumers aren't forced to install them.
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

/**
 * The navigator only holds a reference to the host's modal manager element and
 * hands it to menu providers; it never calls it directly. Typing it as an
 * `HTMLElement` captures that contract without depending on
 * `@internetarchive/modal-manager`.
 */
export type ModalManagerInterface = HTMLElement;
