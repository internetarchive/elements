import type { RetryConfiguring } from '../fetch-retry/configuration/retry-configuring';

export class MockRetryConfig implements RetryConfiguring {
  mockRetryCount: number = 2;

  mockRetryDelay: number = 0;

  shouldRetry(_response: Response | null, retryNumber: number): boolean {
    return retryNumber < this.mockRetryCount;
  }

  retryDelay(): number {
    return this.mockRetryDelay;
  }
}
