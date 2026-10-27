import{i as O,n as s,b as l,a as h,c as P,e as R,A as b,r as C,d as te,g as ie,h as oe,j as ae,E as re}from"./index-DOnjAgMW.js";import{t as A}from"./theme-styles-DdbzCQHQ.js";import{i as J,h as ne,v as se,c as le,b as ce,s as de,d as he,t as me,f as ue,a as pe,p as ve,g as ge,e as be,l as fe}from"./viewable-files-CxnmLdhx.js";import{i as j,a as u}from"./icon-box-DdP3sSRx.js";import{o as ye}from"./story-template-UStg7old.js";import{M as we,u as k,v as V,h as q,p as xe}from"./directive-helpers-BzaTwwLH.js";import"./syntax-highlighter-CrTAb8fa.js";var $e=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,_=(e,t,o,a)=>{for(var i=a>1?void 0:a?ze(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&$e(t,o,i),i};let x=class extends O{constructor(){super(...arguments),this.icon="",this.href="",this.label="",this.menuDetails="",this.buttonId="",this.selected=!1,this.followable=!1}onClick(e){e.preventDefault(),this.dispatchMenuTypeSelectedEvent()}dispatchMenuTypeSelectedEvent(){this.dispatchEvent(new CustomEvent("menuTypeSelected",{bubbles:!0,composed:!0,detail:{id:this.buttonId}}))}get iconClass(){return this.selected?"active":""}get menuItem(){return l`
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
        aria-expanded=${ye(this.followable?void 0:this.selected)}
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
      `]}};x.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0};_([s({type:Object})],x.prototype,"icon",2);_([s({type:String})],x.prototype,"href",2);_([s({type:String})],x.prototype,"label",2);_([s({type:Object})],x.prototype,"menuDetails",2);_([s({type:String})],x.prototype,"buttonId",2);_([s({type:Boolean})],x.prototype,"selected",2);_([s({type:Boolean})],x.prototype,"followable",2);x=_([P("ia-itemnav-menu-button")],x);var Se=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,E=(e,t,o,a)=>{for(var i=a>1?void 0:a?Oe(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Se(t,o,i),i};const K={closeDrawer:"menuSliderClosed",closePanel:"menuPanelClosed"};let T=class extends O{constructor(){super(...arguments),this.menus=[],this.selectedMenu="",this.selectedMenuAction=b,this.isFirstRender=!0}updated(e){const t=this.selectedMenuDetails?.actionButton||b;t!==this.selectedMenuAction&&(this.selectedMenuAction=t),!this.isFirstRender&&e.has("selectedMenu")&&this.moveFocusForSelection(e.get("selectedMenu")),this.isFirstRender=!1}moveFocusForSelection(e){this.selectedMenu?this.panel?.focus():e&&this.menuButtonFor(e)?.focus()}menuButtonFor(e){return[...this.menuList?.querySelectorAll("ia-itemnav-menu-button")??[]].find(o=>o.buttonId===e)}focusDrawer(){if(this.selectedMenu){this.panel?.focus();return}(this.menuList?.querySelector("ia-itemnav-menu-button")??this.drawerCloseButton)?.focus()}closeMenu(){this.dispatchEvent(new CustomEvent(K.closeDrawer,{detail:this.selectedMenuDetails}))}closePanel(){this.dispatchEvent(new CustomEvent(K.closePanel,{detail:{id:this.selectedMenu}}))}handleKeyDown(e){e.key==="Escape"&&(e.preventDefault(),this.selectedMenu?this.closePanel():this.closeMenu())}get selectedMenuDetails(){return this.menus.find(e=>e.id===this.selectedMenu)}get selectedMenuClass(){return this.selectedMenu?"open":""}get menuItems(){return this.menus.map(e=>l`
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
          ${u(J)}
        </button>
      </header>
    `}get closeButton(){return l`
      <button
        class="close"
        aria-label="Close navigation"
        title="Close navigation"
        @click=${this.closeMenu}
      >
        ${u(J)}
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
      `]}};E([s({type:Array})],T.prototype,"menus",2);E([s({type:String})],T.prototype,"selectedMenu",2);E([s({type:Object})],T.prototype,"selectedMenuAction",2);E([R(".content")],T.prototype,"panel",2);E([R(".menu-list")],T.prototype,"menuList",2);E([R(".menu > button.close")],T.prototype,"drawerCloseButton",2);T=E([P("ia-itemnav-menu-slider")],T);var Ce=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,ee=(e,t,o,a)=>{for(var i=a>1?void 0:a?Me(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Ce(t,o,i),i};let W=class extends O{constructor(){super(...arguments),this.identifier=""}emitLoaded(){this.dispatchEvent(new CustomEvent("loadingStateUpdated",{detail:{loaded:!0}}))}updated(e){e.has("identifier")&&this.emitLoaded()}get downloadUrl(){return`/download/${this.identifier}`}render(){return l`
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
      `]}};ee([s({type:String})],W.prototype,"identifier",2);W=ee([P("ia-itemnav-no-theater-available")],W);var Te=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,v=(e,t,o,a)=>{for(var i=a>1?void 0:a?Pe(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Te(t,o,i),i};let p=class extends O{constructor(){super(...arguments),this.viewAvailable=!0,this.baseHost="archive.org",this.signedIn=!1,this.menuContents=[],this.menuShortcuts=[],this.viewportInFullscreen=null,this.menuOpened=!1,this.loaded=!1,this.drawerEntering=!1}slotChange(e,t){const o=e.target.assignedNodes()?.[0];this.dispatchEvent(new CustomEvent("slotChange",{detail:{slot:o,type:t}})),this.requestUpdate()}render(){const e=this.loaded?"":"hidden";return l`
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
        ${u(ne)}
      </button>
    `}get selectedMenuId(){return this.openMenu||""}get renderSideMenu(){return l`
      <nav aria-label="Item navigation">
        <div
          class="minimized ${te({hidden:this.menuOpened})}"
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
    </ul>`}get menuClass(){const e=this.menuContents?.length||this.menuShortcuts?.length,t=this.menuOpened&&e?"open":"",o=this.viewportInFullscreen?"fullscreen":"",a=this.shouldRenderMenu?"has-menu":"",i=this.drawerEntering?"drawer-entering":"";return`${t} ${o} ${a} ${i}`}static get styles(){const e=h`var(--item-navigator-menu-width--)`,t=h`var(--item-navigator-animation-timing--)`,o=h`transform ${t} ease-out`,a=h`var(--item-navigator-menu-margin--)`,i=h`var(--item-navigator-theater-bg-color--)`,r=h`var(--item-navigator-icon-size--)`;return[A,j,h`
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
          /* The border only reserves the ring's geometry. The glyph fills the
             border box and the ring itself isn't drawn. */
          border: 2px solid transparent;
          border-radius: ${r};
          width: ${r};
          height: ${r};
          margin: auto;
        }

        /* The glyph fills the ring's border box, so it is as large as the ring
           it sits in rather than the smaller box inside the border, and is
           clipped to the ring's rounded corners. */
        nav .minimized button.toggle-menu > .ia-icon {
          position: relative;
          clip-path: inset(0 round ${r});
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
          width: ${r};
          height: ${r};
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
      `]}};v([s({type:String})],p.prototype,"identifier",2);v([s({type:Boolean,reflect:!0})],p.prototype,"viewAvailable",2);v([s({type:String})],p.prototype,"baseHost",2);v([s({type:Boolean})],p.prototype,"signedIn",2);v([s({type:Array})],p.prototype,"menuContents",2);v([s({type:Array})],p.prototype,"menuShortcuts",2);v([s({type:Boolean,reflect:!0,attribute:!0})],p.prototype,"viewportInFullscreen",2);v([s({type:Boolean,reflect:!0})],p.prototype,"menuOpened",2);v([s({type:String,reflect:!0})],p.prototype,"openMenu",2);v([s({type:Boolean,reflect:!0,attribute:!0})],p.prototype,"loaded",2);v([C()],p.prototype,"drawerEntering",2);v([R("ia-itemnav-menu-slider")],p.prototype,"menuSlider",2);v([R("button.toggle-menu")],p.prototype,"toggleMenuButton",2);p=v([P("ia-item-navigator")],p);const Q=(e,t,o)=>{const a=new Map;for(let i=t;i<=o;i++)a.set(e[i],i);return a},_e=ie(class extends oe{constructor(e){if(super(e),e.type!==ae.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let a;o===void 0?o=t:t!==void 0&&(a=t);const i=[],r=[];let n=0;for(const y of e)i[n]=a?a(y,n):n,r[n]=o(y,n),n++;return{values:r,keys:i}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,a]){const i=we(e),{values:r,keys:n}=this.dt(t,o,a);if(!Array.isArray(i))return this.ut=n,r;const y=this.ut??=[],w=[];let H,X,c=0,m=i.length-1,d=0,g=r.length-1;for(;c<=m&&d<=g;)if(i[c]===null)c++;else if(i[m]===null)m--;else if(y[c]===n[d])w[d]=k(i[c],r[d]),c++,d++;else if(y[m]===n[g])w[g]=k(i[m],r[g]),m--,g--;else if(y[c]===n[g])w[g]=k(i[c],r[g]),V(e,w[g+1],i[c]),c++,g--;else if(y[m]===n[d])w[d]=k(i[m],r[d]),V(e,i[c],i[m]),m--,d++;else if(H===void 0&&(H=Q(n,d,g),X=Q(y,c,m)),H.has(y[c]))if(H.has(y[m])){const S=X.get(n[d]),N=S!==void 0?i[S]:null;if(N===null){const G=V(e,i[c]);k(G,r[d]),w[d]=G}else w[d]=k(N,r[d]),V(e,i[c],N),i[S]=null;d++}else q(i[m]),m--;else q(i[c]),c++;for(;d<=g;){const S=V(e,w[g+1]);k(S,r[d]),w[d++]=S}for(;c<=m;){const S=i[c++];S!==null&&q(S)}return this.ut=n,xe(e,w),re}});var ke=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,D=(e,t,o,a)=>{for(var i=a>1?void 0:a?Ie(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&ke(t,o,i),i};const Y=u(se);let B=class extends O{constructor(){super(...arguments),this.baseHost="archive.org",this.sortOrderBy="default",this.subPrefix="",this.fileList=[],this.addSortToUrl=!1}updated(e){(e.has("fileList")||e.has("subPrefix"))&&this.revealActiveFile()}connectedCallback(){super.connectedCallback(),this.revealActiveFile()}async revealActiveFile(){await this.updateComplete,this.shadowRoot?.querySelector(".content.active")?.scrollIntoView({block:"nearest",inline:"nearest"})}fileUrl(e){const t=`//${this.baseHost}${e.url_path}`;return this.addSortToUrl&&this.sortOrderBy!=="default"?`${t}?sort=${this.sortOrderBy}`:t}get pdfLabel(){return l`<span class="pdf-label"
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
    `}get fileListTemplate(){const e=_e(this.fileList,t=>t?.file_prefix,this.fileLi.bind(this));return l`
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
      `]}};D([s({type:String})],B.prototype,"baseHost",2);D([s({type:String})],B.prototype,"sortOrderBy",2);D([s({type:String})],B.prototype,"subPrefix",2);D([s({type:Array})],B.prototype,"fileList",2);D([s({type:Boolean,reflect:!0})],B.prototype,"addSortToUrl",2);B=D([P("ia-itemnav-viewable-files-panel")],B);var Be=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,U=(e,t,o,a)=>{for(var i=a>1?void 0:a?Ae(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Be(t,o,i),i};const Ee=u(le),Fe=u(ce),De=u(de);let L=class extends O{constructor(){super(...arguments),this.fileListRaw=[],this.fileListSorted=[],this.sortOrderBy="default"}render(){return l`<div class="sort-multi-file-list">${this.sortButton}</div>`}get sortButton(){return{default:l`
        <button
          class="sort-by neutral-icon"
          aria-label="Sort volumes in initial order"
          @click=${()=>this.sortVolumes("title_asc")}
        >
          ${De}
        </button>
      `,title_asc:l`
        <button
          class="sort-by asc-icon"
          aria-label="Sort volumes in ascending order"
          @click=${()=>this.sortVolumes("title_desc")}
        >
          ${Ee}
        </button>
      `,title_desc:l`
        <button
          class="sort-by desc-icon"
          aria-label="Sort volumes in descending order"
          @click=${()=>this.sortVolumes("default")}
        >
          ${Fe}
        </button>
      `}[this.sortOrderBy]}sortVolumes(e){this.sortOrderBy=e;const t=[...this.fileListRaw].sort((o,a)=>e==="title_asc"?o.title.localeCompare(a.title):e==="title_desc"?a.title.localeCompare(o.title):(o.orig_sort??0)-(a.orig_sort??0));this.dispatchEvent(new CustomEvent("fileListSorted",{detail:{sortType:e,sortedFiles:t},bubbles:!0,composed:!0})),this.fileListSorted=t}static get styles(){return[A,j,h`
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
      `]}};U([s({type:Array})],L.prototype,"fileListRaw",2);U([s({type:Array})],L.prototype,"fileListSorted",2);U([s({type:String,reflect:!0})],L.prototype,"sortOrderBy",2);L=U([P("ia-itemnav-sort-files-button")],L);var Ve=Object.defineProperty,Le=Object.getOwnPropertyDescriptor,z=(e,t,o,a)=>{for(var i=a>1?void 0:a?Le(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Ve(t,o,i),i};const Z=u(he);let f=class extends O{constructor(){super(...arguments),this.baseHost="archive.org",this.creator="",this.description="",this.embedOptionsVisible=!1,this.identifier="",this.sharingOptions=[],this.type="",this.renderHeader=!1,this.fileSubPrefix="",this.copyNoteTimeouts=new WeakMap}updated(e){e.has("sharingOptions")&&!this.sharingOptions.length&&this.loadProviders()}loadProviders(){let e=`https://${this.baseHost}/details/${this.identifier}`;this.fileSubPrefix&&(e+=`/${this.fileSubPrefix}`);const t=[this.description,this.creator,"Free Download, Borrow, and Streaming","Internet Archive"].filter(Boolean).join(" : ");this.sharingOptions=[{name:"Twitter",icon:u(me),url:`https://twitter.com/intent/tweet?${new URLSearchParams({url:e,text:t,via:"internetarchive"})}`},{name:"Facebook",icon:u(ue),url:`https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({u:e})}`},{name:"Tumblr",icon:u(pe),url:`https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams({posttype:"link",canonicalUrl:e,title:t})}`},{name:"Pinterest",icon:u(ve),url:`http://www.pinterest.com/pin/create/button/?${new URLSearchParams({url:e,description:t})}`},{name:"Email",icon:u(ge),url:`mailto:?${new URLSearchParams({subject:t,body:e})}`}]}async copyToClipboard(e){const t=e.currentTarget,o=t.querySelector("textarea"),a=t.querySelector("small");if(!(!o||!a)){try{await navigator.clipboard.writeText(o.value)}catch{o.select(),document.execCommand("copy"),o.blur()}a.classList.add("visible"),clearTimeout(this.copyNoteTimeouts.get(a)),this.copyNoteTimeouts.set(a,setTimeout(()=>a.classList.remove("visible"),4e3))}}get iframeEmbed(){return`<iframe
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
            ${u(be)} Get an embeddable link
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
      `]}};z([s({type:String})],f.prototype,"baseHost",2);z([s({type:String})],f.prototype,"creator",2);z([s({type:String})],f.prototype,"description",2);z([s({type:Boolean})],f.prototype,"embedOptionsVisible",2);z([s({type:String})],f.prototype,"identifier",2);z([s({type:Array})],f.prototype,"sharingOptions",2);z([s({type:String})],f.prototype,"type",2);z([s({type:Boolean})],f.prototype,"renderHeader",2);z([s({type:String})],f.prototype,"fileSubPrefix",2);f=z([P("ia-itemnav-share-panel")],f);var Re=Object.defineProperty,je=Object.getOwnPropertyDescriptor,M=(e,t,o,a)=>{for(var i=a>1?void 0:a?je(t,o):t,r=e.length-1,n;r>=0;r--)(n=e[r])&&(i=(a?n(t,o,i):n(i))||i);return a&&i&&Re(t,o,i),i};const He=u(fe),Ue=[{name:"Midnight",values:{"--item-navigator-theater-bg-color":"#0d1b2a","--item-navigator-share-embed-bg":"#12233a","--item-navigator-menu-slider-bg":"#1b263b","--item-navigator-active-button-bg":"#2c3e50","--item-navigator-text-color":"#e0e6ed","--item-navigator-icon-color":"#e0e6ed","--item-navigator-icon-active-color":"#7fd8ff","--item-navigator-icon-inactive-color":"#9fb3c8","--item-navigator-border-color":"#5c7799","--item-navigator-active-file-border-color":"#4cc9f0"}},{name:"Forest",values:{"--item-navigator-theater-bg-color":"#08160c","--item-navigator-share-embed-bg":"#0e2413","--item-navigator-menu-slider-bg":"#14301a","--item-navigator-active-button-bg":"#1f4a29","--item-navigator-text-color":"#e8f5e9","--item-navigator-icon-color":"#e8f5e9","--item-navigator-icon-active-color":"#7bd88f","--item-navigator-icon-inactive-color":"#9dbca4","--item-navigator-border-color":"#4d8259","--item-navigator-active-file-border-color":"#7bd88f"}},{name:"Plum",values:{"--item-navigator-theater-bg-color":"#150c1a","--item-navigator-share-embed-bg":"#1f1226","--item-navigator-menu-slider-bg":"#2b1733","--item-navigator-active-button-bg":"#3d2147","--item-navigator-text-color":"#f3e8f7","--item-navigator-icon-color":"#f3e8f7","--item-navigator-icon-active-color":"#d9a6ff","--item-navigator-icon-inactive-color":"#b39ec0","--item-navigator-border-color":"#8a6398","--item-navigator-active-file-border-color":"#d09bff"}},{name:"Solarized",values:{"--item-navigator-theater-bg-color":"#00212b","--item-navigator-share-embed-bg":"#002b36","--item-navigator-menu-slider-bg":"#073642","--item-navigator-active-button-bg":"#0b4553","--item-navigator-text-color":"#eee8d5","--item-navigator-icon-color":"#eee8d5","--item-navigator-icon-active-color":"#5fd3c8","--item-navigator-icon-inactive-color":"#93a1a1","--item-navigator-border-color":"#4d8fa1","--item-navigator-active-file-border-color":"#5fd3c8"}},{name:"High Contrast",values:{"--item-navigator-theater-bg-color":"#000000","--item-navigator-share-embed-bg":"#000000","--item-navigator-menu-slider-bg":"#000000","--item-navigator-active-button-bg":"#1a1a1a","--item-navigator-text-color":"#ffffff","--item-navigator-icon-color":"#ffffff","--item-navigator-icon-active-color":"#ffff00","--item-navigator-icon-inactive-color":"#c0c0c0","--item-navigator-border-color":"#ffffff","--item-navigator-active-file-border-color":"#ffff00"}}],Ne="https://archive.org/embed",qe="https://archive.org/download";function F(e,t,o,a,i){return{identifier:e,mediatype:o,pdfFile:i,title:t,file_prefix:e,file_subprefix:e,file_source:o==="pdf"?`${e}.pdf`:e,url_path:`/details/${e}`,image:"",author:"",orig_sort:a}}const I=[F("Dolly-Parton-Coat-Of-Many-Colors","Coat of Many Colors (album cover)","image",0),F("9to-5and-odd-jobs","9 to 5 and Odd Jobs","image",1),F("musikladen-77","Musikladen Concert, 1977","video",2),F("lp_rhinestone-original-soundtrack-record_various-dolly-parton-floyd-parton-kin-v","Rhinestone: Original Soundtrack Recording","audio",3),F("isbn_9780590899352","Coat of Many Colors","book",4),F("sounds-78-03","Sounds, 3/78","pdf",5,"sounds-78-03.pdf")];let $=class extends O{constructor(){super(...arguments),this.loaded=!0,this.viewAvailable=!0,this.headerOn=!0,this.fullscreen=!1,this.animationsOn=!0,this.sortOrderBy="default",this.sortedFiles=[...I],this.selectedSubPrefix=I[0].file_subprefix}handleFileListSorted(e){const{sortType:t,sortedFiles:o}=e.detail;this.sortOrderBy=t,this.sortedFiles=o}get selectedFile(){return I.find(e=>e.file_subprefix===this.selectedSubPrefix)??I[0]}get theaterSrc(){const e=this.selectedFile;return e.mediatype==="pdf"&&e.pdfFile?`${qe}/${e.identifier}/${encodeURIComponent(e.pdfFile)}`:`${Ne}/${e.identifier}`}handleFileClick(e){const t=e.composedPath().find(i=>i instanceof HTMLAnchorElement);if(!t)return;e.preventDefault();const o=t.getAttribute("href"),a=I.find(i=>`//archive.org${i.url_path}`===o);a&&(this.selectedSubPrefix=a.file_subprefix)}get demoIdentifier(){return this.selectedFile.identifier}get menuContents(){const e={identifier:this.demoIdentifier,baseHost:"archive.org",subPrefix:""};return[{...e,id:"viewable-files",label:`Viewable Files (${I.length})`,icon:Y,actionButton:l`
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
        `},{...e,id:"share",label:"Share this item",icon:Z,component:l`
          <ia-itemnav-share-panel
            identifier=${this.selectedFile.identifier}
            baseHost="archive.org"
            type="item"
            .description=${this.selectedFile.title}
          ></ia-itemnav-share-panel>
        `},{...e,id:"about",label:"About This Item",icon:He,component:l`
          <p>
            The item navigator is a shell: each menu entry here is a "provider"
            supplying its own panel body. The theater on the right is slotted in
            by the host.
          </p>
        `}]}get menuShortcuts(){return[{id:"viewable-files",label:"Viewable Files",icon:Y},{id:"share",label:"Share this item",icon:Z}]}get styleInputData(){return{settings:[{label:"Base font size",cssVariable:"--item-navigator-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Menu width",cssVariable:"--item-navigator-menu-width",defaultValue:320,inputType:"range",min:200,max:480,step:10,unit:"px"},{label:"Shortcut rail width",cssVariable:"--item-navigator-menu-margin",defaultValue:42,inputType:"range",min:30,max:64,step:2,unit:"px"},{label:"Animation timing",cssVariable:"--item-navigator-animation-timing",defaultValue:200,inputType:"range",min:0,max:800,step:50,unit:"ms"},{label:"Text color",cssVariable:"--item-navigator-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color",cssVariable:"--item-navigator-icon-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · active",cssVariable:"--item-navigator-icon-active-color",defaultValue:"#ffffff",inputType:"color"},{label:"Icon color · inactive",cssVariable:"--item-navigator-icon-inactive-color",defaultValue:"#999999",inputType:"color"},{label:"Border color",cssVariable:"--item-navigator-border-color",defaultValue:"#4b4b4b",inputType:"color"},{label:"Active file border",cssVariable:"--item-navigator-active-file-border-color",defaultValue:"#538bc5",inputType:"color"},{label:"Theater background",cssVariable:"--item-navigator-theater-bg-color",defaultValue:"#000000",inputType:"color"},{label:"Menu drawer background",cssVariable:"--item-navigator-menu-slider-bg",defaultValue:"#212121",inputType:"color"},{label:"Active panel background",cssVariable:"--item-navigator-active-button-bg",defaultValue:"#333333",inputType:"color"},{label:"Embed field background",cssVariable:"--item-navigator-share-embed-bg",defaultValue:"#151515",inputType:"color"}],palettes:Ue,revertable:!0,showCssVariables:!0}}render(){return l`
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
    `}};M([C()],$.prototype,"loaded",2);M([C()],$.prototype,"viewAvailable",2);M([C()],$.prototype,"headerOn",2);M([C()],$.prototype,"fullscreen",2);M([C()],$.prototype,"animationsOn",2);M([C()],$.prototype,"sortOrderBy",2);M([C()],$.prototype,"sortedFiles",2);M([C()],$.prototype,"selectedSubPrefix",2);$=M([P("ia-item-navigator-story")],$);export{$ as IAItemNavigatorStory};
