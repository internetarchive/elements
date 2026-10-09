import type {
  FieldParserInterface,
  FieldParserRawValue,
} from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * A parsed display aspect ratio, e.g. `"16:9"` becomes
 * `{ width: 16, height: 9, decimal: 1.777… }`.
 */
export type AspectRatio = {
  /** The ratio's antecedent, e.g. `16` in `"16:9"`. */
  readonly width: number;
  /** The ratio's consequent, e.g. `9` in `"16:9"`. */
  readonly height: number;
  /** The ratio as a decimal (`width / height`), e.g. `1.777…` for `"16:9"`. */
  readonly decimal: number;
};

/**
 * Parses an aspect ratio expressed as two numbers separated by `:`, `/`, or `x`
 * (e.g. `"4:3"`, `"16/9"`, `"16x9"`). Any value that does not match this grammar,
 * or that has a zero height, is rejected (returns `undefined`).
 *
 * @class AspectRatioParser
 */
export class AspectRatioParser implements FieldParserInterface<AspectRatio> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new AspectRatioParser();

  parseValue(rawValue: FieldParserRawValue): AspectRatio | undefined {
    if (typeof rawValue !== 'string') return undefined;
    const match = rawValue.match(
      /^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i,
    );
    if (!match) return undefined;
    const width = parseFloat(match[1]);
    const height = parseFloat(match[2]);
    if (!height) return undefined; // guard against divide-by-zero
    return { width, height, decimal: width / height };
  }
}

/**
 * A field whose value is a parsed {@link AspectRatio}.
 *
 * @class AspectRatioField
 */
export class AspectRatioField extends MetadataField<
  AspectRatio,
  AspectRatioParser
> {
  constructor(rawValue: MetadataRawValue) {
    super(AspectRatioParser.shared, rawValue);
  }
}
