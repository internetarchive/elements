import { FieldParserRawValue } from '../../field-parsers/field-parsers';
import { mapField } from './map-field';

/**
 * Maps the first present of `keys` through a field parser, or returns
 * `undefined` if none are set. A thin wrapper over {@link mapField} for fields
 * whose value is a scalar parsed by a `FieldParser` (as opposed to a value
 * wrapped in a `MetadataField` class).
 *
 * @param raw The raw record to read from
 * @param parse Parses a present raw value (e.g. `v => DateParser.shared.parseValue(v)`)
 * @param keys The key(s) to read, in priority order
 */
export function parseField<T>(
  raw: Readonly<Record<string, unknown>>,
  parse: (value: FieldParserRawValue) => T | undefined,
  ...keys: string[]
): T | undefined {
  return mapField(raw, (value) => parse(value as FieldParserRawValue), ...keys);
}
