import type { Result } from '../result-type/result-type';
import { DefaultMetadataBackend } from './backend/default-metadata-backend';
import { MetadataBackendInterface } from './backend/metadata-backend-interface';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
import type {
  MetadataServiceInterface,
  MetadataWritableServiceInterface,
  MetadataWriteResult,
} from './metadata-service-interface';
import {
  buildMetadataFieldPatch,
  type MetadataFieldValue,
  type MetadataPatchOperation,
} from './metadata-patch';
import { MetadataResponse } from './responses/metadata-response';

/**
 * The Metadata Service is responsible for taking the raw response provided by
 * the backend and modeling it as a `MetadataResponse` object.
 */
export class MetadataService implements MetadataWritableServiceInterface {
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

  /** @inheritdoc */
  async patchMetadata(
    identifier: string,
    patch: MetadataPatchOperation[],
    target = 'metadata',
  ): Promise<Result<MetadataWriteResult, MetadataServiceError>> {
    if (!this.backend.writeMetadata) {
      return {
        error: new MetadataServiceError(
          MetadataServiceErrorType.writeNotSupported,
          'This metadata backend does not support writes',
        ),
      };
    }

    const result = await this.backend.writeMetadata(identifier, target, patch);
    if (result.error) {
      return result;
    }

    return { success: { changed: true, taskId: result.success?.task_id } };
  }

  /** @inheritdoc */
  async updateMetadataField(
    identifier: string,
    field: string,
    value: MetadataFieldValue,
  ): Promise<Result<MetadataWriteResult, MetadataServiceError>> {
    const current = await this.fetchMetadataValue<
      Record<string, MetadataFieldValue>
    >(identifier, 'metadata');
    if (current.error) {
      return { error: current.error };
    }

    const patch = buildMetadataFieldPatch(
      field,
      value,
      current.success?.[field],
    );
    if (patch.length === 0) {
      return { success: { changed: false } };
    }

    return this.patchMetadata(identifier, patch);
  }
}
