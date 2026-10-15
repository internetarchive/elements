/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchBackendInterface } from './search-backend-interface';
import type { SearchParams } from '../search-params';
import type { Result } from '../../result-type/result-type';
import {
  SearchServiceError,
  SearchServiceErrorType,
} from '../search-service-error';
import type { SearchBackendOptionsInterface } from './search-backend-options';

/**
 * Map from URL aliases for caching strategies to the corresponding PPS flags
 */
const CACHING_ALIASES: Record<string, string> = {
  reCache: JSON.stringify({ recompute: true }),
  noCache: JSON.stringify({ bypass: true }),
  dontCache: JSON.stringify({ no_compute: true }),
};

/**
 * An abstract base class for search backends.
 */
export abstract class BaseSearchBackend implements SearchBackendInterface {
  /**
   * The base URL / host this backend should use for its requests.
   * Defaults to 'archive.org'.
   */
  protected baseUrl: string;

  protected includeCredentials: boolean;

  protected requestScope?: string;

  protected cachingFlags?: string;

  protected verbose?: boolean;

  protected debuggingEnabled?: boolean;

  constructor(options?: SearchBackendOptionsInterface) {
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

    const searchParams = new URL(window.location.href).searchParams;
    const scopeParam = searchParams.get('scope');
    const verboseParam = searchParams.get('verbose');
    const debuggingParam = searchParams.get('debugging');
    const cacheDebugParam = searchParams.get('cacheDebug');

    // Caching param aliases
    let cachingParam = '';
    for (const alias of Object.keys(CACHING_ALIASES)) {
      if (searchParams.get(alias)) {
        cachingParam = CACHING_ALIASES[alias];
        break;
      }
    }

    // Explicit PPS caching param overrides any aliases
    cachingParam = searchParams.get('caching') ?? cachingParam;

    if (options?.caching !== undefined) {
      this.cachingFlags = options.caching;
    } else if (cachingParam) {
      this.cachingFlags = cachingParam;
    }

    if (options?.debuggingEnabled !== undefined) {
      this.debuggingEnabled = options.debuggingEnabled;
    } else if (debuggingParam || cacheDebugParam) {
      this.debuggingEnabled = true;
    }

    if (options?.scope !== undefined) {
      this.requestScope = options.scope;
    } else if (scopeParam) {
      this.requestScope = scopeParam;
    }

    if (options?.verbose !== undefined) {
      this.verbose = options.verbose;
    } else if (verboseParam) {
      this.verbose = !!verboseParam;
    }
  }

  /** @inheritdoc */
  abstract performSearch(
    params: SearchParams,
  ): Promise<Result<any, SearchServiceError>>;

  /**
   * Fires a request to the URL (with this backend's options applied) and
   * asynchronously returns a Result object containing either the raw response
   * JSON or a SearchServiceError.
   */
  protected async fetchUrl(
    url: string,
    options?: {
      requestOptions?: RequestInit;
    },
  ): Promise<Result<any, SearchServiceError>> {
    const finalUrl = new URL(url);
    if (this.requestScope) {
      finalUrl.searchParams.set('scope', this.requestScope);
    }

    if (this.cachingFlags) {
      finalUrl.searchParams.set('caching', this.cachingFlags);
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
      return this.getErrorResult(SearchServiceErrorType.networkError, message);
    }

    // then try json decoding and return a decodingError if it fails
    try {
      const json = await response.json();

      if (this.verbose) {
        this.printResponse(json);
      }

      if (json.debugging) {
        this.printDebuggingInfo(json);
      }

      // The PPS relays search engine errors with an `error` key in
      // the response section of the payload.
      const error = json.response?.error;
      if (error) {
        return this.getErrorResult(
          SearchServiceErrorType.searchEngineError,
          error.message,
          error.forensics,
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
      return this.getErrorResult(SearchServiceErrorType.decodingError, message);
    }
  }

  private getErrorResult(
    errorType: SearchServiceErrorType,
    message?: string,
    details?: any,
  ): Result<any, SearchServiceError> {
    const error = new SearchServiceError(errorType, message, details);
    const result = { error };
    return result;
  }

  /**
   * Logs a full response to the console, with truncated hits.
   */
  private printResponse(json: Record<string, any>) {
    try {
      const clonedResponse = JSON.parse(JSON.stringify(json));

      // Keep at most the first hit, and throw away the rest
      const hits = clonedResponse?.response?.body?.hits?.hits;
      if (Array.isArray(hits) && hits.length > 1) {
        const newHits = [];
        newHits.push(hits[0]);
        newHits.push(`*** ${hits.length - 1} hits omitted ***`);
        clonedResponse.response.body.hits.hits = newHits;
      }

      // Keep the aggregation keys but throw away their buckets
      const aggregations = clonedResponse?.response?.body?.aggregations;
      if (aggregations) {
        Object.entries(aggregations).forEach(([key, val]) => {
          if ((val as any)?.buckets?.length > 0) {
            const clonedVal = JSON.parse(JSON.stringify(val));
            clonedVal.buckets = `*** ${
              clonedVal.buckets?.length ?? 0
            } buckets omitted ***`;
            clonedResponse.response.body.aggregations[key] = clonedVal;
          }
        });
      }

      console.log(`***** RESPONSE RECEIVED *****`);
      console.groupCollapsed('Response');
      console.log(JSON.stringify(clonedResponse, null, 2));
      console.groupEnd();
    } catch (err) {
      console.error('Error printing search response:', err);
    }
  }

  /**
   * Logs PPS debugging info to the console if it is present on the response object
   */
  private printDebuggingInfo(json: Record<string, any>) {
    const debugInfo = json.debugging;
    const messages = debugInfo.messages ?? [];
    const data = debugInfo.data ?? {};

    console.log('***** BEGIN DEBUGGING *****');
    console.log('Full response:');
    console.log(JSON.stringify(json, null, 2));

    console.group('Debug messages');
    for (const message of messages) {
      console.log(message);
    }
    console.groupEnd();

    console.group('Debug data');
    for (const [key, val] of Object.entries(data)) {
      console.log(key, val);
    }
    console.groupEnd();
    console.log('***** END DEBUGGING *****');
  }
}
