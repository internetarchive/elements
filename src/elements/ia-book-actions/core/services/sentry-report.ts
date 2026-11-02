import type { SentryContext } from '../../globals';
import '../../globals';

export interface SentryReportContext {
  identifier?: string;
  /** the lending action involved, like `create_token` or `renew_loan` */
  action?: string | null;
  /** any other details worth keeping */
  extra?: Record<string, unknown>;
}

/**
 * Builds Sentry's captureContext with the book identifier and lending action
 * attached as tags, so events can be filtered per book or per action (e.g.
 * `action:create_token identifier:foo`) without the identifier going into
 * the message text, which would split one issue into one per book.
 */
export function buildSentryContext({
  identifier,
  action,
  extra = {},
}: SentryReportContext = {}): SentryContext {
  const tags: Record<string, string> = {};
  if (identifier) tags.identifier = identifier;
  if (action) tags.action = action;

  return {
    tags,
    extra: { identifier, action, ...extra },
  };
}

export function sentryCaptureMessage(
  message: string,
  context?: SentryReportContext,
): void {
  window?.Sentry?.captureMessage?.(message, buildSentryContext(context));
}

export function sentryCaptureException(
  error: unknown,
  context?: SentryReportContext,
): void {
  window?.Sentry?.captureException?.(error, buildSentryContext(context));
}
