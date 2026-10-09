/**
 * Options that can be passed to a search backend constructor
 */
export interface SearchBackendOptionsInterface {
  /**
   * The base URL / host this backend should use for its requests.
   * Defaults to 'archive.org'.
   */
  baseUrl?: string;

  /**
   * The path the to the backend service to send requests to, at the base URL.
   */
  servicePath?: string;

  /**
   * Whether to include credentials in the request.
   * Only works when not blocked by CORS policy.
   */
  includeCredentials?: boolean;

  /**
   * The request scope to send to the PPS.
   */
  scope?: string;

  /**
   * Optional caching requests to the backend, e.g. to bypass or recompute the cache
   */
  caching?: string;

  /**
   * Whether debugging info should be requested and logged when present on a response
   */
  debuggingEnabled?: boolean;

  /**
   * Whether the full response details should be logged for every response
   */
  verbose?: boolean;
}
