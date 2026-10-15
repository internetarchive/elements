import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

/**
 * @deprecated Use the `PageProgression` type from
 * `@internetarchive/iaux-item-metadata`, which is paired with a validating
 * `PageProgressionField`.
 */
export type PageProgression = 'rl' | 'lr';

/**
 * @deprecated Use `PageProgressionField` from
 * `@internetarchive/iaux-item-metadata`, which validates the value against the
 * allowed set instead of casting.
 */
export class PageProgressionParser
  implements FieldParserInterface<PageProgression>
{
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new PageProgressionParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): PageProgression | undefined {
    if (typeof rawValue !== 'string') return undefined;
    return rawValue as PageProgression;
  }
}
