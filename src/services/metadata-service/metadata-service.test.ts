/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from 'vitest';

import type { Result } from '@src/types/result';

import { MetadataBackendInterface } from './backend/metadata-backend-interface';
import { MetadataService } from './metadata-service';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
import { MetadataResponse } from './responses/metadata-response';

function generateMockMetadataResponse(identifier: string): any {
  return {
    created: 1586477049,
    d1: 'ia600201.us.archive.org',
    d2: 'ia800201.us.archive.org',
    dir: '/foo',
    files: [],
    files_count: 0,
    item_last_updated: 1463797130,
    item_size: 0,
    metadata: { identifier, mediatype: 'movies' },
    server: 'ia800201.us.archive.org',
    uniq: 162444403,
    workable_servers: ['ia800201.us.archive.org'],
  };
}

describe('MetadataService', () => {
  test('can request metadata when requested', async () => {
    class MockMetadataBackend implements MetadataBackendInterface {
      async fetchMetadata(
        identifier: string,
      ): Promise<Result<MetadataResponse, MetadataServiceError>> {
        return { success: generateMockMetadataResponse(identifier) };
      }
    }

    const backend = new MockMetadataBackend();
    const service = new MetadataService(backend);
    const result = await service.fetchMetadata('foo');
    expect(result.success?.metadata.identifier).toBe('foo');
  });

  describe('requestMetadataValue', () => {
    class MockMetadataBackend implements MetadataBackendInterface {
      response: any;
      async fetchMetadata(
        identifier: string,
        keypath?: string,
      ): Promise<Result<any, MetadataServiceError>> {
        return {
          success: {
            result: this.response,
          },
        };
      }
    }

    test('can request a metadata value', async () => {
      const backend = new MockMetadataBackend();
      const service = new MetadataService(backend);

      let expectedResult: any = 'foo';
      backend.response = expectedResult;

      let result = await service.fetchMetadataValue<typeof expectedResult>(
        'foo',
        'metadata',
      );
      expect(result.success).toBe(expectedResult);

      expectedResult = { foo: 'bar' };
      backend.response = expectedResult;

      result = await service.fetchMetadataValue<typeof expectedResult>(
        'foo',
        'metadata',
      );
      expect(result.success).toBe(expectedResult);
      expect(result.success.foo).toBe('bar');
    });
  });

  test('returns an error result if the item is not found', async () => {
    class MockSearchBackend implements MetadataBackendInterface {
      async fetchMetadata(
        identifier: string,
      ): Promise<Result<MetadataResponse, MetadataServiceError>> {
        return { success: {} as any };
      }
    }

    const backend = new MockSearchBackend();
    const service = new MetadataService(backend);
    const result = await service.fetchMetadata('foo');
    expect(result.error).toBeDefined();
    expect(result.error?.type).toBe(MetadataServiceErrorType.itemNotFound);

    const valueResult = await service.fetchMetadataValue('foo', 'metadata');
    expect(valueResult.error).toBeDefined();
    expect(valueResult.error?.type).toBe(MetadataServiceErrorType.itemNotFound);
  });

  test('returns the network error if one occurs', async () => {
    class MockSearchBackend implements MetadataBackendInterface {
      async fetchMetadata(
        identifier: string,
      ): Promise<Result<MetadataResponse, MetadataServiceError>> {
        const error = new MetadataServiceError(
          MetadataServiceErrorType.networkError,
          'network error',
        );
        return { error };
      }
    }

    const backend = new MockSearchBackend();
    const service = new MetadataService(backend);
    const metadataResult = await service.fetchMetadata('foo');
    expect(metadataResult.error).toBeDefined();
    expect(metadataResult.error?.type).toBe(
      MetadataServiceErrorType.networkError,
    );
    expect(metadataResult.error?.message).toBe('network error');

    const metadataValueResult = await service.fetchMetadataValue('foo', 'bar');
    expect(metadataValueResult.error).toBeDefined();
    expect(metadataValueResult.error?.type).toBe(
      MetadataServiceErrorType.networkError,
    );
    expect(metadataValueResult.error?.message).toBe('network error');
  });

  test('returns a decoding error if one occurs', async () => {
    class MockSearchBackend implements MetadataBackendInterface {
      async fetchMetadata(
        identifier: string,
      ): Promise<Result<MetadataResponse, MetadataServiceError>> {
        const error = new MetadataServiceError(
          MetadataServiceErrorType.decodingError,
          'decoding error',
        );
        return { error };
      }
    }

    const backend = new MockSearchBackend();
    const service = new MetadataService(backend);
    const metadataResult = await service.fetchMetadata('foo');
    expect(metadataResult.error).toBeDefined();
    expect(metadataResult.error?.type).toBe(
      MetadataServiceErrorType.decodingError,
    );
    expect(metadataResult.error?.message).toBe('decoding error');
  });
});
