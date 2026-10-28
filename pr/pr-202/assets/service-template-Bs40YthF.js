import{r as p,n as r,c as h,i as c,j as g,b as m,a as u}from"./index-C8elhu2K.js";import"./syntax-highlighter-OueJSpdu.js";import{t as f}from"./theme-styles-BLjYrZWB.js";var v=Object.defineProperty,y=Object.getOwnPropertyDescriptor,t=(s,a,n,o)=>{for(var i=o>1?void 0:o?y(a,n):a,l=s.length-1,d;l>=0;l--)(d=s[l])&&(i=(o?d(a,n,i):d(i))||i);return o&&i&&v(a,n,i),i};let e=class extends c{constructor(){super(...arguments),this.serviceName="",this.usage="",this.apiSource="",this.focused=!1,this.detailsVisible=!1}willUpdate(s){s.has("serviceName")&&(this.focused=this.serviceName===g(window.location.hash),this.detailsVisible=this.focused)}render(){return m`
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
    `}get defaultImport(){return`import '@internetarchive/elements/services/${this.importPath??`${this.serviceName}/${this.serviceName}`}';`}static get styles(){return[f,u`
        #container {
          background: var(--ia-color-surface-raised--);
          padding: 0 var(--ia-space-3--) var(--ia-space-3--);
          margin-bottom: 1.6rem;
          border: var(--ia-border-card--);
          border-radius: var(--ia-radius-default--);
          box-shadow: var(--ia-shadow-raised--);
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
          font-size: 1.36rem;
          font-weight: 600;
          margin: 10px 0 8px;
        }

        h3 {
          font-size: 1.12rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ia-color-text-secondary--);
          margin: 8px 0 4px;
        }

        .details-toggle {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
          font-size: 1.12rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--ia-color-text-secondary--);
          cursor: pointer;
          user-select: none;
          border: none;
          background: none;
          padding: 0;
        }

        .details-toggle::before {
          content: '▾';
          font-size: 1.04rem;
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
          --syntax-max-height: 12.8rem;
        }

        .details-inner.focused syntax-highlighter {
          --syntax-max-height: none;
        }
      `]}};t([r({type:String})],e.prototype,"serviceName",2);t([r({type:String})],e.prototype,"importPath",2);t([r({type:String})],e.prototype,"importCode",2);t([r({type:String})],e.prototype,"usage",2);t([r({type:String})],e.prototype,"apiSource",2);t([p()],e.prototype,"focused",2);t([p()],e.prototype,"detailsVisible",2);e=t([h("service-template")],e);
