/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateField, StringField } from '../../../item-metadata/item-metadata';
import { MediaTypeField } from '../../../item-metadata/item-metadata';
import { SearchMetadata } from '../search-metadata';
import { Memoize } from 'typescript-memoize';

/**
 * A model that describes a set of captures for a given URL, as presented in the Web Archives tab
 * on a patron's profile page.
 *
 * The fields in here are cast to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class WebArchiveHit
 */
export class WebArchiveHit {
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

  get identifier(): string | undefined {
    return this.rawMetadata.fields?.url;
  }

  get mediatype(): MediaTypeField {
    return new MediaTypeField('web');
  }

  /** The URL that was captured */
  @Memoize() get title(): StringField | undefined {
    return this.rawMetadata.fields?.url
      ? new StringField(this.rawMetadata.fields?.url)
      : undefined;
  }

  /**
   * Optional.
   */
  @Memoize() get capture_dates(): DateField | undefined {
    return this.rawMetadata.fields?.capture_dates
      ? new DateField(this.rawMetadata.fields?.capture_dates)
      : undefined;
  }

  /**
   * Optional.
   */
  get __href__(): StringField | undefined {
    return this.fields.__href__;
  }
}
