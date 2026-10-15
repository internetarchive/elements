import type {
  FieldParserInterface,
  FieldParserRawValue,
} from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/** One file and its md5 digest, from a checksum listing. */
export type Checksum = {
  /** The file the digest belongs to. */
  readonly file: string;
  /** The md5 digest, lowercased. */
  readonly md5: string;
};

/** `<md5> *<file>`, the md5sum output format. */
const HASH_FIRST = /^([0-9a-f]{32})\s+\*?(.+)$/i;

/** `<file>:<md5>`, the other form seen in the wild. */
const FILE_FIRST = /^(.+):([0-9a-f]{32})$/i;

/** Reads one line of a checksum listing, in either layout. */
function parseLine(line: string): Checksum | undefined {
  const hashFirst = line.match(HASH_FIRST);
  if (hashFirst) {
    return {
      file: hashFirst[2].trim(),
      md5: hashFirst[1].toLowerCase(),
    };
  }
  const fileFirst = line.match(FILE_FIRST);
  if (fileFirst) {
    return {
      file: fileFirst[1].trim(),
      md5: fileFirst[2].toLowerCase(),
    };
  }
  return undefined;
}

/**
 * Parses a newline-delimited checksum listing into one {@link Checksum} per
 * line, accepting either the `<md5> *<file>` or `<file>:<md5>` layout.
 *
 * Lines in neither layout are dropped, and a value with no usable line at all
 * is rejected (returns `undefined`) rather than reported as an empty listing.
 * That matters because the field is sometimes filled with something else
 * entirely, such as a track listing, and the raw value stays on the field for
 * anyone who needs to look.
 *
 * @class ChecksumParser
 */
export class ChecksumParser implements FieldParserInterface<Checksum[]> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new ChecksumParser();

  parseValue(rawValue: FieldParserRawValue): Checksum[] | undefined {
    if (typeof rawValue !== 'string') return undefined;

    const checksums = rawValue
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map(parseLine)
      .filter((entry): entry is Checksum => entry !== undefined);

    return checksums.length ? checksums : undefined;
  }
}

/**
 * A field whose values are the {@link Checksum} entries of a checksum listing.
 *
 * @class ChecksumField
 */
export class ChecksumField extends MetadataField<Checksum, ChecksumParser> {
  constructor(rawValue: MetadataRawValue) {
    super(ChecksumParser.shared, rawValue);
  }
}
