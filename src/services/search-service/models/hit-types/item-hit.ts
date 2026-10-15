/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BooleanField,
  ByteField,
  DateField,
  MediaTypeField,
  NumberField,
  StringField,
  StringListField,
} from '../../../item-metadata/item-metadata';
import { SearchReview } from '../../responses/page-elements';
import { SearchMetadata } from '../search-metadata';
import { Memoize } from 'typescript-memoize';

/**
 * A model that describes an item hit from a Metadata Search via the PPS endpoint.
 *
 * The fields in here are cast to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class ItemHit
 */
export class ItemHit {
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

  /** Optional. */
  get addeddate(): DateField | undefined {
    return this.fields.addeddate;
  }

  /** Optional. */
  get avg_rating(): NumberField | undefined {
    return this.fields.avg_rating;
  }

  /**
   * May be a superset of metadata collection field.
   * Multivalued.
   */
  get collection(): StringField | undefined {
    return this.fields.collection;
  }

  /**
   * Computed during document construction, for collection items only.
   * Optional.
   */
  @Memoize() get collection_files_count(): NumberField | undefined {
    return this.rawMetadata.fields?.collection_files_count != null
      ? new NumberField(this.rawMetadata.fields.collection_files_count)
      : undefined;
  }

  /**
   * In bytes; computed during document construction, for collection items only.
   * Optional.
   */
  get collection_size(): ByteField | undefined {
    return this.fields.collection_size;
  }

  /**
   * Optional.
   * Multivalued.
   */
  get creator(): StringField | undefined {
    return this.fields.creator;
  }

  /**
   * Optional.
   */
  get date(): DateField | undefined {
    return this.fields.date;
  }

  /** Optional. */
  get description(): StringField | undefined {
    return this.fields.description;
  }

  /**
   * Total views over item lifetime, updated by audit consultation with Views API.
   * Optional.
   */
  get downloads(): NumberField | undefined {
    return this.fields.downloads;
  }

  /**
   * Computed during document construction.
   */
  get files_count(): NumberField | undefined {
    return this.fields.files_count;
  }

  /**
   * Optional.
   * Multivalued.
   */
  @Memoize() get genre(): StringField | undefined {
    return this.rawMetadata.fields?.genre != null
      ? new StringField(this.rawMetadata.fields.genre)
      : undefined;
  }

  /**
   * Item characterization including noindex status.
   * Multivalued.
   */
  @Memoize() get indexflag(): StringField | undefined {
    return this.rawMetadata.fields?.indexflag != null
      ? new StringField(this.rawMetadata.fields.indexflag)
      : undefined;
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
   * Optional.
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

  /**
   * May be stale.
   * Optional.
   */
  @Memoize() get lending___available_to_borrow(): BooleanField | undefined {
    return this.rawMetadata.fields?.lending___available_to_borrow != null
      ? new BooleanField(this.rawMetadata.fields.lending___available_to_borrow)
      : undefined;
  }

  /**
   * May be stale.
   * Optional.
   */
  @Memoize() get lending___available_to_browse(): BooleanField | undefined {
    return this.rawMetadata.fields?.lending___available_to_browse != null
      ? new BooleanField(this.rawMetadata.fields.lending___available_to_browse)
      : undefined;
  }

  /**
   * May be stale.
   * Optional.
   */
  @Memoize() get lending___available_to_waitlist(): BooleanField | undefined {
    return this.rawMetadata.fields?.lending___available_to_waitlist != null
      ? new BooleanField(
          this.rawMetadata.fields.lending___available_to_waitlist,
        )
      : undefined;
  }

  /**
   * May be stale.
   * Optional.
   */
  @Memoize() get lending___status(): StringField | undefined {
    return this.rawMetadata.fields?.lending___status != null
      ? new StringField(this.rawMetadata.fields.lending___status)
      : undefined;
  }

  /** Optional. */
  @Memoize() get licenseurl(): StringField | undefined {
    return this.rawMetadata.fields?.licenseurl != null
      ? new StringField(this.rawMetadata.fields.licenseurl)
      : undefined;
  }

  get mediatype(): MediaTypeField | undefined {
    return this.fields.mediatype;
  }

  /**
   * Views over a month, updated by audit consultation with Views API.
   * Optional.
   */
  get month(): NumberField | undefined {
    return this.fields.month;
  }

  /** Optional. */
  get noindex(): BooleanField | undefined {
    return this.fields.noindex;
  }

  /**
   * Computed during document construction.
   * Optional.
   */
  get num_favorites(): NumberField | undefined {
    return this.fields.num_favorites;
  }

  /**
   * Computed during document construction.
   * Optional.
   */
  get num_reviews(): NumberField | undefined {
    return this.fields.num_reviews;
  }

  /** Optional. */
  get publicdate(): DateField | undefined {
    return this.fields.publicdate;
  }

  /** Optional. */
  get reviewdate(): DateField | undefined {
    return this.fields.reviewdate;
  }

  /**
   * Optional.
   * Only present when requesting the reviews page_element of an account_details page.
   * Contains data about the target user's review on this item.
   * Note: this property is not a standard field type and there is no need to call `.value`/`.values` on it.
   */
  @Memoize() get review(): SearchReview | undefined {
    const reviewData = this.rawMetadata.review;
    return reviewData ? new SearchReview(reviewData) : undefined;
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

  /** Optional. */
  get type(): StringField | undefined {
    return this.fields.type;
  }

  /** Optional. */
  get volume(): StringField | undefined {
    return this.fields.volume;
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
}
