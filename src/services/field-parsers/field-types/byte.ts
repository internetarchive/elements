import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';
import { NumberParser } from './number';

/**
 * A Byte is a unit-specific `number`, in bytes.
 */
export type Byte = number;

/**
 * The ByteParser is a unit-specific NumberParser
 * that returns a value in bytes
 *
 * @export
 * @class ByteParser
 * @implements {FieldParserInterface<Byte>}
 */
export class ByteParser implements FieldParserInterface<Byte> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new ByteParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Byte | undefined {
    const parser = NumberParser.shared;
    return parser.parseValue(rawValue);
  }
}
