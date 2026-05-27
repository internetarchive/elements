import { Byte, ByteParser } from '@src/parsers/field-types/byte';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * ByteField is a unit-specific number field that
 * returns a value in bytes
 *
 * @export
 * @class ByteField
 * @extends {MetadataField<Byte, ByteParser>}
 */
export class ByteField extends MetadataField<Byte, ByteParser> {
  constructor(rawValue: MetadataRawValue) {
    super(ByteParser.shared, rawValue);
  }
}
