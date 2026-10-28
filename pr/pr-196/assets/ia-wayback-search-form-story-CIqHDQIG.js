import{i as m,b as l,c as p}from"./index-6ai5C7Qa.js";import"./ia-wayback-search-form-D8uInEgX.js";import"./story-template-BZFZ-PvD.js";import"./site-D_llw0Pu.js";/* empty css             */import"./localized-decorator-Dm9Cr02c.js";import"./topnav-wayback-logo-BP4UTq9w.js";import"./theme-styles-C0IZdWiv.js";import"./syntax-highlighter-fHn8dos4.js";var d=Object.getOwnPropertyDescriptor,y=(e,t,i,o)=>{for(var a=o>1?void 0:o?d(t,i):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends m{render(){return l`
      <story-template
        elementTag="ia-wayback-search-form"
        elementClassName="IAWaybackSearchForm"
      >
        <div slot="demo">
          <ia-wayback-search-form
            .queryHandler=${{performQuery:e=>console.log(`Wayback search: ${e}`)}}
          ></ia-wayback-search-form>
        </div>
        <div slot="usage-notes">
          <p>
            Pass <code>queryHandler</code> to decide what a search does. By
            default it goes to the Wayback Machine's results for the query.
          </p>
          <p>
            <code>waybackPagesArchived</code> sets the page count in the intro.
            Left blank, it shows a localized default.
          </p>
        </div>
      </story-template>
    `}};c=y([p("ia-wayback-search-form-story")],c);export{c as IAWaybackSearchFormStory};
