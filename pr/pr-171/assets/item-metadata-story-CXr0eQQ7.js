import{i as pe,A as ue,b as k,a as ce,r as A,c as he}from"./index-DeiS5TB1.js";import{N as w,B as Z,D as ee,b as te,a as D,S as re}from"./service-template-BEFaBBOX.js";import"./theme-styles-BDGxX9an.js";class ie{constructor(i,s){this.separators=[";",","],this.parser=i,s&&s.separators&&(this.separators=s.separators)}parseValue(i){const s=String(i);let l=[];for(const n of this.separators)if(l=s.split(n),l.length>1)break;return this.parseListValues(l)}parseListValues(i){const l=i.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),n=[];return l.forEach(d=>{d!==void 0&&n.push(d)}),n}}const fe=`import { Memoize } from 'typescript-memoize';
import type { FieldParserInterface } from '../../../field-parsers/field-parsers';

/**
 * The MetadataRawValue is all of the possible raw types we can get for a field.
 *
 * This allows the parsers to know if they can handle the raw value or not and
 * how to handle it if they can.
 */
export type MetadataRawValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[];

export interface MetadataFieldInterface<T> {
  /**
   * The raw value received from the API response
   *
   * @type {MetadataRawValue}
   * @memberof MetadataField
   */
  readonly rawValue: Readonly<MetadataRawValue>;

  /**
   * The first value if there are multiple or the only value if there is one
   *
   * @readonly
   * @type {(T | undefined)}
   * @memberof MetadataField
   */
  value?: T;

  /**
   * The array of all values for the field.
   *
   * Many fields only contain a single value and
   * can be accessed via the \`.value\` getter
   *
   * @type {T[]}
   * @memberof MetadataField
   */
  values: T[];
}

/**
 * The MetadataField is responsible for three things:
 * 1. Take in some raw data (strings, arrays, numbers, etc)
 * 2. Normalize the input to an array of the input,
 *    ie. [string, string], [number, number], [Date, Date], etc
 * 3. Cast the values to their expected \`Type\`
 *
 * This class gets instiated with a \`Type\` and a parser of that type. For instance, the
 * \`DateField\` is a subclass of \`MetadataField\` with a \`Type\` of \`Date\` and a \`DateParser\`.
 *
 * When using a \`DateField\`, you can pass it a string date and it will cast it to a javascript Date,
 * ie:
 *
 * \`\`\`
 * const dateField = new DateField('2020-02-13')
 * dateField.value = Date(2020-02-13) // native javascript Date object
 * dateField.values = [Date(2020-02-13)] // the normalized array of values
 * dateField.rawValue = '2020-02-13' // the raw string that was passed in
 * \`\`\`
 *
 * @class MetadataField
 * @template Type The type of metadata this is (string, number, Date, etc)
 * @template FieldParserInterfaceType The parser for that type (StringParser, NumberParser, etc)
 */
export class MetadataField<
  Type,
  FieldParserInterfaceType extends FieldParserInterface<Type | Type[]>,
> implements MetadataFieldInterface<Type>
{
  /** @inheritdoc */
  readonly rawValue: Readonly<MetadataRawValue>;

  /** @inheritdoc */
  @Memoize() get values(): Type[] {
    const values = this.parseRawValue();
    return values;
  }

  /** @inheritdoc */
  @Memoize() get value(): Type | undefined {
    return this.values[0];
  }

  constructor(parser: FieldParserInterfaceType, rawValue: MetadataRawValue) {
    this.parser = parser;
    this.rawValue = rawValue;
  }

  private parser: FieldParserInterfaceType;

  private parseRawValue(): Type[] {
    const rawValues = Array.isArray(this.rawValue)
      ? this.rawValue
      : [this.rawValue];

    const values: Type[] = [];
    rawValues.forEach((value) => {
      const parsed = this.parser.parseValue(value);
      if (Array.isArray(parsed)) {
        values.push(...parsed);
      } else if (parsed !== undefined) {
        values.push(parsed);
      }
    });

    return values;
  }
}
`,ge=`import type { Metadata } from './metadata';
import type { MetadataFieldInterface } from './metadata-fields/metadata-field';

/**
 * The names of \`Metadata\`'s fields, i.e. the members whose value is a
 * \`MetadataField\`.
 *
 * Derived from \`Metadata\` rather than listed, so a field added there is
 * available here with no matching change. Members that aren't fields are
 * excluded, so \`identifier\` (a plain string) and \`rawMetadata\` (a plain
 * record) are rejected.
 *
 * Useful for anything that takes a field name and wants the corresponding
 * field type, since \`Metadata[K]\` then resolves to the field class:
 *
 * \`\`\`ts
 * function read<K extends MetadataFieldKey>(m: Metadata, key: K): Metadata[K] {
 *   return m[key];
 * }
 * read(metadata, 'collection'); // StringField | undefined
 * read(metadata, 'addeddate'); // DateField | undefined
 * \`\`\`
 */
export type MetadataFieldKey = {
  [K in keyof Metadata]-?: NonNullable<
    Metadata[K]
  > extends MetadataFieldInterface<unknown>
    ? K
    : never;
}[keyof Metadata];
`;function e(a){let i,s,l;return i=a,(n,d,u)=>{if(u.value!=null)u.value=W(u.value,i,s,l);else if(u.get!=null)u.get=W(u.get,i,s,l);else throw"Only put a Memoize() decorator on a method or get accessor."}}const N=new Map;function W(a,i,s=0,l){const n=Symbol("__memoized_map__");return function(...d){let u;this.hasOwnProperty(n)||Object.defineProperty(this,n,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let g=this[n];if(Array.isArray(l))for(const c of l)N.has(c)?N.get(c).push(g):N.set(c,[g]);if(i||d.length>0||s>0){let c;i===!0?c=d.map(E=>E.toString()).join("!"):i?c=i.apply(this,d):c=d[0];const _=`${c}__timestamp`;let R=!1;if(s>0)if(!g.has(_))R=!0;else{let E=g.get(_);R=Date.now()-E>s}g.has(c)&&!R?u=g.get(c):(u=a.apply(this,d),g.set(c,u),s>0&&g.set(_,Date.now()))}else{const c=this;g.has(c)?u=g.get(c):(u=a.apply(this,d),g.set(c,u))}return u}}function x(a,i,...s){for(const l of s){const n=a[l];if(n!=null)return i(n)}}function y(a,i,...s){return x(a,l=>i(l),...s)}var _e=Object.defineProperty,me=Object.getOwnPropertyDescriptor,v=(a,i,s,l)=>{for(var n=me(i,s),d=a.length-1,u;d>=0;d--)(u=a[d])&&(n=u(i,s,n)||n);return n&&_e(i,s,n),n};class b{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const i=w.shared.parseValue(this.rawValue.mtime);if(i)return new Date(i*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return y(this.rawValue,i=>Z.shared.parseValue(i),"size")}get title(){return this.rawValue.title}get length(){return y(this.rawValue,i=>ee.shared.parseValue(i),"length")}get height(){return y(this.rawValue,i=>w.shared.parseValue(i),"height")}get width(){return y(this.rawValue,i=>w.shared.parseValue(i),"width")}get track(){return y(this.rawValue,i=>w.shared.parseValue(i),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return y(this.rawValue,i=>w.shared.parseValue(i),"bitrate")}get private(){return y(this.rawValue,i=>te.shared.parseValue(i),"private")}constructor(i={}){this.rawValue=i}}v([e()],b.prototype,"mtime");v([e()],b.prototype,"size");v([e()],b.prototype,"length");v([e()],b.prototype,"height");v([e()],b.prototype,"width");v([e()],b.prototype,"track");v([e()],b.prototype,"bitrate");v([e()],b.prototype,"private");var ye=Object.defineProperty,we=Object.getOwnPropertyDescriptor,oe=(a,i,s,l)=>{for(var n=we(i,s),d=a.length-1,u;d>=0;d--)(u=a[d])&&(n=u(i,s,n)||n);return n&&ye(i,s,n),n};class f{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(i,s){this.parser=i,this.rawValue=s}parseRawValue(){const i=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],s=[];return i.forEach(l=>{const n=this.parser.parseValue(l);Array.isArray(n)?s.push(...n):n!==void 0&&s.push(n)}),s}}oe([e()],f.prototype,"values");oe([e()],f.prototype,"value");class m extends f{constructor(i){super(te.shared,i)}}class h extends f{constructor(i){super(D.shared,i)}}class K extends f{constructor(i){super(ee.shared,i)}}class p extends f{constructor(i){super(w.shared,i)}}class o extends f{constructor(i){super(re.shared,i)}}class M{constructor(i){this.allowed=i}parseValue(i){return typeof i=="string"&&this.allowed.includes(i)?i:void 0}}class V extends f{constructor(i,s){super(s,i)}}const ve=new M(["rl","lr"]);class be extends V{constructor(i){super(i,ve)}}class $ extends f{constructor(i){super(Z.shared,i)}}const xe=new M(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class Ve extends V{constructor(i){super(i,xe)}}class ae extends f{constructor(i,s){super(s,i)}}class Q extends ae{constructor(i){const s=new ie(re.shared);super(i,s)}}class L extends ae{constructor(i){const s=new ie(w.shared);super(i,s)}}const Fe=/^([0-9a-f]{32})\s+\*?(.+)$/i,Me=/^(.+):([0-9a-f]{32})$/i;function ke(a){const i=a.match(Fe);if(i)return{file:i[2].trim(),md5:i[1].toLowerCase()};const s=a.match(Me);if(s)return{file:s[1].trim(),md5:s[2].toLowerCase()}}const j=class j{parseValue(i){if(typeof i!="string")return;const s=i.split(`
`).map(l=>l.trim()).filter(Boolean).map(ke).filter(l=>l!==void 0);return s.length?s:void 0}};j.shared=new j;let C=j;class X extends f{constructor(i){super(C.shared,i)}}function z(a,i){const l=a.match(new RegExp(`\\[${i}\\]([\\s\\S]*?)\\[/${i}\\]`,"i"))?.[1]?.trim();return l||void 0}const T=class T{parseValue(i){if(typeof i!="string")return;const s=z(i,"curator"),l=z(i,"date"),n=z(i,"comment"),d=z(i,"state");if(!(!s&&!l&&!n&&!d))return{curator:s,date:l?D.shared.parseValue(l):void 0,comment:n,state:d}}};T.shared=new T;let B=T;class Pe extends f{constructor(i){super(B.shared,i)}}const O=class O{parseValue(i){if(typeof i!="string")return;const s=i.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!s)return;const l=parseFloat(s[1]),n=parseFloat(s[2]);if(n)return{width:l,height:n,decimal:l/n}}};O.shared=new O;let U=O;class $e extends f{constructor(i){super(U.shared,i)}}const S=class S{parseValue(i){const s=String(i).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!s)return;const l=s[1]==="-"?-1:1,n=parseInt(s[2],10),d=parseInt(s[3],10);return{hours:l*n,minutes:d,totalMinutes:l*(n*60+d)}}};S.shared=new S;let H=S;class ze extends f{constructor(i){super(H.shared,i)}}const I=class I{parseValue(i){if(typeof i!="string")return;const s=i.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(s)return{channel:parseInt(s[1],10),frequencyMhz:s[2]?parseFloat(s[2]):void 0}}};I.shared=new I;let q=I;class De extends f{constructor(i){super(q.shared,i)}}var je=Object.defineProperty,Te=Object.getOwnPropertyDescriptor,r=(a,i,s,l)=>{for(var n=Te(i,s),d=a.length-1,u;d>=0;d--)(u=a[d])&&(n=u(i,s,n)||n);return n&&je(i,s,n),n};const Oe=new M(["true","none","frozen"]),Se=new M(["sound","silent"]),Ie=new M(["color","b&w"]),Ae=new M(["mode/1up","mode/2up","mode/thumb"]);class t{get access(){return this.field(o,"access")}get adder(){return this.field(o,"adder")}get amrc_id(){return this.field(o,"amrc-id")}get archiveit_account_id(){return this.field(p,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(o,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(p,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(o,"archiveit-collection-name")}get archiveit_job_type(){return this.field(o,"archiveit-job-type")}get audit_time_minutes(){return this.field(p,"audit_time_minutes")}get auditor(){return this.field(o,"auditor")}get author(){return this.field(o,"author")}get autocrop_version(){return this.field(o,"autocrop_version")}get bookplateleaf(){return this.field(p,"bookplateleaf")}get bookreader_defaults(){return x(this.rawMetadata,i=>new V(i,Ae),"bookreader-defaults")}get boxid(){return this.field(o,"boxid")}get camera(){return this.field(o,"camera")}get cameraman(){return this.field(o,"cameraman")}get canister(){return this.field(o,"canister")}get case_name(){return this.field(o,"case-name")}get col_number(){return this.field(o,"col_number")}get collection_added(){return this.field(o,"collection_added")}get collection_library(){return this.field(o,"collection-library")}get collection_set(){return this.field(o,"collection_set")}get copyright_holder(){return this.field(o,"copyright_holder")}get court(){return this.field(o,"court")}get crawler(){return this.field(o,"crawler")}get crawljob(){return this.field(o,"crawljob")}get curation(){return this.field(Pe,"curation")}get dari_title(){return this.field(o,"dari-title")}get dari_title_romanized(){return this.field(o,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(h,"date-case-filed")}get date_case_terminated(){return this.field(h,"date-case-terminated")}get date_created(){return this.field(h,"date_created")}get date_last_filing(){return this.field(h,"date-last-filing")}get derive_submittime(){return this.field(h,"derive_submittime")}get derive_version(){return this.field(o,"derive_version")}get discs(){return this.field(p,"discs")}get docket_num(){return this.field(o,"docket-num")}get external_metadata_update(){return this.field(h,"external_metadata_update")}get fail_reasons(){return this.field(o,"fail-reasons")}get filesxml(){return this.field(h,"filesxml")}get firstfiledate(){return this.field(h,"firstfiledate")}get firstfileserial(){return this.field(p,"firstfileserial")}get foldoutcount(){return this.field(p,"foldoutcount")}get format(){return this.field(o,"format")}get geo_restricted(){return this.field(o,"geo_restricted")}get guid(){return this.field(o,"guid")}get has_mp3(){return this.field(m,"has_mp3")}get height(){return this.field(p,"height")}get hidden(){return this.field(m,"hidden")}get ia_orig__runtime(){return this.field(o,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(m,"access-restricted-item")}get addeddate(){return this.field(h,"addeddate")}get aspect_ratio(){return this.field($e,"aspect_ratio")}get audio_codec(){return this.field(o,"audio_codec")}get audio_sample_rate(){return this.field(p,"audio_sample_rate")}get avg_rating(){return this.field(p,"avg_rating")}get backup_location(){return this.field(o,"backup_location")}get ccnum(){return this.field(o,"ccnum")}get closed_captioning(){return this.field(m,"closed_captioning")}get collection(){return this.field(o,"collection")}get collections_raw(){return this.field(o,"collections_raw")}get collection_size(){return this.field($,"collection_size")}get color(){return x(this.rawMetadata,i=>new V(i,Ie),"color")}get contact(){return this.field(o,"contact")}get contributor(){return this.field(o,"contributor")}get coverage(){return this.field(o,"coverage")}get creator(){return this.field(o,"creator")}get creator_alt_script(){return this.field(o,"creator-alt-script")}get credits(){return this.field(o,"credits")}get collection_layout(){return this.field(o,"collection_layout")}get date(){return this.field(h,"date")}get description(){return this.field(o,"description")}get downloads(){return this.field(p,"downloads")}get duration(){return this.field(K,"duration")}get external_identifier(){return this.field(o,"external-identifier")}get external_link(){return this.field(o,"external-link")}get files_count(){return this.field(p,"files_count")}get frames_per_second(){return this.field(p,"frames_per_second")}get identifier_access(){return this.field(o,"identifier-access")}get identifier_ark(){return this.field(o,"identifier-ark")}get identifier_bib(){return this.field(o,"identifier-bib")}get image_count(){return this.field(p,"image_count")}get imagecount(){return this.field(p,"imagecount")}get indexdate(){return this.field(h,"indexdate")}get invoice(){return this.field(p,"invoice")}get isbn(){return this.field(o,"isbn")}get issue(){return this.field(o,"issue")}get issue_count(){return this.field(p,"issue_count")}get issue_page_count(){return this.field(p,"issue_page_count")}get item_count(){return this.field(p,"item_count")}get item_size(){return this.field($,"item_size")}get language(){return this.field(o,"language")}get lastdate(){return this.field(h,"lastdate")}get lastfiledate(){return this.field(h,"lastfiledate")}get lastfileserial(){return this.field(p,"lastfileserial")}get length(){return this.field(K,"length")}get license(){return this.field(o,"license")}get licenseurl(){return this.field(o,"licenseurl")}get lineage(){return this.field(o,"lineage")}get mature_content(){return this.field(m,"mature_content")}get md5(){return this.field(o,"md5")}get md5contents(){return this.field(X,"md5contents")}get md5s(){return this.field(X,"md5s")}get medium(){return this.field(o,"medium")}get metadata_operator(){return this.field(o,"metadata_operator")}get metasource_catalog(){return this.field(o,"metasource_catalog")}get monochromatic(){return this.field(m,"monochromatic")}get month(){return this.field(p,"month")}get mediatype(){return this.field(Ve,"mediatype")}get mpeg_program(){return this.field(p,"mpeg_program")}get next_item(){return this.field(o,"next_item")}get noarchivetorrent(){return this.field(m,"noarchivetorrent")}get noindex(){return this.field(m,"noindex")}get notes(){return this.field(o,"notes")}get num_favorites(){return this.field(p,"num_favorites")}get num_reviews(){return this.field(p,"num_reviews")}get numeric_id(){return this.field(p,"numeric_id")}get numwarcs(){return this.field(p,"numwarcs")}get ocr(){return this.field(o,"ocr")}get ocr_autonomous(){return this.field(m,"ocr_autonomous")}get ocr_detected_lang(){return this.field(o,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(p,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(o,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(p,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(o,"ocr_invalid_language")}get ocr_module_version(){return this.field(o,"ocr_module_version")}get ocr_parameters(){return this.field(o,"ocr_parameters")}get old_pallet(){return this.field(o,"old_pallet")}get openlibrary_edition(){return this.field(o,"openlibrary_edition")}get openlibrary_work(){return this.field(o,"openlibrary_work")}get operator(){return this.field(o,"operator")}get originalurl(){return this.field(o,"originalurl")}get osf_category(){return this.field(o,"osf_category")}get osf_project(){return this.field(o,"osf_project")}get osf_registration_doi(){return this.field(o,"osf_registration_doi")}get osf_registration_schema(){return this.field(o,"osf_registration_schema")}get osf_registry(){return this.field(o,"osf_registry")}get osf_subjects(){return this.field(o,"osf_subjects")}get osf_tags(){return this.field(o,"osf_tags")}get output_time_minutes(){return this.field(p,"output_time_minutes")}get pacer_case_num(){return this.field(p,"pacer-case-num")}get packaging_time_minutes(){return this.field(p,"packaging_time_minutes")}get page_number_confidence(){return this.field(p,"page_number_confidence")}get page_number_module_version(){return this.field(o,"page_number_module_version")}get page_progression(){return this.field(be,"page-progression","page_progression")}get paginated(){return this.field(m,"paginated")}get parse_date(){return this.field(h,"parse_date")}get parse_state(){return this.field(o,"parse_state")}get partner(){return this.field(o,"partner")}get pashto_title(){return this.field(o,"pashto-title")}get pashto_title_romanized(){return this.field(o,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(o,"pdf_degraded")}get pdf_module_version(){return this.field(o,"pdf_module_version")}get pick(){return this.field(p,"pick")}get podcastindexid(){return this.field(p,"podcastindexid")}get post_text(){return this.field(o,"post_text")}get ppi(){return this.field(p,"ppi")}get previous_item(){return this.field(o,"previous_item")}get program(){return this.field(o,"program")}get publicdate(){return this.field(h,"publicdate")}get publisher(){return this.field(o,"publisher")}get political_religious_party(){return this.field(o,"political-religious-party")}get rcs_key(){return this.field(p,"rcs_key")}get repub_state(){return this.field(p,"repub_state")}get republisher_date(){return this.field(h,"republisher_date")}get republisher_operator(){return this.field(Q,"republisher_operator")}get republisher_time(){return this.field(p,"republisher_time")}get reviewdate(){return this.field(h,"reviewdate")}get reviews_allowed(){return x(this.rawMetadata,i=>new V(i,Oe),"reviews-allowed")}get ribbon_state(){return this.field(o,"ribbon_state")}get ribbon_state_modify_date(){return this.field(h,"ribbon_state_modify_date")}get rights(){return this.field(o,"rights")}get rights_holder(){return this.field(o,"rights-holder","rights_holder")}get rssfeed(){return this.field(o,"rssfeed")}get runtime(){return this.field(K,"runtime")}get scan_time_minutes(){return this.field(p,"scan_time_minutes")}get scandate(){return this.field(h,"scandate")}get scanfee(){return this.field(L,"scanfee")}get scanner(){return this.field(o,"scanner")}get scanner_operator(){return this.field(o,"scanner_operator")}get scanningcenter(){return this.field(o,"scanningcenter")}get scribe3_search_catalog(){return this.field(o,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(o,"scribe3_search_id")}get segments(){return this.field(o,"segments")}get sessionid(){return this.field(o,"sessionid")}get shndiscs(){return this.field(p,"shndiscs")}get shotlist(){return this.field(o,"shotlist")}get signal_path(){return this.field(o,"signal-path")}get size(){return this.field($,"size")}get sizehint(){return this.field($,"sizehint")}get software_version(){return this.field(o,"software_version")}get sort_order(){return this.field(o,"sort_order")}get sound(){return x(this.rawMetadata,i=>new V(i,Se),"sound")}get soundcreator(){return this.field(o,"soundcreator")}get soundtitle(){return this.field(o,"soundtitle")}get source(){return this.field(o,"source")}get source_pixel_height(){return this.field(p,"source_pixel_height")}get source_pixel_width(){return this.field(p,"source_pixel_width")}get source_url(){return this.field(o,"source_url")}get sponsor(){return this.field(o,"sponsor")}get sponsordate(){return this.field(h,"sponsordate")}get start_localtime(){return this.field(h,"start_localtime")}get start_time(){return this.field(h,"start_time")}get station_name(){return this.field(o,"station_name")}get stop_time(){return this.field(h,"stop_time")}get subject(){return this.field(Q,"subject")}get taper(){return this.field(o,"taper")}get thumbs(){return this.field(L,"thumbs")}get times(){return this.field(L,"times")}get title(){return this.field(o,"title")}get title_alt_script(){return this.field(o,"title-alt-script")}get transferer(){return this.field(o,"transferer")}get track(){return this.field(p,"track")}get tts_version(){return this.field(o,"tts_version")}get tuner(){return this.field(De,"tuner")}get type(){return this.field(o,"type")}get updatedate(){return this.field(h,"updatedate")}get updater(){return this.field(o,"updater")}get uploader(){return this.field(o,"uploader")}get uploadsoftware(){return this.field(o,"uploadsoftware")}get utc_offset(){return this.field(ze,"utc_offset")}get venue(){return this.field(o,"venue")}get video_codec(){return this.field(o,"video_codec")}get volume(){return this.field(o,"volume")}get website(){return this.field(o,"website")}get week(){return this.field(p,"week")}get width(){return this.field(p,"width")}get year(){return this.field(p,"year")}field(i,...s){return x(this.rawMetadata,l=>new i(l),...s)}constructor(i={}){this.rawMetadata=i}}r([e()],t.prototype,"access");r([e()],t.prototype,"adder");r([e()],t.prototype,"amrc_id");r([e()],t.prototype,"archiveit_account_id");r([e()],t.prototype,"archiveit_account_organization_name");r([e()],t.prototype,"archiveit_collection_id");r([e()],t.prototype,"archiveit_collection_name");r([e()],t.prototype,"archiveit_job_type");r([e()],t.prototype,"audit_time_minutes");r([e()],t.prototype,"auditor");r([e()],t.prototype,"author");r([e()],t.prototype,"autocrop_version");r([e()],t.prototype,"bookplateleaf");r([e()],t.prototype,"bookreader_defaults");r([e()],t.prototype,"boxid");r([e()],t.prototype,"camera");r([e()],t.prototype,"cameraman");r([e()],t.prototype,"canister");r([e()],t.prototype,"case_name");r([e()],t.prototype,"col_number");r([e()],t.prototype,"collection_added");r([e()],t.prototype,"collection_library");r([e()],t.prototype,"collection_set");r([e()],t.prototype,"copyright_holder");r([e()],t.prototype,"court");r([e()],t.prototype,"crawler");r([e()],t.prototype,"crawljob");r([e()],t.prototype,"curation");r([e()],t.prototype,"dari_title");r([e()],t.prototype,"dari_title_romanized");r([e()],t.prototype,"date_case_filed");r([e()],t.prototype,"date_case_terminated");r([e()],t.prototype,"date_created");r([e()],t.prototype,"date_last_filing");r([e()],t.prototype,"derive_submittime");r([e()],t.prototype,"derive_version");r([e()],t.prototype,"discs");r([e()],t.prototype,"docket_num");r([e()],t.prototype,"external_metadata_update");r([e()],t.prototype,"fail_reasons");r([e()],t.prototype,"filesxml");r([e()],t.prototype,"firstfiledate");r([e()],t.prototype,"firstfileserial");r([e()],t.prototype,"foldoutcount");r([e()],t.prototype,"format");r([e()],t.prototype,"geo_restricted");r([e()],t.prototype,"guid");r([e()],t.prototype,"has_mp3");r([e()],t.prototype,"height");r([e()],t.prototype,"hidden");r([e()],t.prototype,"ia_orig__runtime");r([e()],t.prototype,"access_restricted_item");r([e()],t.prototype,"addeddate");r([e()],t.prototype,"aspect_ratio");r([e()],t.prototype,"audio_codec");r([e()],t.prototype,"audio_sample_rate");r([e()],t.prototype,"avg_rating");r([e()],t.prototype,"backup_location");r([e()],t.prototype,"ccnum");r([e()],t.prototype,"closed_captioning");r([e()],t.prototype,"collection");r([e()],t.prototype,"collections_raw");r([e()],t.prototype,"collection_size");r([e()],t.prototype,"color");r([e()],t.prototype,"contact");r([e()],t.prototype,"contributor");r([e()],t.prototype,"coverage");r([e()],t.prototype,"creator");r([e()],t.prototype,"creator_alt_script");r([e()],t.prototype,"credits");r([e()],t.prototype,"collection_layout");r([e()],t.prototype,"date");r([e()],t.prototype,"description");r([e()],t.prototype,"downloads");r([e()],t.prototype,"duration");r([e()],t.prototype,"external_identifier");r([e()],t.prototype,"external_link");r([e()],t.prototype,"files_count");r([e()],t.prototype,"frames_per_second");r([e()],t.prototype,"identifier_access");r([e()],t.prototype,"identifier_ark");r([e()],t.prototype,"identifier_bib");r([e()],t.prototype,"image_count");r([e()],t.prototype,"imagecount");r([e()],t.prototype,"indexdate");r([e()],t.prototype,"invoice");r([e()],t.prototype,"isbn");r([e()],t.prototype,"issue");r([e()],t.prototype,"issue_count");r([e()],t.prototype,"issue_page_count");r([e()],t.prototype,"item_count");r([e()],t.prototype,"item_size");r([e()],t.prototype,"language");r([e()],t.prototype,"lastdate");r([e()],t.prototype,"lastfiledate");r([e()],t.prototype,"lastfileserial");r([e()],t.prototype,"length");r([e()],t.prototype,"license");r([e()],t.prototype,"licenseurl");r([e()],t.prototype,"lineage");r([e()],t.prototype,"mature_content");r([e()],t.prototype,"md5");r([e()],t.prototype,"md5contents");r([e()],t.prototype,"md5s");r([e()],t.prototype,"medium");r([e()],t.prototype,"metadata_operator");r([e()],t.prototype,"metasource_catalog");r([e()],t.prototype,"monochromatic");r([e()],t.prototype,"month");r([e()],t.prototype,"mediatype");r([e()],t.prototype,"mpeg_program");r([e()],t.prototype,"next_item");r([e()],t.prototype,"noarchivetorrent");r([e()],t.prototype,"noindex");r([e()],t.prototype,"notes");r([e()],t.prototype,"num_favorites");r([e()],t.prototype,"num_reviews");r([e()],t.prototype,"numeric_id");r([e()],t.prototype,"numwarcs");r([e()],t.prototype,"ocr");r([e()],t.prototype,"ocr_autonomous");r([e()],t.prototype,"ocr_detected_lang");r([e()],t.prototype,"ocr_detected_lang_conf");r([e()],t.prototype,"ocr_detected_script");r([e()],t.prototype,"ocr_detected_script_conf");r([e()],t.prototype,"ocr_invalid_language");r([e()],t.prototype,"ocr_module_version");r([e()],t.prototype,"ocr_parameters");r([e()],t.prototype,"old_pallet");r([e()],t.prototype,"openlibrary_edition");r([e()],t.prototype,"openlibrary_work");r([e()],t.prototype,"operator");r([e()],t.prototype,"originalurl");r([e()],t.prototype,"osf_category");r([e()],t.prototype,"osf_project");r([e()],t.prototype,"osf_registration_doi");r([e()],t.prototype,"osf_registration_schema");r([e()],t.prototype,"osf_registry");r([e()],t.prototype,"osf_subjects");r([e()],t.prototype,"osf_tags");r([e()],t.prototype,"output_time_minutes");r([e()],t.prototype,"pacer_case_num");r([e()],t.prototype,"packaging_time_minutes");r([e()],t.prototype,"page_number_confidence");r([e()],t.prototype,"page_number_module_version");r([e()],t.prototype,"page_progression");r([e()],t.prototype,"paginated");r([e()],t.prototype,"parse_date");r([e()],t.prototype,"parse_state");r([e()],t.prototype,"partner");r([e()],t.prototype,"pashto_title");r([e()],t.prototype,"pashto_title_romanized");r([e()],t.prototype,"pdf_degraded");r([e()],t.prototype,"pdf_module_version");r([e()],t.prototype,"pick");r([e()],t.prototype,"podcastindexid");r([e()],t.prototype,"post_text");r([e()],t.prototype,"ppi");r([e()],t.prototype,"previous_item");r([e()],t.prototype,"program");r([e()],t.prototype,"publicdate");r([e()],t.prototype,"publisher");r([e()],t.prototype,"political_religious_party");r([e()],t.prototype,"rcs_key");r([e()],t.prototype,"repub_state");r([e()],t.prototype,"republisher_date");r([e()],t.prototype,"republisher_operator");r([e()],t.prototype,"republisher_time");r([e()],t.prototype,"reviewdate");r([e()],t.prototype,"reviews_allowed");r([e()],t.prototype,"ribbon_state");r([e()],t.prototype,"ribbon_state_modify_date");r([e()],t.prototype,"rights");r([e()],t.prototype,"rights_holder");r([e()],t.prototype,"rssfeed");r([e()],t.prototype,"runtime");r([e()],t.prototype,"scan_time_minutes");r([e()],t.prototype,"scandate");r([e()],t.prototype,"scanfee");r([e()],t.prototype,"scanner");r([e()],t.prototype,"scanner_operator");r([e()],t.prototype,"scanningcenter");r([e()],t.prototype,"scribe3_search_catalog");r([e()],t.prototype,"scribe3_search_id");r([e()],t.prototype,"segments");r([e()],t.prototype,"sessionid");r([e()],t.prototype,"shndiscs");r([e()],t.prototype,"shotlist");r([e()],t.prototype,"signal_path");r([e()],t.prototype,"size");r([e()],t.prototype,"sizehint");r([e()],t.prototype,"software_version");r([e()],t.prototype,"sort_order");r([e()],t.prototype,"sound");r([e()],t.prototype,"soundcreator");r([e()],t.prototype,"soundtitle");r([e()],t.prototype,"source");r([e()],t.prototype,"source_pixel_height");r([e()],t.prototype,"source_pixel_width");r([e()],t.prototype,"source_url");r([e()],t.prototype,"sponsor");r([e()],t.prototype,"sponsordate");r([e()],t.prototype,"start_localtime");r([e()],t.prototype,"start_time");r([e()],t.prototype,"station_name");r([e()],t.prototype,"stop_time");r([e()],t.prototype,"subject");r([e()],t.prototype,"taper");r([e()],t.prototype,"thumbs");r([e()],t.prototype,"times");r([e()],t.prototype,"title");r([e()],t.prototype,"title_alt_script");r([e()],t.prototype,"transferer");r([e()],t.prototype,"track");r([e()],t.prototype,"tts_version");r([e()],t.prototype,"tuner");r([e()],t.prototype,"type");r([e()],t.prototype,"updatedate");r([e()],t.prototype,"updater");r([e()],t.prototype,"uploader");r([e()],t.prototype,"uploadsoftware");r([e()],t.prototype,"utc_offset");r([e()],t.prototype,"venue");r([e()],t.prototype,"video_codec");r([e()],t.prototype,"volume");r([e()],t.prototype,"website");r([e()],t.prototype,"week");r([e()],t.prototype,"width");r([e()],t.prototype,"year");var Re=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,G=(a,i,s,l)=>{for(var n=Ee(i,s),d=a.length-1,u;d>=0;d--)(u=a[d])&&(n=u(i,s,n)||n);return n&&Re(i,s,n),n};class J{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return y(this.rawValue,i=>D.shared.parseValue(i),"reviewdate")}get createdate(){return y(this.rawValue,i=>D.shared.parseValue(i),"createdate")}get stars(){return y(this.rawValue,i=>w.shared.parseValue(i),"stars")}constructor(i={}){this.rawValue=i}}G([e()],J.prototype,"reviewdate");G([e()],J.prototype,"createdate");G([e()],J.prototype,"stars");var Ne=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,P=(a,i,s,l)=>{for(var n=l>1?void 0:l?Ke(i,s):i,d=a.length-1,u;d>=0;d--)(u=a[d])&&(n=(l?u(i,s,n):u(n))||n);return l&&n&&Ne(i,s,n),n};const Y="nasa",Le={identifier:"sample-item",mediatype:"movies",title:"A sample item",creator:"Internet Archive",subject:["sample","demo","metadata"],addeddate:"2021-05-20 13:37:15",publicdate:"2021-05-21 08:00:00",runtime:"1:02:03",item_size:"123456789",downloads:"42",imagecount:"17","access-restricted-item":"true",mystery_field:"a key the model does not read"},Ce=`import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`,Be=a=>a.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),Ue=[fe,ge].map(Be).join(`

`),se=Object.getOwnPropertyNames(t.prototype).filter(a=>typeof Object.getOwnPropertyDescriptor(t.prototype,a)?.get=="function").sort(),ne=(a,i)=>a[i],le=a=>typeof a=="object"&&a!==null&&"rawValue"in a;function He(a){return le(a)?a.constructor?.name??"unknown":typeof a}function de(a){return a==null?"—":a instanceof Date?a.toISOString():Array.isArray(a)?a.map(de).join(", "):typeof a=="object"?JSON.stringify(a):String(a)}function qe(a){const i=new Set,s=new Proxy(a,{get(n,d){return typeof d=="string"&&i.add(d),Reflect.get(n,d)}}),l=new t(s);for(const n of se)ne(l,n);return i}let F=class extends pe{constructor(){super(...arguments),this.identifier="",this.sample=!1,this.loading=!1}render(){return k`
      <service-template
        serviceName="item-metadata"
        .usage=${Ce}
        .apiSource=${Ue}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${Y}
              autocomplete="off"
              spellcheck="false"
              .value=${this.identifier}
              @input=${a=>this.identifier=a.target.value}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${a=>this.sample=a.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.loading}>Parse</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?this.renderResult(this.result):ue}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Loads an item's metadata from archive.org and shows what the model
            makes of each field it sets: the class that parsed it and the native
            value. Keys the model doesn't read are listed under the table.
          </p>
        </div>
      </service-template>
    `}renderResult(a){return k`<code class="call">${a.call}</code> ${a.error?k`<code class="error">${a.error}</code>`:k`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${a.rows.map(i=>k`<tr>
                      <th scope="row">${i.name}</th>
                      <td>${i.type}</td>
                      <td>${i.value}</td>
                    </tr>`)}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${a.unmodeled.length?a.unmodeled.join(", "):"none"}
            </p>`}`}async run(a){a.preventDefault();const i=this.identifier.trim()||Y,s=`new Metadata(${this.sample?"sample":`response.metadata /* ${i} */`})`;this.loading=!0;try{let l;if(this.sample)l=Le;else{const c=await fetch(`https://archive.org/metadata/${encodeURIComponent(i)}`);if(!c.ok)throw new Error(`Request failed (${c.status})`);const _=await c.json();if(!_.metadata)throw new Error(`No item found for "${i}".`);l=_.metadata}const n=new t(l),d=se.map(c=>({name:c,value:ne(n,c)})).filter(({value:c})=>c!==void 0).map(({name:c,value:_})=>({name:c,type:He(_),value:de(le(_)?_.value:_)})),u=qe(l),g=Object.keys(l).filter(c=>!u.has(c)).sort();this.result={call:s,rows:d,unmodeled:g}}catch(l){this.result={call:s,rows:[],unmodeled:[],error:`${l instanceof Error?l.message:l}${this.sample?"":'. Try "Sample data".'}`}}finally{this.loading=!1}}static get styles(){return ce`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.id input {
        min-width: 0;
        width: 14rem;
        max-width: 100%;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
        overflow-x: auto;
      }

      .call,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 2px 10px 2px 0;
        vertical-align: top;
        overflow-wrap: anywhere;
      }

      thead th {
        border-bottom: 1px solid #ccc;
      }

      .unmodeled {
        margin: 0;
        font-size: 0.8rem;
        overflow-wrap: anywhere;
      }
    `}};P([A()],F.prototype,"identifier",2);P([A()],F.prototype,"sample",2);P([A()],F.prototype,"loading",2);P([A()],F.prototype,"result",2);F=P([he("item-metadata-story")],F);export{F as ItemMetadataStory};
