export type FieldParserRawValue = string | number | boolean;

export interface FieldParserInterface<T> {
  /**
   * Parse the raw value and return a value of type T or undefined if unparseable
   *
   * @param rawValue T | undefined
   */
  parseValue(rawValue: FieldParserRawValue): T | undefined;
}
