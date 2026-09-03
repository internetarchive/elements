import{w as g,n as h,t as m,i as v,b as l,a as f,r as w}from"./index-Bpi7JUlY.js";import{e as x}from"./query-BgUB2UxF.js";import{m as d}from"./runtime-CCgtQBty.js";import"./story-template-CYWOjSQS.js";const S=g`
<svg
  height="12"
  viewBox="0 0 12 12"
  width="12"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <g fill="none" fill-rule="evenodd">
    <circle cx="6" cy="6" r="6" class="clear-disc" />
    <g class="clear-cross" stroke-linecap="round">
      <path d="m3.375 3.375 5.18412641 5.18412641" />
      <path
        d="m3.375 3.375 5.18412641 5.18412641"
        transform="matrix(-1 0 0 1 12 0)"
      />
    </g>
  </g>
</svg>
`,$=g`
<svg
  height="9"
  viewBox="0 0 19 9"
  width="19"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m1 1 9 7 8-7"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
  />
</svg>
`,q=g`
<svg
  height="14"
  viewBox="0 0 14 14"
  width="14"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="m5.17668106 0c-2.859002 0-5.17668106 2.31767906-5.17668106 5.17668106 0 2.85900201 2.31767906 5.17668104 5.17668106 5.17668104.98756168.0210349 1.96052598-.240917 2.80403558-.75493263l4.09820586 4.20605333 1.7255603-1.7255603-4.20605333-4.09820586c.51401563-.8435096.77596753-1.8164739.75493263-2.80403558 0-2.859002-2.31767903-5.17668106-5.17668104-5.17668106m0 1.72556035c1.90600134 0 3.45112071 1.54511938 3.45112071 3.45112071 0 1.90600134-1.54511937 3.45112071-3.45112071 3.45112071-1.90600133 0-3.45112071-1.54511937-3.45112071-3.45112071 0-1.90600133 1.54511938-3.45112071 3.45112071-3.45112071"
    fill="currentColor"
  />
</svg>
`;var T=Object.defineProperty,I=Object.getOwnPropertyDescriptor,y=(e,r,t,s)=>{for(var a=s>1?void 0:s?I(r,t):r,i=e.length-1,c;i>=0;i--)(c=e[i])&&(a=(s?c(r,t,a):c(a))||a);return s&&a&&T(r,t,a),a};const E={SearchTermSelected:"searchTermSelected"};let p=class extends v{constructor(){super(...arguments),this.quickSearches=[]}render(){return l`
      <ul>
        ${this.quickSearches.map((e,r)=>l`
            <li>
              <button
                type="button"
                data-quick-search-index=${r}
                @click=${this.selectQuickSearch}
              >
                ${e.displayText}
              </button>
            </li>
          `)}
      </ul>
    `}selectQuickSearch(e){const{quickSearchIndex:r}=e.currentTarget.dataset;if(r===void 0)return;const t=this.quickSearches[parseInt(r,10)];t&&this.dispatchEvent(new CustomEvent(E.SearchTermSelected,{detail:{searchEntry:t},bubbles:!0,composed:!0}))}static get styles(){return f`
      :host {
        --quick-search-list-padding--: var(
          --ia-theme-quick-search-list-padding,
          0 0 0.5em 0
        );
        --quick-search-list-item-padding--: var(
          --ia-theme-quick-search-list-item-padding,
          0.5em 0 0 0
        );
        --quick-search-link-color--: var(
          --ia-theme-quick-search-link-color,
          rgb(68, 132, 202)
        );
        --quick-search-link-decoration--: var(
          --ia-theme-quick-search-link-decoration,
          none
        );
      }

      ul {
        padding: var(--quick-search-list-padding--);
        margin: 0;
        list-style: none;
      }

      ul li {
        padding: var(--quick-search-list-item-padding--);
        margin: 0;
        display: block;
      }

      /*
        A button rather than a link, since picking an entry runs a search in
        place rather than navigating. Stripped back so it reads as plain text
        while staying focusable and keyboard-operable.
      */
      ul li button {
        display: block;
        width: 100%;
        padding: 0;
        border: none;
        background: none;
        font: inherit;
        text-align: left;
        color: var(--quick-search-link-color--);
        text-decoration: var(--quick-search-link-decoration--);
        cursor: pointer;
      }
    `}};y([h({type:Array})],p.prototype,"quickSearches",2);p=y([m("ia-quick-search")],p);var O=Object.defineProperty,z=Object.getOwnPropertyDescriptor,n=(e,r,t,s)=>{for(var a=s>1?void 0:s?z(r,t):r,i=e.length-1,c;i>=0;i--)(c=e[i])&&(a=(s?c(r,t,a):c(a))||a);return s&&a&&O(r,t,a),a};const u={InputChange:"inputchange",EnterKeyPressed:"enterKeyPressed",SearchCleared:"searchCleared",QuickSearchSelected:"quickSearchSelected"};let o=class extends v{constructor(){super(...arguments),this.isOpen=!1,this.showsDisclosure=!1,this.searchTerm="",this.quickSearches=[],this.placeholder=d("Search"),this.label=d("Search"),this.enterWentDownOnInput=!1}render(){return l`
      <div
        class="container ${this.isOpen?"is-open":""} ${this.showsDisclosure?"shows-disclosure":""}"
      >
        <div class="search-bar ${this.searchTerm===""?"":"is-searching"}">
          <div class="magnifier-container endcap">${q}</div>

          <input
            id="search-input"
            type="text"
            aria-label=${this.label}
            placeholder=${this.placeholder}
            .value=${this.searchTerm}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            @keyup=${this.handleKeyUp}
          />

          <div class="clear-search-container endcap">
            <button
              id="clear-search-button"
              type="button"
              aria-label=${d("Clear search")}
              @click=${this.clearSearch}
            >
              ${S}
            </button>
          </div>

          <div class="disclosure-container endcap">
            <button
              id="disclosure-button"
              type="button"
              aria-label=${d("Toggle quick search")}
              aria-expanded=${this.isOpen}
              @click=${this.toggleDisclosure}
            >
              ${$}
            </button>
          </div>
        </div>

        <div class="quick-search">
          <ia-quick-search
            .quickSearches=${this.quickSearches}
            @searchTermSelected=${this.quickSearchSelected}
          ></ia-quick-search>
        </div>
      </div>
    `}updated(e){!e.has("searchTerm")||!this.searchInput||(this.searchInput.value=this.searchTerm)}handleInput(){this.searchInput&&(this.searchTerm=this.searchInput.value,this.dispatchEvent(new CustomEvent(u.InputChange,{detail:{value:this.searchTerm}})))}handleKeyDown(e){e.key==="Enter"&&(this.enterWentDownOnInput=!0)}handleKeyUp(e){e.key==="Enter"&&this.enterWentDownOnInput&&(this.enterWentDownOnInput=!1,this.dispatchEvent(new CustomEvent(u.EnterKeyPressed,{detail:{value:this.searchTerm}})))}clearSearch(){this.searchTerm="",this.searchInput?.focus(),this.dispatchEvent(new Event(u.SearchCleared))}quickSearchSelected(e){const r=e.detail.searchEntry;this.searchTerm=r.displayText,this.dispatchEvent(new CustomEvent(u.QuickSearchSelected,{detail:{quickSearchEntry:r}})),this.enterWentDownOnInput=!1,this.searchInput?.focus(),this.isOpen=!1}toggleDisclosure(){this.isOpen=!this.isOpen}static get styles(){return f`
      :host {
        --search-bar-background-color--: var(
          --ia-theme-search-bar-background-color,
          #000
        );
        --search-bar-text-color--: var(--ia-theme-search-bar-text-color, #fff);
        --search-bar-font-size--: var(--ia-theme-search-bar-font-size, 1em);
        --search-bar-border--: var(
          --ia-theme-search-bar-border,
          1px solid #fff
        );
        --search-bar-min-width--: var(--ia-theme-search-bar-min-width, 5em);
        --search-bar-max-expansion-height--: var(
          --ia-theme-search-bar-max-expansion-height,
          150px
        );
        --search-bar-clear-disc-color--: var(
          --ia-theme-search-bar-clear-disc-color,
          #fff
        );
        --search-bar-clear-cross-color--: var(
          --ia-theme-search-bar-clear-cross-color,
          #000
        );

        color: var(--search-bar-text-color--);
      }

      .container {
        position: relative;
      }

      .search-bar {
        display: flex;
        justify-content: flex-start;
      }

      .endcap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(var(--search-bar-font-size--) * 2);
        border: var(--search-bar-border--);
        padding: 0 calc(var(--search-bar-font-size--) / 2);
      }

      .endcap svg {
        height: var(--search-bar-font-size--);
        width: var(--search-bar-font-size--);
      }

      .clear-disc {
        fill: var(--search-bar-clear-disc-color--);
      }

      .clear-cross {
        stroke: var(--search-bar-clear-cross-color--);
      }

      .clear-search-container {
        border-left: 0;
        border-radius: 0 var(--search-bar-font-size--)
          var(--search-bar-font-size--) 0;
      }

      .search-bar.is-searching .clear-search-container {
        padding: 0 calc(var(--search-bar-font-size--) / 2) 0 0;
      }

      .search-bar.is-searching .clear-search-container button {
        display: block;
      }

      .clear-search-container button {
        display: none;
      }

      .magnifier-container {
        border-radius: var(--search-bar-font-size--) 0 0
          var(--search-bar-font-size--);
        border-right: 0;
      }

      .container.is-open .magnifier-container {
        border-radius: var(--search-bar-font-size--) 0 0 0;
      }

      .container.shows-disclosure .clear-search-container {
        border-radius: 0;
        border-right: 0;
      }

      .disclosure-container {
        border-radius: 0 var(--search-bar-font-size--)
          var(--search-bar-font-size--) 0;
        display: none;
      }

      .container.shows-disclosure .disclosure-container {
        display: flex;
      }

      .container.is-open .disclosure-container {
        border-radius: 0 var(--search-bar-font-size--) 0 0;
      }

      .disclosure-container button {
        border: 0;
        background: none;
      }

      #search-input {
        border-top: var(--search-bar-border--);
        border-bottom: var(--search-bar-border--);
        border-left: 0;
        border-right: 0;
        border-radius: 0;
        background-color: var(--search-bar-background-color--);
        color: var(--search-bar-text-color--);
        padding: 0;
        margin: 0;
        font-size: var(--search-bar-font-size--);
        flex: 1 1 auto;
        min-width: var(--search-bar-min-width--);
      }

      #search-input:focus {
        outline: none;
      }

      .quick-search {
        border-radius: 0 0 var(--search-bar-font-size--)
          var(--search-bar-font-size--);
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        background-color: var(--search-bar-background-color--);
        z-index: 1;
        max-height: var(--search-bar-max-expansion-height--);
        overflow-y: auto;
        scrollbar-width: none;
        padding: 0 calc(var(--search-bar-font-size--) / 2);
      }

      .quick-search::-webkit-scrollbar {
        display: none;
      }

      .container.is-open.shows-disclosure .quick-search {
        border: var(--search-bar-border--);
        border-top: 0;
        display: block;
      }

      button {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        color: inherit;
        cursor: pointer;
      }
    `}};n([h({type:Boolean})],o.prototype,"isOpen",2);n([h({type:Boolean})],o.prototype,"showsDisclosure",2);n([h({type:String})],o.prototype,"searchTerm",2);n([h({type:Array})],o.prototype,"quickSearches",2);n([h({type:String})],o.prototype,"placeholder",2);n([h({type:String})],o.prototype,"label",2);n([x("#search-input")],o.prototype,"searchInput",2);o=n([m("ia-expandable-search-bar")],o);var D=Object.defineProperty,_=Object.getOwnPropertyDescriptor,k=(e,r,t,s)=>{for(var a=s>1?void 0:s?_(r,t):r,i=e.length-1,c;i>=0;i--)(c=e[i])&&(a=(s?c(r,t,a):c(a))||a);return s&&a&&D(r,t,a),a};const C=[{displayText:"grateful dead",data:{collection:"etree"}},{displayText:"apollo 11",data:{collection:"nasa"}},{displayText:"old time radio",data:{collection:"oldtimeradio"}},{displayText:"prelinger archives",data:{collection:"prelinger"}},{displayText:"internet arcade",data:{collection:"internetarcade"}}],P=[{label:"Background",cssVariable:"--ia-theme-search-bar-background-color",defaultValue:"#000000",inputType:"color"},{label:"Text colour",cssVariable:"--ia-theme-search-bar-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Quick search link colour",cssVariable:"--ia-theme-quick-search-link-color",defaultValue:"#4484ca",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-search-bar-font-size",defaultValue:1,inputType:"range",min:.75,max:2,step:.05,unit:"em"},{label:"Quick search max height",cssVariable:"--ia-theme-search-bar-max-expansion-height",defaultValue:150,inputType:"range",min:40,max:300,step:10,unit:"px"}],V=[{label:"Shows disclosure",propertyName:"showsDisclosure",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Placeholder",propertyName:"placeholder",defaultValue:"Search"}],j=6;let b=class extends v{constructor(){super(...arguments),this.log=[]}render(){return l`
      <story-template
        elementTag="ia-expandable-search-bar"
        elementClassName="IAExpandableSearchBar"
        .styleInputData=${{settings:P}}
        .propInputData=${{settings:V}}
        .defaultUsageProps=${'.quickSearches=${[{ displayText: "grateful dead" }]}'}
      >
        <ia-expandable-search-bar
          slot="demo"
          class="search-bar"
          showsDisclosure
          .quickSearches=${C}
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
          ${this.log.length===0?l`<p class="empty">
                Type in the bar, press Enter, or open the chevron and pick a
                suggestion.
              </p>`:l`<ol class="log">
                ${this.log.map(e=>l`<li><code>${e}</code></li>`)}
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
    `}record(e){const{detail:r}=e,t=r?` ${JSON.stringify(r)}`:"";this.log=[`${e.type}${t}`,...this.log].slice(0,j)}static get styles(){return f`
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
    `}};k([w()],b.prototype,"log",2);b=k([m("ia-expandable-search-bar-story")],b);export{b as IAExpandableSearchBarStory};
