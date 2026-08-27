import{b as l,i as k,n as s,d as h,t as I,A as b,r as C,e as ee,a as te,c as ie,E as oe}from"./index-DUOBEx0v.js";import{e as U}from"./query-CVn8ddS2.js";import{e as ae,M as re,u as _,v as D,h as N,p as ne}from"./directive-helpers-SNsQwL8J.js";import{o as se,t as L}from"./story-template-DnDRbL8v.js";const v=e=>l`
  <span
    class="ia-icon"
    aria-hidden="true"
    style='-webkit-mask-image:url("${e}");mask-image:url("${e}");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain;display:inline-block'
  ></span>
`,le="data:image/svg+xml,%3csvg%20viewBox='0%200%2040%2040'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20fill-rule='evenodd'%20d='m10.5%2017.5c1.3807119%200%202.5%201.1192881%202.5%202.5s-1.1192881%202.5-2.5%202.5c-1.38071187%200-2.5-1.1192881-2.5-2.5s1.11928813-2.5%202.5-2.5zm9.5%200c1.3807119%200%202.5%201.1192881%202.5%202.5s-1.1192881%202.5-2.5%202.5-2.5-1.1192881-2.5-2.5%201.1192881-2.5%202.5-2.5zm9.5%200c1.3807119%200%202.5%201.1192881%202.5%202.5s-1.1192881%202.5-2.5%202.5-2.5-1.1192881-2.5-2.5%201.1192881-2.5%202.5-2.5z'%20/%3e%3c/svg%3e",ce="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20fill-rule='evenodd'%20d='m9%200c4.9705627%200%209%204.02943725%209%209%200%204.9705627-4.0294373%209-9%209-4.97056275%200-9-4.0294373-9-9%200-4.97056275%204.02943725-9%209-9zm1.6976167%205.28352881c-.365258-.3556459-.9328083-.37581056-1.32099801-.06558269l-.09308988.0844372-3%203.08108108-.08194436.09533317c-.27484337.36339327-.26799482.87009349.01656959%201.22592581l.084491.09308363%203%202.91891889.09533796.0818904c.3633964.2746544.8699472.2677153%201.2256839-.0167901l.093059-.0844712.0818904-.095338c.2746544-.3633964.2677153-.8699472-.0167901-1.2256839l-.0844712-.093059-2.283355-2.2222741%202.3024712-2.36338332.0819252-.09530804c.2997677-.39632298.2644782-.96313393-.1007797-1.31877983z'%20/%3e%3c/svg%3e",de=v(le),G=v(ce);var he=Object.defineProperty,me=Object.getOwnPropertyDescriptor,P=(e,t,o,a)=>{for(var i=a>1?void 0:a?me(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&he(t,o,i),i};let x=class extends k{constructor(){super(...arguments),this.icon="",this.href="",this.label="",this.menuDetails="",this.buttonId="",this.selected=!1,this.followable=!1}onClick(e){e.preventDefault(),this.dispatchMenuTypeSelectedEvent()}dispatchMenuTypeSelectedEvent(){this.dispatchEvent(new CustomEvent("menuTypeSelected",{bubbles:!0,composed:!0,detail:{id:this.buttonId}}))}get iconClass(){return this.selected?"active":""}get menuItem(){return l`
      <span
        class="icon ${this.iconClass}"
        aria-hidden="true"
        title=${this.label}
        >${this.icon}</span
      >
      <span class="label">${this.label}</span>
      <span class="menu-details">${this.menuDetails}</span>
    `}get linkButton(){return l`
      <a
        href=${this.href}
        class="menu-item"
        aria-label=${this.label}
        aria-expanded=${se(this.followable?void 0:this.selected)}
        @click=${this.followable?void 0:this.onClick}
        >${this.menuItem}</a
      >
    `}get clickButton(){return l`
      <button
        class="menu-item"
        aria-label=${this.label}
        aria-expanded=${this.selected}
        @click=${this.onClick}
      >
        ${this.menuItem}
      </button>
    `}render(){return this.href?this.linkButton:this.clickButton}static get styles(){return[L,h`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-menu-button-label-display--: var(
            --item-navigator-menu-button-label-display,
            none
          );
          --item-navigator-icon-inactive-color--: var(
            --item-navigator-icon-inactive-color,
            var(--lighter-gray)
          );
          --item-navigator-icon-active-color--: var(
            --item-navigator-icon-active-color,
            var(--item-navigator-text-color--)
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-icon-size--: var(--item-navigator-icon-size, 2.4em);

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        a {
          display: inline-block;
          text-decoration: none;
        }

        button.menu-item {
          -webkit-appearance: none;
          appearance: none;
          /* Inherit font-size so the em-sized icon/label resolve against the
             component base rather than the UA default button font-size. */
          font: inherit;
        }

        .menu-item {
          display: inline-flex;
          width: 100%;
          padding: 0;
          text-align: left;
          background: transparent;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .label {
          display: var(--item-navigator-menu-button-label-display--);
          padding: 0;
          font-size: 1.6em;
          font-weight: 400;
          color: var(--item-navigator-text-color--);
          text-align: left;
          vertical-align: middle;
          margin-left: 1em;
        }

        .menu-details {
          color: var(--item-navigator-text-color--);
          display: inline-block;
          margin-left: 0.5em;
          font-style: italic;
          font-size: 1.5em;
        }

        .menu-item > .icon {
          position: relative;
          display: inline-flex;
          min-width: 4.2em;
          max-width: 4.2em;
          height: 4.2em;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }

        .menu-item > .icon > * {
          /* Prevent tooltip containing icon literal description */
          pointer-events: none;
        }

        /* Size the glyph within the icon box to match the shortcut-rail
           icons, rather than letting the svg fill the whole box. */
        .menu-item > .icon .ia-icon {
          width: var(--item-navigator-icon-size--);
          height: var(--item-navigator-icon-size--);
        }

        /* The open entry's icon shares the panel's background and rounds into
           it, so it has to sit above the panel to read as one shape. The rest
           stay below: they have no background of their own, so the panel would
           slide visibly behind them. */
        .menu-item[aria-expanded='true'] .icon {
          z-index: 2;
          background-color: var(--item-navigator-active-button-bg--);
          border-radius: 1em 0 0 1em;
        }

        /* Our glyphs are masked spans: the mask supplies the shape, these
           supply the paint. */
        .icon span.ia-icon {
          background-color: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active span.ia-icon {
          background-color: var(--item-navigator-icon-active-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .icon .fill-color {
          fill: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active .fill-color {
          fill: var(--item-navigator-icon-active-color--);
        }
      `]}};x.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};P([s({type:Object})],x.prototype,"icon",2);P([s({type:String})],x.prototype,"href",2);P([s({type:String})],x.prototype,"label",2);P([s({type:Object})],x.prototype,"menuDetails",2);P([s({type:String})],x.prototype,"buttonId",2);P([s({type:Boolean})],x.prototype,"selected",2);P([s({type:Boolean})],x.prototype,"followable",2);x=P([I("ia-itemnav-menu-button")],x);var ue=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,A=(e,t,o,a)=>{for(var i=a>1?void 0:a?ve(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&ue(t,o,i),i};const J={closeDrawer:"menuSliderClosed",closePanel:"menuPanelClosed"};let M=class extends k{constructor(){super(...arguments),this.menus=[],this.selectedMenu="",this.selectedMenuAction=b,this.isFirstRender=!0}updated(e){const t=this.selectedMenuDetails?.actionButton||b;t!==this.selectedMenuAction&&(this.selectedMenuAction=t),!this.isFirstRender&&e.has("selectedMenu")&&this.moveFocusForSelection(e.get("selectedMenu")),this.isFirstRender=!1}moveFocusForSelection(e){this.selectedMenu?this.panel?.focus():e&&this.menuButtonFor(e)?.focus()}menuButtonFor(e){return[...this.menuList?.querySelectorAll("ia-itemnav-menu-button")??[]].find(o=>o.buttonId===e)}focusDrawer(){if(this.selectedMenu){this.panel?.focus();return}(this.menuList?.querySelector("ia-itemnav-menu-button")??this.drawerCloseButton)?.focus()}closeMenu(){this.dispatchEvent(new CustomEvent(J.closeDrawer,{detail:this.selectedMenuDetails}))}closePanel(){this.dispatchEvent(new CustomEvent(J.closePanel,{detail:{id:this.selectedMenu}}))}handleKeyDown(e){e.key==="Escape"&&(e.preventDefault(),this.selectedMenu?this.closePanel():this.closeMenu())}get selectedMenuDetails(){return this.menus.find(e=>e.id===this.selectedMenu)}get selectedMenuClass(){return this.selectedMenu?"open":""}get menuItems(){return this.menus.map(e=>l`
        <li>
          <ia-itemnav-menu-button
            .icon=${e.icon}
            .label=${e.label}
            .menuDetails=${e.menuDetails||""}
            .buttonId=${e.id}
            .selected=${e.id===this.selectedMenu}
            .followable=${e.followable||!1}
            .href=${e.href||""}
          ></ia-itemnav-menu-button>
        </li>
      `)}get renderMenuHeader(){const{label:e="",menuDetails:t=""}=this.selectedMenuDetails||{},o=this.selectedMenuAction!==b,a=o?"with-secondary-action":"",i=o?l`<span class="custom-action">${this.selectedMenuAction}</span>`:b,r=e?`Close ${e}`:"Close this panel";return l`
      <header class=${a}>
        <div class="details">
          <h3 id="panel-title">${e}</h3>
          <span class="extra-details">${t}</span>
        </div>
        ${i}
        <button
          class="close"
          aria-label=${r}
          title=${r}
          @click=${this.closePanel}
        >
          ${G}
        </button>
      </header>
    `}get closeButton(){return l`
      <button
        class="close"
        aria-label="Close navigation"
        title="Close navigation"
        @click=${this.closeMenu}
      >
        ${G}
      </button>
    `}render(){const e=!!this.selectedMenu;return l`
      <div class="main" @keydown=${this.handleKeyDown}>
        <div class="menu">
          ${this.closeButton}
          <ul class="menu-list" role="list">
            ${this.menuItems}
          </ul>
          <!-- Closed panels are inert so the tab order and the accessibility
               tree agree with what is on screen; the slide is a consequence
               of the class, not something to wait on. -->
          <div
            class="content ${this.selectedMenuClass}"
            role="region"
            aria-labelledby="panel-title"
            tabindex="-1"
            ?inert=${!e}
          >
            ${this.renderMenuHeader}
            <section>
              <div class="selected-menu">
                ${this.selectedMenuDetails?.component||b}
              </div>
            </section>
          </div>
        </div>
      </div>
    `}static get styles(){const e=h`42px`,t=h`var(--item-navigator-menu-width--)`,o=h`var(--item-navigator-animation-timing--)`;return[L,h`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-menu-slider-bg--: var(
            --item-navigator-menu-slider-bg,
            #212121
          );
          --item-navigator-active-button-bg--: var(
            --item-navigator-active-button-bg,
            var(--mid-gray)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-header-icon-size--: var(
            --item-navigator-header-icon-size,
            2em
          );
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color--)
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        .main {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        /* The drawer's own slide is owned by the navigator's #menu; this just
           fills it. */
        .menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: ${t};
          padding: 0.5em 0.5em 0 0;
          box-sizing: border-box;
          font-size: 1.4em;
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-menu-slider-bg--);
        }

        button {
          cursor: pointer;
        }

        header {
          margin: 0 0 0.5em 0;
        }

        header * {
          margin: 0;
          display: inline-block;
        }

        header button {
          cursor: pointer;
        }

        header.with-secondary-action .details {
          width: 80%;
        }

        header .details {
          font-weight: bold;
          width: 88%;
        }

        header .custom-action > *,
        button.close {
          padding: 0;
          background-color: transparent;
          border: 0;
        }

        header .custom-action,
        button.close {
          position: absolute;
        }

        button.close {
          /* Reset to the base so the header icon (em) doesn't compound
             against .menu's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size--);
          min-width: 38px;
          min-height: 38px;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 0;
          top: 0;
        }

        button.close .ia-icon {
          width: var(--item-navigator-header-icon-size--);
          height: var(--item-navigator-header-icon-size--);
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        .content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: ${e};
          z-index: 1;
          transform: translateX(calc(${t} * -1));
          transition: var(
            --item-navigator-panel-transition--,
            transform ${o} ease-out
          );
          background: var(--item-navigator-active-button-bg--);
          border-right: 0.2em solid;
          border-color: var(--item-navigator-border-color--);
          padding: 0.5em 0 0 0.5em;
          display: flex;
          flex-direction: column;
        }

        .content.open {
          transform: translateX(0);
        }

        .content:focus {
          outline: none;
        }

        .menu-list {
          padding: 0;
          margin: 0;
          list-style: none;
          background: var(--item-navigator-menu-slider-bg--);
        }

        .menu-list li {
          margin-bottom: 0.2em;
        }

        .content > section {
          overflow: auto;
          overscroll-behavior: contain;
        }
      `]}};A([s({type:Array})],M.prototype,"menus",2);A([s({type:String})],M.prototype,"selectedMenu",2);A([s({type:Object})],M.prototype,"selectedMenuAction",2);A([U(".content")],M.prototype,"panel",2);A([U(".menu-list")],M.prototype,"menuList",2);A([U(".menu > button.close")],M.prototype,"drawerCloseButton",2);M=A([I("ia-itemnav-menu-slider")],M);var pe=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,Y=(e,t,o,a)=>{for(var i=a>1?void 0:a?ge(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&pe(t,o,i),i};let q=class extends k{constructor(){super(...arguments),this.identifier=""}emitLoaded(){this.dispatchEvent(new CustomEvent("loadingStateUpdated",{detail:{loaded:!0}}))}updated(e){e.has("identifier")&&this.emitLoaded()}get downloadUrl(){return`/download/${this.identifier}`}render(){return l`
      <section>
        <h2>THERE IS NO PREVIEW AVAILABLE FOR THIS ITEM</h2>
        <p>
          This item does not appear to have any files that can be experienced on
          Archive.org. <br />
          Please download files in this item to interact with them on your
          computer.
        </p>
        <a href=${this.downloadUrl}>Show all files</a>
      </section>
    `}static get styles(){return[L,h`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          color: var(--item-navigator-text-color--);
          text-align: center;
          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        section {
          width: 100%;
          margin: 5%;
          padding: 0 5%;
        }

        p {
          font-size: 1.4em;
        }

        a {
          color: var(--item-navigator-text-color--);
          background-color: var(--navy-blue);
          min-height: 35px;
          cursor: pointer;
          line-height: normal;
          border-radius: 0.4em;
          text-align: center;
          vertical-align: middle;
          font-size: 1.4em;
          font-family: var(--base-font-family);
          display: inline-block;
          padding: 0.85em 1.2em;
          border: 1px solid var(--lightest-gray);
          white-space: nowrap;
          appearance: auto;
          box-sizing: border-box;
          user-select: none;
          text-decoration: none;
        }
      `]}};Y([s({type:String})],q.prototype,"identifier",2);q=Y([I("ia-itemnav-no-theater-available")],q);var be=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,p=(e,t,o,a)=>{for(var i=a>1?void 0:a?fe(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&be(t,o,i),i};let u=class extends k{constructor(){super(...arguments),this.viewAvailable=!0,this.baseHost="archive.org",this.signedIn=!1,this.menuContents=[],this.menuShortcuts=[],this.viewportInFullscreen=null,this.menuOpened=!1,this.loaded=!1,this.drawerEntering=!1}slotChange(e,t){const o=e.target.assignedNodes()?.[0];this.dispatchEvent(new CustomEvent("slotChange",{detail:{slot:o,type:t}})),this.requestUpdate()}render(){const e=this.loaded?"":"hidden";return l`
      <div id="frame" class=${this.menuClass}>
        <slot
          name="header"
          @slotchange=${t=>this.slotChange(t,"header")}
        ></slot>
        <div class="menu-and-reader">
          ${this.shouldRenderMenu?this.renderSideMenu:b}
          <div id="reader" class=${e}>
            ${this.renderViewport}
          </div>
        </div>
      </div>
    `}get noTheaterView(){return l`<ia-itemnav-no-theater-available
      .identifier=${this.identifier}
      @loadingStateUpdated=${this.loadingStateUpdated}
    ></ia-itemnav-no-theater-available>`}get renderViewport(){if(!this.viewAvailable)return this.noTheaterView;const e=this.loaded?"opacity: 1;":"opacity: 0;";return l`
      <div slot="main" style=${e}>
        <slot
          name="main"
          @slotchange=${t=>this.slotChange(t,"main")}
        ></slot>
      </div>
    `}loadingStateUpdated(e){const{loaded:t}=e.detail;this.loaded=t??!1}manageViewportFullscreen(e){const t=!!e.detail.isFullScreen;this.viewportInFullscreen=t||null;const o=new CustomEvent("fullscreenToggled",{detail:e.detail});this.dispatchEvent(o)}get shouldRenderMenu(){return!!this.menuContents?.length}toggleMenu(e=void 0){this.drawerEntering=!1,this.menuOpened=e!==void 0?e:!this.menuOpened,this.moveFocusForDrawer()}moveFocusForDrawer(){this.updateComplete.then(()=>{this.menuOpened?this.menuSlider?.focusDrawer():this.toggleMenuButton?.focus()})}closeMenu(){this.openMenu=void 0,this.toggleMenu(!1)}setOpenMenu(e){this.drawerEntering=!1;const{id:t}=e.detail;this.openMenu=t!==this.openMenu?t:void 0}closeSidePanel(){this.drawerEntering=!1,this.openMenu=void 0}setMenuContents(e){const t=[...e.detail];this.menuContents=t}setMenuShortcuts(e){this.menuShortcuts=[...e.detail]}manageSideMenuEvents(e){const{menuId:t,action:o}=e.detail;t&&(o==="open"?this.openShortcut(t):o==="toggle"&&(this.openMenu=t,this.toggleMenu()))}get menuToggleButton(){const e=this.menuOpened?"Close side panel":"Open side panel";return l`
      <button
        class="toggle-menu"
        @click=${()=>this.toggleMenu()}
        title=${e}
        aria-label=${e}
        aria-expanded=${this.menuOpened}
        aria-controls="menu"
      >
        ${de}
      </button>
    `}get selectedMenuId(){return this.openMenu||""}get renderSideMenu(){return l`
      <nav aria-label="Item navigation">
        <div
          class="minimized ${ae({hidden:this.menuOpened})}"
          part="minimized-menu"
        >
          ${this.shortcuts} ${this.menuToggleButton}
        </div>
        <!-- Closed drawers are inert, so what is off-screen is also out of
             the tab order and the accessibility tree. -->
        <div
          id="menu"
          role="group"
          aria-label="Item navigation menu"
          ?inert=${!this.menuOpened}
        >
          <ia-itemnav-menu-slider
            .menus=${this.menuContents}
            .selectedMenu=${this.selectedMenuId}
            @menuTypeSelected=${this.setOpenMenu}
            @menuPanelClosed=${this.closeSidePanel}
            @menuSliderClosed=${this.closeMenu}
          ></ia-itemnav-menu-slider>
        </div>
      </nav>
    `}openShortcut(e=""){this.drawerEntering=!this.menuOpened,this.openMenu=e,this.menuOpened=!0,this.moveFocusForDrawer()}get shortcuts(){const e=this.menuShortcuts.map(({icon:t,id:o,label:a})=>o==="fullscreen"?l`${t}`:l`
        <li>
          <button
            class="shortcut ${o}"
            @click=${()=>this.openShortcut(o)}
            title=${a}
            aria-label=${a}
            aria-expanded=${this.menuOpened&&this.openMenu===o}
          >
            ${t}
          </button>
        </li>
      `);return l`<ul class="shortcuts" role="list">
      ${e}
    </ul>`}get menuClass(){const e=this.menuContents?.length||this.menuShortcuts?.length,t=this.menuOpened&&e?"open":"",o=this.viewportInFullscreen?"fullscreen":"",a=this.shouldRenderMenu?"has-menu":"",i=this.drawerEntering?"drawer-entering":"";return`${t} ${o} ${a} ${i}`}static get styles(){const e=h`var(--item-navigator-menu-width--)`,t=h`var(--item-navigator-animation-timing--)`,o=h`transform ${t} ease-out`,a=h`var(--item-navigator-menu-margin--)`,i=h`var(--item-navigator-theater-bg-color--)`,r=h`var(--item-navigator-icon-size--)`;return[L,h`
        :host {
          --item-navigator-menu-width--: var(
            --item-navigator-menu-width,
            320px
          );
          --item-navigator-animation-timing--: var(
            --item-navigator-animation-timing,
            200ms
          );
          --item-navigator-menu-margin--: var(
            --item-navigator-menu-margin,
            42px
          );
          --item-navigator-theater-bg-color--: var(
            --item-navigator-theater-bg-color,
            #000
          );
          /* Every glyph is square, so one knob sizes both axes. */
          --item-navigator-icon-size--: var(--item-navigator-icon-size, 2.4em);
          /* Icons follow the adjustable text color by default. */
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color, var(--true-white))
          );

          /*
           * The component's internal sizing is expressed in em against this
           * base (10px matches petabox's base font size, which the upstream
           * demo set on the document root). Anchoring it here makes the
           * navigator self-contained — its scale no longer depends on the
           * consumer's root font-size. Override to rescale everything.
           */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        :host,
        #frame,
        .menu-and-reader {
          position: relative;
          overflow: hidden;
          display: block;
        }

        :host,
        #frame {
          min-height: inherit;
          height: inherit;
        }

        slot {
          display: block;
          width: 100%;
        }

        slot * {
          display: block;
          height: inherit;
        }

        #frame {
          background-color: ${i};
          color-scheme: dark;
          display: flex;
          flex-direction: column;
          /*
           * The overlay/shift breakpoint keys off the navigator's own width,
           * not the viewport's, so the frame is the query container. This
           * replaces a host-injected resize observer that set the class from
           * JS: layout drives it now, so there is nothing to inject, register
           * or tear down. The inline-size type contains width only, leaving the
           * flex column's height behaviour alone.
           */
          container-type: inline-size;
          container-name: navframe;
        }

        #frame.fullscreen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9;
          /*
           * Override the inherited height/min-height from the base #frame rule:
           * on a fixed element an explicit height wins over top/bottom, so the
           * inset (0 on all sides) can't fill the viewport unless height is
           * released back to auto.
           */
          height: auto;
          min-height: 0;
        }

        .hidden {
          display: none !important;
        }

        button {
          /* Buttons don't inherit font-size from the UA stylesheet; inherit it
             so em-sized icons resolve against the component's base, not the
             browser's default button font-size. */
          font: inherit;
          cursor: pointer;
          padding: 0;
          border: 0;
        }

        .menu-and-reader {
          position: relative;
          display: flex;
          flex: 1;
        }

        nav button {
          background: none;
        }

        nav .minimized {
          background: rgba(0, 0, 0, 0.7);
          padding-top: 6px;
          position: absolute;
          width: ${a};
          z-index: 2;
          left: 0;
          border-bottom-right-radius: 5%;
        }

        nav .minimized button {
          margin-bottom: 0.2em;
          margin: auto;
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          width: ${a};
          height: ${a};
        }

        nav .minimized button > * {
          /** Prevent the icon's SVG description from stealing tooltip message */
          pointer-events: none;
        }

        nav .minimized button.toggle-menu > * {
          border: 2px solid var(--item-navigator-icon-color--);
          border-radius: ${r};
          width: ${r};
          height: ${r};
          margin: auto;
        }

        /* The rail is a list for assistive tech; strip the list chrome so it
           still reads as a row of icons. */
        .shortcuts,
        .shortcuts li {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toggle-menu .ia-icon,
        .shortcuts .ia-icon {
          width: ${r};
          height: ${r};
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        #menu {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 3;
          overflow: hidden;
          width: ${e};
          transform: translateX(calc(${e} * -1));
          transition: ${o};
        }

        #reader {
          position: relative;
          z-index: 1;
          transform: translateX(0);
          width: 100%;
          display: flex;
          /*
           * Ease the reader's size/position changes so the slotted theater
           * glides in sync with the sliding drawer (shift mode) and settles
           * smoothly on resize, rather than snapping. Overlay mode opts out
           * below so the full-width theater tracks resizes instantly.
           */
          transition:
            width ${t} ease-out,
            margin-left ${t} ease-out,
            transform ${t} ease-out;
        }

        #reader > * {
          width: 100%;
          display: flex;
          flex: 1;
        }

        /*
         * The minimized rail floats over the frame's left edge while the drawer
         * is closed, so pad the theater content by its width to avoid overlap.
         * This lives on the reader's content (not the reader box) and isn't
         * transitioned, so it snaps away on open — letting the reader box track
         * the drawer's edge exactly during the shift, rather than trailing it.
         */
        .has-menu:not(.open) #reader > * {
          box-sizing: border-box;
          padding-left: ${a};
        }

        /* Opening straight to a panel is one movement. The panel is nested in
           #menu, so its own slide would compose with the drawer's transform
           and send it twice the distance in the same time — arriving late and
           travelling at double speed. Holding it still lets the drawer carry
           it in. */
        .drawer-entering #menu {
          --item-navigator-panel-transition--: none;
        }

        .open #menu {
          width: ${e};
          transform: translateX(0);
          transition: ${o};
        }

        /* Shift: the drawer pushes the theater aside. */
        .open #reader {
          width: calc(100% - ${e});
          margin-left: ${e};
        }

        /*
         * Overlay: too narrow to give the drawer its own column, so it covers
         * a full-width theater. The transition is dropped here so the theater
         * tracks resizes instantly instead of easing behind them.
         */
        @container navframe (max-width: 600px) {
          .open #reader {
            width: 100%;
            margin-left: 0;
            transition: none;
          }
        }
      `]}};p([s({type:String})],u.prototype,"identifier",2);p([s({type:Boolean,reflect:!0})],u.prototype,"viewAvailable",2);p([s({type:String})],u.prototype,"baseHost",2);p([s({type:Boolean})],u.prototype,"signedIn",2);p([s({type:Array})],u.prototype,"menuContents",2);p([s({type:Array})],u.prototype,"menuShortcuts",2);p([s({type:Boolean,reflect:!0,attribute:!0})],u.prototype,"viewportInFullscreen",2);p([s({type:Boolean,reflect:!0})],u.prototype,"menuOpened",2);p([s({type:String,reflect:!0})],u.prototype,"openMenu",2);p([s({type:Boolean,reflect:!0,attribute:!0})],u.prototype,"loaded",2);p([C()],u.prototype,"drawerEntering",2);p([U("ia-itemnav-menu-slider")],u.prototype,"menuSlider",2);p([U("button.toggle-menu")],u.prototype,"toggleMenuButton",2);u=p([I("ia-item-navigator")],u);const K=(e,t,o)=>{const a=new Map;for(let i=t;i<=o;i++)a.set(e[i],i);return a},we=ee(class extends te{constructor(e){if(super(e),e.type!==ie.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let a;o===void 0?o=t:t!==void 0&&(a=t);const i=[],r=[];let n=0;for(const w of e)i[n]=a?a(w,n):n,r[n]=o(w,n),n++;return{values:r,keys:i}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,a]){const i=re(e),{values:r,keys:n}=this.dt(t,o,a);if(!Array.isArray(i))return this.ut=n,r;const w=this.ut??=[],y=[];let H,W,c=0,m=i.length-1,d=0,g=r.length-1;for(;c<=m&&d<=g;)if(i[c]===null)c++;else if(i[m]===null)m--;else if(w[c]===n[d])y[d]=_(i[c],r[d]),c++,d++;else if(w[m]===n[g])y[g]=_(i[m],r[g]),m--,g--;else if(w[c]===n[g])y[g]=_(i[c],r[g]),D(e,y[g+1],i[c]),c++,g--;else if(w[m]===n[d])y[d]=_(i[m],r[d]),D(e,i[c],i[m]),m--,d++;else if(H===void 0&&(H=K(n,d,g),W=K(w,c,m)),H.has(w[c]))if(H.has(w[m])){const S=W.get(n[d]),j=S!==void 0?i[S]:null;if(j===null){const X=D(e,i[c]);_(X,r[d]),y[d]=X}else y[d]=_(j,r[d]),D(e,i[c],j),i[S]=null;d++}else N(i[m]),m--;else N(i[c]),c++;for(;d<=g;){const S=D(e,y[g+1]);_(S,r[d]),y[d++]=S}for(;c<=m;){const S=i[c++];S!==null&&N(S)}return this.ut=n,ne(e,y),oe}}),ye="data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m9.83536396%200h10.07241114c.1725502.47117517.3378411.76385809.4958725.87804878.1295523.11419069.3199719.1998337.5712586.25692905.2512868.05709534.4704647.08564301.6575337.08564301h.2806036v15.24362526h-4.3355343v3.8106985h-4.44275v3.7250554h-12.01318261c-.27306495%200-.50313194-.085643-.69020098-.256929-.18706903-.1712861-.30936193-.3425721-.36687867-.5138581l-.06449694-.2785477v-14.2159091c0-.32815965.08627512-.5922949.25882537-.79240577.17255024-.20011086.34510049-.32150776.51765073-.36419068l.25882537-.0640244h3.36472977v-2.54767184c0-.31374722.08627513-.57067627.25882537-.77078714.17255025-.20011086.34510049-.32150776.51765074-.36419068l.25882536-.06402439h3.36472978v-2.56929047c0-.32815964.08627512-.5922949.25882537-.79240576.17255024-.20011087.34510049-.31430156.51765073-.34257207zm10.78355264%2015.6294346v-13.53076498c-.2730649-.08536585-.4456152-.16380266-.5176507-.23531042-.1725502-.1424612-.2730649-.27078714-.3015441-.38497783v13.36031043h-9.87808272c0%20.0144124-.02149898.0144124-.06449694%200-.04299795-.0144124-.08962561.006929-.13988296.0640244-.05025735.0570953-.07538603.1427383-.07538603.256929s.02149898.210643.06449694.289357c.04299795.078714.08599591.1322062.12899387.1604767l.06449693.0216187h10.71905571zm-10.2449613-2.4412417h7.98003v-11.60421286h-7.98003zm1.6827837-9.41990022h4.6153002c.1725502%200%20.3199718.05349224.4422647.16047672s.1834393.23891353.1834393.39578714c0%20.15687362-.0611464.28519956-.1834393.38497783s-.2697145.1496674-.4422647.1496674h-4.6153002c-.1725503%200-.3199719-.04988913-.4422647-.1496674-.1222929-.09977827-.1834394-.22810421-.1834394-.38497783%200-.15687361.0611465-.28880266.1834394-.39578714.1222928-.10698448.2697144-.16047672.4422647-.16047672zm-6.08197737%2013.50997782h7.72120467v-.8131929h-3.79610541c-.27306495%200-.49950224-.085643-.67931188-.256929-.17980964-.1712861-.29847284-.3425721-.35598958-.5138581l-.06449694-.2785477v-10.02023282h-2.82530086zm6.77217827-11.36890243h3.2139578c.1295522%200%20.240956.05709534.3342113.17128603.0932554.11419069.139883.24972284.139883.40659645%200%20.15687362-.0466276.28880267-.139883.39578714-.0932553.10698448-.2046591.16047672-.3342113.16047672h-3.2139578c-.1295523%200-.2373264-.05349224-.3233223-.16047672-.0859959-.10698447-.1289938-.23891352-.1289938-.39578714%200-.15687361.0429979-.29240576.1289938-.40659645s.19377-.17128603.3233223-.17128603zm-11.15043132%2015.11557653h7.69942646v-.7491685h-3.79610539c-.25854616%200-.48135376-.0892462-.66842279-.2677384-.18706904-.1784922-.30936193-.3605876-.36687868-.546286l-.06449694-.2569291v-10.04101994h-2.80352266zm14.62237682-4.5606985h-.8191949v2.1410754h-9.89986085s-.04299796.0285477-.12899387.085643c-.08599592.0570954-.12201369.1427384-.10805331.2569291%200%20.1141906.01786928.210643.05360784.289357.03573856.0787139.07538603.125.1189424.138858l.06449694.0432373h10.71905575v-2.9542683zm-4.3991936%203.8106985h-.8191949v2.077051h-9.8563045c0%20.0144124-.02149898.0144124-.06449694%200-.04299795-.0144125-.08962561.0105321-.13988296.0748337-.05025735.0643015-.07538603.1607538-.07538603.289357%200%20.1141906.02149898.2070399.06449694.2785476.04299795.0715078.08599591.1141907.12899387.1280488l.06449693.0216186h10.69811519v-2.8686252z'%20/%3e%3c/svg%3e";var xe=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,E=(e,t,o,a)=>{for(var i=a>1?void 0:a?$e(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&xe(t,o,i),i};const Z=v(ye);let T=class extends k{constructor(){super(...arguments),this.baseHost="archive.org",this.sortOrderBy="default",this.subPrefix="",this.fileList=[],this.addSortToUrl=!1}updated(e){(e.has("fileList")||e.has("subPrefix"))&&this.revealActiveFile()}connectedCallback(){super.connectedCallback(),this.revealActiveFile()}async revealActiveFile(){await this.updateComplete,this.shadowRoot?.querySelector(".content.active")?.scrollIntoView({block:"nearest",inline:"nearest"})}fileUrl(e){const t=`//${this.baseHost}${e.url_path}`;return this.addSortToUrl&&this.sortOrderBy!=="default"?`${t}?sort=${this.sortOrderBy}`:t}get pdfLabel(){return l`<span class="pdf-label"
      ><span class="sr-only">view this</span> PDF</span
    >`}fileLi(e){const t=this.subPrefix===e.file_subprefix?" active":"",o=this.fileUrl(e),a=(e.file_source??"").match(/^[^+]+\.pdf$/i);return l`
      <li>
        <div class="separator"></div>
        <div class="content${t}">
          <a href=${o}>
            <p class="item-title">
              ${e.title}${a?this.pdfLabel:b}
            </p>
          </a>
        </div>
      </li>
    `}get fileListTemplate(){const e=we(this.fileList,t=>t?.file_prefix,this.fileLi.bind(this));return l`
      <ul>
        ${e}
        <div class="separator"></div>
      </ul>
    `}render(){return this.fileList.length?this.fileListTemplate:b}static get styles(){return[L,h`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          --item-navigator-active-file-border-color--: var(
            --item-navigator-active-file-border-color,
            #538bc5
          );

          display: block;
          overflow-y: auto;
          box-sizing: border-box;
          color: var(--item-navigator-text-color--);
          margin-top: 14px;
          margin-bottom: 2em;
          --active-border-width--: 2px;
          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        a {
          color: var(--item-navigator-text-color--);
          text-decoration: none;
        }

        ul {
          padding: 0;
          list-style: none;
          margin: var(--active-border-width--) 0.5em 1em 0;
        }

        ul > li:first-child .separator {
          display: none;
        }

        li {
          cursor: pointer;
          position: relative;
        }

        li .content {
          border: var(--active-border-width--) solid transparent;
          padding: 0.2em 0 0.4em 0.2em;
        }

        li .content.active {
          border: var(--active-border-width--) solid
            var(--item-navigator-active-file-border-color--);
        }

        li.content a {
          display: flex;
        }

        .item-title {
          margin-block-start: 0em;
          margin-block-end: 0em;
          font-size: 14px;
          font-weight: bold;
          word-wrap: break-word;
          padding-left: 5px;
        }

        .separator {
          background-color: var(--item-navigator-border-color--);
          width: 98%;
          margin: 1px auto;
          height: 1px;
        }

        .pdf-label {
          border: 1px solid;
          padding: 2px 5px;
          border-radius: 20px;
          display: inline-block;
          margin-left: 5px;
          font-size: 0.9em;
        }

        .pdf-label .sr-only {
          position: absolute;
          clip: rect(1px, 1px, 1px, 1px);
          padding: 0;
          border: 0;
          height: 1px;
          width: 1px;
          overflow: hidden;
        }
      `]}};E([s({type:String})],T.prototype,"baseHost",2);E([s({type:String})],T.prototype,"sortOrderBy",2);E([s({type:String})],T.prototype,"subPrefix",2);E([s({type:Array})],T.prototype,"fileList",2);E([s({type:Boolean,reflect:!0})],T.prototype,"addSortToUrl",2);T=E([I("ia-itemnav-viewable-files-panel")],T);const ze="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='m2.32514544%208.30769231.7756949-2.08468003h2.92824822l.75630252%202.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976%206.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m7.1689722%2016.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666%205.3716871v.7756949z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m10.3846154%2011.0769231%202.7692308%205.5384615%202.7692307-5.5384615m-2.7692307%204.1538461v-13.15384612'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.661538'%20transform='matrix(1%200%200%20-1%200%2018.692308)'%20/%3e%3c/g%3e%3c/svg%3e",Se="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='m2.32514544%208.30769231.7756949-2.08468003h2.92824822l.75630252%202.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976%206.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m7.1689722%2016.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666%205.3716871v.7756949z'%20fill='%23000'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m10.3846154%2011.0769231%202.7692308%205.5384615%202.7692307-5.5384615m-2.7692307%204.1538461v-13.15384612'%20stroke='%23000'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='1.661538'%20/%3e%3c/g%3e%3c/svg%3e",ke="data:image/svg+xml,%3csvg%20viewBox='0%200%2018%2018'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%23000'%20fill-rule='evenodd'%3e%3cpath%20d='m2.32514544%208.30769231.7756949-2.08468003h2.92824822l.75630252%202.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976%206.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z'%20fill-rule='nonzero'%20/%3e%3cpath%20d='m7.1689722%2016.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666%205.3716871v.7756949z'%20fill-rule='nonzero'%20/%3e%3ccircle%20cx='13'%20cy='9'%20r='2'%20/%3e%3c/g%3e%3c/svg%3e";var Ce=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,R=(e,t,o,a)=>{for(var i=a>1?void 0:a?Oe(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Ce(t,o,i),i};const Me=v(ze),Ie=v(Se),Pe=v(ke);let V=class extends k{constructor(){super(...arguments),this.fileListRaw=[],this.fileListSorted=[],this.sortOrderBy="default"}render(){return l`<div class="sort-multi-file-list">${this.sortButton}</div>`}get sortButton(){return{default:l`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${()=>this.sortVolumes("title_asc")}
        >
          ${Pe}
        </button>
      `,title_asc:l`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${()=>this.sortVolumes("title_desc")}
        >
          ${Me}
        </button>
      `,title_desc:l`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${()=>this.sortVolumes("default")}
        >
          ${Ie}
        </button>
      `}[this.sortOrderBy]}sortVolumes(e){this.sortOrderBy=e;const t=[...this.fileListRaw].sort((o,a)=>e==="title_asc"?o.title.localeCompare(a.title):e==="title_desc"?a.title.localeCompare(o.title):(o.orig_sort??0)-(a.orig_sort??0));this.dispatchEvent(new CustomEvent("fileListSorted",{detail:{sortType:e,sortedFiles:t},bubbles:!0,composed:!0})),this.fileListSorted=t}static get styles(){return[L,h`
        :host {
          /* Every glyph is square, so one knob sizes both axes. Matches the
             panel header's close button, which sits beside this one. */
          --item-navigator-header-icon-size--: var(
            --item-navigator-header-icon-size,
            2em
          );
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color, var(--true-white))
          );

          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
        }

        button.sort-by {
          padding: 0;
          background-color: transparent;
          border: 0;
          cursor: pointer;
          display: inline-flex;
          /* Buttons don't inherit font-size, and the UA default would make the
             em-sized glyph larger than the close button beside it. */
          font: inherit;
        }

        /* The glyph is a masked span: the mask supplies the shape, this
           supplies the paint. */
        button.sort-by .ia-icon {
          width: var(--item-navigator-header-icon-size--);
          height: var(--item-navigator-header-icon-size--);
          background-color: var(--item-navigator-icon-color--);
        }
      `]}};R([s({type:Array})],V.prototype,"fileListRaw",2);R([s({type:Array})],V.prototype,"fileListSorted",2);R([s({type:String,reflect:!0})],V.prototype,"sortOrderBy",2);V=R([I("ia-itemnav-sort-files-button")],V);const _e="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='M70.6784759,10%20L70.6784759,21.3240186%20C64.5020053,21.66334%2058.9104278,22.5826126%2053.9037433,24.0818363%20C48.8970588,25.5810601%2044.8495989,27.4085163%2041.7613636,29.5642049%20C38.6731283,31.7198935%2035.9982175,34.0552229%2033.736631,36.5701929%20C31.4750446,39.085163%2029.8217469,41.5657574%2028.776738,44.011976%20C27.7317291,46.4581947%2026.9173351,48.6848525%2026.3335561,50.6919494%20C25.7497772,52.6990464%2025.4088681,54.3324462%2025.3108289,55.592149%20L25.2372995,57.4085163%20C29.0296346,54.1661122%2033.1751337,51.5524507%2037.6737968,49.5675316%20C42.1724599,47.5826126%2046.2934492,46.3118208%2050.0367647,45.7551564%20C53.7800802,45.1984919%2057.2571301,44.8713684%2060.4679144,44.7737858%20C63.6786988,44.6762031%2066.1831551,44.7726769%2067.9812834,45.0632069%20L70.6784759,45.499002%20L70.6784759,57.4051896%20L100,33.3765802%20L70.6784759,10%20Z%20M76.4438503,62.4883566%20L82.8609626,57.1157685%20C82.9099822,57.0669772%2082.9946524,57.0303837%2083.1149733,57.005988%20C83.2352941,56.9815924%2083.4536542,56.9571967%2083.7700535,56.9328011%20C84.0864528,56.9084054%2084.3905971,56.9449989%2084.6824866,57.0425815%20C84.9743761,57.1401641%2085.217246,57.2854291%2085.4110963,57.4783766%20C85.6049465,57.671324%2085.7263815,57.8409847%2085.7754011,57.9873586%20L85.8489305,58.2035928%20L85.8489305,90%20L0,90%20L0,17.910845%20L43.1784759,17.910845%20C43.2765152,17.9596363%2043.410205,18.0317143%2043.5795455,18.1270792%20C43.7488859,18.222444%2043.9438503,18.4519849%2044.1644385,18.8157019%20C44.3850267,19.1794189%2044.469697,19.5542249%2044.4184492,19.9401198%20C44.4184492,20.2794411%2044.3092692,20.582169%2044.0909091,20.8483034%20C43.872549,21.1144378%2043.6664439,21.3206919%2043.4725936,21.4670659%20L43.1818182,21.6134398%20C40.557041,23.06609%2038.2954545,24.396762%2036.3970588,25.6054558%20L30.7820856,29.8170326%20L11.5274064,29.8170326%20L11.5274064,78.1669993%20L74.1811497,78.1669993%20L74.1811497,65.5355955%20C74.1811497,65.1009093%2074.3995098,64.6407186%2074.8362299,64.1550233%20L76.4438503,62.4883566%20Z'%20/%3e%3c/svg%3e",Be="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m31.5297453%208.76273313c-.3135031.40766104-.7447036.83083673-1.2936015%201.26952707-.5488979.4386904-.9169698.7837578-1.1042157%201.0352022.1562166%202.319709-.1417719%204.5297454-.8939653%206.6301092-.7521935%202.1003638-1.8023754%203.9182538-3.1505457%205.45367-1.3481704%201.5354162-2.9627648%202.8284828-4.8437835%203.8791996-1.8810186%201.0507169-3.8321207%201.7483416-5.8533062%202.092874s-4.1215493.2894286-6.30109136-.1653114c-2.17954205-.45474-4.2092874-1.3401455-6.08923604-2.6562165%202.72737.4697196%205.67408517-.2514445%208.8401455-2.1634924-3.0719024-.7521935-4.88979241-2.2881447-5.45367-4.6078537%201.12882516.0631287%201.86550396.0631287%202.21003638%200-2.91568586-1.2850417-4.38904344-3.3693558-4.42007276-6.2529424.21934517.0310293.53284828.1487267.94050931.3530922s.78375775.3060133%201.12829017.3049433c-.81532206-.7211641-1.41076396-1.9045581-1.7863257-3.5501819-.37556173-1.64562376-.17173122-3.17355015.61149155-4.58377912%201.81789001%201.88101862%203.6908838%203.36989086%205.61898138%204.46661672%201.92809757%201.0967259%204.22426707%201.7547614%206.88850847%201.9741066-.2503745-1.1908838-.1722662-2.32719882.2343248-3.40894502.4065911-1.0817462%201.0416221-1.93612241%201.9050931-2.56312861.863471-.62700621%201.8114702-1.0817462%202.8439975-1.36421999%201.0325272-.28247378%202.0827091-.27444896%203.1505456.02407447s1.9767815.87042585%202.726835%201.71570726c1.3791997-.37663172%202.6802911-.87845068%203.9032742-1.50545688-.0310293.37663171-.1407019.74470361-.3290178%201.1042157-.1883158.35951209-.3530922.62593623-.4943291.79927242s-.3841216.4317355-.728654.77519795c-.3445324.34346244-.5638776.57832227-.6580355.70457949.2193452-.09415792.6895998-.23539482%201.410764-.42371067.7211641-.18831586%201.2069334-.39214638%201.4573079-.61149155%200%20.44350524-.1567516.86668093-.4702547%201.27434196z'%20/%3e%3c/svg%3e",Te="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m30.91057%2019.2442068.2670004-5.3339402h-5.7329237c-.0890001-3.4962895.25183-5.42243459%201.0224903-5.77843514.3560005-.17800028.8004955-.28925046%201.333485-.33375053s1.0442346-.0520853%201.5337353-.02275571c.4895008.02932959%201.045246.01466479%201.6672356-.04399439.0890001-1.59997977.1335002-3.24445961.1335002-4.93343953-2.1633102-.20732987-3.6742898-.28115953-4.5329389-.22148898-2.8146294.17800028-4.7847688%201.25965538-5.9104183%203.2449653-.1780003.3256596-.3261653.68873971-.444495%201.08924034-.1183298.40050062-.2144095.76358074-.2882391%201.08924034-.0738297.32565959-.125915.7848194-.1562559%201.37747942-.030341.59266002-.052591%201.04474028-.0667501%201.35624078-.0141592.3115005-.0217444.8449956-.0227558%201.6004854v1.5777298h-3.8229605v5.3339401h3.8669549v14.622824h5.8224296c0-.3560006-.0146648-1.6819003-.0439944-3.9776994-.0293296-2.295799-.0515796-4.2957737-.0667501-5.9999241s-.0075853-3.2525506.0227557-4.6452005h5.4219289z'%20/%3e%3c/svg%3e",Le="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m8.50321407%208.54544475v5.32088575c.15641786.0310693.6819176.0310693%201.57649923%200%20.8945816-.0310693%201.3574071.0160703%201.3884764.1414189.0942792%201.5695354.1333837%203.2253149.1173133%204.9673385-.0160703%201.7420236-.0316049%203.3426283-.0466039%204.8018141s.2046288%202.824628.6588835%204.0963267c.4542546%201.2716986%201.1999178%202.2209194%202.2369897%202.8476622%201.2556283.784232%202.9896167%201.207953%205.2019653%201.271163%202.2123485.0632099%204.1659648-.2506972%205.8608487-.9417213-.0310693-.3449764-.0230341-1.4045467.0241055-3.1787109.0471397-1.7741643-.0080351-2.75499-.1655244-2.9424772-3.5472571%201.0360005-5.697467.6904885-6.4506298-1.0365361-.7220934-1.6638147-.8635123-4.9909084-.4242566-9.981281v-.046604h6.7318605v-5.32088568h-6.7318605v-6.54383772h-4.0497228c-.2828378%201.28669763-.6122795%202.35376743-.9883252%203.20120941-.3760457.84744199-.98029%201.60060471-1.812733%202.25948817-.832443.65888347-1.87594303%201.01993018-3.1305%201.08314014z'%20/%3e%3c/svg%3e",Ae="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m11.9051049%2030.5873434.653491-1.0742755.4207845-.839975c.2805229-.591861.5371377-1.2533214.7698443-1.9843813.2327065-.7310599.4659444-1.6029125.6997135-2.6155579.2337692-1.0126455.4128151-1.752206.5371377-2.2186817.0308151.030815.0775689.0855382.1402615.1641697.0626927.0786314.1094465.1333547.1402615.1641697.1243227.1870153.2178304.311338.280523.372968%201.1210293.964829%202.3817888%201.4631823%203.7822785%201.4950599%201.4939973%200%202.8790795-.3426843%204.1552465-1.0280529%202.1166733-1.1826593%203.6733633-3.1128487%204.6700699-5.7905679.4048457-1.1518444.6848374-2.5996192.8399751-4.3433245.1243226-1.587505-.0781002-3.0974411-.6072685-4.5298084-.903199-2.36638128-2.5528653-4.20306294-4.948999-5.51004497-1.276167-.65349101-2.5990879-1.05833667-3.9687625-1.21453696-1.525875-.21783034-3.1293188-.17107651-4.8103315.14026149-2.7701643.52916833-5.02709913%201.743174-6.77080442%203.64201699-1.99235065%202.14748836-2.98852598%204.62225355-2.98852598%207.42429545%200%202.9571797.9494215%205.0584455%202.84826449%206.3037975l.83997504.4207845c.12432268%200%20.22526845.0154075.3028373.0462225s.1551377.0074381.23270656-.0701308c.07756885-.0775688.13229208-.1243226.16416969-.1402614s.07066204-.0860696.11635328-.2103923c.04569124-.1243226.07703756-.2098609.09403895-.2566147.01700139-.0467539.04834771-.1476996.09403895-.3028373s.06906816-.2486454.07013074-.280523l.14026149-.5132295c.06269263-.311338.09403895-.5291684.09403895-.653491-.03081502-.1243227-.12432268-.2799917-.28052297-.467007-.15620029-.1870154-.23376915-.2959305-.23270656-.3267455-.62267599-.8096914-.9494215-1.7904592-.98023652-2.9423035-.03081502-1.55669.28052297-2.9731185.93401399-4.24928547%201.18265932-2.45882635%203.17501002-3.93741618%205.97705192-4.43576949%201.6183201-.311338%203.1356943-.25661476%204.5521228.16416969%201.4164285.42078446%202.5135496%201.09765239%203.2913633%202.03060379.8405063%201.02752164%201.3229208%202.28828114%201.4472435%203.78227848.1243227%201.4004897-.0313463%202.9725872-.467007%204.7162925-.3740306%201.3696746-.9186065%202.5528653-1.6337275%203.5495719-.9967066%201.245352-2.0863896%201.8834355-3.269049%201.9142505-1.7118277.0626926-2.7547568-.6375522-3.1287874-2.1007345-.0935077-.4664757%200-1.2134744.2805229-2.240996.7469987-2.5842117%201.1359055-3.9384788%201.1667206-4.0628015.1870153-1.0275216.2024228-1.7904591.0462225-2.2888124-.1870153-.65349104-.5759222-1.15928246-1.1667205-1.51737429-.5907984-.35809182-1.2756357-.39687625-2.054512-.11635327-1.1826594.43566067-1.9610044%201.40048968-2.335035%202.89448706-.311338%201.306982-.2491767%202.6299028.186484%203.9687625%200%20.0626926.0313463.1402615.094039.2327065.0626926.0924451.0940389.1700139.0940389.2327066%200%20.0935076-.0313463.2491766-.0940389.467007-.0626927.2178303-.094039.3580918-.094039.4207844-.0935076.4356607-.3038999%201.3308903-.6311767%202.6856887-.3272768%201.3547985-.5838915%202.3897582-.7698443%203.1048793-.7778136%203.2068876-1.12049796%205.5881451-1.02805289%207.1437725l.37296809%202.7558194c.653491-.591861%201.2294131-1.2299445%201.7277664-1.9142505z'%20/%3e%3c/svg%3e",Fe="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m32%207.04156803v19.91686397c0%20.5752421-.4763773%201.041568-1.0640184%201.041568h-27.87196316c-.58764116%200-1.06401844-.4663259-1.06401844-1.041568v-19.91686397c0-.57524214.47637728-1.04156803%201.06401844-1.04156803h27.87196316c.5876411%200%201.0640184.46632589%201.0640184%201.04156803zm-26.25039901%201.19676167%2010.04327011%2010.1323738c.5135662.4194048.8817166.6291071%201.1044511.6291071.1198794%200%20.2695514-.0503424.4490158-.1510273.1794644-.100685.3291364-.2013699.4490158-.3020548l.1798191-.1510273%2010.1198794-10.15841306zm16.77212271%209.7303286%206.8831353%206.7889404v-13.5778809zm-17.92871075-6.6379131v13.350819l6.78098955-6.6629107zm22.09008685%2014.2059464-5.9074304-5.8588202-.9757049.9551179-.3594018.3295984c-.0342324.0304241-.0665646.0587822-.0969964.0850743l-.1597867.1329606c-.0684912.0540844-.1198794.0895749-.1541644.1064714-.6674943.3687151-1.3523675.5530727-2.0546196.5530727-.65047%200-1.3782586-.218035-2.1833659-.6541048l-.6682036-.4520405-1.0278418-1.0311524-5.95850326%205.832781z'%20/%3e%3c/svg%3e",Ee="data:image/svg+xml,%3csvg%20viewBox='0%200%2034%2034'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='m7.80511706%2012.3659763c1.2669254-2.2579539%204.09819784-2.9949938%206.41200864-1.7733458l.2295791.12871%201.6067188.9559859%203.5467013-6.31849361c1.2682451-2.26030597%204.104098-2.99652769%206.4192376-1.76952182l.2223501.12488594%203.2168204%201.91103915c2.2770002%201.3527136%203.1866331%204.21502324%202.0564431%206.51290984l-.1198433.2278304-5.2002499%209.2680474c-1.2669254%202.2579539-4.0981978%202.9949938-6.4120086%201.7733458l-.2295791-.12871-1.6096554-.9558482-3.5437647%206.3183559c-1.2682451%202.260306-4.104098%202.9965277-6.41923761%201.7695218l-.22235013-.1248859-3.21682032-1.9110392c-2.27700024-1.3527136-3.18663314-4.2150232-2.05644312-6.5129098l.11984332-.2278304zm13.93955474-5.73311741-3.563271%206.35055051c1.889633%201.4530595%202.5776248%204.0429866%201.5410255%206.156875l-.1223014.2328355-.4183304.7430134%201.6096554.9558483c1.1431442.6791157%202.5155496.3977368%203.1667361-.5628389l.0921501-.1491451%205.2002498-9.2680474c.5752467-1.0252226.2110342-2.4011579-.8559335-3.14755806l-.1742742-.11247814-3.2168203-1.91103915c-1.1402863-.67741793-2.5086889-.39913772-3.1618387.55564729zm-11.79500786%207.00714351-5.20024982%209.2680474c-.57524673%201.0252226-.21103426%202.4011579.85593348%203.1475581l.17427416.1124781%203.21682032%201.9110392c1.14028632.6774179%202.50868892.3991377%203.16183872-.5556473l.0970474-.1563368%203.5622708-6.3513198c-1.8888875-1.4532134-2.5764504-4.042623-1.5400057-6.1561456l.1222818-.2327956.4153938-.7428758-1.6067188-.9559859c-1.1431442-.6791157-2.5155496-.3977368-3.1667361.5628389zm6.97653866%201.5796652-.3817806.6812386c-.5117123.9119895-.2800268%202.1014993.528439%202.8785267l.382717-.6803391c.5119098-.9123415.2798478-2.1024176-.5293754-2.8794262z'%20/%3e%3c/svg%3e",Q=v(_e),De=v(Be),Ve=v(Te),Ue=v(Le),He=v(Ae),Re=v(Fe),je=v(Ee);var Ne=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,z=(e,t,o,a)=>{for(var i=a>1?void 0:a?qe(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Ne(t,o,i),i};let f=class extends k{constructor(){super(...arguments),this.baseHost="archive.org",this.creator="",this.description="",this.embedOptionsVisible=!1,this.identifier="",this.sharingOptions=[],this.type="",this.renderHeader=!1,this.fileSubPrefix="",this.copyNoteTimeouts=new WeakMap}updated(e){e.has("sharingOptions")&&!this.sharingOptions.length&&this.loadProviders()}loadProviders(){let e=`https://${this.baseHost}/details/${this.identifier}`;this.fileSubPrefix&&(e+=`/${this.fileSubPrefix}`);const t=[this.description,this.creator,"Free Download, Borrow, and Streaming","Internet Archive"].filter(Boolean).join(" : ");this.sharingOptions=[{name:"Twitter",icon:De,url:`https://twitter.com/intent/tweet?${new URLSearchParams({url:e,text:t,via:"internetarchive"})}`},{name:"Facebook",icon:Ve,url:`https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({u:e})}`},{name:"Tumblr",icon:Ue,url:`https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams({posttype:"link",canonicalUrl:e,title:t})}`},{name:"Pinterest",icon:He,url:`http://www.pinterest.com/pin/create/button/?${new URLSearchParams({url:e,description:t})}`},{name:"Email",icon:Re,url:`mailto:?${new URLSearchParams({subject:t,body:e})}`}]}async copyToClipboard(e){const t=e.currentTarget,o=t.querySelector("textarea"),a=t.querySelector("small");if(!(!o||!a)){try{await navigator.clipboard.writeText(o.value)}catch{o.select(),document.execCommand("copy"),o.blur()}a.classList.add("visible"),clearTimeout(this.copyNoteTimeouts.get(a)),this.copyNoteTimeouts.set(a,setTimeout(()=>a.classList.remove("visible"),4e3))}}get iframeEmbed(){return`<iframe
      src="https://${this.baseHost}/embed/${this.identifier}"
      width="560" height="384" frameborder="0"
      webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen
    ></iframe>`}get bbcodeEmbed(){return`[archiveorg ${this.identifier} width=560 height=384 frameborder=0 webkitallowfullscreen=true mozallowfullscreen=true]`}get helpURL(){return`https://${this.baseHost}/help/audio.php?identifier=${this.identifier}`}get header(){const e=l`<header><h3>Share this ${this.type}</h3></header>`;return this.renderHeader?e:b}render(){return l`
      ${this.header}
      <div>
        ${this.sharingOptions.map(e=>l`<a class="share-option" href=${e.url} target="_blank">
              ${e.icon} ${e.name}
            </a>`)}
        <details>
          <summary class="share-option">
            ${je} Get an embeddable link
          </summary>
          <div class="embed">
            <h4>Embed</h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.iframeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <h4>
              Embed for wordpress.com hosted blogs and archive.org item
              &lt;description&gt; tags
            </h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.bbcodeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <p>
              Want more?
              <a href=${this.helpURL}
                >Advanced embedding details, examples, and help</a
              >!
            </p>
          </div>
        </details>
      </div>
    `}static get styles(){return[L,h`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          /* Icons follow the adjustable text color by default. */
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color--)
          );
          --item-navigator-share-embed-bg--: var(
            --item-navigator-share-embed-bg,
            #151515
          );

          display: block;
          height: 100%;
          overflow-y: auto;
          /* 10px base (petabox scale); internal sizing is em against it. */
          --item-navigator-base-font-size--: var(
            --item-navigator-base-font-size,
            10px
          );
          font-size: var(--item-navigator-base-font-size--);
          color: var(--item-navigator-text-color--);
          box-sizing: border-box;
        }

        header {
          display: flex;
          align-items: baseline;
        }

        h3 {
          padding: 0;
          margin: 0 1em 0 0;
          font-size: 1.6em;
        }

        h4 {
          font-size: 1.4em;
        }

        :host > div {
          padding: 1em 0;
        }

        .share-option {
          display: block;
          padding: 0.5em 0;
          font-size: 1.6em;
          text-decoration: none;
          color: var(--item-navigator-text-color--);
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .share-option:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option > * {
          display: inline-block;
          padding: 0.2em;
          margin-right: 1em;
          vertical-align: middle;
          border: 1px solid var(--item-navigator-border-color--);
          border-radius: 7px;
        }

        .share-option .ia-icon {
          /* Reset to the base so the icon (em) doesn't compound against the
             share-option's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size--);
          width: 2em;
          height: 2em;
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        /* Hide the triangle that appears on details tags */
        summary::marker {
          content: '';
        }

        summary::-webkit-details-marker {
          display: none;
        }

        .embed {
          padding-right: 5px;
        }

        .embed a {
          color: var(--item-navigator-text-color--);
        }

        .code {
          position: relative;
        }

        textarea {
          display: block;
          width: 100%;
          height: 120px;
          padding: 0.8em 1em;
          box-sizing: border-box;
          resize: none;
          cursor: pointer;
          font: normal 1.4em var(--base-font-family);
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-share-embed-bg--);
        }

        small {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3em;
          padding: 0.5em 1em;
          box-sizing: border-box;
          font: normal 1.2em/2em var(--base-font-family);
          color: var(--item-navigator-share-embed-bg--);
          background: var(--item-navigator-text-color--);
          opacity: 0;
          transition: opacity 300ms linear;
        }

        small.visible {
          opacity: 1;
        }
      `]}};z([s({type:String})],f.prototype,"baseHost",2);z([s({type:String})],f.prototype,"creator",2);z([s({type:String})],f.prototype,"description",2);z([s({type:Boolean})],f.prototype,"embedOptionsVisible",2);z([s({type:String})],f.prototype,"identifier",2);z([s({type:Array})],f.prototype,"sharingOptions",2);z([s({type:String})],f.prototype,"type",2);z([s({type:Boolean})],f.prototype,"renderHeader",2);z([s({type:String})],f.prototype,"fileSubPrefix",2);f=z([I("ia-itemnav-share-panel")],f);const We="data:image/svg+xml,%3csvg%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill='%23000'%20d='M4%206h16v2H4V6zm0%205h16v2H4v-2zm0%205h16v2H4v-2z'%20/%3e%3c/svg%3e";var Xe=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,O=(e,t,o,a)=>{for(var i=a>1?void 0:a?Ge(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Xe(t,o,i),i};const Je=v(We),Ke=[{name:"Midnight",values:{"--item-navigator-theater-bg-color":"#0d1b2a","--item-navigator-share-embed-bg":"#12233a","--item-navigator-menu-slider-bg":"#1b263b","--item-navigator-active-button-bg":"#2c3e50","--item-navigator-text-color":"#e0e6ed","--item-navigator-icon-color":"#e0e6ed","--item-navigator-icon-active-color":"#7fd8ff","--item-navigator-icon-inactive-color":"#9fb3c8","--item-navigator-border-color":"#5c7799","--item-navigator-active-file-border-color":"#4cc9f0"}},{name:"Forest",values:{"--item-navigator-theater-bg-color":"#08160c","--item-navigator-share-embed-bg":"#0e2413","--item-navigator-menu-slider-bg":"#14301a","--item-navigator-active-button-bg":"#1f4a29","--item-navigator-text-color":"#e8f5e9","--item-navigator-icon-color":"#e8f5e9","--item-navigator-icon-active-color":"#7bd88f","--item-navigator-icon-inactive-color":"#9dbca4","--item-navigator-border-color":"#4d8259","--item-navigator-active-file-border-color":"#7bd88f"}},{name:"Plum",values:{"--item-navigator-theater-bg-color":"#150c1a","--item-navigator-share-embed-bg":"#1f1226","--item-navigator-menu-slider-bg":"#2b1733","--item-navigator-active-button-bg":"#3d2147","--item-navigator-text-color":"#f3e8f7","--item-navigator-icon-color":"#f3e8f7","--item-navigator-icon-active-color":"#d9a6ff","--item-navigator-icon-inactive-color":"#b39ec0","--item-navigator-border-color":"#8a6398","--item-navigator-active-file-border-color":"#d09bff"}},{name:"Solarized",values:{"--item-navigator-theater-bg-color":"#00212b","--item-navigator-share-embed-bg":"#002b36","--item-navigator-menu-slider-bg":"#073642","--item-navigator-active-button-bg":"#0b4553","--item-navigator-text-color":"#eee8d5","--item-navigator-icon-color":"#eee8d5","--item-navigator-icon-active-color":"#5fd3c8","--item-navigator-icon-inactive-color":"#93a1a1","--item-navigator-border-color":"#4d8fa1","--item-navigator-active-file-border-color":"#5fd3c8"}},{name:"High Contrast",values:{"--item-navigator-theater-bg-color":"#000000","--item-navigator-share-embed-bg":"#000000","--item-navigator-menu-slider-bg":"#000000","--item-navigator-active-button-bg":"#1a1a1a","--item-navigator-text-color":"#ffffff","--item-navigator-icon-color":"#ffffff","--item-navigator-icon-active-color":"#ffff00","--item-navigator-icon-inactive-color":"#c0c0c0","--item-navigator-border-color":"#ffffff","--item-navigator-active-file-border-color":"#ffff00"}}],Ze="https://archive.org/embed",Qe="https://archive.org/download";function F(e,t,o,a,i){return{identifier:e,mediatype:o,pdfFile:i,title:t,file_prefix:e,file_subprefix:e,file_source:o==="pdf"?`${e}.pdf`:e,url_path:`/details/${e}`,image:"",author:"",orig_sort:a}}const B=[F("Dolly-Parton-Coat-Of-Many-Colors","Coat of Many Colors (album cover)","image",0),F("9to-5and-odd-jobs","9 to 5 and Odd Jobs","image",1),F("musikladen-77","Musikladen Concert, 1977","video",2),F("lp_rhinestone-original-soundtrack-record_various-dolly-parton-floyd-parton-kin-v","Rhinestone: Original Soundtrack Recording","audio",3),F("isbn_9780590899352","Coat of Many Colors","book",4),F("sounds-78-03","Sounds, 3/78","pdf",5,"sounds-78-03.pdf")];let $=class extends k{constructor(){super(...arguments),this.loaded=!0,this.viewAvailable=!0,this.headerOn=!0,this.fullscreen=!1,this.animationsOn=!0,this.sortOrderBy="default",this.sortedFiles=[...B],this.selectedSubPrefix=B[0].file_subprefix}handleFileListSorted(e){const{sortType:t,sortedFiles:o}=e.detail;this.sortOrderBy=t,this.sortedFiles=o}get selectedFile(){return B.find(e=>e.file_subprefix===this.selectedSubPrefix)??B[0]}get theaterSrc(){const e=this.selectedFile;return e.mediatype==="pdf"&&e.pdfFile?`${Qe}/${e.identifier}/${encodeURIComponent(e.pdfFile)}`:`${Ze}/${e.identifier}`}handleFileClick(e){const t=e.composedPath().find(i=>i instanceof HTMLAnchorElement);if(!t)return;e.preventDefault();const o=t.getAttribute("href"),a=B.find(i=>`//archive.org${i.url_path}`===o);a&&(this.selectedSubPrefix=a.file_subprefix)}get demoIdentifier(){return this.selectedFile.identifier}get menuContents(){const e={identifier:this.demoIdentifier,baseHost:"archive.org",subPrefix:""};return[{...e,id:"viewable-files",label:`Viewable Files (${B.length})`,icon:Z,actionButton:l`
          <ia-itemnav-sort-files-button
            .fileListRaw=${B}
            .sortOrderBy=${this.sortOrderBy}
          ></ia-itemnav-sort-files-button>
        `,component:l`
          <ia-itemnav-viewable-files-panel
            baseHost="archive.org"
            subPrefix=${this.selectedSubPrefix}
            .fileList=${this.sortedFiles}
            .sortOrderBy=${this.sortOrderBy}
            @click=${t=>this.handleFileClick(t)}
          ></ia-itemnav-viewable-files-panel>
        `},{...e,id:"share",label:"Share this item",icon:Q,component:l`
          <ia-itemnav-share-panel
            identifier=${this.selectedFile.identifier}
            baseHost="archive.org"
            type="item"
            .description=${this.selectedFile.title}
          ></ia-itemnav-share-panel>
        `},{...e,id:"about",label:"About This Item",icon:Je,component:l`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `}]}get menuShortcuts(){return[{id:"viewable-files",label:"Viewable Files",icon:Z},{id:"share",label:"Share this item",icon:Q}]}get styleInputData(){return{settings:[{label:"Base font size",cssVariable:"--item-navigator-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Menu width",cssVariable:"--item-navigator-menu-width",defaultValue:320,inputType:"range",min:200,max:480,step:10,unit:"px"},{label:"Shortcut rail width",cssVariable:"--item-navigator-menu-margin",defaultValue:42,inputType:"range",min:30,max:64,step:2,unit:"px"},{label:"Animation timing",cssVariable:"--item-navigator-animation-timing",defaultValue:200,inputType:"range",min:0,max:800,step:50,unit:"ms"},{label:"Text color",cssVariable:"--item-navigator-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color",cssVariable:"--item-navigator-icon-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · active",cssVariable:"--item-navigator-icon-active-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · inactive",cssVariable:"--item-navigator-icon-inactive-color",defaultValue:"#999999",inputType:"color"},{label:"Border color",cssVariable:"--item-navigator-border-color",defaultValue:"#4b4b4b",inputType:"color"},{label:"Active file border",cssVariable:"--item-navigator-active-file-border-color",defaultValue:"#538bc5",inputType:"color"},{label:"Theater background",cssVariable:"--item-navigator-theater-bg-color",defaultValue:"#000000",inputType:"color"},{label:"Menu drawer background",cssVariable:"--item-navigator-menu-slider-bg",defaultValue:"#212121",inputType:"color"},{label:"Active panel background",cssVariable:"--item-navigator-active-button-bg",defaultValue:"#333333",inputType:"color"},{label:"Embed field background",cssVariable:"--item-navigator-share-embed-bg",defaultValue:"#151515",inputType:"color"}],palettes:Ke,revertable:!0,showCssVariables:!0}}render(){return l`
      <story-template
        elementTag="ia-item-navigator"
        elementClassName="IAItemNavigator"
        .styleInputData=${this.styleInputData}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <div class="frame-wrapper ${this.fullscreen?"fullscreen":""}">
            <ia-item-navigator
              baseHost="archive.org"
              style=${this.animationsOn?b:"--item-navigator-animation-timing: 0ms"}
              identifier=${this.demoIdentifier}
              .menuContents=${this.menuContents}
              .menuShortcuts=${this.menuShortcuts}
              .viewportInFullscreen=${this.fullscreen||null}
              ?loaded=${this.loaded}
              ?viewAvailable=${this.viewAvailable}
              @fileListSorted=${this.handleFileListSorted}
            >
              ${this.headerTemplate} ${this.theaterTemplate}
            </ia-item-navigator>
          </div>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow("Loaded","loaded")}
            ${this.toggleRow("View available (theater)","viewAvailable")}
            ${this.toggleRow("Header","headerOn")}
            ${this.toggleRow("Fullscreen","fullscreen")}
            ${this.toggleRow("Animate","animationsOn")}
          </table>
          <p class="hint">
            Turn "View available" off to show the no-theater placeholder. Open
            "Viewable Files" and use the sort button in its header. Narrow the
            demo below 600px to see the drawer switch from shift to overlay.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The navigator is a shell: project a theater into
            <code>slot="main"</code> and an optional bar into
            <code>slot="header"</code>, then drive the drawer with the
            <code>menuContents</code> provider array (and the minimized rail
            with <code>menuShortcuts</code>). It never renders a viewer itself.
          </p>
        </div>
      </story-template>
    `}toggleRow(e,t){return l`
      <tr>
        <td>${e}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[t]}
            @change=${o=>{this[t]=o.target.checked}}
          />
        </td>
      </tr>
    `}get headerTemplate(){return!this.headerOn&&!this.fullscreen?b:l`
      <div slot="header" class="demo-header">
        <span class="brand">Internet Archive</span>
        <a
          class="title"
          href="https://archive.org/details/${this.selectedFile.identifier}"
          target="_blank"
          >${this.selectedFile.title}</a
        >
        ${this.fullscreen?l`<button
              class="exit-fs"
              @click=${()=>{this.fullscreen=!1}}
            >
              Exit fullscreen
            </button>`:b}
      </div>
    `}get theaterTemplate(){const e=this.selectedFile;return l`
      <div slot="main" class="demo-theater">
        <iframe
          class="theater-embed"
          src=${this.theaterSrc}
          title=${e.title}
          allow="fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    `}get exampleUsage(){return`<ia-item-navigator
  baseHost="archive.org"
  identifier="\${this.identifier}"
  .menuContents=\${this.menuProviders}
  .menuShortcuts=\${this.menuShortcuts}
  ?loaded=\${this.loaded}
>
  <div slot="header">…your header…</div>
  <div slot="main">…your theater…</div>
</ia-item-navigator>`}static get styles(){return h`
      .frame-wrapper {
        height: 460px;
        border: 1px solid #ccc;
      }

      /* Opt into menu-button labels (the component ships icon-only by
         default), matching the upstream demo. */
      ia-item-navigator {
        --item-navigator-menu-button-label-display: block;
      }

      .demo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #1a1a1a;
        color: #fff;
        padding: 8px 12px;
        font-size: 0.9rem;
      }

      .demo-header .brand {
        font-weight: 600;
        white-space: nowrap;
      }

      .demo-header .title {
        color: #6cb2ff;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .demo-header .exit-fs {
        margin-left: auto;
        cursor: pointer;
      }

      .demo-theater {
        height: 100%;
        width: 100%;
      }

      .theater-embed {
        width: 100%;
        height: 100%;
        border: 0;
        display: block;
      }

      .hint {
        font-size: 0.78rem;
        color: #555;
      }

      table {
        margin-bottom: 0.5rem;
      }
    `}};O([C()],$.prototype,"loaded",2);O([C()],$.prototype,"viewAvailable",2);O([C()],$.prototype,"headerOn",2);O([C()],$.prototype,"fullscreen",2);O([C()],$.prototype,"animationsOn",2);O([C()],$.prototype,"sortOrderBy",2);O([C()],$.prototype,"sortedFiles",2);O([C()],$.prototype,"selectedSubPrefix",2);$=O([I("ia-item-navigator-story")],$);export{$ as IAItemNavigatorStory};
