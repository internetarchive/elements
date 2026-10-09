/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Result } from '../../result-type/result-type';
import type { SearchParams } from '../search-params';
import type { SearchServiceError } from '../search-service-error';

/**
 * An interface to provide the network layer to the `SearchService`.
 *
 * Objects implementing this interface are responsible for making calls to the Internet Archive
 * search endpoints or otherwise providing a similar reponse in JSON format.
 *
 * This allows for projects like the DWeb project to provide
 * alternative datasources for a request.
 *
 * @export
 * @interface SearchBackendInterface
 */
export interface SearchBackendInterface {
  /**
   * Perform a search for the given parameters.
   *
   * @param params
   */
  performSearch(params: SearchParams): Promise<Result<any, SearchServiceError>>;
}
