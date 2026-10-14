import{b as w,r as G,n as b,c as wt,i as bt,m as R,A as z,o as di,a as Tt,e as pi}from"./index-DFyfBZXY.js";import"./ia-button-wQiPg3LT.js";import"./story-template-4JFtcq2G.js";import"./theme-styles-BT_rUq2J.js";import"./ia-status-indicator-DFdQYLTe.js";import"./localized-decorator-MQdUS_q8.js";import"./icon-box-D0a0K02C.js";import"./mediatype-web-kc2ZgaRy.js";import"./syntax-highlighter-DwznpdQM.js";function n(r,e,t,o){var l=arguments.length,d=l<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")d=Reflect.decorate(r,e,t,o);else for(var g=r.length-1;g>=0;g--)(h=r[g])&&(d=(l<3?h(d):l>3?h(e,t,d):h(e,t))||d);return l>3&&d&&Object.defineProperty(e,t,d),d}function s(r){let e,t,o;return e=r,(l,d,h)=>{if(h.value!=null)h.value=Vr(h.value,e,t,o);else if(h.get!=null)h.get=Vr(h.get,e,t,o);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ht=new Map;function Vr(r,e,t=0,o){const l=Symbol("__memoized_map__");return function(...d){let h;this.hasOwnProperty(l)||Object.defineProperty(this,l,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let g=this[l];if(Array.isArray(o))for(const _ of o)Ht.has(_)?Ht.get(_).push(g):Ht.set(_,[g]);if(e||d.length>0||t>0){let _;e===!0?_=d.map(j=>j.toString()).join("!"):e?_=e.apply(this,d):_=d[0];const $=`${_}__timestamp`;let k=!1;if(t>0)if(!g.has($))k=!0;else{let j=g.get($);k=Date.now()-j>t}g.has(_)&&!k?h=g.get(_):(h=r.apply(this,d),g.set(_,h),t>0&&g.set($,Date.now()))}else{const _=this;g.has(_)?h=g.get(_):(h=r.apply(this,d),g.set(_,h))}return h}}class mt{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}mt.shared=new mt;class te{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}te.shared=new te;class gt{parseValue(e){return te.shared.parseValue(e)}}gt.shared=new gt;class ze{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,o,l,d,h="00",g="00",_="00"]=t,$=new Date(`${o}-${l}-${d}T${h}:${g}:${_}`);return Number.isNaN($.getTime())?void 0:$}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const o=Date.parse(t);if(Number.isNaN(o))return;let l=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(l=new Date(l.getTime()+l.getTimezoneOffset()*1e3*60)),l}}ze.shared=new ze;class yt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let o;return t.length===1?o=this.parseNumberFormat(t[0]):o=this.parseColonSeparatedFormat(t),o}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const o=e.map((l,d)=>{const h=parseFloat(l);if(Number.isNaN(h))return t=!0,0;const _=60**(e.length-1-d);return h*Math.floor(_)}).reduce((l,d)=>l+d,0);return t?void 0:o}}yt.shared=new yt;class hi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let o=[];for(const l of this.separators)if(o=t.split(l),o.length>1)break;return this.parseListValues(o)}parseListValues(e){const o=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),l=[];return o.forEach(d=>{d!==void 0&&l.push(d)}),l}}class _t{parseValue(e){return String(e)}}_t.shared=new _t;function Me(r,e,...t){for(const o of t){const l=r[o];if(l!=null)return e(l)}}function ae(r,e,...t){return Me(r,o=>e(o),...t)}class ce{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=te.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ae(this.rawValue,e=>gt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ae(this.rawValue,e=>yt.shared.parseValue(e),"length")}get height(){return ae(this.rawValue,e=>te.shared.parseValue(e),"height")}get width(){return ae(this.rawValue,e=>te.shared.parseValue(e),"width")}get track(){return ae(this.rawValue,e=>te.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ae(this.rawValue,e=>te.shared.parseValue(e),"bitrate")}get private(){return ae(this.rawValue,e=>mt.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([s()],ce.prototype,"mtime",null);n([s()],ce.prototype,"size",null);n([s()],ce.prototype,"length",null);n([s()],ce.prototype,"height",null);n([s()],ce.prototype,"width",null);n([s()],ce.prototype,"track",null);n([s()],ce.prototype,"bitrate",null);n([s()],ce.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(o=>{const l=this.parser.parseValue(o);Array.isArray(l)?t.push(...l):l!==void 0&&t.push(l)}),t}}n([s()],W.prototype,"values",null);n([s()],W.prototype,"value",null);class oe extends W{constructor(e){super(mt.shared,e)}}class O extends W{constructor(e){super(ze.shared,e)}}class jt extends W{constructor(e){super(yt.shared,e)}}class v extends W{constructor(e){super(te.shared,e)}}class u extends W{constructor(e){super(_t.shared,e)}}class Ue{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends W{constructor(e,t){super(t,e)}}const Xi=new Ue(["rl","lr"]);class Ki extends $e{constructor(e){super(e,Xi)}}class dt extends W{constructor(e){super(gt.shared,e)}}const Zi=new Ue(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class Ji extends $e{constructor(e){super(e,Zi)}}class fi extends W{constructor(e,t){super(t,e)}}class Gr extends fi{constructor(e){const t=new hi(_t.shared);super(e,t)}}class Vt extends fi{constructor(e){const t=new hi(te.shared);super(e,t)}}const Qi=/^([0-9a-f]{32})\s+\*?(.+)$/i,en=/^(.+):([0-9a-f]{32})$/i;function tn(r){const e=r.match(Qi);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(en);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Zt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(o=>o.trim()).filter(Boolean).map(tn).filter(o=>o!==void 0);return t.length?t:void 0}}Zt.shared=new Zt;class Wr extends W{constructor(e){super(Zt.shared,e)}}function pt(r,e){var t;const o=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),l=(t=o?.[1])===null||t===void 0?void 0:t.trim();return l||void 0}class Jt{parseValue(e){if(typeof e!="string")return;const t=pt(e,"curator"),o=pt(e,"date"),l=pt(e,"comment"),d=pt(e,"state");if(!(!t&&!o&&!l&&!d))return{curator:t,date:o?ze.shared.parseValue(o):void 0,comment:l,state:d}}}Jt.shared=new Jt;class rn extends W{constructor(e){super(Jt.shared,e)}}class Qt{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const o=parseFloat(t[1]),l=parseFloat(t[2]);if(l)return{width:o,height:l,decimal:o/l}}}Qt.shared=new Qt;class nn extends W{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const o=t[1]==="-"?-1:1,l=parseInt(t[2],10),d=parseInt(t[3],10);return{hours:o*l,minutes:d,totalMinutes:o*(l*60+d)}}}er.shared=new er;class sn extends W{constructor(e){super(er.shared,e)}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}tr.shared=new tr;class on extends W{constructor(e){super(tr.shared,e)}}const an=new Ue(["true","none","frozen"]),ln=new Ue(["sound","silent"]),cn=new Ue(["color","b&w"]),un=new Ue(["mode/1up","mode/2up","mode/thumb"]);class a{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(v,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(v,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(v,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(v,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,un),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(rn,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(O,"date-case-filed")}get date_case_terminated(){return this.field(O,"date-case-terminated")}get date_created(){return this.field(O,"date_created")}get date_last_filing(){return this.field(O,"date-last-filing")}get derive_submittime(){return this.field(O,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(v,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(O,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(O,"filesxml")}get firstfiledate(){return this.field(O,"firstfiledate")}get firstfileserial(){return this.field(v,"firstfileserial")}get foldoutcount(){return this.field(v,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(oe,"has_mp3")}get height(){return this.field(v,"height")}get hidden(){return this.field(oe,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(oe,"access-restricted-item")}get addeddate(){return this.field(O,"addeddate")}get aspect_ratio(){return this.field(nn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(v,"audio_sample_rate")}get avg_rating(){return this.field(v,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(oe,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(dt,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,cn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(O,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(v,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(v,"files_count")}get frames_per_second(){return this.field(v,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(v,"image_count")}get imagecount(){return this.field(v,"imagecount")}get indexdate(){return this.field(O,"indexdate")}get invoice(){return this.field(v,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(v,"issue_count")}get issue_page_count(){return this.field(v,"issue_page_count")}get item_count(){return this.field(v,"item_count")}get item_size(){return this.field(dt,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(O,"lastdate")}get lastfiledate(){return this.field(O,"lastfiledate")}get lastfileserial(){return this.field(v,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(oe,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Wr,"md5contents")}get md5s(){return this.field(Wr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(oe,"monochromatic")}get month(){return this.field(v,"month")}get mediatype(){return this.field(Ji,"mediatype")}get mpeg_program(){return this.field(v,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(oe,"noarchivetorrent")}get noindex(){return this.field(oe,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(v,"num_favorites")}get num_reviews(){return this.field(v,"num_reviews")}get numeric_id(){return this.field(v,"numeric_id")}get numwarcs(){return this.field(v,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(oe,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(v,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(v,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(v,"output_time_minutes")}get pacer_case_num(){return this.field(v,"pacer-case-num")}get packaging_time_minutes(){return this.field(v,"packaging_time_minutes")}get page_number_confidence(){return this.field(v,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(Ki,"page-progression","page_progression")}get paginated(){return this.field(oe,"paginated")}get parse_date(){return this.field(O,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(v,"pick")}get podcastindexid(){return this.field(v,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(v,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(O,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(v,"rcs_key")}get repub_state(){return this.field(v,"repub_state")}get republisher_date(){return this.field(O,"republisher_date")}get republisher_operator(){return this.field(Gr,"republisher_operator")}get republisher_time(){return this.field(v,"republisher_time")}get reviewdate(){return this.field(O,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,an),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(O,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(v,"scan_time_minutes")}get scandate(){return this.field(O,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(v,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(dt,"size")}get sizehint(){return this.field(dt,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,ln),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(v,"source_pixel_height")}get source_pixel_width(){return this.field(v,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(O,"sponsordate")}get start_localtime(){return this.field(O,"start_localtime")}get start_time(){return this.field(O,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(O,"stop_time")}get subject(){return this.field(Gr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(v,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(on,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(O,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(sn,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(v,"week")}get width(){return this.field(v,"width")}get year(){return this.field(v,"year")}field(e,...t){return Me(this.rawMetadata,o=>new e(o),...t)}constructor(e={}){this.rawMetadata=e}}n([s()],a.prototype,"access",null);n([s()],a.prototype,"adder",null);n([s()],a.prototype,"amrc_id",null);n([s()],a.prototype,"archiveit_account_id",null);n([s()],a.prototype,"archiveit_account_organization_name",null);n([s()],a.prototype,"archiveit_collection_id",null);n([s()],a.prototype,"archiveit_collection_name",null);n([s()],a.prototype,"archiveit_job_type",null);n([s()],a.prototype,"audit_time_minutes",null);n([s()],a.prototype,"auditor",null);n([s()],a.prototype,"author",null);n([s()],a.prototype,"autocrop_version",null);n([s()],a.prototype,"bookplateleaf",null);n([s()],a.prototype,"bookreader_defaults",null);n([s()],a.prototype,"boxid",null);n([s()],a.prototype,"camera",null);n([s()],a.prototype,"cameraman",null);n([s()],a.prototype,"canister",null);n([s()],a.prototype,"case_name",null);n([s()],a.prototype,"col_number",null);n([s()],a.prototype,"collection_added",null);n([s()],a.prototype,"collection_library",null);n([s()],a.prototype,"collection_set",null);n([s()],a.prototype,"copyright_holder",null);n([s()],a.prototype,"court",null);n([s()],a.prototype,"crawler",null);n([s()],a.prototype,"crawljob",null);n([s()],a.prototype,"curation",null);n([s()],a.prototype,"dari_title",null);n([s()],a.prototype,"dari_title_romanized",null);n([s()],a.prototype,"date_case_filed",null);n([s()],a.prototype,"date_case_terminated",null);n([s()],a.prototype,"date_created",null);n([s()],a.prototype,"date_last_filing",null);n([s()],a.prototype,"derive_submittime",null);n([s()],a.prototype,"derive_version",null);n([s()],a.prototype,"discs",null);n([s()],a.prototype,"docket_num",null);n([s()],a.prototype,"external_metadata_update",null);n([s()],a.prototype,"fail_reasons",null);n([s()],a.prototype,"filesxml",null);n([s()],a.prototype,"firstfiledate",null);n([s()],a.prototype,"firstfileserial",null);n([s()],a.prototype,"foldoutcount",null);n([s()],a.prototype,"format",null);n([s()],a.prototype,"geo_restricted",null);n([s()],a.prototype,"guid",null);n([s()],a.prototype,"has_mp3",null);n([s()],a.prototype,"height",null);n([s()],a.prototype,"hidden",null);n([s()],a.prototype,"ia_orig__runtime",null);n([s()],a.prototype,"access_restricted_item",null);n([s()],a.prototype,"addeddate",null);n([s()],a.prototype,"aspect_ratio",null);n([s()],a.prototype,"audio_codec",null);n([s()],a.prototype,"audio_sample_rate",null);n([s()],a.prototype,"avg_rating",null);n([s()],a.prototype,"backup_location",null);n([s()],a.prototype,"ccnum",null);n([s()],a.prototype,"closed_captioning",null);n([s()],a.prototype,"collection",null);n([s()],a.prototype,"collections_raw",null);n([s()],a.prototype,"collection_size",null);n([s()],a.prototype,"color",null);n([s()],a.prototype,"contact",null);n([s()],a.prototype,"contributor",null);n([s()],a.prototype,"coverage",null);n([s()],a.prototype,"creator",null);n([s()],a.prototype,"creator_alt_script",null);n([s()],a.prototype,"credits",null);n([s()],a.prototype,"collection_layout",null);n([s()],a.prototype,"date",null);n([s()],a.prototype,"description",null);n([s()],a.prototype,"downloads",null);n([s()],a.prototype,"duration",null);n([s()],a.prototype,"external_identifier",null);n([s()],a.prototype,"external_link",null);n([s()],a.prototype,"files_count",null);n([s()],a.prototype,"frames_per_second",null);n([s()],a.prototype,"identifier_access",null);n([s()],a.prototype,"identifier_ark",null);n([s()],a.prototype,"identifier_bib",null);n([s()],a.prototype,"image_count",null);n([s()],a.prototype,"imagecount",null);n([s()],a.prototype,"indexdate",null);n([s()],a.prototype,"invoice",null);n([s()],a.prototype,"isbn",null);n([s()],a.prototype,"issue",null);n([s()],a.prototype,"issue_count",null);n([s()],a.prototype,"issue_page_count",null);n([s()],a.prototype,"item_count",null);n([s()],a.prototype,"item_size",null);n([s()],a.prototype,"language",null);n([s()],a.prototype,"lastdate",null);n([s()],a.prototype,"lastfiledate",null);n([s()],a.prototype,"lastfileserial",null);n([s()],a.prototype,"length",null);n([s()],a.prototype,"license",null);n([s()],a.prototype,"licenseurl",null);n([s()],a.prototype,"lineage",null);n([s()],a.prototype,"mature_content",null);n([s()],a.prototype,"md5",null);n([s()],a.prototype,"md5contents",null);n([s()],a.prototype,"md5s",null);n([s()],a.prototype,"medium",null);n([s()],a.prototype,"metadata_operator",null);n([s()],a.prototype,"metasource_catalog",null);n([s()],a.prototype,"monochromatic",null);n([s()],a.prototype,"month",null);n([s()],a.prototype,"mediatype",null);n([s()],a.prototype,"mpeg_program",null);n([s()],a.prototype,"next_item",null);n([s()],a.prototype,"noarchivetorrent",null);n([s()],a.prototype,"noindex",null);n([s()],a.prototype,"notes",null);n([s()],a.prototype,"num_favorites",null);n([s()],a.prototype,"num_reviews",null);n([s()],a.prototype,"numeric_id",null);n([s()],a.prototype,"numwarcs",null);n([s()],a.prototype,"ocr",null);n([s()],a.prototype,"ocr_autonomous",null);n([s()],a.prototype,"ocr_detected_lang",null);n([s()],a.prototype,"ocr_detected_lang_conf",null);n([s()],a.prototype,"ocr_detected_script",null);n([s()],a.prototype,"ocr_detected_script_conf",null);n([s()],a.prototype,"ocr_invalid_language",null);n([s()],a.prototype,"ocr_module_version",null);n([s()],a.prototype,"ocr_parameters",null);n([s()],a.prototype,"old_pallet",null);n([s()],a.prototype,"openlibrary_edition",null);n([s()],a.prototype,"openlibrary_work",null);n([s()],a.prototype,"operator",null);n([s()],a.prototype,"originalurl",null);n([s()],a.prototype,"osf_category",null);n([s()],a.prototype,"osf_project",null);n([s()],a.prototype,"osf_registration_doi",null);n([s()],a.prototype,"osf_registration_schema",null);n([s()],a.prototype,"osf_registry",null);n([s()],a.prototype,"osf_subjects",null);n([s()],a.prototype,"osf_tags",null);n([s()],a.prototype,"output_time_minutes",null);n([s()],a.prototype,"pacer_case_num",null);n([s()],a.prototype,"packaging_time_minutes",null);n([s()],a.prototype,"page_number_confidence",null);n([s()],a.prototype,"page_number_module_version",null);n([s()],a.prototype,"page_progression",null);n([s()],a.prototype,"paginated",null);n([s()],a.prototype,"parse_date",null);n([s()],a.prototype,"parse_state",null);n([s()],a.prototype,"partner",null);n([s()],a.prototype,"pashto_title",null);n([s()],a.prototype,"pashto_title_romanized",null);n([s()],a.prototype,"pdf_degraded",null);n([s()],a.prototype,"pdf_module_version",null);n([s()],a.prototype,"pick",null);n([s()],a.prototype,"podcastindexid",null);n([s()],a.prototype,"post_text",null);n([s()],a.prototype,"ppi",null);n([s()],a.prototype,"previous_item",null);n([s()],a.prototype,"program",null);n([s()],a.prototype,"publicdate",null);n([s()],a.prototype,"publisher",null);n([s()],a.prototype,"political_religious_party",null);n([s()],a.prototype,"rcs_key",null);n([s()],a.prototype,"repub_state",null);n([s()],a.prototype,"republisher_date",null);n([s()],a.prototype,"republisher_operator",null);n([s()],a.prototype,"republisher_time",null);n([s()],a.prototype,"reviewdate",null);n([s()],a.prototype,"reviews_allowed",null);n([s()],a.prototype,"ribbon_state",null);n([s()],a.prototype,"ribbon_state_modify_date",null);n([s()],a.prototype,"rights",null);n([s()],a.prototype,"rights_holder",null);n([s()],a.prototype,"rssfeed",null);n([s()],a.prototype,"runtime",null);n([s()],a.prototype,"scan_time_minutes",null);n([s()],a.prototype,"scandate",null);n([s()],a.prototype,"scanfee",null);n([s()],a.prototype,"scanner",null);n([s()],a.prototype,"scanner_operator",null);n([s()],a.prototype,"scanningcenter",null);n([s()],a.prototype,"scribe3_search_catalog",null);n([s()],a.prototype,"scribe3_search_id",null);n([s()],a.prototype,"segments",null);n([s()],a.prototype,"sessionid",null);n([s()],a.prototype,"shndiscs",null);n([s()],a.prototype,"shotlist",null);n([s()],a.prototype,"signal_path",null);n([s()],a.prototype,"size",null);n([s()],a.prototype,"sizehint",null);n([s()],a.prototype,"software_version",null);n([s()],a.prototype,"sort_order",null);n([s()],a.prototype,"sound",null);n([s()],a.prototype,"soundcreator",null);n([s()],a.prototype,"soundtitle",null);n([s()],a.prototype,"source",null);n([s()],a.prototype,"source_pixel_height",null);n([s()],a.prototype,"source_pixel_width",null);n([s()],a.prototype,"source_url",null);n([s()],a.prototype,"sponsor",null);n([s()],a.prototype,"sponsordate",null);n([s()],a.prototype,"start_localtime",null);n([s()],a.prototype,"start_time",null);n([s()],a.prototype,"station_name",null);n([s()],a.prototype,"stop_time",null);n([s()],a.prototype,"subject",null);n([s()],a.prototype,"taper",null);n([s()],a.prototype,"thumbs",null);n([s()],a.prototype,"times",null);n([s()],a.prototype,"title",null);n([s()],a.prototype,"title_alt_script",null);n([s()],a.prototype,"transferer",null);n([s()],a.prototype,"track",null);n([s()],a.prototype,"tts_version",null);n([s()],a.prototype,"tuner",null);n([s()],a.prototype,"type",null);n([s()],a.prototype,"updatedate",null);n([s()],a.prototype,"updater",null);n([s()],a.prototype,"uploader",null);n([s()],a.prototype,"uploadsoftware",null);n([s()],a.prototype,"utc_offset",null);n([s()],a.prototype,"venue",null);n([s()],a.prototype,"video_codec",null);n([s()],a.prototype,"volume",null);n([s()],a.prototype,"website",null);n([s()],a.prototype,"week",null);n([s()],a.prototype,"width",null);n([s()],a.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ae(this.rawValue,e=>ze.shared.parseValue(e),"reviewdate")}get createdate(){return ae(this.rawValue,e=>ze.shared.parseValue(e),"createdate")}get stars(){return ae(this.rawValue,e=>te.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([s()],me.prototype,"reviewdate",null);n([s()],me.prototype,"createdate",null);n([s()],me.prototype,"stars",null);class dn{constructor(e){var t,o;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(l=>new ce(l)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new a(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(o=e.reviews)===null||o===void 0?void 0:o.map(l=>new me(l)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class rr extends Error{constructor(e,t,o){super(t),this.name=e,this.type=e,this.details=o}}class pn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const l=new URL(window.location.href).searchParams.get("scope");l&&(this.requestScope=l)}}async fetchMetadata(e,t){const o=t?`/${t}`:"",l=`https://${this.baseUrl}/metadata/${e}${o}`;return this.fetchUrl(l)}async fetchUrl(e,t){var o;const l=new URL(e);this.requestScope&&l.searchParams.set("scope",this.requestScope);let d;try{const h=(o=t?.requestOptions)!==null&&o!==void 0?o:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(l.href,h)}catch(h){const g=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Te.networkError,g)}try{const h=await d.json(),g=h.error;if(g){const _=h.forensics;return this.getErrorResult(Te.searchEngineError,g,_)}else return{success:h}}catch(h){const g=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Te.decodingError,g)}}getErrorResult(e,t,o){return{error:new rr(e,t,o)}}}class Yr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const o=await this.backend.fetchMetadata(e);return o.error?o:((t=o.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new rr(Te.itemNotFound)}:{success:new dn(o.success)}}async fetchMetadataValue(e,t){var o;const l=await this.backend.fetchMetadata(e,t);return l.error?l:((o=l.success)===null||o===void 0?void 0:o.result)===void 0?{error:new rr(Te.itemNotFound)}:{success:l.success.result}}}Yr.default=new Yr(new pn);function qr(r){return new Promise(e=>setTimeout(e,r))}class ir{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const o=t?.headers.get("Retry-After");if(o){const l=parseInt(o,10);if(!isNaN(l))return l*1e3}return Math.min(500*2**e,1e4)}}ir.shared=new ir;class nr{shouldRetry(){return!1}retryDelay(){return null}}nr.shared=new nr;class ar{}ar.default=ir.shared;ar.noRetry=nr.shared;const mi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class hn{constructor(e){this.retryConfig=ar.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const o=mi(t);return await this.doFetchRetry(e,0,o)}async doFetchRetry(e,t,o){var l,d;const h=typeof e=="string"?e:e.url;try{const g=await fetch(e,o?.requestInit);if(g.ok)return g;g.status>=400&&g.status<600&&this.log4xx5xxResponse(g);const _=(l=o?.retryConfig)!==null&&l!==void 0?l:this.retryConfig;if(_.shouldRetry(g,t)){const k=_.retryDelay(t,g);if(k!==null)return await qr(k),this.logRetryEvent(h,t,g.statusText,g.status),this.doFetchRetry(e,t+1,o)}return this.logFailureEvent(h,g.status),g}catch(g){if(this.isContentBlockerError(g))throw this.logContentBlockingEvent(h,g),g;const _=(d=o?.retryConfig)!==null&&d!==void 0?d:this.retryConfig;if(_.shouldRetry(null,t)){const k=_.retryDelay(t);if(k!==null)return await qr(k),this.logRetryEvent(h,t,g,g),this.doFetchRetry(e,t+1,o)}throw this.logFailureEvent(h,g),g}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,o,l){var d;(d=this.analyticsHandler)===null||d===void 0||d.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${l}, status: ${o}, url: ${e}`})}logFailureEvent(e,t){var o;(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const o=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${o}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var o;(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const fn=new Set(["POST","PUT","DELETE","PATCH"]);class lr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new hn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let o=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;o=this.addSearchParams(h,{reCache:"1"})}const d=await this.withCsrfToken(o,t);return this.fetchRetrier.fetchRetry(o,d)}async fetchApiResponse(e,t){const o={};t?.includeCredentials&&(o.credentials="include"),t?.method&&(o.method=t.method),t?.body&&(o.body=t.body);const l=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((_,$)=>{l.set($,_)}),o.headers=l;const d=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(d,{requestInit:o,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const o=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(o,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var o,l,d,h;if(!this.getCsrfToken)return t;const g=(o=mi(t))!==null&&o!==void 0?o:{};if(!g.includeCsrfToken)return t;const _=(l=g.requestInit)!==null&&l!==void 0?l:{},$=((h=(d=_.method)!==null&&d!==void 0?d:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!fn.has($))return t;const k=new Headers(_.headers);return k.has("X-CSRF-Token")?t:(k.set("X-CSRF-Token",await this.getCsrfToken()),{...g,requestInit:{..._,headers:k}})}addSearchParams(e,t){const o=e.indexOf("#"),l=o===-1?"":e.slice(o),d=o===-1?e:e.slice(0,o),h=d.indexOf("?"),g=h===-1?d:d.slice(0,h),_=new URLSearchParams(h===-1?"":d.slice(h+1)),$=lr.asSearchParams(t),k=new Set;$.forEach((Ke,le)=>{k.has(le)||(k.add(le),_.delete(le))}),$.forEach((Ke,le)=>{_.append(le,Ke)});const j=_.toString();return`${g}${j?`?${j}`:""}${l}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([o,l])=>{l!=null&&t.append(o,String(l))}),t}}class mn extends lr{constructor(e){var t;const o={...e};o.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(o)}}const gn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Xr(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return w`<span title="${r}">${t}</span>`}function Kr(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,o=Array(e);t<e;t++)o[t]=r[t];return o}function yn(r){if(Array.isArray(r))return r}function _n(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var o,l,d,h,g=[],_=!0,$=!1;try{if(d=(t=t.call(r)).next,e!==0)for(;!(_=(o=d.call(t)).done)&&(g.push(o.value),g.length!==e);_=!0);}catch(k){$=!0,l=k}finally{try{if(!_&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if($)throw l}}return g}}function vn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function wn(r,e){return yn(r)||_n(r,e)||bn(r,e)||vn()}function bn(r,e){if(r){if(typeof r=="string")return Kr(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Kr(r,e):void 0}}const gi=Object.entries,Zr=Object.setPrototypeOf,Tn=Object.isFrozen,En=Object.getPrototypeOf,Sn=Object.getOwnPropertyDescriptor;let U=Object.freeze,B=Object.seal,Ne=Object.create,yi=typeof Reflect<"u"&&Reflect,sr=yi.apply,or=yi.construct;U||(U=function(e){return e});B||(B=function(e){return e});sr||(sr=function(e,t){for(var o=arguments.length,l=new Array(o>2?o-2:0),d=2;d<o;d++)l[d-2]=arguments[d];return e.apply(t,l)});or||(or=function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),l=1;l<t;l++)o[l-1]=arguments[l];return new e(...o)});const be=F(Array.prototype.forEach),Rn=F(Array.prototype.lastIndexOf),Jr=F(Array.prototype.pop),We=F(Array.prototype.push),An=F(Array.prototype.splice),Fe=Array.isArray,Xe=F(String.prototype.toLowerCase),Gt=F(String.prototype.toString),Qr=F(String.prototype.match),Ye=F(String.prototype.replace),ei=F(String.prototype.indexOf),xn=F(String.prototype.trim),Cn=F(Number.prototype.toString),Ln=F(Boolean.prototype.toString),ti=typeof BigInt>"u"?null:F(BigInt.prototype.toString),ri=typeof Symbol>"u"?null:F(Symbol.prototype.toString),q=F(Object.prototype.hasOwnProperty),qe=F(Object.prototype.toString),H=F(RegExp.prototype.test),he=Dn(TypeError);function F(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,o=new Array(t>1?t-1:0),l=1;l<t;l++)o[l-1]=arguments[l];return sr(r,e,o)}}function Dn(r){return function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return or(r,t)}}function S(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(Zr&&Zr(r,null),!Fe(e))return r;let o=e.length;for(;o--;){let l=e[o];if(typeof l=="string"){const d=t(l);d!==l&&(Tn(e)||(e[o]=d),l=d)}r[l]=!0}return r}function On(r){for(let e=0;e<r.length;e++)q(r,e)||(r[e]=null);return r}function Z(r){const e=Ne(null);for(const o of gi(r)){var t=wn(o,2);const l=t[0],d=t[1];q(r,l)&&(Fe(d)?e[l]=On(d):d&&typeof d=="object"&&d.constructor===Object?e[l]=Z(d):e[l]=d)}return e}function kn(r){switch(typeof r){case"string":return r;case"number":return Cn(r);case"boolean":return Ln(r);case"bigint":return ti?ti(r):"0";case"symbol":return ri?ri(r):"Symbol()";case"undefined":return qe(r);case"function":case"object":{if(r===null)return qe(r);const e=r,t=Q(e,"toString");if(typeof t=="function"){const o=t(e);return typeof o=="string"?o:qe(o)}return qe(r)}default:return qe(r)}}function Q(r,e){for(;r!==null;){const o=Sn(r,e);if(o){if(o.get)return F(o.get);if(typeof o.value=="function")return F(o.value)}r=En(r)}function t(){return null}return t}function Pn(r){try{return H(r,""),!0}catch{return!1}}const ii=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Wt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Yt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),In=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Mn=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ni=U(["#text"]),si=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Xt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oi=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ht=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Nn=B(/{{[\w\W]*|^[\w\W]*}}/g),$n=B(/<%[\w\W]*|^[\w\W]*%>/g),Fn=B(/\${[\w\W]*/g),zn=B(/^data-[\-\w.\u00B7-\uFFFF]+$/),Un=B(/^aria-[\-\w]+$/),ai=B(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Bn=B(/^(?:\w+script|data):/i),Hn=B(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),jn=B(/^html$/i),Vn=B(/^[a-z][.\w]*(-[.\w]+)+$/i),li=B(/<[/\w!]/g),ci=B(/<[/\w]/g),Gn=B(/<\/no(script|embed|frames)/i),Wn=B(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},_i=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Yn=U(S({},_i)),qn=(function(){const r={};return be(_i,e=>{r[e]=B(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(r)})(),Xn=function(){return typeof window>"u"?null:window},Kn=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let o=null;const l="data-tt-policy-suffix";t&&t.hasAttribute(l)&&(o=t.getAttribute(l));const d="dompurify"+(o?"#"+o:"");try{return e.createPolicy(d,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+d+" could not be created."),null}},ui=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,o,l){return q(e,t)&&Fe(e[t])?S(l.base?Z(l.base):{},e[t],l.transform):o},Kt=function(e,t,o){const l=q(e,t)?e[t]:void 0;return l&&typeof l=="object"?Z(l):o()};function vi(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Xn();const e=f=>vi(f);if(e.version="3.4.16",e.removed=[],!r||!r.document||r.document.nodeType!==K.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const o=t,l=o.currentScript;r.DocumentFragment;const d=r.HTMLTemplateElement,h=r.Node,g=r.Element,_=r.NodeFilter;r.NamedNodeMap===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const $=r.DOMParser,k=r.trustedTypes,j=g.prototype,Ke=Q(j,"cloneNode"),le=Q(j,"remove"),ur=Q(j,"removeAttributeNode"),wi=Q(j,"nextSibling"),Ee=Q(j,"childNodes"),Se=Q(j,"parentNode"),dr=Q(j,"shadowRoot"),Et=Q(j,"attributes"),ge=h&&h.prototype?Q(h.prototype,"nodeType"):null,Re=h&&h.prototype?Q(h.prototype,"nodeName"):null,Ze=h&&h.prototype?Q(h.prototype,"ownerDocument"):null,Be=function(i){return ge?ge(i):i.nodeType},St=function(i){return Re?Re(i):i.nodeName};if(typeof d=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let Y,ye="",Rt,pr=!1,He=0;const hr=function(){if(He>0)throw he('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(i){hr(),He++;try{return Y.createHTML(i)}finally{He--}},bi=function(i){hr(),He++;try{return Y.createScriptURL(i)}finally{He--}},Ti=function(){return pr||(Rt=Kn(k,l),pr=!0),Rt},Je=t,At=Je.implementation,fr=Je.createNodeIterator,Ei=Je.createDocumentFragment,Si=Je.getElementsByTagName,Ri=o.importNode;let C=ui();e.isSupported=typeof gi=="function"&&typeof Se=="function"&&At&&At.createHTMLDocument!==void 0;const Ai=Nn,xi=$n,Ci=Fn,Li=zn,Di=Un,Oi=Bn,mr=Hn,ki=Vn;let gr=ai,L=null;const xt=S({},[...ii,...Wt,...Yt,...qt,...ni]);let D=null;const Ct=S({},[...si,...Xt,...oi,...ht]);let ie=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,yr=null;const ue=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let _r=!0,Lt=!0,vr=!1,wr=!0,de=!1,_e=!0,ve=!1,Dt=!1,Qe=null,et=null,Ot=!1,xe=!1,tt=!1,rt=!1,br=!0,Tr=!1;const Er="user-content-";let kt=!0,Pt=!1,Ce={},Le=null;const Sr=S({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Rr=null;const Ar=S({},["audio","video","img","source","image","track"]);let xr=null;const Cr=S({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),it="http://www.w3.org/1998/Math/MathML",nt="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";let De=ne,It=!1,Mt=null;const Pi=S({},[it,nt,ne],Gt),Lr=U(["mi","mo","mn","ms","mtext"]);let Nt=S({},Lr);const Dr=U(["annotation-xml"]);let $t=S({},Dr);const Ii=S({},["title","style","font","a","script"]);let Ve=null;const Mi=["application/xhtml+xml","text/html"],Ni="text/html";let M=null,Oe=null;const $i=t.createElement("form"),Or=function(i){return i instanceof RegExp||i instanceof Function},Ft=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Oe&&Oe===i)return;(!i||typeof i!="object")&&(i={}),i=Z(i),Ve=Mi.indexOf(i.PARSER_MEDIA_TYPE)===-1?Ni:i.PARSER_MEDIA_TYPE,M=Ve==="application/xhtml+xml"?Gt:Xe,L=fe(i,"ALLOWED_TAGS",xt,{transform:M}),D=fe(i,"ALLOWED_ATTR",Ct,{transform:M}),Mt=fe(i,"ALLOWED_NAMESPACES",Pi,{transform:Gt}),xr=fe(i,"ADD_URI_SAFE_ATTR",Cr,{transform:M,base:Cr}),Rr=fe(i,"ADD_DATA_URI_TAGS",Ar,{transform:M,base:Ar}),Le=fe(i,"FORBID_CONTENTS",Sr,{transform:M}),je=fe(i,"FORBID_TAGS",Z({}),{transform:M}),yr=fe(i,"FORBID_ATTR",Z({}),{transform:M}),Ce=q(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Z(i.USE_PROFILES):i.USE_PROFILES:!1,_r=i.ALLOW_ARIA_ATTR!==!1,Lt=i.ALLOW_DATA_ATTR!==!1,vr=i.ALLOW_UNKNOWN_PROTOCOLS||!1,wr=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,de=i.SAFE_FOR_TEMPLATES||!1,_e=i.SAFE_FOR_XML!==!1,ve=i.WHOLE_DOCUMENT||!1,xe=i.RETURN_DOM||!1,tt=i.RETURN_DOM_FRAGMENT||!1,rt=i.RETURN_TRUSTED_TYPE||!1,Ot=i.FORCE_BODY||!1,br=i.SANITIZE_DOM!==!1,Tr=i.SANITIZE_NAMED_PROPS||!1,kt=i.KEEP_CONTENT!==!1,Pt=i.IN_PLACE||!1,gr=Pn(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:ai,De=typeof i.NAMESPACE=="string"?i.NAMESPACE:ne,Nt=Kt(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>S({},Lr)),$t=Kt(i,"HTML_INTEGRATION_POINTS",()=>S({},Dr));const c=Kt(i,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(ie=Ne(null),q(c,"tagNameCheck")&&Or(c.tagNameCheck)&&(ie.tagNameCheck=c.tagNameCheck),q(c,"attributeNameCheck")&&Or(c.attributeNameCheck)&&(ie.attributeNameCheck=c.attributeNameCheck),q(c,"allowCustomizedBuiltInElements")&&typeof c.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=c.allowCustomizedBuiltInElements),B(ie),de&&(Lt=!1),tt&&(xe=!0),Ce&&(L=S({},ni),D=Ne(null),Ce.html===!0&&(S(L,ii),S(D,si)),Ce.svg===!0&&(S(L,Wt),S(D,Xt),S(D,ht)),Ce.svgFilters===!0&&(S(L,Yt),S(D,Xt),S(D,ht)),Ce.mathMl===!0&&(S(L,qt),S(D,oi),S(D,ht))),ue.tagCheck=null,ue.attributeCheck=null,q(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?ue.tagCheck=i.ADD_TAGS:Fe(i.ADD_TAGS)&&(L===xt&&(L=Z(L)),S(L,i.ADD_TAGS,M))),q(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?ue.attributeCheck=i.ADD_ATTR:Fe(i.ADD_ATTR)&&(D===Ct&&(D=Z(D)),S(D,i.ADD_ATTR,M))),q(i,"ADD_FORBID_CONTENTS")&&Fe(i.ADD_FORBID_CONTENTS)&&(Le===Sr&&(Le=Z(Le)),S(Le,i.ADD_FORBID_CONTENTS,M)),kt&&(L["#text"]=!0),ve&&S(L,["html","head","body"]),L.table&&(S(L,["tbody"]),delete je.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const p=Y;Y=i.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(m){throw Y=p,m}}else i.TRUSTED_TYPES_POLICY===null?(Y=void 0,ye=""):(Y===void 0&&(Y=Ti()),Y&&typeof ye=="string"&&(ye=Ae("")));U&&U(i),Oe=i},kr=S({},[...Wt,...Yt,...In]),Pr=S({},[...qt,...Mn]),Fi=function(i,c,p){return c.namespaceURI===ne?i==="svg":c.namespaceURI===it?i==="svg"&&(p==="annotation-xml"||Nt[p]):!!kr[i]},zi=function(i,c,p){return c.namespaceURI===ne?i==="math":c.namespaceURI===nt?i==="math"&&$t[p]:!!Pr[i]},Ui=function(i,c,p){return c.namespaceURI===nt&&!$t[p]||c.namespaceURI===it&&!Nt[p]?!1:!Pr[i]&&(Ii[i]||!kr[i])},Bi=function(i){let c=Se(i);(!c||!c.tagName)&&(c={namespaceURI:De,tagName:"template"});const p=Xe(i.tagName),m=Xe(c.tagName);return Mt[i.namespaceURI]?i.namespaceURI===nt?Fi(p,c,m):i.namespaceURI===it?zi(p,c,m):i.namespaceURI===ne?Ui(p,c,m):!!(Ve==="application/xhtml+xml"&&Mt[i.namespaceURI]):!1},pe=function(i){We(e.removed,{element:i});try{Se(i).removeChild(i)}catch{if(le(i),!Se(i))throw he("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Ir=function(i,c,p){try{ur(i,c)}catch{try{i.removeAttribute(p)}catch{}}},st=function(i){ot(i);const c=Ee(i);if(c){const m=[];be(c,y=>{We(m,y)}),be(m,y=>{try{le(y)}catch{}})}const p=Et(i);if(p)for(let m=p.length-1;m>=0;--m){const y=p[m],T=y&&y.name;typeof T=="string"&&Ir(i,y,T)}},we=function(i,c,p){if(!p)try{p=c.getAttributeNode(i)}catch{p=null}We(e.removed,{attribute:p||null,from:c});try{p?ur(c,p):c.removeAttribute(i)}catch{try{c.removeAttribute(i)}catch{}}if(i==="is")if(xe||tt)try{pe(c)}catch{}else try{c.setAttribute(i,"")}catch{}},Hi=function(i){const c=Et(i);if(c)for(let p=c.length-1;p>=0;--p){const m=c[p],y=m&&m.name;typeof y!="string"||D[M(y)]||Ir(i,m,y)}},ot=function(i){const c=[i];for(;c.length>0;){const p=c.pop();Be(p)===K.element&&Hi(p);const m=Ee(p);if(m)for(let y=m.length-1;y>=0;--y)c.push(m[y])}},Mr=function(i,c){return _e?i==="patchsrc"?!0:i==="for"&&c!=="label"&&c!=="output":!1},ji=function(i){if(!_e)return;const c=[i];for(;c.length>0;){const p=c.pop(),m=Be(p);if(m===K.processingInstruction||m===K.comment&&H(ci,p.data)){try{le(p)}catch{}continue}if(m===K.element){const T=p,E=M(St(p));try{T.hasAttribute&&T.hasAttribute("patchsrc")&&T.removeAttribute("patchsrc"),T.hasAttribute&&T.hasAttribute("for")&&Mr("for",E)&&T.removeAttribute("for")}catch{}}const y=Ee(p);if(y)for(let T=y.length-1;T>=0;--T)c.push(y[T])}},Nr=function(i){let c=null,p=null;if(Ot)i="<remove></remove>"+i;else{const T=Qr(i,/^[\r\n\t ]+/);p=T&&T[0]}Ve==="application/xhtml+xml"&&De===ne&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const m=Y?Ae(i):i;if(De===ne)try{c=new $().parseFromString(m,Ve)}catch{}if(!c||!c.documentElement){c=At.createDocument(De,"template",null);try{c.documentElement.innerHTML=It?ye:m}catch{}}const y=c.body||c.documentElement;return i&&p&&y.insertBefore(t.createTextNode(p),y.childNodes[0]||null),De===ne?Si.call(c,ve?"html":"body")[0]:ve?c.documentElement:y},$r=function(i){const c=Ze?Ze(i):i.ownerDocument;return fr.call(c||i,i,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT|_.SHOW_PROCESSING_INSTRUCTION|_.SHOW_CDATA_SECTION,null)},at=function(i){return i=Ye(i,Ai," "),i=Ye(i,xi," "),i=Ye(i,Ci," "),i},zt=function(i){var c;i.normalize();const p=Ze?Ze(i):i.ownerDocument,m=fr.call(p||i,i,_.SHOW_TEXT|_.SHOW_COMMENT|_.SHOW_CDATA_SECTION|_.SHOW_PROCESSING_INSTRUCTION,null);let y=m.nextNode();for(;y;)y.data=at(y.data),y=m.nextNode();const T=(c=i.querySelectorAll)===null||c===void 0?void 0:c.call(i,"template");T&&be(T,E=>{ke(E.content)&&zt(E.content)})},lt=function(i){const c=Re?Re(i):null;return typeof c!="string"||M(c)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==Et(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ge(i)||i.childNodes!==Ee(i)},ke=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return ge(i)===K.documentFragment}catch{return!1}},Ge=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return typeof ge(i)=="number"}catch{return!1}};function se(f,i,c){f.length!==0&&be(f,p=>{p.call(e,i,c,Oe)})}const Vi=function(i,c){return!!(_e&&i.hasChildNodes()&&!Ge(i.firstElementChild)&&H(li,i.textContent)&&H(li,i.innerHTML)||_e&&i.namespaceURI===ne&&Yn[c]&&(Ge(i.firstElementChild)||typeof i.textContent=="string"&&H(qn[c],i.textContent))||i.nodeType===K.processingInstruction||_e&&i.nodeType===K.comment&&H(ci,i.data))},ct=function(i,c){if(i instanceof RegExp)return H(i,c);if(i instanceof Function){for(var p=arguments.length,m=new Array(p>2?p-2:0),y=2;y<p;y++)m[y-2]=arguments[y];return!!i(c,...m)}return!1},Gi=function(i,c,p){if(!je[c]&&Br(c)&&ct(ie.tagNameCheck,c))return!1;if(kt&&!Le[c]){const m=Se(i),y=Ee(i);if(y&&m){const T=y.length;for(let E=T-1;E>=0;--E){const P=i===p?Ke(y[E],!0):y[E];m.insertBefore(P,wi(i))}}}return pe(i),!0},Fr=function(i,c,p,m){return i.length===0?c:c===p||c===m?Z(c):c},Pe=function(i,c){return i===c||Se(i)!==null?!1:(Pt&&ot(i),!0)},zr=function(i,c){if(se(C.beforeSanitizeElements,i,null),Pe(i,c))return!0;if(lt(i))return pe(i),!0;const p=M(St(i));if(L=Fr(C.uponSanitizeElement,L,xt,Qe),se(C.uponSanitizeElement,i,{tagName:p,allowedTags:L}),Pe(i,c))return!0;if(Vi(i,p))return pe(i),!0;if(je[p]||!(ue.tagCheck instanceof Function&&ue.tagCheck(p))&&!L[p]){const m=Gi(i,p,c);return m===!1&&(se(C.afterSanitizeElements,i,null),Pe(i,c))?!0:m}if(Be(i)===K.element&&!Bi(i)||(p==="noscript"||p==="noembed"||p==="noframes")&&H(Gn,i.innerHTML))return pe(i),!0;if(de&&i.nodeType===K.text){const m=at(i.textContent);i.textContent!==m&&(We(e.removed,{element:i.cloneNode()}),i.textContent=m)}return se(C.afterSanitizeElements,i,null),Pe(i,c)},Ur=function(i,c,p){if(yr[c]||Mr(c,i)||br&&(c==="id"||c==="name")&&(p in t||p in $i))return!1;const m=D[c]||ue.attributeCheck instanceof Function&&ue.attributeCheck(c,i);return Lt&&H(Li,c)||_r&&H(Di,c)?!0:m?xr[c]||H(gr,Ye(p,mr,""))||(c==="src"||c==="xlink:href"||c==="href")&&i!=="script"&&ei(p,"data:")===0&&Rr[i]||vr&&!H(Oi,Ye(p,mr,""))?!0:!p:Br(i)&&ct(ie.tagNameCheck,i)&&ct(ie.attributeNameCheck,c,i)||c==="is"&&ie.allowCustomizedBuiltInElements&&ct(ie.tagNameCheck,p)},Wi=S({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Br=function(i){return!Wi[Xe(i)]&&H(ki,i)},Yi=function(i,c,p,m){if(Y&&typeof k=="object"&&typeof k.getAttributeType=="function"&&!p)switch(k.getAttributeType(i,c)){case"TrustedHTML":return Ae(m);case"TrustedScriptURL":return bi(m)}return m},qi=function(i,c,p,m){try{return p?i.setAttributeNS(p,c,m):i.setAttribute(c,m),lt(i)?(pe(i),!1):!0}catch{return we(c,i),!1}},Hr=function(i,c){if(se(C.beforeSanitizeAttributes,i,null),Pe(i,c))return;const p=i.attributes;if(!p||lt(i))return;D=Fr(C.uponSanitizeAttribute,D,Ct,et);const m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:D,forceKeepAttr:void 0};let y=p.length;const T=M(i.nodeName);for(;y--;){const E=p[y],P=E.name,J=E.namespaceURI,X=E.value,Ie=M(P),Bt=X;let V=P==="value"?Bt:xn(Bt),jr=!1;if(m.attrName=Ie,m.attrValue=V,m.keepAttr=!0,m.forceKeepAttr=void 0,se(C.uponSanitizeAttribute,i,m),V=m.attrValue,Tr&&(Ie==="id"||Ie==="name")&&ei(V,Er)!==0&&(we(P,i,E),V=Er+V,jr=!0),_e&&H(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(P,i,E);continue}if(Ie==="attributename"&&Qr(V,"href")){we(P,i,E);continue}if(!m.forceKeepAttr){if(!m.keepAttr){we(P,i,E);continue}if(!wr&&H(Wn,V)){we(P,i,E);continue}if(de&&(V=at(V)),!Ur(T,Ie,V)){we(P,i,E);continue}V=Yi(T,Ie,J,V),V!==Bt&&qi(i,P,J,V)&&jr&&Jr(e.removed)}}se(C.afterSanitizeAttributes,i,null),Pe(i,c)},ut=function(i){let c=null;const p=$r(i);for(se(C.beforeSanitizeShadowDOM,i,null);c=p.nextNode();)if(se(C.uponSanitizeShadowNode,c,null),zr(c,i),Hr(c,i),ke(c.content)&&ut(c.content),Be(c)===K.element){const m=dr(c);ke(m)&&(Ut(m),ut(m))}se(C.afterSanitizeShadowDOM,i,null)},Ut=function(i){const c=[{node:i,shadow:null}];for(;c.length>0;){const p=c.pop();if(p.shadow){ut(p.shadow);continue}const m=p.node,y=Be(m)===K.element,T=Ee(m);if(T)for(let E=T.length-1;E>=0;--E)c.push({node:T[E],shadow:null});if(y){const E=Re?Re(m):null;if(typeof E=="string"&&M(E)==="template"){const P=m.content;ke(P)&&c.push({node:P,shadow:null})}}if(y){const E=dr(m);ke(E)&&c.push({node:null,shadow:E},{node:E,shadow:null})}}};return e.sanitize=function(f){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},c=null,p=null,m=null,y=null;if(It=!f,It&&(f="<!-->"),typeof f!="string"&&!Ge(f)&&(f=kn(f),typeof f!="string"))throw he("dirty is not a string, aborting");if(!e.isSupported)return f;Dt?(L=Qe,D=et):Ft(i),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(L=Z(L)),C.uponSanitizeAttribute.length>0&&(D=Z(D)),e.removed=[];const T=Pt&&typeof f!="string"&&Ge(f);if(T){ji(f);const J=St(f);if(typeof J=="string"){const X=M(J);if(!L[X]||je[X])throw st(f),he("root node is forbidden and cannot be sanitized in-place")}if(lt(f))throw st(f),he("root node is clobbered and cannot be sanitized in-place");try{Ut(f)}catch(X){throw st(f),X}}else if(Ge(f))c=Nr("<!---->"),p=c.ownerDocument.importNode(f,!0),p.nodeType===K.element&&p.nodeName==="BODY"||p.nodeName==="HTML"?c=p:c.appendChild(p),Ut(c);else{if(!xe&&!de&&!ve&&f.indexOf("<")===-1)return Y&&rt?Ae(f):f;if(c=Nr(f),!c)return xe?null:rt?ye:""}c&&Ot&&pe(c.firstChild);const E=T?f:c;try{const J=$r(E);for(;m=J.nextNode();)zr(m,E),Hr(m,E),ke(m.content)&&ut(m.content)}catch(J){throw T&&(st(f),be(e.removed,X=>{X.element&&ot(X.element)})),J}if(T){let J=!1;if(be(e.removed,X=>{X.element&&(X.element===f&&(J=!0),ot(X.element))}),J)throw he("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&zt(f),f}if(xe){if(de&&zt(c),tt)for(y=Ei.call(c.ownerDocument);c.firstChild;)y.appendChild(c.firstChild);else y=c;return(D.shadowroot||D.shadowrootmode)&&(y=Ri.call(o,y,!0)),y}let P=ve?c.outerHTML:c.innerHTML;return ve&&L["!doctype"]&&c.ownerDocument&&c.ownerDocument.doctype&&c.ownerDocument.doctype.name&&H(jn,c.ownerDocument.doctype.name)&&(P="<!DOCTYPE "+c.ownerDocument.doctype.name+`>
`+P),de&&(P=at(P)),Y&&rt?Ae(P):P},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(f),Dt=!0,Qe=L,et=D},e.clearConfig=function(){Oe=null,Dt=!1,Qe=null,et=null,Y=Rt,ye=""},e.isValidAttribute=function(f,i,c){Oe||Ft({});const p=M(f),m=M(i);return Ur(p,m,c)},e.addHook=function(f,i){typeof i=="function"&&q(C,f)&&We(C[f],i)},e.removeHook=function(f,i){if(q(C,f)){if(i!==void 0){const c=Rn(C[f],i);return c===-1?void 0:An(C[f],c,1)[0]}return Jr(C[f])}},e.removeHooks=function(f){q(C,f)&&(C[f]=[])},e.removeAllHooks=function(){C=ui()},e}var ft=vi();const Zn=["a"];function Jn(r){ft.addHook("afterSanitizeAttributes",Qn);try{return ft.sanitize(r,{ALLOWED_TAGS:Zn})}finally{ft.removeHook("afterSanitizeAttributes")}}function Qn(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function es(r,e=100,t=!0){if(r.length<e)return r;let o=e;if(t){const l=r.indexOf(" ",e),d=l-e<=20;if(d&&l===r.length-1)return r;l!==-1&&d&&(o=l)}return ts(r,o,e)}function ts(r,e,t){let o=r.slice(0,e);const l=o.match(/<a/gi);if(l){const d=o.match(/<\/a/gi);if(!d||d.length<l.length){const h=r.indexOf("</a>",e),g=h-t<=20;if(g&&r.length===h+4)return r;if(h!==-1&&g)o=r.slice(0,h+4);else{const _=o.lastIndexOf("<a");o=r.slice(0,_)}}}return o.concat("...")}const rs=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function is(r){return r.replace(/href="([^"]+)"/,(o,l)=>`href="${l.replace(".","__DOT__")}"`).replace(rs,o=>`<a href="${(o.match(/^(https|http)/)?o:`https://${o}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${o}</a>`).replace("__DOT__",".")}function ns(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const ss="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var os=Object.defineProperty,as=Object.getOwnPropertyDescriptor,re=(r,e,t,o)=>{for(var l=o>1?void 0:o?as(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(l=(o?h(e,t,l):h(l))||l);return o&&l&&os(e,t,l),l};let ee=class extends bt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.csrfToken="",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1,this.deleteMsg=""}render(){return this.review?w`
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
                `:z}
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
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return z;const e=Jn(r),t=this.truncateContent(e,this.maxBodyLength);return w`${di(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?z:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?z:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return w`
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
              ${Xr(this.review.reviewer)}
            </a>
          `:w`${Xr(this.review.reviewer)}`:z}get starsTemplate(){return!this.review||!this.review.stars?z:w`
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
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return z;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"}),o=r.getTime()!==e.getTime()?"(edited)":"";return R(`${t} ${o}`)}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:es(r,e)}prepReview(r){return ns(is(r))}async deleteReview(){if(!this.review||!this.identifier||!confirm(R("Are you sure you want to delete this review?")))return;const r=new URLSearchParams({identifier:this.identifier,deleteReviewer:this.review.reviewer??"",deleteReviewerItemname:this.review.reviewer_itemname??"",csrf_token:this.csrfToken}),e=`${this.baseHost}/edit-reviews.php?${r}`;try{const t=await fetch(e,{method:"POST"});if(!t.ok)throw new Error(`Delete failed: ${t.status}`);this.deleteMsg="This review has been queued for deletion."}catch{this.deleteMsg="Sorry, we were unable to delete this review."}}static get styles(){return Tt`
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
    `}};re([b({type:Object})],ee.prototype,"review",2);re([b({type:String})],ee.prototype,"identifier",2);re([b({type:Number})],ee.prototype,"maxSubjectLength",2);re([b({type:Number})],ee.prototype,"maxBodyLength",2);re([b({type:String})],ee.prototype,"baseHost",2);re([b({type:String})],ee.prototype,"csrfToken",2);re([b({type:Boolean})],ee.prototype,"canDelete",2);re([b({type:Boolean})],ee.prototype,"bypassTruncation",2);re([G()],ee.prototype,"showTruncatedContent",2);re([G()],ee.prototype,"deleteMsg",2);ee=re([wt("ia-review")],ee);const ls="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",cs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var us=Object.defineProperty,ds=Object.getOwnPropertyDescriptor,N=(r,e,t,o)=>{for(var l=o>1?void 0:o?ds(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(l=(o?h(e,t,l):h(l))||l);return o&&l&&us(e,t,l),l};let I=class extends bt{constructor(){super(...arguments),this.token="",this.baseHost="https://archive.org",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.formCanSubmit=!1,this.submissionInProgress=!1,this.RECAPTCHA_ERROR_MESSAGE="Could not validate review. Please try again later.",this.GENERIC_ERROR_MESSAGE="There's been a temporary error. Please wait a moment and try again."}render(){return w`<form id="review-form" @submit=${this.handleSubmit}>
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
        `:z}get recoverableErrorTemplate(){return this.recoverableError?w`
          <div class="recoverable-error">
            ${di(this.sanitizeErrorMsg(R(this.recoverableError)))}
          </div>
        `:z}get recaptchaMessageTemplate(){return this.bypassRecaptcha?z:w`
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
              ${R(`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:z}</div></span>
    `}get bodyInputTemplate(){return w`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${R("Review")}</label>
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
                ${R(`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:z}
      </span>
    `}get hiddenInputsTemplate(){return w`
      <input type="hidden" name="field_reviewtoken" .value=${this.token} />
      ${this.identifier?w`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:z}
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
    </div>`}renderStar(r){const e=r===this.currentStars,t=R(`Rate ${r>1?`${r} stars`:"1 star"}`);return w`
      <button
        class="star star-${r}"
        title=${e?R("Clear rating"):t}
        @click=${o=>this.handleStarClicked(o,r)}
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
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.unrecoverableError=this.RECAPTCHA_ERROR_MESSAGE}}sanitizeErrorMsg(r){return ft.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.fetchHandler)return this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission();try{const e=new URLSearchParams;if(!this.bypassRecaptcha){const o=await this.getRecaptchaToken();if(!o)return this.handleRecaptchaError();e.append("g-recaptcha-response",o??"")}for(const o of new FormData(this.reviewForm))e.append(o[0],o[1]);e.append("submitter","review-form");const t=await this.fetchHandler.fetchApiResponse(`${this.baseHost}${this.endpointPath}`,{method:"POST",includeCredentials:!0,body:e});if(t?.success===!0){this.submissionInProgress=!1;const o=this.generateSubmittedReview(),l=new CustomEvent("reviewUpdated",{detail:o});this.dispatchEvent(l)}else this.recoverableError=t.error??this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}catch(e){console.error(e),this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname,reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.recoverableError=this.RECAPTCHA_ERROR_MESSAGE,this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableError||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Tt`
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
      `]}};N([b({type:String})],I.prototype,"identifier",2);N([b({type:String})],I.prototype,"token",2);N([b({type:String})],I.prototype,"baseHost",2);N([b({type:String})],I.prototype,"endpointPath",2);N([b({type:String})],I.prototype,"submitterScreenname",2);N([b({type:String})],I.prototype,"submitterItemname",2);N([b({type:Object})],I.prototype,"oldReview",2);N([b({type:String})],I.prototype,"unrecoverableError",2);N([b({type:Number})],I.prototype,"maxSubjectLength",2);N([b({type:Number})],I.prototype,"maxBodyLength",2);N([b({type:Object})],I.prototype,"fetchHandler",2);N([b({type:Object})],I.prototype,"recaptchaManager",2);N([b({type:Boolean})],I.prototype,"bypassRecaptcha",2);N([G()],I.prototype,"currentStars",2);N([G()],I.prototype,"currentSubjectLength",2);N([G()],I.prototype,"currentBodyLength",2);N([G()],I.prototype,"recoverableError",2);N([G()],I.prototype,"formCanSubmit",2);N([G()],I.prototype,"submissionInProgress",2);N([pi("#review-form")],I.prototype,"reviewForm",2);I=N([wt("ia-review-form")],I);var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,x=(r,e,t,o)=>{for(var l=o>1?void 0:o?hs(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(l=(o?h(e,t,l):h(l))||l);return o&&l&&ps(e,t,l),l};let A=class extends bt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.token="",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.fetchHandler=new mn,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?w`
      <div class="reviews-list">
        ${this.reviewsFrozen?w`<div class="message">
              ${R("Reviews can no longer be added to this item.")}
            </div>`:z}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(r=>r.reviewer_itemname!==this.submitterItemname?this.renderReview(r):z)}
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
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?z:w`<div class="own-review-container">
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
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{!r&&t.reviewer_itemname===this.submitterItemname?r=t:e.push(t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,o)=>t.createdate&&o.createdate?new Date(o.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r){return r?w`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .csrfToken=${this.token}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:z}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[Tt`
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
      `]}};x([b({type:String})],A.prototype,"identifier",2);x([b({type:Array})],A.prototype,"reviews",2);x([b({type:Boolean})],A.prototype,"reviewsDisabled",2);x([b({type:Boolean})],A.prototype,"reviewsFrozen",2);x([b({type:Boolean})],A.prototype,"canDelete",2);x([b({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([b({type:Number})],A.prototype,"maxSubjectLength",2);x([b({type:Number})],A.prototype,"maxBodyLength",2);x([b({type:String})],A.prototype,"baseHost",2);x([b({type:String})],A.prototype,"token",2);x([b({type:String})],A.prototype,"endpointPath",2);x([b({type:String})],A.prototype,"submitterScreenname",2);x([b({type:String})],A.prototype,"submitterItemname",2);x([b({type:Object})],A.prototype,"recaptchaManager",2);x([b({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([b({type:String})],A.prototype,"reviewSubmissionError",2);x([b({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([b({type:Object})],A.prototype,"fetchHandler",2);x([G()],A.prototype,"displayReviewForm",2);x([G()],A.prototype,"displayReviews",2);x([G()],A.prototype,"filteredReviews",2);x([G()],A.prototype,"currentReview",2);x([G()],A.prototype,"reviewsCount",2);x([G()],A.prototype,"recaptchaActivated",2);A=x([wt("ia-reviews")],A);var fs=Object.defineProperty,ms=Object.getOwnPropertyDescriptor,cr=(r,e,t,o)=>{for(var l=o>1?void 0:o?ms(e,t):e,d=r.length-1,h;d>=0;d--)(h=r[d])&&(l=(o?h(e,t,l):h(l))||l);return o&&l&&fs(e,t,l),l};const gs=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],ys=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],_s=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],vs={async fetch(){return new Response("{}",{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},ws=6,bs="/edit-reviews.php";let vt=class extends bt{constructor(){super(...arguments),this.log=[]}connectedCallback(){super.connectedCallback();const r=window.fetch;this.realFetch=r,window.fetch=(e,t)=>(e instanceof Request?e.url:String(e)).includes(bs)?Promise.resolve(new Response("{}",{status:200})):r.call(window,e,t)}disconnectedCallback(){this.realFetch&&(window.fetch=this.realFetch),this.realFetch=void 0,super.disconnectedCallback()}render(){return w`
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,ws)}static get styles(){return Tt`
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
    `}};cr([G()],vt.prototype,"log",2);cr([pi("ia-reviews")],vt.prototype,"reviews",2);vt=cr([wt("ia-reviews-story")],vt);export{vt as IAReviewsStory};
