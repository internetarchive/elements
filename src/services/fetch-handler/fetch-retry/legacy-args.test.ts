import { describe, expect, it } from 'vitest';
import { legacyArgsAsFetchOptions } from './legacy-args';
import type { FetchOptions } from '../fetch-options';
import { MockRetryConfig } from '../test-helpers/mock-retry-config.test-helper';

describe('legacyArgsAsFetchOptions', () => {
  it('wraps RequestInit into FetchOptions', () => {
    const init: RequestInit = { method: 'PUT' };
    const fo = legacyArgsAsFetchOptions(init);
    expect(fo).to.deep.equal({ requestInit: init });
  });

  it('returns FetchOptions unchanged', () => {
    const retryConfig = new MockRetryConfig();
    const options: FetchOptions = {
      requestInit: { headers: { foo: 'bar' } },
      retryConfig: retryConfig,
    };
    const fo = legacyArgsAsFetchOptions(options);
    expect(fo).to.equal(options);
  });

  it('returns undefined when no options provided', () => {
    const fo = legacyArgsAsFetchOptions(undefined);
    expect(fo).to.equal(undefined);
  });

  it('recognizes FetchOptions by includeCsrfToken alone', () => {
    const options: FetchOptions = { includeCsrfToken: true };
    const fo = legacyArgsAsFetchOptions(options);
    expect(fo).to.equal(options);
  });
});
