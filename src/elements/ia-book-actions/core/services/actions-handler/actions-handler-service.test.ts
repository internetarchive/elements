import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import type { FetchHandlerInterface } from '@src/services/fetch-handler/fetch-handler-interface';
import type { FetchOptions } from '@src/services/fetch-handler/fetch-options';

import ActionsHandlerService, {
  networkError,
  parseServiceResponse,
  unexpectedError,
} from './actions-handler-service';
import { mockLoanFetchHandler } from '../../../loan-fetch-stub.test-helper';

const option = { identifier: 'foo', action: 'create_token' };
const jsonHeaders = { 'Content-Type': 'application/json' };

const originalSentry = window.Sentry;

beforeEach(() => {
  window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };
});

afterEach(() => {
  window.Sentry = originalSentry;
  vi.restoreAllMocks();
});

describe('ActionsHandlerService#parseServiceResponse', () => {
  test('turns an HTML error page into a readable error instead of a SyntaxError', async () => {
    // e.g. the WAF's /about/400.html in place of the service's JSON
    const response = new Response('<!DOCTYPE html><html>Bad Request</html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });

    const data = await parseServiceResponse(response, option);

    expect(data.success).toBe(false);
    expect(data.status).toBe(400);
    expect(data.nonJsonResponse).toBe(true);
    expect(data.error).toContain('HTTP 400');
    expect(data.error).not.toContain('SyntaxError');
  });

  test('reports the non-JSON response to Sentry with the identifier, action and status', async () => {
    const response = new Response('<!DOCTYPE html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });

    await parseServiceResponse(response, option);

    expect(window.Sentry!.captureMessage).toHaveBeenCalledOnce();
    const [message, context] = vi.mocked(window.Sentry!.captureMessage).mock
      .calls[0];
    expect(message).toContain('create_token');
    expect(message).toContain('HTTP 400');
    expect(context?.tags).toEqual({
      identifier: 'foo',
      action: 'create_token',
    });
    expect(context?.extra.status).toBe(400);
    expect(context?.extra.contentType).toBe('text/html');
    expect(context?.extra.bodySnippet).toContain('<!DOCTYPE');
  });

  test("treats a JSON body as the service's answer even without a JSON content type", async () => {
    const body = { success: true, token: 'abc' };
    const response = new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

    expect(await parseServiceResponse(response, option)).toEqual(body);
    expect(window.Sentry!.captureMessage).not.toHaveBeenCalled();
  });

  test('treats a JSON content type with an unparseable body as non-JSON', async () => {
    const response = new Response('<!DOCTYPE html>', {
      status: 502,
      headers: jsonHeaders,
    });

    const data = await parseServiceResponse(response, option);

    expect(data.error).toContain('HTTP 502');
  });

  test("keeps the service's own JSON error, adding the HTTP status", async () => {
    const body = {
      success: false,
      error: 'You do not currently have this book borrowed.',
    };
    const response = new Response(JSON.stringify(body), {
      status: 400,
      headers: jsonHeaders,
    });

    const data = await parseServiceResponse(response, option);

    expect(data).toEqual({ ...body, status: 400 });
    expect(data.nonJsonResponse).toBeUndefined();
    expect(window.Sentry!.captureMessage).not.toHaveBeenCalled();
  });

  test('passes a JSON success through untouched', async () => {
    const body = { success: true, token: 'abc' };
    const response = new Response(JSON.stringify(body), {
      status: 200,
      headers: jsonHeaders,
    });

    expect(await parseServiceResponse(response, option)).toEqual(body);
  });

  test('never treats a JSON error status without an error field as a success', async () => {
    const response = new Response('{}', { status: 503, headers: jsonHeaders });

    const data = await parseServiceResponse(response, option);

    expect(data.success).toBe(false);
    expect(data.error).toContain('HTTP 503');
  });
});

describe('ActionsHandlerService', () => {
  test('posts through the given fetch handler, once, with retries off', async () => {
    const { fetchHandler, calls } = mockLoanFetchHandler({ success: true });
    const success = vi.fn();

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'borrow_book',
      success,
      fetchHandler,
    });

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe('/services/loans/loan');
    const { requestInit, retryConfig } = calls[0].options as FetchOptions;
    expect(requestInit?.method).toBe('POST');
    const body = requestInit?.body as FormData;
    expect(body.get('action')).toBe('borrow_book');
    expect(body.get('identifier')).toBe('foo');
    expect(retryConfig?.shouldRetry(null, 0, new Error('x'))).toBe(false);
    expect(success).toHaveBeenCalledWith({ success: true });
  });

  test('calls error for a service error', async () => {
    const { fetchHandler } = mockLoanFetchHandler({ error: 'Nope' });
    const error = vi.fn();
    const success = vi.fn();

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'borrow_book',
      success,
      error,
      fetchHandler,
    });

    expect(success).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith({ error: 'Nope' });
  });

  test('says the service could not be reached only when the fetch itself failed', async () => {
    const fetchHandler = {
      fetch: vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    } as unknown as FetchHandlerInterface;
    const error = vi.fn();

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'create_token',
      error,
      fetchHandler,
    });

    expect(error).toHaveBeenCalledOnce();
    expect(error.mock.calls[0][0].error).toBe(networkError);
    expect(error.mock.calls[0][0].networkFailure).toBe(true);
    const [, context] = vi.mocked(window.Sentry!.captureException).mock
      .calls[0];
    expect(context?.tags).toEqual({
      identifier: 'foo',
      action: 'create_token',
    });
  });

  test("doesn't blame the network for a throw after the response arrived", async () => {
    // e.g. the caller's success callback crashing (BookReader init)
    const { fetchHandler } = mockLoanFetchHandler({ success: true });
    const error = vi.fn();

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'create_token',
      success: () => {
        throw new Error('boom');
      },
      error,
      fetchHandler,
    });

    expect(error).toHaveBeenCalledOnce();
    expect(error.mock.calls[0][0].error).toBe(unexpectedError);
    expect(error.mock.calls[0][0].detail).toContain('boom');
    // the service did answer, so this isn't treated as "no answer"
    expect(error.mock.calls[0][0].networkFailure).toBeUndefined();
  });

  test('logs the request when it starts and when it finishes, with a shared id', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { fetchHandler } = mockLoanFetchHandler({ success: true });

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'renew_loan',
      fetchHandler,
    });

    const lines = log.mock.calls
      .filter(([prefix]) => prefix === '[ia-book-actions:service]')
      .map(([, line]) => String(line));
    expect(lines[0]).toMatch(/^→ renew_loan #(\d+) foo$/);
    const id = lines[0].match(/#(\d+)/)![1];
    expect(lines[1]).toMatch(new RegExp(`^← renew_loan #${id} 200 \\d+ms ok$`));
  });
});
