import{n as d,e as m,c as p,i as b,m as r,b as h,a as g}from"./index-XcqyTHC9.js";import{l as f}from"./localized-decorator-DYMA1fuk.js";import{l as u,s as v}from"./topnav-wayback-logo-DcD6fYAe.js";import{t as k}from"./theme-styles-CU2VzG3d.js";var y=Object.defineProperty,w=Object.getOwnPropertyDescriptor,n=(e,a,c,o)=>{for(var t=o>1?void 0:o?w(a,c):a,s=e.length-1,l;s>=0;s--)(l=e[s])&&(t=(o?l(a,c,t):l(t))||t);return o&&t&&y(a,c,t),t};const x=890;let i=class extends b{constructor(){super(...arguments),this.queryHandler={performQuery:e=>window.location.href=`https://web.archive.org/web/*/${e}`},this.waybackPagesArchived=""}render(){const e=this.waybackPagesArchived||r("1 trillion");return h`
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
            >${u}</a
          >
          <div class="search-field">
            <input
              type="text"
              aria-label=${r("Search the Wayback Machine")}
              name="url"
              id="url"
              placeholder=${r("Enter URL or keywords")}
            />
            ${v}
          </div>
        </fieldset>
      </form>
    `}handleSubmit(e){e.preventDefault();const a=this.urlInput.value;this.emitWaybackSearchSubmitted(a),this.queryHandler.performQuery(a)}emitWaybackSearchSubmitted(e){this.dispatchEvent(new CustomEvent("waybackSearchSubmitted",{detail:{query:e}}))}emitWaybackMachineStatsLinkClicked(){this.dispatchEvent(new CustomEvent("waybackMachineStatsLinkClicked"))}emitWaybackMachineLogoLinkClicked(){this.dispatchEvent(new CustomEvent("waybackMachineLogoLink"))}static get styles(){return[k,g`
        :host {
          --wayback-search-input-text-color--: var(
            --ia-theme-secondary-text-color,
            #666
          );
          --wayback-search-input-bg--: var(
            --ia-theme-secondary-background-color,
            #fff
          );
          /*
           * Darker than the mobile glyph, which follows --iconFill. The topnav
           * declares this alongside its other color knobs. The literal covers
           * mounting this search on its own, where none of those greys exist,
           * and it has to be a literal because fill inherits: an unresolved
           * value paints black rather than falling through to another rule.
           */
          --wayback-search-desktop-icon-fill--: var(
            --desktopSearchIconFill,
            #333
          );

          font: normal 1.2rem/1.5 var(--themeFontFamily);
        }

        form {
          max-width: 600px;
        }

        p {
          margin-top: 0;
          font-weight: 200;
        }

        a {
          font-weight: 500;
          text-decoration: none;
          color: var(--activeColor);
        }

        fieldset {
          padding: 0.7rem 2rem;
          margin: 1.5rem 0;
          box-sizing: border-box;
          text-align: center;
          border: none;
          border-radius: 7px;
          background-color: #fcf5e6;
          box-shadow: 3px 3px 0 0 #c3ad97;
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
          font: normal 1.2rem/1.5 var(--themeFontFamily);
          color: var(--wayback-search-input-text-color--);
          box-sizing: border-box;
          border: 1px solid var(--grey80);
          border-radius: 2rem;
          background: var(--wayback-search-input-bg--);
        }

        input:focus {
          border-color: #66afe9;
          outline: none;
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
          color: var(--iconFill, #000);
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
      `]}};n([d({type:Object})],i.prototype,"queryHandler",2);n([d({type:String})],i.prototype,"waybackPagesArchived",2);n([m("#url")],i.prototype,"urlInput",2);i=n([p("ia-wayback-search-form"),f()],i);export{i as I};
