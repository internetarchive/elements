import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DefaultSearchBackend } from './default-search-backend';
import {
  SearchServiceError,
  SearchServiceErrorType,
} from '../search-service-error';

describe('DefaultSearchBackend', () => {
  describe('basic fetch behavior', () => {
    let fetchBackup: typeof window.fetch;
    let urlCalled: RequestInfo | URL;
    let urlConfig: RequestInit | undefined;

    beforeEach(() => {
      fetchBackup = window.fetch;
      urlCalled = '';
      urlConfig = undefined;

      window.fetch = (
        url: RequestInfo | URL,
        config?: RequestInit,
      ): Promise<Response> => {
        urlCalled = url;
        urlConfig = config;
        const response = new Response('{ "foo": "bar" }');
        return new Promise((resolve) => resolve(response));
      };
    });

    afterEach(() => {
      window.fetch = fetchBackup;
    });

    it('can perform a search', async () => {
      const backend = new DefaultSearchBackend();
      const params = { query: 'foo' };
      const result = await backend.performSearch(params);

      expect(result.success?.foo).to.equal('bar');
    });

    it('does not set a service backend', async () => {
      const backend = new DefaultSearchBackend();
      await backend.performSearch({ query: 'foo' });

      expect(new URL(urlCalled!.toString()).searchParams.get('service_backend'))
        .to.be.null;
    });

    it('uses the provided service path', async () => {
      const backend = new DefaultSearchBackend({
        baseUrl: 'foo.bar',
        servicePath: '/baz',
      });
      await backend.performSearch({ query: 'boop' });

      expect(urlCalled!.toString()).to.satisfy((url: string) =>
        url.startsWith('https://foo.bar/baz'),
      );
    });

    it('includes credentials for search endpoint if requested', async () => {
      const backend = new DefaultSearchBackend({
        scope: 'foo',
        includeCredentials: true,
      });
      await backend.performSearch({ query: 'foo' });

      expect(urlConfig?.credentials).to.equal('include');
    });

    it('sends doc_ids in a POST body if performing a document fetch with a list of identifiers', async () => {
      const backend = new DefaultSearchBackend({
        scope: 'foo',
        includeCredentials: true,
      });
      await backend.performSearch({
        pageType: 'client_document_fetch',
        query: 'foo',
        identifiers: ['bar', 'baz'],
      });

      expect(urlConfig?.credentials).to.equal('include');
      expect(urlConfig?.method).to.equal('POST');
      expect(urlConfig?.body).to.equal(
        JSON.stringify({
          doc_ids: ['bar', 'baz'],
        }),
      );
    });

    it('gets scope param from URL if not provided as option', async () => {
      const url = new URL(window.location.href);
      url.searchParams.set('scope', 'boop');
      window.history.replaceState({}, '', url.toString());

      const backend = new DefaultSearchBackend();
      await backend.performSearch({ query: 'foo' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('scope')).to.equal('boop');

      url.searchParams.delete('scope');
      window.history.replaceState({}, '', url.toString());
    });

    it('includes caching param if provided as option', async () => {
      const cachingParam = JSON.stringify({ bypass: true });
      const backend = new DefaultSearchBackend({
        caching: cachingParam,
      });
      await backend.performSearch({ query: 'foo' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('caching')).to.equal(cachingParam);
    });

    it('gets caching param from URL if not provided as option', async () => {
      const cachingParam = JSON.stringify({ bypass: true });

      const url = new URL(window.location.href);
      url.searchParams.set('caching', cachingParam);
      window.history.replaceState({}, '', url.toString());

      const backend = new DefaultSearchBackend();
      await backend.performSearch({ query: 'foo' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('caching')).to.equal(cachingParam);

      url.searchParams.delete('caching');
      window.history.replaceState({}, '', url.toString());
    });

    it('gets reCache param from URL if not provided as option', async () => {
      const url = new URL(window.location.href);
      url.searchParams.set('reCache', '1');
      window.history.replaceState({}, '', url.toString());

      const backend = new DefaultSearchBackend();
      await backend.performSearch({ query: 'foo' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('caching')).to.equal('{"recompute":true}');

      url.searchParams.delete('reCache');
      window.history.replaceState({}, '', url.toString());
    });

    it('gets noCache param from URL if not provided as option', async () => {
      const url = new URL(window.location.href);
      url.searchParams.set('noCache', '1');
      window.history.replaceState({}, '', url.toString());

      const backend = new DefaultSearchBackend();
      await backend.performSearch({ query: 'foo' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('caching')).to.equal('{"bypass":true}');

      url.searchParams.delete('noCache');
      window.history.replaceState({}, '', url.toString());
    });

    it('gets dontCache param from URL if not provided as option', async () => {
      const url = new URL(window.location.href);
      url.searchParams.set('dontCache', '1');
      window.history.replaceState({}, '', url.toString());

      const backend = new DefaultSearchBackend();
      await backend.performSearch({ query: 'foo' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('caching')).to.equal('{"no_compute":true}');

      url.searchParams.delete('dontCache');
      window.history.replaceState({}, '', url.toString());
    });

    it('can enable debugging by default on all searches', async () => {
      const backend = new DefaultSearchBackend({
        baseUrl: 'foo.bar',
        servicePath: '/baz',
        debuggingEnabled: true,
      });
      await backend.performSearch({ query: 'boop' });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('user_query')).to.equal('boop');
      expect(queryParams.get('debugging')).to.equal('true');
    });

    it('can disable default debugging on individual searches', async () => {
      const backend = new DefaultSearchBackend({
        baseUrl: 'foo.bar',
        servicePath: '/baz',
        debuggingEnabled: true,
      });
      await backend.performSearch({
        query: 'boop',
        debugging: false,
      });

      const queryParams = new URL(urlCalled!.toString()).searchParams;
      expect(queryParams.get('user_query')).to.equal('boop');
      expect(queryParams.get('debugging')).to.be.null;
    });
  });

  it('returns a network error result upon fetch errors', async () => {
    const fetchBackup = window.fetch;
    window.fetch = async () => {
      throw new Error();
    };

    const backend = new DefaultSearchBackend();
    const response = await backend.performSearch({ query: 'foo' });
    expect(response).to.exist; // No error thrown
    expect(response.error).to.be.instanceof(SearchServiceError);
    expect(response.error?.type).to.equal(SearchServiceErrorType.networkError);

    window.fetch = fetchBackup;
  });

  it('outputs debugging information if present', async () => {
    const fetchBackup = window.fetch;
    let urlCalled: RequestInfo | URL = '';
    window.fetch = async (url: RequestInfo | URL) => {
      urlCalled = url;
      return new Response(
        JSON.stringify({
          debugging: {
            messages: ['boop'],
            data: {
              bar: 'baz',
            },
          },
        }),
      );
    };

    const logBackup = console.log;
    const logSpy = vi.fn();
    console.log = logSpy;

    const backend = new DefaultSearchBackend();
    await backend.performSearch({ query: 'foo', debugging: true });
    expect(urlCalled).to.include('debugging=true');
    expect(logSpy.mock.calls).to.deep.include(['boop']);
    expect(logSpy.mock.calls).to.deep.include(['bar', 'baz']);

    window.fetch = fetchBackup;
    console.log = logBackup;
  });

  it('handles incomplete debugging information gracefully', async () => {
    const fetchBackup = window.fetch;
    window.fetch = async () => {
      return new Response(
        JSON.stringify({
          debugging: {},
        }),
      );
    };

    const logBackup = console.log;
    const logSpy = vi.fn();
    console.log = logSpy;

    const backend = new DefaultSearchBackend();
    const response = await backend.performSearch({
      query: 'foo',
      debugging: true,
    });
    expect(response).to.exist; // No error thrown

    window.fetch = fetchBackup;
    console.log = logBackup;
  });

  it('logs response to console if verbose=true', async () => {
    const responseObj = {
      response: {
        body: {
          hits: {
            hits: ['h1', 'h2', 'h3', 'h4', 'h5'],
          },
          aggregations: {
            creator: {
              buckets: ['c1', 'c2', 'c3', 'c4', 'c5'],
            },
          },
        },
      },
    };

    const expectedLogObj = {
      response: {
        body: {
          hits: {
            hits: ['h1', '*** 4 hits omitted ***'],
          },
          aggregations: {
            creator: {
              buckets: '*** 5 buckets omitted ***',
            },
          },
        },
      },
    };

    const fetchBackup = window.fetch;
    window.fetch = async () => {
      return new Response(JSON.stringify(responseObj));
    };

    const logBackup = console.log;
    const logSpy = vi.fn();
    console.log = logSpy;

    const backend = new DefaultSearchBackend({ verbose: true });
    await backend.performSearch({
      query: 'boop',
    });

    expect(logSpy.mock.calls.length).to.be.greaterThan(0);
    expect(logSpy.mock.calls[0][0]).to.equal('***** RESPONSE RECEIVED *****');
    expect(logSpy.mock.calls[1][0]).to.equal(
      JSON.stringify(expectedLogObj, null, 2),
    );

    window.fetch = fetchBackup;
    console.log = logBackup;
  });

  it('includes verbose param from URL if not provided', async () => {
    const fetchBackup = window.fetch;
    window.fetch = async () => {
      return new Response(JSON.stringify({}));
    };

    const url = new URL(window.location.href);
    url.searchParams.set('verbose', '1');
    window.history.replaceState({}, '', url.toString());

    const logBackup = console.log;
    const logSpy = vi.fn();
    console.log = logSpy;

    const backend = new DefaultSearchBackend();
    await backend.performSearch({ query: 'foo' });

    expect(logSpy.mock.calls.length).to.be.greaterThan(0);
    expect(logSpy.mock.calls[0][0]).to.equal('***** RESPONSE RECEIVED *****');

    window.fetch = fetchBackup;
    console.log = logBackup;
    url.searchParams.delete('verbose');
    window.history.replaceState({}, '', url.toString());
  });
});
