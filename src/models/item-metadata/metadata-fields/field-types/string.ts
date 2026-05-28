import { StringParser } from '@src/parsers/field-types/string';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class StringField extends MetadataField<string, StringParser> {
  constructor(rawValue: MetadataRawValue) {
    super(StringParser.shared, rawValue);
  }
}
