import { StringParser } from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class StringField extends MetadataField<string, StringParser> {
  constructor(rawValue: MetadataRawValue) {
    super(StringParser.shared, rawValue);
  }
}
