/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { SearchService } from './search-service';
import { SearchParams } from './search-params';

import { MockResponseGenerator } from './mock-response-generator.test-helper';
import { Result } from '../result-type/result-type';
import {
  SearchServiceError,
  SearchServiceErrorType,
} from './search-service-error';
import { SearchBackendInterface } from './search-backend/search-backend-interface';
import { SearchType } from './search-type';
import { DefaultSearchBackend } from './search-backend/default-search-backend';
import { MetadataSearchBackend } from './search-backend/metadata-search-backend';
import { FulltextSearchBackend } from './search-backend/fulltext-search-backend';
import { TVSearchBackend } from './search-backend/tv-search-backend';
import { RadioSearchBackend } from './search-backend/radio-search-backend';
import { FederatedSearchBackend } from './search-backend/federated-search-backend';

describe('SearchService', () => {
  it('can search when requested', async () => {
    class MockSearchBackend implements SearchBackendInterface {
      async performSearch(
        params: SearchParams,
      ): Promise<Result<any, SearchServiceError>> {
        const responseGenerator = new MockResponseGenerator();
        const mockResponse =
          responseGenerator.generateMockMetadataSearchResponse(params);
        return { success: mockResponse };
      }
    }

    const backend = new MockSearchBackend();
    const realFactoryMethod = SearchService.getBackendForSearchType;
    SearchService.getBackendForSearchType = () => backend;

    const query = 'title:foo AND collection:bar';
    const service = new SearchService();
    const result = await service.search({ query });
    expect(
      result.success?.request.backendRequests.primary?.finalized_parameters
        ?.user_query,
    ).to.equal(query);

    SearchService.getBackendForSearchType = realFactoryMethod;
  });

  it('returns the search backend network error if one occurs', async () => {
    class MockSearchBackend implements SearchBackendInterface {
      async performSearch(
        _params: SearchParams,
      ): Promise<Result<any, SearchServiceError>> {
        const error = new SearchServiceError(
          SearchServiceErrorType.networkError,
          'network error',
        );
        return { error };
      }
    }

    const backend = new MockSearchBackend();
    const realFactoryMethod = SearchService.getBackendForSearchType;
    SearchService.getBackendForSearchType = () => backend;

    const service = new SearchService();

    const searchResult = await service.search({ query: 'boop' });
    expect(searchResult.error).to.not.equal(undefined);
    expect(searchResult.error?.type).to.equal(
      SearchServiceErrorType.networkError,
    );
    expect(searchResult.error?.message).to.equal('network error');

    SearchService.getBackendForSearchType = realFactoryMethod;
  });

  it('returns the search backend decoding error if one occurs', async () => {
    class MockSearchBackend implements SearchBackendInterface {
      async performSearch(
        _params: SearchParams,
      ): Promise<Result<any, SearchServiceError>> {
        const error = new SearchServiceError(
          SearchServiceErrorType.decodingError,
          'decoding error',
        );
        return { error };
      }
    }

    const backend = new MockSearchBackend();
    const realFactoryMethod = SearchService.getBackendForSearchType;
    SearchService.getBackendForSearchType = () => backend;

    const service = new SearchService();

    const searchResult = await service.search({ query: 'boop' });
    expect(searchResult.error).to.not.equal(undefined);
    expect(searchResult.error?.type).to.equal(
      SearchServiceErrorType.decodingError,
    );
    expect(searchResult.error?.message).to.equal('decoding error');

    SearchService.getBackendForSearchType = realFactoryMethod;
  });

  it('passes backend options to backend', async () => {
    class MockSearchBackend implements SearchBackendInterface {
      async performSearch(
        params: SearchParams,
      ): Promise<Result<any, SearchServiceError>> {
        const responseGenerator = new MockResponseGenerator();
        const mockResponse =
          responseGenerator.generateMockMetadataSearchResponse(params);
        return { success: mockResponse };
      }
    }

    const backend = new MockSearchBackend();
    const spy = vi.fn();

    const realFactoryMethod = SearchService.getBackendForSearchType;
    SearchService.getBackendForSearchType = (...args) => {
      spy(...args);
      return backend;
    };

    const backendOptions = {
      baseUrl: 'foo.bar',
      includeCredentials: true,
      scope: 'baz',
    };

    const service = new SearchService(backendOptions);

    const params = { query: 'boop' };
    await service.search(params);

    expect(spy.mock.calls.length).to.equal(1);
    expect(spy.mock.calls[0][1]).to.deep.equal(backendOptions);

    SearchService.getBackendForSearchType = realFactoryMethod;
  });

  it('factory method gets default backend', async () => {
    expect(
      SearchService.getBackendForSearchType(SearchType.DEFAULT),
    ).to.be.instanceOf(DefaultSearchBackend);
  });

  it('factory method gets metadata backend', async () => {
    expect(
      SearchService.getBackendForSearchType(SearchType.METADATA),
    ).to.be.instanceOf(MetadataSearchBackend);
  });

  it('factory method gets fulltext backend', async () => {
    expect(
      SearchService.getBackendForSearchType(SearchType.FULLTEXT),
    ).to.be.instanceOf(FulltextSearchBackend);
  });

  it('factory method gets TV backend', async () => {
    expect(
      SearchService.getBackendForSearchType(SearchType.TV),
    ).to.be.instanceOf(TVSearchBackend);
  });

  it('factory method gets radio backend', async () => {
    expect(
      SearchService.getBackendForSearchType(SearchType.RADIO),
    ).to.be.instanceOf(RadioSearchBackend);
  });

  it('factory method gets federated backend', async () => {
    expect(
      SearchService.getBackendForSearchType(SearchType.FEDERATED),
    ).to.be.instanceOf(FederatedSearchBackend);
  });

  describe('itemDetails', () => {
    it('can get item details when requested', async () => {
      class MockSearchBackend implements SearchBackendInterface {
        async performSearch(
          _params: SearchParams,
        ): Promise<Result<any, SearchServiceError>> {
          const responseGenerator = new MockResponseGenerator();
          const mockResponse =
            responseGenerator.generateMockItemDetailsResponse();
          return { success: mockResponse };
        }
      }

      const backend = new MockSearchBackend();
      const realFactoryMethod = SearchService.getBackendForSearchType;
      SearchService.getBackendForSearchType = () => backend;

      const service = new SearchService();

      const searchResult = await service.itemDetails('foo');
      expect(searchResult.success).to.not.equal(undefined);
      expect(searchResult.success?.response.extraInfo?.item_size).to.equal(
        1094661875,
      );

      SearchService.getBackendForSearchType = realFactoryMethod;
    });
  });
});
