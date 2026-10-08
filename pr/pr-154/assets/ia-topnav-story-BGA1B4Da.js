import{i as l,g as p,b as d,a as m,r as a,c as g}from"./index-DpQoML9j.js";import"./story-template-B-AFmlzJ.js";var u=Object.defineProperty,v=Object.getOwnPropertyDescriptor,n=(e,t,r,s)=>{for(var o=s>1?void 0:s?v(t,r):t,h=e.length-1,c;h>=0;h--)(c=e[h])&&(o=(s?c(t,r,o):c(o))||o);return s&&o&&u(t,r,o),o};const f="goody",b="uploader@archive.org",y="https://openlibrary.org/search/inside?q=",S="10px";let i=class extends l{constructor(){super(...arguments),this.signedIn=!1,this.onAnItem=!1,this.admin=!1,this.canManageFlags=!1,this.hideSearch=!1,this.lastEvent="",this.archiveFontSize=p(window.location.hash)==="ia-topnav"}updated(){const e=document.documentElement.style;this.archiveFontSize&&this.rootFontSizeBefore===void 0?(this.rootFontSizeBefore=e.fontSize,e.fontSize=S):this.archiveFontSize||this.restoreRootFontSize()}disconnectedCallback(){super.disconnectedCallback(),this.restoreRootFontSize()}get propInputData(){return{settings:[{label:"Wayback pages archived",propertyName:"waybackPagesArchived",defaultValue:"916 billion"}]}}onAnalyticsClick(e){this.lastEvent=`analyticsClick → ${e.detail?.event??""}`}onAnalyticsSubmit(e){this.lastEvent=`analyticsSubmit → ${e.detail?.event??""}`}restoreRootFontSize(){this.rootFontSizeBefore!==void 0&&(document.documentElement.style.fontSize=this.rootFontSizeBefore,this.rootFontSizeBefore=void 0)}toggleRow(e,t){return d`
      <tr>
        <td>${e}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[t]}
            @change=${()=>{this[t]=!this[t]}}
          />
        </td>
      </tr>
    `}render(){const e=this.signedIn?"brewster":"",t=this.signedIn?"Brewster":"",r=this.onAnItem?f:"",s=this.onAnItem&&this.admin?b:"",o=this.onAnItem&&this.admin?y:"";return d`
      <story-template
        elementTag="ia-topnav"
        elementClassName="IATopNav"
        .propInputData=${this.propInputData}
      >
        <ia-topnav
          slot="demo"
          username=${e}
          screenName=${t}
          itemIdentifier=${r}
          uploader=${s}
          biblio=${o}
          ?admin=${this.admin}
          ?canManageFlags=${this.canManageFlags}
          ?hideSearch=${this.hideSearch}
          @analyticsClick=${this.onAnalyticsClick}
          @analyticsSubmit=${this.onAnalyticsSubmit}
        ></ia-topnav>

        <div slot="settings">
          <p class="event-log">${this.lastEvent||"No events yet."}</p>
          <table>
            ${this.toggleRow("Signed in","signedIn")}
            ${this.toggleRow("Viewing an item","onAnItem")}
            ${this.toggleRow("Admin on the item","admin")}
            ${this.toggleRow("Can manage flags","canManageFlags")}
            ${this.toggleRow("Hide search","hideSearch")}
            ${this.toggleRow("archive.org font size","archiveFontSize")}
          </table>
          <p class="hint">
            The admin sections of the user menu need all three of Signed in,
            Viewing an item and Admin on the item. Narrow the window below 890px
            for the mobile layout.
          </p>
          <p class="hint">
            archive.org font size sets the page's root font size to 10px, which
            the topnav is built for. It applies to the whole demo page, so it's
            on by default only when the topnav is the element being viewed.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The topnav renders the whole archive.org masthead: the primary nav,
            the media menu and its slider, the wayback search, and the account
            dropdown. It reports clicks and form submits through
            <code>analyticsClick</code> and <code>analyticsSubmit</code> rather
            than talking to an analytics service itself.
          </p>
          <p>
            The user menu grows an admin section when
            <code>itemIdentifier</code> and <code>admin</code> are both set.
            Setting <code>uploader</code> adds the uploader's account links, and
            <code>biblio</code> adds the book-scanning links for a texts item.
          </p>
          <p>
            Sizes are in rem and assume the host page sets
            <code>html { font-size: 10px }</code>, as archive.org and offshoot
            both do.
          </p>
          <p>
            A search bar goes in the <code>search</code> slot. Offshoot slots an
            <code>ia-dropdown-search-bar</code> in there.
          </p>
        </div>
      </story-template>
    `}static get styles(){return m`
      .event-log {
        margin: 0.8rem 0 0;
        font-family: monospace;
        font-size: 1.2rem;
      }

      .hint {
        font-size: 1.2rem;
      }

      td {
        padding-right: 1rem;
      }
    `}};n([a()],i.prototype,"signedIn",2);n([a()],i.prototype,"onAnItem",2);n([a()],i.prototype,"admin",2);n([a()],i.prototype,"canManageFlags",2);n([a()],i.prototype,"hideSearch",2);n([a()],i.prototype,"lastEvent",2);n([a()],i.prototype,"archiveFontSize",2);i=n([g("ia-topnav-story")],i);export{i as IATopNavStory};
