import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class BooleanParser implements FieldParserInterface<boolean> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new BooleanParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): boolean {
    if (
      typeof rawValue === 'string' &&
      (rawValue === 'false' || rawValue === '0')
    ) {
      return false;
    }
    return Boolean(rawValue);
  }
}
