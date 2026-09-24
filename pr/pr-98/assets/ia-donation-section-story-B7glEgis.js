import{n as l,c as b,i as p,A as f,b as c,a as h}from"./index-HTbXz2Y2.js";import{t as v}from"./story-template-eOkhI1d6.js";var u=Object.defineProperty,m=Object.getOwnPropertyDescriptor,r=(i,t,s,o)=>{for(var e=o>1?void 0:o?m(t,s):t,n=i.length-1,a;n>=0;n--)(a=i[n])&&(e=(o?a(t,s,e):a(e))||e);return o&&e&&u(t,s,e),e};const y={ShowBadge:"showbadge"};let d=class extends p{constructor(){super(...arguments),this.sectionBadge="0",this.badgeMode=y.ShowBadge}render(){return c`
      <div class="container ${this.badgeMode}">
        <div class="badge-container">
          <div class="badge">${this.sectionBadge}</div>
        </div>
        <div class="content-container">
          ${this.headline?c`<div class="title">${this.headline}</div>`:f}
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}static get styles(){return[v,h`
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
      `]}};r([l({type:String})],d.prototype,"sectionBadge",2);r([l({type:String})],d.prototype,"headline",2);r([l({type:String})],d.prototype,"badgeMode",2);d=r([b("ia-donation-section")],d);var w=Object.getOwnPropertyDescriptor,z=(i,t,s,o)=>{for(var e=o>1?void 0:o?w(t,s):t,n=i.length-1,a;n>=0;n--)(a=i[n])&&(e=a(e)||e);return e};const x=[{label:"Base font size",cssVariable:"--ia-donation-section-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{section:"Color",label:"Badge",cssVariable:"--ia-donation-section-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Badge text",cssVariable:"--ia-donation-section-badge-font-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Text",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-section-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donation form"}],presetsInline:!0}],B=[{label:"Badge",propertyName:"sectionBadge",defaultValue:"1"},{label:"Headline",propertyName:"headline",defaultValue:"Choose a frequency"},{label:"Badge mode",propertyName:"badgeMode",defaultValue:"showbadge",inputType:"radio",radioOptions:["showbadge","hidebadge","hidebadgeleavespacing"]}];let g=class extends p{render(){return c`
      <story-template
        elementTag="ia-donation-section"
        elementClassName="IADonationSection"
        importPath="ia-donation-form/form-elements/ia-donation-section"
        .defaultUsageProps=${'sectionBadge="1" headline="Choose a frequency"'}
        .defaultSlottedContent=${"<p>Anything slotted in lands under the headline.</p>"}
        .styleInputData=${{settings:x,revertable:!0}}
        .propInputData=${{settings:B}}
      >
        <ia-donation-section
          slot="demo"
          sectionBadge="1"
          headline="Choose a frequency"
        >
          <p class="content">
            Anything slotted in lands under the headline. The badge and headline
            scale with the base font size, the slotted content keeps the page's
            own sizing.
          </p>
        </ia-donation-section>
      </story-template>
    `}static get styles(){return h`
      .content {
        margin: 0;
        font-size: 0.9rem;
      }
    `}};g=z([b("ia-donation-section-story")],g);export{g as IADonationSectionStory};
