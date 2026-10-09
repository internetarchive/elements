import { Memoize } from 'typescript-memoize';
import {
  BooleanParser,
  Byte,
  ByteParser,
  Duration,
  DurationParser,
  NumberParser,
} from '../../field-parsers/field-parsers';
import { parseField } from './parse-field';

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
    return parseField(
      this.rawValue,
      (v) => ByteParser.shared.parseValue(v),
      'size',
    );
  }

  get title(): string | undefined {
    return this.rawValue.title;
  }

  @Memoize() get length(): Duration | undefined {
    return parseField(
      this.rawValue,
      (v) => DurationParser.shared.parseValue(v),
      'length',
    );
  }

  @Memoize() get height(): number | undefined {
    return parseField(
      this.rawValue,
      (v) => NumberParser.shared.parseValue(v),
      'height',
    );
  }

  @Memoize() get width(): number | undefined {
    return parseField(
      this.rawValue,
      (v) => NumberParser.shared.parseValue(v),
      'width',
    );
  }

  @Memoize() get track(): number | undefined {
    return parseField(
      this.rawValue,
      (v) => NumberParser.shared.parseValue(v),
      'track',
    );
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

  @Memoize() get bitrate(): number | undefined {
    return parseField(
      this.rawValue,
      (v) => NumberParser.shared.parseValue(v),
      'bitrate',
    );
  }

  @Memoize() get private(): boolean | undefined {
    return parseField(
      this.rawValue,
      (v) => BooleanParser.shared.parseValue(v),
      'private',
    );
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(json: Record<string, any> = {}) {
    this.rawValue = json;
  }
}
