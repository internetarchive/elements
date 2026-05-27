import {
  PageProgression,
  PageProgressionParser,
} from '@src/parsers/field-types/page-progression';
import { MetadataField, MetadataRawValue } from '../metadata-field';

export class PageProgressionField extends MetadataField<
  PageProgression,
  PageProgressionParser
> {
  constructor(rawValue: MetadataRawValue) {
    super(PageProgressionParser.shared, rawValue);
  }
}
