import{n as h,e as u,c as C,i as _,A as w,b as c,m as y,a as S,r as g}from"./index-BUDmbTus.js";import{o as $}from"./map-Bv-shLAs.js";import"./story-template-DzER1Cl7.js";import{l as D}from"./localized-decorator-tq0sch2T.js";import{t as q}from"./theme-styles-HJu_aXr1.js";import{_ as T}from"./mediatype-web-COWxzEnj.js";import"./ia-clearable-text-input-BIwQfBYw.js";import"./ia-dropdown-Cf37iM1B.js";import"./ia-status-indicator-DaErl33W.js";import"./site-DWhqVh6I.js";/* empty css             */import"./syntax-highlighter-CEslrEDt.js";import"./query-assigned-elements-eGqlbK8c.js";import"./icon-box-DaJYXSQe.js";var k=Object.defineProperty,z=Object.getOwnPropertyDescriptor,s=(e,t,l,i)=>{for(var r=i>1?void 0:i?z(t,l):t,d=e.length-1,p;d>=0;d--)(p=e[d])&&(r=(i?p(t,l,r):p(r))||r);return i&&r&&k(t,l,r),r};const f={CategoryChanged:"categoryChanged",SearchRequested:"searchRequested"};let n=class extends _{constructor(){super(...arguments),this.categories=[],this.useMobileView=!1,this.hideDropdown=!1,this.loading=!1}get resolvedCategory(){return this.selectedCategory??this.categories?.[0]?.id??""}render(){return c`
      <div id="container" part="container" role="search">
        <div
          id="main-bar"
          part="main-bar"
          class=${this.hideDropdown?"no-dropdown":w}
        >
          ${this.hideDropdown?w:this.dropdownTemplate}
          ${this.textBoxTemplate} ${this.searchButtonTemplate}
        </div>
      </div>
    `}willUpdate(e){if(e.has("selectedCategory")||e.has("categories")){const t=this.resolvedCategory;this.categoryDropdown&&this.categoryDropdown.selectedOption!==t&&(this.categoryDropdown.selectedOption=t)}}get dropdownTemplate(){return c`
      <ia-dropdown
        id="category-dropdown"
        part="category-dropdown"
        displayCaret
        includeSelectedOption
        closeOnSelect
        closeOnEscape
        closeOnBackdropClick
        openViaButton
        .selectedOption=${this.resolvedCategory}
        .options=${this.categories}
        @optionSelected=${this.handleCategorySelected}
      >
        <span slot="dropdown-label" part="category-dropdown-label"
          >${this.selectedCategoryLabel}</span
        >
      </ia-dropdown>
    `}get textBoxTemplate(){return c`
      <ia-clearable-text-input
        id="search-input"
        part="search-input"
        .value=${this.spacedQuery}
        placeholder=${this.placeholder??y("Search")}
        clearButtonScreenReaderLabel=${y("Clear search query")}
        screenReaderLabel=${y("Search the Archive. Filters and Advanced Search available below.")}
        @clear=${this.searchFieldCleared}
        @submit=${this.handleSubmit}
      ></ia-clearable-text-input>
    `}get searchButtonTemplate(){return c`
      <button
        id="search-button"
        part="search-button"
        class=${this.loading?"loading":w}
        type="button"
        aria-label=${y("Search")}
        @click=${this.handleSubmit}
      >
        ${this.loading?c`<ia-status-indicator
              mode="loading"
              class="search-button-loading-icon"
            ></ia-status-indicator>`:T}
      </button>
    `}get selectedCategoryLabel(){return this.categories.find(t=>t.id===this.resolvedCategory)?.label??this.resolvedCategory}get spacedQuery(){return this.query?.replace(/\+/g," ")??""}searchFieldCleared(){this.query&&this.emitSearchRequested()}handleSubmit(){this.emitSearchRequested()}handleCategorySelected(e){const t=e.detail.option.id;t!==this.resolvedCategory&&(this.selectedCategory=t,setTimeout(()=>this.searchInput.focus()),this.dispatchEvent(new CustomEvent(f.CategoryChanged,{detail:t})))}emitSearchRequested(){this.dispatchEvent(new CustomEvent(f.SearchRequested,{detail:{query:this.searchInput.value,category:this.resolvedCategory}}))}static get styles(){const e=S`
      :host {
        --search-bar-height--: var(--search-bar-height, 30px);
        --search-bar-width--: var(--search-bar-width, 300px);
        --search-bar-internal-padding--: var(--padding-sm, 5px);
        --clear-button-offset--: var(--clear-button-offset, 0);
        /* While it would be nice to fall back to ia-dropdown's own default here by making this var
           fall back to "initial", older Safari versions don't support that keyword in a var() fallback.
           So instead we just restate ia-dropdown's current default 2 here as the fallback. */
        --dropdown-z-index--: var(--dropdown-z-index, 2);
      }

      #container {
        display: inline-block;
        width: var(--search-bar-width--);
      }

      #main-bar {
        display: flex;
        height: var(--search-bar-height--, 30px);
        flex: 1;
      }

      #category-dropdown {
        display: flex;
        flex-shrink: 0;
        height: 100%;
        box-sizing: border-box;

        background-color: var(--ia-color-surface-sunken--);
        border: var(--ia-size-border-width--) solid
          var(--ia-color-border-strong--);
        border-radius: var(--ia-radius-default--) 0 0 var(--ia-radius-default--);

        --dropdownMainButtonPadding: 0 var(--search-bar-internal-padding--, 5px);
        /* The open picker is the dark dropdown panel. */
        --dropdownBgColor: var(--ia-color-surface-inverse--);
        --dropdownTextColor: var(--ia-color-text-inverse--);
        --dropdownBorderColor: var(--ia-color-border-inverse--);
        --dropdownCaretColor: var(
          --ia-theme-primary-text-color,
          var(--ia-color-text-primary--)
        );
        --dropdownHoverBgColor: var(--ia-color-hover-overlay-inverse--);
        --dropdownHoverTextColor: var(--ia-color-text-inverse--);
        --dropdownSelectedBgColor: var(--ia-color-selected-soft-fill-inverse--);
        --dropdownSelectedTextColor: var(--ia-color-text-inverse--);
        --dropdownWhiteSpace: nowrap;
        --dropdownOffsetTop: 2px;
        --caretHeight: 8px;
        --caretWidth: 12px;
        --caretPadding: 0 0 0 5px;
        --dropdownFontSize: inherit;
        --dropdownBorderRadius: var(--ia-radius-default--);
        --buttonSlotPaddingRight: 0;
        --dropdownTextAlign: left;
        --dropdownListZIndex: var(--dropdown-z-index--);
      }

      #category-dropdown:hover {
        background-color: var(--ia-color-border-subtle--);
      }

      #category-dropdown [slot='dropdown-label'] {
        color: var(
          --ia-theme-primary-text-color,
          var(--ia-color-text-primary--)
        );
        font-size: var(--ia-font-size-md--);
        font-family: inherit;
        white-space: nowrap;
      }

      .no-dropdown #search-input {
        border-left: var(--ia-size-border-width--) solid
          var(--ia-color-border-strong--);
        border-radius: var(--ia-radius-default--) 0 0 var(--ia-radius-default--);
        overflow: hidden;
      }

      #search-input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-top: var(--ia-size-border-width--) solid
          var(--ia-color-border-strong--);
        border-bottom: var(--ia-size-border-width--) solid
          var(--ia-color-border-strong--);
        font-size: inherit;

        --input-height: calc(var(--search-bar-height--) - 2px);
        --input-padding: 0 var(--search-bar-internal-padding--, 5px);
        --input-background-color: var(
          --ia-theme-secondary-background-color,
          var(--ia-color-surface-raised--)
        );
        --input-color: var(--ia-color-text-primary--);
        /* Inside the border, so the picker and the submit don't hide it. */
        --input-focus-ring-offset: calc(-1 * var(--ia-size-focus-ring--));
        --input-border-radius: 0;
        --input-border-width: 0;
        --input-box-shadow: none;
        --input-focused-box-shadow: none;
        --input-font-size: auto;
        --clear-button-top: var(--clear-button-offset--, 0);
        --clear-button-right: 2px;
      }

      #search-button {
        appearance: none;
        box-sizing: border-box;
        border-radius: 0 var(--ia-radius-default--) var(--ia-radius-default--) 0;
        background-color: var(
          --ia-theme-secondary-background-color,
          var(--ia-color-surface-raised--)
        );
        border: var(--ia-size-border-width--) solid
          var(--ia-color-border-strong--);
        border-left: 0;
        padding: 0 var(--search-bar-internal-padding--, 5px) 0 5px;
        min-width: 30px;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      #search-button:hover {
        background-color: var(--ia-color-surface-sunken--);
      }

      #search-button:focus-visible {
        outline: var(--ia-size-focus-ring--) solid
          var(--ia-color-border-focus--);
        outline-offset: var(--ia-size-focus-ring-offset--);
      }

      #search-button svg {
        width: 18px;
        height: 18px;
        color: var(--ia-color-text-primary--);
      }

      .search-button-loading-icon {
        --icon-width: 20px;
        margin-top: 2px;
      }
    `;return[q,e]}};s([h({type:String})],n.prototype,"query",2);s([h({type:Array})],n.prototype,"categories",2);s([h({type:String})],n.prototype,"selectedCategory",2);s([h({type:String})],n.prototype,"placeholder",2);s([h({type:Boolean})],n.prototype,"useMobileView",2);s([h({type:Boolean})],n.prototype,"hideDropdown",2);s([h({type:Boolean})],n.prototype,"loading",2);s([u("#search-input")],n.prototype,"searchInput",2);s([u("#category-dropdown")],n.prototype,"categoryDropdown",2);n=s([C("ia-dropdown-search-bar"),D()],n);var B=Object.defineProperty,O=Object.getOwnPropertyDescriptor,a=(e,t,l,i)=>{for(var r=i>1?void 0:i?O(t,l):t,d=e.length-1,p;d>=0;d--)(p=e[d])&&(r=(i?p(t,l,r):p(r))||r);return i&&r&&B(t,l,r),r};const I=[{label:"Bar height",cssVariable:"--ia-theme-search-bar-height",defaultValue:"30px",inputType:"text"},{label:"Bar width",cssVariable:"--ia-theme-search-bar-width",defaultValue:"300px",inputType:"text"},{label:"Internal padding",cssVariable:"--ia-theme-padding-sm",defaultValue:"5px",inputType:"text"},{label:"Dropdown z-index",cssVariable:"--dropdown-z-index",defaultValue:2,inputType:"number",min:0,step:1}],x=[{id:"all",label:"All"},{id:"texts",label:"Books/Documents"},{id:"fulltext",label:"Text Contents"},{id:"radio",label:"Radio"},{id:"tv",label:"TV"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"},{id:"image",label:"Images"},{id:"etree",label:"Live Music"},{id:"collection",label:"Collections"},{id:"data",label:"Data"},{id:"web",label:"Web Sites"}],E="all",m="Search";let o=class extends _{constructor(){super(...arguments),this.query="",this.selectedCategory=E,this.placeholder=m,this.hideDropdown=!1,this.loading=!1,this.announcerText=""}render(){return c`
      <story-template
        elementTag="ia-dropdown-search-bar"
        elementClassName="IADropdownSearchBar"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:I}}
      >
        <div slot="demo">
          <ia-dropdown-search-bar
            .query=${this.query}
            .categories=${x}
            .selectedCategory=${this.selectedCategory}
            .placeholder=${this.placeholder}
            ?hideDropdown=${this.hideDropdown}
            ?loading=${this.loading}
            @searchRequested=${this.handleSearchRequested}
          ></ia-dropdown-search-bar>
          <span id="announcer">${this.announcerText}</span>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__query">Pre-filled query</label></td>
              <td>
                <input type="text" id="settings__query" />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__selected-category"
                  >Pre-selected category</label
                >
              </td>
              <td>
                <select id="settings__selected-category">
                  ${$(x,e=>c`<option value=${e.id}>
                        ${e.label}
                      </option>`)}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__placeholder">Placeholder text</label>
              </td>
              <td>
                <input
                  type="text"
                  value=${m}
                  id="settings__placeholder"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="settings__hide-dropdown">Hide dropdown</label>
              </td>
              <td><input type="checkbox" id="settings__hide-dropdown" /></td>
            </tr>
            <tr>
              <td><label for="settings__loading">Loading</label></td>
              <td><input type="checkbox" id="settings__loading" /></td>
            </tr>
          </table>
          <button type="submit" @click=${this.applySettings}>Apply</button>
        </form>
      </story-template>
    `}get exampleUsage(){const{query:e,selectedCategory:t,placeholder:l,hideDropdown:i,loading:r}=this,d=b=>b?`"${b}"`:"",p={query:d(e),selectedCategory:d(t),placeholder:d(l),hideDropdown:i,loading:r};return`
      <ia-dropdown-search-bar
        .categories=\${[
          { id: 'foo', label: 'Foo Option' },
          { id: 'bar', label: 'Bar Option' },
          // ...
        ]}
        ${Object.entries(p).map(([b,v])=>v?v===!0?b:`${b}=${v}`:"").join(`
  `)}
      >
      </ia-dropdown-search-bar>
    `.replace(/\n\s*\n/g,`
`).replace(/\n {6}/g,`
`)}applySettings(e){e.preventDefault(),this.query=this.queryInput.value,this.selectedCategory=this.selectedCategorySelect.value,this.placeholder=this.placeholderInput.value,this.hideDropdown=this.hideDropdownCheck.checked,this.loading=this.loadingCheck.checked}handleSearchRequested(e){this.announcerText=`Category ID "${e.detail.category}" / Query "${e.detail.query}"`}static get styles(){return S`
      ia-dropdown-search-bar {
        --dropdownFontSize: 14px;
        --dropdownItemButtonPadding: 0 10px;
      }

      ia-dropdown-search-bar::part(category-dropdown-label) {
        font-size: 14px;
      }

      #announcer {
        margin-left: 20px;
      }

      table {
        margin-bottom: 5px;
      }

      tr:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.02);
      }

      label {
        display: block;
      }

      select {
        width: calc(100% - 5px);
        padding: 2px 0;
      }

      input[type='checkbox'] {
        width: 18px;
        height: 18px;
      }

      input[type='text'],
      input[type='number'] {
        box-sizing: border-box;
        width: calc(100% - 5px);
        padding: 2px 3px;
      }

      select,
      input[type='text'],
      input[type='number'],
      input[type='checkbox'] {
        margin-left: 5px;
      }

      button[type='submit'] {
        padding: 6px 8px;
      }
    `}};a([g()],o.prototype,"query",2);a([g()],o.prototype,"selectedCategory",2);a([g()],o.prototype,"placeholder",2);a([g()],o.prototype,"hideDropdown",2);a([g()],o.prototype,"loading",2);a([g()],o.prototype,"announcerText",2);a([u("#settings__query")],o.prototype,"queryInput",2);a([u("#settings__selected-category")],o.prototype,"selectedCategorySelect",2);a([u("#settings__placeholder")],o.prototype,"placeholderInput",2);a([u("#settings__hide-dropdown")],o.prototype,"hideDropdownCheck",2);a([u("#settings__loading")],o.prototype,"loadingCheck",2);o=a([C("ia-dropdown-search-bar-story")],o);export{o as IADropdownSearchBarStory};
