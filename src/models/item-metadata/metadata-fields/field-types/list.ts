import type { FieldParserInterface } from '@src/parsers/field-parser-interface';
import { ListParser } from '@src/parsers/field-types/list';
import { NumberParser } from '@src/parsers/field-types/number';
import { StringParser } from '@src/parsers/field-types/string';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * The ListField handles parsing of a list of values.
 *
 * Certain fields in the metadata, like `subject` typically have a
 * comma or semicolon-separated list of values. The `ListField`
 * parses the list values independently and aggregates them into
 * the main `.values` array.
 */
export class ListField<
  T,
  FieldParserInterfaceType extends FieldParserInterface<T[]>,
> extends MetadataField<T, FieldParserInterfaceType> {
  constructor(rawValue: MetadataRawValue, parser: FieldParserInterfaceType) {
    super(parser, rawValue);
  }
}

/**
 * The StringListField handles parsing of a list of strings.
 */
export class StringListField extends ListField<string, ListParser<string>> {
  constructor(rawValue: MetadataRawValue) {
    const parser = new ListParser<string>(StringParser.shared);
    super(rawValue, parser);
  }
}

/**
 * The NumberListField handles parsing of a list of numbers.
 */
export class NumberListField extends ListField<number, ListParser<number>> {
  constructor(rawValue: MetadataRawValue) {
    const parser = new ListParser<number>(NumberParser.shared);
    super(rawValue, parser);
  }
}
