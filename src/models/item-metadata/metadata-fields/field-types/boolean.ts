import { BooleanParser } from '@src/parsers/field-types/boolean';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class BooleanField extends MetadataField<boolean, BooleanParser> {
  constructor(rawValue: MetadataRawValue) {
    super(BooleanParser.shared, rawValue);
  }
}
