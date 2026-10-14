import { MetadataRawValue } from './metadata-fields/metadata-field';

/**
 * Returns `make(value)` for the first of `keys` whose raw value is present in
 * `raw`, or `undefined` if none are set. `make` runs only on a present value,
 * so it never sees `null`/`undefined`. Later keys act as fallbacks, for values
 * that arrive under more than one name.
 *
 * @param raw The raw record to read from
 * @param make Builds the result from a present raw value
 * @param keys The key(s) to read, in priority order
 */
export function mapField<T>(
  raw: Readonly<Record<string, unknown>>,
  make: (value: MetadataRawValue) => T | undefined,
  ...keys: string[]
): T | undefined {
  for (const key of keys) {
    const value = raw[key];
    if (value != null) return make(value as MetadataRawValue);
  }
  return undefined;
}
