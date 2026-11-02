/* eslint-disable @typescript-eslint/no-unused-vars */

import { describe, it, expect, afterEach } from 'vitest';
import { DefaultMetadataBackend } from './default-metadata-backend';
import { MetadataServiceErrorType } from '../metadata-service-error';

describe('DefaultMetadataBackend', () => {
  it('can fetch metadata', async () => {
    const fetchBackup = window.fetch;
    window.fetch = (): Promise<Response> => {
      return new Promise((resolve) => {
        const response = new Response('{ "foo": "bar" }');
        resolve(response);
      });
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.success?.foo).to.equal('bar');
    window.fetch = fetchBackup;
  });

  it('returns a networkError if theres a problem fetching using String type', async () => {
    const fetchBackup = window.fetch;
    window.fetch = (): Promise<Response> => {
      throw 'network error';
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.error?.type).to.equal(MetadataServiceErrorType.networkError);
    expect(result.error?.message).to.equal('network error');
    window.fetch = fetchBackup;
  });

  it('returns a networkError if theres a problem fetching using Error type', async () => {
    const fetchBackup = window.fetch;
    window.fetch = (): Promise<Response> => {
      throw new Error('network error');
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.error?.type).to.equal(MetadataServiceErrorType.networkError);
    expect(result.error?.message).to.equal('network error');
    window.fetch = fetchBackup;
  });

  it('returns a decodingError if theres a problem decoding the json', async () => {
    const fetchBackup = window.fetch;
    window.fetch = (): Promise<Response> => {
      const response = new Response('boop');
      return new Promise((resolve) => resolve(response));
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.error?.type).to.equal(MetadataServiceErrorType.decodingError);
    window.fetch = fetchBackup;
  });

  it('appends the scope if provided', async () => {
    const fetchBackup = window.fetch;
    let urlCalled = '';
    window.fetch = (
      input: RequestInfo | URL,
      _init?: RequestInit | undefined,
    ): Promise<Response> => {
      urlCalled = input.toString();
      const response = new Response('boop');
      return new Promise((resolve) => resolve(response));
    };

    const backend = new DefaultMetadataBackend({
      scope: 'foo',
    });
    await backend.fetchMetadata('foo');
    expect(urlCalled.includes('scope=foo')).to.be.true;
    window.fetch = fetchBackup;
  });

  it('credentials for metadata endpoint', async () => {
    const fetchBackup = window.fetch;
    let urlConfig: RequestInit | undefined;
    window.fetch = (
      _input: RequestInfo | URL,
      init?: RequestInit | undefined,
    ): Promise<Response> => {
      urlConfig = init;
      const response = new Response('boop');
      return new Promise((resolve) => resolve(response));
    };

    const backend = new DefaultMetadataBackend({
      scope: 'foo',
      includeCredentials: true,
    });
    await backend.fetchMetadata('foo');
    expect(urlConfig?.credentials).to.equal('include');
    window.fetch = fetchBackup;
  });

  describe('request path', () => {
    async function urlFor(identifier: string, keypath?: string) {
      const fetchBackup = window.fetch;
      let urlCalled = '';
      window.fetch = (input: RequestInfo | URL): Promise<Response> => {
        urlCalled = input.toString();
        return Promise.resolve(new Response('{}'));
      };
      try {
        await new DefaultMetadataBackend({
          scope: 'foo',
        }).fetchMetadata(identifier, keypath);
      } finally {
        window.fetch = fetchBackup;
      }
      return new URL(urlCalled);
    }

    it('keeps an ordinary identifier and key path as they are', async () => {
      const url = await urlFor('foo-bar_1.2', 'metadata/title');

      expect(url.pathname).to.equal('/metadata/foo-bar_1.2/metadata/title');
    });

    it('does not let an identifier leave /metadata/ or add a query', async () => {
      const url = await urlFor('../services/user?x=1#frag');

      // one path segment after /metadata/, with the slashes and query encoded
      expect(url.pathname.split('/')).to.have.length(3);
      expect(url.pathname.startsWith('/metadata/')).to.be.true;
      expect(url.searchParams.get('x')).to.be.null;
      expect(url.hash).to.equal('');
      expect(url.searchParams.get('scope')).to.equal('foo');
    });

    it('refuses a dot segment in the identifier or key path', async () => {
      const backend = new DefaultMetadataBackend({ scope: 'foo' });
      const fetchBackup = window.fetch;
      let fetched = false;
      window.fetch = (): Promise<Response> => {
        fetched = true;
        return Promise.resolve(new Response('{}'));
      };
      try {
        const cases: [string, string | undefined][] = [
          ['..', undefined],
          ['.', undefined],
          ['foo', '../../services/user'],
          ['foo', 'metadata/./title'],
        ];
        for (const [identifier, keypath] of cases) {
          const result = await backend.fetchMetadata(identifier, keypath);
          expect(result.error?.type).to.equal(
            MetadataServiceErrorType.itemNotFound,
          );
        }
      } finally {
        window.fetch = fetchBackup;
      }

      expect(fetched).to.be.false;
    });
  });
});

describe('DefaultMetadataBackend writeMetadata', () => {
  const fetchBackup = window.fetch;

  afterEach(() => {
    window.fetch = fetchBackup;
  });

  it('posts the patch as a form to the item endpoint', async () => {
    let requestUrl = '';
    let requestInit: RequestInit | undefined;
    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> => {
      requestUrl = String(input);
      requestInit = init;
      return new Response('{ "success": true, "task_id": 7, "log": "x" }');
    };

    const backend = new DefaultMetadataBackend({ includeCredentials: true });
    const patch = [{ op: 'replace' as const, path: '/title', value: 'New' }];
    const result = await backend.writeMetadata('foo', 'metadata', patch);

    expect(result.success?.task_id).to.equal(7);
    expect(requestUrl).to.equal('https://archive.org/metadata/foo');
    expect(requestInit?.method).to.equal('POST');
    expect(requestInit?.credentials).to.equal('include');
    const body = requestInit?.body as URLSearchParams;
    expect(body.get('-target')).to.equal('metadata');
    expect(JSON.parse(body.get('-patch') ?? '')).to.deep.equal(patch);
  });

  it('returns a writeError with MDAPI’s message when the write is rejected', async () => {
    window.fetch = async (): Promise<Response> =>
      new Response('{ "success": false, "error": "Authorization failed" }', {
        status: 401,
      });

    const backend = new DefaultMetadataBackend();
    const result = await backend.writeMetadata('foo', 'metadata', []);

    expect(result.error?.type).to.equal(MetadataServiceErrorType.writeError);
    expect(result.error?.message).to.equal('Authorization failed');
  });

  it('returns a writeError when MDAPI does not report success', async () => {
    window.fetch = async (): Promise<Response> => new Response('{}');

    const backend = new DefaultMetadataBackend();
    const result = await backend.writeMetadata('foo', 'metadata', []);

    expect(result.error?.type).to.equal(MetadataServiceErrorType.writeError);
  });

  it('returns a networkError when the request fails', async () => {
    window.fetch = async (): Promise<Response> => {
      throw new Error('offline');
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.writeMetadata('foo', 'metadata', []);

    expect(result.error?.type).to.equal(MetadataServiceErrorType.networkError);
  });

  it('encodes the identifier in the write URL', async () => {
    let requestUrl = '';
    window.fetch = async (input: RequestInfo | URL): Promise<Response> => {
      requestUrl = String(input);
      return new Response('{ "success": true }');
    };

    const backend = new DefaultMetadataBackend();
    await backend.writeMetadata('a/b?c', 'metadata', []);

    expect(requestUrl).to.equal('https://archive.org/metadata/a%2Fb%3Fc');
  });

  it('refuses identifiers that would climb out of /metadata/', async () => {
    let called = false;
    window.fetch = async (): Promise<Response> => {
      called = true;
      return new Response('{ "success": true }');
    };

    const backend = new DefaultMetadataBackend();
    for (const identifier of ['', '.', '..']) {
      const result = await backend.writeMetadata(identifier, 'metadata', []);
      expect(result.error?.type).to.equal(
        MetadataServiceErrorType.itemNotFound,
      );
    }
    expect(called).to.equal(false);
  });

  it('does not send a scope param on writes', async () => {
    let requestUrl = '';
    window.fetch = async (input: RequestInfo | URL): Promise<Response> => {
      requestUrl = String(input);
      return new Response('{ "success": true }');
    };

    const backend = new DefaultMetadataBackend({ scope: 'other' });
    await backend.writeMetadata('foo', 'metadata', []);

    expect(requestUrl).to.equal('https://archive.org/metadata/foo');
  });
});
