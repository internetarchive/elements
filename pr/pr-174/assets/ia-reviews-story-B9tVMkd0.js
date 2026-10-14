import{b as v,r as V,n as w,c as wt,i as bt,m as R,A as F,o as ci,a as Tt,e as ui}from"./index-C9Oqst3q.js";import{M as n}from"./memoize-decorator-Bcs06flF.js";import"./ia-button-BG-A0yVl.js";import"./story-template-C5JkfIz7.js";import"./theme-styles-DvOmV7Vm.js";import"./ia-status-indicator-DtFmjySh.js";import"./localized-decorator-DZKawzEp.js";import"./icon-box-DfpRdNsI.js";import"./mediatype-web-BaP5KtrQ.js";import"./syntax-highlighter-DYcBjL_c.js";function s(i,e,t,a){var c=arguments.length,d=c<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")d=Reflect.decorate(i,e,t,a);else for(var y=i.length-1;y>=0;y--)(m=i[y])&&(d=(c<3?m(d):c>3?m(e,t,d):m(e,t))||d);return c>3&&d&&Object.defineProperty(e,t,d),d}class mt{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}mt.shared=new mt;class te{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}te.shared=new te;class gt{parseValue(e){return te.shared.parseValue(e)}}gt.shared=new gt;class Ue{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,d,m="00",y="00",b="00"]=t,B=new Date(`${a}-${c}-${d}T${m}:${y}:${b}`);return Number.isNaN(B.getTime())?void 0:B}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}Ue.shared=new Ue;class yt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,d)=>{const m=parseFloat(c);if(Number.isNaN(m))return t=!0,0;const b=60**(e.length-1-d);return m*Math.floor(b)}).reduce((c,d)=>c+d,0);return t?void 0:a}}yt.shared=new yt;class di{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),c=[];return a.forEach(d=>{d!==void 0&&c.push(d)}),c}}class _t{parseValue(e){return String(e)}}_t.shared=new _t;function Me(i,e,...t){for(const a of t){const c=i[a];if(c!=null)return e(c)}}function ae(i,e,...t){return Me(i,a=>e(a),...t)}class ce{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=te.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ae(this.rawValue,e=>gt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ae(this.rawValue,e=>yt.shared.parseValue(e),"length")}get height(){return ae(this.rawValue,e=>te.shared.parseValue(e),"height")}get width(){return ae(this.rawValue,e=>te.shared.parseValue(e),"width")}get track(){return ae(this.rawValue,e=>te.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ae(this.rawValue,e=>te.shared.parseValue(e),"bitrate")}get private(){return ae(this.rawValue,e=>mt.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}s([n()],ce.prototype,"mtime",null);s([n()],ce.prototype,"size",null);s([n()],ce.prototype,"length",null);s([n()],ce.prototype,"height",null);s([n()],ce.prototype,"width",null);s([n()],ce.prototype,"track",null);s([n()],ce.prototype,"bitrate",null);s([n()],ce.prototype,"private",null);class G{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}s([n()],G.prototype,"values",null);s([n()],G.prototype,"value",null);class oe extends G{constructor(e){super(mt.shared,e)}}class k extends G{constructor(e){super(Ue.shared,e)}}class Ht extends G{constructor(e){super(yt.shared,e)}}class _ extends G{constructor(e){super(te.shared,e)}}class u extends G{constructor(e){super(_t.shared,e)}}class ze{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends G{constructor(e,t){super(t,e)}}const Yi=new ze(["rl","lr"]);class qi extends $e{constructor(e){super(e,Yi)}}class dt extends G{constructor(e){super(gt.shared,e)}}const Xi=new ze(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class Ki extends $e{constructor(e){super(e,Xi)}}class pi extends G{constructor(e,t){super(t,e)}}class jr extends pi{constructor(e){const t=new di(_t.shared);super(e,t)}}class jt extends pi{constructor(e){const t=new di(te.shared);super(e,t)}}const Zi=/^([0-9a-f]{32})\s+\*?(.+)$/i,Ji=/^(.+):([0-9a-f]{32})$/i;function Qi(i){const e=i.match(Zi);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=i.match(Ji);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Kt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(Qi).filter(a=>a!==void 0);return t.length?t:void 0}}Kt.shared=new Kt;class Vr extends G{constructor(e){super(Kt.shared,e)}}function pt(i,e){var t;const a=i.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class Zt{parseValue(e){if(typeof e!="string")return;const t=pt(e,"curator"),a=pt(e,"date"),c=pt(e,"comment"),d=pt(e,"state");if(!(!t&&!a&&!c&&!d))return{curator:t,date:a?Ue.shared.parseValue(a):void 0,comment:c,state:d}}}Zt.shared=new Zt;class en extends G{constructor(e){super(Zt.shared,e)}}class Jt{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}Jt.shared=new Jt;class tn extends G{constructor(e){super(Jt.shared,e)}}class Qt{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),d=parseInt(t[3],10);return{hours:a*c,minutes:d,totalMinutes:a*(c*60+d)}}}Qt.shared=new Qt;class rn extends G{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}er.shared=new er;class nn extends G{constructor(e){super(er.shared,e)}}const sn=new ze(["true","none","frozen"]),on=new ze(["sound","silent"]),an=new ze(["color","b&w"]),ln=new ze(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(_,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(_,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(_,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(_,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,ln),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(en,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(k,"date-case-filed")}get date_case_terminated(){return this.field(k,"date-case-terminated")}get date_created(){return this.field(k,"date_created")}get date_last_filing(){return this.field(k,"date-last-filing")}get derive_submittime(){return this.field(k,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(_,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(k,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(k,"filesxml")}get firstfiledate(){return this.field(k,"firstfiledate")}get firstfileserial(){return this.field(_,"firstfileserial")}get foldoutcount(){return this.field(_,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(oe,"has_mp3")}get height(){return this.field(_,"height")}get hidden(){return this.field(oe,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(oe,"access-restricted-item")}get addeddate(){return this.field(k,"addeddate")}get aspect_ratio(){return this.field(tn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(_,"audio_sample_rate")}get avg_rating(){return this.field(_,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(oe,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(dt,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,an),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(k,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(_,"downloads")}get duration(){return this.field(Ht,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(_,"files_count")}get frames_per_second(){return this.field(_,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(_,"image_count")}get imagecount(){return this.field(_,"imagecount")}get indexdate(){return this.field(k,"indexdate")}get invoice(){return this.field(_,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(_,"issue_count")}get issue_page_count(){return this.field(_,"issue_page_count")}get item_count(){return this.field(_,"item_count")}get item_size(){return this.field(dt,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(k,"lastdate")}get lastfiledate(){return this.field(k,"lastfiledate")}get lastfileserial(){return this.field(_,"lastfileserial")}get length(){return this.field(Ht,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(oe,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Vr,"md5contents")}get md5s(){return this.field(Vr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(oe,"monochromatic")}get month(){return this.field(_,"month")}get mediatype(){return this.field(Ki,"mediatype")}get mpeg_program(){return this.field(_,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(oe,"noarchivetorrent")}get noindex(){return this.field(oe,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(_,"num_favorites")}get num_reviews(){return this.field(_,"num_reviews")}get numeric_id(){return this.field(_,"numeric_id")}get numwarcs(){return this.field(_,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(oe,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(_,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(_,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(_,"output_time_minutes")}get pacer_case_num(){return this.field(_,"pacer-case-num")}get packaging_time_minutes(){return this.field(_,"packaging_time_minutes")}get page_number_confidence(){return this.field(_,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(qi,"page-progression","page_progression")}get paginated(){return this.field(oe,"paginated")}get parse_date(){return this.field(k,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(_,"pick")}get podcastindexid(){return this.field(_,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(_,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(k,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(_,"rcs_key")}get repub_state(){return this.field(_,"repub_state")}get republisher_date(){return this.field(k,"republisher_date")}get republisher_operator(){return this.field(jr,"republisher_operator")}get republisher_time(){return this.field(_,"republisher_time")}get reviewdate(){return this.field(k,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,sn),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(k,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(Ht,"runtime")}get scan_time_minutes(){return this.field(_,"scan_time_minutes")}get scandate(){return this.field(k,"scandate")}get scanfee(){return this.field(jt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(_,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(dt,"size")}get sizehint(){return this.field(dt,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,on),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(_,"source_pixel_height")}get source_pixel_width(){return this.field(_,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(k,"sponsordate")}get start_localtime(){return this.field(k,"start_localtime")}get start_time(){return this.field(k,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(k,"stop_time")}get subject(){return this.field(jr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(jt,"thumbs")}get times(){return this.field(jt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(_,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(nn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(k,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(rn,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(_,"week")}get width(){return this.field(_,"width")}get year(){return this.field(_,"year")}field(e,...t){return Me(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}s([n()],o.prototype,"access",null);s([n()],o.prototype,"adder",null);s([n()],o.prototype,"amrc_id",null);s([n()],o.prototype,"archiveit_account_id",null);s([n()],o.prototype,"archiveit_account_organization_name",null);s([n()],o.prototype,"archiveit_collection_id",null);s([n()],o.prototype,"archiveit_collection_name",null);s([n()],o.prototype,"archiveit_job_type",null);s([n()],o.prototype,"audit_time_minutes",null);s([n()],o.prototype,"auditor",null);s([n()],o.prototype,"author",null);s([n()],o.prototype,"autocrop_version",null);s([n()],o.prototype,"bookplateleaf",null);s([n()],o.prototype,"bookreader_defaults",null);s([n()],o.prototype,"boxid",null);s([n()],o.prototype,"camera",null);s([n()],o.prototype,"cameraman",null);s([n()],o.prototype,"canister",null);s([n()],o.prototype,"case_name",null);s([n()],o.prototype,"col_number",null);s([n()],o.prototype,"collection_added",null);s([n()],o.prototype,"collection_library",null);s([n()],o.prototype,"collection_set",null);s([n()],o.prototype,"copyright_holder",null);s([n()],o.prototype,"court",null);s([n()],o.prototype,"crawler",null);s([n()],o.prototype,"crawljob",null);s([n()],o.prototype,"curation",null);s([n()],o.prototype,"dari_title",null);s([n()],o.prototype,"dari_title_romanized",null);s([n()],o.prototype,"date_case_filed",null);s([n()],o.prototype,"date_case_terminated",null);s([n()],o.prototype,"date_created",null);s([n()],o.prototype,"date_last_filing",null);s([n()],o.prototype,"derive_submittime",null);s([n()],o.prototype,"derive_version",null);s([n()],o.prototype,"discs",null);s([n()],o.prototype,"docket_num",null);s([n()],o.prototype,"external_metadata_update",null);s([n()],o.prototype,"fail_reasons",null);s([n()],o.prototype,"filesxml",null);s([n()],o.prototype,"firstfiledate",null);s([n()],o.prototype,"firstfileserial",null);s([n()],o.prototype,"foldoutcount",null);s([n()],o.prototype,"format",null);s([n()],o.prototype,"geo_restricted",null);s([n()],o.prototype,"guid",null);s([n()],o.prototype,"has_mp3",null);s([n()],o.prototype,"height",null);s([n()],o.prototype,"hidden",null);s([n()],o.prototype,"ia_orig__runtime",null);s([n()],o.prototype,"access_restricted_item",null);s([n()],o.prototype,"addeddate",null);s([n()],o.prototype,"aspect_ratio",null);s([n()],o.prototype,"audio_codec",null);s([n()],o.prototype,"audio_sample_rate",null);s([n()],o.prototype,"avg_rating",null);s([n()],o.prototype,"backup_location",null);s([n()],o.prototype,"ccnum",null);s([n()],o.prototype,"closed_captioning",null);s([n()],o.prototype,"collection",null);s([n()],o.prototype,"collections_raw",null);s([n()],o.prototype,"collection_size",null);s([n()],o.prototype,"color",null);s([n()],o.prototype,"contact",null);s([n()],o.prototype,"contributor",null);s([n()],o.prototype,"coverage",null);s([n()],o.prototype,"creator",null);s([n()],o.prototype,"creator_alt_script",null);s([n()],o.prototype,"credits",null);s([n()],o.prototype,"collection_layout",null);s([n()],o.prototype,"date",null);s([n()],o.prototype,"description",null);s([n()],o.prototype,"downloads",null);s([n()],o.prototype,"duration",null);s([n()],o.prototype,"external_identifier",null);s([n()],o.prototype,"external_link",null);s([n()],o.prototype,"files_count",null);s([n()],o.prototype,"frames_per_second",null);s([n()],o.prototype,"identifier_access",null);s([n()],o.prototype,"identifier_ark",null);s([n()],o.prototype,"identifier_bib",null);s([n()],o.prototype,"image_count",null);s([n()],o.prototype,"imagecount",null);s([n()],o.prototype,"indexdate",null);s([n()],o.prototype,"invoice",null);s([n()],o.prototype,"isbn",null);s([n()],o.prototype,"issue",null);s([n()],o.prototype,"issue_count",null);s([n()],o.prototype,"issue_page_count",null);s([n()],o.prototype,"item_count",null);s([n()],o.prototype,"item_size",null);s([n()],o.prototype,"language",null);s([n()],o.prototype,"lastdate",null);s([n()],o.prototype,"lastfiledate",null);s([n()],o.prototype,"lastfileserial",null);s([n()],o.prototype,"length",null);s([n()],o.prototype,"license",null);s([n()],o.prototype,"licenseurl",null);s([n()],o.prototype,"lineage",null);s([n()],o.prototype,"mature_content",null);s([n()],o.prototype,"md5",null);s([n()],o.prototype,"md5contents",null);s([n()],o.prototype,"md5s",null);s([n()],o.prototype,"medium",null);s([n()],o.prototype,"metadata_operator",null);s([n()],o.prototype,"metasource_catalog",null);s([n()],o.prototype,"monochromatic",null);s([n()],o.prototype,"month",null);s([n()],o.prototype,"mediatype",null);s([n()],o.prototype,"mpeg_program",null);s([n()],o.prototype,"next_item",null);s([n()],o.prototype,"noarchivetorrent",null);s([n()],o.prototype,"noindex",null);s([n()],o.prototype,"notes",null);s([n()],o.prototype,"num_favorites",null);s([n()],o.prototype,"num_reviews",null);s([n()],o.prototype,"numeric_id",null);s([n()],o.prototype,"numwarcs",null);s([n()],o.prototype,"ocr",null);s([n()],o.prototype,"ocr_autonomous",null);s([n()],o.prototype,"ocr_detected_lang",null);s([n()],o.prototype,"ocr_detected_lang_conf",null);s([n()],o.prototype,"ocr_detected_script",null);s([n()],o.prototype,"ocr_detected_script_conf",null);s([n()],o.prototype,"ocr_invalid_language",null);s([n()],o.prototype,"ocr_module_version",null);s([n()],o.prototype,"ocr_parameters",null);s([n()],o.prototype,"old_pallet",null);s([n()],o.prototype,"openlibrary_edition",null);s([n()],o.prototype,"openlibrary_work",null);s([n()],o.prototype,"operator",null);s([n()],o.prototype,"originalurl",null);s([n()],o.prototype,"osf_category",null);s([n()],o.prototype,"osf_project",null);s([n()],o.prototype,"osf_registration_doi",null);s([n()],o.prototype,"osf_registration_schema",null);s([n()],o.prototype,"osf_registry",null);s([n()],o.prototype,"osf_subjects",null);s([n()],o.prototype,"osf_tags",null);s([n()],o.prototype,"output_time_minutes",null);s([n()],o.prototype,"pacer_case_num",null);s([n()],o.prototype,"packaging_time_minutes",null);s([n()],o.prototype,"page_number_confidence",null);s([n()],o.prototype,"page_number_module_version",null);s([n()],o.prototype,"page_progression",null);s([n()],o.prototype,"paginated",null);s([n()],o.prototype,"parse_date",null);s([n()],o.prototype,"parse_state",null);s([n()],o.prototype,"partner",null);s([n()],o.prototype,"pashto_title",null);s([n()],o.prototype,"pashto_title_romanized",null);s([n()],o.prototype,"pdf_degraded",null);s([n()],o.prototype,"pdf_module_version",null);s([n()],o.prototype,"pick",null);s([n()],o.prototype,"podcastindexid",null);s([n()],o.prototype,"post_text",null);s([n()],o.prototype,"ppi",null);s([n()],o.prototype,"previous_item",null);s([n()],o.prototype,"program",null);s([n()],o.prototype,"publicdate",null);s([n()],o.prototype,"publisher",null);s([n()],o.prototype,"political_religious_party",null);s([n()],o.prototype,"rcs_key",null);s([n()],o.prototype,"repub_state",null);s([n()],o.prototype,"republisher_date",null);s([n()],o.prototype,"republisher_operator",null);s([n()],o.prototype,"republisher_time",null);s([n()],o.prototype,"reviewdate",null);s([n()],o.prototype,"reviews_allowed",null);s([n()],o.prototype,"ribbon_state",null);s([n()],o.prototype,"ribbon_state_modify_date",null);s([n()],o.prototype,"rights",null);s([n()],o.prototype,"rights_holder",null);s([n()],o.prototype,"rssfeed",null);s([n()],o.prototype,"runtime",null);s([n()],o.prototype,"scan_time_minutes",null);s([n()],o.prototype,"scandate",null);s([n()],o.prototype,"scanfee",null);s([n()],o.prototype,"scanner",null);s([n()],o.prototype,"scanner_operator",null);s([n()],o.prototype,"scanningcenter",null);s([n()],o.prototype,"scribe3_search_catalog",null);s([n()],o.prototype,"scribe3_search_id",null);s([n()],o.prototype,"segments",null);s([n()],o.prototype,"sessionid",null);s([n()],o.prototype,"shndiscs",null);s([n()],o.prototype,"shotlist",null);s([n()],o.prototype,"signal_path",null);s([n()],o.prototype,"size",null);s([n()],o.prototype,"sizehint",null);s([n()],o.prototype,"software_version",null);s([n()],o.prototype,"sort_order",null);s([n()],o.prototype,"sound",null);s([n()],o.prototype,"soundcreator",null);s([n()],o.prototype,"soundtitle",null);s([n()],o.prototype,"source",null);s([n()],o.prototype,"source_pixel_height",null);s([n()],o.prototype,"source_pixel_width",null);s([n()],o.prototype,"source_url",null);s([n()],o.prototype,"sponsor",null);s([n()],o.prototype,"sponsordate",null);s([n()],o.prototype,"start_localtime",null);s([n()],o.prototype,"start_time",null);s([n()],o.prototype,"station_name",null);s([n()],o.prototype,"stop_time",null);s([n()],o.prototype,"subject",null);s([n()],o.prototype,"taper",null);s([n()],o.prototype,"thumbs",null);s([n()],o.prototype,"times",null);s([n()],o.prototype,"title",null);s([n()],o.prototype,"title_alt_script",null);s([n()],o.prototype,"transferer",null);s([n()],o.prototype,"track",null);s([n()],o.prototype,"tts_version",null);s([n()],o.prototype,"tuner",null);s([n()],o.prototype,"type",null);s([n()],o.prototype,"updatedate",null);s([n()],o.prototype,"updater",null);s([n()],o.prototype,"uploader",null);s([n()],o.prototype,"uploadsoftware",null);s([n()],o.prototype,"utc_offset",null);s([n()],o.prototype,"venue",null);s([n()],o.prototype,"video_codec",null);s([n()],o.prototype,"volume",null);s([n()],o.prototype,"website",null);s([n()],o.prototype,"week",null);s([n()],o.prototype,"width",null);s([n()],o.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ae(this.rawValue,e=>Ue.shared.parseValue(e),"reviewdate")}get createdate(){return ae(this.rawValue,e=>Ue.shared.parseValue(e),"createdate")}get stars(){return ae(this.rawValue,e=>te.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}s([n()],me.prototype,"reviewdate",null);s([n()],me.prototype,"createdate",null);s([n()],me.prototype,"stars",null);class cn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ce(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new me(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(i){i.networkError="MetadataService.NetworkError",i.itemNotFound="MetadataService.ItemNotFound",i.decodingError="MetadataService.DecodingError",i.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class tr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class un{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let d;try{const m=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(c.href,m)}catch(m){const y=m instanceof Error?m.message:typeof m=="string"?m:"Unknown error";return this.getErrorResult(Te.networkError,y)}try{const m=await d.json(),y=m.error;if(y){const b=m.forensics;return this.getErrorResult(Te.searchEngineError,y,b)}else return{success:m}}catch(m){const y=m instanceof Error?m.message:typeof m=="string"?m:"Unknown error";return this.getErrorResult(Te.decodingError,y)}}getErrorResult(e,t,a){return{error:new tr(e,t,a)}}}class Gr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new tr(Te.itemNotFound)}:{success:new cn(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new tr(Te.itemNotFound)}:{success:c.success.result}}}Gr.default=new Gr(new un);function Wr(i){return new Promise(e=>setTimeout(e,i))}class rr{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}rr.shared=new rr;class ir{shouldRetry(){return!1}retryDelay(){return null}}ir.shared=new ir;class or{}or.default=rr.shared;or.noRetry=ir.shared;const hi=i=>{if(i)return"requestInit"in i||"retryConfig"in i||"includeCsrfToken"in i?i:{requestInit:i}};class dn{constructor(e){this.retryConfig=or.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=hi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,d;const m=typeof e=="string"?e:e.url;try{const y=await fetch(e,a?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const b=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(b.shouldRetry(y,t)){const $=b.retryDelay(t,y);if($!==null)return await Wr($),this.logRetryEvent(m,t,y.statusText,y.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(m,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(m,y),y;const b=(d=a?.retryConfig)!==null&&d!==void 0?d:this.retryConfig;if(b.shouldRetry(null,t)){const $=b.retryDelay(t);if($!==null)return await Wr($),this.logRetryEvent(m,t,y,y),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(m,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var d;(d=this.analyticsHandler)===null||d===void 0||d.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const pn=new Set(["POST","PUT","DELETE","PATCH"]);class ar{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new dn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const m=typeof e=="string"?e:e.url;a=this.addSearchParams(m,{reCache:"1"})}const d=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,d)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((b,B)=>{c.set(B,b)}),a.headers=c;const d=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(d,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,d,m;if(!this.getCsrfToken)return t;const y=(a=hi(t))!==null&&a!==void 0?a:{};if(!y.includeCsrfToken)return t;const b=(c=y.requestInit)!==null&&c!==void 0?c:{},B=((m=(d=b.method)!==null&&d!==void 0?d:typeof e!="string"?e.method:void 0)!==null&&m!==void 0?m:"GET").toUpperCase();if(!pn.has(B))return t;const $=new Headers(b.headers);return $.has("X-CSRF-Token")?t:($.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{...b,headers:$}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),d=a===-1?e:e.slice(0,a),m=d.indexOf("?"),y=m===-1?d:d.slice(0,m),b=new URLSearchParams(m===-1?"":d.slice(m+1)),B=ar.asSearchParams(t),$=new Set;B.forEach((Ke,le)=>{$.has(le)||($.add(le),b.delete(le))}),B.forEach((Ke,le)=>{b.append(le,Ke)});const ee=b.toString();return`${y}${ee?`?${ee}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class hn extends ar{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const fn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Yr(i=""){if(i.length<=40)return i;const t=i.substring(0,40)+"...";return v`<span title="${i}">${t}</span>`}function qr(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,a=Array(e);t<e;t++)a[t]=i[t];return a}function mn(i){if(Array.isArray(i))return i}function gn(i,e){var t=i==null?null:typeof Symbol<"u"&&i[Symbol.iterator]||i["@@iterator"];if(t!=null){var a,c,d,m,y=[],b=!0,B=!1;try{if(d=(t=t.call(i)).next,e!==0)for(;!(b=(a=d.call(t)).done)&&(y.push(a.value),y.length!==e);b=!0);}catch($){B=!0,c=$}finally{try{if(!b&&t.return!=null&&(m=t.return(),Object(m)!==m))return}finally{if(B)throw c}}return y}}function yn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function _n(i,e){return mn(i)||gn(i,e)||vn(i,e)||yn()}function vn(i,e){if(i){if(typeof i=="string")return qr(i,e);var t={}.toString.call(i).slice(8,-1);return t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set"?Array.from(i):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?qr(i,e):void 0}}const fi=Object.entries,Xr=Object.setPrototypeOf,wn=Object.isFrozen,bn=Object.getPrototypeOf,Tn=Object.getOwnPropertyDescriptor;let U=Object.freeze,z=Object.seal,Ne=Object.create,mi=typeof Reflect<"u"&&Reflect,nr=mi.apply,sr=mi.construct;U||(U=function(e){return e});z||(z=function(e){return e});nr||(nr=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),d=2;d<a;d++)c[d-2]=arguments[d];return e.apply(t,c)});sr||(sr=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const be=N(Array.prototype.forEach),En=N(Array.prototype.lastIndexOf),Kr=N(Array.prototype.pop),We=N(Array.prototype.push),Sn=N(Array.prototype.splice),Fe=Array.isArray,Xe=N(String.prototype.toLowerCase),Vt=N(String.prototype.toString),Zr=N(String.prototype.match),Ye=N(String.prototype.replace),Jr=N(String.prototype.indexOf),Rn=N(String.prototype.trim),An=N(Number.prototype.toString),xn=N(Boolean.prototype.toString),Qr=typeof BigInt>"u"?null:N(BigInt.prototype.toString),ei=typeof Symbol>"u"?null:N(Symbol.prototype.toString),Y=N(Object.prototype.hasOwnProperty),qe=N(Object.prototype.toString),H=N(RegExp.prototype.test),he=Cn(TypeError);function N(i){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return nr(i,e,a)}}function Cn(i){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return sr(i,t)}}function S(i,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(Xr&&Xr(i,null),!Fe(e))return i;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const d=t(c);d!==c&&(wn(e)||(e[a]=d),c=d)}i[c]=!0}return i}function Ln(i){for(let e=0;e<i.length;e++)Y(i,e)||(i[e]=null);return i}function K(i){const e=Ne(null);for(const a of fi(i)){var t=_n(a,2);const c=t[0],d=t[1];Y(i,c)&&(Fe(d)?e[c]=Ln(d):d&&typeof d=="object"&&d.constructor===Object?e[c]=K(d):e[c]=d)}return e}function Dn(i){switch(typeof i){case"string":return i;case"number":return An(i);case"boolean":return xn(i);case"bigint":return Qr?Qr(i):"0";case"symbol":return ei?ei(i):"Symbol()";case"undefined":return qe(i);case"function":case"object":{if(i===null)return qe(i);const e=i,t=J(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:qe(a)}return qe(i)}default:return qe(i)}}function J(i,e){for(;i!==null;){const a=Tn(i,e);if(a){if(a.get)return N(a.get);if(typeof a.value=="function")return N(a.value)}i=bn(i)}function t(){return null}return t}function kn(i){try{return H(i,""),!0}catch{return!1}}const ti=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Wt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),On=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Yt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),In=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ri=U(["#text"]),ii=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),qt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ni=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ht=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Pn=z(/{{[\w\W]*|^[\w\W]*}}/g),Mn=z(/<%[\w\W]*|^[\w\W]*%>/g),Nn=z(/\${[\w\W]*/g),$n=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Fn=z(/^aria-[\-\w]+$/),si=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Un=z(/^(?:\w+script|data):/i),zn=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bn=z(/^html$/i),Hn=z(/^[a-z][.\w]*(-[.\w]+)+$/i),oi=z(/<[/\w!]/g),ai=z(/<[/\w]/g),jn=z(/<\/no(script|embed|frames)/i),Vn=z(/\/>/i),X={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},gi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Gn=U(S({},gi)),Wn=(function(){const i={};return be(gi,e=>{i[e]=z(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(i)})(),Yn=function(){return typeof window>"u"?null:window},qn=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const d="dompurify"+(a?"#"+a:"");try{return e.createPolicy(d,{createHTML(m){return m},createScriptURL(m){return m}})}catch{return console.warn("TrustedTypes policy "+d+" could not be created."),null}},li=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,a,c){return Y(e,t)&&Fe(e[t])?S(c.base?K(c.base):{},e[t],c.transform):a},Xt=function(e,t,a){const c=Y(e,t)?e[t]:void 0;return c&&typeof c=="object"?K(c):a()};function yi(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yn();const e=h=>yi(h);if(e.version="3.4.16",e.removed=[],!i||!i.document||i.document.nodeType!==X.document||!i.Element)return e.isSupported=!1,e;let t=i.document;const a=t,c=a.currentScript;i.DocumentFragment;const d=i.HTMLTemplateElement,m=i.Node,y=i.Element,b=i.NodeFilter;i.NamedNodeMap===void 0&&(i.NamedNodeMap||i.MozNamedAttrMap),i.HTMLFormElement;const B=i.DOMParser,$=i.trustedTypes,ee=y.prototype,Ke=J(ee,"cloneNode"),le=J(ee,"remove"),cr=J(ee,"removeAttributeNode"),_i=J(ee,"nextSibling"),Ee=J(ee,"childNodes"),Se=J(ee,"parentNode"),ur=J(ee,"shadowRoot"),Et=J(ee,"attributes"),ge=m&&m.prototype?J(m.prototype,"nodeType"):null,Re=m&&m.prototype?J(m.prototype,"nodeName"):null,Ze=m&&m.prototype?J(m.prototype,"ownerDocument"):null,Be=function(r){return ge?ge(r):r.nodeType},St=function(r){return Re?Re(r):r.nodeName};if(typeof d=="function"){const h=t.createElement("template");h.content&&h.content.ownerDocument&&(t=h.content.ownerDocument)}let W,ye="",Rt,dr=!1,He=0;const pr=function(){if(He>0)throw he('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(r){pr(),He++;try{return W.createHTML(r)}finally{He--}},vi=function(r){pr(),He++;try{return W.createScriptURL(r)}finally{He--}},wi=function(){return dr||(Rt=qn($,c),dr=!0),Rt},Je=t,At=Je.implementation,hr=Je.createNodeIterator,bi=Je.createDocumentFragment,Ti=Je.getElementsByTagName,Ei=a.importNode;let C=li();e.isSupported=typeof fi=="function"&&typeof Se=="function"&&At&&At.createHTMLDocument!==void 0;const Si=Pn,Ri=Mn,Ai=Nn,xi=$n,Ci=Fn,Li=Un,fr=zn,Di=Hn;let mr=si,L=null;const xt=S({},[...ti,...Gt,...Wt,...Yt,...ri]);let D=null;const Ct=S({},[...ii,...qt,...ni,...ht]);let ie=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,gr=null;const ue=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let yr=!0,Lt=!0,_r=!1,vr=!0,de=!1,_e=!0,ve=!1,Dt=!1,Qe=null,et=null,kt=!1,xe=!1,tt=!1,rt=!1,wr=!0,br=!1;const Tr="user-content-";let Ot=!0,It=!1,Ce={},Le=null;const Er=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Sr=null;const Rr=S({},["audio","video","img","source","image","track"]);let Ar=null;const xr=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),it="http://www.w3.org/1998/Math/MathML",nt="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";let De=ne,Pt=!1,Mt=null;const ki=S({},[it,nt,ne],Vt),Cr=U(["mi","mo","mn","ms","mtext"]);let Nt=S({},Cr);const Lr=U(["annotation-xml"]);let $t=S({},Lr);const Oi=S({},["title","style","font","a","script"]);let Ve=null;const Ii=["application/xhtml+xml","text/html"],Pi="text/html";let P=null,ke=null;const Mi=t.createElement("form"),Dr=function(r){return r instanceof RegExp||r instanceof Function},Ft=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ke&&ke===r)return;(!r||typeof r!="object")&&(r={}),r=K(r),Ve=Ii.indexOf(r.PARSER_MEDIA_TYPE)===-1?Pi:r.PARSER_MEDIA_TYPE,P=Ve==="application/xhtml+xml"?Vt:Xe,L=fe(r,"ALLOWED_TAGS",xt,{transform:P}),D=fe(r,"ALLOWED_ATTR",Ct,{transform:P}),Mt=fe(r,"ALLOWED_NAMESPACES",ki,{transform:Vt}),Ar=fe(r,"ADD_URI_SAFE_ATTR",xr,{transform:P,base:xr}),Sr=fe(r,"ADD_DATA_URI_TAGS",Rr,{transform:P,base:Rr}),Le=fe(r,"FORBID_CONTENTS",Er,{transform:P}),je=fe(r,"FORBID_TAGS",K({}),{transform:P}),gr=fe(r,"FORBID_ATTR",K({}),{transform:P}),Ce=Y(r,"USE_PROFILES")?r.USE_PROFILES&&typeof r.USE_PROFILES=="object"?K(r.USE_PROFILES):r.USE_PROFILES:!1,yr=r.ALLOW_ARIA_ATTR!==!1,Lt=r.ALLOW_DATA_ATTR!==!1,_r=r.ALLOW_UNKNOWN_PROTOCOLS||!1,vr=r.ALLOW_SELF_CLOSE_IN_ATTR!==!1,de=r.SAFE_FOR_TEMPLATES||!1,_e=r.SAFE_FOR_XML!==!1,ve=r.WHOLE_DOCUMENT||!1,xe=r.RETURN_DOM||!1,tt=r.RETURN_DOM_FRAGMENT||!1,rt=r.RETURN_TRUSTED_TYPE||!1,kt=r.FORCE_BODY||!1,wr=r.SANITIZE_DOM!==!1,br=r.SANITIZE_NAMED_PROPS||!1,Ot=r.KEEP_CONTENT!==!1,It=r.IN_PLACE||!1,mr=kn(r.ALLOWED_URI_REGEXP)?r.ALLOWED_URI_REGEXP:si,De=typeof r.NAMESPACE=="string"?r.NAMESPACE:ne,Nt=Xt(r,"MATHML_TEXT_INTEGRATION_POINTS",()=>S({},Cr)),$t=Xt(r,"HTML_INTEGRATION_POINTS",()=>S({},Lr));const l=Xt(r,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(ie=Ne(null),Y(l,"tagNameCheck")&&Dr(l.tagNameCheck)&&(ie.tagNameCheck=l.tagNameCheck),Y(l,"attributeNameCheck")&&Dr(l.attributeNameCheck)&&(ie.attributeNameCheck=l.attributeNameCheck),Y(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),z(ie),de&&(Lt=!1),tt&&(xe=!0),Ce&&(L=S({},ri),D=Ne(null),Ce.html===!0&&(S(L,ti),S(D,ii)),Ce.svg===!0&&(S(L,Gt),S(D,qt),S(D,ht)),Ce.svgFilters===!0&&(S(L,Wt),S(D,qt),S(D,ht)),Ce.mathMl===!0&&(S(L,Yt),S(D,ni),S(D,ht))),ue.tagCheck=null,ue.attributeCheck=null,Y(r,"ADD_TAGS")&&(typeof r.ADD_TAGS=="function"?ue.tagCheck=r.ADD_TAGS:Fe(r.ADD_TAGS)&&(L===xt&&(L=K(L)),S(L,r.ADD_TAGS,P))),Y(r,"ADD_ATTR")&&(typeof r.ADD_ATTR=="function"?ue.attributeCheck=r.ADD_ATTR:Fe(r.ADD_ATTR)&&(D===Ct&&(D=K(D)),S(D,r.ADD_ATTR,P))),Y(r,"ADD_FORBID_CONTENTS")&&Fe(r.ADD_FORBID_CONTENTS)&&(Le===Er&&(Le=K(Le)),S(Le,r.ADD_FORBID_CONTENTS,P)),Ot&&(L["#text"]=!0),ve&&S(L,["html","head","body"]),L.table&&(S(L,["tbody"]),delete je.tbody),r.TRUSTED_TYPES_POLICY){if(typeof r.TRUSTED_TYPES_POLICY.createHTML!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof r.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const p=W;W=r.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(f){throw W=p,f}}else r.TRUSTED_TYPES_POLICY===null?(W=void 0,ye=""):(W===void 0&&(W=wi()),W&&typeof ye=="string"&&(ye=Ae("")));U&&U(r),ke=r},kr=S({},[...Gt,...Wt,...On]),Or=S({},[...Yt,...In]),Ni=function(r,l,p){return l.namespaceURI===ne?r==="svg":l.namespaceURI===it?r==="svg"&&(p==="annotation-xml"||Nt[p]):!!kr[r]},$i=function(r,l,p){return l.namespaceURI===ne?r==="math":l.namespaceURI===nt?r==="math"&&$t[p]:!!Or[r]},Fi=function(r,l,p){return l.namespaceURI===nt&&!$t[p]||l.namespaceURI===it&&!Nt[p]?!1:!Or[r]&&(Oi[r]||!kr[r])},Ui=function(r){let l=Se(r);(!l||!l.tagName)&&(l={namespaceURI:De,tagName:"template"});const p=Xe(r.tagName),f=Xe(l.tagName);return Mt[r.namespaceURI]?r.namespaceURI===nt?Ni(p,l,f):r.namespaceURI===it?$i(p,l,f):r.namespaceURI===ne?Fi(p,l,f):!!(Ve==="application/xhtml+xml"&&Mt[r.namespaceURI]):!1},pe=function(r){We(e.removed,{element:r});try{Se(r).removeChild(r)}catch{if(le(r),!Se(r))throw he("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ir=function(r,l,p){try{cr(r,l)}catch{try{r.removeAttribute(p)}catch{}}},st=function(r){ot(r);const l=Ee(r);if(l){const f=[];be(l,g=>{We(f,g)}),be(f,g=>{try{le(g)}catch{}})}const p=Et(r);if(p)for(let f=p.length-1;f>=0;--f){const g=p[f],T=g&&g.name;typeof T=="string"&&Ir(r,g,T)}},we=function(r,l,p){if(!p)try{p=l.getAttributeNode(r)}catch{p=null}We(e.removed,{attribute:p||null,from:l});try{p?cr(l,p):l.removeAttribute(r)}catch{try{l.removeAttribute(r)}catch{}}if(r==="is")if(xe||tt)try{pe(l)}catch{}else try{l.setAttribute(r,"")}catch{}},zi=function(r){const l=Et(r);if(l)for(let p=l.length-1;p>=0;--p){const f=l[p],g=f&&f.name;typeof g!="string"||D[P(g)]||Ir(r,f,g)}},ot=function(r){const l=[r];for(;l.length>0;){const p=l.pop();Be(p)===X.element&&zi(p);const f=Ee(p);if(f)for(let g=f.length-1;g>=0;--g)l.push(f[g])}},Pr=function(r,l){return _e?r==="patchsrc"?!0:r==="for"&&l!=="label"&&l!=="output":!1},Bi=function(r){if(!_e)return;const l=[r];for(;l.length>0;){const p=l.pop(),f=Be(p);if(f===X.processingInstruction||f===X.comment&&H(ai,p.data)){try{le(p)}catch{}continue}if(f===X.element){const T=p,E=P(St(p));try{T.hasAttribute&&T.hasAttribute("patchsrc")&&T.removeAttribute("patchsrc"),T.hasAttribute&&T.hasAttribute("for")&&Pr("for",E)&&T.removeAttribute("for")}catch{}}const g=Ee(p);if(g)for(let T=g.length-1;T>=0;--T)l.push(g[T])}},Mr=function(r){let l=null,p=null;if(kt)r="<remove></remove>"+r;else{const T=Zr(r,/^[\r\n\t ]+/);p=T&&T[0]}Ve==="application/xhtml+xml"&&De===ne&&(r='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+r+"</body></html>");const f=W?Ae(r):r;if(De===ne)try{l=new B().parseFromString(f,Ve)}catch{}if(!l||!l.documentElement){l=At.createDocument(De,"template",null);try{l.documentElement.innerHTML=Pt?ye:f}catch{}}const g=l.body||l.documentElement;return r&&p&&g.insertBefore(t.createTextNode(p),g.childNodes[0]||null),De===ne?Ti.call(l,ve?"html":"body")[0]:ve?l.documentElement:g},Nr=function(r){const l=Ze?Ze(r):r.ownerDocument;return hr.call(l||r,r,b.SHOW_ELEMENT|b.SHOW_COMMENT|b.SHOW_TEXT|b.SHOW_PROCESSING_INSTRUCTION|b.SHOW_CDATA_SECTION,null)},at=function(r){return r=Ye(r,Si," "),r=Ye(r,Ri," "),r=Ye(r,Ai," "),r},Ut=function(r){var l;r.normalize();const p=Ze?Ze(r):r.ownerDocument,f=hr.call(p||r,r,b.SHOW_TEXT|b.SHOW_COMMENT|b.SHOW_CDATA_SECTION|b.SHOW_PROCESSING_INSTRUCTION,null);let g=f.nextNode();for(;g;)g.data=at(g.data),g=f.nextNode();const T=(l=r.querySelectorAll)===null||l===void 0?void 0:l.call(r,"template");T&&be(T,E=>{Oe(E.content)&&Ut(E.content)})},lt=function(r){const l=Re?Re(r):null;return typeof l!="string"||P(l)!=="form"?!1:typeof r.nodeName!="string"||typeof r.textContent!="string"||typeof r.removeChild!="function"||r.attributes!==Et(r)||typeof r.removeAttribute!="function"||typeof r.removeAttributeNode!="function"||typeof r.getAttributeNode!="function"||typeof r.setAttribute!="function"||typeof r.namespaceURI!="string"||typeof r.insertBefore!="function"||typeof r.hasChildNodes!="function"||r.nodeType!==ge(r)||r.childNodes!==Ee(r)},Oe=function(r){if(!ge||typeof r!="object"||r===null)return!1;try{return ge(r)===X.documentFragment}catch{return!1}},Ge=function(r){if(!ge||typeof r!="object"||r===null)return!1;try{return typeof ge(r)=="number"}catch{return!1}};function se(h,r,l){h.length!==0&&be(h,p=>{p.call(e,r,l,ke)})}const Hi=function(r,l){return!!(_e&&r.hasChildNodes()&&!Ge(r.firstElementChild)&&H(oi,r.textContent)&&H(oi,r.innerHTML)||_e&&r.namespaceURI===ne&&Gn[l]&&(Ge(r.firstElementChild)||typeof r.textContent=="string"&&H(Wn[l],r.textContent))||r.nodeType===X.processingInstruction||_e&&r.nodeType===X.comment&&H(ai,r.data))},ct=function(r,l){if(r instanceof RegExp)return H(r,l);if(r instanceof Function){for(var p=arguments.length,f=new Array(p>2?p-2:0),g=2;g<p;g++)f[g-2]=arguments[g];return!!r(l,...f)}return!1},ji=function(r,l,p){if(!je[l]&&zr(l)&&ct(ie.tagNameCheck,l))return!1;if(Ot&&!Le[l]){const f=Se(r),g=Ee(r);if(g&&f){const T=g.length;for(let E=T-1;E>=0;--E){const O=r===p?Ke(g[E],!0):g[E];f.insertBefore(O,_i(r))}}}return pe(r),!0},$r=function(r,l,p,f){return r.length===0?l:l===p||l===f?K(l):l},Ie=function(r,l){return r===l||Se(r)!==null?!1:(It&&ot(r),!0)},Fr=function(r,l){if(se(C.beforeSanitizeElements,r,null),Ie(r,l))return!0;if(lt(r))return pe(r),!0;const p=P(St(r));if(L=$r(C.uponSanitizeElement,L,xt,Qe),se(C.uponSanitizeElement,r,{tagName:p,allowedTags:L}),Ie(r,l))return!0;if(Hi(r,p))return pe(r),!0;if(je[p]||!(ue.tagCheck instanceof Function&&ue.tagCheck(p))&&!L[p]){const f=ji(r,p,l);return f===!1&&(se(C.afterSanitizeElements,r,null),Ie(r,l))?!0:f}if(Be(r)===X.element&&!Ui(r)||(p==="noscript"||p==="noembed"||p==="noframes")&&H(jn,r.innerHTML))return pe(r),!0;if(de&&r.nodeType===X.text){const f=at(r.textContent);r.textContent!==f&&(We(e.removed,{element:r.cloneNode()}),r.textContent=f)}return se(C.afterSanitizeElements,r,null),Ie(r,l)},Ur=function(r,l,p){if(gr[l]||Pr(l,r)||wr&&(l==="id"||l==="name")&&(p in t||p in Mi))return!1;const f=D[l]||ue.attributeCheck instanceof Function&&ue.attributeCheck(l,r);return Lt&&H(xi,l)||yr&&H(Ci,l)?!0:f?Ar[l]||H(mr,Ye(p,fr,""))||(l==="src"||l==="xlink:href"||l==="href")&&r!=="script"&&Jr(p,"data:")===0&&Sr[r]||_r&&!H(Li,Ye(p,fr,""))?!0:!p:zr(r)&&ct(ie.tagNameCheck,r)&&ct(ie.attributeNameCheck,l,r)||l==="is"&&ie.allowCustomizedBuiltInElements&&ct(ie.tagNameCheck,p)},Vi=S({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),zr=function(r){return!Vi[Xe(r)]&&H(Di,r)},Gi=function(r,l,p,f){if(W&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!p)switch($.getAttributeType(r,l)){case"TrustedHTML":return Ae(f);case"TrustedScriptURL":return vi(f)}return f},Wi=function(r,l,p,f){try{return p?r.setAttributeNS(p,l,f):r.setAttribute(l,f),lt(r)?(pe(r),!1):!0}catch{return we(l,r),!1}},Br=function(r,l){if(se(C.beforeSanitizeAttributes,r,null),Ie(r,l))return;const p=r.attributes;if(!p||lt(r))return;D=$r(C.uponSanitizeAttribute,D,Ct,et);const f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:D,forceKeepAttr:void 0};let g=p.length;const T=P(r.nodeName);for(;g--;){const E=p[g],O=E.name,Z=E.namespaceURI,q=E.value,Pe=P(O),Bt=q;let j=O==="value"?Bt:Rn(Bt),Hr=!1;if(f.attrName=Pe,f.attrValue=j,f.keepAttr=!0,f.forceKeepAttr=void 0,se(C.uponSanitizeAttribute,r,f),j=f.attrValue,br&&(Pe==="id"||Pe==="name")&&Jr(j,Tr)!==0&&(we(O,r,E),j=Tr+j,Hr=!0),_e&&H(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,j)){we(O,r,E);continue}if(Pe==="attributename"&&Zr(j,"href")){we(O,r,E);continue}if(!f.forceKeepAttr){if(!f.keepAttr){we(O,r,E);continue}if(!vr&&H(Vn,j)){we(O,r,E);continue}if(de&&(j=at(j)),!Ur(T,Pe,j)){we(O,r,E);continue}j=Gi(T,Pe,Z,j),j!==Bt&&Wi(r,O,Z,j)&&Hr&&Kr(e.removed)}}se(C.afterSanitizeAttributes,r,null),Ie(r,l)},ut=function(r){let l=null;const p=Nr(r);for(se(C.beforeSanitizeShadowDOM,r,null);l=p.nextNode();)if(se(C.uponSanitizeShadowNode,l,null),Fr(l,r),Br(l,r),Oe(l.content)&&ut(l.content),Be(l)===X.element){const f=ur(l);Oe(f)&&(zt(f),ut(f))}se(C.afterSanitizeShadowDOM,r,null)},zt=function(r){const l=[{node:r,shadow:null}];for(;l.length>0;){const p=l.pop();if(p.shadow){ut(p.shadow);continue}const f=p.node,g=Be(f)===X.element,T=Ee(f);if(T)for(let E=T.length-1;E>=0;--E)l.push({node:T[E],shadow:null});if(g){const E=Re?Re(f):null;if(typeof E=="string"&&P(E)==="template"){const O=f.content;Oe(O)&&l.push({node:O,shadow:null})}}if(g){const E=ur(f);Oe(E)&&l.push({node:null,shadow:E},{node:E,shadow:null})}}};return e.sanitize=function(h){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,p=null,f=null,g=null;if(Pt=!h,Pt&&(h="<!-->"),typeof h!="string"&&!Ge(h)&&(h=Dn(h),typeof h!="string"))throw he("dirty is not a string, aborting");if(!e.isSupported)return h;Dt?(L=Qe,D=et):Ft(r),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(L=K(L)),C.uponSanitizeAttribute.length>0&&(D=K(D)),e.removed=[];const T=It&&typeof h!="string"&&Ge(h);if(T){Bi(h);const Z=St(h);if(typeof Z=="string"){const q=P(Z);if(!L[q]||je[q])throw st(h),he("root node is forbidden and cannot be sanitized in-place")}if(lt(h))throw st(h),he("root node is clobbered and cannot be sanitized in-place");try{zt(h)}catch(q){throw st(h),q}}else if(Ge(h))l=Mr("<!---->"),p=l.ownerDocument.importNode(h,!0),p.nodeType===X.element&&p.nodeName==="BODY"||p.nodeName==="HTML"?l=p:l.appendChild(p),zt(l);else{if(!xe&&!de&&!ve&&h.indexOf("<")===-1)return W&&rt?Ae(h):h;if(l=Mr(h),!l)return xe?null:rt?ye:""}l&&kt&&pe(l.firstChild);const E=T?h:l;try{const Z=Nr(E);for(;f=Z.nextNode();)Fr(f,E),Br(f,E),Oe(f.content)&&ut(f.content)}catch(Z){throw T&&(st(h),be(e.removed,q=>{q.element&&ot(q.element)})),Z}if(T){let Z=!1;if(be(e.removed,q=>{q.element&&(q.element===h&&(Z=!0),ot(q.element))}),Z)throw he("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&Ut(h),h}if(xe){if(de&&Ut(l),tt)for(g=bi.call(l.ownerDocument);l.firstChild;)g.appendChild(l.firstChild);else g=l;return(D.shadowroot||D.shadowrootmode)&&(g=Ei.call(a,g,!0)),g}let O=ve?l.outerHTML:l.innerHTML;return ve&&L["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&H(Bn,l.ownerDocument.doctype.name)&&(O="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+O),de&&(O=at(O)),W&&rt?Ae(O):O},e.setConfig=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(h),Dt=!0,Qe=L,et=D},e.clearConfig=function(){ke=null,Dt=!1,Qe=null,et=null,W=Rt,ye=""},e.isValidAttribute=function(h,r,l){ke||Ft({});const p=P(h),f=P(r);return Ur(p,f,l)},e.addHook=function(h,r){typeof r=="function"&&Y(C,h)&&We(C[h],r)},e.removeHook=function(h,r){if(Y(C,h)){if(r!==void 0){const l=En(C[h],r);return l===-1?void 0:Sn(C[h],l,1)[0]}return Kr(C[h])}},e.removeHooks=function(h){Y(C,h)&&(C[h]=[])},e.removeAllHooks=function(){C=li()},e}var ft=yi();const Xn=["a"];function Kn(i){ft.addHook("afterSanitizeAttributes",Zn);try{return ft.sanitize(i,{ALLOWED_TAGS:Xn})}finally{ft.removeHook("afterSanitizeAttributes")}}function Zn(i){i.nodeName.toLowerCase()==="a"&&(i.setAttribute("rel","ugc nofollow"),i.setAttribute("target","_blank"))}function Jn(i,e=100,t=!0){if(i.length<e)return i;let a=e;if(t){const c=i.indexOf(" ",e),d=c-e<=20;if(d&&c===i.length-1)return i;c!==-1&&d&&(a=c)}return Qn(i,a,e)}function Qn(i,e,t){let a=i.slice(0,e);const c=a.match(/<a/gi);if(c){const d=a.match(/<\/a/gi);if(!d||d.length<c.length){const m=i.indexOf("</a>",e),y=m-t<=20;if(y&&i.length===m+4)return i;if(m!==-1&&y)a=i.slice(0,m+4);else{const b=a.lastIndexOf("<a");a=i.slice(0,b)}}}return a.concat("...")}const es=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function ts(i){return i.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(es,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function rs(i){return i.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const is="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var ns=Object.defineProperty,ss=Object.getOwnPropertyDescriptor,re=(i,e,t,a)=>{for(var c=a>1?void 0:a?ss(e,t):e,d=i.length-1,m;d>=0;d--)(m=i[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&ns(e,t,c),c};let Q=class extends bt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.csrfToken="",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1,this.deleteMsg=""}render(){return this.review?v`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?v`
                  <button
                    class="delete-btn"
                    title="Delete this review"
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${is}
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
              ${this.deleteMsg?v`<i>${R(this.deleteMsg)}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:v`
          <div class="error">
            ${R("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const i=this.review?.reviewtitle;return this.truncateContent(i??"",this.maxSubjectLength)}get bodyTemplate(){const i=this.review?.reviewbody;if(!i)return F;const e=Kn(i),t=this.truncateContent(e,this.maxBodyLength);return v`${ci(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?F:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?F:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return v`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${R("More...")}
      </button>
    `}get lessButtonTemplate(){return v`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${R("...Less")}
    </button>`}get reviewerTemplate(){return this.review?this.review.reviewer_itemname?v`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Yr(this.review.reviewer)}
            </a>
          `:v`${Yr(this.review.reviewer)}`:F}get starsTemplate(){return!this.review||!this.review.stars?F:v`
      <div
        class="review-stars"
        title="${R(`${this.review.stars} out of 5 stars`)}"
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>v`<div class="review-star">
              <img
                class="star-basic"
                src=${fn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return F;const i=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"}),a=i.getTime()!==e.getTime()?"(edited)":"";return R(`${t} ${a}`)}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(i,e){return this.showTruncatedContent||this.bypassTruncation?i:Jn(i,e)}prepReview(i){return rs(ts(i))}async deleteReview(){if(!this.review||!this.identifier||!confirm(R("Are you sure you want to delete this review?")))return;const i=new URLSearchParams({identifier:this.identifier,deleteReviewer:this.review.reviewer??"",deleteReviewerItemname:this.review.reviewer_itemname??"",csrf_token:this.csrfToken}),e=`${this.baseHost}/edit-reviews.php?${i}`;try{const t=await fetch(e,{method:"POST"});if(!t.ok)throw new Error(`Delete failed: ${t.status}`);this.deleteMsg="This review has been queued for deletion."}catch{this.deleteMsg="Sorry, we were unable to delete this review."}}static get styles(){return Tt`
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
    `}};re([w({type:Object})],Q.prototype,"review",2);re([w({type:String})],Q.prototype,"identifier",2);re([w({type:Number})],Q.prototype,"maxSubjectLength",2);re([w({type:Number})],Q.prototype,"maxBodyLength",2);re([w({type:String})],Q.prototype,"baseHost",2);re([w({type:String})],Q.prototype,"csrfToken",2);re([w({type:Boolean})],Q.prototype,"canDelete",2);re([w({type:Boolean})],Q.prototype,"bypassTruncation",2);re([V()],Q.prototype,"showTruncatedContent",2);re([V()],Q.prototype,"deleteMsg",2);Q=re([wt("ia-review")],Q);const os="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",as="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var ls=Object.defineProperty,cs=Object.getOwnPropertyDescriptor,M=(i,e,t,a)=>{for(var c=a>1?void 0:a?cs(e,t):e,d=i.length-1,m;d>=0;d--)(m=i[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&ls(e,t,c),c};let I=class extends bt{constructor(){super(...arguments),this.token="",this.baseHost="https://archive.org",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.formCanSubmit=!1,this.submissionInProgress=!1,this.RECAPTCHA_ERROR_MESSAGE="Could not validate review. Please try again later.",this.GENERIC_ERROR_MESSAGE="There's been a temporary error. Please wait a moment and try again."}render(){return v`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableError?this.unrecoverableErrorTemplate:v`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate} ${this.hiddenInputsTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(i){i.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),i.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),i.has("unrecoverableError")&&(this.formCanSubmit=this.checkSubmissionAllowed()),(i.has("currentSubjectLength")||i.has("currentBodyLength")||i.has("maxSubjectLength")||i.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){return this.unrecoverableError?v`
          <div class="unrecoverable-error">
            <span class="error-msg">${R(this.unrecoverableError)}</span>
          </div>
        `:F}get recoverableErrorTemplate(){return this.recoverableError?v`
          <div class="recoverable-error">
            ${ci(this.sanitizeErrorMsg(R(this.recoverableError)))}
          </div>
        `:F}get recaptchaMessageTemplate(){return this.bypassRecaptcha?F:v`
      <span class="recaptcha-disclaimer"
        >${R(v`This site is protected by reCAPTCHA and the Google
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
    `}get starsInputTemplate(){return v`
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
        ${[1,2,3,4,5].map(i=>this.renderStar(i))}
        <button
          type="button"
          class="clear-stars-btn"
          @click=${this.handleClearBtnClicked}
        >
          ${R("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return v`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${R("Subject")}</label>
        ${this.maxSubjectLength?v`<div class="char-count subject">
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
    />${this.maxSubjectLength?v`
            <div class="input-error">
              ${R(`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:F}</div></span>
    `}get bodyInputTemplate(){return v`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${R("Review")}</label>
          ${this.maxBodyLength?v`<div class="char-count body">
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
        ${this.maxBodyLength?v`
              <div class="input-error">
                ${R(`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:F}
      </span>
    `}get hiddenInputsTemplate(){return v`
      <input type="hidden" name="field_reviewtoken" .value=${this.token} />
      ${this.identifier?v`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:F}
    `}get actionButtonsTemplate(){return v`<div class="action-btns">
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
    </div>`}renderStar(i){const e=i===this.currentStars,t=R(`Rate ${i>1?`${i} stars`:"1 star"}`);return v`
      <button
        class="star star-${i}"
        title=${e?R("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,i)}
      >
        ${i<=this.currentStars?v`<img
              class="star-selected"
              src=${os}
              alt=""
              aria-hidden="true"
            />`:v`<img
              class="star-unselected"
              src=${as}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.unrecoverableError=this.RECAPTCHA_ERROR_MESSAGE}}sanitizeErrorMsg(i){return ft.sanitize(i,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(i){if(i.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.fetchHandler)return this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission();try{const e=new URLSearchParams;if(!this.bypassRecaptcha){const a=await this.getRecaptchaToken();if(!a)return this.handleRecaptchaError();e.append("g-recaptcha-response",a??"")}for(const a of new FormData(this.reviewForm))e.append(a[0],a[1]);e.append("submitter","review-form");const t=await this.fetchHandler.fetchApiResponse(`${this.baseHost}${this.endpointPath}`,{method:"POST",includeCredentials:!0,body:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else this.recoverableError=t.error??this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}catch(e){console.error(e),this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}}}generateSubmittedReview(){const i=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:i,reviewer:this.oldReview?.reviewer??this.submitterScreenname,reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??i})}dateToString(i){return i instanceof Date?i.toDateString():i}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.recoverableError=this.RECAPTCHA_ERROR_MESSAGE,this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const i=new CustomEvent("reviewEditCanceled");this.dispatchEvent(i)}handleStarClicked(i,e){i.preventDefault(),this.setStars(e)}handleClearBtnClicked(i){i.preventDefault(),this.currentStars=0}setStars(i){this.currentStars=i===this.currentStars?0:i}handleSubjectChanged(i){const e=i.target;this.currentSubjectLength=e.value.length}handleBodyChanged(i){const e=i.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableError||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Tt`
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
      `]}};M([w({type:String})],I.prototype,"identifier",2);M([w({type:String})],I.prototype,"token",2);M([w({type:String})],I.prototype,"baseHost",2);M([w({type:String})],I.prototype,"endpointPath",2);M([w({type:String})],I.prototype,"submitterScreenname",2);M([w({type:String})],I.prototype,"submitterItemname",2);M([w({type:Object})],I.prototype,"oldReview",2);M([w({type:String})],I.prototype,"unrecoverableError",2);M([w({type:Number})],I.prototype,"maxSubjectLength",2);M([w({type:Number})],I.prototype,"maxBodyLength",2);M([w({type:Object})],I.prototype,"fetchHandler",2);M([w({type:Object})],I.prototype,"recaptchaManager",2);M([w({type:Boolean})],I.prototype,"bypassRecaptcha",2);M([V()],I.prototype,"currentStars",2);M([V()],I.prototype,"currentSubjectLength",2);M([V()],I.prototype,"currentBodyLength",2);M([V()],I.prototype,"recoverableError",2);M([V()],I.prototype,"formCanSubmit",2);M([V()],I.prototype,"submissionInProgress",2);M([ui("#review-form")],I.prototype,"reviewForm",2);I=M([wt("ia-review-form")],I);var us=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,x=(i,e,t,a)=>{for(var c=a>1?void 0:a?ds(e,t):e,d=i.length-1,m;d>=0;d--)(m=i[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&us(e,t,c),c};let A=class extends bt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.token="",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.fetchHandler=new hn,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?v`
      <div class="reviews-list">
        ${this.reviewsFrozen?v`<div class="message">
              ${R("Reviews can no longer be added to this item.")}
            </div>`:F}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(i=>i.reviewer_itemname!==this.submitterItemname?this.renderReview(i):F)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(i){(i.has("reviews")||i.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),i.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),i.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}get reviewsDisabledTemplate(){return v`<div class="message">
      ${R("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?v`
        <div class="message">
          ${R("Reviews cannot be added to this item.")}
        </div>
      `:v`
      <div class="message">
        ${R("There are no reviews yet.")}
        ${R(v`
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
    `}get displayReviewsMsgTemplate(){return v`
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
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?F:v`<div class="own-review-container">
      ${this.displayReviewForm?v`<ia-review-form
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
    </div>`}sortFilterReviews(){let i;const e=[];this.reviews.forEach(t=>{!i&&t.reviewer_itemname===this.submitterItemname?i=t:e.push(t)}),this.currentReview=i,this.filteredReviews=this.sortReviews(e)}sortReviews(i){return[...i].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(i){return i?v`<ia-review
      .review=${i}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .csrfToken=${this.token}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:F}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(i){!this.currentReview&&i.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=i.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[Tt`
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
      `]}};x([w({type:String})],A.prototype,"identifier",2);x([w({type:Array})],A.prototype,"reviews",2);x([w({type:Boolean})],A.prototype,"reviewsDisabled",2);x([w({type:Boolean})],A.prototype,"reviewsFrozen",2);x([w({type:Boolean})],A.prototype,"canDelete",2);x([w({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([w({type:Number})],A.prototype,"maxSubjectLength",2);x([w({type:Number})],A.prototype,"maxBodyLength",2);x([w({type:String})],A.prototype,"baseHost",2);x([w({type:String})],A.prototype,"token",2);x([w({type:String})],A.prototype,"endpointPath",2);x([w({type:String})],A.prototype,"submitterScreenname",2);x([w({type:String})],A.prototype,"submitterItemname",2);x([w({type:Object})],A.prototype,"recaptchaManager",2);x([w({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([w({type:String})],A.prototype,"reviewSubmissionError",2);x([w({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([w({type:Object})],A.prototype,"fetchHandler",2);x([V()],A.prototype,"displayReviewForm",2);x([V()],A.prototype,"displayReviews",2);x([V()],A.prototype,"filteredReviews",2);x([V()],A.prototype,"currentReview",2);x([V()],A.prototype,"reviewsCount",2);x([V()],A.prototype,"recaptchaActivated",2);A=x([wt("ia-reviews")],A);var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,lr=(i,e,t,a)=>{for(var c=a>1?void 0:a?hs(e,t):e,d=i.length-1,m;d>=0;d--)(m=i[d])&&(c=(a?m(e,t,c):m(c))||c);return a&&c&&ps(e,t,c),c};const fs=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],ms=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],gs=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],ys={async fetch(){return new Response("{}",{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},_s=6,vs="/edit-reviews.php";let vt=class extends bt{constructor(){super(...arguments),this.log=[]}connectedCallback(){super.connectedCallback();const i=window.fetch;this.realFetch=i,window.fetch=(e,t)=>(e instanceof Request?e.url:String(e)).includes(vs)?Promise.resolve(new Response("{}",{status:200})):i.call(window,e,t)}disconnectedCallback(){this.realFetch&&(window.fetch=this.realFetch),this.realFetch=void 0,super.disconnectedCallback()}render(){return v`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:ms}}
        .propInputData=${{settings:gs}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${fs}
          .fetchHandler=${ys}
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
          ${this.log.length===0?v`<p class="empty">
                Submit the review form to see events here.
              </p>`:v`<ol class="log">
                ${this.log.map(i=>v`<li><code>${i}</code></li>`)}
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(i){const{detail:e}=i,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${i.type}${t}`,...this.log].slice(0,_s)}static get styles(){return Tt`
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
    `}};lr([V()],vt.prototype,"log",2);lr([ui("ia-reviews")],vt.prototype,"reviews",2);vt=lr([wt("ia-reviews-story")],vt);export{vt as IAReviewsStory};
