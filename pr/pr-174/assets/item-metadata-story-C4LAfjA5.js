import{i as T,A as x,b as c,a as P,r as f,c as D}from"./index-CNl2NISN.js";import"./service-template-CPl5j3-P.js";import{A as $,a as j,B as V,b as S,C as A,c as O,d as R,e as I,D as k,f as E,E as _,g as z,F as N,L as K,M as C,h as y,i as L,N as U,j as B,P as q,R as G,S as J,k as W,T as H,l as Q,U as X,m as Y}from"./review-C4txggvr.js";import"./theme-styles-B7TfH86D.js";import"./string-B_v7wtUf.js";const Z=`import { Memoize } from 'typescript-memoize';
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
`,ee=`import type { Metadata } from './metadata';
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
`,te=Object.freeze(Object.defineProperty({__proto__:null,AspectRatioField:$,AspectRatioParser:j,BooleanField:V,ByteField:S,ChecksumField:A,ChecksumParser:O,CurationField:R,CurationParser:I,DateField:k,DurationField:E,EnumField:_,EnumParser:z,File:N,ListField:K,MediaTypeField:C,Metadata:y,MetadataField:L,NumberField:U,NumberListField:B,PageProgressionField:q,Review:G,StringField:J,StringListField:W,TunerField:H,TunerParser:Q,UtcOffsetField:X,UtcOffsetParser:Y},Symbol.toStringTag,{value:"Module"}));var ae=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,p=(e,t,n,s)=>{for(var a=s>1?void 0:s?ne(t,n):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(a=(s?l(t,n,a):l(a))||a);return s&&a&&ae(t,n,a),a};const m=y,u="nasa",re={identifier:"sample-item",mediatype:"movies",title:"A sample item",creator:"Internet Archive",subject:["sample","demo","metadata"],addeddate:"2021-05-20 13:37:15",publicdate:"2021-05-21 08:00:00",runtime:"1:02:03",item_size:"123456789",downloads:"42",imagecount:"17","access-restricted-item":"true",mystery_field:"a key the model does not read"},se=`import { Metadata } from '@internetarchive/elements/services/item-metadata/item-metadata';

const response = await fetch('https://archive.org/metadata/nasa');
const { metadata } = await response.json();

const item = new Metadata(metadata);
item.title?.value; // string
item.addeddate?.value; // Date
item.item_size?.value; // number of bytes`,ie=e=>e.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),oe=[Z,ee].map(ie).join(`

`),w=Object.getOwnPropertyNames(m.prototype).filter(e=>typeof Object.getOwnPropertyDescriptor(m.prototype,e)?.get=="function").sort(),g=(e,t)=>e[t],b=e=>typeof e=="object"&&e!==null&&"rawValue"in e,h=e=>{let t=0;for(let n=Object.getPrototypeOf(e);n;n=Object.getPrototypeOf(n))t+=1;return t};function le(e){return b(e)?Object.entries(te).filter(([,n])=>typeof n=="function"&&e instanceof n).sort(([,n],[,s])=>h(s)-h(n))[0]?.[0]??"unknown":typeof e}function de(e){if(!b(e))return e;const t=e.values;return Array.isArray(t)?t:e.value}function v(e){return e==null?"—":e instanceof Date?e.toISOString():Array.isArray(e)?e.map(v).join(", "):typeof e=="object"?JSON.stringify(e):String(e)}function ce(e){const t=new Set,n=new Proxy(e,{get(a,i){return typeof i=="string"&&t.add(i),Reflect.get(a,i)}}),s=new m(n);for(const a of w)g(s,a);return t}let o=class extends T{constructor(){super(...arguments),this.identifier="",this.sample=!1,this.loading=!1}render(){return c`
      <service-template
        serviceName="item-metadata"
        .usage=${se}
        .apiSource=${oe}
      >
        <form slot="console" @submit=${this.run}>
          <label class="id">
            archive.org identifier
            <input
              type="text"
              placeholder=${u}
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
            ${this.result?this.renderResult(this.result):x}
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
    `}renderResult(e){return c`<code class="call">${e.call}</code> ${e.error?c`<code class="error">${e.error}</code>`:c`<table>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">Parsed by</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                ${e.rows.map(t=>c`<tr>
                      <th scope="row">${t.name}</th>
                      <td>${t.type}</td>
                      <td>${t.value}</td>
                    </tr>`)}
              </tbody>
            </table>
            <p class="unmodeled">
              Not read by the model:
              ${e.unmodeled.length?e.unmodeled.join(", "):"none"}
            </p>`}`}async run(e){e.preventDefault();const t=this.identifier.trim()||u,n=`https://archive.org/metadata/${encodeURIComponent(t)}`,s=`new Metadata(${this.sample?"sample":`response.metadata /* ${t} */`})`;this.loading=!0;try{let a;if(this.sample)a=re;else{const r=await fetch(n);if(!r.ok)throw new Error(`Request failed (${r.status})`);const d=await r.json();if(!d.metadata)throw new Error(`No item found for "${t}"`);a=d.metadata}const i=new m(a),l=w.map(r=>({name:r,value:g(i,r)})).filter(({value:r})=>r!==void 0).map(({name:r,value:d})=>({name:r,type:le(d),value:v(de(d))})),F=ce(a),M=Object.keys(a).filter(r=>!F.has(r)).sort();this.result={call:s,rows:l,unmodeled:M}}catch(a){this.result={call:this.sample?s:`fetch("${n}")`,rows:[],unmodeled:[],error:`${a instanceof Error?a.message:a}${this.sample?"":'. Try "Sample data".'}`}}finally{this.loading=!1}}static get styles(){return P`
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
    `}};p([f()],o.prototype,"identifier",2);p([f()],o.prototype,"sample",2);p([f()],o.prototype,"loading",2);p([f()],o.prototype,"result",2);o=p([D("item-metadata-story")],o);export{o as ItemMetadataStory};
