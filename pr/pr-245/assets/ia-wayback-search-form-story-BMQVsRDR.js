import{i as m,b as l,c as p}from"./index-Dv1aXEMY.js";import"./ia-wayback-search-form-x88Hvt5N.js";import"./story-template-BaEbxzao.js";import"./site-BxcH70Lm.js";/* empty css             */import"./localized-decorator-BpHuYfWJ.js";import"./topnav-wayback-logo-DPGPaZjz.js";import"./theme-styles-BZ8g0SKD.js";import"./syntax-highlighter-CxwKJZZE.js";var d=Object.getOwnPropertyDescriptor,y=(e,t,i,o)=>{for(var a=o>1?void 0:o?d(t,i):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends m{render(){return l`
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
