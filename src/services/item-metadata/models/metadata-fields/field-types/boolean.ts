import { BooleanParser } from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class BooleanField extends MetadataField<boolean, BooleanParser> {
  constructor(rawValue: MetadataRawValue) {
    super(BooleanParser.shared, rawValue);
  }
}
