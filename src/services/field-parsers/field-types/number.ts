import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class NumberParser implements FieldParserInterface<number> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new NumberParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): number | undefined {
    if (typeof rawValue === 'number') return rawValue;
    if (typeof rawValue === 'boolean') return undefined;

    const value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
      return undefined;
    }
    return value;
  }
}
