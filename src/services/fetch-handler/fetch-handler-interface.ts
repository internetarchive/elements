import type { ApiFetchOptions, FetchOptions } from './fetch-options';

export interface FetchHandlerInterface {
  /**
   * Generic fetch function that handles retries and common IA parameters like `reCache=1`
   *
   * @param input RequestInfo
   * @param options RequestInit | FetchOptions
   */
  fetch(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response>;

  /**
   * A helper function to fetch a response from an API and get a JSON object
   *
   * @param path string
   * @param options?: ApiFetchOptions
   */
  fetchApiResponse<T>(url: string, options?: ApiFetchOptions): Promise<T>;

  /**
   * A helper function to fetch a response from the IA API and get a JSON object
   *
   * This allows you to just pass the path to the API and get the response instead
   * of the full URL. If you need a full URL, use `fetchApiResponse` instead.
   *
   * ie `fetchApiPathResponse('/items/123')` will fetch from `${apiBaseUrl}/items/123`
   *
   * @param path - Path to API endpoint
   * @param options - ApiFetchOptions
   */
  fetchApiPathResponse<T>(path: string, options?: ApiFetchOptions): Promise<T>;

  /**
   * Fetch a response from the IA API by path
   *
   * @deprecated Use `fetchApiPathResponse` instead.
   * @param path - Path to API endpoint
   * @param options - ApiFetchOptions
   */
  fetchIAApiResponse<T>(path: string, options?: ApiFetchOptions): Promise<T>;
}
