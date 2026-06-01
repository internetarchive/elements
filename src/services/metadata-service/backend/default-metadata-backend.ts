/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Result } from '@src/types/result';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from '../metadata-service-error';
import { MetadataBackendInterface } from './metadata-backend-interface';

/**
 * The DefaultSearchBackend performs a `window.fetch` request to archive.org
 */
export class DefaultMetadataBackend implements MetadataBackendInterface {
  private baseUrl: string;

  private includeCredentials: boolean;

  private requestScope?: string;

  constructor(options?: {
    baseUrl?: string;
    includeCredentials?: boolean;
    scope?: string;
  }) {
    this.baseUrl = options?.baseUrl ?? 'archive.org';

    if (options?.includeCredentials !== undefined) {
      this.includeCredentials = options.includeCredentials;
    } else {
      // include credentials if the request is coming from an archive.org domain
      // since credentialed requests are only allowed from archive.org domains
      // due to CORS restrictions, see
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials
      this.includeCredentials =
        window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/) !==
        null;
    }

    if (options?.scope !== undefined) {
      this.requestScope = options.scope;
    } else {
      const currentUrl = new URL(window.location.href);
      const scope = currentUrl.searchParams.get('scope');
      if (scope) {
        this.requestScope = scope;
      }
    }
  }

  /** @inheritdoc */
  async fetchMetadata(
    identifier: string,
    keypath?: string,
  ): Promise<Result<any, MetadataServiceError>> {
    const path = keypath ? `/${keypath}` : '';
    const url = `https://${this.baseUrl}/metadata/${identifier}${path}`;
    return this.fetchUrl(url);
  }

  /**
   * Fires a request to the URL (with this backend's options applied) and
   * asynchronously returns a Result object containing either the raw response
   * JSON or a MetadataServiceError.
   */
  protected async fetchUrl(
    url: string,
    options?: {
      requestOptions?: RequestInit;
    },
  ): Promise<Result<any, MetadataServiceError>> {
    const finalUrl = new URL(url);
    if (this.requestScope) {
      finalUrl.searchParams.set('scope', this.requestScope);
    }

    let response: Response;
    // first try the fetch and return a networkError if it fails
    try {
      const fetchOptions = options?.requestOptions ?? {
        credentials: this.includeCredentials ? 'include' : 'same-origin',
      };
      response = await fetch(finalUrl.href, fetchOptions);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Unknown error';
      return this.getErrorResult(
        MetadataServiceErrorType.networkError,
        message,
      );
    }

    // then try json decoding and return a decodingError if it fails
    try {
      const json = await response.json();
      // the advanced search endpoint doesn't return an HTTP Error 400
      // and instead returns an HTTP 200 with an `error` key in the payload
      const error = json['error'];
      if (error) {
        const forensics = json['forensics'];
        return this.getErrorResult(
          MetadataServiceErrorType.searchEngineError,
          error,
          forensics,
        );
      } else {
        // success
        return { success: json };
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : 'Unknown error';
      return this.getErrorResult(
        MetadataServiceErrorType.decodingError,
        message,
      );
    }
  }

  private getErrorResult(
    errorType: MetadataServiceErrorType,
    message?: string,
    details?: any,
  ): Result<any, MetadataServiceError> {
    const error = new MetadataServiceError(errorType, message, details);
    const result = { error };
    return result;
  }
}
