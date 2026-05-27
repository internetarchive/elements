import { afterEach, describe, expect, test } from 'vitest';

import { DefaultMetadataBackend } from './default-metadata-backend';
import { MetadataServiceErrorType } from '../metadata-service-error';

describe('DefaultMetadataBackend', () => {
  const fetchBackup = window.fetch;

  afterEach(() => {
    window.fetch = fetchBackup;
  });

  test('can fetch metadata', async () => {
    window.fetch = (): Promise<Response> =>
      Promise.resolve(new Response('{ "foo": "bar" }'));

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.success?.foo).toBe('bar');
  });

  test('returns a networkError if there is a problem fetching using String type', async () => {
    window.fetch = (): Promise<Response> => {
      throw 'network error';
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.error?.type).toBe(MetadataServiceErrorType.networkError);
    expect(result.error?.message).toBe('network error');
  });

  test('returns a networkError if there is a problem fetching using Error type', async () => {
    window.fetch = (): Promise<Response> => {
      throw new Error('network error');
    };

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.error?.type).toBe(MetadataServiceErrorType.networkError);
    expect(result.error?.message).toBe('network error');
  });

  test('returns a decodingError if there is a problem decoding the json', async () => {
    window.fetch = (): Promise<Response> =>
      Promise.resolve(new Response('boop'));

    const backend = new DefaultMetadataBackend();
    const result = await backend.fetchMetadata('foo');
    expect(result.error?.type).toBe(MetadataServiceErrorType.decodingError);
  });

  test('appends the scope if provided', async () => {
    let urlCalled = '';
    window.fetch = (input: RequestInfo | URL): Promise<Response> => {
      urlCalled = input.toString();
      return Promise.resolve(new Response('boop'));
    };

    const backend = new DefaultMetadataBackend({ scope: 'foo' });
    await backend.fetchMetadata('foo');
    expect(urlCalled.includes('scope=foo')).toBe(true);
  });

  test('credentials for metadata endpoint', async () => {
    let urlConfig: RequestInit | undefined;
    window.fetch = (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> => {
      urlConfig = init;
      return Promise.resolve(new Response('boop'));
    };

    const backend = new DefaultMetadataBackend({
      scope: 'foo',
      includeCredentials: true,
    });
    await backend.fetchMetadata('foo');
    expect(urlConfig?.credentials).toBe('include');
  });
});
