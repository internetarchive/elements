import type {
  ApiFetchOptions,
  FetchHandlerInterface,
  FetchOptions,
} from '@internetarchive/fetch-handler';

/** A fetch() call the service made */
export type RecordedFetch = {
  url: string;
  options?: FetchOptions;
};

export class MockFetchHandler implements FetchHandlerInterface {
  /** Every fetch() the service made, in order */
  fetches: RecordedFetch[] = [];

  /** What fetch() should hand back. Defaults to a 200 carrying `{ success: true }`. */
  response: () => Response = () =>
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  /** Every fetchApiResponse() call, in order */
  apiFetches: { url: string; options?: ApiFetchOptions }[] = [];

  async fetchApiResponse<T>(
    url?: string,
    options?: ApiFetchOptions,
  ): Promise<T> {
    this.apiFetches.push({ url: url ?? '', options });
    return { success: true } as T;
  }

  async fetchApiPathResponse<T>(): Promise<T> {
    return {} as T;
  }

  async fetchIAApiResponse<T>(): Promise<T> {
    return {} as T;
  }

  async fetch(input: RequestInfo, options?: FetchOptions): Promise<Response> {
    this.fetches.push({ url: input as string, options });
    return this.response();
  }

  /** The most recent fetch the service made */
  get lastFetch(): RecordedFetch | undefined {
    return this.fetches[this.fetches.length - 1];
  }

  /** The RequestInit the service handed to the handler */
  get lastRequestInit(): RequestInit {
    return this.lastFetch?.options?.requestInit ?? {};
  }

  /** Body of the last fetch, decoded as url-encoded form params */
  bodyOnLastFetch(): URLSearchParams {
    return new URLSearchParams(String(this.lastRequestInit.body ?? ''));
  }
}
