import type { Milliseconds } from './milliseconds';

export interface RetryConfiguring {
  shouldRetry(
    response: Response | null,
    retryNumber: number,
    error?: unknown,
  ): boolean;

  retryDelay(
    retryNumber: number,
    response?: Response | null,
  ): Milliseconds | null;
}
