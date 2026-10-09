import type {
  FieldParserInterface,
  FieldParserRawValue,
} from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * Parses a raw value against a fixed set of allowed string literals.
 *
 * Unlike the plain `StringParser`, this validates at runtime: any value not in
 * the `allowed` set is rejected (returns `undefined`), so the parsed `value` and
 * the field's TypeScript type stay in agreement.
 *
 * @class EnumParser
 * @template T The union of allowed string literals (e.g. `'rl' | 'lr'`)
 */
export class EnumParser<T extends string> implements FieldParserInterface<T> {
  private readonly allowed: readonly T[];

  constructor(allowed: readonly T[]) {
    this.allowed = allowed;
  }

  parseValue(rawValue: FieldParserRawValue): T | undefined {
    return typeof rawValue === 'string' &&
      (this.allowed as readonly string[]).includes(rawValue)
      ? (rawValue as T)
      : undefined;
  }
}

/**
 * A field whose value is restricted to a fixed set of allowed string literals.
 *
 * Pass a (typically module-level, shared) `EnumParser` so the allowed set is
 * defined once:
 *
 * ```
 * const colorParser = new EnumParser<'red' | 'green' | 'blue'>(['red', 'green', 'blue']);
 * const field = new EnumField('green', colorParser);
 * field.value // 'green'  (typed as 'red' | 'green' | 'blue' | undefined)
 * ```
 *
 * @class EnumField
 * @template T The union of allowed string literals
 */
export class EnumField<T extends string> extends MetadataField<
  T,
  EnumParser<T>
> {
  constructor(rawValue: MetadataRawValue, parser: EnumParser<T>) {
    super(parser, rawValue);
  }
}
