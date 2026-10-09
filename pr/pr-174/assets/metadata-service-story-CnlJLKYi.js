import{i as b,A as v,b as d,a as M,r as p,c as S}from"./index-mhNKKp3h.js";import"./service-template-CTpSbXfp.js";import{F as k,h as E,R as _}from"./review-C4txggvr.js";import"./string-B_v7wtUf.js";import"./theme-styles-CPPpxMUU.js";const $=`import type { Result } from '../result-type/result-type';
import { DefaultMetadataBackend } from './backend/default-metadata-backend';
import { MetadataBackendInterface } from './backend/metadata-backend-interface';
import {
  MetadataServiceError,
  MetadataServiceErrorType,
} from './metadata-service-error';
import type { MetadataServiceInterface } from './metadata-service-interface';
import { MetadataResponse } from './responses/metadata-response';

/**
 * The Metadata Service is responsible for taking the raw response provided by
 * the backend and modeling it as a \`MetadataResponse\` object.
 */
export class MetadataService implements MetadataServiceInterface {
  public static default: MetadataServiceInterface = new MetadataService(
    new DefaultMetadataBackend(),
  );

  private backend: MetadataBackendInterface;

  constructor(backend: MetadataBackendInterface) {
    this.backend = backend;
  }

  /** @inheritdoc */
  async fetchMetadata(
    identifier: string,
  ): Promise<Result<MetadataResponse, MetadataServiceError>> {
    const rawResponse = await this.backend.fetchMetadata(identifier);
    if (rawResponse.error) {
      return rawResponse;
    }

    if (rawResponse.success?.metadata === undefined) {
      return {
        error: new MetadataServiceError(MetadataServiceErrorType.itemNotFound),
      };
    }

    const modeledResponse = new MetadataResponse(rawResponse.success);
    return { success: modeledResponse };
  }

  /** @inheritdoc */
  async fetchMetadataValue<T>(
    identifier: string,
    keypath: string,
  ): Promise<Result<T, MetadataServiceError>> {
    const result = await this.backend.fetchMetadata(identifier, keypath);
    if (result.error) {
      return result;
    }

    if (result.success?.result === undefined) {
      return {
        error: new MetadataServiceError(MetadataServiceErrorType.itemNotFound),
      };
    }

    return { success: result.success.result };
  }
}
`,R=`import type { Result } from '../result-type/result-type';
import type { MetadataServiceError } from './metadata-service-error';
import type { MetadataResponse } from './responses/metadata-response';

export interface MetadataServiceInterface {
  /**
   * Fetch metadata for a given identifier
   *
   * @param {string} identifier
   * @returns {Promise<Result<MetadataResponse, MetadataServiceError>>}
   */
  fetchMetadata(
    identifier: string,
  ): Promise<Result<MetadataResponse, MetadataServiceError>>;

  /**
   * Fetch the metadata value for a given identifier and keypath
   *
   * The response from this request can take any form, object, array, string, etc.
   * depending on the query. You can provide return typing in the response by
   * specifying the type. Note, there is no automatic type conversion since it can be anything.
   *
   * For example:
   *
   * \`\`\`ts
   * const collection = await searchService.fetchMetadataValue<string>('goody', 'metadata/collection/0');
   * console.debug('collection:', collection); => 'Goody Collection'
   *
   * const files_count = await searchService.fetchMetadataValue<number>('goody', 'files_count');
   * console.debug('files_count:', files_count); => 12
   * \`\`\`
   *
   * Keypath examples:
   *
   * /metadata/:identifier/metadata // returns the entire metadata object
   * /metadata/:identifier/server // returns the server for the given identifier
   * /metadata/:identifier/files_count
   * /metadata/:identifier/files?start=1&count=2 // query for files
   * /metadata/:identifier/metadata/collection // all collections
   * /metadata/:identifier/metadata/collection/0 // first collection
   * /metadata/:identifier/metadata/title
   * /metadata/:identifier/files/0/name // first file name
   *
   * @param identifier
   * @param keypath
   */
  fetchMetadataValue<T>(
    identifier: string,
    keypath: string,
  ): Promise<Result<T, MetadataServiceError>>;
}
`,x=`export const MetadataServiceErrorType = {
  networkError: 'MetadataService.NetworkError',
  itemNotFound: 'MetadataService.ItemNotFound',
  decodingError: 'MetadataService.DecodingError',
  searchEngineError: 'MetadataService.SearchEngineError',
} as const;

export type MetadataServiceErrorType =
  (typeof MetadataServiceErrorType)[keyof typeof MetadataServiceErrorType];

export class MetadataServiceError extends Error {
  type: MetadataServiceErrorType;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  details?: any;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(type: MetadataServiceErrorType, message?: string, details?: any) {
    super(message);
    this.name = type;
    this.type = type;
    this.details = details;
  }
}
`,u={networkError:"MetadataService.NetworkError",itemNotFound:"MetadataService.ItemNotFound",decodingError:"MetadataService.DecodingError",searchEngineError:"MetadataService.SearchEngineError"};class f extends Error{constructor(e,t,a){super(t),this.name=e,this.type=e,this.details=a}}class y{constructor(e){if(this.baseUrl=e?.baseUrl??"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,e?.scope!==void 0)this.requestScope=e.scope;else{const a=new URL(window.location.href).searchParams.get("scope");a&&(this.requestScope=a)}}async fetchMetadata(e,t){const a=t?`/${t}`:"",n=`https://${this.baseUrl}/metadata/${e}${a}`;return this.fetchUrl(n)}async fetchUrl(e,t){const a=new URL(e);this.requestScope&&a.searchParams.set("scope",this.requestScope);let n;try{const r=t?.requestOptions??{credentials:this.includeCredentials?"include":"same-origin"};n=await fetch(a.href,r)}catch(r){const i=r instanceof Error?r.message:typeof r=="string"?r:"Unknown error";return this.getErrorResult(u.networkError,i)}try{const r=await n.json(),i=r.error;if(i){const c=r.forensics;return this.getErrorResult(u.searchEngineError,i,c)}else return{success:r}}catch(r){const i=r instanceof Error?r.message:typeof r=="string"?r:"Unknown error";return this.getErrorResult(u.decodingError,i)}}getErrorResult(e,t,a){return{error:new f(e,t,a)}}}class T{constructor(e){this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=e.files?.map(t=>new k(t)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new E(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=e.reviews?.map(t=>new _(t)),this.alternate_locations=e.alternate_locations,this.clips=e.clips,this.plays=e.plays,this.simplelists=e.simplelists,this.solo=e.solo}}const m=class m{constructor(e){this.backend=e}async fetchMetadata(e){const t=await this.backend.fetchMetadata(e);return t.error?t:t.success?.metadata===void 0?{error:new f(u.itemNotFound)}:{success:new T(t.success)}}async fetchMetadataValue(e,t){const a=await this.backend.fetchMetadata(e,t);return a.error?a:a.success?.result===void 0?{error:new f(u.itemNotFound)}:{success:a.success.result}}};m.default=new m(new y);let h=m;class N{generateMockMetadataResponse(e){return{created:1586477049,d1:"ia600201.us.archive.org",d2:"ia800201.us.archive.org",dir:"/27/items/rss-383924main_TWAN_09_04_09",files:[{name:"foo.jpg",source:"derivative",format:"Thumbnail",original:"foo.mp4",md5:"48067b43a547d3e90cb433a04ba84d5d",mtime:"1256675427",size:"1135",crc32:"40870038",sha1:"6445c2a6f51c8314c1872ec1f7daf33c5cfabd06"},{name:"bar.jpg",source:"derivative",format:"Thumbnail",original:"bar.mp4",md5:"5bf69912d7b796fe309cde32e61230bc",mtime:"1256675429",size:"6329",crc32:"ba5f361a",sha1:"cddab0e2daab29978e5efdeff735240a44aa7c80"}],files_count:2,item_last_updated:1463797130,item_size:99872691,metadata:{feed_id:"/0/rss_feeds/NASACast_Video/nasacast_video:sts128_landing/NASAcast_vodcast.rss",mediatype:"movies",title:"NASA TV's This Week @NASA, September 4",description:"NASA TV's This Week @NASA, September 4",creator:"NASA",source:"http://www.nasa.gov/multimedia/podcasting/twan_09_04_09.html",date:"9/4/2009",year:"2009",rights:"Public Domain",language:"en-us",updater:"BonnieReal",updatedate:"2009-10-27 20:23:01",identifier:e,uploader:"bonnie@archive.org",addeddate:"2009-10-27 20:25:55",publicdate:"2009-10-27 20:41:27",collection:["nasa","nasacastvideo"],backup_location:"ia903604_7"},server:"ia800201.us.archive.org",uniq:162444403,workable_servers:["ia800201.us.archive.org","ia600201.us.archive.org"],alternate_locations:{servers:[{server:"ia800201.us.archive.org",dir:"/27/items/foo"},{server:"ia600201.us.archive.org",dir:"/27/items/foo"}],workable:[{server:"ia800201.us.archive.org",dir:"/27/items/foo"}]},clips:{"60|120":[1,2,3]},plays:{},simplelists:{},solo:!1}}}var A=Object.defineProperty,q=Object.getOwnPropertyDescriptor,l=(s,e,t,a)=>{for(var n=a>1?void 0:a?q(e,t):e,r=s.length-1,i;r>=0;r--)(i=s[r])&&(n=(a?i(e,t,n):i(n))||n);return a&&n&&A(e,t,n),n};const g="nasa",F=`import { MetadataService } from '@internetarchive/elements/services/metadata-service/metadata-service';
import { DefaultMetadataBackend } from '@internetarchive/elements/services/metadata-service/backend/default-metadata-backend';

const service = new MetadataService(new DefaultMetadataBackend());

const { success: item } = await service.fetchMetadata('nasa');
item?.metadata.title?.value; // string

const { success: title } = await service.fetchMetadataValue<string>('nasa', 'metadata/title');`,U=s=>s.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),I=[R,x,$].map(U).join(`

`);class D{constructor(e){this.live=new y,this.sample=e}async fetchMetadata(e,t){if(this.last=`GET https://archive.org/metadata/${e}${t?`/${t}`:""}`,!this.sample)return this.live.fetchMetadata(e,t);const a=new N().generateMockMetadataResponse(e);return{success:t?{result:t.split("/").reduce((n,r)=>n?.[r],a)}:a}}}let o=class extends b{constructor(){super(...arguments),this.identifier="",this.keypath="",this.sample=!1,this.running=!1}render(){return d`
      <service-template
        serviceName="metadata-service"
        .usage=${F}
        .apiSource=${I}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${g}
              autocomplete="off"
              spellcheck="false"
              .value=${this.identifier}
              @input=${s=>this.identifier=s.target.value}
            />
          </label>
          <label class="id">
            Value path (optional)
            <input
              type="text"
              placeholder="metadata/title"
              autocomplete="off"
              spellcheck="false"
              .value=${this.keypath}
              @input=${s=>this.keypath=s.target.value}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${s=>this.sample=s.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.running}>Fetch</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?d`<code class="call">${this.result.call}</code> ${this.result.request?d`<code class="request">${this.result.request}</code>`:v}
                  ${this.result.error?d`<code class="error">${this.result.error}</code>`:d`<ul class="lines">
                        ${this.result.lines.map(s=>d`<li>${s}</li>`)}
                      </ul>`}`:v}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Fetches an item's metadata from archive.org and models it:
            <code>fetchMetadata</code> returns the whole response, and
            <code>fetchMetadataValue</code> returns one value when you give it a
            path. The sample data answers from a canned response and sends
            nothing.
          </p>
        </div>
      </service-template>
    `}async run(s){s.preventDefault();const e=this.identifier.trim()||g,t=this.keypath.trim(),a=new D(this.sample),n=new h(a),r=t?`fetchMetadataValue(${JSON.stringify(e)}, ${JSON.stringify(t)})`:`fetchMetadata(${JSON.stringify(e)})`;this.running=!0;try{if(t){const{success:i,error:c}=await n.fetchMetadataValue(e,t);this.result=c?this.failure(r,a,c):{call:r,request:a.last,lines:[JSON.stringify(i)]}}else{const{success:i,error:c}=await n.fetchMetadata(e);this.result=c||!i?this.failure(r,a,c):{call:r,request:a.last,lines:[`title: ${i.metadata.title?.value??"—"}`,`mediatype: ${i.metadata.mediatype?.value??"—"}`,`files: ${i.files_count}`,`size: ${i.item_size} bytes`,`server: ${i.server??"—"}, dir: ${i.dir??"—"}`,`first files: ${(i.files??[]).slice(0,3).map(w=>w.name).join(", ")||"—"}`]}}}finally{this.running=!1}}failure(s,e,t){return{call:s,request:e.last,lines:[],error:`${t?.type??"error"}${t?.message?` (${t.message})`:""}${this.sample?"":'. Try "Sample data".'}`}}static get styles(){return M`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.id input {
        min-width: 0;
        width: 12rem;
        max-width: 100%;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
      }

      .call,
      .request,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      .lines {
        margin: 0;
        padding-left: 1.2rem;
        overflow-wrap: anywhere;
      }
    `}};l([p()],o.prototype,"identifier",2);l([p()],o.prototype,"keypath",2);l([p()],o.prototype,"sample",2);l([p()],o.prototype,"running",2);l([p()],o.prototype,"result",2);o=l([S("metadata-service-story")],o);export{o as MetadataServiceStory};
