/**
 * The Sentry browser SDK global that archive.org's page scripts put on
 * `window`. It's absent on pages without Sentry, so call it as
 * `window.Sentry?.captureException(...)`.
 */

/** The capture context handed to Sentry. */
export interface SentryContext {
  tags: Record<string, string>;
  extra: Record<string, unknown>;
}

/** The part of the Sentry browser SDK global that elements use. */
export interface SentryGlobal {
  captureMessage: (message: string, context?: SentryContext) => unknown;
  captureException: (exception: unknown, context?: SentryContext) => unknown;
}

declare global {
  interface Window {
    Sentry?: SentryGlobal;
  }
}
