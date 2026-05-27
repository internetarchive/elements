/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Result } from '@src/types/result';
import { MetadataServiceError } from '../metadata-service-error';

/**
 * An interface to provide the network layer to the `MetadataService`.
 *
 * Objects implementing this interface are responsible for making calls to the Internet Archive
 * `metadata` endpoint or otherwise providing a similar reponse in JSON format.
 *
 * @export
 * @interface MetadataBackendInterface
 */
export interface MetadataBackendInterface {
  /**
   * Fetch metadata for a single item with an optional keypath
   *
   * @param identifier
   * @param keypath
   */
  fetchMetadata(
    identifier: string,
    keypath?: string,
  ): Promise<Result<any, MetadataServiceError>>;
}
