/**
 * Returns true if `el` is the document-level scrolling element: either
 * `document.scrollingElement` (if present), or `document.documentElement`
 * as a fallback. The two are equivalent outside of browser quirks mode.
 */
export function isDocumentScroller(el: Element): boolean {
  return el === document.scrollingElement || el === document.documentElement;
}

/**
 * Walks up the DOM tree from `start` and returns the nearest ancestor with
 * `overflow-y: auto` or `overflow-y: scroll`. Falls back to the document-level
 * scroller if no other scrolling ancestor exists.
 *
 * Does not memoize its result, so if you need to read the scroll container
 * repeatedly you should cache the return value yourself as appropriate.
 */
export function findScrollContainer(start: Element): Element {
  let el: Element | null = start;
  while (el) {
    el = el.parentElement;
    if (!el) break;
    const { overflowY } = getComputedStyle(el);
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return el;
    }
  }
  return document.scrollingElement ?? document.documentElement;
}
