import{_ as m,b as u,a as h}from"./clear-DFgY43In.js";import{v as b,t as f,a as g,s as _,b as y,c as v,d as x,p as $,l as w,e as S,f as C,g as z,h as I,i as k}from"./viewable-files-bGpu1e1w.js";import{_ as N,a as E,b as O,c as T,d as q,e as A,f as D,g as j,h as L,i as M}from"./mediatype-web-LiU5zOA0.js";import{p as P,n as R}from"./scrubber-previous-section-CZq1rMCA.js";import{i as F,A as U,b as p,a as Z,r as n,c as G}from"./index-D5XlxhYI.js";import{o as H}from"./style-map-BDqlGQZD.js";import{t as V}from"./theme-styles-BAgWSxwN.js";var W=Object.defineProperty,X=Object.getOwnPropertyDescriptor,a=(e,t,i,o)=>{for(var s=o>1?void 0:o?X(t,i):t,l=e.length-1,c;l>=0;l--)(c=e[l])&&(s=(o?c(t,i,s):c(s))||s);return o&&s&&W(t,i,s),s};const B=Object.assign({"../../icons/caret-closed.ts":h,"../../icons/caret-open.ts":u,"../../icons/clear.ts":m,"../../icons/collapse-sidebar.ts":k,"../../icons/ellipses.ts":I,"../../icons/email.ts":z,"../../icons/facebook.ts":C,"../../icons/link.ts":S,"../../icons/list.ts":w,"../../icons/mediatype-audio.ts":M,"../../icons/mediatype-collection.ts":L,"../../icons/mediatype-etree.ts":j,"../../icons/mediatype-images.ts":D,"../../icons/mediatype-software.ts":A,"../../icons/mediatype-texts.ts":q,"../../icons/mediatype-tv.ts":T,"../../icons/mediatype-video.ts":O,"../../icons/mediatype-web.ts":E,"../../icons/pinterest.ts":$,"../../icons/scrubber-next-section.ts":R,"../../icons/scrubber-previous-section.ts":P,"../../icons/search.ts":N,"../../icons/share.ts":x,"../../icons/sort-asc.ts":v,"../../icons/sort-desc.ts":y,"../../icons/sort-neutral.ts":_,"../../icons/tumblr.ts":g,"../../icons/twitter.ts":f,"../../icons/viewable-files.ts":b}),J=new Set(["break","case","catch","class","const","continue","debugger","default","delete","do","else","enum","export","extends","false","finally","for","function","if","import","in","instanceof","new","null","return","super","switch","this","throw","true","try","typeof","var","void","while","with","yield","let","static","await","implements","interface","package","private","protected","public"]);function K(e){const t=e.replace(/-([a-z0-9])/g,(i,o)=>o.toUpperCase());return/^[0-9]/.test(t)||J.has(t)?`icon${t.charAt(0).toUpperCase()}${t.slice(1)}`:t}const d=Object.entries(B).map(([e,t])=>{const i=e.slice(e.lastIndexOf("/")+1).replace(/\.ts$/,""),o=K(i);return{name:i,identifier:o,importLine:`import ${o} from '@internetarchive/elements/icons/${i}';`,template:t}}).sort((e,t)=>e.name.localeCompare(t.name)),Q=32,Y=8,ee=128;function te(e){const t=e.match(/\d+(\.\d+)?/g)?.slice(0,3)??[];return t.length<3?"#000000":`#${t.map(i=>Math.round(Number(i)).toString(16).padStart(2,"0")).join("")}`}let r=class extends F{constructor(){super(...arguments),this.query="",this.size=Q,this.copiedName=null}get filtered(){const e=this.query.trim().toLowerCase();return d.filter(t=>t.name.includes(e))}get inheritedColor(){return te(getComputedStyle(this).color)}render(){const e=this.filtered,t={color:this.color,fontSize:`${this.size}px`};return p`
      <div id="container">
        <h2>Icons</h2>
        <div class="controls">
          <label class="field">
            <span>Search icons</span>
            <input
              id="search"
              type="search"
              autocomplete="off"
              autocapitalize="none"
              spellcheck="false"
              placeholder="Filter by name"
              .value=${this.query}
              @input=${this.onSearch}
            />
          </label>
          <div class="field">
            <label for="color">Color</label>
            <span class="inline">
              <input
                id="color"
                type="color"
                .value=${this.color??this.inheritedColor}
                @input=${this.onColor}
              />
              <button id="reset-color" type="button" @click=${this.resetColor}>
                Reset
              </button>
            </span>
          </div>
          <div class="field">
            <label for="size">Size: ${this.size}px</label>
            <input
              id="size"
              type="range"
              min=${Y}
              max=${ee}
              step="1"
              .value=${String(this.size)}
              @input=${this.onSize}
            />
          </div>
        </div>
        <p id="count" role="status">
          ${e.length} of ${d.length} icons
        </p>
        ${e.length===0?p`<p id="empty">No icons match "${this.query.trim()}".</p>`:U}
        <ul class="grid" style=${H(t)}>
          ${e.map(i=>this.renderCard(i))}
        </ul>
      </div>
    `}renderCard(e){const t=this.copiedName===e.name;return p`
      <li class="card" data-name=${e.name}>
        <div class="glyph">${e.template}</div>
        <div class="name">${e.name}</div>
        <code class="import">${e.importLine}</code>
        <button
          class="copy-btn ${t?"copied":""}"
          type="button"
          aria-label="${t?"Copied":"Copy"} import line for ${e.name}"
          @click=${()=>this.copyImport(e)}
        >
          ${t?"Copied!":"Copy"}
        </button>
      </li>
    `}onSearch(e){this.query=e.target.value}onColor(e){this.color=e.target.value}resetColor(){this.color=void 0}onSize(e){this.size=Number(e.target.value)}async copyImport(e){try{await navigator.clipboard.writeText(e.importLine),this.copiedName=e.name,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedName=null,2e3)}catch(t){console.warn("Clipboard write failed:",t)}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}static get styles(){return[V,Z`
        :host {
          display: block;
        }

        #container {
          padding: 0 10px 10px;
          margin-bottom: 1rem;
          border: 1px solid rgba(128, 128, 128, 0.5);
        }

        h2 {
          font-size: 0.85rem;
          font-weight: 600;
          margin: 10px 0 8px;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 24px;
          align-items: flex-end;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8rem;
        }

        .inline {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        input[type='search'] {
          min-width: 14rem;
        }

        input,
        button {
          font: inherit;
          color: inherit;
          background: transparent;
          border: 1px solid rgba(128, 128, 128, 0.7);
          border-radius: 3px;
          padding: 3px 7px;
        }

        input[type='color'] {
          width: 3rem;
          height: 1.9rem;
          padding: 2px;
        }

        input[type='range'] {
          padding: 0;
        }

        button {
          cursor: pointer;
        }

        button:hover {
          background: rgba(128, 128, 128, 0.2);
        }

        input:focus-visible,
        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        #count,
        #empty {
          font-size: 0.8rem;
          margin: 10px 0;
        }

        .grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
          gap: 10px;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          min-width: 0;
          padding: 10px;
          border: 1px solid rgba(128, 128, 128, 0.5);
          border-radius: 4px;
        }

        .glyph {
          display: flex;
          align-items: center;
          line-height: 1;
          min-height: 1em;
        }

        .name {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .import {
          font-size: 0.7rem;
          overflow-wrap: anywhere;
        }

        .copy-btn {
          font-size: 0.7rem;
          line-height: 1.4;
          padding: 1px 7px;
        }

        .copy-btn.copied {
          background: #2a7a2a;
          border-color: #2a7a2a;
          color: #fff;
        }
      `]}};a([n()],r.prototype,"query",2);a([n()],r.prototype,"color",2);a([n()],r.prototype,"size",2);a([n()],r.prototype,"copiedName",2);r=a([G("ia-icon-gallery-story")],r);export{r as IAIconGalleryStory,d as galleryIcons,K as toIdentifier};
