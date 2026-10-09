import type { AnalyticsHandlerInterface } from '../../analytics-manager/analytics-handler';
import { type FetchOptions } from '../fetch-options';
import { promisedSleep } from '../utils/promised-sleep';
import { FetchRetryConfig } from './configuration/configurations';
import type { RetryConfiguring } from './configuration/retry-configuring';
import { legacyArgsAsFetchOptions } from './legacy-args';

/**
 * A class that retries a fetch request.
 */
export interface FetchRetrierInterface {
  /**
   * Execute a fetch with retry.
   *
   * @param request RequestInfo
   * @param options Optional RequestInit | FetchOptions
   * @returns Promise<Response>
   */
  fetchRetry(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response>;
}

/** @inheritdoc */
export class FetchRetrier implements FetchRetrierInterface {
  private analyticsHandler?: AnalyticsHandlerInterface;

  private retryConfig: RetryConfiguring = FetchRetryConfig.default;

  constructor(options?: {
    analyticsHandler?: AnalyticsHandlerInterface;
    retryConfig?: RetryConfiguring;
  }) {
    if (options?.analyticsHandler)
      this.analyticsHandler = options.analyticsHandler;
    if (options?.retryConfig) this.retryConfig = options.retryConfig;
  }

  /** @inheritdoc */
  public async fetchRetry(
    request: RequestInfo,
    options?: RequestInit | FetchOptions,
  ): Promise<Response> {
    const fetchOptions = legacyArgsAsFetchOptions(options);
    return await this.doFetchRetry(request, 0, fetchOptions);
  }

  private async doFetchRetry(
    request: RequestInfo,
    retryNumber: number,
    options?: FetchOptions,
  ): Promise<Response> {
    const urlString = typeof request === 'string' ? request : request.url;

    try {
      const response = await fetch(request, options?.requestInit);
      if (response.ok) return response;

      if (response.status >= 400 && response.status < 600) {
        this.log4xx5xxResponse(response);
      }

      const retryConfig = options?.retryConfig ?? this.retryConfig;
      const shouldRetry = retryConfig.shouldRetry(response, retryNumber);
      if (shouldRetry) {
        const retryDelay = retryConfig.retryDelay(retryNumber, response);
        if (retryDelay !== null) {
          await promisedSleep(retryDelay);
          this.logRetryEvent(
            urlString,
            retryNumber,
            response.statusText,
            response.status,
          );
          return this.doFetchRetry(request, retryNumber + 1, options);
        }
      }
      this.logFailureEvent(urlString, response.status);
      return response;
    } catch (error) {
      // if a content blocker is detected, log it and don't retry
      if (this.isContentBlockerError(error)) {
        this.logContentBlockingEvent(urlString, error);
        throw error;
      }

      const retryConfig = options?.retryConfig ?? this.retryConfig;
      const shouldRetry = retryConfig.shouldRetry(null, retryNumber);
      if (shouldRetry) {
        const retryDelay = retryConfig.retryDelay(retryNumber);
        if (retryDelay !== null) {
          await promisedSleep(retryDelay);
          this.logRetryEvent(urlString, retryNumber, error, error);
          return this.doFetchRetry(request, retryNumber + 1, options);
        }
      }
      this.logFailureEvent(urlString, error);
      throw error;
    }
  }

  private isContentBlockerError(error: unknown): boolean {
    // all of the content blocker errors are `TypeError`
    if (!(error instanceof TypeError)) return false;
    const message = error.message.toLowerCase();
    return message.includes('content blocker');
  }

  private readonly eventCategory = 'offshootFetchRetry';

  private logRetryEvent(
    urlString: string,
    retryNumber: number,
    status: unknown,
    code: unknown,
  ) {
    this.analyticsHandler?.sendEvent({
      category: this.eventCategory,
      action: 'retryingFetch',
      label: `retryNumber: ${retryNumber}, code: ${code}, status: ${status}, url: ${urlString}`,
    });
  }

  private logFailureEvent(urlString: string, error: unknown) {
    this.analyticsHandler?.sendEvent({
      category: this.eventCategory,
      action: 'fetchFailed',
      label: `error: ${error}, url: ${urlString}`,
    });
  }

  private log4xx5xxResponse(response: Response) {
    const status = response.status;

    this.analyticsHandler?.sendEvent({
      category: this.eventCategory,
      action: `status${status}Response`,
      label: `url: ${response.url}`,
    });
  }

  private logContentBlockingEvent(urlString: string, error: unknown) {
    this.analyticsHandler?.sendEvent({
      category: this.eventCategory,
      action: 'contentBlockerDetectedNotRetrying',
      label: `error: ${error}, url: ${urlString}`,
    });
  }
}
