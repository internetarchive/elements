import { describe, it, expect } from 'vitest';
import { SearchParamURLGenerator } from './search-param-url-generator';

import { FilterConstraint, SearchParams, SortParam } from './search-params';

describe('SearchParams', () => {
  it('can be instantiated with just a query', async () => {
    const query = 'title:foo AND collection:bar';
    const params = { query };
    expect(params.query).to.equal(query);
  });

  it('can be instantiated with query params and fields', async () => {
    const query = 'title:foo AND collection:bar';
    const fields = ['identifier', 'foo', 'bar'];
    const params = {
      query,
      fields,
    };
    expect(params.fields).to.deep.equal(fields);
  });

  it('properly generates a URLSearchParam with just a query', async () => {
    const query = 'title:foo AND collection:bar';
    const params = { query };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
  });

  it('properly generates a URLSearchParam with a query and fields', async () => {
    const query = 'title:foo AND collection:bar';
    const fields = ['identifier', 'foo', 'bar'];
    const params = {
      query,
      fields,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('fields')).to.equal('identifier,foo,bar');
  });

  it('properly generates a URLSearchParam with a query, sort, rows, page, and fields', async () => {
    const query = 'title:foo AND collection:bar';
    const fields = ['identifier', 'foo', 'bar'];
    const sort: SortParam[] = [{ field: 'downloads', direction: 'desc' }];
    const params = {
      query,
      sort,
      rows: 53,
      page: 27,
      fields,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('hits_per_page')).to.equal('53');
    expect(queryParams.get('page')).to.equal('27');
    expect(queryParams.get('fields')).to.equal('identifier,foo,bar');
    expect(queryParams.get('sort')).to.equal('downloads:desc');
  });

  it('properly generates a URLSearchParam multiple sort params', async () => {
    const query = 'title:foo AND collection:bar';
    const sort: SortParam[] = [
      { field: 'downloads', direction: 'desc' },
      { field: 'foo', direction: 'asc' },
    ];
    const params = {
      query,
      sort,
      rows: 53,
      page: 27,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('hits_per_page')).to.equal('53');
    expect(queryParams.get('page')).to.equal('27');
    expect(queryParams.get('sort')).to.equal('downloads:desc,foo:asc');
  });

  it('does not include fields param in URL for empty fields array', async () => {
    const query = 'title:foo AND collection:bar';
    const fields: string[] = [];
    const params = {
      query,
      fields,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('fields')).to.be.null;
  });

  it('does not include sort param in URL for empty sort array', async () => {
    const query = 'title:foo AND collection:bar';
    const sort: SortParam[] = [];
    const params = {
      query,
      sort,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('sort')).to.be.null;
  });

  it('properly generates a URLSearchParam with a page_type', async () => {
    const query = 'title:foo AND collection:bar';
    const params: SearchParams = {
      query,
      pageType: 'search_results',
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('page_type')).to.equal('search_results');
  });

  it('properly generates a URLSearchParam with a page_type and page_target', async () => {
    const query = 'title:foo AND collection:bar';
    const params: SearchParams = {
      query,
      pageType: 'collection_details',
      pageTarget: 'bar',
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('page_type')).to.equal('collection_details');
    expect(queryParams.get('page_target')).to.equal('bar');
  });

  it('properly generates a URLSearchParam with a page_type, page_target, and page_elements', async () => {
    const query = 'title:foo AND collection:bar';
    const params: SearchParams = {
      query,
      pageType: 'account_details',
      pageTarget: '@foobar',
      pageElements: ['uploads', 'web_archives'],
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('page_type')).to.equal('account_details');
    expect(queryParams.get('page_target')).to.equal('@foobar');
    expect(queryParams.get('page_elements')).to.equal(
      '["uploads","web_archives"]',
    );
  });

  it('properly generates a URLSearchParam with aggregations omitted', async () => {
    const query = 'title:foo AND collection:bar';
    const params = {
      query,
      aggregations: {
        omit: true,
      },
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('aggregations')).to.equal('false');
  });

  it('properly generates a URLSearchParam with advanced aggregations', async () => {
    const query = 'title:foo AND collection:bar';
    const aggregations = {
      advancedParams: [
        {
          field: 'foo',
          size: 10,
        },
        {
          field: 'bar',
          size: 7,
        },
      ],
    };
    const params = {
      query,
      aggregations,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);

    const expectedAggregationsParam =
      '[{"terms":{"field":"foo","size":10}},{"terms":{"field":"bar","size":7}}]';
    expect(queryParams.get('aggregations')).to.equal(expectedAggregationsParam);
  });

  it('properly generates a URLSearchParam with simple aggregations', async () => {
    const query = 'title:foo AND collection:bar';
    const aggregations = {
      simpleParams: ['year', 'collection', 'subject'],
    };
    const params = {
      query,
      aggregations,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('aggregations')).to.equal('year,collection,subject');
  });

  it('properly generates a URLSearchParam with an aggregations_size param', async () => {
    const query = 'title:foo AND collection:bar';
    const aggregations = {
      simpleParams: ['year', 'collection', 'subject'],
    };
    const params = {
      query,
      aggregations,
      aggregationsSize: 3,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('aggregations')).to.equal('year,collection,subject');
    expect(queryParams.get('aggregations_size')).to.equal('3');
  });

  it('advanced aggregations take precedence if both simple and advanced provided', async () => {
    const query = 'title:foo AND collection:bar';
    const aggregations = {
      advancedParams: [
        {
          field: 'foo',
          size: 10,
        },
        {
          field: 'bar',
          size: 7,
        },
      ],
      simpleParams: ['year'],
    };
    const params = {
      query,
      aggregations,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);

    const expectedAggregationsParam =
      '[{"terms":{"field":"foo","size":10}},{"terms":{"field":"bar","size":7}}]';
    expect(queryParams.get('aggregations')).to.equal(expectedAggregationsParam);
  });

  it('properly generates a URLSearchParam with simple filter map', async () => {
    const query = 'title:foo';
    const params: SearchParams = {
      query,
      filters: {
        subject: {
          foo: FilterConstraint.INCLUDE,
        },
      },
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal('title:foo');
    expect(queryParams.get('filter_map')).to.equal('{"subject":{"foo":"inc"}}');
  });

  it('properly generates a URLSearchParam with complex filter map', async () => {
    const query = 'title:foo';
    const params: SearchParams = {
      query,
      filters: {
        subject: {
          foo: FilterConstraint.INCLUDE,
          bar: FilterConstraint.EXCLUDE,
        },
        year: {
          1950: FilterConstraint.GREATER_OR_EQUAL,
          2000: FilterConstraint.LESS_OR_EQUAL,
          1980: FilterConstraint.EXCLUDE,
          1990: FilterConstraint.EXCLUDE,
        },
      },
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal('title:foo');
    expect(queryParams.get('filter_map')).to.equal(
      '{"subject":{"foo":"inc","bar":"exc"},"year":{"1950":"gte","1980":"exc","1990":"exc","2000":"lte"}}',
    );
  });

  it('properly generates a URLSearchParam with gt/lt pairs', async () => {
    const query = 'title:foo';
    const params: SearchParams = {
      query,
      filters: {
        year: {
          1950: FilterConstraint.GREATER_THAN,
          2000: FilterConstraint.LESS_THAN,
        },
      },
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal('title:foo');
    expect(queryParams.get('filter_map')).to.equal(
      '{"year":{"1950":"gt","2000":"lt"}}',
    );
  });

  it('properly generates a URLSearchParam with debugging enabled', async () => {
    const query = 'title:foo';
    const params = {
      query,
      debugging: true,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal('title:foo');
    expect(queryParams.get('debugging')).to.equal('true');
  });

  it('properly generates a URLSearchParam with a uid', async () => {
    const query = 'title:foo';
    const params = {
      query,
      uid: 'boop',
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('uid')).to.equal('boop');
  });

  it('properly generates a URLSearchParam with the client url by default', async () => {
    const query = 'title:foo';
    const params = {
      query,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);

    // Don't rely on exact web-test-runner URLs, just verify the param was added and is a valid URL
    expect(queryParams.get('client_url')).to.exist;

    expect(new URL(queryParams.get('client_url')!)).not.to.throw;
  });

  it('does not include client url when includeClientURL=false', async () => {
    const query = 'title:foo';
    const params = {
      query,
      includeClientUrl: false,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);
    expect(queryParams.get('client_url')).to.be.null;
  });

  it('does include client url when includeClientURL=true', async () => {
    const query = 'title:foo';
    const params = {
      query,
      includeClientUrl: true,
    };
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.equal(query);

    // Don't rely on exact web-test-runner URLs, just verify the param was added and is a valid URL
    expect(queryParams.get('client_url')).to.exist;

    expect(new URL(queryParams.get('client_url')!)).not.to.throw;
  });

  it('does not include user_query when no query present', async () => {
    const params = {};
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    expect(queryParams.get('user_query')).to.be.null;
  });

  it('does include client_url when no query present', async () => {
    const params = {};
    const urlSearchParam =
      SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const queryParams = new URL(`https://foo.bar/?${queryAsString}`)
      .searchParams;
    // Don't rely on exact web-test-runner URLs, just verify the param was added and is a valid URL
    expect(queryParams.get('client_url')).to.exist;

    expect(new URL(queryParams.get('client_url')!)).not.to.throw;
  });
});
