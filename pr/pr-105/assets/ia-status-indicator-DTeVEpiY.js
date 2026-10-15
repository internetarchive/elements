import{r as p,n,c as v,i as _,b as a,A as h,m as c,w as m,l as y,a as w}from"./index-CqD6m3Zx.js";import{l as f}from"./localized-decorator-BkmUtnSA.js";import{t as x}from"./theme-styles-BVS9wSOT.js";import{a as T,i as C}from"./icon-box-Ds9FqP5n.js";import{a as S,b,c as I,d as k,e as A,_ as $,f as M,g as O,h as R,i as E}from"./mediatype-web-Bv--kU6o.js";var L=Object.defineProperty,z=Object.getOwnPropertyDescriptor,o=(t,e,r,l)=>{for(var s=l>1?void 0:l?z(e,r):e,d=t.length-1,g;d>=0;d--)(g=t[d])&&(s=(l?g(e,r,s):g(s))||s);return l&&s&&L(e,r,s),s};const u=250,D=["ready","loading","success","error"],B={audio:E,collection:R,etree:O,images:M,search:$,software:A,texts:k,tv:I,video:b,web:S};let i=class extends _{constructor(){super(...arguments),this.mode="loading",this.hideDots=!1,this.hasSlottedIcon=!1,this._outgoingModes=new Set,this._canAnimate=!1,this._fadeTimers=new Map}render(){return a`
      <div class="layers ${this._canAnimate?"animate":""}">
        ${D.map(t=>this.layerTemplate(t))}
      </div>
    `}layerTemplate(t){const e=t===this.mode,r=!e&&this._outgoingModes.has(t);return a`<div
      class="layer ${e?"active":r?"outgoing":""}"
      aria-hidden=${e?h:"true"}
    >
      ${e||r?this.modeTemplate(t):h}
    </div>`}modeTemplate(t){switch(t){case"ready":return this.placeholderTemplate;case"loading":return this.loadingIndicatorTemplate;case"success":return this.successIndicatorTemplate;case"error":return this.errorIndicatorTemplate}}willUpdate(t){if(!t.has("mode"))return;const e=t.get("mode");e===void 0||e===this.mode||(this.stopFadingOut(this.mode),this._outgoingModes=new Set(this._outgoingModes).add(e),clearTimeout(this._fadeTimers.get(e)),this._fadeTimers.set(e,setTimeout(()=>this.stopFadingOut(e),u)))}stopFadingOut(t){if(clearTimeout(this._fadeTimers.get(t)),this._fadeTimers.delete(t),!this._outgoingModes.has(t))return;const e=new Set(this._outgoingModes);e.delete(t),this._outgoingModes=e}firstUpdated(){requestAnimationFrame(()=>{requestAnimationFrame(()=>{this._canAnimate=!0})})}disconnectedCallback(){this._fadeTimers.forEach(t=>clearTimeout(t)),this._fadeTimers.clear(),this._outgoingModes=new Set,super.disconnectedCallback()}get placeholderTemplate(){return a`<div class="placeholder"></div>`}get mediatypeGlyph(){if(this.mediatype)return B[this.mediatype]}get hasCenterIcon(){return this.hasSlottedIcon||!!this.mediatypeGlyph}get loadingIndicatorTemplate(){const t=this.hasCenterIcon;return a`
      <div class="indicator">
        ${t?this.iconRingSvg:this.dottedRingSvg}
        <span class="center" ?hidden=${!t}>
          <slot name="icon" @slotchange=${this.handleIconSlotChange}>
            ${this.mediatypeIconTemplate}
          </slot>
        </span>
      </div>
    `}get dottedRingSvg(){return m`
      <svg
        class="loading-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.loadingTitle??c("Loading...")}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="loading-ring"
            d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <g
            class="loading-dots ${this.hideDots?"hidden":""}"
            transform="translate(40.000000, 55.000000)"
          >
            <circle id="left-dot" cx="5" cy="5" r="5"></circle>
            <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
            <circle id="right-dot" cx="35" cy="5" r="5"></circle>
          </g>
        </g>
      </svg>
    `}get iconRingSvg(){return m`
      <svg
        class="loading-indicator icon-ring"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.loadingTitle??c("Loading...")}</title>
        <g fill-rule="evenodd">
          <path
            class="loading-ring"
            fill-rule="nonzero"
            d="m17.8618849 11.6970233c18.5864635-15.59603144 45.6875867-15.59603102 64.2740497.000001 1.9271446 1.6170806 2.1785128 4.4902567.5614466 6.4174186-1.6170661 1.9271618-4.4902166 2.1785323-6.4173612.5614517-15.1996922-12.75416882-37.3625282-12.75416916-52.5622206-.000001-15.19969387 12.7541707-19.04823077 34.5805019-9.1273354 51.7641499 9.9208955 17.183646 30.7471499 24.7638499 49.3923323 17.9774983 18.6451823-6.7863521 29.7266014-25.9801026 26.2811129-45.5206248-.436848-2.4775114 1.2174186-4.8400696 3.6949079-5.2769215 2.4774893-.4368518 4.8400264 1.2174296 5.2768744 3.694941 4.2132065 23.8945096-9.3373563 47.3649806-32.137028 55.6634567-22.799672 8.2984758-48.2663986-.9707372-60.39785211-21.9832155-12.1314534-21.012481-7.42539173-47.7021198 11.16107351-63.2981544z"
          ></path>
        </g>
      </svg>
    `}get mediatypeIconTemplate(){const t=this.mediatypeGlyph;return t?T(t):h}handleIconSlotChange(t){const e=t.target;this.hasSlottedIcon=e.assignedNodes({flatten:!1}).length>0}get successIndicatorTemplate(){return a`
      <svg
        class="success-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.successTitle??c("Success")}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="success-icon"
            d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <polygon
            class="success-icon"
            transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
            points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
          ></polygon>
        </g>
      </svg>
    `}get errorIndicatorTemplate(){return a`
      <svg
        class="error-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.errorTitle??c("Error")}</title>
        <path
          class="error-icon"
          d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
        />
      </svg>
    `}static get styles(){return[x,C,w`
        :host {
          --indicator-width--: var(--icon-width);

          /* Loading */
          --loading-ring-color--: var(--primary-text-color);
          --loading-dot-color--: var(--primary-text-color);
          --loading-icon-color--: var(--primary-text-color);

          /* Success */
          --success-icon-color--: var(--color-success);

          /* Error */
          --error-icon-color--: var(--color-danger);

          display: inline-block;
          width: var(--indicator-width--);
        }

        /* Every mode occupies the same cell, so the element keeps one size */
        .layers {
          display: grid;
        }

        .layer {
          grid-area: 1 / 1;
          opacity: 0;
        }

        .animate .layer {
          transition: opacity ${y(u)}ms ease-out;
        }

        .layer.active {
          opacity: 1;
        }

        /* A ring on its way out would otherwise keep animating unseen */
        .layer.outgoing .loading-ring,
        .layer.outgoing .loading-dots > * {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate .layer {
            transition: none;
          }
        }

        .placeholder {
          height: var(--indicator-width--);
        }

        /* Stacks the center glyph over the ring */
        .indicator {
          position: relative;
          display: block;
        }

        .indicator > svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .center {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }

        .center[hidden] {
          display: none;
        }

        /*
         * Sized to fit within the icon ring's inner diameter. The glyph paints
         * with currentColor, so it recolors with the ring.
         */
        .ia-icon {
          width: 50%;
          height: 50%;
          color: var(--loading-icon-color--);
        }

        /* Block, so the svg isn't padded out by the line box it would sit in */
        .success-indicator,
        .error-indicator {
          display: block;
        }

        .success-icon {
          fill: var(--success-icon-color--);
        }

        .error-icon {
          fill: var(--error-icon-color--);
        }

        .loading-ring {
          fill: var(--loading-ring-color--);
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
        }

        .loading-dots {
          fill: var(--loading-dot-color--);
          transition: opacity 0.25s ease-out;
        }

        .loading-dots.hidden {
          display: none;
        }

        .loading-dots > * {
          opacity: 0;
          animation: dot 1.3s infinite;
        }

        .loading-dots #left-dot {
          animation-delay: 0.2s;
        }

        .loading-dots #middle-dot {
          animation-delay: 0.4s;
        }

        .loading-dots #right-dot {
          animation-delay: 0.6s;
        }

        @keyframes rotate {
          0% {
            transform: rotate(-360deg);
          }
          100% {
            /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
            transform: rotate(0deg);
          }
        }

        @keyframes dot {
          0% {
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `]}};o([n({type:String})],i.prototype,"loadingTitle",2);o([n({type:String})],i.prototype,"successTitle",2);o([n({type:String})],i.prototype,"errorTitle",2);o([n({type:String})],i.prototype,"mode",2);o([n({type:String})],i.prototype,"mediatype",2);o([n({type:Boolean})],i.prototype,"hideDots",2);o([p()],i.prototype,"hasSlottedIcon",2);o([p()],i.prototype,"_outgoingModes",2);o([p()],i.prototype,"_canAnimate",2);i=o([v("ia-status-indicator"),f()],i);
