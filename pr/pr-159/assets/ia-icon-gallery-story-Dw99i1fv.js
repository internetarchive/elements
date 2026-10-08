import{w as d,i as u,A as h,b as p,a as g,r as n,c as f}from"./index-RtCK84DC.js";import{o as b}from"./style-map-BsP1xrtW.js";import{t as y}from"./theme-styles-CQlAYb18.js";const x=d`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 4" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  ></path></svg>`,v=d`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    fill-rule="evenodd"
    d="m10.5 17.5c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5c-1.38071187 0-2.5-1.1192881-2.5-2.5s1.11928813-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5z"
  /></svg>`,w=d`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    class="fill-color"
    d="m17.0555551 41.3194459c0-12.7430552 10.3541664-23.1027772 23.0847216-23.1027772 12.7166664 0 23.0777773 10.359722 23.0777773 23.1027772 0 12.7361108-10.3611109 23.0986106-23.0777773 23.0986106-12.7305552 0-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512 0c0 22.2916661 18.04583292 40.3472213 40.32777672 40.3472213 8.9208332 0 17.145833-2.9319449 23.8194439-7.8527776l24.1513883 24.0777771c1.2125 1.1402778 2.8430555 1.8430556 4.6374999 1.8430556 3.7444443 0 6.7805554-3.0361111 6.7805554-6.7791665 0-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665 7.0152776-14.3055552 7.0152776-22.7402772 0-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438 0-40.32777672 18.06944396-40.32777672 40.34861006z"
    fill="currentColor"
    fill-rule="evenodd"
  /></svg>`;var $=Object.defineProperty,_=Object.getOwnPropertyDescriptor,s=(e,t,i,o)=>{for(var r=o>1?void 0:o?_(t,i):t,a=e.length-1,c;a>=0;a--)(c=e[a])&&(r=(o?c(t,i,r):c(r))||r);return o&&r&&$(t,i,r),r};const z=Object.assign({"../../icons/caret-open.ts":x,"../../icons/ellipses.ts":v,"../../icons/search.ts":w});function C(e){const t=e.replace(/-([a-z0-9])/g,(i,o)=>o.toUpperCase());return/^[0-9]/.test(t)?`icon${t}`:t}const m=Object.entries(z).map(([e,t])=>{const i=e.slice(e.lastIndexOf("/")+1).replace(/\.ts$/,""),o=C(i);return{name:i,identifier:o,importLine:`import ${o} from '@internetarchive/elements/icons/${i}';`,template:t}}).sort((e,t)=>e.name.localeCompare(t.name)),S=32,I=8,N=128;function T(e){const t=e.match(/\d+(\.\d+)?/g)?.slice(0,3)??[];return t.length<3?"#000000":`#${t.map(i=>Math.round(Number(i)).toString(16).padStart(2,"0")).join("")}`}let l=class extends u{constructor(){super(...arguments),this.query="",this.size=S,this.copiedName=null}get filtered(){const e=this.query.trim().toLowerCase();return m.filter(t=>t.name.includes(e))}get inheritedColor(){return T(getComputedStyle(this).color)}render(){const e=this.filtered,t={color:this.color,fontSize:`${this.size}px`};return p`
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
              min=${I}
              max=${N}
              step="1"
              .value=${String(this.size)}
              @input=${this.onSize}
            />
          </div>
        </div>
        <p id="count" role="status">
          ${e.length} of ${m.length} icons
        </p>
        ${e.length===0?p`<p id="empty">No icons match "${this.query.trim()}".</p>`:h}
        <ul class="grid" style=${b(t)}>
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
    `}onSearch(e){this.query=e.target.value}onColor(e){this.color=e.target.value}resetColor(){this.color=void 0}onSize(e){this.size=Number(e.target.value)}async copyImport(e){try{await navigator.clipboard.writeText(e.importLine),this.copiedName=e.name,clearTimeout(this._copyTimeout),this._copyTimeout=setTimeout(()=>this.copiedName=null,2e3)}catch(t){console.warn("Clipboard write failed:",t)}}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this._copyTimeout)}static get styles(){return[y,g`
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
      `]}};s([n()],l.prototype,"query",2);s([n()],l.prototype,"color",2);s([n()],l.prototype,"size",2);s([n()],l.prototype,"copiedName",2);l=s([f("ia-icon-gallery-story")],l);export{l as IAIconGalleryStory,m as galleryIcons,C as toIdentifier};
