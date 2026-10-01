import{a as h,i as u,b as c,c as b,r as s,e as m}from"./index-DHtjvy9r.js";import{t as w}from"./story-template-C-j0-nGQ.js";import"./ia-dropdown-Sa2Cd7Zl.js";var f=Object.getOwnPropertyDescriptor,g=(e,i,a,n)=>{for(var o=n>1?void 0:n?f(i,a):i,r=e.length-1,d;r>=0;r--)(d=e[r])&&(o=d(o)||o);return o};let p=class extends u{render(){return c`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};p.styles=[w,h`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }

      :host(.invert-icon-at-hover:hover) slot[name='icon'] {
        filter: invert(1);
      }

      :host(.selected) {
        background-color: var(--selectedBgColor, #fff);
        color: var(--selectedTextColor, #2c2c2c);
      }

      :host(.invert-icon-at-selected.selected) slot[name='icon'] {
        filter: invert(1);
      }

      div.icon-label-container {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: nowrap;
        flex-direction: var(--iconLabelFlexDirection, row);
        height: 100%;
      }

      slot[name='icon'] {
        width: var(--iconWidth, 20px);
        margin-right: var(--iconLabelGutterWidth, 10px);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: nowrap;
        white-space: nowrap;
        height: 100%;
      }

      /* https://css-tricks.com/flexbox-truncated-text/ */
      ::slotted(div.truncate) {
        display: flex;
        width: var(--labelWidth, 100%);
        text-align: left;
        word-wrap: break-word; /* Important for long words! */
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }

      @supports not (-webkit-line-clamp: 2) {
        ::slotted(div.truncate) {
          min-width: 0;
        }
      }
      @supports (-webkit-line-clamp: 2) {
        ::slotted(div.truncate) {
          min-width: 0;
          display: -webkit-box;
          overflow-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          /* Fixed line-height needed to fit unicode and emojis
          https://stackoverflow.com/a/67807146
        */
          line-height: 1.2em;
          /* max-height needed for Safari browser */
          max-height: var(--labelTruncateHeight, 30px);
          max-width: var(--labelWidth, 100%);
        }
      }
    `];p=g([b("ia-icon-label")],p);var v=Object.defineProperty,x=Object.getOwnPropertyDescriptor,l=(e,i,a,n)=>{for(var o=n>1?void 0:n?x(i,a):i,r=e.length-1,d;r>=0;r--)(d=e[r])&&(o=(n?d(i,a,o):d(o))||o);return n&&o&&v(i,a,o),o};const y=[{label:"Menu background",cssVariable:"--dropdownBgColor",defaultValue:"#333333",inputType:"color"},{label:"Text color",cssVariable:"--dropdownTextColor",defaultValue:"#ffffff",inputType:"color"},{label:"Caret color",cssVariable:"--dropdownCaretColor",defaultValue:"#ffffff",inputType:"color"},{label:"Border color",cssVariable:"--dropdownBorderColor",defaultValue:"#ffffff",inputType:"color"},{label:"Selected option background",cssVariable:"--dropdownSelectedBgColor",defaultValue:"#ffffff",inputType:"color"},{label:"Selected option text",cssVariable:"--dropdownSelectedTextColor",defaultValue:"#2c2c2c",inputType:"color"},{label:"Border radius",cssVariable:"--dropdownBorderRadius",defaultValue:4,inputType:"range",min:0,max:20,step:1,unit:"px"},{label:"Menu offset from button",cssVariable:"--dropdownOffsetTop",defaultValue:5,inputType:"range",min:0,max:40,step:1,unit:"px"}],O=[{id:"all",label:"All media types"},{id:"texts",label:"Books & Documents"},{id:"movies",label:"Video"},{id:"audio",label:"Audio"},{id:"software",label:"Software"}],k=[{id:"inlibrary",url:"#elem-ia-dropdown",label:"Books to Borrow"},{id:"texts",url:"#elem-ia-dropdown",label:"Texts Collection"},{id:"web",url:"#elem-ia-dropdown",label:"Wayback Machine"}];let t=class extends u{constructor(){super(...arguments),this.displayCaret=!0,this.isDisabled=!1,this.openViaButton=!0,this.closeOnSelect=!1,this.includeSelectedOption=!1,this.closeOnEscape=!0,this.closeOnBackdropClick=!0,this.useLinkOptions=!1,this.selectedOption="all",this.lastSelectedLabel="(none yet)"}get options(){return this.useLinkOptions?k:O}get selectedLabel(){return this.options.find(i=>i.id===this.selectedOption)?.label??"Select one"}render(){return c`
      <story-template
        elementTag="ia-dropdown"
        elementClassName="IADropdown"
        .customExampleUsage=${this.exampleUsage}
        .styleInputData=${{settings:y}}
      >
        <div slot="demo">
          <div class="demo-row">
            <ia-dropdown
              id="basic-dropdown"
              ?displayCaret=${this.displayCaret}
              ?isDisabled=${this.isDisabled}
              ?openViaButton=${this.openViaButton}
              ?closeOnSelect=${this.closeOnSelect}
              ?includeSelectedOption=${this.includeSelectedOption}
              ?closeOnEscape=${this.closeOnEscape}
              ?closeOnBackdropClick=${this.closeOnBackdropClick}
              .selectedOption=${this.selectedOption}
              .options=${this.options}
              @optionSelected=${this.handleOptionSelected}
            >
              <span slot="dropdown-label">${this.selectedLabel}</span>
            </ia-dropdown>
          </div>

          <p class="demo-readout">
            Last selected: <strong>${this.lastSelectedLabel}</strong>
          </p>

          <hr />

          <p class="demo-caption">
            A custom list passed in via <code>slot="list"</code>, opened by an
            external handler. Uses <code>ia-icon-label</code> for the button
            content.
          </p>
          <div class="demo-row">
            <ia-dropdown
              id="custom-list-dropdown"
              isCustomList
              hasCustomClickHandler
              displayCaret
              closeOnBackdropClick
              @click=${this.toggleCustomDropdown}
            >
              <ia-icon-label slot="dropdown-label">
                <div slot="icon">${this.plusIcon}</div>
                My Lists
              </ia-icon-label>
              <ul slot="list" class="custom-list">
                <li>Listen Later</li>
                <li>Favorites</li>
                <li>Read in 2026</li>
              </ul>
            </ia-dropdown>
          </div>
        </div>

        <form slot="settings">
          <table>
            <tr>
              <td><label for="settings__options">Option set</label></td>
              <td>
                <select
                  id="settings__options"
                  @change=${this.handleOptionSetChanged}
                >
                  <option value="media" selected>Media types (buttons)</option>
                  <option value="links">Archive.org links (anchors)</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colspan="2"><hr /></td>
            </tr>
            ${this.checkboxRow("display-caret","Display caret","displayCaret")}
            ${this.checkboxRow("disabled","Disabled","isDisabled")}
            ${this.checkboxRow("open-via-button","Open via button","openViaButton")}
            ${this.checkboxRow("close-on-select","Close on select","closeOnSelect")}
            ${this.checkboxRow("include-selected","Include selected option in menu","includeSelectedOption")}
            ${this.checkboxRow("close-on-escape","Close on Escape","closeOnEscape")}
            ${this.checkboxRow("close-on-backdrop","Close on backdrop click","closeOnBackdropClick")}
          </table>
        </form>

        <div slot="usage-notes">
          <p>
            Options are supplied as an array of
            <code>OptionInterface</code> objects. An option with a
            <code>url</code> renders as an anchor; otherwise it renders as a
            button. Selecting one emits an <code>optionSelected</code> event and
            calls the option's own <code>selectedHandler</code>, if it has one.
          </p>
          <p>
            With <code>openViaButton</code> off, the main button no longer
            toggles the menu and the caret becomes a separate button, so
            <code>displayCaret</code> needs to be on for the menu to be
            reachable.
          </p>
          <p>
            Set <code>isCustomList</code> to replace the generated option list
            with your own markup in <code>slot="list"</code>. Pair it with
            <code>hasCustomClickHandler</code> when the host wants to own the
            open/close behavior, as in the second example above.
          </p>
        </div>
      </story-template>
    `}get plusIcon(){return c`<svg viewBox="0 0 100 100" style="width: 15px; height: 15px;">
      <path
        fill="currentColor"
        d="m56 23v22h22v11h-22v22h-11l-.001-22h-21.999v-11h21.999l.001-22z"
      />
    </svg>`}checkboxRow(e,i,a){return c`
      <tr>
        <td><label for="settings__${e}">${i}</label></td>
        <td>
          <input
            type="checkbox"
            id="settings__${e}"
            .checked=${this[a]}
            @change=${n=>{this[a]=n.target.checked}}
          />
        </td>
      </tr>
    `}get exampleUsage(){return`<ia-dropdown
  displayCaret
  closeOnSelect
  .selectedOption=\${this.selectedId}
  .options=\${[
    { id: 'all', label: 'All media types' },
    { id: 'texts', label: 'Books & Documents' },
  ]}
  @optionSelected=\${this.handleSelection}
>
  <span slot="dropdown-label">\${this.selectedLabel}</span>
</ia-dropdown>`}handleOptionSelected(e){this.selectedOption=e.detail.option.id,this.lastSelectedLabel=e.detail.option.label}handleOptionSetChanged(e){this.useLinkOptions=e.target.value==="links",this.selectedOption=this.options[0].id,this.lastSelectedLabel="(none yet)"}toggleCustomDropdown(){this.customDropdown&&(this.customDropdown.open=!this.customDropdown.open)}static get styles(){return h`
      .demo-row {
        display: flex;
        align-items: center;
        gap: 20px;
        min-height: 40px;
        padding: 10px;
        background: #2c2c2c;
        border-radius: 4px;
      }

      .demo-readout {
        font-size: 1.4rem;
      }

      .demo-caption {
        font-size: 1.4rem;
      }

      .custom-list {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .custom-list li {
        padding: 5px 10px;
        white-space: nowrap;
        cursor: pointer;
      }

      .custom-list li:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `}};l([s()],t.prototype,"displayCaret",2);l([s()],t.prototype,"isDisabled",2);l([s()],t.prototype,"openViaButton",2);l([s()],t.prototype,"closeOnSelect",2);l([s()],t.prototype,"includeSelectedOption",2);l([s()],t.prototype,"closeOnEscape",2);l([s()],t.prototype,"closeOnBackdropClick",2);l([s()],t.prototype,"useLinkOptions",2);l([s()],t.prototype,"selectedOption",2);l([s()],t.prototype,"lastSelectedLabel",2);l([m("#custom-list-dropdown")],t.prototype,"customDropdown",2);t=l([b("ia-dropdown-story")],t);export{t as IADropdownStory};
