import type { FetchOptions } from '../fetch-options';
import type { FetchRetrierInterface } from '../fetch-retry/fetch-retrier';
import type { RetryConfiguring } from '../fetch-retry/configuration/retry-configuring';
import { legacyArgsAsFetchOptions } from '../fetch-retry/legacy-args';

export class MockFetchRetrier implements FetchRetrierInterface {
  requestInfo?: RequestInfo;
  init?: RequestInit;
  retries?: number;
  retryConfig?: RetryConfiguring;

  async fetchRetry(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response> {
    const fetchOptions = legacyArgsAsFetchOptions(options);
    this.init = fetchOptions?.requestInit;
    this.retryConfig = fetchOptions?.retryConfig;
    this.requestInfo = request;
    return new Response(JSON.stringify({ boop: 'snoot' }), { status: 200 });
  }
}
