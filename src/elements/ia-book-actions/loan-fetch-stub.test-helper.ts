import { vi } from 'vitest';

/**
 * Replaces `window.fetch` so the lending service calls the element makes
 * (create_token, browse_book, renew_loan and so on) never leave the page.
 * Every call resolves with a success response, and a renew_loan one carries
 * a confirmed renewal.
 *
 * Restore it with `vi.restoreAllMocks()`.
 */
export function stubLoanFetch() {
  return vi.spyOn(window, 'fetch').mockImplementation(async (_input, init) => {
    const action =
      init?.body instanceof FormData ? init.body.get('action') : null;
    const body =
      action === 'renew_loan'
        ? { success: true, loan: { renewal: true } }
        : { success: true };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  });
}

/**
 * A 1x1 transparent GIF for the loader image, so rendering the action bar
 * doesn't request archive.org's loading image.
 */
export const OFFLINE_LOADER_ICON =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Waits on a real timer, for IndexedDB work that finishes on its own clock
 * while fake timers are installed. Captured at import, before any test fakes
 * the timers.
 */
const realSetTimeout = window.setTimeout.bind(window);

export function settle(ms = 50): Promise<void> {
  return new Promise((resolve) => {
    realSetTimeout(resolve, ms);
  });
}
