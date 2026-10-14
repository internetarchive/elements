import { SearchResponse } from './responses/search-response';
import type { SearchParams } from './search-params';
import type { SearchServiceError } from './search-service-error';
import type { SearchServiceInterface } from './search-service-interface';
import type { Result } from '../result-type/result-type';
import { SearchType } from './search-type';
import type { SearchBackendOptionsInterface } from './search-backend/search-backend-options';
import type { SearchBackendInterface } from './search-backend/search-backend-interface';
import { FulltextSearchBackend } from './search-backend/fulltext-search-backend';
import { MetadataSearchBackend } from './search-backend/metadata-search-backend';
import { TVSearchBackend } from './search-backend/tv-search-backend';
import { RadioSearchBackend } from './search-backend/radio-search-backend';
import { FederatedSearchBackend } from './search-backend/federated-search-backend';
import { DefaultSearchBackend } from './search-backend/default-search-backend';
import { Memoize } from 'typescript-memoize';

/**
 * The Search Service is responsible for taking the raw response provided by
 * the Search Backend and modeling it as a `SearchResponse` object.
 */
export class SearchService implements SearchServiceInterface {
  public static default: SearchServiceInterface = new SearchService();

  private backendOptions: SearchBackendOptionsInterface;

  constructor(backendOptions: SearchBackendOptionsInterface = {}) {
    this.backendOptions = backendOptions;
  }

  /** @inheritdoc */
  async search(
    params: SearchParams,
    searchType: SearchType = SearchType.METADATA,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const searchBackend = SearchService.getBackendForSearchType(
      searchType,
      this.backendOptions,
    );

    const rawResponse = await searchBackend.performSearch(params);
    if (rawResponse.error) {
      return rawResponse;
    }

    const modeledResponse = new SearchResponse(rawResponse.success);
    return { success: modeledResponse };
  }

  itemDetails(
    identifier: string,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const searchParams: SearchParams = {
      pageType: 'item_details',
      pageTarget: identifier,
    };

    return this.search(searchParams, SearchType.DEFAULT);
  }

  /**
   * Retrieve a search backend that can handle the given type of search.
   * @param type The type of search that the backend needs to handle.
   * @param options Options to pass to the search backend.
   */
  @Memoize((type: SearchType, options: SearchBackendOptionsInterface = {}) => {
    // We can memoize backends based on their params, to avoid constructing redundant backends
    const {
      includeCredentials = false,
      verbose = false,
      scope = '',
      baseUrl = '',
    } = options;
    return `${type};${includeCredentials};${verbose};${scope};${baseUrl}`;
  })
  static getBackendForSearchType(
    type: SearchType,
    options: SearchBackendOptionsInterface = {},
  ): SearchBackendInterface {
    switch (type) {
      case SearchType.METADATA:
        return new MetadataSearchBackend(options);
      case SearchType.FULLTEXT:
        return new FulltextSearchBackend(options);
      case SearchType.RADIO:
        return new RadioSearchBackend(options);
      case SearchType.TV:
        return new TVSearchBackend(options);
      case SearchType.FEDERATED:
        return new FederatedSearchBackend(options);
      default:
        return new DefaultSearchBackend(options);
    }
  }
}
