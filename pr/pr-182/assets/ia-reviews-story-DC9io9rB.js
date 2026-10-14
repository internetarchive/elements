import{m as S,b,r as H,n as T,c as _t,i as wt,A as z,o as fi,s as $e,a as bt,e as ar}from"./index-DKNYjgmy.js";import{_ as n}from"./tslib.es6-kHcLnhpD.js";import{o as Ji}from"./story-template-kXR7EsqM.js";import{l as lr}from"./localized-decorator-CbmcQ8Ek.js";import"./ia-button-BTFFdTNn.js";import"./ia-status-indicator-D6_iF6a8.js";import"./masked-icon-BzJT9qpt.js";function s(r){let e,t,a;return e=r,(c,p,h)=>{if(h.value!=null)h.value=Yr(h.value,e,t,a);else if(h.get!=null)h.get=Yr(h.get,e,t,a);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ht=new Map;function Yr(r,e,t=0,a){const c=Symbol("__memoized_map__");return function(...p){let h;this.hasOwnProperty(c)||Object.defineProperty(this,c,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let y=this[c];if(Array.isArray(a))for(const v of a)Ht.has(v)?Ht.get(v).push(y):Ht.set(v,[y]);if(e||p.length>0||t>0){let v;e===!0?v=p.map(te=>te.toString()).join("!"):e?v=e.apply(this,p):v=p[0];const I=`${v}__timestamp`;let N=!1;if(t>0)if(!y.has(I))N=!0;else{let te=y.get(I);N=Date.now()-te>t}y.has(v)&&!N?h=y.get(v):(h=r.apply(this,p),y.set(v,h),t>0&&y.set(I,Date.now()))}else{const v=this;y.has(v)?h=y.get(v):(h=r.apply(this,p),y.set(v,h))}return h}}class ft{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}}ft.shared=new ft;class ie{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ie.shared=new ie;class mt{parseValue(e){return ie.shared.parseValue(e)}}mt.shared=new mt;class Ue{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,a,c,p,h="00",y="00",v="00"]=t,I=new Date(`${a}-${c}-${p}T${h}:${y}:${v}`);return Number.isNaN(I.getTime())?void 0:I}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const a=Date.parse(t);if(Number.isNaN(a))return;let c=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(c=new Date(c.getTime()+c.getTimezoneOffset()*1e3*60)),c}}Ue.shared=new Ue;class gt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let a;return t.length===1?a=this.parseNumberFormat(t[0]):a=this.parseColonSeparatedFormat(t),a}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const a=e.map((c,p)=>{const h=parseFloat(c);if(Number.isNaN(h))return t=!0,0;const v=60**(e.length-1-p);return h*Math.floor(v)}).reduce((c,p)=>c+p,0);return t?void 0:a}}gt.shared=new gt;class mi{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let a=[];for(const c of this.separators)if(a=t.split(c),a.length>1)break;return this.parseListValues(a)}parseListValues(e){const a=e.map(p=>p.trim()).map(p=>this.parser.parseValue(p)),c=[];return a.forEach(p=>{p!==void 0&&c.push(p)}),c}}class yt{parseValue(e){return String(e)}}yt.shared=new yt;function Pe(r,e,...t){for(const a of t){const c=r[a];if(c!=null)return e(c)}}function ce(r,e,...t){return Pe(r,a=>e(a),...t)}class ue{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ie.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return ce(this.rawValue,e=>mt.shared.parseValue(e),"size")}get title(){return this.rawValue.title}get length(){return ce(this.rawValue,e=>gt.shared.parseValue(e),"length")}get height(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"height")}get width(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"width")}get track(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"bitrate")}get private(){return ce(this.rawValue,e=>ft.shared.parseValue(e),"private")}constructor(e={}){this.rawValue=e}}n([s()],ue.prototype,"mtime",null);n([s()],ue.prototype,"size",null);n([s()],ue.prototype,"length",null);n([s()],ue.prototype,"height",null);n([s()],ue.prototype,"width",null);n([s()],ue.prototype,"track",null);n([s()],ue.prototype,"bitrate",null);n([s()],ue.prototype,"private",null);class W{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(a=>{const c=this.parser.parseValue(a);Array.isArray(c)?t.push(...c):c!==void 0&&t.push(c)}),t}}n([s()],W.prototype,"values",null);n([s()],W.prototype,"value",null);class le extends W{constructor(e){super(ft.shared,e)}}class O extends W{constructor(e){super(Ue.shared,e)}}class jt extends W{constructor(e){super(gt.shared,e)}}class w extends W{constructor(e){super(ie.shared,e)}}class u extends W{constructor(e){super(yt.shared,e)}}class ze{constructor(e){this.allowed=e}parseValue(e){return typeof e=="string"&&this.allowed.includes(e)?e:void 0}}class Ne extends W{constructor(e,t){super(t,e)}}const Qi=new ze(["rl","lr"]);class en extends Ne{constructor(e){super(e,Qi)}}class ut extends W{constructor(e){super(mt.shared,e)}}const tn=new ze(["account","audio","collection","data","etree","image","movies","search","software","texts","web"]);class rn extends Ne{constructor(e){super(e,tn)}}class gi extends W{constructor(e,t){super(t,e)}}class qr extends gi{constructor(e){const t=new mi(yt.shared);super(e,t)}}class Vt extends gi{constructor(e){const t=new mi(ie.shared);super(e,t)}}const nn=/^([0-9a-f]{32})\s+\*?(.+)$/i,sn=/^(.+):([0-9a-f]{32})$/i;function on(r){const e=r.match(nn);if(e)return{file:e[2].trim(),md5:e[1].toLowerCase()};const t=r.match(sn);if(t)return{file:t[1].trim(),md5:t[2].toLowerCase()}}class Zt{parseValue(e){if(typeof e!="string")return;const t=e.split(`
`).map(a=>a.trim()).filter(Boolean).map(on).filter(a=>a!==void 0);return t.length?t:void 0}}Zt.shared=new Zt;class Xr extends W{constructor(e){super(Zt.shared,e)}}function dt(r,e){var t;const a=r.match(new RegExp(`\\[${e}\\]([\\s\\S]*?)\\[/${e}\\]`,"i")),c=(t=a?.[1])===null||t===void 0?void 0:t.trim();return c||void 0}class Jt{parseValue(e){if(typeof e!="string")return;const t=dt(e,"curator"),a=dt(e,"date"),c=dt(e,"comment"),p=dt(e,"state");if(!(!t&&!a&&!c&&!p))return{curator:t,date:a?Ue.shared.parseValue(a):void 0,comment:c,state:p}}}Jt.shared=new Jt;class an extends W{constructor(e){super(Jt.shared,e)}}class Qt{parseValue(e){if(typeof e!="string")return;const t=e.match(/^\s*(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)\s*$/i);if(!t)return;const a=parseFloat(t[1]),c=parseFloat(t[2]);if(c)return{width:a,height:c,decimal:a/c}}}Qt.shared=new Qt;class ln extends W{constructor(e){super(Qt.shared,e)}}class er{parseValue(e){const t=String(e).trim().match(/^([+-]?)(\d{1,2}):?(\d{2})$/);if(!t)return;const a=t[1]==="-"?-1:1,c=parseInt(t[2],10),p=parseInt(t[3],10);return{hours:a*c,minutes:p,totalMinutes:a*(c*60+p)}}}er.shared=new er;class cn extends W{constructor(e){super(er.shared,e)}}class tr{parseValue(e){if(typeof e!="string")return;const t=e.match(/Channel\s+(\d+)(?:\s*\(\s*([\d.]+)\s*MHz\s*\))?/i);if(t)return{channel:parseInt(t[1],10),frequencyMhz:t[2]?parseFloat(t[2]):void 0}}}tr.shared=new tr;class un extends W{constructor(e){super(tr.shared,e)}}const dn=new ze(["true","none","frozen"]),pn=new ze(["sound","silent"]),hn=new ze(["color","b&w"]),fn=new ze(["mode/1up","mode/2up","mode/thumb"]);class o{get access(){return this.field(u,"access")}get adder(){return this.field(u,"adder")}get amrc_id(){return this.field(u,"amrc-id")}get archiveit_account_id(){return this.field(w,"archiveit-account-id")}get archiveit_account_organization_name(){return this.field(u,"archiveit-account-organization-name")}get archiveit_collection_id(){return this.field(w,"archiveit-collection-id")}get archiveit_collection_name(){return this.field(u,"archiveit-collection-name")}get archiveit_job_type(){return this.field(u,"archiveit-job-type")}get audit_time_minutes(){return this.field(w,"audit_time_minutes")}get auditor(){return this.field(u,"auditor")}get author(){return this.field(u,"author")}get autocrop_version(){return this.field(u,"autocrop_version")}get bookplateleaf(){return this.field(w,"bookplateleaf")}get bookreader_defaults(){return Pe(this.rawMetadata,e=>new Ne(e,fn),"bookreader-defaults")}get boxid(){return this.field(u,"boxid")}get camera(){return this.field(u,"camera")}get cameraman(){return this.field(u,"cameraman")}get canister(){return this.field(u,"canister")}get case_name(){return this.field(u,"case-name")}get col_number(){return this.field(u,"col_number")}get collection_added(){return this.field(u,"collection_added")}get collection_library(){return this.field(u,"collection-library")}get collection_set(){return this.field(u,"collection_set")}get copyright_holder(){return this.field(u,"copyright_holder")}get court(){return this.field(u,"court")}get crawler(){return this.field(u,"crawler")}get crawljob(){return this.field(u,"crawljob")}get curation(){return this.field(an,"curation")}get dari_title(){return this.field(u,"dari-title")}get dari_title_romanized(){return this.field(u,"dari-title-romanized","dari-romanized-title")}get date_case_filed(){return this.field(O,"date-case-filed")}get date_case_terminated(){return this.field(O,"date-case-terminated")}get date_created(){return this.field(O,"date_created")}get date_last_filing(){return this.field(O,"date-last-filing")}get derive_submittime(){return this.field(O,"derive_submittime")}get derive_version(){return this.field(u,"derive_version")}get discs(){return this.field(w,"discs")}get docket_num(){return this.field(u,"docket-num")}get external_metadata_update(){return this.field(O,"external_metadata_update")}get fail_reasons(){return this.field(u,"fail-reasons")}get filesxml(){return this.field(O,"filesxml")}get firstfiledate(){return this.field(O,"firstfiledate")}get firstfileserial(){return this.field(w,"firstfileserial")}get foldoutcount(){return this.field(w,"foldoutcount")}get format(){return this.field(u,"format")}get geo_restricted(){return this.field(u,"geo_restricted")}get guid(){return this.field(u,"guid")}get has_mp3(){return this.field(le,"has_mp3")}get height(){return this.field(w,"height")}get hidden(){return this.field(le,"hidden")}get ia_orig__runtime(){return this.field(u,"ia_orig__runtime")}get identifier(){return this.rawMetadata.identifier}get access_restricted_item(){return this.field(le,"access-restricted-item")}get addeddate(){return this.field(O,"addeddate")}get aspect_ratio(){return this.field(ln,"aspect_ratio")}get audio_codec(){return this.field(u,"audio_codec")}get audio_sample_rate(){return this.field(w,"audio_sample_rate")}get avg_rating(){return this.field(w,"avg_rating")}get backup_location(){return this.field(u,"backup_location")}get ccnum(){return this.field(u,"ccnum")}get closed_captioning(){return this.field(le,"closed_captioning")}get collection(){return this.field(u,"collection")}get collections_raw(){return this.field(u,"collections_raw")}get collection_size(){return this.field(ut,"collection_size")}get color(){return Pe(this.rawMetadata,e=>new Ne(e,hn),"color")}get contact(){return this.field(u,"contact")}get contributor(){return this.field(u,"contributor")}get coverage(){return this.field(u,"coverage")}get creator(){return this.field(u,"creator")}get creator_alt_script(){return this.field(u,"creator-alt-script")}get credits(){return this.field(u,"credits")}get collection_layout(){return this.field(u,"collection_layout")}get date(){return this.field(O,"date")}get description(){return this.field(u,"description")}get downloads(){return this.field(w,"downloads")}get duration(){return this.field(jt,"duration")}get external_identifier(){return this.field(u,"external-identifier")}get external_link(){return this.field(u,"external-link")}get files_count(){return this.field(w,"files_count")}get frames_per_second(){return this.field(w,"frames_per_second")}get identifier_access(){return this.field(u,"identifier-access")}get identifier_ark(){return this.field(u,"identifier-ark")}get identifier_bib(){return this.field(u,"identifier-bib")}get image_count(){return this.field(w,"image_count")}get imagecount(){return this.field(w,"imagecount")}get indexdate(){return this.field(O,"indexdate")}get invoice(){return this.field(w,"invoice")}get isbn(){return this.field(u,"isbn")}get issue(){return this.field(u,"issue")}get issue_count(){return this.field(w,"issue_count")}get issue_page_count(){return this.field(w,"issue_page_count")}get item_count(){return this.field(w,"item_count")}get item_size(){return this.field(ut,"item_size")}get language(){return this.field(u,"language")}get lastdate(){return this.field(O,"lastdate")}get lastfiledate(){return this.field(O,"lastfiledate")}get lastfileserial(){return this.field(w,"lastfileserial")}get length(){return this.field(jt,"length")}get license(){return this.field(u,"license")}get licenseurl(){return this.field(u,"licenseurl")}get lineage(){return this.field(u,"lineage")}get mature_content(){return this.field(le,"mature_content")}get md5(){return this.field(u,"md5")}get md5contents(){return this.field(Xr,"md5contents")}get md5s(){return this.field(Xr,"md5s")}get medium(){return this.field(u,"medium")}get metadata_operator(){return this.field(u,"metadata_operator")}get metasource_catalog(){return this.field(u,"metasource_catalog")}get monochromatic(){return this.field(le,"monochromatic")}get month(){return this.field(w,"month")}get mediatype(){return this.field(rn,"mediatype")}get mpeg_program(){return this.field(w,"mpeg_program")}get next_item(){return this.field(u,"next_item")}get noarchivetorrent(){return this.field(le,"noarchivetorrent")}get noindex(){return this.field(le,"noindex")}get notes(){return this.field(u,"notes")}get num_favorites(){return this.field(w,"num_favorites")}get num_reviews(){return this.field(w,"num_reviews")}get numeric_id(){return this.field(w,"numeric_id")}get numwarcs(){return this.field(w,"numwarcs")}get ocr(){return this.field(u,"ocr")}get ocr_autonomous(){return this.field(le,"ocr_autonomous")}get ocr_detected_lang(){return this.field(u,"ocr_detected_lang")}get ocr_detected_lang_conf(){return this.field(w,"ocr_detected_lang_conf")}get ocr_detected_script(){return this.field(u,"ocr_detected_script")}get ocr_detected_script_conf(){return this.field(w,"ocr_detected_script_conf")}get ocr_invalid_language(){return this.field(u,"ocr_invalid_language")}get ocr_module_version(){return this.field(u,"ocr_module_version")}get ocr_parameters(){return this.field(u,"ocr_parameters")}get old_pallet(){return this.field(u,"old_pallet")}get openlibrary_edition(){return this.field(u,"openlibrary_edition")}get openlibrary_work(){return this.field(u,"openlibrary_work")}get operator(){return this.field(u,"operator")}get originalurl(){return this.field(u,"originalurl")}get osf_category(){return this.field(u,"osf_category")}get osf_project(){return this.field(u,"osf_project")}get osf_registration_doi(){return this.field(u,"osf_registration_doi")}get osf_registration_schema(){return this.field(u,"osf_registration_schema")}get osf_registry(){return this.field(u,"osf_registry")}get osf_subjects(){return this.field(u,"osf_subjects")}get osf_tags(){return this.field(u,"osf_tags")}get output_time_minutes(){return this.field(w,"output_time_minutes")}get pacer_case_num(){return this.field(w,"pacer-case-num")}get packaging_time_minutes(){return this.field(w,"packaging_time_minutes")}get page_number_confidence(){return this.field(w,"page_number_confidence")}get page_number_module_version(){return this.field(u,"page_number_module_version")}get page_progression(){return this.field(en,"page-progression","page_progression")}get paginated(){return this.field(le,"paginated")}get parse_date(){return this.field(O,"parse_date")}get parse_state(){return this.field(u,"parse_state")}get partner(){return this.field(u,"partner")}get pashto_title(){return this.field(u,"pashto-title")}get pashto_title_romanized(){return this.field(u,"pashto-title-romanized","romanized-pashto-title")}get pdf_degraded(){return this.field(u,"pdf_degraded")}get pdf_module_version(){return this.field(u,"pdf_module_version")}get pick(){return this.field(w,"pick")}get podcastindexid(){return this.field(w,"podcastindexid")}get post_text(){return this.field(u,"post_text")}get ppi(){return this.field(w,"ppi")}get previous_item(){return this.field(u,"previous_item")}get program(){return this.field(u,"program")}get publicdate(){return this.field(O,"publicdate")}get publisher(){return this.field(u,"publisher")}get political_religious_party(){return this.field(u,"political-religious-party")}get rcs_key(){return this.field(w,"rcs_key")}get repub_state(){return this.field(w,"repub_state")}get republisher_date(){return this.field(O,"republisher_date")}get republisher_operator(){return this.field(qr,"republisher_operator")}get republisher_time(){return this.field(w,"republisher_time")}get reviewdate(){return this.field(O,"reviewdate")}get reviews_allowed(){return Pe(this.rawMetadata,e=>new Ne(e,dn),"reviews-allowed")}get ribbon_state(){return this.field(u,"ribbon_state")}get ribbon_state_modify_date(){return this.field(O,"ribbon_state_modify_date")}get rights(){return this.field(u,"rights")}get rights_holder(){return this.field(u,"rights-holder","rights_holder")}get rssfeed(){return this.field(u,"rssfeed")}get runtime(){return this.field(jt,"runtime")}get scan_time_minutes(){return this.field(w,"scan_time_minutes")}get scandate(){return this.field(O,"scandate")}get scanfee(){return this.field(Vt,"scanfee")}get scanner(){return this.field(u,"scanner")}get scanner_operator(){return this.field(u,"scanner_operator")}get scanningcenter(){return this.field(u,"scanningcenter")}get scribe3_search_catalog(){return this.field(u,"scribe3_search_catalog")}get scribe3_search_id(){return this.field(u,"scribe3_search_id")}get segments(){return this.field(u,"segments")}get sessionid(){return this.field(u,"sessionid")}get shndiscs(){return this.field(w,"shndiscs")}get shotlist(){return this.field(u,"shotlist")}get signal_path(){return this.field(u,"signal-path")}get size(){return this.field(ut,"size")}get sizehint(){return this.field(ut,"sizehint")}get software_version(){return this.field(u,"software_version")}get sort_order(){return this.field(u,"sort_order")}get sound(){return Pe(this.rawMetadata,e=>new Ne(e,pn),"sound")}get soundcreator(){return this.field(u,"soundcreator")}get soundtitle(){return this.field(u,"soundtitle")}get source(){return this.field(u,"source")}get source_pixel_height(){return this.field(w,"source_pixel_height")}get source_pixel_width(){return this.field(w,"source_pixel_width")}get source_url(){return this.field(u,"source_url")}get sponsor(){return this.field(u,"sponsor")}get sponsordate(){return this.field(O,"sponsordate")}get start_localtime(){return this.field(O,"start_localtime")}get start_time(){return this.field(O,"start_time")}get station_name(){return this.field(u,"station_name")}get stop_time(){return this.field(O,"stop_time")}get subject(){return this.field(qr,"subject")}get taper(){return this.field(u,"taper")}get thumbs(){return this.field(Vt,"thumbs")}get times(){return this.field(Vt,"times")}get title(){return this.field(u,"title")}get title_alt_script(){return this.field(u,"title-alt-script")}get transferer(){return this.field(u,"transferer")}get track(){return this.field(w,"track")}get tts_version(){return this.field(u,"tts_version")}get tuner(){return this.field(un,"tuner")}get type(){return this.field(u,"type")}get updatedate(){return this.field(O,"updatedate")}get updater(){return this.field(u,"updater")}get uploader(){return this.field(u,"uploader")}get uploadsoftware(){return this.field(u,"uploadsoftware")}get utc_offset(){return this.field(cn,"utc_offset")}get venue(){return this.field(u,"venue")}get video_codec(){return this.field(u,"video_codec")}get volume(){return this.field(u,"volume")}get website(){return this.field(u,"website")}get week(){return this.field(w,"week")}get width(){return this.field(w,"width")}get year(){return this.field(w,"year")}field(e,...t){return Pe(this.rawMetadata,a=>new e(a),...t)}constructor(e={}){this.rawMetadata=e}}n([s()],o.prototype,"access",null);n([s()],o.prototype,"adder",null);n([s()],o.prototype,"amrc_id",null);n([s()],o.prototype,"archiveit_account_id",null);n([s()],o.prototype,"archiveit_account_organization_name",null);n([s()],o.prototype,"archiveit_collection_id",null);n([s()],o.prototype,"archiveit_collection_name",null);n([s()],o.prototype,"archiveit_job_type",null);n([s()],o.prototype,"audit_time_minutes",null);n([s()],o.prototype,"auditor",null);n([s()],o.prototype,"author",null);n([s()],o.prototype,"autocrop_version",null);n([s()],o.prototype,"bookplateleaf",null);n([s()],o.prototype,"bookreader_defaults",null);n([s()],o.prototype,"boxid",null);n([s()],o.prototype,"camera",null);n([s()],o.prototype,"cameraman",null);n([s()],o.prototype,"canister",null);n([s()],o.prototype,"case_name",null);n([s()],o.prototype,"col_number",null);n([s()],o.prototype,"collection_added",null);n([s()],o.prototype,"collection_library",null);n([s()],o.prototype,"collection_set",null);n([s()],o.prototype,"copyright_holder",null);n([s()],o.prototype,"court",null);n([s()],o.prototype,"crawler",null);n([s()],o.prototype,"crawljob",null);n([s()],o.prototype,"curation",null);n([s()],o.prototype,"dari_title",null);n([s()],o.prototype,"dari_title_romanized",null);n([s()],o.prototype,"date_case_filed",null);n([s()],o.prototype,"date_case_terminated",null);n([s()],o.prototype,"date_created",null);n([s()],o.prototype,"date_last_filing",null);n([s()],o.prototype,"derive_submittime",null);n([s()],o.prototype,"derive_version",null);n([s()],o.prototype,"discs",null);n([s()],o.prototype,"docket_num",null);n([s()],o.prototype,"external_metadata_update",null);n([s()],o.prototype,"fail_reasons",null);n([s()],o.prototype,"filesxml",null);n([s()],o.prototype,"firstfiledate",null);n([s()],o.prototype,"firstfileserial",null);n([s()],o.prototype,"foldoutcount",null);n([s()],o.prototype,"format",null);n([s()],o.prototype,"geo_restricted",null);n([s()],o.prototype,"guid",null);n([s()],o.prototype,"has_mp3",null);n([s()],o.prototype,"height",null);n([s()],o.prototype,"hidden",null);n([s()],o.prototype,"ia_orig__runtime",null);n([s()],o.prototype,"access_restricted_item",null);n([s()],o.prototype,"addeddate",null);n([s()],o.prototype,"aspect_ratio",null);n([s()],o.prototype,"audio_codec",null);n([s()],o.prototype,"audio_sample_rate",null);n([s()],o.prototype,"avg_rating",null);n([s()],o.prototype,"backup_location",null);n([s()],o.prototype,"ccnum",null);n([s()],o.prototype,"closed_captioning",null);n([s()],o.prototype,"collection",null);n([s()],o.prototype,"collections_raw",null);n([s()],o.prototype,"collection_size",null);n([s()],o.prototype,"color",null);n([s()],o.prototype,"contact",null);n([s()],o.prototype,"contributor",null);n([s()],o.prototype,"coverage",null);n([s()],o.prototype,"creator",null);n([s()],o.prototype,"creator_alt_script",null);n([s()],o.prototype,"credits",null);n([s()],o.prototype,"collection_layout",null);n([s()],o.prototype,"date",null);n([s()],o.prototype,"description",null);n([s()],o.prototype,"downloads",null);n([s()],o.prototype,"duration",null);n([s()],o.prototype,"external_identifier",null);n([s()],o.prototype,"external_link",null);n([s()],o.prototype,"files_count",null);n([s()],o.prototype,"frames_per_second",null);n([s()],o.prototype,"identifier_access",null);n([s()],o.prototype,"identifier_ark",null);n([s()],o.prototype,"identifier_bib",null);n([s()],o.prototype,"image_count",null);n([s()],o.prototype,"imagecount",null);n([s()],o.prototype,"indexdate",null);n([s()],o.prototype,"invoice",null);n([s()],o.prototype,"isbn",null);n([s()],o.prototype,"issue",null);n([s()],o.prototype,"issue_count",null);n([s()],o.prototype,"issue_page_count",null);n([s()],o.prototype,"item_count",null);n([s()],o.prototype,"item_size",null);n([s()],o.prototype,"language",null);n([s()],o.prototype,"lastdate",null);n([s()],o.prototype,"lastfiledate",null);n([s()],o.prototype,"lastfileserial",null);n([s()],o.prototype,"length",null);n([s()],o.prototype,"license",null);n([s()],o.prototype,"licenseurl",null);n([s()],o.prototype,"lineage",null);n([s()],o.prototype,"mature_content",null);n([s()],o.prototype,"md5",null);n([s()],o.prototype,"md5contents",null);n([s()],o.prototype,"md5s",null);n([s()],o.prototype,"medium",null);n([s()],o.prototype,"metadata_operator",null);n([s()],o.prototype,"metasource_catalog",null);n([s()],o.prototype,"monochromatic",null);n([s()],o.prototype,"month",null);n([s()],o.prototype,"mediatype",null);n([s()],o.prototype,"mpeg_program",null);n([s()],o.prototype,"next_item",null);n([s()],o.prototype,"noarchivetorrent",null);n([s()],o.prototype,"noindex",null);n([s()],o.prototype,"notes",null);n([s()],o.prototype,"num_favorites",null);n([s()],o.prototype,"num_reviews",null);n([s()],o.prototype,"numeric_id",null);n([s()],o.prototype,"numwarcs",null);n([s()],o.prototype,"ocr",null);n([s()],o.prototype,"ocr_autonomous",null);n([s()],o.prototype,"ocr_detected_lang",null);n([s()],o.prototype,"ocr_detected_lang_conf",null);n([s()],o.prototype,"ocr_detected_script",null);n([s()],o.prototype,"ocr_detected_script_conf",null);n([s()],o.prototype,"ocr_invalid_language",null);n([s()],o.prototype,"ocr_module_version",null);n([s()],o.prototype,"ocr_parameters",null);n([s()],o.prototype,"old_pallet",null);n([s()],o.prototype,"openlibrary_edition",null);n([s()],o.prototype,"openlibrary_work",null);n([s()],o.prototype,"operator",null);n([s()],o.prototype,"originalurl",null);n([s()],o.prototype,"osf_category",null);n([s()],o.prototype,"osf_project",null);n([s()],o.prototype,"osf_registration_doi",null);n([s()],o.prototype,"osf_registration_schema",null);n([s()],o.prototype,"osf_registry",null);n([s()],o.prototype,"osf_subjects",null);n([s()],o.prototype,"osf_tags",null);n([s()],o.prototype,"output_time_minutes",null);n([s()],o.prototype,"pacer_case_num",null);n([s()],o.prototype,"packaging_time_minutes",null);n([s()],o.prototype,"page_number_confidence",null);n([s()],o.prototype,"page_number_module_version",null);n([s()],o.prototype,"page_progression",null);n([s()],o.prototype,"paginated",null);n([s()],o.prototype,"parse_date",null);n([s()],o.prototype,"parse_state",null);n([s()],o.prototype,"partner",null);n([s()],o.prototype,"pashto_title",null);n([s()],o.prototype,"pashto_title_romanized",null);n([s()],o.prototype,"pdf_degraded",null);n([s()],o.prototype,"pdf_module_version",null);n([s()],o.prototype,"pick",null);n([s()],o.prototype,"podcastindexid",null);n([s()],o.prototype,"post_text",null);n([s()],o.prototype,"ppi",null);n([s()],o.prototype,"previous_item",null);n([s()],o.prototype,"program",null);n([s()],o.prototype,"publicdate",null);n([s()],o.prototype,"publisher",null);n([s()],o.prototype,"political_religious_party",null);n([s()],o.prototype,"rcs_key",null);n([s()],o.prototype,"repub_state",null);n([s()],o.prototype,"republisher_date",null);n([s()],o.prototype,"republisher_operator",null);n([s()],o.prototype,"republisher_time",null);n([s()],o.prototype,"reviewdate",null);n([s()],o.prototype,"reviews_allowed",null);n([s()],o.prototype,"ribbon_state",null);n([s()],o.prototype,"ribbon_state_modify_date",null);n([s()],o.prototype,"rights",null);n([s()],o.prototype,"rights_holder",null);n([s()],o.prototype,"rssfeed",null);n([s()],o.prototype,"runtime",null);n([s()],o.prototype,"scan_time_minutes",null);n([s()],o.prototype,"scandate",null);n([s()],o.prototype,"scanfee",null);n([s()],o.prototype,"scanner",null);n([s()],o.prototype,"scanner_operator",null);n([s()],o.prototype,"scanningcenter",null);n([s()],o.prototype,"scribe3_search_catalog",null);n([s()],o.prototype,"scribe3_search_id",null);n([s()],o.prototype,"segments",null);n([s()],o.prototype,"sessionid",null);n([s()],o.prototype,"shndiscs",null);n([s()],o.prototype,"shotlist",null);n([s()],o.prototype,"signal_path",null);n([s()],o.prototype,"size",null);n([s()],o.prototype,"sizehint",null);n([s()],o.prototype,"software_version",null);n([s()],o.prototype,"sort_order",null);n([s()],o.prototype,"sound",null);n([s()],o.prototype,"soundcreator",null);n([s()],o.prototype,"soundtitle",null);n([s()],o.prototype,"source",null);n([s()],o.prototype,"source_pixel_height",null);n([s()],o.prototype,"source_pixel_width",null);n([s()],o.prototype,"source_url",null);n([s()],o.prototype,"sponsor",null);n([s()],o.prototype,"sponsordate",null);n([s()],o.prototype,"start_localtime",null);n([s()],o.prototype,"start_time",null);n([s()],o.prototype,"station_name",null);n([s()],o.prototype,"stop_time",null);n([s()],o.prototype,"subject",null);n([s()],o.prototype,"taper",null);n([s()],o.prototype,"thumbs",null);n([s()],o.prototype,"times",null);n([s()],o.prototype,"title",null);n([s()],o.prototype,"title_alt_script",null);n([s()],o.prototype,"transferer",null);n([s()],o.prototype,"track",null);n([s()],o.prototype,"tts_version",null);n([s()],o.prototype,"tuner",null);n([s()],o.prototype,"type",null);n([s()],o.prototype,"updatedate",null);n([s()],o.prototype,"updater",null);n([s()],o.prototype,"uploader",null);n([s()],o.prototype,"uploadsoftware",null);n([s()],o.prototype,"utc_offset",null);n([s()],o.prototype,"venue",null);n([s()],o.prototype,"video_codec",null);n([s()],o.prototype,"volume",null);n([s()],o.prototype,"website",null);n([s()],o.prototype,"week",null);n([s()],o.prototype,"width",null);n([s()],o.prototype,"year",null);class Q{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return ce(this.rawValue,e=>Ue.shared.parseValue(e),"reviewdate")}get createdate(){return ce(this.rawValue,e=>Ue.shared.parseValue(e),"createdate")}get stars(){return ce(this.rawValue,e=>ie.shared.parseValue(e),"stars")}constructor(e={}){this.rawValue=e}}n([s()],Q.prototype,"reviewdate",null);n([s()],Q.prototype,"createdate",null);n([s()],Q.prototype,"stars",null);class mn{constructor(e){var t,a;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(c=>new ue(c)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new o(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(a=e.reviews)===null||a===void 0?void 0:a.map(c=>new Q(c)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}var Se;(function(r){r.networkError="MetadataService.NetworkError",r.itemNotFound="MetadataService.ItemNotFound",r.decodingError="MetadataService.DecodingError",r.searchEngineError="MetadataService.SearchEngineError"})(Se||(Se={}));class rr extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class gn{constructor(e){var t;if(this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const c=new URL(window.location.href).searchParams.get("scope");c&&(this.requestScope=c)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",c=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(c)}async fetchUrl(e,t){var a;const c=new URL(e);this.requestScope&&c.searchParams.set("scope",this.requestScope);let p;try{const h=(a=t?.requestOptions)!==null&&a!==void 0?a:{credentials:this.includeCredentials?"include":"same-origin"};p=await fetch(c.href,h)}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.networkError,y)}try{const h=await p.json(),y=h.error;if(y){const v=h.forensics;return this.getErrorResult(Se.searchEngineError,y,v)}else return{success:h}}catch(h){const y=h instanceof Error?h.message:typeof h=="string"?h:"Unknown error";return this.getErrorResult(Se.decodingError,y)}}getErrorResult(e,t,a){return{error:new rr(e,t,a)}}}class Kr{constructor(e){this.backend=e}async fetchMetadata(e){var t;const a=await this.backend.fetchMetadata(e);return a.error?a:((t=a.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new rr(Se.itemNotFound)}:{success:new mn(a.success)}}async fetchMetadataValue(e,t){var a;const c=await this.backend.fetchMetadata(e,t);return c.error?c:((a=c.success)===null||a===void 0?void 0:a.result)===void 0?{error:new rr(Se.itemNotFound)}:{success:c.success.result}}}Kr.default=new Kr(new gn);function Zr(r){return new Promise(e=>setTimeout(e,r))}class ir{constructor(e){this.maxRetries=2,this.transientStatusCodes=new Set([408,429,500,502,503,504,522]),e?.maxRetries!==void 0&&(this.maxRetries=e.maxRetries),e?.transientStatusCodes!==void 0&&(this.transientStatusCodes=e.transientStatusCodes)}shouldRetry(e,t){return e===null||t>this.maxRetries?!1:this.transientStatusCodes.has(e.status)}retryDelay(e,t){const a=t?.headers.get("Retry-After");if(a){const c=parseInt(a,10);if(!isNaN(c))return c*1e3}return Math.min(500*2**e,1e4)}}ir.shared=new ir;class nr{shouldRetry(){return!1}retryDelay(){return null}}nr.shared=new nr;class cr{}cr.default=ir.shared;cr.noRetry=nr.shared;const yi=r=>{if(r)return"requestInit"in r||"retryConfig"in r||"includeCsrfToken"in r?r:{requestInit:r}};class yn{constructor(e){this.retryConfig=cr.default,this.eventCategory="offshootFetchRetry",e?.analyticsHandler&&(this.analyticsHandler=e.analyticsHandler),e?.retryConfig&&(this.retryConfig=e.retryConfig)}async fetchRetry(e,t){const a=yi(t);return await this.doFetchRetry(e,0,a)}async doFetchRetry(e,t,a){var c,p;const h=typeof e=="string"?e:e.url;try{const y=await fetch(e,a?.requestInit);if(y.ok)return y;y.status>=400&&y.status<600&&this.log4xx5xxResponse(y);const v=(c=a?.retryConfig)!==null&&c!==void 0?c:this.retryConfig;if(v.shouldRetry(y,t)){const N=v.retryDelay(t,y);if(N!==null)return await Zr(N),this.logRetryEvent(h,t,y.statusText,y.status),this.doFetchRetry(e,t+1,a)}return this.logFailureEvent(h,y.status),y}catch(y){if(this.isContentBlockerError(y))throw this.logContentBlockingEvent(h,y),y;const v=(p=a?.retryConfig)!==null&&p!==void 0?p:this.retryConfig;if(v.shouldRetry(null,t)){const N=v.retryDelay(t);if(N!==null)return await Zr(N),this.logRetryEvent(h,t,y,y),this.doFetchRetry(e,t+1,a)}throw this.logFailureEvent(h,y),y}}isContentBlockerError(e){return e instanceof TypeError?e.message.toLowerCase().includes("content blocker"):!1}logRetryEvent(e,t,a,c){var p;(p=this.analyticsHandler)===null||p===void 0||p.sendEvent({category:this.eventCategory,action:"retryingFetch",label:`retryNumber: ${t}, code: ${c}, status: ${a}, url: ${e}`})}logFailureEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"fetchFailed",label:`error: ${t}, url: ${e}`})}log4xx5xxResponse(e){var t;const a=e.status;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.eventCategory,action:`status${a}Response`,label:`url: ${e.url}`})}logContentBlockingEvent(e,t){var a;(a=this.analyticsHandler)===null||a===void 0||a.sendEvent({category:this.eventCategory,action:"contentBlockerDetectedNotRetrying",label:`error: ${t}, url: ${e}`})}}const vn=new Set(["POST","PUT","DELETE","PATCH"]);class ur{constructor(e){this.apiBaseUrl="",this.fetchRetrier=new yn,e?.apiBaseUrl?this.apiBaseUrl=e.apiBaseUrl:e?.iaApiBaseUrl&&(this.apiBaseUrl=e.iaApiBaseUrl),e?.fetchRetrier&&(this.fetchRetrier=e.fetchRetrier),e?.searchParams?this.searchParams=e.searchParams:this.searchParams=window.location.search,e?.getCsrfToken&&(this.getCsrfToken=e.getCsrfToken)}async fetch(e,t){let a=e;if(new URLSearchParams(this.searchParams).get("reCache")==="1"){const h=typeof e=="string"?e:e.url;a=this.addSearchParams(h,{reCache:"1"})}const p=await this.withCsrfToken(a,t);return this.fetchRetrier.fetchRetry(a,p)}async fetchApiResponse(e,t){const a={};t?.includeCredentials&&(a.credentials="include"),t?.method&&(a.method=t.method),t?.body&&(a.body=t.body);const c=new Headers({Accept:"application/json"});t?.headers&&new Headers(t.headers).forEach((v,I)=>{c.set(I,v)}),a.headers=c;const p=t?.queryParams?this.addSearchParams(e,t.queryParams):e;return await(await this.fetch(p,{requestInit:a,retryConfig:t?.retryConfig,includeCsrfToken:t?.includeCsrfToken})).json()}async fetchApiPathResponse(e,t){const a=`${this.apiBaseUrl}${e}`;return this.fetchApiResponse(a,t)}async fetchIAApiResponse(e,t){return this.fetchApiPathResponse(e,t)}async withCsrfToken(e,t){var a,c,p,h;if(!this.getCsrfToken)return t;const y=(a=yi(t))!==null&&a!==void 0?a:{};if(!y.includeCsrfToken)return t;const v=(c=y.requestInit)!==null&&c!==void 0?c:{},I=((h=(p=v.method)!==null&&p!==void 0?p:typeof e!="string"?e.method:void 0)!==null&&h!==void 0?h:"GET").toUpperCase();if(!vn.has(I))return t;const N=new Headers(v.headers);return N.has("X-CSRF-Token")?t:(N.set("X-CSRF-Token",await this.getCsrfToken()),{...y,requestInit:{...v,headers:N}})}addSearchParams(e,t){const a=e.indexOf("#"),c=a===-1?"":e.slice(a),p=a===-1?e:e.slice(0,a),h=p.indexOf("?"),y=h===-1?p:p.slice(0,h),v=new URLSearchParams(h===-1?"":p.slice(h+1)),I=ur.asSearchParams(t),N=new Set;I.forEach((re,me)=>{N.has(me)||(N.add(me),v.delete(me))}),I.forEach((re,me)=>{v.append(me,re)});const te=v.toString();return`${y}${te?`?${te}`:""}${c}`}static asSearchParams(e){if(e instanceof URLSearchParams)return e;const t=new URLSearchParams;return Object.entries(e).forEach(([a,c])=>{c!=null&&t.append(a,String(c))}),t}}class _n extends ur{constructor(e){var t;const a={...e};a.iaApiBaseUrl=(t=e?.iaApiBaseUrl)!==null&&t!==void 0?t:"https://archive.org",super(a)}}const wn="/write-review.php",bn="/edit-reviews.php";class vi{constructor(e){this.fetchHandler=e?.fetchHandler??new _n,this.baseHost=e?.baseHost??"https://archive.org",this.submitPath=e?.submitPath??wn,this.deletePath=e?.deletePath??bn,this.deleteMethod=e?.deleteMethod??"POST"}async submitReview(e){const t=new URLSearchParams;return t.append("identifier",e.identifier),t.append("field_reviewtitle",e.title),t.append("field_reviewbody",e.body),t.append("field_stars",e.stars??"0"),e.recaptchaToken&&t.append("g-recaptcha-response",e.recaptchaToken),t.append("submitter","review-form"),this.request(`${this.baseHost}${this.submitPath}`,{method:"POST",body:t})}async deleteReview(e){const t=new URLSearchParams;t.append("identifier",e.identifier),t.append("deleteReviewer",e.reviewer),e.reviewerItemname&&t.append("deleteReviewerItemname",e.reviewerItemname);const a=`${this.baseHost}${this.deletePath}?${t.toString()}`;return this.request(a,{method:this.deleteMethod})}async request(e,t){try{const a=await this.fetchHandler.fetch(e,{requestInit:{method:t.method,body:t.body,credentials:"include"},includeCsrfToken:!0});return await this.parseResult(a)}catch(a){return console.error("Review request failed",a),{success:!1,error:this.genericError}}}async parseResult(e){let t;try{t=await e.json()}catch{t=void 0}return e.ok?!t||t.success?{success:!0}:{success:!1,error:t.error??this.genericError}:{success:!1,error:t?.error??this.genericError}}get genericError(){return S("Sorry, something went wrong. Please try again later.")}}const Tn="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%232C2C2C'%20/%3e%3c/svg%3e";function Jr(r=""){if(r.length<=40)return r;const t=r.substring(0,40)+"...";return b`<span title="${r}">${t}</span>`}function Qr(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,a=Array(e);t<e;t++)a[t]=r[t];return a}function Sn(r){if(Array.isArray(r))return r}function En(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var a,c,p,h,y=[],v=!0,I=!1;try{if(p=(t=t.call(r)).next,e!==0)for(;!(v=(a=p.call(t)).done)&&(y.push(a.value),y.length!==e);v=!0);}catch(N){I=!0,c=N}finally{try{if(!v&&t.return!=null&&(h=t.return(),Object(h)!==h))return}finally{if(I)throw c}}return y}}function Rn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function An(r,e){return Sn(r)||En(r,e)||xn(r,e)||Rn()}function xn(r,e){if(r){if(typeof r=="string")return Qr(r,e);var t={}.toString.call(r).slice(8,-1);return t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set"?Array.from(r):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Qr(r,e):void 0}}const _i=Object.entries,ei=Object.setPrototypeOf,Cn=Object.isFrozen,Ln=Object.getPrototypeOf,Dn=Object.getOwnPropertyDescriptor;let U=Object.freeze,B=Object.seal,Me=Object.create,wi=typeof Reflect<"u"&&Reflect,sr=wi.apply,or=wi.construct;U||(U=function(e){return e});B||(B=function(e){return e});sr||(sr=function(e,t){for(var a=arguments.length,c=new Array(a>2?a-2:0),p=2;p<a;p++)c[p-2]=arguments[p];return e.apply(t,c)});or||(or=function(e){for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return new e(...a)});const Te=$(Array.prototype.forEach),On=$(Array.prototype.lastIndexOf),ti=$(Array.prototype.pop),Ge=$(Array.prototype.push),kn=$(Array.prototype.splice),Fe=Array.isArray,Xe=$(String.prototype.toLowerCase),Wt=$(String.prototype.toString),ri=$(String.prototype.match),Ye=$(String.prototype.replace),ii=$(String.prototype.indexOf),In=$(String.prototype.trim),Pn=$(Number.prototype.toString),Mn=$(Boolean.prototype.toString),ni=typeof BigInt>"u"?null:$(BigInt.prototype.toString),si=typeof Symbol>"u"?null:$(Symbol.prototype.toString),X=$(Object.prototype.hasOwnProperty),qe=$(Object.prototype.toString),j=$(RegExp.prototype.test),be=Nn(TypeError);function $(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,a=new Array(t>1?t-1:0),c=1;c<t;c++)a[c-1]=arguments[c];return sr(r,e,a)}}function Nn(r){return function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return or(r,t)}}function E(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Xe;if(ei&&ei(r,null),!Fe(e))return r;let a=e.length;for(;a--;){let c=e[a];if(typeof c=="string"){const p=t(c);p!==c&&(Cn(e)||(e[a]=p),c=p)}r[c]=!0}return r}function $n(r){for(let e=0;e<r.length;e++)X(r,e)||(r[e]=null);return r}function Z(r){const e=Me(null);for(const a of _i(r)){var t=An(a,2);const c=t[0],p=t[1];X(r,c)&&(Fe(p)?e[c]=$n(p):p&&typeof p=="object"&&p.constructor===Object?e[c]=Z(p):e[c]=p)}return e}function Fn(r){switch(typeof r){case"string":return r;case"number":return Pn(r);case"boolean":return Mn(r);case"bigint":return ni?ni(r):"0";case"symbol":return si?si(r):"Symbol()";case"undefined":return qe(r);case"function":case"object":{if(r===null)return qe(r);const e=r,t=J(e,"toString");if(typeof t=="function"){const a=t(e);return typeof a=="string"?a:qe(a)}return qe(r)}default:return qe(r)}}function J(r,e){for(;r!==null;){const a=Dn(r,e);if(a){if(a.get)return $(a.get);if(typeof a.value=="function")return $(a.value)}r=Ln(r)}function t(){return null}return t}function Un(r){try{return j(r,""),!0}catch{return!1}}const oi=U(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gt=U(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Yt=U(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zn=U(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qt=U(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Bn=U(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ai=U(["#text"]),li=U(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Xt=U(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),ci=U(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pt=U(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Hn=B(/{{[\w\W]*|^[\w\W]*}}/g),jn=B(/<%[\w\W]*|^[\w\W]*%>/g),Vn=B(/\${[\w\W]*/g),Wn=B(/^data-[\-\w.\u00B7-\uFFFF]+$/),Gn=B(/^aria-[\-\w]+$/),ui=B(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yn=B(/^(?:\w+script|data):/i),qn=B(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xn=B(/^html$/i),Kn=B(/^[a-z][.\w]*(-[.\w]+)+$/i),di=B(/<[/\w!]/g),pi=B(/<[/\w]/g),Zn=B(/<\/no(script|embed|frames)/i),Jn=B(/\/>/i),K={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},bi=["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"],Qn=U(E({},bi)),es=(function(){const r={};return Te(bi,e=>{r[e]=B(new RegExp("</"+e+"(?=[\\t\\n\\f\\r />])","i"))}),U(r)})(),ts=function(){return typeof window>"u"?null:window},rs=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let a=null;const c="data-tt-policy-suffix";t&&t.hasAttribute(c)&&(a=t.getAttribute(c));const p="dompurify"+(a?"#"+a:"");try{return e.createPolicy(p,{createHTML(h){return h},createScriptURL(h){return h}})}catch{return console.warn("TrustedTypes policy "+p+" could not be created."),null}},hi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},fe=function(e,t,a,c){return X(e,t)&&Fe(e[t])?E(c.base?Z(c.base):{},e[t],c.transform):a},Kt=function(e,t,a){const c=X(e,t)?e[t]:void 0;return c&&typeof c=="object"?Z(c):a()};function Ti(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ts();const e=f=>Ti(f);if(e.version="3.4.15",e.removed=[],!r||!r.document||r.document.nodeType!==K.document||!r.Element)return e.isSupported=!1,e;let t=r.document;const a=t,c=a.currentScript;r.DocumentFragment;const p=r.HTMLTemplateElement,h=r.Node,y=r.Element,v=r.NodeFilter,I=r.NamedNodeMap;I===void 0&&(r.NamedNodeMap||r.MozNamedAttrMap),r.HTMLFormElement;const N=r.DOMParser,te=r.trustedTypes,re=y.prototype,me=J(re,"cloneNode"),Tt=J(re,"remove"),pr=J(re,"removeAttributeNode"),Si=J(re,"nextSibling"),Ee=J(re,"childNodes"),Re=J(re,"parentNode"),hr=J(re,"shadowRoot"),St=J(re,"attributes"),ge=h&&h.prototype?J(h.prototype,"nodeType"):null,Ae=h&&h.prototype?J(h.prototype,"nodeName"):null,Ke=h&&h.prototype?J(h.prototype,"ownerDocument"):null,Be=function(i){return ge?ge(i):i.nodeType},Et=function(i){return Ae?Ae(i):i.nodeName};if(typeof p=="function"){const f=t.createElement("template");f.content&&f.content.ownerDocument&&(t=f.content.ownerDocument)}let G,ye="",Rt,fr=!1,He=0;const mr=function(){if(He>0)throw be('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},xe=function(i){mr(),He++;try{return G.createHTML(i)}finally{He--}},Ei=function(i){mr(),He++;try{return G.createScriptURL(i)}finally{He--}},Ri=function(){return fr||(Rt=rs(te,c),fr=!0),Rt},Ze=t,At=Ze.implementation,gr=Ze.createNodeIterator,Ai=Ze.createDocumentFragment,xi=Ze.getElementsByTagName,Ci=a.importNode;let C=hi();e.isSupported=typeof _i=="function"&&typeof Re=="function"&&At&&At.createHTMLDocument!==void 0;const Li=Hn,Di=jn,Oi=Vn,ki=Wn,Ii=Gn,Pi=Yn,yr=qn,Mi=Kn;let vr=ui,L=null;const xt=E({},[...oi,...Gt,...Yt,...qt,...ai]);let D=null;const Ct=E({},[...li,...Xt,...ci,...pt]);let se=Object.seal(Me(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),je=null,_r=null;const de=Object.seal(Me(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let wr=!0,Lt=!0,br=!1,Tr=!0,pe=!1,ve=!0,_e=!1,Dt=!1,Je=null,Qe=null,Ot=!1,Ce=!1,et=!1,tt=!1,Sr=!0,Er=!1;const Rr="user-content-";let kt=!0,It=!1,Le={},De=null;const Ar=E({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let xr=null;const Cr=E({},["audio","video","img","source","image","track"]);let Lr=null;const Dr=E({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",it="http://www.w3.org/2000/svg",oe="http://www.w3.org/1999/xhtml";let Oe=oe,Pt=!1,Mt=null;const Ni=E({},[rt,it,oe],Wt),Or=U(["mi","mo","mn","ms","mtext"]);let Nt=E({},Or);const kr=U(["annotation-xml"]);let $t=E({},kr);const $i=E({},["title","style","font","a","script"]);let Ve=null;const Fi=["application/xhtml+xml","text/html"],Ui="text/html";let P=null,ke=null;const zi=t.createElement("form"),Ir=function(i){return i instanceof RegExp||i instanceof Function},Ft=function(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(ke&&ke===i)return;(!i||typeof i!="object")&&(i={}),i=Z(i),Ve=Fi.indexOf(i.PARSER_MEDIA_TYPE)===-1?Ui:i.PARSER_MEDIA_TYPE,P=Ve==="application/xhtml+xml"?Wt:Xe,L=fe(i,"ALLOWED_TAGS",xt,{transform:P}),D=fe(i,"ALLOWED_ATTR",Ct,{transform:P}),Mt=fe(i,"ALLOWED_NAMESPACES",Ni,{transform:Wt}),Lr=fe(i,"ADD_URI_SAFE_ATTR",Dr,{transform:P,base:Dr}),xr=fe(i,"ADD_DATA_URI_TAGS",Cr,{transform:P,base:Cr}),De=fe(i,"FORBID_CONTENTS",Ar,{transform:P}),je=fe(i,"FORBID_TAGS",Z({}),{transform:P}),_r=fe(i,"FORBID_ATTR",Z({}),{transform:P}),Le=X(i,"USE_PROFILES")?i.USE_PROFILES&&typeof i.USE_PROFILES=="object"?Z(i.USE_PROFILES):i.USE_PROFILES:!1,wr=i.ALLOW_ARIA_ATTR!==!1,Lt=i.ALLOW_DATA_ATTR!==!1,br=i.ALLOW_UNKNOWN_PROTOCOLS||!1,Tr=i.ALLOW_SELF_CLOSE_IN_ATTR!==!1,pe=i.SAFE_FOR_TEMPLATES||!1,ve=i.SAFE_FOR_XML!==!1,_e=i.WHOLE_DOCUMENT||!1,Ce=i.RETURN_DOM||!1,et=i.RETURN_DOM_FRAGMENT||!1,tt=i.RETURN_TRUSTED_TYPE||!1,Ot=i.FORCE_BODY||!1,Sr=i.SANITIZE_DOM!==!1,Er=i.SANITIZE_NAMED_PROPS||!1,kt=i.KEEP_CONTENT!==!1,It=i.IN_PLACE||!1,vr=Un(i.ALLOWED_URI_REGEXP)?i.ALLOWED_URI_REGEXP:ui,Oe=typeof i.NAMESPACE=="string"?i.NAMESPACE:oe,Nt=Kt(i,"MATHML_TEXT_INTEGRATION_POINTS",()=>E({},Or)),$t=Kt(i,"HTML_INTEGRATION_POINTS",()=>E({},kr));const l=Kt(i,"CUSTOM_ELEMENT_HANDLING",()=>Me(null));if(se=Me(null),X(l,"tagNameCheck")&&Ir(l.tagNameCheck)&&(se.tagNameCheck=l.tagNameCheck),X(l,"attributeNameCheck")&&Ir(l.attributeNameCheck)&&(se.attributeNameCheck=l.attributeNameCheck),X(l,"allowCustomizedBuiltInElements")&&typeof l.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=l.allowCustomizedBuiltInElements),B(se),pe&&(Lt=!1),et&&(Ce=!0),Le&&(L=E({},ai),D=Me(null),Le.html===!0&&(E(L,oi),E(D,li)),Le.svg===!0&&(E(L,Gt),E(D,Xt),E(D,pt)),Le.svgFilters===!0&&(E(L,Yt),E(D,Xt),E(D,pt)),Le.mathMl===!0&&(E(L,qt),E(D,ci),E(D,pt))),de.tagCheck=null,de.attributeCheck=null,X(i,"ADD_TAGS")&&(typeof i.ADD_TAGS=="function"?de.tagCheck=i.ADD_TAGS:Fe(i.ADD_TAGS)&&(L===xt&&(L=Z(L)),E(L,i.ADD_TAGS,P))),X(i,"ADD_ATTR")&&(typeof i.ADD_ATTR=="function"?de.attributeCheck=i.ADD_ATTR:Fe(i.ADD_ATTR)&&(D===Ct&&(D=Z(D)),E(D,i.ADD_ATTR,P))),X(i,"ADD_FORBID_CONTENTS")&&Fe(i.ADD_FORBID_CONTENTS)&&(De===Ar&&(De=Z(De)),E(De,i.ADD_FORBID_CONTENTS,P)),kt&&(L["#text"]=!0),_e&&E(L,["html","head","body"]),L.table&&(E(L,["tbody"]),delete je.tbody),i.TRUSTED_TYPES_POLICY){if(typeof i.TRUSTED_TYPES_POLICY.createHTML!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof i.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const d=G;G=i.TRUSTED_TYPES_POLICY;try{ye=xe("")}catch(m){throw G=d,m}}else i.TRUSTED_TYPES_POLICY===null?(G=void 0,ye=""):(G===void 0&&(G=Ri()),G&&typeof ye=="string"&&(ye=xe("")));U&&U(i),ke=i},Pr=E({},[...Gt,...Yt,...zn]),Mr=E({},[...qt,...Bn]),Bi=function(i,l,d){return l.namespaceURI===oe?i==="svg":l.namespaceURI===rt?i==="svg"&&(d==="annotation-xml"||Nt[d]):!!Pr[i]},Hi=function(i,l,d){return l.namespaceURI===oe?i==="math":l.namespaceURI===it?i==="math"&&$t[d]:!!Mr[i]},ji=function(i,l,d){return l.namespaceURI===it&&!$t[d]||l.namespaceURI===rt&&!Nt[d]?!1:!Mr[i]&&($i[i]||!Pr[i])},Vi=function(i){let l=Re(i);(!l||!l.tagName)&&(l={namespaceURI:Oe,tagName:"template"});const d=Xe(i.tagName),m=Xe(l.tagName);return Mt[i.namespaceURI]?i.namespaceURI===it?Bi(d,l,m):i.namespaceURI===rt?Hi(d,l,m):i.namespaceURI===oe?ji(d,l,m):!!(Ve==="application/xhtml+xml"&&Mt[i.namespaceURI]):!1},he=function(i){Ge(e.removed,{element:i});try{Re(i).removeChild(i)}catch{if(Tt(i),!Re(i))throw be("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},Nr=function(i,l,d){try{pr(i,l)}catch{try{i.removeAttribute(d)}catch{}}},nt=function(i){st(i);const l=Ee(i);if(l){const m=[];Te(l,g=>{Ge(m,g)}),Te(m,g=>{try{Tt(g)}catch{}})}const d=St(i);if(d)for(let m=d.length-1;m>=0;--m){const g=d[m],_=g&&g.name;typeof _=="string"&&Nr(i,g,_)}},we=function(i,l,d){if(!d)try{d=l.getAttributeNode(i)}catch{d=null}Ge(e.removed,{attribute:d||null,from:l});try{d?pr(l,d):l.removeAttribute(i)}catch{try{l.removeAttribute(i)}catch{}}if(i==="is")if(Ce||et)try{he(l)}catch{}else try{l.setAttribute(i,"")}catch{}},Wi=function(i){const l=St(i);if(l)for(let d=l.length-1;d>=0;--d){const m=l[d],g=m&&m.name;typeof g!="string"||D[P(g)]||Nr(i,m,g)}},st=function(i){const l=[i];for(;l.length>0;){const d=l.pop();Be(d)===K.element&&Wi(d);const g=Ee(d);if(g)for(let _=g.length-1;_>=0;--_)l.push(g[_])}},$r=function(i,l){return ve?i==="patchsrc"?!0:i==="for"&&l!=="label"&&l!=="output":!1},Gi=function(i){if(!ve)return;const l=[i];for(;l.length>0;){const d=l.pop(),m=Be(d);if(m===K.processingInstruction||m===K.comment&&j(pi,d.data)){try{Tt(d)}catch{}continue}if(m===K.element){const _=d,A=P(Et(d));try{_.hasAttribute&&_.hasAttribute("patchsrc")&&_.removeAttribute("patchsrc"),_.hasAttribute&&_.hasAttribute("for")&&$r("for",A)&&_.removeAttribute("for")}catch{}}const g=Ee(d);if(g)for(let _=g.length-1;_>=0;--_)l.push(g[_])}},Fr=function(i){let l=null,d=null;if(Ot)i="<remove></remove>"+i;else{const _=ri(i,/^[\r\n\t ]+/);d=_&&_[0]}Ve==="application/xhtml+xml"&&Oe===oe&&(i='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+i+"</body></html>");const m=G?xe(i):i;if(Oe===oe)try{l=new N().parseFromString(m,Ve)}catch{}if(!l||!l.documentElement){l=At.createDocument(Oe,"template",null);try{l.documentElement.innerHTML=Pt?ye:m}catch{}}const g=l.body||l.documentElement;return i&&d&&g.insertBefore(t.createTextNode(d),g.childNodes[0]||null),Oe===oe?xi.call(l,_e?"html":"body")[0]:_e?l.documentElement:g},Ur=function(i){const l=Ke?Ke(i):i.ownerDocument;return gr.call(l||i,i,v.SHOW_ELEMENT|v.SHOW_COMMENT|v.SHOW_TEXT|v.SHOW_PROCESSING_INSTRUCTION|v.SHOW_CDATA_SECTION,null)},ot=function(i){return i=Ye(i,Li," "),i=Ye(i,Di," "),i=Ye(i,Oi," "),i},Ut=function(i){var l;i.normalize();const d=Ke?Ke(i):i.ownerDocument,m=gr.call(d||i,i,v.SHOW_TEXT|v.SHOW_COMMENT|v.SHOW_CDATA_SECTION|v.SHOW_PROCESSING_INSTRUCTION,null);let g=m.nextNode();for(;g;)g.data=ot(g.data),g=m.nextNode();const _=(l=i.querySelectorAll)===null||l===void 0?void 0:l.call(i,"template");_&&Te(_,A=>{Ie(A.content)&&Ut(A.content)})},at=function(i){const l=Ae?Ae(i):null;return typeof l!="string"||P(l)!=="form"?!1:typeof i.nodeName!="string"||typeof i.textContent!="string"||typeof i.removeChild!="function"||i.attributes!==St(i)||typeof i.removeAttribute!="function"||typeof i.removeAttributeNode!="function"||typeof i.getAttributeNode!="function"||typeof i.setAttribute!="function"||typeof i.namespaceURI!="string"||typeof i.insertBefore!="function"||typeof i.hasChildNodes!="function"||i.nodeType!==ge(i)||i.childNodes!==Ee(i)},Ie=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return ge(i)===K.documentFragment}catch{return!1}},We=function(i){if(!ge||typeof i!="object"||i===null)return!1;try{return typeof ge(i)=="number"}catch{return!1}};function ae(f,i,l){f.length!==0&&Te(f,d=>{d.call(e,i,l,ke)})}const Yi=function(i,l){return!!(ve&&i.hasChildNodes()&&!We(i.firstElementChild)&&j(di,i.textContent)&&j(di,i.innerHTML)||ve&&i.namespaceURI===oe&&Qn[l]&&(We(i.firstElementChild)||typeof i.textContent=="string"&&j(es[l],i.textContent))||i.nodeType===K.processingInstruction||ve&&i.nodeType===K.comment&&j(pi,i.data))},lt=function(i,l){if(i instanceof RegExp)return j(i,l);if(i instanceof Function){for(var d=arguments.length,m=new Array(d>2?d-2:0),g=2;g<d;g++)m[g-2]=arguments[g];return!!i(l,...m)}return!1},qi=function(i,l,d){if(!je[l]&&Vr(l)&&lt(se.tagNameCheck,l))return!1;if(kt&&!De[l]){const m=Re(i),g=Ee(i);if(g&&m){const _=g.length;for(let A=_-1;A>=0;--A){const k=i===d?me(g[A],!0):g[A];m.insertBefore(k,Si(i))}}}return he(i),!0},zr=function(i,l,d,m){return i.length===0?l:l===d||l===m?Z(l):l},Br=function(i,l){return i===l||Re(i)!==null?!1:(It&&st(i),!0)},Hr=function(i,l){if(ae(C.beforeSanitizeElements,i,null),Br(i,l))return!0;if(at(i))return he(i),!0;const d=P(Et(i));if(L=zr(C.uponSanitizeElement,L,xt,Je),ae(C.uponSanitizeElement,i,{tagName:d,allowedTags:L}),Br(i,l))return!0;if(Yi(i,d))return he(i),!0;if(je[d]||!(de.tagCheck instanceof Function&&de.tagCheck(d))&&!L[d]){const g=qi(i,d,l);return g===!1&&ae(C.afterSanitizeElements,i,null),g}if(Be(i)===K.element&&!Vi(i)||(d==="noscript"||d==="noembed"||d==="noframes")&&j(Zn,i.innerHTML))return he(i),!0;if(pe&&i.nodeType===K.text){const g=ot(i.textContent);i.textContent!==g&&(Ge(e.removed,{element:i.cloneNode()}),i.textContent=g)}return ae(C.afterSanitizeElements,i,null),!1},jr=function(i,l,d){if(_r[l]||$r(l,i)||Sr&&(l==="id"||l==="name")&&(d in t||d in zi))return!1;const m=D[l]||de.attributeCheck instanceof Function&&de.attributeCheck(l,i);return Lt&&j(ki,l)||wr&&j(Ii,l)?!0:m?Lr[l]||j(vr,Ye(d,yr,""))||(l==="src"||l==="xlink:href"||l==="href")&&i!=="script"&&ii(d,"data:")===0&&xr[i]||br&&!j(Pi,Ye(d,yr,""))?!0:!d:Vr(i)&&lt(se.tagNameCheck,i)&&lt(se.attributeNameCheck,l,i)||l==="is"&&se.allowCustomizedBuiltInElements&&lt(se.tagNameCheck,d)},Xi=E({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Vr=function(i){return!Xi[Xe(i)]&&j(Mi,i)},Ki=function(i,l,d,m){if(G&&typeof te=="object"&&typeof te.getAttributeType=="function"&&!d)switch(te.getAttributeType(i,l)){case"TrustedHTML":return xe(m);case"TrustedScriptURL":return Ei(m)}return m},Zi=function(i,l,d,m){try{return d?i.setAttributeNS(d,l,m):i.setAttribute(l,m),at(i)?(he(i),!1):!0}catch{return we(l,i),!1}},Wr=function(i){ae(C.beforeSanitizeAttributes,i,null);const l=i.attributes;if(!l||at(i))return;D=zr(C.uponSanitizeAttribute,D,Ct,Qe);const d={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:D,forceKeepAttr:void 0};let m=l.length;const g=P(i.nodeName);for(;m--;){const _=l[m],A=_.name,k=_.namespaceURI,Y=_.value,q=P(A),Bt=Y;let V=A==="value"?Bt:In(Bt),Gr=!1;if(d.attrName=q,d.attrValue=V,d.keepAttr=!0,d.forceKeepAttr=void 0,ae(C.uponSanitizeAttribute,i,d),V=d.attrValue,Er&&(q==="id"||q==="name")&&ii(V,Rr)!==0&&(we(A,i,_),V=Rr+V,Gr=!0),ve&&j(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,V)){we(A,i,_);continue}if(q==="attributename"&&ri(V,"href")){we(A,i,_);continue}if(!d.forceKeepAttr){if(!d.keepAttr){we(A,i,_);continue}if(!Tr&&j(Jn,V)){we(A,i,_);continue}if(pe&&(V=ot(V)),!jr(g,q,V)){we(A,i,_);continue}V=Ki(g,q,k,V),V!==Bt&&Zi(i,A,k,V)&&Gr&&ti(e.removed)}}ae(C.afterSanitizeAttributes,i,null)},ct=function(i){let l=null;const d=Ur(i);for(ae(C.beforeSanitizeShadowDOM,i,null);l=d.nextNode();)if(ae(C.uponSanitizeShadowNode,l,null),Hr(l,i),Wr(l),Ie(l.content)&&ct(l.content),Be(l)===K.element){const m=hr(l);Ie(m)&&(zt(m),ct(m))}ae(C.afterSanitizeShadowDOM,i,null)},zt=function(i){const l=[{node:i,shadow:null}];for(;l.length>0;){const d=l.pop();if(d.shadow){ct(d.shadow);continue}const m=d.node,_=Be(m)===K.element,A=Ee(m);if(A)for(let k=A.length-1;k>=0;--k)l.push({node:A[k],shadow:null});if(_){const k=Ae?Ae(m):null;if(typeof k=="string"&&P(k)==="template"){const Y=m.content;Ie(Y)&&l.push({node:Y,shadow:null})}}if(_){const k=hr(m);Ie(k)&&l.push({node:null,shadow:k},{node:k,shadow:null})}}};return e.sanitize=function(f){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},l=null,d=null,m=null,g=null;if(Pt=!f,Pt&&(f="<!-->"),typeof f!="string"&&!We(f)&&(f=Fn(f),typeof f!="string"))throw be("dirty is not a string, aborting");if(!e.isSupported)return f;Dt?(L=Je,D=Qe):Ft(i),(C.uponSanitizeElement.length>0||C.uponSanitizeAttribute.length>0)&&(L=Z(L)),C.uponSanitizeAttribute.length>0&&(D=Z(D)),e.removed=[];const _=It&&typeof f!="string"&&We(f);if(_){Gi(f);const Y=Et(f);if(typeof Y=="string"){const q=P(Y);if(!L[q]||je[q])throw nt(f),be("root node is forbidden and cannot be sanitized in-place")}if(at(f))throw nt(f),be("root node is clobbered and cannot be sanitized in-place");try{zt(f)}catch(q){throw nt(f),q}}else if(We(f))l=Fr("<!---->"),d=l.ownerDocument.importNode(f,!0),d.nodeType===K.element&&d.nodeName==="BODY"||d.nodeName==="HTML"?l=d:l.appendChild(d),zt(l);else{if(!Ce&&!pe&&!_e&&f.indexOf("<")===-1)return G&&tt?xe(f):f;if(l=Fr(f),!l)return Ce?null:tt?ye:""}l&&Ot&&he(l.firstChild);const A=_?f:l;try{const Y=Ur(A);for(;m=Y.nextNode();)Hr(m,A),Wr(m),Ie(m.content)&&ct(m.content)}catch(Y){throw _&&(nt(f),Te(e.removed,q=>{q.element&&st(q.element)})),Y}if(_)return Te(e.removed,Y=>{Y.element&&st(Y.element)}),pe&&Ut(f),f;if(Ce){if(pe&&Ut(l),et)for(g=Ai.call(l.ownerDocument);l.firstChild;)g.appendChild(l.firstChild);else g=l;return(D.shadowroot||D.shadowrootmode)&&(g=Ci.call(a,g,!0)),g}let k=_e?l.outerHTML:l.innerHTML;return _e&&L["!doctype"]&&l.ownerDocument&&l.ownerDocument.doctype&&l.ownerDocument.doctype.name&&j(Xn,l.ownerDocument.doctype.name)&&(k="<!DOCTYPE "+l.ownerDocument.doctype.name+`>
`+k),pe&&(k=ot(k)),G&&tt?xe(k):k},e.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ft(f),Dt=!0,Je=L,Qe=D},e.clearConfig=function(){ke=null,Dt=!1,Je=null,Qe=null,G=Rt,ye=""},e.isValidAttribute=function(f,i,l){ke||Ft({});const d=P(f),m=P(i);return jr(d,m,l)},e.addHook=function(f,i){typeof i=="function"&&X(C,f)&&Ge(C[f],i)},e.removeHook=function(f,i){if(X(C,f)){if(i!==void 0){const l=On(C[f],i);return l===-1?void 0:kn(C[f],l,1)[0]}return ti(C[f])}},e.removeHooks=function(f){X(C,f)&&(C[f]=[])},e.removeAllHooks=function(){C=hi()},e}var ht=Ti();const is=["a"];function ns(r){ht.addHook("afterSanitizeAttributes",ss);try{return ht.sanitize(r,{ALLOWED_TAGS:is})}finally{ht.removeHook("afterSanitizeAttributes")}}function ss(r){r.nodeName.toLowerCase()==="a"&&(r.setAttribute("rel","ugc nofollow"),r.setAttribute("target","_blank"))}function os(r,e=100,t=!0){if(r.length<e)return r;let a=e;if(t){const c=r.indexOf(" ",e),p=c-e<=20;if(p&&c===r.length-1)return r;c!==-1&&p&&(a=c)}return as(r,a,e)}function as(r,e,t){let a=r.slice(0,e);const c=a.match(/<a/gi);if(c){const p=a.match(/<\/a/gi);if(!p||p.length<c.length){const h=r.indexOf("</a>",e),y=h-t<=20;if(y&&r.length===h+4)return r;if(h!==-1&&y)a=r.slice(0,h+4);else{const v=a.lastIndexOf("<a");a=r.slice(0,v)}}}return a.concat("...")}const ls=/(http(s)?)?(:\/\/)?([a-zA-Z][-a-z0-9]*(\.[-a-z0-9]+)+(\/[^\s?#<>"']*)*(\?[^\s#<>"']*)?(#[^\s<>"']*)?)/;function cs(r){return r.replace(/href="([^"]+)"/,(a,c)=>`href="${c.replace(".","__DOT__")}"`).replace(ls,a=>`<a href="${(a.match(/^(https|http)/)?a:`https://${a}`).replace(/"/g,"&quot;")}" rel="ugc nofollow" target="_blank">${a}</a>`).replace("__DOT__",".")}function us(r){return r.trim().replace(/[ \t]+/g," ").replace(/(?:\r?\n)+/g,"<br />").replace(/(<br[^>]*>(<\/br>)?)+/g,"<br />")}const ds="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3cpath%20d='M5%207.5H19L18%2021H6L5%207.5Z'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%209.5L15%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12%209.5V19'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.5%209.5L9%2019'%20stroke='%23000000'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%205H19C20.1046%205%2021%205.89543%2021%207V7.5H3V7C3%205.89543%203.89543%205%205%205H8M16%205L15%203H9L8%205M16%205H8'%20stroke='%23000000'%20stroke-linejoin='round'/%3e%3c/svg%3e";var ps=Object.defineProperty,hs=Object.getOwnPropertyDescriptor,ne=(r,e,t,a)=>{for(var c=a>1?void 0:a?hs(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ps(e,t,c),c};let ee=class extends wt{constructor(){super(...arguments),this.maxSubjectLength=100,this.maxBodyLength=150,this.baseHost="https://archive.org",this.canDelete=!1,this.bypassTruncation=!1,this.showTruncatedContent=!1}render(){return this.review?b`
          <article class="review" id=${this.generateDomId()}>
            ${this.canDelete?b`
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
                `:z}
            <div class="top-line">
              <b>${S("Reviewer:")}</b> ${this.reviewerTemplate} -
              ${this.starsTemplate}${this.createDateTemplate}
            </div>
            <div class="subject">
              <b>${S("Subject: ")}</b>${this.subjectTemplate}
            </div>
            <div class="body">
              ${this.deleteOutcome?b`<i>${this.deleteOutcomeMessage}</i>`:this.bodyTemplate}
            </div>
            ${this.truncationButtonsTemplate}
          </article>
        `:b`
          <div class="error">
            ${S("This review cannot be displayed at this time.")}
          </div>
        `}get subjectTemplate(){const r=this.review?.reviewtitle;return this.truncateContent(r??"",this.maxSubjectLength)}get bodyTemplate(){const r=this.review?.reviewbody;if(!r)return z;const e=ns(r),t=this.truncateContent(e,this.maxBodyLength);return b`${fi(this.prepReview(t))}`}get truncationButtonsTemplate(){return this.bypassTruncation?z:(this.review?.reviewtitle?.length??0)<=this.maxSubjectLength&&(this.review?.reviewbody?.length??0)<=this.maxBodyLength?z:this.showTruncatedContent?this.lessButtonTemplate:this.moreButtonTemplate}get moreButtonTemplate(){return b`
      <button
        class="simple-link more-btn"
        @click=${()=>this.showTruncatedContent=!0}
      >
        ${S("More...")}
      </button>
    `}get lessButtonTemplate(){return b`<button
      class="simple-link less-btn"
      @click=${()=>this.showTruncatedContent=!1}
    >
      ${S("...Less")}
    </button>`}get reviewerTemplate(){return this.review?this.review.reviewer_itemname?b`
            <a
              href="${this.baseHost}/details/${this.review.reviewer_itemname}"
              class="reviewer-link simple-link"
              data-event-click-tracking="ItemReviews|ReviewerLink"
            >
              ${Jr(this.review.reviewer)}
            </a>
          `:b`${Jr(this.review.reviewer)}`:z}get starsTemplate(){return!this.review||!this.review.stars?z:b`
      <div
        class="review-stars"
        title=${S($e`${this.review.stars} out of 5 stars`)}
      >
        ${new Array(Number(this.review.stars)).fill(null).map(()=>b`<div class="review-star">
              <img
                class="star-basic"
                src=${Tn}
                alt=""
                aria-hidden="true"
              />
            </div>`)}
      </div>
      -
    `}get createDateTemplate(){if(!this.review?.createdate||!this.review?.reviewdate)return z;const r=new Date(this.review.reviewdate),e=new Date(this.review.createdate),t=e.toLocaleString("en-us",{month:"long",day:"numeric",year:"numeric"});return r.getTime()!==e.getTime()?S($e`${t} (edited)`):t}generateDomId(){return this.review?.createdate?`review-${Date.parse(this.review.createdate.toString())}`:""}truncateContent(r,e){return this.showTruncatedContent||this.bypassTruncation?r:os(r,e)}prepReview(r){return us(cs(r))}async deleteReview(){if(!this.review?.reviewer||!this.identifier||!confirm(S("Are you sure you want to delete this review?")))return;if(!this.reviewService){this.deleteOutcome={status:"failed"};return}const r=await this.reviewService.deleteReview({identifier:this.identifier,reviewer:this.review.reviewer,reviewerItemname:this.review.reviewer_itemname});this.deleteOutcome=r.success?{status:"queued"}:{status:"failed",error:r.error}}get deleteOutcomeMessage(){return this.deleteOutcome?.status==="queued"?S("This review has been queued for deletion."):this.deleteOutcome?.error??S("Sorry, we were unable to delete this review.")}static get styles(){return bt`
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
    `}};ne([T({type:Object})],ee.prototype,"review",2);ne([T({type:String})],ee.prototype,"identifier",2);ne([T({type:Number})],ee.prototype,"maxSubjectLength",2);ne([T({type:Number})],ee.prototype,"maxBodyLength",2);ne([T({type:String})],ee.prototype,"baseHost",2);ne([T({type:Object})],ee.prototype,"reviewService",2);ne([T({type:Boolean})],ee.prototype,"canDelete",2);ne([T({type:Boolean})],ee.prototype,"bypassTruncation",2);ne([H()],ee.prototype,"showTruncatedContent",2);ne([H()],ee.prototype,"deleteOutcome",2);ee=ne([_t("ia-review"),lr()],ee);const fs="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23c2820a'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e",ms="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='m81.0388846%20100-30.9636029-22.5595033-30.7410319%2022.5595033%2010.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042%2012.3690754%2037.3922042h37.5556429l-29.7034563%2025.2155916z'%20fill='%23ffffff'%20stroke='%23c2820a'%20stroke-width='3px'%20/%3e%3c/svg%3e";var gs=Object.defineProperty,ys=Object.getOwnPropertyDescriptor,F=(r,e,t,a)=>{for(var c=a>1?void 0:a?ys(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&gs(e,t,c),c};let M=class extends wt{constructor(){super(...arguments),this.bypassRecaptcha=!1,this.currentStars=0,this.currentSubjectLength=0,this.currentBodyLength=0,this.recaptchaUnavailable=!1,this.formCanSubmit=!1,this.submissionInProgress=!1}render(){return b`<form id="review-form" @submit=${this.handleSubmit}>
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
            ${fi(this.sanitizeErrorMsg(r))}
          </div>
        `:z}get unrecoverableErrorMessage(){return this.unrecoverableError?this.unrecoverableError:this.recaptchaUnavailable?this.recaptchaErrorMessage:void 0}get recoverableErrorMessage(){if(this.recoverableError)return this.recoverableError;switch(this.formError){case"recaptcha":return this.recaptchaErrorMessage;case"generic":return this.genericErrorMessage;default:return}}get recaptchaErrorMessage(){return S("Could not validate review. Please try again later.")}get genericErrorMessage(){return S("There's been a temporary error. Please wait a moment and try again.")}get recaptchaMessageTemplate(){return this.bypassRecaptcha?z:b`
      <span class="recaptcha-disclaimer"
        >${S(b`This site is protected by reCAPTCHA and the Google
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
    `}get subjectInputTemplate(){return b`
      <span id="subject-input" class="input-box ${this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength?"error":""}"
      ><div class="form-heading">
        <label for="field_reviewtitle">${S("Subject")}</label>
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
              ${S($e`Subject may only have ${this.maxSubjectLength} characters`)}
            </div>
          `:z}</div></span>
    `}get bodyInputTemplate(){return b`
      <span
        id="body-input"
        class="input-box ${this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength?"error":""}"
        ><div class="form-heading">
          <label for="field_reviewbody">${S("Review")}</label>
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
                ${S($e`Review may only have ${this.maxBodyLength} characters`)}
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
    </div>`}renderStar(r){const e=r===this.currentStars,t=r===1?S("Rate 1 star"):S($e`Rate ${r} stars`);return b`
      <button
        class="star star-${r}"
        title=${e?S("Clear rating"):t}
        @click=${a=>this.handleStarClicked(a,r)}
      >
        ${r<=this.currentStars?b`<img
              class="star-selected"
              src=${fs}
              alt=""
              aria-hidden="true"
            />`:b`<img
              class="star-unselected"
              src=${ms}
              alt=""
              aria-hidden="true"
            />`}
      </button>
    `}async setupRecaptcha(){try{this.recaptchaWidget=await this.recaptchaManager?.getRecaptchaWidget()}catch{this.recaptchaUnavailable=!0}}sanitizeErrorMsg(r){return ht.sanitize(r,{ALLOWED_TAGS:["a","b","br"]})}async handleSubmit(r){if(r.preventDefault(),!(!this.formCanSubmit||this.submissionInProgress)){if(this.submissionInProgress=!0,this.recoverableError="",this.formError=void 0,!this.reviewForm.reportValidity())return this.stopSubmission();if(!this.reviewService||!this.identifier)return this.formError="generic",this.stopSubmission();try{let e;if(!this.bypassRecaptcha&&(e=await this.getRecaptchaToken(),!e))return this.handleRecaptchaError();const t=await this.reviewService.submitReview({identifier:this.identifier,title:this.reviewForm.field_reviewtitle.value,body:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,recaptchaToken:e});if(t?.success===!0){this.submissionInProgress=!1;const a=this.generateSubmittedReview(),c=new CustomEvent("reviewUpdated",{detail:a});this.dispatchEvent(c)}else t.error?this.recoverableError=t.error:this.formError="generic",this.stopSubmission()}catch(e){console.error(e),this.formError="generic",this.stopSubmission()}}}generateSubmittedReview(){const r=new Date().toDateString();return new Q({reviewtitle:this.reviewForm.field_reviewtitle.value,reviewbody:this.reviewForm.field_reviewbody.value,stars:this.reviewForm.field_stars.value,reviewdate:r,reviewer:this.oldReview?.reviewer??this.submitterScreenname??S("Anonymous"),reviewer_itemname:this.oldReview?.reviewer_itemname??this.submitterItemname,createdate:this.dateToString(this.oldReview?.createdate)??r})}dateToString(r){return r instanceof Date?r.toDateString():r}async getRecaptchaToken(){if(!this.recaptchaWidget){this.handleRecaptchaError();return}try{return await this.recaptchaWidget.execute()}catch{this.handleRecaptchaError();return}}handleRecaptchaError(){this.formError="recaptcha",this.stopSubmission()}stopSubmission(){this.submissionInProgress&&(this.submissionInProgress=!1)}cancelReviewEdit(){const r=new CustomEvent("reviewEditCanceled");this.dispatchEvent(r)}handleStarClicked(r,e){r.preventDefault(),this.setStars(e)}handleClearBtnClicked(r){r.preventDefault(),this.currentStars=0}setStars(r){this.currentStars=r===this.currentStars?0:r}handleSubjectChanged(r){const e=r.target;this.currentSubjectLength=e.value.length}handleBodyChanged(r){const e=r.target;this.currentBodyLength=e.value.length}checkSubmissionAllowed(){return!(this.unrecoverableErrorMessage||!this.currentBodyLength||!this.currentSubjectLength||this.maxSubjectLength&&this.currentSubjectLength>this.maxSubjectLength||this.maxBodyLength&&this.currentBodyLength>this.maxBodyLength)}static get styles(){return[bt`
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
      `]}};F([T({type:String})],M.prototype,"identifier",2);F([T({type:String})],M.prototype,"submitterScreenname",2);F([T({type:String})],M.prototype,"submitterItemname",2);F([T({type:Object})],M.prototype,"oldReview",2);F([T({type:String})],M.prototype,"unrecoverableError",2);F([T({type:Number})],M.prototype,"maxSubjectLength",2);F([T({type:Number})],M.prototype,"maxBodyLength",2);F([T({type:Object})],M.prototype,"reviewService",2);F([T({type:Object})],M.prototype,"recaptchaManager",2);F([T({type:Boolean})],M.prototype,"bypassRecaptcha",2);F([H()],M.prototype,"currentStars",2);F([H()],M.prototype,"currentSubjectLength",2);F([H()],M.prototype,"currentBodyLength",2);F([H()],M.prototype,"recoverableError",2);F([H()],M.prototype,"formError",2);F([H()],M.prototype,"recaptchaUnavailable",2);F([H()],M.prototype,"formCanSubmit",2);F([H()],M.prototype,"submissionInProgress",2);F([ar("#review-form")],M.prototype,"reviewForm",2);M=F([_t("ia-review-form"),lr()],M);var vs=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,x=(r,e,t,a)=>{for(var c=a>1?void 0:a?_s(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&vs(e,t,c),c};let R=class extends wt{constructor(){super(...arguments),this.reviews=[],this.reviewsDisabled=!1,this.reviewsFrozen=!1,this.canDelete=!1,this.displayReviewsByDefault=!1,this.maxInitialReviews=5,this.baseHost="https://archive.org",this.bypassRecaptcha=!1,this.reviewAddEditRequested=!1,this.displayReviewForm=!1,this.showAllReviews=!1,this.filteredReviews=[],this.reviewsCount=0,this.recaptchaActivated=!1}render(){return this.reviewsDisabled?this.reviewsDisabledTemplate:this.reviewsCount===0&&!this.displayReviewForm?this.noReviewsMsgTemplate:b`
      <div class="reviews-list">
        ${this.reviewsFrozen?b`<div class="message">
              ${S("Reviews can no longer be added to this item.")}
            </div>`:z}
        ${this.editableCurrentReviewTemplate}
        ${this.visibleReviews.map((r,e)=>this.renderReview(r,e===this.firstRevealedIndex))}
        ${this.showMoreButtonTemplate}
      </div>
    `}willUpdate(r){(!this.activeReviewService||r.has("reviewService")||r.has("baseHost"))&&(this.activeReviewService=this.reviewService??new vi({baseHost:this.baseHost})),(r.has("reviews")||r.has("submitterItemname"))&&(this.reviewsCount=this.reviews.length,this.sortFilterReviews()),r.has("displayReviewForm")&&this.displayReviewForm===!0&&!this.bypassRecaptcha&&!this.recaptchaActivated&&(this.recaptchaActivated=!0)}get visibleReviews(){return this.showAllReviews||this.displayReviewsByDefault?this.filteredReviews:this.filteredReviews.slice(0,this.maxInitialReviews)}get firstRevealedIndex(){return this.showAllReviews?this.maxInitialReviews:void 0}get reviewsDisabledTemplate(){return b`<div class="message">
      ${S("Reviews have been disabled for this item.")}
    </div>`}get noReviewsMsgTemplate(){return this.reviewsFrozen?b`
        <div class="message">
          ${S("Reviews cannot be added to this item.")}
        </div>
      `:b`
      <div class="message">
        ${S("There are no reviews yet.")}
        ${S(b`
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
    `}get showMoreButtonTemplate(){const r=this.filteredReviews.length-this.visibleReviews.length;return r<=0?z:b`
      <ia-button
        mode="link"
        class="show-more-btn"
        @click=${this.showMoreReviews}
      >
        ${r===1?S("Show 1 more review"):S($e`Show ${r} more reviews`)}
      </ia-button>
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
    </div>`}sortFilterReviews(){let r;const e=[];this.reviews.forEach(t=>{t.reviewer_itemname!==this.submitterItemname?e.push(t):r||(r=t)}),this.currentReview=r,this.filteredReviews=this.sortReviews(e)}sortReviews(r){return[...r].sort((t,a)=>t.createdate&&a.createdate?new Date(a.createdate).getTime()-new Date(t.createdate).getTime():0)}renderReview(r,e=!1){return r?b`<ia-review
      tabindex=${Ji(e?"-1":void 0)}
      .review=${r}
      .identifier=${this.identifier}
      .baseHost=${this.baseHost}
      .reviewService=${this.activeReviewService}
      ?canDelete=${this.canDelete}
      ?bypassTruncation=${this.displayReviewsByDefault}
    ></ia-review>`:z}async showMoreReviews(){this.showAllReviews=!0,await this.updateComplete,this.firstRevealedReview?.focus()}addEditReview(){this.bypassRecaptcha||(this.recaptchaActivated=!0),this.displayReviewForm=!0}handleReviewUpdate(r){!this.currentReview&&r.detail&&(this.dispatchEvent(new CustomEvent("newReviewAdded")),this.reviewsCount+=1),this.currentReview=r.detail,this.displayReviewForm=!1}handleEditCanceled(){this.displayReviewForm=!1}static get styles(){return[bt`
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
      `]}};x([T({type:String})],R.prototype,"identifier",2);x([T({type:Array})],R.prototype,"reviews",2);x([T({type:Boolean})],R.prototype,"reviewsDisabled",2);x([T({type:Boolean})],R.prototype,"reviewsFrozen",2);x([T({type:Boolean})],R.prototype,"canDelete",2);x([T({type:Boolean})],R.prototype,"displayReviewsByDefault",2);x([T({type:Number})],R.prototype,"maxInitialReviews",2);x([T({type:Number})],R.prototype,"maxSubjectLength",2);x([T({type:Number})],R.prototype,"maxBodyLength",2);x([T({type:String})],R.prototype,"baseHost",2);x([T({type:String})],R.prototype,"submitterScreenname",2);x([T({type:String})],R.prototype,"submitterItemname",2);x([T({type:Object})],R.prototype,"recaptchaManager",2);x([T({type:Boolean})],R.prototype,"bypassRecaptcha",2);x([T({type:String})],R.prototype,"reviewSubmissionError",2);x([T({type:Boolean})],R.prototype,"reviewAddEditRequested",2);x([T({type:Object})],R.prototype,"reviewService",2);x([H()],R.prototype,"activeReviewService",2);x([H()],R.prototype,"displayReviewForm",2);x([H()],R.prototype,"showAllReviews",2);x([H()],R.prototype,"filteredReviews",2);x([H()],R.prototype,"currentReview",2);x([H()],R.prototype,"reviewsCount",2);x([H()],R.prototype,"recaptchaActivated",2);x([ar(".reviews-list > ia-review[tabindex]")],R.prototype,"firstRevealedReview",2);R=x([_t("ia-reviews"),lr()],R);var ws=Object.defineProperty,bs=Object.getOwnPropertyDescriptor,dr=(r,e,t,a)=>{for(var c=a>1?void 0:a?bs(e,t):e,p=r.length-1,h;p>=0;p--)(h=r[p])&&(c=(a?h(e,t,c):h(c))||c);return a&&c&&ws(e,t,c),c};const Ts=[new Q({stars:5,reviewtitle:"Better than I expected",reviewbody:"Came for one track and stayed for the whole set. The recording is clean all the way through, which is more than you can say for most of these. Long enough to run past the truncation limit, so the More and Less controls have something to do.",reviewer:"Ada Fielding",reviewer_itemname:"@ada-fielding",reviewdate:"2026-08-14",createdate:"2026-08-14"}),new Q({stars:3,reviewtitle:"Good, with caveats",reviewbody:"The first half is excellent. The second half has a hum running under it that I could not unhear once I noticed it. Still worth your time.",reviewer:"Bo Ellery",reviewer_itemname:"@bo-ellery",reviewdate:"2026-07-02",createdate:"2026-07-02"}),new Q({stars:1,reviewtitle:"Wrong item",reviewbody:"This is not what the description says it is.",reviewer:"Cal Nwosu",reviewer_itemname:"@cal-nwosu",reviewdate:"2026-06-21",createdate:"2026-06-21"}),new Q({stars:4,reviewtitle:"Solid transfer",reviewbody:"Clean audio, good notes. Would listen again.",reviewer:"Dee Okafor",reviewer_itemname:"@dee-okafor",reviewdate:"2026-05-30",createdate:"2026-05-30"}),new Q({stars:5,reviewtitle:"A favourite",reviewbody:"I come back to this one every year.",reviewer:"Eli Marsh",reviewer_itemname:"@eli-marsh",reviewdate:"2026-04-11",createdate:"2026-04-11"}),new Q({stars:2,reviewtitle:"Not for me",reviewbody:"Well made, but the style never clicked for me.",reviewer:"Fen Albright",reviewer_itemname:"@fen-albright",reviewdate:"2026-03-08",createdate:"2026-03-08"}),new Q({stars:4,reviewtitle:"Worth it for the second half",reviewbody:"Slow start, but it earns the ending.",reviewer:"Gus Tanaka",reviewer_itemname:"@gus-tanaka",reviewdate:"2026-02-19",createdate:"2026-02-19"})],Ss=[{label:"Text colour",cssVariable:"--ia-text-color",defaultValue:"#2c2c2c",inputType:"color"}],Es=[{label:'Max reviews before "Show more"',propertyName:"maxInitialReviews",defaultValue:5,inputType:"number"},{label:"Show every review, untruncated",propertyName:"displayReviewsByDefault",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews disabled",propertyName:"reviewsDisabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Reviews frozen",propertyName:"reviewsFrozen",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Can delete",propertyName:"canDelete",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Submitter screenname",propertyName:"submitterScreenname",defaultValue:"Demo User"},{label:"Max subject length",propertyName:"maxSubjectLength",defaultValue:64,inputType:"number"},{label:"Max body length",propertyName:"maxBodyLength",defaultValue:1e3,inputType:"number"}],Rs={async fetch(){return new Response(JSON.stringify({success:!0}),{status:200})},async fetchApiResponse(){return{success:!0}},async fetchApiPathResponse(){return{success:!0}},async fetchIAApiResponse(){return{success:!0}}},As=new vi({fetchHandler:Rs}),xs=6;let vt=class extends wt{constructor(){super(...arguments),this.log=[]}render(){return b`
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
    `}openReviewForm(){this.reviews&&(this.reviews.displayReviewForm=!0)}record(r){const{detail:e}=r,t=e?` ${JSON.stringify(e)}`:"";this.log=[`${r.type}${t}`,...this.log].slice(0,xs)}static get styles(){return bt`
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
    `}};dr([H()],vt.prototype,"log",2);dr([ar("ia-reviews")],vt.prototype,"reviews",2);vt=dr([_t("ia-reviews-story")],vt);export{vt as IAReviewsStory};
