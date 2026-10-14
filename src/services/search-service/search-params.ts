import { PageElementName } from './responses/page-elements';

export interface AggregateSearchParam {
  field: string;
  size?: number;
}

/**
 * An object specifying which aggregation types should be returned with
 * a search query.
 */
export interface AggregateSearchParams {
  /**
   * An array of objects each specifying both a field name for which
   * aggregations should be returned and the number of "buckets" that
   * should be returned for it.
   *
   * Note: this format may not be supported by all backends. Run some
   * test queries with advanced aggregation objects before relying on this.
   */
  advancedParams?: AggregateSearchParam[];

  /**
   * An array of field names for which aggregations should be returned.
   */
  simpleParams?: string[];

  /**
   * A flag to indicate that aggregations should be omitted entirely
   * from the response (e.g., to retrieve only search results without
   * the added time cost of generating aggregations for them).
   *
   * Setting this to `true` in a search call will result in a response
   * with `undefined` aggregations.
   */
  omit?: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortParam {
  /**
   * The name of the field to sort on (e.g., 'title').
   */
  field: string;

  /**
   * Which direction to sort in ('asc' or 'desc').
   */
  direction: SortDirection;
}

/**
 * Enumerates the possible contraints that may be imposed on search results
 * by filter params.
 */
export const FilterConstraint = {
  /**
   * Specifies that all results must include _at least one of_ the values constrained
   * with INCLUDE for this field.
   *
   * For instance, `{ subject: { baseball: INCLUDE, basketball: INCLUDE } }` specifies
   * that only results containing _either_ `baseball` _or_ `basketball` as a subject
   * should be returned.
   */
  INCLUDE: 'inc',

  /**
   * Specifies that all results must _not_ include the given value for this field.
   *
   * For instance, `{ subject: { baseball: EXCLUDE, basketball: EXCLUDE } }` specifies
   * that only results containing _neither_ `baseball` _nor_ `basketball` as a subject
   * should be returned.
   */
  EXCLUDE: 'exc',

  /**
   * Imposes a strict lower bound on numeric values for the current field.
   * All returned hits must have a value for this field that is greater than the one
   * specified by this filter.
   *
   * This only makes sense for numeric fields like `year`.
   * Note that `GREATER_THAN` is not supported by the FTS engine, for which it is
   * coerced to `GREATER_OR_EQUAL`.
   */
  GREATER_THAN: 'gt',

  /**
   * Imposes a non-strict lower bound on numeric values for the current field.
   * All returned hits must have a value for this field that is greater than or equal
   * to the one specified by this filter.
   *
   * This only makes sense for numeric fields like `year`.
   */
  GREATER_OR_EQUAL: 'gte',

  /**
   * Imposes a strict upper bound on numeric values for the current field.
   * All returned hits must have a value for this field that is less than the one
   * specified by this filter.
   *
   * This only makes sense for numeric fields like `year`.
   * Note that `LESS_THAN` is not supported by the FTS engine, for which it is
   * coerced to `LESS_OR_EQUAL`.
   */
  LESS_THAN: 'lt',

  /**
   * Imposes a non-strict upper bound on numeric values for the current field.
   * All returned hits must have a value for this field that is less than or equal
   * to the one specified by this filter.
   *
   * This only makes sense for numeric fields like `year`.
   */
  LESS_OR_EQUAL: 'lte',
} as const;

export type FilterConstraint =
  (typeof FilterConstraint)[keyof typeof FilterConstraint];

/**
 * A filter mapping a field value to the type of constraint(s) that it should impose on results.
 * Multiple constraints for the same value may be provided as an array.
 *
 * Some examples (where the property values are members of `FilterConstraint`):
 * - `{ 'puppies': INCLUDE }`
 * - `{ '1950': GREATER_OR_EQUAL, '1970': LESS_OR_EQUAL }`
 * - `{ '1950': [ GREATER_OR_EQUAL, EXCLUDE ] }`
 */
export type FieldFilter = Record<string, FilterConstraint | FilterConstraint[]>;

/**
 * A map of fields (e.g., 'year', 'subject', ...) to the filters that should be
 * applied to them when retrieving search results.
 *
 * These filters may represent selected/hidden facets, value ranges (e.g., date picker),
 * or other types of restrictions on the result set.
 *
 * An example of a valid FilterMap:
 * ```
 * {
 *   'subject': {
 *     'dogs': INCLUDE,
 *     'puppies': EXCLUDE,
 *   },
 *   'year': {
 *     '1990': GREATER_OR_EQUAL,
 *     '2010': LESS_OR_EQUAL,
 *     '2003': EXCLUDE,
 *     '2004': EXCLUDE,
 *   },
 *   // ...
 * }
 * ```
 */
export type FilterMap = Record<string, FieldFilter>;

export type PageType =
  | 'search_results'
  | 'collection_details'
  | 'account_details'
  | 'item_details'
  | 'client_document_fetch';

/**
 * SearchParams provides an encapsulation to all of the search parameters
 * available for searching.
 *
 * We use `SearchParamURLGenerator.generateUrlSearchParams` to convert the
 * parameters to a PPS-conforming query string -- i.e., it converts the
 * `fields` array to `fields=identifier,collection` and `sort` to
 * `sort=date:desc,downloads:asc`
 */
export interface SearchParams {
  /**
   * The query string to search for.
   */
  query?: string;

  /**
   * The page type to generate results for (e.g., 'search_results').
   *
   * Defaults to 'search_results' in the PPS. Meant to allow different
   * backend defaults to be used depending on the needs of certain pages.
   */
  pageType?: PageType;

  /**
   * For details pages, specifies the name of the collection/account
   * that is to be retrieved (e.g., 'prelinger', '@brewster').
   */
  pageTarget?: string;

  /**
   * For account details pages, which segments of page data should be retrieved
   * (e.g., 'uploads', 'reviews', ...)
   */
  pageElements?: PageElementName[];

  /**
   * Array of identifiers to fetch when performing a `client_document_fetch`.
   * Ignored for all other page types.
   */
  identifiers?: string[];

  /**
   * One or more parameters specifying how the search results should be
   * sorted. Each parameter should include the field name and sort direction,
   * e.g.: `{ field: 'title', sort: 'desc' }`
   */
  sort?: SortParam[];

  /**
   * The number of results to be retrieved per page.
   */
  rows?: number;

  /**
   * The page number to be retrieved (beginning from page 1).
   *
   * Note that the _size_ of each page is determined by the `rows` parameter.
   */
  page?: number;

  /**
   * A list of fields that should be retrieved for each search result. In most
   * cases it should be unnecessary to specify the fields parameter as it is
   * defaulted by the PPS depending on the page_type. However, it may be useful
   * in some cases to restrict which fields are returned to a smaller subset of
   * the defaults.
   */
  fields?: string[];

  /**
   * A map from field names to filters that can be used to shape the result set.
   * The keys identify what field to filter on (e.g., `'year'`, `'subject'`, etc.),
   * and the values identify what filters to apply for that field.
   *
   * The constraints allowed are the members of `FilterContraint`:
   * - `INCLUDE` (at least one of these values must be present)
   * - `EXCLUDE` (none of these values may be present)
   * - `GREATER_THAN` (result values must be strictly greater than the one specified)
   * - `GREATER_OR_EQUAL` (result values must be greater than or equal to than the one specified)
   * - `LESS_THAN` (result values must be strictly less than the one specified)
   * - `LESS_OR_EQUAL` (result values must be less than or equal to the one specified)
   *
   * So filters like `{ creator: { 'Cicero': INCLUDE } }` will produce
   * search results that all include `Cicero` as a creator, while filters like
   * `{ year: { '2000': GREATER_THAN, '2005': LESS_THAN } }` will produce search results whose
   * `year` field is between 2000 and 2005 (exclusive).
   */
  filters?: FilterMap;

  /**
   * An object specifying which aggregation types should be returned with
   * a search query.
   */
  aggregations?: AggregateSearchParams;

  /**
   * The number of buckets that should be returned for each aggregation type.
   * This defaults to 6 in the PPS (the number of facets displayed for each
   * facet type by default in the sidebar).
   */
  aggregationsSize?: number;

  /**
   * Whether to include debugging info in the returned PPS response.
   */
  debugging?: boolean;

  /**
   * A unique request ID to pass to the service.
   * Will be returned unmodified in the response, for ease of tracking responses,
   * e.g., to quickly determine whether a given response has obsolete data.
   */
  uid?: string;

  /**
   * Whether to include the client URL in the request.
   * This is useful for PPS debugging as it allows the backend folks to compare
   * any PPS response issues with the client URLs that generated them,
   * especially for issues related to parameter parsing & normalization.
   *
   * This defaults to true, as these should be sent on every request unless
   * there is a specific need not to include them for certain request types. Thus:
   *  * `includeClientUrl: undefined` causes `client_url` param to be included in the request, by default.
   *  * `includeClientUrl: true` causes `client_url` param to be included, explicitly.
   *  * `includeClientUrl: false` causes `client_url` param to _not_ be included in the request.
   *
   * Note that when included, the client URL is truncated to at most 400 characters, to prevent
   * overrunning URL length limits in the payload sent to the PPS. Moreover, if the query being
   * sent exceeds 1000 characters in length, then the client_url will be omitted from the request
   * regardless of this setting.
   */
  includeClientUrl?: boolean;
}
