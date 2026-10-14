import type { RetryConfiguring } from './fetch-retry/configuration/retry-configuring';

/**
 * Query params to merge into a request URL.
 *
 * The record form is the common case: values are stringified and URL-encoded,
 * and `undefined`/`null` entries are dropped so optional params can be passed
 * straight through without a conditional at the call site. Pass a
 * `URLSearchParams` when a key needs to repeat.
 */
export type QueryParams =
  | URLSearchParams
  | Record<string, string | number | boolean | null | undefined>;

/**
 * Base fetch options for FetchHandler
 */
export type FetchOptions = {
  requestInit?: RequestInit;
  retryConfig?: RetryConfiguring;
  /**
   * Set to opt this request into an automatic `X-CSRF-Token` header (when
   * the FetchHandler was constructed with a `getCsrfToken` source). Off by
   * default — only opt in once the target endpoint's CORS policy is known
   * to allow-list that header.
   */
  includeCsrfToken?: boolean;
};

/**
 * A convenience type for FetchHandler methods with common API fetch options.
 */
export type ApiFetchOptions = {
  includeCredentials?: boolean;
  method?: string;
  body?: BodyInit;
  headers?: HeadersInit;
  retryConfig?: RetryConfiguring;
  /**
   * Query params merged into the request URL, overriding any of the same name
   * already present on it.
   */
  queryParams?: QueryParams;
  /**
   * Set to opt this request into an automatic `X-CSRF-Token` header (when
   * the FetchHandler was constructed with a `getCsrfToken` source). Off by
   * default — only opt in once the target endpoint's CORS policy is known
   * to allow-list that header.
   */
  includeCsrfToken?: boolean;
};
