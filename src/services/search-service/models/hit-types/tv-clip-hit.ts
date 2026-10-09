/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BooleanField,
  ByteField,
  DateField,
  MediaTypeField,
  NumberField,
} from '../../../item-metadata/item-metadata';
import {
  StringField,
  StringListField,
} from '../../../item-metadata/item-metadata';
import { Memoize } from 'typescript-memoize';
import { SearchMetadata } from '../search-metadata';

/**
 * A model that describes a TV clip hit from a TV search via the PPS endpoint.
 *
 * The fields in here are cast to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class TvClipHit
 */
export class TvClipHit {
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
   * Synthesized in processing of TVS API hit; TBD
   * Optional.
   */
  @Memoize() get highlight(): StringField | undefined {
    // Note: _not_ inside the fields object.
    return this.rawMetadata.highlight?.text
      ? new StringField(this.rawMetadata.highlight.text)
      : undefined;
  }

  /** Optional. */
  get addeddate(): DateField | undefined {
    return this.fields.addeddate;
  }

  /** Optional. */
  get ad_id(): StringField | undefined {
    return this.fields.ad_id;
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
   * Contents of description in TVS API hit, TBD
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

  /** Optional. */
  get factcheck(): StringField | undefined {
    return this.fields.factcheck;
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
   * Computed during document construction.
   */
  get files_count(): NumberField | undefined {
    return this.fields.files_count;
  }

  /**
   * Whether this hit represents a "clip" of a longer TV item.
   */
  get is_clip(): BooleanField | undefined {
    return this.fields.is_clip;
  }

  /**
   * Format varies.
   * Optional.
   */
  get issue(): StringField | undefined {
    return this.fields.issue;
  }

  /**
   * Computed during document construction.
   * Optional (appears on TV sub-collections).
   */
  get item_count(): NumberField | undefined {
    return this.fields.item_count;
  }

  /**
   * In bytes; computed during document construction.
   */
  get item_size(): ByteField | undefined {
    return this.fields.item_size;
  }

  /**
   * Optional.
   * Multivalued.
   */
  get language(): StringField | undefined {
    return this.fields.language;
  }

  get mediatype(): MediaTypeField | undefined {
    return this.fields.mediatype;
  }

  get num_clips(): NumberField | undefined {
    return this.fields.num_clips;
  }

  /**
   * Computed during document construction.
   * Optional.
   */
  get num_favorites(): NumberField | undefined {
    return this.fields.num_favorites;
  }

  /** Optional. */
  get publicdate(): DateField | undefined {
    return this.fields.publicdate;
  }

  /**
   * Computed in processing of FTS API hit.
   * Potentially irrelevant for TVS hit.
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
   * Views over a seven-day period, updated by audit consultation with Views API.
   * Optional.
   */
  get week(): NumberField | undefined {
    return this.fields.week;
  }

  /**
   * Computed from date.
   * Optional.
   */
  get year(): NumberField | undefined {
    return this.fields.year;
  }

  /**
   * Optional.
   * Start time for TV hit.
   */
  @Memoize() get start(): StringField | undefined {
    return this.rawMetadata.fields?.start != null
      ? new StringField(this.rawMetadata.fields.start)
      : undefined;
  }

  /**
   * Synthesized in processing of TVS API hit; TBD
   * Optional.
   */
  get __href__(): StringField | undefined {
    return this.fields.__href__;
  }

  /**
   * Derived in annotation of raw hits; TBD
   * Optional.
   */
  get __img__(): StringField | undefined {
    return this.fields.__img__;
  }
}
