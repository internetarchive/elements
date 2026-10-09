import{w as v,i as O,n as s,b as l,a as h,c as B,e as R,A as b,r as M,d as ie,f as oe,g as re,t as ae,E as ne}from"./index-D55DL417.js";import{o as se,t as A}from"./story-template-BU8PP1dt.js";import{i as j,a as u}from"./icon-box-DbK6tfSe.js";import{M as le,u as _,v as V,h as W,p as ce}from"./directive-helpers-BsBTJ9im.js";const de=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    fill-rule="evenodd"
    d="m10.5 17.5c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5c-1.38071187 0-2.5-1.1192881-2.5-2.5s1.11928813-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5zm9.5 0c1.3807119 0 2.5 1.1192881 2.5 2.5s-1.1192881 2.5-2.5 2.5-2.5-1.1192881-2.5-2.5 1.1192881-2.5 2.5-2.5z"
  /></svg>`,K=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    fill-rule="evenodd"
    d="m9 0c4.9705627 0 9 4.02943725 9 9 0 4.9705627-4.0294373 9-9 9-4.97056275 0-9-4.0294373-9-9 0-4.97056275 4.02943725-9 9-9zm1.6976167 5.28352881c-.365258-.3556459-.9328083-.37581056-1.32099801-.06558269l-.09308988.0844372-3 3.08108108-.08194436.09533317c-.27484337.36339327-.26799482.87009349.01656959 1.22592581l.084491.09308363 3 2.91891889.09533796.0818904c.3633964.2746544.8699472.2677153 1.2256839-.0167901l.093059-.0844712.0818904-.095338c.2746544-.3633964.2677153-.8699472-.0167901-1.2256839l-.0844712-.093059-2.283355-2.2222741 2.3024712-2.36338332.0819252-.09530804c.2997677-.39632298.2644782-.96313393-.1007797-1.31877983z"
  /></svg>`;var he=Object.defineProperty,me=Object.getOwnPropertyDescriptor,P=(e,t,o,r)=>{for(var i=r>1?void 0:r?me(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&he(t,o,i),i};let $=class extends O{constructor(){super(...arguments),this.icon="",this.href="",this.label="",this.menuDetails="",this.buttonId="",this.selected=!1,this.followable=!1}onClick(e){e.preventDefault(),this.dispatchMenuTypeSelectedEvent()}dispatchMenuTypeSelectedEvent(){this.dispatchEvent(new CustomEvent("menuTypeSelected",{bubbles:!0,composed:!0,detail:{id:this.buttonId}}))}get iconClass(){return this.selected?"active":""}get menuItem(){return l`
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
    `}render(){return this.href?this.linkButton:this.clickButton}static get styles(){return[A,j,h`
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

        /* Our glyphs paint with currentColor, so these supply the paint. */
        .icon .ia-icon {
          color: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active .ia-icon {
          color: var(--item-navigator-icon-active-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .icon .fill-color {
          fill: var(--item-navigator-icon-inactive-color--);
        }

        .icon.active .fill-color {
          fill: var(--item-navigator-icon-active-color--);
        }
      `]}};$.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0};P([s({type:Object})],$.prototype,"icon",2);P([s({type:String})],$.prototype,"href",2);P([s({type:String})],$.prototype,"label",2);P([s({type:Object})],$.prototype,"menuDetails",2);P([s({type:String})],$.prototype,"buttonId",2);P([s({type:Boolean})],$.prototype,"selected",2);P([s({type:Boolean})],$.prototype,"followable",2);$=P([B("ia-itemnav-menu-button")],$);var ue=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,E=(e,t,o,r)=>{for(var i=r>1?void 0:r?pe(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&ue(t,o,i),i};const Z={closeDrawer:"menuSliderClosed",closePanel:"menuPanelClosed"};let T=class extends O{constructor(){super(...arguments),this.menus=[],this.selectedMenu="",this.selectedMenuAction=b,this.isFirstRender=!0}updated(e){const t=this.selectedMenuDetails?.actionButton||b;t!==this.selectedMenuAction&&(this.selectedMenuAction=t),!this.isFirstRender&&e.has("selectedMenu")&&this.moveFocusForSelection(e.get("selectedMenu")),this.isFirstRender=!1}moveFocusForSelection(e){this.selectedMenu?this.panel?.focus():e&&this.menuButtonFor(e)?.focus()}menuButtonFor(e){return[...this.menuList?.querySelectorAll("ia-itemnav-menu-button")??[]].find(o=>o.buttonId===e)}focusDrawer(){if(this.selectedMenu){this.panel?.focus();return}(this.menuList?.querySelector("ia-itemnav-menu-button")??this.drawerCloseButton)?.focus()}closeMenu(){this.dispatchEvent(new CustomEvent(Z.closeDrawer,{detail:this.selectedMenuDetails}))}closePanel(){this.dispatchEvent(new CustomEvent(Z.closePanel,{detail:{id:this.selectedMenu}}))}handleKeyDown(e){e.key==="Escape"&&(e.preventDefault(),this.selectedMenu?this.closePanel():this.closeMenu())}get selectedMenuDetails(){return this.menus.find(e=>e.id===this.selectedMenu)}get selectedMenuClass(){return this.selectedMenu?"open":""}get menuItems(){return this.menus.map(e=>l`
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
      `)}get renderMenuHeader(){const{label:e="",menuDetails:t=""}=this.selectedMenuDetails||{},o=this.selectedMenuAction!==b,r=o?"with-secondary-action":"",i=o?l`<span class="custom-action">${this.selectedMenuAction}</span>`:b,a=e?`Close ${e}`:"Close this panel";return l`
      <header class=${r}>
        <div class="details">
          <h3 id="panel-title">${e}</h3>
          <span class="extra-details">${t}</span>
        </div>
        ${i}
        <button
          class="close"
          aria-label=${a}
          title=${a}
          @click=${this.closePanel}
        >
          ${u(K)}
        </button>
      </header>
    `}get closeButton(){return l`
      <button
        class="close"
        aria-label="Close navigation"
        title="Close navigation"
        @click=${this.closeMenu}
      >
        ${u(K)}
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
    `}static get styles(){const e=h`42px`,t=h`var(--item-navigator-menu-width--)`,o=h`var(--item-navigator-animation-timing--)`;return[A,j,h`
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

        /* Our glyphs paint with currentColor, so this supplies the paint. */
        .ia-icon {
          color: var(--item-navigator-icon-color--);
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
      `]}};E([s({type:Array})],T.prototype,"menus",2);E([s({type:String})],T.prototype,"selectedMenu",2);E([s({type:Object})],T.prototype,"selectedMenuAction",2);E([R(".content")],T.prototype,"panel",2);E([R(".menu-list")],T.prototype,"menuList",2);E([R(".menu > button.close")],T.prototype,"drawerCloseButton",2);T=E([B("ia-itemnav-menu-slider")],T);var ve=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,te=(e,t,o,r)=>{for(var i=r>1?void 0:r?ge(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&ve(t,o,i),i};let X=class extends O{constructor(){super(...arguments),this.identifier=""}emitLoaded(){this.dispatchEvent(new CustomEvent("loadingStateUpdated",{detail:{loaded:!0}}))}updated(e){e.has("identifier")&&this.emitLoaded()}get downloadUrl(){return`/download/${this.identifier}`}render(){return l`
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
    `}static get styles(){return[A,h`
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
      `]}};te([s({type:String})],X.prototype,"identifier",2);X=te([B("ia-itemnav-no-theater-available")],X);var fe=Object.defineProperty,be=Object.getOwnPropertyDescriptor,g=(e,t,o,r)=>{for(var i=r>1?void 0:r?be(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&fe(t,o,i),i};let p=class extends O{constructor(){super(...arguments),this.viewAvailable=!0,this.baseHost="archive.org",this.signedIn=!1,this.menuContents=[],this.menuShortcuts=[],this.viewportInFullscreen=null,this.menuOpened=!1,this.loaded=!1,this.drawerEntering=!1}slotChange(e,t){const o=e.target.assignedNodes()?.[0];this.dispatchEvent(new CustomEvent("slotChange",{detail:{slot:o,type:t}})),this.requestUpdate()}render(){const e=this.loaded?"":"hidden";return l`
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
        ${u(de)}
      </button>
    `}get selectedMenuId(){return this.openMenu||""}get renderSideMenu(){return l`
      <nav aria-label="Item navigation">
        <div
          class="minimized ${ie({hidden:this.menuOpened})}"
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
    `}openShortcut(e=""){this.drawerEntering=!this.menuOpened,this.openMenu=e,this.menuOpened=!0,this.moveFocusForDrawer()}get shortcuts(){const e=this.menuShortcuts.map(({icon:t,id:o,label:r})=>o==="fullscreen"?l`${t}`:l`
        <li>
          <button
            class="shortcut ${o}"
            @click=${()=>this.openShortcut(o)}
            title=${r}
            aria-label=${r}
            aria-expanded=${this.menuOpened&&this.openMenu===o}
          >
            ${t}
          </button>
        </li>
      `);return l`<ul class="shortcuts" role="list">
      ${e}
    </ul>`}get menuClass(){const e=this.menuContents?.length||this.menuShortcuts?.length,t=this.menuOpened&&e?"open":"",o=this.viewportInFullscreen?"fullscreen":"",r=this.shouldRenderMenu?"has-menu":"",i=this.drawerEntering?"drawer-entering":"";return`${t} ${o} ${r} ${i}`}static get styles(){const e=h`var(--item-navigator-menu-width--)`,t=h`var(--item-navigator-animation-timing--)`,o=h`transform ${t} ease-out`,r=h`var(--item-navigator-menu-margin--)`,i=h`var(--item-navigator-theater-bg-color--)`,a=h`var(--item-navigator-icon-size--)`;return[A,j,h`
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
          width: ${r};
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
          width: ${r};
          height: ${r};
        }

        nav .minimized button > * {
          /** Prevent the icon's SVG description from stealing tooltip message */
          pointer-events: none;
        }

        nav .minimized button.toggle-menu > * {
          /* The border only reserves the ring's geometry. The glyph fills the
             border box and the ring itself isn't drawn. */
          border: 2px solid transparent;
          border-radius: ${a};
          width: ${a};
          height: ${a};
          margin: auto;
        }

        /* The glyph fills the ring's border box, so it is as large as the ring
           it sits in rather than the smaller box inside the border, and is
           clipped to the ring's rounded corners. */
        nav .minimized button.toggle-menu > .ia-icon {
          position: relative;
          clip-path: inset(0 round ${a});
        }

        nav .minimized button.toggle-menu > .ia-icon > svg {
          position: absolute;
          inset: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
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
          width: ${a};
          height: ${a};
        }

        /* Our glyphs paint with currentColor, so this supplies the paint. */
        .ia-icon {
          color: var(--item-navigator-icon-color--);
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
          padding-left: ${r};
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
      `]}};g([s({type:String})],p.prototype,"identifier",2);g([s({type:Boolean,reflect:!0})],p.prototype,"viewAvailable",2);g([s({type:String})],p.prototype,"baseHost",2);g([s({type:Boolean})],p.prototype,"signedIn",2);g([s({type:Array})],p.prototype,"menuContents",2);g([s({type:Array})],p.prototype,"menuShortcuts",2);g([s({type:Boolean,reflect:!0,attribute:!0})],p.prototype,"viewportInFullscreen",2);g([s({type:Boolean,reflect:!0})],p.prototype,"menuOpened",2);g([s({type:String,reflect:!0})],p.prototype,"openMenu",2);g([s({type:Boolean,reflect:!0,attribute:!0})],p.prototype,"loaded",2);g([M()],p.prototype,"drawerEntering",2);g([R("ia-itemnav-menu-slider")],p.prototype,"menuSlider",2);g([R("button.toggle-menu")],p.prototype,"toggleMenuButton",2);p=g([B("ia-item-navigator")],p);const Q=(e,t,o)=>{const r=new Map;for(let i=t;i<=o;i++)r.set(e[i],i);return r},we=oe(class extends re{constructor(e){if(super(e),e.type!==ae.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let r;o===void 0?o=t:t!==void 0&&(r=t);const i=[],a=[];let n=0;for(const y of e)i[n]=r?r(y,n):n,a[n]=o(y,n),n++;return{values:a,keys:i}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,r]){const i=le(e),{values:a,keys:n}=this.dt(t,o,r);if(!Array.isArray(i))return this.ut=n,a;const y=this.ut??=[],x=[];let U,G,c=0,m=i.length-1,d=0,f=a.length-1;for(;c<=m&&d<=f;)if(i[c]===null)c++;else if(i[m]===null)m--;else if(y[c]===n[d])x[d]=_(i[c],a[d]),c++,d++;else if(y[m]===n[f])x[f]=_(i[m],a[f]),m--,f--;else if(y[c]===n[f])x[f]=_(i[c],a[f]),V(e,x[f+1],i[c]),c++,f--;else if(y[m]===n[d])x[d]=_(i[m],a[d]),V(e,i[c],i[m]),m--,d++;else if(U===void 0&&(U=Q(n,d,f),G=Q(y,c,m)),U.has(y[c]))if(U.has(y[m])){const S=G.get(n[d]),q=S!==void 0?i[S]:null;if(q===null){const J=V(e,i[c]);_(J,a[d]),x[d]=J}else x[d]=_(q,a[d]),V(e,i[c],q),i[S]=null;d++}else W(i[m]),m--;else W(i[c]),c++;for(;d<=f;){const S=V(e,x[f+1]);_(S,a[d]),x[d++]=S}for(;c<=m;){const S=i[c++];S!==null&&W(S)}return this.ut=n,ce(e,x),ne}}),ye=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m9.83536396 0h10.07241114c.1725502.47117517.3378411.76385809.4958725.87804878.1295523.11419069.3199719.1998337.5712586.25692905.2512868.05709534.4704647.08564301.6575337.08564301h.2806036v15.24362526h-4.3355343v3.8106985h-4.44275v3.7250554h-12.01318261c-.27306495 0-.50313194-.085643-.69020098-.256929-.18706903-.1712861-.30936193-.3425721-.36687867-.5138581l-.06449694-.2785477v-14.2159091c0-.32815965.08627512-.5922949.25882537-.79240577.17255024-.20011086.34510049-.32150776.51765073-.36419068l.25882537-.0640244h3.36472977v-2.54767184c0-.31374722.08627513-.57067627.25882537-.77078714.17255025-.20011086.34510049-.32150776.51765074-.36419068l.25882536-.06402439h3.36472978v-2.56929047c0-.32815964.08627512-.5922949.25882537-.79240576.17255024-.20011087.34510049-.31430156.51765073-.34257207zm10.78355264 15.6294346v-13.53076498c-.2730649-.08536585-.4456152-.16380266-.5176507-.23531042-.1725502-.1424612-.2730649-.27078714-.3015441-.38497783v13.36031043h-9.87808272c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144124-.08962561.006929-.13988296.0640244-.05025735.0570953-.07538603.1427383-.07538603.256929s.02149898.210643.06449694.289357c.04299795.078714.08599591.1322062.12899387.1604767l.06449693.0216187h10.71905571zm-10.2449613-2.4412417h7.98003v-11.60421286h-7.98003zm1.6827837-9.41990022h4.6153002c.1725502 0 .3199718.05349224.4422647.16047672s.1834393.23891353.1834393.39578714c0 .15687362-.0611464.28519956-.1834393.38497783s-.2697145.1496674-.4422647.1496674h-4.6153002c-.1725503 0-.3199719-.04988913-.4422647-.1496674-.1222929-.09977827-.1834394-.22810421-.1834394-.38497783 0-.15687361.0611465-.28880266.1834394-.39578714.1222928-.10698448.2697144-.16047672.4422647-.16047672zm-6.08197737 13.50997782h7.72120467v-.8131929h-3.79610541c-.27306495 0-.49950224-.085643-.67931188-.256929-.17980964-.1712861-.29847284-.3425721-.35598958-.5138581l-.06449694-.2785477v-10.02023282h-2.82530086zm6.77217827-11.36890243h3.2139578c.1295522 0 .240956.05709534.3342113.17128603.0932554.11419069.139883.24972284.139883.40659645 0 .15687362-.0466276.28880267-.139883.39578714-.0932553.10698448-.2046591.16047672-.3342113.16047672h-3.2139578c-.1295523 0-.2373264-.05349224-.3233223-.16047672-.0859959-.10698447-.1289938-.23891352-.1289938-.39578714 0-.15687361.0429979-.29240576.1289938-.40659645s.19377-.17128603.3233223-.17128603zm-11.15043132 15.11557653h7.69942646v-.7491685h-3.79610539c-.25854616 0-.48135376-.0892462-.66842279-.2677384-.18706904-.1784922-.30936193-.3605876-.36687868-.546286l-.06449694-.2569291v-10.04101994h-2.80352266zm14.62237682-4.5606985h-.8191949v2.1410754h-9.89986085s-.04299796.0285477-.12899387.085643c-.08599592.0570954-.12201369.1427384-.10805331.2569291 0 .1141906.01786928.210643.05360784.289357.03573856.0787139.07538603.125.1189424.138858l.06449694.0432373h10.71905575v-2.9542683zm-4.3991936 3.8106985h-.8191949v2.077051h-9.8563045c0 .0144124-.02149898.0144124-.06449694 0-.04299795-.0144125-.08962561.0105321-.13988296.0748337-.05025735.0643015-.07538603.1607538-.07538603.289357 0 .1141906.02149898.2070399.06449694.2785476.04299795.0715078.08599591.1141907.12899387.1280488l.06449693.0216186h10.69811519v-2.8686252z"
  /></svg>`;var xe=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,D=(e,t,o,r)=>{for(var i=r>1?void 0:r?$e(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&xe(t,o,i),i};const Y=u(ye);let L=class extends O{constructor(){super(...arguments),this.baseHost="archive.org",this.sortOrderBy="default",this.subPrefix="",this.fileList=[],this.addSortToUrl=!1}updated(e){(e.has("fileList")||e.has("subPrefix"))&&this.revealActiveFile()}connectedCallback(){super.connectedCallback(),this.revealActiveFile()}async revealActiveFile(){await this.updateComplete,this.shadowRoot?.querySelector(".content.active")?.scrollIntoView({block:"nearest",inline:"nearest"})}fileUrl(e){const t=`//${this.baseHost}${e.url_path}`;return this.addSortToUrl&&this.sortOrderBy!=="default"?`${t}?sort=${this.sortOrderBy}`:t}get pdfLabel(){return l`<span class="pdf-label"
      ><span class="sr-only">view this</span> PDF</span
    >`}fileLi(e){const t=this.subPrefix===e.file_subprefix?" active":"",o=this.fileUrl(e),r=(e.file_source??"").match(/^[^+]+\.pdf$/i);return l`
      <li>
        <div class="separator"></div>
        <div class="content${t}">
          <a href=${o}>
            <p class="item-title">
              ${e.title}${r?this.pdfLabel:b}
            </p>
          </a>
        </div>
      </li>
    `}get fileListTemplate(){const e=we(this.fileList,t=>t?.file_prefix,this.fileLi.bind(this));return l`
      <ul>
        ${e}
        <div class="separator"></div>
      </ul>
    `}render(){return this.fileList.length?this.fileListTemplate:b}static get styles(){return[A,h`
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
      `]}};D([s({type:String})],L.prototype,"baseHost",2);D([s({type:String})],L.prototype,"sortOrderBy",2);D([s({type:String})],L.prototype,"subPrefix",2);D([s({type:Array})],L.prototype,"fileList",2);D([s({type:Boolean,reflect:!0})],L.prototype,"addSortToUrl",2);L=D([B("ia-itemnav-viewable-files-panel")],L);const ze=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><g fill="none" fill-rule="evenodd">
    <path
      d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
      fill="currentColor"
      fill-rule="nonzero"
    />
    <path
      d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
      fill="currentColor"
      fill-rule="nonzero"
    />
    <path
      d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.661538"
      transform="matrix(1 0 0 -1 0 18.692308)"
    />
  </g></svg>`,Ce=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><g fill="none" fill-rule="evenodd">
    <path
      d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
      fill="currentColor"
      fill-rule="nonzero"
    />
    <path
      d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
      fill="currentColor"
      fill-rule="nonzero"
    />
    <path
      d="m10.3846154 11.0769231 2.7692308 5.5384615 2.7692307-5.5384615m-2.7692307 4.1538461v-13.15384612"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.661538"
    />
  </g></svg>`,Se=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><g fill="currentColor" fill-rule="evenodd">
    <path
      d="m2.32514544 8.30769231.7756949-2.08468003h2.92824822l.75630252 2.08468003h1.01809955l-2.70523594-6.92307693h-1.01809955l-2.69553976 6.92307693zm3.41305753-2.86037492h-2.34647705l1.17323853-3.22883h.01939237z"
      fill-rule="nonzero"
    />
    <path
      d="m7.1689722 16.6153846v-.7756949h-4.4117647l4.29541047-5.3716871v-.77569491h-5.06140918v.77569491h3.97543633l-4.30510666 5.3716871v.7756949z"
      fill-rule="nonzero"
    />
    <circle cx="13" cy="9" r="2" />
  </g></svg>`;var Oe=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,N=(e,t,o,r)=>{for(var i=r>1?void 0:r?Me(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&Oe(t,o,i),i};const ke=u(ze),Te=u(Ce),Be=u(Se);let H=class extends O{constructor(){super(...arguments),this.fileListRaw=[],this.fileListSorted=[],this.sortOrderBy="default"}render(){return l`<div class="sort-multi-file-list">${this.sortButton}</div>`}get sortButton(){return{default:l`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${()=>this.sortVolumes("title_asc")}
        >
          ${Be}
        </button>
      `,title_asc:l`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${()=>this.sortVolumes("title_desc")}
        >
          ${ke}
        </button>
      `,title_desc:l`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${()=>this.sortVolumes("default")}
        >
          ${Te}
        </button>
      `}[this.sortOrderBy]}sortVolumes(e){this.sortOrderBy=e;const t=[...this.fileListRaw].sort((o,r)=>e==="title_asc"?o.title.localeCompare(r.title):e==="title_desc"?r.title.localeCompare(o.title):(o.orig_sort??0)-(r.orig_sort??0));this.dispatchEvent(new CustomEvent("fileListSorted",{detail:{sortType:e,sortedFiles:t},bubbles:!0,composed:!0})),this.fileListSorted=t}static get styles(){return[A,j,h`
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

        /* The glyph paints with currentColor, so this supplies the paint. */
        button.sort-by .ia-icon {
          width: var(--item-navigator-header-icon-size--);
          height: var(--item-navigator-header-icon-size--);
          color: var(--item-navigator-icon-color--);
        }
      `]}};N([s({type:Array})],H.prototype,"fileListRaw",2);N([s({type:Array})],H.prototype,"fileListSorted",2);N([s({type:String,reflect:!0})],H.prototype,"sortOrderBy",2);H=N([B("ia-itemnav-sort-files-button")],H);const Pe=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="M70.6784759,10 L70.6784759,21.3240186 C64.5020053,21.66334 58.9104278,22.5826126 53.9037433,24.0818363 C48.8970588,25.5810601 44.8495989,27.4085163 41.7613636,29.5642049 C38.6731283,31.7198935 35.9982175,34.0552229 33.736631,36.5701929 C31.4750446,39.085163 29.8217469,41.5657574 28.776738,44.011976 C27.7317291,46.4581947 26.9173351,48.6848525 26.3335561,50.6919494 C25.7497772,52.6990464 25.4088681,54.3324462 25.3108289,55.592149 L25.2372995,57.4085163 C29.0296346,54.1661122 33.1751337,51.5524507 37.6737968,49.5675316 C42.1724599,47.5826126 46.2934492,46.3118208 50.0367647,45.7551564 C53.7800802,45.1984919 57.2571301,44.8713684 60.4679144,44.7737858 C63.6786988,44.6762031 66.1831551,44.7726769 67.9812834,45.0632069 L70.6784759,45.499002 L70.6784759,57.4051896 L100,33.3765802 L70.6784759,10 Z M76.4438503,62.4883566 L82.8609626,57.1157685 C82.9099822,57.0669772 82.9946524,57.0303837 83.1149733,57.005988 C83.2352941,56.9815924 83.4536542,56.9571967 83.7700535,56.9328011 C84.0864528,56.9084054 84.3905971,56.9449989 84.6824866,57.0425815 C84.9743761,57.1401641 85.217246,57.2854291 85.4110963,57.4783766 C85.6049465,57.671324 85.7263815,57.8409847 85.7754011,57.9873586 L85.8489305,58.2035928 L85.8489305,90 L0,90 L0,17.910845 L43.1784759,17.910845 C43.2765152,17.9596363 43.410205,18.0317143 43.5795455,18.1270792 C43.7488859,18.222444 43.9438503,18.4519849 44.1644385,18.8157019 C44.3850267,19.1794189 44.469697,19.5542249 44.4184492,19.9401198 C44.4184492,20.2794411 44.3092692,20.582169 44.0909091,20.8483034 C43.872549,21.1144378 43.6664439,21.3206919 43.4725936,21.4670659 L43.1818182,21.6134398 C40.557041,23.06609 38.2954545,24.396762 36.3970588,25.6054558 L30.7820856,29.8170326 L11.5274064,29.8170326 L11.5274064,78.1669993 L74.1811497,78.1669993 L74.1811497,65.5355955 C74.1811497,65.1009093 74.3995098,64.6407186 74.8362299,64.1550233 L76.4438503,62.4883566 Z"
  /></svg>`,_e=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m31.5297453 8.76273313c-.3135031.40766104-.7447036.83083673-1.2936015 1.26952707-.5488979.4386904-.9169698.7837578-1.1042157 1.0352022.1562166 2.319709-.1417719 4.5297454-.8939653 6.6301092-.7521935 2.1003638-1.8023754 3.9182538-3.1505457 5.45367-1.3481704 1.5354162-2.9627648 2.8284828-4.8437835 3.8791996-1.8810186 1.0507169-3.8321207 1.7483416-5.8533062 2.092874s-4.1215493.2894286-6.30109136-.1653114c-2.17954205-.45474-4.2092874-1.3401455-6.08923604-2.6562165 2.72737.4697196 5.67408517-.2514445 8.8401455-2.1634924-3.0719024-.7521935-4.88979241-2.2881447-5.45367-4.6078537 1.12882516.0631287 1.86550396.0631287 2.21003638 0-2.91568586-1.2850417-4.38904344-3.3693558-4.42007276-6.2529424.21934517.0310293.53284828.1487267.94050931.3530922s.78375775.3060133 1.12829017.3049433c-.81532206-.7211641-1.41076396-1.9045581-1.7863257-3.5501819-.37556173-1.64562376-.17173122-3.17355015.61149155-4.58377912 1.81789001 1.88101862 3.6908838 3.36989086 5.61898138 4.46661672 1.92809757 1.0967259 4.22426707 1.7547614 6.88850847 1.9741066-.2503745-1.1908838-.1722662-2.32719882.2343248-3.40894502.4065911-1.0817462 1.0416221-1.93612241 1.9050931-2.56312861.863471-.62700621 1.8114702-1.0817462 2.8439975-1.36421999 1.0325272-.28247378 2.0827091-.27444896 3.1505456.02407447s1.9767815.87042585 2.726835 1.71570726c1.3791997-.37663172 2.6802911-.87845068 3.9032742-1.50545688-.0310293.37663171-.1407019.74470361-.3290178 1.1042157-.1883158.35951209-.3530922.62593623-.4943291.79927242s-.3841216.4317355-.728654.77519795c-.3445324.34346244-.5638776.57832227-.6580355.70457949.2193452-.09415792.6895998-.23539482 1.410764-.42371067.7211641-.18831586 1.2069334-.39214638 1.4573079-.61149155 0 .44350524-.1567516.86668093-.4702547 1.27434196z"
  /></svg>`,Ie=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m30.91057 19.2442068.2670004-5.3339402h-5.7329237c-.0890001-3.4962895.25183-5.42243459 1.0224903-5.77843514.3560005-.17800028.8004955-.28925046 1.333485-.33375053s1.0442346-.0520853 1.5337353-.02275571c.4895008.02932959 1.045246.01466479 1.6672356-.04399439.0890001-1.59997977.1335002-3.24445961.1335002-4.93343953-2.1633102-.20732987-3.6742898-.28115953-4.5329389-.22148898-2.8146294.17800028-4.7847688 1.25965538-5.9104183 3.2449653-.1780003.3256596-.3261653.68873971-.444495 1.08924034-.1183298.40050062-.2144095.76358074-.2882391 1.08924034-.0738297.32565959-.125915.7848194-.1562559 1.37747942-.030341.59266002-.052591 1.04474028-.0667501 1.35624078-.0141592.3115005-.0217444.8449956-.0227558 1.6004854v1.5777298h-3.8229605v5.3339401h3.8669549v14.622824h5.8224296c0-.3560006-.0146648-1.6819003-.0439944-3.9776994-.0293296-2.295799-.0515796-4.2957737-.0667501-5.9999241s-.0075853-3.2525506.0227557-4.6452005h5.4219289z"
  /></svg>`,Le=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m8.50321407 8.54544475v5.32088575c.15641786.0310693.6819176.0310693 1.57649923 0 .8945816-.0310693 1.3574071.0160703 1.3884764.1414189.0942792 1.5695354.1333837 3.2253149.1173133 4.9673385-.0160703 1.7420236-.0316049 3.3426283-.0466039 4.8018141s.2046288 2.824628.6588835 4.0963267c.4542546 1.2716986 1.1999178 2.2209194 2.2369897 2.8476622 1.2556283.784232 2.9896167 1.207953 5.2019653 1.271163 2.2123485.0632099 4.1659648-.2506972 5.8608487-.9417213-.0310693-.3449764-.0230341-1.4045467.0241055-3.1787109.0471397-1.7741643-.0080351-2.75499-.1655244-2.9424772-3.5472571 1.0360005-5.697467.6904885-6.4506298-1.0365361-.7220934-1.6638147-.8635123-4.9909084-.4242566-9.981281v-.046604h6.7318605v-5.32088568h-6.7318605v-6.54383772h-4.0497228c-.2828378 1.28669763-.6122795 2.35376743-.9883252 3.20120941-.3760457.84744199-.98029 1.60060471-1.812733 2.25948817-.832443.65888347-1.87594303 1.01993018-3.1305 1.08314014z"
  /></svg>`,Ae=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m11.9051049 30.5873434.653491-1.0742755.4207845-.839975c.2805229-.591861.5371377-1.2533214.7698443-1.9843813.2327065-.7310599.4659444-1.6029125.6997135-2.6155579.2337692-1.0126455.4128151-1.752206.5371377-2.2186817.0308151.030815.0775689.0855382.1402615.1641697.0626927.0786314.1094465.1333547.1402615.1641697.1243227.1870153.2178304.311338.280523.372968 1.1210293.964829 2.3817888 1.4631823 3.7822785 1.4950599 1.4939973 0 2.8790795-.3426843 4.1552465-1.0280529 2.1166733-1.1826593 3.6733633-3.1128487 4.6700699-5.7905679.4048457-1.1518444.6848374-2.5996192.8399751-4.3433245.1243226-1.587505-.0781002-3.0974411-.6072685-4.5298084-.903199-2.36638128-2.5528653-4.20306294-4.948999-5.51004497-1.276167-.65349101-2.5990879-1.05833667-3.9687625-1.21453696-1.525875-.21783034-3.1293188-.17107651-4.8103315.14026149-2.7701643.52916833-5.02709913 1.743174-6.77080442 3.64201699-1.99235065 2.14748836-2.98852598 4.62225355-2.98852598 7.42429545 0 2.9571797.9494215 5.0584455 2.84826449 6.3037975l.83997504.4207845c.12432268 0 .22526845.0154075.3028373.0462225s.1551377.0074381.23270656-.0701308c.07756885-.0775688.13229208-.1243226.16416969-.1402614s.07066204-.0860696.11635328-.2103923c.04569124-.1243226.07703756-.2098609.09403895-.2566147.01700139-.0467539.04834771-.1476996.09403895-.3028373s.06906816-.2486454.07013074-.280523l.14026149-.5132295c.06269263-.311338.09403895-.5291684.09403895-.653491-.03081502-.1243227-.12432268-.2799917-.28052297-.467007-.15620029-.1870154-.23376915-.2959305-.23270656-.3267455-.62267599-.8096914-.9494215-1.7904592-.98023652-2.9423035-.03081502-1.55669.28052297-2.9731185.93401399-4.24928547 1.18265932-2.45882635 3.17501002-3.93741618 5.97705192-4.43576949 1.6183201-.311338 3.1356943-.25661476 4.5521228.16416969 1.4164285.42078446 2.5135496 1.09765239 3.2913633 2.03060379.8405063 1.02752164 1.3229208 2.28828114 1.4472435 3.78227848.1243227 1.4004897-.0313463 2.9725872-.467007 4.7162925-.3740306 1.3696746-.9186065 2.5528653-1.6337275 3.5495719-.9967066 1.245352-2.0863896 1.8834355-3.269049 1.9142505-1.7118277.0626926-2.7547568-.6375522-3.1287874-2.1007345-.0935077-.4664757 0-1.2134744.2805229-2.240996.7469987-2.5842117 1.1359055-3.9384788 1.1667206-4.0628015.1870153-1.0275216.2024228-1.7904591.0462225-2.2888124-.1870153-.65349104-.5759222-1.15928246-1.1667205-1.51737429-.5907984-.35809182-1.2756357-.39687625-2.054512-.11635327-1.1826594.43566067-1.9610044 1.40048968-2.335035 2.89448706-.311338 1.306982-.2491767 2.6299028.186484 3.9687625 0 .0626926.0313463.1402615.094039.2327065.0626926.0924451.0940389.1700139.0940389.2327066 0 .0935076-.0313463.2491766-.0940389.467007-.0626927.2178303-.094039.3580918-.094039.4207844-.0935076.4356607-.3038999 1.3308903-.6311767 2.6856887-.3272768 1.3547985-.5838915 2.3897582-.7698443 3.1048793-.7778136 3.2068876-1.12049796 5.5881451-1.02805289 7.1437725l.37296809 2.7558194c.653491-.591861 1.2294131-1.2299445 1.7277664-1.9142505z"
  /></svg>`,Ee=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m32 7.04156803v19.91686397c0 .5752421-.4763773 1.041568-1.0640184 1.041568h-27.87196316c-.58764116 0-1.06401844-.4663259-1.06401844-1.041568v-19.91686397c0-.57524214.47637728-1.04156803 1.06401844-1.04156803h27.87196316c.5876411 0 1.0640184.46632589 1.0640184 1.04156803zm-26.25039901 1.19676167 10.04327011 10.1323738c.5135662.4194048.8817166.6291071 1.1044511.6291071.1198794 0 .2695514-.0503424.4490158-.1510273.1794644-.100685.3291364-.2013699.4490158-.3020548l.1798191-.1510273 10.1198794-10.15841306zm16.77212271 9.7303286 6.8831353 6.7889404v-13.5778809zm-17.92871075-6.6379131v13.350819l6.78098955-6.6629107zm22.09008685 14.2059464-5.9074304-5.8588202-.9757049.9551179-.3594018.3295984c-.0342324.0304241-.0665646.0587822-.0969964.0850743l-.1597867.1329606c-.0684912.0540844-.1198794.0895749-.1541644.1064714-.6674943.3687151-1.3523675.5530727-2.0546196.5530727-.65047 0-1.3782586-.218035-2.1833659-.6541048l-.6682036-.4520405-1.0278418-1.0311524-5.95850326 5.832781z"
  /></svg>`,Fe=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path
    fill="currentColor"
    d="m7.80511706 12.3659763c1.2669254-2.2579539 4.09819784-2.9949938 6.41200864-1.7733458l.2295791.12871 1.6067188.9559859 3.5467013-6.31849361c1.2682451-2.26030597 4.104098-2.99652769 6.4192376-1.76952182l.2223501.12488594 3.2168204 1.91103915c2.2770002 1.3527136 3.1866331 4.21502324 2.0564431 6.51290984l-.1198433.2278304-5.2002499 9.2680474c-1.2669254 2.2579539-4.0981978 2.9949938-6.4120086 1.7733458l-.2295791-.12871-1.6096554-.9558482-3.5437647 6.3183559c-1.2682451 2.260306-4.104098 2.9965277-6.41923761 1.7695218l-.22235013-.1248859-3.21682032-1.9110392c-2.27700024-1.3527136-3.18663314-4.2150232-2.05644312-6.5129098l.11984332-.2278304zm13.93955474-5.73311741-3.563271 6.35055051c1.889633 1.4530595 2.5776248 4.0429866 1.5410255 6.156875l-.1223014.2328355-.4183304.7430134 1.6096554.9558483c1.1431442.6791157 2.5155496.3977368 3.1667361-.5628389l.0921501-.1491451 5.2002498-9.2680474c.5752467-1.0252226.2110342-2.4011579-.8559335-3.14755806l-.1742742-.11247814-3.2168203-1.91103915c-1.1402863-.67741793-2.5086889-.39913772-3.1618387.55564729zm-11.79500786 7.00714351-5.20024982 9.2680474c-.57524673 1.0252226-.21103426 2.4011579.85593348 3.1475581l.17427416.1124781 3.21682032 1.9110392c1.14028632.6774179 2.50868892.3991377 3.16183872-.5556473l.0970474-.1563368 3.5622708-6.3513198c-1.8888875-1.4532134-2.5764504-4.042623-1.5400057-6.1561456l.1222818-.2327956.4153938-.7428758-1.6067188-.9559859c-1.1431442-.6791157-2.5155496-.3977368-3.1667361.5628389zm6.97653866 1.5796652-.3817806.6812386c-.5117123.9119895-.2800268 2.1014993.528439 2.8785267l.382717-.6803391c.5119098-.9123415.2798478-2.1024176-.5293754-2.8794262z"
  /></svg>`;var De=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,C=(e,t,o,r)=>{for(var i=r>1?void 0:r?Ve(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&De(t,o,i),i};const ee=u(Pe);let w=class extends O{constructor(){super(...arguments),this.baseHost="archive.org",this.creator="",this.description="",this.embedOptionsVisible=!1,this.identifier="",this.sharingOptions=[],this.type="",this.renderHeader=!1,this.fileSubPrefix="",this.copyNoteTimeouts=new WeakMap}updated(e){e.has("sharingOptions")&&!this.sharingOptions.length&&this.loadProviders()}loadProviders(){let e=`https://${this.baseHost}/details/${this.identifier}`;this.fileSubPrefix&&(e+=`/${this.fileSubPrefix}`);const t=[this.description,this.creator,"Free Download, Borrow, and Streaming","Internet Archive"].filter(Boolean).join(" : ");this.sharingOptions=[{name:"Twitter",icon:u(_e),url:`https://twitter.com/intent/tweet?${new URLSearchParams({url:e,text:t,via:"internetarchive"})}`},{name:"Facebook",icon:u(Ie),url:`https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({u:e})}`},{name:"Tumblr",icon:u(Le),url:`https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams({posttype:"link",canonicalUrl:e,title:t})}`},{name:"Pinterest",icon:u(Ae),url:`http://www.pinterest.com/pin/create/button/?${new URLSearchParams({url:e,description:t})}`},{name:"Email",icon:u(Ee),url:`mailto:?${new URLSearchParams({subject:t,body:e})}`}]}async copyToClipboard(e){const t=e.currentTarget,o=t.querySelector("textarea"),r=t.querySelector("small");if(!(!o||!r)){try{await navigator.clipboard.writeText(o.value)}catch{o.select(),document.execCommand("copy"),o.blur()}r.classList.add("visible"),clearTimeout(this.copyNoteTimeouts.get(r)),this.copyNoteTimeouts.set(r,setTimeout(()=>r.classList.remove("visible"),4e3))}}get iframeEmbed(){return`<iframe
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
            ${u(Fe)} Get an embeddable link
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
    `}static get styles(){return[A,j,h`
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
          /* The border only reserves geometry. It isn't drawn. */
          border: 1px solid transparent;
          border-radius: 7px;
        }

        .share-option .ia-icon {
          /* Reset to the base so the icon (em) doesn't compound against the
             share-option's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size--);
          width: 2em;
          height: 2em;
          position: relative;
          /* The glyph fills the border box (the padding box plus the 1px
             border) and is clipped to its rounded corners. */
          clip-path: inset(0 round 7px);
        }

        .share-option .ia-icon > svg {
          position: absolute;
          inset: -1px;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
        }

        /* Our glyphs paint with currentColor, so this supplies the paint. */
        .ia-icon {
          color: var(--item-navigator-icon-color--);
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
      `]}};C([s({type:String})],w.prototype,"baseHost",2);C([s({type:String})],w.prototype,"creator",2);C([s({type:String})],w.prototype,"description",2);C([s({type:Boolean})],w.prototype,"embedOptionsVisible",2);C([s({type:String})],w.prototype,"identifier",2);C([s({type:Array})],w.prototype,"sharingOptions",2);C([s({type:String})],w.prototype,"type",2);C([s({type:Boolean})],w.prototype,"renderHeader",2);C([s({type:String})],w.prototype,"fileSubPrefix",2);w=C([B("ia-itemnav-share-panel")],w);const He=v`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" /></svg>`;var Re=Object.defineProperty,je=Object.getOwnPropertyDescriptor,k=(e,t,o,r)=>{for(var i=r>1?void 0:r?je(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(r?n(t,o,i):n(i))||i);return r&&i&&Re(t,o,i),i};const Ue=u(He),Ne=[{name:"Midnight",values:{"--item-navigator-theater-bg-color":"#0d1b2a","--item-navigator-share-embed-bg":"#12233a","--item-navigator-menu-slider-bg":"#1b263b","--item-navigator-active-button-bg":"#2c3e50","--item-navigator-text-color":"#e0e6ed","--item-navigator-icon-color":"#e0e6ed","--item-navigator-icon-active-color":"#7fd8ff","--item-navigator-icon-inactive-color":"#9fb3c8","--item-navigator-border-color":"#5c7799","--item-navigator-active-file-border-color":"#4cc9f0"}},{name:"Forest",values:{"--item-navigator-theater-bg-color":"#08160c","--item-navigator-share-embed-bg":"#0e2413","--item-navigator-menu-slider-bg":"#14301a","--item-navigator-active-button-bg":"#1f4a29","--item-navigator-text-color":"#e8f5e9","--item-navigator-icon-color":"#e8f5e9","--item-navigator-icon-active-color":"#7bd88f","--item-navigator-icon-inactive-color":"#9dbca4","--item-navigator-border-color":"#4d8259","--item-navigator-active-file-border-color":"#7bd88f"}},{name:"Plum",values:{"--item-navigator-theater-bg-color":"#150c1a","--item-navigator-share-embed-bg":"#1f1226","--item-navigator-menu-slider-bg":"#2b1733","--item-navigator-active-button-bg":"#3d2147","--item-navigator-text-color":"#f3e8f7","--item-navigator-icon-color":"#f3e8f7","--item-navigator-icon-active-color":"#d9a6ff","--item-navigator-icon-inactive-color":"#b39ec0","--item-navigator-border-color":"#8a6398","--item-navigator-active-file-border-color":"#d09bff"}},{name:"Solarized",values:{"--item-navigator-theater-bg-color":"#00212b","--item-navigator-share-embed-bg":"#002b36","--item-navigator-menu-slider-bg":"#073642","--item-navigator-active-button-bg":"#0b4553","--item-navigator-text-color":"#eee8d5","--item-navigator-icon-color":"#eee8d5","--item-navigator-icon-active-color":"#5fd3c8","--item-navigator-icon-inactive-color":"#93a1a1","--item-navigator-border-color":"#4d8fa1","--item-navigator-active-file-border-color":"#5fd3c8"}},{name:"High Contrast",values:{"--item-navigator-theater-bg-color":"#000000","--item-navigator-share-embed-bg":"#000000","--item-navigator-menu-slider-bg":"#000000","--item-navigator-active-button-bg":"#1a1a1a","--item-navigator-text-color":"#ffffff","--item-navigator-icon-color":"#ffffff","--item-navigator-icon-active-color":"#ffff00","--item-navigator-icon-inactive-color":"#c0c0c0","--item-navigator-border-color":"#ffffff","--item-navigator-active-file-border-color":"#ffff00"}}],qe="https://archive.org/embed",We="https://archive.org/download";function F(e,t,o,r,i){return{identifier:e,mediatype:o,pdfFile:i,title:t,file_prefix:e,file_subprefix:e,file_source:o==="pdf"?`${e}.pdf`:e,url_path:`/details/${e}`,image:"",author:"",orig_sort:r}}const I=[F("Dolly-Parton-Coat-Of-Many-Colors","Coat of Many Colors (album cover)","image",0),F("9to-5and-odd-jobs","9 to 5 and Odd Jobs","image",1),F("musikladen-77","Musikladen Concert, 1977","video",2),F("lp_rhinestone-original-soundtrack-record_various-dolly-parton-floyd-parton-kin-v","Rhinestone: Original Soundtrack Recording","audio",3),F("isbn_9780590899352","Coat of Many Colors","book",4),F("sounds-78-03","Sounds, 3/78","pdf",5,"sounds-78-03.pdf")];let z=class extends O{constructor(){super(...arguments),this.loaded=!0,this.viewAvailable=!0,this.headerOn=!0,this.fullscreen=!1,this.animationsOn=!0,this.sortOrderBy="default",this.sortedFiles=[...I],this.selectedSubPrefix=I[0].file_subprefix}handleFileListSorted(e){const{sortType:t,sortedFiles:o}=e.detail;this.sortOrderBy=t,this.sortedFiles=o}get selectedFile(){return I.find(e=>e.file_subprefix===this.selectedSubPrefix)??I[0]}get theaterSrc(){const e=this.selectedFile;return e.mediatype==="pdf"&&e.pdfFile?`${We}/${e.identifier}/${encodeURIComponent(e.pdfFile)}`:`${qe}/${e.identifier}`}handleFileClick(e){const t=e.composedPath().find(i=>i instanceof HTMLAnchorElement);if(!t)return;e.preventDefault();const o=t.getAttribute("href"),r=I.find(i=>`//archive.org${i.url_path}`===o);r&&(this.selectedSubPrefix=r.file_subprefix)}get demoIdentifier(){return this.selectedFile.identifier}get menuContents(){const e={identifier:this.demoIdentifier,baseHost:"archive.org",subPrefix:""};return[{...e,id:"viewable-files",label:`Viewable Files (${I.length})`,icon:Y,actionButton:l`
          <ia-itemnav-sort-files-button
            .fileListRaw=${I}
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
        `},{...e,id:"share",label:"Share this item",icon:ee,component:l`
          <ia-itemnav-share-panel
            identifier=${this.selectedFile.identifier}
            baseHost="archive.org"
            type="item"
            .description=${this.selectedFile.title}
          ></ia-itemnav-share-panel>
        `},{...e,id:"about",label:"About This Item",icon:Ue,component:l`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `}]}get menuShortcuts(){return[{id:"viewable-files",label:"Viewable Files",icon:Y},{id:"share",label:"Share this item",icon:ee}]}get styleInputData(){return{settings:[{label:"Base font size",cssVariable:"--item-navigator-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Menu width",cssVariable:"--item-navigator-menu-width",defaultValue:320,inputType:"range",min:200,max:480,step:10,unit:"px"},{label:"Shortcut rail width",cssVariable:"--item-navigator-menu-margin",defaultValue:42,inputType:"range",min:30,max:64,step:2,unit:"px"},{label:"Animation timing",cssVariable:"--item-navigator-animation-timing",defaultValue:200,inputType:"range",min:0,max:800,step:50,unit:"ms"},{label:"Text color",cssVariable:"--item-navigator-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color",cssVariable:"--item-navigator-icon-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · active",cssVariable:"--item-navigator-icon-active-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · inactive",cssVariable:"--item-navigator-icon-inactive-color",defaultValue:"#999999",inputType:"color"},{label:"Border color",cssVariable:"--item-navigator-border-color",defaultValue:"#4b4b4b",inputType:"color"},{label:"Active file border",cssVariable:"--item-navigator-active-file-border-color",defaultValue:"#538bc5",inputType:"color"},{label:"Theater background",cssVariable:"--item-navigator-theater-bg-color",defaultValue:"#000000",inputType:"color"},{label:"Menu drawer background",cssVariable:"--item-navigator-menu-slider-bg",defaultValue:"#212121",inputType:"color"},{label:"Active panel background",cssVariable:"--item-navigator-active-button-bg",defaultValue:"#333333",inputType:"color"},{label:"Embed field background",cssVariable:"--item-navigator-share-embed-bg",defaultValue:"#151515",inputType:"color"}],palettes:Ne,revertable:!0,showCssVariables:!0}}render(){return l`
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
    `}};k([M()],z.prototype,"loaded",2);k([M()],z.prototype,"viewAvailable",2);k([M()],z.prototype,"headerOn",2);k([M()],z.prototype,"fullscreen",2);k([M()],z.prototype,"animationsOn",2);k([M()],z.prototype,"sortOrderBy",2);k([M()],z.prototype,"sortedFiles",2);k([M()],z.prototype,"selectedSubPrefix",2);z=k([B("ia-item-navigator-story")],z);export{z as IAItemNavigatorStory};
