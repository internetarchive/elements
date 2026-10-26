import{n as d,e as m,c as p,i as b,m as r,b as h,a as f}from"./index-C2FQnv_e.js";import{l as u}from"./localized-decorator-B5OK1PY7.js";import{l as v,s as g}from"./topnav-wayback-logo-F_ZDvZku.js";import{t as y}from"./theme-styles-BJQUsykD.js";var k=Object.defineProperty,w=Object.getOwnPropertyDescriptor,c=(e,a,n,o)=>{for(var t=o>1?void 0:o?w(a,n):a,s=e.length-1,l;s>=0;s--)(l=e[s])&&(t=(o?l(a,n,t):l(t))||t);return o&&t&&k(a,n,t),t};const x=890;let i=class extends b{constructor(){super(...arguments),this.queryHandler={performQuery:e=>window.location.href=`https://web.archive.org/web/*/${e}`},this.waybackPagesArchived=""}render(){const e=this.waybackPagesArchived||r("1 trillion");return h`
      <form method="post" @submit=${this.handleSubmit}>
        <p>
          ${r(h`Search the history of more than ${e}
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
            aria-label=${r("Visit the Wayback Machine")}
            href="https://web.archive.org"
            >${v}</a
          >
          <div class="search-field">
            <input
              type="text"
              aria-label=${r("Search the Wayback Machine")}
              name="url"
              id="url"
              placeholder=${r("Enter URL or keywords")}
            />
            ${g}
          </div>
        </fieldset>
      </form>
    `}handleSubmit(e){e.preventDefault();const a=this.urlInput.value;this.emitWaybackSearchSubmitted(a),this.queryHandler.performQuery(a)}emitWaybackSearchSubmitted(e){this.dispatchEvent(new CustomEvent("waybackSearchSubmitted",{detail:{query:e}}))}emitWaybackMachineStatsLinkClicked(){this.dispatchEvent(new CustomEvent("waybackMachineStatsLinkClicked"))}emitWaybackMachineLogoLinkClicked(){this.dispatchEvent(new CustomEvent("waybackMachineLogoLink"))}static get styles(){return[y,f`
        :host {
          --wayback-search-input-text-color--: var(
            --ia-theme-primary-text-color,
            var(--ia-color-text-primary--)
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

          font: normal 1.2rem/1.5 var(--wayback-search-font-family--);
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
          padding: 0.7rem 2rem;
          margin: 1.5rem 0;
          box-sizing: border-box;
          text-align: center;
          border: none;
          /* The cream is the panel; no offset shadow (D-14). */
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
          margin-bottom: 1.3rem;
          vertical-align: middle;
        }

        input {
          display: block;
          width: 100%;
          height: 3rem;
          padding: 0.5rem 1rem 0.5rem 3rem;
          font: normal 1.2rem/1.5 var(--wayback-search-font-family--);
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

        /* Inside the edge: the field's wrapper clips anything outside it. */
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
          width: 2.4rem;
          height: 2.4rem;
          color: var(--iconFill, var(--ia-color-text-primary--));
        }

        @media (min-width: ${x}px) {
          form {
            margin: 0 auto;
          }

          p {
            margin-bottom: 3rem;
            font-size: 1.6rem;
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
      `]}};c([d({type:Object})],i.prototype,"queryHandler",2);c([d({type:String})],i.prototype,"waybackPagesArchived",2);c([m("#url")],i.prototype,"urlInput",2);i=c([p("ia-wayback-search-form"),u()],i);export{i as I};
