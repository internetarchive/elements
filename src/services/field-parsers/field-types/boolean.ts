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
    if (typeof rawValue === 'string') {
      // recognize the common textual encodings, case- and whitespace-insensitive
      const normalized = rawValue.trim().toLowerCase();
      if (normalized === 'false' || normalized === '0' || normalized === 'no') {
        return false;
      }
      if (normalized === 'true' || normalized === '1' || normalized === 'yes') {
        return true;
      }
    }
    return Boolean(rawValue);
  }
}
