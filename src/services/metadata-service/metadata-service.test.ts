/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';

import { Result } from '../result-type/result-type';
import { MetadataBackendInterface } from './backend/metadata-backend-interface';
import { MetadataService } from './metadata-service';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
import { MetadataResponse } from './responses/metadata-response';
import { MockResponseGenerator } from './mock-response-generator.test-helper';

describe('MetadataService', () => {
  it('can request metadata when requested', async () => {
    class MockMetadataBackend implements MetadataBackendInterface {
      async fetchMetadata(
        identifier: string,
      ): Promise<Result<MetadataResponse, MetadataServiceError>> {
        const responseGenerator = new MockResponseGenerator();
        const mockResponse =
          responseGenerator.generateMockMetadataResponse(identifier);
        return { success: mockResponse };
      }
    }

    const backend = new MockMetadataBackend();
    const service = new MetadataService(backend);
    const result = await service.fetchMetadata('foo');
    expect(result.success?.metadata.identifier).to.equal('foo');
  });

  describe('requestMetadataValue', async () => {
    class MockMetadataBackend implements MetadataBackendInterface {
      response: any;
      async fetchMetadata(
        _identifier: string,
        _keypath?: string,
      ): Promise<Result<any, MetadataServiceError>> {
        return {
          success: {
            result: this.response,
          },
        };
      }
    }

    it('can request a metadata value', async () => {
      const backend = new MockMetadataBackend();
      const service = new MetadataService(backend);

      let expectedResult: any = 'foo';
      backend.response = expectedResult;

      let result = await service.fetchMetadataValue<typeof expectedResult>(
        'foo',
        'metadata',
      );
      expect(result.success).to.equal(expectedResult);

      expectedResult = { foo: 'bar' };
      backend.response = expectedResult;

      result = await service.fetchMetadataValue<typeof expectedResult>(
        'foo',
        'metadata',
      );
      expect(result.success).to.equal(expectedResult);
      expect(result.success.foo).to.equal('bar');
    });
  });

  it('returns an error result if the item is not found', async () => {
    class MockSearchBackend implements MetadataBackendInterface {
      async fetchMetadata(
        _identifier: string,
      ): Promise<Result<MetadataResponse, MetadataServiceError>> {
        // this is unfortunate.. instead of getting an http 404 error,
        // we get an empty JSON object when an item is not found
        return { success: {} as any };
      }
    }

    const backend = new MockSearchBackend();
    const service = new MetadataService(backend);
    const result = await service.fetchMetadata('foo');
    expect(result.error).to.not.equal(undefined);
    expect(result.error?.type).to.equal(MetadataServiceErrorType.itemNotFound);

    const valueResult = await service.fetchMetadataValue('foo', 'metadata');
    expect(valueResult.error).to.not.equal(undefined);
    expect(valueResult.error?.type).to.equal(
      MetadataServiceErrorType.itemNotFound,
    );
  });

  it('returns the network error if one occurs', async () => {
    class MockSearchBackend implements MetadataBackendInterface {
      async fetchMetadata(
        _identifier: string,
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
    expect(metadataResult.error).to.not.equal(undefined);
    expect(metadataResult.error?.type).to.equal(
      MetadataServiceErrorType.networkError,
    );
    expect(metadataResult.error?.message).to.equal('network error');

    const metadataValueResult = await service.fetchMetadataValue('foo', 'bar');
    expect(metadataValueResult.error).to.not.equal(undefined);
    expect(metadataValueResult.error?.type).to.equal(
      MetadataServiceErrorType.networkError,
    );
    expect(metadataValueResult.error?.message).to.equal('network error');
  });

  it('returns a decoding error if one occurs', async () => {
    class MockSearchBackend implements MetadataBackendInterface {
      async fetchMetadata(
        _identifier: string,
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
    expect(metadataResult.error).to.not.equal(undefined);
    expect(metadataResult.error?.type).to.equal(
      MetadataServiceErrorType.decodingError,
    );
    expect(metadataResult.error?.message).to.equal('decoding error');
  });
});
