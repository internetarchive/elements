import{i as m,b as n,r as x,c as b}from"./index-5YzlOJJz.js";import"./ia-sr-only-text-CDqpzGMI.js";import"./story-template-C7_40t-K.js";import"./site-ChfTGo1o.js";/* empty css             */import"./theme-styles-Xiv6nUb1.js";import"./syntax-highlighter-B4HnRPH2.js";var u=Object.defineProperty,c=Object.getOwnPropertyDescriptor,p=(a,e,r,s)=>{for(var t=s>1?void 0:s?c(e,r):e,i=a.length-1,o;i>=0;i--)(o=a[i])&&(t=(s?o(e,r,t):o(t))||t);return s&&t&&u(e,r,t),t};let l=class extends m{constructor(){super(...arguments),this.textVisible=!1}render(){return n`
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
