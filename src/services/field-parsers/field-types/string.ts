import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class StringParser implements FieldParserInterface<string> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new StringParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): string {
    return String(rawValue);
  }
}
