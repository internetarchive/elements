/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Result } from '../../result-type/result-type';
import { MetadataServiceError } from '../metadata-service-error';
import type { MetadataPatchOperation } from '../metadata-patch';

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

  /**
   * Apply a JSON Patch to one of an item's targets (e.g. `metadata`) through
   * the MDAPI write endpoint, as the logged-in user. Resolves with MDAPI's raw
   * response (`{ success, task_id, log }`) on success.
   *
   * Optional so backends written before writes existed keep compiling; the
   * service reports `writeNotSupported` for a backend without it.
   *
   * @param identifier
   * @param target
   * @param patch
   */
  writeMetadata?(
    identifier: string,
    target: string,
    patch: MetadataPatchOperation[],
  ): Promise<Result<any, MetadataServiceError>>;
}
