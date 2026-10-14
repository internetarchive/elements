import {
  BooleanField,
  DateField,
  Metadata,
  NumberField,
  StringField,
} from '../../item-metadata/item-metadata';
import { Memoize } from 'typescript-memoize';

export class SearchMetadata extends Metadata {
  /** Optional. */
  @Memoize() get created_on(): DateField | undefined {
    return this.rawMetadata.created_on != null
      ? new DateField(this.rawMetadata.created_on)
      : undefined;
  }

  @Memoize() get file_creation_mtime(): NumberField | undefined {
    return this.rawMetadata.file_creation_mtime != null
      ? new NumberField(this.rawMetadata.file_creation_mtime)
      : undefined;
  }

  @Memoize() get filename(): StringField | undefined {
    return this.rawMetadata.filename != null
      ? new StringField(this.rawMetadata.filename)
      : undefined;
  }

  @Memoize() get file_basename(): StringField | undefined {
    return this.rawMetadata.file_basename != null
      ? new StringField(this.rawMetadata.file_basename)
      : undefined;
  }

  /**
   * Computed in processing of FTS API hit.
   */
  @Memoize() get result_in_subfile(): BooleanField | undefined {
    return this.rawMetadata.result_in_subfile != null
      ? new BooleanField(this.rawMetadata.result_in_subfile)
      : undefined;
  }

  /** Optional. */
  @Memoize() get query(): StringField | undefined {
    return this.rawMetadata.query != null
      ? new StringField(this.rawMetadata.query)
      : undefined;
  }

  /**
   * Optional.
   */
  @Memoize() get date_favorited(): DateField | undefined {
    return this.rawMetadata.date_favorited != null
      ? new DateField(this.rawMetadata.date_favorited)
      : undefined;
  }

  /**
   * Optional.
   */
  @Memoize() get updated_on(): DateField | undefined {
    return this.rawMetadata.updated_on != null
      ? new DateField(this.rawMetadata.updated_on)
      : undefined;
  }

  /**
   * Optional. Only on some TV hits.
   */
  @Memoize() get ad_id(): StringField | undefined {
    return this.rawMetadata.ad_id != null
      ? new StringField(this.rawMetadata.ad_id)
      : undefined;
  }

  /**
   * Optional. Only on some TV hits.
   */
  @Memoize() get factcheck(): StringField | undefined {
    return this.rawMetadata.factcheck != null
      ? new StringField(this.rawMetadata.factcheck)
      : undefined;
  }

  /**
   * Optional. Only on some TV hits.
   */
  @Memoize() get is_clip(): BooleanField | undefined {
    return this.rawMetadata.clip != null
      ? new BooleanField(this.rawMetadata.clip)
      : undefined;
  }

  /**
   * Optional. Only on TV hits.
   */
  @Memoize() get num_clips(): NumberField | undefined {
    return this.rawMetadata.nclips != null
      ? new NumberField(this.rawMetadata.nclips)
      : undefined;
  }

  /**
   * Optional.
   */
  @Memoize() get __href__(): StringField | undefined {
    return this.rawMetadata.__href__ != null
      ? new StringField(this.rawMetadata.__href__)
      : undefined;
  }

  /**
   * Optional.
   */
  @Memoize() get __img__(): StringField | undefined {
    return this.rawMetadata.__img__ != null
      ? new StringField(this.rawMetadata.__img__)
      : undefined;
  }
}
