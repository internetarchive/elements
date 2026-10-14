import{i as l,b as m,c as d}from"./index-L0pE0stt.js";import"./ia-wayback-search-form-DS6dX6_h.js";import"./story-template-CbHtZ5vW.js";import"./localized-decorator-CyawRMUk.js";import"./theme-styles-CfAfTI6T.js";import"./syntax-highlighter-DQ2x4Zeh.js";var y=Object.getOwnPropertyDescriptor,n=(e,t,i,o)=>{for(var a=o>1?void 0:o?y(t,i):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends l{render(){return m`
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
    `}};c=n([d("ia-wayback-search-form-story")],c);export{c as IAWaybackSearchFormStory};
