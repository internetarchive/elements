import { DefaultRetryConfiguration } from './default-retry-configuration';
import { NoRetryConfiguration } from './no-retry-configuration';
import type { RetryConfiguring } from './retry-configuring';

/**
 * This class provides easy access to common retry configurations.
 *
 * ie `FetchRetryConfig.default` or `FetchRetryConfig.noRetry` vs
 * `new DefaultRetryConfiguration()` or `new NoRetryConfiguration()`
 */
export class FetchRetryConfig {
  /**
   * A retry configuration that retries twice for transient errors
   * with exponential retry delay as well as `Retry-After` header support.
   *
   * @static
   * @type {Readonly<RetryConfiguring>}
   * @memberof FetchRetryConfig
   */
  static readonly default: Readonly<RetryConfiguring> =
    DefaultRetryConfiguration.shared;

  /**
   * A retry configuration that does not perform any retries.
   *
   * @static
   * @type {Readonly<RetryConfiguring>}
   * @memberof FetchRetryConfig
   */
  static readonly noRetry: Readonly<RetryConfiguring> =
    NoRetryConfiguration.shared;
}
