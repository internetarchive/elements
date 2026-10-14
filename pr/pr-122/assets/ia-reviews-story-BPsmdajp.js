import{m as S,b as w,r as j,n as E,c as wt,i as bt,A as z,o as di,a as Tt,e as pi}from"./index-hPVCXddI.js";import{_ as n}from"./tslib.es6-kHcLnhpD.js";import"./ia-button-9nOUjAuO.js";import"./story-template-BbqkykEl.js";import"./ia-status-indicator-Bt8veyWl.js";import"./localized-decorator-BJzny2gp.js";import"./icon-box-gx82dXsw.js";function s(i){let e,t,a;return e=i,(c,d,h)=>{if(h.value!=null)h.value=Vr(h.value,e,t,a);else if(h.get!=null)h.get=Vr(h.get,e,t,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ht=new Map;function Vr(i,e,t=0,a){const c=Symbol("__memoized_map__");return function(...d){let h;this.hasOwnProperty(c)||Object.defineProperty(this,c,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let g=this[c];if(Array.isArray(a))for(const _ of a)Ht.has(_)?Ht.get(_).push(g):Ht.set(_,[g]);if(e||d.length>0||t>0){let _;e===!0?_=d.map(V=>V.toString()).join("!"):e?_=e.apply(this,d):_=d[0];const M=`${_}__timestamp`;let k=!1;if(t>0)if(!g.has(M))k=!0;else{let V=g.get(M);k=Date.now()-V>t}g.has(_)&&!k?h=g.get(_):(h=i.apply(this,d),g.set(_,h),t>0&&g.set(M,Date.now()))}else{const _=this;g.has(_)?h=g.get(_):(h=i.apply(this,d),g.set(_,h))}return h}}class mt{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}mt.shared=new mt;class te{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}te.shared=new te;class gt{parseValue(e){return te.shared.parseValue(e)}}gt.shared=new gt;class ze{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,d,h="00",g="00",_="00"]=t,M=new Date(`${a}-${c}-${d}T${h}:${g}:${_}`);return Number.isNaN(M.getTime())?void 0:M}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}ze.shared=new ze;class yt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,d)=>{const h=parseFloat(c);if(Number.isNaN(h))return t=!0,0;const _=60**(e.length-1-d);return h*Math.floor(_)}).reduce((c,d)=>c+d,0);return t?void 0:a}}yt.shared=new yt;class hi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),c=[];return a.forEach(d=>{d!==void 0&&c.push(d)}),c}}class _t{parseValue(e){return String(e)}}_t.shared=new _t;function Me(i,e,...t){for(const a of t){const c=i[a];if(c!=null)return e(c)}}function ae(i,e,...t){return Me(i,a=>e(a),...t)}class ce{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=te.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ae(this.rawValue,e=>gt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ae(this.rawValue,e=>yt.shared.parseValue(e),"length")}get height(){return ae(this.rawValue,e=>te.shared.parseValue(e),"height")}get width(){return ae(this.rawValue,e=>te.shared.parseValue(e),"width")}get track(){return ae(this.rawValue,e=>te.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ae(this.rawValue,e=>te.shared.parseValue(e),"bitrate")}get private(){return ae(this.rawValue,e=>mt.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([s()],ce.prototype,"mtime",null);n([s()],ce.prototype,"size",null);n([s()],ce.prototype,"length",null);n([s()],ce.prototype,"height",null);n([s()],ce.prototype,"width",null);n([s()],ce.prototype,"track",null);n([s()],ce.prototype,"bitrate",null);n([s()],ce.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}n([s()],W.prototype,"values",null);n([s()],W.prototype,"value",null);class oe extends W{constructor(e){super(mt.shared,e)}}class D extends W{constructor(e){super(ze.shared,e)}}class jt extends W{constructor(e){super(yt.shared,e)}}class v extends W{constructor(e){super(te.shared,e)}}class u extends W{constructor(e){super(_t.shared,e)}}class Ue{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends W{constructor(e,t){super(t,e)}}const Ki=new Ue(["rl","lr"]);class Zi extends $e{constructor(e){super(e,Ki)}}class dt extends W{constructor(e){super(gt.shared,e)}}const Ji=new Ue(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class Qi extends $e{constructor(e){super(e,Ji)}}class fi extends W{constructor(e,t){super(t,e)}}class Gr extends fi{constructor(e){const t=new hi(_t.shared);super(e,t)}}class Vt extends fi{constructor(e){const t=new hi(te.shared);super(e,t)}}const en=/^([0-9a-f]{32})\s+\*?(.+)$/i,tn=/^(.+):([0-9a-f]{32})$/i;function rn(i){const e=i.match(en);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=i.match(tn);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Zt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(rn).filter(a=>a!==void 0);return t.length?t:void 0}}Zt.shared=new Zt;class Wr extends W{constructor(e){super(Zt.shared,e)}}function pt(i,e){var t;const a=i.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class Jt{parseValue(e){if(typeof e!="string")return;const t=pt(e,"curator"),a=pt(e,"date"),c=pt(e,"comment"),d=pt(e,"state");if(!(!t&&!a&&!c&&!d))return{curator:t,date:a?ze.shared.parseValue(a):void 0,comment:c,state:d}}}Jt.shared=new Jt;class nn extends W{constructor(e){super(Jt.shared,e)}}class Qt{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}Qt.shared=new Qt;class sn extends W{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),d=parseInt(t[3],10);return{hours:a*c,minutes:d,totalMinutes:a*(c*60+d)}}}er.shared=new er;class on extends W{constructor(e){super(er.shared,e)}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}tr.shared=new tr;class an extends W{constructor(e){super(tr.shared,e)}}const ln=new Ue(["true","none","frozen"]),cn=new Ue(["sound","silent"]),un=new Ue(["color","b&w"]),dn=new Ue(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(v,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(v,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(v,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(v,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,dn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(nn,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(v,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(v,"firstfileserial")}get foldoutcount(){return this.field(v,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(oe,"has_mp3")}get height(){return this.field(v,"height")}get hidden(){return this.field(oe,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(oe,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(sn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(v,"audio_sample_rate")}get avg_rating(){return this.field(v,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(oe,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(dt,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,un),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(v,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(v,"files_count")}get frames_per_second(){return this.field(v,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(v,"image_count")}get imagecount(){return this.field(v,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(v,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(v,"issue_count")}get issue_page_count(){return this.field(v,"issue_page_count")}get item_count(){return this.field(v,"item_count")}get item_size(){return this.field(dt,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(v,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(oe,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Wr,"md5contents")}get md5s(){return this.field(Wr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(oe,"monochromatic")}get month(){return this.field(v,"month")}get mediatype(){return this.field(Qi,"mediatype")}get mpeg_program(){return this.field(v,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(oe,"noarchivetorrent")}get noindex(){return this.field(oe,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(v,"num_favorites")}get num_reviews(){return this.field(v,"num_reviews")}get numeric_id(){return this.field(v,"numeric_id")}get numwarcs(){return this.field(v,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(oe,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(v,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(v,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(v,"output_time_minutes")}get pacer_case_num(){return this.field(v,"pacer-case-num")}get packaging_time_minutes(){return this.field(v,"packaging_time_minutes")}get page_number_confidence(){return this.field(v,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(Zi,"page-progression","page_progression")}get paginated(){return this.field(oe,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(v,"pick")}get podcastindexid(){return this.field(v,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(v,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(v,"rcs_key")}get repub_state(){return this.field(v,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(Gr,"republisher_operator")}get republisher_time(){return this.field(v,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,ln),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(v,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(v,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(dt,"size")}get sizehint(){return this.field(dt,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,cn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(v,"source_pixel_height")}get source_pixel_width(){return this.field(v,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(Gr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(v,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(an,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(on,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(v,"week")}get width(){return this.field(v,"width")}get year(){return this.field(v,"year")}field(e,...t){return Me(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}n([s()],o.prototype,"access",null);n([s()],o.prototype,"adder",null);n([s()],o.prototype,"amrc_id",null);n([s()],o.prototype,"archiveit_account_id",null);n([s()],o.prototype,"archiveit_account_organization_name",null);n([s()],o.prototype,"archiveit_collection_id",null);n([s()],o.prototype,"archiveit_collection_name",null);n([s()],o.prototype,"archiveit_job_type",null);n([s()],o.prototype,"audit_time_minutes",null);n([s()],o.prototype,"auditor",null);n([s()],o.prototype,"author",null);n([s()],o.prototype,"autocrop_version",null);n([s()],o.prototype,"bookplateleaf",null);n([s()],o.prototype,"bookreader_defaults",null);n([s()],o.prototype,"boxid",null);n([s()],o.prototype,"camera",null);n([s()],o.prototype,"cameraman",null);n([s()],o.prototype,"canister",null);n([s()],o.prototype,"case_name",null);n([s()],o.prototype,"col_number",null);n([s()],o.prototype,"collection_added",null);n([s()],o.prototype,"collection_library",null);n([s()],o.prototype,"collection_set",null);n([s()],o.prototype,"copyright_holder",null);n([s()],o.prototype,"court",null);n([s()],o.prototype,"crawler",null);n([s()],o.prototype,"crawljob",null);n([s()],o.prototype,"curation",null);n([s()],o.prototype,"dari_title",null);n([s()],o.prototype,"dari_title_romanized",null);n([s()],o.prototype,"date_case_filed",null);n([s()],o.prototype,"date_case_terminated",null);n([s()],o.prototype,"date_created",null);n([s()],o.prototype,"date_last_filing",null);n([s()],o.prototype,"derive_submittime",null);n([s()],o.prototype,"derive_version",null);n([s()],o.prototype,"discs",null);n([s()],o.prototype,"docket_num",null);n([s()],o.prototype,"external_metadata_update",null);n([s()],o.prototype,"fail_reasons",null);n([s()],o.prototype,"filesxml",null);n([s()],o.prototype,"firstfiledate",null);n([s()],o.prototype,"firstfileserial",null);n([s()],o.prototype,"foldoutcount",null);n([s()],o.prototype,"format",null);n([s()],o.prototype,"geo_restricted",null);n([s()],o.prototype,"guid",null);n([s()],o.prototype,"has_mp3",null);n([s()],o.prototype,"height",null);n([s()],o.prototype,"hidden",null);n([s()],o.prototype,"ia_orig__runtime",null);n([s()],o.prototype,"access_restricted_item",null);n([s()],o.prototype,"addeddate",null);n([s()],o.prototype,"aspect_ratio",null);n([s()],o.prototype,"audio_codec",null);n([s()],o.prototype,"audio_sample_rate",null);n([s()],o.prototype,"avg_rating",null);n([s()],o.prototype,"backup_location",null);n([s()],o.prototype,"ccnum",null);n([s()],o.prototype,"closed_captioning",null);n([s()],o.prototype,"collection",null);n([s()],o.prototype,"collections_raw",null);n([s()],o.prototype,"collection_size",null);n([s()],o.prototype,"color",null);n([s()],o.prototype,"contact",null);n([s()],o.prototype,"contributor",null);n([s()],o.prototype,"coverage",null);n([s()],o.prototype,"creator",null);n([s()],o.prototype,"creator_alt_script",null);n([s()],o.prototype,"credits",null);n([s()],o.prototype,"collection_layout",null);n([s()],o.prototype,"date",null);n([s()],o.prototype,"description",null);n([s()],o.prototype,"downloads",null);n([s()],o.prototype,"duration",null);n([s()],o.prototype,"external_identifier",null);n([s()],o.prototype,"external_link",null);n([s()],o.prototype,"files_count",null);n([s()],o.prototype,"frames_per_second",null);n([s()],o.prototype,"identifier_access",null);n([s()],o.prototype,"identifier_ark",null);n([s()],o.prototype,"identifier_bib",null);n([s()],o.prototype,"image_count",null);n([s()],o.prototype,"imagecount",null);n([s()],o.prototype,"indexdate",null);n([s()],o.prototype,"invoice",null);n([s()],o.prototype,"isbn",null);n([s()],o.prototype,"issue",null);n([s()],o.prototype,"issue_count",null);n([s()],o.prototype,"issue_page_count",null);n([s()],o.prototype,"item_count",null);n([s()],o.prototype,"item_size",null);n([s()],o.prototype,"language",null);n([s()],o.prototype,"lastdate",null);n([s()],o.prototype,"lastfiledate",null);n([s()],o.prototype,"lastfileserial",null);n([s()],o.prototype,"length",null);n([s()],o.prototype,"license",null);n([s()],o.prototype,"licenseurl",null);n([s()],o.prototype,"lineage",null);n([s()],o.prototype,"mature_content",null);n([s()],o.prototype,"md5",null);n([s()],o.prototype,"md5contents",null);n([s()],o.prototype,"md5s",null);n([s()],o.prototype,"medium",null);n([s()],o.prototype,"metadata_operator",null);n([s()],o.prototype,"metasource_catalog",null);n([s()],o.prototype,"monochromatic",null);n([s()],o.prototype,"month",null);n([s()],o.prototype,"mediatype",null);n([s()],o.prototype,"mpeg_program",null);n([s()],o.prototype,"next_item",null);n([s()],o.prototype,"noarchivetorrent",null);n([s()],o.prototype,"noindex",null);n([s()],o.prototype,"notes",null);n([s()],o.prototype,"num_favorites",null);n([s()],o.prototype,"num_reviews",null);n([s()],o.prototype,"numeric_id",null);n([s()],o.prototype,"numwarcs",null);n([s()],o.prototype,"ocr",null);n([s()],o.prototype,"ocr_autonomous",null);n([s()],o.prototype,"ocr_detected_lang",null);n([s()],o.prototype,"ocr_detected_lang_conf",null);n([s()],o.prototype,"ocr_detected_script",null);n([s()],o.prototype,"ocr_detected_script_conf",null);n([s()],o.prototype,"ocr_invalid_language",null);n([s()],o.prototype,"ocr_module_version",null);n([s()],o.prototype,"ocr_parameters",null);n([s()],o.prototype,"old_pallet",null);n([s()],o.prototype,"openlibrary_edition",null);n([s()],o.prototype,"openlibrary_work",null);n([s()],o.prototype,"operator",null);n([s()],o.prototype,"originalurl",null);n([s()],o.prototype,"osf_category",null);n([s()],o.prototype,"osf_project",null);n([s()],o.prototype,"osf_registration_doi",null);n([s()],o.prototype,"osf_registration_schema",null);n([s()],o.prototype,"osf_registry",null);n([s()],o.prototype,"osf_subjects",null);n([s()],o.prototype,"osf_tags",null);n([s()],o.prototype,"output_time_minutes",null);n([s()],o.prototype,"pacer_case_num",null);n([s()],o.prototype,"packaging_time_minutes",null);n([s()],o.prototype,"page_number_confidence",null);n([s()],o.prototype,"page_number_module_version",null);n([s()],o.prototype,"page_progression",null);n([s()],o.prototype,"paginated",null);n([s()],o.prototype,"parse_date",null);n([s()],o.prototype,"parse_state",null);n([s()],o.prototype,"partner",null);n([s()],o.prototype,"pashto_title",null);n([s()],o.prototype,"pashto_title_romanized",null);n([s()],o.prototype,"pdf_degraded",null);n([s()],o.prototype,"pdf_module_version",null);n([s()],o.prototype,"pick",null);n([s()],o.prototype,"podcastindexid",null);n([s()],o.prototype,"post_text",null);n([s()],o.prototype,"ppi",null);n([s()],o.prototype,"previous_item",null);n([s()],o.prototype,"program",null);n([s()],o.prototype,"publicdate",null);n([s()],o.prototype,"publisher",null);n([s()],o.prototype,"political_religious_party",null);n([s()],o.prototype,"rcs_key",null);n([s()],o.prototype,"repub_state",null);n([s()],o.prototype,"republisher_date",null);n([s()],o.prototype,"republisher_operator",null);n([s()],o.prototype,"republisher_time",null);n([s()],o.prototype,"reviewdate",null);n([s()],o.prototype,"reviews_allowed",null);n([s()],o.prototype,"ribbon_state",null);n([s()],o.prototype,"ribbon_state_modify_date",null);n([s()],o.prototype,"rights",null);n([s()],o.prototype,"rights_holder",null);n([s()],o.prototype,"rssfeed",null);n([s()],o.prototype,"runtime",null);n([s()],o.prototype,"scan_time_minutes",null);n([s()],o.prototype,"scandate",null);n([s()],o.prototype,"scanfee",null);n([s()],o.prototype,"scanner",null);n([s()],o.prototype,"scanner_operator",null);n([s()],o.prototype,"scanningcenter",null);n([s()],o.prototype,"scribe3_search_catalog",null);n([s()],o.prototype,"scribe3_search_id",null);n([s()],o.prototype,"segments",null);n([s()],o.prototype,"sessionid",null);n([s()],o.prototype,"shndiscs",null);n([s()],o.prototype,"shotlist",null);n([s()],o.prototype,"signal_path",null);n([s()],o.prototype,"size",null);n([s()],o.prototype,"sizehint",null);n([s()],o.prototype,"software_version",null);n([s()],o.prototype,"sort_order",null);n([s()],o.prototype,"sound",null);n([s()],o.prototype,"soundcreator",null);n([s()],o.prototype,"soundtitle",null);n([s()],o.prototype,"source",null);n([s()],o.prototype,"source_pixel_height",null);n([s()],o.prototype,"source_pixel_width",null);n([s()],o.prototype,"source_url",null);n([s()],o.prototype,"sponsor",null);n([s()],o.prototype,"sponsordate",null);n([s()],o.prototype,"start_localtime",null);n([s()],o.prototype,"start_time",null);n([s()],o.prototype,"station_name",null);n([s()],o.prototype,"stop_time",null);n([s()],o.prototype,"subject",null);n([s()],o.prototype,"taper",null);n([s()],o.prototype,"thumbs",null);n([s()],o.prototype,"times",null);n([s()],o.prototype,"title",null);n([s()],o.prototype,"title_alt_script",null);n([s()],o.prototype,"transferer",null);n([s()],o.prototype,"track",null);n([s()],o.prototype,"tts_version",null);n([s()],o.prototype,"tuner",null);n([s()],o.prototype,"type",null);n([s()],o.prototype,"updatedate",null);n([s()],o.prototype,"updater",null);n([s()],o.prototype,"uploader",null);n([s()],o.prototype,"uploadsoftware",null);n([s()],o.prototype,"utc_offset",null);n([s()],o.prototype,"venue",null);n([s()],o.prototype,"video_codec",null);n([s()],o.prototype,"volume",null);n([s()],o.prototype,"website",null);n([s()],o.prototype,"week",null);n([s()],o.prototype,"width",null);n([s()],o.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ae(this.rawValue,e=>ze.shared.parseValue(e),"reviewdate")}get createdate(){return ae(this.rawValue,e=>ze.shared.parseValue(e),"createdate")}get stars(){return ae(this.rawValue,e=>te.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([s()],me.prototype,"reviewdate",null);n([s()],me.prototype,"createdate",null);n([s()],me.prototype,"stars",null);class pn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ce(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new me(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(i){i.networkError="MetadataService.NetworkError",i.itemNotFound="MetadataService.ItemNotFound",i.decodingError="MetadataService.DecodingError",i.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class rr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class hn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let d;try{const h=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(c.href,h)}catch(h){const g=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Te.networkError,g)}try{const h=await d.json(),g=h.error;if(g){const _=h.forensics;return this.getErrorResult(Te.searchEngineError,g,_)}else return{success:h}}catch(h){const g=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Te.decodingError,g)}}getErrorResult(e,t,a){return{error:new rr(e,t,a)}}}class Yr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new rr(Te.itemNotFound)}:{success:new pn(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new rr(Te.itemNotFound)}:{success:c.success.result}}}Yr.default=new Yr(new hn);function qr(i){return new Promise(e=>setTimeout(e,i))}class ir{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}ir.shared=new ir;class nr{shouldRetry(){return!1}retryDelay(){return null}}nr.shared=new nr;class ar{}ar.default=ir.shared;ar.noRetry=nr.shared;const mi=i=>{if(i)return"requestInit"in i||"retryConfig"in i||"includeCsrfToken"in i?i:{requestInit:i}};class fn{constructor(e){this.retryConfig=ar.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=mi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,d;const h=typeof e=="string"?e:e.url;try{const g=await fetch(e,a?.requestInit);if(g.ok)return g;g.status>=400&&g.status<600&&this.log4xx5xxResponse(g);const _=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(_.shouldRetry(g,t)){const k=_.retryDelay(t,g);if(k!==null)return await qr(k),this.logRetryEvent(h,t,g.statusText,g.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(h,g.status),g}catch(g){if(this.isContentBlockerError(g))throw this.logContentBlockingEvent(h,g),g;const _=(d=a?.retryConfig)!==null&&d!==void 0?d:this.retryConfig;if(_.shouldRetry(null,t)){const k=_.retryDelay(t);if(k!==null)return await qr(k),this.logRetryEvent(h,t,g,g),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(h,g),g}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var d;(d=this.analyticsHandler)===null||d===void 0||d.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const mn=new Set(["POST","PUT","DELETE","PATCH"]);class lr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new fn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;a=this.addSearchParams(h,{reCache:"1"})}const d=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,d)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((_,M)=>{c.set(M,_)}),a.headers=c;const d=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(d,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,d,h;if(!this.getCsrfToken)return t;const g=(a=mi(t))!==null&&a!==void 0?a:{};if(!g.includeCsrfToken)return t;const _=(c=g.requestInit)!==null&&c!==void 0?c:{},M=((h=(d=_.method)!==null&&d!==void 0?d:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!mn.has(M))return t;const k=new Headers(_.headers);return k.has("X-CSRF-Token")?t:(k.set("X-CSRF-Token",await this.getCsrfToken()),{...g,requestInit:{..._,headers:k}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),d=a===-1?e:e.slice(0,a),h=d.indexOf("?"),g=h===-1?d:d.slice(0,h),_=new URLSearchParams(h===-1?"":d.slice(h+1)),M=lr.asSearchParams(t),k=new Set;M.forEach((Ke,le)=>{k.has(le)||(k.add(le),_.delete(le))}),M.forEach((Ke,le)=>{_.append(le,Ke)});const V=_.toString();return`${g}${V?`?${V}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class gn extends lr{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const yn="/write-review.php",_n="/edit-reviews.php";class gi{constructor(e){this.fetchHandler=e?.fetchHandler??new gn,this.baseHost=e?.baseHost??"https://archive.org",this.submitPath=e?.submitPath??yn,this.deletePath=e?.deletePath??_n,this.deleteMethod=e?.deleteMethod??"POST"}async submitReview(e){const t=new URLSearchParams;return t.append("identifier",e.identifier),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_stars",e.stars??"0"),e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:t})}async deleteReview(e){const t=new URLSearchParams;t.append("identifier",e.identifier),t.append("deleteReviewer",e.reviewer),e.reviewerItemname&&t.append("deleteReviewerItemname",e.reviewerItemname);const a=`${this.baseHost}${this.deletePath}?${t.toString()}`;return this.request(a,{method:this.deleteMethod})}async request(e,t){try{const a=await this.fetchHandler.fetch(e,{requestInit:{method:t.method,body:t.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(a)}catch(a){return console.error("Review request failed",a),{success:!1,error:this.genericError}}}async parseResult(e){let t;try{t=await e.json()}catch{t=void 0}return e.ok?!t||t.success?{success:!0}:{success:!1,error:t.error??this.genericError}:{success:!1,error:t?.error??this.genericError}}get genericError(){return S("Sorry, something went wrong. Please try again later.")}}const vn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Xr(i=""){if(i.length<=40)return i;const t=i.substring(0,40)+"...";return w`<span title="${i}">${t}</span>`}function Kr(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,a=Array(e);t<e;t++)a[t]=i[t];return a}function wn(i){if(Array.isArray(i))return i}function bn(i,e){var t=i==null?null:typeof Symbol<"u"&&i[Symbol.iterator]||i["@@iterator"];if(t!=null){var a,c,d,h,g=[],_=!0,M=!1;try{if(d=(t=t.call(i)).next,e!==0)for(;!(_=(a=d.call(t)).done)&&(g.push(a.value),g.length!==e);_=!0);}catch(k){M=!0,c=k}finally{try{if(!_&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if(M)throw c}}return g}}function Tn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Sn(i,e){return wn(i)||bn(i,e)||En(i,e)||Tn()}function En(i,e){if(i){if(typeof i=="string")return Kr(i,e);var t={}.toString.call(i).slice(8,-1);return t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set"?Array.from(i):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Kr(i,e):void 0}}const yi=Object.entries,Zr=Object.setPrototypeOf,Rn=Object.isFrozen,An=Object.getPrototypeOf,xn=Object.getOwnPropertyDescriptor;let $=Object.freeze,U=Object.seal,Ne=Object.create,_i=typeof Reflect<"u"&&Reflect,sr=_i.apply,or=_i.construct;$||($=function(e){return e});U||(U=function(e){return e});sr||(sr=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),d=2;d<a;d++)c[d-2]=arguments[d];return e.apply(t,c)});or||(or=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const be=N(Array.prototype.forEach),Cn=N(Array.prototype.lastIndexOf),Jr=N(Array.prototype.pop),We=N(Array.prototype.push),Ln=N(Array.prototype.splice),Fe=Array.isArray,Xe=N(String.prototype.toLowerCase),Gt=N(String.prototype.toString),Qr=N(String.prototype.match),Ye=N(String.prototype.replace),ei=N(String.prototype.indexOf),Dn=N(String.prototype.trim),On=N(Number.prototype.toString),kn=N(Boolean.prototype.toString),ti=typeof BigInt>"u"?null:N(BigInt.prototype.toString),ri=typeof Symbol>"u"?null:N(Symbol.prototype.toString),q=N(Object.prototype.hasOwnProperty),qe=N(Object.prototype.toString),H=N(RegExp.prototype.test),he=In(TypeError);function N(i){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return sr(i,e,a)}}function In(i){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return or(i,t)}}function R(i,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(Zr&&Zr(i,null),!Fe(e))return i;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const d=t(c);d!==c&&(Rn(e)||(e[a]=d),c=d)}i[c]=!0}return i}function Pn(i){for(let e=0;e<i.length;e++)q(i,e)||(i[e]=null);return i}function Z(i){const e=Ne(null);for(const a of yi(i)){var t=Sn(a,2);const c=t[0],d=t[1];q(i,c)&&(Fe(d)?e[c]=Pn(d):d&&typeof d=="object"&&d.constructor===Object?e[c]=Z(d):e[c]=d)}return e}function Mn(i){switch(typeof i){case"string":return i;case"number":return On(i);case"boolean":return kn(i);case"bigint":return ti?ti(i):"0";case"symbol":return ri?ri(i):"Symbol()";case"undefined":return qe(i);case"function":case"object":{if(i===null)return qe(i);const e=i,t=Q(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:qe(a)}return qe(i)}default:return qe(i)}}function Q(i,e){for(;i!==null;){const a=xn(i,e);if(a){if(a.get)return N(a.get);if(typeof a.value=="function")return N(a.value)}i=An(i)}function t(){return null}return t}function Nn(i){try{return H(i,""),!0}catch{return!1}}const ii=$(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Wt=$(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Yt=$(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$n=$(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qt=$(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fn=$(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ni=$(["#text"]),si=$(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Xt=$(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oi=$(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ht=$(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),zn=U(/{{[\w\W]*|^[\w\W]*}}/g),Un=U(/<%[\w\W]*|^[\w\W]*%>/g),Bn=U(/\${[\w\W]*/g),Hn=U(/^data-[\-\w.\u00B7-\uFFFF]+$/),jn=U(/^aria-[\-\w]+$/),ai=U(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vn=U(/^(?:\w+script|data):/i),Gn=U(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wn=U(/^html$/i),Yn=U(/^[a-z][.\w]*(-[.\w]+)+$/i),li=U(/<[/\w!]/g),ci=U(/<[/\w]/g),qn=U(/<\/no(script|embed|frames)/i),Xn=U(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},vi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Kn=$(R({},vi)),Zn=(function(){const i={};return be(vi,e=>{i[e]=U(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),$(i)})(),Jn=function(){return typeof window>"u"?null:window},Qn=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const d="dompurify"+(a?"#"+a:"");try{return e.createPolicy(d,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+d+" could not be created."),null}},ui=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,a,c){return q(e,t)&&Fe(e[t])?R(c.base?Z(c.base):{},e[t],c.transform):a},Kt=function(e,t,a){const c=q(e,t)?e[t]:void 0;return c&&typeof c=="object"?Z(c):a()};function wi(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Jn();const e=f=>wi(f);if(e.version="3.4.16",e.removed=[],!i||!i.document||i.document.nodeType!==K.document||!i.Element)return e.isSupported=!1,e;let t=i.document;const a=t,c=a.currentScript;i.DocumentFragment;const d=i.HTMLTemplateElement,h=i.Node,g=i.Element,_=i.NodeFilter;i.NamedNodeMap===void 0&&(i.NamedNodeMap||i.MozNamedAttrMap),i.HTMLFormElement;const M=i.DOMParser,k=i.trustedTypes,V=g.prototype,Ke=Q(V,"cloneNode"),le=Q(V,"remove"),ur=Q(V,"removeAttributeNode"),bi=Q(V,"nextSibling"),Se=Q(V,"childNodes"),Ee=Q(V,"parentNode"),dr=Q(V,"shadowRoot"),St=Q(V,"attributes"),ge=h&&h.prototype?Q(h.prototype,"nodeType"):null,Re=h&&h.prototype?Q(h.prototype,"nodeName"):null,Ze=h&&h.prototype?Q(h.prototype,"ownerDocument"):null,Be=function(r){return ge?ge(r):r.nodeType},Et=function(r){return Re?Re(r):r.nodeName};if(typeof d=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let Y,ye="",Rt,pr=!1,He=0;const hr=function(){if(He>0)throw he('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(r){hr(),He++;try{return Y.createHTML(r)}finally{He--}},Ti=function(r){hr(),He++;try{return Y.createScriptURL(r)}finally{He--}},Si=function(){return pr||(Rt=Qn(k,c),pr=!0),Rt},Je=t,At=Je.implementation,fr=Je.createNodeIterator,Ei=Je.createDocumentFragment,Ri=Je.getElementsByTagName,Ai=a.importNode;let x=ui();e.isSupported=typeof yi=="function"&&typeof Ee=="function"&&At&&At.createHTMLDocument!==void 0;const xi=zn,Ci=Un,Li=Bn,Di=Hn,Oi=jn,ki=Vn,mr=Gn,Ii=Yn;let gr=ai,C=null;const xt=R({},[...ii,...Wt,...Yt,...qt,...ni]);let L=null;const Ct=R({},[...si,...Xt,...oi,...ht]);let ie=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,yr=null;const ue=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let _r=!0,Lt=!0,vr=!1,wr=!0,de=!1,_e=!0,ve=!1,Dt=!1,Qe=null,et=null,Ot=!1,xe=!1,tt=!1,rt=!1,br=!0,Tr=!1;const Sr="user-content-";let kt=!0,It=!1,Ce={},Le=null;const Er=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Rr=null;const Ar=R({},["audio","video","img","source","image","track"]);let xr=null;const Cr=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),it="http://www.w3.org/1998/Math/MathML",nt="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";let De=ne,Pt=!1,Mt=null;const Pi=R({},[it,nt,ne],Gt),Lr=$(["mi","mo","mn","ms","mtext"]);let Nt=R({},Lr);const Dr=$(["annotation-xml"]);let $t=R({},Dr);const Mi=R({},["title","style","font","a","script"]);let Ve=null;const Ni=["application/xhtml+xml","text/html"],$i="text/html";let P=null,Oe=null;const Fi=t.createElement("form"),Or=function(r){return r instanceof RegExp||r instanceof Function},Ft=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Oe&&Oe===r)return;(!r||typeof r!="object")&&(r={}),r=Z(r),Ve=Ni.indexOf(r.PARSER_MEDIA_TYPE)===-1?$i:r.PARSER_MEDIA_TYPE,P=Ve==="application/xhtml+xml"?Gt:Xe,C=fe(r,"ALLOWED_TAGS",xt,{transform:P}),L=fe(r,"ALLOWED_ATTR",Ct,{transform:P}),Mt=fe(r,"ALLOWED_NAMESPACES",Pi,{transform:Gt}),xr=fe(r,"ADD_URI_SAFE_ATTR",Cr,{transform:P,base:Cr}),Rr=fe(r,"ADD_DATA_URI_TAGS",Ar,{transform:P,base:Ar}),Le=fe(r,"FORBID_CONTENTS",Er,{transform:P}),je=fe(r,"FORBID_TAGS",Z({}),{transform:P}),yr=fe(r,"FORBID_ATTR",Z({}),{transform:P}),Ce=q(r,"USE_PROFILES")?r.USE_PROFILES&&typeof r.USE_PROFILES=="object"?Z(r.USE_PROFILES):r.USE_PROFILES:!1,_r=r.ALLOW_ARIA_ATTR!==!1,Lt=r.ALLOW_DATA_ATTR!==!1,vr=r.ALLOW_UNKNOWN_PROTOCOLS||!1,wr=r.ALLOW_SELF_CLOSE_IN_ATTR!==!1,de=r.SAFE_FOR_TEMPLATES||!1,_e=r.SAFE_FOR_XML!==!1,ve=r.WHOLE_DOCUMENT||!1,xe=r.RETURN_DOM||!1,tt=r.RETURN_DOM_FRAGMENT||!1,rt=r.RETURN_TRUSTED_TYPE||!1,Ot=r.FORCE_BODY||!1,br=r.SANITIZE_DOM!==!1,Tr=r.SANITIZE_NAMED_PROPS||!1,kt=r.KEEP_CONTENT!==!1,It=r.IN_PLACE||!1,gr=Nn(r.ALLOWED_URI_REGEXP)?r.ALLOWED_URI_REGEXP:ai,De=typeof r.NAMESPACE=="string"?r.NAMESPACE:ne,Nt=Kt(r,"MATHML_TEXT_INTEGRATION_POINTS",()=>R({},Lr)),$t=Kt(r,"HTML_INTEGRATION_POINTS",()=>R({},Dr));const l=Kt(r,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(ie=Ne(null),q(l,"tagNameCheck")&&Or(l.tagNameCheck)&&(ie.tagNameCheck=l.tagNameCheck),q(l,"attributeNameCheck")&&Or(l.attributeNameCheck)&&(ie.attributeNameCheck=l.attributeNameCheck),q(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),U(ie),de&&(Lt=!1),tt&&(xe=!0),Ce&&(C=R({},ni),L=Ne(null),Ce.html===!0&&(R(C,ii),R(L,si)),Ce.svg===!0&&(R(C,Wt),R(L,Xt),R(L,ht)),Ce.svgFilters===!0&&(R(C,Yt),R(L,Xt),R(L,ht)),Ce.mathMl===!0&&(R(C,qt),R(L,oi),R(L,ht))),ue.tagCheck=null,ue.attributeCheck=null,q(r,"ADD_TAGS")&&(typeof r.ADD_TAGS=="function"?ue.tagCheck=r.ADD_TAGS:Fe(r.ADD_TAGS)&&(C===xt&&(C=Z(C)),R(C,r.ADD_TAGS,P))),q(r,"ADD_ATTR")&&(typeof r.ADD_ATTR=="function"?ue.attributeCheck=r.ADD_ATTR:Fe(r.ADD_ATTR)&&(L===Ct&&(L=Z(L)),R(L,r.ADD_ATTR,P))),q(r,"ADD_FORBID_CONTENTS")&&Fe(r.ADD_FORBID_CONTENTS)&&(Le===Er&&(Le=Z(Le)),R(Le,r.ADD_FORBID_CONTENTS,P)),kt&&(C["#text"]=!0),ve&&R(C,["html","head","body"]),C.table&&(R(C,["tbody"]),delete je.tbody),r.TRUSTED_TYPES_POLICY){if(typeof r.TRUSTED_TYPES_POLICY.createHTML!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof r.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const p=Y;Y=r.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(m){throw Y=p,m}}else r.TRUSTED_TYPES_POLICY===null?(Y=void 0,ye=""):(Y===void 0&&(Y=Si()),Y&&typeof ye=="string"&&(ye=Ae("")));$&&$(r),Oe=r},kr=R({},[...Wt,...Yt,...$n]),Ir=R({},[...qt,...Fn]),zi=function(r,l,p){return l.namespaceURI===ne?r==="svg":l.namespaceURI===it?r==="svg"&&(p==="annotation-xml"||Nt[p]):!!kr[r]},Ui=function(r,l,p){return l.namespaceURI===ne?r==="math":l.namespaceURI===nt?r==="math"&&$t[p]:!!Ir[r]},Bi=function(r,l,p){return l.namespaceURI===nt&&!$t[p]||l.namespaceURI===it&&!Nt[p]?!1:!Ir[r]&&(Mi[r]||!kr[r])},Hi=function(r){let l=Ee(r);(!l||!l.tagName)&&(l={namespaceURI:De,tagName:"template"});const p=Xe(r.tagName),m=Xe(l.tagName);return Mt[r.namespaceURI]?r.namespaceURI===nt?zi(p,l,m):r.namespaceURI===it?Ui(p,l,m):r.namespaceURI===ne?Bi(p,l,m):!!(Ve==="application/xhtml+xml"&&Mt[r.namespaceURI]):!1},pe=function(r){We(e.removed,{element:r});try{Ee(r).removeChild(r)}catch{if(le(r),!Ee(r))throw he("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Pr=function(r,l,p){try{ur(r,l)}catch{try{r.removeAttribute(p)}catch{}}},st=function(r){ot(r);const l=Se(r);if(l){const m=[];be(l,y=>{We(m,y)}),be(m,y=>{try{le(y)}catch{}})}const p=St(r);if(p)for(let m=p.length-1;m>=0;--m){const y=p[m],b=y&&y.name;typeof b=="string"&&Pr(r,y,b)}},we=function(r,l,p){if(!p)try{p=l.getAttributeNode(r)}catch{p=null}We(e.removed,{attribute:p||null,from:l});try{p?ur(l,p):l.removeAttribute(r)}catch{try{l.removeAttribute(r)}catch{}}if(r==="is")if(xe||tt)try{pe(l)}catch{}else try{l.setAttribute(r,"")}catch{}},ji=function(r){const l=St(r);if(l)for(let p=l.length-1;p>=0;--p){const m=l[p],y=m&&m.name;typeof y!="string"||L[P(y)]||Pr(r,m,y)}},ot=function(r){const l=[r];for(;l.length>0;){const p=l.pop();Be(p)===K.element&&ji(p);const m=Se(p);if(m)for(let y=m.length-1;y>=0;--y)l.push(m[y])}},Mr=function(r,l){return _e?r==="patchsrc"?!0:r==="for"&&l!=="label"&&l!=="output":!1},Vi=function(r){if(!_e)return;const l=[r];for(;l.length>0;){const p=l.pop(),m=Be(p);if(m===K.processingInstruction||m===K.comment&&H(ci,p.data)){try{le(p)}catch{}continue}if(m===K.element){const b=p,T=P(Et(p));try{b.hasAttribute&&b.hasAttribute("patchsrc")&&b.removeAttribute("patchsrc"),b.hasAttribute&&b.hasAttribute("for")&&Mr("for",T)&&b.removeAttribute("for")}catch{}}const y=Se(p);if(y)for(let b=y.length-1;b>=0;--b)l.push(y[b])}},Nr=function(r){let l=null,p=null;if(Ot)r="<remove></remove>"+r;else{const b=Qr(r,/^[\r\n\t ]+/);p=b&&b[0]}Ve==="application/xhtml+xml"&&De===ne&&(r='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+r+"</body></html>");const m=Y?Ae(r):r;if(De===ne)try{l=new M().parseFromString(m,Ve)}catch{}if(!l||!l.documentElement){l=At.createDocument(De,"template",null);try{l.documentElement.innerHTML=Pt?ye:m}catch{}}const y=l.body||l.documentElement;return r&&p&&y.insertBefore(t.createTextNode(p),y.childNodes[0]||null),De===ne?Ri.call(l,ve?"html":"body")[0]:ve?l.documentElement:y},$r=function(r){const l=Ze?Ze(r):r.ownerDocument;return fr.call(l||r,r,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT|_.SHOW_PROCESSING_INSTRUCTION|_.SHOW_CDATA_SECTION,null)},at=function(r){return r=Ye(r,xi," "),r=Ye(r,Ci," "),r=Ye(r,Li," "),r},zt=function(r){var l;r.normalize();const p=Ze?Ze(r):r.ownerDocument,m=fr.call(p||r,r,_.SHOW_TEXT|_.SHOW_COMMENT|_.SHOW_CDATA_SECTION|_.SHOW_PROCESSING_INSTRUCTION,null);let y=m.nextNode();for(;y;)y.data=at(y.data),y=m.nextNode();const b=(l=r.querySelectorAll)===null||l===void 0?void 0:l.call(r,"template");b&&be(b,T=>{ke(T.content)&&zt(T.content)})},lt=function(r){const l=Re?Re(r):null;return typeof l!="string"||P(l)!=="form"?!1:typeof r.nodeName!="string"||typeof r.textContent!="string"||typeof r.removeChild!="function"||r.attributes!==St(r)||typeof r.removeAttribute!="function"||typeof r.removeAttributeNode!="function"||typeof r.getAttributeNode!="function"||typeof r.setAttribute!="function"||typeof r.namespaceURI!="string"||typeof r.insertBefore!="function"||typeof r.hasChildNodes!="function"||r.nodeType!==ge(r)||r.childNodes!==Se(r)},ke=function(r){if(!ge||typeof r!="object"||r===null)return!1;try{return ge(r)===K.documentFragment}catch{return!1}},Ge=function(r){if(!ge||typeof r!="object"||r===null)return!1;try{return typeof ge(r)=="number"}catch{return!1}};function se(f,r,l){f.length!==0&&be(f,p=>{p.call(e,r,l,Oe)})}const Gi=function(r,l){return!!(_e&&r.hasChildNodes()&&!Ge(r.firstElementChild)&&H(li,r.textContent)&&H(li,r.innerHTML)||_e&&r.namespaceURI===ne&&Kn[l]&&(Ge(r.firstElementChild)||typeof r.textContent=="string"&&H(Zn[l],r.textContent))||r.nodeType===K.processingInstruction||_e&&r.nodeType===K.comment&&H(ci,r.data))},ct=function(r,l){if(r instanceof RegExp)return H(r,l);if(r instanceof Function){for(var p=arguments.length,m=new Array(p>2?p-2:0),y=2;y<p;y++)m[y-2]=arguments[y];return!!r(l,...m)}return!1},Wi=function(r,l,p){if(!je[l]&&Br(l)&&ct(ie.tagNameCheck,l))return!1;if(kt&&!Le[l]){const m=Ee(r),y=Se(r);if(y&&m){const b=y.length;for(let T=b-1;T>=0;--T){const I=r===p?Ke(y[T],!0):y[T];m.insertBefore(I,bi(r))}}}return pe(r),!0},Fr=function(r,l,p,m){return r.length===0?l:l===p||l===m?Z(l):l},Ie=function(r,l){return r===l||Ee(r)!==null?!1:(It&&ot(r),!0)},zr=function(r,l){if(se(x.beforeSanitizeElements,r,null),Ie(r,l))return!0;if(lt(r))return pe(r),!0;const p=P(Et(r));if(C=Fr(x.uponSanitizeElement,C,xt,Qe),se(x.uponSanitizeElement,r,{tagName:p,allowedTags:C}),Ie(r,l))return!0;if(Gi(r,p))return pe(r),!0;if(je[p]||!(ue.tagCheck instanceof Function&&ue.tagCheck(p))&&!C[p]){const m=Wi(r,p,l);return m===!1&&(se(x.afterSanitizeElements,r,null),Ie(r,l))?!0:m}if(Be(r)===K.element&&!Hi(r)||(p==="noscript"||p==="noembed"||p==="noframes")&&H(qn,r.innerHTML))return pe(r),!0;if(de&&r.nodeType===K.text){const m=at(r.textContent);r.textContent!==m&&(We(e.removed,{element:r.cloneNode()}),r.textContent=m)}return se(x.afterSanitizeElements,r,null),Ie(r,l)},Ur=function(r,l,p){if(yr[l]||Mr(l,r)||br&&(l==="id"||l==="name")&&(p in t||p in Fi))return!1;const m=L[l]||ue.attributeCheck instanceof Function&&ue.attributeCheck(l,r);return Lt&&H(Di,l)||_r&&H(Oi,l)?!0:m?xr[l]||H(gr,Ye(p,mr,""))||(l==="src"||l==="xlink:href"||l==="href")&&r!=="script"&&ei(p,"data:")===0&&Rr[r]||vr&&!H(ki,Ye(p,mr,""))?!0:!p:Br(r)&&ct(ie.tagNameCheck,r)&&ct(ie.attributeNameCheck,l,r)||l==="is"&&ie.allowCustomizedBuiltInElements&&ct(ie.tagNameCheck,p)},Yi=R({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Br=function(r){return!Yi[Xe(r)]&&H(Ii,r)},qi=function(r,l,p,m){if(Y&&typeof k=="object"&&typeof k.getAttributeType=="function"&&!p)switch(k.getAttributeType(r,l)){case"TrustedHTML":return Ae(m);case"TrustedScriptURL":return Ti(m)}return m},Xi=function(r,l,p,m){try{return p?r.setAttributeNS(p,l,m):r.setAttribute(l,m),lt(r)?(pe(r),!1):!0}catch{return we(l,r),!1}},Hr=function(r,l){if(se(x.beforeSanitizeAttributes,r,null),Ie(r,l))return;const p=r.attributes;if(!p||lt(r))return;L=Fr(x.uponSanitizeAttribute,L,Ct,et);const m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let y=p.length;const b=P(r.nodeName);for(;y--;){const T=p[y],I=T.name,J=T.namespaceURI,X=T.value,Pe=P(I),Bt=X;let G=I==="value"?Bt:Dn(Bt),jr=!1;if(m.attrName=Pe,m.attrValue=G,m.keepAttr=!0,m.forceKeepAttr=void 0,se(x.uponSanitizeAttribute,r,m),G=m.attrValue,Tr&&(Pe==="id"||Pe==="name")&&ei(G,Sr)!==0&&(we(I,r,T),G=Sr+G,jr=!0),_e&&H(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,G)){we(I,r,T);continue}if(Pe==="attributename"&&Qr(G,"href")){we(I,r,T);continue}if(!m.forceKeepAttr){if(!m.keepAttr){we(I,r,T);continue}if(!wr&&H(Xn,G)){we(I,r,T);continue}if(de&&(G=at(G)),!Ur(b,Pe,G)){we(I,r,T);continue}G=qi(b,Pe,J,G),G!==Bt&&Xi(r,I,J,G)&&jr&&Jr(e.removed)}}se(x.afterSanitizeAttributes,r,null),Ie(r,l)},ut=function(r){let l=null;const p=$r(r);for(se(x.beforeSanitizeShadowDOM,r,null);l=p.nextNode();)if(se(x.uponSanitizeShadowNode,l,null),zr(l,r),Hr(l,r),ke(l.content)&&ut(l.content),Be(l)===K.element){const m=dr(l);ke(m)&&(Ut(m),ut(m))}se(x.afterSanitizeShadowDOM,r,null)},Ut=function(r){const l=[{node:r,shadow:null}];for(;l.length>0;){const p=l.pop();if(p.shadow){ut(p.shadow);continue}const m=p.node,y=Be(m)===K.element,b=Se(m);if(b)for(let T=b.length-1;T>=0;--T)l.push({node:b[T],shadow:null});if(y){const T=Re?Re(m):null;if(typeof T=="string"&&P(T)==="template"){const I=m.content;ke(I)&&l.push({node:I,shadow:null})}}if(y){const T=dr(m);ke(T)&&l.push({node:null,shadow:T},{node:T,shadow:null})}}};return e.sanitize=function(f){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,p=null,m=null,y=null;if(Pt=!f,Pt&&(f="<!-->"),typeof f!="string"&&!Ge(f)&&(f=Mn(f),typeof f!="string"))throw he("dirty is not a string, aborting");if(!e.isSupported)return f;Dt?(C=Qe,L=et):Ft(r),(x.uponSanitizeElement.length>0||x.uponSanitizeAttribute.length>0)&&(C=Z(C)),x.uponSanitizeAttribute.length>0&&(L=Z(L)),e.removed=[];const b=It&&typeof f!="string"&&Ge(f);if(b){Vi(f);const J=Et(f);if(typeof J=="string"){const X=P(J);if(!C[X]||je[X])throw st(f),he("root node is forbidden and cannot be sanitized in-place")}if(lt(f))throw st(f),he("root node is clobbered and cannot be sanitized in-place");try{Ut(f)}catch(X){throw st(f),X}}else if(Ge(f))l=Nr("<!---->"),p=l.ownerDocument.importNode(f,!0),p.nodeType===K.element&&p.nodeName==="BODY"||p.nodeName==="HTML"?l=p:l.appendChild(p),Ut(l);else{if(!xe&&!de&&!ve&&f.indexOf("<")===-1)return Y&&rt?Ae(f):f;if(l=Nr(f),!l)return xe?null:rt?ye:""}l&&Ot&&pe(l.firstChild);const T=b?f:l;try{const J=$r(T);for(;m=J.nextNode();)zr(m,T),Hr(m,T),ke(m.content)&&ut(m.content)}catch(J){throw b&&(st(f),be(e.removed,X=>{X.element&&ot(X.element)})),J}if(b){let J=!1;if(be(e.removed,X=>{X.element&&(X.element===f&&(J=!0),ot(X.element))}),J)throw he("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&zt(f),f}if(xe){if(de&&zt(l),tt)for(y=Ei.call(l.ownerDocument);l.firstChild;)y.appendChild(l.firstChild);else y=l;return(L.shadowroot||L.shadowrootmode)&&(y=Ai.call(a,y,!0)),y}let I=ve?l.outerHTML:l.innerHTML;return ve&&C["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&H(Wn,l.ownerDocument.doctype.name)&&(I="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+I),de&&(I=at(I)),Y&&rt?Ae(I):I},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(f),Dt=!0,Qe=C,et=L},e.clearConfig=function(){Oe=null,Dt=!1,Qe=null,et=null,Y=Rt,ye=""},e.isValidAttribute=function(f,r,l){Oe||Ft({});const p=P(f),m=P(r);return Ur(p,m,l)},e.addHook=function(f,r){typeof r=="function"&&q(x,f)&&We(x[f],r)},e.removeHook=function(f,r){if(q(x,f)){if(r!==void 0){const l=Cn(x[f],r);return l===-1?void 0:Ln(x[f],l,1)[0]}return Jr(x[f])}},e.removeHooks=function(f){q(x,f)&&(x[f]=[])},e.removeAllHooks=function(){x=ui()},e}var ft=wi();const es=["a"];function ts(i){ft.addHook("afterSanitizeAttributes",rs);try{return ft.sanitize(i,{ALLOWED_TAGS:es})}finally{ft.removeHook("afterSanitizeAttributes")}}function rs(i){i.nodeName.toLowerCase()==="a"&&(i.setAttribute("rel","ugc nofollow"),i.setAttribute("target","_blank"))}function is(i,e=100,t=!0){if(i.length<e)return i;let a=e;if(t){const c=i.indexOf(" ",e),d=c-e<=20;if(d&&c===i.length-1)return i;c!==-1&&d&&(a=c)}return ns(i,a,e)}function ns(i,e,t){let a=i.slice(0,e);const c=a.match(/<a/gi);if(c){const d=a.match(/<\/a/gi);if(!d||d.length<c.length){const h=i.indexOf("</a>",e),g=h-t<=20;if(g&&i.length===h+4)return i;if(h!==-1&&g)a=i.slice(0,h+4);else{const _=a.lastIndexOf("<a");a=i.slice(0,_)}}}return a.concat("...")}const ss=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function os(i){return i.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(ss,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function as(i){return i.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const ls="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var cs=Object.defineProperty,us=Object.getOwnPropertyDescriptor,re=(i,e,t,a)=>{for(var c=a>1?void 0:a?us(e,t):e,d=i.length-1,h;d>=0;d--)(h=i[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&cs(e,t,c),c};let ee=class extends bt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1,this.deleteMsg=""}render(){return this.review?w`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?w`
                  <button
                    class="delete-btn"
                    title="Delete this review"
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${ls}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:z}
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
        `}get subjectTemplate(){const i=this.review?.reviewtitle;return this.truncateContent(i??"",this.maxSubjectLength)}get bodyTemplate(){const i=this.review?.reviewbody;if(!i)return z;const e=ts(i),t=this.truncateContent(e,this.maxBodyLength);return w`${di(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?z:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?z:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return w`
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
              ${Xr(this.review.reviewer)}
            </a>
          `:w`${Xr(this.review.reviewer)}`:z}get starsTemplate(){return!this.review||!this.review.stars?z:w`
      <div
        class="review-stars"
        title="${S(`${this.review.stars} out of 5 stars`)}"
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>w`<div class="review-star">
              <img
                class="star-basic"
                src=${vn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return z;const i=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"}),a=i.getTime()!==e.getTime()?"(edited)":"";return S(`${t} ${a}`)}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(i,e){return this.showTruncatedContent||this.bypassTruncation?i:is(i,e)}prepReview(i){return as(os(i))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(S("Are you sure you want to delete this review?")))return;if(!this.reviewService){this.deleteMsg=S("Sorry, we were unable to delete this review.");return}const i=await this.reviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteMsg=i.success?S("This review has been queued for deletion."):i.error??S("Sorry, we were unable to delete this review.")}static get styles(){return Tt`
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
    `}};re([E({type:Object})],ee.prototype,"review",2);re([E({type:String})],ee.prototype,"identifier",2);re([E({type:Number})],ee.prototype,"maxSubjectLength",2);re([E({type:Number})],ee.prototype,"maxBodyLength",2);re([E({type:String})],ee.prototype,"baseHost",2);re([E({type:Object})],ee.prototype,"reviewService",2);re([E({type:Boolean})],ee.prototype,"canDelete",2);re([E({type:Boolean})],ee.prototype,"bypassTruncation",2);re([j()],ee.prototype,"showTruncatedContent",2);re([j()],ee.prototype,"deleteMsg",2);ee=re([wt("ia-review")],ee);const ds="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",ps="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var hs=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,B=(i,e,t,a)=>{for(var c=a>1?void 0:a?fs(e,t):e,d=i.length-1,h;d>=0;d--)(h=i[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&hs(e,t,c),c};let F=class extends bt{constructor(){super(...arguments),this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.formCanSubmit=!1,this.submissionInProgress=!1,this.RECAPTCHA_ERROR_MESSAGE="Could not validate review. Please try again later.",this.GENERIC_ERROR_MESSAGE="There's been a temporary error. Please wait a moment and try again."}render(){return w`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableError?this.unrecoverableErrorTemplate:w`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(i){i.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),i.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),i.has("unrecoverableError")&&(this.formCanSubmit=this.checkSubmissionAllowed()),(i.has("currentSubjectLength")||i.has("currentBodyLength")||i.has("maxSubjectLength")||i.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){return this.unrecoverableError?w`
          <div class="unrecoverable-error">
            <span class="error-msg">${S(this.unrecoverableError)}</span>
          </div>
        `:z}get recoverableErrorTemplate(){return this.recoverableError?w`
          <div class="recoverable-error">
            ${di(this.sanitizeErrorMsg(S(this.recoverableError)))}
          </div>
        `:z}get recaptchaMessageTemplate(){return this.bypassRecaptcha?z:w`
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
              ${S(`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:z}</div></span>
    `}get bodyInputTemplate(){return w`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${S("Review")}</label>
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
                ${S(`Review may only have ${this.maxBodyLength} characters`)}
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
        ${S("Cancel")}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        class="submit-btn"
        .disabled=${!this.formCanSubmit}
        .loading=${this.submissionInProgress}
      >
        ${S("Submit review")}
      </ia-button>
    </div>`}renderStar(i){const e=i===this.currentStars,t=S(`Rate ${i>1?`${i} stars`:"1 star"}`);return w`
      <button
        class="star star-${i}"
        title=${e?S("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,i)}
      >
        ${i<=this.currentStars?w`<img
              class="star-selected"
              src=${ds}
              alt=""
              aria-hidden="true"
            />`:w`<img
              class="star-unselected"
              src=${ps}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.unrecoverableError=this.RECAPTCHA_ERROR_MESSAGE}}sanitizeErrorMsg(i){return ft.sanitize(i,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(i){if(i.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.reviewService||!this.identifier)return this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission();try{let e;if(!this.bypassRecaptcha&&(e=await this.getRecaptchaToken(),!e))return this.handleRecaptchaError();const t=await this.reviewService.submitReview({identifier:this.identifier,title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else this.recoverableError=t.error??this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}catch(e){console.error(e),this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}}}generateSubmittedReview(){const i=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:i,reviewer:this.oldReview?.reviewer??this.submitterScreenname,reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??i})}dateToString(i){return i instanceof Date?i.toDateString():i}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.recoverableError=this.RECAPTCHA_ERROR_MESSAGE,this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const i=new CustomEvent("reviewEditCanceled");this.dispatchEvent(i)}handleStarClicked(i,e){i.preventDefault(),this.setStars(e)}handleClearBtnClicked(i){i.preventDefault(),this.currentStars=0}setStars(i){this.currentStars=i===this.currentStars?0:i}handleSubjectChanged(i){const e=i.target;this.currentSubjectLength=e.value.length}handleBodyChanged(i){const e=i.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableError||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Tt`
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
      `]}};B([E({type:String})],F.prototype,"identifier",2);B([E({type:String})],F.prototype,"submitterScreenname",2);B([E({type:String})],F.prototype,"submitterItemname",2);B([E({type:Object})],F.prototype,"oldReview",2);B([E({type:String})],F.prototype,"unrecoverableError",2);B([E({type:Number})],F.prototype,"maxSubjectLength",2);B([E({type:Number})],F.prototype,"maxBodyLength",2);B([E({type:Object})],F.prototype,"reviewService",2);B([E({type:Object})],F.prototype,"recaptchaManager",2);B([E({type:Boolean})],F.prototype,"bypassRecaptcha",2);B([j()],F.prototype,"currentStars",2);B([j()],F.prototype,"currentSubjectLength",2);B([j()],F.prototype,"currentBodyLength",2);B([j()],F.prototype,"recoverableError",2);B([j()],F.prototype,"formCanSubmit",2);B([j()],F.prototype,"submissionInProgress",2);B([pi("#review-form")],F.prototype,"reviewForm",2);F=B([wt("ia-review-form")],F);var ms=Object.defineProperty,gs=Object.getOwnPropertyDescriptor,O=(i,e,t,a)=>{for(var c=a>1?void 0:a?gs(e,t):e,d=i.length-1,h;d>=0;d--)(h=i[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ms(e,t,c),c};let A=class extends bt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?w`
      <div class="reviews-list">
        ${this.reviewsFrozen?w`<div class="message">
              ${S("Reviews can no longer be added to this item.")}
            </div>`:z}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(i=>i.reviewer_itemname!==this.submitterItemname?this.renderReview(i):z)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(i){(!this.activeReviewService||i.has("reviewService")||i.has("baseHost"))&&(this.activeReviewService=this.reviewService??new gi({baseHost:this.baseHost})),(i.has("reviews")||i.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),i.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),i.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}get reviewsDisabledTemplate(){return w`<div class="message">
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
        ${this.reviewsCount===1?S("There is 1 review for this item."):S(`There are ${this.reviewsCount} reviews for this item.`)}
        <ia-button
          mode="link"
          class="display-reviews-btn"
          @click=${()=>this.displayReviews=!0}
        >
          ${S(`Display ${this.reviewsCount===1?"review":"reviews"}`)}</ia-button
        >.
      </div>
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
    </div>`}sortFilterReviews(){let i;const e=[];this.reviews.forEach(t=>{!i&&t.reviewer_itemname===this.submitterItemname?i=t:e.push(t)}),this.currentReview=i,this.filteredReviews=this.sortReviews(e)}sortReviews(i){return[...i].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(i){return i?w`<ia-review
      .review=${i}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:z}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(i){!this.currentReview&&i.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=i.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[Tt`
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
      `]}};O([E({type:String})],A.prototype,"identifier",2);O([E({type:Array})],A.prototype,"reviews",2);O([E({type:Boolean})],A.prototype,"reviewsDisabled",2);O([E({type:Boolean})],A.prototype,"reviewsFrozen",2);O([E({type:Boolean})],A.prototype,"canDelete",2);O([E({type:Boolean})],A.prototype,"displayReviewsByDefault",2);O([E({type:Number})],A.prototype,"maxSubjectLength",2);O([E({type:Number})],A.prototype,"maxBodyLength",2);O([E({type:String})],A.prototype,"baseHost",2);O([E({type:String})],A.prototype,"submitterScreenname",2);O([E({type:String})],A.prototype,"submitterItemname",2);O([E({type:Object})],A.prototype,"recaptchaManager",2);O([E({type:Boolean})],A.prototype,"bypassRecaptcha",2);O([E({type:String})],A.prototype,"reviewSubmissionError",2);O([E({type:Boolean})],A.prototype,"reviewAddEditRequested",2);O([E({type:Object})],A.prototype,"reviewService",2);O([j()],A.prototype,"activeReviewService",2);O([j()],A.prototype,"displayReviewForm",2);O([j()],A.prototype,"displayReviews",2);O([j()],A.prototype,"filteredReviews",2);O([j()],A.prototype,"currentReview",2);O([j()],A.prototype,"reviewsCount",2);O([j()],A.prototype,"recaptchaActivated",2);A=O([wt("ia-reviews")],A);var ys=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,cr=(i,e,t,a)=>{for(var c=a>1?void 0:a?_s(e,t):e,d=i.length-1,h;d>=0;d--)(h=i[d])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ys(e,t,c),c};const vs=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],ws=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],bs=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Ts={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},Ss=new gi({fetchHandler:Ts}),Es=6;let vt=class extends bt{constructor(){super(...arguments),this.log=[]}render(){return w`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:ws}}
        .propInputData=${{settings:bs}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${vs}
          .reviewService=${Ss}
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
            <code>reviewsDisabled</code> hides the whole section, while
            <code>reviewsFrozen</code> keeps existing reviews visible but stops
            new ones. <code>canDelete</code> is what puts the delete control on
            a review the current user wrote.
          </p>
        </div>
      </story-template>
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(i){const{detail:e}=i,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${i.type}${t}`,...this.log].slice(0,Es)}static get styles(){return Tt`
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
    `}};cr([j()],vt.prototype,"log",2);cr([pi("ia-reviews")],vt.prototype,"reviews",2);vt=cr([wt("ia-reviews-story")],vt);export{vt as IAReviewsStory};
