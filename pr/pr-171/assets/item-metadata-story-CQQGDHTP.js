import{i as ye,A as we,b as P,a as ve,r as H,c as be}from"./index-C8K2Aa9m.js";import{N as b,B as re,D as ie,b as oe,a as O,S as ae}from"./service-template-C-wsvBC9.js";import"./theme-styles-DBfT6KdP.js";class se{constructor(i,s){this.separators=[";",","],this.parser=i,s&&s.separators&&(this.separators=s.separators)}parseValue(i){const s=String(i);let l=[];for(const n of this.separators)if(l=s.split(n),l.length>1)break;return this.parseListValues(l)}parseListValues(i){const l=i.map(p=>p.trim()).map(p=>this.parser.parseValue(p)),n=[];return l.forEach(p=>{p!==void 0&&n.push(p)}),n}}const xe=`import { Memoize } from 'typescript-memoize';
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
`,Ve=`import type { Metadata } from './metadata';
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
`;function e(a){let i,s,l;return i=a,(n,p,u)=>{if(u.value!=null)u.value=Z(u.value,i,s,l);else if(u.get!=null)u.get=Z(u.get,i,s,l);else throw"Only put a Memoize() decorator on a method or get accessor."}}const J=new Map;function Z(a,i,s=0,l){const n=Symbol("__memoized_map__");return function(...p){let u;this.hasOwnProperty(n)||Object.defineProperty(this,n,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let _=this[n];if(Array.isArray(l))for(const h of l)J.has(h)?J.get(h).push(_):J.set(h,[_]);if(i||p.length>0||s>0){let h;i===!0?h=p.map(G=>G.toString()).join("!"):i?h=i.apply(this,p):h=p[0];const f=`${h}__timestamp`;let w=!1;if(s>0)if(!_.has(f))w=!0;else{let G=_.get(f);w=Date.now()-G>s}_.has(h)&&!w?u=_.get(h):(u=a.apply(this,p),_.set(h,u),s>0&&_.set(f,Date.now()))}else{const h=this;_.has(h)?u=_.get(h):(u=a.apply(this,p),_.set(h,u))}return u}}function F(a,i,...s){for(const l of s){const n=a[l];if(n!=null)return i(n)}}function y(a,i,...s){return F(a,l=>i(l),...s)}var Me=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,x=(a,i,s,l)=>{for(var n=Fe(i,s),p=a.length-1,u;p>=0;p--)(u=a[p])&&(n=u(i,s,n)||n);return n&&Me(i,s,n),n};class v{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const i=b.shared.parseValue(this.rawValue.mtime);if(i)return new Date(i*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return y(this.rawValue,i=>re.shared.parseValue(i),"size")}get title(){return this.rawValue.title}get length(){return y(this.rawValue,i=>ie.shared.parseValue(i),"length")}get height(){return y(this.rawValue,i=>b.shared.parseValue(i),"height")}get width(){return y(this.rawValue,i=>b.shared.parseValue(i),"width")}get track(){return y(this.rawValue,i=>b.shared.parseValue(i),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return y(this.rawValue,i=>b.shared.parseValue(i),"bitrate")}get private(){return y(this.rawValue,i=>oe.shared.parseValue(i),"private")}constructor(i={}){this.rawValue=i}}x([e()],v.prototype,"mtime");x([e()],v.prototype,"size");x([e()],v.prototype,"length");x([e()],v.prototype,"height");x([e()],v.prototype,"width");x([e()],v.prototype,"track");x([e()],v.prototype,"bitrate");x([e()],v.prototype,"private");var ke=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,ne=(a,i,s,l)=>{for(var n=Pe(i,s),p=a.length-1,u;p>=0;p--)(u=a[p])&&(n=u(i,s,n)||n);return n&&ke(i,s,n),n};class g{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(i,s){this.parser=i,this.rawValue=s}parseRawValue(){const i=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],s=[];return i.forEach(l=>{const n=this.parser.parseValue(l);Array.isArray(n)?s.push(...n):n!==void 0&&s.push(n)}),s}}ne([e()],g.prototype,"values");ne([e()],g.prototype,"value");class m extends g{constructor(i){super(oe.shared,i)}}class c extends g{constructor(i){super(O.shared,i)}}class D extends g{constructor(i){super(ie.shared,i)}}class d extends g{constructor(i){super(b.shared,i)}}class o extends g{constructor(i){super(ae.shared,i)}}class M{constructor(i){this.allowed=i}parseValue(i){return typeof i=="string"&&this.allowed.includes(i)?i:void 0}}class V extends g{constructor(i,s){super(s,i)}}const je=new M(["rl","lr"]);class le extends V{constructor(i){super(i,je)}}class j extends g{constructor(i){super(re.shared,i)}}const $e=new M(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class de extends V{constructor(i){super(i,$e)}}class X extends g{constructor(i,s){super(s,i)}}class W extends X{constructor(i){const s=new se(ae.shared);super(i,s)}}class T extends X{constructor(i){const s=new se(b.shared);super(i,s)}}const ze=/^([0-9a-f]{32})\s+\*?(.+)$/i,De=/^(.+):([0-9a-f]{32})$/i;function Te(a){const i=a.match(ze);if(i)return{file:i[2].trim(),md5:i[1].toLowerCase()};const s=a.match(De);if(s)return{file:s[1].trim(),md5:s[2].toLowerCase()}}const K=class K{parseValue(i){if(typeof i!="string")return;const s=i.split(`
`).map(l=>l.trim()).filter(Boolean).map(Te).filter(l=>l!==void 0);return s.length?s:void 0}};K.shared=new K;let S=K;class Q extends g{constructor(i){super(S.shared,i)}}function z(a,i){const l=a.match(new RegExp(`\\[${i}\\]([\\s\\S]*?)\\[/${i}\\]`,"i"))?.[1]?.trim();return l||void 0}const L=class L{parseValue(i){if(typeof i!="string")return;const s=z(i,"curator"),l=z(i,"date"),n=z(i,"comment"),p=z(i,"state");if(!(!s&&!l&&!n&&!p))return{curator:s,date:l?O.shared.parseValue(l):void 0,comment:n,state:p}}};L.shared=new L;let I=L;class pe extends g{constructor(i){super(I.shared,i)}}const C=class C{parseValue(i){if(typeof i!="string")return;const s=i.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!s)return;const l=parseFloat(s[1]),n=parseFloat(s[2]);if(n)return{width:l,height:n,decimal:l/n}}};C.shared=new C;let A=C;class ue extends g{constructor(i){super(A.shared,i)}}const B=class B{parseValue(i){const s=String(i).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!s)return;const l=s[1]==="-"?-1:1,n=parseInt(s[2],10),p=parseInt(s[3],10);return{hours:l*n,minutes:p,totalMinutes:l*(n*60+p)}}};B.shared=new B;let R=B;class ce extends g{constructor(i){super(R.shared,i)}}const U=class U{parseValue(i){if(typeof i!="string")return;const s=i.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(s)return{channel:parseInt(s[1],10),frequencyMhz:s[2]?parseFloat(s[2]):void 0}}};U.shared=new U;let E=U;class he extends g{constructor(i){super(E.shared,i)}}var Oe=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,r=(a,i,s,l)=>{for(var n=Se(i,s),p=a.length-1,u;p>=0;p--)(u=a[p])&&(n=u(i,s,n)||n);return n&&Oe(i,s,n),n};const Ie=new M(["true","none","frozen"]),Ae=new M(["sound","silent"]),Re=new M(["color","b&w"]),Ee=new M(["mode/1up","mode/2up","mode/thumb"]);class t{get access(){return this.field(o,"access")}get adder(){return this.field(o,"adder")}get amrc_id(){return this.field(o,"amrc-id")}get archiveit_account_id(){return this.field(d,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(o,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(d,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(o,"archiveit-collection-name")}get archiveit_job_type(){return this.field(o,"archiveit-job-type")}get audit_time_minutes(){return this.field(d,"audit_time_minutes")}get auditor(){return this.field(o,"auditor")}get author(){return this.field(o,"author")}get autocrop_version(){return this.field(o,"autocrop_version")}get bookplateleaf(){return this.field(d,"bookplateleaf")}get bookreader_defaults(){return F(this.rawMetadata,i=>new V(i,Ee),"bookreader-defaults")}get boxid(){return this.field(o,"boxid")}get camera(){return this.field(o,"camera")}get cameraman(){return this.field(o,"cameraman")}get canister(){return this.field(o,"canister")}get case_name(){return this.field(o,"case-name")}get col_number(){return this.field(o,"col_number")}get collection_added(){return this.field(o,"collection_added")}get collection_library(){return this.field(o,"collection-library")}get collection_set(){return this.field(o,"collection_set")}get copyright_holder(){return this.field(o,"copyright_holder")}get court(){return this.field(o,"court")}get crawler(){return this.field(o,"crawler")}get crawljob(){return this.field(o,"crawljob")}get curation(){return this.field(pe,"curation")}get dari_title(){return this.field(o,"dari-title")}get dari_title_romanized(){return this.field(o,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(c,"date-case-filed")}get date_case_terminated(){return this.field(c,"date-case-terminated")}get date_created(){return this.field(c,"date_created")}get date_last_filing(){return this.field(c,"date-last-filing")}get derive_submittime(){return this.field(c,"derive_submittime")}get derive_version(){return this.field(o,"derive_version")}get discs(){return this.field(d,"discs")}get docket_num(){return this.field(o,"docket-num")}get external_metadata_update(){return this.field(c,"external_metadata_update")}get fail_reasons(){return this.field(o,"fail-reasons")}get filesxml(){return this.field(c,"filesxml")}get firstfiledate(){return this.field(c,"firstfiledate")}get firstfileserial(){return this.field(d,"firstfileserial")}get foldoutcount(){return this.field(d,"foldoutcount")}get format(){return this.field(o,"format")}get geo_restricted(){return this.field(o,"geo_restricted")}get guid(){return this.field(o,"guid")}get has_mp3(){return this.field(m,"has_mp3")}get height(){return this.field(d,"height")}get hidden(){return this.field(m,"hidden")}get ia_orig__runtime(){return this.field(o,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(m,"access-restricted-item")}get addeddate(){return this.field(c,"addeddate")}get aspect_ratio(){return this.field(ue,"aspect_ratio")}get audio_codec(){return this.field(o,"audio_codec")}get audio_sample_rate(){return this.field(d,"audio_sample_rate")}get avg_rating(){return this.field(d,"avg_rating")}get backup_location(){return this.field(o,"backup_location")}get ccnum(){return this.field(o,"ccnum")}get closed_captioning(){return this.field(m,"closed_captioning")}get collection(){return this.field(o,"collection")}get collections_raw(){return this.field(o,"collections_raw")}get collection_size(){return this.field(j,"collection_size")}get color(){return F(this.rawMetadata,i=>new V(i,Re),"color")}get contact(){return this.field(o,"contact")}get contributor(){return this.field(o,"contributor")}get coverage(){return this.field(o,"coverage")}get creator(){return this.field(o,"creator")}get creator_alt_script(){return this.field(o,"creator-alt-script")}get credits(){return this.field(o,"credits")}get collection_layout(){return this.field(o,"collection_layout")}get date(){return this.field(c,"date")}get description(){return this.field(o,"description")}get downloads(){return this.field(d,"downloads")}get duration(){return this.field(D,"duration")}get external_identifier(){return this.field(o,"external-identifier")}get external_link(){return this.field(o,"external-link")}get files_count(){return this.field(d,"files_count")}get frames_per_second(){return this.field(d,"frames_per_second")}get identifier_access(){return this.field(o,"identifier-access")}get identifier_ark(){return this.field(o,"identifier-ark")}get identifier_bib(){return this.field(o,"identifier-bib")}get image_count(){return this.field(d,"image_count")}get imagecount(){return this.field(d,"imagecount")}get indexdate(){return this.field(c,"indexdate")}get invoice(){return this.field(d,"invoice")}get isbn(){return this.field(o,"isbn")}get issue(){return this.field(o,"issue")}get issue_count(){return this.field(d,"issue_count")}get issue_page_count(){return this.field(d,"issue_page_count")}get item_count(){return this.field(d,"item_count")}get item_size(){return this.field(j,"item_size")}get language(){return this.field(o,"language")}get lastdate(){return this.field(c,"lastdate")}get lastfiledate(){return this.field(c,"lastfiledate")}get lastfileserial(){return this.field(d,"lastfileserial")}get length(){return this.field(D,"length")}get license(){return this.field(o,"license")}get licenseurl(){return this.field(o,"licenseurl")}get lineage(){return this.field(o,"lineage")}get mature_content(){return this.field(m,"mature_content")}get md5(){return this.field(o,"md5")}get md5contents(){return this.field(Q,"md5contents")}get md5s(){return this.field(Q,"md5s")}get medium(){return this.field(o,"medium")}get metadata_operator(){return this.field(o,"metadata_operator")}get metasource_catalog(){return this.field(o,"metasource_catalog")}get monochromatic(){return this.field(m,"monochromatic")}get month(){return this.field(d,"month")}get mediatype(){return this.field(de,"mediatype")}get mpeg_program(){return this.field(d,"mpeg_program")}get next_item(){return this.field(o,"next_item")}get noarchivetorrent(){return this.field(m,"noarchivetorrent")}get noindex(){return this.field(m,"noindex")}get notes(){return this.field(o,"notes")}get num_favorites(){return this.field(d,"num_favorites")}get num_reviews(){return this.field(d,"num_reviews")}get numeric_id(){return this.field(d,"numeric_id")}get numwarcs(){return this.field(d,"numwarcs")}get ocr(){return this.field(o,"ocr")}get ocr_autonomous(){return this.field(m,"ocr_autonomous")}get ocr_detected_lang(){return this.field(o,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(d,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(o,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(d,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(o,"ocr_invalid_language")}get ocr_module_version(){return this.field(o,"ocr_module_version")}get ocr_parameters(){return this.field(o,"ocr_parameters")}get old_pallet(){return this.field(o,"old_pallet")}get openlibrary_edition(){return this.field(o,"openlibrary_edition")}get openlibrary_work(){return this.field(o,"openlibrary_work")}get operator(){return this.field(o,"operator")}get originalurl(){return this.field(o,"originalurl")}get osf_category(){return this.field(o,"osf_category")}get osf_project(){return this.field(o,"osf_project")}get osf_registration_doi(){return this.field(o,"osf_registration_doi")}get osf_registration_schema(){return this.field(o,"osf_registration_schema")}get osf_registry(){return this.field(o,"osf_registry")}get osf_subjects(){return this.field(o,"osf_subjects")}get osf_tags(){return this.field(o,"osf_tags")}get output_time_minutes(){return this.field(d,"output_time_minutes")}get pacer_case_num(){return this.field(d,"pacer-case-num")}get packaging_time_minutes(){return this.field(d,"packaging_time_minutes")}get page_number_confidence(){return this.field(d,"page_number_confidence")}get page_number_module_version(){return this.field(o,"page_number_module_version")}get page_progression(){return this.field(le,"page-progression","page_progression")}get paginated(){return this.field(m,"paginated")}get parse_date(){return this.field(c,"parse_date")}get parse_state(){return this.field(o,"parse_state")}get partner(){return this.field(o,"partner")}get pashto_title(){return this.field(o,"pashto-title")}get pashto_title_romanized(){return this.field(o,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(o,"pdf_degraded")}get pdf_module_version(){return this.field(o,"pdf_module_version")}get pick(){return this.field(d,"pick")}get podcastindexid(){return this.field(d,"podcastindexid")}get post_text(){return this.field(o,"post_text")}get ppi(){return this.field(d,"ppi")}get previous_item(){return this.field(o,"previous_item")}get program(){return this.field(o,"program")}get publicdate(){return this.field(c,"publicdate")}get publisher(){return this.field(o,"publisher")}get political_religious_party(){return this.field(o,"political-religious-party")}get rcs_key(){return this.field(d,"rcs_key")}get repub_state(){return this.field(d,"repub_state")}get republisher_date(){return this.field(c,"republisher_date")}get republisher_operator(){return this.field(W,"republisher_operator")}get republisher_time(){return this.field(d,"republisher_time")}get reviewdate(){return this.field(c,"reviewdate")}get reviews_allowed(){return F(this.rawMetadata,i=>new V(i,Ie),"reviews-allowed")}get ribbon_state(){return this.field(o,"ribbon_state")}get ribbon_state_modify_date(){return this.field(c,"ribbon_state_modify_date")}get rights(){return this.field(o,"rights")}get rights_holder(){return this.field(o,"rights-holder","rights_holder")}get rssfeed(){return this.field(o,"rssfeed")}get runtime(){return this.field(D,"runtime")}get scan_time_minutes(){return this.field(d,"scan_time_minutes")}get scandate(){return this.field(c,"scandate")}get scanfee(){return this.field(T,"scanfee")}get scanner(){return this.field(o,"scanner")}get scanner_operator(){return this.field(o,"scanner_operator")}get scanningcenter(){return this.field(o,"scanningcenter")}get scribe3_search_catalog(){return this.field(o,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(o,"scribe3_search_id")}get segments(){return this.field(o,"segments")}get sessionid(){return this.field(o,"sessionid")}get shndiscs(){return this.field(d,"shndiscs")}get shotlist(){return this.field(o,"shotlist")}get signal_path(){return this.field(o,"signal-path")}get size(){return this.field(j,"size")}get sizehint(){return this.field(j,"sizehint")}get software_version(){return this.field(o,"software_version")}get sort_order(){return this.field(o,"sort_order")}get sound(){return F(this.rawMetadata,i=>new V(i,Ae),"sound")}get soundcreator(){return this.field(o,"soundcreator")}get soundtitle(){return this.field(o,"soundtitle")}get source(){return this.field(o,"source")}get source_pixel_height(){return this.field(d,"source_pixel_height")}get source_pixel_width(){return this.field(d,"source_pixel_width")}get source_url(){return this.field(o,"source_url")}get sponsor(){return this.field(o,"sponsor")}get sponsordate(){return this.field(c,"sponsordate")}get start_localtime(){return this.field(c,"start_localtime")}get start_time(){return this.field(c,"start_time")}get station_name(){return this.field(o,"station_name")}get stop_time(){return this.field(c,"stop_time")}get subject(){return this.field(W,"subject")}get taper(){return this.field(o,"taper")}get thumbs(){return this.field(T,"thumbs")}get times(){return this.field(T,"times")}get title(){return this.field(o,"title")}get title_alt_script(){return this.field(o,"title-alt-script")}get transferer(){return this.field(o,"transferer")}get track(){return this.field(d,"track")}get tts_version(){return this.field(o,"tts_version")}get tuner(){return this.field(he,"tuner")}get type(){return this.field(o,"type")}get updatedate(){return this.field(c,"updatedate")}get updater(){return this.field(o,"updater")}get uploader(){return this.field(o,"uploader")}get uploadsoftware(){return this.field(o,"uploadsoftware")}get utc_offset(){return this.field(ce,"utc_offset")}get venue(){return this.field(o,"venue")}get video_codec(){return this.field(o,"video_codec")}get volume(){return this.field(o,"volume")}get website(){return this.field(o,"website")}get week(){return this.field(d,"week")}get width(){return this.field(d,"width")}get year(){return this.field(d,"year")}field(i,...s){return F(this.rawMetadata,l=>new i(l),...s)}constructor(i={}){this.rawMetadata=i}}r([e()],t.prototype,"access");r([e()],t.prototype,"adder");r([e()],t.prototype,"amrc_id");r([e()],t.prototype,"archiveit_account_id");r([e()],t.prototype,"archiveit_account_organization_name");r([e()],t.prototype,"archiveit_collection_id");r([e()],t.prototype,"archiveit_collection_name");r([e()],t.prototype,"archiveit_job_type");r([e()],t.prototype,"audit_time_minutes");r([e()],t.prototype,"auditor");r([e()],t.prototype,"author");r([e()],t.prototype,"autocrop_version");r([e()],t.prototype,"bookplateleaf");r([e()],t.prototype,"bookreader_defaults");r([e()],t.prototype,"boxid");r([e()],t.prototype,"camera");r([e()],t.prototype,"cameraman");r([e()],t.prototype,"canister");r([e()],t.prototype,"case_name");r([e()],t.prototype,"col_number");r([e()],t.prototype,"collection_added");r([e()],t.prototype,"collection_library");r([e()],t.prototype,"collection_set");r([e()],t.prototype,"copyright_holder");r([e()],t.prototype,"court");r([e()],t.prototype,"crawler");r([e()],t.prototype,"crawljob");r([e()],t.prototype,"curation");r([e()],t.prototype,"dari_title");r([e()],t.prototype,"dari_title_romanized");r([e()],t.prototype,"date_case_filed");r([e()],t.prototype,"date_case_terminated");r([e()],t.prototype,"date_created");r([e()],t.prototype,"date_last_filing");r([e()],t.prototype,"derive_submittime");r([e()],t.prototype,"derive_version");r([e()],t.prototype,"discs");r([e()],t.prototype,"docket_num");r([e()],t.prototype,"external_metadata_update");r([e()],t.prototype,"fail_reasons");r([e()],t.prototype,"filesxml");r([e()],t.prototype,"firstfiledate");r([e()],t.prototype,"firstfileserial");r([e()],t.prototype,"foldoutcount");r([e()],t.prototype,"format");r([e()],t.prototype,"geo_restricted");r([e()],t.prototype,"guid");r([e()],t.prototype,"has_mp3");r([e()],t.prototype,"height");r([e()],t.prototype,"hidden");r([e()],t.prototype,"ia_orig__runtime");r([e()],t.prototype,"access_restricted_item");r([e()],t.prototype,"addeddate");r([e()],t.prototype,"aspect_ratio");r([e()],t.prototype,"audio_codec");r([e()],t.prototype,"audio_sample_rate");r([e()],t.prototype,"avg_rating");r([e()],t.prototype,"backup_location");r([e()],t.prototype,"ccnum");r([e()],t.prototype,"closed_captioning");r([e()],t.prototype,"collection");r([e()],t.prototype,"collections_raw");r([e()],t.prototype,"collection_size");r([e()],t.prototype,"color");r([e()],t.prototype,"contact");r([e()],t.prototype,"contributor");r([e()],t.prototype,"coverage");r([e()],t.prototype,"creator");r([e()],t.prototype,"creator_alt_script");r([e()],t.prototype,"credits");r([e()],t.prototype,"collection_layout");r([e()],t.prototype,"date");r([e()],t.prototype,"description");r([e()],t.prototype,"downloads");r([e()],t.prototype,"duration");r([e()],t.prototype,"external_identifier");r([e()],t.prototype,"external_link");r([e()],t.prototype,"files_count");r([e()],t.prototype,"frames_per_second");r([e()],t.prototype,"identifier_access");r([e()],t.prototype,"identifier_ark");r([e()],t.prototype,"identifier_bib");r([e()],t.prototype,"image_count");r([e()],t.prototype,"imagecount");r([e()],t.prototype,"indexdate");r([e()],t.prototype,"invoice");r([e()],t.prototype,"isbn");r([e()],t.prototype,"issue");r([e()],t.prototype,"issue_count");r([e()],t.prototype,"issue_page_count");r([e()],t.prototype,"item_count");r([e()],t.prototype,"item_size");r([e()],t.prototype,"language");r([e()],t.prototype,"lastdate");r([e()],t.prototype,"lastfiledate");r([e()],t.prototype,"lastfileserial");r([e()],t.prototype,"length");r([e()],t.prototype,"license");r([e()],t.prototype,"licenseurl");r([e()],t.prototype,"lineage");r([e()],t.prototype,"mature_content");r([e()],t.prototype,"md5");r([e()],t.prototype,"md5contents");r([e()],t.prototype,"md5s");r([e()],t.prototype,"medium");r([e()],t.prototype,"metadata_operator");r([e()],t.prototype,"metasource_catalog");r([e()],t.prototype,"monochromatic");r([e()],t.prototype,"month");r([e()],t.prototype,"mediatype");r([e()],t.prototype,"mpeg_program");r([e()],t.prototype,"next_item");r([e()],t.prototype,"noarchivetorrent");r([e()],t.prototype,"noindex");r([e()],t.prototype,"notes");r([e()],t.prototype,"num_favorites");r([e()],t.prototype,"num_reviews");r([e()],t.prototype,"numeric_id");r([e()],t.prototype,"numwarcs");r([e()],t.prototype,"ocr");r([e()],t.prototype,"ocr_autonomous");r([e()],t.prototype,"ocr_detected_lang");r([e()],t.prototype,"ocr_detected_lang_conf");r([e()],t.prototype,"ocr_detected_script");r([e()],t.prototype,"ocr_detected_script_conf");r([e()],t.prototype,"ocr_invalid_language");r([e()],t.prototype,"ocr_module_version");r([e()],t.prototype,"ocr_parameters");r([e()],t.prototype,"old_pallet");r([e()],t.prototype,"openlibrary_edition");r([e()],t.prototype,"openlibrary_work");r([e()],t.prototype,"operator");r([e()],t.prototype,"originalurl");r([e()],t.prototype,"osf_category");r([e()],t.prototype,"osf_project");r([e()],t.prototype,"osf_registration_doi");r([e()],t.prototype,"osf_registration_schema");r([e()],t.prototype,"osf_registry");r([e()],t.prototype,"osf_subjects");r([e()],t.prototype,"osf_tags");r([e()],t.prototype,"output_time_minutes");r([e()],t.prototype,"pacer_case_num");r([e()],t.prototype,"packaging_time_minutes");r([e()],t.prototype,"page_number_confidence");r([e()],t.prototype,"page_number_module_version");r([e()],t.prototype,"page_progression");r([e()],t.prototype,"paginated");r([e()],t.prototype,"parse_date");r([e()],t.prototype,"parse_state");r([e()],t.prototype,"partner");r([e()],t.prototype,"pashto_title");r([e()],t.prototype,"pashto_title_romanized");r([e()],t.prototype,"pdf_degraded");r([e()],t.prototype,"pdf_module_version");r([e()],t.prototype,"pick");r([e()],t.prototype,"podcastindexid");r([e()],t.prototype,"post_text");r([e()],t.prototype,"ppi");r([e()],t.prototype,"previous_item");r([e()],t.prototype,"program");r([e()],t.prototype,"publicdate");r([e()],t.prototype,"publisher");r([e()],t.prototype,"political_religious_party");r([e()],t.prototype,"rcs_key");r([e()],t.prototype,"repub_state");r([e()],t.prototype,"republisher_date");r([e()],t.prototype,"republisher_operator");r([e()],t.prototype,"republisher_time");r([e()],t.prototype,"reviewdate");r([e()],t.prototype,"reviews_allowed");r([e()],t.prototype,"ribbon_state");r([e()],t.prototype,"ribbon_state_modify_date");r([e()],t.prototype,"rights");r([e()],t.prototype,"rights_holder");r([e()],t.prototype,"rssfeed");r([e()],t.prototype,"runtime");r([e()],t.prototype,"scan_time_minutes");r([e()],t.prototype,"scandate");r([e()],t.prototype,"scanfee");r([e()],t.prototype,"scanner");r([e()],t.prototype,"scanner_operator");r([e()],t.prototype,"scanningcenter");r([e()],t.prototype,"scribe3_search_catalog");r([e()],t.prototype,"scribe3_search_id");r([e()],t.prototype,"segments");r([e()],t.prototype,"sessionid");r([e()],t.prototype,"shndiscs");r([e()],t.prototype,"shotlist");r([e()],t.prototype,"signal_path");r([e()],t.prototype,"size");r([e()],t.prototype,"sizehint");r([e()],t.prototype,"software_version");r([e()],t.prototype,"sort_order");r([e()],t.prototype,"sound");r([e()],t.prototype,"soundcreator");r([e()],t.prototype,"soundtitle");r([e()],t.prototype,"source");r([e()],t.prototype,"source_pixel_height");r([e()],t.prototype,"source_pixel_width");r([e()],t.prototype,"source_url");r([e()],t.prototype,"sponsor");r([e()],t.prototype,"sponsordate");r([e()],t.prototype,"start_localtime");r([e()],t.prototype,"start_time");r([e()],t.prototype,"station_name");r([e()],t.prototype,"stop_time");r([e()],t.prototype,"subject");r([e()],t.prototype,"taper");r([e()],t.prototype,"thumbs");r([e()],t.prototype,"times");r([e()],t.prototype,"title");r([e()],t.prototype,"title_alt_script");r([e()],t.prototype,"transferer");r([e()],t.prototype,"track");r([e()],t.prototype,"tts_version");r([e()],t.prototype,"tuner");r([e()],t.prototype,"type");r([e()],t.prototype,"updatedate");r([e()],t.prototype,"updater");r([e()],t.prototype,"uploader");r([e()],t.prototype,"uploadsoftware");r([e()],t.prototype,"utc_offset");r([e()],t.prototype,"venue");r([e()],t.prototype,"video_codec");r([e()],t.prototype,"volume");r([e()],t.prototype,"website");r([e()],t.prototype,"week");r([e()],t.prototype,"width");r([e()],t.prototype,"year");var Ne=Object.defineProperty,Ke=Object.getOwnPropertyDescriptor,Y=(a,i,s,l)=>{for(var n=Ke(i,s),p=a.length-1,u;p>=0;p--)(u=a[p])&&(n=u(i,s,n)||n);return n&&Ne(i,s,n),n};class q{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return y(this.rawValue,i=>O.shared.parseValue(i),"reviewdate")}get createdate(){return y(this.rawValue,i=>O.shared.parseValue(i),"createdate")}get stars(){return y(this.rawValue,i=>b.shared.parseValue(i),"stars")}constructor(i={}){this.rawValue=i}}Y([e()],q.prototype,"reviewdate");Y([e()],q.prototype,"createdate");Y([e()],q.prototype,"stars");const Le=Object.freeze(Object.defineProperty({__proto__:null,AspectRatioField:ue,AspectRatioParser:A,BooleanField:m,ByteField:j,ChecksumField:Q,ChecksumParser:S,CurationField:pe,CurationParser:I,DateField:c,DurationField:D,EnumField:V,EnumParser:M,File:v,ListField:X,MediaTypeField:de,Metadata:t,MetadataField:g,NumberField:d,NumberListField:T,PageProgressionField:le,Review:q,StringField:o,StringListField:W,TunerField:he,TunerParser:E,UtcOffsetField:ce,UtcOffsetParser:R},Symbol.toStringTag,{value:"Module"}));var Ce=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,$=(a,i,s,l)=>{for(var n=l>1?void 0:l?Be(i,s):i,p=a.length-1,u;p>=0;p--)(u=a[p])&&(n=(l?u(i,s,n):u(n))||n);return l&&n&&Ce(i,s,n),n};const N=t,ee="nasa",Ue={identifier:"sample-item",mediatype:"movies",title:"A sample item",creator:"Internet Archive",subject:["sample","demo","metadata"],addeddate:"2021-05-20 13:37:15",publicdate:"2021-05-21 08:00:00",runtime:"1:02:03",item_size:"123456789",downloads:"42",imagecount:"17","access-restricted-item":"true",mystery_field:"a key the model does not read"},He=`import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`,qe=a=>a.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),Ge=[xe,Ve].map(qe).join(`

`),fe=Object.getOwnPropertyNames(N.prototype).filter(a=>typeof Object.getOwnPropertyDescriptor(N.prototype,a)?.get=="function").sort(),ge=(a,i)=>a[i],_e=a=>typeof a=="object"&&a!==null&&"rawValue"in a,te=a=>{let i=0;for(let s=Object.getPrototypeOf(a);s;s=Object.getPrototypeOf(s))i+=1;return i};function Je(a){return _e(a)?Object.entries(Le).filter(([,s])=>typeof s=="function"&&a instanceof s).sort(([,s],[,l])=>te(l)-te(s))[0]?.[0]??"unknown":typeof a}function We(a){if(!_e(a))return a;const i=a.values;return Array.isArray(i)?i:a.value}function me(a){return a==null?"—":a instanceof Date?a.toISOString():Array.isArray(a)?a.map(me).join(", "):typeof a=="object"?JSON.stringify(a):String(a)}function Qe(a){const i=new Set,s=new Proxy(a,{get(n,p){return typeof p=="string"&&i.add(p),Reflect.get(n,p)}}),l=new N(s);for(const n of fe)ge(l,n);return i}let k=class extends ye{constructor(){super(...arguments),this.identifier="",this.sample=!1,this.loading=!1}render(){return P`
      <service-template
        serviceName="item-metadata"
        .usage=${He}
        .apiSource=${Ge}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${ee}
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
            ${this.result?this.renderResult(this.result):we}
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
    `}renderResult(a){return P`<code class="call">${a.call}</code> ${a.error?P`<code class="error">${a.error}</code>`:P`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${a.rows.map(i=>P`<tr>
                      <th scope="row">${i.name}</th>
                      <td>${i.type}</td>
                      <td>${i.value}</td>
                    </tr>`)}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${a.unmodeled.length?a.unmodeled.join(", "):"none"}
            </p>`}`}async run(a){a.preventDefault();const i=this.identifier.trim()||ee,s=`https://archive.org/metadata/${encodeURIComponent(i)}`,l=`new Metadata(${this.sample?"sample":`response.metadata /* ${i} */`})`;this.loading=!0;try{let n;if(this.sample)n=Ue;else{const f=await fetch(s);if(!f.ok)throw new Error(`Request failed (${f.status})`);const w=await f.json();if(!w.metadata)throw new Error(`No item found for "${i}"`);n=w.metadata}const p=new N(n),u=fe.map(f=>({name:f,value:ge(p,f)})).filter(({value:f})=>f!==void 0).map(({name:f,value:w})=>({name:f,type:Je(w),value:me(We(w))})),_=Qe(n),h=Object.keys(n).filter(f=>!_.has(f)).sort();this.result={call:l,rows:u,unmodeled:h}}catch(n){this.result={call:this.sample?l:`fetch("${s}")`,rows:[],unmodeled:[],error:`${n instanceof Error?n.message:n}${this.sample?"":'. Try "Sample data".'}`}}finally{this.loading=!1}}static get styles(){return ve`
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
    `}};$([H()],k.prototype,"identifier",2);$([H()],k.prototype,"sample",2);$([H()],k.prototype,"loading",2);$([H()],k.prototype,"result",2);k=$([be("item-metadata-story")],k);export{k as ItemMetadataStory};
