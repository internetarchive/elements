import type { Result } from '@src/types/result';
import { DefaultMetadataBackend } from './backend/default-metadata-backend';
import { MetadataBackendInterface } from './backend/metadata-backend-interface';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
import type { MetadataServiceInterface } from './metadata-service-interface';
import { MetadataResponse } from './responses/metadata-response';

/**
 * The Metadata Service is responsible for taking the raw response provided by
 * the backend and modeling it as a `MetadataResponse` object.
 */
export class MetadataService implements MetadataServiceInterface {
  public static default: MetadataServiceInterface = new MetadataService(
    new DefaultMetadataBackend(),
  );

  private backend: MetadataBackendInterface;

  constructor(backend: MetadataBackendInterface) {
    this.backend = backend;
  }

  /** @inheritdoc */
  async fetchMetadata(
    identifier: string,
  ): Promise<Result<MetadataResponse, MetadataServiceError>> {
    const rawResponse = await this.backend.fetchMetadata(identifier);
    if (rawResponse.error) {
      return rawResponse;
    }

    if (rawResponse.success?.metadata === undefined) {
      return {
        error: new MetadataServiceError(MetadataServiceErrorType.itemNotFound),
      };
    }

    const modeledResponse = new MetadataResponse(rawResponse.success);
    return { success: modeledResponse };
  }

  /** @inheritdoc */
  async fetchMetadataValue<T>(
    identifier: string,
    keypath: string,
  ): Promise<Result<T, MetadataServiceError>> {
    const result = await this.backend.fetchMetadata(identifier, keypath);
    if (result.error) {
      return result;
    }

    if (result.success?.result === undefined) {
      return {
        error: new MetadataServiceError(MetadataServiceErrorType.itemNotFound),
      };
    }

    return { success: result.success.result };
  }
}
