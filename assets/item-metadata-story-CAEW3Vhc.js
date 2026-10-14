import{i as R,A as N,b as g,a as E,r as _,c as C}from"./index-C_lVHrEU.js";import"./service-template-DaOVw-8n.js";import{M as p}from"./memoize-decorator-Bcs06flF.js";import{p as f,A as L,a as K,B as U,b as B,C as W,c as G,d as X,e as Z,D as q,f as J,E as H,g as Q,L as Y,M as ee,h as O,i as te,N as ae,j as re,P as ne,R as ie,S as se,k as oe,T as le,l as de,U as ce,m as ue}from"./review-B6vp_H0n.js";import{N as w,B as pe}from"./byte-Dx-GOKpv.js";import{D as me,B as fe}from"./string-k5nQQhs7.js";import"./syntax-highlighter-PLYGay2W.js";import"./theme-styles-BO5vLUEA.js";const he=`import { Memoize } from 'typescript-memoize';
import type { FieldParserInterface } from '../../../field-parsers/field-parsers';

/**
 * The MetadataRawValue is all of the possible raw types we can get for a field.
 *
 * This allows the parsers to know if they can handle the raw value or not and
 * how to handle it if they can.
 */
export type MetadataRawValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[];

export interface MetadataFieldInterface<T> {
  /**
   * The raw value received from the API response
   *
   * @type {MetadataRawValue}
   * @memberof MetadataField
   */
  readonly rawValue: Readonly<MetadataRawValue>;

  /**
   * The first value if there are multiple or the only value if there is one
   *
   * @readonly
   * @type {(T | undefined)}
   * @memberof MetadataField
   */
  value?: T;

  /**
   * The array of all values for the field.
   *
   * Many fields only contain a single value and
   * can be accessed via the \`.value\` getter
   *
   * @type {T[]}
   * @memberof MetadataField
   */
  values: T[];
}

/**
 * The MetadataField is responsible for three things:
 * 1. Take in some raw data (strings, arrays, numbers, etc)
 * 2. Normalize the input to an array of the input,
 *    ie. [string, string], [number, number], [Date, Date], etc
 * 3. Cast the values to their expected \`Type\`
 *
 * This class gets instiated with a \`Type\` and a parser of that type. For instance, the
 * \`DateField\` is a subclass of \`MetadataField\` with a \`Type\` of \`Date\` and a \`DateParser\`.
 *
 * When using a \`DateField\`, you can pass it a string date and it will cast it to a javascript Date,
 * ie:
 *
 * \`\`\`
 * const dateField = new DateField('2020-02-13')
 * dateField.value = Date(2020-02-13) // native javascript Date object
 * dateField.values = [Date(2020-02-13)] // the normalized array of values
 * dateField.rawValue = '2020-02-13' // the raw string that was passed in
 * \`\`\`
 *
 * @class MetadataField
 * @template Type The type of metadata this is (string, number, Date, etc)
 * @template FieldParserInterfaceType The parser for that type (StringParser, NumberParser, etc)
 */
export class MetadataField<
  Type,
  FieldParserInterfaceType extends FieldParserInterface<Type | Type[]>,
> implements MetadataFieldInterface<Type>
{
  /** @inheritdoc */
  readonly rawValue: Readonly<MetadataRawValue>;

  /** @inheritdoc */
  @Memoize() get values(): Type[] {
    const values = this.parseRawValue();
    return values;
  }

  /** @inheritdoc */
  @Memoize() get value(): Type | undefined {
    return this.values[0];
  }

  constructor(parser: FieldParserInterfaceType, rawValue: MetadataRawValue) {
    this.parser = parser;
    this.rawValue = rawValue;
  }

  private parser: FieldParserInterfaceType;

  private parseRawValue(): Type[] {
    const rawValues = Array.isArray(this.rawValue)
      ? this.rawValue
      : [this.rawValue];

    const values: Type[] = [];
    rawValues.forEach((value) => {
      const parsed = this.parser.parseValue(value);
      if (Array.isArray(parsed)) {
        values.push(...parsed);
      } else if (parsed !== undefined) {
        values.push(parsed);
      }
    });

    return values;
  }
}
`,ye=`import type { Metadata } from './metadata';
import type { MetadataFieldInterface } from './metadata-fields/metadata-field';

/**
 * The names of \`Metadata\`'s fields, i.e. the members whose value is a
 * \`MetadataField\`.
 *
 * Derived from \`Metadata\` rather than listed, so a field added there is
 * available here with no matching change. Members that aren't fields are
 * excluded, so \`identifier\` (a plain string) and \`rawMetadata\` (a plain
 * record) are rejected.
 *
 * Useful for anything that takes a field name and wants the corresponding
 * field type, since \`Metadata[K]\` then resolves to the field class:
 *
 * \`\`\`ts
 * function read<K extends MetadataFieldKey>(m: Metadata, key: K): Metadata[K] {
 *   return m[key];
 * }
 * read(metadata, 'collection'); // StringField | undefined
 * read(metadata, 'addeddate'); // DateField | undefined
 * \`\`\`
 */
export type MetadataFieldKey = {
  [K in keyof Metadata]-?: NonNullable<
    Metadata[K]
  > extends MetadataFieldInterface<unknown>
    ? K
    : never;
}[keyof Metadata];
`;var be=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,m=(e,t,i,o)=>{for(var n=ge(t,i),s=e.length-1,d;s>=0;s--)(d=e[s])&&(n=d(t,i,n)||n);return n&&be(t,i,n),n};class c{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const t=w.shared.parseValue(this.rawValue.mtime);if(t)return new Date(t*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return f(this.rawValue,t=>pe.shared.parseValue(t),"size")}get title(){return this.rawValue.title}get length(){return f(this.rawValue,t=>me.shared.parseValue(t),"length")}get height(){return f(this.rawValue,t=>w.shared.parseValue(t),"height")}get width(){return f(this.rawValue,t=>w.shared.parseValue(t),"width")}get track(){return f(this.rawValue,t=>w.shared.parseValue(t),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return f(this.rawValue,t=>w.shared.parseValue(t),"bitrate")}get private(){return f(this.rawValue,t=>fe.shared.parseValue(t),"private")}constructor(t={}){this.rawValue=t}}m([p()],c.prototype,"mtime");m([p()],c.prototype,"size");m([p()],c.prototype,"length");m([p()],c.prototype,"height");m([p()],c.prototype,"width");m([p()],c.prototype,"track");m([p()],c.prototype,"bitrate");m([p()],c.prototype,"private");const P=["Mint","Near Mint","Very Good","Good","Fair","Worn","Poor","Fragile","Incomplete"],a=(e,t=!1,i={})=>({type:e,repeatable:t,access:"user",...i}),r=(e,t=!1,i={})=>({type:e,repeatable:t,access:"admin",...i}),u=(e,t=!1)=>({type:e,repeatable:t,access:"system"}),h=e=>({values:{options:e,closed:!0}}),T=e=>({values:{options:e,closed:!1}}),F=Object.freeze({adaptive_ocr:a("boolean"),addeddate:u("datetime"),aspect_ratio:a("aspect-ratio"),audio_codec:r("text"),audio_sample_rate:r("integer"),betterpdf:a("boolean"),"bookreader-defaults":a("text",!1,h(["mode/1up","mode/2up","mode/thumb"])),bwocr:a("text"),call_number:a("text"),camera:r("text"),ccnum:a("text"),closed_captioning:a("text",!1,h(["yes","no"])),collection:r("identifier",!0),color:a("text",!1,T(["color","B&W"])),condition:a("text",!1,h(P)),"condition-visual":a("text",!1,h([...P,"None","Unknown"])),contributor:a("text"),coverage:a("text",!0),creator:a("text",!0),"creator-alt-script":a("text"),date:a("date"),description:a("html",!0),"external-identifier":a("text",!0),firstfiledate:a("timestamp"),"fixed-ppi":a("number"),frames_per_second:a("number"),identifier:r("identifier"),"identifier-ark":a("ark"),"identifier-bib":a("text",!0),isbn:a("isbn",!0),issn:a("issn",!0),language:a("text",!0),lastfiledate:a("timestamp"),lccn:a("integer",!0),licenseurl:a("url"),"marc-insert-only":r("boolean"),mediatype:r("text",!1,h(["texts","etree","audio","movies","software","image","data","web","collection","account"])),notes:a("html",!0),"oclc-id":a("text",!0),openlibrary:a("openlibrary-edition",!1,{deprecated:!0}),openlibrary_author:a("openlibrary-author",!0),openlibrary_edition:a("openlibrary-edition"),openlibrary_subject:a("text",!0),openlibrary_work:a("openlibrary-work"),"page-progression":a("text",!1,h(["lr","rl"])),"possible-copyright-status":a("text"),ppi:a("integer"),publisher:a("text"),related_collection:r("identifier"),"related-external-id":a("text",!0),rights:a("html"),runtime:a("runtime",!0),scandate:a("text"),scanner:a("text"),size:a("number",!0),"sort-by":r("text",!1,h(["addeddate","creatorSorter","date","downloads","publicdate","reviewdate","titleSorter"].flatMap(e=>[e,`-${e}`]))),sound:a("text",!1,T(["sound","silent"])),source:a("text"),sponsor:a("text"),subject:a("text",!0),summary:r("html"),title:a("plain-text"),"title-alt-script":a("text"),volume:a("text"),year:a("year",!1,{deprecated:!0}),"access-restricted":r("boolean"),"access-restricted-item":r("boolean"),"admin-collection":r("boolean"),boxid:r("text",!0),curation:r("text"),foldoutcount:r("integer"),"force-update":a("boolean"),geo_restricted:r("text"),hidden:r("boolean"),imagecount:u("integer"),neverindex:r("boolean"),next_item:r("identifier"),no_ol_import:r("boolean"),noindex:a("boolean"),ocr:r("text"),operator:r("email"),previous_item:r("identifier"),"public-format":r("text",!0),publicdate:u("datetime"),repub_state:r("integer"),republisher:r("email",!1,{deprecated:!0}),republisher_date:r("timestamp"),republisher_operator:r("email"),republisher_time:u("integer"),scanfee:r("text"),scanningcenter:r("text"),show_related_music_by_track:r("boolean"),source_pixel_height:r("integer"),source_pixel_width:r("integer"),sponsordate:r("text"),start_localtime:r("datetime"),start_time:r("datetime"),stop_time:r("datetime"),title_message:r("text"),tuner:r("text"),updated:u("text",!0),updatedate:u("datetime",!0),updater:u("text",!0),uploader:r("email"),utc_offset:r("integer"),video_codec:r("text"),viruscheck:r("boolean")}),we=["ocr_","republisher_","tts_"];function M(e){return Object.prototype.hasOwnProperty.call(F,e)?F[e]:we.some(t=>e.startsWith(t))?u("text"):a("text",!0)}function ve(e){return M(e).access==="user"}function j(e,t){return[...e].reduce((o,n,s)=>{const d=n==="X"?10:Number(n);return o+d*(t-s)},0)%11===0}function xe(e){const t=e.replace(/[\s-]/g,"").toUpperCase();return/^\d{9}[\dX]$/.test(t)?j(t,10):/^\d{13}$/.test(t)?[...t].reduce((o,n,s)=>o+Number(n)*(s%2===0?1:3),0)%10===0:!1}function _e(e){const t=e.replace(/[\s-]/g,"").toUpperCase();return/^\d{7}[\dX]$/.test(t)&&j(t,8)}const Fe=[/^\d{4}$/,/^\d{4}-(0[1-9]|1[0-2])$/,/^\d{4}-\d{4}$/,/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/,/^\[\d{4}\]$/,/^c\.?\s?(a\.?\s?)?\d{4}$/i,/^\[n\.d\.\]$/i];function Me(e){const t=e.trim();return Fe.some(i=>i.test(t))}const $e={"plain-text":[e=>!/<[a-z/!]/i.test(e),"not-plain-text"],datetime:[/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/,"invalid-datetime"],timestamp:[/^\d{14}$/,"invalid-timestamp"],year:[/^\d{4}$/,"invalid-year"],integer:[/^-?\d+$/,"invalid-integer"],number:[/^-?\d+(\.\d+)?$/,"invalid-number"],boolean:[/^true$/i,"invalid-boolean"],url:[/^https?:\/\/\S+$/i,"invalid-url"],email:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid-email"],identifier:[/^[a-zA-Z0-9][a-zA-Z0-9_.-]{4,99}$/,"invalid-identifier"],isbn:[xe,"invalid-isbn"],issn:[_e,"invalid-issn"],runtime:[/^(\d{1,2}:)?\d{1,2}:[0-5]\d$/,"invalid-runtime"],"aspect-ratio":[/^\d+:\d+$/,"invalid-aspect-ratio"],"openlibrary-edition":[/^OL\d+M$/,"invalid-openlibrary-id"],"openlibrary-work":[/^OL\d+W$/,"invalid-openlibrary-id"],"openlibrary-author":[/^OL\d+A$/,"invalid-openlibrary-id"],ark:[/^ark:\/\d+\/\S+$/,"invalid-ark"]};function Ve(e,t){const i=t.trim();if(i==="")return;const o=M(e);if(o.values?.closed&&!o.values.options.map(l=>l.toLowerCase()).includes(i.toLowerCase()))return"not-an-allowed-value";const n=$e[o.type];if(!n)return;const[s,d]=n;return(typeof s=="function"?s(i):s.test(i))?void 0:d}const Pe=Object.freeze(Object.defineProperty({__proto__:null,AspectRatioField:L,AspectRatioParser:K,BooleanField:U,ByteField:B,ChecksumField:W,ChecksumParser:G,CurationField:X,CurationParser:Z,DateField:q,DurationField:J,EnumField:H,EnumParser:Q,File:c,ListField:Y,MediaTypeField:ee,Metadata:O,MetadataField:te,NumberField:ae,NumberListField:re,PageProgressionField:ne,Review:ie,StringField:se,StringListField:oe,TunerField:le,TunerParser:de,UtcOffsetField:ce,UtcOffsetParser:ue,checkMetadataValue:Ve,fieldSchema:M,isRecommendedDateFormat:Me,isUserEditableField:ve,metadataSchema:F},Symbol.toStringTag,{value:"Module"}));var Te=Object.defineProperty,De=Object.getOwnPropertyDescriptor,v=(e,t,i,o)=>{for(var n=o>1?void 0:o?De(t,i):t,s=e.length-1,d;s>=0;s--)(d=e[s])&&(n=(o?d(t,i,n):d(n))||n);return o&&n&&Te(t,i,n),n};const x=O,D="nasa",ke={identifier:"sample-item",mediatype:"movies",title:"A sample item",creator:"Internet Archive",subject:["sample","demo","metadata"],addeddate:"2021-05-20 13:37:15",publicdate:"2021-05-21 08:00:00",runtime:"1:02:03",item_size:"123456789",downloads:"42",imagecount:"17","access-restricted-item":"true",mystery_field:"a key the model does not read"},Oe=`import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`,je=e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),Se=[he,ye].map(je).join(`

`),S=Object.getOwnPropertyNames(x.prototype).filter(e=>typeof Object.getOwnPropertyDescriptor(x.prototype,e)?.get=="function").sort(),A=(e,t)=>e[t],I=e=>typeof e=="object"&&e!==null&&"rawValue"in e,k=e=>{let t=0;for(let i=Object.getPrototypeOf(e);i;i=Object.getPrototypeOf(i))t+=1;return t};function Ae(e){return I(e)?Object.entries(Pe).filter(([,i])=>typeof i=="function"&&e instanceof i).sort(([,i],[,o])=>k(o)-k(i))[0]?.[0]??"unknown":typeof e}function Ie(e){if(!I(e))return e;const t=e.values;return Array.isArray(t)?t:e.value}function z(e){return e==null?"—":e instanceof Date?e.toISOString():Array.isArray(e)?e.map(z).join(", "):typeof e=="object"?JSON.stringify(e):String(e)}function ze(e){const t=new Set,i=new Proxy(e,{get(n,s){return typeof s=="string"&&t.add(s),Reflect.get(n,s)}}),o=new x(i);for(const n of S)A(o,n);return t}let y=class extends R{constructor(){super(...arguments),this.identifier="",this.sample=!1,this.loading=!1}render(){return g`
      <service-template
        serviceName="item-metadata"
        .usage=${Oe}
        .apiSource=${Se}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${D}
              autocomplete="off"
              spellcheck="false"
              .value=${this.identifier}
              @input=${e=>this.identifier=e.target.value}
            />
          </label>
          <label class="check">
            <input
              type="checkbox"
              .checked=${this.sample}
              @change=${e=>this.sample=e.target.checked}
            />
            Sample data (works offline)
          </label>
          <button type="submit" ?disabled=${this.loading}>Parse</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?this.renderResult(this.result):N}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Loads an item's metadata from archive.org and shows what the model
            makes of each field it sets: the class that parsed it and the native
            value. Keys the model doesn't read are listed under the table.
          </p>
        </div>
      </service-template>
    `}renderResult(e){return g`<code class="call">${e.call}</code> ${e.error?g`<code class="error">${e.error}</code>`:g`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${e.rows.map(t=>g`<tr>
                      <th scope="row">${t.name}</th>
                      <td>${t.type}</td>
                      <td>${t.value}</td>
                    </tr>`)}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${e.unmodeled.length?e.unmodeled.join(", "):"none"}
            </p>`}`}async run(e){e.preventDefault();const t=this.identifier.trim()||D,i=`https://archive.org/metadata/${encodeURIComponent(t)}`,o=`new Metadata(${this.sample?"sample":`response.metadata /* ${t} */`})`;this.loading=!0;try{let n;if(this.sample)n=ke;else{const l=await fetch(i);if(!l.ok)throw new Error(`Request failed (${l.status})`);const b=await l.json();if(!b.metadata)throw new Error(`No item found for "${t}"`);n=b.metadata}const s=new x(n),d=S.map(l=>({name:l,value:A(s,l)})).filter(({value:l})=>l!==void 0).map(({name:l,value:b})=>({name:l,type:Ae(b),value:z(Ie(b))})),$=ze(n),V=Object.keys(n).filter(l=>!$.has(l)).sort();this.result={call:o,rows:d,unmodeled:V}}catch(n){this.result={call:this.sample?o:`fetch("${i}")`,rows:[],unmodeled:[],error:`${n instanceof Error?n.message:n}${this.sample?"":'. Try "Sample data".'}`}}finally{this.loading=!1}}static get styles(){return E`
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
        width: 14rem;
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
        overflow-x: auto;
      }

      .call,
      .error {
        overflow-wrap: anywhere;
      }

      .error {
        color: #b00020;
      }

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 2px 10px 2px 0;
        vertical-align: top;
        overflow-wrap: anywhere;
      }

      thead th {
        border-bottom: 1px solid #ccc;
      }

      .unmodeled {
        margin: 0;
        font-size: 0.8rem;
        overflow-wrap: anywhere;
      }
    `}};v([_()],y.prototype,"identifier",2);v([_()],y.prototype,"sample",2);v([_()],y.prototype,"loading",2);v([_()],y.prototype,"result",2);y=v([C("item-metadata-story")],y);export{y as ItemMetadataStory};
