import{i as m,b as n,r as x,c as b}from"./index-D32Y9WQG.js";import"./ia-sr-only-text-D9w2MRCl.js";import"./story-template-BbCUAm7L.js";import"./site-BRoG7j6e.js";/* empty css             */import"./theme-styles-DFupAe_k.js";import"./syntax-highlighter-Bac4Kg7Z.js";var u=Object.defineProperty,c=Object.getOwnPropertyDescriptor,p=(a,e,r,s)=>{for(var t=s>1?void 0:s?c(e,r):e,i=a.length-1,o;i>=0;i--)(o=a[i])&&(t=(s?o(e,r,t):o(t))||t);return s&&t&&u(e,r,t),t};let l=class extends m{constructor(){super(...arguments),this.textVisible=!1}render(){return n`
      <story-template
        elementTag="ia-sr-only-text"
        elementClassName="IASrOnlyText"
        defaultSlottedContent="Sample text"
      >
        <div slot="demo">
          ${this.textVisible?"Sample Text":n`<ia-sr-only-text>Sample Text</ia-sr-only-text>`}
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
    `}};p([x()],l.prototype,"textVisible",2);l=p([b("ia-sr-only-text-story")],l);export{l as IAStatusIndicatorStory};
