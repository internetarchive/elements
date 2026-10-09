import type { FetchOptions } from '../fetch-options';

export const legacyArgsAsFetchOptions = (
  options?: RequestInit | FetchOptions,
): FetchOptions | undefined => {
  if (!options) return undefined;
  // if options is already FetchOptions, return it
  if (
    'requestInit' in options ||
    'retryConfig' in options ||
    'includeCsrfToken' in options
  ) {
    return options as FetchOptions;
  }
  // otherwise, it's RequestInit
  return { requestInit: options as RequestInit };
};
