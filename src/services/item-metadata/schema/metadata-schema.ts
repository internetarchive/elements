/**
 * What kind of value a metadata field holds. `checkMetadataValue` checks
 * values against their field's type.
 */
export type MetadataValueType =
  /** Free text */
  | 'text'
  /** Free text with no HTML, e.g. `title` */
  | 'plain-text'
  /** Text that may contain HTML, e.g. `description` */
  | 'html'
  /**
   * A date. Any text is accepted; see `isRecommendedDateFormat` for the
   * formats the schema recommends
   */
  | 'date'
  /** A date and time, as YYYY-MM-DD HH:MM:SS or YYYY-MM-DD */
  | 'datetime'
  /** A compact timestamp, as YYYYMMDDHHMMSS */
  | 'timestamp'
  /** A four-digit year */
  | 'year'
  | 'integer'
  | 'number'
  /** `"true"` */
  | 'boolean'
  | 'url'
  | 'email'
  /** An archive.org item identifier */
  | 'identifier'
  | 'isbn'
  | 'issn'
  /** A duration: HH:MM:SS, H:MM:SS, MM:SS, M:SS or 0:SS */
  | 'runtime'
  /** Width to height, like 16:9 */
  | 'aspect-ratio'
  | 'openlibrary-edition'
  | 'openlibrary-work'
  | 'openlibrary-author'
  /** An Archival Resource Key, like ark:/13960/t53f4ms96 */
  | 'ark';

/**
 * Who may set a field, from the schema's "edit access": anyone who can edit
 * the item (including its uploader), archive.org admins only, or no one (the
 * system sets it and it isn't editable).
 */
export type MetadataFieldAccess = 'user' | 'admin' | 'system';

export type MetadataFieldSchema = {
  type: MetadataValueType;
  /** Whether the field may hold more than one value */
  repeatable: boolean;
  access: MetadataFieldAccess;
  /**
   * Values the schema lists for the field. When `closed`, no other value is
   * valid; otherwise these are the common ones and anything else is allowed.
   * Matched case-insensitively.
   */
  values?: { options: readonly string[]; closed: boolean };
  /** The schema discourages new use of the field */
  deprecated?: boolean;
};

const conditions = [
  'Mint',
  'Near Mint',
  'Very Good',
  'Good',
  'Fair',
  'Worn',
  'Poor',
  'Fragile',
  'Incomplete',
] as const;

const user = (
  type: MetadataValueType,
  repeatable = false,
  extra: Partial<MetadataFieldSchema> = {},
): MetadataFieldSchema => ({ type, repeatable, access: 'user', ...extra });

const admin = (
  type: MetadataValueType,
  repeatable = false,
  extra: Partial<MetadataFieldSchema> = {},
): MetadataFieldSchema => ({ type, repeatable, access: 'admin', ...extra });

const system = (
  type: MetadataValueType,
  repeatable = false,
): MetadataFieldSchema => ({ type, repeatable, access: 'system' });

const closed = (options: readonly string[]) => ({
  values: { options, closed: true },
});

const common = (options: readonly string[]) => ({
  values: { options, closed: false },
});

/**
 * The item-level metadata fields documented in the archive.org metadata
 * schema: https://archive.org/developers/metadata-schema/
 *
 * Keys not listed here are custom fields. They're allowed, and treated as
 * user-editable text unless `fieldSchema` says otherwise.
 */
export const metadataSchema: Readonly<Record<string, MetadataFieldSchema>> =
  Object.freeze({
    // Public fields
    adaptive_ocr: user('boolean'),
    addeddate: system('datetime'),
    aspect_ratio: user('aspect-ratio'),
    audio_codec: admin('text'),
    audio_sample_rate: admin('integer'),
    betterpdf: user('boolean'),
    'bookreader-defaults': user(
      'text',
      false,
      closed(['mode/1up', 'mode/2up', 'mode/thumb']),
    ),
    bwocr: user('text'),
    call_number: user('text'),
    camera: admin('text'),
    ccnum: user('text'),
    closed_captioning: user('text', false, closed(['yes', 'no'])),
    collection: admin('identifier', true),
    color: user('text', false, common(['color', 'B&W'])),
    condition: user('text', false, closed(conditions)),
    'condition-visual': user(
      'text',
      false,
      closed([...conditions, 'None', 'Unknown']),
    ),
    contributor: user('text'),
    coverage: user('text', true),
    creator: user('text', true),
    'creator-alt-script': user('text'),
    date: user('date'),
    description: user('html', true),
    // Usually a URN (urn:namespace:identifier), but the schema allows any string
    'external-identifier': user('text', true),
    firstfiledate: user('timestamp'),
    'fixed-ppi': user('number'),
    frames_per_second: user('number'),
    identifier: admin('identifier'),
    'identifier-ark': user('ark'),
    'identifier-bib': user('text', true),
    isbn: user('isbn', true),
    issn: user('issn', true),
    language: user('text', true),
    lastfiledate: user('timestamp'),
    lccn: user('integer', true),
    licenseurl: user('url'),
    'marc-insert-only': admin('boolean'),
    mediatype: admin(
      'text',
      false,
      closed([
        'texts',
        'etree',
        'audio',
        'movies',
        'software',
        'image',
        'data',
        'web',
        'collection',
        'account',
      ]),
    ),
    notes: user('html', true),
    'oclc-id': user('text', true),
    openlibrary: user('openlibrary-edition', false, { deprecated: true }),
    openlibrary_author: user('openlibrary-author', true),
    openlibrary_edition: user('openlibrary-edition'),
    openlibrary_subject: user('text', true),
    openlibrary_work: user('openlibrary-work'),
    'page-progression': user('text', false, closed(['lr', 'rl'])),
    'possible-copyright-status': user('text'),
    ppi: user('integer'),
    publisher: user('text'),
    related_collection: admin('identifier'),
    'related-external-id': user('text', true),
    rights: user('html'),
    runtime: user('runtime', true),
    scandate: user('text'),
    scanner: user('text'),
    size: user('number', true),
    'sort-by': admin(
      'text',
      false,
      closed(
        [
          'addeddate',
          'creatorSorter',
          'date',
          'downloads',
          'publicdate',
          'reviewdate',
          'titleSorter',
        ].flatMap((key) => [key, `-${key}`]),
      ),
    ),
    sound: user('text', false, common(['sound', 'silent'])),
    source: user('text'),
    sponsor: user('text'),
    subject: user('text', true),
    summary: admin('html'),
    title: user('plain-text'),
    'title-alt-script': user('text'),
    volume: user('text'),
    year: user('year', false, { deprecated: true }),

    // Internal fields
    'access-restricted': admin('boolean'),
    'access-restricted-item': admin('boolean'),
    'admin-collection': admin('boolean'),
    boxid: admin('text', true),
    curation: admin('text'),
    foldoutcount: admin('integer'),
    'force-update': user('boolean'),
    geo_restricted: admin('text'),
    hidden: admin('boolean'),
    imagecount: system('integer'),
    neverindex: admin('boolean'),
    next_item: admin('identifier'),
    no_ol_import: admin('boolean'),
    noindex: user('boolean'),
    ocr: admin('text'),
    operator: admin('email'),
    previous_item: admin('identifier'),
    'public-format': admin('text', true),
    publicdate: system('datetime'),
    repub_state: admin('integer'),
    republisher: admin('email', false, { deprecated: true }),
    republisher_date: admin('timestamp'),
    republisher_operator: admin('email'),
    republisher_time: system('integer'),
    scanfee: admin('text'),
    scanningcenter: admin('text'),
    show_related_music_by_track: admin('boolean'),
    source_pixel_height: admin('integer'),
    source_pixel_width: admin('integer'),
    sponsordate: admin('text'),
    start_localtime: admin('datetime'),
    start_time: admin('datetime'),
    stop_time: admin('datetime'),
    title_message: admin('text'),
    tuner: admin('text'),
    updated: system('text', true),
    updatedate: system('datetime', true),
    updater: system('text', true),
    uploader: admin('email'),
    utc_offset: admin('integer'),
    video_codec: admin('text'),
    viruscheck: admin('boolean'),
  });

/**
 * Key prefixes the OCR, republishing and TTS pipelines write. The schema
 * doesn't list every key in these families, but none are user-set.
 */
const systemKeyPrefixes = ['ocr_', 'republisher_', 'tts_'];

/**
 * The schema for a metadata key. Documented keys return their entry; keys
 * in a pipeline-written family are system fields; any other key is a custom
 * field, which users may set as free text.
 */
export function fieldSchema(key: string): MetadataFieldSchema {
  // Own keys only, so `constructor` and friends read as custom fields
  if (Object.prototype.hasOwnProperty.call(metadataSchema, key)) {
    return metadataSchema[key];
  }
  if (systemKeyPrefixes.some((prefix) => key.startsWith(prefix))) {
    return system('text');
  }
  return user('text', true);
}

/** Whether the item's editors may set a key, rather than admins or the system */
export function isUserEditableField(key: string): boolean {
  return fieldSchema(key).access === 'user';
}
