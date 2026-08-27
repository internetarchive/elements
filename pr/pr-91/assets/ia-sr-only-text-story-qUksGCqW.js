import{t as m,i as x,b as a,d as u,r as b}from"./index-M13tx3vo.js";import{t as d}from"./story-template-BicegKoQ.js";var h=Object.getOwnPropertyDescriptor,y=(o,e,n,r)=>{for(var t=r>1?void 0:r?h(e,n):e,s=o.length-1,i;s>=0;s--)(i=o[s])&&(t=i(t)||t);return t};let p=class extends x{render(){return a`
      <span class="sr-only">
        <slot></slot>
      </span>
    `}static get styles(){return[d,u`
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          margin: -1px !important;
          padding: 0 !important;
          border: 0 !important;
          overflow: hidden !important;
          white-space: nowrap !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          -webkit-clip-path: inset(50%) !important;
          clip-path: inset(50%) !important;
          user-select: none !important;
        }
      `]}};p=y([m("ia-sr-only-text")],p);var v=Object.defineProperty,f=Object.getOwnPropertyDescriptor,c=(o,e,n,r)=>{for(var t=r>1?void 0:r?f(e,n):e,s=o.length-1,i;s>=0;s--)(i=o[s])&&(t=(r?i(e,n,t):i(t))||t);return r&&t&&v(e,n,t),t};let l=class extends x{constructor(){super(...arguments),this.textVisible=!1}render(){return a`
      <story-template
        elementTag="ia-sr-only-text"
        elementClassName="IASrOnlyText"
        defaultSlottedContent="Sample text"
      >
        <div slot="demo">
          ${this.textVisible?"Sample Text":a`<ia-sr-only-text>Sample Text</ia-sr-only-text>`}
          <button @click=${()=>this.textVisible=!this.textVisible}>
            Make text ${this.textVisible?"sr-only":"visible"}
          </button>
        </div>
        <div slot="usage-notes">
          <p>
            Used to make text available for screen readers but not visible on
            the page.
          </p>
          <p>
            To see the hidden text in this demo, you can use the Chrome
            accessibility tree or your browser's equivalent.
          </p>
        </div>
      </story-template>
    `}};c([b()],l.prototype,"textVisible",2);l=c([m("ia-sr-only-text-story")],l);export{l as IAStatusIndicatorStory};
