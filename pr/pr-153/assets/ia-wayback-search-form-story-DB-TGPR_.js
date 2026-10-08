import{i as d,b as i,c as y}from"./index-DpQoML9j.js";import"./story-template-B-AFmlzJ.js";var m=Object.getOwnPropertyDescriptor,n=(e,t,l,o)=>{for(var a=o>1?void 0:o?m(t,l):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends d{render(){return i`
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
    `}};c=n([y("ia-wayback-search-form-story")],c);export{c as IAWaybackSearchFormStory};
