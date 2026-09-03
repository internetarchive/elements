import{w as b,n as h,t as v,i as g,b as u,a as m}from"./index-3p_iekfK.js";import{e as k}from"./query-x5bTgDQb.js";import{m as l}from"./runtime-CCgtQBty.js";const y=b`
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
`,w=b`
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
`,x=b`
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
`;var S=Object.defineProperty,q=Object.getOwnPropertyDescriptor,f=(r,e,s,t)=>{for(var a=t>1?void 0:t?q(e,s):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(a=(t?o(e,s,a):o(a))||a);return t&&a&&S(e,s,a),a};const $={SearchTermSelected:"searchTermSelected"};let p=class extends g{constructor(){super(...arguments),this.quickSearches=[]}render(){return u`
      <ul>
        ${this.quickSearches.map((r,e)=>u`
            <li>
              <button
                type="button"
                data-quick-search-index=${e}
                @click=${this.selectQuickSearch}
              >
                ${r.displayText}
              </button>
            </li>
          `)}
      </ul>
    `}selectQuickSearch(r){const{quickSearchIndex:e}=r.currentTarget.dataset;if(e===void 0)return;const s=this.quickSearches[parseInt(e,10)];s&&this.dispatchEvent(new CustomEvent($.SearchTermSelected,{detail:{searchEntry:s},bubbles:!0,composed:!0}))}static get styles(){return m`
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
    `}};f([h({type:Array})],p.prototype,"quickSearches",2);p=f([v("ia-quick-search")],p);var z=Object.defineProperty,E=Object.getOwnPropertyDescriptor,c=(r,e,s,t)=>{for(var a=t>1?void 0:t?E(e,s):e,n=r.length-1,o;n>=0;n--)(o=r[n])&&(a=(t?o(e,s,a):o(a))||a);return t&&a&&z(e,s,a),a};const d={InputChange:"inputchange",EnterKeyPressed:"enterKeyPressed",SearchCleared:"searchCleared",QuickSearchSelected:"quickSearchSelected"};let i=class extends g{constructor(){super(...arguments),this.isOpen=!1,this.showsDisclosure=!1,this.searchTerm="",this.quickSearches=[],this.placeholder=l("Search"),this.label=l("Search")}render(){return u`
      <div
        class="container ${this.isOpen?"is-open":""} ${this.showsDisclosure?"shows-disclosure":""}"
      >
        <div class="search-bar ${this.searchTerm===""?"":"is-searching"}">
          <div class="magnifier-container endcap">${x}</div>

          <input
            id="search-input"
            type="text"
            aria-label=${this.label}
            placeholder=${this.placeholder}
            .value=${this.searchTerm}
            @input=${this.handleInput}
            @keyup=${this.handleKeyUp}
          />

          <div class="clear-search-container endcap">
            <button
              id="clear-search-button"
              type="button"
              aria-label=${l("Clear search")}
              @click=${this.clearSearch}
            >
              ${y}
            </button>
          </div>

          <div class="disclosure-container endcap">
            <button
              id="disclosure-button"
              type="button"
              aria-label=${l("Toggle quick search")}
              aria-expanded=${this.isOpen}
              @click=${this.toggleDisclosure}
            >
              ${w}
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
    `}updated(r){!r.has("searchTerm")||!this.searchInput||(this.searchInput.value=this.searchTerm)}handleInput(){this.searchInput&&(this.searchTerm=this.searchInput.value,this.dispatchEvent(new CustomEvent(d.InputChange,{detail:{value:this.searchTerm}})))}handleKeyUp(r){r.key==="Enter"&&this.dispatchEvent(new CustomEvent(d.EnterKeyPressed,{detail:{value:this.searchTerm}}))}clearSearch(){this.searchTerm="",this.searchInput?.focus(),this.dispatchEvent(new Event(d.SearchCleared))}quickSearchSelected(r){const e=r.detail.searchEntry;this.searchTerm=e.displayText,this.dispatchEvent(new CustomEvent(d.QuickSearchSelected,{detail:{quickSearchEntry:e}})),this.searchInput?.focus(),this.isOpen=!1}toggleDisclosure(){this.isOpen=!this.isOpen}static get styles(){return m`
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
    `}};c([h({type:Boolean})],i.prototype,"isOpen",2);c([h({type:Boolean})],i.prototype,"showsDisclosure",2);c([h({type:String})],i.prototype,"searchTerm",2);c([h({type:Array})],i.prototype,"quickSearches",2);c([h({type:String})],i.prototype,"placeholder",2);c([h({type:String})],i.prototype,"label",2);c([k("#search-input")],i.prototype,"searchInput",2);i=c([v("ia-expandable-search-bar")],i);
