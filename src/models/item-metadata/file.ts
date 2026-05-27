import { Memoize } from 'typescript-memoize';

import { Byte, ByteParser } from '@src/parsers/field-types/byte';
import { Duration, DurationParser } from '@src/parsers/field-types/duration';
import { NumberParser } from '@src/parsers/field-types/number';

/**
 * This represents an Internet Archive File
 *
 * @export
 * @class File
 */
export class File {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  readonly rawValue: Readonly<Record<string, any>>;

  get name(): string {
    return this.rawValue.name;
  }

  get source(): string {
    return this.rawValue.source;
  }

  get btih(): string {
    return this.rawValue.btih;
  }

  get md5(): string {
    return this.rawValue.md5;
  }

  get format(): string {
    return this.rawValue.format;
  }

  @Memoize() get mtime(): Date | undefined {
    if (this.rawValue.mtime == null) {
      return undefined;
    }
    const numberValue = NumberParser.shared.parseValue(this.rawValue.mtime);
    if (numberValue) {
      return new Date(numberValue * 1000);
    }
  }

  get crc32(): string {
    return this.rawValue.crc32;
  }

  get sha1(): string {
    return this.rawValue.sha1;
  }

  get original(): string | undefined {
    return this.rawValue.original;
  }

  @Memoize() get size(): Byte | undefined {
    return this.rawValue.size != null
      ? ByteParser.shared.parseValue(this.rawValue.size)
      : undefined;
  }

  get title(): string | undefined {
    return this.rawValue.title;
  }

  @Memoize() get length(): Duration | undefined {
    return this.rawValue.length != null
      ? DurationParser.shared.parseValue(this.rawValue.length)
      : undefined;
  }

  @Memoize() get height(): number | undefined {
    return this.rawValue.height != null
      ? NumberParser.shared.parseValue(this.rawValue.height)
      : undefined;
  }

  @Memoize() get width(): number | undefined {
    return this.rawValue.width != null
      ? NumberParser.shared.parseValue(this.rawValue.width)
      : undefined;
  }

  @Memoize() get track(): number | undefined {
    return this.rawValue.track != null
      ? NumberParser.shared.parseValue(this.rawValue.track)
      : undefined;
  }

  get external_identifier(): string | string[] | undefined {
    return this.rawValue.external_identifier;
  }

  get creator(): string | undefined {
    return this.rawValue.creator;
  }

  get album(): string | undefined {
    return this.rawValue.album;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(json: Record<string, any> = {}) {
    this.rawValue = json;
  }
}
