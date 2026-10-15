import {
  FetchRetrier,
  FetchRetrierInterface,
} from './fetch-retry/fetch-retrier';
import { legacyArgsAsFetchOptions } from './fetch-retry/legacy-args';
import type { FetchHandlerInterface } from './fetch-handler-interface';
import type {
  ApiFetchOptions,
  FetchOptions,
  QueryParams,
} from './fetch-options';

export type FetchHandlerConstructorOptions = {
  /** @deprecated Use `apiBaseUrl` instead. */
  iaApiBaseUrl?: string;
  apiBaseUrl?: string;
  fetchRetrier?: FetchRetrierInterface;
  searchParams?: string;
  /**
   * Optional CSRF token source. When provided, callers can opt individual
   * `POST`/`PUT`/`DELETE` requests into an automatic `X-CSRF-Token` header
   * by passing `includeCsrfToken: true` (see `ApiFetchOptions`/
   * `FetchOptions`). Requests that don't opt in are unaffected — this is
   * off by default because not every backend endpoint's CORS policy
   * allow-lists that header yet.
   */
  getCsrfToken?: () => Promise<string>;
};

const METHODS_REQUIRING_CSRF_TOKEN = new Set([
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
]);

/**
 * The FetchHandler adds some common helpers:
 * - retry the request if it fails
 * - add `reCache=1` to the request if it's in the current url so the backend sees it
 * - add convenience method for fetching/decoding an API response by just the path
 */
export class FetchHandler implements FetchHandlerInterface {
  private apiBaseUrl: string = '';

  private fetchRetrier: FetchRetrierInterface = new FetchRetrier();

  private searchParams?: string;

  private getCsrfToken?: () => Promise<string>;

  constructor(options?: FetchHandlerConstructorOptions) {
    if (options?.apiBaseUrl) {
      this.apiBaseUrl = options.apiBaseUrl;
    } else if (options?.iaApiBaseUrl) {
      this.apiBaseUrl = options.iaApiBaseUrl;
    }
    if (options?.fetchRetrier) this.fetchRetrier = options.fetchRetrier;
    if (options?.searchParams) {
      this.searchParams = options.searchParams;
    } else {
      this.searchParams = window.location.search;
    }
    if (options?.getCsrfToken) this.getCsrfToken = options.getCsrfToken;
  }

  /** @inheritdoc */
  async fetch(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response> {
    let finalRequest = request;
    const urlParams = new URLSearchParams(this.searchParams);
    if (urlParams.get('reCache') === '1') {
      const urlString = typeof request === 'string' ? request : request.url;
      finalRequest = this.addSearchParams(urlString, { reCache: '1' });
    }
    const finalOptions = await this.withCsrfToken(finalRequest, options);
    return this.fetchRetrier.fetchRetry(finalRequest, finalOptions);
  }

  /** @inheritdoc */
  async fetchApiResponse<T>(
    url: string,
    options?: ApiFetchOptions,
  ): Promise<T> {
    const requestInit: RequestInit = {};
    if (options?.includeCredentials) requestInit.credentials = 'include';
    if (options?.method) requestInit.method = options.method;
    if (options?.body) requestInit.body = options.body;
    const headers = new Headers({ Accept: 'application/json' });
    if (options?.headers) {
      new Headers(options.headers).forEach((value, key) => {
        headers.set(key, value);
      });
    }
    requestInit.headers = headers;
    const finalUrl = options?.queryParams
      ? this.addSearchParams(url, options.queryParams)
      : url;
    const response = await this.fetch(finalUrl, {
      requestInit: requestInit,
      retryConfig: options?.retryConfig,
      includeCsrfToken: options?.includeCsrfToken,
    });
    const json = await response.json();
    return json as T;
  }

  /** @inheritdoc */
  async fetchApiPathResponse<T>(
    path: string,
    options?: ApiFetchOptions,
  ): Promise<T> {
    const url = `${this.apiBaseUrl}${path}`;
    return this.fetchApiResponse(url, options);
  }

  /** @inheritdoc */
  async fetchIAApiResponse<T>(
    path: string,
    options?: ApiFetchOptions,
  ): Promise<T> {
    return this.fetchApiPathResponse(path, options);
  }

  /**
   * If a CSRF token source was configured, the caller opted in via
   * `includeCsrfToken: true`, and the request method needs one, resolve the
   * token and attach it as an `X-CSRF-Token` header. Off by default: not
   * every backend endpoint's CORS policy allow-lists that header yet, so
   * each caller opts in only once its endpoint is known to support it.
   * Requests that already carry that header are left untouched.
   *
   * @param request - The request being made, used to infer the method
   * @param options - The options passed in to `fetch`
   * @returns Options with the CSRF header attached, or the original options
   */
  private async withCsrfToken(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<RequestInit | FetchOptions | undefined> {
    if (!this.getCsrfToken) return options;

    const fetchOptions = legacyArgsAsFetchOptions(options) ?? {};
    if (!fetchOptions.includeCsrfToken) return options;

    const requestInit = fetchOptions.requestInit ?? {};
    const method = (
      requestInit.method ??
      (typeof request !== 'string' ? request.method : undefined) ??
      'GET'
    ).toUpperCase();
    if (!METHODS_REQUIRING_CSRF_TOKEN.has(method)) return options;

    const headers = new Headers(requestInit.headers);
    if (headers.has('X-CSRF-Token')) return options;
    headers.set('X-CSRF-Token', await this.getCsrfToken());

    return {
      ...fetchOptions,
      requestInit: { ...requestInit, headers },
    };
  }

  /**
   * Construct a new URL with the given search params added
   *
   * Works on the URL string rather than parsing it into a `URL`, so a
   * base-relative or scheme-relative input (`/services/foo`,
   * `www.example.com/foo`) comes back in the form it went in instead of being
   * resolved against the current page.
   *
   * @param urlString - Original URL string
   * @param params - Params to add, replacing any of the same name already on the URL
   * @returns New URL string with params added
   */
  private addSearchParams(urlString: string, params: QueryParams): string {
    const hashIndex = urlString.indexOf('#');
    const hash = hashIndex === -1 ? '' : urlString.slice(hashIndex);
    const path = hashIndex === -1 ? urlString : urlString.slice(0, hashIndex);

    const queryIndex = path.indexOf('?');
    const base = queryIndex === -1 ? path : path.slice(0, queryIndex);
    const searchParams = new URLSearchParams(
      queryIndex === -1 ? '' : path.slice(queryIndex + 1),
    );

    const newParams = FetchHandler.asSearchParams(params);

    // Clear each incoming key before appending any of them, so a key that
    // repeats within `newParams` replaces what the URL had rather than
    // stacking onto it.
    const clearedKeys = new Set<string>();
    newParams.forEach((_value, key) => {
      if (clearedKeys.has(key)) return;
      clearedKeys.add(key);
      searchParams.delete(key);
    });
    newParams.forEach((value, key) => {
      searchParams.append(key, value);
    });

    const search = searchParams.toString();
    return `${base}${search ? `?${search}` : ''}${hash}`;
  }

  /**
   * Normalize the record form of `QueryParams` into `URLSearchParams`,
   * dropping `undefined`/`null` values so callers can pass optional params
   * without guarding each one.
   *
   * @param params - Params in either accepted form
   * @returns The params as `URLSearchParams`
   */
  private static asSearchParams(params: QueryParams): URLSearchParams {
    if (params instanceof URLSearchParams) return params;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
    return searchParams;
  }
}

/**
 * Backwards compatibility class
 *
 * @deprecated Use `FetchHandler` instead.
 */
export class IaFetchHandler extends FetchHandler {
  constructor(options?: FetchHandlerConstructorOptions) {
    const superOptions = { ...options };
    superOptions.iaApiBaseUrl = options?.iaApiBaseUrl ?? 'https://archive.org';
    super(superOptions);
  }
}
