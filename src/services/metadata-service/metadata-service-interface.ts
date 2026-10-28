import type { Result } from '../result-type/result-type';
import type { MetadataServiceError } from './metadata-service-error';
import type { MetadataResponse } from './responses/metadata-response';
import type {
  MetadataFieldValue,
  MetadataPatchOperation,
} from './metadata-patch';

export type MetadataWriteResult = {
  /** Whether a write was sent. False when the field already had the value. */
  changed: boolean;
  /** The catalog task that will apply the change to the item */
  taskId?: number;
};

export interface MetadataServiceInterface {
  /**
   * Fetch metadata for a given identifier
   *
   * @param {string} identifier
   * @returns {Promise<Result<MetadataResponse, MetadataServiceError>>}
   */
  fetchMetadata(
    identifier: string,
  ): Promise<Result<MetadataResponse, MetadataServiceError>>;

  /**
   * Fetch the metadata value for a given identifier and keypath
   *
   * The response from this request can take any form, object, array, string, etc.
   * depending on the query. You can provide return typing in the response by
   * specifying the type. Note, there is no automatic type conversion since it can be anything.
   *
   * For example:
   *
   * ```ts
   * const collection = await searchService.fetchMetadataValue<string>('goody', 'metadata/collection/0');
   * console.debug('collection:', collection); => 'Goody Collection'
   *
   * const files_count = await searchService.fetchMetadataValue<number>('goody', 'files_count');
   * console.debug('files_count:', files_count); => 12
   * ```
   *
   * Keypath examples:
   *
   * /metadata/:identifier/metadata // returns the entire metadata object
   * /metadata/:identifier/server // returns the server for the given identifier
   * /metadata/:identifier/files_count
   * /metadata/:identifier/files?start=1&count=2 // query for files
   * /metadata/:identifier/metadata/collection // all collections
   * /metadata/:identifier/metadata/collection/0 // first collection
   * /metadata/:identifier/metadata/title
   * /metadata/:identifier/files/0/name // first file name
   *
   * @param identifier
   * @param keypath
   */
  fetchMetadataValue<T>(
    identifier: string,
    keypath: string,
  ): Promise<Result<T, MetadataServiceError>>;
}

/**
 * A metadata service that can also write. Kept separate from
 * `MetadataServiceInterface` so read-only implementations and mocks don't have
 * to provide the write methods.
 */
export interface MetadataWritableServiceInterface
  extends MetadataServiceInterface {
  /**
   * Apply a JSON Patch to an item's metadata as the logged-in user.
   *
   * MDAPI applies the change through a queued catalog task. MDAPI reads
   * replay pending tasks' patches ("lookahead"), so they show the change right
   * away, but caches built on MDAPI (search, page services) can lag it. MDAPI
   * rejects a patch that doesn't change the item.
   *
   * ```ts
   * await metadataService.patchMetadata('goody', [
   *   { op: 'replace', path: '/title', value: 'Goody Two-Shoes' },
   * ]);
   * ```
   *
   * @param identifier
   * @param patch JSON Patch operations against the item's metadata
   * @param target MDAPI write target, `metadata` by default
   */
  patchMetadata(
    identifier: string,
    patch: MetadataPatchOperation[],
    target?: string,
  ): Promise<Result<MetadataWriteResult, MetadataServiceError>>;

  /**
   * Set one metadata field on an item as the logged-in user. An empty string
   * or list removes the field.
   *
   * Reads the item's current metadata from MDAPI first and patches against
   * that, so the right add / replace / remove goes out even when the caller's
   * copy is stale. That read includes this user's still-queued writes through
   * MDAPI's lookahead, except for tasks lookahead skips (e.g. ones held for an
   * admin). Resolves with `changed: false`, without writing, when the field
   * already has the value.
   *
   * @param identifier
   * @param field The metadata key, e.g. `title`
   * @param value
   */
  updateMetadataField(
    identifier: string,
    field: string,
    value: MetadataFieldValue,
  ): Promise<Result<MetadataWriteResult, MetadataServiceError>>;
}
