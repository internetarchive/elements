import{b as p,i as T,n as h,d as _,t as A,A as z,w as Oe,r as V,e as Ne,a as He,c as je,E as qe}from"./index-B3goLWVI.js";import{e as J}from"./query-CExgPduz.js";import{e as We,M as Ke,u as j,v as ie,h as me,p as Je}from"./directive-helpers-CM0rIMQJ.js";import{_ as r}from"./tslib.es6-kHcLnhpD.js";import{o as Xe,t as N}from"./story-template-ERC6ZZLO.js";function i(t){let e,a,s;return e=t,(n,d,c)=>{if(c.value!=null)c.value=Ce(c.value,e,a,s);else if(c.get!=null)c.get=Ce(c.get,e,a,s);else throw"Only put a Memoize() decorator on a method or get accessor."}}const ge=new Map;function Ce(t,e,a=0,s){const n=Symbol("__memoized_map__");return function(...d){let c;this.hasOwnProperty(n)||Object.defineProperty(this,n,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let m=this[n];if(Array.isArray(s))for(const g of s)ge.has(g)?ge.get(g).push(m):ge.set(g,[m]);if(e||d.length>0||a>0){let g;e===!0?g=d.map(v=>v.toString()).join("!"):e?g=e.apply(this,d):g=d[0];const O=`${g}__timestamp`;let Z=!1;if(a>0)if(!m.has(O))Z=!0;else{let v=m.get(O);Z=Date.now()-v>a}m.has(g)&&!Z?c=m.get(g):(c=t.apply(this,d),m.set(g,c),a>0&&m.set(O,Date.now()))}else{const g=this;m.has(g)?c=m.get(g):(c=t.apply(this,d),m.set(g,c))}return c}}class se{parseValue(e){if(typeof e=="string"){const a=e.trim().toLowerCase();if(a==="false"||a==="0"||a==="no")return!1;if(a==="true"||a==="1"||a==="yes")return!0}return!!e}}se.shared=new se;class C{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const a=parseFloat(e);if(!Number.isNaN(a))return a}}C.shared=new C;class le{parseValue(e){return C.shared.parseValue(e)}}le.shared=new le;class ee{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const a=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!a)return;const[,s,n,d,c="00",m="00",g="00"]=a,O=new Date(`${s}-${n}-${d}T${c}:${m}:${g}`);return Number.isNaN(O.getTime())?void 0:O}parseBracketDate(e){if(typeof e!="string")return;const a=e.match(/\[([0-9]{4})\]/);if(!(!a||a.length<2))return this.parseJSDate(a[1])}parseJSDate(e){if(typeof e!="string")return;let a=e;a.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(a=a.replace(" ","T"));const s=Date.parse(a);if(Number.isNaN(s))return;let n=new Date(a);return(a.match(/^[0-9]{4}$/)||a.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(n=new Date(n.getTime()+n.getTimezoneOffset()*1e3*60)),n}}ee.shared=new ee;class de{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const a=e.split(":");let s;return a.length===1?s=this.parseNumberFormat(a[0]):s=this.parseColonSeparatedFormat(a),s}parseNumberFormat(e){let a=parseFloat(e);return Number.isNaN(a)&&(a=void 0),a}parseColonSeparatedFormat(e){let a=!1;const s=e.map((n,d)=>{const c=parseFloat(n);if(Number.isNaN(c))return a=!0,0;const g=60**(e.length-1-d);return c*Math.floor(g)}).reduce((n,d)=>n+d,0);return a?void 0:s}}de.shared=new de;class Le{constructor(e,a){this.separators=[";",","],this.parser=e,a&&a.separators&&(this.separators=a.separators)}parseValue(e){const a=String(e);let s=[];for(const n of this.separators)if(s=a.split(n),s.length>1)break;return this.parseListValues(s)}parseListValues(e){const s=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),n=[];return s.forEach(d=>{d!==void 0&&n.push(d)}),n}}class ce{parseValue(e){return String(e)}}ce.shared=new ce;function Q(t,e,...a){for(const s of a){const n=t[s];if(n!=null)return e(n)}}function I(t,e,...a){return Q(t,s=>e(s),...a)}class R{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=C.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return I(this.rawValue,e=>le.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return I(this.rawValue,e=>de.shared.parseValue(e),"length")}get height(){return I(this.rawValue,e=>C.shared.parseValue(e),"height")}get width(){return I(this.rawValue,e=>C.shared.parseValue(e),"width")}get track(){return I(this.rawValue,e=>C.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return I(this.rawValue,e=>C.shared.parseValue(e),"bitrate")}get private(){return I(this.rawValue,e=>se.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}r([i()],R.prototype,"mtime",null);r([i()],R.prototype,"size",null);r([i()],R.prototype,"length",null);r([i()],R.prototype,"height",null);r([i()],R.prototype,"width",null);r([i()],R.prototype,"track",null);r([i()],R.prototype,"bitrate",null);r([i()],R.prototype,"private",null);class ${get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,a){this.parser=e,this.rawValue=a}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],a=[];return e.forEach(s=>{const n=this.parser.parseValue(s);Array.isArray(n)?a.push(...n):n!==void 0&&a.push(n)}),a}}r([i()],$.prototype,"values",null);r([i()],$.prototype,"value",null);class F extends ${constructor(e){super(se.shared,e)}}class f extends ${constructor(e){super(ee.shared,e)}}class fe extends ${constructor(e){super(de.shared,e)}}class u extends ${constructor(e){super(C.shared,e)}}class l extends ${constructor(e){super(ce.shared,e)}}class te{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Y extends ${constructor(e,a){super(a,e)}}const Ze=new te(["rl","lr"]);class Ge extends Y{constructor(e){super(e,Ze)}}class ae extends ${constructor(e){super(le.shared,e)}}const Qe=new te(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class Ye extends Y{constructor(e){super(e,Qe)}}class De extends ${constructor(e,a){super(a,e)}}class Me extends De{constructor(e){const a=new Le(ce.shared);super(e,a)}}class ve extends De{constructor(e){const a=new Le(C.shared);super(e,a)}}const et=/^([0-9a-f]{32})\s+\*?(.+)$/i,tt=/^(.+):([0-9a-f]{32})$/i;function rt(t){const e=t.match(et);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const a=t.match(tt);if(a)return{file:a[1].trim(),md5:a[2].toLowerCase()}}class be{parseValue(e){if(typeof e!="string")return;const a=e.split(`
`).map(s=>s.trim()).filter(Boolean).map(rt).filter(s=>s!==void 0);return a.length?a:void 0}}be.shared=new be;class Pe extends ${constructor(e){super(be.shared,e)}}function ne(t,e){var a;const s=t.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),n=(a=s?.[1])===null||a===void 0?void 0:a.trim();return n||void 0}class ye{parseValue(e){if(typeof e!="string")return;const a=ne(e,"curator"),s=ne(e,"date"),n=ne(e,"comment"),d=ne(e,"state");if(!(!a&&!s&&!n&&!d))return{curator:a,date:s?ee.shared.parseValue(s):void 0,comment:n,state:d}}}ye.shared=new ye;class it extends ${constructor(e){super(ye.shared,e)}}class _e{parseValue(e){if(typeof e!="string")return;const a=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!a)return;const s=parseFloat(a[1]),n=parseFloat(a[2]);if(n)return{width:s,height:n,decimal:s/n}}}_e.shared=new _e;class ot extends ${constructor(e){super(_e.shared,e)}}class we{parseValue(e){const a=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!a)return;const s=a[1]==="-"?-1:1,n=parseInt(a[2],10),d=parseInt(a[3],10);return{hours:s*n,minutes:d,totalMinutes:s*(n*60+d)}}}we.shared=new we;class at extends ${constructor(e){super(we.shared,e)}}class xe{parseValue(e){if(typeof e!="string")return;const a=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(a)return{channel:parseInt(a[1],10),frequencyMhz:a[2]?parseFloat(a[2]):void 0}}}xe.shared=new xe;class nt extends ${constructor(e){super(xe.shared,e)}}const st=new te(["true","none","frozen"]),lt=new te(["sound","silent"]),dt=new te(["color","b&w"]),ct=new te(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(l,"access")}get adder(){return this.field(l,"adder")}get amrc_id(){return this.field(l,"amrc-id")}get archiveit_account_id(){return this.field(u,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(l,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(u,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(l,"archiveit-collection-name")}get archiveit_job_type(){return this.field(l,"archiveit-job-type")}get audit_time_minutes(){return this.field(u,"audit_time_minutes")}get auditor(){return this.field(l,"auditor")}get author(){return this.field(l,"author")}get autocrop_version(){return this.field(l,"autocrop_version")}get bookplateleaf(){return this.field(u,"bookplateleaf")}get bookreader_defaults(){return Q(this.rawMetadata,e=>new Y(e,ct),"bookreader-defaults")}get boxid(){return this.field(l,"boxid")}get camera(){return this.field(l,"camera")}get cameraman(){return this.field(l,"cameraman")}get canister(){return this.field(l,"canister")}get case_name(){return this.field(l,"case-name")}get col_number(){return this.field(l,"col_number")}get collection_added(){return this.field(l,"collection_added")}get collection_library(){return this.field(l,"collection-library")}get collection_set(){return this.field(l,"collection_set")}get copyright_holder(){return this.field(l,"copyright_holder")}get court(){return this.field(l,"court")}get crawler(){return this.field(l,"crawler")}get crawljob(){return this.field(l,"crawljob")}get curation(){return this.field(it,"curation")}get dari_title(){return this.field(l,"dari-title")}get dari_title_romanized(){return this.field(l,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(f,"date-case-filed")}get date_case_terminated(){return this.field(f,"date-case-terminated")}get date_created(){return this.field(f,"date_created")}get date_last_filing(){return this.field(f,"date-last-filing")}get derive_submittime(){return this.field(f,"derive_submittime")}get derive_version(){return this.field(l,"derive_version")}get discs(){return this.field(u,"discs")}get docket_num(){return this.field(l,"docket-num")}get external_metadata_update(){return this.field(f,"external_metadata_update")}get fail_reasons(){return this.field(l,"fail-reasons")}get filesxml(){return this.field(f,"filesxml")}get firstfiledate(){return this.field(f,"firstfiledate")}get firstfileserial(){return this.field(u,"firstfileserial")}get foldoutcount(){return this.field(u,"foldoutcount")}get format(){return this.field(l,"format")}get geo_restricted(){return this.field(l,"geo_restricted")}get guid(){return this.field(l,"guid")}get has_mp3(){return this.field(F,"has_mp3")}get height(){return this.field(u,"height")}get hidden(){return this.field(F,"hidden")}get ia_orig__runtime(){return this.field(l,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(F,"access-restricted-item")}get addeddate(){return this.field(f,"addeddate")}get aspect_ratio(){return this.field(ot,"aspect_ratio")}get audio_codec(){return this.field(l,"audio_codec")}get audio_sample_rate(){return this.field(u,"audio_sample_rate")}get avg_rating(){return this.field(u,"avg_rating")}get backup_location(){return this.field(l,"backup_location")}get ccnum(){return this.field(l,"ccnum")}get closed_captioning(){return this.field(F,"closed_captioning")}get collection(){return this.field(l,"collection")}get collections_raw(){return this.field(l,"collections_raw")}get collection_size(){return this.field(ae,"collection_size")}get color(){return Q(this.rawMetadata,e=>new Y(e,dt),"color")}get contact(){return this.field(l,"contact")}get contributor(){return this.field(l,"contributor")}get coverage(){return this.field(l,"coverage")}get creator(){return this.field(l,"creator")}get creator_alt_script(){return this.field(l,"creator-alt-script")}get credits(){return this.field(l,"credits")}get collection_layout(){return this.field(l,"collection_layout")}get date(){return this.field(f,"date")}get description(){return this.field(l,"description")}get downloads(){return this.field(u,"downloads")}get duration(){return this.field(fe,"duration")}get external_identifier(){return this.field(l,"external-identifier")}get external_link(){return this.field(l,"external-link")}get files_count(){return this.field(u,"files_count")}get frames_per_second(){return this.field(u,"frames_per_second")}get identifier_access(){return this.field(l,"identifier-access")}get identifier_ark(){return this.field(l,"identifier-ark")}get identifier_bib(){return this.field(l,"identifier-bib")}get image_count(){return this.field(u,"image_count")}get imagecount(){return this.field(u,"imagecount")}get indexdate(){return this.field(f,"indexdate")}get invoice(){return this.field(u,"invoice")}get isbn(){return this.field(l,"isbn")}get issue(){return this.field(l,"issue")}get issue_count(){return this.field(u,"issue_count")}get issue_page_count(){return this.field(u,"issue_page_count")}get item_count(){return this.field(u,"item_count")}get item_size(){return this.field(ae,"item_size")}get language(){return this.field(l,"language")}get lastdate(){return this.field(f,"lastdate")}get lastfiledate(){return this.field(f,"lastfiledate")}get lastfileserial(){return this.field(u,"lastfileserial")}get length(){return this.field(fe,"length")}get license(){return this.field(l,"license")}get licenseurl(){return this.field(l,"licenseurl")}get lineage(){return this.field(l,"lineage")}get mature_content(){return this.field(F,"mature_content")}get md5(){return this.field(l,"md5")}get md5contents(){return this.field(Pe,"md5contents")}get md5s(){return this.field(Pe,"md5s")}get medium(){return this.field(l,"medium")}get metadata_operator(){return this.field(l,"metadata_operator")}get metasource_catalog(){return this.field(l,"metasource_catalog")}get monochromatic(){return this.field(F,"monochromatic")}get month(){return this.field(u,"month")}get mediatype(){return this.field(Ye,"mediatype")}get mpeg_program(){return this.field(u,"mpeg_program")}get next_item(){return this.field(l,"next_item")}get noarchivetorrent(){return this.field(F,"noarchivetorrent")}get noindex(){return this.field(F,"noindex")}get notes(){return this.field(l,"notes")}get num_favorites(){return this.field(u,"num_favorites")}get num_reviews(){return this.field(u,"num_reviews")}get numeric_id(){return this.field(u,"numeric_id")}get numwarcs(){return this.field(u,"numwarcs")}get ocr(){return this.field(l,"ocr")}get ocr_autonomous(){return this.field(F,"ocr_autonomous")}get ocr_detected_lang(){return this.field(l,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(u,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(l,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(u,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(l,"ocr_invalid_language")}get ocr_module_version(){return this.field(l,"ocr_module_version")}get ocr_parameters(){return this.field(l,"ocr_parameters")}get old_pallet(){return this.field(l,"old_pallet")}get openlibrary_edition(){return this.field(l,"openlibrary_edition")}get openlibrary_work(){return this.field(l,"openlibrary_work")}get operator(){return this.field(l,"operator")}get originalurl(){return this.field(l,"originalurl")}get osf_category(){return this.field(l,"osf_category")}get osf_project(){return this.field(l,"osf_project")}get osf_registration_doi(){return this.field(l,"osf_registration_doi")}get osf_registration_schema(){return this.field(l,"osf_registration_schema")}get osf_registry(){return this.field(l,"osf_registry")}get osf_subjects(){return this.field(l,"osf_subjects")}get osf_tags(){return this.field(l,"osf_tags")}get output_time_minutes(){return this.field(u,"output_time_minutes")}get pacer_case_num(){return this.field(u,"pacer-case-num")}get packaging_time_minutes(){return this.field(u,"packaging_time_minutes")}get page_number_confidence(){return this.field(u,"page_number_confidence")}get page_number_module_version(){return this.field(l,"page_number_module_version")}get page_progression(){return this.field(Ge,"page-progression","page_progression")}get paginated(){return this.field(F,"paginated")}get parse_date(){return this.field(f,"parse_date")}get parse_state(){return this.field(l,"parse_state")}get partner(){return this.field(l,"partner")}get pashto_title(){return this.field(l,"pashto-title")}get pashto_title_romanized(){return this.field(l,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(l,"pdf_degraded")}get pdf_module_version(){return this.field(l,"pdf_module_version")}get pick(){return this.field(u,"pick")}get podcastindexid(){return this.field(u,"podcastindexid")}get post_text(){return this.field(l,"post_text")}get ppi(){return this.field(u,"ppi")}get previous_item(){return this.field(l,"previous_item")}get program(){return this.field(l,"program")}get publicdate(){return this.field(f,"publicdate")}get publisher(){return this.field(l,"publisher")}get political_religious_party(){return this.field(l,"political-religious-party")}get rcs_key(){return this.field(u,"rcs_key")}get repub_state(){return this.field(u,"repub_state")}get republisher_date(){return this.field(f,"republisher_date")}get republisher_operator(){return this.field(Me,"republisher_operator")}get republisher_time(){return this.field(u,"republisher_time")}get reviewdate(){return this.field(f,"reviewdate")}get reviews_allowed(){return Q(this.rawMetadata,e=>new Y(e,st),"reviews-allowed")}get ribbon_state(){return this.field(l,"ribbon_state")}get ribbon_state_modify_date(){return this.field(f,"ribbon_state_modify_date")}get rights(){return this.field(l,"rights")}get rights_holder(){return this.field(l,"rights-holder","rights_holder")}get rssfeed(){return this.field(l,"rssfeed")}get runtime(){return this.field(fe,"runtime")}get scan_time_minutes(){return this.field(u,"scan_time_minutes")}get scandate(){return this.field(f,"scandate")}get scanfee(){return this.field(ve,"scanfee")}get scanner(){return this.field(l,"scanner")}get scanner_operator(){return this.field(l,"scanner_operator")}get scanningcenter(){return this.field(l,"scanningcenter")}get scribe3_search_catalog(){return this.field(l,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(l,"scribe3_search_id")}get segments(){return this.field(l,"segments")}get sessionid(){return this.field(l,"sessionid")}get shndiscs(){return this.field(u,"shndiscs")}get shotlist(){return this.field(l,"shotlist")}get signal_path(){return this.field(l,"signal-path")}get size(){return this.field(ae,"size")}get sizehint(){return this.field(ae,"sizehint")}get software_version(){return this.field(l,"software_version")}get sort_order(){return this.field(l,"sort_order")}get sound(){return Q(this.rawMetadata,e=>new Y(e,lt),"sound")}get soundcreator(){return this.field(l,"soundcreator")}get soundtitle(){return this.field(l,"soundtitle")}get source(){return this.field(l,"source")}get source_pixel_height(){return this.field(u,"source_pixel_height")}get source_pixel_width(){return this.field(u,"source_pixel_width")}get source_url(){return this.field(l,"source_url")}get sponsor(){return this.field(l,"sponsor")}get sponsordate(){return this.field(f,"sponsordate")}get start_localtime(){return this.field(f,"start_localtime")}get start_time(){return this.field(f,"start_time")}get station_name(){return this.field(l,"station_name")}get stop_time(){return this.field(f,"stop_time")}get subject(){return this.field(Me,"subject")}get taper(){return this.field(l,"taper")}get thumbs(){return this.field(ve,"thumbs")}get times(){return this.field(ve,"times")}get title(){return this.field(l,"title")}get title_alt_script(){return this.field(l,"title-alt-script")}get transferer(){return this.field(l,"transferer")}get track(){return this.field(u,"track")}get tts_version(){return this.field(l,"tts_version")}get tuner(){return this.field(nt,"tuner")}get type(){return this.field(l,"type")}get updatedate(){return this.field(f,"updatedate")}get updater(){return this.field(l,"updater")}get uploader(){return this.field(l,"uploader")}get uploadsoftware(){return this.field(l,"uploadsoftware")}get utc_offset(){return this.field(at,"utc_offset")}get venue(){return this.field(l,"venue")}get video_codec(){return this.field(l,"video_codec")}get volume(){return this.field(l,"volume")}get website(){return this.field(l,"website")}get week(){return this.field(u,"week")}get width(){return this.field(u,"width")}get year(){return this.field(u,"year")}field(e,...a){return Q(this.rawMetadata,s=>new e(s),...a)}constructor(e={}){this.rawMetadata=e}}r([i()],o.prototype,"access",null);r([i()],o.prototype,"adder",null);r([i()],o.prototype,"amrc_id",null);r([i()],o.prototype,"archiveit_account_id",null);r([i()],o.prototype,"archiveit_account_organization_name",null);r([i()],o.prototype,"archiveit_collection_id",null);r([i()],o.prototype,"archiveit_collection_name",null);r([i()],o.prototype,"archiveit_job_type",null);r([i()],o.prototype,"audit_time_minutes",null);r([i()],o.prototype,"auditor",null);r([i()],o.prototype,"author",null);r([i()],o.prototype,"autocrop_version",null);r([i()],o.prototype,"bookplateleaf",null);r([i()],o.prototype,"bookreader_defaults",null);r([i()],o.prototype,"boxid",null);r([i()],o.prototype,"camera",null);r([i()],o.prototype,"cameraman",null);r([i()],o.prototype,"canister",null);r([i()],o.prototype,"case_name",null);r([i()],o.prototype,"col_number",null);r([i()],o.prototype,"collection_added",null);r([i()],o.prototype,"collection_library",null);r([i()],o.prototype,"collection_set",null);r([i()],o.prototype,"copyright_holder",null);r([i()],o.prototype,"court",null);r([i()],o.prototype,"crawler",null);r([i()],o.prototype,"crawljob",null);r([i()],o.prototype,"curation",null);r([i()],o.prototype,"dari_title",null);r([i()],o.prototype,"dari_title_romanized",null);r([i()],o.prototype,"date_case_filed",null);r([i()],o.prototype,"date_case_terminated",null);r([i()],o.prototype,"date_created",null);r([i()],o.prototype,"date_last_filing",null);r([i()],o.prototype,"derive_submittime",null);r([i()],o.prototype,"derive_version",null);r([i()],o.prototype,"discs",null);r([i()],o.prototype,"docket_num",null);r([i()],o.prototype,"external_metadata_update",null);r([i()],o.prototype,"fail_reasons",null);r([i()],o.prototype,"filesxml",null);r([i()],o.prototype,"firstfiledate",null);r([i()],o.prototype,"firstfileserial",null);r([i()],o.prototype,"foldoutcount",null);r([i()],o.prototype,"format",null);r([i()],o.prototype,"geo_restricted",null);r([i()],o.prototype,"guid",null);r([i()],o.prototype,"has_mp3",null);r([i()],o.prototype,"height",null);r([i()],o.prototype,"hidden",null);r([i()],o.prototype,"ia_orig__runtime",null);r([i()],o.prototype,"access_restricted_item",null);r([i()],o.prototype,"addeddate",null);r([i()],o.prototype,"aspect_ratio",null);r([i()],o.prototype,"audio_codec",null);r([i()],o.prototype,"audio_sample_rate",null);r([i()],o.prototype,"avg_rating",null);r([i()],o.prototype,"backup_location",null);r([i()],o.prototype,"ccnum",null);r([i()],o.prototype,"closed_captioning",null);r([i()],o.prototype,"collection",null);r([i()],o.prototype,"collections_raw",null);r([i()],o.prototype,"collection_size",null);r([i()],o.prototype,"color",null);r([i()],o.prototype,"contact",null);r([i()],o.prototype,"contributor",null);r([i()],o.prototype,"coverage",null);r([i()],o.prototype,"creator",null);r([i()],o.prototype,"creator_alt_script",null);r([i()],o.prototype,"credits",null);r([i()],o.prototype,"collection_layout",null);r([i()],o.prototype,"date",null);r([i()],o.prototype,"description",null);r([i()],o.prototype,"downloads",null);r([i()],o.prototype,"duration",null);r([i()],o.prototype,"external_identifier",null);r([i()],o.prototype,"external_link",null);r([i()],o.prototype,"files_count",null);r([i()],o.prototype,"frames_per_second",null);r([i()],o.prototype,"identifier_access",null);r([i()],o.prototype,"identifier_ark",null);r([i()],o.prototype,"identifier_bib",null);r([i()],o.prototype,"image_count",null);r([i()],o.prototype,"imagecount",null);r([i()],o.prototype,"indexdate",null);r([i()],o.prototype,"invoice",null);r([i()],o.prototype,"isbn",null);r([i()],o.prototype,"issue",null);r([i()],o.prototype,"issue_count",null);r([i()],o.prototype,"issue_page_count",null);r([i()],o.prototype,"item_count",null);r([i()],o.prototype,"item_size",null);r([i()],o.prototype,"language",null);r([i()],o.prototype,"lastdate",null);r([i()],o.prototype,"lastfiledate",null);r([i()],o.prototype,"lastfileserial",null);r([i()],o.prototype,"length",null);r([i()],o.prototype,"license",null);r([i()],o.prototype,"licenseurl",null);r([i()],o.prototype,"lineage",null);r([i()],o.prototype,"mature_content",null);r([i()],o.prototype,"md5",null);r([i()],o.prototype,"md5contents",null);r([i()],o.prototype,"md5s",null);r([i()],o.prototype,"medium",null);r([i()],o.prototype,"metadata_operator",null);r([i()],o.prototype,"metasource_catalog",null);r([i()],o.prototype,"monochromatic",null);r([i()],o.prototype,"month",null);r([i()],o.prototype,"mediatype",null);r([i()],o.prototype,"mpeg_program",null);r([i()],o.prototype,"next_item",null);r([i()],o.prototype,"noarchivetorrent",null);r([i()],o.prototype,"noindex",null);r([i()],o.prototype,"notes",null);r([i()],o.prototype,"num_favorites",null);r([i()],o.prototype,"num_reviews",null);r([i()],o.prototype,"numeric_id",null);r([i()],o.prototype,"numwarcs",null);r([i()],o.prototype,"ocr",null);r([i()],o.prototype,"ocr_autonomous",null);r([i()],o.prototype,"ocr_detected_lang",null);r([i()],o.prototype,"ocr_detected_lang_conf",null);r([i()],o.prototype,"ocr_detected_script",null);r([i()],o.prototype,"ocr_detected_script_conf",null);r([i()],o.prototype,"ocr_invalid_language",null);r([i()],o.prototype,"ocr_module_version",null);r([i()],o.prototype,"ocr_parameters",null);r([i()],o.prototype,"old_pallet",null);r([i()],o.prototype,"openlibrary_edition",null);r([i()],o.prototype,"openlibrary_work",null);r([i()],o.prototype,"operator",null);r([i()],o.prototype,"originalurl",null);r([i()],o.prototype,"osf_category",null);r([i()],o.prototype,"osf_project",null);r([i()],o.prototype,"osf_registration_doi",null);r([i()],o.prototype,"osf_registration_schema",null);r([i()],o.prototype,"osf_registry",null);r([i()],o.prototype,"osf_subjects",null);r([i()],o.prototype,"osf_tags",null);r([i()],o.prototype,"output_time_minutes",null);r([i()],o.prototype,"pacer_case_num",null);r([i()],o.prototype,"packaging_time_minutes",null);r([i()],o.prototype,"page_number_confidence",null);r([i()],o.prototype,"page_number_module_version",null);r([i()],o.prototype,"page_progression",null);r([i()],o.prototype,"paginated",null);r([i()],o.prototype,"parse_date",null);r([i()],o.prototype,"parse_state",null);r([i()],o.prototype,"partner",null);r([i()],o.prototype,"pashto_title",null);r([i()],o.prototype,"pashto_title_romanized",null);r([i()],o.prototype,"pdf_degraded",null);r([i()],o.prototype,"pdf_module_version",null);r([i()],o.prototype,"pick",null);r([i()],o.prototype,"podcastindexid",null);r([i()],o.prototype,"post_text",null);r([i()],o.prototype,"ppi",null);r([i()],o.prototype,"previous_item",null);r([i()],o.prototype,"program",null);r([i()],o.prototype,"publicdate",null);r([i()],o.prototype,"publisher",null);r([i()],o.prototype,"political_religious_party",null);r([i()],o.prototype,"rcs_key",null);r([i()],o.prototype,"repub_state",null);r([i()],o.prototype,"republisher_date",null);r([i()],o.prototype,"republisher_operator",null);r([i()],o.prototype,"republisher_time",null);r([i()],o.prototype,"reviewdate",null);r([i()],o.prototype,"reviews_allowed",null);r([i()],o.prototype,"ribbon_state",null);r([i()],o.prototype,"ribbon_state_modify_date",null);r([i()],o.prototype,"rights",null);r([i()],o.prototype,"rights_holder",null);r([i()],o.prototype,"rssfeed",null);r([i()],o.prototype,"runtime",null);r([i()],o.prototype,"scan_time_minutes",null);r([i()],o.prototype,"scandate",null);r([i()],o.prototype,"scanfee",null);r([i()],o.prototype,"scanner",null);r([i()],o.prototype,"scanner_operator",null);r([i()],o.prototype,"scanningcenter",null);r([i()],o.prototype,"scribe3_search_catalog",null);r([i()],o.prototype,"scribe3_search_id",null);r([i()],o.prototype,"segments",null);r([i()],o.prototype,"sessionid",null);r([i()],o.prototype,"shndiscs",null);r([i()],o.prototype,"shotlist",null);r([i()],o.prototype,"signal_path",null);r([i()],o.prototype,"size",null);r([i()],o.prototype,"sizehint",null);r([i()],o.prototype,"software_version",null);r([i()],o.prototype,"sort_order",null);r([i()],o.prototype,"sound",null);r([i()],o.prototype,"soundcreator",null);r([i()],o.prototype,"soundtitle",null);r([i()],o.prototype,"source",null);r([i()],o.prototype,"source_pixel_height",null);r([i()],o.prototype,"source_pixel_width",null);r([i()],o.prototype,"source_url",null);r([i()],o.prototype,"sponsor",null);r([i()],o.prototype,"sponsordate",null);r([i()],o.prototype,"start_localtime",null);r([i()],o.prototype,"start_time",null);r([i()],o.prototype,"station_name",null);r([i()],o.prototype,"stop_time",null);r([i()],o.prototype,"subject",null);r([i()],o.prototype,"taper",null);r([i()],o.prototype,"thumbs",null);r([i()],o.prototype,"times",null);r([i()],o.prototype,"title",null);r([i()],o.prototype,"title_alt_script",null);r([i()],o.prototype,"transferer",null);r([i()],o.prototype,"track",null);r([i()],o.prototype,"tts_version",null);r([i()],o.prototype,"tuner",null);r([i()],o.prototype,"type",null);r([i()],o.prototype,"updatedate",null);r([i()],o.prototype,"updater",null);r([i()],o.prototype,"uploader",null);r([i()],o.prototype,"uploadsoftware",null);r([i()],o.prototype,"utc_offset",null);r([i()],o.prototype,"venue",null);r([i()],o.prototype,"video_codec",null);r([i()],o.prototype,"volume",null);r([i()],o.prototype,"website",null);r([i()],o.prototype,"week",null);r([i()],o.prototype,"width",null);r([i()],o.prototype,"year",null);class ue{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return I(this.rawValue,e=>ee.shared.parseValue(e),"reviewdate")}get createdate(){return I(this.rawValue,e=>ee.shared.parseValue(e),"createdate")}get stars(){return I(this.rawValue,e=>C.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}r([i()],ue.prototype,"reviewdate",null);r([i()],ue.prototype,"createdate",null);r([i()],ue.prototype,"stars",null);class Ae{constructor(e){var a,s;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(a=e.files)===null||a===void 0?void 0:a.map(n=>new R(n)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(s=e.reviews)===null||s===void 0?void 0:s.map(n=>new ue(n)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var W;(function(t){t.networkError="MetadataService.NetworkError",t.itemNotFound="MetadataService.ItemNotFound",t.decodingError="MetadataService.DecodingError",t.searchEngineError="MetadataService.SearchEngineError"})(W||(W={}));class $e extends Error{constructor(e,a,s){super(a),this.name=e,this.type=e,this.details=s}}class ut{constructor(e){var a;if(this.baseUrl=(a=e?.baseUrl)!==null&&a!==void 0?a:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const n=new URL(window.location.href).searchParams.get("scope");n&&(this.requestScope=n)}}async fetchMetadata(e,a){const s=a?`/${a}`:"",n=`https://${this.baseUrl}/metadata/${e}${s}`;return this.fetchUrl(n)}async fetchUrl(e,a){var s;const n=new URL(e);this.requestScope&&n.searchParams.set("scope",this.requestScope);let d;try{const c=(s=a?.requestOptions)!==null&&s!==void 0?s:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(n.href,c)}catch(c){const m=c instanceof Error?c.message:typeof c=="string"?c:"Unknown error";return this.getErrorResult(W.networkError,m)}try{const c=await d.json(),m=c.error;if(m){const g=c.forensics;return this.getErrorResult(W.searchEngineError,m,g)}else return{success:c}}catch(c){const m=c instanceof Error?c.message:typeof c=="string"?c:"Unknown error";return this.getErrorResult(W.decodingError,m)}}getErrorResult(e,a,s){return{error:new $e(e,a,s)}}}class Ve{constructor(e){this.backend=e}async fetchMetadata(e){var a;const s=await this.backend.fetchMetadata(e);return s.error?s:((a=s.success)===null||a===void 0?void 0:a.metadata)===void 0?{error:new $e(W.itemNotFound)}:{success:new Ae(s.success)}}async fetchMetadataValue(e,a){var s;const n=await this.backend.fetchMetadata(e,a);return n.error?n:((s=n.success)===null||s===void 0?void 0:s.result)===void 0?{error:new $e(W.itemNotFound)}:{success:n.success.result}}}Ve.default=new Ve(new ut);const k=t=>p`
  <span
    class="ia-icon"
    aria-hidden="true"
    style='-webkit-mask-image:url("${t}");mask-image:url("${t}");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain;display:inline-block'
  ></span>
`,pt="data:image/svg+xml,%3csvg%20viewBox='0%200%2040%2040'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20fill-rule='evenodd'%20d='m10.5%2017.5c1.3807119%200%202.5%201.1192881%202.5%202.5s-1.1192881%202.5-2.5%202.5c-1.38071187%200-2.5-1.1192881-2.5-2.5s1.11928813-2.5%202.5-2.5zm9.5%200c1.3807119%200%202.5%201.1192881%202.5%202.5s-1.1192881%202.5-2.5%202.5-2.5-1.1192881-2.5-2.5%201.1192881-2.5%202.5-2.5zm9.5%200c1.3807119%200%202.5%201.1192881%202.5%202.5s-1.1192881%202.5-2.5%202.5-2.5-1.1192881-2.5-2.5%201.1192881-2.5%202.5-2.5z'%20/%3e%3c/svg%3e",ht="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20fill-rule='evenodd'%20d='m9%200c4.9705627%200%209%204.02943725%209%209%200%204.9705627-4.0294373%209-9%209-4.97056275%200-9-4.0294373-9-9%200-4.97056275%204.02943725-9%209-9zm1.6976167%205.28352881c-.365258-.3556459-.9328083-.37581056-1.32099801-.06558269l-.09308988.0844372-3%203.08108108-.08194436.09533317c-.27484337.36339327-.26799482.87009349.01656959%201.22592581l.084491.09308363%203%202.91891889.09533796.0818904c.3633964.2746544.8699472.2677153%201.2256839-.0167901l.093059-.0844712.0818904-.095338c.2746544-.3633964.2677153-.8699472-.0167901-1.2256839l-.0844712-.093059-2.283355-2.2222741%202.3024712-2.36338332.0819252-.09530804c.2997677-.39632298.2644782-.96313393-.1007797-1.31877983z'%20/%3e%3c/svg%3e",mt=k(pt),Fe=k(ht);var gt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,H=(t,e,a,s)=>{for(var n=s>1?void 0:s?ft(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&gt(e,a,n),n};let B=class extends T{constructor(){super(...arguments),this.icon="",this.href="",this.label="",this.menuDetails="",this.buttonId="",this.selected=!1,this.followable=!1}onClick(t){t.preventDefault(),this.dispatchMenuTypeSelectedEvent()}dispatchMenuTypeSelectedEvent(){this.dispatchEvent(new CustomEvent("menuTypeSelected",{bubbles:!0,composed:!0,detail:{id:this.buttonId}}))}get iconClass(){return this.selected?"active":""}get menuItem(){return p`
      <span
        class="icon ${this.iconClass}"
        aria-hidden="true"
        title=${this.label}
        >${this.icon}</span
      >
      <span class="label">${this.label}</span>
      <span class="menu-details">${this.menuDetails}</span>
    `}get linkButton(){return p`
      <a
        href=${this.href}
        class="menu-item"
        aria-label=${this.label}
        aria-expanded=${Xe(this.followable?void 0:this.selected)}
        @click=${this.followable?void 0:this.onClick}
        >${this.menuItem}</a
      >
    `}get clickButton(){return p`
      <button
        class="menu-item"
        aria-label=${this.label}
        aria-expanded=${this.selected}
        @click=${this.onClick}
      >
        ${this.menuItem}
      </button>
    `}render(){return this.href?this.linkButton:this.clickButton}static get styles(){return[N,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-menu-button-label-display--: var(
            --item-navigator-menu-button-label-display,
            none
          );
          --item-navigator-icon-inactive-color--: var(
            --item-navigator-icon-inactive-color,
            var(--lighter-gray)
          );
          --item-navigator-icon-active-color--: var(
            --item-navigator-icon-active-color,
            var(--item-navigator-text-color--)
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-icon-size--: var(--item-navigator-icon-size, 2.4em);

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        a {
          display: inline-block;
          text-decoration: none;
        }

        button.menu-item {
          -webkit-appearance: none;
          appearance: none;
          /* Inherit font-size so the em-sized icon/label resolve against the
             component base rather than the UA default button font-size. */
          font: inherit;
        }

        .menu-item {
          display: inline-flex;
          width: 100%;
          padding: 0;
          text-align: left;
          background: transparent;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .label {
          display: var(--item-navigator-menu-button-label-display--);
          padding: 0;
          font-size: 1.6em;
          font-weight: 400;
          color: var(--item-navigator-text-color--);
          text-align: left;
          vertical-align: middle;
          margin-left: 1em;
        }

        .menu-details {
          color: var(--item-navigator-text-color--);
          display: inline-block;
          margin-left: 0.5em;
          font-style: italic;
          font-size: 1.5em;
        }

        .menu-item > .icon {
          position: relative;
          display: inline-flex;
          min-width: 4.2em;
          max-width: 4.2em;
          height: 4.2em;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }

        .menu-item > .icon > * {
          /* Prevent tooltip containing icon literal description */
          pointer-events: none;
        }

        /* Size the glyph within the icon box to match the shortcut-rail
           icons, rather than letting the svg fill the whole box. */
        .menu-item > .icon .ia-icon {
          width: var(--item-navigator-icon-size--);
          height: var(--item-navigator-icon-size--);
        }

        /* The open entry's icon shares the panel's background and rounds into
           it, so it has to sit above the panel to read as one shape. The rest
           stay below: they have no background of their own, so the panel would
           slide visibly behind them. */
        .menu-item[aria-expanded='true'] .icon {
          z-index: 2;
          background-color: var(--item-navigator-active-button-bg--);
          border-radius: 1em 0 0 1em;
        }

        /* Our glyphs are masked spans: the mask supplies the shape, these
           supply the paint. */
        .icon span.ia-icon {
          background-color: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active span.ia-icon {
          background-color: var(--item-navigator-icon-active-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .icon .fill-color {
          fill: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active .fill-color {
          fill: var(--item-navigator-icon-active-color--);
        }
      `]}};B.shadowRootOptions={...T.shadowRootOptions,delegatesFocus:!0};H([h({type:Object})],B.prototype,"icon",2);H([h({type:String})],B.prototype,"href",2);H([h({type:String})],B.prototype,"label",2);H([h({type:Object})],B.prototype,"menuDetails",2);H([h({type:String})],B.prototype,"buttonId",2);H([h({type:Boolean})],B.prototype,"selected",2);H([h({type:Boolean})],B.prototype,"followable",2);B=H([A("ia-itemnav-menu-button")],B);var vt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,X=(t,e,a,s)=>{for(var n=s>1?void 0:s?bt(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&vt(e,a,n),n};const Ie={closeDrawer:"menuSliderClosed",closePanel:"menuPanelClosed"};let U=class extends T{constructor(){super(...arguments),this.menus=[],this.selectedMenu="",this.selectedMenuAction=z,this.isFirstRender=!0}updated(t){const e=this.selectedMenuDetails?.actionButton||z;e!==this.selectedMenuAction&&(this.selectedMenuAction=e),!this.isFirstRender&&t.has("selectedMenu")&&this.moveFocusForSelection(t.get("selectedMenu")),this.isFirstRender=!1}moveFocusForSelection(t){this.selectedMenu?this.panel?.focus():t&&this.menuButtonFor(t)?.focus()}menuButtonFor(t){return[...this.menuList?.querySelectorAll("ia-itemnav-menu-button")??[]].find(a=>a.buttonId===t)}focusDrawer(){if(this.selectedMenu){this.panel?.focus();return}(this.menuList?.querySelector("ia-itemnav-menu-button")??this.drawerCloseButton)?.focus()}closeMenu(){this.dispatchEvent(new CustomEvent(Ie.closeDrawer,{detail:this.selectedMenuDetails}))}closePanel(){this.dispatchEvent(new CustomEvent(Ie.closePanel,{detail:{id:this.selectedMenu}}))}handleKeyDown(t){t.key==="Escape"&&(t.preventDefault(),this.selectedMenu?this.closePanel():this.closeMenu())}get selectedMenuDetails(){return this.menus.find(t=>t.id===this.selectedMenu)}get selectedMenuClass(){return this.selectedMenu?"open":""}get menuItems(){return this.menus.map(t=>p`
        <li>
          <ia-itemnav-menu-button
            .icon=${t.icon}
            .label=${t.label}
            .menuDetails=${t.menuDetails||""}
            .buttonId=${t.id}
            .selected=${t.id===this.selectedMenu}
            .followable=${t.followable||!1}
            .href=${t.href||""}
          ></ia-itemnav-menu-button>
        </li>
      `)}get renderMenuHeader(){const{label:t="",menuDetails:e=""}=this.selectedMenuDetails||{},a=this.selectedMenuAction!==z,s=a?"with-secondary-action":"",n=a?p`<span class="custom-action">${this.selectedMenuAction}</span>`:z,d=t?`Close ${t}`:"Close this panel";return p`
      <header class=${s}>
        <div class="details">
          <h3 id="panel-title">${t}</h3>
          <span class="extra-details">${e}</span>
        </div>
        ${n}
        <button
          class="close"
          aria-label=${d}
          title=${d}
          @click=${this.closePanel}
        >
          ${Fe}
        </button>
      </header>
    `}get closeButton(){return p`
      <button
        class="close"
        aria-label="Close navigation"
        title="Close navigation"
        @click=${this.closeMenu}
      >
        ${Fe}
      </button>
    `}render(){const t=!!this.selectedMenu;return p`
      <div class="main" @keydown=${this.handleKeyDown}>
        <div class="menu">
          ${this.closeButton}
          <ul class="menu-list" role="list">
            ${this.menuItems}
          </ul>
          <!-- Closed panels are inert so the tab order and the accessibility
               tree agree with what is on screen; the slide is a consequence
               of the class, not something to wait on. -->
          <div
            class="content ${this.selectedMenuClass}"
            role="region"
            aria-labelledby="panel-title"
            tabindex="-1"
            ?inert=${!t}
          >
            ${this.renderMenuHeader}
            <section>
              <div class="selected-menu">
                ${this.selectedMenuDetails?.component||z}
              </div>
            </section>
          </div>
        </div>
      </div>
    `}static get styles(){const t=_`42px`,e=_`var(--item-navigator-menu-width--)`,a=_`var(--item-navigator-animation-timing--)`;return[N,_`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-menu-slider-bg--: var(
            --item-navigator-menu-slider-bg,
            #212121
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-header-icon-size--: var(
            --item-navigator-header-icon-size,
            2em
          );
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color--)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        .main {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        /* The drawer's own slide is owned by the navigator's #menu; this just
           fills it. */
        .menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${e};
          padding: 0.5em 0.5em 0 0;
          box-sizing: border-box;
          font-size: 1.4em;
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-menu-slider-bg--);
        }

        button {
          cursor: pointer;
        }

        header {
          margin: 0 0 0.5em 0;
        }

        header * {
          margin: 0;
          display: inline-block;
        }

        header button {
          cursor: pointer;
        }

        header.with-secondary-action .details {
          width: 80%;
        }

        header .details {
          font-weight: bold;
          width: 88%;
        }

        header .custom-action > *,
        button.close {
          padding: 0;
          background-color: transparent;
          border: 0;
        }

        header .custom-action,
        button.close {
          position: absolute;
        }

        button.close {
          /* Reset to the base so the header icon (em) doesn't compound
             against .menu's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size--);
          min-width: 38px;
          min-height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          top: 0;
        }

        button.close .ia-icon {
          width: var(--item-navigator-header-icon-size--);
          height: var(--item-navigator-header-icon-size--);
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        .content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: ${t};
          z-index: 1;
          transform: translateX(calc(${e} * -1));
          transition: var(
            --item-navigator-panel-transition--,
            transform ${a} ease-out
          );
          background: var(--item-navigator-active-button-bg--);
          border-right: 0.2em solid;
          border-color: var(--item-navigator-border-color--);
          padding: 0.5em 0 0 0.5em;
          display: flex;
          flex-direction: column;
        }

        .content.open {
          transform: translateX(0);
        }

        .content:focus {
          outline: none;
        }

        .menu-list {
          padding: 0;
          margin: 0;
          list-style: none;
          background: var(--item-navigator-menu-slider-bg--);
        }

        .menu-list li {
          margin-bottom: 0.2em;
        }

        .content > section {
          overflow: auto;
          overscroll-behavior: contain;
        }
      `]}};X([h({type:Array})],U.prototype,"menus",2);X([h({type:String})],U.prototype,"selectedMenu",2);X([h({type:Object})],U.prototype,"selectedMenuAction",2);X([J(".content")],U.prototype,"panel",2);X([J(".menu-list")],U.prototype,"menuList",2);X([J(".menu > button.close")],U.prototype,"drawerCloseButton",2);U=X([A("ia-itemnav-menu-slider")],U);var yt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,Re=(t,e,a,s)=>{for(var n=s>1?void 0:s?_t(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&yt(e,a,n),n};let ze=class extends T{constructor(){super(...arguments),this.loaderMessage=""}get bookIconSvg(){return Oe`
      <g class="bookIcon" transform="matrix(1 0 0 -1 28 67.362264)">
        <path d="m44.71698 31.6981124v-29.99320678s-18.0956599.30735848-18.6322637-.7171698c-.0633962-.12226414-1.890566-.59207545-2.9745282-.59207545-1.3228302 0-3.5122641 0-4.1286791.74547168-.9707547 1.17452827-18.82811278.71660375-18.82811278.71660375v30.040754l1.83849052.7867924.29094339-28.48188608s15.94981097.15339622 17.09094297-1.10716978c.8145283-.90056602 4.997547-.91641507 5.3450942-.3526415.9611321 1.55716977 14.7101883 1.31716978 17.6077354 1.45981128l.3266038 28.22830118z"/>
        <path d="m40.1129424 33.5957539h-12.8337733c-1.8690565 0-3.1098112-.7545283-3.9299999-1.6279245v-26.70452764l1.2362264-.00792453c.4584906.72962262 3.0922641 1.39415091 3.0922641 1.39415091h10.1298111s1.0381131.01754717 1.5141509.47377357c.5643396.54056602.7913207 1.36981129.7913207 1.36981129z"/>
        <path d="m17.3354713 33.5957539h-12.8337733v-25.37660316s0-.75283017.49358489-1.14113205c.52867924-.41433961 1.3415094-.42849055 1.3415094-.42849055h10.59905631s2.2075471-.52698112 3.0928301-1.39415091l1.2.00792453v26.74245214c-.8201886.8581132-2.0530188 1.59-3.8932074 1.59"/>
      </g>
    `}get icon(){return this.bookIconSvg}get loader(){return Oe`
    <svg
      height="100"
      viewBox="0 0 100 100"
      width="100"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="item-loading"
    >
      <title id="item-loading">Currently loading viewer.</title>
      <desc>Please wait while we load theater.</desc>
      <g fill-rule="evenodd" class="book-icon">
        ${this.icon}
        <path
          class="ring"
          d="m17.8618849 11.6970233c18.5864635-15.59603144 45.6875867-15.59603102 64.2740497.000001 1.9271446 1.6170806 2.1785128 4.4902567.5614466 6.4174186-1.6170661 1.9271618-4.4902166 2.1785323-6.4173612.5614517-15.1996922-12.75416882-37.3625282-12.75416916-52.5622206-.000001-15.19969387 12.7541707-19.04823077 34.5805019-9.1273354 51.7641499 9.9208955 17.183646 30.7471499 24.7638499 49.3923323 17.9774983 18.6451823-6.7863521 29.7266014-25.9801026 26.2811129-45.5206248-.436848-2.4775114 1.2174186-4.8400696 3.6949079-5.2769215 2.4774893-.4368518 4.8400264 1.2174296 5.2768744 3.694941 4.2132065 23.8945096-9.3373563 47.3649806-32.137028 55.6634567-22.799672 8.2984758-48.2663986-.9707372-60.39785211-21.9832155-12.1314534-21.012481-7.42539173-47.7021198 11.16107351-63.2981544z"
          fill-rule="nonzero"
        />
      </g>
    </svg>
    `}render(){const t=this.loaderMessage?p`<h2>${this.loaderMessage}</h2>`:z;return p`
      <div class="place-holder">
        ${t} ${this.loader}
        <h3>Loading viewer</h3>
      </div>
    `}static get styles(){return[N,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        .place-holder {
          width: 30%;
          margin: auto;
          text-align: center;
          color: var(--item-navigator-text-color--);
          position: relative;
        }

        .place-holder svg {
          display: block;
          width: 60%;
          max-width: 100px;
          height: auto;
          margin: auto;
        }

        svg * {
          fill: var(--item-navigator-text-color--);
        }

        svg .ring {
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
          display: block; /* transform won't work on inline style */
        }

        @keyframes rotate {
          0% {
            transform: rotate(-360deg);
          }
        }
      `]}};Re([h({type:String})],ze.prototype,"loaderMessage",2);ze=Re([A("ia-itemnav-loading-view")],ze);var wt=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,Ue=(t,e,a,s)=>{for(var n=s>1?void 0:s?xt(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&wt(e,a,n),n};let ke=class extends T{constructor(){super(...arguments),this.identifier=""}emitLoaded(){this.dispatchEvent(new CustomEvent("loadingStateUpdated",{detail:{loaded:!0}}))}updated(t){t.has("identifier")&&this.emitLoaded()}get downloadUrl(){return`/download/${this.identifier}`}render(){return p`
      <section>
        <h2>THERE IS NO PREVIEW AVAILABLE FOR THIS ITEM</h2>
        <p>
          This item does not appear to have any files that can be experienced on
          Archive.org. <br />
          Please download files in this item to interact with them on your
          computer.
        </p>
        <a href=${this.downloadUrl}>Show all files</a>
      </section>
    `}static get styles(){return[N,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          color: var(--item-navigator-text-color--);
          text-align: center;
          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        section {
          width: 100%;
          margin: 5%;
          padding: 0 5%;
        }

        p {
          font-size: 1.4em;
        }

        a {
          color: var(--item-navigator-text-color--);
          background-color: var(--navy-blue);
          min-height: 35px;
          cursor: pointer;
          line-height: normal;
          border-radius: 0.4em;
          text-align: center;
          vertical-align: middle;
          font-size: 1.4em;
          font-family: var(--base-font-family);
          display: inline-block;
          padding: 0.85em 1.2em;
          border: 1px solid var(--lightest-gray);
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          user-select: none;
          text-decoration: none;
        }
      `]}};Ue([h({type:String})],ke.prototype,"identifier",2);ke=Ue([A("ia-itemnav-no-theater-available")],ke);var $t=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,w=(t,e,a,s)=>{for(var n=s>1?void 0:s?zt(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&$t(e,a,n),n};let y=class extends T{constructor(){super(...arguments),this.viewAvailable=!0,this.baseHost="archive.org",this.signedIn=!1,this.menuContents=[],this.menuShortcuts=[],this.viewportInFullscreen=null,this.menuOpened=!1,this.loaded=!1,this.openMenuState="shift",this.drawerEntering=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeResizeObserver()}updated(t){t.has("sharedObserver")&&(t.get("sharedObserver")?.removeObserver(this.resizeObserverConfig),this.setResizeObserver())}handleResize(t){const{width:e}=t.contentRect;if(e<=600){this.openMenuState="overlay";return}this.openMenuState="shift"}setResizeObserver(){this.sharedObserver?.addObserver(this.resizeObserverConfig),this.sharedObserver?.addObserver({target:this.headerSlot,handler:{handleResize:({contentRect:t})=>{t.height&&this.requestUpdate()}}})}removeResizeObserver(){this.sharedObserver?.removeObserver(this.resizeObserverConfig)}get resizeObserverConfig(){return{handler:this,target:this.frame}}get loaderTitle(){return this.viewportInFullscreen?"Internet Archive":""}get loadingArea(){return p`
      <div class="loading-area">
        <div class="loading-view">
          <ia-itemnav-loading-view
            .loaderMessage=${this.loaderTitle}
          ></ia-itemnav-loading-view>
        </div>
      </div>
    `}slotChange(t,e){const a=t.target.assignedNodes()?.[0];this.dispatchEvent(new CustomEvent("slotChange",{detail:{slot:a,type:e}})),this.requestUpdate()}render(){const t=this.loaded?"":"hidden",e=this.headerSlot?.assignedNodes()[0]?.offsetHeight||0;return p`
      <div id="frame" class=${this.menuClass}>
        <slot
          name="header"
          style=${`height: ${e}px`}
          @slotchange=${a=>this.slotChange(a,"header")}
        ></slot>
        <div class="menu-and-reader">
          ${this.shouldRenderMenu?this.renderSideMenu:z}
          <div id="reader" class=${t}>
            ${this.renderViewport}
          </div>
          ${this.loaded?z:this.loadingArea}
        </div>
      </div>
    `}get noTheaterView(){return p`<ia-itemnav-no-theater-available
      .identifier=${this.item?.metadata?.identifier}
      @loadingStateUpdated=${this.loadingStateUpdated}
    ></ia-itemnav-no-theater-available>`}get renderViewport(){if(!this.viewAvailable)return this.noTheaterView;const t=this.loaded?"opacity: 1;":"opacity: 0;";return p`
      <div slot="main" style=${t}>
        <slot
          name="main"
          @slotchange=${e=>this.slotChange(e,"main")}
        ></slot>
      </div>
    `}loadingStateUpdated(t){const{loaded:e}=t.detail;this.loaded=e??!1}manageViewportFullscreen(t){const e=!!t.detail.isFullScreen;this.viewportInFullscreen=e||null;const a=new CustomEvent("fullscreenToggled",{detail:t.detail});this.dispatchEvent(a)}get shouldRenderMenu(){return!!this.menuContents?.length}toggleMenu(t=void 0){this.drawerEntering=!1,this.menuOpened=t!==void 0?t:!this.menuOpened,this.moveFocusForDrawer()}moveFocusForDrawer(){this.updateComplete.then(()=>{this.menuOpened?this.menuSlider?.focusDrawer():this.toggleMenuButton?.focus()})}closeMenu(){this.openMenu=void 0,this.toggleMenu(!1)}setOpenMenu(t){this.drawerEntering=!1;const{id:e}=t.detail;this.openMenu=e!==this.openMenu?e:void 0}closeSidePanel(){this.drawerEntering=!1,this.openMenu=void 0}setMenuContents(t){const e=[...t.detail];this.menuContents=e}setMenuShortcuts(t){this.menuShortcuts=[...t.detail]}manageSideMenuEvents(t){const{menuId:e,action:a}=t.detail;e&&(a==="open"?this.openShortcut(e):a==="toggle"&&(this.openMenu=e,this.toggleMenu()))}get menuToggleButton(){const t=this.menuOpened?"Close side panel":"Open side panel";return p`
      <button
        class="toggle-menu"
        @click=${()=>this.toggleMenu()}
        title=${t}
        aria-label=${t}
        aria-expanded=${this.menuOpened}
        aria-controls="menu"
      >
        ${mt}
      </button>
    `}get selectedMenuId(){return this.openMenu||""}get renderSideMenu(){return p`
      <nav aria-label="Item navigation">
        <div
          class="minimized ${We({hidden:this.menuOpened})}"
          part="minimized-menu"
        >
          ${this.shortcuts} ${this.menuToggleButton}
        </div>
        <!-- Closed drawers are inert, so what is off-screen is also out of
             the tab order and the accessibility tree. -->
        <div
          id="menu"
          role="group"
          aria-label="Item navigation menu"
          ?inert=${!this.menuOpened}
        >
          <ia-itemnav-menu-slider
            .menus=${this.menuContents}
            .selectedMenu=${this.selectedMenuId}
            @menuTypeSelected=${this.setOpenMenu}
            @menuPanelClosed=${this.closeSidePanel}
            @menuSliderClosed=${this.closeMenu}
          ></ia-itemnav-menu-slider>
        </div>
      </nav>
    `}openShortcut(t=""){this.drawerEntering=!this.menuOpened,this.openMenu=t,this.menuOpened=!0,this.moveFocusForDrawer()}get shortcuts(){const t=this.menuShortcuts.map(({icon:e,id:a,label:s})=>a==="fullscreen"?p`${e}`:p`
        <li>
          <button
            class="shortcut ${a}"
            @click=${()=>this.openShortcut(a)}
            title=${s}
            aria-label=${s}
            aria-expanded=${this.menuOpened&&this.openMenu===a}
          >
            ${e}
          </button>
        </li>
      `);return p`<ul class="shortcuts" role="list">
      ${t}
    </ul>`}get menuClass(){const t=this.menuContents?.length||this.menuShortcuts?.length,e=this.menuOpened&&t?"open":"",a=this.viewportInFullscreen?"fullscreen":"",s=this.shouldRenderMenu?"has-menu":"",n=this.drawerEntering?"drawer-entering":"";return`${e} ${a} ${s} ${n} ${this.openMenuState}`}static get styles(){const t=_`var(--item-navigator-menu-width--)`,e=_`var(--item-navigator-animation-timing--)`,a=_`transform ${e} ease-out`,s=_`var(--item-navigator-menu-margin--)`,n=_`var(--item-navigator-theater-bg-color--)`,d=_`var(--item-navigator-icon-size--)`;return[N,_`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-menu-margin--: var(
            --item-navigator-menu-margin,
            42px
          );
          --item-navigator-theater-bg-color--: var(
            --item-navigator-theater-bg-color,
            #000
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-icon-size--: var(--item-navigator-icon-size, 2.4em);
          /* Icons follow the adjustable text color by default. */
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color, var(--true-white))
          );

          /*
           * The component's internal sizing is expressed in em against this
           * base (10px matches petabox's base font size, which the upstream
           * demo set on the document root). Anchoring it here makes the
           * navigator self-contained — its scale no longer depends on the
           * consumer's root font-size. Override to rescale everything.
           */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        :host,
        #frame,
        .menu-and-reader {
          position: relative;
          overflow: hidden;
          display: block;
        }

        :host,
        #frame,
        .loading-area,
        .loading-view {
          min-height: inherit;
          height: inherit;
        }

        slot {
          display: block;
          width: 100%;
        }

        slot * {
          display: block;
          height: inherit;
        }

        #frame {
          background-color: ${n};
          color-scheme: dark;
          display: flex;
          flex-direction: column;
        }

        #frame.fullscreen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9;
          /*
           * Override the inherited height/min-height from the base #frame rule:
           * on a fixed element an explicit height wins over top/bottom, so the
           * inset (0 on all sides) can't fill the viewport unless height is
           * released back to auto.
           */
          height: auto;
          min-height: 0;
        }

        .loading-view {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-area {
          width: 100%;
        }

        ia-itemnav-loading-view {
          display: block;
          width: 100%;
        }

        .hidden {
          display: none !important;
        }

        button {
          /* Buttons don't inherit font-size from the UA stylesheet; inherit it
             so em-sized icons resolve against the component's base, not the
             browser's default button font-size. */
          font: inherit;
          cursor: pointer;
          padding: 0;
          border: 0;
        }

        .menu-and-reader {
          position: relative;
          display: flex;
          flex: 1;
        }

        nav button {
          background: none;
        }

        nav .minimized {
          background: rgba(0, 0, 0, 0.7);
          padding-top: 6px;
          position: absolute;
          width: ${s};
          z-index: 2;
          left: 0;
          border-bottom-right-radius: 5%;
        }

        nav .minimized button {
          margin-bottom: 0.2em;
          margin: auto;
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          width: ${s};
          height: ${s};
        }

        nav .minimized button > * {
          /** Prevent the icon's SVG description from stealing tooltip message */
          pointer-events: none;
        }

        nav .minimized button.toggle-menu > * {
          border: 2px solid var(--item-navigator-icon-color--);
          border-radius: ${d};
          width: ${d};
          height: ${d};
          margin: auto;
        }

        /* The rail is a list for assistive tech; strip the list chrome so it
           still reads as a row of icons. */
        .shortcuts,
        .shortcuts li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toggle-menu .ia-icon,
        .shortcuts .ia-icon {
          width: ${d};
          height: ${d};
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        #menu {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          overflow: hidden;
          width: ${t};
          transform: translateX(calc(${t} * -1));
          transition: ${a};
        }

        #reader {
          position: relative;
          z-index: 1;
          transform: translateX(0);
          width: 100%;
          display: flex;
          /*
           * Ease the reader's size/position changes so the slotted theater
           * glides in sync with the sliding drawer (shift mode) and settles
           * smoothly on resize, rather than snapping. Overlay mode opts out
           * below so the full-width theater tracks resizes instantly.
           */
          transition:
            width ${e} ease-out,
            margin-left ${e} ease-out,
            transform ${e} ease-out;
        }

        #reader > * {
          width: 100%;
          display: flex;
          flex: 1;
        }

        /*
         * The minimized rail floats over the frame's left edge while the drawer
         * is closed, so pad the theater content by its width to avoid overlap.
         * This lives on the reader's content (not the reader box) and isn't
         * transitioned, so it snaps away on open — letting the reader box track
         * the drawer's edge exactly during the shift, rather than trailing it.
         */
        .has-menu:not(.open) #reader > * {
          box-sizing: border-box;
          padding-left: ${s};
        }

        .open.overlay #reader {
          transition: none;
        }

        /* Opening straight to a panel is one movement. The panel is nested in
           #menu, so its own slide would compose with the drawer's transform
           and send it twice the distance in the same time — arriving late and
           travelling at double speed. Holding it still lets the drawer carry
           it in. */
        .drawer-entering #menu {
          --item-navigator-panel-transition--: none;
        }

        .open #menu {
          width: ${t};
          transform: translateX(0);
          transition: ${a};
        }

        .open.shift #reader {
          width: calc(100% - ${t});
          margin-left: ${t};
        }
      `]}};w([h({type:Object,converter:t=>t&&typeof t=="string"?new Ae(JSON.parse(atob(t))):t})],y.prototype,"item",2);w([h({type:Boolean,reflect:!0})],y.prototype,"viewAvailable",2);w([h({type:String})],y.prototype,"baseHost",2);w([h({type:Boolean})],y.prototype,"signedIn",2);w([h({type:Array})],y.prototype,"menuContents",2);w([h({type:Array})],y.prototype,"menuShortcuts",2);w([h({type:Boolean,reflect:!0,attribute:!0})],y.prototype,"viewportInFullscreen",2);w([h({type:Boolean,reflect:!0})],y.prototype,"menuOpened",2);w([h({type:String,reflect:!0})],y.prototype,"openMenu",2);w([h({attribute:!1})],y.prototype,"sharedObserver",2);w([h({type:Boolean,reflect:!0,attribute:!0})],y.prototype,"loaded",2);w([V()],y.prototype,"openMenuState",2);w([V()],y.prototype,"drawerEntering",2);w([J("#frame")],y.prototype,"frame",2);w([J('slot[name="header"]')],y.prototype,"headerSlot",2);w([J("ia-itemnav-menu-slider")],y.prototype,"menuSlider",2);w([J("button.toggle-menu")],y.prototype,"toggleMenuButton",2);y=w([A("ia-item-navigator")],y);const Be=(t,e,a)=>{const s=new Map;for(let n=e;n<=a;n++)s.set(t[n],n);return s},kt=Ne(class extends He{constructor(t){if(super(t),t.type!==je.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,a){let s;a===void 0?a=e:e!==void 0&&(s=e);const n=[],d=[];let c=0;for(const m of t)n[c]=s?s(m,c):c,d[c]=a(m,c),c++;return{values:d,keys:n}}render(t,e,a){return this.dt(t,e,a).values}update(t,[e,a,s]){const n=Ke(t),{values:d,keys:c}=this.dt(e,a,s);if(!Array.isArray(n))return this.ut=c,d;const m=this.ut??=[],g=[];let O,Z,v=0,x=n.length-1,b=0,S=d.length-1;for(;v<=x&&b<=S;)if(n[v]===null)v++;else if(n[x]===null)x--;else if(m[v]===c[b])g[b]=j(n[v],d[b]),v++,b++;else if(m[x]===c[S])g[S]=j(n[x],d[S]),x--,S--;else if(m[v]===c[S])g[S]=j(n[v],d[S]),ie(t,g[S+1],n[v]),v++,S--;else if(m[x]===c[b])g[b]=j(n[x],d[b]),ie(t,n[v],n[x]),x--,b++;else if(O===void 0&&(O=Be(c,b,S),Z=Be(m,v,x)),O.has(m[v]))if(O.has(m[x])){const D=Z.get(c[b]),he=D!==void 0?n[D]:null;if(he===null){const Se=ie(t,n[v]);j(Se,d[b]),g[b]=Se}else g[b]=j(he,d[b]),ie(t,n[v],he),n[D]=null;b++}else me(n[x]),x--;else me(n[v]),v++;for(;b<=S;){const D=ie(t,g[S+1]);j(D,d[b]),g[b++]=D}for(;v<=x;){const D=n[v++];D!==null&&me(D)}return this.ut=c,Je(t,g),qe}}),St="data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m9.83536396%200h10.07241114c.1725502.47117517.3378411.76385809.4958725.87804878.1295523.11419069.3199719.1998337.5712586.25692905.2512868.05709534.4704647.08564301.6575337.08564301h.2806036v15.24362526h-4.3355343v3.8106985h-4.44275v3.7250554h-12.01318261c-.27306495%200-.50313194-.085643-.69020098-.256929-.18706903-.1712861-.30936193-.3425721-.36687867-.5138581l-.06449694-.2785477v-14.2159091c0-.32815965.08627512-.5922949.25882537-.79240577.17255024-.20011086.34510049-.32150776.51765073-.36419068l.25882537-.0640244h3.36472977v-2.54767184c0-.31374722.08627513-.57067627.25882537-.77078714.17255025-.20011086.34510049-.32150776.51765074-.36419068l.25882536-.06402439h3.36472978v-2.56929047c0-.32815964.08627512-.5922949.25882537-.79240576.17255024-.20011087.34510049-.31430156.51765073-.34257207zm10.78355264%2015.6294346v-13.53076498c-.2730649-.08536585-.4456152-.16380266-.5176507-.23531042-.1725502-.1424612-.2730649-.27078714-.3015441-.38497783v13.36031043h-9.87808272c0%20.0144124-.02149898.0144124-.06449694%200-.04299795-.0144124-.08962561.006929-.13988296.0640244-.05025735.0570953-.07538603.1427383-.07538603.256929s.02149898.210643.06449694.289357c.04299795.078714.08599591.1322062.12899387.1604767l.06449693.0216187h10.71905571zm-10.2449613-2.4412417h7.98003v-11.60421286h-7.98003zm1.6827837-9.41990022h4.6153002c.1725502%200%20.3199718.05349224.4422647.16047672s.1834393.23891353.1834393.39578714c0%20.15687362-.0611464.28519956-.1834393.38497783s-.2697145.1496674-.4422647.1496674h-4.6153002c-.1725503%200-.3199719-.04988913-.4422647-.1496674-.1222929-.09977827-.1834394-.22810421-.1834394-.38497783%200-.15687361.0611465-.28880266.1834394-.39578714.1222928-.10698448.2697144-.16047672.4422647-.16047672zm-6.08197737%2013.50997782h7.72120467v-.8131929h-3.79610541c-.27306495%200-.49950224-.085643-.67931188-.256929-.17980964-.1712861-.29847284-.3425721-.35598958-.5138581l-.06449694-.2785477v-10.02023282h-2.82530086zm6.77217827-11.36890243h3.2139578c.1295522%200%20.240956.05709534.3342113.17128603.0932554.11419069.139883.24972284.139883.40659645%200%20.15687362-.0466276.28880267-.139883.39578714-.0932553.10698448-.2046591.16047672-.3342113.16047672h-3.2139578c-.1295523%200-.2373264-.05349224-.3233223-.16047672-.0859959-.10698447-.1289938-.23891352-.1289938-.39578714%200-.15687361.0429979-.29240576.1289938-.40659645s.19377-.17128603.3233223-.17128603zm-11.15043132%2015.11557653h7.69942646v-.7491685h-3.79610539c-.25854616%200-.48135376-.0892462-.66842279-.2677384-.18706904-.1784922-.30936193-.3605876-.36687868-.546286l-.06449694-.2569291v-10.04101994h-2.80352266zm14.62237682-4.5606985h-.8191949v2.1410754h-9.89986085s-.04299796.0285477-.12899387.085643c-.08599592.0570954-.12201369.1427384-.10805331.2569291%200%20.1141906.01786928.210643.05360784.289357.03573856.0787139.07538603.125.1189424.138858l.06449694.0432373h10.71905575v-2.9542683zm-4.3991936%203.8106985h-.8191949v2.077051h-9.8563045c0%20.0144124-.02149898.0144124-.06449694%200-.04299795-.0144125-.08962561.0105321-.13988296.0748337-.05025735.0643015-.07538603.1607538-.07538603.289357%200%20.1141906.02149898.2070399.06449694.2785476.04299795.0715078.08599591.1141907.12899387.1280488l.06449693.0216186h10.69811519v-2.8686252z'%20/%3e%3c/svg%3e";var Ot=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,re=(t,e,a,s)=>{for(var n=s>1?void 0:s?Ct(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&Ot(e,a,n),n};const Te=k(St);let K=class extends T{constructor(){super(...arguments),this.baseHost="archive.org",this.sortOrderBy="default",this.subPrefix="",this.fileList=[],this.addSortToUrl=!1}updated(t){(t.has("fileList")||t.has("subPrefix"))&&this.revealActiveFile()}connectedCallback(){super.connectedCallback(),this.revealActiveFile()}async revealActiveFile(){await this.updateComplete,this.shadowRoot?.querySelector(".content.active")?.scrollIntoView({block:"nearest",inline:"nearest"})}fileUrl(t){const e=`//${this.baseHost}${t.url_path}`;return this.addSortToUrl&&this.sortOrderBy!=="default"?`${e}?sort=${this.sortOrderBy}`:e}get pdfLabel(){return p`<span class="pdf-label"
      ><span class="sr-only">view this</span> PDF</span
    >`}fileLi(t){const e=this.subPrefix===t.file_subprefix?" active":"",a=this.fileUrl(t),s=(t.file_source??"").match(/^[^+]+\.pdf$/i);return p`
      <li>
        <div class="separator"></div>
        <div class="content${e}">
          <a href=${a}>
            <p class="item-title">
              ${t.title}${s?this.pdfLabel:z}
            </p>
          </a>
        </div>
      </li>
    `}get fileListTemplate(){const t=kt(this.fileList,e=>e?.file_prefix,this.fileLi.bind(this));return p`
      <ul>
        ${t}
        <div class="separator"></div>
      </ul>
    `}render(){return this.fileList.length?this.fileListTemplate:z}static get styles(){return[N,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          --item-navigator-active-file-border-color--: var(
            --item-navigator-active-file-border-color,
            #538bc5
          );

          display: block;
          overflow-y: auto;
          box-sizing: border-box;
          color: var(--item-navigator-text-color--);
          margin-top: 14px;
          margin-bottom: 2em;
          --active-border-width--: 2px;
          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        a {
          color: var(--item-navigator-text-color--);
          text-decoration: none;
        }

        ul {
          padding: 0;
          list-style: none;
          margin: var(--active-border-width--) 0.5em 1em 0;
        }

        ul > li:first-child .separator {
          display: none;
        }

        li {
          cursor: pointer;
          position: relative;
        }

        li .content {
          border: var(--active-border-width--) solid transparent;
          padding: 0.2em 0 0.4em 0.2em;
        }

        li .content.active {
          border: var(--active-border-width--) solid
            var(--item-navigator-active-file-border-color--);
        }

        li.content a {
          display: flex;
        }

        .item-title {
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 14px;
          font-weight: bold;
          word-wrap: break-word;
          padding-left: 5px;
        }

        .separator {
          background-color: var(--item-navigator-border-color--);
          width: 98%;
          margin: 1px auto;
          height: 1px;
        }

        .pdf-label {
          border: 1px solid;
          padding: 2px 5px;
          border-radius: 20px;
          display: inline-block;
          margin-left: 5px;
          font-size: 0.9em;
        }

        .pdf-label .sr-only {
          position: absolute;
          clip: rect(1px, 1px, 1px, 1px);
          padding: 0;
          border: 0;
          height: 1px;
          width: 1px;
          overflow: hidden;
        }
      `]}};re([h({type:String})],K.prototype,"baseHost",2);re([h({type:String})],K.prototype,"sortOrderBy",2);re([h({type:String})],K.prototype,"subPrefix",2);re([h({type:Array})],K.prototype,"fileList",2);re([h({type:Boolean,reflect:!0})],K.prototype,"addSortToUrl",2);K=re([A("ia-itemnav-viewable-files-panel")],K);const Mt="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='m2.32514544%208.30769231.7756949-2.08468003h2.92824822l.75630252%202.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976%206.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m7.1689722%2016.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666%205.3716871v.7756949z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m10.3846154%2011.0769231%202.7692308%205.5384615%202.7692307-5.5384615m-2.7692307%204.1538461v-13.15384612'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.661538'%20transform='matrix(1%200%200%20-1%200%2018.692308)'%20/%3e%3c/g%3e%3c/svg%3e",Pt="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='m2.32514544%208.30769231.7756949-2.08468003h2.92824822l.75630252%202.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976%206.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m7.1689722%2016.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666%205.3716871v.7756949z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m10.3846154%2011.0769231%202.7692308%205.5384615%202.7692307-5.5384615m-2.7692307%204.1538461v-13.15384612'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.661538'%20/%3e%3c/g%3e%3c/svg%3e",Vt="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%23000'%20fill-rule='evenodd'%3e%3cpath%20d='m2.32514544%208.30769231.7756949-2.08468003h2.92824822l.75630252%202.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976%206.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m7.1689722%2016.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666%205.3716871v.7756949z'%20fill-rule='nonzero'%20/%3e%3ccircle%20cx='13'%20cy='9'%20r='2'%20/%3e%3c/g%3e%3c/svg%3e";var Ft=Object.defineProperty,It=Object.getOwnPropertyDescriptor,pe=(t,e,a,s)=>{for(var n=s>1?void 0:s?It(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&Ft(e,a,n),n};const Bt=k(Mt),Tt=k(Pt),Et=k(Vt);let oe=class extends T{constructor(){super(...arguments),this.fileListRaw=[],this.fileListSorted=[],this.sortOrderBy="default"}render(){return p`<div class="sort-multi-file-list">${this.sortButton}</div>`}get sortButton(){return{default:p`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${()=>this.sortVolumes("title_asc")}
        >
          ${Et}
        </button>
      `,title_asc:p`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${()=>this.sortVolumes("title_desc")}
        >
          ${Bt}
        </button>
      `,title_desc:p`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${()=>this.sortVolumes("default")}
        >
          ${Tt}
        </button>
      `}[this.sortOrderBy]}sortVolumes(t){this.sortOrderBy=t;const e=[...this.fileListRaw].sort((a,s)=>t==="title_asc"?a.title.localeCompare(s.title):t==="title_desc"?s.title.localeCompare(a.title):(a.orig_sort??0)-(s.orig_sort??0));this.dispatchEvent(new CustomEvent("fileListSorted",{detail:{sortType:t,sortedFiles:e},bubbles:!0,composed:!0})),this.fileListSorted=e}static get styles(){return[N,_`
        :host {
          /* Every glyph is square, so one knob sizes both axes. Matches the
             panel header's close button, which sits beside this one. */
          --item-navigator-header-icon-size--: var(
            --item-navigator-header-icon-size,
            2em
          );
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color, var(--true-white))
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        button.sort-by {
          padding: 0;
          background-color: transparent;
          border: 0;
          cursor: pointer;
          display: inline-flex;
          /* Buttons don't inherit font-size, and the UA default would make the
             em-sized glyph larger than the close button beside it. */
          font: inherit;
        }

        /* The glyph is a masked span: the mask supplies the shape, this
           supplies the paint. */
        button.sort-by .ia-icon {
          width: var(--item-navigator-header-icon-size--);
          height: var(--item-navigator-header-icon-size--);
          background-color: var(--item-navigator-icon-color--);
        }
      `]}};pe([h({type:Array})],oe.prototype,"fileListRaw",2);pe([h({type:Array})],oe.prototype,"fileListSorted",2);pe([h({type:String,reflect:!0})],oe.prototype,"sortOrderBy",2);oe=pe([A("ia-itemnav-sort-files-button")],oe);const Lt="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='M70.6784759,10%20L70.6784759,21.3240186%20C64.5020053,21.66334%2058.9104278,22.5826126%2053.9037433,24.0818363%20C48.8970588,25.5810601%2044.8495989,27.4085163%2041.7613636,29.5642049%20C38.6731283,31.7198935%2035.9982175,34.0552229%2033.736631,36.5701929%20C31.4750446,39.085163%2029.8217469,41.5657574%2028.776738,44.011976%20C27.7317291,46.4581947%2026.9173351,48.6848525%2026.3335561,50.6919494%20C25.7497772,52.6990464%2025.4088681,54.3324462%2025.3108289,55.592149%20L25.2372995,57.4085163%20C29.0296346,54.1661122%2033.1751337,51.5524507%2037.6737968,49.5675316%20C42.1724599,47.5826126%2046.2934492,46.3118208%2050.0367647,45.7551564%20C53.7800802,45.1984919%2057.2571301,44.8713684%2060.4679144,44.7737858%20C63.6786988,44.6762031%2066.1831551,44.7726769%2067.9812834,45.0632069%20L70.6784759,45.499002%20L70.6784759,57.4051896%20L100,33.3765802%20L70.6784759,10%20Z%20M76.4438503,62.4883566%20L82.8609626,57.1157685%20C82.9099822,57.0669772%2082.9946524,57.0303837%2083.1149733,57.005988%20C83.2352941,56.9815924%2083.4536542,56.9571967%2083.7700535,56.9328011%20C84.0864528,56.9084054%2084.3905971,56.9449989%2084.6824866,57.0425815%20C84.9743761,57.1401641%2085.217246,57.2854291%2085.4110963,57.4783766%20C85.6049465,57.671324%2085.7263815,57.8409847%2085.7754011,57.9873586%20L85.8489305,58.2035928%20L85.8489305,90%20L0,90%20L0,17.910845%20L43.1784759,17.910845%20C43.2765152,17.9596363%2043.410205,18.0317143%2043.5795455,18.1270792%20C43.7488859,18.222444%2043.9438503,18.4519849%2044.1644385,18.8157019%20C44.3850267,19.1794189%2044.469697,19.5542249%2044.4184492,19.9401198%20C44.4184492,20.2794411%2044.3092692,20.582169%2044.0909091,20.8483034%20C43.872549,21.1144378%2043.6664439,21.3206919%2043.4725936,21.4670659%20L43.1818182,21.6134398%20C40.557041,23.06609%2038.2954545,24.396762%2036.3970588,25.6054558%20L30.7820856,29.8170326%20L11.5274064,29.8170326%20L11.5274064,78.1669993%20L74.1811497,78.1669993%20L74.1811497,65.5355955%20C74.1811497,65.1009093%2074.3995098,64.6407186%2074.8362299,64.1550233%20L76.4438503,62.4883566%20Z'%20/%3e%3c/svg%3e",Dt="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m31.5297453%208.76273313c-.3135031.40766104-.7447036.83083673-1.2936015%201.26952707-.5488979.4386904-.9169698.7837578-1.1042157%201.0352022.1562166%202.319709-.1417719%204.5297454-.8939653%206.6301092-.7521935%202.1003638-1.8023754%203.9182538-3.1505457%205.45367-1.3481704%201.5354162-2.9627648%202.8284828-4.8437835%203.8791996-1.8810186%201.0507169-3.8321207%201.7483416-5.8533062%202.092874s-4.1215493.2894286-6.30109136-.1653114c-2.17954205-.45474-4.2092874-1.3401455-6.08923604-2.6562165%202.72737.4697196%205.67408517-.2514445%208.8401455-2.1634924-3.0719024-.7521935-4.88979241-2.2881447-5.45367-4.6078537%201.12882516.0631287%201.86550396.0631287%202.21003638%200-2.91568586-1.2850417-4.38904344-3.3693558-4.42007276-6.2529424.21934517.0310293.53284828.1487267.94050931.3530922s.78375775.3060133%201.12829017.3049433c-.81532206-.7211641-1.41076396-1.9045581-1.7863257-3.5501819-.37556173-1.64562376-.17173122-3.17355015.61149155-4.58377912%201.81789001%201.88101862%203.6908838%203.36989086%205.61898138%204.46661672%201.92809757%201.0967259%204.22426707%201.7547614%206.88850847%201.9741066-.2503745-1.1908838-.1722662-2.32719882.2343248-3.40894502.4065911-1.0817462%201.0416221-1.93612241%201.9050931-2.56312861.863471-.62700621%201.8114702-1.0817462%202.8439975-1.36421999%201.0325272-.28247378%202.0827091-.27444896%203.1505456.02407447s1.9767815.87042585%202.726835%201.71570726c1.3791997-.37663172%202.6802911-.87845068%203.9032742-1.50545688-.0310293.37663171-.1407019.74470361-.3290178%201.1042157-.1883158.35951209-.3530922.62593623-.4943291.79927242s-.3841216.4317355-.728654.77519795c-.3445324.34346244-.5638776.57832227-.6580355.70457949.2193452-.09415792.6895998-.23539482%201.410764-.42371067.7211641-.18831586%201.2069334-.39214638%201.4573079-.61149155%200%20.44350524-.1567516.86668093-.4702547%201.27434196z'%20/%3e%3c/svg%3e",At="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m30.91057%2019.2442068.2670004-5.3339402h-5.7329237c-.0890001-3.4962895.25183-5.42243459%201.0224903-5.77843514.3560005-.17800028.8004955-.28925046%201.333485-.33375053s1.0442346-.0520853%201.5337353-.02275571c.4895008.02932959%201.045246.01466479%201.6672356-.04399439.0890001-1.59997977.1335002-3.24445961.1335002-4.93343953-2.1633102-.20732987-3.6742898-.28115953-4.5329389-.22148898-2.8146294.17800028-4.7847688%201.25965538-5.9104183%203.2449653-.1780003.3256596-.3261653.68873971-.444495%201.08924034-.1183298.40050062-.2144095.76358074-.2882391%201.08924034-.0738297.32565959-.125915.7848194-.1562559%201.37747942-.030341.59266002-.052591%201.04474028-.0667501%201.35624078-.0141592.3115005-.0217444.8449956-.0227558%201.6004854v1.5777298h-3.8229605v5.3339401h3.8669549v14.622824h5.8224296c0-.3560006-.0146648-1.6819003-.0439944-3.9776994-.0293296-2.295799-.0515796-4.2957737-.0667501-5.9999241s-.0075853-3.2525506.0227557-4.6452005h5.4219289z'%20/%3e%3c/svg%3e",Rt="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m8.50321407%208.54544475v5.32088575c.15641786.0310693.6819176.0310693%201.57649923%200%20.8945816-.0310693%201.3574071.0160703%201.3884764.1414189.0942792%201.5695354.1333837%203.2253149.1173133%204.9673385-.0160703%201.7420236-.0316049%203.3426283-.0466039%204.8018141s.2046288%202.824628.6588835%204.0963267c.4542546%201.2716986%201.1999178%202.2209194%202.2369897%202.8476622%201.2556283.784232%202.9896167%201.207953%205.2019653%201.271163%202.2123485.0632099%204.1659648-.2506972%205.8608487-.9417213-.0310693-.3449764-.0230341-1.4045467.0241055-3.1787109.0471397-1.7741643-.0080351-2.75499-.1655244-2.9424772-3.5472571%201.0360005-5.697467.6904885-6.4506298-1.0365361-.7220934-1.6638147-.8635123-4.9909084-.4242566-9.981281v-.046604h6.7318605v-5.32088568h-6.7318605v-6.54383772h-4.0497228c-.2828378%201.28669763-.6122795%202.35376743-.9883252%203.20120941-.3760457.84744199-.98029%201.60060471-1.812733%202.25948817-.832443.65888347-1.87594303%201.01993018-3.1305%201.08314014z'%20/%3e%3c/svg%3e",Ut="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m11.9051049%2030.5873434.653491-1.0742755.4207845-.839975c.2805229-.591861.5371377-1.2533214.7698443-1.9843813.2327065-.7310599.4659444-1.6029125.6997135-2.6155579.2337692-1.0126455.4128151-1.752206.5371377-2.2186817.0308151.030815.0775689.0855382.1402615.1641697.0626927.0786314.1094465.1333547.1402615.1641697.1243227.1870153.2178304.311338.280523.372968%201.1210293.964829%202.3817888%201.4631823%203.7822785%201.4950599%201.4939973%200%202.8790795-.3426843%204.1552465-1.0280529%202.1166733-1.1826593%203.6733633-3.1128487%204.6700699-5.7905679.4048457-1.1518444.6848374-2.5996192.8399751-4.3433245.1243226-1.587505-.0781002-3.0974411-.6072685-4.5298084-.903199-2.36638128-2.5528653-4.20306294-4.948999-5.51004497-1.276167-.65349101-2.5990879-1.05833667-3.9687625-1.21453696-1.525875-.21783034-3.1293188-.17107651-4.8103315.14026149-2.7701643.52916833-5.02709913%201.743174-6.77080442%203.64201699-1.99235065%202.14748836-2.98852598%204.62225355-2.98852598%207.42429545%200%202.9571797.9494215%205.0584455%202.84826449%206.3037975l.83997504.4207845c.12432268%200%20.22526845.0154075.3028373.0462225s.1551377.0074381.23270656-.0701308c.07756885-.0775688.13229208-.1243226.16416969-.1402614s.07066204-.0860696.11635328-.2103923c.04569124-.1243226.07703756-.2098609.09403895-.2566147.01700139-.0467539.04834771-.1476996.09403895-.3028373s.06906816-.2486454.07013074-.280523l.14026149-.5132295c.06269263-.311338.09403895-.5291684.09403895-.653491-.03081502-.1243227-.12432268-.2799917-.28052297-.467007-.15620029-.1870154-.23376915-.2959305-.23270656-.3267455-.62267599-.8096914-.9494215-1.7904592-.98023652-2.9423035-.03081502-1.55669.28052297-2.9731185.93401399-4.24928547%201.18265932-2.45882635%203.17501002-3.93741618%205.97705192-4.43576949%201.6183201-.311338%203.1356943-.25661476%204.5521228.16416969%201.4164285.42078446%202.5135496%201.09765239%203.2913633%202.03060379.8405063%201.02752164%201.3229208%202.28828114%201.4472435%203.78227848.1243227%201.4004897-.0313463%202.9725872-.467007%204.7162925-.3740306%201.3696746-.9186065%202.5528653-1.6337275%203.5495719-.9967066%201.245352-2.0863896%201.8834355-3.269049%201.9142505-1.7118277.0626926-2.7547568-.6375522-3.1287874-2.1007345-.0935077-.4664757%200-1.2134744.2805229-2.240996.7469987-2.5842117%201.1359055-3.9384788%201.1667206-4.0628015.1870153-1.0275216.2024228-1.7904591.0462225-2.2888124-.1870153-.65349104-.5759222-1.15928246-1.1667205-1.51737429-.5907984-.35809182-1.2756357-.39687625-2.054512-.11635327-1.1826594.43566067-1.9610044%201.40048968-2.335035%202.89448706-.311338%201.306982-.2491767%202.6299028.186484%203.9687625%200%20.0626926.0313463.1402615.094039.2327065.0626926.0924451.0940389.1700139.0940389.2327066%200%20.0935076-.0313463.2491766-.0940389.467007-.0626927.2178303-.094039.3580918-.094039.4207844-.0935076.4356607-.3038999%201.3308903-.6311767%202.6856887-.3272768%201.3547985-.5838915%202.3897582-.7698443%203.1048793-.7778136%203.2068876-1.12049796%205.5881451-1.02805289%207.1437725l.37296809%202.7558194c.653491-.591861%201.2294131-1.2299445%201.7277664-1.9142505z'%20/%3e%3c/svg%3e",Nt="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m32%207.04156803v19.91686397c0%20.5752421-.4763773%201.041568-1.0640184%201.041568h-27.87196316c-.58764116%200-1.06401844-.4663259-1.06401844-1.041568v-19.91686397c0-.57524214.47637728-1.04156803%201.06401844-1.04156803h27.87196316c.5876411%200%201.0640184.46632589%201.0640184%201.04156803zm-26.25039901%201.19676167%2010.04327011%2010.1323738c.5135662.4194048.8817166.6291071%201.1044511.6291071.1198794%200%20.2695514-.0503424.4490158-.1510273.1794644-.100685.3291364-.2013699.4490158-.3020548l.1798191-.1510273%2010.1198794-10.15841306zm16.77212271%209.7303286%206.8831353%206.7889404v-13.5778809zm-17.92871075-6.6379131v13.350819l6.78098955-6.6629107zm22.09008685%2014.2059464-5.9074304-5.8588202-.9757049.9551179-.3594018.3295984c-.0342324.0304241-.0665646.0587822-.0969964.0850743l-.1597867.1329606c-.0684912.0540844-.1198794.0895749-.1541644.1064714-.6674943.3687151-1.3523675.5530727-2.0546196.5530727-.65047%200-1.3782586-.218035-2.1833659-.6541048l-.6682036-.4520405-1.0278418-1.0311524-5.95850326%205.832781z'%20/%3e%3c/svg%3e",Ht="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m7.80511706%2012.3659763c1.2669254-2.2579539%204.09819784-2.9949938%206.41200864-1.7733458l.2295791.12871%201.6067188.9559859%203.5467013-6.31849361c1.2682451-2.26030597%204.104098-2.99652769%206.4192376-1.76952182l.2223501.12488594%203.2168204%201.91103915c2.2770002%201.3527136%203.1866331%204.21502324%202.0564431%206.51290984l-.1198433.2278304-5.2002499%209.2680474c-1.2669254%202.2579539-4.0981978%202.9949938-6.4120086%201.7733458l-.2295791-.12871-1.6096554-.9558482-3.5437647%206.3183559c-1.2682451%202.260306-4.104098%202.9965277-6.41923761%201.7695218l-.22235013-.1248859-3.21682032-1.9110392c-2.27700024-1.3527136-3.18663314-4.2150232-2.05644312-6.5129098l.11984332-.2278304zm13.93955474-5.73311741-3.563271%206.35055051c1.889633%201.4530595%202.5776248%204.0429866%201.5410255%206.156875l-.1223014.2328355-.4183304.7430134%201.6096554.9558483c1.1431442.6791157%202.5155496.3977368%203.1667361-.5628389l.0921501-.1491451%205.2002498-9.2680474c.5752467-1.0252226.2110342-2.4011579-.8559335-3.14755806l-.1742742-.11247814-3.2168203-1.91103915c-1.1402863-.67741793-2.5086889-.39913772-3.1618387.55564729zm-11.79500786%207.00714351-5.20024982%209.2680474c-.57524673%201.0252226-.21103426%202.4011579.85593348%203.1475581l.17427416.1124781%203.21682032%201.9110392c1.14028632.6774179%202.50868892.3991377%203.16183872-.5556473l.0970474-.1563368%203.5622708-6.3513198c-1.8888875-1.4532134-2.5764504-4.042623-1.5400057-6.1561456l.1222818-.2327956.4153938-.7428758-1.6067188-.9559859c-1.1431442-.6791157-2.5155496-.3977368-3.1667361.5628389zm6.97653866%201.5796652-.3817806.6812386c-.5117123.9119895-.2800268%202.1014993.528439%202.8785267l.382717-.6803391c.5119098-.9123415.2798478-2.1024176-.5293754-2.8794262z'%20/%3e%3c/svg%3e",Ee=k(Lt),jt=k(Dt),qt=k(At),Wt=k(Rt),Kt=k(Ut),Jt=k(Nt),Xt=k(Ht);var Zt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,E=(t,e,a,s)=>{for(var n=s>1?void 0:s?Gt(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&Zt(e,a,n),n};let M=class extends T{constructor(){super(...arguments),this.baseHost="archive.org",this.creator="",this.description="",this.embedOptionsVisible=!1,this.identifier="",this.sharingOptions=[],this.type="",this.renderHeader=!1,this.fileSubPrefix="",this.copyNoteTimeouts=new WeakMap}updated(t){t.has("sharingOptions")&&!this.sharingOptions.length&&this.loadProviders()}loadProviders(){let t=`https://${this.baseHost}/details/${this.identifier}`;this.fileSubPrefix&&(t+=`/${this.fileSubPrefix}`);const e=[this.description,this.creator,"Free Download, Borrow, and Streaming","Internet Archive"].filter(Boolean).join(" : ");this.sharingOptions=[{name:"Twitter",icon:jt,url:`https://twitter.com/intent/tweet?${new URLSearchParams({url:t,text:e,via:"internetarchive"})}`},{name:"Facebook",icon:qt,url:`https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({u:t})}`},{name:"Tumblr",icon:Wt,url:`https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams({posttype:"link",canonicalUrl:t,title:e})}`},{name:"Pinterest",icon:Kt,url:`http://www.pinterest.com/pin/create/button/?${new URLSearchParams({url:t,description:e})}`},{name:"Email",icon:Jt,url:`mailto:?${new URLSearchParams({subject:e,body:t})}`}]}async copyToClipboard(t){const e=t.currentTarget,a=e.querySelector("textarea"),s=e.querySelector("small");if(!(!a||!s)){try{await navigator.clipboard.writeText(a.value)}catch{a.select(),document.execCommand("copy"),a.blur()}s.classList.add("visible"),clearTimeout(this.copyNoteTimeouts.get(s)),this.copyNoteTimeouts.set(s,setTimeout(()=>s.classList.remove("visible"),4e3))}}get iframeEmbed(){return`<iframe
      src="https://${this.baseHost}/embed/${this.identifier}"
      width="560" height="384" frameborder="0"
      webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen
    ></iframe>`}get bbcodeEmbed(){return`[archiveorg ${this.identifier} width=560 height=384 frameborder=0 webkitallowfullscreen=true mozallowfullscreen=true]`}get helpURL(){return`https://${this.baseHost}/help/audio.php?identifier=${this.identifier}`}get header(){const t=p`<header><h3>Share this ${this.type}</h3></header>`;return this.renderHeader?t:z}render(){return p`
      ${this.header}
      <div>
        ${this.sharingOptions.map(t=>p`<a class="share-option" href=${t.url} target="_blank">
              ${t.icon} ${t.name}
            </a>`)}
        <details>
          <summary class="share-option">
            ${Xt} Get an embeddable link
          </summary>
          <div class="embed">
            <h4>Embed</h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.iframeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <h4>
              Embed for wordpress.com hosted blogs and archive.org item
              &lt;description&gt; tags
            </h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.bbcodeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <p>
              Want more?
              <a href=${this.helpURL}
                >Advanced embedding details, examples, and help</a
              >!
            </p>
          </div>
        </details>
      </div>
    `}static get styles(){return[N,_`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          /* Icons follow the adjustable text color by default. */
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color--)
          );
          --item-navigator-share-embed-bg--: var(
            --item-navigator-share-embed-bg,
            #151515
          );

          display: block;
          height: 100%;
          overflow-y: auto;
          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
          color: var(--item-navigator-text-color--);
          box-sizing: border-box;
        }

        header {
          display: flex;
          align-items: baseline;
        }

        h3 {
          padding: 0;
          margin: 0 1em 0 0;
          font-size: 1.6em;
        }

        h4 {
          font-size: 1.4em;
        }

        :host > div {
          padding: 1em 0;
        }

        .share-option {
          display: block;
          padding: 0.5em 0;
          font-size: 1.6em;
          text-decoration: none;
          color: var(--item-navigator-text-color--);
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .share-option:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option > * {
          display: inline-block;
          padding: 0.2em;
          margin-right: 1em;
          vertical-align: middle;
          border: 1px solid var(--item-navigator-border-color--);
          border-radius: 7px;
        }

        .share-option .ia-icon {
          /* Reset to the base so the icon (em) doesn't compound against the
             share-option's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size--);
          width: 2em;
          height: 2em;
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        /* Hide the triangle that appears on details tags */
        summary::marker {
          content: '';
        }

        summary::-webkit-details-marker {
          display: none;
        }

        .embed {
          padding-right: 5px;
        }

        .embed a {
          color: var(--item-navigator-text-color--);
        }

        .code {
          position: relative;
        }

        textarea {
          display: block;
          width: 100%;
          height: 120px;
          padding: 0.8em 1em;
          box-sizing: border-box;
          resize: none;
          cursor: pointer;
          font: normal 1.4em var(--base-font-family);
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-share-embed-bg--);
        }

        small {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3em;
          padding: 0.5em 1em;
          box-sizing: border-box;
          font: normal 1.2em/2em var(--base-font-family);
          color: var(--item-navigator-share-embed-bg--);
          background: var(--item-navigator-text-color--);
          opacity: 0;
          transition: opacity 300ms linear;
        }

        small.visible {
          opacity: 1;
        }
      `]}};E([h({type:String})],M.prototype,"baseHost",2);E([h({type:String})],M.prototype,"creator",2);E([h({type:String})],M.prototype,"description",2);E([h({type:Boolean})],M.prototype,"embedOptionsVisible",2);E([h({type:String})],M.prototype,"identifier",2);E([h({type:Array})],M.prototype,"sharingOptions",2);E([h({type:String})],M.prototype,"type",2);E([h({type:Boolean})],M.prototype,"renderHeader",2);E([h({type:String})],M.prototype,"fileSubPrefix",2);M=E([A("ia-itemnav-share-panel")],M);const Qt="data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='M4%206h16v2H4V6zm0%205h16v2H4v-2zm0%205h16v2H4v-2z'%20/%3e%3c/svg%3e";var Yt=Object.defineProperty,er=Object.getOwnPropertyDescriptor,L=(t,e,a,s)=>{for(var n=s>1?void 0:s?er(e,a):e,d=t.length-1,c;d>=0;d--)(c=t[d])&&(n=(s?c(e,a,n):c(n))||n);return s&&n&&Yt(e,a,n),n};class tr{constructor(){this.handlers=new Map,this.observer=new ResizeObserver(e=>{for(const a of e)this.handlers.get(a.target)?.handler.handleResize(a)})}addObserver(e){this.handlers.set(e.target,e),this.observer.observe(e.target)}removeObserver(e){this.handlers.delete(e.target),this.observer.unobserve(e.target)}}const rr=k(Qt),ir=[{name:"Midnight",values:{"--item-navigator-theater-bg-color":"#0d1b2a","--item-navigator-share-embed-bg":"#12233a","--item-navigator-menu-slider-bg":"#1b263b","--item-navigator-active-button-bg":"#2c3e50","--item-navigator-text-color":"#e0e6ed","--item-navigator-icon-color":"#e0e6ed","--item-navigator-icon-active-color":"#7fd8ff","--item-navigator-icon-inactive-color":"#9fb3c8","--item-navigator-border-color":"#5c7799","--item-navigator-active-file-border-color":"#4cc9f0"}},{name:"Forest",values:{"--item-navigator-theater-bg-color":"#08160c","--item-navigator-share-embed-bg":"#0e2413","--item-navigator-menu-slider-bg":"#14301a","--item-navigator-active-button-bg":"#1f4a29","--item-navigator-text-color":"#e8f5e9","--item-navigator-icon-color":"#e8f5e9","--item-navigator-icon-active-color":"#7bd88f","--item-navigator-icon-inactive-color":"#9dbca4","--item-navigator-border-color":"#4d8259","--item-navigator-active-file-border-color":"#7bd88f"}},{name:"Plum",values:{"--item-navigator-theater-bg-color":"#150c1a","--item-navigator-share-embed-bg":"#1f1226","--item-navigator-menu-slider-bg":"#2b1733","--item-navigator-active-button-bg":"#3d2147","--item-navigator-text-color":"#f3e8f7","--item-navigator-icon-color":"#f3e8f7","--item-navigator-icon-active-color":"#d9a6ff","--item-navigator-icon-inactive-color":"#b39ec0","--item-navigator-border-color":"#8a6398","--item-navigator-active-file-border-color":"#d09bff"}},{name:"Solarized",values:{"--item-navigator-theater-bg-color":"#00212b","--item-navigator-share-embed-bg":"#002b36","--item-navigator-menu-slider-bg":"#073642","--item-navigator-active-button-bg":"#0b4553","--item-navigator-text-color":"#eee8d5","--item-navigator-icon-color":"#eee8d5","--item-navigator-icon-active-color":"#5fd3c8","--item-navigator-icon-inactive-color":"#93a1a1","--item-navigator-border-color":"#4d8fa1","--item-navigator-active-file-border-color":"#5fd3c8"}},{name:"High Contrast",values:{"--item-navigator-theater-bg-color":"#000000","--item-navigator-share-embed-bg":"#000000","--item-navigator-menu-slider-bg":"#000000","--item-navigator-active-button-bg":"#1a1a1a","--item-navigator-text-color":"#ffffff","--item-navigator-icon-color":"#ffffff","--item-navigator-icon-active-color":"#ffff00","--item-navigator-icon-inactive-color":"#c0c0c0","--item-navigator-border-color":"#ffffff","--item-navigator-active-file-border-color":"#ffff00"}}],or="https://archive.org/embed",ar="https://archive.org/download";function G(t,e,a,s,n){return{identifier:t,mediatype:a,pdfFile:n,title:e,file_prefix:t,file_subprefix:t,file_source:a==="pdf"?`${t}.pdf`:t,url_path:`/details/${t}`,image:"",author:"",orig_sort:s}}const q=[G("Dolly-Parton-Coat-Of-Many-Colors","Coat of Many Colors (album cover)","image",0),G("9to-5and-odd-jobs","9 to 5 and Odd Jobs","image",1),G("musikladen-77","Musikladen Concert, 1977","video",2),G("lp_rhinestone-original-soundtrack-record_various-dolly-parton-floyd-parton-kin-v","Rhinestone: Original Soundtrack Recording","audio",3),G("isbn_9780590899352","Coat of Many Colors","book",4),G("sounds-78-03","Sounds, 3/78","pdf",5,"sounds-78-03.pdf")];let P=class extends T{constructor(){super(...arguments),this.loaded=!0,this.viewAvailable=!0,this.headerOn=!0,this.fullscreen=!1,this.animationsOn=!0,this.sharedObserver=new tr,this.sortOrderBy="default",this.sortedFiles=[...q],this.selectedSubPrefix=q[0].file_subprefix}handleFileListSorted(t){const{sortType:e,sortedFiles:a}=t.detail;this.sortOrderBy=e,this.sortedFiles=a}get selectedFile(){return q.find(t=>t.file_subprefix===this.selectedSubPrefix)??q[0]}get theaterSrc(){const t=this.selectedFile;return t.mediatype==="pdf"&&t.pdfFile?`${ar}/${t.identifier}/${encodeURIComponent(t.pdfFile)}`:`${or}/${t.identifier}`}handleFileClick(t){const e=t.composedPath().find(n=>n instanceof HTMLAnchorElement);if(!e)return;t.preventDefault();const a=e.getAttribute("href"),s=q.find(n=>`//archive.org${n.url_path}`===a);s&&(this.selectedSubPrefix=s.file_subprefix)}get demoItem(){return{metadata:{identifier:this.selectedFile.identifier,title:this.selectedFile.title}}}get menuContents(){const t={item:this.demoItem,baseHost:"archive.org",subPrefix:""};return[{...t,id:"viewable-files",label:`Viewable Files (${q.length})`,icon:Te,actionButton:p`
          <ia-itemnav-sort-files-button
            .fileListRaw=${q}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-itemnav-sort-files-button>
        `,component:p`
          <ia-itemnav-viewable-files-panel
            baseHost="archive.org"
            subPrefix=${this.selectedSubPrefix}
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
            @click=${e=>this.handleFileClick(e)}
          ></ia-itemnav-viewable-files-panel>
        `},{...t,id:"share",label:"Share this item",icon:Ee,component:p`
          <ia-itemnav-share-panel
            identifier=${this.selectedFile.identifier}
            baseHost="archive.org"
            type="item"
            .description=${this.selectedFile.title}
          ></ia-itemnav-share-panel>
        `},{...t,id:"about",label:"About This Item",icon:rr,component:p`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `}]}get menuShortcuts(){return[{id:"viewable-files",label:"Viewable Files",icon:Te},{id:"share",label:"Share this item",icon:Ee}]}get styleInputData(){return{settings:[{label:"Base font size",cssVariable:"--item-navigator-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Menu width",cssVariable:"--item-navigator-menu-width",defaultValue:320,inputType:"range",min:200,max:480,step:10,unit:"px"},{label:"Shortcut rail width",cssVariable:"--item-navigator-menu-margin",defaultValue:42,inputType:"range",min:30,max:64,step:2,unit:"px"},{label:"Animation timing",cssVariable:"--item-navigator-animation-timing",defaultValue:200,inputType:"range",min:0,max:800,step:50,unit:"ms"},{label:"Text color",cssVariable:"--item-navigator-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color",cssVariable:"--item-navigator-icon-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · active",cssVariable:"--item-navigator-icon-active-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · inactive",cssVariable:"--item-navigator-icon-inactive-color",defaultValue:"#999999",inputType:"color"},{label:"Border color",cssVariable:"--item-navigator-border-color",defaultValue:"#4b4b4b",inputType:"color"},{label:"Active file border",cssVariable:"--item-navigator-active-file-border-color",defaultValue:"#538bc5",inputType:"color"},{label:"Theater background",cssVariable:"--item-navigator-theater-bg-color",defaultValue:"#000000",inputType:"color"},{label:"Menu drawer background",cssVariable:"--item-navigator-menu-slider-bg",defaultValue:"#212121",inputType:"color"},{label:"Active panel background",cssVariable:"--item-navigator-active-button-bg",defaultValue:"#333333",inputType:"color"},{label:"Embed field background",cssVariable:"--item-navigator-share-embed-bg",defaultValue:"#151515",inputType:"color"}],palettes:ir,revertable:!0,showCssVariables:!0}}render(){return p`
      <story-template
        elementTag="ia-item-navigator"
        elementClassName="IAItemNavigator"
        .styleInputData=${this.styleInputData}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <div class="frame-wrapper ${this.fullscreen?"fullscreen":""}">
            <ia-item-navigator
              baseHost="archive.org"
              style=${this.animationsOn?z:"--item-navigator-animation-timing: 0ms"}
              .item=${this.demoItem}
              .menuContents=${this.menuContents}
              .menuShortcuts=${this.menuShortcuts}
              .sharedObserver=${this.sharedObserver}
              .viewportInFullscreen=${this.fullscreen||null}
              ?loaded=${this.loaded}
              ?viewAvailable=${this.viewAvailable}
              @fileListSorted=${this.handleFileListSorted}
            >
              ${this.headerTemplate} ${this.theaterTemplate}
            </ia-item-navigator>
          </div>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow("Loaded","loaded")}
            ${this.toggleRow("View available (theater)","viewAvailable")}
            ${this.toggleRow("Header","headerOn")}
            ${this.toggleRow("Fullscreen","fullscreen")}
            ${this.toggleRow("Animate","animationsOn")}
          </table>
          <p class="hint">
            Turn "View available" off to show the no-theater placeholder. Open
            "Viewable Files" and use the sort button in its header. Narrow the
            demo below 600px to see the drawer switch from shift to overlay.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The navigator is a shell: project a theater into
            <code>slot="main"</code> and an optional bar into
            <code>slot="header"</code>, then drive the drawer with the
            <code>menuContents</code> provider array (and the minimized rail
            with <code>menuShortcuts</code>). It never renders a viewer itself.
          </p>
        </div>
      </story-template>
    `}toggleRow(t,e){return p`
      <tr>
        <td>${t}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[e]}
            @change=${a=>{this[e]=a.target.checked}}
          />
        </td>
      </tr>
    `}get headerTemplate(){return!this.headerOn&&!this.fullscreen?z:p`
      <div slot="header" class="demo-header">
        <span class="brand">Internet Archive</span>
        <a
          class="title"
          href="https://archive.org/details/${this.selectedFile.identifier}"
          target="_blank"
          >${this.selectedFile.title}</a
        >
        ${this.fullscreen?p`<button
              class="exit-fs"
              @click=${()=>{this.fullscreen=!1}}
            >
              Exit fullscreen
            </button>`:z}
      </div>
    `}get theaterTemplate(){const t=this.selectedFile;return p`
      <div slot="main" class="demo-theater">
        <iframe
          class="theater-embed"
          src=${this.theaterSrc}
          title=${t.title}
          allow="fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    `}get exampleUsage(){return`<ia-item-navigator
  baseHost="archive.org"
  .item=\${this.itemMetadata}
  .menuContents=\${this.menuProviders}
  .menuShortcuts=\${this.menuShortcuts}
  .sharedObserver=\${this.sharedObserver}
  ?loaded=\${this.loaded}
>
  <div slot="header">…your header…</div>
  <div slot="main">…your theater…</div>
</ia-item-navigator>`}static get styles(){return _`
      .frame-wrapper {
        height: 460px;
        border: 1px solid #ccc;
      }

      /* Opt into menu-button labels (the component ships icon-only by
         default), matching the upstream demo. */
      ia-item-navigator {
        --item-navigator-menu-button-label-display: block;
      }

      .demo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1a1a1a;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.9rem;
      }

      .demo-header .brand {
        font-weight: 600;
        white-space: nowrap;
      }

      .demo-header .title {
        color: #6cb2ff;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .demo-header .exit-fs {
        margin-left: auto;
        cursor: pointer;
      }

      .demo-theater {
        height: 100%;
        width: 100%;
      }

      .theater-embed {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
      }

      .hint {
        font-size: 0.78rem;
        color: #555;
      }

      table {
        margin-bottom: 0.5rem;
      }
    `}};L([V()],P.prototype,"loaded",2);L([V()],P.prototype,"viewAvailable",2);L([V()],P.prototype,"headerOn",2);L([V()],P.prototype,"fullscreen",2);L([V()],P.prototype,"animationsOn",2);L([V()],P.prototype,"sharedObserver",2);L([V()],P.prototype,"sortOrderBy",2);L([V()],P.prototype,"sortedFiles",2);L([V()],P.prototype,"selectedSubPrefix",2);P=L([A("ia-item-navigator-story")],P);export{P as IAItemNavigatorStory};
