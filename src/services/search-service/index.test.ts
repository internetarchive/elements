import { describe, expect, it } from 'vitest';
import * as searchService from './index';
import { SearchServiceErrorType } from './search-service-error';
import { AggregationSortType } from './models/aggregation';

describe('search-service entry point', () => {
  it('exports the service, the backends and the value types', () => {
    for (const name of [
      'SearchService',
      'MetadataSearchBackend',
      'FulltextSearchBackend',
      'RadioSearchBackend',
      'SearchType',
      'ItemHit',
      'TextHit',
      'Aggregation',
      'FilterConstraint',
      'SearchServiceError',
    ]) {
      expect(searchService, name).to.have.property(name);
    }
  });

  it('keeps the enum-like values the consumers compare against', () => {
    expect(searchService.SearchType.DEFAULT).to.equal(0);
    expect(searchService.SearchType.FEDERATED).to.equal(5);
    expect(searchService.FilterConstraint.INCLUDE).to.equal('inc');
    expect(SearchServiceErrorType.networkError).to.equal(
      'SearchService.NetworkError',
    );
    expect(AggregationSortType.NUMERIC).to.equal(2);
    expect(searchService.AggregationSortType).to.equal(AggregationSortType);
  });
});
