import { FetchHandler } from '@src/services/fetch-handler/fetch-handler';
import type { FetchHandlerInterface } from '@src/services/fetch-handler/fetch-handler-interface';
import { NoRetryConfiguration } from '@src/services/fetch-handler/fetch-retry/configuration/no-retry-configuration';
import { sentryLogs } from '../../config/sentry-events';
import { createLogger } from '../logger';
import { sentryCaptureException, sentryCaptureMessage } from '../sentry-report';
import type { LoanServiceResponse } from '../../../models';
import '../../../globals';

const log = createLogger('service');

const LOAN_SERVICE_PATH = '/services/loans/loan';

/**
 * Patron-facing messages for failures that never reached the lending
 * service's own JSON error handling.
 */
export const unexpectedResponseError = (status: number): string =>
  `Unexpected response from the lending service (HTTP ${status}). Please try again.`;
export const networkError =
  'Could not reach the lending service. Please check your connection and try again.';
export const unexpectedError =
  'Something went wrong handling the lending service response. Please try again.';

export interface ActionsHandlerServiceOptions {
  /** the lending service action, like `browse_book` or `renew_loan` */
  action: string | null;
  identifier: string;
  success?: (data: LoanServiceResponse) => void;
  error?: (data: LoanServiceResponse) => void;
  /**
   * Makes the request. Loan actions change state on the server, so they are
   * sent once with no retries.
   */
  fetchHandler?: FetchHandlerInterface;
}

/** Numbers each request so overlapping calls can be told apart in the log. */
let requestCounter = 0;

/**
 * Helper to call loan service
 */
export default async function ActionsHandlerService(
  options: ActionsHandlerServiceOptions,
): Promise<void> {
  const option = {
    success() {},
    error() {},
    ...options,
  };
  const fetchHandler = option.fetchHandler ?? new FetchHandler();

  const formData = new FormData();
  formData.append('action', String(option.action));
  formData.append('identifier', option.identifier);

  requestCounter += 1;
  const requestId = `${option.action} #${requestCounter}`;
  const startedAt = performance.now();
  const elapsed = (): string =>
    `${Math.round(performance.now() - startedAt)}ms`;

  // Set once a response arrives, so the catch below can tell a failed fetch
  // (a real network problem) from anything thrown afterwards, including by
  // the caller's own success/error callback, which run inside this try.
  let reachedResponse = false;

  log.debug(`→ ${requestId} ${option.identifier}`);

  try {
    const response = await fetchHandler.fetch(LOAN_SERVICE_PATH, {
      requestInit: { method: 'POST', body: formData },
      retryConfig: NoRetryConfiguration.shared,
    });
    reachedResponse = true;

    const data = await parseServiceResponse(response, option);

    // `data` is the parsed version of the JSON returned from the endpoint.
    if (!data?.error) {
      log.debug(`← ${requestId} ${response.status} ${elapsed()} ok`, data);
      option.success(data);
    } else {
      log.warn(`← ${requestId} ${response.status} ${elapsed()} failed`, data);
      option.error(data);
    }
  } catch (error) {
    sentryCaptureException(error, {
      identifier: option.identifier,
      action: option.action,
      extra: {
        message: `${sentryLogs.actionsHandlerService} - ${option.action} ${
          reachedResponse ? 'threw' : 'fetch failed'
        }`,
      },
    });

    /**
     * Reports the failure through `error`. A rejected fetch (offline,
     * dropped or blocked connection) and anything thrown after the response
     * arrived, including by the caller's own callbacks, land here. Non-JSON
     * bodies are handled in parseServiceResponse() and don't reach here. A
     * caller whose callbacks never fire would wait forever.
     *
     * For renew_loan that matters beyond a missing modal: IABookActions
     * clears its loanRenewInProgress guard from these callbacks, so without
     * one every later renewal attempt would be a no-op. Backgrounding a tab
     * on a flaky mobile connection is exactly when this fires. Only a
     * rejected fetch is a network problem, so only that one says so.
     */
    log.error(
      `✗ ${requestId} ${elapsed()} ${reachedResponse ? 'threw' : 'fetch failed'}`,
      error,
    );
    // networkFailure marks "the service never answered" (like
    // nonJsonResponse in parseServiceResponse). See
    // IABookActions.handleLendingActionError.
    option.error({
      error: reachedResponse ? unexpectedError : networkError,
      detail: String(error),
      ...(reachedResponse ? {} : { networkFailure: true }),
    });
  }
}

/**
 * Parse a lending service response without ever surfacing a raw
 * `SyntaxError` to the patron. Anything in front of PHP (the WAF, or nginx
 * swapping in a 4xx or 5xx page) can answer with HTML instead of the
 * service's JSON. That becomes a readable error carrying the HTTP status,
 * and is reported to Sentry with the identifier and action.
 */
export async function parseServiceResponse(
  response: Response,
  option: Pick<ActionsHandlerServiceOptions, 'action' | 'identifier'>,
): Promise<LoanServiceResponse> {
  const { status } = response;
  const contentType = response.headers?.get('content-type') || '';

  // The service always answers with JSON, so a body that doesn't parse never
  // came from it. It's parsed whatever the Content-Type, so a valid answer
  // is never mistaken for an error page if a header is ever missing.
  const body = await response.text();
  let data: unknown;
  try {
    data = JSON.parse(body);
  } catch {
    data = undefined;
  }

  if (data === undefined) {
    sentryCaptureMessage(
      `${sentryLogs.actionsHandlerService} - ${option.action}: non-JSON response (HTTP ${status})`,
      {
        identifier: option.identifier,
        action: option.action,
        extra: { status, contentType, bodySnippet: body.slice(0, 300) },
      },
    );
    // nonJsonResponse lets callers tell "something in front of PHP answered"
    // apart from the service's own error. See
    // IABookActions.handleLendingActionError.
    return {
      success: false,
      error: unexpectedResponseError(status),
      status,
      nonJsonResponse: true,
    };
  }

  const parsed = data as LoanServiceResponse | null;

  // Carry the HTTP status on the service's own JSON errors too, so it
  // reaches Sentry. A JSON error status without the service's usual `error`
  // field would otherwise be treated as a success.
  if (!response.ok) {
    return {
      ...(parsed && typeof parsed === 'object' ? parsed : {}),
      success: false,
      error: parsed?.error || unexpectedResponseError(status),
      status,
    };
  }

  return parsed as LoanServiceResponse;
}
