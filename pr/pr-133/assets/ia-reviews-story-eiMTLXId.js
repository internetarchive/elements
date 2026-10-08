import{m as T,b,r as H,n as S,c as vt,i as wt,A as z,o as hi,s as $e,a as bt,e as fi}from"./index-BjNO2CvH.js";import{_ as n}from"./tslib.es6-kHcLnhpD.js";import{l as ar}from"./localized-decorator-Bh5YLMsf.js";import"./ia-button-CG4P5tx_.js";import"./story-template-Cq8RbAkj.js";import"./ia-status-indicator-gdi-3ekh.js";import"./masked-icon-y1m2RmyS.js";function s(r){let e,t,a;return e=r,(c,p,h)=>{if(h.value!=null)h.value=Gr(h.value,e,t,a);else if(h.get!=null)h.get=Gr(h.get,e,t,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ht=new Map;function Gr(r,e,t=0,a){const c=Symbol("__memoized_map__");return function(...p){let h;this.hasOwnProperty(c)||Object.defineProperty(this,c,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let y=this[c];if(Array.isArray(a))for(const _ of a)Ht.has(_)?Ht.get(_).push(y):Ht.set(_,[y]);if(e||p.length>0||t>0){let _;e===!0?_=p.map(ee=>ee.toString()).join("!"):e?_=e.apply(this,p):_=p[0];const P=`${_}__timestamp`;let N=!1;if(t>0)if(!y.has(P))N=!0;else{let ee=y.get(P);N=Date.now()-ee>t}y.has(_)&&!N?h=y.get(_):(h=r.apply(this,p),y.set(_,h),t>0&&y.set(P,Date.now()))}else{const _=this;y.has(_)?h=y.get(_):(h=r.apply(this,p),y.set(_,h))}return h}}class ft{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}ft.shared=new ft;class re{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}re.shared=new re;class mt{parseValue(e){return re.shared.parseValue(e)}}mt.shared=new mt;class Ue{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,p,h="00",y="00",_="00"]=t,P=new Date(`${a}-${c}-${p}T${h}:${y}:${_}`);return Number.isNaN(P.getTime())?void 0:P}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}Ue.shared=new Ue;class gt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,p)=>{const h=parseFloat(c);if(Number.isNaN(h))return t=!0,0;const _=60**(e.length-1-p);return h*Math.floor(_)}).reduce((c,p)=>c+p,0);return t?void 0:a}}gt.shared=new gt;class mi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(p=>p.trim()).map(p=>this.parser.parseValue(p)),c=[];return a.forEach(p=>{p!==void 0&&c.push(p)}),c}}class yt{parseValue(e){return String(e)}}yt.shared=new yt;function Ie(r,e,...t){for(const a of t){const c=r[a];if(c!=null)return e(c)}}function le(r,e,...t){return Ie(r,a=>e(a),...t)}class ce{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=re.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return le(this.rawValue,e=>mt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return le(this.rawValue,e=>gt.shared.parseValue(e),"length")}get height(){return le(this.rawValue,e=>re.shared.parseValue(e),"height")}get width(){return le(this.rawValue,e=>re.shared.parseValue(e),"width")}get track(){return le(this.rawValue,e=>re.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return le(this.rawValue,e=>re.shared.parseValue(e),"bitrate")}get private(){return le(this.rawValue,e=>ft.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([s()],ce.prototype,"mtime",null);n([s()],ce.prototype,"size",null);n([s()],ce.prototype,"length",null);n([s()],ce.prototype,"height",null);n([s()],ce.prototype,"width",null);n([s()],ce.prototype,"track",null);n([s()],ce.prototype,"bitrate",null);n([s()],ce.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}n([s()],W.prototype,"values",null);n([s()],W.prototype,"value",null);class ae extends W{constructor(e){super(ft.shared,e)}}class D extends W{constructor(e){super(Ue.shared,e)}}class jt extends W{constructor(e){super(gt.shared,e)}}class w extends W{constructor(e){super(re.shared,e)}}class u extends W{constructor(e){super(yt.shared,e)}}class ze{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Ne extends W{constructor(e,t){super(t,e)}}const Ji=new ze(["rl","lr"]);class Qi extends Ne{constructor(e){super(e,Ji)}}class ut extends W{constructor(e){super(mt.shared,e)}}const en=new ze(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class tn extends Ne{constructor(e){super(e,en)}}class gi extends W{constructor(e,t){super(t,e)}}class Yr extends gi{constructor(e){const t=new mi(yt.shared);super(e,t)}}class Vt extends gi{constructor(e){const t=new mi(re.shared);super(e,t)}}const rn=/^([0-9a-f]{32})\s+\*?(.+)$/i,nn=/^(.+):([0-9a-f]{32})$/i;function sn(r){const e=r.match(rn);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(nn);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Zt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(sn).filter(a=>a!==void 0);return t.length?t:void 0}}Zt.shared=new Zt;class qr extends W{constructor(e){super(Zt.shared,e)}}function dt(r,e){var t;const a=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class Jt{parseValue(e){if(typeof e!="string")return;const t=dt(e,"curator"),a=dt(e,"date"),c=dt(e,"comment"),p=dt(e,"state");if(!(!t&&!a&&!c&&!p))return{curator:t,date:a?Ue.shared.parseValue(a):void 0,comment:c,state:p}}}Jt.shared=new Jt;class on extends W{constructor(e){super(Jt.shared,e)}}class Qt{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}Qt.shared=new Qt;class an extends W{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),p=parseInt(t[3],10);return{hours:a*c,minutes:p,totalMinutes:a*(c*60+p)}}}er.shared=new er;class ln extends W{constructor(e){super(er.shared,e)}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}tr.shared=new tr;class cn extends W{constructor(e){super(tr.shared,e)}}const un=new ze(["true","none","frozen"]),dn=new ze(["sound","silent"]),pn=new ze(["color","b&w"]),hn=new ze(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(w,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(w,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(w,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(w,"bookplateleaf")}get bookreader_defaults(){return Ie(this.rawMetadata,e=>new Ne(e,hn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(on,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(D,"date-case-filed")}get date_case_terminated(){return this.field(D,"date-case-terminated")}get date_created(){return this.field(D,"date_created")}get date_last_filing(){return this.field(D,"date-last-filing")}get derive_submittime(){return this.field(D,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(w,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(D,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(D,"filesxml")}get firstfiledate(){return this.field(D,"firstfiledate")}get firstfileserial(){return this.field(w,"firstfileserial")}get foldoutcount(){return this.field(w,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(ae,"has_mp3")}get height(){return this.field(w,"height")}get hidden(){return this.field(ae,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(ae,"access-restricted-item")}get addeddate(){return this.field(D,"addeddate")}get aspect_ratio(){return this.field(an,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(w,"audio_sample_rate")}get avg_rating(){return this.field(w,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(ae,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(ut,"collection_size")}get color(){return Ie(this.rawMetadata,e=>new Ne(e,pn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(D,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(w,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(w,"files_count")}get frames_per_second(){return this.field(w,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(w,"image_count")}get imagecount(){return this.field(w,"imagecount")}get indexdate(){return this.field(D,"indexdate")}get invoice(){return this.field(w,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(w,"issue_count")}get issue_page_count(){return this.field(w,"issue_page_count")}get item_count(){return this.field(w,"item_count")}get item_size(){return this.field(ut,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(D,"lastdate")}get lastfiledate(){return this.field(D,"lastfiledate")}get lastfileserial(){return this.field(w,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(ae,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(qr,"md5contents")}get md5s(){return this.field(qr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(ae,"monochromatic")}get month(){return this.field(w,"month")}get mediatype(){return this.field(tn,"mediatype")}get mpeg_program(){return this.field(w,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(ae,"noarchivetorrent")}get noindex(){return this.field(ae,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(w,"num_favorites")}get num_reviews(){return this.field(w,"num_reviews")}get numeric_id(){return this.field(w,"numeric_id")}get numwarcs(){return this.field(w,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(ae,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(w,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(w,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(w,"output_time_minutes")}get pacer_case_num(){return this.field(w,"pacer-case-num")}get packaging_time_minutes(){return this.field(w,"packaging_time_minutes")}get page_number_confidence(){return this.field(w,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(Qi,"page-progression","page_progression")}get paginated(){return this.field(ae,"paginated")}get parse_date(){return this.field(D,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(w,"pick")}get podcastindexid(){return this.field(w,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(w,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(D,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(w,"rcs_key")}get repub_state(){return this.field(w,"repub_state")}get republisher_date(){return this.field(D,"republisher_date")}get republisher_operator(){return this.field(Yr,"republisher_operator")}get republisher_time(){return this.field(w,"republisher_time")}get reviewdate(){return this.field(D,"reviewdate")}get reviews_allowed(){return Ie(this.rawMetadata,e=>new Ne(e,un),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(D,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(w,"scan_time_minutes")}get scandate(){return this.field(D,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(w,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(ut,"size")}get sizehint(){return this.field(ut,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Ie(this.rawMetadata,e=>new Ne(e,dn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(w,"source_pixel_height")}get source_pixel_width(){return this.field(w,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(D,"sponsordate")}get start_localtime(){return this.field(D,"start_localtime")}get start_time(){return this.field(D,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(D,"stop_time")}get subject(){return this.field(Yr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(w,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(cn,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(D,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(ln,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(w,"week")}get width(){return this.field(w,"width")}get year(){return this.field(w,"year")}field(e,...t){return Ie(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}n([s()],o.prototype,"access",null);n([s()],o.prototype,"adder",null);n([s()],o.prototype,"amrc_id",null);n([s()],o.prototype,"archiveit_account_id",null);n([s()],o.prototype,"archiveit_account_organization_name",null);n([s()],o.prototype,"archiveit_collection_id",null);n([s()],o.prototype,"archiveit_collection_name",null);n([s()],o.prototype,"archiveit_job_type",null);n([s()],o.prototype,"audit_time_minutes",null);n([s()],o.prototype,"auditor",null);n([s()],o.prototype,"author",null);n([s()],o.prototype,"autocrop_version",null);n([s()],o.prototype,"bookplateleaf",null);n([s()],o.prototype,"bookreader_defaults",null);n([s()],o.prototype,"boxid",null);n([s()],o.prototype,"camera",null);n([s()],o.prototype,"cameraman",null);n([s()],o.prototype,"canister",null);n([s()],o.prototype,"case_name",null);n([s()],o.prototype,"col_number",null);n([s()],o.prototype,"collection_added",null);n([s()],o.prototype,"collection_library",null);n([s()],o.prototype,"collection_set",null);n([s()],o.prototype,"copyright_holder",null);n([s()],o.prototype,"court",null);n([s()],o.prototype,"crawler",null);n([s()],o.prototype,"crawljob",null);n([s()],o.prototype,"curation",null);n([s()],o.prototype,"dari_title",null);n([s()],o.prototype,"dari_title_romanized",null);n([s()],o.prototype,"date_case_filed",null);n([s()],o.prototype,"date_case_terminated",null);n([s()],o.prototype,"date_created",null);n([s()],o.prototype,"date_last_filing",null);n([s()],o.prototype,"derive_submittime",null);n([s()],o.prototype,"derive_version",null);n([s()],o.prototype,"discs",null);n([s()],o.prototype,"docket_num",null);n([s()],o.prototype,"external_metadata_update",null);n([s()],o.prototype,"fail_reasons",null);n([s()],o.prototype,"filesxml",null);n([s()],o.prototype,"firstfiledate",null);n([s()],o.prototype,"firstfileserial",null);n([s()],o.prototype,"foldoutcount",null);n([s()],o.prototype,"format",null);n([s()],o.prototype,"geo_restricted",null);n([s()],o.prototype,"guid",null);n([s()],o.prototype,"has_mp3",null);n([s()],o.prototype,"height",null);n([s()],o.prototype,"hidden",null);n([s()],o.prototype,"ia_orig__runtime",null);n([s()],o.prototype,"access_restricted_item",null);n([s()],o.prototype,"addeddate",null);n([s()],o.prototype,"aspect_ratio",null);n([s()],o.prototype,"audio_codec",null);n([s()],o.prototype,"audio_sample_rate",null);n([s()],o.prototype,"avg_rating",null);n([s()],o.prototype,"backup_location",null);n([s()],o.prototype,"ccnum",null);n([s()],o.prototype,"closed_captioning",null);n([s()],o.prototype,"collection",null);n([s()],o.prototype,"collections_raw",null);n([s()],o.prototype,"collection_size",null);n([s()],o.prototype,"color",null);n([s()],o.prototype,"contact",null);n([s()],o.prototype,"contributor",null);n([s()],o.prototype,"coverage",null);n([s()],o.prototype,"creator",null);n([s()],o.prototype,"creator_alt_script",null);n([s()],o.prototype,"credits",null);n([s()],o.prototype,"collection_layout",null);n([s()],o.prototype,"date",null);n([s()],o.prototype,"description",null);n([s()],o.prototype,"downloads",null);n([s()],o.prototype,"duration",null);n([s()],o.prototype,"external_identifier",null);n([s()],o.prototype,"external_link",null);n([s()],o.prototype,"files_count",null);n([s()],o.prototype,"frames_per_second",null);n([s()],o.prototype,"identifier_access",null);n([s()],o.prototype,"identifier_ark",null);n([s()],o.prototype,"identifier_bib",null);n([s()],o.prototype,"image_count",null);n([s()],o.prototype,"imagecount",null);n([s()],o.prototype,"indexdate",null);n([s()],o.prototype,"invoice",null);n([s()],o.prototype,"isbn",null);n([s()],o.prototype,"issue",null);n([s()],o.prototype,"issue_count",null);n([s()],o.prototype,"issue_page_count",null);n([s()],o.prototype,"item_count",null);n([s()],o.prototype,"item_size",null);n([s()],o.prototype,"language",null);n([s()],o.prototype,"lastdate",null);n([s()],o.prototype,"lastfiledate",null);n([s()],o.prototype,"lastfileserial",null);n([s()],o.prototype,"length",null);n([s()],o.prototype,"license",null);n([s()],o.prototype,"licenseurl",null);n([s()],o.prototype,"lineage",null);n([s()],o.prototype,"mature_content",null);n([s()],o.prototype,"md5",null);n([s()],o.prototype,"md5contents",null);n([s()],o.prototype,"md5s",null);n([s()],o.prototype,"medium",null);n([s()],o.prototype,"metadata_operator",null);n([s()],o.prototype,"metasource_catalog",null);n([s()],o.prototype,"monochromatic",null);n([s()],o.prototype,"month",null);n([s()],o.prototype,"mediatype",null);n([s()],o.prototype,"mpeg_program",null);n([s()],o.prototype,"next_item",null);n([s()],o.prototype,"noarchivetorrent",null);n([s()],o.prototype,"noindex",null);n([s()],o.prototype,"notes",null);n([s()],o.prototype,"num_favorites",null);n([s()],o.prototype,"num_reviews",null);n([s()],o.prototype,"numeric_id",null);n([s()],o.prototype,"numwarcs",null);n([s()],o.prototype,"ocr",null);n([s()],o.prototype,"ocr_autonomous",null);n([s()],o.prototype,"ocr_detected_lang",null);n([s()],o.prototype,"ocr_detected_lang_conf",null);n([s()],o.prototype,"ocr_detected_script",null);n([s()],o.prototype,"ocr_detected_script_conf",null);n([s()],o.prototype,"ocr_invalid_language",null);n([s()],o.prototype,"ocr_module_version",null);n([s()],o.prototype,"ocr_parameters",null);n([s()],o.prototype,"old_pallet",null);n([s()],o.prototype,"openlibrary_edition",null);n([s()],o.prototype,"openlibrary_work",null);n([s()],o.prototype,"operator",null);n([s()],o.prototype,"originalurl",null);n([s()],o.prototype,"osf_category",null);n([s()],o.prototype,"osf_project",null);n([s()],o.prototype,"osf_registration_doi",null);n([s()],o.prototype,"osf_registration_schema",null);n([s()],o.prototype,"osf_registry",null);n([s()],o.prototype,"osf_subjects",null);n([s()],o.prototype,"osf_tags",null);n([s()],o.prototype,"output_time_minutes",null);n([s()],o.prototype,"pacer_case_num",null);n([s()],o.prototype,"packaging_time_minutes",null);n([s()],o.prototype,"page_number_confidence",null);n([s()],o.prototype,"page_number_module_version",null);n([s()],o.prototype,"page_progression",null);n([s()],o.prototype,"paginated",null);n([s()],o.prototype,"parse_date",null);n([s()],o.prototype,"parse_state",null);n([s()],o.prototype,"partner",null);n([s()],o.prototype,"pashto_title",null);n([s()],o.prototype,"pashto_title_romanized",null);n([s()],o.prototype,"pdf_degraded",null);n([s()],o.prototype,"pdf_module_version",null);n([s()],o.prototype,"pick",null);n([s()],o.prototype,"podcastindexid",null);n([s()],o.prototype,"post_text",null);n([s()],o.prototype,"ppi",null);n([s()],o.prototype,"previous_item",null);n([s()],o.prototype,"program",null);n([s()],o.prototype,"publicdate",null);n([s()],o.prototype,"publisher",null);n([s()],o.prototype,"political_religious_party",null);n([s()],o.prototype,"rcs_key",null);n([s()],o.prototype,"repub_state",null);n([s()],o.prototype,"republisher_date",null);n([s()],o.prototype,"republisher_operator",null);n([s()],o.prototype,"republisher_time",null);n([s()],o.prototype,"reviewdate",null);n([s()],o.prototype,"reviews_allowed",null);n([s()],o.prototype,"ribbon_state",null);n([s()],o.prototype,"ribbon_state_modify_date",null);n([s()],o.prototype,"rights",null);n([s()],o.prototype,"rights_holder",null);n([s()],o.prototype,"rssfeed",null);n([s()],o.prototype,"runtime",null);n([s()],o.prototype,"scan_time_minutes",null);n([s()],o.prototype,"scandate",null);n([s()],o.prototype,"scanfee",null);n([s()],o.prototype,"scanner",null);n([s()],o.prototype,"scanner_operator",null);n([s()],o.prototype,"scanningcenter",null);n([s()],o.prototype,"scribe3_search_catalog",null);n([s()],o.prototype,"scribe3_search_id",null);n([s()],o.prototype,"segments",null);n([s()],o.prototype,"sessionid",null);n([s()],o.prototype,"shndiscs",null);n([s()],o.prototype,"shotlist",null);n([s()],o.prototype,"signal_path",null);n([s()],o.prototype,"size",null);n([s()],o.prototype,"sizehint",null);n([s()],o.prototype,"software_version",null);n([s()],o.prototype,"sort_order",null);n([s()],o.prototype,"sound",null);n([s()],o.prototype,"soundcreator",null);n([s()],o.prototype,"soundtitle",null);n([s()],o.prototype,"source",null);n([s()],o.prototype,"source_pixel_height",null);n([s()],o.prototype,"source_pixel_width",null);n([s()],o.prototype,"source_url",null);n([s()],o.prototype,"sponsor",null);n([s()],o.prototype,"sponsordate",null);n([s()],o.prototype,"start_localtime",null);n([s()],o.prototype,"start_time",null);n([s()],o.prototype,"station_name",null);n([s()],o.prototype,"stop_time",null);n([s()],o.prototype,"subject",null);n([s()],o.prototype,"taper",null);n([s()],o.prototype,"thumbs",null);n([s()],o.prototype,"times",null);n([s()],o.prototype,"title",null);n([s()],o.prototype,"title_alt_script",null);n([s()],o.prototype,"transferer",null);n([s()],o.prototype,"track",null);n([s()],o.prototype,"tts_version",null);n([s()],o.prototype,"tuner",null);n([s()],o.prototype,"type",null);n([s()],o.prototype,"updatedate",null);n([s()],o.prototype,"updater",null);n([s()],o.prototype,"uploader",null);n([s()],o.prototype,"uploadsoftware",null);n([s()],o.prototype,"utc_offset",null);n([s()],o.prototype,"venue",null);n([s()],o.prototype,"video_codec",null);n([s()],o.prototype,"volume",null);n([s()],o.prototype,"website",null);n([s()],o.prototype,"week",null);n([s()],o.prototype,"width",null);n([s()],o.prototype,"year",null);class fe{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return le(this.rawValue,e=>Ue.shared.parseValue(e),"reviewdate")}get createdate(){return le(this.rawValue,e=>Ue.shared.parseValue(e),"createdate")}get stars(){return le(this.rawValue,e=>re.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([s()],fe.prototype,"reviewdate",null);n([s()],fe.prototype,"createdate",null);n([s()],fe.prototype,"stars",null);class fn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ce(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new fe(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Se;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Se||(Se={}));class rr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class mn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let p;try{const h=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};p=await fetch(c.href,h)}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.networkError,y)}try{const h=await p.json(),y=h.error;if(y){const _=h.forensics;return this.getErrorResult(Se.searchEngineError,y,_)}else return{success:h}}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.decodingError,y)}}getErrorResult(e,t,a){return{error:new rr(e,t,a)}}}class Xr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new rr(Se.itemNotFound)}:{success:new fn(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new rr(Se.itemNotFound)}:{success:c.success.result}}}Xr.default=new Xr(new mn);function Kr(r){return new Promise(e=>setTimeout(e,r))}class ir{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}ir.shared=new ir;class nr{shouldRetry(){return!1}retryDelay(){return null}}nr.shared=new nr;class lr{}lr.default=ir.shared;lr.noRetry=nr.shared;const yi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class gn{constructor(e){this.retryConfig=lr.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=yi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,p;const h=typeof e=="string"?e:e.url;try{const y=await fetch(e,a?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const _=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(_.shouldRetry(y,t)){const N=_.retryDelay(t,y);if(N!==null)return await Kr(N),this.logRetryEvent(h,t,y.statusText,y.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(h,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(h,y),y;const _=(p=a?.retryConfig)!==null&&p!==void 0?p:this.retryConfig;if(_.shouldRetry(null,t)){const N=_.retryDelay(t);if(N!==null)return await Kr(N),this.logRetryEvent(h,t,y,y),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(h,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var p;(p=this.analyticsHandler)===null||p===void 0||p.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const yn=new Set(["POST","PUT","DELETE","PATCH"]);class cr{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new gn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;a=this.addSearchParams(h,{reCache:"1"})}const p=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,p)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((_,P)=>{c.set(P,_)}),a.headers=c;const p=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(p,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,p,h;if(!this.getCsrfToken)return t;const y=(a=yi(t))!==null&&a!==void 0?a:{};if(!y.includeCsrfToken)return t;const _=(c=y.requestInit)!==null&&c!==void 0?c:{},P=((h=(p=_.method)!==null&&p!==void 0?p:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!yn.has(P))return t;const N=new Headers(_.headers);return N.has("X-CSRF-Token")?t:(N.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{..._,headers:N}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),p=a===-1?e:e.slice(0,a),h=p.indexOf("?"),y=h===-1?p:p.slice(0,h),_=new URLSearchParams(h===-1?"":p.slice(h+1)),P=cr.asSearchParams(t),N=new Set;P.forEach((te,me)=>{N.has(me)||(N.add(me),_.delete(me))}),P.forEach((te,me)=>{_.append(me,te)});const ee=_.toString();return`${y}${ee?`?${ee}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class _n extends cr{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const vn="/write-review.php",wn="/edit-reviews.php";class _i{constructor(e){this.fetchHandler=e?.fetchHandler??new _n,this.baseHost=e?.baseHost??"https://archive.org",this.submitPath=e?.submitPath??vn,this.deletePath=e?.deletePath??wn,this.deleteMethod=e?.deleteMethod??"POST"}async submitReview(e){const t=new URLSearchParams;return t.append("identifier",e.identifier),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_stars",e.stars??"0"),e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:t})}async deleteReview(e){const t=new URLSearchParams;t.append("identifier",e.identifier),t.append("deleteReviewer",e.reviewer),e.reviewerItemname&&t.append("deleteReviewerItemname",e.reviewerItemname);const a=`${this.baseHost}${this.deletePath}?${t.toString()}`;return this.request(a,{method:this.deleteMethod})}async request(e,t){try{const a=await this.fetchHandler.fetch(e,{requestInit:{method:t.method,body:t.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(a)}catch(a){return console.error("Review request failed",a),{success:!1,error:this.genericError}}}async parseResult(e){let t;try{t=await e.json()}catch{t=void 0}return e.ok?!t||t.success?{success:!0}:{success:!1,error:t.error??this.genericError}:{success:!1,error:t?.error??this.genericError}}get genericError(){return T("Sorry, something went wrong. Please try again later.")}}const bn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Zr(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return b`<span title="${r}">${t}</span>`}function Jr(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,a=Array(e);t<e;t++)a[t]=r[t];return a}function Tn(r){if(Array.isArray(r))return r}function Sn(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var a,c,p,h,y=[],_=!0,P=!1;try{if(p=(t=t.call(r)).next,e!==0)for(;!(_=(a=p.call(t)).done)&&(y.push(a.value),y.length!==e);_=!0);}catch(N){P=!0,c=N}finally{try{if(!_&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if(P)throw c}}return y}}function En(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Rn(r,e){return Tn(r)||Sn(r,e)||An(r,e)||En()}function An(r,e){if(r){if(typeof r=="string")return Jr(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Jr(r,e):void 0}}const vi=Object.entries,Qr=Object.setPrototypeOf,xn=Object.isFrozen,Cn=Object.getPrototypeOf,Ln=Object.getOwnPropertyDescriptor;let U=Object.freeze,B=Object.seal,Me=Object.create,wi=typeof Reflect<"u"&&Reflect,sr=wi.apply,or=wi.construct;U||(U=function(e){return e});B||(B=function(e){return e});sr||(sr=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),p=2;p<a;p++)c[p-2]=arguments[p];return e.apply(t,c)});or||(or=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const Te=$(Array.prototype.forEach),Dn=$(Array.prototype.lastIndexOf),ei=$(Array.prototype.pop),Ge=$(Array.prototype.push),On=$(Array.prototype.splice),Fe=Array.isArray,Xe=$(String.prototype.toLowerCase),Wt=$(String.prototype.toString),ti=$(String.prototype.match),Ye=$(String.prototype.replace),ri=$(String.prototype.indexOf),kn=$(String.prototype.trim),Pn=$(Number.prototype.toString),In=$(Boolean.prototype.toString),ii=typeof BigInt>"u"?null:$(BigInt.prototype.toString),ni=typeof Symbol>"u"?null:$(Symbol.prototype.toString),X=$(Object.prototype.hasOwnProperty),qe=$(Object.prototype.toString),j=$(RegExp.prototype.test),be=Mn(TypeError);function $(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return sr(r,e,a)}}function Mn(r){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return or(r,t)}}function E(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(Qr&&Qr(r,null),!Fe(e))return r;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const p=t(c);p!==c&&(xn(e)||(e[a]=p),c=p)}r[c]=!0}return r}function Nn(r){for(let e=0;e<r.length;e++)X(r,e)||(r[e]=null);return r}function Z(r){const e=Me(null);for(const a of vi(r)){var t=Rn(a,2);const c=t[0],p=t[1];X(r,c)&&(Fe(p)?e[c]=Nn(p):p&&typeof p=="object"&&p.constructor===Object?e[c]=Z(p):e[c]=p)}return e}function $n(r){switch(typeof r){case"string":return r;case"number":return Pn(r);case"boolean":return In(r);case"bigint":return ii?ii(r):"0";case"symbol":return ni?ni(r):"Symbol()";case"undefined":return qe(r);case"function":case"object":{if(r===null)return qe(r);const e=r,t=J(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:qe(a)}return qe(r)}default:return qe(r)}}function J(r,e){for(;r!==null;){const a=Ln(r,e);if(a){if(a.get)return $(a.get);if(typeof a.value=="function")return $(a.value)}r=Cn(r)}function t(){return null}return t}function Fn(r){try{return j(r,""),!0}catch{return!1}}const si=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Yt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Un=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zn=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),oi=U(["#text"]),ai=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Xt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),li=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pt=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bn=B(/{{[\w\W]*|^[\w\W]*}}/g),Hn=B(/<%[\w\W]*|^[\w\W]*%>/g),jn=B(/\${[\w\W]*/g),Vn=B(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wn=B(/^aria-[\-\w]+$/),ci=B(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gn=B(/^(?:\w+script|data):/i),Yn=B(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),qn=B(/^html$/i),Xn=B(/^[a-z][.\w]*(-[.\w]+)+$/i),ui=B(/<[/\w!]/g),di=B(/<[/\w]/g),Kn=B(/<\/no(script|embed|frames)/i),Zn=B(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Jn=U(E({},bi)),Qn=(function(){const r={};return Te(bi,e=>{r[e]=B(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(r)})(),es=function(){return typeof window>"u"?null:window},ts=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const p="dompurify"+(a?"#"+a:"");try{return e.createPolicy(p,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+p+" could not be created."),null}},pi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},he=function(e,t,a,c){return X(e,t)&&Fe(e[t])?E(c.base?Z(c.base):{},e[t],c.transform):a},Kt=function(e,t,a){const c=X(e,t)?e[t]:void 0;return c&&typeof c=="object"?Z(c):a()};function Ti(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:es();const e=f=>Ti(f);if(e.version="3.4.15",e.removed=[],!r||!r.document||r.document.nodeType!==K.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const a=t,c=a.currentScript;r.DocumentFragment;const p=r.HTMLTemplateElement,h=r.Node,y=r.Element,_=r.NodeFilter,P=r.NamedNodeMap;P===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const N=r.DOMParser,ee=r.trustedTypes,te=y.prototype,me=J(te,"cloneNode"),Tt=J(te,"remove"),dr=J(te,"removeAttributeNode"),Si=J(te,"nextSibling"),Ee=J(te,"childNodes"),Re=J(te,"parentNode"),pr=J(te,"shadowRoot"),St=J(te,"attributes"),ge=h&&h.prototype?J(h.prototype,"nodeType"):null,Ae=h&&h.prototype?J(h.prototype,"nodeName"):null,Ke=h&&h.prototype?J(h.prototype,"ownerDocument"):null,Be=function(i){return ge?ge(i):i.nodeType},Et=function(i){return Ae?Ae(i):i.nodeName};if(typeof p=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let G,ye="",Rt,hr=!1,He=0;const fr=function(){if(He>0)throw be('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},xe=function(i){fr(),He++;try{return G.createHTML(i)}finally{He--}},Ei=function(i){fr(),He++;try{return G.createScriptURL(i)}finally{He--}},Ri=function(){return hr||(Rt=ts(ee,c),hr=!0),Rt},Ze=t,At=Ze.implementation,mr=Ze.createNodeIterator,Ai=Ze.createDocumentFragment,xi=Ze.getElementsByTagName,Ci=a.importNode;let x=pi();e.isSupported=typeof vi=="function"&&typeof Re=="function"&&At&&At.createHTMLDocument!==void 0;const Li=Bn,Di=Hn,Oi=jn,ki=Vn,Pi=Wn,Ii=Gn,gr=Yn,Mi=Xn;let yr=ci,C=null;const xt=E({},[...si,...Gt,...Yt,...qt,...oi]);let L=null;const Ct=E({},[...ai,...Xt,...li,...pt]);let ne=Object.seal(Me(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,_r=null;const ue=Object.seal(Me(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let vr=!0,Lt=!0,wr=!1,br=!0,de=!1,_e=!0,ve=!1,Dt=!1,Je=null,Qe=null,Ot=!1,Ce=!1,et=!1,tt=!1,Tr=!0,Sr=!1;const Er="user-content-";let kt=!0,Pt=!1,Le={},De=null;const Rr=E({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Ar=null;const xr=E({},["audio","video","img","source","image","track"]);let Cr=null;const Lr=E({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",se="http://www.w3.org/1999/xhtml";let Oe=se,It=!1,Mt=null;const Ni=E({},[rt,it,se],Wt),Dr=U(["mi","mo","mn","ms","mtext"]);let Nt=E({},Dr);const Or=U(["annotation-xml"]);let $t=E({},Or);const $i=E({},["title","style","font","a","script"]);let Ve=null;const Fi=["application/xhtml+xml","text/html"],Ui="text/html";let I=null,ke=null;const zi=t.createElement("form"),kr=function(i){return i instanceof RegExp||i instanceof Function},Ft=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ke&&ke===i)return;(!i||typeof i!="object")&&(i={}),i=Z(i),Ve=Fi.indexOf(i.PARSER_MEDIA_TYPE)===-1?Ui:i.PARSER_MEDIA_TYPE,I=Ve==="application/xhtml+xml"?Wt:Xe,C=he(i,"ALLOWED_TAGS",xt,{transform:I}),L=he(i,"ALLOWED_ATTR",Ct,{transform:I}),Mt=he(i,"ALLOWED_NAMESPACES",Ni,{transform:Wt}),Cr=he(i,"ADD_URI_SAFE_ATTR",Lr,{transform:I,base:Lr}),Ar=he(i,"ADD_DATA_URI_TAGS",xr,{transform:I,base:xr}),De=he(i,"FORBID_CONTENTS",Rr,{transform:I}),je=he(i,"FORBID_TAGS",Z({}),{transform:I}),_r=he(i,"FORBID_ATTR",Z({}),{transform:I}),Le=X(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Z(i.USE_PROFILES):i.USE_PROFILES:!1,vr=i.ALLOW_ARIA_ATTR!==!1,Lt=i.ALLOW_DATA_ATTR!==!1,wr=i.ALLOW_UNKNOWN_PROTOCOLS||!1,br=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,de=i.SAFE_FOR_TEMPLATES||!1,_e=i.SAFE_FOR_XML!==!1,ve=i.WHOLE_DOCUMENT||!1,Ce=i.RETURN_DOM||!1,et=i.RETURN_DOM_FRAGMENT||!1,tt=i.RETURN_TRUSTED_TYPE||!1,Ot=i.FORCE_BODY||!1,Tr=i.SANITIZE_DOM!==!1,Sr=i.SANITIZE_NAMED_PROPS||!1,kt=i.KEEP_CONTENT!==!1,Pt=i.IN_PLACE||!1,yr=Fn(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:ci,Oe=typeof i.NAMESPACE=="string"?i.NAMESPACE:se,Nt=Kt(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>E({},Dr)),$t=Kt(i,"HTML_INTEGRATION_POINTS",()=>E({},Or));const l=Kt(i,"CUSTOM_ELEMENT_HANDLING",()=>Me(null));if(ne=Me(null),X(l,"tagNameCheck")&&kr(l.tagNameCheck)&&(ne.tagNameCheck=l.tagNameCheck),X(l,"attributeNameCheck")&&kr(l.attributeNameCheck)&&(ne.attributeNameCheck=l.attributeNameCheck),X(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(ne.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),B(ne),de&&(Lt=!1),et&&(Ce=!0),Le&&(C=E({},oi),L=Me(null),Le.html===!0&&(E(C,si),E(L,ai)),Le.svg===!0&&(E(C,Gt),E(L,Xt),E(L,pt)),Le.svgFilters===!0&&(E(C,Yt),E(L,Xt),E(L,pt)),Le.mathMl===!0&&(E(C,qt),E(L,li),E(L,pt))),ue.tagCheck=null,ue.attributeCheck=null,X(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?ue.tagCheck=i.ADD_TAGS:Fe(i.ADD_TAGS)&&(C===xt&&(C=Z(C)),E(C,i.ADD_TAGS,I))),X(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?ue.attributeCheck=i.ADD_ATTR:Fe(i.ADD_ATTR)&&(L===Ct&&(L=Z(L)),E(L,i.ADD_ATTR,I))),X(i,"ADD_FORBID_CONTENTS")&&Fe(i.ADD_FORBID_CONTENTS)&&(De===Rr&&(De=Z(De)),E(De,i.ADD_FORBID_CONTENTS,I)),kt&&(C["#text"]=!0),ve&&E(C,["html","head","body"]),C.table&&(E(C,["tbody"]),delete je.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const d=G;G=i.TRUSTED_TYPES_POLICY;try{ye=xe("")}catch(m){throw G=d,m}}else i.TRUSTED_TYPES_POLICY===null?(G=void 0,ye=""):(G===void 0&&(G=Ri()),G&&typeof ye=="string"&&(ye=xe("")));U&&U(i),ke=i},Pr=E({},[...Gt,...Yt,...Un]),Ir=E({},[...qt,...zn]),Bi=function(i,l,d){return l.namespaceURI===se?i==="svg":l.namespaceURI===rt?i==="svg"&&(d==="annotation-xml"||Nt[d]):!!Pr[i]},Hi=function(i,l,d){return l.namespaceURI===se?i==="math":l.namespaceURI===it?i==="math"&&$t[d]:!!Ir[i]},ji=function(i,l,d){return l.namespaceURI===it&&!$t[d]||l.namespaceURI===rt&&!Nt[d]?!1:!Ir[i]&&($i[i]||!Pr[i])},Vi=function(i){let l=Re(i);(!l||!l.tagName)&&(l={namespaceURI:Oe,tagName:"template"});const d=Xe(i.tagName),m=Xe(l.tagName);return Mt[i.namespaceURI]?i.namespaceURI===it?Bi(d,l,m):i.namespaceURI===rt?Hi(d,l,m):i.namespaceURI===se?ji(d,l,m):!!(Ve==="application/xhtml+xml"&&Mt[i.namespaceURI]):!1},pe=function(i){Ge(e.removed,{element:i});try{Re(i).removeChild(i)}catch{if(Tt(i),!Re(i))throw be("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Mr=function(i,l,d){try{dr(i,l)}catch{try{i.removeAttribute(d)}catch{}}},nt=function(i){st(i);const l=Ee(i);if(l){const m=[];Te(l,g=>{Ge(m,g)}),Te(m,g=>{try{Tt(g)}catch{}})}const d=St(i);if(d)for(let m=d.length-1;m>=0;--m){const g=d[m],v=g&&g.name;typeof v=="string"&&Mr(i,g,v)}},we=function(i,l,d){if(!d)try{d=l.getAttributeNode(i)}catch{d=null}Ge(e.removed,{attribute:d||null,from:l});try{d?dr(l,d):l.removeAttribute(i)}catch{try{l.removeAttribute(i)}catch{}}if(i==="is")if(Ce||et)try{pe(l)}catch{}else try{l.setAttribute(i,"")}catch{}},Wi=function(i){const l=St(i);if(l)for(let d=l.length-1;d>=0;--d){const m=l[d],g=m&&m.name;typeof g!="string"||L[I(g)]||Mr(i,m,g)}},st=function(i){const l=[i];for(;l.length>0;){const d=l.pop();Be(d)===K.element&&Wi(d);const g=Ee(d);if(g)for(let v=g.length-1;v>=0;--v)l.push(g[v])}},Nr=function(i,l){return _e?i==="patchsrc"?!0:i==="for"&&l!=="label"&&l!=="output":!1},Gi=function(i){if(!_e)return;const l=[i];for(;l.length>0;){const d=l.pop(),m=Be(d);if(m===K.processingInstruction||m===K.comment&&j(di,d.data)){try{Tt(d)}catch{}continue}if(m===K.element){const v=d,R=I(Et(d));try{v.hasAttribute&&v.hasAttribute("patchsrc")&&v.removeAttribute("patchsrc"),v.hasAttribute&&v.hasAttribute("for")&&Nr("for",R)&&v.removeAttribute("for")}catch{}}const g=Ee(d);if(g)for(let v=g.length-1;v>=0;--v)l.push(g[v])}},$r=function(i){let l=null,d=null;if(Ot)i="<remove></remove>"+i;else{const v=ti(i,/^[\r\n\t ]+/);d=v&&v[0]}Ve==="application/xhtml+xml"&&Oe===se&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const m=G?xe(i):i;if(Oe===se)try{l=new N().parseFromString(m,Ve)}catch{}if(!l||!l.documentElement){l=At.createDocument(Oe,"template",null);try{l.documentElement.innerHTML=It?ye:m}catch{}}const g=l.body||l.documentElement;return i&&d&&g.insertBefore(t.createTextNode(d),g.childNodes[0]||null),Oe===se?xi.call(l,ve?"html":"body")[0]:ve?l.documentElement:g},Fr=function(i){const l=Ke?Ke(i):i.ownerDocument;return mr.call(l||i,i,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT|_.SHOW_PROCESSING_INSTRUCTION|_.SHOW_CDATA_SECTION,null)},ot=function(i){return i=Ye(i,Li," "),i=Ye(i,Di," "),i=Ye(i,Oi," "),i},Ut=function(i){var l;i.normalize();const d=Ke?Ke(i):i.ownerDocument,m=mr.call(d||i,i,_.SHOW_TEXT|_.SHOW_COMMENT|_.SHOW_CDATA_SECTION|_.SHOW_PROCESSING_INSTRUCTION,null);let g=m.nextNode();for(;g;)g.data=ot(g.data),g=m.nextNode();const v=(l=i.querySelectorAll)===null||l===void 0?void 0:l.call(i,"template");v&&Te(v,R=>{Pe(R.content)&&Ut(R.content)})},at=function(i){const l=Ae?Ae(i):null;return typeof l!="string"||I(l)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==St(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ge(i)||i.childNodes!==Ee(i)},Pe=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return ge(i)===K.documentFragment}catch{return!1}},We=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return typeof ge(i)=="number"}catch{return!1}};function oe(f,i,l){f.length!==0&&Te(f,d=>{d.call(e,i,l,ke)})}const Yi=function(i,l){return!!(_e&&i.hasChildNodes()&&!We(i.firstElementChild)&&j(ui,i.textContent)&&j(ui,i.innerHTML)||_e&&i.namespaceURI===se&&Jn[l]&&(We(i.firstElementChild)||typeof i.textContent=="string"&&j(Qn[l],i.textContent))||i.nodeType===K.processingInstruction||_e&&i.nodeType===K.comment&&j(di,i.data))},lt=function(i,l){if(i instanceof RegExp)return j(i,l);if(i instanceof Function){for(var d=arguments.length,m=new Array(d>2?d-2:0),g=2;g<d;g++)m[g-2]=arguments[g];return!!i(l,...m)}return!1},qi=function(i,l,d){if(!je[l]&&jr(l)&&lt(ne.tagNameCheck,l))return!1;if(kt&&!De[l]){const m=Re(i),g=Ee(i);if(g&&m){const v=g.length;for(let R=v-1;R>=0;--R){const k=i===d?me(g[R],!0):g[R];m.insertBefore(k,Si(i))}}}return pe(i),!0},Ur=function(i,l,d,m){return i.length===0?l:l===d||l===m?Z(l):l},zr=function(i,l){return i===l||Re(i)!==null?!1:(Pt&&st(i),!0)},Br=function(i,l){if(oe(x.beforeSanitizeElements,i,null),zr(i,l))return!0;if(at(i))return pe(i),!0;const d=I(Et(i));if(C=Ur(x.uponSanitizeElement,C,xt,Je),oe(x.uponSanitizeElement,i,{tagName:d,allowedTags:C}),zr(i,l))return!0;if(Yi(i,d))return pe(i),!0;if(je[d]||!(ue.tagCheck instanceof Function&&ue.tagCheck(d))&&!C[d]){const g=qi(i,d,l);return g===!1&&oe(x.afterSanitizeElements,i,null),g}if(Be(i)===K.element&&!Vi(i)||(d==="noscript"||d==="noembed"||d==="noframes")&&j(Kn,i.innerHTML))return pe(i),!0;if(de&&i.nodeType===K.text){const g=ot(i.textContent);i.textContent!==g&&(Ge(e.removed,{element:i.cloneNode()}),i.textContent=g)}return oe(x.afterSanitizeElements,i,null),!1},Hr=function(i,l,d){if(_r[l]||Nr(l,i)||Tr&&(l==="id"||l==="name")&&(d in t||d in zi))return!1;const m=L[l]||ue.attributeCheck instanceof Function&&ue.attributeCheck(l,i);return Lt&&j(ki,l)||vr&&j(Pi,l)?!0:m?Cr[l]||j(yr,Ye(d,gr,""))||(l==="src"||l==="xlink:href"||l==="href")&&i!=="script"&&ri(d,"data:")===0&&Ar[i]||wr&&!j(Ii,Ye(d,gr,""))?!0:!d:jr(i)&&lt(ne.tagNameCheck,i)&&lt(ne.attributeNameCheck,l,i)||l==="is"&&ne.allowCustomizedBuiltInElements&&lt(ne.tagNameCheck,d)},Xi=E({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),jr=function(i){return!Xi[Xe(i)]&&j(Mi,i)},Ki=function(i,l,d,m){if(G&&typeof ee=="object"&&typeof ee.getAttributeType=="function"&&!d)switch(ee.getAttributeType(i,l)){case"TrustedHTML":return xe(m);case"TrustedScriptURL":return Ei(m)}return m},Zi=function(i,l,d,m){try{return d?i.setAttributeNS(d,l,m):i.setAttribute(l,m),at(i)?(pe(i),!1):!0}catch{return we(l,i),!1}},Vr=function(i){oe(x.beforeSanitizeAttributes,i,null);const l=i.attributes;if(!l||at(i))return;L=Ur(x.uponSanitizeAttribute,L,Ct,Qe);const d={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:L,forceKeepAttr:void 0};let m=l.length;const g=I(i.nodeName);for(;m--;){const v=l[m],R=v.name,k=v.namespaceURI,Y=v.value,q=I(R),Bt=Y;let V=R==="value"?Bt:kn(Bt),Wr=!1;if(d.attrName=q,d.attrValue=V,d.keepAttr=!0,d.forceKeepAttr=void 0,oe(x.uponSanitizeAttribute,i,d),V=d.attrValue,Sr&&(q==="id"||q==="name")&&ri(V,Er)!==0&&(we(R,i,v),V=Er+V,Wr=!0),_e&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(R,i,v);continue}if(q==="attributename"&&ti(V,"href")){we(R,i,v);continue}if(!d.forceKeepAttr){if(!d.keepAttr){we(R,i,v);continue}if(!br&&j(Zn,V)){we(R,i,v);continue}if(de&&(V=ot(V)),!Hr(g,q,V)){we(R,i,v);continue}V=Ki(g,q,k,V),V!==Bt&&Zi(i,R,k,V)&&Wr&&ei(e.removed)}}oe(x.afterSanitizeAttributes,i,null)},ct=function(i){let l=null;const d=Fr(i);for(oe(x.beforeSanitizeShadowDOM,i,null);l=d.nextNode();)if(oe(x.uponSanitizeShadowNode,l,null),Br(l,i),Vr(l),Pe(l.content)&&ct(l.content),Be(l)===K.element){const m=pr(l);Pe(m)&&(zt(m),ct(m))}oe(x.afterSanitizeShadowDOM,i,null)},zt=function(i){const l=[{node:i,shadow:null}];for(;l.length>0;){const d=l.pop();if(d.shadow){ct(d.shadow);continue}const m=d.node,v=Be(m)===K.element,R=Ee(m);if(R)for(let k=R.length-1;k>=0;--k)l.push({node:R[k],shadow:null});if(v){const k=Ae?Ae(m):null;if(typeof k=="string"&&I(k)==="template"){const Y=m.content;Pe(Y)&&l.push({node:Y,shadow:null})}}if(v){const k=pr(m);Pe(k)&&l.push({node:null,shadow:k},{node:k,shadow:null})}}};return e.sanitize=function(f){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,d=null,m=null,g=null;if(It=!f,It&&(f="<!-->"),typeof f!="string"&&!We(f)&&(f=$n(f),typeof f!="string"))throw be("dirty is not a string, aborting");if(!e.isSupported)return f;Dt?(C=Je,L=Qe):Ft(i),(x.uponSanitizeElement.length>0||x.uponSanitizeAttribute.length>0)&&(C=Z(C)),x.uponSanitizeAttribute.length>0&&(L=Z(L)),e.removed=[];const v=Pt&&typeof f!="string"&&We(f);if(v){Gi(f);const Y=Et(f);if(typeof Y=="string"){const q=I(Y);if(!C[q]||je[q])throw nt(f),be("root node is forbidden and cannot be sanitized in-place")}if(at(f))throw nt(f),be("root node is clobbered and cannot be sanitized in-place");try{zt(f)}catch(q){throw nt(f),q}}else if(We(f))l=$r("<!---->"),d=l.ownerDocument.importNode(f,!0),d.nodeType===K.element&&d.nodeName==="BODY"||d.nodeName==="HTML"?l=d:l.appendChild(d),zt(l);else{if(!Ce&&!de&&!ve&&f.indexOf("<")===-1)return G&&tt?xe(f):f;if(l=$r(f),!l)return Ce?null:tt?ye:""}l&&Ot&&pe(l.firstChild);const R=v?f:l;try{const Y=Fr(R);for(;m=Y.nextNode();)Br(m,R),Vr(m),Pe(m.content)&&ct(m.content)}catch(Y){throw v&&(nt(f),Te(e.removed,q=>{q.element&&st(q.element)})),Y}if(v)return Te(e.removed,Y=>{Y.element&&st(Y.element)}),de&&Ut(f),f;if(Ce){if(de&&Ut(l),et)for(g=Ai.call(l.ownerDocument);l.firstChild;)g.appendChild(l.firstChild);else g=l;return(L.shadowroot||L.shadowrootmode)&&(g=Ci.call(a,g,!0)),g}let k=ve?l.outerHTML:l.innerHTML;return ve&&C["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&j(qn,l.ownerDocument.doctype.name)&&(k="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+k),de&&(k=ot(k)),G&&tt?xe(k):k},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(f),Dt=!0,Je=C,Qe=L},e.clearConfig=function(){ke=null,Dt=!1,Je=null,Qe=null,G=Rt,ye=""},e.isValidAttribute=function(f,i,l){ke||Ft({});const d=I(f),m=I(i);return Hr(d,m,l)},e.addHook=function(f,i){typeof i=="function"&&X(x,f)&&Ge(x[f],i)},e.removeHook=function(f,i){if(X(x,f)){if(i!==void 0){const l=Dn(x[f],i);return l===-1?void 0:On(x[f],l,1)[0]}return ei(x[f])}},e.removeHooks=function(f){X(x,f)&&(x[f]=[])},e.removeAllHooks=function(){x=pi()},e}var ht=Ti();const rs=["a"];function is(r){ht.addHook("afterSanitizeAttributes",ns);try{return ht.sanitize(r,{ALLOWED_TAGS:rs})}finally{ht.removeHook("afterSanitizeAttributes")}}function ns(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function ss(r,e=100,t=!0){if(r.length<e)return r;let a=e;if(t){const c=r.indexOf(" ",e),p=c-e<=20;if(p&&c===r.length-1)return r;c!==-1&&p&&(a=c)}return os(r,a,e)}function os(r,e,t){let a=r.slice(0,e);const c=a.match(/<a/gi);if(c){const p=a.match(/<\/a/gi);if(!p||p.length<c.length){const h=r.indexOf("</a>",e),y=h-t<=20;if(y&&r.length===h+4)return r;if(h!==-1&&y)a=r.slice(0,h+4);else{const _=a.lastIndexOf("<a");a=r.slice(0,_)}}}return a.concat("...")}const as=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function ls(r){return r.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(as,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function cs(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const us="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var ds=Object.defineProperty,ps=Object.getOwnPropertyDescriptor,ie=(r,e,t,a)=>{for(var c=a>1?void 0:a?ps(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ds(e,t,c),c};let Q=class extends wt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1}render(){return this.review?b`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?b`
                  <button
                    class="delete-btn"
                    title=${T("Delete this review")}
                    @click=${this.deleteReview}
                  >
                    <img
                      class="delete-icon"
                      src=${us}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                `:z}
            <div class="top-line">
              <b>${T("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${T("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteOutcome?b`<i>${this.deleteOutcomeMessage}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:b`
          <div class="error">
            ${T("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return z;const e=is(r),t=this.truncateContent(e,this.maxBodyLength);return b`${hi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?z:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?z:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return b`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${T("More...")}
      </button>
    `}get lessButtonTemplate(){return b`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${T("...Less")}
    </button>`}get reviewerTemplate(){return this.review?this.review.reviewer_itemname?b`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Zr(this.review.reviewer)}
            </a>
          `:b`${Zr(this.review.reviewer)}`:z}get starsTemplate(){return!this.review||!this.review.stars?z:b`
      <div
        class="review-stars"
        title=${T($e`${this.review.stars} out of 5 stars`)}
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>b`<div class="review-star">
              <img
                class="star-basic"
                src=${bn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return z;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"});return r.getTime()!==e.getTime()?T($e`${t} (edited)`):t}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:ss(r,e)}prepReview(r){return cs(ls(r))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(T("Are you sure you want to delete this review?")))return;if(!this.reviewService){this.deleteOutcome={status:"failed"};return}const r=await this.reviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteOutcome=r.success?{status:"queued"}:{status:"failed",error:r.error}}get deleteOutcomeMessage(){return this.deleteOutcome?.status==="queued"?T("This review has been queued for deletion."):this.deleteOutcome?.error??T("Sorry, we were unable to delete this review.")}static get styles(){return bt`
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
    `}};ie([S({type:Object})],Q.prototype,"review",2);ie([S({type:String})],Q.prototype,"identifier",2);ie([S({type:Number})],Q.prototype,"maxSubjectLength",2);ie([S({type:Number})],Q.prototype,"maxBodyLength",2);ie([S({type:String})],Q.prototype,"baseHost",2);ie([S({type:Object})],Q.prototype,"reviewService",2);ie([S({type:Boolean})],Q.prototype,"canDelete",2);ie([S({type:Boolean})],Q.prototype,"bypassTruncation",2);ie([H()],Q.prototype,"showTruncatedContent",2);ie([H()],Q.prototype,"deleteOutcome",2);Q=ie([vt("ia-review"),ar()],Q);const hs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",fs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var ms=Object.defineProperty,gs=Object.getOwnPropertyDescriptor,F=(r,e,t,a)=>{for(var c=a>1?void 0:a?gs(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ms(e,t,c),c};let M=class extends wt{constructor(){super(...arguments),this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.recaptchaUnavailable=!1,this.formCanSubmit=!1,this.submissionInProgress=!1}render(){return b`<form id="review-form" @submit=${this.handleSubmit}>
      ${this.unrecoverableErrorMessage?this.unrecoverableErrorTemplate:b`
            <span class="inputs">
              ${this.starsInputTemplate} ${this.subjectInputTemplate}
              ${this.bodyInputTemplate}
            </span>
          `}
      ${this.recaptchaMessageTemplate} ${this.recoverableErrorTemplate}
      ${this.actionButtonsTemplate}
    </form>`}willUpdate(r){r.has("oldReview")&&(this.currentStars=this.oldReview?.stars??0,this.currentSubjectLength=this.oldReview?.reviewtitle?.length??0,this.currentBodyLength=this.oldReview?.reviewbody?.length??0),r.has("recaptchaManager")&&!this.bypassRecaptcha&&this.recaptchaManager&&this.setupRecaptcha(),(r.has("unrecoverableError")||r.has("recaptchaUnavailable"))&&(this.formCanSubmit=this.checkSubmissionAllowed()),(r.has("currentSubjectLength")||r.has("currentBodyLength")||r.has("maxSubjectLength")||r.has("maxBodyLength"))&&(this.formCanSubmit=this.checkSubmissionAllowed())}get unrecoverableErrorTemplate(){const r=this.unrecoverableErrorMessage;return r?b`
          <div class="unrecoverable-error">
            <span class="error-msg">${r}</span>
          </div>
        `:z}get recoverableErrorTemplate(){const r=this.recoverableErrorMessage;return r?b`
          <div class="recoverable-error">
            ${hi(this.sanitizeErrorMsg(r))}
          </div>
        `:z}get unrecoverableErrorMessage(){return this.unrecoverableError?this.unrecoverableError:this.recaptchaUnavailable?this.recaptchaErrorMessage:void 0}get recoverableErrorMessage(){if(this.recoverableError)return this.recoverableError;switch(this.formError){case"recaptcha":return this.recaptchaErrorMessage;case"generic":return this.genericErrorMessage;default:return}}get recaptchaErrorMessage(){return T("Could not validate review. Please try again later.")}get genericErrorMessage(){return T("There's been a temporary error. Please wait a moment and try again.")}get recaptchaMessageTemplate(){return this.bypassRecaptcha?z:b`
      <span class="recaptcha-disclaimer"
        >${T(b`This site is protected by reCAPTCHA and the Google
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
    `}get starsInputTemplate(){return b`
      <div class="form-heading rating">
        <label for="stars-field">${T("Rating (optional)")}</label>
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
          ${T("Clear")}
        </button>
      </div>
    `}get subjectInputTemplate(){return b`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${T("Subject")}</label>
        ${this.maxSubjectLength?b`<div class="char-count subject">
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
    />${this.maxSubjectLength?b`
            <div class="input-error">
              ${T($e`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:z}</div></span>
    `}get bodyInputTemplate(){return b`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${T("Review")}</label>
          ${this.maxBodyLength?b`<div class="char-count body">
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
        ${this.maxBodyLength?b`
              <div class="input-error">
                ${T($e`Review may only have ${this.maxBodyLength} characters`)}
              </div>
            `:z}
      </span>
    `}get actionButtonsTemplate(){return b`<div class="action-btns">
      <ia-button
        mode="secondary"
        class="cancel-btn"
        data-testid="cancel-btn"
        @click=${this.cancelReviewEdit}
      >
        ${T("Cancel")}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        class="submit-btn"
        .disabled=${!this.formCanSubmit}
        .loading=${this.submissionInProgress}
      >
        ${T("Submit review")}
      </ia-button>
    </div>`}renderStar(r){const e=r===this.currentStars,t=r===1?T("Rate 1 star"):T($e`Rate ${r} stars`);return b`
      <button
        class="star star-${r}"
        title=${e?T("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,r)}
      >
        ${r<=this.currentStars?b`<img
              class="star-selected"
              src=${hs}
              alt=""
              aria-hidden="true"
            />`:b`<img
              class="star-unselected"
              src=${fs}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.recaptchaUnavailable=!0}}sanitizeErrorMsg(r){return ht.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",this.formError=void 0,!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.reviewService||!this.identifier)return this.formError="generic",this.stopSubmission();try{let e;if(!this.bypassRecaptcha&&(e=await this.getRecaptchaToken(),!e))return this.handleRecaptchaError();const t=await this.reviewService.submitReview({identifier:this.identifier,title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else t.error?this.recoverableError=t.error:this.formError="generic",this.stopSubmission()}catch(e){console.error(e),this.formError="generic",this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new fe({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname??T("Anonymous"),reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.formError="recaptcha",this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableErrorMessage||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[bt`
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
      `]}};F([S({type:String})],M.prototype,"identifier",2);F([S({type:String})],M.prototype,"submitterScreenname",2);F([S({type:String})],M.prototype,"submitterItemname",2);F([S({type:Object})],M.prototype,"oldReview",2);F([S({type:String})],M.prototype,"unrecoverableError",2);F([S({type:Number})],M.prototype,"maxSubjectLength",2);F([S({type:Number})],M.prototype,"maxBodyLength",2);F([S({type:Object})],M.prototype,"reviewService",2);F([S({type:Object})],M.prototype,"recaptchaManager",2);F([S({type:Boolean})],M.prototype,"bypassRecaptcha",2);F([H()],M.prototype,"currentStars",2);F([H()],M.prototype,"currentSubjectLength",2);F([H()],M.prototype,"currentBodyLength",2);F([H()],M.prototype,"recoverableError",2);F([H()],M.prototype,"formError",2);F([H()],M.prototype,"recaptchaUnavailable",2);F([H()],M.prototype,"formCanSubmit",2);F([H()],M.prototype,"submissionInProgress",2);F([fi("#review-form")],M.prototype,"reviewForm",2);M=F([vt("ia-review-form"),ar()],M);var ys=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,O=(r,e,t,a)=>{for(var c=a>1?void 0:a?_s(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ys(e,t,c),c};let A=class extends wt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.displayReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:this.displayReviews?b`
      <div class="reviews-list">
        ${this.reviewsFrozen?b`<div class="message">
              ${T("Reviews can no longer be added to this item.")}
            </div>`:z}
        ${this.editableCurrentReviewTemplate}
        ${this.filteredReviews.map(r=>r.reviewer_itemname!==this.submitterItemname?this.renderReview(r):z)}
      </div>
    `:this.displayReviewsMsgTemplate}willUpdate(r){(!this.activeReviewService||r.has("reviewService")||r.has("baseHost"))&&(this.activeReviewService=this.reviewService??new _i({baseHost:this.baseHost})),(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&(!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0),this.displayReviews=!0),r.has("displayReviewsByDefault")&&this.displayReviewsByDefault&&(this.displayReviews=!0)}get reviewsDisabledTemplate(){return b`<div class="message">
      ${T("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?b`
        <div class="message">
          ${T("Reviews cannot be added to this item.")}
        </div>
      `:b`
      <div class="message">
        ${T("There are no reviews yet.")}
        ${T(b`
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
    `}get displayReviewsMsgTemplate(){const r=this.reviewsCount===1;return b`
      <div class="message">
        ${r?T("There is 1 review for this item."):T($e`There are ${this.reviewsCount} reviews for this item.`)}
        <ia-button
          mode="link"
          class="display-reviews-btn"
          @click=${()=>this.displayReviews=!0}
        >
          ${r?T("Display review"):T("Display reviews")}</ia-button
        >.
      </div>
    `}get editableCurrentReviewTemplate(){return!this.displayReviewForm&&!this.currentReview?z:b`<div class="own-review-container">
      ${this.displayReviewForm?b`<ia-review-form
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
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{!r&&t.reviewer_itemname===this.submitterItemname?r=t:e.push(t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r){return r?b`<ia-review
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:z}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1,this.reviewsCount===0&&(this.displayReviews=!1)}static get styles(){return[bt`
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
      `]}};O([S({type:String})],A.prototype,"identifier",2);O([S({type:Array})],A.prototype,"reviews",2);O([S({type:Boolean})],A.prototype,"reviewsDisabled",2);O([S({type:Boolean})],A.prototype,"reviewsFrozen",2);O([S({type:Boolean})],A.prototype,"canDelete",2);O([S({type:Boolean})],A.prototype,"displayReviewsByDefault",2);O([S({type:Number})],A.prototype,"maxSubjectLength",2);O([S({type:Number})],A.prototype,"maxBodyLength",2);O([S({type:String})],A.prototype,"baseHost",2);O([S({type:String})],A.prototype,"submitterScreenname",2);O([S({type:String})],A.prototype,"submitterItemname",2);O([S({type:Object})],A.prototype,"recaptchaManager",2);O([S({type:Boolean})],A.prototype,"bypassRecaptcha",2);O([S({type:String})],A.prototype,"reviewSubmissionError",2);O([S({type:Boolean})],A.prototype,"reviewAddEditRequested",2);O([S({type:Object})],A.prototype,"reviewService",2);O([H()],A.prototype,"activeReviewService",2);O([H()],A.prototype,"displayReviewForm",2);O([H()],A.prototype,"displayReviews",2);O([H()],A.prototype,"filteredReviews",2);O([H()],A.prototype,"currentReview",2);O([H()],A.prototype,"reviewsCount",2);O([H()],A.prototype,"recaptchaActivated",2);A=O([vt("ia-reviews"),ar()],A);var vs=Object.defineProperty,ws=Object.getOwnPropertyDescriptor,ur=(r,e,t,a)=>{for(var c=a>1?void 0:a?ws(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&vs(e,t,c),c};const bs=[new fe({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new fe({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new fe({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"})],Ts=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],Ss=[{label:"Reviews open by default",propertyName:"displayReviewsByDefault",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Es={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},Rs=new _i({fetchHandler:Es}),As=6;let _t=class extends wt{constructor(){super(...arguments),this.log=[]}render(){return b`
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
          displayReviewsByDefault
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
          ${this.log.length===0?b`<p class="empty">
                Submit the review form to see events here.
              </p>`:b`<ol class="log">
                ${this.log.map(r=>b`<li><code>${r}</code></li>`)}
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,As)}static get styles(){return bt`
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
    `}};ur([H()],_t.prototype,"log",2);ur([fi("ia-reviews")],_t.prototype,"reviews",2);_t=ur([vt("ia-reviews-story")],_t);export{_t as IAReviewsStory};
