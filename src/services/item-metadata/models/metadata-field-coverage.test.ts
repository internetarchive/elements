import { describe, it, expect } from 'vitest';

import { Metadata } from './metadata';
import type { MetadataRawValue } from './metadata-fields/metadata-field';

/**
 * A representative raw value per field, taken from live archive.org responses.
 */
const RAW: Record<string, MetadataRawValue> = {
  identifier: 'foo',
  access: 'http://archive.org/details/TIKTOK-20200420085040-crawl109',
  adder: 'udski',
  'amrc-id': 'SB_R2_BA_E13',
  'archiveit-account-id': '1028',
  'archiveit-account-organization-name': 'Mark Graham',
  'archiveit-collection-id': '10363',
  'archiveit-collection-name': 'Palestine',
  'archiveit-job-type': 'DAILY',
  audit_time_minutes: '57',
  auditor: 'associate-jobert-apor@archive.org',
  author: 'Amy McClung',
  autocrop_version: '0.0.18_books-serials-20230720-0.3',
  bookplateleaf: '0002',
  'bookreader-defaults': 'mode/1up',
  boxid: 'IA41732615',
  camera: 'Canon EOS 5D Mark II',
  canister: 'IA1661830-17',
  'case-name': 'Carlson v. Apfel',
  col_number: 'COL-2833',
  collection_added: [
    'ArchiveIt-Partner-2517',
    'archiveitpartners',
    'archiveitdigitalcollection',
  ],
  'collection-library': 'SF - JFA',
  collection_set: 'Guatemala',
  court: 'gasb',
  crawler: 'Heritrix',
  crawljob: 'tiktok',
  curation:
    '[curator]validator@archive.org[/curator][date]20201123141634[/date][comment]checked for malware[/comment]',
  'dari-title': 'یک مجاهد سر مجاهد دیگر را می شوید.',
  'dari-title-romanized': "Yak Mujāhid  sar-'i Muj-'i digar-'i rā mishuyand.",
  'date-case-filed': '2000-08-23',
  'date-case-terminated': '2004-09-24',
  date_created: '2007-06-03',
  'date-last-filing': '2004-09-24',
  derive_submittime: '2025-12-08 17:47:58',
  derive_version: '0.0.23',
  discs: '2',
  'docket-num': '0:00-cv-02000',
  external_metadata_update: '2019-03-31T22:24:03Z',
  filesxml: 'Wed Mar 23 3:18:56 UTC 2011',
  firstfiledate: '20201012200902',
  firstfileserial: '00121',
  foldoutcount: '0',
  format: 'image2 sequence',
  geo_restricted: 'GB',
  guid: 'ee03a446-a1a3-4aa4-844b-a9c334c8923f',
  has_mp3: '0',
  height: '191',
  hidden: 'true',
  ia_orig__runtime: '1.8 Hours',
  'identifier-ark': 'ark:/13960/t1bk6nd8d',
  'identifier-bib': 'RD9788',
  image_count: '218',
  invoice: '110',
  issue_count: '12',
  issue_page_count: '2147',
  lastdate: '20200420030115',
  lastfiledate: '20201012220521',
  lastfileserial: '00121',
  license: 'https://creativecommons.org/licenses/by/4.0/legalcode',
  mature_content: 'No',
  md5: '0fc23e3f0fb2e6f720a35995909a95ed',
  md5s: '1ddf028fde2ee3bdbc220ddea709aeab *Drunken Hearts 2012-06-02flac16.md5\nce5725decb7633fbb666d8bd457c2a60 *Guster2003-07-02d1t007.shn',
  medium: '35mmb/wnegative',
  metadata_operator: 'associate-jercyl-tradio@archive.org',
  metasource_catalog: 'openlibrary',
  monochromatic: 'No',
  noarchivetorrent: 'true',
  numwarcs: '1',
  ocr: 'ABBYY FineReader 11.0',
  ocr_autonomous: 'true',
  ocr_detected_lang: 'es',
  ocr_detected_lang_conf: '1.0000',
  ocr_detected_script: 'Latin',
  ocr_detected_script_conf: '1.0000',
  ocr_invalid_language: 'spa ',
  ocr_module_version: '0.0.18',
  ocr_parameters: '-l spa',
  old_pallet: 'IA-CB-1200533',
  operator: 'wbmcrawl@archive.org',
  originalurl: 'https://www.tiktok.com/@boofheadd/video/6840405398386707718',
  osf_category: 'project',
  osf_project: 'https://api.osf.io/v2/nodes/59pnx/?version=2.20',
  osf_registration_doi: '10.17605/OSF.IO/4V568',
  osf_registration_schema: 'Open-Ended Registration',
  osf_registry: 'OSF Registries',
  osf_subjects: ['Engineering', 'Medicine and Health Sciences'],
  osf_tags: ['caregivers', 'intellectual disability'],
  output_time_minutes: '15',
  'pacer-case-num': '2874',
  packaging_time_minutes: '67',
  page_number_confidence: '100',
  page_number_module_version: '1.0.5',
  parse_date: '2025-08-22T00:41:08Z',
  parse_state: 'done',
  'pashto-title': 'یو مجاهد د بل مجاهد سر وینځی.',
  'pashto-title-romanized': 'Yaw Mujāhid da bal Muj sar winżi.',
  pdf_degraded: 'invalid-jp2-headers',
  pdf_module_version: '0.0.20',
  pick: '0',
  podcastindexid: '745165',
  rcs_key: '25493',
  repub_state: '4',
  republisher_date: '20221122115720',
  republisher_operator: 'lvmdigitalizacion@ufm.edu',
  republisher_time: '414',
  ribbon_state: 'upload_complete',
  ribbon_state_modify_date: '2025-08-21 18:44:14',
  rssfeed: 'https://anchor.fm/s/2e33d690/podcast/rss',
  scan_time_minutes: '21',
  scanfee: '300;10;200',
  scanner_operator: 'markriel-dingcong',
  scribe3_search_catalog: 'bwb',
  scribe3_search_id: 'S0-BUY-474',
  sessionid: '3x6uynpaisghfzl-',
  shndiscs: '1',
  'signal-path': 'WorkStation2',
  size: '555',
  sizehint: '1001937261',
  software_version: 'nextStar 4.5.0.20626',
  sort_order: 'members',
  soundcreator: 'Rasheeda',
  soundtitle: 'Marry Me (feat. Toya Wright)',
  source_url: 'https://www.courtlistener.com/docket/7934691/todd-metcalf/',
  sponsordate: '20221130',
  tts_version: '5.3-initial-170-ga5e5737d',
  updatedate: ['2011-07-17 18:38:45', '2011-07-27 03:47:01'],
  updater: ['EunisLymn', 'EunisLymn'],
  uploadsoftware: 'LifePod-Beta',
  website: 'http://www.merseysideskeptics.org.uk/',
  width: '191',
};

/**
 * Each getter paired with the raw key it must read. Many keys are hyphenated
 * while their getter is underscored, so this pins the exact spelling of every
 * one. A getter that reads a key the API never sends is silently always
 * undefined, which nothing else here would catch.
 */
const GETTER_KEYS: [string, string][] = [
  ['access', 'access'],
  ['adder', 'adder'],
  ['amrc_id', 'amrc-id'],
  ['archiveit_account_id', 'archiveit-account-id'],
  [
    'archiveit_account_organization_name',
    'archiveit-account-organization-name',
  ],
  ['archiveit_collection_id', 'archiveit-collection-id'],
  ['archiveit_collection_name', 'archiveit-collection-name'],
  ['archiveit_job_type', 'archiveit-job-type'],
  ['audit_time_minutes', 'audit_time_minutes'],
  ['auditor', 'auditor'],
  ['author', 'author'],
  ['autocrop_version', 'autocrop_version'],
  ['bookplateleaf', 'bookplateleaf'],
  ['bookreader_defaults', 'bookreader-defaults'],
  ['boxid', 'boxid'],
  ['camera', 'camera'],
  ['canister', 'canister'],
  ['case_name', 'case-name'],
  ['col_number', 'col_number'],
  ['collection_added', 'collection_added'],
  ['collection_library', 'collection-library'],
  ['collection_set', 'collection_set'],
  ['court', 'court'],
  ['crawler', 'crawler'],
  ['crawljob', 'crawljob'],
  ['curation', 'curation'],
  ['dari_title', 'dari-title'],
  ['dari_title_romanized', 'dari-title-romanized'],
  ['date_case_filed', 'date-case-filed'],
  ['date_case_terminated', 'date-case-terminated'],
  ['date_created', 'date_created'],
  ['date_last_filing', 'date-last-filing'],
  ['derive_submittime', 'derive_submittime'],
  ['derive_version', 'derive_version'],
  ['discs', 'discs'],
  ['docket_num', 'docket-num'],
  ['external_metadata_update', 'external_metadata_update'],
  ['filesxml', 'filesxml'],
  ['firstfiledate', 'firstfiledate'],
  ['firstfileserial', 'firstfileserial'],
  ['foldoutcount', 'foldoutcount'],
  ['format', 'format'],
  ['geo_restricted', 'geo_restricted'],
  ['guid', 'guid'],
  ['has_mp3', 'has_mp3'],
  ['height', 'height'],
  ['hidden', 'hidden'],
  ['ia_orig__runtime', 'ia_orig__runtime'],
  ['identifier_ark', 'identifier-ark'],
  ['identifier_bib', 'identifier-bib'],
  ['image_count', 'image_count'],
  ['invoice', 'invoice'],
  ['issue_count', 'issue_count'],
  ['issue_page_count', 'issue_page_count'],
  ['lastdate', 'lastdate'],
  ['lastfiledate', 'lastfiledate'],
  ['lastfileserial', 'lastfileserial'],
  ['license', 'license'],
  ['mature_content', 'mature_content'],
  ['md5', 'md5'],
  ['md5s', 'md5s'],
  ['medium', 'medium'],
  ['metadata_operator', 'metadata_operator'],
  ['metasource_catalog', 'metasource_catalog'],
  ['monochromatic', 'monochromatic'],
  ['noarchivetorrent', 'noarchivetorrent'],
  ['numwarcs', 'numwarcs'],
  ['ocr', 'ocr'],
  ['ocr_autonomous', 'ocr_autonomous'],
  ['ocr_detected_lang', 'ocr_detected_lang'],
  ['ocr_detected_lang_conf', 'ocr_detected_lang_conf'],
  ['ocr_detected_script', 'ocr_detected_script'],
  ['ocr_detected_script_conf', 'ocr_detected_script_conf'],
  ['ocr_invalid_language', 'ocr_invalid_language'],
  ['ocr_module_version', 'ocr_module_version'],
  ['ocr_parameters', 'ocr_parameters'],
  ['old_pallet', 'old_pallet'],
  ['operator', 'operator'],
  ['originalurl', 'originalurl'],
  ['osf_category', 'osf_category'],
  ['osf_project', 'osf_project'],
  ['osf_registration_doi', 'osf_registration_doi'],
  ['osf_registration_schema', 'osf_registration_schema'],
  ['osf_registry', 'osf_registry'],
  ['osf_subjects', 'osf_subjects'],
  ['osf_tags', 'osf_tags'],
  ['output_time_minutes', 'output_time_minutes'],
  ['pacer_case_num', 'pacer-case-num'],
  ['packaging_time_minutes', 'packaging_time_minutes'],
  ['page_number_confidence', 'page_number_confidence'],
  ['page_number_module_version', 'page_number_module_version'],
  ['parse_date', 'parse_date'],
  ['parse_state', 'parse_state'],
  ['pashto_title', 'pashto-title'],
  ['pashto_title_romanized', 'pashto-title-romanized'],
  ['pdf_degraded', 'pdf_degraded'],
  ['pdf_module_version', 'pdf_module_version'],
  ['pick', 'pick'],
  ['podcastindexid', 'podcastindexid'],
  ['rcs_key', 'rcs_key'],
  ['repub_state', 'repub_state'],
  ['republisher_date', 'republisher_date'],
  ['republisher_operator', 'republisher_operator'],
  ['republisher_time', 'republisher_time'],
  ['ribbon_state', 'ribbon_state'],
  ['ribbon_state_modify_date', 'ribbon_state_modify_date'],
  ['rssfeed', 'rssfeed'],
  ['scan_time_minutes', 'scan_time_minutes'],
  ['scanfee', 'scanfee'],
  ['scanner_operator', 'scanner_operator'],
  ['scribe3_search_catalog', 'scribe3_search_catalog'],
  ['scribe3_search_id', 'scribe3_search_id'],
  ['sessionid', 'sessionid'],
  ['shndiscs', 'shndiscs'],
  ['signal_path', 'signal-path'],
  ['size', 'size'],
  ['sizehint', 'sizehint'],
  ['software_version', 'software_version'],
  ['sort_order', 'sort_order'],
  ['soundcreator', 'soundcreator'],
  ['soundtitle', 'soundtitle'],
  ['source_url', 'source_url'],
  ['sponsordate', 'sponsordate'],
  ['tts_version', 'tts_version'],
  ['updatedate', 'updatedate'],
  ['updater', 'updater'],
  ['uploadsoftware', 'uploadsoftware'],
  ['website', 'website'],
  ['width', 'width'],
];

describe('Metadata raw key coverage', () => {
  const metadata = new Metadata(RAW) as unknown as Record<
    string,
    { rawValue: MetadataRawValue } | undefined
  >;

  it.each(GETTER_KEYS)('%s reads the %s key', (getter, rawKey) => {
    const field = metadata[getter];
    expect(field, `${getter} should be populated`).to.not.be.undefined;
    expect(field?.rawValue).to.deep.equal(RAW[rawKey]);
  });

  it('leaves every one of them undefined when the response is empty', () => {
    const empty = new Metadata({ identifier: 'foo' }) as unknown as Record<
      string,
      unknown
    >;
    for (const [getter] of GETTER_KEYS) {
      expect(empty[getter], `${getter} should be undefined`).to.be.undefined;
    }
  });
});

describe('Metadata field parsing', () => {
  it('parses compact timestamps into dates', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      firstfiledate: '20201012200902',
      sponsordate: '20221130',
    });

    // A compact timestamp carries no zone, so it parses as local time and the
    // expectation is built the same way to stay runner-independent.
    expect(metadata.firstfiledate?.value?.getTime()).to.equal(
      new Date(2020, 9, 12, 20, 9, 2).getTime(),
    );
    expect(metadata.sponsordate?.value?.getTime()).to.equal(
      new Date(2022, 10, 30).getTime(),
    );
  });

  it('parses yes/no values into booleans', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      mature_content: 'No',
      monochromatic: 'Yes',
    });
    expect(metadata.mature_content?.value).to.equal(false);
    expect(metadata.monochromatic?.value).to.equal(true);
    expect(metadata.mature_content?.rawValue).to.equal('No');
  });

  it('parses hidden and noarchivetorrent into booleans', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      hidden: 'true',
      noarchivetorrent: 'false',
    });
    expect(metadata.hidden?.value).to.equal(true);
    expect(metadata.noarchivetorrent?.value).to.equal(false);
  });

  it('parses the 0/1 has_mp3 flag into a boolean', () => {
    expect(
      new Metadata({ identifier: 'foo', has_mp3: '0' }).has_mp3?.value,
    ).to.equal(false);

    const set = new Metadata({ identifier: 'foo', has_mp3: '1' });
    expect(set.has_mp3?.value).to.equal(true);
    expect(set.has_mp3?.rawValue).to.equal('1');
  });

  it('parses byte counts', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      sizehint: '1001937261',
    });
    expect(metadata.sizehint?.value).to.equal(1001937261);
  });

  it('exposes every value of a repeatable field', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      collection_added: ['archiveitpartners', 'archiveitdigitalcollection'],
      updatedate: ['2011-07-17 18:38:45', '2011-07-27 03:47:00'],
    });
    expect(metadata.collection_added?.values).to.deep.equal([
      'archiveitpartners',
      'archiveitdigitalcollection',
    ]);
    expect(metadata.collection_added?.value).to.equal('archiveitpartners');
    expect(metadata.updatedate?.values.length).to.equal(2);
    // no zone on either timestamp, so both sides are local time
    expect(metadata.updatedate?.value?.getTime()).to.equal(
      new Date(2011, 6, 17, 18, 38, 45).getTime(),
    );
  });

  it('reads the hyphenated keys the API returns', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      'identifier-ark': 'ark:/13960/t1bk6nd8d',
      'bookreader-defaults': 'mode/1up',
      'archiveit-collection-id': '10363',
      'date-case-filed': '2000-08-23',
    });
    expect(metadata.identifier_ark?.value).to.equal('ark:/13960/t1bk6nd8d');
    expect(metadata.bookreader_defaults?.value).to.equal('mode/1up');
    expect(metadata.archiveit_collection_id?.value).to.equal(10363);
    // the point here is that the hyphenated key is read at all, so assert the
    // raw value rather than an instant that depends on the runner's zone
    expect(metadata.date_case_filed?.rawValue).to.equal('2000-08-23');
    expect(metadata.date_case_filed?.value).to.be.instanceOf(Date);
  });

  it('parses the curation note into its parts', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      curation:
        '[curator]validator@archive.org[/curator][date]20201123141634[/date][comment]checked for malware[/comment]',
    });
    expect(metadata.curation?.value?.curator).to.equal('validator@archive.org');
    expect(metadata.curation?.value?.comment).to.equal('checked for malware');
    expect(metadata.curation?.value?.date?.getTime()).to.equal(
      new Date(2020, 10, 23, 14, 16, 34).getTime(),
    );
  });

  it('parses md5s into a file and digest per entry', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      md5s:
        '6a78e6865622bd85f43c7ae0c392feed *first.flac\n' +
        'second.flac:eecaebe7289ed7b05d19024f31249f89',
    });
    expect(metadata.md5s?.values).to.deep.equal([
      { file: 'first.flac', md5: '6a78e6865622bd85f43c7ae0c392feed' },
      { file: 'second.flac', md5: 'eecaebe7289ed7b05d19024f31249f89' },
    ]);
  });

  it('splits the semicolon-separated fee and operator fields', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      scanfee: '300;10;200',
      republisher_operator: 'a@archive.org;b@archive.org',
    });
    expect(metadata.scanfee?.values).to.deep.equal([300, 10, 200]);
    expect(metadata.republisher_operator?.values).to.deep.equal([
      'a@archive.org',
      'b@archive.org',
    ]);
  });

  it('takes a repeatable field as a single undelimited value too', () => {
    // the API sends one collection name rather than an array for some items
    const metadata = new Metadata({
      identifier: 'foo',
      collection_added: 'etree',
      updater: 'Brad Leblanc',
    });
    expect(metadata.collection_added?.values).to.deep.equal(['etree']);
    // a name with a space must not be split apart
    expect(metadata.updater?.values).to.deep.equal(['Brad Leblanc']);
  });

  it('parses bookreader-defaults against its documented values', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      'bookreader-defaults': 'mode/2up',
    });
    expect(metadata.bookreader_defaults?.value).to.equal('mode/2up');

    const unknown = new Metadata({
      identifier: 'foo',
      'bookreader-defaults': 'mode/sideways',
    });
    expect(unknown.bookreader_defaults?.value).to.be.undefined;
    expect(unknown.bookreader_defaults?.rawValue).to.equal('mode/sideways');
  });

  it('reads the romanized titles under either key ordering', () => {
    const suffixed = new Metadata({
      identifier: 'foo',
      'dari-title-romanized': 'a',
      'pashto-title-romanized': 'b',
    });
    expect(suffixed.dari_title_romanized?.value).to.equal('a');
    expect(suffixed.pashto_title_romanized?.value).to.equal('b');

    const prefixed = new Metadata({
      identifier: 'foo',
      'dari-romanized-title': 'c',
      'romanized-pashto-title': 'd',
    });
    expect(prefixed.dari_title_romanized?.value).to.equal('c');
    expect(prefixed.pashto_title_romanized?.value).to.equal('d');
  });

  it('parses md5contents like md5s', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      md5contents: '05f73115fdbc4de9fa8d60a4db686a56 *ulu2004-05-15t02.flac',
    });
    expect(metadata.md5contents?.value).to.deep.equal({
      file: 'ulu2004-05-15t02.flac',
      md5: '05f73115fdbc4de9fa8d60a4db686a56',
    });
  });

  it('parses the files.xml timestamp', () => {
    const metadata = new Metadata({
      identifier: 'foo',
      filesxml: 'Wed Mar 23 3:18:56 UTC 2011',
    });
    expect(metadata.filesxml?.value?.getTime()).to.equal(
      Date.UTC(2011, 2, 23, 3, 18, 56),
    );
  });

  it('keeps the raw value when a number has leading zeros', () => {
    const metadata = new Metadata({ identifier: 'foo', bookplateleaf: '0002' });
    expect(metadata.bookplateleaf?.value).to.equal(2);
    expect(metadata.bookplateleaf?.rawValue).to.equal('0002');
  });
});
