import{b as w,r as G,n as T,c as vt,i as bt,A as B,o as yi,a as wt}from"./index-BrgKXXkh.js";import{e as _i}from"./query-BxRuD20q.js";import{_ as n,i as H}from"./lit-element-BBvI6DfD.js";import{m as S}from"./runtime-CCgtQBty.js";import"./ia-status-indicator-WfiDF4Ax.js";import"./story-template-CNyluBwS.js";import"./masked-icon-b7rxdhsk.js";function o(i){let e,t,a;return e=i,(c,p,h)=>{if(h.value!=null)h.value=Xr(h.value,e,t,a);else if(h.get!=null)h.get=Xr(h.get,e,t,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ht=new Map;function Xr(i,e,t=0,a){const c=Symbol("__memoized_map__");return function(...p){let h;this.hasOwnProperty(c)||Object.defineProperty(this,c,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let y=this[c];if(Array.isArray(a))for(const _ of a)Ht.has(_)?Ht.get(_).push(y):Ht.set(_,[y]);if(e||p.length>0||t>0){let _;e===!0?_=p.map(te=>te.toString()).join("!"):e?_=e.apply(this,p):_=p[0];const $=`${_}__timestamp`;let N=!1;if(t>0)if(!y.has($))N=!0;else{let te=y.get($);N=Date.now()-te>t}y.has(_)&&!N?h=y.get(_):(h=i.apply(this,p),y.set(_,h),t>0&&y.set($,Date.now()))}else{const _=this;y.has(_)?h=y.get(_):(h=i.apply(this,p),y.set(_,h))}return h}}class ft{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}ft.shared=new ft;class ie{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ie.shared=new ie;class mt{parseValue(e){return ie.shared.parseValue(e)}}mt.shared=new mt;class Be{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,p,h="00",y="00",_="00"]=t,$=new Date(`${a}-${c}-${p}T${h}:${y}:${_}`);return Number.isNaN($.getTime())?void 0:$}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}Be.shared=new Be;class gt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,p)=>{const h=parseFloat(c);if(Number.isNaN(h))return t=!0,0;const _=60**(e.length-1-p);return h*Math.floor(_)}).reduce((c,p)=>c+p,0);return t?void 0:a}}gt.shared=new gt;class vi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(p=>p.trim()).map(p=>this.parser.parseValue(p)),c=[];return a.forEach(p=>{p!==void 0&&c.push(p)}),c}}class yt{parseValue(e){return String(e)}}yt.shared=new yt;function Ie(i,e,...t){for(const a of t){const c=i[a];if(c!=null)return e(c)}}function ce(i,e,...t){return Ie(i,a=>e(a),...t)}class ue{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ie.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ce(this.rawValue,e=>mt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ce(this.rawValue,e=>gt.shared.parseValue(e),"length")}get height(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"height")}get width(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"width")}get track(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"bitrate")}get private(){return ce(this.rawValue,e=>ft.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([o()],ue.prototype,"mtime",null);n([o()],ue.prototype,"size",null);n([o()],ue.prototype,"length",null);n([o()],ue.prototype,"height",null);n([o()],ue.prototype,"width",null);n([o()],ue.prototype,"track",null);n([o()],ue.prototype,"bitrate",null);n([o()],ue.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}n([o()],W.prototype,"values",null);n([o()],W.prototype,"value",null);class le extends W{constructor(e){super(ft.shared,e)}}class D extends W{constructor(e){super(Be.shared,e)}}class jt extends W{constructor(e){super(gt.shared,e)}}class b extends W{constructor(e){super(ie.shared,e)}}class u extends W{constructor(e){super(yt.shared,e)}}class ze{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Ne extends W{constructor(e,t){super(t,e)}}const rn=new ze(["rl","lr"]);class nn extends Ne{constructor(e){super(e,rn)}}class ut extends W{constructor(e){super(mt.shared,e)}}const on=new ze(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class sn extends Ne{constructor(e){super(e,on)}}class bi extends W{constructor(e,t){super(t,e)}}class Kr extends bi{constructor(e){const t=new vi(yt.shared);super(e,t)}}class Vt extends bi{constructor(e){const t=new vi(ie.shared);super(e,t)}}const an=/^([0-9a-f]{32})\s+\*?(.+)$/i,ln=/^(.+):([0-9a-f]{32})$/i;function cn(i){const e=i.match(an);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=i.match(ln);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(cn).filter(a=>a!==void 0);return t.length?t:void 0}}tr.shared=new tr;class Zr extends W{constructor(e){super(tr.shared,e)}}function dt(i,e){var t;const a=i.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class rr{parseValue(e){if(typeof e!="string")return;const t=dt(e,"curator"),a=dt(e,"date"),c=dt(e,"comment"),p=dt(e,"state");if(!(!t&&!a&&!c&&!p))return{curator:t,date:a?Be.shared.parseValue(a):void 0,comment:c,state:p}}}rr.shared=new rr;class un extends W{constructor(e){super(rr.shared,e)}}class ir{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}ir.shared=new ir;class dn extends W{constructor(e){super(ir.shared,e)}}class nr{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),p=parseInt(t[3],10);return{hours:a*c,minutes:p,totalMinutes:a*(c*60+p)}}}nr.shared=new nr;class pn extends W{constructor(e){super(nr.shared,e)}}class or{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}or.shared=new or;class hn extends W{constructor(e){super(or.shared,e)}}const fn=new ze(["true","none","frozen"]),mn=new ze(["sound","silent"]),gn=new ze(["color","b&w"]),yn=new ze(["mode/1up","mode/2up","mode/thumb"]);class s{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(b,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(b,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(b,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(b,"bookplateleaf")}get bookreader_defaults(){return Ie(this.rawMetadata,e=>new Ne(e,yn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(un,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(b,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(b,"firstfileserial")}get foldoutcount(){return this.field(b,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(le,"has_mp3")}get height(){return this.field(b,"height")}get hidden(){return this.field(le,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(le,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(dn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(b,"audio_sample_rate")}get avg_rating(){return this.field(b,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(le,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(ut,"collection_size")}get color(){return Ie(this.rawMetadata,e=>new Ne(e,gn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(b,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(b,"files_count")}get frames_per_second(){return this.field(b,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(b,"image_count")}get imagecount(){return this.field(b,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(b,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(b,"issue_count")}get issue_page_count(){return this.field(b,"issue_page_count")}get item_count(){return this.field(b,"item_count")}get item_size(){return this.field(ut,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(b,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(le,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Zr,"md5contents")}get md5s(){return this.field(Zr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(le,"monochromatic")}get month(){return this.field(b,"month")}get mediatype(){return this.field(sn,"mediatype")}get mpeg_program(){return this.field(b,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(le,"noarchivetorrent")}get noindex(){return this.field(le,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(b,"num_favorites")}get num_reviews(){return this.field(b,"num_reviews")}get numeric_id(){return this.field(b,"numeric_id")}get numwarcs(){return this.field(b,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(le,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(b,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(b,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(b,"output_time_minutes")}get pacer_case_num(){return this.field(b,"pacer-case-num")}get packaging_time_minutes(){return this.field(b,"packaging_time_minutes")}get page_number_confidence(){return this.field(b,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(nn,"page-progression","page_progression")}get paginated(){return this.field(le,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(b,"pick")}get podcastindexid(){return this.field(b,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(b,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(b,"rcs_key")}get repub_state(){return this.field(b,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(Kr,"republisher_operator")}get republisher_time(){return this.field(b,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Ie(this.rawMetadata,e=>new Ne(e,fn),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(b,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(b,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(ut,"size")}get sizehint(){return this.field(ut,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Ie(this.rawMetadata,e=>new Ne(e,mn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(b,"source_pixel_height")}get source_pixel_width(){return this.field(b,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(Kr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(b,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(hn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(pn,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(b,"week")}get width(){return this.field(b,"width")}get year(){return this.field(b,"year")}field(e,...t){return Ie(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}n([o()],s.prototype,"access",null);n([o()],s.prototype,"adder",null);n([o()],s.prototype,"amrc_id",null);n([o()],s.prototype,"archiveit_account_id",null);n([o()],s.prototype,"archiveit_account_organization_name",null);n([o()],s.prototype,"archiveit_collection_id",null);n([o()],s.prototype,"archiveit_collection_name",null);n([o()],s.prototype,"archiveit_job_type",null);n([o()],s.prototype,"audit_time_minutes",null);n([o()],s.prototype,"auditor",null);n([o()],s.prototype,"author",null);n([o()],s.prototype,"autocrop_version",null);n([o()],s.prototype,"bookplateleaf",null);n([o()],s.prototype,"bookreader_defaults",null);n([o()],s.prototype,"boxid",null);n([o()],s.prototype,"camera",null);n([o()],s.prototype,"cameraman",null);n([o()],s.prototype,"canister",null);n([o()],s.prototype,"case_name",null);n([o()],s.prototype,"col_number",null);n([o()],s.prototype,"collection_added",null);n([o()],s.prototype,"collection_library",null);n([o()],s.prototype,"collection_set",null);n([o()],s.prototype,"copyright_holder",null);n([o()],s.prototype,"court",null);n([o()],s.prototype,"crawler",null);n([o()],s.prototype,"crawljob",null);n([o()],s.prototype,"curation",null);n([o()],s.prototype,"dari_title",null);n([o()],s.prototype,"dari_title_romanized",null);n([o()],s.prototype,"date_case_filed",null);n([o()],s.prototype,"date_case_terminated",null);n([o()],s.prototype,"date_created",null);n([o()],s.prototype,"date_last_filing",null);n([o()],s.prototype,"derive_submittime",null);n([o()],s.prototype,"derive_version",null);n([o()],s.prototype,"discs",null);n([o()],s.prototype,"docket_num",null);n([o()],s.prototype,"external_metadata_update",null);n([o()],s.prototype,"fail_reasons",null);n([o()],s.prototype,"filesxml",null);n([o()],s.prototype,"firstfiledate",null);n([o()],s.prototype,"firstfileserial",null);n([o()],s.prototype,"foldoutcount",null);n([o()],s.prototype,"format",null);n([o()],s.prototype,"geo_restricted",null);n([o()],s.prototype,"guid",null);n([o()],s.prototype,"has_mp3",null);n([o()],s.prototype,"height",null);n([o()],s.prototype,"hidden",null);n([o()],s.prototype,"ia_orig__runtime",null);n([o()],s.prototype,"access_restricted_item",null);n([o()],s.prototype,"addeddate",null);n([o()],s.prototype,"aspect_ratio",null);n([o()],s.prototype,"audio_codec",null);n([o()],s.prototype,"audio_sample_rate",null);n([o()],s.prototype,"avg_rating",null);n([o()],s.prototype,"backup_location",null);n([o()],s.prototype,"ccnum",null);n([o()],s.prototype,"closed_captioning",null);n([o()],s.prototype,"collection",null);n([o()],s.prototype,"collections_raw",null);n([o()],s.prototype,"collection_size",null);n([o()],s.prototype,"color",null);n([o()],s.prototype,"contact",null);n([o()],s.prototype,"contributor",null);n([o()],s.prototype,"coverage",null);n([o()],s.prototype,"creator",null);n([o()],s.prototype,"creator_alt_script",null);n([o()],s.prototype,"credits",null);n([o()],s.prototype,"collection_layout",null);n([o()],s.prototype,"date",null);n([o()],s.prototype,"description",null);n([o()],s.prototype,"downloads",null);n([o()],s.prototype,"duration",null);n([o()],s.prototype,"external_identifier",null);n([o()],s.prototype,"external_link",null);n([o()],s.prototype,"files_count",null);n([o()],s.prototype,"frames_per_second",null);n([o()],s.prototype,"identifier_access",null);n([o()],s.prototype,"identifier_ark",null);n([o()],s.prototype,"identifier_bib",null);n([o()],s.prototype,"image_count",null);n([o()],s.prototype,"imagecount",null);n([o()],s.prototype,"indexdate",null);n([o()],s.prototype,"invoice",null);n([o()],s.prototype,"isbn",null);n([o()],s.prototype,"issue",null);n([o()],s.prototype,"issue_count",null);n([o()],s.prototype,"issue_page_count",null);n([o()],s.prototype,"item_count",null);n([o()],s.prototype,"item_size",null);n([o()],s.prototype,"language",null);n([o()],s.prototype,"lastdate",null);n([o()],s.prototype,"lastfiledate",null);n([o()],s.prototype,"lastfileserial",null);n([o()],s.prototype,"length",null);n([o()],s.prototype,"license",null);n([o()],s.prototype,"licenseurl",null);n([o()],s.prototype,"lineage",null);n([o()],s.prototype,"mature_content",null);n([o()],s.prototype,"md5",null);n([o()],s.prototype,"md5contents",null);n([o()],s.prototype,"md5s",null);n([o()],s.prototype,"medium",null);n([o()],s.prototype,"metadata_operator",null);n([o()],s.prototype,"metasource_catalog",null);n([o()],s.prototype,"monochromatic",null);n([o()],s.prototype,"month",null);n([o()],s.prototype,"mediatype",null);n([o()],s.prototype,"mpeg_program",null);n([o()],s.prototype,"next_item",null);n([o()],s.prototype,"noarchivetorrent",null);n([o()],s.prototype,"noindex",null);n([o()],s.prototype,"notes",null);n([o()],s.prototype,"num_favorites",null);n([o()],s.prototype,"num_reviews",null);n([o()],s.prototype,"numeric_id",null);n([o()],s.prototype,"numwarcs",null);n([o()],s.prototype,"ocr",null);n([o()],s.prototype,"ocr_autonomous",null);n([o()],s.prototype,"ocr_detected_lang",null);n([o()],s.prototype,"ocr_detected_lang_conf",null);n([o()],s.prototype,"ocr_detected_script",null);n([o()],s.prototype,"ocr_detected_script_conf",null);n([o()],s.prototype,"ocr_invalid_language",null);n([o()],s.prototype,"ocr_module_version",null);n([o()],s.prototype,"ocr_parameters",null);n([o()],s.prototype,"old_pallet",null);n([o()],s.prototype,"openlibrary_edition",null);n([o()],s.prototype,"openlibrary_work",null);n([o()],s.prototype,"operator",null);n([o()],s.prototype,"originalurl",null);n([o()],s.prototype,"osf_category",null);n([o()],s.prototype,"osf_project",null);n([o()],s.prototype,"osf_registration_doi",null);n([o()],s.prototype,"osf_registration_schema",null);n([o()],s.prototype,"osf_registry",null);n([o()],s.prototype,"osf_subjects",null);n([o()],s.prototype,"osf_tags",null);n([o()],s.prototype,"output_time_minutes",null);n([o()],s.prototype,"pacer_case_num",null);n([o()],s.prototype,"packaging_time_minutes",null);n([o()],s.prototype,"page_number_confidence",null);n([o()],s.prototype,"page_number_module_version",null);n([o()],s.prototype,"page_progression",null);n([o()],s.prototype,"paginated",null);n([o()],s.prototype,"parse_date",null);n([o()],s.prototype,"parse_state",null);n([o()],s.prototype,"partner",null);n([o()],s.prototype,"pashto_title",null);n([o()],s.prototype,"pashto_title_romanized",null);n([o()],s.prototype,"pdf_degraded",null);n([o()],s.prototype,"pdf_module_version",null);n([o()],s.prototype,"pick",null);n([o()],s.prototype,"podcastindexid",null);n([o()],s.prototype,"post_text",null);n([o()],s.prototype,"ppi",null);n([o()],s.prototype,"previous_item",null);n([o()],s.prototype,"program",null);n([o()],s.prototype,"publicdate",null);n([o()],s.prototype,"publisher",null);n([o()],s.prototype,"political_religious_party",null);n([o()],s.prototype,"rcs_key",null);n([o()],s.prototype,"repub_state",null);n([o()],s.prototype,"republisher_date",null);n([o()],s.prototype,"republisher_operator",null);n([o()],s.prototype,"republisher_time",null);n([o()],s.prototype,"reviewdate",null);n([o()],s.prototype,"reviews_allowed",null);n([o()],s.prototype,"ribbon_state",null);n([o()],s.prototype,"ribbon_state_modify_date",null);n([o()],s.prototype,"rights",null);n([o()],s.prototype,"rights_holder",null);n([o()],s.prototype,"rssfeed",null);n([o()],s.prototype,"runtime",null);n([o()],s.prototype,"scan_time_minutes",null);n([o()],s.prototype,"scandate",null);n([o()],s.prototype,"scanfee",null);n([o()],s.prototype,"scanner",null);n([o()],s.prototype,"scanner_operator",null);n([o()],s.prototype,"scanningcenter",null);n([o()],s.prototype,"scribe3_search_catalog",null);n([o()],s.prototype,"scribe3_search_id",null);n([o()],s.prototype,"segments",null);n([o()],s.prototype,"sessionid",null);n([o()],s.prototype,"shndiscs",null);n([o()],s.prototype,"shotlist",null);n([o()],s.prototype,"signal_path",null);n([o()],s.prototype,"size",null);n([o()],s.prototype,"sizehint",null);n([o()],s.prototype,"software_version",null);n([o()],s.prototype,"sort_order",null);n([o()],s.prototype,"sound",null);n([o()],s.prototype,"soundcreator",null);n([o()],s.prototype,"soundtitle",null);n([o()],s.prototype,"source",null);n([o()],s.prototype,"source_pixel_height",null);n([o()],s.prototype,"source_pixel_width",null);n([o()],s.prototype,"source_url",null);n([o()],s.prototype,"sponsor",null);n([o()],s.prototype,"sponsordate",null);n([o()],s.prototype,"start_localtime",null);n([o()],s.prototype,"start_time",null);n([o()],s.prototype,"station_name",null);n([o()],s.prototype,"stop_time",null);n([o()],s.prototype,"subject",null);n([o()],s.prototype,"taper",null);n([o()],s.prototype,"thumbs",null);n([o()],s.prototype,"times",null);n([o()],s.prototype,"title",null);n([o()],s.prototype,"title_alt_script",null);n([o()],s.prototype,"transferer",null);n([o()],s.prototype,"track",null);n([o()],s.prototype,"tts_version",null);n([o()],s.prototype,"tuner",null);n([o()],s.prototype,"type",null);n([o()],s.prototype,"updatedate",null);n([o()],s.prototype,"updater",null);n([o()],s.prototype,"uploader",null);n([o()],s.prototype,"uploadsoftware",null);n([o()],s.prototype,"utc_offset",null);n([o()],s.prototype,"venue",null);n([o()],s.prototype,"video_codec",null);n([o()],s.prototype,"volume",null);n([o()],s.prototype,"website",null);n([o()],s.prototype,"week",null);n([o()],s.prototype,"width",null);n([o()],s.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ce(this.rawValue,e=>Be.shared.parseValue(e),"reviewdate")}get createdate(){return ce(this.rawValue,e=>Be.shared.parseValue(e),"createdate")}get stars(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([o()],me.prototype,"reviewdate",null);n([o()],me.prototype,"createdate",null);n([o()],me.prototype,"stars",null);class _n{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ue(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new s(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new me(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Se;(function(i){i.networkError="MetadataService.NetworkError",i.itemNotFound="MetadataService.ItemNotFound",i.decodingError="MetadataService.DecodingError",i.searchEngineError="MetadataService.SearchEngineError"})(Se||(Se={}));class sr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class vn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let p;try{const h=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};p=await fetch(c.href,h)}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.networkError,y)}try{const h=await p.json(),y=h.error;if(y){const _=h.forensics;return this.getErrorResult(Se.searchEngineError,y,_)}else return{success:h}}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.decodingError,y)}}getErrorResult(e,t,a){return{error:new sr(e,t,a)}}}class Jr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new sr(Se.itemNotFound)}:{success:new _n(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new sr(Se.itemNotFound)}:{success:c.success.result}}}Jr.default=new Jr(new vn);function Qr(i){return new Promise(e=>setTimeout(e,i))}class ar{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}ar.shared=new ar;class lr{shouldRetry(){return!1}retryDelay(){return null}}lr.shared=new lr;class dr{}dr.default=ar.shared;dr.noRetry=lr.shared;const wi=i=>{if(i)return"requestInit"in i||"retryConfig"in i||"includeCsrfToken"in i?i:{requestInit:i}};class bn{constructor(e){this.retryConfig=dr.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=wi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,p;const h=typeof e=="string"?e:e.url;try{const y=await fetch(e,a?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const _=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(_.shouldRetry(y,t)){const N=_.retryDelay(t,y);if(N!==null)return await Qr(N),this.logRetryEvent(h,t,y.statusText,y.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(h,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(h,y),y;const _=(p=a?.retryConfig)!==null&&p!==void 0?p:this.retryConfig;if(_.shouldRetry(null,t)){const N=_.retryDelay(t);if(N!==null)return await Qr(N),this.logRetryEvent(h,t,y,y),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(h,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var p;(p=this.analyticsHandler)===null||p===void 0||p.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const wn=new Set(["POST","PUT","DELETE","PATCH"]);class pr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new bn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;a=this.addSearchParams(h,{reCache:"1"})}const p=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,p)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((_,$)=>{c.set($,_)}),a.headers=c;const p=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(p,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,p,h;if(!this.getCsrfToken)return t;const y=(a=wi(t))!==null&&a!==void 0?a:{};if(!y.includeCsrfToken)return t;const _=(c=y.requestInit)!==null&&c!==void 0?c:{},$=((h=(p=_.method)!==null&&p!==void 0?p:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!wn.has($))return t;const N=new Headers(_.headers);return N.has("X-CSRF-Token")?t:(N.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{..._,headers:N}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),p=a===-1?e:e.slice(0,a),h=p.indexOf("?"),y=h===-1?p:p.slice(0,h),_=new URLSearchParams(h===-1?"":p.slice(h+1)),$=pr.asSearchParams(t),N=new Set;$.forEach((re,ge)=>{N.has(ge)||(N.add(ge),_.delete(ge))}),$.forEach((re,ge)=>{_.append(ge,re)});const te=_.toString();return`${y}${te?`?${te}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class Tn extends pr{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const ei=H`var(--white, #fff)`,En=H`var(--ia-theme-link-color, #4b64ff)`,Sn=H`var(--primaryDisableCTAFill, #767676)`,Rn=H`var(--secondaryCTABorder, #999)`,An=H`var(--primaryCTAFill, #194880)`,Gt=H`var(--primaryCTAFillRGB, 25, 72, 128)`,xn=H`var(--primaryCTABorder, #c5d1df)`,Cn=H`var(--primaryErrorCTAFill, #d9534f)`,Wt=H`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,kn=H`var(--primaryErrorCTABorder, #d43f3a)`,Ln=H`var(--secondaryCTAFill, #333)`,Yt=H`var(--secondaryCTAFillRGB, 51, 51, 51)`,Dn=H`var(--primaryCTABorder, #979797)`,On=H`var(---primaryWarningFill, #ee8950)`,qt=H`var(--primaryWarningFillRGB, 238, 137, 80)`,Pn=H`var(--primaryWarningBorder, #ec7939)`,Ti=H`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${ei};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 3rem;
    outline-color: ${ei};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${Sn};
    border: 1px solid ${Rn};
  }
  .ia-button.transparent {
    background-color: transparent;
  }

  .ia-button.primary:disabled,
  .ia-button.danger:disabled,
  .ia-button.warning:disabled,
  .ia-button.dark:disabled {
    opacity: 0.5;
  }

  .ia-button.primary {
    background-color: ${An};
    border-color: ${xn};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Gt}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Gt}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Gt}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Cn};
    border-color: ${kn};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Wt}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Wt}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Wt}, 0.7);
  }

  .ia-button.warning {
    background-color: ${On};
    border-color: ${Pn};
  }
  .ia-button.warning:hover {
    background-color: rgba(${qt}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${qt}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${qt}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Ln};
    border-color: ${Dn};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Yt}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Yt}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Yt}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: ${En};
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;H`
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    margin: -1px !important;
    padding: 0 !important;
    border: 0 !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    user-select: none !important;
  }
`;const $n="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function ti(i=""){if(i.length<=40)return i;const t=i.substring(0,40)+"...";return w`<span title="${i}">${t}</span>`}function ri(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,a=Array(e);t<e;t++)a[t]=i[t];return a}function In(i){if(Array.isArray(i))return i}function Mn(i,e){var t=i==null?null:typeof Symbol<"u"&&i[Symbol.iterator]||i["@@iterator"];if(t!=null){var a,c,p,h,y=[],_=!0,$=!1;try{if(p=(t=t.call(i)).next,e!==0)for(;!(_=(a=p.call(t)).done)&&(y.push(a.value),y.length!==e);_=!0);}catch(N){$=!0,c=N}finally{try{if(!_&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if($)throw c}}return y}}function Nn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Fn(i,e){return In(i)||Mn(i,e)||Bn(i,e)||Nn()}function Bn(i,e){if(i){if(typeof i=="string")return ri(i,e);var t={}.toString.call(i).slice(8,-1);return t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set"?Array.from(i):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?ri(i,e):void 0}}const Ei=Object.entries,ii=Object.setPrototypeOf,zn=Object.isFrozen,Un=Object.getPrototypeOf,Hn=Object.getOwnPropertyDescriptor;let z=Object.freeze,U=Object.seal,Me=Object.create,Si=typeof Reflect<"u"&&Reflect,cr=Si.apply,ur=Si.construct;z||(z=function(e){return e});U||(U=function(e){return e});cr||(cr=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),p=2;p<a;p++)c[p-2]=arguments[p];return e.apply(t,c)});ur||(ur=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const Ee=F(Array.prototype.forEach),jn=F(Array.prototype.lastIndexOf),ni=F(Array.prototype.pop),We=F(Array.prototype.push),Vn=F(Array.prototype.splice),Fe=Array.isArray,Xe=F(String.prototype.toLowerCase),Xt=F(String.prototype.toString),oi=F(String.prototype.match),Ye=F(String.prototype.replace),si=F(String.prototype.indexOf),Gn=F(String.prototype.trim),Wn=F(Number.prototype.toString),Yn=F(Boolean.prototype.toString),ai=typeof BigInt>"u"?null:F(BigInt.prototype.toString),li=typeof Symbol>"u"?null:F(Symbol.prototype.toString),K=F(Object.prototype.hasOwnProperty),qe=F(Object.prototype.toString),j=F(RegExp.prototype.test),Te=qn(TypeError);function F(i){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return cr(i,e,a)}}function qn(i){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return ur(i,t)}}function E(i,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(ii&&ii(i,null),!Fe(e))return i;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const p=t(c);p!==c&&(zn(e)||(e[a]=p),c=p)}i[c]=!0}return i}function Xn(i){for(let e=0;e<i.length;e++)K(i,e)||(i[e]=null);return i}function J(i){const e=Me(null);for(const a of Ei(i)){var t=Fn(a,2);const c=t[0],p=t[1];K(i,c)&&(Fe(p)?e[c]=Xn(p):p&&typeof p=="object"&&p.constructor===Object?e[c]=J(p):e[c]=p)}return e}function Kn(i){switch(typeof i){case"string":return i;case"number":return Wn(i);case"boolean":return Yn(i);case"bigint":return ai?ai(i):"0";case"symbol":return li?li(i):"Symbol()";case"undefined":return qe(i);case"function":case"object":{if(i===null)return qe(i);const e=i,t=Q(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:qe(a)}return qe(i)}default:return qe(i)}}function Q(i,e){for(;i!==null;){const a=Hn(i,e);if(a){if(a.get)return F(a.get);if(typeof a.value=="function")return F(a.value)}i=Un(i)}function t(){return null}return t}function Zn(i){try{return j(i,""),!0}catch{return!1}}const ci=z(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Kt=z(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zt=z(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Jn=z(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Jt=z(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Qn=z(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ui=z(["#text"]),di=z(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Qt=z(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),pi=z(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pt=z(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),eo=U(/{{[\w\W]*|^[\w\W]*}}/g),to=U(/<%[\w\W]*|^[\w\W]*%>/g),ro=U(/\${[\w\W]*/g),io=U(/^data-[\-\w.\u00B7-\uFFFF]+$/),no=U(/^aria-[\-\w]+$/),hi=U(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),oo=U(/^(?:\w+script|data):/i),so=U(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ao=U(/^html$/i),lo=U(/^[a-z][.\w]*(-[.\w]+)+$/i),fi=U(/<[/\w!]/g),mi=U(/<[/\w]/g),co=U(/<\/no(script|embed|frames)/i),uo=U(/\/>/i),Z={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ri=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],po=z(E({},Ri)),ho=(function(){const i={};return Ee(Ri,e=>{i[e]=U(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),z(i)})(),fo=function(){return typeof window>"u"?null:window},mo=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const p="dompurify"+(a?"#"+a:"");try{return e.createPolicy(p,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+p+" could not be created."),null}},gi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,a,c){return K(e,t)&&Fe(e[t])?E(c.base?J(c.base):{},e[t],c.transform):a},er=function(e,t,a){const c=K(e,t)?e[t]:void 0;return c&&typeof c=="object"?J(c):a()};function Ai(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:fo();const e=f=>Ai(f);if(e.version="3.4.15",e.removed=[],!i||!i.document||i.document.nodeType!==Z.document||!i.Element)return e.isSupported=!1,e;let t=i.document;const a=t,c=a.currentScript;i.DocumentFragment;const p=i.HTMLTemplateElement,h=i.Node,y=i.Element,_=i.NodeFilter,$=i.NamedNodeMap;$===void 0&&(i.NamedNodeMap||i.MozNamedAttrMap),i.HTMLFormElement;const N=i.DOMParser,te=i.trustedTypes,re=y.prototype,ge=Q(re,"cloneNode"),Tt=Q(re,"remove"),fr=Q(re,"removeAttributeNode"),xi=Q(re,"nextSibling"),Re=Q(re,"childNodes"),Ae=Q(re,"parentNode"),mr=Q(re,"shadowRoot"),Et=Q(re,"attributes"),ye=h&&h.prototype?Q(h.prototype,"nodeType"):null,xe=h&&h.prototype?Q(h.prototype,"nodeName"):null,Ke=h&&h.prototype?Q(h.prototype,"ownerDocument"):null,Ue=function(r){return ye?ye(r):r.nodeType},St=function(r){return xe?xe(r):r.nodeName};if(typeof p=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let Y,_e="",Rt,gr=!1,He=0;const yr=function(){if(He>0)throw Te('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ce=function(r){yr(),He++;try{return Y.createHTML(r)}finally{He--}},Ci=function(r){yr(),He++;try{return Y.createScriptURL(r)}finally{He--}},ki=function(){return gr||(Rt=mo(te,c),gr=!0),Rt},Ze=t,At=Ze.implementation,_r=Ze.createNodeIterator,Li=Ze.createDocumentFragment,Di=Ze.getElementsByTagName,Oi=a.importNode;let C=gi();e.isSupported=typeof Ei=="function"&&typeof Ae=="function"&&At&&At.createHTMLDocument!==void 0;const Pi=eo,$i=to,Ii=ro,Mi=io,Ni=no,Fi=oo,vr=so,Bi=lo;let br=hi,k=null;const xt=E({},[...ci,...Kt,...Zt,...Jt,...ui]);let L=null;const Ct=E({},[...di,...Qt,...pi,...pt]);let oe=Object.seal(Me(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,wr=null;const de=Object.seal(Me(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Tr=!0,kt=!0,Er=!1,Sr=!0,pe=!1,ve=!0,be=!1,Lt=!1,Je=null,Qe=null,Dt=!1,ke=!1,et=!1,tt=!1,Rr=!0,Ar=!1;const xr="user-content-";let Ot=!0,Pt=!1,Le={},De=null;const Cr=E({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let kr=null;const Lr=E({},["audio","video","img","source","image","track"]);let Dr=null;const Or=E({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",se="http://www.w3.org/1999/xhtml";let Oe=se,$t=!1,It=null;const zi=E({},[rt,it,se],Xt),Pr=z(["mi","mo","mn","ms","mtext"]);let Mt=E({},Pr);const $r=z(["annotation-xml"]);let Nt=E({},$r);const Ui=E({},["title","style","font","a","script"]);let Ve=null;const Hi=["application/xhtml+xml","text/html"],ji="text/html";let I=null,Pe=null;const Vi=t.createElement("form"),Ir=function(r){return r instanceof RegExp||r instanceof Function},Ft=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Pe&&Pe===r)return;(!r||typeof r!="object")&&(r={}),r=J(r),Ve=Hi.indexOf(r.PARSER_MEDIA_TYPE)===-1?ji:r.PARSER_MEDIA_TYPE,I=Ve==="application/xhtml+xml"?Xt:Xe,k=fe(r,"ALLOWED_TAGS",xt,{transform:I}),L=fe(r,"ALLOWED_ATTR",Ct,{transform:I}),It=fe(r,"ALLOWED_NAMESPACES",zi,{transform:Xt}),Dr=fe(r,"ADD_URI_SAFE_ATTR",Or,{transform:I,base:Or}),kr=fe(r,"ADD_DATA_URI_TAGS",Lr,{transform:I,base:Lr}),De=fe(r,"FORBID_CONTENTS",Cr,{transform:I}),je=fe(r,"FORBID_TAGS",J({}),{transform:I}),wr=fe(r,"FORBID_ATTR",J({}),{transform:I}),Le=K(r,"USE_PROFILES")?r.USE_PROFILES&&typeof r.USE_PROFILES=="object"?J(r.USE_PROFILES):r.USE_PROFILES:!1,Tr=r.ALLOW_ARIA_ATTR!==!1,kt=r.ALLOW_DATA_ATTR!==!1,Er=r.ALLOW_UNKNOWN_PROTOCOLS||!1,Sr=r.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pe=r.SAFE_FOR_TEMPLATES||!1,ve=r.SAFE_FOR_XML!==!1,be=r.WHOLE_DOCUMENT||!1,ke=r.RETURN_DOM||!1,et=r.RETURN_DOM_FRAGMENT||!1,tt=r.RETURN_TRUSTED_TYPE||!1,Dt=r.FORCE_BODY||!1,Rr=r.SANITIZE_DOM!==!1,Ar=r.SANITIZE_NAMED_PROPS||!1,Ot=r.KEEP_CONTENT!==!1,Pt=r.IN_PLACE||!1,br=Zn(r.ALLOWED_URI_REGEXP)?r.ALLOWED_URI_REGEXP:hi,Oe=typeof r.NAMESPACE=="string"?r.NAMESPACE:se,Mt=er(r,"MATHML_TEXT_INTEGRATION_POINTS",()=>E({},Pr)),Nt=er(r,"HTML_INTEGRATION_POINTS",()=>E({},$r));const l=er(r,"CUSTOM_ELEMENT_HANDLING",()=>Me(null));if(oe=Me(null),K(l,"tagNameCheck")&&Ir(l.tagNameCheck)&&(oe.tagNameCheck=l.tagNameCheck),K(l,"attributeNameCheck")&&Ir(l.attributeNameCheck)&&(oe.attributeNameCheck=l.attributeNameCheck),K(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),U(oe),pe&&(kt=!1),et&&(ke=!0),Le&&(k=E({},ui),L=Me(null),Le.html===!0&&(E(k,ci),E(L,di)),Le.svg===!0&&(E(k,Kt),E(L,Qt),E(L,pt)),Le.svgFilters===!0&&(E(k,Zt),E(L,Qt),E(L,pt)),Le.mathMl===!0&&(E(k,Jt),E(L,pi),E(L,pt))),de.tagCheck=null,de.attributeCheck=null,K(r,"ADD_TAGS")&&(typeof r.ADD_TAGS=="function"?de.tagCheck=r.ADD_TAGS:Fe(r.ADD_TAGS)&&(k===xt&&(k=J(k)),E(k,r.ADD_TAGS,I))),K(r,"ADD_ATTR")&&(typeof r.ADD_ATTR=="function"?de.attributeCheck=r.ADD_ATTR:Fe(r.ADD_ATTR)&&(L===Ct&&(L=J(L)),E(L,r.ADD_ATTR,I))),K(r,"ADD_FORBID_CONTENTS")&&Fe(r.ADD_FORBID_CONTENTS)&&(De===Cr&&(De=J(De)),E(De,r.ADD_FORBID_CONTENTS,I)),Ot&&(k["#text"]=!0),be&&E(k,["html","head","body"]),k.table&&(E(k,["tbody"]),delete je.tbody),r.TRUSTED_TYPES_POLICY){if(typeof r.TRUSTED_TYPES_POLICY.createHTML!="function")throw Te('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof r.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Te('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const d=Y;Y=r.TRUSTED_TYPES_POLICY;try{_e=Ce("")}catch(m){throw Y=d,m}}else r.TRUSTED_TYPES_POLICY===null?(Y=void 0,_e=""):(Y===void 0&&(Y=ki()),Y&&typeof _e=="string"&&(_e=Ce("")));z&&z(r),Pe=r},Mr=E({},[...Kt,...Zt,...Jn]),Nr=E({},[...Jt,...Qn]),Gi=function(r,l,d){return l.namespaceURI===se?r==="svg":l.namespaceURI===rt?r==="svg"&&(d==="annotation-xml"||Mt[d]):!!Mr[r]},Wi=function(r,l,d){return l.namespaceURI===se?r==="math":l.namespaceURI===it?r==="math"&&Nt[d]:!!Nr[r]},Yi=function(r,l,d){return l.namespaceURI===it&&!Nt[d]||l.namespaceURI===rt&&!Mt[d]?!1:!Nr[r]&&(Ui[r]||!Mr[r])},qi=function(r){let l=Ae(r);(!l||!l.tagName)&&(l={namespaceURI:Oe,tagName:"template"});const d=Xe(r.tagName),m=Xe(l.tagName);return It[r.namespaceURI]?r.namespaceURI===it?Gi(d,l,m):r.namespaceURI===rt?Wi(d,l,m):r.namespaceURI===se?Yi(d,l,m):!!(Ve==="application/xhtml+xml"&&It[r.namespaceURI]):!1},he=function(r){We(e.removed,{element:r});try{Ae(r).removeChild(r)}catch{if(Tt(r),!Ae(r))throw Te("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Fr=function(r,l,d){try{fr(r,l)}catch{try{r.removeAttribute(d)}catch{}}},nt=function(r){ot(r);const l=Re(r);if(l){const m=[];Ee(l,g=>{We(m,g)}),Ee(m,g=>{try{Tt(g)}catch{}})}const d=Et(r);if(d)for(let m=d.length-1;m>=0;--m){const g=d[m],v=g&&g.name;typeof v=="string"&&Fr(r,g,v)}},we=function(r,l,d){if(!d)try{d=l.getAttributeNode(r)}catch{d=null}We(e.removed,{attribute:d||null,from:l});try{d?fr(l,d):l.removeAttribute(r)}catch{try{l.removeAttribute(r)}catch{}}if(r==="is")if(ke||et)try{he(l)}catch{}else try{l.setAttribute(r,"")}catch{}},Xi=function(r){const l=Et(r);if(l)for(let d=l.length-1;d>=0;--d){const m=l[d],g=m&&m.name;typeof g!="string"||L[I(g)]||Fr(r,m,g)}},ot=function(r){const l=[r];for(;l.length>0;){const d=l.pop();Ue(d)===Z.element&&Xi(d);const g=Re(d);if(g)for(let v=g.length-1;v>=0;--v)l.push(g[v])}},Br=function(r,l){return ve?r==="patchsrc"?!0:r==="for"&&l!=="label"&&l!=="output":!1},Ki=function(r){if(!ve)return;const l=[r];for(;l.length>0;){const d=l.pop(),m=Ue(d);if(m===Z.processingInstruction||m===Z.comment&&j(mi,d.data)){try{Tt(d)}catch{}continue}if(m===Z.element){const v=d,R=I(St(d));try{v.hasAttribute&&v.hasAttribute("patchsrc")&&v.removeAttribute("patchsrc"),v.hasAttribute&&v.hasAttribute("for")&&Br("for",R)&&v.removeAttribute("for")}catch{}}const g=Re(d);if(g)for(let v=g.length-1;v>=0;--v)l.push(g[v])}},zr=function(r){let l=null,d=null;if(Dt)r="<remove></remove>"+r;else{const v=oi(r,/^[\r\n\t ]+/);d=v&&v[0]}Ve==="application/xhtml+xml"&&Oe===se&&(r='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+r+"</body></html>");const m=Y?Ce(r):r;if(Oe===se)try{l=new N().parseFromString(m,Ve)}catch{}if(!l||!l.documentElement){l=At.createDocument(Oe,"template",null);try{l.documentElement.innerHTML=$t?_e:m}catch{}}const g=l.body||l.documentElement;return r&&d&&g.insertBefore(t.createTextNode(d),g.childNodes[0]||null),Oe===se?Di.call(l,be?"html":"body")[0]:be?l.documentElement:g},Ur=function(r){const l=Ke?Ke(r):r.ownerDocument;return _r.call(l||r,r,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT|_.SHOW_PROCESSING_INSTRUCTION|_.SHOW_CDATA_SECTION,null)},st=function(r){return r=Ye(r,Pi," "),r=Ye(r,$i," "),r=Ye(r,Ii," "),r},Bt=function(r){var l;r.normalize();const d=Ke?Ke(r):r.ownerDocument,m=_r.call(d||r,r,_.SHOW_TEXT|_.SHOW_COMMENT|_.SHOW_CDATA_SECTION|_.SHOW_PROCESSING_INSTRUCTION,null);let g=m.nextNode();for(;g;)g.data=st(g.data),g=m.nextNode();const v=(l=r.querySelectorAll)===null||l===void 0?void 0:l.call(r,"template");v&&Ee(v,R=>{$e(R.content)&&Bt(R.content)})},at=function(r){const l=xe?xe(r):null;return typeof l!="string"||I(l)!=="form"?!1:typeof r.nodeName!="string"||typeof r.textContent!="string"||typeof r.removeChild!="function"||r.attributes!==Et(r)||typeof r.removeAttribute!="function"||typeof r.removeAttributeNode!="function"||typeof r.getAttributeNode!="function"||typeof r.setAttribute!="function"||typeof r.namespaceURI!="string"||typeof r.insertBefore!="function"||typeof r.hasChildNodes!="function"||r.nodeType!==ye(r)||r.childNodes!==Re(r)},$e=function(r){if(!ye||typeof r!="object"||r===null)return!1;try{return ye(r)===Z.documentFragment}catch{return!1}},Ge=function(r){if(!ye||typeof r!="object"||r===null)return!1;try{return typeof ye(r)=="number"}catch{return!1}};function ae(f,r,l){f.length!==0&&Ee(f,d=>{d.call(e,r,l,Pe)})}const Zi=function(r,l){return!!(ve&&r.hasChildNodes()&&!Ge(r.firstElementChild)&&j(fi,r.textContent)&&j(fi,r.innerHTML)||ve&&r.namespaceURI===se&&po[l]&&(Ge(r.firstElementChild)||typeof r.textContent=="string"&&j(ho[l],r.textContent))||r.nodeType===Z.processingInstruction||ve&&r.nodeType===Z.comment&&j(mi,r.data))},lt=function(r,l){if(r instanceof RegExp)return j(r,l);if(r instanceof Function){for(var d=arguments.length,m=new Array(d>2?d-2:0),g=2;g<d;g++)m[g-2]=arguments[g];return!!r(l,...m)}return!1},Ji=function(r,l,d){if(!je[l]&&Wr(l)&&lt(oe.tagNameCheck,l))return!1;if(Ot&&!De[l]){const m=Ae(r),g=Re(r);if(g&&m){const v=g.length;for(let R=v-1;R>=0;--R){const O=r===d?ge(g[R],!0):g[R];m.insertBefore(O,xi(r))}}}return he(r),!0},Hr=function(r,l,d,m){return r.length===0?l:l===d||l===m?J(l):l},jr=function(r,l){return r===l||Ae(r)!==null?!1:(Pt&&ot(r),!0)},Vr=function(r,l){if(ae(C.beforeSanitizeElements,r,null),jr(r,l))return!0;if(at(r))return he(r),!0;const d=I(St(r));if(k=Hr(C.uponSanitizeElement,k,xt,Je),ae(C.uponSanitizeElement,r,{tagName:d,allowedTags:k}),jr(r,l))return!0;if(Zi(r,d))return he(r),!0;if(je[d]||!(de.tagCheck instanceof Function&&de.tagCheck(d))&&!k[d]){const g=Ji(r,d,l);return g===!1&&ae(C.afterSanitizeElements,r,null),g}if(Ue(r)===Z.element&&!qi(r)||(d==="noscript"||d==="noembed"||d==="noframes")&&j(co,r.innerHTML))return he(r),!0;if(pe&&r.nodeType===Z.text){const g=st(r.textContent);r.textContent!==g&&(We(e.removed,{element:r.cloneNode()}),r.textContent=g)}return ae(C.afterSanitizeElements,r,null),!1},Gr=function(r,l,d){if(wr[l]||Br(l,r)||Rr&&(l==="id"||l==="name")&&(d in t||d in Vi))return!1;const m=L[l]||de.attributeCheck instanceof Function&&de.attributeCheck(l,r);return kt&&j(Mi,l)||Tr&&j(Ni,l)?!0:m?Dr[l]||j(br,Ye(d,vr,""))||(l==="src"||l==="xlink:href"||l==="href")&&r!=="script"&&si(d,"data:")===0&&kr[r]||Er&&!j(Fi,Ye(d,vr,""))?!0:!d:Wr(r)&&lt(oe.tagNameCheck,r)&&lt(oe.attributeNameCheck,l,r)||l==="is"&&oe.allowCustomizedBuiltInElements&&lt(oe.tagNameCheck,d)},Qi=E({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Wr=function(r){return!Qi[Xe(r)]&&j(Bi,r)},en=function(r,l,d,m){if(Y&&typeof te=="object"&&typeof te.getAttributeType=="function"&&!d)switch(te.getAttributeType(r,l)){case"TrustedHTML":return Ce(m);case"TrustedScriptURL":return Ci(m)}return m},tn=function(r,l,d,m){try{return d?r.setAttributeNS(d,l,m):r.setAttribute(l,m),at(r)?(he(r),!1):!0}catch{return we(l,r),!1}},Yr=function(r){ae(C.beforeSanitizeAttributes,r,null);const l=r.attributes;if(!l||at(r))return;L=Hr(C.uponSanitizeAttribute,L,Ct,Qe);const d={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let m=l.length;const g=I(r.nodeName);for(;m--;){const v=l[m],R=v.name,O=v.namespaceURI,q=v.value,X=I(R),Ut=q;let V=R==="value"?Ut:Gn(Ut),qr=!1;if(d.attrName=X,d.attrValue=V,d.keepAttr=!0,d.forceKeepAttr=void 0,ae(C.uponSanitizeAttribute,r,d),V=d.attrValue,Ar&&(X==="id"||X==="name")&&si(V,xr)!==0&&(we(R,r,v),V=xr+V,qr=!0),ve&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(R,r,v);continue}if(X==="attributename"&&oi(V,"href")){we(R,r,v);continue}if(!d.forceKeepAttr){if(!d.keepAttr){we(R,r,v);continue}if(!Sr&&j(uo,V)){we(R,r,v);continue}if(pe&&(V=st(V)),!Gr(g,X,V)){we(R,r,v);continue}V=en(g,X,O,V),V!==Ut&&tn(r,R,O,V)&&qr&&ni(e.removed)}}ae(C.afterSanitizeAttributes,r,null)},ct=function(r){let l=null;const d=Ur(r);for(ae(C.beforeSanitizeShadowDOM,r,null);l=d.nextNode();)if(ae(C.uponSanitizeShadowNode,l,null),Vr(l,r),Yr(l),$e(l.content)&&ct(l.content),Ue(l)===Z.element){const m=mr(l);$e(m)&&(zt(m),ct(m))}ae(C.afterSanitizeShadowDOM,r,null)},zt=function(r){const l=[{node:r,shadow:null}];for(;l.length>0;){const d=l.pop();if(d.shadow){ct(d.shadow);continue}const m=d.node,v=Ue(m)===Z.element,R=Re(m);if(R)for(let O=R.length-1;O>=0;--O)l.push({node:R[O],shadow:null});if(v){const O=xe?xe(m):null;if(typeof O=="string"&&I(O)==="template"){const q=m.content;$e(q)&&l.push({node:q,shadow:null})}}if(v){const O=mr(m);$e(O)&&l.push({node:null,shadow:O},{node:O,shadow:null})}}};return e.sanitize=function(f){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,d=null,m=null,g=null;if($t=!f,$t&&(f="<!-->"),typeof f!="string"&&!Ge(f)&&(f=Kn(f),typeof f!="string"))throw Te("dirty is not a string, aborting");if(!e.isSupported)return f;Lt?(k=Je,L=Qe):Ft(r),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(k=J(k)),C.uponSanitizeAttribute.length>0&&(L=J(L)),e.removed=[];const v=Pt&&typeof f!="string"&&Ge(f);if(v){Ki(f);const q=St(f);if(typeof q=="string"){const X=I(q);if(!k[X]||je[X])throw nt(f),Te("root node is forbidden and cannot be sanitized in-place")}if(at(f))throw nt(f),Te("root node is clobbered and cannot be sanitized in-place");try{zt(f)}catch(X){throw nt(f),X}}else if(Ge(f))l=zr("<!---->"),d=l.ownerDocument.importNode(f,!0),d.nodeType===Z.element&&d.nodeName==="BODY"||d.nodeName==="HTML"?l=d:l.appendChild(d),zt(l);else{if(!ke&&!pe&&!be&&f.indexOf("<")===-1)return Y&&tt?Ce(f):f;if(l=zr(f),!l)return ke?null:tt?_e:""}l&&Dt&&he(l.firstChild);const R=v?f:l;try{const q=Ur(R);for(;m=q.nextNode();)Vr(m,R),Yr(m),$e(m.content)&&ct(m.content)}catch(q){throw v&&(nt(f),Ee(e.removed,X=>{X.element&&ot(X.element)})),q}if(v)return Ee(e.removed,q=>{q.element&&ot(q.element)}),pe&&Bt(f),f;if(ke){if(pe&&Bt(l),et)for(g=Li.call(l.ownerDocument);l.firstChild;)g.appendChild(l.firstChild);else g=l;return(L.shadowroot||L.shadowrootmode)&&(g=Oi.call(a,g,!0)),g}let O=be?l.outerHTML:l.innerHTML;return be&&k["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&j(ao,l.ownerDocument.doctype.name)&&(O="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+O),pe&&(O=st(O)),Y&&tt?Ce(O):O},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(f),Lt=!0,Je=k,Qe=L},e.clearConfig=function(){Pe=null,Lt=!1,Je=null,Qe=null,Y=Rt,_e=""},e.isValidAttribute=function(f,r,l){Pe||Ft({});const d=I(f),m=I(r);return Gr(d,m,l)},e.addHook=function(f,r){typeof r=="function"&&K(C,f)&&We(C[f],r)},e.removeHook=function(f,r){if(K(C,f)){if(r!==void 0){const l=jn(C[f],r);return l===-1?void 0:Vn(C[f],l,1)[0]}return ni(C[f])}},e.removeHooks=function(f){K(C,f)&&(C[f]=[])},e.removeAllHooks=function(){C=gi()},e}var ht=Ai();const go=["a"];function yo(i){ht.addHook("afterSanitizeAttributes",_o);try{return ht.sanitize(i,{ALLOWED_TAGS:go})}finally{ht.removeHook("afterSanitizeAttributes")}}function _o(i){i.nodeName.toLowerCase()==="a"&&(i.setAttribute("rel","ugc nofollow"),i.setAttribute("target","_blank"))}function vo(i,e=100,t=!0){if(i.length<e)return i;let a=e;if(t){const c=i.indexOf(" ",e),p=c-e<=20;if(p&&c===i.length-1)return i;c!==-1&&p&&(a=c)}return bo(i,a,e)}function bo(i,e,t){let a=i.slice(0,e);const c=a.match(/<a/gi);if(c){const p=a.match(/<\/a/gi);if(!p||p.length<c.length){const h=i.indexOf("</a>",e),y=h-t<=20;if(y&&i.length===h+4)return i;if(h!==-1&&y)a=i.slice(0,h+4);else{const _=a.lastIndexOf("<a");a=i.slice(0,_)}}}return a.concat("...")}const wo=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function To(i){return i.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(wo,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function Eo(i){return i.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const So="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var Ro=Object.defineProperty,Ao=Object.getOwnPropertyDescriptor,ne=(i,e,t,a)=>{for(var c=a>1?void 0:a?Ao(e,t):e,p=i.length-1,h;p>=0;p--)(h=i[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&Ro(e,t,c),c};let ee=class extends bt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.csrfToken="",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1,this.deleteMsg=""}render(){return this.review?w`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?w`
                  <button
                    class="delete-btn"
                    title="Delete this review"
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${So}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:B}
            <div class="top-line">
              <b>${S("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${S("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteMsg?w`<i>${S(this.deleteMsg)}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:w`
          <div class="error">
            ${S("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const i=this.review?.reviewtitle;return this.truncateContent(i??"",this.maxSubjectLength)}get bodyTemplate(){const i=this.review?.reviewbody;if(!i)return B;const e=yo(i),t=this.truncateContent(e,this.maxBodyLength);return w`${yi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?B:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?B:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return w`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${S("More...")}
      </button>
    `}get lessButtonTemplate(){return w`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${S("...Less")}
    </button>`}get reviewerTemplate(){return this.review?this.review.reviewer_itemname?w`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${ti(this.review.reviewer)}
            </a>
          `:w`${ti(this.review.reviewer)}`:B}get starsTemplate(){return!this.review||!this.review.stars?B:w`
      <div
        class="review-stars"
        title="${S(`${this.review.stars} out of 5 stars`)}"
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>w`<div class="review-star">
              <img
                class="star-basic"
                src=${$n}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return B;const i=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"}),a=i.getTime()!==e.getTime()?"(edited)":"";return S(`${t} ${a}`)}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(i,e){return this.showTruncatedContent||this.bypassTruncation?i:vo(i,e)}prepReview(i){return Eo(To(i))}async deleteReview(){if(!this.review||!this.identifier||!confirm(S("Are you sure you want to delete this review?")))return;const i=new URLSearchParams({identifier:this.identifier,deleteReviewer:this.review.reviewer??"",deleteReviewerItemname:this.review.reviewer_itemname??"",csrf_token:this.csrfToken}),e=`${this.baseHost}/edit-reviews.php?${i}`;try{const t=await fetch(e,{method:"POST"});if(!t.ok)throw new Error(`Delete failed: ${t.status}`);this.deleteMsg="This review has been queued for deletion."}catch{this.deleteMsg="Sorry, we were unable to delete this review."}}static get styles(){return wt`
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
    `}};ne([T({type:Object})],ee.prototype,"review",2);ne([T({type:String})],ee.prototype,"identifier",2);ne([T({type:Number})],ee.prototype,"maxSubjectLength",2);ne([T({type:Number})],ee.prototype,"maxBodyLength",2);ne([T({type:String})],ee.prototype,"baseHost",2);ne([T({type:String})],ee.prototype,"csrfToken",2);ne([T({type:Boolean})],ee.prototype,"canDelete",2);ne([T({type:Boolean})],ee.prototype,"bypassTruncation",2);ne([G()],ee.prototype,"showTruncatedContent",2);ne([G()],ee.prototype,"deleteMsg",2);ee=ne([vt("ia-review")],ee);const xo="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",Co="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var ko=Object.defineProperty,Lo=Object.getOwnPropertyDescriptor,M=(i,e,t,a)=>{for(var c=a>1?void 0:a?Lo(e,t):e,p=i.length-1,h;p>=0;p--)(h=i[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ko(e,t,c),c};let P=class extends bt{constructor(){super(...arguments),this.token="",this.baseHost="https://archive.org",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.formCanSubmit=!1,this.submissionInProgress=!1,this.RECAPTCHA_ERROR_MESSAGE="Could not validate review. Please try again later.",this.GENERIC_ERROR_MESSAGE="There's been a temporary error. Please wait a moment and try again."}render(){return w`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableError?this.unrecoverableErrorTemplate:w`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate} ${this.hiddenInputsTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(i){i.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),i.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),i.has("unrecoverableError")&&(this.formCanSubmit=this.checkSubmissionAllowed()),(i.has("currentSubjectLength")||i.has("currentBodyLength")||i.has("maxSubjectLength")||i.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){return this.unrecoverableError?w`
          <div class="unrecoverable-error">
            <span class="error-msg">${S(this.unrecoverableError)}</span>
          </div>
        `:B}get recoverableErrorTemplate(){return this.recoverableError?w`
          <div class="recoverable-error">
            ${yi(this.sanitizeErrorMsg(S(this.recoverableError)))}
          </div>
        `:B}get recaptchaMessageTemplate(){return this.bypassRecaptcha?B:w`
      <span class="recaptcha-disclaimer"
        >${S(w`This site is protected by reCAPTCHA and the Google
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
        <label for="stars-field">${S("Rating (optional)")}</label>
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
          ${S("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return w`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${S("Subject")}</label>
        ${this.maxSubjectLength?w`<div class="char-count subject">
                ${this.currentSubjectLength}/${this.maxSubjectLength}
              </div>`:B}
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
              ${S(`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:B}</div></span>
    `}get bodyInputTemplate(){return w`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${S("Review")}</label>
          ${this.maxBodyLength?w`<div class="char-count body">
                ${this.currentBodyLength}/${this.maxBodyLength}
              </div>`:B}
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
                ${S(`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:B}
      </span>
    `}get hiddenInputsTemplate(){return w`
      <input type="hidden" name="field_reviewtoken" .value=${this.token} />
      ${this.identifier?w`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:B}
    `}get actionButtonsTemplate(){return w`<div class="action-btns">
      <button
        type="button"
        class="ia-button dark"
        data-testid="cancel-btn"
        @click=${this.cancelReviewEdit}
      >
        ${S("Cancel")}
      </button>
      <button
        type="submit"
        class="ia-button primary"
        name="submit"
        ?disabled=${!this.formCanSubmit||this.submissionInProgress}
      >
        ${this.submissionInProgress?w`
              <span class="loading-indicator" alt="Loading indicator">
                <ia-status-indicator hideDots></ia-status-indicator>
              </span>
            `:S("Submit review")}
      </button>
    </div>`}renderStar(i){const e=i===this.currentStars,t=S(`Rate ${i>1?`${i} stars`:"1 star"}`);return w`
      <button
        class="star star-${i}"
        title=${e?S("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,i)}
      >
        ${i<=this.currentStars?w`<img
              class="star-selected"
              src=${xo}
              alt=""
              aria-hidden="true"
            />`:w`<img
              class="star-unselected"
              src=${Co}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.unrecoverableError=this.RECAPTCHA_ERROR_MESSAGE}}sanitizeErrorMsg(i){return ht.sanitize(i,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(i){if(i.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.fetchHandler)return this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission();try{const e=new URLSearchParams;if(!this.bypassRecaptcha){const a=await this.getRecaptchaToken();if(!a)return this.handleRecaptchaError();e.append("g-recaptcha-response",a??"")}for(const a of new FormData(this.reviewForm))e.append(a[0],a[1]);e.append("submitter","review-form");const t=await this.fetchHandler.fetchApiResponse(`${this.baseHost}${this.endpointPath}`,{method:"POST",includeCredentials:!0,body:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else this.recoverableError=t.error??this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}catch(e){console.error(e),this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}}}generateSubmittedReview(){const i=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:i,reviewer:this.oldReview?.reviewer??this.submitterScreenname,reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??i})}dateToString(i){return i instanceof Date?i.toDateString():i}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.recoverableError=this.RECAPTCHA_ERROR_MESSAGE,this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const i=new CustomEvent("reviewEditCanceled");this.dispatchEvent(i)}handleStarClicked(i,e){i.preventDefault(),this.setStars(e)}handleClearBtnClicked(i){i.preventDefault(),this.currentStars=0}setStars(i){this.currentStars=i===this.currentStars?0:i}handleSubjectChanged(i){const e=i.target;this.currentSubjectLength=e.value.length}handleBodyChanged(i){const e=i.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableError||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Ti,wt`
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

        .loading-indicator {
          display: block;
          width: 20px;
          height: 20px;
          margin-top: 2px;
          --ia-theme-icon-width: 20px;
          --ia-theme-primary-text-color: #fff;
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
      `]}};M([T({type:String})],P.prototype,"identifier",2);M([T({type:String})],P.prototype,"token",2);M([T({type:String})],P.prototype,"baseHost",2);M([T({type:String})],P.prototype,"endpointPath",2);M([T({type:String})],P.prototype,"submitterScreenname",2);M([T({type:String})],P.prototype,"submitterItemname",2);M([T({type:Object})],P.prototype,"oldReview",2);M([T({type:String})],P.prototype,"unrecoverableError",2);M([T({type:Number})],P.prototype,"maxSubjectLength",2);M([T({type:Number})],P.prototype,"maxBodyLength",2);M([T({type:Object})],P.prototype,"fetchHandler",2);M([T({type:Object})],P.prototype,"recaptchaManager",2);M([T({type:Boolean})],P.prototype,"bypassRecaptcha",2);M([G()],P.prototype,"currentStars",2);M([G()],P.prototype,"currentSubjectLength",2);M([G()],P.prototype,"currentBodyLength",2);M([G()],P.prototype,"recoverableError",2);M([G()],P.prototype,"formCanSubmit",2);M([G()],P.prototype,"submissionInProgress",2);M([_i("#review-form")],P.prototype,"reviewForm",2);P=M([vt("ia-review-form")],P);var Do=Object.defineProperty,Oo=Object.getOwnPropertyDescriptor,x=(i,e,t,a)=>{for(var c=a>1?void 0:a?Oo(e,t):e,p=i.length-1,h;p>=0;p--)(h=i[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&Do(e,t,c),c};let A=class extends bt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.token="",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.fetchHandler=new Tn,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?w`
      <div class="reviews-list">
        ${this.reviewsFrozen?w`<div class="message">
              ${S("Reviews can no longer be added to this item.")}
            </div>`:B}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(i=>i.reviewer_itemname!==this.submitterItemname?this.renderReview(i):B)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(i){(i.has("reviews")||i.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),i.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),i.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}get reviewsDisabledTemplate(){return w`<div class="message">
      ${S("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?w`
        <div class="message">
          ${S("Reviews cannot be added to this item.")}
        </div>
      `:w`
      <div class="message">
        ${S("There are no reviews yet.")}
        ${S(w`
          Be the first one to
          <button
            class="ia-button link no-reviews-btn"
            @click=${this.addEditReview}
          >
            write a review</button
          >.
        `)}
      </div>
    `}get displayReviewsMsgTemplate(){return w`
      <div class="message">
        ${this.reviewsCount===1?S("There is 1 review for this item."):S(`There are ${this.reviewsCount} reviews for this item.`)}
        <button
          class="ia-button link display-reviews-btn"
          @click=${()=>this.displayReviews=!0}
        >
          ${S(`Display ${this.reviewsCount===1?"review":"reviews"}`)}</button
        >.
      </div>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?B:w`<div class="own-review-container">
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
    </div>`}sortFilterReviews(){let i;const e=[];this.reviews.forEach(t=>{!i&&t.reviewer_itemname===this.submitterItemname?i=t:e.push(t)}),this.currentReview=i,this.filteredReviews=this.sortReviews(e)}sortReviews(i){return[...i].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(i){return i?w`<ia-review
      .review=${i}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .csrfToken=${this.token}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:B}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(i){!this.currentReview&&i.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=i.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[Ti,wt`
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

        .message .ia-button {
          display: inline;
          vertical-align: baseline;
          padding: 0;
          font-weight: 600;
        }
      `]}};x([T({type:String})],A.prototype,"identifier",2);x([T({type:Array})],A.prototype,"reviews",2);x([T({type:Boolean})],A.prototype,"reviewsDisabled",2);x([T({type:Boolean})],A.prototype,"reviewsFrozen",2);x([T({type:Boolean})],A.prototype,"canDelete",2);x([T({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([T({type:Number})],A.prototype,"maxSubjectLength",2);x([T({type:Number})],A.prototype,"maxBodyLength",2);x([T({type:String})],A.prototype,"baseHost",2);x([T({type:String})],A.prototype,"token",2);x([T({type:String})],A.prototype,"endpointPath",2);x([T({type:String})],A.prototype,"submitterScreenname",2);x([T({type:String})],A.prototype,"submitterItemname",2);x([T({type:Object})],A.prototype,"recaptchaManager",2);x([T({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([T({type:String})],A.prototype,"reviewSubmissionError",2);x([T({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([T({type:Object})],A.prototype,"fetchHandler",2);x([G()],A.prototype,"displayReviewForm",2);x([G()],A.prototype,"displayReviews",2);x([G()],A.prototype,"filteredReviews",2);x([G()],A.prototype,"currentReview",2);x([G()],A.prototype,"reviewsCount",2);x([G()],A.prototype,"recaptchaActivated",2);A=x([vt("ia-reviews")],A);var Po=Object.defineProperty,$o=Object.getOwnPropertyDescriptor,hr=(i,e,t,a)=>{for(var c=a>1?void 0:a?$o(e,t):e,p=i.length-1,h;p>=0;p--)(h=i[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&Po(e,t,c),c};const Io=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],Mo=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],No=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Fo={async fetch(){return new Response("{}",{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},Bo=6;let _t=class extends bt{constructor(){super(...arguments),this.log=[]}render(){return w`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:Mo}}
        .propInputData=${{settings:No}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${Io}
          .fetchHandler=${Fo}
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
                ${this.log.map(i=>w`<li><code>${i}</code></li>`)}
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
            <code>fetchHandler</code> so nothing posts to archive.org. In real
            use, hand it a <code>recaptchaManager</code> and the real handler.
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(i){const{detail:e}=i,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${i.type}${t}`,...this.log].slice(0,Bo)}static get styles(){return wt`
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
    `}};hr([G()],_t.prototype,"log",2);hr([_i("ia-reviews")],_t.prototype,"reviews",2);_t=hr([vt("ia-reviews-story")],_t);export{_t as IAReviewsStory};
