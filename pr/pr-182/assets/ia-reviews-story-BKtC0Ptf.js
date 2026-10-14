import{m as E,b as w,r as H,n as T,e as bt,c as Tt,i as St,A as z,o as fi,s as Fe,a as Et}from"./index-CW_-wNge.js";import{_ as n}from"./tslib.es6-kHcLnhpD.js";import{o as Ji,r as Qi}from"./story-template-cxUXVTyy.js";import{l as cr}from"./localized-decorator-Dl_yWNie.js";import"./ia-button-Dl0nBfwn.js";import"./ia-status-indicator-C8kS9WhI.js";import"./icon-box-X-by1B-W.js";function s(r){let e,t,a;return e=r,(c,d,h)=>{if(h.value!=null)h.value=Yr(h.value,e,t,a);else if(h.get!=null)h.get=Yr(h.get,e,t,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Vt=new Map;function Yr(r,e,t=0,a){const c=Symbol("__memoized_map__");return function(...d){let h;this.hasOwnProperty(c)||Object.defineProperty(this,c,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let g=this[c];if(Array.isArray(a))for(const v of a)Vt.has(v)?Vt.get(v).push(g):Vt.set(v,[g]);if(e||d.length>0||t>0){let v;e===!0?v=d.map(V=>V.toString()).join("!"):e?v=e.apply(this,d):v=d[0];const N=`${v}__timestamp`;let O=!1;if(t>0)if(!g.has(N))O=!0;else{let V=g.get(N);O=Date.now()-V>t}g.has(v)&&!O?h=g.get(v):(h=r.apply(this,d),g.set(v,h),t>0&&g.set(N,Date.now()))}else{const v=this;g.has(v)?h=g.get(v):(h=r.apply(this,d),g.set(v,h))}return h}}class gt{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}gt.shared=new gt;class ie{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ie.shared=new ie;class yt{parseValue(e){return ie.shared.parseValue(e)}}yt.shared=new yt;class ze{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,d,h="00",g="00",v="00"]=t,N=new Date(`${a}-${c}-${d}T${h}:${g}:${v}`);return Number.isNaN(N.getTime())?void 0:N}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}ze.shared=new ze;class vt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,d)=>{const h=parseFloat(c);if(Number.isNaN(h))return t=!0,0;const v=60**(e.length-1-d);return h*Math.floor(v)}).reduce((c,d)=>c+d,0);return t?void 0:a}}vt.shared=new vt;class mi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),c=[];return a.forEach(d=>{d!==void 0&&c.push(d)}),c}}class _t{parseValue(e){return String(e)}}_t.shared=new _t;function Me(r,e,...t){for(const a of t){const c=r[a];if(c!=null)return e(c)}}function le(r,e,...t){return Me(r,a=>e(a),...t)}class ue{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ie.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return le(this.rawValue,e=>yt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return le(this.rawValue,e=>vt.shared.parseValue(e),"length")}get height(){return le(this.rawValue,e=>ie.shared.parseValue(e),"height")}get width(){return le(this.rawValue,e=>ie.shared.parseValue(e),"width")}get track(){return le(this.rawValue,e=>ie.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return le(this.rawValue,e=>ie.shared.parseValue(e),"bitrate")}get private(){return le(this.rawValue,e=>gt.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([s()],ue.prototype,"mtime",null);n([s()],ue.prototype,"size",null);n([s()],ue.prototype,"length",null);n([s()],ue.prototype,"height",null);n([s()],ue.prototype,"width",null);n([s()],ue.prototype,"track",null);n([s()],ue.prototype,"bitrate",null);n([s()],ue.prototype,"private",null);class G{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}n([s()],G.prototype,"values",null);n([s()],G.prototype,"value",null);class ae extends G{constructor(e){super(gt.shared,e)}}class D extends G{constructor(e){super(ze.shared,e)}}class Wt extends G{constructor(e){super(vt.shared,e)}}class _ extends G{constructor(e){super(ie.shared,e)}}class u extends G{constructor(e){super(_t.shared,e)}}class Be{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends G{constructor(e,t){super(t,e)}}const en=new Be(["rl","lr"]);class tn extends $e{constructor(e){super(e,en)}}class pt extends G{constructor(e){super(yt.shared,e)}}const rn=new Be(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class nn extends $e{constructor(e){super(e,rn)}}class gi extends G{constructor(e,t){super(t,e)}}class qr extends gi{constructor(e){const t=new mi(_t.shared);super(e,t)}}class Gt extends gi{constructor(e){const t=new mi(ie.shared);super(e,t)}}const sn=/^([0-9a-f]{32})\s+\*?(.+)$/i,on=/^(.+):([0-9a-f]{32})$/i;function an(r){const e=r.match(sn);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(on);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Qt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(an).filter(a=>a!==void 0);return t.length?t:void 0}}Qt.shared=new Qt;class Xr extends G{constructor(e){super(Qt.shared,e)}}function ht(r,e){var t;const a=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class er{parseValue(e){if(typeof e!="string")return;const t=ht(e,"curator"),a=ht(e,"date"),c=ht(e,"comment"),d=ht(e,"state");if(!(!t&&!a&&!c&&!d))return{curator:t,date:a?ze.shared.parseValue(a):void 0,comment:c,state:d}}}er.shared=new er;class ln extends G{constructor(e){super(er.shared,e)}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}tr.shared=new tr;class cn extends G{constructor(e){super(tr.shared,e)}}class rr{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),d=parseInt(t[3],10);return{hours:a*c,minutes:d,totalMinutes:a*(c*60+d)}}}rr.shared=new rr;class un extends G{constructor(e){super(rr.shared,e)}}class ir{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}ir.shared=new ir;class dn extends G{constructor(e){super(ir.shared,e)}}const pn=new Be(["true","none","frozen"]),hn=new Be(["sound","silent"]),fn=new Be(["color","b&w"]),mn=new Be(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(_,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(_,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(_,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(_,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,mn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(ln,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(_,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(_,"firstfileserial")}get foldoutcount(){return this.field(_,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(ae,"has_mp3")}get height(){return this.field(_,"height")}get hidden(){return this.field(ae,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(ae,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(cn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(_,"audio_sample_rate")}get avg_rating(){return this.field(_,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(ae,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(pt,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,fn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(_,"downloads")}get duration(){return this.field(Wt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(_,"files_count")}get frames_per_second(){return this.field(_,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(_,"image_count")}get imagecount(){return this.field(_,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(_,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(_,"issue_count")}get issue_page_count(){return this.field(_,"issue_page_count")}get item_count(){return this.field(_,"item_count")}get item_size(){return this.field(pt,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(_,"lastfileserial")}get length(){return this.field(Wt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(ae,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Xr,"md5contents")}get md5s(){return this.field(Xr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(ae,"monochromatic")}get month(){return this.field(_,"month")}get mediatype(){return this.field(nn,"mediatype")}get mpeg_program(){return this.field(_,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(ae,"noarchivetorrent")}get noindex(){return this.field(ae,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(_,"num_favorites")}get num_reviews(){return this.field(_,"num_reviews")}get numeric_id(){return this.field(_,"numeric_id")}get numwarcs(){return this.field(_,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(ae,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(_,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(_,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(_,"output_time_minutes")}get pacer_case_num(){return this.field(_,"pacer-case-num")}get packaging_time_minutes(){return this.field(_,"packaging_time_minutes")}get page_number_confidence(){return this.field(_,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(tn,"page-progression","page_progression")}get paginated(){return this.field(ae,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(_,"pick")}get podcastindexid(){return this.field(_,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(_,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(_,"rcs_key")}get repub_state(){return this.field(_,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(qr,"republisher_operator")}get republisher_time(){return this.field(_,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,pn),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(Wt,"runtime")}get scan_time_minutes(){return this.field(_,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Gt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(_,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(pt,"size")}get sizehint(){return this.field(pt,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,hn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(_,"source_pixel_height")}get source_pixel_width(){return this.field(_,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(qr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Gt,"thumbs")}get times(){return this.field(Gt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(_,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(dn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(un,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(_,"week")}get width(){return this.field(_,"width")}get year(){return this.field(_,"year")}field(e,...t){return Me(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}n([s()],o.prototype,"access",null);n([s()],o.prototype,"adder",null);n([s()],o.prototype,"amrc_id",null);n([s()],o.prototype,"archiveit_account_id",null);n([s()],o.prototype,"archiveit_account_organization_name",null);n([s()],o.prototype,"archiveit_collection_id",null);n([s()],o.prototype,"archiveit_collection_name",null);n([s()],o.prototype,"archiveit_job_type",null);n([s()],o.prototype,"audit_time_minutes",null);n([s()],o.prototype,"auditor",null);n([s()],o.prototype,"author",null);n([s()],o.prototype,"autocrop_version",null);n([s()],o.prototype,"bookplateleaf",null);n([s()],o.prototype,"bookreader_defaults",null);n([s()],o.prototype,"boxid",null);n([s()],o.prototype,"camera",null);n([s()],o.prototype,"cameraman",null);n([s()],o.prototype,"canister",null);n([s()],o.prototype,"case_name",null);n([s()],o.prototype,"col_number",null);n([s()],o.prototype,"collection_added",null);n([s()],o.prototype,"collection_library",null);n([s()],o.prototype,"collection_set",null);n([s()],o.prototype,"copyright_holder",null);n([s()],o.prototype,"court",null);n([s()],o.prototype,"crawler",null);n([s()],o.prototype,"crawljob",null);n([s()],o.prototype,"curation",null);n([s()],o.prototype,"dari_title",null);n([s()],o.prototype,"dari_title_romanized",null);n([s()],o.prototype,"date_case_filed",null);n([s()],o.prototype,"date_case_terminated",null);n([s()],o.prototype,"date_created",null);n([s()],o.prototype,"date_last_filing",null);n([s()],o.prototype,"derive_submittime",null);n([s()],o.prototype,"derive_version",null);n([s()],o.prototype,"discs",null);n([s()],o.prototype,"docket_num",null);n([s()],o.prototype,"external_metadata_update",null);n([s()],o.prototype,"fail_reasons",null);n([s()],o.prototype,"filesxml",null);n([s()],o.prototype,"firstfiledate",null);n([s()],o.prototype,"firstfileserial",null);n([s()],o.prototype,"foldoutcount",null);n([s()],o.prototype,"format",null);n([s()],o.prototype,"geo_restricted",null);n([s()],o.prototype,"guid",null);n([s()],o.prototype,"has_mp3",null);n([s()],o.prototype,"height",null);n([s()],o.prototype,"hidden",null);n([s()],o.prototype,"ia_orig__runtime",null);n([s()],o.prototype,"access_restricted_item",null);n([s()],o.prototype,"addeddate",null);n([s()],o.prototype,"aspect_ratio",null);n([s()],o.prototype,"audio_codec",null);n([s()],o.prototype,"audio_sample_rate",null);n([s()],o.prototype,"avg_rating",null);n([s()],o.prototype,"backup_location",null);n([s()],o.prototype,"ccnum",null);n([s()],o.prototype,"closed_captioning",null);n([s()],o.prototype,"collection",null);n([s()],o.prototype,"collections_raw",null);n([s()],o.prototype,"collection_size",null);n([s()],o.prototype,"color",null);n([s()],o.prototype,"contact",null);n([s()],o.prototype,"contributor",null);n([s()],o.prototype,"coverage",null);n([s()],o.prototype,"creator",null);n([s()],o.prototype,"creator_alt_script",null);n([s()],o.prototype,"credits",null);n([s()],o.prototype,"collection_layout",null);n([s()],o.prototype,"date",null);n([s()],o.prototype,"description",null);n([s()],o.prototype,"downloads",null);n([s()],o.prototype,"duration",null);n([s()],o.prototype,"external_identifier",null);n([s()],o.prototype,"external_link",null);n([s()],o.prototype,"files_count",null);n([s()],o.prototype,"frames_per_second",null);n([s()],o.prototype,"identifier_access",null);n([s()],o.prototype,"identifier_ark",null);n([s()],o.prototype,"identifier_bib",null);n([s()],o.prototype,"image_count",null);n([s()],o.prototype,"imagecount",null);n([s()],o.prototype,"indexdate",null);n([s()],o.prototype,"invoice",null);n([s()],o.prototype,"isbn",null);n([s()],o.prototype,"issue",null);n([s()],o.prototype,"issue_count",null);n([s()],o.prototype,"issue_page_count",null);n([s()],o.prototype,"item_count",null);n([s()],o.prototype,"item_size",null);n([s()],o.prototype,"language",null);n([s()],o.prototype,"lastdate",null);n([s()],o.prototype,"lastfiledate",null);n([s()],o.prototype,"lastfileserial",null);n([s()],o.prototype,"length",null);n([s()],o.prototype,"license",null);n([s()],o.prototype,"licenseurl",null);n([s()],o.prototype,"lineage",null);n([s()],o.prototype,"mature_content",null);n([s()],o.prototype,"md5",null);n([s()],o.prototype,"md5contents",null);n([s()],o.prototype,"md5s",null);n([s()],o.prototype,"medium",null);n([s()],o.prototype,"metadata_operator",null);n([s()],o.prototype,"metasource_catalog",null);n([s()],o.prototype,"monochromatic",null);n([s()],o.prototype,"month",null);n([s()],o.prototype,"mediatype",null);n([s()],o.prototype,"mpeg_program",null);n([s()],o.prototype,"next_item",null);n([s()],o.prototype,"noarchivetorrent",null);n([s()],o.prototype,"noindex",null);n([s()],o.prototype,"notes",null);n([s()],o.prototype,"num_favorites",null);n([s()],o.prototype,"num_reviews",null);n([s()],o.prototype,"numeric_id",null);n([s()],o.prototype,"numwarcs",null);n([s()],o.prototype,"ocr",null);n([s()],o.prototype,"ocr_autonomous",null);n([s()],o.prototype,"ocr_detected_lang",null);n([s()],o.prototype,"ocr_detected_lang_conf",null);n([s()],o.prototype,"ocr_detected_script",null);n([s()],o.prototype,"ocr_detected_script_conf",null);n([s()],o.prototype,"ocr_invalid_language",null);n([s()],o.prototype,"ocr_module_version",null);n([s()],o.prototype,"ocr_parameters",null);n([s()],o.prototype,"old_pallet",null);n([s()],o.prototype,"openlibrary_edition",null);n([s()],o.prototype,"openlibrary_work",null);n([s()],o.prototype,"operator",null);n([s()],o.prototype,"originalurl",null);n([s()],o.prototype,"osf_category",null);n([s()],o.prototype,"osf_project",null);n([s()],o.prototype,"osf_registration_doi",null);n([s()],o.prototype,"osf_registration_schema",null);n([s()],o.prototype,"osf_registry",null);n([s()],o.prototype,"osf_subjects",null);n([s()],o.prototype,"osf_tags",null);n([s()],o.prototype,"output_time_minutes",null);n([s()],o.prototype,"pacer_case_num",null);n([s()],o.prototype,"packaging_time_minutes",null);n([s()],o.prototype,"page_number_confidence",null);n([s()],o.prototype,"page_number_module_version",null);n([s()],o.prototype,"page_progression",null);n([s()],o.prototype,"paginated",null);n([s()],o.prototype,"parse_date",null);n([s()],o.prototype,"parse_state",null);n([s()],o.prototype,"partner",null);n([s()],o.prototype,"pashto_title",null);n([s()],o.prototype,"pashto_title_romanized",null);n([s()],o.prototype,"pdf_degraded",null);n([s()],o.prototype,"pdf_module_version",null);n([s()],o.prototype,"pick",null);n([s()],o.prototype,"podcastindexid",null);n([s()],o.prototype,"post_text",null);n([s()],o.prototype,"ppi",null);n([s()],o.prototype,"previous_item",null);n([s()],o.prototype,"program",null);n([s()],o.prototype,"publicdate",null);n([s()],o.prototype,"publisher",null);n([s()],o.prototype,"political_religious_party",null);n([s()],o.prototype,"rcs_key",null);n([s()],o.prototype,"repub_state",null);n([s()],o.prototype,"republisher_date",null);n([s()],o.prototype,"republisher_operator",null);n([s()],o.prototype,"republisher_time",null);n([s()],o.prototype,"reviewdate",null);n([s()],o.prototype,"reviews_allowed",null);n([s()],o.prototype,"ribbon_state",null);n([s()],o.prototype,"ribbon_state_modify_date",null);n([s()],o.prototype,"rights",null);n([s()],o.prototype,"rights_holder",null);n([s()],o.prototype,"rssfeed",null);n([s()],o.prototype,"runtime",null);n([s()],o.prototype,"scan_time_minutes",null);n([s()],o.prototype,"scandate",null);n([s()],o.prototype,"scanfee",null);n([s()],o.prototype,"scanner",null);n([s()],o.prototype,"scanner_operator",null);n([s()],o.prototype,"scanningcenter",null);n([s()],o.prototype,"scribe3_search_catalog",null);n([s()],o.prototype,"scribe3_search_id",null);n([s()],o.prototype,"segments",null);n([s()],o.prototype,"sessionid",null);n([s()],o.prototype,"shndiscs",null);n([s()],o.prototype,"shotlist",null);n([s()],o.prototype,"signal_path",null);n([s()],o.prototype,"size",null);n([s()],o.prototype,"sizehint",null);n([s()],o.prototype,"software_version",null);n([s()],o.prototype,"sort_order",null);n([s()],o.prototype,"sound",null);n([s()],o.prototype,"soundcreator",null);n([s()],o.prototype,"soundtitle",null);n([s()],o.prototype,"source",null);n([s()],o.prototype,"source_pixel_height",null);n([s()],o.prototype,"source_pixel_width",null);n([s()],o.prototype,"source_url",null);n([s()],o.prototype,"sponsor",null);n([s()],o.prototype,"sponsordate",null);n([s()],o.prototype,"start_localtime",null);n([s()],o.prototype,"start_time",null);n([s()],o.prototype,"station_name",null);n([s()],o.prototype,"stop_time",null);n([s()],o.prototype,"subject",null);n([s()],o.prototype,"taper",null);n([s()],o.prototype,"thumbs",null);n([s()],o.prototype,"times",null);n([s()],o.prototype,"title",null);n([s()],o.prototype,"title_alt_script",null);n([s()],o.prototype,"transferer",null);n([s()],o.prototype,"track",null);n([s()],o.prototype,"tts_version",null);n([s()],o.prototype,"tuner",null);n([s()],o.prototype,"type",null);n([s()],o.prototype,"updatedate",null);n([s()],o.prototype,"updater",null);n([s()],o.prototype,"uploader",null);n([s()],o.prototype,"uploadsoftware",null);n([s()],o.prototype,"utc_offset",null);n([s()],o.prototype,"venue",null);n([s()],o.prototype,"video_codec",null);n([s()],o.prototype,"volume",null);n([s()],o.prototype,"website",null);n([s()],o.prototype,"week",null);n([s()],o.prototype,"width",null);n([s()],o.prototype,"year",null);class re{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return le(this.rawValue,e=>ze.shared.parseValue(e),"reviewdate")}get createdate(){return le(this.rawValue,e=>ze.shared.parseValue(e),"createdate")}get stars(){return le(this.rawValue,e=>ie.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([s()],re.prototype,"reviewdate",null);n([s()],re.prototype,"createdate",null);n([s()],re.prototype,"stars",null);class gn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ue(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new re(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class nr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class yn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let d;try{const h=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(c.href,h)}catch(h){const g=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Te.networkError,g)}try{const h=await d.json(),g=h.error;if(g){const v=h.forensics;return this.getErrorResult(Te.searchEngineError,g,v)}else return{success:h}}catch(h){const g=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Te.decodingError,g)}}getErrorResult(e,t,a){return{error:new nr(e,t,a)}}}class Kr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new nr(Te.itemNotFound)}:{success:new gn(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new nr(Te.itemNotFound)}:{success:c.success.result}}}Kr.default=new Kr(new yn);function Zr(r){return new Promise(e=>setTimeout(e,r))}class sr{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}sr.shared=new sr;class or{shouldRetry(){return!1}retryDelay(){return null}}or.shared=new or;class ur{}ur.default=sr.shared;ur.noRetry=or.shared;const yi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class vn{constructor(e){this.retryConfig=ur.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=yi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,d;const h=typeof e=="string"?e:e.url;try{const g=await fetch(e,a?.requestInit);if(g.ok)return g;g.status>=400&&g.status<600&&this.log4xx5xxResponse(g);const v=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(v.shouldRetry(g,t)){const O=v.retryDelay(t,g);if(O!==null)return await Zr(O),this.logRetryEvent(h,t,g.statusText,g.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(h,g.status),g}catch(g){if(this.isContentBlockerError(g))throw this.logContentBlockingEvent(h,g),g;const v=(d=a?.retryConfig)!==null&&d!==void 0?d:this.retryConfig;if(v.shouldRetry(null,t)){const O=v.retryDelay(t);if(O!==null)return await Zr(O),this.logRetryEvent(h,t,g,g),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(h,g),g}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var d;(d=this.analyticsHandler)===null||d===void 0||d.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const _n=new Set(["POST","PUT","DELETE","PATCH"]);class dr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new vn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;a=this.addSearchParams(h,{reCache:"1"})}const d=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,d)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((v,N)=>{c.set(N,v)}),a.headers=c;const d=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(d,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,d,h;if(!this.getCsrfToken)return t;const g=(a=yi(t))!==null&&a!==void 0?a:{};if(!g.includeCsrfToken)return t;const v=(c=g.requestInit)!==null&&c!==void 0?c:{},N=((h=(d=v.method)!==null&&d!==void 0?d:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!_n.has(N))return t;const O=new Headers(v.headers);return O.has("X-CSRF-Token")?t:(O.set("X-CSRF-Token",await this.getCsrfToken()),{...g,requestInit:{...v,headers:O}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),d=a===-1?e:e.slice(0,a),h=d.indexOf("?"),g=h===-1?d:d.slice(0,h),v=new URLSearchParams(h===-1?"":d.slice(h+1)),N=dr.asSearchParams(t),O=new Set;N.forEach((Ze,ce)=>{O.has(ce)||(O.add(ce),v.delete(ce))}),N.forEach((Ze,ce)=>{v.append(ce,Ze)});const V=v.toString();return`${g}${V?`?${V}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class wn extends dr{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const bn="/write-review.php",Tn="/edit-reviews.php";class vi{constructor(e){this.fetchHandler=e?.fetchHandler??new wn,this.baseHost=e?.baseHost??"https://archive.org",this.submitPath=e?.submitPath??bn,this.deletePath=e?.deletePath??Tn,this.deleteMethod=e?.deleteMethod??"POST"}async submitReview(e){const t=new URLSearchParams;return t.append("identifier",e.identifier),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_stars",e.stars??"0"),e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:t})}async deleteReview(e){const t=new URLSearchParams;t.append("identifier",e.identifier),t.append("deleteReviewer",e.reviewer),e.reviewerItemname&&t.append("deleteReviewerItemname",e.reviewerItemname);const a=`${this.baseHost}${this.deletePath}?${t.toString()}`;return this.request(a,{method:this.deleteMethod})}async request(e,t){try{const a=await this.fetchHandler.fetch(e,{requestInit:{method:t.method,body:t.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(a)}catch(a){return console.error("Review request failed",a),{success:!1,error:this.genericError}}}async parseResult(e){let t;try{t=await e.json()}catch{t=void 0}return e.ok?!t||t.success?{success:!0}:{success:!1,error:t.error??this.genericError}:{success:!1,error:t?.error??this.genericError}}get genericError(){return E("Sorry, something went wrong. Please try again later.")}}const Sn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Jr(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return w`<span title="${r}">${t}</span>`}function Qr(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,a=Array(e);t<e;t++)a[t]=r[t];return a}function En(r){if(Array.isArray(r))return r}function Rn(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var a,c,d,h,g=[],v=!0,N=!1;try{if(d=(t=t.call(r)).next,e!==0)for(;!(v=(a=d.call(t)).done)&&(g.push(a.value),g.length!==e);v=!0);}catch(O){N=!0,c=O}finally{try{if(!v&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if(N)throw c}}return g}}function An(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xn(r,e){return En(r)||Rn(r,e)||Cn(r,e)||An()}function Cn(r,e){if(r){if(typeof r=="string")return Qr(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Qr(r,e):void 0}}const _i=Object.entries,ei=Object.setPrototypeOf,Ln=Object.isFrozen,kn=Object.getPrototypeOf,Dn=Object.getOwnPropertyDescriptor;let U=Object.freeze,B=Object.seal,Ne=Object.create,wi=typeof Reflect<"u"&&Reflect,ar=wi.apply,lr=wi.construct;U||(U=function(e){return e});B||(B=function(e){return e});ar||(ar=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),d=2;d<a;d++)c[d-2]=arguments[d];return e.apply(t,c)});lr||(lr=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const be=$(Array.prototype.forEach),On=$(Array.prototype.lastIndexOf),ti=$(Array.prototype.pop),Ye=$(Array.prototype.push),In=$(Array.prototype.splice),Ue=Array.isArray,Ke=$(String.prototype.toLowerCase),Yt=$(String.prototype.toString),ri=$(String.prototype.match),qe=$(String.prototype.replace),ii=$(String.prototype.indexOf),Pn=$(String.prototype.trim),Mn=$(Number.prototype.toString),Nn=$(Boolean.prototype.toString),ni=typeof BigInt>"u"?null:$(BigInt.prototype.toString),si=typeof Symbol>"u"?null:$(Symbol.prototype.toString),q=$(Object.prototype.hasOwnProperty),Xe=$(Object.prototype.toString),j=$(RegExp.prototype.test),fe=$n(TypeError);function $(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return ar(r,e,a)}}function $n(r){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return lr(r,t)}}function R(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ke;if(ei&&ei(r,null),!Ue(e))return r;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const d=t(c);d!==c&&(Ln(e)||(e[a]=d),c=d)}r[c]=!0}return r}function Fn(r){for(let e=0;e<r.length;e++)q(r,e)||(r[e]=null);return r}function J(r){const e=Ne(null);for(const a of _i(r)){var t=xn(a,2);const c=t[0],d=t[1];q(r,c)&&(Ue(d)?e[c]=Fn(d):d&&typeof d=="object"&&d.constructor===Object?e[c]=J(d):e[c]=d)}return e}function Un(r){switch(typeof r){case"string":return r;case"number":return Mn(r);case"boolean":return Nn(r);case"bigint":return ni?ni(r):"0";case"symbol":return si?si(r):"Symbol()";case"undefined":return Xe(r);case"function":case"object":{if(r===null)return Xe(r);const e=r,t=te(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:Xe(a)}return Xe(r)}default:return Xe(r)}}function te(r,e){for(;r!==null;){const a=Dn(r,e);if(a){if(a.get)return $(a.get);if(typeof a.value=="function")return $(a.value)}r=kn(r)}function t(){return null}return t}function zn(r){try{return j(r,""),!0}catch{return!1}}const oi=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Xt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bn=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Kt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hn=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ai=U(["#text"]),li=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Zt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ci=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ft=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),jn=B(/{{[\w\W]*|^[\w\W]*}}/g),Vn=B(/<%[\w\W]*|^[\w\W]*%>/g),Wn=B(/\${[\w\W]*/g),Gn=B(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yn=B(/^aria-[\-\w]+$/),ui=B(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),qn=B(/^(?:\w+script|data):/i),Xn=B(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Kn=B(/^html$/i),Zn=B(/^[a-z][.\w]*(-[.\w]+)+$/i),di=B(/<[/\w!]/g),pi=B(/<[/\w]/g),Jn=B(/<\/no(script|embed|frames)/i),Qn=B(/\/>/i),Z={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],es=U(R({},bi)),ts=(function(){const r={};return be(bi,e=>{r[e]=B(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(r)})(),rs=function(){return typeof window>"u"?null:window},is=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const d="dompurify"+(a?"#"+a:"");try{return e.createPolicy(d,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+d+" could not be created."),null}},hi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},me=function(e,t,a,c){return q(e,t)&&Ue(e[t])?R(c.base?J(c.base):{},e[t],c.transform):a},Jt=function(e,t,a){const c=q(e,t)?e[t]:void 0;return c&&typeof c=="object"?J(c):a()};function Ti(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:rs();const e=f=>Ti(f);if(e.version="3.4.16",e.removed=[],!r||!r.document||r.document.nodeType!==Z.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const a=t,c=a.currentScript;r.DocumentFragment;const d=r.HTMLTemplateElement,h=r.Node,g=r.Element,v=r.NodeFilter;r.NamedNodeMap===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const N=r.DOMParser,O=r.trustedTypes,V=g.prototype,Ze=te(V,"cloneNode"),ce=te(V,"remove"),hr=te(V,"removeAttributeNode"),Si=te(V,"nextSibling"),Se=te(V,"childNodes"),Ee=te(V,"parentNode"),fr=te(V,"shadowRoot"),Rt=te(V,"attributes"),ge=h&&h.prototype?te(h.prototype,"nodeType"):null,Re=h&&h.prototype?te(h.prototype,"nodeName"):null,Je=h&&h.prototype?te(h.prototype,"ownerDocument"):null,He=function(i){return ge?ge(i):i.nodeType},At=function(i){return Re?Re(i):i.nodeName};if(typeof d=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let Y,ye="",xt,mr=!1,je=0;const gr=function(){if(je>0)throw fe('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(i){gr(),je++;try{return Y.createHTML(i)}finally{je--}},Ei=function(i){gr(),je++;try{return Y.createScriptURL(i)}finally{je--}},Ri=function(){return mr||(xt=is(O,c),mr=!0),xt},Qe=t,Ct=Qe.implementation,yr=Qe.createNodeIterator,Ai=Qe.createDocumentFragment,xi=Qe.getElementsByTagName,Ci=a.importNode;let C=hi();e.isSupported=typeof _i=="function"&&typeof Ee=="function"&&Ct&&Ct.createHTMLDocument!==void 0;const Li=jn,ki=Vn,Di=Wn,Oi=Gn,Ii=Yn,Pi=qn,vr=Xn,Mi=Zn;let _r=ui,L=null;const Lt=R({},[...oi,...qt,...Xt,...Kt,...ai]);let k=null;const kt=R({},[...li,...Zt,...ci,...ft]);let ne=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,wr=null;const de=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let br=!0,Dt=!0,Tr=!1,Sr=!0,pe=!1,ve=!0,_e=!1,Ot=!1,et=null,tt=null,It=!1,xe=!1,rt=!1,it=!1,Er=!0,Rr=!1;const Ar="user-content-";let Pt=!0,Mt=!1,Ce={},Le=null;const xr=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Cr=null;const Lr=R({},["audio","video","img","source","image","track"]);let kr=null;const Dr=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",st="http://www.w3.org/2000/svg",se="http://www.w3.org/1999/xhtml";let ke=se,Nt=!1,$t=null;const Ni=R({},[nt,st,se],Yt),Or=U(["mi","mo","mn","ms","mtext"]);let Ft=R({},Or);const Ir=U(["annotation-xml"]);let Ut=R({},Ir);const $i=R({},["title","style","font","a","script"]);let We=null;const Fi=["application/xhtml+xml","text/html"],Ui="text/html";let P=null,De=null;const zi=t.createElement("form"),Pr=function(i){return i instanceof RegExp||i instanceof Function},zt=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(De&&De===i)return;(!i||typeof i!="object")&&(i={}),i=J(i),We=Fi.indexOf(i.PARSER_MEDIA_TYPE)===-1?Ui:i.PARSER_MEDIA_TYPE,P=We==="application/xhtml+xml"?Yt:Ke,L=me(i,"ALLOWED_TAGS",Lt,{transform:P}),k=me(i,"ALLOWED_ATTR",kt,{transform:P}),$t=me(i,"ALLOWED_NAMESPACES",Ni,{transform:Yt}),kr=me(i,"ADD_URI_SAFE_ATTR",Dr,{transform:P,base:Dr}),Cr=me(i,"ADD_DATA_URI_TAGS",Lr,{transform:P,base:Lr}),Le=me(i,"FORBID_CONTENTS",xr,{transform:P}),Ve=me(i,"FORBID_TAGS",J({}),{transform:P}),wr=me(i,"FORBID_ATTR",J({}),{transform:P}),Ce=q(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?J(i.USE_PROFILES):i.USE_PROFILES:!1,br=i.ALLOW_ARIA_ATTR!==!1,Dt=i.ALLOW_DATA_ATTR!==!1,Tr=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Sr=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pe=i.SAFE_FOR_TEMPLATES||!1,ve=i.SAFE_FOR_XML!==!1,_e=i.WHOLE_DOCUMENT||!1,xe=i.RETURN_DOM||!1,rt=i.RETURN_DOM_FRAGMENT||!1,it=i.RETURN_TRUSTED_TYPE||!1,It=i.FORCE_BODY||!1,Er=i.SANITIZE_DOM!==!1,Rr=i.SANITIZE_NAMED_PROPS||!1,Pt=i.KEEP_CONTENT!==!1,Mt=i.IN_PLACE||!1,_r=zn(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:ui,ke=typeof i.NAMESPACE=="string"?i.NAMESPACE:se,Ft=Jt(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>R({},Or)),Ut=Jt(i,"HTML_INTEGRATION_POINTS",()=>R({},Ir));const l=Jt(i,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(ne=Ne(null),q(l,"tagNameCheck")&&Pr(l.tagNameCheck)&&(ne.tagNameCheck=l.tagNameCheck),q(l,"attributeNameCheck")&&Pr(l.attributeNameCheck)&&(ne.attributeNameCheck=l.attributeNameCheck),q(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),B(ne),pe&&(Dt=!1),rt&&(xe=!0),Ce&&(L=R({},ai),k=Ne(null),Ce.html===!0&&(R(L,oi),R(k,li)),Ce.svg===!0&&(R(L,qt),R(k,Zt),R(k,ft)),Ce.svgFilters===!0&&(R(L,Xt),R(k,Zt),R(k,ft)),Ce.mathMl===!0&&(R(L,Kt),R(k,ci),R(k,ft))),de.tagCheck=null,de.attributeCheck=null,q(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?de.tagCheck=i.ADD_TAGS:Ue(i.ADD_TAGS)&&(L===Lt&&(L=J(L)),R(L,i.ADD_TAGS,P))),q(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?de.attributeCheck=i.ADD_ATTR:Ue(i.ADD_ATTR)&&(k===kt&&(k=J(k)),R(k,i.ADD_ATTR,P))),q(i,"ADD_FORBID_CONTENTS")&&Ue(i.ADD_FORBID_CONTENTS)&&(Le===xr&&(Le=J(Le)),R(Le,i.ADD_FORBID_CONTENTS,P)),Pt&&(L["#text"]=!0),_e&&R(L,["html","head","body"]),L.table&&(R(L,["tbody"]),delete Ve.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw fe('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw fe('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const p=Y;Y=i.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(m){throw Y=p,m}}else i.TRUSTED_TYPES_POLICY===null?(Y=void 0,ye=""):(Y===void 0&&(Y=Ri()),Y&&typeof ye=="string"&&(ye=Ae("")));U&&U(i),De=i},Mr=R({},[...qt,...Xt,...Bn]),Nr=R({},[...Kt,...Hn]),Bi=function(i,l,p){return l.namespaceURI===se?i==="svg":l.namespaceURI===nt?i==="svg"&&(p==="annotation-xml"||Ft[p]):!!Mr[i]},Hi=function(i,l,p){return l.namespaceURI===se?i==="math":l.namespaceURI===st?i==="math"&&Ut[p]:!!Nr[i]},ji=function(i,l,p){return l.namespaceURI===st&&!Ut[p]||l.namespaceURI===nt&&!Ft[p]?!1:!Nr[i]&&($i[i]||!Mr[i])},Vi=function(i){let l=Ee(i);(!l||!l.tagName)&&(l={namespaceURI:ke,tagName:"template"});const p=Ke(i.tagName),m=Ke(l.tagName);return $t[i.namespaceURI]?i.namespaceURI===st?Bi(p,l,m):i.namespaceURI===nt?Hi(p,l,m):i.namespaceURI===se?ji(p,l,m):!!(We==="application/xhtml+xml"&&$t[i.namespaceURI]):!1},he=function(i){Ye(e.removed,{element:i});try{Ee(i).removeChild(i)}catch{if(ce(i),!Ee(i))throw fe("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},$r=function(i,l,p){try{hr(i,l)}catch{try{i.removeAttribute(p)}catch{}}},ot=function(i){at(i);const l=Se(i);if(l){const m=[];be(l,y=>{Ye(m,y)}),be(m,y=>{try{ce(y)}catch{}})}const p=Rt(i);if(p)for(let m=p.length-1;m>=0;--m){const y=p[m],b=y&&y.name;typeof b=="string"&&$r(i,y,b)}},we=function(i,l,p){if(!p)try{p=l.getAttributeNode(i)}catch{p=null}Ye(e.removed,{attribute:p||null,from:l});try{p?hr(l,p):l.removeAttribute(i)}catch{try{l.removeAttribute(i)}catch{}}if(i==="is")if(xe||rt)try{he(l)}catch{}else try{l.setAttribute(i,"")}catch{}},Wi=function(i){const l=Rt(i);if(l)for(let p=l.length-1;p>=0;--p){const m=l[p],y=m&&m.name;typeof y!="string"||k[P(y)]||$r(i,m,y)}},at=function(i){const l=[i];for(;l.length>0;){const p=l.pop();He(p)===Z.element&&Wi(p);const m=Se(p);if(m)for(let y=m.length-1;y>=0;--y)l.push(m[y])}},Fr=function(i,l){return ve?i==="patchsrc"?!0:i==="for"&&l!=="label"&&l!=="output":!1},Gi=function(i){if(!ve)return;const l=[i];for(;l.length>0;){const p=l.pop(),m=He(p);if(m===Z.processingInstruction||m===Z.comment&&j(pi,p.data)){try{ce(p)}catch{}continue}if(m===Z.element){const b=p,S=P(At(p));try{b.hasAttribute&&b.hasAttribute("patchsrc")&&b.removeAttribute("patchsrc"),b.hasAttribute&&b.hasAttribute("for")&&Fr("for",S)&&b.removeAttribute("for")}catch{}}const y=Se(p);if(y)for(let b=y.length-1;b>=0;--b)l.push(y[b])}},Ur=function(i){let l=null,p=null;if(It)i="<remove></remove>"+i;else{const b=ri(i,/^[\r\n\t ]+/);p=b&&b[0]}We==="application/xhtml+xml"&&ke===se&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const m=Y?Ae(i):i;if(ke===se)try{l=new N().parseFromString(m,We)}catch{}if(!l||!l.documentElement){l=Ct.createDocument(ke,"template",null);try{l.documentElement.innerHTML=Nt?ye:m}catch{}}const y=l.body||l.documentElement;return i&&p&&y.insertBefore(t.createTextNode(p),y.childNodes[0]||null),ke===se?xi.call(l,_e?"html":"body")[0]:_e?l.documentElement:y},zr=function(i){const l=Je?Je(i):i.ownerDocument;return yr.call(l||i,i,v.SHOW_ELEMENT|v.SHOW_COMMENT|v.SHOW_TEXT|v.SHOW_PROCESSING_INSTRUCTION|v.SHOW_CDATA_SECTION,null)},lt=function(i){return i=qe(i,Li," "),i=qe(i,ki," "),i=qe(i,Di," "),i},Bt=function(i){var l;i.normalize();const p=Je?Je(i):i.ownerDocument,m=yr.call(p||i,i,v.SHOW_TEXT|v.SHOW_COMMENT|v.SHOW_CDATA_SECTION|v.SHOW_PROCESSING_INSTRUCTION,null);let y=m.nextNode();for(;y;)y.data=lt(y.data),y=m.nextNode();const b=(l=i.querySelectorAll)===null||l===void 0?void 0:l.call(i,"template");b&&be(b,S=>{Oe(S.content)&&Bt(S.content)})},ct=function(i){const l=Re?Re(i):null;return typeof l!="string"||P(l)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==Rt(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ge(i)||i.childNodes!==Se(i)},Oe=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return ge(i)===Z.documentFragment}catch{return!1}},Ge=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return typeof ge(i)=="number"}catch{return!1}};function oe(f,i,l){f.length!==0&&be(f,p=>{p.call(e,i,l,De)})}const Yi=function(i,l){return!!(ve&&i.hasChildNodes()&&!Ge(i.firstElementChild)&&j(di,i.textContent)&&j(di,i.innerHTML)||ve&&i.namespaceURI===se&&es[l]&&(Ge(i.firstElementChild)||typeof i.textContent=="string"&&j(ts[l],i.textContent))||i.nodeType===Z.processingInstruction||ve&&i.nodeType===Z.comment&&j(pi,i.data))},ut=function(i,l){if(i instanceof RegExp)return j(i,l);if(i instanceof Function){for(var p=arguments.length,m=new Array(p>2?p-2:0),y=2;y<p;y++)m[y-2]=arguments[y];return!!i(l,...m)}return!1},qi=function(i,l,p){if(!Ve[l]&&Vr(l)&&ut(ne.tagNameCheck,l))return!1;if(Pt&&!Le[l]){const m=Ee(i),y=Se(i);if(y&&m){const b=y.length;for(let S=b-1;S>=0;--S){const I=i===p?Ze(y[S],!0):y[S];m.insertBefore(I,Si(i))}}}return he(i),!0},Br=function(i,l,p,m){return i.length===0?l:l===p||l===m?J(l):l},Ie=function(i,l){return i===l||Ee(i)!==null?!1:(Mt&&at(i),!0)},Hr=function(i,l){if(oe(C.beforeSanitizeElements,i,null),Ie(i,l))return!0;if(ct(i))return he(i),!0;const p=P(At(i));if(L=Br(C.uponSanitizeElement,L,Lt,et),oe(C.uponSanitizeElement,i,{tagName:p,allowedTags:L}),Ie(i,l))return!0;if(Yi(i,p))return he(i),!0;if(Ve[p]||!(de.tagCheck instanceof Function&&de.tagCheck(p))&&!L[p]){const m=qi(i,p,l);return m===!1&&(oe(C.afterSanitizeElements,i,null),Ie(i,l))?!0:m}if(He(i)===Z.element&&!Vi(i)||(p==="noscript"||p==="noembed"||p==="noframes")&&j(Jn,i.innerHTML))return he(i),!0;if(pe&&i.nodeType===Z.text){const m=lt(i.textContent);i.textContent!==m&&(Ye(e.removed,{element:i.cloneNode()}),i.textContent=m)}return oe(C.afterSanitizeElements,i,null),Ie(i,l)},jr=function(i,l,p){if(wr[l]||Fr(l,i)||Er&&(l==="id"||l==="name")&&(p in t||p in zi))return!1;const m=k[l]||de.attributeCheck instanceof Function&&de.attributeCheck(l,i);return Dt&&j(Oi,l)||br&&j(Ii,l)?!0:m?kr[l]||j(_r,qe(p,vr,""))||(l==="src"||l==="xlink:href"||l==="href")&&i!=="script"&&ii(p,"data:")===0&&Cr[i]||Tr&&!j(Pi,qe(p,vr,""))?!0:!p:Vr(i)&&ut(ne.tagNameCheck,i)&&ut(ne.attributeNameCheck,l,i)||l==="is"&&ne.allowCustomizedBuiltInElements&&ut(ne.tagNameCheck,p)},Xi=R({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Vr=function(i){return!Xi[Ke(i)]&&j(Mi,i)},Ki=function(i,l,p,m){if(Y&&typeof O=="object"&&typeof O.getAttributeType=="function"&&!p)switch(O.getAttributeType(i,l)){case"TrustedHTML":return Ae(m);case"TrustedScriptURL":return Ei(m)}return m},Zi=function(i,l,p,m){try{return p?i.setAttributeNS(p,l,m):i.setAttribute(l,m),ct(i)?(he(i),!1):!0}catch{return we(l,i),!1}},Wr=function(i,l){if(oe(C.beforeSanitizeAttributes,i,null),Ie(i,l))return;const p=i.attributes;if(!p||ct(i))return;k=Br(C.uponSanitizeAttribute,k,kt,tt);const m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:k,forceKeepAttr:void 0};let y=p.length;const b=P(i.nodeName);for(;y--;){const S=p[y],I=S.name,ee=S.namespaceURI,K=S.value,Pe=P(I),jt=K;let W=I==="value"?jt:Pn(jt),Gr=!1;if(m.attrName=Pe,m.attrValue=W,m.keepAttr=!0,m.forceKeepAttr=void 0,oe(C.uponSanitizeAttribute,i,m),W=m.attrValue,Rr&&(Pe==="id"||Pe==="name")&&ii(W,Ar)!==0&&(we(I,i,S),W=Ar+W,Gr=!0),ve&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,W)){we(I,i,S);continue}if(Pe==="attributename"&&ri(W,"href")){we(I,i,S);continue}if(!m.forceKeepAttr){if(!m.keepAttr){we(I,i,S);continue}if(!Sr&&j(Qn,W)){we(I,i,S);continue}if(pe&&(W=lt(W)),!jr(b,Pe,W)){we(I,i,S);continue}W=Ki(b,Pe,ee,W),W!==jt&&Zi(i,I,ee,W)&&Gr&&ti(e.removed)}}oe(C.afterSanitizeAttributes,i,null),Ie(i,l)},dt=function(i){let l=null;const p=zr(i);for(oe(C.beforeSanitizeShadowDOM,i,null);l=p.nextNode();)if(oe(C.uponSanitizeShadowNode,l,null),Hr(l,i),Wr(l,i),Oe(l.content)&&dt(l.content),He(l)===Z.element){const m=fr(l);Oe(m)&&(Ht(m),dt(m))}oe(C.afterSanitizeShadowDOM,i,null)},Ht=function(i){const l=[{node:i,shadow:null}];for(;l.length>0;){const p=l.pop();if(p.shadow){dt(p.shadow);continue}const m=p.node,y=He(m)===Z.element,b=Se(m);if(b)for(let S=b.length-1;S>=0;--S)l.push({node:b[S],shadow:null});if(y){const S=Re?Re(m):null;if(typeof S=="string"&&P(S)==="template"){const I=m.content;Oe(I)&&l.push({node:I,shadow:null})}}if(y){const S=fr(m);Oe(S)&&l.push({node:null,shadow:S},{node:S,shadow:null})}}};return e.sanitize=function(f){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,p=null,m=null,y=null;if(Nt=!f,Nt&&(f="<!-->"),typeof f!="string"&&!Ge(f)&&(f=Un(f),typeof f!="string"))throw fe("dirty is not a string, aborting");if(!e.isSupported)return f;Ot?(L=et,k=tt):zt(i),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(L=J(L)),C.uponSanitizeAttribute.length>0&&(k=J(k)),e.removed=[];const b=Mt&&typeof f!="string"&&Ge(f);if(b){Gi(f);const ee=At(f);if(typeof ee=="string"){const K=P(ee);if(!L[K]||Ve[K])throw ot(f),fe("root node is forbidden and cannot be sanitized in-place")}if(ct(f))throw ot(f),fe("root node is clobbered and cannot be sanitized in-place");try{Ht(f)}catch(K){throw ot(f),K}}else if(Ge(f))l=Ur("<!---->"),p=l.ownerDocument.importNode(f,!0),p.nodeType===Z.element&&p.nodeName==="BODY"||p.nodeName==="HTML"?l=p:l.appendChild(p),Ht(l);else{if(!xe&&!pe&&!_e&&f.indexOf("<")===-1)return Y&&it?Ae(f):f;if(l=Ur(f),!l)return xe?null:it?ye:""}l&&It&&he(l.firstChild);const S=b?f:l;try{const ee=zr(S);for(;m=ee.nextNode();)Hr(m,S),Wr(m,S),Oe(m.content)&&dt(m.content)}catch(ee){throw b&&(ot(f),be(e.removed,K=>{K.element&&at(K.element)})),ee}if(b){let ee=!1;if(be(e.removed,K=>{K.element&&(K.element===f&&(ee=!0),at(K.element))}),ee)throw fe("a node selected for removal could not be safely returned; refusing to sanitize in place");return pe&&Bt(f),f}if(xe){if(pe&&Bt(l),rt)for(y=Ai.call(l.ownerDocument);l.firstChild;)y.appendChild(l.firstChild);else y=l;return(k.shadowroot||k.shadowrootmode)&&(y=Ci.call(a,y,!0)),y}let I=_e?l.outerHTML:l.innerHTML;return _e&&L["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&j(Kn,l.ownerDocument.doctype.name)&&(I="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+I),pe&&(I=lt(I)),Y&&it?Ae(I):I},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};zt(f),Ot=!0,et=L,tt=k},e.clearConfig=function(){De=null,Ot=!1,et=null,tt=null,Y=xt,ye=""},e.isValidAttribute=function(f,i,l){De||zt({});const p=P(f),m=P(i);return jr(p,m,l)},e.addHook=function(f,i){typeof i=="function"&&q(C,f)&&Ye(C[f],i)},e.removeHook=function(f,i){if(q(C,f)){if(i!==void 0){const l=On(C[f],i);return l===-1?void 0:In(C[f],l,1)[0]}return ti(C[f])}},e.removeHooks=function(f){q(C,f)&&(C[f]=[])},e.removeAllHooks=function(){C=hi()},e}var mt=Ti();const ns=["a"];function ss(r){mt.addHook("afterSanitizeAttributes",os);try{return mt.sanitize(r,{ALLOWED_TAGS:ns})}finally{mt.removeHook("afterSanitizeAttributes")}}function os(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function as(r,e=100,t=!0){if(r.length<e)return r;let a=e;if(t){const c=r.indexOf(" ",e),d=c-e<=20;if(d&&c===r.length-1)return r;c!==-1&&d&&(a=c)}return ls(r,a,e)}function ls(r,e,t){let a=r.slice(0,e);const c=a.match(/<a/gi);if(c){const d=a.match(/<\/a/gi);if(!d||d.length<c.length){const h=r.indexOf("</a>",e),g=h-t<=20;if(g&&r.length===h+4)return r;if(h!==-1&&g)a=r.slice(0,h+4);else{const v=a.lastIndexOf("<a");a=r.slice(0,v)}}}return a.concat("...")}const cs=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function us(r){return r.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(cs,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function ds(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const ps="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var hs=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,Q=(r,e,t,a)=>{for(var c=a>1?void 0:a?fs(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&hs(e,t,c),c};let X=class extends St{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1}render(){return this.review?w`
          <article
            class="review"
            id=${this.generateDomId()}
            tabindex=${Ji(this.hasReviewerLink?void 0:"-1")}
          >
            ${this.canDelete?w`
                  <button
                    class="delete-btn"
                    title=${E("Delete this review")}
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${ps}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:z}
            <div class="top-line">
              <b>${E("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${E("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteOutcome?w`<i>${this.deleteOutcomeMessage}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:w`
          <div class="error">
            ${E("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return z;const e=ss(r),t=this.truncateContent(e,this.maxBodyLength);return w`${fi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?z:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?z:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return w`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${E("More...")}
      </button>
    `}get lessButtonTemplate(){return w`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${E("...Less")}
    </button>`}focus(r){(this.reviewerLink??this.reviewArticle)?.focus(r)}get hasReviewerLink(){return!!this.review?.reviewer_itemname}get reviewerTemplate(){return this.review?this.hasReviewerLink?w`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Jr(this.review.reviewer)}
            </a>
          `:w`${Jr(this.review.reviewer)}`:z}get starsTemplate(){return!this.review||!this.review.stars?z:w`
      <div
        class="review-stars"
        title=${E(Fe`${this.review.stars} out of 5 stars`)}
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>w`<div class="review-star">
              <img
                class="star-basic"
                src=${Sn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return z;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"});return r.getTime()!==e.getTime()?E(Fe`${t} (edited)`):t}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:as(r,e)}prepReview(r){return ds(us(r))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(E("Are you sure you want to delete this review?")))return;if(!this.reviewService){this.deleteOutcome={status:"failed"};return}const r=await this.reviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteOutcome=r.success?{status:"queued"}:{status:"failed",error:r.error}}get deleteOutcomeMessage(){return this.deleteOutcome?.status==="queued"?E("This review has been queued for deletion."):this.deleteOutcome?.error??E("Sorry, we were unable to delete this review.")}static get styles(){return Et`
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
    `}};Q([T({type:Object})],X.prototype,"review",2);Q([T({type:String})],X.prototype,"identifier",2);Q([T({type:Number})],X.prototype,"maxSubjectLength",2);Q([T({type:Number})],X.prototype,"maxBodyLength",2);Q([T({type:String})],X.prototype,"baseHost",2);Q([T({type:Object})],X.prototype,"reviewService",2);Q([T({type:Boolean})],X.prototype,"canDelete",2);Q([T({type:Boolean})],X.prototype,"bypassTruncation",2);Q([H()],X.prototype,"showTruncatedContent",2);Q([H()],X.prototype,"deleteOutcome",2);Q([bt(".reviewer-link")],X.prototype,"reviewerLink",2);Q([bt("article.review")],X.prototype,"reviewArticle",2);X=Q([Tt("ia-review"),cr()],X);const ms="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",gs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var ys=Object.defineProperty,vs=Object.getOwnPropertyDescriptor,F=(r,e,t,a)=>{for(var c=a>1?void 0:a?vs(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ys(e,t,c),c};let M=class extends St{constructor(){super(...arguments),this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.recaptchaUnavailable=!1,this.formCanSubmit=!1,this.submissionInProgress=!1}render(){return w`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableErrorMessage?this.unrecoverableErrorTemplate:w`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(r){r.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),r.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),(r.has("unrecoverableError")||r.has("recaptchaUnavailable"))&&(this.formCanSubmit=this.checkSubmissionAllowed()),(r.has("currentSubjectLength")||r.has("currentBodyLength")||r.has("maxSubjectLength")||r.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){const r=this.unrecoverableErrorMessage;return r?w`
          <div class="unrecoverable-error">
            <span class="error-msg">${r}</span>
          </div>
        `:z}get recoverableErrorTemplate(){const r=this.recoverableErrorMessage;return r?w`
          <div class="recoverable-error">
            ${fi(this.sanitizeErrorMsg(r))}
          </div>
        `:z}get unrecoverableErrorMessage(){return this.unrecoverableError?this.unrecoverableError:this.recaptchaUnavailable?this.recaptchaErrorMessage:void 0}get recoverableErrorMessage(){if(this.recoverableError)return this.recoverableError;switch(this.formError){case"recaptcha":return this.recaptchaErrorMessage;case"generic":return this.genericErrorMessage;default:return}}get recaptchaErrorMessage(){return E("Could not validate review. Please try again later.")}get genericErrorMessage(){return E("There's been a temporary error. Please wait a moment and try again.")}get recaptchaMessageTemplate(){return this.bypassRecaptcha?z:w`
      <span class="recaptcha-disclaimer"
        >${E(w`This site is protected by reCAPTCHA and the Google
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
    `}get subjectInputTemplate(){return w`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${E("Subject")}</label>
        ${this.maxSubjectLength?w`<div class="char-count subject">
                ${this.currentSubjectLength}/${this.maxSubjectLength}
              </div>`:z}
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
              ${E(Fe`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:z}</div></span>
    `}get bodyInputTemplate(){return w`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${E("Review")}</label>
          ${this.maxBodyLength?w`<div class="char-count body">
                ${this.currentBodyLength}/${this.maxBodyLength}
              </div>`:z}
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
                ${E(Fe`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:z}
      </span>
    `}get actionButtonsTemplate(){return w`<div class="action-btns">
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
    </div>`}renderStar(r){const e=r===this.currentStars,t=r===1?E("Rate 1 star"):E(Fe`Rate ${r} stars`);return w`
      <button
        class="star star-${r}"
        title=${e?E("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,r)}
      >
        ${r<=this.currentStars?w`<img
              class="star-selected"
              src=${ms}
              alt=""
              aria-hidden="true"
            />`:w`<img
              class="star-unselected"
              src=${gs}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.recaptchaUnavailable=!0}}sanitizeErrorMsg(r){return mt.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",this.formError=void 0,!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.reviewService||!this.identifier)return this.formError="generic",this.stopSubmission();try{let e;if(!this.bypassRecaptcha&&(e=await this.getRecaptchaToken(),!e))return this.handleRecaptchaError();const t=await this.reviewService.submitReview({identifier:this.identifier,title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else t.error?this.recoverableError=t.error:this.formError="generic",this.stopSubmission()}catch(e){console.error(e),this.formError="generic",this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new re({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname??E("Anonymous"),reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.formError="recaptcha",this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableErrorMessage||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Et`
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
      `]}};F([T({type:String})],M.prototype,"identifier",2);F([T({type:String})],M.prototype,"submitterScreenname",2);F([T({type:String})],M.prototype,"submitterItemname",2);F([T({type:Object})],M.prototype,"oldReview",2);F([T({type:String})],M.prototype,"unrecoverableError",2);F([T({type:Number})],M.prototype,"maxSubjectLength",2);F([T({type:Number})],M.prototype,"maxBodyLength",2);F([T({type:Object})],M.prototype,"reviewService",2);F([T({type:Object})],M.prototype,"recaptchaManager",2);F([T({type:Boolean})],M.prototype,"bypassRecaptcha",2);F([H()],M.prototype,"currentStars",2);F([H()],M.prototype,"currentSubjectLength",2);F([H()],M.prototype,"currentBodyLength",2);F([H()],M.prototype,"recoverableError",2);F([H()],M.prototype,"formError",2);F([H()],M.prototype,"recaptchaUnavailable",2);F([H()],M.prototype,"formCanSubmit",2);F([H()],M.prototype,"submissionInProgress",2);F([bt("#review-form")],M.prototype,"reviewForm",2);M=F([Tt("ia-review-form"),cr()],M);var _s=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,x=(r,e,t,a)=>{for(var c=a>1?void 0:a?ws(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&_s(e,t,c),c};let A=class extends St{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.maxInitialReviews=5,this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.showAllReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:w`
      <div class="reviews-list">
        ${this.reviewsFrozen?w`<div class="message">
              ${E("Reviews can no longer be added to this item.")}
            </div>`:z}
        ${this.editableCurrentReviewTemplate}
        ${this.visibleReviews.map(r=>this.renderReview(r))}
        ${this.showMoreButtonTemplate}
      </div>
    `}willUpdate(r){(!this.activeReviewService||r.has("reviewService")||r.has("baseHost"))&&(this.activeReviewService=this.reviewService??new vi({baseHost:this.baseHost})),(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0)}get visibleReviews(){return this.showAllReviews||this.displayReviewsByDefault?this.filteredReviews:this.filteredReviews.slice(0,this.maxInitialReviews)}get reviewsDisabledTemplate(){return w`<div class="message">
      ${E("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?w`
        <div class="message">
          ${E("Reviews cannot be added to this item.")}
        </div>
      `:w`
      <div class="message">
        ${E("There are no reviews yet.")}
        ${E(w`
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
    `}get showMoreButtonTemplate(){const r=this.filteredReviews.length-this.visibleReviews.length;return r<=0?z:w`
      <ia-button
        mode="link"
        class="show-more-btn"
        @click=${this.showMoreReviews}
      >
        ${r===1?E("Show 1 more review"):E(Fe`Show ${r} more reviews`)}
      </ia-button>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?z:w`<div class="own-review-container">
      ${this.displayReviewForm?w`<ia-review-form
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
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{t.reviewer_itemname!==this.submitterItemname?e.push(t):r||(r=t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r){return r?w`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:z}async showMoreReviews(){const r=this.visibleReviews.length;this.showAllReviews=!0,await this.updateComplete;const e=this.listedReviews?.[r];await e?.updateComplete,e?.focus()}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1}static get styles(){return[Et`
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
      `]}};x([T({type:String})],A.prototype,"identifier",2);x([T({type:Array})],A.prototype,"reviews",2);x([T({type:Boolean})],A.prototype,"reviewsDisabled",2);x([T({type:Boolean})],A.prototype,"reviewsFrozen",2);x([T({type:Boolean})],A.prototype,"canDelete",2);x([T({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([T({type:Number})],A.prototype,"maxInitialReviews",2);x([T({type:Number})],A.prototype,"maxSubjectLength",2);x([T({type:Number})],A.prototype,"maxBodyLength",2);x([T({type:String})],A.prototype,"baseHost",2);x([T({type:String})],A.prototype,"submitterScreenname",2);x([T({type:String})],A.prototype,"submitterItemname",2);x([T({type:Object})],A.prototype,"recaptchaManager",2);x([T({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([T({type:String})],A.prototype,"reviewSubmissionError",2);x([T({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([T({type:Object})],A.prototype,"reviewService",2);x([H()],A.prototype,"activeReviewService",2);x([H()],A.prototype,"displayReviewForm",2);x([H()],A.prototype,"showAllReviews",2);x([H()],A.prototype,"filteredReviews",2);x([H()],A.prototype,"currentReview",2);x([H()],A.prototype,"reviewsCount",2);x([H()],A.prototype,"recaptchaActivated",2);x([Qi(".reviews-list > ia-review")],A.prototype,"listedReviews",2);A=x([Tt("ia-reviews"),cr()],A);var bs=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,pr=(r,e,t,a)=>{for(var c=a>1?void 0:a?Ts(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&bs(e,t,c),c};const Ss=[new re({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new re({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new re({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"}),new re({stars:4,reviewtitle:"Solid transfer",reviewbody:"Clean audio, good notes. Would listen again.",reviewer:"Dee Okafor",reviewer_itemname:"@dee-okafor",reviewdate:"2026-05-30",createdate:"2026-05-30"}),new re({stars:5,reviewtitle:"A favourite",reviewbody:"I come back to this one every year.",reviewer:"Eli Marsh",reviewer_itemname:"@eli-marsh",reviewdate:"2026-04-11",createdate:"2026-04-11"}),new re({stars:2,reviewtitle:"Not for me",reviewbody:"Well made, but the style never clicked for me.",reviewer:"Fen Albright",reviewer_itemname:"@fen-albright",reviewdate:"2026-03-08",createdate:"2026-03-08"}),new re({stars:4,reviewtitle:"Worth it for the second half",reviewbody:"Slow start, but it earns the ending.",reviewer:"Gus Tanaka",reviewer_itemname:"@gus-tanaka",reviewdate:"2026-02-19",createdate:"2026-02-19"})],Es=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],Rs=[{label:'Max reviews before "Show more"',propertyName:"maxInitialReviews",defaultValue:5,inputType:"number"},{label:"Show every review, untruncated",propertyName:"displayReviewsByDefault",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],As={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},xs=new vi({fetchHandler:As}),Cs=6;let wt=class extends St{constructor(){super(...arguments),this.log=[]}render(){return w`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:Es}}
        .propInputData=${{settings:Rs}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${Ss}
          .reviewService=${xs}
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,Cs)}static get styles(){return Et`
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
    `}};pr([H()],wt.prototype,"log",2);pr([bt("ia-reviews")],wt.prototype,"reviews",2);wt=pr([Tt("ia-reviews-story")],wt);export{wt as IAReviewsStory};
