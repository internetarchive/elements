import{n as r,t as b,i as l,A as v,b as g,a as h}from"./index-TXlOGGVe.js";import{t as f}from"./story-template-DeEL13oo.js";var p=Object.defineProperty,w=Object.getOwnPropertyDescriptor,e=(c,n,a,i)=>{for(var o=i>1?void 0:i?w(n,a):n,d=c.length-1,s;d>=0;d--)(s=c[d])&&(o=(i?s(n,a,o):s(o))||o);return i&&o&&p(n,a,o),o};const u={HideBadge:"hidebadge",ShowBadge:"showbadge",HideBadgeLeaveSpacing:"hidebadgeleavespacing"};let t=class extends l{constructor(){super(...arguments),this.sectionBadge="0",this.badgeMode=u.ShowBadge}render(){return g`
      <div class="container ${this.badgeMode}">
        <div class="badge-container">
          <div class="badge">${this.sectionBadge}</div>
        </div>
        <div class="content-container">
          ${this.headline?g`<div class="title">${this.headline}</div>`:v}
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}static get styles(){return[f,h`
        :host {
          /*
           * The donation form was built for a 10px root font size. Sizing off
           * this base instead keeps the section self-contained, so it looks the
           * same whatever the page's root size is. Override it to rescale
           * everything.
           */
          --donation-section-base-font-size--: var(
            --ia-donation-section-base-font-size,
            10px
          );

          --donation-section-badge-transition--: var(
            --ia-donation-section-badge-transition,
            0.25s ease-out
          );
          --donation-section-badge-margin--: var(
            --ia-donation-section-badge-margin,
            var(--donation-section-base-font-size--)
          );
          --donation-section-badge-background-color--: var(
            --ia-donation-section-badge-background-color,
            var(--mid-gray)
          );
          --donation-section-badge-radius--: var(
            --ia-donation-section-badge-radius,
            calc(var(--donation-section-base-font-size--) * 1.2)
          );
          --donation-section-badge-width--: calc(
            var(--donation-section-badge-radius--) * 2
          );
          --donation-section-badge-font-size--: var(
            --ia-donation-section-badge-font-size,
            calc(var(--donation-section-base-font-size--) * 1.8)
          );
          --donation-section-badge-font-weight--: var(
            --ia-donation-section-badge-font-weight,
            bold
          );
          --donation-section-badge-font-color--: var(
            --ia-donation-section-badge-font-color,
            var(--true-white)
          );
          --donation-section-title-font-size--: var(
            --ia-donation-section-title-font-size,
            calc(var(--donation-section-base-font-size--) * 1.8)
          );
          --donation-section-title-font-weight--: var(
            --ia-donation-section-title-font-weight,
            bold
          );
          --donation-section-background-color--: var(
            --ia-donation-section-background-color,
            transparent
          );
          --donation-section-text-color--: var(--primary-text-color);

          display: block;
          background-color: var(--donation-section-background-color--);
          color: var(--donation-section-text-color--);
        }

        .container {
          position: relative;
          padding: var(--padding-sm);
        }

        .content-container {
          position: relative;
          left: calc(
            var(--donation-section-badge-width--) +
              var(--donation-section-badge-margin--)
          );
          width: calc(
            100% -
              (
                var(--donation-section-badge-width--) +
                  var(--donation-section-badge-margin--)
              )
          );
          transition: var(--donation-section-badge-transition--);
          z-index: 1;
        }

        .hidebadge .content-container {
          left: 0;
          width: 100%;
        }

        .hidebadge .badge-container {
          display: none;
        }

        .hidebadgeleavespacing .badge {
          display: none;
        }

        .badge-container {
          position: absolute;
          width: var(--donation-section-badge-width--);
        }

        .badge {
          background-color: var(--donation-section-badge-background-color--);
          color: var(--donation-section-badge-font-color--);
          width: var(--donation-section-badge-width--);
          height: var(--donation-section-badge-width--);
          border-radius: var(--donation-section-badge-radius--);
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: var(--donation-section-badge-font-weight--);
          font-size: var(--donation-section-badge-font-size--);
        }

        .title {
          line-height: var(--donation-section-badge-width--);
          margin-bottom: var(--padding-sm);
          font-size: var(--donation-section-title-font-size--);
          font-weight: var(--donation-section-title-font-weight--);
        }
      `]}};e([r({type:String})],t.prototype,"sectionBadge",2);e([r({type:String})],t.prototype,"headline",2);e([r({type:String})],t.prototype,"badgeMode",2);t=e([b("ia-donation-section")],t);export{u as D};
