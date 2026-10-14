import{i as $,A as j,b as m,a as O,r as g,c as _}from"./index-DQEN-OrS.js";import"./service-template-BdczDfNf.js";import{p as u,M as d,A as S,a as A,B as R,b as I,C as k,c as z,d as E,e as N,D as K,f as C,E as L,g as U,L as B,h as q,i as F,j as G,N as J,k as W,P as H,R as Q,S as X,l as Y,T as Z,m as ee,U as te,n as ae}from"./review-BFjSZ82l.js";import{N as f,B as re,D as ne,b as se}from"./string-CmwmQ2TQ.js";import"./theme-styles-tbIruVVT.js";const ie=`import { Memoize } from 'typescript-memoize';
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
`,oe=`import type { Metadata } from './metadata';
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
`;var le=Object.defineProperty,de=Object.getOwnPropertyDescriptor,p=(e,t,r,s)=>{for(var a=de(t,r),n=e.length-1,l;n>=0;n--)(l=e[n])&&(a=l(t,r,a)||a);return a&&le(t,r,a),a};class o{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const t=f.shared.parseValue(this.rawValue.mtime);if(t)return new Date(t*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return u(this.rawValue,t=>re.shared.parseValue(t),"size")}get title(){return this.rawValue.title}get length(){return u(this.rawValue,t=>ne.shared.parseValue(t),"length")}get height(){return u(this.rawValue,t=>f.shared.parseValue(t),"height")}get width(){return u(this.rawValue,t=>f.shared.parseValue(t),"width")}get track(){return u(this.rawValue,t=>f.shared.parseValue(t),"track")}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}get bitrate(){return u(this.rawValue,t=>f.shared.parseValue(t),"bitrate")}get private(){return u(this.rawValue,t=>se.shared.parseValue(t),"private")}constructor(t={}){this.rawValue=t}}p([d()],o.prototype,"mtime");p([d()],o.prototype,"size");p([d()],o.prototype,"length");p([d()],o.prototype,"height");p([d()],o.prototype,"width");p([d()],o.prototype,"track");p([d()],o.prototype,"bitrate");p([d()],o.prototype,"private");const pe=Object.freeze(Object.defineProperty({__proto__:null,AspectRatioField:S,AspectRatioParser:A,BooleanField:R,ByteField:I,ChecksumField:k,ChecksumParser:z,CurationField:E,CurationParser:N,DateField:K,DurationField:C,EnumField:L,EnumParser:U,File:o,ListField:B,MediaTypeField:q,Metadata:F,MetadataField:G,NumberField:J,NumberListField:W,PageProgressionField:H,Review:Q,StringField:X,StringListField:Y,TunerField:Z,TunerParser:ee,UtcOffsetField:te,UtcOffsetParser:ae},Symbol.toStringTag,{value:"Module"}));var ue=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,y=(e,t,r,s)=>{for(var a=s>1?void 0:s?ce(t,r):t,n=e.length-1,l;n>=0;n--)(l=e[n])&&(a=(s?l(t,r,a):l(a))||a);return s&&a&&ue(t,r,a),a};const w=F,b="nasa",he={identifier:"sample-item",mediatype:"movies",title:"A sample item",creator:"Internet Archive",subject:["sample","demo","metadata"],addeddate:"2021-05-20 13:37:15",publicdate:"2021-05-21 08:00:00",runtime:"1:02:03",item_size:"123456789",downloads:"42",imagecount:"17","access-restricted-item":"true",mystery_field:"a key the model does not read"},me=`import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`,fe=e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),ye=[ie,oe].map(fe).join(`

`),V=Object.getOwnPropertyNames(w.prototype).filter(e=>typeof Object.getOwnPropertyDescriptor(w.prototype,e)?.get=="function").sort(),M=(e,t)=>e[t],T=e=>typeof e=="object"&&e!==null&&"rawValue"in e,v=e=>{let t=0;for(let r=Object.getPrototypeOf(e);r;r=Object.getPrototypeOf(r))t+=1;return t};function we(e){return T(e)?Object.entries(pe).filter(([,r])=>typeof r=="function"&&e instanceof r).sort(([,r],[,s])=>v(s)-v(r))[0]?.[0]??"unknown":typeof e}function ge(e){if(!T(e))return e;const t=e.values;return Array.isArray(t)?t:e.value}function P(e){return e==null?"—":e instanceof Date?e.toISOString():Array.isArray(e)?e.map(P).join(", "):typeof e=="object"?JSON.stringify(e):String(e)}function be(e){const t=new Set,r=new Proxy(e,{get(a,n){return typeof n=="string"&&t.add(n),Reflect.get(a,n)}}),s=new w(r);for(const a of V)M(s,a);return t}let c=class extends ${constructor(){super(...arguments),this.identifier="",this.sample=!1,this.loading=!1}render(){return m`
      <service-template
        serviceName="item-metadata"
        .usage=${me}
        .apiSource=${ye}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${b}
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
            ${this.result?this.renderResult(this.result):j}
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
    `}renderResult(e){return m`<code class="call">${e.call}</code> ${e.error?m`<code class="error">${e.error}</code>`:m`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${e.rows.map(t=>m`<tr>
                      <th scope="row">${t.name}</th>
                      <td>${t.type}</td>
                      <td>${t.value}</td>
                    </tr>`)}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${e.unmodeled.length?e.unmodeled.join(", "):"none"}
            </p>`}`}async run(e){e.preventDefault();const t=this.identifier.trim()||b,r=`https://archive.org/metadata/${encodeURIComponent(t)}`,s=`new Metadata(${this.sample?"sample":`response.metadata /* ${t} */`})`;this.loading=!0;try{let a;if(this.sample)a=he;else{const i=await fetch(r);if(!i.ok)throw new Error(`Request failed (${i.status})`);const h=await i.json();if(!h.metadata)throw new Error(`No item found for "${t}"`);a=h.metadata}const n=new w(a),l=V.map(i=>({name:i,value:M(n,i)})).filter(({value:i})=>i!==void 0).map(({name:i,value:h})=>({name:i,type:we(h),value:P(ge(h))})),x=be(a),D=Object.keys(a).filter(i=>!x.has(i)).sort();this.result={call:s,rows:l,unmodeled:D}}catch(a){this.result={call:this.sample?s:`fetch("${r}")`,rows:[],unmodeled:[],error:`${a instanceof Error?a.message:a}${this.sample?"":'. Try "Sample data".'}`}}finally{this.loading=!1}}static get styles(){return O`
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
    `}};y([g()],c.prototype,"identifier",2);y([g()],c.prototype,"sample",2);y([g()],c.prototype,"loading",2);y([g()],c.prototype,"result",2);c=y([_("item-metadata-story")],c);export{c as ItemMetadataStory};
