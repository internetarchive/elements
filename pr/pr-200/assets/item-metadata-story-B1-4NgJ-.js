import{i as O,A as V,b as f,a as A,r as b,c as I}from"./index-6YV4A62m.js";import"./service-template-Z_dJ-fmf.js";import{F as R}from"./file-C8705IBB.js";import{A as z,a as E,B as N,b as C,C as L,c as K,d as U,e as W,D as B,f as G,E as X,g as Z,L as q,M as J,h as T,i as H,N as Q,j as Y,P as ee,R as te,S as ae,k as re,T as ne,l as ie,U as se,m as oe}from"./review-B6vp_H0n.js";import"./syntax-highlighter-CsACDj0Q.js";import"./theme-styles-Bj28gL94.js";import"./memoize-decorator-Bcs06flF.js";import"./byte-Dx-GOKpv.js";import"./string-k5nQQhs7.js";const de=`import { Memoize } from 'typescript-memoize';
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
`,le=`import type { Metadata } from './metadata';
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
`,F=["Mint","Near Mint","Very Good","Good","Fair","Worn","Poor","Fragile","Incomplete"],t=(e,a=!1,n={})=>({type:e,repeatable:a,access:"user",...n}),r=(e,a=!1,n={})=>({type:e,repeatable:a,access:"admin",...n}),c=(e,a=!1)=>({type:e,repeatable:a,access:"system"}),p=e=>({values:{options:e,closed:!0}}),_=e=>({values:{options:e,closed:!1}}),g=Object.freeze({adaptive_ocr:t("boolean"),addeddate:c("datetime"),aspect_ratio:t("aspect-ratio"),audio_codec:r("text"),audio_sample_rate:r("integer"),betterpdf:t("boolean"),"bookreader-defaults":t("text",!1,p(["mode/1up","mode/2up","mode/thumb"])),bwocr:t("text"),call_number:t("text"),camera:r("text"),ccnum:t("text"),closed_captioning:t("text",!1,p(["yes","no"])),collection:r("identifier",!0),color:t("text",!1,_(["color","B&W"])),condition:t("text",!1,p(F)),"condition-visual":t("text",!1,p([...F,"None","Unknown"])),contributor:t("text"),coverage:t("text",!0),creator:t("text",!0),"creator-alt-script":t("text"),date:t("date"),description:t("html",!0),"external-identifier":t("text",!0),firstfiledate:t("timestamp"),"fixed-ppi":t("number"),frames_per_second:t("number"),identifier:r("identifier"),"identifier-ark":t("ark"),"identifier-bib":t("text",!0),isbn:t("isbn",!0),issn:t("issn",!0),language:t("text",!0),lastfiledate:t("timestamp"),lccn:t("integer",!0),licenseurl:t("url"),"marc-insert-only":r("boolean"),mediatype:r("text",!1,p(["texts","etree","audio","movies","software","image","data","web","collection","account"])),notes:t("html",!0),"oclc-id":t("text",!0),openlibrary:t("openlibrary-edition",!1,{deprecated:!0}),openlibrary_author:t("openlibrary-author",!0),openlibrary_edition:t("openlibrary-edition"),openlibrary_subject:t("text",!0),openlibrary_work:t("openlibrary-work"),"page-progression":t("text",!1,p(["lr","rl"])),"possible-copyright-status":t("text"),ppi:t("integer"),publisher:t("text"),related_collection:r("identifier"),"related-external-id":t("text",!0),rights:t("html"),runtime:t("runtime",!0),scandate:t("text"),scanner:t("text"),size:t("number",!0),"sort-by":r("text",!1,p(["addeddate","creatorSorter","date","downloads","publicdate","reviewdate","titleSorter"].flatMap(e=>[e,`-${e}`]))),sound:t("text",!1,_(["sound","silent"])),source:t("text"),sponsor:t("text"),subject:t("text",!0),summary:r("html"),title:t("plain-text"),"title-alt-script":t("text"),volume:t("text"),year:t("year",!1,{deprecated:!0}),"access-restricted":r("boolean"),"access-restricted-item":r("boolean"),"admin-collection":r("boolean"),boxid:r("text",!0),curation:r("text"),foldoutcount:r("integer"),"force-update":t("boolean"),geo_restricted:r("text"),hidden:r("boolean"),imagecount:c("integer"),neverindex:r("boolean"),next_item:r("identifier"),no_ol_import:r("boolean"),noindex:t("boolean"),ocr:r("text"),operator:r("email"),previous_item:r("identifier"),"public-format":r("text",!0),publicdate:c("datetime"),repub_state:r("integer"),republisher:r("email",!1,{deprecated:!0}),republisher_date:r("timestamp"),republisher_operator:r("email"),republisher_time:c("integer"),scanfee:r("text"),scanningcenter:r("text"),show_related_music_by_track:r("boolean"),source_pixel_height:r("integer"),source_pixel_width:r("integer"),sponsordate:r("text"),start_localtime:r("datetime"),start_time:r("datetime"),stop_time:r("datetime"),title_message:r("text"),tuner:r("text"),updated:c("text",!0),updatedate:c("datetime",!0),updater:c("text",!0),uploader:r("email"),utc_offset:r("integer"),video_codec:r("text"),viruscheck:r("boolean")}),ce=["ocr_","republisher_","tts_"];function v(e){return Object.prototype.hasOwnProperty.call(g,e)?g[e]:ce.some(a=>e.startsWith(a))?c("text"):t("text",!0)}function pe(e){return v(e).access==="user"}function P(e,a){return[...e].reduce((s,i,o)=>{const l=i==="X"?10:Number(i);return s+l*(a-o)},0)%11===0}function ue(e){const a=e.replace(/[\s-]/g,"").toUpperCase();return/^\d{9}[\dX]$/.test(a)?P(a,10):/^\d{13}$/.test(a)?[...a].reduce((s,i,o)=>s+Number(i)*(o%2===0?1:3),0)%10===0:!1}function me(e){const a=e.replace(/[\s-]/g,"").toUpperCase();return/^\d{7}[\dX]$/.test(a)&&P(a,8)}const fe=[/^\d{4}$/,/^\d{4}-(0[1-9]|1[0-2])$/,/^\d{4}-\d{4}$/,/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/,/^\[\d{4}\]$/,/^c\.?\s?(a\.?\s?)?\d{4}$/i,/^\[n\.d\.\]$/i];function he(e){const a=e.trim();return fe.some(n=>n.test(a))}const ye={"plain-text":[e=>!/<[a-z/!]/i.test(e),"not-plain-text"],datetime:[/^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/,"invalid-datetime"],timestamp:[/^\d{14}$/,"invalid-timestamp"],year:[/^\d{4}$/,"invalid-year"],integer:[/^-?\d+$/,"invalid-integer"],number:[/^-?\d+(\.\d+)?$/,"invalid-number"],boolean:[/^true$/i,"invalid-boolean"],url:[/^https?:\/\/\S+$/i,"invalid-url"],email:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid-email"],identifier:[/^[a-zA-Z0-9][a-zA-Z0-9_.-]{4,99}$/,"invalid-identifier"],isbn:[ue,"invalid-isbn"],issn:[me,"invalid-issn"],runtime:[/^(\d{1,2}:)?\d{1,2}:[0-5]\d$/,"invalid-runtime"],"aspect-ratio":[/^\d+:\d+$/,"invalid-aspect-ratio"],"openlibrary-edition":[/^OL\d+M$/,"invalid-openlibrary-id"],"openlibrary-work":[/^OL\d+W$/,"invalid-openlibrary-id"],"openlibrary-author":[/^OL\d+A$/,"invalid-openlibrary-id"],ark:[/^ark:\/\d+\/\S+$/,"invalid-ark"]};function be(e,a){const n=a.trim();if(n==="")return;const s=v(e);if(s.values?.closed&&!s.values.options.map(d=>d.toLowerCase()).includes(n.toLowerCase()))return"not-an-allowed-value";const i=ye[s.type];if(!i)return;const[o,l]=i;return(typeof o=="function"?o(n):o.test(n))?void 0:l}const ge=Object.freeze(Object.defineProperty({__proto__:null,AspectRatioField:z,AspectRatioParser:E,BooleanField:N,ByteField:C,ChecksumField:L,ChecksumParser:K,CurationField:U,CurationParser:W,DateField:B,DurationField:G,EnumField:X,EnumParser:Z,File:R,ListField:q,MediaTypeField:J,Metadata:T,MetadataField:H,NumberField:Q,NumberListField:Y,PageProgressionField:ee,Review:te,StringField:ae,StringListField:re,TunerField:ne,TunerParser:ie,UtcOffsetField:se,UtcOffsetParser:oe,checkMetadataValue:be,fieldSchema:v,isRecommendedDateFormat:he,isUserEditableField:pe,metadataSchema:g},Symbol.toStringTag,{value:"Module"}));var ve=Object.defineProperty,we=Object.getOwnPropertyDescriptor,h=(e,a,n,s)=>{for(var i=s>1?void 0:s?we(a,n):a,o=e.length-1,l;o>=0;o--)(l=e[o])&&(i=(s?l(a,n,i):l(i))||i);return s&&i&&ve(a,n,i),i};const y=T,M="nasa",xe={identifier:"sample-item",mediatype:"movies",title:"A sample item",creator:"Internet Archive",subject:["sample","demo","metadata"],addeddate:"2021-05-20 13:37:15",publicdate:"2021-05-21 08:00:00",runtime:"1:02:03",item_size:"123456789",downloads:"42",imagecount:"17","access-restricted-item":"true",mystery_field:"a key the model does not read"},Fe=`import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`,_e=e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),Me=[de,le].map(_e).join(`

`),D=Object.getOwnPropertyNames(y.prototype).filter(e=>typeof Object.getOwnPropertyDescriptor(y.prototype,e)?.get=="function").sort(),k=(e,a)=>e[a],S=e=>typeof e=="object"&&e!==null&&"rawValue"in e,$=e=>{let a=0;for(let n=Object.getPrototypeOf(e);n;n=Object.getPrototypeOf(n))a+=1;return a};function $e(e){return S(e)?Object.entries(ge).filter(([,n])=>typeof n=="function"&&e instanceof n).sort(([,n],[,s])=>$(s)-$(n))[0]?.[0]??"unknown":typeof e}function Te(e){if(!S(e))return e;const a=e.values;return Array.isArray(a)?a:e.value}function j(e){return e==null?"—":e instanceof Date?e.toISOString():Array.isArray(e)?e.map(j).join(", "):typeof e=="object"?JSON.stringify(e):String(e)}function Pe(e){const a=new Set,n=new Proxy(e,{get(i,o){return typeof o=="string"&&a.add(o),Reflect.get(i,o)}}),s=new y(n);for(const i of D)k(s,i);return a}let u=class extends O{constructor(){super(...arguments),this.identifier="",this.sample=!1,this.loading=!1}render(){return f`
      <service-template
        serviceName="item-metadata"
        .usage=${Fe}
        .apiSource=${Me}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${M}
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
            ${this.result?this.renderResult(this.result):V}
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
    `}renderResult(e){return f`<code class="call">${e.call}</code> ${e.error?f`<code class="error">${e.error}</code>`:f`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${e.rows.map(a=>f`<tr>
                      <th scope="row">${a.name}</th>
                      <td>${a.type}</td>
                      <td>${a.value}</td>
                    </tr>`)}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${e.unmodeled.length?e.unmodeled.join(", "):"none"}
            </p>`}`}async run(e){e.preventDefault();const a=this.identifier.trim()||M,n=`https://archive.org/metadata/${encodeURIComponent(a)}`,s=`new Metadata(${this.sample?"sample":`response.metadata /* ${a} */`})`;this.loading=!0;try{let i;if(this.sample)i=xe;else{const d=await fetch(n);if(!d.ok)throw new Error(`Request failed (${d.status})`);const m=await d.json();if(!m.metadata)throw new Error(`No item found for "${a}"`);i=m.metadata}const o=new y(i),l=D.map(d=>({name:d,value:k(o,d)})).filter(({value:d})=>d!==void 0).map(({name:d,value:m})=>({name:d,type:$e(m),value:j(Te(m))})),w=Pe(i),x=Object.keys(i).filter(d=>!w.has(d)).sort();this.result={call:s,rows:l,unmodeled:x}}catch(i){this.result={call:this.sample?s:`fetch("${n}")`,rows:[],unmodeled:[],error:`${i instanceof Error?i.message:i}${this.sample?"":'. Try "Sample data".'}`}}finally{this.loading=!1}}static get styles(){return A`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.8rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 1.28rem;
      }

      label.check {
        flex-direction: row;
        align-items: center;
        gap: 4px;
      }

      label.id input {
        min-width: 0;
        width: 22.4rem;
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
        padding: 0.8rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 1.36rem;
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
        font-size: 1.28rem;
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
        font-size: 1.28rem;
        overflow-wrap: anywhere;
      }
    `}};h([b()],u.prototype,"identifier",2);h([b()],u.prototype,"sample",2);h([b()],u.prototype,"loading",2);h([b()],u.prototype,"result",2);u=h([I("item-metadata-story")],u);export{u as ItemMetadataStory};
