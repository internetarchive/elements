import{i as l,b as m,c as d}from"./index-D11LmYiw.js";import"./ia-wayback-search-form-Dk14APQB.js";import"./story-template-YEDK9e2M.js";import"./localized-decorator-o2vqWHB9.js";import"./topnav-wayback-logo-B5i701ur.js";import"./theme-styles-J-gdvsqD.js";import"./syntax-highlighter-Bc-qG51z.js";var p=Object.getOwnPropertyDescriptor,y=(e,t,i,o)=>{for(var a=o>1?void 0:o?p(t,i):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends l{render(){return m`
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
    `}};c=y([d("ia-wayback-search-form-story")],c);export{c as IAWaybackSearchFormStory};
