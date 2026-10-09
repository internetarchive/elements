/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResponseHeader } from './search-response-header';
import {
  SearchResponseDetailsInterface,
  SearchResponseDetails,
} from './search-response-details';
import { SearchRequest } from './search-request';
import { SearchResponseSessionContext } from './search-response-session-context';

/**
 * The top-level response model when retrieving a response from the page production service endpoint.
 *
 * @export
 * @class SearchResponse
 */
export class SearchResponse {
  /**
   * The raw JSON received from the endpoint. This is useful for inspecting if needed.
   *
   * @type {Record<string, any>}
   * @memberof SearchResponse
   */
  rawResponse: Record<string, any>;

  /**
   * The request object returned by the backend, specifying the query parameters and
   * how the backend interpreted them.
   */
  request: SearchRequest;

  /**
   * The response header
   *
   * @type {SearchResponseHeader}
   * @memberof SearchResponse
   */
  responseHeader: SearchResponseHeader;

  /**
   * The session context from the PPS
   */
  sessionContext: SearchResponseSessionContext;

  /**
   * The response containing the search results
   *
   * @type {SearchResponseDetailsInterface}
   * @memberof SearchResponse
   */
  response: SearchResponseDetailsInterface;

  constructor(json: Record<string, any>) {
    this.rawResponse = json;
    this.request = new SearchRequest(json.request);
    this.responseHeader = json.response?.header;
    this.sessionContext = json.session_context;
    this.response = new SearchResponseDetails(
      json.response?.body,
      json.response?.hit_schema,
    );
  }
}
