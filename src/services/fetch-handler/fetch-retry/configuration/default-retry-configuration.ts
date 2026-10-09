import type { RetryConfiguring } from './retry-configuring';
import type { Milliseconds } from './milliseconds';

/**
 * A retry configuration that retries twice for transient errors
 * with exponential retry delay as well as `Retry-After` header support.
 */
export class DefaultRetryConfiguration implements RetryConfiguring {
  static readonly shared: Readonly<RetryConfiguring> =
    new DefaultRetryConfiguration();

  private readonly maxRetries: Readonly<number> = 2;

  constructor(options?: {
    maxRetries?: number;
    transientStatusCodes?: Set<number>;
  }) {
    if (options?.maxRetries !== undefined) {
      this.maxRetries = options.maxRetries;
    }
    if (options?.transientStatusCodes !== undefined) {
      this.transientStatusCodes = options.transientStatusCodes;
    }
  }

  readonly transientStatusCodes: ReadonlySet<number> = new Set([
    408, // Request Timeout
    429, // Too Many Requests
    500, // Internal Server Error
    502, // Bad Gateway
    503, // Service Unavailable
    504, // Gateway Timeout
    522, // Cloudflare Origin Server Connection Timed Out
  ]);

  shouldRetry(response: Response | null, retryNumber: number): boolean {
    if (response === null) return false;
    if (retryNumber > this.maxRetries) return false;
    const isTransient = this.transientStatusCodes.has(response.status);
    return isTransient;
  }

  retryDelay(
    retryNumber: number,
    response?: Response | null,
  ): Milliseconds | null {
    // If we have a Retry-After header, use that
    const retryAfter = response?.headers.get('Retry-After');
    if (retryAfter) {
      const retryAfterSeconds = parseInt(retryAfter, 10);
      if (!isNaN(retryAfterSeconds)) {
        return retryAfterSeconds * 1000;
      }
    }

    // Exponential backoff up to 10 seconds
    return Math.min(500 * 2 ** retryNumber, 10000);
  }
}
