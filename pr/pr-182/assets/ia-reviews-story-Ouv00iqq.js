import{m as E,b as _,r as B,n as T,e as bt,c as Tt,i as St,A as U,o as pi,s as Fe,a as Et}from"./index-ylpOG8gM.js";import{M as n}from"./memoize-decorator-Bcs06flF.js";import{o as Ki,r as Zi}from"./story-template-CtWWWSr3.js";import{l as lr}from"./localized-decorator-9U1qUenP.js";import"./ia-button-DiVGAdk2.js";import"./syntax-highlighter-Bfjo3p99.js";import"./theme-styles-D3s-TnFZ.js";import"./ia-status-indicator-wzWNcyq8.js";import"./icon-box-CEU3uRKc.js";import"./mediatype-web-4uFmTReU.js";function s(r,e,t,a){var c=arguments.length,d=c<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")d=Reflect.decorate(r,e,t,a);else for(var y=r.length-1;y>=0;y--)(m=r[y])&&(d=(c<3?m(d):c>3?m(e,t,d):m(e,t))||d);return c>3&&d&&Object.defineProperty(e,t,d),d}class gt{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}gt.shared=new gt;class ie{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ie.shared=new ie;class yt{parseValue(e){return ie.shared.parseValue(e)}}yt.shared=new yt;class ze{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,d,m="00",y="00",w="00"]=t,H=new Date(`${a}-${c}-${d}T${m}:${y}:${w}`);return Number.isNaN(H.getTime())?void 0:H}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}ze.shared=new ze;class vt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,d)=>{const m=parseFloat(c);if(Number.isNaN(m))return t=!0,0;const w=60**(e.length-1-d);return m*Math.floor(w)}).reduce((c,d)=>c+d,0);return t?void 0:a}}vt.shared=new vt;class hi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),c=[];return a.forEach(d=>{d!==void 0&&c.push(d)}),c}}class _t{parseValue(e){return String(e)}}_t.shared=new _t;function Me(r,e,...t){for(const a of t){const c=r[a];if(c!=null)return e(c)}}function le(r,e,...t){return Me(r,a=>e(a),...t)}class ue{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ie.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return le(this.rawValue,e=>yt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return le(this.rawValue,e=>vt.shared.parseValue(e),"length")}get height(){return le(this.rawValue,e=>ie.shared.parseValue(e),"height")}get width(){return le(this.rawValue,e=>ie.shared.parseValue(e),"width")}get track(){return le(this.rawValue,e=>ie.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return le(this.rawValue,e=>ie.shared.parseValue(e),"bitrate")}get private(){return le(this.rawValue,e=>gt.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}s([n()],ue.prototype,"mtime",null);s([n()],ue.prototype,"size",null);s([n()],ue.prototype,"length",null);s([n()],ue.prototype,"height",null);s([n()],ue.prototype,"width",null);s([n()],ue.prototype,"track",null);s([n()],ue.prototype,"bitrate",null);s([n()],ue.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}s([n()],W.prototype,"values",null);s([n()],W.prototype,"value",null);class ae extends W{constructor(e){super(gt.shared,e)}}class D extends W{constructor(e){super(ze.shared,e)}}class Vt extends W{constructor(e){super(vt.shared,e)}}class v extends W{constructor(e){super(ie.shared,e)}}class u extends W{constructor(e){super(_t.shared,e)}}class Be{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends W{constructor(e,t){super(t,e)}}const Ji=new Be(["rl","lr"]);class Qi extends $e{constructor(e){super(e,Ji)}}class pt extends W{constructor(e){super(yt.shared,e)}}const en=new Be(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class tn extends $e{constructor(e){super(e,en)}}class fi extends W{constructor(e,t){super(t,e)}}class Gr extends fi{constructor(e){const t=new hi(_t.shared);super(e,t)}}class Wt extends fi{constructor(e){const t=new hi(ie.shared);super(e,t)}}const rn=/^([0-9a-f]{32})\s+\*?(.+)$/i,nn=/^(.+):([0-9a-f]{32})$/i;function sn(r){const e=r.match(rn);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(nn);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Jt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(sn).filter(a=>a!==void 0);return t.length?t:void 0}}Jt.shared=new Jt;class Yr extends W{constructor(e){super(Jt.shared,e)}}function ht(r,e){var t;const a=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class Qt{parseValue(e){if(typeof e!="string")return;const t=ht(e,"curator"),a=ht(e,"date"),c=ht(e,"comment"),d=ht(e,"state");if(!(!t&&!a&&!c&&!d))return{curator:t,date:a?ze.shared.parseValue(a):void 0,comment:c,state:d}}}Qt.shared=new Qt;class on extends W{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}er.shared=new er;class an extends W{constructor(e){super(er.shared,e)}}class tr{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),d=parseInt(t[3],10);return{hours:a*c,minutes:d,totalMinutes:a*(c*60+d)}}}tr.shared=new tr;class ln extends W{constructor(e){super(tr.shared,e)}}class rr{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}rr.shared=new rr;class cn extends W{constructor(e){super(rr.shared,e)}}const un=new Be(["true","none","frozen"]),dn=new Be(["sound","silent"]),pn=new Be(["color","b&w"]),hn=new Be(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(v,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(v,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(v,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(v,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,hn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(on,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(v,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(v,"firstfileserial")}get foldoutcount(){return this.field(v,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(ae,"has_mp3")}get height(){return this.field(v,"height")}get hidden(){return this.field(ae,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(ae,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(an,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(v,"audio_sample_rate")}get avg_rating(){return this.field(v,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(ae,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(pt,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,pn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(v,"downloads")}get duration(){return this.field(Vt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(v,"files_count")}get frames_per_second(){return this.field(v,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(v,"image_count")}get imagecount(){return this.field(v,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(v,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(v,"issue_count")}get issue_page_count(){return this.field(v,"issue_page_count")}get item_count(){return this.field(v,"item_count")}get item_size(){return this.field(pt,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(v,"lastfileserial")}get length(){return this.field(Vt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(ae,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Yr,"md5contents")}get md5s(){return this.field(Yr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(ae,"monochromatic")}get month(){return this.field(v,"month")}get mediatype(){return this.field(tn,"mediatype")}get mpeg_program(){return this.field(v,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(ae,"noarchivetorrent")}get noindex(){return this.field(ae,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(v,"num_favorites")}get num_reviews(){return this.field(v,"num_reviews")}get numeric_id(){return this.field(v,"numeric_id")}get numwarcs(){return this.field(v,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(ae,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(v,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(v,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(v,"output_time_minutes")}get pacer_case_num(){return this.field(v,"pacer-case-num")}get packaging_time_minutes(){return this.field(v,"packaging_time_minutes")}get page_number_confidence(){return this.field(v,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(Qi,"page-progression","page_progression")}get paginated(){return this.field(ae,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(v,"pick")}get podcastindexid(){return this.field(v,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(v,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(v,"rcs_key")}get repub_state(){return this.field(v,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(Gr,"republisher_operator")}get republisher_time(){return this.field(v,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,un),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(Vt,"runtime")}get scan_time_minutes(){return this.field(v,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Wt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(v,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(pt,"size")}get sizehint(){return this.field(pt,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,dn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(v,"source_pixel_height")}get source_pixel_width(){return this.field(v,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(Gr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Wt,"thumbs")}get times(){return this.field(Wt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(v,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(cn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(ln,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(v,"week")}get width(){return this.field(v,"width")}get year(){return this.field(v,"year")}field(e,...t){return Me(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}s([n()],o.prototype,"access",null);s([n()],o.prototype,"adder",null);s([n()],o.prototype,"amrc_id",null);s([n()],o.prototype,"archiveit_account_id",null);s([n()],o.prototype,"archiveit_account_organization_name",null);s([n()],o.prototype,"archiveit_collection_id",null);s([n()],o.prototype,"archiveit_collection_name",null);s([n()],o.prototype,"archiveit_job_type",null);s([n()],o.prototype,"audit_time_minutes",null);s([n()],o.prototype,"auditor",null);s([n()],o.prototype,"author",null);s([n()],o.prototype,"autocrop_version",null);s([n()],o.prototype,"bookplateleaf",null);s([n()],o.prototype,"bookreader_defaults",null);s([n()],o.prototype,"boxid",null);s([n()],o.prototype,"camera",null);s([n()],o.prototype,"cameraman",null);s([n()],o.prototype,"canister",null);s([n()],o.prototype,"case_name",null);s([n()],o.prototype,"col_number",null);s([n()],o.prototype,"collection_added",null);s([n()],o.prototype,"collection_library",null);s([n()],o.prototype,"collection_set",null);s([n()],o.prototype,"copyright_holder",null);s([n()],o.prototype,"court",null);s([n()],o.prototype,"crawler",null);s([n()],o.prototype,"crawljob",null);s([n()],o.prototype,"curation",null);s([n()],o.prototype,"dari_title",null);s([n()],o.prototype,"dari_title_romanized",null);s([n()],o.prototype,"date_case_filed",null);s([n()],o.prototype,"date_case_terminated",null);s([n()],o.prototype,"date_created",null);s([n()],o.prototype,"date_last_filing",null);s([n()],o.prototype,"derive_submittime",null);s([n()],o.prototype,"derive_version",null);s([n()],o.prototype,"discs",null);s([n()],o.prototype,"docket_num",null);s([n()],o.prototype,"external_metadata_update",null);s([n()],o.prototype,"fail_reasons",null);s([n()],o.prototype,"filesxml",null);s([n()],o.prototype,"firstfiledate",null);s([n()],o.prototype,"firstfileserial",null);s([n()],o.prototype,"foldoutcount",null);s([n()],o.prototype,"format",null);s([n()],o.prototype,"geo_restricted",null);s([n()],o.prototype,"guid",null);s([n()],o.prototype,"has_mp3",null);s([n()],o.prototype,"height",null);s([n()],o.prototype,"hidden",null);s([n()],o.prototype,"ia_orig__runtime",null);s([n()],o.prototype,"access_restricted_item",null);s([n()],o.prototype,"addeddate",null);s([n()],o.prototype,"aspect_ratio",null);s([n()],o.prototype,"audio_codec",null);s([n()],o.prototype,"audio_sample_rate",null);s([n()],o.prototype,"avg_rating",null);s([n()],o.prototype,"backup_location",null);s([n()],o.prototype,"ccnum",null);s([n()],o.prototype,"closed_captioning",null);s([n()],o.prototype,"collection",null);s([n()],o.prototype,"collections_raw",null);s([n()],o.prototype,"collection_size",null);s([n()],o.prototype,"color",null);s([n()],o.prototype,"contact",null);s([n()],o.prototype,"contributor",null);s([n()],o.prototype,"coverage",null);s([n()],o.prototype,"creator",null);s([n()],o.prototype,"creator_alt_script",null);s([n()],o.prototype,"credits",null);s([n()],o.prototype,"collection_layout",null);s([n()],o.prototype,"date",null);s([n()],o.prototype,"description",null);s([n()],o.prototype,"downloads",null);s([n()],o.prototype,"duration",null);s([n()],o.prototype,"external_identifier",null);s([n()],o.prototype,"external_link",null);s([n()],o.prototype,"files_count",null);s([n()],o.prototype,"frames_per_second",null);s([n()],o.prototype,"identifier_access",null);s([n()],o.prototype,"identifier_ark",null);s([n()],o.prototype,"identifier_bib",null);s([n()],o.prototype,"image_count",null);s([n()],o.prototype,"imagecount",null);s([n()],o.prototype,"indexdate",null);s([n()],o.prototype,"invoice",null);s([n()],o.prototype,"isbn",null);s([n()],o.prototype,"issue",null);s([n()],o.prototype,"issue_count",null);s([n()],o.prototype,"issue_page_count",null);s([n()],o.prototype,"item_count",null);s([n()],o.prototype,"item_size",null);s([n()],o.prototype,"language",null);s([n()],o.prototype,"lastdate",null);s([n()],o.prototype,"lastfiledate",null);s([n()],o.prototype,"lastfileserial",null);s([n()],o.prototype,"length",null);s([n()],o.prototype,"license",null);s([n()],o.prototype,"licenseurl",null);s([n()],o.prototype,"lineage",null);s([n()],o.prototype,"mature_content",null);s([n()],o.prototype,"md5",null);s([n()],o.prototype,"md5contents",null);s([n()],o.prototype,"md5s",null);s([n()],o.prototype,"medium",null);s([n()],o.prototype,"metadata_operator",null);s([n()],o.prototype,"metasource_catalog",null);s([n()],o.prototype,"monochromatic",null);s([n()],o.prototype,"month",null);s([n()],o.prototype,"mediatype",null);s([n()],o.prototype,"mpeg_program",null);s([n()],o.prototype,"next_item",null);s([n()],o.prototype,"noarchivetorrent",null);s([n()],o.prototype,"noindex",null);s([n()],o.prototype,"notes",null);s([n()],o.prototype,"num_favorites",null);s([n()],o.prototype,"num_reviews",null);s([n()],o.prototype,"numeric_id",null);s([n()],o.prototype,"numwarcs",null);s([n()],o.prototype,"ocr",null);s([n()],o.prototype,"ocr_autonomous",null);s([n()],o.prototype,"ocr_detected_lang",null);s([n()],o.prototype,"ocr_detected_lang_conf",null);s([n()],o.prototype,"ocr_detected_script",null);s([n()],o.prototype,"ocr_detected_script_conf",null);s([n()],o.prototype,"ocr_invalid_language",null);s([n()],o.prototype,"ocr_module_version",null);s([n()],o.prototype,"ocr_parameters",null);s([n()],o.prototype,"old_pallet",null);s([n()],o.prototype,"openlibrary_edition",null);s([n()],o.prototype,"openlibrary_work",null);s([n()],o.prototype,"operator",null);s([n()],o.prototype,"originalurl",null);s([n()],o.prototype,"osf_category",null);s([n()],o.prototype,"osf_project",null);s([n()],o.prototype,"osf_registration_doi",null);s([n()],o.prototype,"osf_registration_schema",null);s([n()],o.prototype,"osf_registry",null);s([n()],o.prototype,"osf_subjects",null);s([n()],o.prototype,"osf_tags",null);s([n()],o.prototype,"output_time_minutes",null);s([n()],o.prototype,"pacer_case_num",null);s([n()],o.prototype,"packaging_time_minutes",null);s([n()],o.prototype,"page_number_confidence",null);s([n()],o.prototype,"page_number_module_version",null);s([n()],o.prototype,"page_progression",null);s([n()],o.prototype,"paginated",null);s([n()],o.prototype,"parse_date",null);s([n()],o.prototype,"parse_state",null);s([n()],o.prototype,"partner",null);s([n()],o.prototype,"pashto_title",null);s([n()],o.prototype,"pashto_title_romanized",null);s([n()],o.prototype,"pdf_degraded",null);s([n()],o.prototype,"pdf_module_version",null);s([n()],o.prototype,"pick",null);s([n()],o.prototype,"podcastindexid",null);s([n()],o.prototype,"post_text",null);s([n()],o.prototype,"ppi",null);s([n()],o.prototype,"previous_item",null);s([n()],o.prototype,"program",null);s([n()],o.prototype,"publicdate",null);s([n()],o.prototype,"publisher",null);s([n()],o.prototype,"political_religious_party",null);s([n()],o.prototype,"rcs_key",null);s([n()],o.prototype,"repub_state",null);s([n()],o.prototype,"republisher_date",null);s([n()],o.prototype,"republisher_operator",null);s([n()],o.prototype,"republisher_time",null);s([n()],o.prototype,"reviewdate",null);s([n()],o.prototype,"reviews_allowed",null);s([n()],o.prototype,"ribbon_state",null);s([n()],o.prototype,"ribbon_state_modify_date",null);s([n()],o.prototype,"rights",null);s([n()],o.prototype,"rights_holder",null);s([n()],o.prototype,"rssfeed",null);s([n()],o.prototype,"runtime",null);s([n()],o.prototype,"scan_time_minutes",null);s([n()],o.prototype,"scandate",null);s([n()],o.prototype,"scanfee",null);s([n()],o.prototype,"scanner",null);s([n()],o.prototype,"scanner_operator",null);s([n()],o.prototype,"scanningcenter",null);s([n()],o.prototype,"scribe3_search_catalog",null);s([n()],o.prototype,"scribe3_search_id",null);s([n()],o.prototype,"segments",null);s([n()],o.prototype,"sessionid",null);s([n()],o.prototype,"shndiscs",null);s([n()],o.prototype,"shotlist",null);s([n()],o.prototype,"signal_path",null);s([n()],o.prototype,"size",null);s([n()],o.prototype,"sizehint",null);s([n()],o.prototype,"software_version",null);s([n()],o.prototype,"sort_order",null);s([n()],o.prototype,"sound",null);s([n()],o.prototype,"soundcreator",null);s([n()],o.prototype,"soundtitle",null);s([n()],o.prototype,"source",null);s([n()],o.prototype,"source_pixel_height",null);s([n()],o.prototype,"source_pixel_width",null);s([n()],o.prototype,"source_url",null);s([n()],o.prototype,"sponsor",null);s([n()],o.prototype,"sponsordate",null);s([n()],o.prototype,"start_localtime",null);s([n()],o.prototype,"start_time",null);s([n()],o.prototype,"station_name",null);s([n()],o.prototype,"stop_time",null);s([n()],o.prototype,"subject",null);s([n()],o.prototype,"taper",null);s([n()],o.prototype,"thumbs",null);s([n()],o.prototype,"times",null);s([n()],o.prototype,"title",null);s([n()],o.prototype,"title_alt_script",null);s([n()],o.prototype,"transferer",null);s([n()],o.prototype,"track",null);s([n()],o.prototype,"tts_version",null);s([n()],o.prototype,"tuner",null);s([n()],o.prototype,"type",null);s([n()],o.prototype,"updatedate",null);s([n()],o.prototype,"updater",null);s([n()],o.prototype,"uploader",null);s([n()],o.prototype,"uploadsoftware",null);s([n()],o.prototype,"utc_offset",null);s([n()],o.prototype,"venue",null);s([n()],o.prototype,"video_codec",null);s([n()],o.prototype,"volume",null);s([n()],o.prototype,"website",null);s([n()],o.prototype,"week",null);s([n()],o.prototype,"width",null);s([n()],o.prototype,"year",null);class te{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return le(this.rawValue,e=>ze.shared.parseValue(e),"reviewdate")}get createdate(){return le(this.rawValue,e=>ze.shared.parseValue(e),"createdate")}get stars(){return le(this.rawValue,e=>ie.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}s([n()],te.prototype,"reviewdate",null);s([n()],te.prototype,"createdate",null);s([n()],te.prototype,"stars",null);class fn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ue(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new te(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class ir extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class mn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let d;try{const m=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(c.href,m)}catch(m){const y=m instanceof Error?m.message:typeof m=="string"?m:"Unknown error";return this.getErrorResult(Te.networkError,y)}try{const m=await d.json(),y=m.error;if(y){const w=m.forensics;return this.getErrorResult(Te.searchEngineError,y,w)}else return{success:m}}catch(m){const y=m instanceof Error?m.message:typeof m=="string"?m:"Unknown error";return this.getErrorResult(Te.decodingError,y)}}getErrorResult(e,t,a){return{error:new ir(e,t,a)}}}class qr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new ir(Te.itemNotFound)}:{success:new fn(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new ir(Te.itemNotFound)}:{success:c.success.result}}}qr.default=new qr(new mn);function Xr(r){return new Promise(e=>setTimeout(e,r))}class nr{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}nr.shared=new nr;class sr{shouldRetry(){return!1}retryDelay(){return null}}sr.shared=new sr;class cr{}cr.default=nr.shared;cr.noRetry=sr.shared;const mi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class gn{constructor(e){this.retryConfig=cr.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=mi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,d;const m=typeof e=="string"?e:e.url;try{const y=await fetch(e,a?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const w=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(w.shouldRetry(y,t)){const $=w.retryDelay(t,y);if($!==null)return await Xr($),this.logRetryEvent(m,t,y.statusText,y.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(m,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(m,y),y;const w=(d=a?.retryConfig)!==null&&d!==void 0?d:this.retryConfig;if(w.shouldRetry(null,t)){const $=w.retryDelay(t);if($!==null)return await Xr($),this.logRetryEvent(m,t,y,y),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(m,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var d;(d=this.analyticsHandler)===null||d===void 0||d.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const yn=new Set(["POST","PUT","DELETE","PATCH"]);class ur{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new gn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const m=typeof e=="string"?e:e.url;a=this.addSearchParams(m,{reCache:"1"})}const d=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,d)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((w,H)=>{c.set(H,w)}),a.headers=c;const d=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(d,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,d,m;if(!this.getCsrfToken)return t;const y=(a=mi(t))!==null&&a!==void 0?a:{};if(!y.includeCsrfToken)return t;const w=(c=y.requestInit)!==null&&c!==void 0?c:{},H=((m=(d=w.method)!==null&&d!==void 0?d:typeof e!="string"?e.method:void 0)!==null&&m!==void 0?m:"GET").toUpperCase();if(!yn.has(H))return t;const $=new Headers(w.headers);return $.has("X-CSRF-Token")?t:($.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{...w,headers:$}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),d=a===-1?e:e.slice(0,a),m=d.indexOf("?"),y=m===-1?d:d.slice(0,m),w=new URLSearchParams(m===-1?"":d.slice(m+1)),H=ur.asSearchParams(t),$=new Set;H.forEach((Ze,ce)=>{$.has(ce)||($.add(ce),w.delete(ce))}),H.forEach((Ze,ce)=>{w.append(ce,Ze)});const re=w.toString();return`${y}${re?`?${re}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class vn extends ur{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const _n="/write-review.php",wn="/edit-reviews.php";class gi{constructor(e){this.fetchHandler=e?.fetchHandler??new vn,this.baseHost=e?.baseHost??"https://archive.org",this.submitPath=e?.submitPath??_n,this.deletePath=e?.deletePath??wn,this.deleteMethod=e?.deleteMethod??"POST"}async submitReview(e){const t=new URLSearchParams;return t.append("identifier",e.identifier),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_stars",e.stars??"0"),e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:t})}async deleteReview(e){const t=new URLSearchParams;t.append("identifier",e.identifier),t.append("deleteReviewer",e.reviewer),e.reviewerItemname&&t.append("deleteReviewerItemname",e.reviewerItemname);const a=`${this.baseHost}${this.deletePath}?${t.toString()}`;return this.request(a,{method:this.deleteMethod})}async request(e,t){try{const a=await this.fetchHandler.fetch(e,{requestInit:{method:t.method,body:t.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(a)}catch(a){return console.error("Review request failed",a),{success:!1,error:this.genericError}}}async parseResult(e){let t;try{t=await e.json()}catch{t=void 0}return e.ok?!t||t.success?{success:!0}:{success:!1,error:t.error??this.genericError}:{success:!1,error:t?.error??this.genericError}}get genericError(){return E("Sorry, something went wrong. Please try again later.")}}const bn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Kr(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return _`<span title="${r}">${t}</span>`}function Zr(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,a=Array(e);t<e;t++)a[t]=r[t];return a}function Tn(r){if(Array.isArray(r))return r}function Sn(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var a,c,d,m,y=[],w=!0,H=!1;try{if(d=(t=t.call(r)).next,e!==0)for(;!(w=(a=d.call(t)).done)&&(y.push(a.value),y.length!==e);w=!0);}catch($){H=!0,c=$}finally{try{if(!w&&t.return!=null&&(m=t.return(),Object(m)!==m))return}finally{if(H)throw c}}return y}}function En(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Rn(r,e){return Tn(r)||Sn(r,e)||An(r,e)||En()}function An(r,e){if(r){if(typeof r=="string")return Zr(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Zr(r,e):void 0}}const yi=Object.entries,Jr=Object.setPrototypeOf,xn=Object.isFrozen,Cn=Object.getPrototypeOf,Ln=Object.getOwnPropertyDescriptor;let F=Object.freeze,z=Object.seal,Ne=Object.create,vi=typeof Reflect<"u"&&Reflect,or=vi.apply,ar=vi.construct;F||(F=function(e){return e});z||(z=function(e){return e});or||(or=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),d=2;d<a;d++)c[d-2]=arguments[d];return e.apply(t,c)});ar||(ar=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const be=M(Array.prototype.forEach),On=M(Array.prototype.lastIndexOf),Qr=M(Array.prototype.pop),Ye=M(Array.prototype.push),Dn=M(Array.prototype.splice),Ue=Array.isArray,Ke=M(String.prototype.toLowerCase),Gt=M(String.prototype.toString),ei=M(String.prototype.match),qe=M(String.prototype.replace),ti=M(String.prototype.indexOf),kn=M(String.prototype.trim),In=M(Number.prototype.toString),Pn=M(Boolean.prototype.toString),ri=typeof BigInt>"u"?null:M(BigInt.prototype.toString),ii=typeof Symbol>"u"?null:M(Symbol.prototype.toString),Y=M(Object.prototype.hasOwnProperty),Xe=M(Object.prototype.toString),j=M(RegExp.prototype.test),fe=Mn(TypeError);function M(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return or(r,e,a)}}function Mn(r){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return ar(r,t)}}function R(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ke;if(Jr&&Jr(r,null),!Ue(e))return r;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const d=t(c);d!==c&&(xn(e)||(e[a]=d),c=d)}r[c]=!0}return r}function Nn(r){for(let e=0;e<r.length;e++)Y(r,e)||(r[e]=null);return r}function Z(r){const e=Ne(null);for(const a of yi(r)){var t=Rn(a,2);const c=t[0],d=t[1];Y(r,c)&&(Ue(d)?e[c]=Nn(d):d&&typeof d=="object"&&d.constructor===Object?e[c]=Z(d):e[c]=d)}return e}function $n(r){switch(typeof r){case"string":return r;case"number":return In(r);case"boolean":return Pn(r);case"bigint":return ri?ri(r):"0";case"symbol":return ii?ii(r):"Symbol()";case"undefined":return Xe(r);case"function":case"object":{if(r===null)return Xe(r);const e=r,t=ee(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:Xe(a)}return Xe(r)}default:return Xe(r)}}function ee(r,e){for(;r!==null;){const a=Ln(r,e);if(a){if(a.get)return M(a.get);if(typeof a.value=="function")return M(a.value)}r=Cn(r)}function t(){return null}return t}function Fn(r){try{return j(r,""),!0}catch{return!1}}const ni=F(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Yt=F(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),qt=F(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Un=F(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Xt=F(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zn=F(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),si=F(["#text"]),oi=F(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Kt=F(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ai=F(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ft=F(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bn=z(/{{[\w\W]*|^[\w\W]*}}/g),Hn=z(/<%[\w\W]*|^[\w\W]*%>/g),jn=z(/\${[\w\W]*/g),Vn=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wn=z(/^aria-[\-\w]+$/),li=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gn=z(/^(?:\w+script|data):/i),Yn=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qn=z(/^html$/i),Xn=z(/^[a-z][.\w]*(-[.\w]+)+$/i),ci=z(/<[/\w!]/g),ui=z(/<[/\w]/g),Kn=z(/<\/no(script|embed|frames)/i),Zn=z(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},_i=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Jn=F(R({},_i)),Qn=(function(){const r={};return be(_i,e=>{r[e]=z(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),F(r)})(),es=function(){return typeof window>"u"?null:window},ts=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const d="dompurify"+(a?"#"+a:"");try{return e.createPolicy(d,{createHTML(m){return m},createScriptURL(m){return m}})}catch{return console.warn("TrustedTypes policy "+d+" could not be created."),null}},di=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},me=function(e,t,a,c){return Y(e,t)&&Ue(e[t])?R(c.base?Z(c.base):{},e[t],c.transform):a},Zt=function(e,t,a){const c=Y(e,t)?e[t]:void 0;return c&&typeof c=="object"?Z(c):a()};function wi(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:es();const e=h=>wi(h);if(e.version="3.4.16",e.removed=[],!r||!r.document||r.document.nodeType!==K.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const a=t,c=a.currentScript;r.DocumentFragment;const d=r.HTMLTemplateElement,m=r.Node,y=r.Element,w=r.NodeFilter;r.NamedNodeMap===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const H=r.DOMParser,$=r.trustedTypes,re=y.prototype,Ze=ee(re,"cloneNode"),ce=ee(re,"remove"),pr=ee(re,"removeAttributeNode"),bi=ee(re,"nextSibling"),Se=ee(re,"childNodes"),Ee=ee(re,"parentNode"),hr=ee(re,"shadowRoot"),Rt=ee(re,"attributes"),ge=m&&m.prototype?ee(m.prototype,"nodeType"):null,Re=m&&m.prototype?ee(m.prototype,"nodeName"):null,Je=m&&m.prototype?ee(m.prototype,"ownerDocument"):null,He=function(i){return ge?ge(i):i.nodeType},At=function(i){return Re?Re(i):i.nodeName};if(typeof d=="function"){const h=t.createElement("template");h.content&&h.content.ownerDocument&&(t=h.content.ownerDocument)}let G,ye="",xt,fr=!1,je=0;const mr=function(){if(je>0)throw fe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(i){mr(),je++;try{return G.createHTML(i)}finally{je--}},Ti=function(i){mr(),je++;try{return G.createScriptURL(i)}finally{je--}},Si=function(){return fr||(xt=ts($,c),fr=!0),xt},Qe=t,Ct=Qe.implementation,gr=Qe.createNodeIterator,Ei=Qe.createDocumentFragment,Ri=Qe.getElementsByTagName,Ai=a.importNode;let C=di();e.isSupported=typeof yi=="function"&&typeof Ee=="function"&&Ct&&Ct.createHTMLDocument!==void 0;const xi=Bn,Ci=Hn,Li=jn,Oi=Vn,Di=Wn,ki=Gn,yr=Yn,Ii=Xn;let vr=li,L=null;const Lt=R({},[...ni,...Yt,...qt,...Xt,...si]);let O=null;const Ot=R({},[...oi,...Kt,...ai,...ft]);let ne=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,_r=null;const de=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let wr=!0,Dt=!0,br=!1,Tr=!0,pe=!1,ve=!0,_e=!1,kt=!1,et=null,tt=null,It=!1,xe=!1,rt=!1,it=!1,Sr=!0,Er=!1;const Rr="user-content-";let Pt=!0,Mt=!1,Ce={},Le=null;const Ar=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let xr=null;const Cr=R({},["audio","video","img","source","image","track"]);let Lr=null;const Or=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",st="http://www.w3.org/2000/svg",se="http://www.w3.org/1999/xhtml";let Oe=se,Nt=!1,$t=null;const Pi=R({},[nt,st,se],Gt),Dr=F(["mi","mo","mn","ms","mtext"]);let Ft=R({},Dr);const kr=F(["annotation-xml"]);let Ut=R({},kr);const Mi=R({},["title","style","font","a","script"]);let We=null;const Ni=["application/xhtml+xml","text/html"],$i="text/html";let I=null,De=null;const Fi=t.createElement("form"),Ir=function(i){return i instanceof RegExp||i instanceof Function},zt=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(De&&De===i)return;(!i||typeof i!="object")&&(i={}),i=Z(i),We=Ni.indexOf(i.PARSER_MEDIA_TYPE)===-1?$i:i.PARSER_MEDIA_TYPE,I=We==="application/xhtml+xml"?Gt:Ke,L=me(i,"ALLOWED_TAGS",Lt,{transform:I}),O=me(i,"ALLOWED_ATTR",Ot,{transform:I}),$t=me(i,"ALLOWED_NAMESPACES",Pi,{transform:Gt}),Lr=me(i,"ADD_URI_SAFE_ATTR",Or,{transform:I,base:Or}),xr=me(i,"ADD_DATA_URI_TAGS",Cr,{transform:I,base:Cr}),Le=me(i,"FORBID_CONTENTS",Ar,{transform:I}),Ve=me(i,"FORBID_TAGS",Z({}),{transform:I}),_r=me(i,"FORBID_ATTR",Z({}),{transform:I}),Ce=Y(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Z(i.USE_PROFILES):i.USE_PROFILES:!1,wr=i.ALLOW_ARIA_ATTR!==!1,Dt=i.ALLOW_DATA_ATTR!==!1,br=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Tr=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pe=i.SAFE_FOR_TEMPLATES||!1,ve=i.SAFE_FOR_XML!==!1,_e=i.WHOLE_DOCUMENT||!1,xe=i.RETURN_DOM||!1,rt=i.RETURN_DOM_FRAGMENT||!1,it=i.RETURN_TRUSTED_TYPE||!1,It=i.FORCE_BODY||!1,Sr=i.SANITIZE_DOM!==!1,Er=i.SANITIZE_NAMED_PROPS||!1,Pt=i.KEEP_CONTENT!==!1,Mt=i.IN_PLACE||!1,vr=Fn(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:li,Oe=typeof i.NAMESPACE=="string"?i.NAMESPACE:se,Ft=Zt(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>R({},Dr)),Ut=Zt(i,"HTML_INTEGRATION_POINTS",()=>R({},kr));const l=Zt(i,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(ne=Ne(null),Y(l,"tagNameCheck")&&Ir(l.tagNameCheck)&&(ne.tagNameCheck=l.tagNameCheck),Y(l,"attributeNameCheck")&&Ir(l.attributeNameCheck)&&(ne.attributeNameCheck=l.attributeNameCheck),Y(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),z(ne),pe&&(Dt=!1),rt&&(xe=!0),Ce&&(L=R({},si),O=Ne(null),Ce.html===!0&&(R(L,ni),R(O,oi)),Ce.svg===!0&&(R(L,Yt),R(O,Kt),R(O,ft)),Ce.svgFilters===!0&&(R(L,qt),R(O,Kt),R(O,ft)),Ce.mathMl===!0&&(R(L,Xt),R(O,ai),R(O,ft))),de.tagCheck=null,de.attributeCheck=null,Y(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?de.tagCheck=i.ADD_TAGS:Ue(i.ADD_TAGS)&&(L===Lt&&(L=Z(L)),R(L,i.ADD_TAGS,I))),Y(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?de.attributeCheck=i.ADD_ATTR:Ue(i.ADD_ATTR)&&(O===Ot&&(O=Z(O)),R(O,i.ADD_ATTR,I))),Y(i,"ADD_FORBID_CONTENTS")&&Ue(i.ADD_FORBID_CONTENTS)&&(Le===Ar&&(Le=Z(Le)),R(Le,i.ADD_FORBID_CONTENTS,I)),Pt&&(L["#text"]=!0),_e&&R(L,["html","head","body"]),L.table&&(R(L,["tbody"]),delete Ve.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw fe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw fe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const p=G;G=i.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(f){throw G=p,f}}else i.TRUSTED_TYPES_POLICY===null?(G=void 0,ye=""):(G===void 0&&(G=Si()),G&&typeof ye=="string"&&(ye=Ae("")));F&&F(i),De=i},Pr=R({},[...Yt,...qt,...Un]),Mr=R({},[...Xt,...zn]),Ui=function(i,l,p){return l.namespaceURI===se?i==="svg":l.namespaceURI===nt?i==="svg"&&(p==="annotation-xml"||Ft[p]):!!Pr[i]},zi=function(i,l,p){return l.namespaceURI===se?i==="math":l.namespaceURI===st?i==="math"&&Ut[p]:!!Mr[i]},Bi=function(i,l,p){return l.namespaceURI===st&&!Ut[p]||l.namespaceURI===nt&&!Ft[p]?!1:!Mr[i]&&(Mi[i]||!Pr[i])},Hi=function(i){let l=Ee(i);(!l||!l.tagName)&&(l={namespaceURI:Oe,tagName:"template"});const p=Ke(i.tagName),f=Ke(l.tagName);return $t[i.namespaceURI]?i.namespaceURI===st?Ui(p,l,f):i.namespaceURI===nt?zi(p,l,f):i.namespaceURI===se?Bi(p,l,f):!!(We==="application/xhtml+xml"&&$t[i.namespaceURI]):!1},he=function(i){Ye(e.removed,{element:i});try{Ee(i).removeChild(i)}catch{if(ce(i),!Ee(i))throw fe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Nr=function(i,l,p){try{pr(i,l)}catch{try{i.removeAttribute(p)}catch{}}},ot=function(i){at(i);const l=Se(i);if(l){const f=[];be(l,g=>{Ye(f,g)}),be(f,g=>{try{ce(g)}catch{}})}const p=Rt(i);if(p)for(let f=p.length-1;f>=0;--f){const g=p[f],b=g&&g.name;typeof b=="string"&&Nr(i,g,b)}},we=function(i,l,p){if(!p)try{p=l.getAttributeNode(i)}catch{p=null}Ye(e.removed,{attribute:p||null,from:l});try{p?pr(l,p):l.removeAttribute(i)}catch{try{l.removeAttribute(i)}catch{}}if(i==="is")if(xe||rt)try{he(l)}catch{}else try{l.setAttribute(i,"")}catch{}},ji=function(i){const l=Rt(i);if(l)for(let p=l.length-1;p>=0;--p){const f=l[p],g=f&&f.name;typeof g!="string"||O[I(g)]||Nr(i,f,g)}},at=function(i){const l=[i];for(;l.length>0;){const p=l.pop();He(p)===K.element&&ji(p);const f=Se(p);if(f)for(let g=f.length-1;g>=0;--g)l.push(f[g])}},$r=function(i,l){return ve?i==="patchsrc"?!0:i==="for"&&l!=="label"&&l!=="output":!1},Vi=function(i){if(!ve)return;const l=[i];for(;l.length>0;){const p=l.pop(),f=He(p);if(f===K.processingInstruction||f===K.comment&&j(ui,p.data)){try{ce(p)}catch{}continue}if(f===K.element){const b=p,S=I(At(p));try{b.hasAttribute&&b.hasAttribute("patchsrc")&&b.removeAttribute("patchsrc"),b.hasAttribute&&b.hasAttribute("for")&&$r("for",S)&&b.removeAttribute("for")}catch{}}const g=Se(p);if(g)for(let b=g.length-1;b>=0;--b)l.push(g[b])}},Fr=function(i){let l=null,p=null;if(It)i="<remove></remove>"+i;else{const b=ei(i,/^[\r\n\t ]+/);p=b&&b[0]}We==="application/xhtml+xml"&&Oe===se&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const f=G?Ae(i):i;if(Oe===se)try{l=new H().parseFromString(f,We)}catch{}if(!l||!l.documentElement){l=Ct.createDocument(Oe,"template",null);try{l.documentElement.innerHTML=Nt?ye:f}catch{}}const g=l.body||l.documentElement;return i&&p&&g.insertBefore(t.createTextNode(p),g.childNodes[0]||null),Oe===se?Ri.call(l,_e?"html":"body")[0]:_e?l.documentElement:g},Ur=function(i){const l=Je?Je(i):i.ownerDocument;return gr.call(l||i,i,w.SHOW_ELEMENT|w.SHOW_COMMENT|w.SHOW_TEXT|w.SHOW_PROCESSING_INSTRUCTION|w.SHOW_CDATA_SECTION,null)},lt=function(i){return i=qe(i,xi," "),i=qe(i,Ci," "),i=qe(i,Li," "),i},Bt=function(i){var l;i.normalize();const p=Je?Je(i):i.ownerDocument,f=gr.call(p||i,i,w.SHOW_TEXT|w.SHOW_COMMENT|w.SHOW_CDATA_SECTION|w.SHOW_PROCESSING_INSTRUCTION,null);let g=f.nextNode();for(;g;)g.data=lt(g.data),g=f.nextNode();const b=(l=i.querySelectorAll)===null||l===void 0?void 0:l.call(i,"template");b&&be(b,S=>{ke(S.content)&&Bt(S.content)})},ct=function(i){const l=Re?Re(i):null;return typeof l!="string"||I(l)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==Rt(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ge(i)||i.childNodes!==Se(i)},ke=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return ge(i)===K.documentFragment}catch{return!1}},Ge=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return typeof ge(i)=="number"}catch{return!1}};function oe(h,i,l){h.length!==0&&be(h,p=>{p.call(e,i,l,De)})}const Wi=function(i,l){return!!(ve&&i.hasChildNodes()&&!Ge(i.firstElementChild)&&j(ci,i.textContent)&&j(ci,i.innerHTML)||ve&&i.namespaceURI===se&&Jn[l]&&(Ge(i.firstElementChild)||typeof i.textContent=="string"&&j(Qn[l],i.textContent))||i.nodeType===K.processingInstruction||ve&&i.nodeType===K.comment&&j(ui,i.data))},ut=function(i,l){if(i instanceof RegExp)return j(i,l);if(i instanceof Function){for(var p=arguments.length,f=new Array(p>2?p-2:0),g=2;g<p;g++)f[g-2]=arguments[g];return!!i(l,...f)}return!1},Gi=function(i,l,p){if(!Ve[l]&&jr(l)&&ut(ne.tagNameCheck,l))return!1;if(Pt&&!Le[l]){const f=Ee(i),g=Se(i);if(g&&f){const b=g.length;for(let S=b-1;S>=0;--S){const k=i===p?Ze(g[S],!0):g[S];f.insertBefore(k,bi(i))}}}return he(i),!0},zr=function(i,l,p,f){return i.length===0?l:l===p||l===f?Z(l):l},Ie=function(i,l){return i===l||Ee(i)!==null?!1:(Mt&&at(i),!0)},Br=function(i,l){if(oe(C.beforeSanitizeElements,i,null),Ie(i,l))return!0;if(ct(i))return he(i),!0;const p=I(At(i));if(L=zr(C.uponSanitizeElement,L,Lt,et),oe(C.uponSanitizeElement,i,{tagName:p,allowedTags:L}),Ie(i,l))return!0;if(Wi(i,p))return he(i),!0;if(Ve[p]||!(de.tagCheck instanceof Function&&de.tagCheck(p))&&!L[p]){const f=Gi(i,p,l);return f===!1&&(oe(C.afterSanitizeElements,i,null),Ie(i,l))?!0:f}if(He(i)===K.element&&!Hi(i)||(p==="noscript"||p==="noembed"||p==="noframes")&&j(Kn,i.innerHTML))return he(i),!0;if(pe&&i.nodeType===K.text){const f=lt(i.textContent);i.textContent!==f&&(Ye(e.removed,{element:i.cloneNode()}),i.textContent=f)}return oe(C.afterSanitizeElements,i,null),Ie(i,l)},Hr=function(i,l,p){if(_r[l]||$r(l,i)||Sr&&(l==="id"||l==="name")&&(p in t||p in Fi))return!1;const f=O[l]||de.attributeCheck instanceof Function&&de.attributeCheck(l,i);return Dt&&j(Oi,l)||wr&&j(Di,l)?!0:f?Lr[l]||j(vr,qe(p,yr,""))||(l==="src"||l==="xlink:href"||l==="href")&&i!=="script"&&ti(p,"data:")===0&&xr[i]||br&&!j(ki,qe(p,yr,""))?!0:!p:jr(i)&&ut(ne.tagNameCheck,i)&&ut(ne.attributeNameCheck,l,i)||l==="is"&&ne.allowCustomizedBuiltInElements&&ut(ne.tagNameCheck,p)},Yi=R({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),jr=function(i){return!Yi[Ke(i)]&&j(Ii,i)},qi=function(i,l,p,f){if(G&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!p)switch($.getAttributeType(i,l)){case"TrustedHTML":return Ae(f);case"TrustedScriptURL":return Ti(f)}return f},Xi=function(i,l,p,f){try{return p?i.setAttributeNS(p,l,f):i.setAttribute(l,f),ct(i)?(he(i),!1):!0}catch{return we(l,i),!1}},Vr=function(i,l){if(oe(C.beforeSanitizeAttributes,i,null),Ie(i,l))return;const p=i.attributes;if(!p||ct(i))return;O=zr(C.uponSanitizeAttribute,O,Ot,tt);const f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:O,forceKeepAttr:void 0};let g=p.length;const b=I(i.nodeName);for(;g--;){const S=p[g],k=S.name,Q=S.namespaceURI,X=S.value,Pe=I(k),jt=X;let V=k==="value"?jt:kn(jt),Wr=!1;if(f.attrName=Pe,f.attrValue=V,f.keepAttr=!0,f.forceKeepAttr=void 0,oe(C.uponSanitizeAttribute,i,f),V=f.attrValue,Er&&(Pe==="id"||Pe==="name")&&ti(V,Rr)!==0&&(we(k,i,S),V=Rr+V,Wr=!0),ve&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(k,i,S);continue}if(Pe==="attributename"&&ei(V,"href")){we(k,i,S);continue}if(!f.forceKeepAttr){if(!f.keepAttr){we(k,i,S);continue}if(!Tr&&j(Zn,V)){we(k,i,S);continue}if(pe&&(V=lt(V)),!Hr(b,Pe,V)){we(k,i,S);continue}V=qi(b,Pe,Q,V),V!==jt&&Xi(i,k,Q,V)&&Wr&&Qr(e.removed)}}oe(C.afterSanitizeAttributes,i,null),Ie(i,l)},dt=function(i){let l=null;const p=Ur(i);for(oe(C.beforeSanitizeShadowDOM,i,null);l=p.nextNode();)if(oe(C.uponSanitizeShadowNode,l,null),Br(l,i),Vr(l,i),ke(l.content)&&dt(l.content),He(l)===K.element){const f=hr(l);ke(f)&&(Ht(f),dt(f))}oe(C.afterSanitizeShadowDOM,i,null)},Ht=function(i){const l=[{node:i,shadow:null}];for(;l.length>0;){const p=l.pop();if(p.shadow){dt(p.shadow);continue}const f=p.node,g=He(f)===K.element,b=Se(f);if(b)for(let S=b.length-1;S>=0;--S)l.push({node:b[S],shadow:null});if(g){const S=Re?Re(f):null;if(typeof S=="string"&&I(S)==="template"){const k=f.content;ke(k)&&l.push({node:k,shadow:null})}}if(g){const S=hr(f);ke(S)&&l.push({node:null,shadow:S},{node:S,shadow:null})}}};return e.sanitize=function(h){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,p=null,f=null,g=null;if(Nt=!h,Nt&&(h="<!-->"),typeof h!="string"&&!Ge(h)&&(h=$n(h),typeof h!="string"))throw fe("dirty is not a string, aborting");if(!e.isSupported)return h;kt?(L=et,O=tt):zt(i),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(L=Z(L)),C.uponSanitizeAttribute.length>0&&(O=Z(O)),e.removed=[];const b=Mt&&typeof h!="string"&&Ge(h);if(b){Vi(h);const Q=At(h);if(typeof Q=="string"){const X=I(Q);if(!L[X]||Ve[X])throw ot(h),fe("root node is forbidden and cannot be sanitized in-place")}if(ct(h))throw ot(h),fe("root node is clobbered and cannot be sanitized in-place");try{Ht(h)}catch(X){throw ot(h),X}}else if(Ge(h))l=Fr("<!---->"),p=l.ownerDocument.importNode(h,!0),p.nodeType===K.element&&p.nodeName==="BODY"||p.nodeName==="HTML"?l=p:l.appendChild(p),Ht(l);else{if(!xe&&!pe&&!_e&&h.indexOf("<")===-1)return G&&it?Ae(h):h;if(l=Fr(h),!l)return xe?null:it?ye:""}l&&It&&he(l.firstChild);const S=b?h:l;try{const Q=Ur(S);for(;f=Q.nextNode();)Br(f,S),Vr(f,S),ke(f.content)&&dt(f.content)}catch(Q){throw b&&(ot(h),be(e.removed,X=>{X.element&&at(X.element)})),Q}if(b){let Q=!1;if(be(e.removed,X=>{X.element&&(X.element===h&&(Q=!0),at(X.element))}),Q)throw fe("a node selected for removal could not be safely returned; refusing to sanitize in place");return pe&&Bt(h),h}if(xe){if(pe&&Bt(l),rt)for(g=Ei.call(l.ownerDocument);l.firstChild;)g.appendChild(l.firstChild);else g=l;return(O.shadowroot||O.shadowrootmode)&&(g=Ai.call(a,g,!0)),g}let k=_e?l.outerHTML:l.innerHTML;return _e&&L["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&j(qn,l.ownerDocument.doctype.name)&&(k="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+k),pe&&(k=lt(k)),G&&it?Ae(k):k},e.setConfig=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};zt(h),kt=!0,et=L,tt=O},e.clearConfig=function(){De=null,kt=!1,et=null,tt=null,G=xt,ye=""},e.isValidAttribute=function(h,i,l){De||zt({});const p=I(h),f=I(i);return Hr(p,f,l)},e.addHook=function(h,i){typeof i=="function"&&Y(C,h)&&Ye(C[h],i)},e.removeHook=function(h,i){if(Y(C,h)){if(i!==void 0){const l=On(C[h],i);return l===-1?void 0:Dn(C[h],l,1)[0]}return Qr(C[h])}},e.removeHooks=function(h){Y(C,h)&&(C[h]=[])},e.removeAllHooks=function(){C=di()},e}var mt=wi();const rs=["a"];function is(r){mt.addHook("afterSanitizeAttributes",ns);try{return mt.sanitize(r,{ALLOWED_TAGS:rs})}finally{mt.removeHook("afterSanitizeAttributes")}}function ns(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function ss(r,e=100,t=!0){if(r.length<e)return r;let a=e;if(t){const c=r.indexOf(" ",e),d=c-e<=20;if(d&&c===r.length-1)return r;c!==-1&&d&&(a=c)}return os(r,a,e)}function os(r,e,t){let a=r.slice(0,e);const c=a.match(/<a/gi);if(c){const d=a.match(/<\/a/gi);if(!d||d.length<c.length){const m=r.indexOf("</a>",e),y=m-t<=20;if(y&&r.length===m+4)return r;if(m!==-1&&y)a=r.slice(0,m+4);else{const w=a.lastIndexOf("<a");a=r.slice(0,w)}}}return a.concat("...")}const as=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function ls(r){return r.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(as,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function cs(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const us="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var ds=Object.defineProperty,ps=Object.getOwnPropertyDescriptor,J=(r,e,t,a)=>{for(var c=a>1?void 0:a?ps(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&ds(e,t,c),c};let q=class extends St{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1}render(){return this.review?_`
          <article
            class="review"
            id=${this.generateDomId()}
            tabindex=${Ki(this.hasReviewerLink?void 0:"-1")}
          >
            ${this.canDelete?_`
                  <button
                    class="delete-btn"
                    title=${E("Delete this review")}
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${us}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:U}
            <div class="top-line">
              <b>${E("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${E("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteOutcome?_`<i>${this.deleteOutcomeMessage}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:_`
          <div class="error">
            ${E("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return U;const e=is(r),t=this.truncateContent(e,this.maxBodyLength);return _`${pi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?U:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?U:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return _`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${E("More...")}
      </button>
    `}get lessButtonTemplate(){return _`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${E("...Less")}
    </button>`}focus(r){(this.reviewerLink??this.reviewArticle)?.focus(r)}get hasReviewerLink(){return!!this.review?.reviewer_itemname}get reviewerTemplate(){return this.review?this.hasReviewerLink?_`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Kr(this.review.reviewer)}
            </a>
          `:_`${Kr(this.review.reviewer)}`:U}get starsTemplate(){return!this.review||!this.review.stars?U:_`
      <div
        class="review-stars"
        title=${E(Fe`${this.review.stars} out of 5 stars`)}
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>_`<div class="review-star">
              <img
                class="star-basic"
                src=${bn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return U;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"});return r.getTime()!==e.getTime()?E(Fe`${t} (edited)`):t}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:ss(r,e)}prepReview(r){return cs(ls(r))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(E("Are you sure you want to delete this review?")))return;if(!this.reviewService){this.deleteOutcome={status:"failed"};return}const r=await this.reviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteOutcome=r.success?{status:"queued"}:{status:"failed",error:r.error}}get deleteOutcomeMessage(){return this.deleteOutcome?.status==="queued"?E("This review has been queued for deletion."):this.deleteOutcome?.error??E("Sorry, we were unable to delete this review.")}static get styles(){return Et`
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
    `}};J([T({type:Object})],q.prototype,"review",2);J([T({type:String})],q.prototype,"identifier",2);J([T({type:Number})],q.prototype,"maxSubjectLength",2);J([T({type:Number})],q.prototype,"maxBodyLength",2);J([T({type:String})],q.prototype,"baseHost",2);J([T({type:Object})],q.prototype,"reviewService",2);J([T({type:Boolean})],q.prototype,"canDelete",2);J([T({type:Boolean})],q.prototype,"bypassTruncation",2);J([B()],q.prototype,"showTruncatedContent",2);J([B()],q.prototype,"deleteOutcome",2);J([bt(".reviewer-link")],q.prototype,"reviewerLink",2);J([bt("article.review")],q.prototype,"reviewArticle",2);q=J([Tt("ia-review"),lr()],q);const hs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",fs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var ms=Object.defineProperty,gs=Object.getOwnPropertyDescriptor,N=(r,e,t,a)=>{for(var c=a>1?void 0:a?gs(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&ms(e,t,c),c};let P=class extends St{constructor(){super(...arguments),this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.recaptchaUnavailable=!1,this.formCanSubmit=!1,this.submissionInProgress=!1}render(){return _`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableErrorMessage?this.unrecoverableErrorTemplate:_`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(r){r.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),r.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),(r.has("unrecoverableError")||r.has("recaptchaUnavailable"))&&(this.formCanSubmit=this.checkSubmissionAllowed()),(r.has("currentSubjectLength")||r.has("currentBodyLength")||r.has("maxSubjectLength")||r.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){const r=this.unrecoverableErrorMessage;return r?_`
          <div class="unrecoverable-error">
            <span class="error-msg">${r}</span>
          </div>
        `:U}get recoverableErrorTemplate(){const r=this.recoverableErrorMessage;return r?_`
          <div class="recoverable-error">
            ${pi(this.sanitizeErrorMsg(r))}
          </div>
        `:U}get unrecoverableErrorMessage(){return this.unrecoverableError?this.unrecoverableError:this.recaptchaUnavailable?this.recaptchaErrorMessage:void 0}get recoverableErrorMessage(){if(this.recoverableError)return this.recoverableError;switch(this.formError){case"recaptcha":return this.recaptchaErrorMessage;case"generic":return this.genericErrorMessage;default:return}}get recaptchaErrorMessage(){return E("Could not validate review. Please try again later.")}get genericErrorMessage(){return E("There's been a temporary error. Please wait a moment and try again.")}get recaptchaMessageTemplate(){return this.bypassRecaptcha?U:_`
      <span class="recaptcha-disclaimer"
        >${E(_`This site is protected by reCAPTCHA and the Google
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
    `}get starsInputTemplate(){return _`
      <div class="form-heading rating">
        <label for="stars-field">${E("Rating (optional)")}</label>
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
          ${E("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return _`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${E("Subject")}</label>
        ${this.maxSubjectLength?_`<div class="char-count subject">
                ${this.currentSubjectLength}/${this.maxSubjectLength}
              </div>`:U}
      </div>
      <input
        type="text"
        name="field_reviewtitle"
        id="field_reviewtitle"
        .value=${this.oldReview?.reviewtitle??""}
        @input=${this.handleSubjectChanged}
        required
    />${this.maxSubjectLength?_`
            <div class="input-error">
              ${E(Fe`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:U}</div></span>
    `}get bodyInputTemplate(){return _`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${E("Review")}</label>
          ${this.maxBodyLength?_`<div class="char-count body">
                ${this.currentBodyLength}/${this.maxBodyLength}
              </div>`:U}
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
        ${this.maxBodyLength?_`
              <div class="input-error">
                ${E(Fe`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:U}
      </span>
    `}get actionButtonsTemplate(){return _`<div class="action-btns">
      <ia-button
        mode="secondary"
        class="cancel-btn"
        data-testid="cancel-btn"
        @click=${this.cancelReviewEdit}
      >
        ${E("Cancel")}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        class="submit-btn"
        .disabled=${!this.formCanSubmit}
        .loading=${this.submissionInProgress}
      >
        ${E("Submit review")}
      </ia-button>
    </div>`}renderStar(r){const e=r===this.currentStars,t=r===1?E("Rate 1 star"):E(Fe`Rate ${r} stars`);return _`
      <button
        class="star star-${r}"
        title=${e?E("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,r)}
      >
        ${r<=this.currentStars?_`<img
              class="star-selected"
              src=${hs}
              alt=""
              aria-hidden="true"
            />`:_`<img
              class="star-unselected"
              src=${fs}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.recaptchaUnavailable=!0}}sanitizeErrorMsg(r){return mt.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",this.formError=void 0,!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.reviewService||!this.identifier)return this.formError="generic",this.stopSubmission();try{let e;if(!this.bypassRecaptcha&&(e=await this.getRecaptchaToken(),!e))return this.handleRecaptchaError();const t=await this.reviewService.submitReview({identifier:this.identifier,title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else t.error?this.recoverableError=t.error:this.formError="generic",this.stopSubmission()}catch(e){console.error(e),this.formError="generic",this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new te({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname??E("Anonymous"),reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.formError="recaptcha",this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableErrorMessage||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Et`
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
      `]}};N([T({type:String})],P.prototype,"identifier",2);N([T({type:String})],P.prototype,"submitterScreenname",2);N([T({type:String})],P.prototype,"submitterItemname",2);N([T({type:Object})],P.prototype,"oldReview",2);N([T({type:String})],P.prototype,"unrecoverableError",2);N([T({type:Number})],P.prototype,"maxSubjectLength",2);N([T({type:Number})],P.prototype,"maxBodyLength",2);N([T({type:Object})],P.prototype,"reviewService",2);N([T({type:Object})],P.prototype,"recaptchaManager",2);N([T({type:Boolean})],P.prototype,"bypassRecaptcha",2);N([B()],P.prototype,"currentStars",2);N([B()],P.prototype,"currentSubjectLength",2);N([B()],P.prototype,"currentBodyLength",2);N([B()],P.prototype,"recoverableError",2);N([B()],P.prototype,"formError",2);N([B()],P.prototype,"recaptchaUnavailable",2);N([B()],P.prototype,"formCanSubmit",2);N([B()],P.prototype,"submissionInProgress",2);N([bt("#review-form")],P.prototype,"reviewForm",2);P=N([Tt("ia-review-form"),lr()],P);var ys=Object.defineProperty,vs=Object.getOwnPropertyDescriptor,x=(r,e,t,a)=>{for(var c=a>1?void 0:a?vs(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&ys(e,t,c),c};let A=class extends St{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.maxInitialReviews=5,this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.showAllReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:_`
      <div class="reviews-list">
        ${this.reviewsFrozen?_`<div class="message">
              ${E("Reviews can no longer be added to this item.")}
            </div>`:U}
        ${this.editableCurrentReviewTemplate}
        ${this.visibleReviews.map(r=>this.renderReview(r))}
        ${this.showMoreButtonTemplate}
      </div>
    `}willUpdate(r){(!this.activeReviewService||r.has("reviewService")||r.has("baseHost"))&&(this.activeReviewService=this.reviewService??new gi({baseHost:this.baseHost})),(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0)}get visibleReviews(){return this.showAllReviews||this.displayReviewsByDefault?this.filteredReviews:this.filteredReviews.slice(0,this.maxInitialReviews)}get reviewsDisabledTemplate(){return _`<div class="message">
      ${E("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?_`
        <div class="message">
          ${E("Reviews cannot be added to this item.")}
        </div>
      `:_`
      <div class="message">
        ${E("There are no reviews yet.")}
        ${E(_`
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
    `}get showMoreButtonTemplate(){const r=this.filteredReviews.length-this.visibleReviews.length;return r<=0?U:_`
      <ia-button
        mode="link"
        class="show-more-btn"
        @click=${this.showMoreReviews}
      >
        ${r===1?E("Show 1 more review"):E(Fe`Show ${r} more reviews`)}
      </ia-button>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?U:_`<div class="own-review-container">
      ${this.displayReviewForm?_`<ia-review-form
            .identifier=${this.identifier}
            .oldReview=${this.currentReview}
            .submitterItemname=${this.submitterItemname}
            .submitterScreenname=${this.submitterScreenname}
            .maxSubjectLength=${this.maxSubjectLength}
            .maxBodyLength=${this.maxBodyLength}
            .unrecoverableError=${this.reviewSubmissionError}
            .reviewService=${this.activeReviewService}
            .recaptchaManager=${this.recaptchaActivated?this.recaptchaManager:void 0}
            ?bypassRecaptcha=${this.bypassRecaptcha}
            @reviewUpdated=${this.handleReviewUpdate}
            @reviewEditCanceled=${this.handleEditCanceled}
          ></ia-review-form>`:this.renderReview(this.currentReview)}
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{t.reviewer_itemname!==this.submitterItemname?e.push(t):r||(r=t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r){return r?_`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:U}async showMoreReviews(){const r=this.visibleReviews.length;this.showAllReviews=!0,await this.updateComplete;const e=this.listedReviews?.[r];await e?.updateComplete,e?.focus()}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1}static get styles(){return[Et`
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

        /* Keeps the click target to the text, rather than the full width of the list */
        .show-more-btn {
          align-self: flex-start;
        }

        .show-more-btn::part(button) {
          font-weight: 600;
        }
      `]}};x([T({type:String})],A.prototype,"identifier",2);x([T({type:Array})],A.prototype,"reviews",2);x([T({type:Boolean})],A.prototype,"reviewsDisabled",2);x([T({type:Boolean})],A.prototype,"reviewsFrozen",2);x([T({type:Boolean})],A.prototype,"canDelete",2);x([T({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([T({type:Number})],A.prototype,"maxInitialReviews",2);x([T({type:Number})],A.prototype,"maxSubjectLength",2);x([T({type:Number})],A.prototype,"maxBodyLength",2);x([T({type:String})],A.prototype,"baseHost",2);x([T({type:String})],A.prototype,"submitterScreenname",2);x([T({type:String})],A.prototype,"submitterItemname",2);x([T({type:Object})],A.prototype,"recaptchaManager",2);x([T({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([T({type:String})],A.prototype,"reviewSubmissionError",2);x([T({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([T({type:Object})],A.prototype,"reviewService",2);x([B()],A.prototype,"activeReviewService",2);x([B()],A.prototype,"displayReviewForm",2);x([B()],A.prototype,"showAllReviews",2);x([B()],A.prototype,"filteredReviews",2);x([B()],A.prototype,"currentReview",2);x([B()],A.prototype,"reviewsCount",2);x([B()],A.prototype,"recaptchaActivated",2);x([Zi(".reviews-list > ia-review")],A.prototype,"listedReviews",2);A=x([Tt("ia-reviews"),lr()],A);var _s=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,dr=(r,e,t,a)=>{for(var c=a>1?void 0:a?ws(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&_s(e,t,c),c};const bs=[new te({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new te({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new te({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"}),new te({stars:4,reviewtitle:"Solid transfer",reviewbody:"Clean audio, good notes. Would listen again.",reviewer:"Dee Okafor",reviewer_itemname:"@dee-okafor",reviewdate:"2026-05-30",createdate:"2026-05-30"}),new te({stars:5,reviewtitle:"A favourite",reviewbody:"I come back to this one every year.",reviewer:"Eli Marsh",reviewer_itemname:"@eli-marsh",reviewdate:"2026-04-11",createdate:"2026-04-11"}),new te({stars:2,reviewtitle:"Not for me",reviewbody:"Well made, but the style never clicked for me.",reviewer:"Fen Albright",reviewer_itemname:"@fen-albright",reviewdate:"2026-03-08",createdate:"2026-03-08"}),new te({stars:4,reviewtitle:"Worth it for the second half",reviewbody:"Slow start, but it earns the ending.",reviewer:"Gus Tanaka",reviewer_itemname:"@gus-tanaka",reviewdate:"2026-02-19",createdate:"2026-02-19"})],Ts=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],Ss=[{label:'Max reviews before "Show more"',propertyName:"maxInitialReviews",defaultValue:5,inputType:"number"},{label:"Show every review, untruncated",propertyName:"displayReviewsByDefault",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Es={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},Rs=new gi({fetchHandler:Es}),As=6;let wt=class extends St{constructor(){super(...arguments),this.log=[]}render(){return _`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:Ts}}
        .propInputData=${{settings:Ss}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${bs}
          .reviewService=${Rs}
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
          ${this.log.length===0?_`<p class="empty">
                Submit the review form to see events here.
              </p>`:_`<ol class="log">
                ${this.log.map(r=>_`<li><code>${r}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            The reviews list for an item, plus the form for writing one. Pass
            the existing reviews in as <code>reviews</code> and the item's
            <code>identifier</code>. Writes and deletes go through the
            <code>reviewService</code> it's handed, a <code>ReviewService</code>
            built on a fetch handler that supplies the CSRF token.
          </p>
          <p>
            <code>bypassRecaptcha</code> is set here so the form can be
            submitted without a reCAPTCHA key, and the demo's service sits on a
            stub fetch handler so nothing posts to archive.org. In real use,
            hand it a <code>recaptchaManager</code> and a service built on the
            real handler.
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
            Only the newest <code>maxInitialReviews</code> (5 by default) show
            at first, with a "Show more" button for the rest. The patron's own
            review sits above the list and doesn't count toward that.
            <code>displayReviewsByDefault</code> shows every review with no
            truncation.
          </p>
          <p>
            <code>reviewsDisabled</code> hides the whole section, while
            <code>reviewsFrozen</code> keeps existing reviews visible but stops
            new ones. <code>canDelete</code> is what puts the delete control on
            a review the current user wrote.
          </p>
        </div>
      </story-template>
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,As)}static get styles(){return Et`
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
    `}};dr([B()],wt.prototype,"log",2);dr([bt("ia-reviews")],wt.prototype,"reviews",2);wt=dr([Tt("ia-reviews-story")],wt);export{wt as IAReviewsStory};
