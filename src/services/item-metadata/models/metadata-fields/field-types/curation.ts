import type {
  FieldParserInterface,
  FieldParserRawValue,
} from '../../../../field-parsers/field-parsers';
import { DateParser } from '../../../../field-parsers/field-parsers';
import { MetadataField, MetadataRawValue } from '../metadata-field';

/**
 * A parsed curation note. The raw form is a run of bracketed tags, e.g.
 * `"[curator]validator@archive.org[/curator][date]20201123141634[/date][comment]checked for malware[/comment]"`,
 * which becomes
 * `{ curator: 'validator@archive.org', date: Date(2020-11-23), comment: 'checked for malware' }`.
 */
export type Curation = {
  /** Who curated the item, usually an email address. */
  readonly curator?: string;
  /** When it was curated, from the compact `YYYYMMDDHHMMSS` timestamp. */
  readonly date?: Date;
  /** The curator's note. */
  readonly comment?: string;
  /** The curation state, when the note carries one. */
  readonly state?: string;
};

/** Reads the contents of one `[tag]…[/tag]` pair. */
function tagContents(rawValue: string, tag: string): string | undefined {
  const match = rawValue.match(
    new RegExp(`\\[${tag}\\]([\\s\\S]*?)\\[/${tag}\\]`, 'i'),
  );
  const contents = match?.[1]?.trim();
  return contents ? contents : undefined;
}

/**
 * Parses the bracketed curation tags. Values carrying none of the known tags
 * are rejected (returns `undefined`) so the raw string stays available on the
 * field rather than being reported as an empty note.
 *
 * @class CurationParser
 */
export class CurationParser implements FieldParserInterface<Curation> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new CurationParser();

  parseValue(rawValue: FieldParserRawValue): Curation | undefined {
    if (typeof rawValue !== 'string') return undefined;

    const curator = tagContents(rawValue, 'curator');
    const rawDate = tagContents(rawValue, 'date');
    const comment = tagContents(rawValue, 'comment');
    const state = tagContents(rawValue, 'state');
    if (!curator && !rawDate && !comment && !state) return undefined;

    return {
      curator,
      date: rawDate ? DateParser.shared.parseValue(rawDate) : undefined,
      comment,
      state,
    };
  }
}

/**
 * A field whose value is a parsed {@link Curation}.
 *
 * @class CurationField
 */
export class CurationField extends MetadataField<Curation, CurationParser> {
  constructor(rawValue: MetadataRawValue) {
    super(CurationParser.shared, rawValue);
  }
}
