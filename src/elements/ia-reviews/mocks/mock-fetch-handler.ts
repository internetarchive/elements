import type { FetchHandlerInterface } from '@internetarchive/fetch-handler';

export class MockFetchHandler implements FetchHandlerInterface {
  async fetchApiResponse<T>(): Promise<T> {
    return { success: true } as T;
  }

  async fetchApiPathResponse<T>(): Promise<T> {
    return {} as T;
  }

  async fetchIAApiResponse<T>(): Promise<T> {
    return {} as T;
  }

  async fetch(): Promise<Response> {
    return new Response();
  }
}
