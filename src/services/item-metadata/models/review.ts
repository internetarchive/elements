import { Memoize } from 'typescript-memoize';
import { DateParser, NumberParser } from '../../field-parsers/field-parsers';
import { parseField } from './parse-field';

export class Review {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  readonly rawValue: Readonly<Record<string, any>>;

  get reviewbody(): string | undefined {
    return this.rawValue.reviewbody;
  }

  get reviewtitle(): string | undefined {
    return this.rawValue.reviewtitle;
  }

  get reviewer(): string | undefined {
    return this.rawValue.reviewer;
  }

  get reviewer_itemname(): string | undefined {
    return this.rawValue.reviewer_itemname;
  }

  @Memoize() get reviewdate(): Date | undefined {
    return parseField(
      this.rawValue,
      (v) => DateParser.shared.parseValue(v),
      'reviewdate',
    );
  }

  @Memoize() get createdate(): Date | undefined {
    return parseField(
      this.rawValue,
      (v) => DateParser.shared.parseValue(v),
      'createdate',
    );
  }

  @Memoize() get stars(): number | undefined {
    return parseField(
      this.rawValue,
      (v) => NumberParser.shared.parseValue(v),
      'stars',
    );
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(json: Record<string, any> = {}) {
    this.rawValue = json;
  }
}
