import { IaFetchHandler } from '@internetarchive/fetch-handler';
import type {
  ApiFetchOptions,
  FetchHandlerInterface,
  FetchOptions,
} from '@internetarchive/fetch-handler';

import type { ReviewServiceInterface } from './models';
import { ReviewService } from './review-service';

/** The deprecated `token`, `endpointPath` and `fetchHandler` props, plus `baseHost` */
export type LegacyReviewProps = {
  token?: string;
  endpointPath?: string;
  fetchHandler?: FetchHandlerInterface;
  baseHost: string;
};

/**
 * Passes everything through to another handler, adding the `X-CSRF-Token` header to the
 * requests that opt in with `includeCsrfToken`. That's how ReviewService asks for the token,
 * and a handler that wasn't built with a `getCsrfToken` source won't attach one.
 */
class TokenFetchHandler implements FetchHandlerInterface {
  private inner: FetchHandlerInterface;

  private token: string;

  constructor(inner: FetchHandlerInterface, token: string) {
    this.inner = inner;
    this.token = token;
  }

  fetch(request: RequestInfo, options?: RequestInit | FetchOptions) {
    const fetchOptions = options as FetchOptions | undefined;
    if (!fetchOptions?.includeCsrfToken)
      return this.inner.fetch(request, options);

    const headers = new Headers(fetchOptions.requestInit?.headers);
    if (!headers.has('X-CSRF-Token')) headers.set('X-CSRF-Token', this.token);

    return this.inner.fetch(request, {
      ...fetchOptions,
      requestInit: { ...fetchOptions.requestInit, headers },
    });
  }

  fetchApiResponse<T>(url: string, options?: ApiFetchOptions) {
    return this.inner.fetchApiResponse<T>(url, options);
  }

  fetchApiPathResponse<T>(path: string, options?: ApiFetchOptions) {
    return this.inner.fetchApiPathResponse<T>(path, options);
  }

  fetchIAApiResponse<T>(path: string, options?: ApiFetchOptions) {
    return this.inner.fetchIAApiResponse<T>(path, options);
  }
}

/** Whether any of the old props were given, meaning the host expects them to be honored */
export function hasLegacyProps(props: LegacyReviewProps): boolean {
  return !!(props.token || props.endpointPath || props.fetchHandler);
}

/**
 * Builds a ReviewService out of the old `token`, `endpointPath` and `fetchHandler` props.
 */
export function createLegacyReviewService(
  props: LegacyReviewProps,
): ReviewServiceInterface {
  const inner = props.fetchHandler ?? new IaFetchHandler();
  const fetchHandler = props.token
    ? new TokenFetchHandler(inner, props.token)
    : inner;

  return new ReviewService({
    fetchHandler,
    baseHost: props.baseHost,
    submitPath: props.endpointPath,
  });
}
