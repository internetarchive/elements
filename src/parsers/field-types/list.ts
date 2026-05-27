import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class ListParser<T> implements FieldParserInterface<T[]> {
  private parser: FieldParserInterface<T>;

  private separators = [';', ',', '.'];

  constructor(
    parser: FieldParserInterface<T>,
    options?: {
      separators?: string[];
    },
  ) {
    this.parser = parser;
    if (options && options.separators) {
      this.separators = options.separators;
    }
  }

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): T[] {
    const stringifiedValue = String(rawValue);
    let results: string[] = [];

    for (const separator of this.separators) {
      results = stringifiedValue.split(separator);
      if (results.length > 1) break;
    }

    return this.parseListValues(results);
  }

  private parseListValues(rawValues: string[]): T[] {
    const trimmed = rawValues.map(s => s.trim());
    const parsed = trimmed.map(rawValue => this.parser.parseValue(rawValue));
    const result: T[] = [];
    parsed.forEach(p => {
      if (p !== undefined) result.push(p);
    });
    return result;
  }
}
