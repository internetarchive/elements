import type { Metadata } from './metadata';
import type { MetadataFieldInterface } from './metadata-fields/metadata-field';

/**
 * The names of `Metadata`'s fields, i.e. the members whose value is a
 * `MetadataField`.
 *
 * Derived from `Metadata` rather than listed, so a field added there is
 * available here with no matching change. Members that aren't fields are
 * excluded, so `identifier` (a plain string) and `rawMetadata` (a plain
 * record) are rejected.
 *
 * Useful for anything that takes a field name and wants the corresponding
 * field type, since `Metadata[K]` then resolves to the field class:
 *
 * ```ts
 * function read<K extends MetadataFieldKey>(m: Metadata, key: K): Metadata[K] {
 *   return m[key];
 * }
 * read(metadata, 'collection'); // StringField | undefined
 * read(metadata, 'addeddate'); // DateField | undefined
 * ```
 */
export type MetadataFieldKey = {
  [K in keyof Metadata]-?: NonNullable<
    Metadata[K]
  > extends MetadataFieldInterface<unknown>
    ? K
    : never;
}[keyof Metadata];
