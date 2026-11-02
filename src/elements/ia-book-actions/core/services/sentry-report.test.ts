import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
  buildSentryContext,
  sentryCaptureException,
  sentryCaptureMessage,
} from './sentry-report';

describe('sentry-report', () => {
  const originalSentry = window.Sentry;

  beforeEach(() => {
    window.Sentry = { captureMessage: vi.fn(), captureException: vi.fn() };
  });

  afterEach(() => {
    window.Sentry = originalSentry;
  });

  test('tags events with the identifier and action', () => {
    const context = buildSentryContext({
      identifier: 'foo',
      action: 'create_token',
      extra: { status: 400 },
    });

    expect(context.tags).toEqual({ identifier: 'foo', action: 'create_token' });
    expect(context.extra).toEqual({
      identifier: 'foo',
      action: 'create_token',
      status: 400,
    });
  });

  test('leaves out tags that are not known', () => {
    expect(buildSentryContext({ identifier: 'foo' }).tags).toEqual({
      identifier: 'foo',
    });
    expect(buildSentryContext().tags).toEqual({});
  });

  test('passes the context through to Sentry', () => {
    sentryCaptureMessage('msg', { identifier: 'foo', action: 'renew_loan' });
    const error = new Error('boom');
    sentryCaptureException(error, { identifier: 'foo', action: 'return_loan' });

    const message = vi.mocked(window.Sentry!.captureMessage).mock.calls[0];
    expect(message[0]).toBe('msg');
    expect(message[1]?.tags).toEqual({
      identifier: 'foo',
      action: 'renew_loan',
    });
    const exception = vi.mocked(window.Sentry!.captureException).mock.calls[0];
    expect(exception[0]).toBe(error);
    expect(exception[1]?.tags.action).toBe('return_loan');
  });

  test('does nothing when Sentry is not loaded', () => {
    window.Sentry = undefined;
    expect(() =>
      sentryCaptureMessage('msg', { identifier: 'foo' }),
    ).not.toThrow();
  });
});
