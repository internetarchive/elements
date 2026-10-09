import { DateParser } from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class DateField extends MetadataField<Date, DateParser> {
  constructor(rawValue: MetadataRawValue) {
    super(DateParser.shared, rawValue);
  }
}
