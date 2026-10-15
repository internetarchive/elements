import type { Result } from '../result-type/result-type';
import type { SearchResponse } from './responses/search-response';
import type { SearchParams } from './search-params';
import type { SearchServiceError } from './search-service-error';
import type { SearchType } from './search-type';

export interface SearchServiceInterface {
  /**
   * Perform a search for given search params.
   *
   * @param {SearchParams} params Params object specifying the search query,
   * sorting/aggregation options, and other ways to adjust what is returned.
   * @param {SearchType} searchType What type of search to perform (e.g.,
   * metadata or full text)
   * @returns {Promise<Result<SearchResponse, SearchServiceError>>}
   */
  search(
    params: SearchParams,
    searchType?: SearchType,
  ): Promise<Result<SearchResponse, SearchServiceError>>;

  /**
   * Retrieve item details for a specific item.
   *
   * @param {string} identifier The item identifier
   * @returns {Promise<Result<SearchResponse, SearchServiceError>>}
   */
  itemDetails(
    identifier: string,
  ): Promise<Result<SearchResponse, SearchServiceError>>;
}
