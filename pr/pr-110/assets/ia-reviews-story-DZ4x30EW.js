import{b as w,r as G,n as T,c as vt,i as bt,A as z,o as vi,a as wt}from"./index-WY7LOiw1.js";import{e as bi}from"./query-B6utk2-i.js";import{_ as n,i as I,n as on,e as sn,s as an,x as ln}from"./query-assigned-elements-CmBbzaxC.js";import{m as S}from"./runtime-CCgtQBty.js";import"./story-template-D-JgYdEu.js";function o(r){let e,t,a;return e=r,(l,p,h)=>{if(h.value!=null)h.value=Kr(h.value,e,t,a);else if(h.get!=null)h.get=Kr(h.get,e,t,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ht=new Map;function Kr(r,e,t=0,a){const l=Symbol("__memoized_map__");return function(...p){let h;this.hasOwnProperty(l)||Object.defineProperty(this,l,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let y=this[l];if(Array.isArray(a))for(const _ of a)Ht.has(_)?Ht.get(_).push(y):Ht.set(_,[y]);if(e||p.length>0||t>0){let _;e===!0?_=p.map(te=>te.toString()).join("!"):e?_=e.apply(this,p):_=p[0];const P=`${_}__timestamp`;let F=!1;if(t>0)if(!y.has(P))F=!0;else{let te=y.get(P);F=Date.now()-te>t}y.has(_)&&!F?h=y.get(_):(h=r.apply(this,p),y.set(_,h),t>0&&y.set(P,Date.now()))}else{const _=this;y.has(_)?h=y.get(_):(h=r.apply(this,p),y.set(_,h))}return h}}class ft{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}ft.shared=new ft;class ie{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ie.shared=new ie;class mt{parseValue(e){return ie.shared.parseValue(e)}}mt.shared=new mt;class Be{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,l,p,h="00",y="00",_="00"]=t,P=new Date(`${a}-${l}-${p}T${h}:${y}:${_}`);return Number.isNaN(P.getTime())?void 0:P}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let l=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(l=new Date(l.getTime()+l.getTimezoneOffset()*1e3*60)),l}}Be.shared=new Be;class gt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((l,p)=>{const h=parseFloat(l);if(Number.isNaN(h))return t=!0,0;const _=60**(e.length-1-p);return h*Math.floor(_)}).reduce((l,p)=>l+p,0);return t?void 0:a}}gt.shared=new gt;class wi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const l of this.separators)if(a=t.split(l),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(p=>p.trim()).map(p=>this.parser.parseValue(p)),l=[];return a.forEach(p=>{p!==void 0&&l.push(p)}),l}}class yt{parseValue(e){return String(e)}}yt.shared=new yt;function Pe(r,e,...t){for(const a of t){const l=r[a];if(l!=null)return e(l)}}function ce(r,e,...t){return Pe(r,a=>e(a),...t)}class ue{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ie.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ce(this.rawValue,e=>mt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ce(this.rawValue,e=>gt.shared.parseValue(e),"length")}get height(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"height")}get width(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"width")}get track(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"bitrate")}get private(){return ce(this.rawValue,e=>ft.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([o()],ue.prototype,"mtime",null);n([o()],ue.prototype,"size",null);n([o()],ue.prototype,"length",null);n([o()],ue.prototype,"height",null);n([o()],ue.prototype,"width",null);n([o()],ue.prototype,"track",null);n([o()],ue.prototype,"bitrate",null);n([o()],ue.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const l=this.parser.parseValue(a);Array.isArray(l)?t.push(...l):l!==void 0&&t.push(l)}),t}}n([o()],W.prototype,"values",null);n([o()],W.prototype,"value",null);class le extends W{constructor(e){super(ft.shared,e)}}class D extends W{constructor(e){super(Be.shared,e)}}class jt extends W{constructor(e){super(gt.shared,e)}}class b extends W{constructor(e){super(ie.shared,e)}}class u extends W{constructor(e){super(yt.shared,e)}}class ze{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Ne extends W{constructor(e,t){super(t,e)}}const cn=new ze(["rl","lr"]);class un extends Ne{constructor(e){super(e,cn)}}class ut extends W{constructor(e){super(mt.shared,e)}}const dn=new ze(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class pn extends Ne{constructor(e){super(e,dn)}}class Ti extends W{constructor(e,t){super(t,e)}}class Zr extends Ti{constructor(e){const t=new wi(yt.shared);super(e,t)}}class Vt extends Ti{constructor(e){const t=new wi(ie.shared);super(e,t)}}const hn=/^([0-9a-f]{32})\s+\*?(.+)$/i,fn=/^(.+):([0-9a-f]{32})$/i;function mn(r){const e=r.match(hn);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(fn);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(mn).filter(a=>a!==void 0);return t.length?t:void 0}}tr.shared=new tr;class Jr extends W{constructor(e){super(tr.shared,e)}}function dt(r,e){var t;const a=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),l=(t=a?.[1])===null||t===void 0?void 0:t.trim();return l||void 0}class rr{parseValue(e){if(typeof e!="string")return;const t=dt(e,"curator"),a=dt(e,"date"),l=dt(e,"comment"),p=dt(e,"state");if(!(!t&&!a&&!l&&!p))return{curator:t,date:a?Be.shared.parseValue(a):void 0,comment:l,state:p}}}rr.shared=new rr;class gn extends W{constructor(e){super(rr.shared,e)}}class ir{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),l=parseFloat(t[2]);if(l)return{width:a,height:l,decimal:a/l}}}ir.shared=new ir;class yn extends W{constructor(e){super(ir.shared,e)}}class nr{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,l=parseInt(t[2],10),p=parseInt(t[3],10);return{hours:a*l,minutes:p,totalMinutes:a*(l*60+p)}}}nr.shared=new nr;class _n extends W{constructor(e){super(nr.shared,e)}}class or{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}or.shared=new or;class vn extends W{constructor(e){super(or.shared,e)}}const bn=new ze(["true","none","frozen"]),wn=new ze(["sound","silent"]),Tn=new ze(["color","b&w"]),En=new ze(["mode/1up","mode/2up","mode/thumb"]);class s{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(b,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(b,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(b,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(b,"bookplateleaf")}get bookreader_defaults(){return Pe(this.rawMetadata,e=>new Ne(e,En),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(gn,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(b,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(b,"firstfileserial")}get foldoutcount(){return this.field(b,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(le,"has_mp3")}get height(){return this.field(b,"height")}get hidden(){return this.field(le,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(le,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(yn,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(b,"audio_sample_rate")}get avg_rating(){return this.field(b,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(le,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(ut,"collection_size")}get color(){return Pe(this.rawMetadata,e=>new Ne(e,Tn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(b,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(b,"files_count")}get frames_per_second(){return this.field(b,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(b,"image_count")}get imagecount(){return this.field(b,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(b,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(b,"issue_count")}get issue_page_count(){return this.field(b,"issue_page_count")}get item_count(){return this.field(b,"item_count")}get item_size(){return this.field(ut,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(b,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(le,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Jr,"md5contents")}get md5s(){return this.field(Jr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(le,"monochromatic")}get month(){return this.field(b,"month")}get mediatype(){return this.field(pn,"mediatype")}get mpeg_program(){return this.field(b,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(le,"noarchivetorrent")}get noindex(){return this.field(le,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(b,"num_favorites")}get num_reviews(){return this.field(b,"num_reviews")}get numeric_id(){return this.field(b,"numeric_id")}get numwarcs(){return this.field(b,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(le,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(b,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(b,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(b,"output_time_minutes")}get pacer_case_num(){return this.field(b,"pacer-case-num")}get packaging_time_minutes(){return this.field(b,"packaging_time_minutes")}get page_number_confidence(){return this.field(b,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(un,"page-progression","page_progression")}get paginated(){return this.field(le,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(b,"pick")}get podcastindexid(){return this.field(b,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(b,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(b,"rcs_key")}get repub_state(){return this.field(b,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(Zr,"republisher_operator")}get republisher_time(){return this.field(b,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Pe(this.rawMetadata,e=>new Ne(e,bn),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(b,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(b,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(ut,"size")}get sizehint(){return this.field(ut,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Pe(this.rawMetadata,e=>new Ne(e,wn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(b,"source_pixel_height")}get source_pixel_width(){return this.field(b,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(Zr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(b,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(vn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(_n,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(b,"week")}get width(){return this.field(b,"width")}get year(){return this.field(b,"year")}field(e,...t){return Pe(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}n([o()],s.prototype,"access",null);n([o()],s.prototype,"adder",null);n([o()],s.prototype,"amrc_id",null);n([o()],s.prototype,"archiveit_account_id",null);n([o()],s.prototype,"archiveit_account_organization_name",null);n([o()],s.prototype,"archiveit_collection_id",null);n([o()],s.prototype,"archiveit_collection_name",null);n([o()],s.prototype,"archiveit_job_type",null);n([o()],s.prototype,"audit_time_minutes",null);n([o()],s.prototype,"auditor",null);n([o()],s.prototype,"author",null);n([o()],s.prototype,"autocrop_version",null);n([o()],s.prototype,"bookplateleaf",null);n([o()],s.prototype,"bookreader_defaults",null);n([o()],s.prototype,"boxid",null);n([o()],s.prototype,"camera",null);n([o()],s.prototype,"cameraman",null);n([o()],s.prototype,"canister",null);n([o()],s.prototype,"case_name",null);n([o()],s.prototype,"col_number",null);n([o()],s.prototype,"collection_added",null);n([o()],s.prototype,"collection_library",null);n([o()],s.prototype,"collection_set",null);n([o()],s.prototype,"copyright_holder",null);n([o()],s.prototype,"court",null);n([o()],s.prototype,"crawler",null);n([o()],s.prototype,"crawljob",null);n([o()],s.prototype,"curation",null);n([o()],s.prototype,"dari_title",null);n([o()],s.prototype,"dari_title_romanized",null);n([o()],s.prototype,"date_case_filed",null);n([o()],s.prototype,"date_case_terminated",null);n([o()],s.prototype,"date_created",null);n([o()],s.prototype,"date_last_filing",null);n([o()],s.prototype,"derive_submittime",null);n([o()],s.prototype,"derive_version",null);n([o()],s.prototype,"discs",null);n([o()],s.prototype,"docket_num",null);n([o()],s.prototype,"external_metadata_update",null);n([o()],s.prototype,"fail_reasons",null);n([o()],s.prototype,"filesxml",null);n([o()],s.prototype,"firstfiledate",null);n([o()],s.prototype,"firstfileserial",null);n([o()],s.prototype,"foldoutcount",null);n([o()],s.prototype,"format",null);n([o()],s.prototype,"geo_restricted",null);n([o()],s.prototype,"guid",null);n([o()],s.prototype,"has_mp3",null);n([o()],s.prototype,"height",null);n([o()],s.prototype,"hidden",null);n([o()],s.prototype,"ia_orig__runtime",null);n([o()],s.prototype,"access_restricted_item",null);n([o()],s.prototype,"addeddate",null);n([o()],s.prototype,"aspect_ratio",null);n([o()],s.prototype,"audio_codec",null);n([o()],s.prototype,"audio_sample_rate",null);n([o()],s.prototype,"avg_rating",null);n([o()],s.prototype,"backup_location",null);n([o()],s.prototype,"ccnum",null);n([o()],s.prototype,"closed_captioning",null);n([o()],s.prototype,"collection",null);n([o()],s.prototype,"collections_raw",null);n([o()],s.prototype,"collection_size",null);n([o()],s.prototype,"color",null);n([o()],s.prototype,"contact",null);n([o()],s.prototype,"contributor",null);n([o()],s.prototype,"coverage",null);n([o()],s.prototype,"creator",null);n([o()],s.prototype,"creator_alt_script",null);n([o()],s.prototype,"credits",null);n([o()],s.prototype,"collection_layout",null);n([o()],s.prototype,"date",null);n([o()],s.prototype,"description",null);n([o()],s.prototype,"downloads",null);n([o()],s.prototype,"duration",null);n([o()],s.prototype,"external_identifier",null);n([o()],s.prototype,"external_link",null);n([o()],s.prototype,"files_count",null);n([o()],s.prototype,"frames_per_second",null);n([o()],s.prototype,"identifier_access",null);n([o()],s.prototype,"identifier_ark",null);n([o()],s.prototype,"identifier_bib",null);n([o()],s.prototype,"image_count",null);n([o()],s.prototype,"imagecount",null);n([o()],s.prototype,"indexdate",null);n([o()],s.prototype,"invoice",null);n([o()],s.prototype,"isbn",null);n([o()],s.prototype,"issue",null);n([o()],s.prototype,"issue_count",null);n([o()],s.prototype,"issue_page_count",null);n([o()],s.prototype,"item_count",null);n([o()],s.prototype,"item_size",null);n([o()],s.prototype,"language",null);n([o()],s.prototype,"lastdate",null);n([o()],s.prototype,"lastfiledate",null);n([o()],s.prototype,"lastfileserial",null);n([o()],s.prototype,"length",null);n([o()],s.prototype,"license",null);n([o()],s.prototype,"licenseurl",null);n([o()],s.prototype,"lineage",null);n([o()],s.prototype,"mature_content",null);n([o()],s.prototype,"md5",null);n([o()],s.prototype,"md5contents",null);n([o()],s.prototype,"md5s",null);n([o()],s.prototype,"medium",null);n([o()],s.prototype,"metadata_operator",null);n([o()],s.prototype,"metasource_catalog",null);n([o()],s.prototype,"monochromatic",null);n([o()],s.prototype,"month",null);n([o()],s.prototype,"mediatype",null);n([o()],s.prototype,"mpeg_program",null);n([o()],s.prototype,"next_item",null);n([o()],s.prototype,"noarchivetorrent",null);n([o()],s.prototype,"noindex",null);n([o()],s.prototype,"notes",null);n([o()],s.prototype,"num_favorites",null);n([o()],s.prototype,"num_reviews",null);n([o()],s.prototype,"numeric_id",null);n([o()],s.prototype,"numwarcs",null);n([o()],s.prototype,"ocr",null);n([o()],s.prototype,"ocr_autonomous",null);n([o()],s.prototype,"ocr_detected_lang",null);n([o()],s.prototype,"ocr_detected_lang_conf",null);n([o()],s.prototype,"ocr_detected_script",null);n([o()],s.prototype,"ocr_detected_script_conf",null);n([o()],s.prototype,"ocr_invalid_language",null);n([o()],s.prototype,"ocr_module_version",null);n([o()],s.prototype,"ocr_parameters",null);n([o()],s.prototype,"old_pallet",null);n([o()],s.prototype,"openlibrary_edition",null);n([o()],s.prototype,"openlibrary_work",null);n([o()],s.prototype,"operator",null);n([o()],s.prototype,"originalurl",null);n([o()],s.prototype,"osf_category",null);n([o()],s.prototype,"osf_project",null);n([o()],s.prototype,"osf_registration_doi",null);n([o()],s.prototype,"osf_registration_schema",null);n([o()],s.prototype,"osf_registry",null);n([o()],s.prototype,"osf_subjects",null);n([o()],s.prototype,"osf_tags",null);n([o()],s.prototype,"output_time_minutes",null);n([o()],s.prototype,"pacer_case_num",null);n([o()],s.prototype,"packaging_time_minutes",null);n([o()],s.prototype,"page_number_confidence",null);n([o()],s.prototype,"page_number_module_version",null);n([o()],s.prototype,"page_progression",null);n([o()],s.prototype,"paginated",null);n([o()],s.prototype,"parse_date",null);n([o()],s.prototype,"parse_state",null);n([o()],s.prototype,"partner",null);n([o()],s.prototype,"pashto_title",null);n([o()],s.prototype,"pashto_title_romanized",null);n([o()],s.prototype,"pdf_degraded",null);n([o()],s.prototype,"pdf_module_version",null);n([o()],s.prototype,"pick",null);n([o()],s.prototype,"podcastindexid",null);n([o()],s.prototype,"post_text",null);n([o()],s.prototype,"ppi",null);n([o()],s.prototype,"previous_item",null);n([o()],s.prototype,"program",null);n([o()],s.prototype,"publicdate",null);n([o()],s.prototype,"publisher",null);n([o()],s.prototype,"political_religious_party",null);n([o()],s.prototype,"rcs_key",null);n([o()],s.prototype,"repub_state",null);n([o()],s.prototype,"republisher_date",null);n([o()],s.prototype,"republisher_operator",null);n([o()],s.prototype,"republisher_time",null);n([o()],s.prototype,"reviewdate",null);n([o()],s.prototype,"reviews_allowed",null);n([o()],s.prototype,"ribbon_state",null);n([o()],s.prototype,"ribbon_state_modify_date",null);n([o()],s.prototype,"rights",null);n([o()],s.prototype,"rights_holder",null);n([o()],s.prototype,"rssfeed",null);n([o()],s.prototype,"runtime",null);n([o()],s.prototype,"scan_time_minutes",null);n([o()],s.prototype,"scandate",null);n([o()],s.prototype,"scanfee",null);n([o()],s.prototype,"scanner",null);n([o()],s.prototype,"scanner_operator",null);n([o()],s.prototype,"scanningcenter",null);n([o()],s.prototype,"scribe3_search_catalog",null);n([o()],s.prototype,"scribe3_search_id",null);n([o()],s.prototype,"segments",null);n([o()],s.prototype,"sessionid",null);n([o()],s.prototype,"shndiscs",null);n([o()],s.prototype,"shotlist",null);n([o()],s.prototype,"signal_path",null);n([o()],s.prototype,"size",null);n([o()],s.prototype,"sizehint",null);n([o()],s.prototype,"software_version",null);n([o()],s.prototype,"sort_order",null);n([o()],s.prototype,"sound",null);n([o()],s.prototype,"soundcreator",null);n([o()],s.prototype,"soundtitle",null);n([o()],s.prototype,"source",null);n([o()],s.prototype,"source_pixel_height",null);n([o()],s.prototype,"source_pixel_width",null);n([o()],s.prototype,"source_url",null);n([o()],s.prototype,"sponsor",null);n([o()],s.prototype,"sponsordate",null);n([o()],s.prototype,"start_localtime",null);n([o()],s.prototype,"start_time",null);n([o()],s.prototype,"station_name",null);n([o()],s.prototype,"stop_time",null);n([o()],s.prototype,"subject",null);n([o()],s.prototype,"taper",null);n([o()],s.prototype,"thumbs",null);n([o()],s.prototype,"times",null);n([o()],s.prototype,"title",null);n([o()],s.prototype,"title_alt_script",null);n([o()],s.prototype,"transferer",null);n([o()],s.prototype,"track",null);n([o()],s.prototype,"tts_version",null);n([o()],s.prototype,"tuner",null);n([o()],s.prototype,"type",null);n([o()],s.prototype,"updatedate",null);n([o()],s.prototype,"updater",null);n([o()],s.prototype,"uploader",null);n([o()],s.prototype,"uploadsoftware",null);n([o()],s.prototype,"utc_offset",null);n([o()],s.prototype,"venue",null);n([o()],s.prototype,"video_codec",null);n([o()],s.prototype,"volume",null);n([o()],s.prototype,"website",null);n([o()],s.prototype,"week",null);n([o()],s.prototype,"width",null);n([o()],s.prototype,"year",null);class me{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ce(this.rawValue,e=>Be.shared.parseValue(e),"reviewdate")}get createdate(){return ce(this.rawValue,e=>Be.shared.parseValue(e),"createdate")}get stars(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([o()],me.prototype,"reviewdate",null);n([o()],me.prototype,"createdate",null);n([o()],me.prototype,"stars",null);class Sn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(l=>new ue(l)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new s(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(l=>new me(l)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Se;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Se||(Se={}));class sr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class Rn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const l=new URL(window.location.href).searchParams.get("scope");l&&(this.requestScope=l)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",l=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(l)}async fetchUrl(e,t){var a;const l=new URL(e);this.requestScope&&l.searchParams.set("scope",this.requestScope);let p;try{const h=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};p=await fetch(l.href,h)}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.networkError,y)}try{const h=await p.json(),y=h.error;if(y){const _=h.forensics;return this.getErrorResult(Se.searchEngineError,y,_)}else return{success:h}}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.decodingError,y)}}getErrorResult(e,t,a){return{error:new sr(e,t,a)}}}class Qr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new sr(Se.itemNotFound)}:{success:new Sn(a.success)}}async fetchMetadataValue(e,t){var a;const l=await this.backend.fetchMetadata(e,t);return l.error?l:((a=l.success)===null||a===void 0?void 0:a.result)===void 0?{error:new sr(Se.itemNotFound)}:{success:l.success.result}}}Qr.default=new Qr(new Rn);function ei(r){return new Promise(e=>setTimeout(e,r))}class ar{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const l=parseInt(a,10);if(!isNaN(l))return l*1e3}return Math.min(500*2**e,1e4)}}ar.shared=new ar;class lr{shouldRetry(){return!1}retryDelay(){return null}}lr.shared=new lr;class pr{}pr.default=ar.shared;pr.noRetry=lr.shared;const Ei=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class An{constructor(e){this.retryConfig=pr.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=Ei(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var l,p;const h=typeof e=="string"?e:e.url;try{const y=await fetch(e,a?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const _=(l=a?.retryConfig)!==null&&l!==void 0?l:this.retryConfig;if(_.shouldRetry(y,t)){const F=_.retryDelay(t,y);if(F!==null)return await ei(F),this.logRetryEvent(h,t,y.statusText,y.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(h,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(h,y),y;const _=(p=a?.retryConfig)!==null&&p!==void 0?p:this.retryConfig;if(_.shouldRetry(null,t)){const F=_.retryDelay(t);if(F!==null)return await ei(F),this.logRetryEvent(h,t,y,y),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(h,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,l){var p;(p=this.analyticsHandler)===null||p===void 0||p.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${l}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const xn=new Set(["POST","PUT","DELETE","PATCH"]);class hr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new An,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;a=this.addSearchParams(h,{reCache:"1"})}const p=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,p)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const l=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((_,P)=>{l.set(P,_)}),a.headers=l;const p=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(p,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,l,p,h;if(!this.getCsrfToken)return t;const y=(a=Ei(t))!==null&&a!==void 0?a:{};if(!y.includeCsrfToken)return t;const _=(l=y.requestInit)!==null&&l!==void 0?l:{},P=((h=(p=_.method)!==null&&p!==void 0?p:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!xn.has(P))return t;const F=new Headers(_.headers);return F.has("X-CSRF-Token")?t:(F.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{..._,headers:F}})}addSearchParams(e,t){const a=e.indexOf("#"),l=a===-1?"":e.slice(a),p=a===-1?e:e.slice(0,a),h=p.indexOf("?"),y=h===-1?p:p.slice(0,h),_=new URLSearchParams(h===-1?"":p.slice(h+1)),P=hr.asSearchParams(t),F=new Set;P.forEach((re,ge)=>{F.has(ge)||(F.add(ge),_.delete(ge))}),P.forEach((re,ge)=>{_.append(ge,re)});const te=_.toString();return`${y}${te?`?${te}`:""}${l}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,l])=>{l!=null&&t.append(a,String(l))}),t}}class Cn extends hr{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const ti=I`var(--white, #fff)`,kn=I`var(--ia-theme-link-color, #4b64ff)`,Ln=I`var(--primaryDisableCTAFill, #767676)`,Dn=I`var(--secondaryCTABorder, #999)`,On=I`var(--primaryCTAFill, #194880)`,Gt=I`var(--primaryCTAFillRGB, 25, 72, 128)`,In=I`var(--primaryCTABorder, #c5d1df)`,$n=I`var(--primaryErrorCTAFill, #d9534f)`,Wt=I`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Pn=I`var(--primaryErrorCTABorder, #d43f3a)`,Mn=I`var(--secondaryCTAFill, #333)`,Yt=I`var(--secondaryCTAFillRGB, 51, 51, 51)`,Nn=I`var(--primaryCTABorder, #979797)`,Fn=I`var(---primaryWarningFill, #ee8950)`,qt=I`var(--primaryWarningFillRGB, 238, 137, 80)`,Bn=I`var(--primaryWarningBorder, #ec7939)`,Si=I`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${ti};
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
    outline-color: ${ti};
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
    background-color: ${Ln};
    border: 1px solid ${Dn};
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
    background-color: ${On};
    border-color: ${In};
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
    background-color: ${$n};
    border-color: ${Pn};
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
    background-color: ${Fn};
    border-color: ${Bn};
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
    background-color: ${Mn};
    border-color: ${Nn};
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
    color: ${kn};
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;I`
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
`;const zn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function ri(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return w`<span title="${r}">${t}</span>`}function ii(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,a=Array(e);t<e;t++)a[t]=r[t];return a}function Un(r){if(Array.isArray(r))return r}function Hn(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var a,l,p,h,y=[],_=!0,P=!1;try{if(p=(t=t.call(r)).next,e!==0)for(;!(_=(a=p.call(t)).done)&&(y.push(a.value),y.length!==e);_=!0);}catch(F){P=!0,l=F}finally{try{if(!_&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if(P)throw l}}return y}}function jn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Vn(r,e){return Un(r)||Hn(r,e)||Gn(r,e)||jn()}function Gn(r,e){if(r){if(typeof r=="string")return ii(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?ii(r,e):void 0}}const Ri=Object.entries,ni=Object.setPrototypeOf,Wn=Object.isFrozen,Yn=Object.getPrototypeOf,qn=Object.getOwnPropertyDescriptor;let U=Object.freeze,H=Object.seal,Me=Object.create,Ai=typeof Reflect<"u"&&Reflect,cr=Ai.apply,ur=Ai.construct;U||(U=function(e){return e});H||(H=function(e){return e});cr||(cr=function(e,t){for(var a=arguments.length,l=new Array(a>2?a-2:0),p=2;p<a;p++)l[p-2]=arguments[p];return e.apply(t,l)});ur||(ur=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l];return new e(...a)});const Ee=B(Array.prototype.forEach),Xn=B(Array.prototype.lastIndexOf),oi=B(Array.prototype.pop),We=B(Array.prototype.push),Kn=B(Array.prototype.splice),Fe=Array.isArray,Xe=B(String.prototype.toLowerCase),Xt=B(String.prototype.toString),si=B(String.prototype.match),Ye=B(String.prototype.replace),ai=B(String.prototype.indexOf),Zn=B(String.prototype.trim),Jn=B(Number.prototype.toString),Qn=B(Boolean.prototype.toString),li=typeof BigInt>"u"?null:B(BigInt.prototype.toString),ci=typeof Symbol>"u"?null:B(Symbol.prototype.toString),K=B(Object.prototype.hasOwnProperty),qe=B(Object.prototype.toString),j=B(RegExp.prototype.test),Te=eo(TypeError);function B(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),l=1;l<t;l++)a[l-1]=arguments[l];return cr(r,e,a)}}function eo(r){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return ur(r,t)}}function E(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(ni&&ni(r,null),!Fe(e))return r;let a=e.length;for(;a--;){let l=e[a];if(typeof l=="string"){const p=t(l);p!==l&&(Wn(e)||(e[a]=p),l=p)}r[l]=!0}return r}function to(r){for(let e=0;e<r.length;e++)K(r,e)||(r[e]=null);return r}function J(r){const e=Me(null);for(const a of Ri(r)){var t=Vn(a,2);const l=t[0],p=t[1];K(r,l)&&(Fe(p)?e[l]=to(p):p&&typeof p=="object"&&p.constructor===Object?e[l]=J(p):e[l]=p)}return e}function ro(r){switch(typeof r){case"string":return r;case"number":return Jn(r);case"boolean":return Qn(r);case"bigint":return li?li(r):"0";case"symbol":return ci?ci(r):"Symbol()";case"undefined":return qe(r);case"function":case"object":{if(r===null)return qe(r);const e=r,t=Q(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:qe(a)}return qe(r)}default:return qe(r)}}function Q(r,e){for(;r!==null;){const a=qn(r,e);if(a){if(a.get)return B(a.get);if(typeof a.value=="function")return B(a.value)}r=Yn(r)}function t(){return null}return t}function io(r){try{return j(r,""),!0}catch{return!1}}const ui=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Kt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),no=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Jt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),oo=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),di=U(["#text"]),pi=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Qt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),hi=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pt=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),so=H(/{{[\w\W]*|^[\w\W]*}}/g),ao=H(/<%[\w\W]*|^[\w\W]*%>/g),lo=H(/\${[\w\W]*/g),co=H(/^data-[\-\w.\u00B7-\uFFFF]+$/),uo=H(/^aria-[\-\w]+$/),fi=H(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),po=H(/^(?:\w+script|data):/i),ho=H(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fo=H(/^html$/i),mo=H(/^[a-z][.\w]*(-[.\w]+)+$/i),mi=H(/<[/\w!]/g),gi=H(/<[/\w]/g),go=H(/<\/no(script|embed|frames)/i),yo=H(/\/>/i),Z={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},xi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],_o=U(E({},xi)),vo=(function(){const r={};return Ee(xi,e=>{r[e]=H(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(r)})(),bo=function(){return typeof window>"u"?null:window},wo=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const l="data-tt-policy-suffix";t&&t.hasAttribute(l)&&(a=t.getAttribute(l));const p="dompurify"+(a?"#"+a:"");try{return e.createPolicy(p,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+p+" could not be created."),null}},yi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,a,l){return K(e,t)&&Fe(e[t])?E(l.base?J(l.base):{},e[t],l.transform):a},er=function(e,t,a){const l=K(e,t)?e[t]:void 0;return l&&typeof l=="object"?J(l):a()};function Ci(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bo();const e=f=>Ci(f);if(e.version="3.4.15",e.removed=[],!r||!r.document||r.document.nodeType!==Z.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const a=t,l=a.currentScript;r.DocumentFragment;const p=r.HTMLTemplateElement,h=r.Node,y=r.Element,_=r.NodeFilter,P=r.NamedNodeMap;P===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const F=r.DOMParser,te=r.trustedTypes,re=y.prototype,ge=Q(re,"cloneNode"),Tt=Q(re,"remove"),mr=Q(re,"removeAttributeNode"),ki=Q(re,"nextSibling"),Re=Q(re,"childNodes"),Ae=Q(re,"parentNode"),gr=Q(re,"shadowRoot"),Et=Q(re,"attributes"),ye=h&&h.prototype?Q(h.prototype,"nodeType"):null,xe=h&&h.prototype?Q(h.prototype,"nodeName"):null,Ke=h&&h.prototype?Q(h.prototype,"ownerDocument"):null,Ue=function(i){return ye?ye(i):i.nodeType},St=function(i){return xe?xe(i):i.nodeName};if(typeof p=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let Y,_e="",Rt,yr=!1,He=0;const _r=function(){if(He>0)throw Te('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},Ce=function(i){_r(),He++;try{return Y.createHTML(i)}finally{He--}},Li=function(i){_r(),He++;try{return Y.createScriptURL(i)}finally{He--}},Di=function(){return yr||(Rt=wo(te,l),yr=!0),Rt},Ze=t,At=Ze.implementation,vr=Ze.createNodeIterator,Oi=Ze.createDocumentFragment,Ii=Ze.getElementsByTagName,$i=a.importNode;let C=yi();e.isSupported=typeof Ri=="function"&&typeof Ae=="function"&&At&&At.createHTMLDocument!==void 0;const Pi=so,Mi=ao,Ni=lo,Fi=co,Bi=uo,zi=po,br=ho,Ui=mo;let wr=fi,k=null;const xt=E({},[...ui,...Kt,...Zt,...Jt,...di]);let L=null;const Ct=E({},[...pi,...Qt,...hi,...pt]);let oe=Object.seal(Me(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,Tr=null;const de=Object.seal(Me(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let Er=!0,kt=!0,Sr=!1,Rr=!0,pe=!1,ve=!0,be=!1,Lt=!1,Je=null,Qe=null,Dt=!1,ke=!1,et=!1,tt=!1,Ar=!0,xr=!1;const Cr="user-content-";let Ot=!0,It=!1,Le={},De=null;const kr=E({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Lr=null;const Dr=E({},["audio","video","img","source","image","track"]);let Or=null;const Ir=E({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",se="http://www.w3.org/1999/xhtml";let Oe=se,$t=!1,Pt=null;const Hi=E({},[rt,it,se],Xt),$r=U(["mi","mo","mn","ms","mtext"]);let Mt=E({},$r);const Pr=U(["annotation-xml"]);let Nt=E({},Pr);const ji=E({},["title","style","font","a","script"]);let Ve=null;const Vi=["application/xhtml+xml","text/html"],Gi="text/html";let M=null,Ie=null;const Wi=t.createElement("form"),Mr=function(i){return i instanceof RegExp||i instanceof Function},Ft=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(Ie&&Ie===i)return;(!i||typeof i!="object")&&(i={}),i=J(i),Ve=Vi.indexOf(i.PARSER_MEDIA_TYPE)===-1?Gi:i.PARSER_MEDIA_TYPE,M=Ve==="application/xhtml+xml"?Xt:Xe,k=fe(i,"ALLOWED_TAGS",xt,{transform:M}),L=fe(i,"ALLOWED_ATTR",Ct,{transform:M}),Pt=fe(i,"ALLOWED_NAMESPACES",Hi,{transform:Xt}),Or=fe(i,"ADD_URI_SAFE_ATTR",Ir,{transform:M,base:Ir}),Lr=fe(i,"ADD_DATA_URI_TAGS",Dr,{transform:M,base:Dr}),De=fe(i,"FORBID_CONTENTS",kr,{transform:M}),je=fe(i,"FORBID_TAGS",J({}),{transform:M}),Tr=fe(i,"FORBID_ATTR",J({}),{transform:M}),Le=K(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?J(i.USE_PROFILES):i.USE_PROFILES:!1,Er=i.ALLOW_ARIA_ATTR!==!1,kt=i.ALLOW_DATA_ATTR!==!1,Sr=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Rr=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pe=i.SAFE_FOR_TEMPLATES||!1,ve=i.SAFE_FOR_XML!==!1,be=i.WHOLE_DOCUMENT||!1,ke=i.RETURN_DOM||!1,et=i.RETURN_DOM_FRAGMENT||!1,tt=i.RETURN_TRUSTED_TYPE||!1,Dt=i.FORCE_BODY||!1,Ar=i.SANITIZE_DOM!==!1,xr=i.SANITIZE_NAMED_PROPS||!1,Ot=i.KEEP_CONTENT!==!1,It=i.IN_PLACE||!1,wr=io(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:fi,Oe=typeof i.NAMESPACE=="string"?i.NAMESPACE:se,Mt=er(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>E({},$r)),Nt=er(i,"HTML_INTEGRATION_POINTS",()=>E({},Pr));const c=er(i,"CUSTOM_ELEMENT_HANDLING",()=>Me(null));if(oe=Me(null),K(c,"tagNameCheck")&&Mr(c.tagNameCheck)&&(oe.tagNameCheck=c.tagNameCheck),K(c,"attributeNameCheck")&&Mr(c.attributeNameCheck)&&(oe.attributeNameCheck=c.attributeNameCheck),K(c,"allowCustomizedBuiltInElements")&&typeof c.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=c.allowCustomizedBuiltInElements),H(oe),pe&&(kt=!1),et&&(ke=!0),Le&&(k=E({},di),L=Me(null),Le.html===!0&&(E(k,ui),E(L,pi)),Le.svg===!0&&(E(k,Kt),E(L,Qt),E(L,pt)),Le.svgFilters===!0&&(E(k,Zt),E(L,Qt),E(L,pt)),Le.mathMl===!0&&(E(k,Jt),E(L,hi),E(L,pt))),de.tagCheck=null,de.attributeCheck=null,K(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?de.tagCheck=i.ADD_TAGS:Fe(i.ADD_TAGS)&&(k===xt&&(k=J(k)),E(k,i.ADD_TAGS,M))),K(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?de.attributeCheck=i.ADD_ATTR:Fe(i.ADD_ATTR)&&(L===Ct&&(L=J(L)),E(L,i.ADD_ATTR,M))),K(i,"ADD_FORBID_CONTENTS")&&Fe(i.ADD_FORBID_CONTENTS)&&(De===kr&&(De=J(De)),E(De,i.ADD_FORBID_CONTENTS,M)),Ot&&(k["#text"]=!0),be&&E(k,["html","head","body"]),k.table&&(E(k,["tbody"]),delete je.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw Te('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Te('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const d=Y;Y=i.TRUSTED_TYPES_POLICY;try{_e=Ce("")}catch(m){throw Y=d,m}}else i.TRUSTED_TYPES_POLICY===null?(Y=void 0,_e=""):(Y===void 0&&(Y=Di()),Y&&typeof _e=="string"&&(_e=Ce("")));U&&U(i),Ie=i},Nr=E({},[...Kt,...Zt,...no]),Fr=E({},[...Jt,...oo]),Yi=function(i,c,d){return c.namespaceURI===se?i==="svg":c.namespaceURI===rt?i==="svg"&&(d==="annotation-xml"||Mt[d]):!!Nr[i]},qi=function(i,c,d){return c.namespaceURI===se?i==="math":c.namespaceURI===it?i==="math"&&Nt[d]:!!Fr[i]},Xi=function(i,c,d){return c.namespaceURI===it&&!Nt[d]||c.namespaceURI===rt&&!Mt[d]?!1:!Fr[i]&&(ji[i]||!Nr[i])},Ki=function(i){let c=Ae(i);(!c||!c.tagName)&&(c={namespaceURI:Oe,tagName:"template"});const d=Xe(i.tagName),m=Xe(c.tagName);return Pt[i.namespaceURI]?i.namespaceURI===it?Yi(d,c,m):i.namespaceURI===rt?qi(d,c,m):i.namespaceURI===se?Xi(d,c,m):!!(Ve==="application/xhtml+xml"&&Pt[i.namespaceURI]):!1},he=function(i){We(e.removed,{element:i});try{Ae(i).removeChild(i)}catch{if(Tt(i),!Ae(i))throw Te("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Br=function(i,c,d){try{mr(i,c)}catch{try{i.removeAttribute(d)}catch{}}},nt=function(i){ot(i);const c=Re(i);if(c){const m=[];Ee(c,g=>{We(m,g)}),Ee(m,g=>{try{Tt(g)}catch{}})}const d=Et(i);if(d)for(let m=d.length-1;m>=0;--m){const g=d[m],v=g&&g.name;typeof v=="string"&&Br(i,g,v)}},we=function(i,c,d){if(!d)try{d=c.getAttributeNode(i)}catch{d=null}We(e.removed,{attribute:d||null,from:c});try{d?mr(c,d):c.removeAttribute(i)}catch{try{c.removeAttribute(i)}catch{}}if(i==="is")if(ke||et)try{he(c)}catch{}else try{c.setAttribute(i,"")}catch{}},Zi=function(i){const c=Et(i);if(c)for(let d=c.length-1;d>=0;--d){const m=c[d],g=m&&m.name;typeof g!="string"||L[M(g)]||Br(i,m,g)}},ot=function(i){const c=[i];for(;c.length>0;){const d=c.pop();Ue(d)===Z.element&&Zi(d);const g=Re(d);if(g)for(let v=g.length-1;v>=0;--v)c.push(g[v])}},zr=function(i,c){return ve?i==="patchsrc"?!0:i==="for"&&c!=="label"&&c!=="output":!1},Ji=function(i){if(!ve)return;const c=[i];for(;c.length>0;){const d=c.pop(),m=Ue(d);if(m===Z.processingInstruction||m===Z.comment&&j(gi,d.data)){try{Tt(d)}catch{}continue}if(m===Z.element){const v=d,R=M(St(d));try{v.hasAttribute&&v.hasAttribute("patchsrc")&&v.removeAttribute("patchsrc"),v.hasAttribute&&v.hasAttribute("for")&&zr("for",R)&&v.removeAttribute("for")}catch{}}const g=Re(d);if(g)for(let v=g.length-1;v>=0;--v)c.push(g[v])}},Ur=function(i){let c=null,d=null;if(Dt)i="<remove></remove>"+i;else{const v=si(i,/^[\r\n\t ]+/);d=v&&v[0]}Ve==="application/xhtml+xml"&&Oe===se&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const m=Y?Ce(i):i;if(Oe===se)try{c=new F().parseFromString(m,Ve)}catch{}if(!c||!c.documentElement){c=At.createDocument(Oe,"template",null);try{c.documentElement.innerHTML=$t?_e:m}catch{}}const g=c.body||c.documentElement;return i&&d&&g.insertBefore(t.createTextNode(d),g.childNodes[0]||null),Oe===se?Ii.call(c,be?"html":"body")[0]:be?c.documentElement:g},Hr=function(i){const c=Ke?Ke(i):i.ownerDocument;return vr.call(c||i,i,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT|_.SHOW_PROCESSING_INSTRUCTION|_.SHOW_CDATA_SECTION,null)},st=function(i){return i=Ye(i,Pi," "),i=Ye(i,Mi," "),i=Ye(i,Ni," "),i},Bt=function(i){var c;i.normalize();const d=Ke?Ke(i):i.ownerDocument,m=vr.call(d||i,i,_.SHOW_TEXT|_.SHOW_COMMENT|_.SHOW_CDATA_SECTION|_.SHOW_PROCESSING_INSTRUCTION,null);let g=m.nextNode();for(;g;)g.data=st(g.data),g=m.nextNode();const v=(c=i.querySelectorAll)===null||c===void 0?void 0:c.call(i,"template");v&&Ee(v,R=>{$e(R.content)&&Bt(R.content)})},at=function(i){const c=xe?xe(i):null;return typeof c!="string"||M(c)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==Et(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ye(i)||i.childNodes!==Re(i)},$e=function(i){if(!ye||typeof i!="object"||i===null)return!1;try{return ye(i)===Z.documentFragment}catch{return!1}},Ge=function(i){if(!ye||typeof i!="object"||i===null)return!1;try{return typeof ye(i)=="number"}catch{return!1}};function ae(f,i,c){f.length!==0&&Ee(f,d=>{d.call(e,i,c,Ie)})}const Qi=function(i,c){return!!(ve&&i.hasChildNodes()&&!Ge(i.firstElementChild)&&j(mi,i.textContent)&&j(mi,i.innerHTML)||ve&&i.namespaceURI===se&&_o[c]&&(Ge(i.firstElementChild)||typeof i.textContent=="string"&&j(vo[c],i.textContent))||i.nodeType===Z.processingInstruction||ve&&i.nodeType===Z.comment&&j(gi,i.data))},lt=function(i,c){if(i instanceof RegExp)return j(i,c);if(i instanceof Function){for(var d=arguments.length,m=new Array(d>2?d-2:0),g=2;g<d;g++)m[g-2]=arguments[g];return!!i(c,...m)}return!1},en=function(i,c,d){if(!je[c]&&Yr(c)&&lt(oe.tagNameCheck,c))return!1;if(Ot&&!De[c]){const m=Ae(i),g=Re(i);if(g&&m){const v=g.length;for(let R=v-1;R>=0;--R){const O=i===d?ge(g[R],!0):g[R];m.insertBefore(O,ki(i))}}}return he(i),!0},jr=function(i,c,d,m){return i.length===0?c:c===d||c===m?J(c):c},Vr=function(i,c){return i===c||Ae(i)!==null?!1:(It&&ot(i),!0)},Gr=function(i,c){if(ae(C.beforeSanitizeElements,i,null),Vr(i,c))return!0;if(at(i))return he(i),!0;const d=M(St(i));if(k=jr(C.uponSanitizeElement,k,xt,Je),ae(C.uponSanitizeElement,i,{tagName:d,allowedTags:k}),Vr(i,c))return!0;if(Qi(i,d))return he(i),!0;if(je[d]||!(de.tagCheck instanceof Function&&de.tagCheck(d))&&!k[d]){const g=en(i,d,c);return g===!1&&ae(C.afterSanitizeElements,i,null),g}if(Ue(i)===Z.element&&!Ki(i)||(d==="noscript"||d==="noembed"||d==="noframes")&&j(go,i.innerHTML))return he(i),!0;if(pe&&i.nodeType===Z.text){const g=st(i.textContent);i.textContent!==g&&(We(e.removed,{element:i.cloneNode()}),i.textContent=g)}return ae(C.afterSanitizeElements,i,null),!1},Wr=function(i,c,d){if(Tr[c]||zr(c,i)||Ar&&(c==="id"||c==="name")&&(d in t||d in Wi))return!1;const m=L[c]||de.attributeCheck instanceof Function&&de.attributeCheck(c,i);return kt&&j(Fi,c)||Er&&j(Bi,c)?!0:m?Or[c]||j(wr,Ye(d,br,""))||(c==="src"||c==="xlink:href"||c==="href")&&i!=="script"&&ai(d,"data:")===0&&Lr[i]||Sr&&!j(zi,Ye(d,br,""))?!0:!d:Yr(i)&&lt(oe.tagNameCheck,i)&&lt(oe.attributeNameCheck,c,i)||c==="is"&&oe.allowCustomizedBuiltInElements&&lt(oe.tagNameCheck,d)},tn=E({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Yr=function(i){return!tn[Xe(i)]&&j(Ui,i)},rn=function(i,c,d,m){if(Y&&typeof te=="object"&&typeof te.getAttributeType=="function"&&!d)switch(te.getAttributeType(i,c)){case"TrustedHTML":return Ce(m);case"TrustedScriptURL":return Li(m)}return m},nn=function(i,c,d,m){try{return d?i.setAttributeNS(d,c,m):i.setAttribute(c,m),at(i)?(he(i),!1):!0}catch{return we(c,i),!1}},qr=function(i){ae(C.beforeSanitizeAttributes,i,null);const c=i.attributes;if(!c||at(i))return;L=jr(C.uponSanitizeAttribute,L,Ct,Qe);const d={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let m=c.length;const g=M(i.nodeName);for(;m--;){const v=c[m],R=v.name,O=v.namespaceURI,q=v.value,X=M(R),Ut=q;let V=R==="value"?Ut:Zn(Ut),Xr=!1;if(d.attrName=X,d.attrValue=V,d.keepAttr=!0,d.forceKeepAttr=void 0,ae(C.uponSanitizeAttribute,i,d),V=d.attrValue,xr&&(X==="id"||X==="name")&&ai(V,Cr)!==0&&(we(R,i,v),V=Cr+V,Xr=!0),ve&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(R,i,v);continue}if(X==="attributename"&&si(V,"href")){we(R,i,v);continue}if(!d.forceKeepAttr){if(!d.keepAttr){we(R,i,v);continue}if(!Rr&&j(yo,V)){we(R,i,v);continue}if(pe&&(V=st(V)),!Wr(g,X,V)){we(R,i,v);continue}V=rn(g,X,O,V),V!==Ut&&nn(i,R,O,V)&&Xr&&oi(e.removed)}}ae(C.afterSanitizeAttributes,i,null)},ct=function(i){let c=null;const d=Hr(i);for(ae(C.beforeSanitizeShadowDOM,i,null);c=d.nextNode();)if(ae(C.uponSanitizeShadowNode,c,null),Gr(c,i),qr(c),$e(c.content)&&ct(c.content),Ue(c)===Z.element){const m=gr(c);$e(m)&&(zt(m),ct(m))}ae(C.afterSanitizeShadowDOM,i,null)},zt=function(i){const c=[{node:i,shadow:null}];for(;c.length>0;){const d=c.pop();if(d.shadow){ct(d.shadow);continue}const m=d.node,v=Ue(m)===Z.element,R=Re(m);if(R)for(let O=R.length-1;O>=0;--O)c.push({node:R[O],shadow:null});if(v){const O=xe?xe(m):null;if(typeof O=="string"&&M(O)==="template"){const q=m.content;$e(q)&&c.push({node:q,shadow:null})}}if(v){const O=gr(m);$e(O)&&c.push({node:null,shadow:O},{node:O,shadow:null})}}};return e.sanitize=function(f){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},c=null,d=null,m=null,g=null;if($t=!f,$t&&(f="<!-->"),typeof f!="string"&&!Ge(f)&&(f=ro(f),typeof f!="string"))throw Te("dirty is not a string, aborting");if(!e.isSupported)return f;Lt?(k=Je,L=Qe):Ft(i),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(k=J(k)),C.uponSanitizeAttribute.length>0&&(L=J(L)),e.removed=[];const v=It&&typeof f!="string"&&Ge(f);if(v){Ji(f);const q=St(f);if(typeof q=="string"){const X=M(q);if(!k[X]||je[X])throw nt(f),Te("root node is forbidden and cannot be sanitized in-place")}if(at(f))throw nt(f),Te("root node is clobbered and cannot be sanitized in-place");try{zt(f)}catch(X){throw nt(f),X}}else if(Ge(f))c=Ur("<!---->"),d=c.ownerDocument.importNode(f,!0),d.nodeType===Z.element&&d.nodeName==="BODY"||d.nodeName==="HTML"?c=d:c.appendChild(d),zt(c);else{if(!ke&&!pe&&!be&&f.indexOf("<")===-1)return Y&&tt?Ce(f):f;if(c=Ur(f),!c)return ke?null:tt?_e:""}c&&Dt&&he(c.firstChild);const R=v?f:c;try{const q=Hr(R);for(;m=q.nextNode();)Gr(m,R),qr(m),$e(m.content)&&ct(m.content)}catch(q){throw v&&(nt(f),Ee(e.removed,X=>{X.element&&ot(X.element)})),q}if(v)return Ee(e.removed,q=>{q.element&&ot(q.element)}),pe&&Bt(f),f;if(ke){if(pe&&Bt(c),et)for(g=Oi.call(c.ownerDocument);c.firstChild;)g.appendChild(c.firstChild);else g=c;return(L.shadowroot||L.shadowrootmode)&&(g=$i.call(a,g,!0)),g}let O=be?c.outerHTML:c.innerHTML;return be&&k["!doctype"]&&c.ownerDocument&&c.ownerDocument.doctype&&c.ownerDocument.doctype.name&&j(fo,c.ownerDocument.doctype.name)&&(O="<!DOCTYPE "+c.ownerDocument.doctype.name+`>
`+O),pe&&(O=st(O)),Y&&tt?Ce(O):O},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(f),Lt=!0,Je=k,Qe=L},e.clearConfig=function(){Ie=null,Lt=!1,Je=null,Qe=null,Y=Rt,_e=""},e.isValidAttribute=function(f,i,c){Ie||Ft({});const d=M(f),m=M(i);return Wr(d,m,c)},e.addHook=function(f,i){typeof i=="function"&&K(C,f)&&We(C[f],i)},e.removeHook=function(f,i){if(K(C,f)){if(i!==void 0){const c=Xn(C[f],i);return c===-1?void 0:Kn(C[f],c,1)[0]}return oi(C[f])}},e.removeHooks=function(f){K(C,f)&&(C[f]=[])},e.removeAllHooks=function(){C=yi()},e}var ht=Ci();const To=["a"];function Eo(r){ht.addHook("afterSanitizeAttributes",So);try{return ht.sanitize(r,{ALLOWED_TAGS:To})}finally{ht.removeHook("afterSanitizeAttributes")}}function So(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function Ro(r,e=100,t=!0){if(r.length<e)return r;let a=e;if(t){const l=r.indexOf(" ",e),p=l-e<=20;if(p&&l===r.length-1)return r;l!==-1&&p&&(a=l)}return Ao(r,a,e)}function Ao(r,e,t){let a=r.slice(0,e);const l=a.match(/<a/gi);if(l){const p=a.match(/<\/a/gi);if(!p||p.length<l.length){const h=r.indexOf("</a>",e),y=h-t<=20;if(y&&r.length===h+4)return r;if(h!==-1&&y)a=r.slice(0,h+4);else{const _=a.lastIndexOf("<a");a=r.slice(0,_)}}}return a.concat("...")}const xo=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function Co(r){return r.replace(/href="([^"]+)"/,(a,l)=>`href="${l.replace(".","__DOT__")}"`).replace(xo,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function ko(r){return r.trim().replace(/[ |\t]+/g," ").replace(/[\n|\r\n]+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const Lo="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var Do=Object.defineProperty,Oo=Object.getOwnPropertyDescriptor,ne=(r,e,t,a)=>{for(var l=a>1?void 0:a?Oo(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(l=(a?h(e,t,l):h(l))||l);return a&&l&&Do(e,t,l),l};let ee=class extends bt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.csrfToken="",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1,this.deleteMsg=""}render(){return this.review?w`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?w`
                  <button
                    class="delete-btn"
                    title="Delete this review"
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${Lo}
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
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return z;const e=Eo(r),t=this.truncateContent(e,this.maxBodyLength);return w`${vi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?z:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?z:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return w`
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
              ${ri(this.review.reviewer)}
            </a>
          `:w`${ri(this.review.reviewer)}`:z}get starsTemplate(){return!this.review||!this.review.stars?z:w`
      <div
        class="review-stars"
        title="${S(`${this.review.stars} out of 5 stars`)}"
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>w`<div class="review-star">
              <img
                class="star-basic"
                src=${zn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return z;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"}),a=r.getTime()!==e.getTime()?"(edited)":"";return S(`${t} ${a}`)}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:Ro(r,e)}prepReview(r){return ko(Co(r))}async deleteReview(){if(!this.review||!this.identifier||!confirm(S("Are you sure you want to delete this review?")))return;const r=new URLSearchParams({identifier:this.identifier,deleteReviewer:this.review.reviewer??"",deleteReviewerItemname:this.review.reviewer_itemname??"",csrf_token:this.csrfToken}),e=`${this.baseHost}/edit-reviews.php?${r}`;try{const t=await fetch(e,{method:"POST"});if(!t.ok)throw new Error(`Delete failed: ${t.status}`);this.deleteMsg="This review has been queued for deletion."}catch{this.deleteMsg="Sorry, we were unable to delete this review."}}static get styles(){return wt`
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
    `}};ne([T({type:Object})],ee.prototype,"review",2);ne([T({type:String})],ee.prototype,"identifier",2);ne([T({type:Number})],ee.prototype,"maxSubjectLength",2);ne([T({type:Number})],ee.prototype,"maxBodyLength",2);ne([T({type:String})],ee.prototype,"baseHost",2);ne([T({type:String})],ee.prototype,"csrfToken",2);ne([T({type:Boolean})],ee.prototype,"canDelete",2);ne([T({type:Boolean})],ee.prototype,"bypassTruncation",2);ne([G()],ee.prototype,"showTruncatedContent",2);ne([G()],ee.prototype,"deleteMsg",2);ee=ne([vt("ia-review")],ee);var _i;(function(r){r.processing="processing",r.complete="complete"})(_i||(_i={}));let dr=class extends an{constructor(){super(...arguments),this.mode="processing"}render(){return ln`
      <div class="${this.mode}">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">Activity Indicator</title>
          <desc id="indicatorDescription">
            A rotating activity indicator with three dots in the middle.
          </desc>
          <g
            id="icons/check-ring---squared"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="completed-ring"
              class="loaded-indicator"
              d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <polygon
              id="check"
              class="loaded-indicator"
              transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
              points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
            ></polygon>
            <path
              id="activity-ring"
              class="activity-indicator"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="activity-indicator"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `}static get styles(){const e=I`var(--activityIndicatorCheckmarkColor, #31A481)`,t=I`var(--activityIndicatorCompletedRingColor, #31A481)`,a=I`var(--activityIndicatorLoadingRingColor, #333333)`,l=I`var(--activityIndicatorLoadingDotColor, #333333)`;return I`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${a};
      }

      #activity-dots {
        fill: ${l};
      }

      .activity-indicator {
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }

      .processing .activity-indicator {
        opacity: 1;
      }

      .loaded-indicator {
        opacity: 1;
        transition: opacity 0.25s ease-out;
      }

      .processing .loaded-indicator {
        opacity: 0;
      }

      .image {
        border: 1px solid red;
        display: inline-block;
      }

      .processing #activity-ring {
        animation: rotate 1.3s infinite linear;
        transform-origin: 50px 50px;
        transform-box: fill-box;
      }

      .processing #left-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.2s;
      }

      .processing #middle-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.4s;
      }

      .processing #right-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.6s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(-360deg);
        }
        100% {
          /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
          transform: rotate(0deg);
        }
      }

      @keyframes dot {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}};n([on({type:String})],dr.prototype,"mode",void 0);dr=n([sn("ia-activity-indicator")],dr);const Io="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",$o="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var Po=Object.defineProperty,Mo=Object.getOwnPropertyDescriptor,N=(r,e,t,a)=>{for(var l=a>1?void 0:a?Mo(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(l=(a?h(e,t,l):h(l))||l);return a&&l&&Po(e,t,l),l};let $=class extends bt{constructor(){super(...arguments),this.token="",this.baseHost="https://archive.org",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.formCanSubmit=!1,this.submissionInProgress=!1,this.RECAPTCHA_ERROR_MESSAGE="Could not validate review. Please try again later.",this.GENERIC_ERROR_MESSAGE="There's been a temporary error. Please wait a moment and try again."}render(){return w`<form id="review-form" @submit=${this.handleSubmit}>
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
            <span class="error-msg">${S(this.unrecoverableError)}</span>
          </div>
        `:z}get recoverableErrorTemplate(){return this.recoverableError?w`
          <div class="recoverable-error">
            ${vi(this.sanitizeErrorMsg(S(this.recoverableError)))}
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
        ${[1,2,3,4,5].map(r=>this.renderStar(r))}
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
    `}get hiddenInputsTemplate(){return w`
      <input type="hidden" name="field_reviewtoken" .value=${this.token} />
      ${this.identifier?w`<input
            type="hidden"
            name="identifier"
            .value=${this.identifier}
          />`:z}
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
                <ia-activity-indicator></ia-activity-indicator>
              </span>
            `:S("Submit review")}
      </button>
    </div>`}renderStar(r){const e=r===this.currentStars,t=S(`Rate ${r>1?`${r} stars`:"1 star"}`);return w`
      <button
        class="star star-${r}"
        title=${e?S("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,r)}
      >
        ${r<=this.currentStars?w`<img
              class="star-selected"
              src=${Io}
              alt=""
              aria-hidden="true"
            />`:w`<img
              class="star-unselected"
              src=${$o}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.unrecoverableError=this.RECAPTCHA_ERROR_MESSAGE}}sanitizeErrorMsg(r){return ht.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.fetchHandler)return this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission();try{const e=new URLSearchParams;if(!this.bypassRecaptcha){const a=await this.getRecaptchaToken();if(!a)return this.handleRecaptchaError();e.append("g-recaptcha-response",a??"")}for(const a of new FormData(this.reviewForm))e.append(a[0],a[1]);e.append("submitter","review-form");const t=await this.fetchHandler.fetchApiResponse(`${this.baseHost}${this.endpointPath}`,{method:"POST",includeCredentials:!0,body:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),l=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(l)}else this.recoverableError=t.error??this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}catch(e){console.error(e),this.recoverableError=this.GENERIC_ERROR_MESSAGE,this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new me({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname,reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.recoverableError=this.RECAPTCHA_ERROR_MESSAGE,this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableError||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[Si,wt`
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
          --activityIndicatorLoadingRingColor: #fff;
          --activityIndicatorLoadingDotColor: #fff;
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
      `]}};N([T({type:String})],$.prototype,"identifier",2);N([T({type:String})],$.prototype,"token",2);N([T({type:String})],$.prototype,"baseHost",2);N([T({type:String})],$.prototype,"endpointPath",2);N([T({type:String})],$.prototype,"submitterScreenname",2);N([T({type:String})],$.prototype,"submitterItemname",2);N([T({type:Object})],$.prototype,"oldReview",2);N([T({type:String})],$.prototype,"unrecoverableError",2);N([T({type:Number})],$.prototype,"maxSubjectLength",2);N([T({type:Number})],$.prototype,"maxBodyLength",2);N([T({type:Object})],$.prototype,"fetchHandler",2);N([T({type:Object})],$.prototype,"recaptchaManager",2);N([T({type:Boolean})],$.prototype,"bypassRecaptcha",2);N([G()],$.prototype,"currentStars",2);N([G()],$.prototype,"currentSubjectLength",2);N([G()],$.prototype,"currentBodyLength",2);N([G()],$.prototype,"recoverableError",2);N([G()],$.prototype,"formCanSubmit",2);N([G()],$.prototype,"submissionInProgress",2);N([bi("#review-form")],$.prototype,"reviewForm",2);$=N([vt("ia-review-form")],$);var No=Object.defineProperty,Fo=Object.getOwnPropertyDescriptor,x=(r,e,t,a)=>{for(var l=a>1?void 0:a?Fo(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(l=(a?h(e,t,l):h(l))||l);return a&&l&&No(e,t,l),l};let A=class extends bt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.token="",this.endpointPath="/write-review.php",this.submitterScreenname="Anonymous",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.fetchHandler=new Cn,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?w`
      <div class="reviews-list">
        ${this.reviewsFrozen?w`<div class="message">
              ${S("Reviews can no longer be added to this item.")}
            </div>`:z}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(r=>r.reviewer_itemname!==this.submitterItemname?this.renderReview(r):z)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(r){(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),r.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}get reviewsDisabledTemplate(){return w`<div class="message">
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
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{!r&&t.reviewer_itemname===this.submitterItemname?r=t:e.push(t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r){return r?w`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .csrfToken=${this.token}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:z}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[Si,wt`
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
      `]}};x([T({type:String})],A.prototype,"identifier",2);x([T({type:Array})],A.prototype,"reviews",2);x([T({type:Boolean})],A.prototype,"reviewsDisabled",2);x([T({type:Boolean})],A.prototype,"reviewsFrozen",2);x([T({type:Boolean})],A.prototype,"canDelete",2);x([T({type:Boolean})],A.prototype,"displayReviewsByDefault",2);x([T({type:Number})],A.prototype,"maxSubjectLength",2);x([T({type:Number})],A.prototype,"maxBodyLength",2);x([T({type:String})],A.prototype,"baseHost",2);x([T({type:String})],A.prototype,"token",2);x([T({type:String})],A.prototype,"endpointPath",2);x([T({type:String})],A.prototype,"submitterScreenname",2);x([T({type:String})],A.prototype,"submitterItemname",2);x([T({type:Object})],A.prototype,"recaptchaManager",2);x([T({type:Boolean})],A.prototype,"bypassRecaptcha",2);x([T({type:String})],A.prototype,"reviewSubmissionError",2);x([T({type:Boolean})],A.prototype,"reviewAddEditRequested",2);x([T({type:Object})],A.prototype,"fetchHandler",2);x([G()],A.prototype,"displayReviewForm",2);x([G()],A.prototype,"displayReviews",2);x([G()],A.prototype,"filteredReviews",2);x([G()],A.prototype,"currentReview",2);x([G()],A.prototype,"reviewsCount",2);x([G()],A.prototype,"recaptchaActivated",2);A=x([vt("ia-reviews")],A);var Bo=Object.defineProperty,zo=Object.getOwnPropertyDescriptor,fr=(r,e,t,a)=>{for(var l=a>1?void 0:a?zo(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(l=(a?h(e,t,l):h(l))||l);return a&&l&&Bo(e,t,l),l};const Uo=[new me({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new me({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new me({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],Ho=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],jo=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Ada Fielding"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Vo={async fetch(){return new Response("{}",{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},Go=6;let _t=class extends bt{constructor(){super(...arguments),this.log=[]}render(){return w`
      <story-template
        elementTag="ia-reviews"
        elementClassName="IAReviews"
        .styleInputData=${{settings:Ho}}
        .propInputData=${{settings:jo}}
        .defaultUsageProps=${'.reviews=${reviews} identifier="nasa"'}
      >
        <ia-reviews
          slot="demo"
          identifier="nasa"
          displayReviewsByDefault
          bypassRecaptcha
          submitterScreenname="Ada Fielding"
          .reviews=${Uo}
          .fetchHandler=${Vo}
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,Go)}static get styles(){return wt`
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
    `}};fr([G()],_t.prototype,"log",2);fr([bi("ia-reviews")],_t.prototype,"reviews",2);_t=fr([vt("ia-reviews-story")],_t);export{_t as IAReviewsStory};
