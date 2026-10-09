import {
  AggregateSearchParams,
  FilterMap,
  SearchParams,
  SortParam,
} from './search-params';

export class SearchParamURLGenerator {
  /**
   * Generates a query parameter from the given aggregate search params
   *
   * Example:
   *
   * [
   *  {
   *    "terms": {
   *      "field": "collection",
   *      "size":10
   *    }
   *  },
   *  {
   *    "terms": {
   *      "field": "subjectSorter",
   *      "size": 10
   *    }
   *  }
   * ]
   *
   * @returns {string | undefined}
   * @memberof AggregateSearchParams
   */
  static aggregateSearchParamsAsString(
    aggregateSearchParams: AggregateSearchParams,
  ): string | undefined {
    if (aggregateSearchParams.omit) {
      return 'false';
    }

    if (aggregateSearchParams.advancedParams) {
      const params = aggregateSearchParams.advancedParams.map((param) => {
        return {
          terms: param,
        };
      });
      const stringified = JSON.stringify(params);
      return stringified;
    }

    if (aggregateSearchParams.simpleParams) {
      return aggregateSearchParams.simpleParams.join(',');
    }
  }

  static sortParamsAsString(sortParams: SortParam): string {
    return `${sortParams.field}:${sortParams.direction}`;
  }

  static filterParamsAsString(filters: FilterMap): string {
    // FilterMap already has the correct shape, we just need to stringify it
    return JSON.stringify(filters);
  }

  static generateURLSearchParams(searchParams: SearchParams): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();

    if (searchParams.query) {
      params.append('user_query', searchParams.query);
    }

    if (searchParams.pageType) {
      params.append('page_type', String(searchParams.pageType));
    }

    if (searchParams.pageTarget) {
      params.append('page_target', String(searchParams.pageTarget));
    }

    if (searchParams.pageElements && searchParams.pageElements.length > 0) {
      const quotedPageElements = searchParams.pageElements.map(
        (el) => `"${el}"`,
      );
      const pageElementParam = `[${quotedPageElements.join(',')}]`;
      params.append('page_elements', pageElementParam);
    }

    if (searchParams.rows != null) {
      params.append('hits_per_page', String(searchParams.rows));
    }

    if (searchParams.page != null) {
      params.append('page', String(searchParams.page));
    }

    if (searchParams.fields && searchParams.fields.length > 0) {
      params.append('fields', searchParams.fields.join(','));
    }

    if (searchParams.filters && Object.keys(searchParams.filters).length > 0) {
      const filterMapString = this.filterParamsAsString(searchParams.filters);
      if (filterMapString && filterMapString !== '{}') {
        // Don't send an empty map
        params.append('filter_map', filterMapString);
      }
    }

    if (searchParams.sort && searchParams.sort.length > 0) {
      const sortStrings = searchParams.sort.map((sort) =>
        this.sortParamsAsString(sort),
      );
      params.append('sort', sortStrings.join(','));
    }

    const aggregations = searchParams.aggregations;
    if (aggregations) {
      const aggString = this.aggregateSearchParamsAsString(aggregations);
      if (aggString) {
        params.append('aggregations', aggString);
      }
    }

    if (searchParams.aggregationsSize != null) {
      params.append('aggregations_size', String(searchParams.aggregationsSize));
    }

    if (searchParams.debugging) {
      params.append('debugging', 'true');
    }

    if (searchParams.uid) {
      params.append('uid', searchParams.uid);
    }

    if (searchParams.includeClientUrl !== false) {
      const noQuery = searchParams.query == null;
      // If the query is particularly long, exclude the client_url altogether
      const queryWithinLimit =
        searchParams.query && searchParams.query.length <= 1000;
      const includeClientUrl = noQuery || queryWithinLimit;

      if (includeClientUrl) {
        // Truncate the client_url to 400 characters
        const truncatedUrl = window.location.href.slice(0, 400);
        params.append('client_url', truncatedUrl);
      }
    }

    return params;
  }
}
