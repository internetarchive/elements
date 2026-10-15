import { MetadataRawValue } from '../metadata-field';
import { EnumField, EnumParser } from './enum';

/** Allowed values for the `mediatype` item metadata field. */
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

const mediaTypeParser = new EnumParser<MediaType>([
  'account',
  'audio',
  'collection',
  'data',
  'etree',
  'image',
  'movies',
  'search',
  'software',
  'texts',
  'web',
]);

/**
 * A field whose value is restricted to the allowed `mediatype` values.
 *
 * Backed by an {@link EnumParser}, so a raw value outside the allowed set is
 * rejected: `value` is `undefined` while `rawValue` keeps the original input.
 */
export class MediaTypeField extends EnumField<MediaType> {
  constructor(rawValue: MetadataRawValue) {
    super(rawValue, mediaTypeParser);
  }
}
