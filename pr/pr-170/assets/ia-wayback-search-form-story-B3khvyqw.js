import{i,b as m,c as d}from"./index-DDZ54UKr.js";import"./ia-wayback-search-form-Ehy676xX.js";import"./story-template-CUs-1LGT.js";import"./localized-decorator-DHv34ybr.js";import"./theme-styles-B68ek7dn.js";var y=Object.getOwnPropertyDescriptor,n=(e,t,l,o)=>{for(var a=o>1?void 0:o?y(t,l):t,r=e.length-1,s;r>=0;r--)(s=e[r])&&(a=s(a)||a);return a};let c=class extends i{render(){return m`
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
