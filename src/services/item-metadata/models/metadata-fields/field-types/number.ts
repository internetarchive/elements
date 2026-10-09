import { NumberParser } from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class NumberField extends MetadataField<number, NumberParser> {
  constructor(rawValue: MetadataRawValue) {
    super(NumberParser.shared, rawValue);
  }
}
