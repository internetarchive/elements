import type { RetryConfiguring } from './retry-configuring';
import type { Milliseconds } from './milliseconds';

/**
 * A retry configuration that does not perform any retries.
 */
export class NoRetryConfiguration implements RetryConfiguring {
  static readonly shared: Readonly<RetryConfiguring> =
    new NoRetryConfiguration();

  shouldRetry(): boolean {
    return false;
  }

  retryDelay(): Milliseconds | null {
    return null;
  }
}
