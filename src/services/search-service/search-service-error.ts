/* eslint-disable @typescript-eslint/no-explicit-any */
export const SearchServiceErrorType = {
  networkError: 'SearchService.NetworkError',
  itemNotFound: 'SearchService.ItemNotFound',
  decodingError: 'SearchService.DecodingError',
  searchEngineError: 'SearchService.SearchEngineError',
} as const;

export type SearchServiceErrorType =
  (typeof SearchServiceErrorType)[keyof typeof SearchServiceErrorType];

export class SearchServiceError extends Error {
  type: SearchServiceErrorType;

  details?: any;

  constructor(type: SearchServiceErrorType, message?: string, details?: any) {
    super(message);
    this.name = type;
    this.type = type;
    this.details = details;
  }
}
