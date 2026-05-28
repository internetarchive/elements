import { Duration, DurationParser } from '@src/parsers/field-types/duration';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * The DurationField parses different duration formats
 * and returns a `Duration`, which is a number in seconds
 * with decimals.
 *
 * @export
 * @class DurationField
 * @extends {MetadataField<Duration, DurationParser>}
 */
export class DurationField extends MetadataField<Duration, DurationParser> {
  constructor(rawValue: MetadataRawValue) {
    super(DurationParser.shared, rawValue);
  }
}
