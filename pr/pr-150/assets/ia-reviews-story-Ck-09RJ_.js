import{b as w,r as G,n as b,c as gt,i as yt,m as R,A as F,o as ai,a as _t,e as li}from"./index-CxsC5APA.js";import{_ as n}from"./tslib.es6-kHcLnhpD.js";import{N as fe,B as ci,D as ui,a as di,b as ft,S as pi}from"./string-tEdD6AYF.js";import"./ia-button-CpMFXUqF.js";import"./story-template-wdBXiqba.js";import"./theme-styles-DszNtC48.js";import"./ia-status-indicator-BfOHXsNh.js";import"./localized-decorator-BGtJnd4s.js";import"./icon-box-CedFE06v.js";function s(r){let e,i,a;return e=r,(c,p,f)=>{if(f.value!=null)f.value=Ur(f.value,e,i,a);else if(f.get!=null)f.get=Ur(f.get,e,i,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ft=new Map;function Ur(r,e,i=0,a){const c=Symbol("__memoized_map__");return function(...p){let f;this.hasOwnProperty(c)||Object.defineProperty(this,c,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let g=this[c];if(Array.isArray(a))for(const _ of a)Ft.has(_)?Ft.get(_).push(g):Ft.set(_,[g]);if(e||p.length>0||i>0){let _;e===!0?_=p.map(j=>j.toString()).join("!"):e?_=e.apply(this,p):_=p[0];const B=`${_}__timestamp`;let O=!1;if(i>0)if(!g.has(B))O=!0;else{let j=g.get(B);O=Date.now()-j>i}g.has(_)&&!O?f=g.get(_):(f=r.apply(this,p),g.set(_,f),i>0&&g.set(B,Date.now()))}else{const _=this;g.has(_)?f=g.get(_):(f=r.apply(this,p),g.set(_,f))}return f}}class hi{constructor(e,i){this.separators=[";",","],this.parser=e,i&&i.separators&&(this.separators=i.separators)}parseValue(e){const i=String(e);let a=[];for(const c of this.separators)if(a=i.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(p=>p.trim()).map(p=>this.parser.parseValue(p)),c=[];return a.forEach(p=>{p!==void 0&&c.push(p)}),c}}function Me(r,e,...i){for(const a of i){const c=r[a];if(c!=null)return e(c)}}function oe(r,e,...i){return Me(r,a=>e(a),...i)}class le{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=fe.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return oe(this.rawValue,e=>ci.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return oe(this.rawValue,e=>ui.shared.parseValue(e),"length")}get height(){return oe(this.rawValue,e=>fe.shared.parseValue(e),"height")}get width(){return oe(this.rawValue,e=>fe.shared.parseValue(e),"width")}get track(){return oe(this.rawValue,e=>fe.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return oe(this.rawValue,e=>fe.shared.parseValue(e),"bitrate")}get private(){return oe(this.rawValue,e=>di.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([s()],le.prototype,"mtime",null);n([s()],le.prototype,"size",null);n([s()],le.prototype,"length",null);n([s()],le.prototype,"height",null);n([s()],le.prototype,"width",null);n([s()],le.prototype,"track",null);n([s()],le.prototype,"bitrate",null);n([s()],le.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,i){this.parser=e,this.rawValue=i}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],i=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?i.push(...c):c!==void 0&&i.push(c)}),i}}n([s()],W.prototype,"values",null);n([s()],W.prototype,"value",null);class se extends W{constructor(e){super(di.shared,e)}}class D extends W{constructor(e){super(ft.shared,e)}}class zt extends W{constructor(e){super(ui.shared,e)}}class v extends W{constructor(e){super(fe.shared,e)}}class u extends W{constructor(e){super(pi.shared,e)}}class ze{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends W{constructor(e,i){super(i,e)}}const Xi=new ze(["rl","lr"]);class Ki extends $e{constructor(e){super(e,Xi)}}class ut extends W{constructor(e){super(ci.shared,e)}}const Zi=new ze(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class Ji extends $e{constructor(e){super(e,Zi)}}class fi extends W{constructor(e,i){super(i,e)}}class Br extends fi{constructor(e){const i=new hi(pi.shared);super(e,i)}}class Ut extends fi{constructor(e){const i=new hi(fe.shared);super(e,i)}}const Qi=/^([0-9a-f]{32})\s+\*?(.+)$/i,en=/^(.+):([0-9a-f]{32})$/i;function tn(r){const e=r.match(Qi);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const i=r.match(en);if(i)return{file:i[1].trim(),md5:i[2].toLowerCase()}}class Yt{parseValue(e){if(typeof e!="string")return;const i=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(tn).filter(a=>a!==void 0);return i.length?i:void 0}}Yt.shared=new Yt;class Hr extends W{constructor(e){super(Yt.shared,e)}}function dt(r,e){var i;const a=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(i=a?.[1])===null||i===void 0?void 0:i.trim();return c||void 0}class qt{parseValue(e){if(typeof e!="string")return;const i=dt(e,"curator"),a=dt(e,"date"),c=dt(e,"comment"),p=dt(e,"state");if(!(!i&&!a&&!c&&!p))return{curator:i,date:a?ft.shared.parseValue(a):void 0,comment:c,state:p}}}qt.shared=new qt;class rn extends W{constructor(e){super(qt.shared,e)}}class Xt{parseValue(e){if(typeof e!="string")return;const i=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!i)return;const a=parseFloat(i[1]),c=parseFloat(i[2]);if(c)return{width:a,height:c,decimal:a/c}}}Xt.shared=new Xt;class nn extends W{constructor(e){super(Xt.shared,e)}}class Kt{parseValue(e){const i=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!i)return;const a=i[1]==="-"?-1:1,c=parseInt(i[2],10),p=parseInt(i[3],10);return{hours:a*c,minutes:p,totalMinutes:a*(c*60+p)}}}Kt.shared=new Kt;class sn extends W{constructor(e){super(Kt.shared,e)}}class Zt{parseValue(e){if(typeof e!="string")return;const i=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(i)return{channel:parseInt(i[1],10),frequencyMhz:i[2]?parseFloat(i[2]):void 0}}}Zt.shared=new Zt;class on extends W{constructor(e){super(Zt.shared,e)}}const an=new ze(["true","none","frozen"]),ln=new ze(["sound","silent"]),cn=new ze(["color","b&w"]),un=new ze(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(v,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(v,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(v,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(v,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,un),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(rn,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(v,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(v,"firstfileserial")}get foldoutcount(){return this.field(v,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(se,"has_mp3")}get height(){return this.field(v,"height")}get hidden(){return this.field(se,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(se,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(nn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(v,"audio_sample_rate")}get avg_rating(){return this.field(v,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(se,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(ut,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,cn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(v,"downloads")}get duration(){return this.field(zt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(v,"files_count")}get frames_per_second(){return this.field(v,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(v,"image_count")}get imagecount(){return this.field(v,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(v,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(v,"issue_count")}get issue_page_count(){return this.field(v,"issue_page_count")}get item_count(){return this.field(v,"item_count")}get item_size(){return this.field(ut,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(v,"lastfileserial")}get length(){return this.field(zt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(se,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Hr,"md5contents")}get md5s(){return this.field(Hr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(se,"monochromatic")}get month(){return this.field(v,"month")}get mediatype(){return this.field(Ji,"mediatype")}get mpeg_program(){return this.field(v,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(se,"noarchivetorrent")}get noindex(){return this.field(se,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(v,"num_favorites")}get num_reviews(){return this.field(v,"num_reviews")}get numeric_id(){return this.field(v,"numeric_id")}get numwarcs(){return this.field(v,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(se,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(v,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(v,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(v,"output_time_minutes")}get pacer_case_num(){return this.field(v,"pacer-case-num")}get packaging_time_minutes(){return this.field(v,"packaging_time_minutes")}get page_number_confidence(){return this.field(v,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(Ki,"page-progression","page_progression")}get paginated(){return this.field(se,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(v,"pick")}get podcastindexid(){return this.field(v,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(v,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(v,"rcs_key")}get repub_state(){return this.field(v,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(Br,"republisher_operator")}get republisher_time(){return this.field(v,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,an),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(zt,"runtime")}get scan_time_minutes(){return this.field(v,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Ut,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(v,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(ut,"size")}get sizehint(){return this.field(ut,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,ln),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(v,"source_pixel_height")}get source_pixel_width(){return this.field(v,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(Br,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Ut,"thumbs")}get times(){return this.field(Ut,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(v,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(on,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(sn,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(v,"week")}get width(){return this.field(v,"width")}get year(){return this.field(v,"year")}field(e,...i){return Me(this.rawMetadata,a=>new e(a),...i)}constructor(e={}){this.rawMetadata=e}}n([s()],o.prototype,"access",null);n([s()],o.prototype,"adder",null);n([s()],o.prototype,"amrc_id",null);n([s()],o.prototype,"archiveit_account_id",null);n([s()],o.prototype,"archiveit_account_organization_name",null);n([s()],o.prototype,"archiveit_collection_id",null);n([s()],o.prototype,"archiveit_collection_name",null);n([s()],o.prototype,"archiveit_job_type",null);n([s()],o.prototype,"audit_time_minutes",null);n([s()],o.prototype,"auditor",null);n([s()],o.prototype,"author",null);n([s()],o.prototype,"autocrop_version",null);n([s()],o.prototype,"bookplateleaf",null);n([s()],o.prototype,"bookreader_defaults",null);n([s()],o.prototype,"boxid",null);n([s()],o.prototype,"camera",null);n([s()],o.prototype,"cameraman",null);n([s()],o.prototype,"canister",null);n([s()],o.prototype,"case_name",null);n([s()],o.prototype,"col_number",null);n([s()],o.prototype,"collection_added",null);n([s()],o.prototype,"collection_library",null);n([s()],o.prototype,"collection_set",null);n([s()],o.prototype,"copyright_holder",null);n([s()],o.prototype,"court",null);n([s()],o.prototype,"crawler",null);n([s()],o.prototype,"crawljob",null);n([s()],o.prototype,"curation",null);n([s()],o.prototype,"dari_title",null);n([s()],o.prototype,"dari_title_romanized",null);n([s()],o.prototype,"date_case_filed",null);n([s()],o.prototype,"date_case_terminated",null);n([s()],o.prototype,"date_created",null);n([s()],o.prototype,"date_last_filing",null);n([s()],o.prototype,"derive_submittime",null);n([s()],o.prototype,"derive_version",null);n([s()],o.prototype,"discs",null);n([s()],o.prototype,"docket_num",null);n([s()],o.prototype,"external_metadata_update",null);n([s()],o.prototype,"fail_reasons",null);n([s()],o.prototype,"filesxml",null);n([s()],o.prototype,"firstfiledate",null);n([s()],o.prototype,"firstfileserial",null);n([s()],o.prototype,"foldoutcount",null);n([s()],o.prototype,"format",null);n([s()],o.prototype,"geo_restricted",null);n([s()],o.prototype,"guid",null);n([s()],o.prototype,"has_mp3",null);n([s()],o.prototype,"height",null);n([s()],o.prototype,"hidden",null);n([s()],o.prototype,"ia_orig__runtime",null);n([s()],o.prototype,"access_restricted_item",null);n([s()],o.prototype,"addeddate",null);n([s()],o.prototype,"aspect_ratio",null);n([s()],o.prototype,"audio_codec",null);n([s()],o.prototype,"audio_sample_rate",null);n([s()],o.prototype,"avg_rating",null);n([s()],o.prototype,"backup_location",null);n([s()],o.prototype,"ccnum",null);n([s()],o.prototype,"closed_captioning",null);n([s()],o.prototype,"collection",null);n([s()],o.prototype,"collections_raw",null);n([s()],o.prototype,"collection_size",null);n([s()],o.prototype,"color",null);n([s()],o.prototype,"contact",null);n([s()],o.prototype,"contributor",null);n([s()],o.prototype,"coverage",null);n([s()],o.prototype,"creator",null);n([s()],o.prototype,"creator_alt_script",null);n([s()],o.prototype,"credits",null);n([s()],o.prototype,"collection_layout",null);n([s()],o.prototype,"date",null);n([s()],o.prototype,"description",null);n([s()],o.prototype,"downloads",null);n([s()],o.prototype,"duration",null);n([s()],o.prototype,"external_identifier",null);n([s()],o.prototype,"external_link",null);n([s()],o.prototype,"files_count",null);n([s()],o.prototype,"frames_per_second",null);n([s()],o.prototype,"identifier_access",null);n([s()],o.prototype,"identifier_ark",null);n([s()],o.prototype,"identifier_bib",null);n([s()],o.prototype,"image_count",null);n([s()],o.prototype,"imagecount",null);n([s()],o.prototype,"indexdate",null);n([s()],o.prototype,"invoice",null);n([s()],o.prototype,"isbn",null);n([s()],o.prototype,"issue",null);n([s()],o.prototype,"issue_count",null);n([s()],o.prototype,"issue_page_count",null);n([s()],o.prototype,"item_count",null);n([s()],o.prototype,"item_size",null);n([s()],o.prototype,"language",null);n([s()],o.prototype,"lastdate",null);n([s()],o.prototype,"lastfiledate",null);n([s()],o.prototype,"lastfileserial",null);n([s()],o.prototype,"length",null);n([s()],o.prototype,"license",null);n([s()],o.prototype,"licenseurl",null);n([s()],o.prototype,"lineage",null);n([s()],o.prototype,"mature_content",null);n([s()],o.prototype,"md5",null);n([s()],o.prototype,"md5contents",null);n([s()],o.prototype,"md5s",null);n([s()],o.prototype,"medium",null);n([s()],o.prototype,"metadata_operator",null);n([s()],o.prototype,"metasource_catalog",null);n([s()],o.prototype,"monochromatic",null);n([s()],o.prototype,"month",null);n([s()],o.prototype,"mediatype",null);n([s()],o.prototype,"mpeg_program",null);n([s()],o.prototype,"next_item",null);n([s()],o.prototype,"noarchivetorrent",null);n([s()],o.prototype,"noindex",null);n([s()],o.prototype,"notes",null);n([s()],o.prototype,"num_favorites",null);n([s()],o.prototype,"num_reviews",null);n([s()],o.prototype,"numeric_id",null);n([s()],o.prototype,"numwarcs",null);n([s()],o.prototype,"ocr",null);n([s()],o.prototype,"ocr_autonomous",null);n([s()],o.prototype,"ocr_detected_lang",null);n([s()],o.prototype,"ocr_detected_lang_conf",null);n([s()],o.prototype,"ocr_detected_script",null);n([s()],o.prototype,"ocr_detected_script_conf",null);n([s()],o.prototype,"ocr_invalid_language",null);n([s()],o.prototype,"ocr_module_version",null);n([s()],o.prototype,"ocr_parameters",null);n([s()],o.prototype,"old_pallet",null);n([s()],o.prototype,"openlibrary_edition",null);n([s()],o.prototype,"openlibrary_work",null);n([s()],o.prototype,"operator",null);n([s()],o.prototype,"originalurl",null);n([s()],o.prototype,"osf_category",null);n([s()],o.prototype,"osf_project",null);n([s()],o.prototype,"osf_registration_doi",null);n([s()],o.prototype,"osf_registration_schema",null);n([s()],o.prototype,"osf_registry",null);n([s()],o.prototype,"osf_subjects",null);n([s()],o.prototype,"osf_tags",null);n([s()],o.prototype,"output_time_minutes",null);n([s()],o.prototype,"pacer_case_num",null);n([s()],o.prototype,"packaging_time_minutes",null);n([s()],o.prototype,"page_number_confidence",null);n([s()],o.prototype,"page_number_module_version",null);n([s()],o.prototype,"page_progression",null);n([s()],o.prototype,"paginated",null);n([s()],o.prototype,"parse_date",null);n([s()],o.prototype,"parse_state",null);n([s()],o.prototype,"partner",null);n([s()],o.prototype,"pashto_title",null);n([s()],o.prototype,"pashto_title_romanized",null);n([s()],o.prototype,"pdf_degraded",null);n([s()],o.prototype,"pdf_module_version",null);n([s()],o.prototype,"pick",null);n([s()],o.prototype,"podcastindexid",null);n([s()],o.prototype,"post_text",null);n([s()],o.prototype,"ppi",null);n([s()],o.prototype,"previous_item",null);n([s()],o.prototype,"program",null);n([s()],o.prototype,"publicdate",null);n([s()],o.prototype,"publisher",null);n([s()],o.prototype,"political_religious_party",null);n([s()],o.prototype,"rcs_key",null);n([s()],o.prototype,"repub_state",null);n([s()],o.prototype,"republisher_date",null);n([s()],o.prototype,"republisher_operator",null);n([s()],o.prototype,"republisher_time",null);n([s()],o.prototype,"reviewdate",null);n([s()],o.prototype,"reviews_allowed",null);n([s()],o.prototype,"ribbon_state",null);n([s()],o.prototype,"ribbon_state_modify_date",null);n([s()],o.prototype,"rights",null);n([s()],o.prototype,"rights_holder",null);n([s()],o.prototype,"rssfeed",null);n([s()],o.prototype,"runtime",null);n([s()],o.prototype,"scan_time_minutes",null);n([s()],o.prototype,"scandate",null);n([s()],o.prototype,"scanfee",null);n([s()],o.prototype,"scanner",null);n([s()],o.prototype,"scanner_operator",null);n([s()],o.prototype,"scanningcenter",null);n([s()],o.prototype,"scribe3_search_catalog",null);n([s()],o.prototype,"scribe3_search_id",null);n([s()],o.prototype,"segments",null);n([s()],o.prototype,"sessionid",null);n([s()],o.prototype,"shndiscs",null);n([s()],o.prototype,"shotlist",null);n([s()],o.prototype,"signal_path",null);n([s()],o.prototype,"size",null);n([s()],o.prototype,"sizehint",null);n([s()],o.prototype,"software_version",null);n([s()],o.prototype,"sort_order",null);n([s()],o.prototype,"sound",null);n([s()],o.prototype,"soundcreator",null);n([s()],o.prototype,"soundtitle",null);n([s()],o.prototype,"source",null);n([s()],o.prototype,"source_pixel_height",null);n([s()],o.prototype,"source_pixel_width",null);n([s()],o.prototype,"source_url",null);n([s()],o.prototype,"sponsor",null);n([s()],o.prototype,"sponsordate",null);n([s()],o.prototype,"start_localtime",null);n([s()],o.prototype,"start_time",null);n([s()],o.prototype,"station_name",null);n([s()],o.prototype,"stop_time",null);n([s()],o.prototype,"subject",null);n([s()],o.prototype,"taper",null);n([s()],o.prototype,"thumbs",null);n([s()],o.prototype,"times",null);n([s()],o.prototype,"title",null);n([s()],o.prototype,"title_alt_script",null);n([s()],o.prototype,"transferer",null);n([s()],o.prototype,"track",null);n([s()],o.prototype,"tts_version",null);n([s()],o.prototype,"tuner",null);n([s()],o.prototype,"type",null);n([s()],o.prototype,"updatedate",null);n([s()],o.prototype,"updater",null);n([s()],o.prototype,"uploader",null);n([s()],o.prototype,"uploadsoftware",null);n([s()],o.prototype,"utc_offset",null);n([s()],o.prototype,"venue",null);n([s()],o.prototype,"video_codec",null);n([s()],o.prototype,"volume",null);n([s()],o.prototype,"website",null);n([s()],o.prototype,"week",null);n([s()],o.prototype,"width",null);n([s()],o.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return oe(this.rawValue,e=>ft.shared.parseValue(e),"reviewdate")}get createdate(){return oe(this.rawValue,e=>ft.shared.parseValue(e),"createdate")}get stars(){return oe(this.rawValue,e=>fe.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([s()],me.prototype,"reviewdate",null);n([s()],me.prototype,"createdate",null);n([s()],me.prototype,"stars",null);class dn{constructor(e){var i,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(i=e.files)===null||i===void 0?void 0:i.map(c=>new le(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new me(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class Jt extends Error{constructor(e,i,a){super(i),this.name=e,this.type=e,this.details=a}}class pn{constructor(e){var i;if(this.baseUrl=(i=e?.baseUrl)!==null&&i!==void 0?i:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,i){const a=i?`/${i}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,i){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let p;try{const f=(a=i?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};p=await fetch(c.href,f)}catch(f){const g=f instanceof Error?f.message:typeof f=="string"?f:"Unknown error";return this.getErrorResult(Te.networkError,g)}try{const f=await p.json(),g=f.error;if(g){const _=f.forensics;return this.getErrorResult(Te.searchEngineError,g,_)}else return{success:f}}catch(f){const g=f instanceof Error?f.message:typeof f=="string"?f:"Unknown error";return this.getErrorResult(Te.decodingError,g)}}getErrorResult(e,i,a){return{error:new Jt(e,i,a)}}}class jr{constructor(e){this.backend=e}async fetchMetadata(e){var i;const a=await this.backend.fetchMetadata(e);return a.error?a:((i=a.success)===null||i===void 0?void 0:i.metadata)===void 0?{error:new Jt(Te.itemNotFound)}:{success:new dn(a.success)}}async fetchMetadataValue(e,i){var a;const c=await this.backend.fetchMetadata(e,i);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new Jt(Te.itemNotFound)}:{success:c.success.result}}}jr.default=new jr(new pn);function Vr(r){return new Promise(e=>setTimeout(e,r))}class Qt{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,i){return e===null||i>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,i){const a=i?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}Qt.shared=new Qt;class er{shouldRetry(){return!1}retryDelay(){return null}}er.shared=new er;class ir{}ir.default=Qt.shared;ir.noRetry=er.shared;const mi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class hn{constructor(e){this.retryConfig=ir.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,i){const a=mi(i);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,i,a){var c,p;const f=typeof e=="string"?e:e.url;try{const g=await fetch(e,a?.requestInit);if(g.ok)return g;g.status>=400&&g.status<600&&this.log4xx5xxResponse(g);const _=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(_.shouldRetry(g,i)){const O=_.retryDelay(i,g);if(O!==null)return await Vr(O),this.logRetryEvent(f,i,g.statusText,g.status),this.doFetchRetry(e,i+1,a)}return this.logFailureEvent(f,g.status),g}catch(g){if(this.isContentBlockerError(g))throw this.logContentBlockingEvent(f,g),g;const _=(p=a?.retryConfig)!==null&&p!==void 0?p:this.retryConfig;if(_.shouldRetry(null,i)){const O=_.retryDelay(i);if(O!==null)return await Vr(O),this.logRetryEvent(f,i,g,g),this.doFetchRetry(e,i+1,a)}throw this.logFailureEvent(f,g),g}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,i,a,c){var p;(p=this.analyticsHandler)===null||p===void 0||p.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${i}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,i){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${i}, url: ${e}`})}log4xx5xxResponse(e){var i;const a=e.status;(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,i){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${i}, url: ${e}`})}}const fn=new Set(["POST","PUT","DELETE","PATCH"]);class nr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new hn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,i){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const f=typeof e=="string"?e:e.url;a=this.addSearchParams(f,{reCache:"1"})}const p=await this.withCsrfToken(a,i);return this.fetchRetrier.fetchRetry(a,p)}async fetchApiResponse(e,i){const a={};i?.includeCredentials&&(a.credentials="include"),i?.method&&(a.method=i.method),i?.body&&(a.body=i.body);const c=new Headers({Accept:"application/json"});i?.headers&&new Headers(i.headers).forEach((_,B)=>{c.set(B,_)}),a.headers=c;const p=i?.queryParams?this.addSearchParams(e,i.queryParams):e;return await(await this.fetch(p,{requestInit:a,retryConfig:i?.retryConfig,includeCsrfToken:i?.includeCsrfToken})).json()}async fetchApiPathResponse(e,i){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,i)}async fetchIAApiResponse(e,i){return this.fetchApiPathResponse(e,i)}async withCsrfToken(e,i){var a,c,p,f;if(!this.getCsrfToken)return i;const g=(a=mi(i))!==null&&a!==void 0?a:{};if(!g.includeCsrfToken)return i;const _=(c=g.requestInit)!==null&&c!==void 0?c:{},B=((f=(p=_.method)!==null&&p!==void 0?p:typeof e!="string"?e.method:void 0)!==null&&f!==void 0?f:"GET").toUpperCase();if(!fn.has(B))return i;const O=new Headers(_.headers);return O.has("X-CSRF-Token")?i:(O.set("X-CSRF-Token",await this.getCsrfToken()),{...g,requestInit:{..._,headers:O}})}addSearchParams(e,i){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),p=a===-1?e:e.slice(0,a),f=p.indexOf("?"),g=f===-1?p:p.slice(0,f),_=new URLSearchParams(f===-1?"":p.slice(f+1)),B=nr.asSearchParams(i),O=new Set;B.forEach((Xe,ae)=>{O.has(ae)||(O.add(ae),_.delete(ae))}),B.forEach((Xe,ae)=>{_.append(ae,Xe)});const j=_.toString();return`${g}${j?`?${j}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const i=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&i.append(a,String(c))}),i}}class mn extends nr{constructor(e){var i;const a={...e};a.iaApiBaseUrl=(i=e?.iaApiBaseUrl)!==null&&i!==void 0?i:"https://archive.org",super(a)}}const gn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Gr(r=""){if(r.length<=40)return r;const i=r.substring(0,40)+"...";return w`<span title="${r}">${i}</span>`}function Wr(r,e){(e==null||e>r.length)&&(e=r.length);for(var i=0,a=Array(e);i<e;i++)a[i]=r[i];return a}function yn(r){if(Array.isArray(r))return r}function _n(r,e){var i=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(i!=null){var a,c,p,f,g=[],_=!0,B=!1;try{if(p=(i=i.call(r)).next,e!==0)for(;!(_=(a=p.call(i)).done)&&(g.push(a.value),g.length!==e);_=!0);}catch(O){B=!0,c=O}finally{try{if(!_&&i.return!=null&&(f=i.return(),Object(f)!==f))return}finally{if(B)throw c}}return g}}function vn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wn(r,e){return yn(r)||_n(r,e)||bn(r,e)||vn()}function bn(r,e){if(r){if(typeof r=="string")return Wr(r,e);var i={}.toString.call(r).slice(8,-1);return i==="Object"&&r.constructor&&(i=r.constructor.name),i==="Map"||i==="Set"?Array.from(r):i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Wr(r,e):void 0}}const gi=Object.entries,Yr=Object.setPrototypeOf,Tn=Object.isFrozen,En=Object.getPrototypeOf,Sn=Object.getOwnPropertyDescriptor;let z=Object.freeze,U=Object.seal,Ne=Object.create,yi=typeof Reflect<"u"&&Reflect,tr=yi.apply,rr=yi.construct;z||(z=function(e){return e});U||(U=function(e){return e});tr||(tr=function(e,i){for(var a=arguments.length,c=new Array(a>2?a-2:0),p=2;p<a;p++)c[p-2]=arguments[p];return e.apply(i,c)});rr||(rr=function(e){for(var i=arguments.length,a=new Array(i>1?i-1:0),c=1;c<i;c++)a[c-1]=arguments[c];return new e(...a)});const be=$(Array.prototype.forEach),Rn=$(Array.prototype.lastIndexOf),qr=$(Array.prototype.pop),Ge=$(Array.prototype.push),An=$(Array.prototype.splice),Fe=Array.isArray,qe=$(String.prototype.toLowerCase),Bt=$(String.prototype.toString),Xr=$(String.prototype.match),We=$(String.prototype.replace),Kr=$(String.prototype.indexOf),xn=$(String.prototype.trim),Cn=$(Number.prototype.toString),Ln=$(Boolean.prototype.toString),Zr=typeof BigInt>"u"?null:$(BigInt.prototype.toString),Jr=typeof Symbol>"u"?null:$(Symbol.prototype.toString),q=$(Object.prototype.hasOwnProperty),Ye=$(Object.prototype.toString),H=$(RegExp.prototype.test),pe=kn(TypeError);function $(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var i=arguments.length,a=new Array(i>1?i-1:0),c=1;c<i;c++)a[c-1]=arguments[c];return tr(r,e,a)}}function kn(r){return function(){for(var e=arguments.length,i=new Array(e),a=0;a<e;a++)i[a]=arguments[a];return rr(r,i)}}function S(r,e){let i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qe;if(Yr&&Yr(r,null),!Fe(e))return r;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const p=i(c);p!==c&&(Tn(e)||(e[a]=p),c=p)}r[c]=!0}return r}function Dn(r){for(let e=0;e<r.length;e++)q(r,e)||(r[e]=null);return r}function Z(r){const e=Ne(null);for(const a of gi(r)){var i=wn(a,2);const c=i[0],p=i[1];q(r,c)&&(Fe(p)?e[c]=Dn(p):p&&typeof p=="object"&&p.constructor===Object?e[c]=Z(p):e[c]=p)}return e}function On(r){switch(typeof r){case"string":return r;case"number":return Cn(r);case"boolean":return Ln(r);case"bigint":return Zr?Zr(r):"0";case"symbol":return Jr?Jr(r):"Symbol()";case"undefined":return Ye(r);case"function":case"object":{if(r===null)return Ye(r);const e=r,i=Q(e,"toString");if(typeof i=="function"){const a=i(e);return typeof a=="string"?a:Ye(a)}return Ye(r)}default:return Ye(r)}}function Q(r,e){for(;r!==null;){const a=Sn(r,e);if(a){if(a.get)return $(a.get);if(typeof a.value=="function")return $(a.value)}r=En(r)}function i(){return null}return i}function Pn(r){try{return H(r,""),!0}catch{return!1}}const Qr=z(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ht=z(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),jt=z(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),In=z(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vt=z(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Mn=z(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ei=z(["#text"]),ti=z(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Gt=z(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ri=z(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pt=z(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Nn=U(/{{[\w\W]*|^[\w\W]*}}/g),$n=U(/<%[\w\W]*|^[\w\W]*%>/g),Fn=U(/\${[\w\W]*/g),zn=U(/^data-[\-\w.\u00B7-\uFFFF]+$/),Un=U(/^aria-[\-\w]+$/),ii=U(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Bn=U(/^(?:\w+script|data):/i),Hn=U(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),jn=U(/^html$/i),Vn=U(/^[a-z][.\w]*(-[.\w]+)+$/i),ni=U(/<[/\w!]/g),si=U(/<[/\w]/g),Gn=U(/<\/no(script|embed|frames)/i),Wn=U(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},_i=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Yn=z(S({},_i)),qn=(function(){const r={};return be(_i,e=>{r[e]=U(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),z(r)})(),Xn=function(){return typeof window>"u"?null:window},Kn=function(e,i){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";i&&i.hasAttribute(c)&&(a=i.getAttribute(c));const p="dompurify"+(a?"#"+a:"");try{return e.createPolicy(p,{createHTML(f){return f},createScriptURL(f){return f}})}catch{return console.warn("TrustedTypes policy "+p+" could not be created."),null}},oi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},he=function(e,i,a,c){return q(e,i)&&Fe(e[i])?S(c.base?Z(c.base):{},e[i],c.transform):a},Wt=function(e,i,a){const c=q(e,i)?e[i]:void 0;return c&&typeof c=="object"?Z(c):a()};function vi(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Xn();const e=h=>vi(h);if(e.version="3.4.16",e.removed=[],!r||!r.document||r.document.nodeType!==K.document||!r.Element)return e.isSupported=!1,e;let i=r.document;const a=i,c=a.currentScript;r.DocumentFragment;const p=r.HTMLTemplateElement,f=r.Node,g=r.Element,_=r.NodeFilter;r.NamedNodeMap===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const B=r.DOMParser,O=r.trustedTypes,j=g.prototype,Xe=Q(j,"cloneNode"),ae=Q(j,"remove"),or=Q(j,"removeAttributeNode"),wi=Q(j,"nextSibling"),Ee=Q(j,"childNodes"),Se=Q(j,"parentNode"),ar=Q(j,"shadowRoot"),vt=Q(j,"attributes"),ge=f&&f.prototype?Q(f.prototype,"nodeType"):null,Re=f&&f.prototype?Q(f.prototype,"nodeName"):null,Ke=f&&f.prototype?Q(f.prototype,"ownerDocument"):null,Ue=function(t){return ge?ge(t):t.nodeType},wt=function(t){return Re?Re(t):t.nodeName};if(typeof p=="function"){const h=i.createElement("template");h.content&&h.content.ownerDocument&&(i=h.content.ownerDocument)}let Y,ye="",bt,lr=!1,Be=0;const cr=function(){if(Be>0)throw pe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(t){cr(),Be++;try{return Y.createHTML(t)}finally{Be--}},bi=function(t){cr(),Be++;try{return Y.createScriptURL(t)}finally{Be--}},Ti=function(){return lr||(bt=Kn(O,c),lr=!0),bt},Ze=i,Tt=Ze.implementation,ur=Ze.createNodeIterator,Ei=Ze.createDocumentFragment,Si=Ze.getElementsByTagName,Ri=a.importNode;let C=oi();e.isSupported=typeof gi=="function"&&typeof Se=="function"&&Tt&&Tt.createHTMLDocument!==void 0;const Ai=Nn,xi=$n,Ci=Fn,Li=zn,ki=Un,Di=Bn,dr=Hn,Oi=Vn;let pr=ii,L=null;const Et=S({},[...Qr,...Ht,...jt,...Vt,...ei]);let k=null;const St=S({},[...ti,...Gt,...ri,...pt]);let re=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),He=null,hr=null;const ce=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let fr=!0,Rt=!0,mr=!1,gr=!0,ue=!1,_e=!0,ve=!1,At=!1,Je=null,Qe=null,xt=!1,xe=!1,et=!1,tt=!1,yr=!0,_r=!1;const vr="user-content-";let Ct=!0,Lt=!1,Ce={},Le=null;const wr=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let br=null;const Tr=S({},["audio","video","img","source","image","track"]);let Er=null;const Sr=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",ie="http://www.w3.org/1999/xhtml";let ke=ie,kt=!1,Dt=null;const Pi=S({},[rt,it,ie],Bt),Rr=z(["mi","mo","mn","ms","mtext"]);let Ot=S({},Rr);const Ar=z(["annotation-xml"]);let Pt=S({},Ar);const Ii=S({},["title","style","font","a","script"]);let je=null;const Mi=["application/xhtml+xml","text/html"],Ni="text/html";let M=null,De=null;const $i=i.createElement("form"),xr=function(t){return t instanceof RegExp||t instanceof Function},It=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(De&&De===t)return;(!t||typeof t!="object")&&(t={}),t=Z(t),je=Mi.indexOf(t.PARSER_MEDIA_TYPE)===-1?Ni:t.PARSER_MEDIA_TYPE,M=je==="application/xhtml+xml"?Bt:qe,L=he(t,"ALLOWED_TAGS",Et,{transform:M}),k=he(t,"ALLOWED_ATTR",St,{transform:M}),Dt=he(t,"ALLOWED_NAMESPACES",Pi,{transform:Bt}),Er=he(t,"ADD_URI_SAFE_ATTR",Sr,{transform:M,base:Sr}),br=he(t,"ADD_DATA_URI_TAGS",Tr,{transform:M,base:Tr}),Le=he(t,"FORBID_CONTENTS",wr,{transform:M}),He=he(t,"FORBID_TAGS",Z({}),{transform:M}),hr=he(t,"FORBID_ATTR",Z({}),{transform:M}),Ce=q(t,"USE_PROFILES")?t.USE_PROFILES&&typeof t.USE_PROFILES=="object"?Z(t.USE_PROFILES):t.USE_PROFILES:!1,fr=t.ALLOW_ARIA_ATTR!==!1,Rt=t.ALLOW_DATA_ATTR!==!1,mr=t.ALLOW_UNKNOWN_PROTOCOLS||!1,gr=t.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ue=t.SAFE_FOR_TEMPLATES||!1,_e=t.SAFE_FOR_XML!==!1,ve=t.WHOLE_DOCUMENT||!1,xe=t.RETURN_DOM||!1,et=t.RETURN_DOM_FRAGMENT||!1,tt=t.RETURN_TRUSTED_TYPE||!1,xt=t.FORCE_BODY||!1,yr=t.SANITIZE_DOM!==!1,_r=t.SANITIZE_NAMED_PROPS||!1,Ct=t.KEEP_CONTENT!==!1,Lt=t.IN_PLACE||!1,pr=Pn(t.ALLOWED_URI_REGEXP)?t.ALLOWED_URI_REGEXP:ii,ke=typeof t.NAMESPACE=="string"?t.NAMESPACE:ie,Ot=Wt(t,"MATHML_TEXT_INTEGRATION_POINTS",()=>S({},Rr)),Pt=Wt(t,"HTML_INTEGRATION_POINTS",()=>S({},Ar));const l=Wt(t,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(re=Ne(null),q(l,"tagNameCheck")&&xr(l.tagNameCheck)&&(re.tagNameCheck=l.tagNameCheck),q(l,"attributeNameCheck")&&xr(l.attributeNameCheck)&&(re.attributeNameCheck=l.attributeNameCheck),q(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(re.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),U(re),ue&&(Rt=!1),et&&(xe=!0),Ce&&(L=S({},ei),k=Ne(null),Ce.html===!0&&(S(L,Qr),S(k,ti)),Ce.svg===!0&&(S(L,Ht),S(k,Gt),S(k,pt)),Ce.svgFilters===!0&&(S(L,jt),S(k,Gt),S(k,pt)),Ce.mathMl===!0&&(S(L,Vt),S(k,ri),S(k,pt))),ce.tagCheck=null,ce.attributeCheck=null,q(t,"ADD_TAGS")&&(typeof t.ADD_TAGS=="function"?ce.tagCheck=t.ADD_TAGS:Fe(t.ADD_TAGS)&&(L===Et&&(L=Z(L)),S(L,t.ADD_TAGS,M))),q(t,"ADD_ATTR")&&(typeof t.ADD_ATTR=="function"?ce.attributeCheck=t.ADD_ATTR:Fe(t.ADD_ATTR)&&(k===St&&(k=Z(k)),S(k,t.ADD_ATTR,M))),q(t,"ADD_FORBID_CONTENTS")&&Fe(t.ADD_FORBID_CONTENTS)&&(Le===wr&&(Le=Z(Le)),S(Le,t.ADD_FORBID_CONTENTS,M)),Ct&&(L["#text"]=!0),ve&&S(L,["html","head","body"]),L.table&&(S(L,["tbody"]),delete He.tbody),t.TRUSTED_TYPES_POLICY){if(typeof t.TRUSTED_TYPES_POLICY.createHTML!="function")throw pe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof t.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw pe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const d=Y;Y=t.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(m){throw Y=d,m}}else t.TRUSTED_TYPES_POLICY===null?(Y=void 0,ye=""):(Y===void 0&&(Y=Ti()),Y&&typeof ye=="string"&&(ye=Ae("")));z&&z(t),De=t},Cr=S({},[...Ht,...jt,...In]),Lr=S({},[...Vt,...Mn]),Fi=function(t,l,d){return l.namespaceURI===ie?t==="svg":l.namespaceURI===rt?t==="svg"&&(d==="annotation-xml"||Ot[d]):!!Cr[t]},zi=function(t,l,d){return l.namespaceURI===ie?t==="math":l.namespaceURI===it?t==="math"&&Pt[d]:!!Lr[t]},Ui=function(t,l,d){return l.namespaceURI===it&&!Pt[d]||l.namespaceURI===rt&&!Ot[d]?!1:!Lr[t]&&(Ii[t]||!Cr[t])},Bi=function(t){let l=Se(t);(!l||!l.tagName)&&(l={namespaceURI:ke,tagName:"template"});const d=qe(t.tagName),m=qe(l.tagName);return Dt[t.namespaceURI]?t.namespaceURI===it?Fi(d,l,m):t.namespaceURI===rt?zi(d,l,m):t.namespaceURI===ie?Ui(d,l,m):!!(je==="application/xhtml+xml"&&Dt[t.namespaceURI]):!1},de=function(t){Ge(e.removed,{element:t});try{Se(t).removeChild(t)}catch{if(ae(t),!Se(t))throw pe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},kr=function(t,l,d){try{or(t,l)}catch{try{t.removeAttribute(d)}catch{}}},nt=function(t){st(t);const l=Ee(t);if(l){const m=[];be(l,y=>{Ge(m,y)}),be(m,y=>{try{ae(y)}catch{}})}const d=vt(t);if(d)for(let m=d.length-1;m>=0;--m){const y=d[m],T=y&&y.name;typeof T=="string"&&kr(t,y,T)}},we=function(t,l,d){if(!d)try{d=l.getAttributeNode(t)}catch{d=null}Ge(e.removed,{attribute:d||null,from:l});try{d?or(l,d):l.removeAttribute(t)}catch{try{l.removeAttribute(t)}catch{}}if(t==="is")if(xe||et)try{de(l)}catch{}else try{l.setAttribute(t,"")}catch{}},Hi=function(t){const l=vt(t);if(l)for(let d=l.length-1;d>=0;--d){const m=l[d],y=m&&m.name;typeof y!="string"||k[M(y)]||kr(t,m,y)}},st=function(t){const l=[t];for(;l.length>0;){const d=l.pop();Ue(d)===K.element&&Hi(d);const m=Ee(d);if(m)for(let y=m.length-1;y>=0;--y)l.push(m[y])}},Dr=function(t,l){return _e?t==="patchsrc"?!0:t==="for"&&l!=="label"&&l!=="output":!1},ji=function(t){if(!_e)return;const l=[t];for(;l.length>0;){const d=l.pop(),m=Ue(d);if(m===K.processingInstruction||m===K.comment&&H(si,d.data)){try{ae(d)}catch{}continue}if(m===K.element){const T=d,E=M(wt(d));try{T.hasAttribute&&T.hasAttribute("patchsrc")&&T.removeAttribute("patchsrc"),T.hasAttribute&&T.hasAttribute("for")&&Dr("for",E)&&T.removeAttribute("for")}catch{}}const y=Ee(d);if(y)for(let T=y.length-1;T>=0;--T)l.push(y[T])}},Or=function(t){let l=null,d=null;if(xt)t="<remove></remove>"+t;else{const T=Xr(t,/^[\r\n\t ]+/);d=T&&T[0]}je==="application/xhtml+xml"&&ke===ie&&(t='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+t+"</body></html>");const m=Y?Ae(t):t;if(ke===ie)try{l=new B().parseFromString(m,je)}catch{}if(!l||!l.documentElement){l=Tt.createDocument(ke,"template",null);try{l.documentElement.innerHTML=kt?ye:m}catch{}}const y=l.body||l.documentElement;return t&&d&&y.insertBefore(i.createTextNode(d),y.childNodes[0]||null),ke===ie?Si.call(l,ve?"html":"body")[0]:ve?l.documentElement:y},Pr=function(t){const l=Ke?Ke(t):t.ownerDocument;return ur.call(l||t,t,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT|_.SHOW_PROCESSING_INSTRUCTION|_.SHOW_CDATA_SECTION,null)},ot=function(t){return t=We(t,Ai," "),t=We(t,xi," "),t=We(t,Ci," "),t},Mt=function(t){var l;t.normalize();const d=Ke?Ke(t):t.ownerDocument,m=ur.call(d||t,t,_.SHOW_TEXT|_.SHOW_COMMENT|_.SHOW_CDATA_SECTION|_.SHOW_PROCESSING_INSTRUCTION,null);let y=m.nextNode();for(;y;)y.data=ot(y.data),y=m.nextNode();const T=(l=t.querySelectorAll)===null||l===void 0?void 0:l.call(t,"template");T&&be(T,E=>{Oe(E.content)&&Mt(E.content)})},at=function(t){const l=Re?Re(t):null;return typeof l!="string"||M(l)!=="form"?!1:typeof t.nodeName!="string"||typeof t.textContent!="string"||typeof t.removeChild!="function"||t.attributes!==vt(t)||typeof t.removeAttribute!="function"||typeof t.removeAttributeNode!="function"||typeof t.getAttributeNode!="function"||typeof t.setAttribute!="function"||typeof t.namespaceURI!="string"||typeof t.insertBefore!="function"||typeof t.hasChildNodes!="function"||t.nodeType!==ge(t)||t.childNodes!==Ee(t)},Oe=function(t){if(!ge||typeof t!="object"||t===null)return!1;try{return ge(t)===K.documentFragment}catch{return!1}},Ve=function(t){if(!ge||typeof t!="object"||t===null)return!1;try{return typeof ge(t)=="number"}catch{return!1}};function ne(h,t,l){h.length!==0&&be(h,d=>{d.call(e,t,l,De)})}const Vi=function(t,l){return!!(_e&&t.hasChildNodes()&&!Ve(t.firstElementChild)&&H(ni,t.textContent)&&H(ni,t.innerHTML)||_e&&t.namespaceURI===ie&&Yn[l]&&(Ve(t.firstElementChild)||typeof t.textContent=="string"&&H(qn[l],t.textContent))||t.nodeType===K.processingInstruction||_e&&t.nodeType===K.comment&&H(si,t.data))},lt=function(t,l){if(t instanceof RegExp)return H(t,l);if(t instanceof Function){for(var d=arguments.length,m=new Array(d>2?d-2:0),y=2;y<d;y++)m[y-2]=arguments[y];return!!t(l,...m)}return!1},Gi=function(t,l,d){if(!He[l]&&$r(l)&&lt(re.tagNameCheck,l))return!1;if(Ct&&!Le[l]){const m=Se(t),y=Ee(t);if(y&&m){const T=y.length;for(let E=T-1;E>=0;--E){const P=t===d?Xe(y[E],!0):y[E];m.insertBefore(P,wi(t))}}}return de(t),!0},Ir=function(t,l,d,m){return t.length===0?l:l===d||l===m?Z(l):l},Pe=function(t,l){return t===l||Se(t)!==null?!1:(Lt&&st(t),!0)},Mr=function(t,l){if(ne(C.beforeSanitizeElements,t,null),Pe(t,l))return!0;if(at(t))return de(t),!0;const d=M(wt(t));if(L=Ir(C.uponSanitizeElement,L,Et,Je),ne(C.uponSanitizeElement,t,{tagName:d,allowedTags:L}),Pe(t,l))return!0;if(Vi(t,d))return de(t),!0;if(He[d]||!(ce.tagCheck instanceof Function&&ce.tagCheck(d))&&!L[d]){const m=Gi(t,d,l);return m===!1&&(ne(C.afterSanitizeElements,t,null),Pe(t,l))?!0:m}if(Ue(t)===K.element&&!Bi(t)||(d==="noscript"||d==="noembed"||d==="noframes")&&H(Gn,t.innerHTML))return de(t),!0;if(ue&&t.nodeType===K.text){const m=ot(t.textContent);t.textContent!==m&&(Ge(e.removed,{element:t.cloneNode()}),t.textContent=m)}return ne(C.afterSanitizeElements,t,null),Pe(t,l)},Nr=function(t,l,d){if(hr[l]||Dr(l,t)||yr&&(l==="id"||l==="name")&&(d in i||d in $i))return!1;const m=k[l]||ce.attributeCheck instanceof Function&&ce.attributeCheck(l,t);return Rt&&H(Li,l)||fr&&H(ki,l)?!0:m?Er[l]||H(pr,We(d,dr,""))||(l==="src"||l==="xlink:href"||l==="href")&&t!=="script"&&Kr(d,"data:")===0&&br[t]||mr&&!H(Di,We(d,dr,""))?!0:!d:$r(t)&&lt(re.tagNameCheck,t)&&lt(re.attributeNameCheck,l,t)||l==="is"&&re.allowCustomizedBuiltInElements&&lt(re.tagNameCheck,d)},Wi=S({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),$r=function(t){return!Wi[qe(t)]&&H(Oi,t)},Yi=function(t,l,d,m){if(Y&&typeof O=="object"&&typeof O.getAttributeType=="function"&&!d)switch(O.getAttributeType(t,l)){case"TrustedHTML":return Ae(m);case"TrustedScriptURL":return bi(m)}return m},qi=function(t,l,d,m){try{return d?t.setAttributeNS(d,l,m):t.setAttribute(l,m),at(t)?(de(t),!1):!0}catch{return we(l,t),!1}},Fr=function(t,l){if(ne(C.beforeSanitizeAttributes,t,null),Pe(t,l))return;const d=t.attributes;if(!d||at(t))return;k=Ir(C.uponSanitizeAttribute,k,St,Qe);const m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:k,forceKeepAttr:void 0};let y=d.length;const T=M(t.nodeName);for(;y--;){const E=d[y],P=E.name,J=E.namespaceURI,X=E.value,Ie=M(P),$t=X;let V=P==="value"?$t:xn($t),zr=!1;if(m.attrName=Ie,m.attrValue=V,m.keepAttr=!0,m.forceKeepAttr=void 0,ne(C.uponSanitizeAttribute,t,m),V=m.attrValue,_r&&(Ie==="id"||Ie==="name")&&Kr(V,vr)!==0&&(we(P,t,E),V=vr+V,zr=!0),_e&&H(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(P,t,E);continue}if(Ie==="attributename"&&Xr(V,"href")){we(P,t,E);continue}if(!m.forceKeepAttr){if(!m.keepAttr){we(P,t,E);continue}if(!gr&&H(Wn,V)){we(P,t,E);continue}if(ue&&(V=ot(V)),!Nr(T,Ie,V)){we(P,t,E);continue}V=Yi(T,Ie,J,V),V!==$t&&qi(t,P,J,V)&&zr&&qr(e.removed)}}ne(C.afterSanitizeAttributes,t,null),Pe(t,l)},ct=function(t){let l=null;const d=Pr(t);for(ne(C.beforeSanitizeShadowDOM,t,null);l=d.nextNode();)if(ne(C.uponSanitizeShadowNode,l,null),Mr(l,t),Fr(l,t),Oe(l.content)&&ct(l.content),Ue(l)===K.element){const m=ar(l);Oe(m)&&(Nt(m),ct(m))}ne(C.afterSanitizeShadowDOM,t,null)},Nt=function(t){const l=[{node:t,shadow:null}];for(;l.length>0;){const d=l.pop();if(d.shadow){ct(d.shadow);continue}const m=d.node,y=Ue(m)===K.element,T=Ee(m);if(T)for(let E=T.length-1;E>=0;--E)l.push({node:T[E],shadow:null});if(y){const E=Re?Re(m):null;if(typeof E=="string"&&M(E)==="template"){const P=m.content;Oe(P)&&l.push({node:P,shadow:null})}}if(y){const E=ar(m);Oe(E)&&l.push({node:null,shadow:E},{node:E,shadow:null})}}};return e.sanitize=function(h){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,d=null,m=null,y=null;if(kt=!h,kt&&(h="<!-->"),typeof h!="string"&&!Ve(h)&&(h=On(h),typeof h!="string"))throw pe("dirty is not a string, aborting");if(!e.isSupported)return h;At?(L=Je,k=Qe):It(t),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(L=Z(L)),C.uponSanitizeAttribute.length>0&&(k=Z(k)),e.removed=[];const T=Lt&&typeof h!="string"&&Ve(h);if(T){ji(h);const J=wt(h);if(typeof J=="string"){const X=M(J);if(!L[X]||He[X])throw nt(h),pe("root node is forbidden and cannot be sanitized in-place")}if(at(h))throw nt(h),pe("root node is clobbered and cannot be sanitized in-place");try{Nt(h)}catch(X){throw nt(h),X}}else if(Ve(h))l=Or("<!---->"),d=l.ownerDocument.importNode(h,!0),d.nodeType===K.element&&d.nodeName==="BODY"||d.nodeName==="HTML"?l=d:l.appendChild(d),Nt(l);else{if(!xe&&!ue&&!ve&&h.indexOf("<")===-1)return Y&&tt?Ae(h):h;if(l=Or(h),!l)return xe?null:tt?ye:""}l&&xt&&de(l.firstChild);const E=T?h:l;try{const J=Pr(E);for(;m=J.nextNode();)Mr(m,E),Fr(m,E),Oe(m.content)&&ct(m.content)}catch(J){throw T&&(nt(h),be(e.removed,X=>{X.element&&st(X.element)})),J}if(T){let J=!1;if(be(e.removed,X=>{X.element&&(X.element===h&&(J=!0),st(X.element))}),J)throw pe("a node selected for removal could not be safely returned; refusing to sanitize in place");return ue&&Mt(h),h}if(xe){if(ue&&Mt(l),et)for(y=Ei.call(l.ownerDocument);l.firstChild;)y.appendChild(l.firstChild);else y=l;return(k.shadowroot||k.shadowrootmode)&&(y=Ri.call(a,y,!0)),y}let P=ve?l.outerHTML:l.innerHTML;return ve&&L["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&H(jn,l.ownerDocument.doctype.name)&&(P="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+P),ue&&(P=ot(P)),Y&&tt?Ae(P):P},e.setConfig=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};It(h),At=!0,Je=L,Qe=k},e.clearConfig=function(){De=null,At=!1,Je=null,Qe=null,Y=bt,ye=""},e.isValidAttribute=function(h,t,l){De||It({});const d=M(h),m=M(t);return Nr(d,m,l)},e.addHook=function(h,t){typeof t=="function"&&q(C,h)&&Ge(C[h],t)},e.removeHook=function(h,t){if(q(C,h)){if(t!==void 0){const l=Rn(C[h],t);return l===-1?void 0:An(C[h],l,1)[0]}return qr(C[h])}},e.removeHooks=function(h){q(C,h)&&(C[h]=[])},e.removeAllHooks=function(){C=oi()},e}var ht=vi();const Zn=["a"];function Jn(r){ht.addHook("afterSanitizeAttributes",Qn);try{return ht.sanitize(r,{ALLOWED_TAGS:Zn})}finally{ht.removeHook("afterSanitizeAttributes")}}function Qn(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function es(r,e=100,i=!0){if(r.length<e)return r;let a=e;if(i){const c=r.indexOf(" ",e),p=c-e<=20;if(p&&c===r.length-1)return r;c!==-1&&p&&(a=c)}return ts(r,a,e)}function ts(r,e,i){let a=r.slice(0,e);const c=a.match(/<a/gi);if(c){const p=a.match(/<\/a/gi);if(!p||p.length<c.length){const f=r.indexOf("</a>",e),g=f-i<=20;if(g&&r.length===f+4)return r;if(f!==-1&&g)a=r.slice(0,f+4);else{const _=a.lastIndexOf("<a");a=r.slice(0,_)}}}return a.concat("...")}const rs=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function is(r){return r.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(rs,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function ns(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const ss="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var os=Object.defineProperty,as=Object.getOwnPropertyDescriptor,te=(r,e,i,a)=>{for(var c=a>1?void 0:a?as(e,i):e,p=r.length-1,f;p>=0;p--)(f=r[p])&&(c=(a?f(e,i,c):f(c))||c);return a&&c&&os(e,i,c),c};let ee=class extends yt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.csrfToken="",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1,this.deleteMsg=""}render(){return this.review?w`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?w`
                  <button
                    class="delete-btn"
                    title="Delete this review"
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${ss}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:F}
            <div class="top-line">
              <b>${R("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${R("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteMsg?w`<i>${R(this.deleteMsg)}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:w`
          <div class="error">
            ${R("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return F;const e=Jn(r),i=this.truncateContent(e,this.maxBodyLength);return w`${ai(this.prepReview(i))}`}get truncationButtonsTemplate(){return this.bypassTruncation?F:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?F:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return w`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${R("More...")}
      </button>
    `}get lessButtonTemplate(){return w`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${R("...Less")}
    </button>`}get reviewerTemplate(){return this.review?this.review.reviewer_itemname?w`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Gr(this.review.reviewer)}
            </a>
          `:w`${Gr(this.review.reviewer)}`:F}get starsTemplate(){return!this.review||!this.review.stars?F:w`
      <div
        class="review-stars"
        title="${R(`${this.review.stars} out of 5 stars`)}"
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>w`<div class="review-star">
              <img
                class="star-basic"
                src=${gn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return F;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),i=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"}),a=r.getTime()!==e.getTime()?"(edited)":"";return R(`${i} ${a}`)}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:es(r,e)}prepReview(r){return ns(is(r))}async deleteReview(){if(!this.review||!this.identifier||!confirm(R("Are you sure you want to delete this review?")))return;const r=new URLSearchParams({identifier:this.identifier,deleteReviewer:this.review.reviewer??"",deleteReviewerItemname:this.review.reviewer_itemname??"",csrf_token:this.csrfToken}),e=`${this.baseHost}/edit-reviews.php?${r}`;try{const i=await fetch(e,{method:"POST"});if(!i.ok)throw new Error(`Delete failed: ${i.status}`);this.deleteMsg="This review has been queued for deletion."}catch{this.deleteMsg="Sorry, we were unable to delete this review."}}static get styles(){return _t`
      :host {
        font-family: var(
          --ia-font-stack,
          'Helvetica Neue',
          Helvetica,
          Arial,
          sans-serif
        );

        font-size: inherit;
        --container-bg-color: #fbfbfd;
        --container-border-color: #999999;
      }

      .review {
        position: relative;
        padding-right: 30px;
      }

      .error {
        color: var(--error-color, #cc0000);
      }

      .top-line {
        margin-bottom: 0.5rem;
      }

      .top-line > * {
        display: inline-block;
      }

      .review-star {
        width: 1rem;
        display: inline-block;
      }

      .star-basic {
        display: block;
        width: 100%;
      }

      .simple-link,
      .body a {
        color: var(--link-color, #4b64ff);
        text-decoration: none;
        background: transparent;
        border: none;
        padding: 0px;
      }

      .simple-link:hover,
      .body a:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .subject {
        margin-bottom: 0.5rem;
      }

      .delete-btn {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        background: none;
        border: 0;
      }

      .delete-btn:hover {
        cursor: pointer;
      }

      .delete-icon {
        width: 20px;
        mix-blend-mode: multiply;
      }
    `}};te([b({type:Object})],ee.prototype,"review",2);te([b({type:String})],ee.prototype,"identifier",2);te([b({type:Number})],ee.prototype,"maxSubjectLength",2);te([b({type:Number})],ee.prototype,"maxBodyLength",2);te([b({type:String})],ee.prototype,"baseHost",2);te([b({type:String})],ee.prototype,"csrfToken",2);te([b({type:Boolean})],ee.prototype,"canDelete",2);te([b({type:Boolean})],ee.prototype,"bypassTruncation",2);te([G()],ee.prototype,"showTruncatedContent",2);te([G()],ee.prototype,"deleteMsg",2);ee=te([gt("ia-review")],ee);const ls="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",cs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var us=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,N=(r,e,i,a)=>{for(var c=a>1?void 0:a?ds(e,i):e,p=r.length-1,f;p>=0;p--)(f=r[p])&&(c=(a?f(e,i,c):f(c))||c);return a&&c&&us(e,i,c),c};let I=class extends yt{constructor(){super(...arguments),this.token="",this.baseHost="https://archive.org",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.formCanSubmit=!1,this.submissionInProgress=!1,this.RECAPTCHA_ERROR_MESSAGE="Could not validate review. Please try again later.",this.GENERIC_ERROR_MESSAGE="There's been a temporary error. Please wait a moment and try again."}render(){return w`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableError?this.unrecoverableErrorTemplate:w`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate} ${this.hiddenInputsTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(r){r.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),r.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),r.has("unrecoverableError")&&(this.formCanSubmit=this.checkSubmissionAllowed()),(r.has("currentSubjectLength")||r.has("currentBodyLength")||r.has("maxSubjectLength")||r.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){return this.unrecoverableError?w`
          <div class="unrecoverable-error">
            <span class="error-msg">${R(this.unrecoverableError)}</span>
          </div>
        `:F}get recoverableErrorTemplate(){return this.recoverableError?w`
          <div class="recoverable-error">
            ${ai(this.sanitizeErrorMsg(R(this.recoverableError)))}
          </div>
        `:F}get recaptchaMessageTemplate(){return this.bypassRecaptcha?F:w`
      <span class="recaptcha-disclaimer"
        >${R(w`This site is protected by reCAPTCHA and the Google
            <a
              target="_blank"
              class="inline-link"
              href="https://policies.google.com/privacy"
              >Privacy Policy</a
            >
            and
            <a
              target="_blank"
              class="inline-link"
              href="https://policies.google.com/terms"
              >Terms of Service</a
            >
            apply.`)}</span
      >
    `}get starsInputTemplate(){return w`
      <div class="form-heading rating">
        <label for="stars-field">${R("Rating (optional)")}</label>
      </div>
      <input
        type="hidden"
        name="field_stars"
        id="stars-input"
        .value=${this.currentStars.toString()}
        required
      />
      <div class="stars">
        ${[1,2,3,4,5].map(r=>this.renderStar(r))}
        <button
          type="button"
          class="clear-stars-btn"
          @click=${this.handleClearBtnClicked}
        >
          ${R("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return w`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${R("Subject")}</label>
        ${this.maxSubjectLength?w`<div class="char-count subject">
                ${this.currentSubjectLength}/${this.maxSubjectLength}
              </div>`:F}
      </div>
      <input
        type="text"
        name="field_reviewtitle"
        id="field_reviewtitle"
        .value=${this.oldReview?.reviewtitle??""}
        @input=${this.handleSubjectChanged}
        required
    />${this.maxSubjectLength?w`
            <div class="input-error">
              ${R(`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:F}</div></span>
    `}get bodyInputTemplate(){return w`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${R("Review")}</label>
          ${this.maxBodyLength?w`<div class="char-count body">
                ${this.currentBodyLength}/${this.maxBodyLength}
              </div>`:F}
        </div>
        <textarea
          name="field_reviewbody"
          id="field_reviewbody"
          .value=${this.oldReview?.reviewbody??""}
          rows="10"
          cols="50"
          required
          @input=${this.handleBodyChanged}
        ></textarea>
        ${this.maxBodyLength?w`
              <div class="input-error">
                ${R(`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:F}
      </span>
    `}get hiddenInputsTemplate(){return w`
      <input type="hidden" name="field_reviewtoken" .value=${this.token} />
      ${this.identifier?w`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:F}
    `}get actionButtonsTemplate(){return w`<div class="action-btns">
      <ia-button
        mode="secondary"
        class="cancel-btn"
        data-testid="cancel-btn"
        @click=${this.cancelReviewEdit}
      >
        ${R("Cancel")}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        class="submit-btn"
        .disabled=${!this.formCanSubmit}
        .loading=${this.submissionInProgress}
      >
        ${R("Submit review")}
      </ia-button>
    </div>`}renderStar(r){const e=r===this.currentStars,i=R(`Rate ${r>1?`${r} stars`:"1 star"}`);return w`
      <button
        class="star star-${r}"
        title=${e?R("Clear rating"):i}
        @click=${a=>this.handleStarClicked(a,r)}
      >
        ${r<=this.currentStars?w`<img
              class="star-selected"
              src=${ls}
              alt=""
              aria-hidden="true"
            />`:w`<img
              class="star-unselected"
              src=${cs}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.unrecoverableError=this.RECAPTCHA_ERROR_MESSAGE}}sanitizeErrorMsg(r){return ht.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.fetchHandler)return this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission();try{const e=new URLSearchParams;if(!this.bypassRecaptcha){const a=await this.getRecaptchaToken();if(!a)return this.handleRecaptchaError();e.append("g-recaptcha-response",a??"")}for(const a of new FormData(this.reviewForm))e.append(a[0],a[1]);e.append("submitter","review-form");const i=await this.fetchHandler.fetchApiResponse(`${this.baseHost}${this.endpointPath}`,{method:"POST",includeCredentials:!0,body:e});if(i?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else this.recoverableError=i.error??this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}catch(e){console.error(e),this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname,reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.recoverableError=this.RECAPTCHA_ERROR_MESSAGE,this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableError||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[_t`
        .form-heading {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-top: 15px;
        }

        .form-heading.rating {
          padding-top: 0;
        }

        .form-heading label {
          font-size: 1.6rem;
          font-weight: bold;
        }

        label {
          display: inline-block;
          margin-bottom: 5px;
        }

        textarea,
        input[type='text'],
        .unrecoverable-error {
          padding: 5px;
          width: calc(100% - 10px);
          font-family: inherit;
          border-radius: 5px;
          border: 1px solid var(--container-border-color, #999999);
        }

        .input-box.error input,
        .input-box.error textarea {
          border: 2px solid var(--container-error-color, #ea0202);
        }

        .input-box.error .char-count,
        .input-error,
        .unrecoverable-error,
        .recoverable-error {
          color: var(--container-error-color, #ea0202);
        }

        .input-error {
          display: none;
        }

        .input-box.error .input-error {
          display: block;
          text-align: right;
          padding-top: 5px;
        }

        .inline-link {
          color: var(--container-link-color, #4f65f5);
          text-decoration: none;
        }

        .inline-link:hover {
          text-decoration: underline;
        }

        .stars {
          display: flex;
          flex-direction: row;
          gap: 2px;
          align-items: center;
        }

        .star {
          all: unset;
          height: 30px;
          width: 30px;
        }

        .star-selected,
        .star-unselected {
          display: block;
          width: 100%;
          height: 100%;
        }

        .star:hover {
          cursor: pointer;
        }

        .clear-stars-btn,
        .recoverable-error a {
          padding: 0 5px;
          color: var(--container-link-color, #4f65f5);
          font-family: inherit;
          border: none;
          background: transparent;
          display: inline-block;
          padding-top: 5px;
        }

        .clear-stars-btn:hover,
        .recoverable-error a:hover {
          cursor: pointer;
          text-decoration: underline;
        }

        .action-btns {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 15px;
        }

        .ia-button:disabled {
          opacity: 0.75;
        }

        .ia-button:disabled:hover {
          cursor: not-allowed;
        }

        .unrecoverable-error {
          min-height: 50px;
          padding: 5px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: var(--container-bg-color, #fbfbfd);
        }

        .recaptcha-disclaimer {
          font-size: 1.2rem;
        }

        @media only screen and (max-width: 350px) {
          .action-btns {
            flex-direction: column-reverse;
            align-items: center;
          }
        }
      `]}};N([b({type:String})],I.prototype,"identifier",2);N([b({type:String})],I.prototype,"token",2);N([b({type:String})],I.prototype,"baseHost",2);N([b({type:String})],I.prototype,"endpointPath",2);N([b({type:String})],I.prototype,"submitterScreenname",2);N([b({type:String})],I.prototype,"submitterItemname",2);N([b({type:Object})],I.prototype,"oldReview",2);N([b({type:String})],I.prototype,"unrecoverableError",2);N([b({type:Number})],I.prototype,"maxSubjectLength",2);N([b({type:Number})],I.prototype,"maxBodyLength",2);N([b({type:Object})],I.prototype,"fetchHandler",2);N([b({type:Object})],I.prototype,"recaptchaManager",2);N([b({type:Boolean})],I.prototype,"bypassRecaptcha",2);N([G()],I.prototype,"currentStars",2);N([G()],I.prototype,"currentSubjectLength",2);N([G()],I.prototype,"currentBodyLength",2);N([G()],I.prototype,"recoverableError",2);N([G()],I.prototype,"formCanSubmit",2);N([G()],I.prototype,"submissionInProgress",2);N([li("#review-form")],I.prototype,"reviewForm",2);I=N([gt("ia-review-form")],I);var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,x=(r,e,i,a)=>{for(var c=a>1?void 0:a?hs(e,i):e,p=r.length-1,f;p>=0;p--)(f=r[p])&&(c=(a?f(e,i,c):f(c))||c);return a&&c&&ps(e,i,c),c};let A=class extends yt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.token="",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.fetchHandler=new mn,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?w`
      <div class="reviews-list">
        ${this.reviewsFrozen?w`<div class="message">
              ${R("Reviews can no longer be added to this item.")}
            </div>`:F}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(r=>r.reviewer_itemname!==this.submitterItemname?this.renderReview(r):F)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(r){(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),r.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}get reviewsDisabledTemplate(){return w`<div class="message">
      ${R("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?w`
        <div class="message">
          ${R("Reviews cannot be added to this item.")}
        </div>
      `:w`
      <div class="message">
        ${R("There are no reviews yet.")}
        ${R(w`
          Be the first one to
          <ia-button
            mode="link"
            class="no-reviews-btn"
            @click=${this.addEditReview}
          >
            write a review</ia-button
          >.
        `)}
      </div>
    `}get displayReviewsMsgTemplate(){return w`
      <div class="message">
        ${this.reviewsCount===1?R("There is 1 review for this item."):R(`There are ${this.reviewsCount} reviews for this item.`)}
        <ia-button
          mode="link"
          class="display-reviews-btn"
          @click=${()=>this.displayReviews=!0}
        >
          ${R(`Display ${this.reviewsCount===1?"review":"reviews"}`)}</ia-button
        >.
      </div>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?F:w`<div class="own-review-container">
      ${this.displayReviewForm?w`<ia-review-form
            .identifier=${this.identifier}
            .oldReview=${this.currentReview}
            .baseHost=${this.baseHost}
            .endpointPath=${this.endpointPath}
            .submitterItemname=${this.submitterItemname}
            .submitterScreenname=${this.submitterScreenname}
            .maxSubjectLength=${this.maxSubjectLength}
            .maxBodyLength=${this.maxBodyLength}
            .token=${this.token}
            .unrecoverableError=${this.reviewSubmissionError}
            .fetchHandler=${this.fetchHandler}
            .recaptchaManager=${this.recaptchaActivated?this.recaptchaManager:void 0}
            ?bypassRecaptcha=${this.bypassRecaptcha}
            @reviewUpdated=${this.handleReviewUpdate}
            @reviewEditCanceled=${this.handleEditCanceled}
          ></ia-review-form>`:this.renderReview(this.currentReview)}
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(i=>{!r&&i.reviewer_itemname===this.submitterItemname?r=i:e.push(i)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((i,a)=>i.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(i.createdate).getTime():0)}renderReview(r){return r?w`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .csrfToken=${this.token}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:F}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[_t`
        :host {
          font-family: var(
            --ia-font-stack,
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif
          );

          color: var(--ia-text-color, #2c2c2c);
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
        }

        .own-review-container {
          --error-color: var(--container-error-color, #ea0202);
          --link-color: var(--container-link-color, #4f65f5);
          --container-error-color: #ea0202;
          --container-link-color: #4f65f5;
          --container-bg-color: #fbfbfd;
          --container-border-color: #999999;

          border: 2px solid var(--container-border-color, #999999);
          border-radius: 5px;
          background-color: var(--container-bg-color, #fbfbfd);
          padding: 10px;
        }

        .message {
          font-weight: 200;
        }

        .message ia-button {
          display: inline;
          vertical-align: baseline;
        }

        /* The button inside ia-button is a flex box, which would break these
           out of the sentence they sit in. */
        .message ia-button::part(button) {
          display: inline;
          min-height: 0;
          padding: 0;
          font-weight: 600;
        }
      `]}};x([b({type:String})],A.prototype,"identifier",2);x([b({type:Array})],A.prototype,"reviews",2);x([b({type:Boolean})],A.prototype,"reviewsDisabled",2);x([b({type:Boolean})],A.prototype,"reviewsFrozen",2);x([b({type:Boolean})],A.prototype,"canDelete",2);x([b({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([b({type:Number})],A.prototype,"maxSubjectLength",2);x([b({type:Number})],A.prototype,"maxBodyLength",2);x([b({type:String})],A.prototype,"baseHost",2);x([b({type:String})],A.prototype,"token",2);x([b({type:String})],A.prototype,"endpointPath",2);x([b({type:String})],A.prototype,"submitterScreenname",2);x([b({type:String})],A.prototype,"submitterItemname",2);x([b({type:Object})],A.prototype,"recaptchaManager",2);x([b({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([b({type:String})],A.prototype,"reviewSubmissionError",2);x([b({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([b({type:Object})],A.prototype,"fetchHandler",2);x([G()],A.prototype,"displayReviewForm",2);x([G()],A.prototype,"displayReviews",2);x([G()],A.prototype,"filteredReviews",2);x([G()],A.prototype,"currentReview",2);x([G()],A.prototype,"reviewsCount",2);x([G()],A.prototype,"recaptchaActivated",2);A=x([gt("ia-reviews")],A);var fs=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,sr=(r,e,i,a)=>{for(var c=a>1?void 0:a?ms(e,i):e,p=r.length-1,f;p>=0;p--)(f=r[p])&&(c=(a?f(e,i,c):f(c))||c);return a&&c&&fs(e,i,c),c};const gs=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],ys=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],_s=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],vs={async fetch(){return new Response("{}",{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},ws=6,bs="/edit-reviews.php";let mt=class extends yt{constructor(){super(...arguments),this.log=[]}connectedCallback(){super.connectedCallback();const r=window.fetch;this.realFetch=r,window.fetch=(e,i)=>(e instanceof Request?e.url:String(e)).includes(bs)?Promise.resolve(new Response("{}",{status:200})):r.call(window,e,i)}disconnectedCallback(){this.realFetch&&(window.fetch=this.realFetch),this.realFetch=void 0,super.disconnectedCallback()}render(){return w`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:ys}}
        .propInputData=${{settings:_s}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${gs}
          .fetchHandler=${vs}
          @newReviewAdded=${this.record}
        ></ia-reviews>

        <div slot="demo" class="panel">
          <button class="add-review" @click=${this.openReviewForm}>
            Add review
          </button>
        </div>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${()=>this.log=[]}>Clear</button>
          </div>
          ${this.log.length===0?w`<p class="empty">
                Submit the review form to see events here.
              </p>`:w`<ol class="log">
                ${this.log.map(r=>w`<li><code>${r}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The reviews list for an item, plus the form for writing one. Pass
            the existing reviews in as <code>reviews</code> and the item's
            <code>identifier</code>; the component posts new ones itself through
            its <code>fetchHandler</code>.
          </p>
          <p>
            <code>bypassRecaptcha</code> is set here so the form can be
            submitted without a reCAPTCHA key, and the demo supplies a stub
            <code>fetchHandler</code> and answers the delete request locally, so
            nothing posts to archive.org. In real use, hand it a
            <code>recaptchaManager</code> and the real handler.
          </p>
          <p>
            The component only shows a "write a review" link when an item has no
            reviews yet. With reviews present, a host page supplies its own
            button and opens the form by setting <code>displayReviewForm</code>
            on the element, which is what the "Add review" button above does and
            what offshoot and the legacy Details page both do.
          </p>
          <p>
            <code>newReviewAdded</code> is the only event that leaves the
            component. The form's <code>reviewUpdated</code> and
            <code>reviewEditCanceled</code> are handled inside
            <code>ia-reviews</code> and don't cross its shadow boundary.
          </p>
          <p>
            <code>reviewsDisabled</code> hides the whole section, while
            <code>reviewsFrozen</code> keeps existing reviews visible but stops
            new ones. <code>canDelete</code> is what puts the delete control on
            a review the current user wrote.
          </p>
        </div>
      </story-template>
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,i=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${i}`,...this.log].slice(0,ws)}static get styles(){return _t`
      .panel {
        margin-top: 1em;
      }

      .add-review {
        font: inherit;
        padding: 0.3em 0.8em;
      }

      .log-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .log {
        margin: 0;
        padding-left: 1.5em;
        font-size: 0.9em;
        word-break: break-all;
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `}};sr([G()],mt.prototype,"log",2);sr([li("ia-reviews")],mt.prototype,"reviews",2);mt=sr([gt("ia-reviews-story")],mt);export{mt as IAReviewsStory};
