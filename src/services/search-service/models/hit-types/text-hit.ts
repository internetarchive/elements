/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BooleanField,
  DateField,
  MediaTypeField,
  NumberField,
  StringListField,
} from '../../../item-metadata/item-metadata';
import { StringField } from '../../../item-metadata/item-metadata';
import { Memoize } from 'typescript-memoize';
import { SearchMetadata } from '../search-metadata';

/**
 * A model that describes a textual hit from a full text search via the PPS endpoint.
 *
 * The fields in here are cast to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class TextHit
 */
export class TextHit {
  /**
   * This is the raw hit response; useful for inspecting the raw data
   * returned from the server.
   */
  readonly rawMetadata: Readonly<Record<string, any>>;

  readonly fields: Readonly<SearchMetadata>;

  constructor(json: Record<string, any>) {
    this.rawMetadata = json;
    this.fields = new SearchMetadata(json.fields ?? {});
  }

  /**
   * The item identifier.
   *
   * _Note_: This is a plain string instead of a `MetadataField` since it's
   * the primary key of the item.
   */
  get identifier(): string | undefined {
    return this.fields.identifier;
  }

  /**
   * Synthesized in processing of FTS API hit; TBD
   * Optional.
   */
  @Memoize() get highlight(): StringField | undefined {
    // Note: _not_ inside the fields object.
    return this.rawMetadata.highlight?.text
      ? new StringField(this.rawMetadata.highlight.text)
      : undefined;
  }

  /**
   * May be stale in FTS.
   * Optional.
   */
  get addeddate(): DateField | undefined {
    return this.fields.addeddate;
  }

  /** Optional. */
  get avg_rating(): NumberField | undefined {
    return this.fields.avg_rating;
  }

  /** Multivalued. */
  get collection(): StringField | undefined {
    return this.fields.collection;
  }

  get created_on(): DateField | undefined {
    return this.fields.created_on;
  }

  /**
   * Optional.
   * Multivalued.
   */
  get creator(): StringField | undefined {
    return this.fields.creator;
  }

  /** Optional. */
  get date(): DateField | undefined {
    return this.fields.date;
  }

  /**
   * Contents of hilighting in FTS API hit, TBD
   * Optional.
   * Multivalued.
   */
  get description(): StringField | undefined {
    return this.fields.description;
  }

  /**
   * Total views over ITEM (not text) lifetime, updated by audit consultation with Views API.
   * Optional.
   */
  get downloads(): NumberField | undefined {
    return this.fields.downloads;
  }

  get filename(): StringField | undefined {
    return this.fields.filename;
  }

  get file_basename(): StringField | undefined {
    return this.fields.file_basename;
  }

  get file_creation_mtime(): NumberField | undefined {
    return this.fields.file_creation_mtime;
  }

  /**
   * Format varies.
   * Optional.
   */
  get issue(): StringField | undefined {
    return this.fields.issue;
  }

  get mediatype(): MediaTypeField | undefined {
    return this.fields.mediatype;
  }

  /** Optional. */
  @Memoize() get page_num(): NumberField | undefined {
    return this.rawMetadata.fields?.page_num != null
      ? new NumberField(this.rawMetadata.fields.page_num)
      : undefined;
  }

  /** Optional. */
  get publicdate(): DateField | undefined {
    return this.fields.publicdate;
  }

  /**
   * Computed in processing of FTS API hit.
   */
  get result_in_subfile(): BooleanField | undefined {
    return this.fields.result_in_subfile;
  }

  /** Optional. */
  get reviewdate(): DateField | undefined {
    return this.fields.reviewdate;
  }

  /**
   * Format varies.
   * Optional.
   */
  get source(): StringField | undefined {
    return this.fields.source;
  }

  /**
   * Optional.
   * Multivalued.
   */
  get subject(): StringListField | undefined {
    return this.fields.subject;
  }

  /** Optional. */
  get title(): StringField | undefined {
    return this.fields.title;
  }

  get updated_on(): DateField | undefined {
    return this.fields.updated_on;
  }

  /**
   * Computed from date.
   * Optional.
   */
  get year(): NumberField | undefined {
    return this.fields.year;
  }

  /**
   * Synthesized in processing of FTS API hit; TBD
   * Optional.
   */
  get __href__(): StringField | undefined {
    return this.fields.__href__;
  }
}
