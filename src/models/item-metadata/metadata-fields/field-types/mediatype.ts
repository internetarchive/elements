import { MediaType, MediaTypeParser } from '@src/parsers/field-types/mediatype';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class MediaTypeField extends MetadataField<MediaType, MediaTypeParser> {
  constructor(rawValue: MetadataRawValue) {
    super(MediaTypeParser.shared, rawValue);
  }
}
