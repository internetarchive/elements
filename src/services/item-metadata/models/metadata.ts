import { Memoize } from 'typescript-memoize';
import { BooleanField } from './metadata-fields/field-types/boolean';
import { DateField } from './metadata-fields/field-types/date';
import { DurationField } from './metadata-fields/field-types/duration';
import { NumberField } from './metadata-fields/field-types/number';
import { StringField } from './metadata-fields/field-types/string';
import { PageProgressionField } from './metadata-fields/field-types/page-progression';
import { ByteField } from './metadata-fields/field-types/byte';
import { MediaTypeField } from './metadata-fields/field-types/mediatype';
import {
  StringListField,
  NumberListField,
} from './metadata-fields/field-types/list';
import { ChecksumField } from './metadata-fields/field-types/checksum';
import { CurationField } from './metadata-fields/field-types/curation';
import { EnumField, EnumParser } from './metadata-fields/field-types/enum';
import { AspectRatioField } from './metadata-fields/field-types/aspect-ratio';
import { UtcOffsetField } from './metadata-fields/field-types/utc-offset';
import { TunerField } from './metadata-fields/field-types/tuner';
import { MetadataRawValue } from './metadata-fields/metadata-field';
import { mapField } from './map-field';

/** Allowed values for the `reviews-allowed` item metadata field. */
export type ReviewsAllowed = 'true' | 'none' | 'frozen';
const reviewsAllowedParser = new EnumParser<ReviewsAllowed>([
  'true',
  'none',
  'frozen',
]);

/** Allowed values for the `sound` item metadata field. */
export type Sound = 'sound' | 'silent';
const soundParser = new EnumParser<Sound>(['sound', 'silent']);

/** Allowed values for the `color` item metadata field. */
export type Color = 'color' | 'b&w';
const colorParser = new EnumParser<Color>(['color', 'b&w']);

/** Allowed values for the `bookreader-defaults` item metadata field. */
export type BookReaderDefaults = 'mode/1up' | 'mode/2up' | 'mode/thumb';
const bookReaderDefaultsParser = new EnumParser<BookReaderDefaults>([
  'mode/1up',
  'mode/2up',
  'mode/thumb',
]);

/**
 * Metadata is an expansive model that describes an Item.
 *
 * The fields in here get casted to their respective field types. See `metadata-fields/field-type`.
 *
 * Add additional fields as needed.
 *
 * @export
 * @class Metadata
 */
export class Metadata {
  /**
   * This is the raw metadata reponse; useful for inspecting the raw data returned from the server.
   *
   * @type { string: any }
   * @memberof Metadata
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  readonly rawMetadata: Readonly<Record<string, any>>;

  @Memoize() get access(): StringField | undefined {
    return this.field(StringField, 'access');
  }

  @Memoize() get adder(): StringField | undefined {
    return this.field(StringField, 'adder');
  }

  @Memoize() get amrc_id(): StringField | undefined {
    return this.field(StringField, 'amrc-id');
  }

  @Memoize() get archiveit_account_id(): NumberField | undefined {
    return this.field(NumberField, 'archiveit-account-id');
  }

  @Memoize() get archiveit_account_organization_name():
    | StringField
    | undefined {
    return this.field(StringField, 'archiveit-account-organization-name');
  }

  @Memoize() get archiveit_collection_id(): NumberField | undefined {
    return this.field(NumberField, 'archiveit-collection-id');
  }

  @Memoize() get archiveit_collection_name(): StringField | undefined {
    return this.field(StringField, 'archiveit-collection-name');
  }

  @Memoize() get archiveit_job_type(): StringField | undefined {
    return this.field(StringField, 'archiveit-job-type');
  }

  @Memoize() get audit_time_minutes(): NumberField | undefined {
    return this.field(NumberField, 'audit_time_minutes');
  }

  @Memoize() get auditor(): StringField | undefined {
    return this.field(StringField, 'auditor');
  }

  @Memoize() get author(): StringField | undefined {
    return this.field(StringField, 'author');
  }

  @Memoize() get autocrop_version(): StringField | undefined {
    return this.field(StringField, 'autocrop_version');
  }

  @Memoize() get bookplateleaf(): NumberField | undefined {
    return this.field(NumberField, 'bookplateleaf');
  }

  /** The BookReader view an item opens in. */
  @Memoize() get bookreader_defaults():
    | EnumField<BookReaderDefaults>
    | undefined {
    return mapField(
      this.rawMetadata,
      (raw) => new EnumField<BookReaderDefaults>(raw, bookReaderDefaultsParser),
      'bookreader-defaults',
    );
  }

  @Memoize() get boxid(): StringField | undefined {
    return this.field(StringField, 'boxid');
  }

  @Memoize() get camera(): StringField | undefined {
    return this.field(StringField, 'camera');
  }

  @Memoize() get cameraman(): StringField | undefined {
    return this.field(StringField, 'cameraman');
  }

  @Memoize() get canister(): StringField | undefined {
    return this.field(StringField, 'canister');
  }

  @Memoize() get case_name(): StringField | undefined {
    return this.field(StringField, 'case-name');
  }

  @Memoize() get col_number(): StringField | undefined {
    return this.field(StringField, 'col_number');
  }

  /** Repeatable, so it arrives as an array of collection names. */
  @Memoize() get collection_added(): StringField | undefined {
    return this.field(StringField, 'collection_added');
  }

  @Memoize() get collection_library(): StringField | undefined {
    return this.field(StringField, 'collection-library');
  }

  @Memoize() get collection_set(): StringField | undefined {
    return this.field(StringField, 'collection_set');
  }

  @Memoize() get copyright_holder(): StringField | undefined {
    return this.field(StringField, 'copyright_holder');
  }

  @Memoize() get court(): StringField | undefined {
    return this.field(StringField, 'court');
  }

  @Memoize() get crawler(): StringField | undefined {
    return this.field(StringField, 'crawler');
  }

  @Memoize() get crawljob(): StringField | undefined {
    return this.field(StringField, 'crawljob');
  }

  /**
   * The curation note, parsed from its bracketed tags into a curator, date,
   * comment, and state.
   */
  @Memoize() get curation(): CurationField | undefined {
    return this.field(CurationField, 'curation');
  }

  @Memoize() get dari_title(): StringField | undefined {
    return this.field(StringField, 'dari-title');
  }

  /** Sent under either key ordering. */
  @Memoize() get dari_title_romanized(): StringField | undefined {
    return this.field(
      StringField,
      'dari-title-romanized',
      'dari-romanized-title',
    );
  }

  @Memoize() get date_case_filed(): DateField | undefined {
    return this.field(DateField, 'date-case-filed');
  }

  @Memoize() get date_case_terminated(): DateField | undefined {
    return this.field(DateField, 'date-case-terminated');
  }

  @Memoize() get date_created(): DateField | undefined {
    return this.field(DateField, 'date_created');
  }

  @Memoize() get date_last_filing(): DateField | undefined {
    return this.field(DateField, 'date-last-filing');
  }

  @Memoize() get derive_submittime(): DateField | undefined {
    return this.field(DateField, 'derive_submittime');
  }

  @Memoize() get derive_version(): StringField | undefined {
    return this.field(StringField, 'derive_version');
  }

  @Memoize() get discs(): NumberField | undefined {
    return this.field(NumberField, 'discs');
  }

  @Memoize() get docket_num(): StringField | undefined {
    return this.field(StringField, 'docket-num');
  }

  @Memoize() get external_metadata_update(): DateField | undefined {
    return this.field(DateField, 'external_metadata_update');
  }

  @Memoize() get fail_reasons(): StringField | undefined {
    return this.field(StringField, 'fail-reasons');
  }

  /** When the item's `files.xml` was written, e.g. `"Wed Mar 23 3:18:56 UTC 2011"`. */
  @Memoize() get filesxml(): DateField | undefined {
    return this.field(DateField, 'filesxml');
  }

  /** Compact `YYYYMMDD[HHMMSS]` timestamp. */
  @Memoize() get firstfiledate(): DateField | undefined {
    return this.field(DateField, 'firstfiledate');
  }

  @Memoize() get firstfileserial(): NumberField | undefined {
    return this.field(NumberField, 'firstfileserial');
  }

  @Memoize() get foldoutcount(): NumberField | undefined {
    return this.field(NumberField, 'foldoutcount');
  }

  @Memoize() get format(): StringField | undefined {
    return this.field(StringField, 'format');
  }

  @Memoize() get geo_restricted(): StringField | undefined {
    return this.field(StringField, 'geo_restricted');
  }

  @Memoize() get guid(): StringField | undefined {
    return this.field(StringField, 'guid');
  }

  /** A flag, spelled `0` or `1` in the API. */
  @Memoize() get has_mp3(): BooleanField | undefined {
    return this.field(BooleanField, 'has_mp3');
  }

  @Memoize() get height(): NumberField | undefined {
    return this.field(NumberField, 'height');
  }

  @Memoize() get hidden(): BooleanField | undefined {
    return this.field(BooleanField, 'hidden');
  }

  /**
   * The runtime as it was originally written, before being normalized into
   * {@link runtime}. Free-form prose like `"1.8 Hours"` or `"33 minutes"`, so
   * it stays a string: `DurationParser` takes the leading number and drops the
   * unit, reading `"1.8 Hours"` as 1.8 seconds. Read `runtime` for a duration.
   */
  @Memoize() get ia_orig__runtime(): StringField | undefined {
    return this.field(StringField, 'ia_orig__runtime');
  }

  /**
   * The item identifier.
   *
   * _Note_ This is a plain string instead of a `MetadataField` since it
   * will only ever be a string and not an array.
   *
   * @type {string}
   * @memberof Metadata
   */
  get identifier(): string | undefined {
    return this.rawMetadata.identifier;
  }

  @Memoize() get access_restricted_item(): BooleanField | undefined {
    return this.field(BooleanField, 'access-restricted-item');
  }

  @Memoize() get addeddate(): DateField | undefined {
    return this.field(DateField, 'addeddate');
  }

  /**
   * The display aspect ratio, e.g. `"4:3"`, parsed into width, height, and a
   * decimal ratio.
   */
  @Memoize() get aspect_ratio(): AspectRatioField | undefined {
    return this.field(AspectRatioField, 'aspect_ratio');
  }

  @Memoize() get audio_codec(): StringField | undefined {
    return this.field(StringField, 'audio_codec');
  }

  @Memoize() get audio_sample_rate(): NumberField | undefined {
    return this.field(NumberField, 'audio_sample_rate');
  }

  @Memoize() get avg_rating(): NumberField | undefined {
    return this.field(NumberField, 'avg_rating');
  }

  @Memoize() get backup_location(): StringField | undefined {
    return this.field(StringField, 'backup_location');
  }

  @Memoize() get ccnum(): StringField | undefined {
    return this.field(StringField, 'ccnum');
  }

  /**
   * Whether the broadcast included closed captioning. The raw `"yes"`/`"no"`
   * value is parsed to a boolean.
   */
  @Memoize() get closed_captioning(): BooleanField | undefined {
    return this.field(BooleanField, 'closed_captioning');
  }

  /**
   * All of the collections that an Item is in, including
   * all of the side-loaded collections from the ListAPI
   * and SimpleListsAPI like `fav-*`
   *
   * @type {StringField}
   * @memberof Metadata
   */
  @Memoize() get collection(): StringField | undefined {
    return this.field(StringField, 'collection');
  }

  /**
   * The "natural" collections for an item before augmentation
   * by side-loaded collections like ListsAPI and SimpleLists
   *
   * The `collection` field above includes things like all of
   * the `fav-*` collections, whereas this is only the collections
   * that have been directly added in the hierarchy.
   *
   * @type {StringField}
   * @memberof Metadata
   */
  @Memoize() get collections_raw(): StringField | undefined {
    return this.field(StringField, 'collections_raw');
  }

  /**
   * The size of a collection in bytes
   *
   * @type {ByteField}
   * @memberof Metadata
   */
  @Memoize() get collection_size(): ByteField | undefined {
    return this.field(ByteField, 'collection_size');
  }

  @Memoize() get color(): EnumField<Color> | undefined {
    return mapField(
      this.rawMetadata,
      (raw) => new EnumField<Color>(raw, colorParser),
      'color',
    );
  }

  @Memoize() get contact(): StringField | undefined {
    return this.field(StringField, 'contact');
  }

  @Memoize() get contributor(): StringField | undefined {
    return this.field(StringField, 'contributor');
  }

  @Memoize() get coverage(): StringField | undefined {
    return this.field(StringField, 'coverage');
  }

  @Memoize() get creator(): StringField | undefined {
    return this.field(StringField, 'creator');
  }

  @Memoize() get creator_alt_script(): StringField | undefined {
    return this.field(StringField, 'creator-alt-script');
  }

  @Memoize() get credits(): StringField | undefined {
    return this.field(StringField, 'credits');
  }

  @Memoize() get collection_layout(): StringField | undefined {
    return this.field(StringField, 'collection_layout');
  }

  @Memoize() get date(): DateField | undefined {
    return this.field(DateField, 'date');
  }

  @Memoize() get description(): StringField | undefined {
    return this.field(StringField, 'description');
  }

  /**
   * All time download count
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get downloads(): NumberField | undefined {
    return this.field(NumberField, 'downloads');
  }

  /**
   * The item duration in seconds
   *
   * @type {DurationField}
   * @memberof Metadata
   */
  @Memoize() get duration(): DurationField | undefined {
    return this.field(DurationField, 'duration');
  }

  @Memoize() get external_identifier(): StringField | undefined {
    return this.field(StringField, 'external-identifier');
  }

  @Memoize() get external_link(): StringField | undefined {
    return this.field(StringField, 'external-link');
  }

  /**
   * The number of files in an item
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get files_count(): NumberField | undefined {
    return this.field(NumberField, 'files_count');
  }

  @Memoize() get frames_per_second(): NumberField | undefined {
    return this.field(NumberField, 'frames_per_second');
  }

  @Memoize() get identifier_access(): StringField | undefined {
    return this.field(StringField, 'identifier-access');
  }

  @Memoize() get identifier_ark(): StringField | undefined {
    return this.field(StringField, 'identifier-ark');
  }

  @Memoize() get identifier_bib(): StringField | undefined {
    return this.field(StringField, 'identifier-bib');
  }

  @Memoize() get image_count(): NumberField | undefined {
    return this.field(NumberField, 'image_count');
  }

  @Memoize() get imagecount(): NumberField | undefined {
    return this.field(NumberField, 'imagecount');
  }

  @Memoize() get indexdate(): DateField | undefined {
    return this.field(DateField, 'indexdate');
  }

  @Memoize() get invoice(): NumberField | undefined {
    return this.field(NumberField, 'invoice');
  }

  @Memoize() get isbn(): StringField | undefined {
    return this.field(StringField, 'isbn');
  }

  @Memoize() get issue(): StringField | undefined {
    return this.field(StringField, 'issue');
  }

  @Memoize() get issue_count(): NumberField | undefined {
    return this.field(NumberField, 'issue_count');
  }

  @Memoize() get issue_page_count(): NumberField | undefined {
    return this.field(NumberField, 'issue_page_count');
  }

  /**
   * For collections, the number of items in the collection
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get item_count(): NumberField | undefined {
    return this.field(NumberField, 'item_count');
  }

  /**
   * The size of the item in bytes
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get item_size(): ByteField | undefined {
    return this.field(ByteField, 'item_size');
  }

  @Memoize() get language(): StringField | undefined {
    return this.field(StringField, 'language');
  }

  /** Compact `YYYYMMDD[HHMMSS]` timestamp. */
  @Memoize() get lastdate(): DateField | undefined {
    return this.field(DateField, 'lastdate');
  }

  /** Compact `YYYYMMDD[HHMMSS]` timestamp. */
  @Memoize() get lastfiledate(): DateField | undefined {
    return this.field(DateField, 'lastfiledate');
  }

  @Memoize() get lastfileserial(): NumberField | undefined {
    return this.field(NumberField, 'lastfileserial');
  }

  @Memoize() get length(): DurationField | undefined {
    return this.field(DurationField, 'length');
  }

  @Memoize() get license(): StringField | undefined {
    return this.field(StringField, 'license');
  }

  @Memoize() get licenseurl(): StringField | undefined {
    return this.field(StringField, 'licenseurl');
  }

  @Memoize() get lineage(): StringField | undefined {
    return this.field(StringField, 'lineage');
  }

  /** Spelled `yes`/`no` in the API. */
  @Memoize() get mature_content(): BooleanField | undefined {
    return this.field(BooleanField, 'mature_content');
  }

  @Memoize() get md5(): StringField | undefined {
    return this.field(StringField, 'md5');
  }

  /** A checksum listing, in the same layouts as `md5s`. */
  @Memoize() get md5contents(): ChecksumField | undefined {
    return this.field(ChecksumField, 'md5contents');
  }

  /**
   * The item's checksum listing, one file and digest per entry. Parses either
   * the `<md5> *<file>` or `<file>:<md5>` layout.
   */
  @Memoize() get md5s(): ChecksumField | undefined {
    return this.field(ChecksumField, 'md5s');
  }

  @Memoize() get medium(): StringField | undefined {
    return this.field(StringField, 'medium');
  }

  @Memoize() get metadata_operator(): StringField | undefined {
    return this.field(StringField, 'metadata_operator');
  }

  @Memoize() get metasource_catalog(): StringField | undefined {
    return this.field(StringField, 'metasource_catalog');
  }

  /** Spelled `yes`/`no` in the API. */
  @Memoize() get monochromatic(): BooleanField | undefined {
    return this.field(BooleanField, 'monochromatic');
  }

  /**
   * The number of downloads in the last month
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get month(): NumberField | undefined {
    return this.field(NumberField, 'month');
  }

  @Memoize() get mediatype(): MediaTypeField | undefined {
    return this.field(MediaTypeField, 'mediatype');
  }

  @Memoize() get mpeg_program(): NumberField | undefined {
    return this.field(NumberField, 'mpeg_program');
  }

  @Memoize() get next_item(): StringField | undefined {
    return this.field(StringField, 'next_item');
  }

  @Memoize() get noarchivetorrent(): BooleanField | undefined {
    return this.field(BooleanField, 'noarchivetorrent');
  }

  @Memoize() get noindex(): BooleanField | undefined {
    return this.field(BooleanField, 'noindex');
  }

  @Memoize() get notes(): StringField | undefined {
    return this.field(StringField, 'notes');
  }

  /**
   * The number of users that have favorited the item
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get num_favorites(): NumberField | undefined {
    return this.field(NumberField, 'num_favorites');
  }

  @Memoize() get num_reviews(): NumberField | undefined {
    return this.field(NumberField, 'num_reviews');
  }

  @Memoize() get numeric_id(): NumberField | undefined {
    return this.field(NumberField, 'numeric_id');
  }

  @Memoize() get numwarcs(): NumberField | undefined {
    return this.field(NumberField, 'numwarcs');
  }

  @Memoize() get ocr(): StringField | undefined {
    return this.field(StringField, 'ocr');
  }

  @Memoize() get ocr_autonomous(): BooleanField | undefined {
    return this.field(BooleanField, 'ocr_autonomous');
  }

  @Memoize() get ocr_detected_lang(): StringField | undefined {
    return this.field(StringField, 'ocr_detected_lang');
  }

  @Memoize() get ocr_detected_lang_conf(): NumberField | undefined {
    return this.field(NumberField, 'ocr_detected_lang_conf');
  }

  @Memoize() get ocr_detected_script(): StringField | undefined {
    return this.field(StringField, 'ocr_detected_script');
  }

  @Memoize() get ocr_detected_script_conf(): NumberField | undefined {
    return this.field(NumberField, 'ocr_detected_script_conf');
  }

  @Memoize() get ocr_invalid_language(): StringField | undefined {
    return this.field(StringField, 'ocr_invalid_language');
  }

  @Memoize() get ocr_module_version(): StringField | undefined {
    return this.field(StringField, 'ocr_module_version');
  }

  @Memoize() get ocr_parameters(): StringField | undefined {
    return this.field(StringField, 'ocr_parameters');
  }

  @Memoize() get old_pallet(): StringField | undefined {
    return this.field(StringField, 'old_pallet');
  }

  @Memoize() get openlibrary_edition(): StringField | undefined {
    return this.field(StringField, 'openlibrary_edition');
  }

  @Memoize() get openlibrary_work(): StringField | undefined {
    return this.field(StringField, 'openlibrary_work');
  }

  @Memoize() get operator(): StringField | undefined {
    return this.field(StringField, 'operator');
  }

  @Memoize() get originalurl(): StringField | undefined {
    return this.field(StringField, 'originalurl');
  }

  @Memoize() get osf_category(): StringField | undefined {
    return this.field(StringField, 'osf_category');
  }

  @Memoize() get osf_project(): StringField | undefined {
    return this.field(StringField, 'osf_project');
  }

  @Memoize() get osf_registration_doi(): StringField | undefined {
    return this.field(StringField, 'osf_registration_doi');
  }

  @Memoize() get osf_registration_schema(): StringField | undefined {
    return this.field(StringField, 'osf_registration_schema');
  }

  @Memoize() get osf_registry(): StringField | undefined {
    return this.field(StringField, 'osf_registry');
  }

  @Memoize() get osf_subjects(): StringField | undefined {
    return this.field(StringField, 'osf_subjects');
  }

  @Memoize() get osf_tags(): StringField | undefined {
    return this.field(StringField, 'osf_tags');
  }

  @Memoize() get output_time_minutes(): NumberField | undefined {
    return this.field(NumberField, 'output_time_minutes');
  }

  @Memoize() get pacer_case_num(): NumberField | undefined {
    return this.field(NumberField, 'pacer-case-num');
  }

  @Memoize() get packaging_time_minutes(): NumberField | undefined {
    return this.field(NumberField, 'packaging_time_minutes');
  }

  @Memoize() get page_number_confidence(): NumberField | undefined {
    return this.field(NumberField, 'page_number_confidence');
  }

  @Memoize() get page_number_module_version(): StringField | undefined {
    return this.field(StringField, 'page_number_module_version');
  }

  /**
   * The reading direction. The API spells this `page-progression`; the
   * underscored spelling is accepted as a fallback.
   */
  @Memoize() get page_progression(): PageProgressionField | undefined {
    return this.field(
      PageProgressionField,
      'page-progression',
      'page_progression',
    );
  }

  @Memoize() get paginated(): BooleanField | undefined {
    return this.field(BooleanField, 'paginated');
  }

  @Memoize() get parse_date(): DateField | undefined {
    return this.field(DateField, 'parse_date');
  }

  @Memoize() get parse_state(): StringField | undefined {
    return this.field(StringField, 'parse_state');
  }

  @Memoize() get partner(): StringField | undefined {
    return this.field(StringField, 'partner');
  }

  @Memoize() get pashto_title(): StringField | undefined {
    return this.field(StringField, 'pashto-title');
  }

  /** Sent under either key ordering. */
  @Memoize() get pashto_title_romanized(): StringField | undefined {
    return this.field(
      StringField,
      'pashto-title-romanized',
      'romanized-pashto-title',
    );
  }

  @Memoize() get pdf_degraded(): StringField | undefined {
    return this.field(StringField, 'pdf_degraded');
  }

  @Memoize() get pdf_module_version(): StringField | undefined {
    return this.field(StringField, 'pdf_module_version');
  }

  @Memoize() get pick(): NumberField | undefined {
    return this.field(NumberField, 'pick');
  }

  @Memoize() get podcastindexid(): NumberField | undefined {
    return this.field(NumberField, 'podcastindexid');
  }

  @Memoize() get post_text(): StringField | undefined {
    return this.field(StringField, 'post_text');
  }

  @Memoize() get ppi(): NumberField | undefined {
    return this.field(NumberField, 'ppi');
  }

  @Memoize() get previous_item(): StringField | undefined {
    return this.field(StringField, 'previous_item');
  }

  @Memoize() get program(): StringField | undefined {
    return this.field(StringField, 'program');
  }

  @Memoize() get publicdate(): DateField | undefined {
    return this.field(DateField, 'publicdate');
  }

  @Memoize() get publisher(): StringField | undefined {
    return this.field(StringField, 'publisher');
  }

  @Memoize() get political_religious_party(): StringField | undefined {
    return this.field(StringField, 'political-religious-party');
  }

  @Memoize() get rcs_key(): NumberField | undefined {
    return this.field(NumberField, 'rcs_key');
  }

  @Memoize() get repub_state(): NumberField | undefined {
    return this.field(NumberField, 'repub_state');
  }

  /** Compact `YYYYMMDD[HHMMSS]` timestamp. */
  @Memoize() get republisher_date(): DateField | undefined {
    return this.field(DateField, 'republisher_date');
  }

  /** One or more operators, semicolon-separated when there are several. */
  @Memoize() get republisher_operator(): StringListField | undefined {
    return this.field(StringListField, 'republisher_operator');
  }

  @Memoize() get republisher_time(): NumberField | undefined {
    return this.field(NumberField, 'republisher_time');
  }

  @Memoize() get reviewdate(): DateField | undefined {
    return this.field(DateField, 'reviewdate');
  }

  /**
   * Whether reviews may be added to this item. One of `true` (enabled),
   * `none` (disabled), or `frozen` (existing reviews shown, no new ones).
   * Absent for most items, which means reviews are enabled.
   */
  @Memoize() get reviews_allowed(): EnumField<ReviewsAllowed> | undefined {
    return mapField(
      this.rawMetadata,
      (raw) => new EnumField<ReviewsAllowed>(raw, reviewsAllowedParser),
      'reviews-allowed',
    );
  }

  @Memoize() get ribbon_state(): StringField | undefined {
    return this.field(StringField, 'ribbon_state');
  }

  @Memoize() get ribbon_state_modify_date(): DateField | undefined {
    return this.field(DateField, 'ribbon_state_modify_date');
  }

  @Memoize() get rights(): StringField | undefined {
    return this.field(StringField, 'rights');
  }

  @Memoize() get rights_holder(): StringField | undefined {
    return this.field(StringField, 'rights-holder', 'rights_holder');
  }

  @Memoize() get rssfeed(): StringField | undefined {
    return this.field(StringField, 'rssfeed');
  }

  @Memoize() get runtime(): DurationField | undefined {
    return this.field(DurationField, 'runtime');
  }

  @Memoize() get scan_time_minutes(): NumberField | undefined {
    return this.field(NumberField, 'scan_time_minutes');
  }

  /**
   * The scan/capture date. Parses compact `YYYYMMDD[HHMMSS]` timestamps in
   * addition to standard date strings.
   */
  @Memoize() get scandate(): DateField | undefined {
    return this.field(DateField, 'scandate');
  }

  /** Semicolon-separated fee components, e.g. `"300;10;200"`. */
  @Memoize() get scanfee(): NumberListField | undefined {
    return this.field(NumberListField, 'scanfee');
  }

  @Memoize() get scanner(): StringField | undefined {
    return this.field(StringField, 'scanner');
  }

  @Memoize() get scanner_operator(): StringField | undefined {
    return this.field(StringField, 'scanner_operator');
  }

  @Memoize() get scanningcenter(): StringField | undefined {
    return this.field(StringField, 'scanningcenter');
  }

  @Memoize() get scribe3_search_catalog(): StringField | undefined {
    return this.field(StringField, 'scribe3_search_catalog');
  }

  @Memoize() get scribe3_search_id(): StringField | undefined {
    return this.field(StringField, 'scribe3_search_id');
  }

  @Memoize() get segments(): StringField | undefined {
    return this.field(StringField, 'segments');
  }

  @Memoize() get sessionid(): StringField | undefined {
    return this.field(StringField, 'sessionid');
  }

  @Memoize() get shndiscs(): NumberField | undefined {
    return this.field(NumberField, 'shndiscs');
  }

  @Memoize() get shotlist(): StringField | undefined {
    return this.field(StringField, 'shotlist');
  }

  @Memoize() get signal_path(): StringField | undefined {
    return this.field(StringField, 'signal-path');
  }

  /** A byte count. */
  @Memoize() get size(): ByteField | undefined {
    return this.field(ByteField, 'size');
  }

  /** A byte count. */
  @Memoize() get sizehint(): ByteField | undefined {
    return this.field(ByteField, 'sizehint');
  }

  @Memoize() get software_version(): StringField | undefined {
    return this.field(StringField, 'software_version');
  }

  @Memoize() get sort_order(): StringField | undefined {
    return this.field(StringField, 'sort_order');
  }

  @Memoize() get sound(): EnumField<Sound> | undefined {
    return mapField(
      this.rawMetadata,
      (raw) => new EnumField<Sound>(raw, soundParser),
      'sound',
    );
  }

  @Memoize() get soundcreator(): StringField | undefined {
    return this.field(StringField, 'soundcreator');
  }

  @Memoize() get soundtitle(): StringField | undefined {
    return this.field(StringField, 'soundtitle');
  }

  @Memoize() get source(): StringField | undefined {
    return this.field(StringField, 'source');
  }

  @Memoize() get source_pixel_height(): NumberField | undefined {
    return this.field(NumberField, 'source_pixel_height');
  }

  @Memoize() get source_pixel_width(): NumberField | undefined {
    return this.field(NumberField, 'source_pixel_width');
  }

  @Memoize() get source_url(): StringField | undefined {
    return this.field(StringField, 'source_url');
  }

  @Memoize() get sponsor(): StringField | undefined {
    return this.field(StringField, 'sponsor');
  }

  /** Compact `YYYYMMDD[HHMMSS]` timestamp. */
  @Memoize() get sponsordate(): DateField | undefined {
    return this.field(DateField, 'sponsordate');
  }

  @Memoize() get start_localtime(): DateField | undefined {
    return this.field(DateField, 'start_localtime');
  }

  @Memoize() get start_time(): DateField | undefined {
    return this.field(DateField, 'start_time');
  }

  @Memoize() get station_name(): StringField | undefined {
    return this.field(StringField, 'station_name');
  }

  @Memoize() get stop_time(): DateField | undefined {
    return this.field(DateField, 'stop_time');
  }

  @Memoize() get subject(): StringListField | undefined {
    return this.field(StringListField, 'subject');
  }

  @Memoize() get taper(): StringField | undefined {
    return this.field(StringField, 'taper');
  }

  @Memoize() get thumbs(): NumberListField | undefined {
    return this.field(NumberListField, 'thumbs');
  }

  @Memoize() get times(): NumberListField | undefined {
    return this.field(NumberListField, 'times');
  }

  @Memoize() get title(): StringField | undefined {
    return this.field(StringField, 'title');
  }

  @Memoize() get title_alt_script(): StringField | undefined {
    return this.field(StringField, 'title-alt-script');
  }

  @Memoize() get transferer(): StringField | undefined {
    return this.field(StringField, 'transferer');
  }

  @Memoize() get track(): NumberField | undefined {
    return this.field(NumberField, 'track');
  }

  @Memoize() get tts_version(): StringField | undefined {
    return this.field(StringField, 'tts_version');
  }

  /**
   * The capture tuner setting. Parses the `"Channel <n> (<freq> MHz)"` form
   * into channel and frequency; other formats expose only the raw value.
   */
  @Memoize() get tuner(): TunerField | undefined {
    return this.field(TunerField, 'tuner');
  }

  @Memoize() get type(): StringField | undefined {
    return this.field(StringField, 'type');
  }

  @Memoize() get updatedate(): DateField | undefined {
    return this.field(DateField, 'updatedate');
  }

  /** Repeatable, so it arrives as an array of account names. */
  @Memoize() get updater(): StringField | undefined {
    return this.field(StringField, 'updater');
  }

  @Memoize() get uploader(): StringField | undefined {
    return this.field(StringField, 'uploader');
  }

  @Memoize() get uploadsoftware(): StringField | undefined {
    return this.field(StringField, 'uploadsoftware');
  }

  /**
   * The UTC offset encoded as `±HHMM` (e.g. `"-800"`), parsed into hours,
   * minutes, and total signed minutes.
   */
  @Memoize() get utc_offset(): UtcOffsetField | undefined {
    return this.field(UtcOffsetField, 'utc_offset');
  }

  @Memoize() get venue(): StringField | undefined {
    return this.field(StringField, 'venue');
  }

  @Memoize() get video_codec(): StringField | undefined {
    return this.field(StringField, 'video_codec');
  }

  @Memoize() get volume(): StringField | undefined {
    return this.field(StringField, 'volume');
  }

  @Memoize() get website(): StringField | undefined {
    return this.field(StringField, 'website');
  }

  /**
   * The number of downloads in the last week
   *
   * @type {NumberField}
   * @memberof Metadata
   */
  @Memoize() get week(): NumberField | undefined {
    return this.field(NumberField, 'week');
  }

  @Memoize() get width(): NumberField | undefined {
    return this.field(NumberField, 'width');
  }

  @Memoize() get year(): NumberField | undefined {
    return this.field(NumberField, 'year');
  }

  /**
   * Builds a field from the first of `keys` whose raw value is present,
   * or `undefined` if none are set. Later keys act as fallbacks, for fields
   * that arrive under more than one name.
   *
   * For fields whose class needs more than the raw value (e.g. an `EnumField`
   * needs its parser), call {@link mapField} directly with a factory.
   *
   * @param Ctor A field class taking a single raw value (`DateField`, `StringField`, etc.)
   * @param keys The raw metadata key(s) to read, in priority order
   */
  private field<F>(
    Ctor: new (raw: MetadataRawValue) => F,
    ...keys: string[]
  ): F | undefined {
    return mapField(this.rawMetadata, (raw) => new Ctor(raw), ...keys);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(json: Record<string, any> = {}) {
    this.rawMetadata = json;
  }
}
