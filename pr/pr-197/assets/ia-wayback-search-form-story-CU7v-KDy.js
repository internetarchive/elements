import{i as m,b as l,c as p}from"./index-Br48-qL5.js";import"./ia-wayback-search-form-C2cH3i1h.js";import"./story-template-DS5Ec-k-.js";import"./site-BXJATSdx.js";/* empty css             */import"./localized-decorator-CQdmE_Dj.js";import"./topnav-wayback-logo-BcfYGuNg.js";import"./theme-styles-C-vlkmiD.js";import"./syntax-highlighter-DTAKMncr.js";var d=Object.getOwnPropertyDescriptor,y=(e,t,i,o)=>{for(var a=o>1?void 0:o?d(t,i):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends m{render(){return l`
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
