import{i as m,b as l,c as p}from"./index-DVPpNmLr.js";import"./ia-wayback-search-form-y8W1ChQj.js";import"./story-template-DODBAF-3.js";import"./site-Irkwv8Te.js";/* empty css             */import"./localized-decorator-D377pQJj.js";import"./topnav-wayback-logo-D_39Xuvq.js";import"./theme-styles-2UtTA0D8.js";import"./syntax-highlighter-Ve__dR3-.js";var d=Object.getOwnPropertyDescriptor,y=(e,t,i,o)=>{for(var a=o>1?void 0:o?d(t,i):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends m{render(){return l`
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
