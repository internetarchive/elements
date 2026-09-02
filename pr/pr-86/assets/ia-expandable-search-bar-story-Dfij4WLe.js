import{i as d,b as s,a as p,r as h,t as u}from"./index-BSy7dZ9k.js";import"./ia-expandable-search-bar-Bgv6FQas.js";import"./story-template-DdFC3aJl.js";import"./query-TBMS6p8b.js";import"./runtime-CCgtQBty.js";var g=Object.defineProperty,m=Object.getOwnPropertyDescriptor,c=(e,a,r,o)=>{for(var t=o>1?void 0:o?m(a,r):a,l=e.length-1,i;l>=0;l--)(i=e[l])&&(t=(o?i(a,r,t):i(t))||t);return o&&t&&g(a,r,t),t};const b=[{displayText:"grateful dead",data:{collection:"etree"}},{displayText:"apollo 11",data:{collection:"nasa"}},{displayText:"old time radio",data:{collection:"oldtimeradio"}},{displayText:"prelinger archives",data:{collection:"prelinger"}},{displayText:"internet arcade",data:{collection:"internetarcade"}}],y=[{label:"Background",cssVariable:"--ia-theme-search-bar-background-color",defaultValue:"#000000",inputType:"color"},{label:"Text colour",cssVariable:"--ia-theme-search-bar-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Quick search link colour",cssVariable:"--ia-theme-quick-search-link-color",defaultValue:"#4484ca",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-search-bar-font-size",defaultValue:1,inputType:"range",min:.75,max:2,step:.05,unit:"em"},{label:"Quick search max height",cssVariable:"--ia-theme-search-bar-max-expansion-height",defaultValue:150,inputType:"range",min:40,max:300,step:10,unit:"px"}],f=[{label:"Shows disclosure",propertyName:"showsDisclosure",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Placeholder",propertyName:"placeholder",defaultValue:"Search"}],x=6;let n=class extends d{constructor(){super(...arguments),this.log=[]}render(){return s`
      <story-template
        elementTag="ia-expandable-search-bar"
        elementClassName="IAExpandableSearchBar"
        .styleInputData=${{settings:y}}
        .propInputData=${{settings:f}}
        .defaultUsageProps=${'.quickSearches=${[{ displayText: "grateful dead" }]}'}
      >
        <ia-expandable-search-bar
          slot="demo"
          class="search-bar"
          showsDisclosure
          .quickSearches=${b}
          @inputchange=${this.record}
          @enterKeyPressed=${this.record}
          @searchCleared=${this.record}
          @quickSearchSelected=${this.record}
        ></ia-expandable-search-bar>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${()=>this.log=[]}>Clear</button>
          </div>
          ${this.log.length===0?s`<p class="empty">
                Type in the bar, press Enter, or open the chevron and pick a
                suggestion.
              </p>`:s`<ol class="log">
                ${this.log.map(e=>s`<li><code>${e}</code></li>`)}
              </ol>`}
        </div>

        <div slot="usage-notes">
          <p>
            A search input with a list of suggested searches that drops out
            underneath it. The chevron only appears when
            <code>showsDisclosure</code> is set, and the list only opens when
            both that and <code>isOpen</code> are true.
          </p>
          <p>
            <code>inputchange</code> fires on every change to the field,
            including pastes and autofill, not just keystrokes.
            <code>enterKeyPressed</code> is separate, for running the search.
            Picking a suggestion emits <code>quickSearchSelected</code> with the
            whole entry, so the <code>data</code> you attached comes back to you
            and you don't need a lookup table.
          </p>
          <p>
            The clear button is only visible once there's something to clear.
          </p>
        </div>
      </story-template>
    `}record(e){const{detail:a}=e,r=a?` ${JSON.stringify(a)}`:"";this.log=[`${e.type}${r}`,...this.log].slice(0,x)}static get styles(){return p`
      .search-bar {
        display: block;
        background-color: #151515;
        padding: 1rem;
        border-radius: 4px;
        /* Room for the quick search list to drop into. */
        padding-bottom: 4rem;
      }

      .panel {
        margin-top: 1em;
      }

      .log-header {
        display: flex;
        align-items: center;
        gap: 0.5em;
        margin-bottom: 0.5em;
      }

      .log {
        margin: 0;
        padding-left: 1.5em;
        font-size: 0.9em;
        word-break: break-all;
      }

      .empty {
        font-size: 0.9em;
        font-style: italic;
      }
    `}};c([h()],n.prototype,"log",2);n=c([u("ia-expandable-search-bar-story")],n);export{n as IAExpandableSearchBarStory};
