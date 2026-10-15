import type {
  FieldParserInterface,
  FieldParserRawValue,
} from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * A parsed broadcast tuner setting, e.g. `"Channel 93 (639 MHz)"` becomes
 * `{ channel: 93, frequencyMhz: 639 }`.
 */
export type Tuner = {
  /** The channel number, e.g. `93` in `"Channel 93 (639 MHz)"`. */
  readonly channel: number;
  /** The center frequency in MHz, when present, e.g. `639`. */
  readonly frequencyMhz?: number;
};

/**
 * Parses a tuner string of the form `Channel <n>` with an optional
 * `(<freq> MHz)` suffix. Values without a recognizable channel are rejected
 * (returns `undefined`).
 *
 * @class TunerParser
 */
export class TunerParser implements FieldParserInterface<Tuner> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new TunerParser();

  parseValue(rawValue: FieldParserRawValue): Tuner | undefined {
    if (typeof rawValue !== 'string') return undefined;
    const match = rawValue.match(
      /Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i,
    );
    if (!match) return undefined;
    return {
      channel: parseInt(match[1], 10),
      frequencyMhz: match[2] ? parseFloat(match[2]) : undefined,
    };
  }
}

/**
 * A field whose value is a parsed {@link Tuner}.
 *
 * @class TunerField
 */
export class TunerField extends MetadataField<Tuner, TunerParser> {
  constructor(rawValue: MetadataRawValue) {
    super(TunerParser.shared, rawValue);
  }
}
