import { MetadataRawValue } from '../metadata-field';
import { EnumField, EnumParser } from './enum';

/** Allowed values for the `page_progression` item metadata field. */
export type PageProgression = 'rl' | 'lr';

const pageProgressionParser = new EnumParser<PageProgression>(['rl', 'lr']);

/**
 * A field whose value is restricted to the allowed `page_progression` values.
 *
 * Backed by an {@link EnumParser}, so a raw value outside the allowed set is
 * rejected: `value` is `undefined` while `rawValue` keeps the original input.
 */
export class PageProgressionField extends EnumField<PageProgression> {
  constructor(rawValue: MetadataRawValue) {
    super(rawValue, pageProgressionParser);
  }
}
