import { DateParser } from '@src/parsers/field-types/date';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class DateField extends MetadataField<Date, DateParser> {
  constructor(rawValue: MetadataRawValue) {
    super(DateParser.shared, rawValue);
  }
}
