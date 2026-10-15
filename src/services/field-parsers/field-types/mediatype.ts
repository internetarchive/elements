import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

/**
 * @deprecated Use the `MediaType` type from
 * `@internetarchive/iaux-item-metadata`, which is paired with a validating
 * `MediaTypeField`.
 */
export type MediaType =
  | 'account'
  | 'audio'
  | 'collection'
  | 'data'
  | 'etree'
  | 'image'
  | 'movies'
  | 'search'
  | 'software'
  | 'texts'
  | 'web';

/**
 * @deprecated Use `MediaTypeField` from `@internetarchive/iaux-item-metadata`,
 * which validates the value against the allowed set instead of casting.
 */
export class MediaTypeParser implements FieldParserInterface<MediaType> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new MediaTypeParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): MediaType | undefined {
    if (typeof rawValue !== 'string') return undefined;
    return rawValue as MediaType;
  }
}
