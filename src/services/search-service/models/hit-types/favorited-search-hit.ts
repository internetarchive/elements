/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DateField,
  StringField,
} from '../../../item-metadata/item-metadata';
import { SearchMetadata } from '../search-metadata';

/**
 * A model that describes an item hit from a Metadata Search via the PPS endpoint.
 *
 * The fields in here are cast to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class FavoritedSearchHit
 */
export class FavoritedSearchHit {
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
    return this.fields.query?.value;
  }

  /** Optional. */
  get title(): StringField | undefined {
    return this.fields.title;
  }

  /** Optional. */
  get query(): StringField | undefined {
    return this.fields.query;
  }

  /**
   * Optional.
   */
  get date_favorited(): DateField | undefined {
    return this.fields.date_favorited;
  }

  /**
   * Optional.
   */
  get __href__(): StringField | undefined {
    return this.fields.__href__;
  }
}
