import { Memoize } from 'typescript-memoize';

import { DateParser } from '@src/parsers/field-types/date';
import { NumberParser } from '@src/parsers/field-types/number';

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
    return this.rawValue.reviewdate != null
      ? DateParser.shared.parseValue(this.rawValue.reviewdate)
      : undefined;
  }

  @Memoize() get createdate(): Date | undefined {
    return this.rawValue.createdate != null
      ? DateParser.shared.parseValue(this.rawValue.createdate)
      : undefined;
  }

  @Memoize() get stars(): number | undefined {
    return this.rawValue.stars != null
      ? NumberParser.shared.parseValue(this.rawValue.stars)
      : undefined;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(json: Record<string, any> = {}) {
    this.rawValue = json;
  }
}
