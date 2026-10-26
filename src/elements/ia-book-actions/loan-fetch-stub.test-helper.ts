import { vi } from 'vitest';
import type { FetchHandlerInterface } from '@src/services/fetch-handler/fetch-handler-interface';
import type { FetchOptions } from '@src/services/fetch-handler/fetch-options';

/**
 * Replaces `window.fetch` so the lending service calls the element makes
 * (create_token, browse_book, renew_loan and so on) never leave the page.
 * Every call resolves with a success response, and a renew_loan one carries
 * a confirmed renewal after a few seconds, like a real round-trip, so a test
 * can drive the renewal itself first.
 *
 * Restore it with `vi.restoreAllMocks()`.
 */
export function stubLoanFetch() {
  return vi.spyOn(window, 'fetch').mockImplementation(async (_input, init) => {
    const action =
      init?.body instanceof FormData ? init.body.get('action') : null;
    if (action === 'renew_loan') {
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
    }
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

/**
 * A fetch handler that answers every lending request with `body`, and keeps
 * each call so a test can check what was sent.
 */
export function mockLoanFetchHandler(
  body: Record<string, unknown>,
  status = 200,
) {
  const calls: { url: string; options?: RequestInit | FetchOptions }[] = [];
  const fetchHandler = {
    async fetch(request: RequestInfo, options?: RequestInit | FetchOptions) {
      calls.push({ url: String(request), options });
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  } as unknown as FetchHandlerInterface;
  return { fetchHandler, calls };
}
