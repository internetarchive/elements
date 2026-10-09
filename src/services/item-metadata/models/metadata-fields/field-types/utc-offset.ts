import type {
  FieldParserInterface,
  FieldParserRawValue,
} from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * A parsed UTC offset. The raw value is encoded as `±HHMM` (e.g. `"-800"` for
 * eight hours behind UTC, `"+0530"` for five and a half hours ahead).
 */
export type UtcOffset = {
  /** The signed hour component, e.g. `-8` for `"-800"`. */
  readonly hours: number;
  /** The minute component in the range `0`–`59`, e.g. `30` for `"+0530"`. */
  readonly minutes: number;
  /**
   * The full offset in signed minutes — the authoritative value for
   * comparisons and arithmetic, e.g. `-480` for `"-800"`, `330` for `"+0530"`.
   */
  readonly totalMinutes: number;
};

/**
 * Parses a `±HHMM` UTC offset (an optional sign, one or two hour digits, and
 * exactly two minute digits, with an optional `:` separator). Values that do
 * not match this grammar are rejected (returns `undefined`).
 *
 * @class UtcOffsetParser
 */
export class UtcOffsetParser implements FieldParserInterface<UtcOffset> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new UtcOffsetParser();

  parseValue(rawValue: FieldParserRawValue): UtcOffset | undefined {
    const match = String(rawValue)
      .trim()
      .match(/^([+-]?)(\d{1,2}):?(\d{2})$/);
    if (!match) return undefined;
    const sign = match[1] === '-' ? -1 : 1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    return {
      hours: sign * hours,
      minutes,
      totalMinutes: sign * (hours * 60 + minutes),
    };
  }
}

/**
 * A field whose value is a parsed {@link UtcOffset}.
 *
 * @class UtcOffsetField
 */
export class UtcOffsetField extends MetadataField<UtcOffset, UtcOffsetParser> {
  constructor(rawValue: MetadataRawValue) {
    super(UtcOffsetParser.shared, rawValue);
  }
}
