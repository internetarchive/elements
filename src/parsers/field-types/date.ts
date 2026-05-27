import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

export class DateParser implements FieldParserInterface<Date> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new DateParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Date | undefined {
    // try different date parsing
    return this.parseJSDate(rawValue) || this.parseBracketDate(rawValue);
  }

  // handles "[yyyy]" format
  private parseBracketDate(rawValue: FieldParserRawValue): Date | undefined {
    if (typeof rawValue !== 'string') return undefined;
    const yearMatch = rawValue.match(/\[([0-9]{4})\]/);
    if (!yearMatch || yearMatch.length < 2) {
      return undefined;
    }
    return this.parseJSDate(yearMatch[1]);
  }

  private parseJSDate(rawValue: FieldParserRawValue): Date | undefined {
    if (typeof rawValue !== 'string') return undefined;
    let parsedValue = rawValue;

    // fix for Safari not supporting `yyyy-mm-dd HH:MM:SS` format, insert a `T` into the space
    if (
      parsedValue.match(
        /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
      )
    ) {
      parsedValue = parsedValue.replace(' ', 'T');
    }

    const parsed = Date.parse(parsedValue);
    if (Number.isNaN(parsed)) {
      return undefined;
    }
    let date = new Date(parsedValue);
    // The `Date(string)` constructor parses some strings as UTC and some in the local timezone.
    // This attempts to detect cases that get parsed as UTC but should be parsed as local.
    // Note that this does _not_ include cases with an explicit time zone specified, which
    // should generally be parsed as-is and not converted to local time.
    const isUTCTimeZoneInferred =
      parsedValue.match(/^[0-9]{4}$/) || // just the year, ie `2020`
      parsedValue.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/); // YYYY-MM-DD format
    if (isUTCTimeZoneInferred) {
      date = new Date(date.getTime() + date.getTimezoneOffset() * 1000 * 60);
    }
    return date;
  }
}
