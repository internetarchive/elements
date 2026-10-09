import{r as I,n as l,c as z,i as O,h as U,b as V,a as k}from"./index-DeiS5TB1.js";import{t as J}from"./theme-styles-BDGxX9an.js";const d=class d{parseValue(e){if(typeof e=="string"){const t=e.trim().toLowerCase();if(t==="false"||t==="0"||t==="no")return!1;if(t==="true"||t==="1"||t==="yes")return!0}return!!e}};d.shared=new d;let $=d;const c=class c{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}};c.shared=new c;let b=c;const h=class h{parseValue(e){return b.shared.parseValue(e)}};h.shared=new h;let S=h;const m=class m{parseValue(e){return this.parseCompactDate(e)||this.parseJSDate(e)||this.parseBracketDate(e)}parseCompactDate(e){if(typeof e!="string")return;const t=e.trim().match(/^(\d{4})(\d{2})(\d{2})(?:(\d{2})(\d{2})(\d{2}))?$/);if(!t)return;const[,i,s,r,o="00",x="00",v="00"]=t,N=new Date(`${i}-${s}-${r}T${o}:${x}:${v}`);return Number.isNaN(N.getTime())?void 0:N}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let s=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(s=new Date(s.getTime()+s.getTimezoneOffset()*1e3*60)),s}};m.shared=new m;let C=m;const f=class f{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((s,r)=>{const o=parseFloat(s);if(Number.isNaN(o))return t=!0,0;const v=60**(e.length-1-r);return o*Math.floor(v)}).reduce((s,r)=>s+r,0);return t?void 0:i}};f.shared=new f;let D=f;const g=class g{parseValue(e){if(typeof e=="string")return e}};g.shared=new g;let w=g;const u=class u{parseValue(e){if(typeof e=="string")return e}};u.shared=new u;let T=u;const y=class y{parseValue(e){return String(e)}};y.shared=new y;let F=y;var j=Object.defineProperty,A=Object.getOwnPropertyDescriptor,n=(p,e,t,i)=>{for(var s=i>1?void 0:i?A(e,t):e,r=p.length-1,o;r>=0;r--)(o=p[r])&&(s=(i?o(e,t,s):o(s))||s);return i&&s&&j(e,t,s),s};let a=class extends O{constructor(){super(...arguments),this.serviceName="",this.usage="",this.apiSource="",this.focused=!1,this.detailsVisible=!1}willUpdate(p){p.has("serviceName")&&(this.focused=this.serviceName===U(window.location.hash),this.detailsVisible=this.focused)}render(){return V`
      <div id="container">
        <h2><code>${this.serviceName}</code></h2>
        <h3>Try it</h3>
        <div class="console">
          <slot name="console"></slot>
        </div>
        <button
          class="details-toggle ${this.detailsVisible?"expanded":"collapsed"}"
          aria-expanded="${this.detailsVisible}"
          @click=${()=>this.detailsVisible=!this.detailsVisible}
        >
          Import, Usage &amp; API
        </button>
        <div
          id="details"
          class="${this.detailsVisible?"expanded":"collapsed"}"
        >
          <div class="details-inner ${this.focused?"focused":""}">
            <h3>Import</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.importCode??this.defaultImport}
            ></syntax-highlighter>
            <h3>Usage</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.usage}
            ></syntax-highlighter>
            <h3>API</h3>
            <syntax-highlighter
              language="typescript"
              .code=${this.apiSource}
            ></syntax-highlighter>
            <slot name="usage-notes"></slot>
          </div>
        </div>
      </div>
    `}get defaultImport(){return`import '@internetarchive/elements/services/${this.importPath??`${this.serviceName}/${this.serviceName}`}';`}static get styles(){return[J,k`
        #container {
          background: #f0f0f0;
          padding: 0 10px 10px;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
        }

        #details {
          display: grid;
          grid-template-rows: 1fr;
          transition: grid-template-rows 0.2s ease;
        }

        #details.collapsed {
          grid-template-rows: 0fr;
        }

        .details-inner {
          font-size: 14px;
          overflow: hidden;
          min-height: 0;
        }

        h2 {
          font-size: 0.85rem;
          font-weight: 600;
          margin: 10px 0 8px;
        }

        h3 {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #666;
          margin: 8px 0 4px;
        }

        .details-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #595959;
          cursor: pointer;
          user-select: none;
          border: none;
          background: none;
          padding: 0;
        }

        .details-toggle::before {
          content: '▾';
          font-size: 0.65rem;
          display: inline-block;
          transition: transform 0.15s;
        }

        .details-toggle.collapsed::before {
          transform: rotate(-90deg);
        }

        .console {
          background-color: var(--primary-background-color);
          padding: 0.5em;
        }

        .details-inner syntax-highlighter {
          display: block;
          --syntax-max-height: 8rem;
        }

        .details-inner.focused syntax-highlighter {
          --syntax-max-height: none;
        }
      `]}};n([l({type:String})],a.prototype,"serviceName",2);n([l({type:String})],a.prototype,"importPath",2);n([l({type:String})],a.prototype,"importCode",2);n([l({type:String})],a.prototype,"usage",2);n([l({type:String})],a.prototype,"apiSource",2);n([I()],a.prototype,"focused",2);n([I()],a.prototype,"detailsVisible",2);a=n([z("service-template")],a);export{S as B,D,w as M,b as N,T as P,F as S,C as a,$ as b};
