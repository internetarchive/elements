import{m as S,b as _,r as H,n as w,c as bt,i as Tt,A as F,o as pi,s as Fe,a as St,e as hi}from"./index-Bf3zV2Od.js";import{M as n}from"./memoize-decorator-Bcs06flF.js";import{l as ar}from"./localized-decorator-CIBm66GA.js";import"./ia-button-CMK7Z5cd.js";import"./story-template-DgWq07G4.js";import"./theme-styles-Bkb0ITAp.js";import"./ia-status-indicator-ymzov28Z.js";import"./icon-box-CpBcMzDw.js";import"./mediatype-web-DXTNPjUj.js";import"./syntax-highlighter-B-6Y_c4o.js";function s(r,e,t,o){var c=arguments.length,d=c<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")d=Reflect.decorate(r,e,t,o);else for(var y=r.length-1;y>=0;y--)(m=r[y])&&(d=(c<3?m(d):c>3?m(e,t,d):m(e,t))||d);return c>3&&d&&Object.defineProperty(e,t,d),d}class gt{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}gt.shared=new gt;class re{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}re.shared=new re;class yt{parseValue(e){return re.shared.parseValue(e)}}yt.shared=new yt;class ze{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,o,c,d,m="00",y="00",b="00"]=t,B=new Date(`${o}-${c}-${d}T${m}:${y}:${b}`);return Number.isNaN(B.getTime())?void 0:B}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const o=Date.parse(t);if(Number.isNaN(o))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}ze.shared=new ze;class vt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let o;return t.length===1?o=this.parseNumberFormat(t[0]):o=this.parseColonSeparatedFormat(t),o}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const o=e.map((c,d)=>{const m=parseFloat(c);if(Number.isNaN(m))return t=!0,0;const b=60**(e.length-1-d);return m*Math.floor(b)}).reduce((c,d)=>c+d,0);return t?void 0:o}}vt.shared=new vt;class fi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let o=[];for(const c of this.separators)if(o=t.split(c),o.length>1)break;return this.parseListValues(o)}parseListValues(e){const o=e.map(d=>d.trim()).map(d=>this.parser.parseValue(d)),c=[];return o.forEach(d=>{d!==void 0&&c.push(d)}),c}}class _t{parseValue(e){return String(e)}}_t.shared=new _t;function Me(r,e,...t){for(const o of t){const c=r[o];if(c!=null)return e(c)}}function ae(r,e,...t){return Me(r,o=>e(o),...t)}class ce{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=re.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ae(this.rawValue,e=>yt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ae(this.rawValue,e=>vt.shared.parseValue(e),"length")}get height(){return ae(this.rawValue,e=>re.shared.parseValue(e),"height")}get width(){return ae(this.rawValue,e=>re.shared.parseValue(e),"width")}get track(){return ae(this.rawValue,e=>re.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ae(this.rawValue,e=>re.shared.parseValue(e),"bitrate")}get private(){return ae(this.rawValue,e=>gt.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}s([n()],ce.prototype,"mtime",null);s([n()],ce.prototype,"size",null);s([n()],ce.prototype,"length",null);s([n()],ce.prototype,"height",null);s([n()],ce.prototype,"width",null);s([n()],ce.prototype,"track",null);s([n()],ce.prototype,"bitrate",null);s([n()],ce.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(o=>{const c=this.parser.parseValue(o);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}s([n()],W.prototype,"values",null);s([n()],W.prototype,"value",null);class oe extends W{constructor(e){super(gt.shared,e)}}class O extends W{constructor(e){super(ze.shared,e)}}class jt extends W{constructor(e){super(vt.shared,e)}}class v extends W{constructor(e){super(re.shared,e)}}class u extends W{constructor(e){super(_t.shared,e)}}class He{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class $e extends W{constructor(e,t){super(t,e)}}const Ji=new He(["rl","lr"]);class Qi extends $e{constructor(e){super(e,Ji)}}class pt extends W{constructor(e){super(yt.shared,e)}}const en=new He(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class tn extends $e{constructor(e){super(e,en)}}class mi extends W{constructor(e,t){super(t,e)}}class Gr extends mi{constructor(e){const t=new fi(_t.shared);super(e,t)}}class Vt extends mi{constructor(e){const t=new fi(re.shared);super(e,t)}}const rn=/^([0-9a-f]{32})\s+\*?(.+)$/i,nn=/^(.+):([0-9a-f]{32})$/i;function sn(r){const e=r.match(rn);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(nn);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Zt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(o=>o.trim()).filter(Boolean).map(sn).filter(o=>o!==void 0);return t.length?t:void 0}}Zt.shared=new Zt;class qr extends W{constructor(e){super(Zt.shared,e)}}function ht(r,e){var t;const o=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=o?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class Jt{parseValue(e){if(typeof e!="string")return;const t=ht(e,"curator"),o=ht(e,"date"),c=ht(e,"comment"),d=ht(e,"state");if(!(!t&&!o&&!c&&!d))return{curator:t,date:o?ze.shared.parseValue(o):void 0,comment:c,state:d}}}Jt.shared=new Jt;class on extends W{constructor(e){super(Jt.shared,e)}}class Qt{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const o=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:o,height:c,decimal:o/c}}}Qt.shared=new Qt;class an extends W{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const o=t[1]==="-"?-1:1,c=parseInt(t[2],10),d=parseInt(t[3],10);return{hours:o*c,minutes:d,totalMinutes:o*(c*60+d)}}}er.shared=new er;class ln extends W{constructor(e){super(er.shared,e)}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}tr.shared=new tr;class cn extends W{constructor(e){super(tr.shared,e)}}const un=new He(["true","none","frozen"]),dn=new He(["sound","silent"]),pn=new He(["color","b&w"]),hn=new He(["mode/1up","mode/2up","mode/thumb"]);class a{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(v,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(v,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(v,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(v,"bookplateleaf")}get bookreader_defaults(){return Me(this.rawMetadata,e=>new $e(e,hn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(on,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(O,"date-case-filed")}get date_case_terminated(){return this.field(O,"date-case-terminated")}get date_created(){return this.field(O,"date_created")}get date_last_filing(){return this.field(O,"date-last-filing")}get derive_submittime(){return this.field(O,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(v,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(O,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(O,"filesxml")}get firstfiledate(){return this.field(O,"firstfiledate")}get firstfileserial(){return this.field(v,"firstfileserial")}get foldoutcount(){return this.field(v,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(oe,"has_mp3")}get height(){return this.field(v,"height")}get hidden(){return this.field(oe,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(oe,"access-restricted-item")}get addeddate(){return this.field(O,"addeddate")}get aspect_ratio(){return this.field(an,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(v,"audio_sample_rate")}get avg_rating(){return this.field(v,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(oe,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(pt,"collection_size")}get color(){return Me(this.rawMetadata,e=>new $e(e,pn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(O,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(v,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(v,"files_count")}get frames_per_second(){return this.field(v,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(v,"image_count")}get imagecount(){return this.field(v,"imagecount")}get indexdate(){return this.field(O,"indexdate")}get invoice(){return this.field(v,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(v,"issue_count")}get issue_page_count(){return this.field(v,"issue_page_count")}get item_count(){return this.field(v,"item_count")}get item_size(){return this.field(pt,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(O,"lastdate")}get lastfiledate(){return this.field(O,"lastfiledate")}get lastfileserial(){return this.field(v,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(oe,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(qr,"md5contents")}get md5s(){return this.field(qr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(oe,"monochromatic")}get month(){return this.field(v,"month")}get mediatype(){return this.field(tn,"mediatype")}get mpeg_program(){return this.field(v,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(oe,"noarchivetorrent")}get noindex(){return this.field(oe,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(v,"num_favorites")}get num_reviews(){return this.field(v,"num_reviews")}get numeric_id(){return this.field(v,"numeric_id")}get numwarcs(){return this.field(v,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(oe,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(v,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(v,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(v,"output_time_minutes")}get pacer_case_num(){return this.field(v,"pacer-case-num")}get packaging_time_minutes(){return this.field(v,"packaging_time_minutes")}get page_number_confidence(){return this.field(v,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(Qi,"page-progression","page_progression")}get paginated(){return this.field(oe,"paginated")}get parse_date(){return this.field(O,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(v,"pick")}get podcastindexid(){return this.field(v,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(v,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(O,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(v,"rcs_key")}get repub_state(){return this.field(v,"repub_state")}get republisher_date(){return this.field(O,"republisher_date")}get republisher_operator(){return this.field(Gr,"republisher_operator")}get republisher_time(){return this.field(v,"republisher_time")}get reviewdate(){return this.field(O,"reviewdate")}get reviews_allowed(){return Me(this.rawMetadata,e=>new $e(e,un),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(O,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(v,"scan_time_minutes")}get scandate(){return this.field(O,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(v,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(pt,"size")}get sizehint(){return this.field(pt,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Me(this.rawMetadata,e=>new $e(e,dn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(v,"source_pixel_height")}get source_pixel_width(){return this.field(v,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(O,"sponsordate")}get start_localtime(){return this.field(O,"start_localtime")}get start_time(){return this.field(O,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(O,"stop_time")}get subject(){return this.field(Gr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(v,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(cn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(O,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(ln,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(v,"week")}get width(){return this.field(v,"width")}get year(){return this.field(v,"year")}field(e,...t){return Me(this.rawMetadata,o=>new e(o),...t)}constructor(e={}){this.rawMetadata=e}}s([n()],a.prototype,"access",null);s([n()],a.prototype,"adder",null);s([n()],a.prototype,"amrc_id",null);s([n()],a.prototype,"archiveit_account_id",null);s([n()],a.prototype,"archiveit_account_organization_name",null);s([n()],a.prototype,"archiveit_collection_id",null);s([n()],a.prototype,"archiveit_collection_name",null);s([n()],a.prototype,"archiveit_job_type",null);s([n()],a.prototype,"audit_time_minutes",null);s([n()],a.prototype,"auditor",null);s([n()],a.prototype,"author",null);s([n()],a.prototype,"autocrop_version",null);s([n()],a.prototype,"bookplateleaf",null);s([n()],a.prototype,"bookreader_defaults",null);s([n()],a.prototype,"boxid",null);s([n()],a.prototype,"camera",null);s([n()],a.prototype,"cameraman",null);s([n()],a.prototype,"canister",null);s([n()],a.prototype,"case_name",null);s([n()],a.prototype,"col_number",null);s([n()],a.prototype,"collection_added",null);s([n()],a.prototype,"collection_library",null);s([n()],a.prototype,"collection_set",null);s([n()],a.prototype,"copyright_holder",null);s([n()],a.prototype,"court",null);s([n()],a.prototype,"crawler",null);s([n()],a.prototype,"crawljob",null);s([n()],a.prototype,"curation",null);s([n()],a.prototype,"dari_title",null);s([n()],a.prototype,"dari_title_romanized",null);s([n()],a.prototype,"date_case_filed",null);s([n()],a.prototype,"date_case_terminated",null);s([n()],a.prototype,"date_created",null);s([n()],a.prototype,"date_last_filing",null);s([n()],a.prototype,"derive_submittime",null);s([n()],a.prototype,"derive_version",null);s([n()],a.prototype,"discs",null);s([n()],a.prototype,"docket_num",null);s([n()],a.prototype,"external_metadata_update",null);s([n()],a.prototype,"fail_reasons",null);s([n()],a.prototype,"filesxml",null);s([n()],a.prototype,"firstfiledate",null);s([n()],a.prototype,"firstfileserial",null);s([n()],a.prototype,"foldoutcount",null);s([n()],a.prototype,"format",null);s([n()],a.prototype,"geo_restricted",null);s([n()],a.prototype,"guid",null);s([n()],a.prototype,"has_mp3",null);s([n()],a.prototype,"height",null);s([n()],a.prototype,"hidden",null);s([n()],a.prototype,"ia_orig__runtime",null);s([n()],a.prototype,"access_restricted_item",null);s([n()],a.prototype,"addeddate",null);s([n()],a.prototype,"aspect_ratio",null);s([n()],a.prototype,"audio_codec",null);s([n()],a.prototype,"audio_sample_rate",null);s([n()],a.prototype,"avg_rating",null);s([n()],a.prototype,"backup_location",null);s([n()],a.prototype,"ccnum",null);s([n()],a.prototype,"closed_captioning",null);s([n()],a.prototype,"collection",null);s([n()],a.prototype,"collections_raw",null);s([n()],a.prototype,"collection_size",null);s([n()],a.prototype,"color",null);s([n()],a.prototype,"contact",null);s([n()],a.prototype,"contributor",null);s([n()],a.prototype,"coverage",null);s([n()],a.prototype,"creator",null);s([n()],a.prototype,"creator_alt_script",null);s([n()],a.prototype,"credits",null);s([n()],a.prototype,"collection_layout",null);s([n()],a.prototype,"date",null);s([n()],a.prototype,"description",null);s([n()],a.prototype,"downloads",null);s([n()],a.prototype,"duration",null);s([n()],a.prototype,"external_identifier",null);s([n()],a.prototype,"external_link",null);s([n()],a.prototype,"files_count",null);s([n()],a.prototype,"frames_per_second",null);s([n()],a.prototype,"identifier_access",null);s([n()],a.prototype,"identifier_ark",null);s([n()],a.prototype,"identifier_bib",null);s([n()],a.prototype,"image_count",null);s([n()],a.prototype,"imagecount",null);s([n()],a.prototype,"indexdate",null);s([n()],a.prototype,"invoice",null);s([n()],a.prototype,"isbn",null);s([n()],a.prototype,"issue",null);s([n()],a.prototype,"issue_count",null);s([n()],a.prototype,"issue_page_count",null);s([n()],a.prototype,"item_count",null);s([n()],a.prototype,"item_size",null);s([n()],a.prototype,"language",null);s([n()],a.prototype,"lastdate",null);s([n()],a.prototype,"lastfiledate",null);s([n()],a.prototype,"lastfileserial",null);s([n()],a.prototype,"length",null);s([n()],a.prototype,"license",null);s([n()],a.prototype,"licenseurl",null);s([n()],a.prototype,"lineage",null);s([n()],a.prototype,"mature_content",null);s([n()],a.prototype,"md5",null);s([n()],a.prototype,"md5contents",null);s([n()],a.prototype,"md5s",null);s([n()],a.prototype,"medium",null);s([n()],a.prototype,"metadata_operator",null);s([n()],a.prototype,"metasource_catalog",null);s([n()],a.prototype,"monochromatic",null);s([n()],a.prototype,"month",null);s([n()],a.prototype,"mediatype",null);s([n()],a.prototype,"mpeg_program",null);s([n()],a.prototype,"next_item",null);s([n()],a.prototype,"noarchivetorrent",null);s([n()],a.prototype,"noindex",null);s([n()],a.prototype,"notes",null);s([n()],a.prototype,"num_favorites",null);s([n()],a.prototype,"num_reviews",null);s([n()],a.prototype,"numeric_id",null);s([n()],a.prototype,"numwarcs",null);s([n()],a.prototype,"ocr",null);s([n()],a.prototype,"ocr_autonomous",null);s([n()],a.prototype,"ocr_detected_lang",null);s([n()],a.prototype,"ocr_detected_lang_conf",null);s([n()],a.prototype,"ocr_detected_script",null);s([n()],a.prototype,"ocr_detected_script_conf",null);s([n()],a.prototype,"ocr_invalid_language",null);s([n()],a.prototype,"ocr_module_version",null);s([n()],a.prototype,"ocr_parameters",null);s([n()],a.prototype,"old_pallet",null);s([n()],a.prototype,"openlibrary_edition",null);s([n()],a.prototype,"openlibrary_work",null);s([n()],a.prototype,"operator",null);s([n()],a.prototype,"originalurl",null);s([n()],a.prototype,"osf_category",null);s([n()],a.prototype,"osf_project",null);s([n()],a.prototype,"osf_registration_doi",null);s([n()],a.prototype,"osf_registration_schema",null);s([n()],a.prototype,"osf_registry",null);s([n()],a.prototype,"osf_subjects",null);s([n()],a.prototype,"osf_tags",null);s([n()],a.prototype,"output_time_minutes",null);s([n()],a.prototype,"pacer_case_num",null);s([n()],a.prototype,"packaging_time_minutes",null);s([n()],a.prototype,"page_number_confidence",null);s([n()],a.prototype,"page_number_module_version",null);s([n()],a.prototype,"page_progression",null);s([n()],a.prototype,"paginated",null);s([n()],a.prototype,"parse_date",null);s([n()],a.prototype,"parse_state",null);s([n()],a.prototype,"partner",null);s([n()],a.prototype,"pashto_title",null);s([n()],a.prototype,"pashto_title_romanized",null);s([n()],a.prototype,"pdf_degraded",null);s([n()],a.prototype,"pdf_module_version",null);s([n()],a.prototype,"pick",null);s([n()],a.prototype,"podcastindexid",null);s([n()],a.prototype,"post_text",null);s([n()],a.prototype,"ppi",null);s([n()],a.prototype,"previous_item",null);s([n()],a.prototype,"program",null);s([n()],a.prototype,"publicdate",null);s([n()],a.prototype,"publisher",null);s([n()],a.prototype,"political_religious_party",null);s([n()],a.prototype,"rcs_key",null);s([n()],a.prototype,"repub_state",null);s([n()],a.prototype,"republisher_date",null);s([n()],a.prototype,"republisher_operator",null);s([n()],a.prototype,"republisher_time",null);s([n()],a.prototype,"reviewdate",null);s([n()],a.prototype,"reviews_allowed",null);s([n()],a.prototype,"ribbon_state",null);s([n()],a.prototype,"ribbon_state_modify_date",null);s([n()],a.prototype,"rights",null);s([n()],a.prototype,"rights_holder",null);s([n()],a.prototype,"rssfeed",null);s([n()],a.prototype,"runtime",null);s([n()],a.prototype,"scan_time_minutes",null);s([n()],a.prototype,"scandate",null);s([n()],a.prototype,"scanfee",null);s([n()],a.prototype,"scanner",null);s([n()],a.prototype,"scanner_operator",null);s([n()],a.prototype,"scanningcenter",null);s([n()],a.prototype,"scribe3_search_catalog",null);s([n()],a.prototype,"scribe3_search_id",null);s([n()],a.prototype,"segments",null);s([n()],a.prototype,"sessionid",null);s([n()],a.prototype,"shndiscs",null);s([n()],a.prototype,"shotlist",null);s([n()],a.prototype,"signal_path",null);s([n()],a.prototype,"size",null);s([n()],a.prototype,"sizehint",null);s([n()],a.prototype,"software_version",null);s([n()],a.prototype,"sort_order",null);s([n()],a.prototype,"sound",null);s([n()],a.prototype,"soundcreator",null);s([n()],a.prototype,"soundtitle",null);s([n()],a.prototype,"source",null);s([n()],a.prototype,"source_pixel_height",null);s([n()],a.prototype,"source_pixel_width",null);s([n()],a.prototype,"source_url",null);s([n()],a.prototype,"sponsor",null);s([n()],a.prototype,"sponsordate",null);s([n()],a.prototype,"start_localtime",null);s([n()],a.prototype,"start_time",null);s([n()],a.prototype,"station_name",null);s([n()],a.prototype,"stop_time",null);s([n()],a.prototype,"subject",null);s([n()],a.prototype,"taper",null);s([n()],a.prototype,"thumbs",null);s([n()],a.prototype,"times",null);s([n()],a.prototype,"title",null);s([n()],a.prototype,"title_alt_script",null);s([n()],a.prototype,"transferer",null);s([n()],a.prototype,"track",null);s([n()],a.prototype,"tts_version",null);s([n()],a.prototype,"tuner",null);s([n()],a.prototype,"type",null);s([n()],a.prototype,"updatedate",null);s([n()],a.prototype,"updater",null);s([n()],a.prototype,"uploader",null);s([n()],a.prototype,"uploadsoftware",null);s([n()],a.prototype,"utc_offset",null);s([n()],a.prototype,"venue",null);s([n()],a.prototype,"video_codec",null);s([n()],a.prototype,"volume",null);s([n()],a.prototype,"website",null);s([n()],a.prototype,"week",null);s([n()],a.prototype,"width",null);s([n()],a.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ae(this.rawValue,e=>ze.shared.parseValue(e),"reviewdate")}get createdate(){return ae(this.rawValue,e=>ze.shared.parseValue(e),"createdate")}get stars(){return ae(this.rawValue,e=>re.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}s([n()],me.prototype,"reviewdate",null);s([n()],me.prototype,"createdate",null);s([n()],me.prototype,"stars",null);class fn{constructor(e){var t,o;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ce(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new a(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(o=e.reviews)===null||o===void 0?void 0:o.map(c=>new me(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Te;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Te||(Te={}));class rr extends Error{constructor(e,t,o){super(t),this.name=e,this.type=e,this.details=o}}class mn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const o=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${o}`;return this.fetchUrl(c)}async fetchUrl(e,t){var o;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let d;try{const m=(o=t?.requestOptions)!==null&&o!==void 0?o:{credentials:this.includeCredentials?"include":"same-origin"};d=await fetch(c.href,m)}catch(m){const y=m instanceof Error?m.message:typeof m=="string"?m:"Unknown error";return this.getErrorResult(Te.networkError,y)}try{const m=await d.json(),y=m.error;if(y){const b=m.forensics;return this.getErrorResult(Te.searchEngineError,y,b)}else return{success:m}}catch(m){const y=m instanceof Error?m.message:typeof m=="string"?m:"Unknown error";return this.getErrorResult(Te.decodingError,y)}}getErrorResult(e,t,o){return{error:new rr(e,t,o)}}}class Yr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const o=await this.backend.fetchMetadata(e);return o.error?o:((t=o.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new rr(Te.itemNotFound)}:{success:new fn(o.success)}}async fetchMetadataValue(e,t){var o;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((o=c.success)===null||o===void 0?void 0:o.result)===void 0?{error:new rr(Te.itemNotFound)}:{success:c.success.result}}}Yr.default=new Yr(new mn);function Xr(r){return new Promise(e=>setTimeout(e,r))}class ir{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const o=t?.headers.get("Retry-After");if(o){const c=parseInt(o,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}ir.shared=new ir;class nr{shouldRetry(){return!1}retryDelay(){return null}}nr.shared=new nr;class lr{}lr.default=ir.shared;lr.noRetry=nr.shared;const gi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class gn{constructor(e){this.retryConfig=lr.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const o=gi(t);return await this.doFetchRetry(e,0,o)}async doFetchRetry(e,t,o){var c,d;const m=typeof e=="string"?e:e.url;try{const y=await fetch(e,o?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const b=(c=o?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(b.shouldRetry(y,t)){const $=b.retryDelay(t,y);if($!==null)return await Xr($),this.logRetryEvent(m,t,y.statusText,y.status),this.doFetchRetry(e,t+1,o)}return this.logFailureEvent(m,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(m,y),y;const b=(d=o?.retryConfig)!==null&&d!==void 0?d:this.retryConfig;if(b.shouldRetry(null,t)){const $=b.retryDelay(t);if($!==null)return await Xr($),this.logRetryEvent(m,t,y,y),this.doFetchRetry(e,t+1,o)}throw this.logFailureEvent(m,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,o,c){var d;(d=this.analyticsHandler)===null||d===void 0||d.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${o}, url: ${e}`})}logFailureEvent(e,t){var o;(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const o=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${o}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var o;(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const yn=new Set(["POST","PUT","DELETE","PATCH"]);class cr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new gn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let o=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const m=typeof e=="string"?e:e.url;o=this.addSearchParams(m,{reCache:"1"})}const d=await this.withCsrfToken(o,t);return this.fetchRetrier.fetchRetry(o,d)}async fetchApiResponse(e,t){const o={};t?.includeCredentials&&(o.credentials="include"),t?.method&&(o.method=t.method),t?.body&&(o.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((b,B)=>{c.set(B,b)}),o.headers=c;const d=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(d,{requestInit:o,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const o=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(o,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var o,c,d,m;if(!this.getCsrfToken)return t;const y=(o=gi(t))!==null&&o!==void 0?o:{};if(!y.includeCsrfToken)return t;const b=(c=y.requestInit)!==null&&c!==void 0?c:{},B=((m=(d=b.method)!==null&&d!==void 0?d:typeof e!="string"?e.method:void 0)!==null&&m!==void 0?m:"GET").toUpperCase();if(!yn.has(B))return t;const $=new Headers(b.headers);return $.has("X-CSRF-Token")?t:($.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{...b,headers:$}})}addSearchParams(e,t){const o=e.indexOf("#"),c=o===-1?"":e.slice(o),d=o===-1?e:e.slice(0,o),m=d.indexOf("?"),y=m===-1?d:d.slice(0,m),b=new URLSearchParams(m===-1?"":d.slice(m+1)),B=cr.asSearchParams(t),$=new Set;B.forEach((Ze,le)=>{$.has(le)||($.add(le),b.delete(le))}),B.forEach((Ze,le)=>{b.append(le,Ze)});const te=b.toString();return`${y}${te?`?${te}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([o,c])=>{c!=null&&t.append(o,String(c))}),t}}class yi extends cr{constructor(e){var t;const o={...e};o.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(o)}}const vn="/write-review.php",_n="/edit-reviews.php";class vi{constructor(e){this.fetchHandler=e?.fetchHandler??new yi,this.baseHost=e?.baseHost??"https://archive.org",this.submitPath=e?.submitPath??vn,this.deletePath=e?.deletePath??_n,this.deleteMethod=e?.deleteMethod??"POST"}async submitReview(e){const t=new URLSearchParams;return t.append("identifier",e.identifier),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_stars",e.stars??"0"),e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:t})}async deleteReview(e){const t=new URLSearchParams;t.append("identifier",e.identifier),t.append("deleteReviewer",e.reviewer),e.reviewerItemname&&t.append("deleteReviewerItemname",e.reviewerItemname);const o=`${this.baseHost}${this.deletePath}?${t.toString()}`;return this.request(o,{method:this.deleteMethod})}async request(e,t){try{const o=await this.fetchHandler.fetch(e,{requestInit:{method:t.method,body:t.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(o)}catch(o){return console.error("Review request failed",o),{success:!1,error:this.genericError}}}async parseResult(e){let t;try{t=await e.json()}catch{t=void 0}return e.ok?!t||t.success?{success:!0}:{success:!1,error:t.error??this.genericError}:{success:!1,error:t?.error??this.genericError}}get genericError(){return S("Sorry, something went wrong. Please try again later.")}}function wn(r){return!!(r.token||r.endpointPath||r.fetchHandler)}class bn{constructor(e){this.token=e.token??"",this.submitUrl=`${e.baseHost}${e.endpointPath??"/write-review.php"}`,this.deleteUrl=`${e.baseHost}/edit-reviews.php`,this.fetchHandler=e.fetchHandler??new yi}async submitReview(e){const t=new URLSearchParams;e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("field_stars",e.stars??"0"),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_reviewtoken",this.token),e.identifier&&t.append("identifier",e.identifier),t.append("submitter","review-form");try{const o=await this.fetchHandler.fetchApiResponse(this.submitUrl,{method:"POST",includeCredentials:!0,body:t});return o?.success===!0?{success:!0}:{success:!1,error:o?.error}}catch(o){return console.error("Review request failed",o),{success:!1}}}async deleteReview(e){const t=new URLSearchParams({identifier:e.identifier,deleteReviewer:e.reviewer,deleteReviewerItemname:e.reviewerItemname??"",csrf_token:this.token});try{const o=await fetch(`${this.deleteUrl}?${t}`,{method:"POST"});if(!o.ok)throw new Error(`Delete failed: ${o.status}`);return{success:!0}}catch(o){return console.error("Review request failed",o),{success:!1}}}}function ur(r){return new bn(r)}const Tn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Kr(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return _`<span title="${r}">${t}</span>`}function Zr(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,o=Array(e);t<e;t++)o[t]=r[t];return o}function Sn(r){if(Array.isArray(r))return r}function En(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var o,c,d,m,y=[],b=!0,B=!1;try{if(d=(t=t.call(r)).next,e!==0)for(;!(b=(o=d.call(t)).done)&&(y.push(o.value),y.length!==e);b=!0);}catch($){B=!0,c=$}finally{try{if(!b&&t.return!=null&&(m=t.return(),Object(m)!==m))return}finally{if(B)throw c}}return y}}function Rn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function An(r,e){return Sn(r)||En(r,e)||xn(r,e)||Rn()}function xn(r,e){if(r){if(typeof r=="string")return Zr(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Zr(r,e):void 0}}const _i=Object.entries,Jr=Object.setPrototypeOf,Cn=Object.isFrozen,Ln=Object.getPrototypeOf,kn=Object.getOwnPropertyDescriptor;let U=Object.freeze,z=Object.seal,Ne=Object.create,wi=typeof Reflect<"u"&&Reflect,sr=wi.apply,or=wi.construct;U||(U=function(e){return e});z||(z=function(e){return e});sr||(sr=function(e,t){for(var o=arguments.length,c=new Array(o>2?o-2:0),d=2;d<o;d++)c[d-2]=arguments[d];return e.apply(t,c)});or||(or=function(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),c=1;c<t;c++)o[c-1]=arguments[c];return new e(...o)});const be=N(Array.prototype.forEach),Dn=N(Array.prototype.lastIndexOf),Qr=N(Array.prototype.pop),qe=N(Array.prototype.push),On=N(Array.prototype.splice),Ue=Array.isArray,Ke=N(String.prototype.toLowerCase),Wt=N(String.prototype.toString),ei=N(String.prototype.match),Ye=N(String.prototype.replace),ti=N(String.prototype.indexOf),Pn=N(String.prototype.trim),In=N(Number.prototype.toString),Mn=N(Boolean.prototype.toString),ri=typeof BigInt>"u"?null:N(BigInt.prototype.toString),ii=typeof Symbol>"u"?null:N(Symbol.prototype.toString),q=N(Object.prototype.hasOwnProperty),Xe=N(Object.prototype.toString),j=N(RegExp.prototype.test),he=Nn(TypeError);function N(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,o=new Array(t>1?t-1:0),c=1;c<t;c++)o[c-1]=arguments[c];return sr(r,e,o)}}function Nn(r){return function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return or(r,t)}}function R(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ke;if(Jr&&Jr(r,null),!Ue(e))return r;let o=e.length;for(;o--;){let c=e[o];if(typeof c=="string"){const d=t(c);d!==c&&(Cn(e)||(e[o]=d),c=d)}r[c]=!0}return r}function $n(r){for(let e=0;e<r.length;e++)q(r,e)||(r[e]=null);return r}function K(r){const e=Ne(null);for(const o of _i(r)){var t=An(o,2);const c=t[0],d=t[1];q(r,c)&&(Ue(d)?e[c]=$n(d):d&&typeof d=="object"&&d.constructor===Object?e[c]=K(d):e[c]=d)}return e}function Fn(r){switch(typeof r){case"string":return r;case"number":return In(r);case"boolean":return Mn(r);case"bigint":return ri?ri(r):"0";case"symbol":return ii?ii(r):"Symbol()";case"undefined":return Xe(r);case"function":case"object":{if(r===null)return Xe(r);const e=r,t=Q(e,"toString");if(typeof t=="function"){const o=t(e);return typeof o=="string"?o:Xe(o)}return Xe(r)}default:return Xe(r)}}function Q(r,e){for(;r!==null;){const o=kn(r,e);if(o){if(o.get)return N(o.get);if(typeof o.value=="function")return N(o.value)}r=Ln(r)}function t(){return null}return t}function Un(r){try{return j(r,""),!0}catch{return!1}}const ni=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),qt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zn=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Yt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hn=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),si=U(["#text"]),oi=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Xt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ai=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ft=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bn=z(/{{[\w\W]*|^[\w\W]*}}/g),jn=z(/<%[\w\W]*|^[\w\W]*%>/g),Vn=z(/\${[\w\W]*/g),Wn=z(/^data-[\-\w.\u00B7-\uFFFF]+$/),Gn=z(/^aria-[\-\w]+$/),li=z(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),qn=z(/^(?:\w+script|data):/i),Yn=z(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xn=z(/^html$/i),Kn=z(/^[a-z][.\w]*(-[.\w]+)+$/i),ci=z(/<[/\w!]/g),ui=z(/<[/\w]/g),Zn=z(/<\/no(script|embed|frames)/i),Jn=z(/\/>/i),X={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Qn=U(R({},bi)),es=(function(){const r={};return be(bi,e=>{r[e]=z(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(r)})(),ts=function(){return typeof window>"u"?null:window},rs=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let o=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(o=t.getAttribute(c));const d="dompurify"+(o?"#"+o:"");try{return e.createPolicy(d,{createHTML(m){return m},createScriptURL(m){return m}})}catch{return console.warn("TrustedTypes policy "+d+" could not be created."),null}},di=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,o,c){return q(e,t)&&Ue(e[t])?R(c.base?K(c.base):{},e[t],c.transform):o},Kt=function(e,t,o){const c=q(e,t)?e[t]:void 0;return c&&typeof c=="object"?K(c):o()};function Ti(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ts();const e=h=>Ti(h);if(e.version="3.4.16",e.removed=[],!r||!r.document||r.document.nodeType!==X.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const o=t,c=o.currentScript;r.DocumentFragment;const d=r.HTMLTemplateElement,m=r.Node,y=r.Element,b=r.NodeFilter;r.NamedNodeMap===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const B=r.DOMParser,$=r.trustedTypes,te=y.prototype,Ze=Q(te,"cloneNode"),le=Q(te,"remove"),pr=Q(te,"removeAttributeNode"),Si=Q(te,"nextSibling"),Se=Q(te,"childNodes"),Ee=Q(te,"parentNode"),hr=Q(te,"shadowRoot"),Et=Q(te,"attributes"),ge=m&&m.prototype?Q(m.prototype,"nodeType"):null,Re=m&&m.prototype?Q(m.prototype,"nodeName"):null,Je=m&&m.prototype?Q(m.prototype,"ownerDocument"):null,Be=function(i){return ge?ge(i):i.nodeType},Rt=function(i){return Re?Re(i):i.nodeName};if(typeof d=="function"){const h=t.createElement("template");h.content&&h.content.ownerDocument&&(t=h.content.ownerDocument)}let G,ye="",At,fr=!1,je=0;const mr=function(){if(je>0)throw he('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ae=function(i){mr(),je++;try{return G.createHTML(i)}finally{je--}},Ei=function(i){mr(),je++;try{return G.createScriptURL(i)}finally{je--}},Ri=function(){return fr||(At=rs($,c),fr=!0),At},Qe=t,xt=Qe.implementation,gr=Qe.createNodeIterator,Ai=Qe.createDocumentFragment,xi=Qe.getElementsByTagName,Ci=o.importNode;let L=di();e.isSupported=typeof _i=="function"&&typeof Ee=="function"&&xt&&xt.createHTMLDocument!==void 0;const Li=Bn,ki=jn,Di=Vn,Oi=Wn,Pi=Gn,Ii=qn,yr=Yn,Mi=Kn;let vr=li,k=null;const Ct=R({},[...ni,...Gt,...qt,...Yt,...si]);let D=null;const Lt=R({},[...oi,...Xt,...ai,...ft]);let ie=Object.seal(Ne(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,_r=null;const ue=Object.seal(Ne(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let wr=!0,kt=!0,br=!1,Tr=!0,de=!1,ve=!0,_e=!1,Dt=!1,et=null,tt=null,Ot=!1,xe=!1,rt=!1,it=!1,Sr=!0,Er=!1;const Rr="user-content-";let Pt=!0,It=!1,Ce={},Le=null;const Ar=R({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let xr=null;const Cr=R({},["audio","video","img","source","image","track"]);let Lr=null;const kr=R({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),nt="http://www.w3.org/1998/Math/MathML",st="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml";let ke=ne,Mt=!1,Nt=null;const Ni=R({},[nt,st,ne],Wt),Dr=U(["mi","mo","mn","ms","mtext"]);let $t=R({},Dr);const Or=U(["annotation-xml"]);let Ft=R({},Or);const $i=R({},["title","style","font","a","script"]);let We=null;const Fi=["application/xhtml+xml","text/html"],Ui="text/html";let M=null,De=null;const zi=t.createElement("form"),Pr=function(i){return i instanceof RegExp||i instanceof Function},Ut=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(De&&De===i)return;(!i||typeof i!="object")&&(i={}),i=K(i),We=Fi.indexOf(i.PARSER_MEDIA_TYPE)===-1?Ui:i.PARSER_MEDIA_TYPE,M=We==="application/xhtml+xml"?Wt:Ke,k=fe(i,"ALLOWED_TAGS",Ct,{transform:M}),D=fe(i,"ALLOWED_ATTR",Lt,{transform:M}),Nt=fe(i,"ALLOWED_NAMESPACES",Ni,{transform:Wt}),Lr=fe(i,"ADD_URI_SAFE_ATTR",kr,{transform:M,base:kr}),xr=fe(i,"ADD_DATA_URI_TAGS",Cr,{transform:M,base:Cr}),Le=fe(i,"FORBID_CONTENTS",Ar,{transform:M}),Ve=fe(i,"FORBID_TAGS",K({}),{transform:M}),_r=fe(i,"FORBID_ATTR",K({}),{transform:M}),Ce=q(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?K(i.USE_PROFILES):i.USE_PROFILES:!1,wr=i.ALLOW_ARIA_ATTR!==!1,kt=i.ALLOW_DATA_ATTR!==!1,br=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Tr=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,de=i.SAFE_FOR_TEMPLATES||!1,ve=i.SAFE_FOR_XML!==!1,_e=i.WHOLE_DOCUMENT||!1,xe=i.RETURN_DOM||!1,rt=i.RETURN_DOM_FRAGMENT||!1,it=i.RETURN_TRUSTED_TYPE||!1,Ot=i.FORCE_BODY||!1,Sr=i.SANITIZE_DOM!==!1,Er=i.SANITIZE_NAMED_PROPS||!1,Pt=i.KEEP_CONTENT!==!1,It=i.IN_PLACE||!1,vr=Un(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:li,ke=typeof i.NAMESPACE=="string"?i.NAMESPACE:ne,$t=Kt(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>R({},Dr)),Ft=Kt(i,"HTML_INTEGRATION_POINTS",()=>R({},Or));const l=Kt(i,"CUSTOM_ELEMENT_HANDLING",()=>Ne(null));if(ie=Ne(null),q(l,"tagNameCheck")&&Pr(l.tagNameCheck)&&(ie.tagNameCheck=l.tagNameCheck),q(l,"attributeNameCheck")&&Pr(l.attributeNameCheck)&&(ie.attributeNameCheck=l.attributeNameCheck),q(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),z(ie),de&&(kt=!1),rt&&(xe=!0),Ce&&(k=R({},si),D=Ne(null),Ce.html===!0&&(R(k,ni),R(D,oi)),Ce.svg===!0&&(R(k,Gt),R(D,Xt),R(D,ft)),Ce.svgFilters===!0&&(R(k,qt),R(D,Xt),R(D,ft)),Ce.mathMl===!0&&(R(k,Yt),R(D,ai),R(D,ft))),ue.tagCheck=null,ue.attributeCheck=null,q(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?ue.tagCheck=i.ADD_TAGS:Ue(i.ADD_TAGS)&&(k===Ct&&(k=K(k)),R(k,i.ADD_TAGS,M))),q(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?ue.attributeCheck=i.ADD_ATTR:Ue(i.ADD_ATTR)&&(D===Lt&&(D=K(D)),R(D,i.ADD_ATTR,M))),q(i,"ADD_FORBID_CONTENTS")&&Ue(i.ADD_FORBID_CONTENTS)&&(Le===Ar&&(Le=K(Le)),R(Le,i.ADD_FORBID_CONTENTS,M)),Pt&&(k["#text"]=!0),_e&&R(k,["html","head","body"]),k.table&&(R(k,["tbody"]),delete Ve.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw he('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const p=G;G=i.TRUSTED_TYPES_POLICY;try{ye=Ae("")}catch(f){throw G=p,f}}else i.TRUSTED_TYPES_POLICY===null?(G=void 0,ye=""):(G===void 0&&(G=Ri()),G&&typeof ye=="string"&&(ye=Ae("")));U&&U(i),De=i},Ir=R({},[...Gt,...qt,...zn]),Mr=R({},[...Yt,...Hn]),Hi=function(i,l,p){return l.namespaceURI===ne?i==="svg":l.namespaceURI===nt?i==="svg"&&(p==="annotation-xml"||$t[p]):!!Ir[i]},Bi=function(i,l,p){return l.namespaceURI===ne?i==="math":l.namespaceURI===st?i==="math"&&Ft[p]:!!Mr[i]},ji=function(i,l,p){return l.namespaceURI===st&&!Ft[p]||l.namespaceURI===nt&&!$t[p]?!1:!Mr[i]&&($i[i]||!Ir[i])},Vi=function(i){let l=Ee(i);(!l||!l.tagName)&&(l={namespaceURI:ke,tagName:"template"});const p=Ke(i.tagName),f=Ke(l.tagName);return Nt[i.namespaceURI]?i.namespaceURI===st?Hi(p,l,f):i.namespaceURI===nt?Bi(p,l,f):i.namespaceURI===ne?ji(p,l,f):!!(We==="application/xhtml+xml"&&Nt[i.namespaceURI]):!1},pe=function(i){qe(e.removed,{element:i});try{Ee(i).removeChild(i)}catch{if(le(i),!Ee(i))throw he("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Nr=function(i,l,p){try{pr(i,l)}catch{try{i.removeAttribute(p)}catch{}}},ot=function(i){at(i);const l=Se(i);if(l){const f=[];be(l,g=>{qe(f,g)}),be(f,g=>{try{le(g)}catch{}})}const p=Et(i);if(p)for(let f=p.length-1;f>=0;--f){const g=p[f],T=g&&g.name;typeof T=="string"&&Nr(i,g,T)}},we=function(i,l,p){if(!p)try{p=l.getAttributeNode(i)}catch{p=null}qe(e.removed,{attribute:p||null,from:l});try{p?pr(l,p):l.removeAttribute(i)}catch{try{l.removeAttribute(i)}catch{}}if(i==="is")if(xe||rt)try{pe(l)}catch{}else try{l.setAttribute(i,"")}catch{}},Wi=function(i){const l=Et(i);if(l)for(let p=l.length-1;p>=0;--p){const f=l[p],g=f&&f.name;typeof g!="string"||D[M(g)]||Nr(i,f,g)}},at=function(i){const l=[i];for(;l.length>0;){const p=l.pop();Be(p)===X.element&&Wi(p);const f=Se(p);if(f)for(let g=f.length-1;g>=0;--g)l.push(f[g])}},$r=function(i,l){return ve?i==="patchsrc"?!0:i==="for"&&l!=="label"&&l!=="output":!1},Gi=function(i){if(!ve)return;const l=[i];for(;l.length>0;){const p=l.pop(),f=Be(p);if(f===X.processingInstruction||f===X.comment&&j(ui,p.data)){try{le(p)}catch{}continue}if(f===X.element){const T=p,E=M(Rt(p));try{T.hasAttribute&&T.hasAttribute("patchsrc")&&T.removeAttribute("patchsrc"),T.hasAttribute&&T.hasAttribute("for")&&$r("for",E)&&T.removeAttribute("for")}catch{}}const g=Se(p);if(g)for(let T=g.length-1;T>=0;--T)l.push(g[T])}},Fr=function(i){let l=null,p=null;if(Ot)i="<remove></remove>"+i;else{const T=ei(i,/^[\r\n\t ]+/);p=T&&T[0]}We==="application/xhtml+xml"&&ke===ne&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const f=G?Ae(i):i;if(ke===ne)try{l=new B().parseFromString(f,We)}catch{}if(!l||!l.documentElement){l=xt.createDocument(ke,"template",null);try{l.documentElement.innerHTML=Mt?ye:f}catch{}}const g=l.body||l.documentElement;return i&&p&&g.insertBefore(t.createTextNode(p),g.childNodes[0]||null),ke===ne?xi.call(l,_e?"html":"body")[0]:_e?l.documentElement:g},Ur=function(i){const l=Je?Je(i):i.ownerDocument;return gr.call(l||i,i,b.SHOW_ELEMENT|b.SHOW_COMMENT|b.SHOW_TEXT|b.SHOW_PROCESSING_INSTRUCTION|b.SHOW_CDATA_SECTION,null)},lt=function(i){return i=Ye(i,Li," "),i=Ye(i,ki," "),i=Ye(i,Di," "),i},zt=function(i){var l;i.normalize();const p=Je?Je(i):i.ownerDocument,f=gr.call(p||i,i,b.SHOW_TEXT|b.SHOW_COMMENT|b.SHOW_CDATA_SECTION|b.SHOW_PROCESSING_INSTRUCTION,null);let g=f.nextNode();for(;g;)g.data=lt(g.data),g=f.nextNode();const T=(l=i.querySelectorAll)===null||l===void 0?void 0:l.call(i,"template");T&&be(T,E=>{Oe(E.content)&&zt(E.content)})},ct=function(i){const l=Re?Re(i):null;return typeof l!="string"||M(l)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==Et(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ge(i)||i.childNodes!==Se(i)},Oe=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return ge(i)===X.documentFragment}catch{return!1}},Ge=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return typeof ge(i)=="number"}catch{return!1}};function se(h,i,l){h.length!==0&&be(h,p=>{p.call(e,i,l,De)})}const qi=function(i,l){return!!(ve&&i.hasChildNodes()&&!Ge(i.firstElementChild)&&j(ci,i.textContent)&&j(ci,i.innerHTML)||ve&&i.namespaceURI===ne&&Qn[l]&&(Ge(i.firstElementChild)||typeof i.textContent=="string"&&j(es[l],i.textContent))||i.nodeType===X.processingInstruction||ve&&i.nodeType===X.comment&&j(ui,i.data))},ut=function(i,l){if(i instanceof RegExp)return j(i,l);if(i instanceof Function){for(var p=arguments.length,f=new Array(p>2?p-2:0),g=2;g<p;g++)f[g-2]=arguments[g];return!!i(l,...f)}return!1},Yi=function(i,l,p){if(!Ve[l]&&jr(l)&&ut(ie.tagNameCheck,l))return!1;if(Pt&&!Le[l]){const f=Ee(i),g=Se(i);if(g&&f){const T=g.length;for(let E=T-1;E>=0;--E){const I=i===p?Ze(g[E],!0):g[E];f.insertBefore(I,Si(i))}}}return pe(i),!0},zr=function(i,l,p,f){return i.length===0?l:l===p||l===f?K(l):l},Pe=function(i,l){return i===l||Ee(i)!==null?!1:(It&&at(i),!0)},Hr=function(i,l){if(se(L.beforeSanitizeElements,i,null),Pe(i,l))return!0;if(ct(i))return pe(i),!0;const p=M(Rt(i));if(k=zr(L.uponSanitizeElement,k,Ct,et),se(L.uponSanitizeElement,i,{tagName:p,allowedTags:k}),Pe(i,l))return!0;if(qi(i,p))return pe(i),!0;if(Ve[p]||!(ue.tagCheck instanceof Function&&ue.tagCheck(p))&&!k[p]){const f=Yi(i,p,l);return f===!1&&(se(L.afterSanitizeElements,i,null),Pe(i,l))?!0:f}if(Be(i)===X.element&&!Vi(i)||(p==="noscript"||p==="noembed"||p==="noframes")&&j(Zn,i.innerHTML))return pe(i),!0;if(de&&i.nodeType===X.text){const f=lt(i.textContent);i.textContent!==f&&(qe(e.removed,{element:i.cloneNode()}),i.textContent=f)}return se(L.afterSanitizeElements,i,null),Pe(i,l)},Br=function(i,l,p){if(_r[l]||$r(l,i)||Sr&&(l==="id"||l==="name")&&(p in t||p in zi))return!1;const f=D[l]||ue.attributeCheck instanceof Function&&ue.attributeCheck(l,i);return kt&&j(Oi,l)||wr&&j(Pi,l)?!0:f?Lr[l]||j(vr,Ye(p,yr,""))||(l==="src"||l==="xlink:href"||l==="href")&&i!=="script"&&ti(p,"data:")===0&&xr[i]||br&&!j(Ii,Ye(p,yr,""))?!0:!p:jr(i)&&ut(ie.tagNameCheck,i)&&ut(ie.attributeNameCheck,l,i)||l==="is"&&ie.allowCustomizedBuiltInElements&&ut(ie.tagNameCheck,p)},Xi=R({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),jr=function(i){return!Xi[Ke(i)]&&j(Mi,i)},Ki=function(i,l,p,f){if(G&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!p)switch($.getAttributeType(i,l)){case"TrustedHTML":return Ae(f);case"TrustedScriptURL":return Ei(f)}return f},Zi=function(i,l,p,f){try{return p?i.setAttributeNS(p,l,f):i.setAttribute(l,f),ct(i)?(pe(i),!1):!0}catch{return we(l,i),!1}},Vr=function(i,l){if(se(L.beforeSanitizeAttributes,i,null),Pe(i,l))return;const p=i.attributes;if(!p||ct(i))return;D=zr(L.uponSanitizeAttribute,D,Lt,tt);const f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:D,forceKeepAttr:void 0};let g=p.length;const T=M(i.nodeName);for(;g--;){const E=p[g],I=E.name,J=E.namespaceURI,Y=E.value,Ie=M(I),Bt=Y;let V=I==="value"?Bt:Pn(Bt),Wr=!1;if(f.attrName=Ie,f.attrValue=V,f.keepAttr=!0,f.forceKeepAttr=void 0,se(L.uponSanitizeAttribute,i,f),V=f.attrValue,Er&&(Ie==="id"||Ie==="name")&&ti(V,Rr)!==0&&(we(I,i,E),V=Rr+V,Wr=!0),ve&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(I,i,E);continue}if(Ie==="attributename"&&ei(V,"href")){we(I,i,E);continue}if(!f.forceKeepAttr){if(!f.keepAttr){we(I,i,E);continue}if(!Tr&&j(Jn,V)){we(I,i,E);continue}if(de&&(V=lt(V)),!Br(T,Ie,V)){we(I,i,E);continue}V=Ki(T,Ie,J,V),V!==Bt&&Zi(i,I,J,V)&&Wr&&Qr(e.removed)}}se(L.afterSanitizeAttributes,i,null),Pe(i,l)},dt=function(i){let l=null;const p=Ur(i);for(se(L.beforeSanitizeShadowDOM,i,null);l=p.nextNode();)if(se(L.uponSanitizeShadowNode,l,null),Hr(l,i),Vr(l,i),Oe(l.content)&&dt(l.content),Be(l)===X.element){const f=hr(l);Oe(f)&&(Ht(f),dt(f))}se(L.afterSanitizeShadowDOM,i,null)},Ht=function(i){const l=[{node:i,shadow:null}];for(;l.length>0;){const p=l.pop();if(p.shadow){dt(p.shadow);continue}const f=p.node,g=Be(f)===X.element,T=Se(f);if(T)for(let E=T.length-1;E>=0;--E)l.push({node:T[E],shadow:null});if(g){const E=Re?Re(f):null;if(typeof E=="string"&&M(E)==="template"){const I=f.content;Oe(I)&&l.push({node:I,shadow:null})}}if(g){const E=hr(f);Oe(E)&&l.push({node:null,shadow:E},{node:E,shadow:null})}}};return e.sanitize=function(h){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,p=null,f=null,g=null;if(Mt=!h,Mt&&(h="<!-->"),typeof h!="string"&&!Ge(h)&&(h=Fn(h),typeof h!="string"))throw he("dirty is not a string, aborting");if(!e.isSupported)return h;Dt?(k=et,D=tt):Ut(i),(L.uponSanitizeElement.length>0||L.uponSanitizeAttribute.length>0)&&(k=K(k)),L.uponSanitizeAttribute.length>0&&(D=K(D)),e.removed=[];const T=It&&typeof h!="string"&&Ge(h);if(T){Gi(h);const J=Rt(h);if(typeof J=="string"){const Y=M(J);if(!k[Y]||Ve[Y])throw ot(h),he("root node is forbidden and cannot be sanitized in-place")}if(ct(h))throw ot(h),he("root node is clobbered and cannot be sanitized in-place");try{Ht(h)}catch(Y){throw ot(h),Y}}else if(Ge(h))l=Fr("<!---->"),p=l.ownerDocument.importNode(h,!0),p.nodeType===X.element&&p.nodeName==="BODY"||p.nodeName==="HTML"?l=p:l.appendChild(p),Ht(l);else{if(!xe&&!de&&!_e&&h.indexOf("<")===-1)return G&&it?Ae(h):h;if(l=Fr(h),!l)return xe?null:it?ye:""}l&&Ot&&pe(l.firstChild);const E=T?h:l;try{const J=Ur(E);for(;f=J.nextNode();)Hr(f,E),Vr(f,E),Oe(f.content)&&dt(f.content)}catch(J){throw T&&(ot(h),be(e.removed,Y=>{Y.element&&at(Y.element)})),J}if(T){let J=!1;if(be(e.removed,Y=>{Y.element&&(Y.element===h&&(J=!0),at(Y.element))}),J)throw he("a node selected for removal could not be safely returned; refusing to sanitize in place");return de&&zt(h),h}if(xe){if(de&&zt(l),rt)for(g=Ai.call(l.ownerDocument);l.firstChild;)g.appendChild(l.firstChild);else g=l;return(D.shadowroot||D.shadowrootmode)&&(g=Ci.call(o,g,!0)),g}let I=_e?l.outerHTML:l.innerHTML;return _e&&k["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&j(Xn,l.ownerDocument.doctype.name)&&(I="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+I),de&&(I=lt(I)),G&&it?Ae(I):I},e.setConfig=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ut(h),Dt=!0,et=k,tt=D},e.clearConfig=function(){De=null,Dt=!1,et=null,tt=null,G=At,ye=""},e.isValidAttribute=function(h,i,l){De||Ut({});const p=M(h),f=M(i);return Br(p,f,l)},e.addHook=function(h,i){typeof i=="function"&&q(L,h)&&qe(L[h],i)},e.removeHook=function(h,i){if(q(L,h)){if(i!==void 0){const l=Dn(L[h],i);return l===-1?void 0:On(L[h],l,1)[0]}return Qr(L[h])}},e.removeHooks=function(h){q(L,h)&&(L[h]=[])},e.removeAllHooks=function(){L=di()},e}var mt=Ti();const is=["a"];function ns(r){mt.addHook("afterSanitizeAttributes",ss);try{return mt.sanitize(r,{ALLOWED_TAGS:is})}finally{mt.removeHook("afterSanitizeAttributes")}}function ss(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function os(r,e=100,t=!0){if(r.length<e)return r;let o=e;if(t){const c=r.indexOf(" ",e),d=c-e<=20;if(d&&c===r.length-1)return r;c!==-1&&d&&(o=c)}return as(r,o,e)}function as(r,e,t){let o=r.slice(0,e);const c=o.match(/<a/gi);if(c){const d=o.match(/<\/a/gi);if(!d||d.length<c.length){const m=r.indexOf("</a>",e),y=m-t<=20;if(y&&r.length===m+4)return r;if(m!==-1&&y)o=r.slice(0,m+4);else{const b=o.lastIndexOf("<a");o=r.slice(0,b)}}}return o.concat("...")}const ls=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function cs(r){return r.replace(/href="([^"]+)"/,(o,c)=>`href="${c.replace(".","__DOT__")}"`).replace(ls,o=>`<a href="${(o.match(/^(https|http)/)?o:`https://${o}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${o}</a>`).replace("__DOT__",".")}function us(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const ds="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,ee=(r,e,t,o)=>{for(var c=o>1?void 0:o?hs(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(o?m(e,t,c):m(c))||c);return o&&c&&ps(e,t,c),c};let Z=class extends Tt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1}render(){return this.review?_`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?_`
                  <button
                    class="delete-btn"
                    title=${S("Delete this review")}
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${ds}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:F}
            <div class="top-line">
              <b>${S("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${S("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteOutcome?_`<i>${this.deleteOutcomeMessage}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:_`
          <div class="error">
            ${S("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return F;const e=ns(r),t=this.truncateContent(e,this.maxBodyLength);return _`${pi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?F:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?F:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return _`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${S("More...")}
      </button>
    `}get lessButtonTemplate(){return _`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${S("...Less")}
    </button>`}get reviewerTemplate(){return this.review?this.review.reviewer_itemname?_`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Kr(this.review.reviewer)}
            </a>
          `:_`${Kr(this.review.reviewer)}`:F}get starsTemplate(){return!this.review||!this.review.stars?F:_`
      <div
        class="review-stars"
        title=${S(Fe`${this.review.stars} out of 5 stars`)}
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>_`<div class="review-star">
              <img
                class="star-basic"
                src=${Tn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return F;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"});return r.getTime()!==e.getTime()?S(Fe`${t} (edited)`):t}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:os(r,e)}prepReview(r){return us(cs(r))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(S("Are you sure you want to delete this review?")))return;const r=await this.activeReviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteOutcome=r.success?{status:"queued"}:{status:"failed",error:r.error}}get activeReviewService(){return this.reviewService?this.reviewService:ur({token:this.csrfToken,baseHost:this.baseHost})}get deleteOutcomeMessage(){return this.deleteOutcome?.status==="queued"?S("This review has been queued for deletion."):this.deleteOutcome?.error??S("Sorry, we were unable to delete this review.")}static get styles(){return St`
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
    `}};ee([w({type:Object})],Z.prototype,"review",2);ee([w({type:String})],Z.prototype,"identifier",2);ee([w({type:Number})],Z.prototype,"maxSubjectLength",2);ee([w({type:Number})],Z.prototype,"maxBodyLength",2);ee([w({type:String})],Z.prototype,"baseHost",2);ee([w({type:Object})],Z.prototype,"reviewService",2);ee([w({type:String})],Z.prototype,"csrfToken",2);ee([w({type:Boolean})],Z.prototype,"canDelete",2);ee([w({type:Boolean})],Z.prototype,"bypassTruncation",2);ee([H()],Z.prototype,"showTruncatedContent",2);ee([H()],Z.prototype,"deleteOutcome",2);Z=ee([bt("ia-review"),ar()],Z);const fs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",ms="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var gs=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,P=(r,e,t,o)=>{for(var c=o>1?void 0:o?ys(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(o?m(e,t,c):m(c))||c);return o&&c&&gs(e,t,c),c};let C=class extends Tt{constructor(){super(...arguments),this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.recaptchaUnavailable=!1,this.formCanSubmit=!1,this.submissionInProgress=!1}render(){return _`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableErrorMessage?this.unrecoverableErrorTemplate:_`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate} ${this.hiddenInputsTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(r){r.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),r.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),(r.has("unrecoverableError")||r.has("recaptchaUnavailable"))&&(this.formCanSubmit=this.checkSubmissionAllowed()),(r.has("currentSubjectLength")||r.has("currentBodyLength")||r.has("maxSubjectLength")||r.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){const r=this.unrecoverableErrorMessage;return r?_`
          <div class="unrecoverable-error">
            <span class="error-msg">${r}</span>
          </div>
        `:F}get recoverableErrorTemplate(){const r=this.recoverableErrorMessage;return r?_`
          <div class="recoverable-error">
            ${pi(this.sanitizeErrorMsg(r))}
          </div>
        `:F}get unrecoverableErrorMessage(){return this.unrecoverableError?this.unrecoverableError:this.recaptchaUnavailable?this.recaptchaErrorMessage:void 0}get recoverableErrorMessage(){if(this.recoverableError)return this.recoverableError;switch(this.formError){case"recaptcha":return this.recaptchaErrorMessage;case"generic":return this.genericErrorMessage;default:return}}get recaptchaErrorMessage(){return S("Could not validate review. Please try again later.")}get genericErrorMessage(){return S("There's been a temporary error. Please wait a moment and try again.")}get recaptchaMessageTemplate(){return this.bypassRecaptcha?F:_`
      <span class="recaptcha-disclaimer"
        >${S(_`This site is protected by reCAPTCHA and the Google
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
        ${[1,2,3,4,5].map(r=>this.renderStar(r))}
        <button
          type="button"
          class="clear-stars-btn"
          @click=${this.handleClearBtnClicked}
        >
          ${S("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return _`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${S("Subject")}</label>
        ${this.maxSubjectLength?_`<div class="char-count subject">
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
    />${this.maxSubjectLength?_`
            <div class="input-error">
              ${S(Fe`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:F}</div></span>
    `}get hiddenInputsTemplate(){return _`
      <input
        type="hidden"
        name="field_reviewtoken"
        .value=${this.token??""}
      />
      ${this.identifier?_`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:F}
    `}get bodyInputTemplate(){return _`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${S("Review")}</label>
          ${this.maxBodyLength?_`<div class="char-count body">
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
        ${this.maxBodyLength?_`
              <div class="input-error">
                ${S(Fe`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:F}
      </span>
    `}get actionButtonsTemplate(){return _`<div class="action-btns">
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
    </div>`}renderStar(r){const e=r===this.currentStars,t=r===1?S("Rate 1 star"):S(Fe`Rate ${r} stars`);return _`
      <button
        class="star star-${r}"
        title=${e?S("Clear rating"):t}
        @click=${o=>this.handleStarClicked(o,r)}
      >
        ${r<=this.currentStars?_`<img
              class="star-selected"
              src=${fs}
              alt=""
              aria-hidden="true"
            />`:_`<img
              class="star-unselected"
              src=${ms}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.recaptchaUnavailable=!0}}sanitizeErrorMsg(r){return mt.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}get activeReviewService(){if(this.reviewService)return this.reviewService;if(this.fetchHandler)return ur({token:this.token,endpointPath:this.endpointPath,fetchHandler:this.fetchHandler,baseHost:this.baseHost})}async handleSubmit(r){if(r.preventDefault(),!this.formCanSubmit||this.submissionInProgress)return;if(this.submissionInProgress=!0,this.recoverableError="",this.formError=void 0,!this.reviewForm.reportValidity())return this.stopSubmission();const e=this.activeReviewService;if(!e||this.reviewService&&!this.identifier)return this.formError="generic",this.stopSubmission();try{let t;if(!this.bypassRecaptcha&&(t=await this.getRecaptchaToken(),!t))return this.handleRecaptchaError();const o=await e.submitReview({identifier:this.identifier??"",title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:t});if(o?.success===!0){this.submissionInProgress=!1;const c=this.generateSubmittedReview(),d=new CustomEvent("reviewUpdated",{detail:c});this.dispatchEvent(d)}else o.error?this.recoverableError=o.error:this.formError="generic",this.stopSubmission()}catch(t){console.error(t),this.formError="generic",this.stopSubmission()}}generateSubmittedReview(){const r=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname??S("Anonymous"),reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.formError="recaptcha",this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableErrorMessage||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[St`
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
      `]}};P([w({type:String})],C.prototype,"identifier",2);P([w({type:String})],C.prototype,"submitterScreenname",2);P([w({type:String})],C.prototype,"submitterItemname",2);P([w({type:Object})],C.prototype,"oldReview",2);P([w({type:String})],C.prototype,"unrecoverableError",2);P([w({type:Number})],C.prototype,"maxSubjectLength",2);P([w({type:Number})],C.prototype,"maxBodyLength",2);P([w({type:Object})],C.prototype,"reviewService",2);P([w({type:String})],C.prototype,"token",2);P([w({type:String})],C.prototype,"baseHost",2);P([w({type:String})],C.prototype,"endpointPath",2);P([w({type:Object})],C.prototype,"fetchHandler",2);P([w({type:Object})],C.prototype,"recaptchaManager",2);P([w({type:Boolean})],C.prototype,"bypassRecaptcha",2);P([H()],C.prototype,"currentStars",2);P([H()],C.prototype,"currentSubjectLength",2);P([H()],C.prototype,"currentBodyLength",2);P([H()],C.prototype,"recoverableError",2);P([H()],C.prototype,"formError",2);P([H()],C.prototype,"recaptchaUnavailable",2);P([H()],C.prototype,"formCanSubmit",2);P([H()],C.prototype,"submissionInProgress",2);P([hi("#review-form")],C.prototype,"reviewForm",2);C=P([bt("ia-review-form"),ar()],C);var vs=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,x=(r,e,t,o)=>{for(var c=o>1?void 0:o?_s(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(o?m(e,t,c):m(c))||c);return o&&c&&vs(e,t,c),c};let A=class extends Tt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?_`
      <div class="reviews-list">
        ${this.reviewsFrozen?_`<div class="message">
              ${S("Reviews can no longer be added to this item.")}
            </div>`:F}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(r=>r.reviewer_itemname!==this.submitterItemname?this.renderReview(r):F)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(r){(!this.activeReviewService||r.has("reviewService")||r.has("baseHost")||r.has("token")||r.has("endpointPath")||r.has("fetchHandler"))&&(this.activeReviewService=this.buildReviewService()),(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),r.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}buildReviewService(){return this.reviewService?this.reviewService:wn(this)?ur(this):new vi({baseHost:this.baseHost})}get reviewsDisabledTemplate(){return _`<div class="message">
      ${S("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?_`
        <div class="message">
          ${S("Reviews cannot be added to this item.")}
        </div>
      `:_`
      <div class="message">
        ${S("There are no reviews yet.")}
        ${S(_`
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
    `}get displayReviewsMsgTemplate(){const r=this.reviewsCount===1;return _`
      <div class="message">
        ${r?S("There is 1 review for this item."):S(Fe`There are ${this.reviewsCount} reviews for this item.`)}
        <ia-button
          mode="link"
          class="display-reviews-btn"
          @click=${()=>this.displayReviews=!0}
        >
          ${r?S("Display review"):S("Display reviews")}</ia-button
        >.
      </div>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?F:_`<div class="own-review-container">
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
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{!r&&t.reviewer_itemname===this.submitterItemname?r=t:e.push(t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,o)=>t.createdate&&o.createdate?new Date(o.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r){return r?_`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:F}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[St`
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
      `]}};x([w({type:String})],A.prototype,"identifier",2);x([w({type:Array})],A.prototype,"reviews",2);x([w({type:Boolean})],A.prototype,"reviewsDisabled",2);x([w({type:Boolean})],A.prototype,"reviewsFrozen",2);x([w({type:Boolean})],A.prototype,"canDelete",2);x([w({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([w({type:Number})],A.prototype,"maxSubjectLength",2);x([w({type:Number})],A.prototype,"maxBodyLength",2);x([w({type:String})],A.prototype,"baseHost",2);x([w({type:String})],A.prototype,"submitterScreenname",2);x([w({type:String})],A.prototype,"submitterItemname",2);x([w({type:Object})],A.prototype,"recaptchaManager",2);x([w({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([w({type:String})],A.prototype,"reviewSubmissionError",2);x([w({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([w({type:Object})],A.prototype,"reviewService",2);x([w({type:String})],A.prototype,"token",2);x([w({type:String})],A.prototype,"endpointPath",2);x([w({type:Object})],A.prototype,"fetchHandler",2);x([H()],A.prototype,"activeReviewService",2);x([H()],A.prototype,"displayReviewForm",2);x([H()],A.prototype,"displayReviews",2);x([H()],A.prototype,"filteredReviews",2);x([H()],A.prototype,"currentReview",2);x([H()],A.prototype,"reviewsCount",2);x([H()],A.prototype,"recaptchaActivated",2);A=x([bt("ia-reviews"),ar()],A);var ws=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,dr=(r,e,t,o)=>{for(var c=o>1?void 0:o?bs(e,t):e,d=r.length-1,m;d>=0;d--)(m=r[d])&&(c=(o?m(e,t,c):m(c))||c);return o&&c&&ws(e,t,c),c};const Ts=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],Ss=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],Es=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Rs={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},As=new vi({fetchHandler:Rs}),xs=6;let wt=class extends Tt{constructor(){super(...arguments),this.log=[]}render(){return _`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:Ss}}
        .propInputData=${{settings:Es}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Demo User"
          .reviews=${Ts}
          .reviewService=${As}
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
            <code>reviewsDisabled</code> hides the whole section, while
            <code>reviewsFrozen</code> keeps existing reviews visible but stops
            new ones. <code>canDelete</code> is what puts the delete control on
            a review the current user wrote.
          </p>
        </div>
      </story-template>
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,xs)}static get styles(){return St`
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
    `}};dr([H()],wt.prototype,"log",2);dr([hi("ia-reviews")],wt.prototype,"reviews",2);wt=dr([bt("ia-reviews-story")],wt);export{wt as IAReviewsStory};
