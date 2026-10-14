/**
 * The server-parsed request parameters that are returned
 * with responses from the PPS endpoint.
 *
 * While similar in structure to the `SearchParams` passed
 * into a `search` call, this interface describes the _parsed_
 * parameters as the server has interpreted them (e.g., with
 * raw sort and aggregation strings rather than the structured
 * objects that callers pass with a query).
 */
export interface SearchRequestParams {
  client?: string;
  user_query?: string;
  service_backend?: string;
  page_type?: string;
  page_target?: string;
  page?: number;
  hits_per_page?: number;
  fields?: string[];
  sort?: string[];
  aggregations?: string[];
  aggregations_size?: number;
  uid?: string;
}
