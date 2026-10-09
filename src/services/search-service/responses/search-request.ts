/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchRequestParams } from './search-request-params';

export type RequestKind = 'hits' | 'aggregations' | 'noop';

export interface BackendRequest {
  /** The finalized client parameters used to query the backend service */
  finalized_parameters: SearchRequestParams;
  /** The backend request kind (which may differ from the overall request kind) */
  kind: RequestKind;
  /** Name of which other backend request spawned this one, if any */
  parent?: string;
}

/**
 * A model for the request parameters returned with each search response.
 */
export class SearchRequest {
  /**
   * The original client parameters sent with the request
   */
  clientParameters: SearchRequestParams;

  /**
   * Details about the actual backend requests made
   */
  backendRequests: Record<string, BackendRequest>;

  /**
   * The overall 'kind' of request being made (e.g., for hits vs. aggregations)
   */
  kind: RequestKind;

  constructor(json: Record<string, any>) {
    this.clientParameters = json.client_parameters;
    this.backendRequests = json.backend_requests;
    this.kind = json.kind;
  }
}
