import{n as d,e as p,c as v,i as m,m as t,b as h,a as b}from"./index-hTMTybrt.js";import{l as f}from"./localized-decorator-C5GEnvoE.js";import{l as g,s as u}from"./topnav-wayback-logo-DZ_ldNHx.js";import{a as y}from"./theme-styles-UqglHpeJ.js";var k=Object.defineProperty,w=Object.getOwnPropertyDescriptor,s=(e,a,c,o)=>{for(var i=o>1?void 0:o?w(a,c):a,n=e.length-1,l;n>=0;n--)(l=e[n])&&(i=(o?l(a,c,i):l(i))||i);return o&&i&&k(a,c,i),i};const x=890;let r=class extends m{constructor(){super(...arguments),this.queryHandler={performQuery:e=>window.location.href=`https://web.archive.org/web/*/${e}`},this.waybackPagesArchived=""}render(){const e=this.waybackPagesArchived||t("1 trillion");return h`
      <form method="post" @submit=${this.handleSubmit}>
        <p>
          ${t(h`Search the history of more than ${e}
              <a
                @click=${this.emitWaybackMachineStatsLinkClicked}
                data-event-click-tracking="TopNav|WaybackMachineStatsLink"
                href="https://blog.archive.org/2016/10/23/defining-web-pages-web-sites-and-web-captures/"
                >web pages</a
              >
              on the Internet.`)}
        </p>
        <fieldset>
          <a
            @click=${this.emitWaybackMachineLogoLinkClicked}
            data-event-click-tracking="TopNav|WaybackMachineLogoLink"
            aria-label=${t("Visit the Wayback Machine")}
            href="https://web.archive.org"
            >${g}</a
          >
          <div class="search-field">
            <input
              type="text"
              aria-label=${t("Search the Wayback Machine")}
              name="url"
              id="url"
              placeholder=${t("Enter URL or keywords")}
            />
            ${u}
          </div>
        </fieldset>
      </form>
    `}handleSubmit(e){e.preventDefault();const a=this.urlInput.value;this.emitWaybackSearchSubmitted(a),this.queryHandler.performQuery(a)}emitWaybackSearchSubmitted(e){this.dispatchEvent(new CustomEvent("waybackSearchSubmitted",{detail:{query:e}}))}emitWaybackMachineStatsLinkClicked(){this.dispatchEvent(new CustomEvent("waybackMachineStatsLinkClicked"))}emitWaybackMachineLogoLinkClicked(){this.dispatchEvent(new CustomEvent("waybackMachineLogoLink"))}static get styles(){return[y,b`
        :host {
          /* The secondary text hook stays first so a host that set it keeps
             its field color; without it, the field takes primary text. */
          --wayback-search-input-text-color--: var(
            --ia-theme-secondary-text-color,
            var(--ia-theme-primary-text-color, var(--ia-color-text-primary--))
          );
          --wayback-search-input-bg--: var(
            --ia-theme-secondary-background-color,
            var(--ia-color-surface-raised--)
          );
          /*
           * Darker than the mobile glyph, which follows --iconFill. The topnav
           * declares this alongside its other color knobs. The token covers
           * mounting this search on its own, where none of those greys exist;
           * it always resolves, which matters because fill inherits and an
           * unresolved value would paint black.
           */
          --wayback-search-desktop-icon-fill--: var(
            --desktopSearchIconFill,
            var(--ia-color-text-primary--)
          );
          --wayback-search-font-family--: var(
            --themeFontFamily,
            var(--ia-font-family-base--)
          );

          font: normal var(--ia-font-size-sm--) / 1.5
            var(--wayback-search-font-family--);
        }

        form {
          max-width: 600px;
        }

        p {
          margin-top: 0;
          font-weight: var(--ia-font-weight-regular--);
        }

        a {
          font-weight: var(--ia-font-weight-bold--);
          text-decoration: none;
          color: var(--activeColor);
        }

        fieldset {
          padding: var(--ia-space-1--) var(--ia-space-4--);
          margin: var(--ia-space-3--) 0;
          box-sizing: border-box;
          text-align: center;
          border: none;
          /* The cream is the panel; no offset shadow. */
          border-radius: var(--ia-radius-lg--);
          background-color: var(--ia-color-brand-wayback--);
        }

        fieldset a {
          font-size: 0;
        }

        fieldset a svg {
          width: 205px;
          height: 55px;
        }

        img {
          width: 100%;
          max-width: 215px;
          max-height: 60px;
          margin-bottom: var(--ia-space-3--);
          vertical-align: middle;
        }

        input {
          display: block;
          width: 100%;
          height: var(--ia-size-control-sm--);
          padding: var(--ia-space-1--) var(--ia-space-2--) var(--ia-space-1--)
            var(--ia-space-6--);
          font: normal var(--ia-font-size-sm--) / 1.5
            var(--wayback-search-font-family--);
          color: var(--wayback-search-input-text-color--);
          box-sizing: border-box;
          border: var(--ia-border-control--);
          border-radius: var(--ia-radius-pill--);
          background: var(--wayback-search-input-bg--);
        }

        input::placeholder {
          color: var(--ia-color-text-secondary--);
        }

        input:focus {
          outline: none;
        }

        /* Over the border, inside the edge, like every text field. */
        input:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--ia-color-border-focus--);
          outline-offset: calc(-1 * var(--ia-size-focus-ring--));
        }

        .search-field {
          position: relative;
          overflow: hidden;
        }

        .search-field svg {
          position: absolute;
          top: 3px;
          left: 3px;
          width: var(--ia-size-icon-lg--);
          height: var(--ia-size-icon-lg--);
          color: var(--iconFill, var(--ia-color-text-primary--));
        }

        @media (min-width: ${x}px) {
          form {
            margin: 0 auto;
          }

          p {
            margin-bottom: var(--ia-space-6--);
            font-size: var(--ia-font-size-lg--);
            text-align: center;
          }

          img {
            margin: 0;
          }

          fieldset {
            margin: 0 auto;
          }

          fieldset a,
          .search-field {
            display: inline-block;
            width: 49%;
            vertical-align: middle;
          }

          fieldset a {
            text-align: center;
          }

          .search-field svg {
            top: 2px;
          }

          .search-field svg {
            color: var(--wayback-search-desktop-icon-fill--);
          }
        }
      `]}};s([d({type:Object})],r.prototype,"queryHandler",2);s([d({type:String})],r.prototype,"waybackPagesArchived",2);s([p("#url")],r.prototype,"urlInput",2);r=s([v("ia-wayback-search-form"),f()],r);export{r as I};
