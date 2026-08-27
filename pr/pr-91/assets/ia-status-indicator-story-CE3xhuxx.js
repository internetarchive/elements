import{i as u,b as c,d as p,r as d,t as m}from"./index-M13tx3vo.js";import{e as f}from"./query-BEuEXQQN.js";import"./ia-status-indicator-DeRg0OXD.js";import"./story-template-BicegKoQ.js";import"./runtime-BjTmB3MQ.js";var b=Object.defineProperty,g=Object.getOwnPropertyDescriptor,n=(e,t,r,o)=>{for(var a=o>1?void 0:o?g(t,r):t,s=e.length-1,l;s>=0;s--)(l=e[s])&&(a=(o?l(t,r,a):l(a))||a);return o&&a&&b(t,r,a),a};const y=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem",presets:[{label:"Default",value:"1.25rem",note:"--default-icon-width"},{label:"OTP form",value:"3rem",note:"font-size-lg x 1.33"},{label:"Page",value:"4rem",note:"home, details router"},{label:"Theater",value:"5rem",note:"theater, bookreader"},{label:"Account settings",value:"6rem",note:"account settings"}]},{section:"Color",label:"Loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color",presets:[{label:"White",value:"#ffffff",note:"theater, bookreader"}],presetsInline:!0},{section:"Color",label:"Success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{section:"Color",label:"Error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],h=[{label:"Mode",propertyName:"mode",reflects:!0,defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Mediatype icon",propertyName:"mediatype",reflects:!0,defaultValue:"none",inputType:"radio",radioOptions:["none","audio","collection","etree","images","search","software","texts","tv","video","web"]},{label:"Hide dots (bare ring)",propertyName:"hideDots",reflects:!0,defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]},{section:"Accessible titles",label:"Loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{section:"Accessible titles",label:"Success",propertyName:"successTitle",defaultValue:"Success"},{section:"Accessible titles",label:"Error",propertyName:"errorTitle",defaultValue:"Error"}],v=.75;function S(e){const t=e.trim().replace("#",""),r=t.length===3?t.split("").map(l=>l+l).join(""):t;if(!/^[0-9a-f]{6}$/i.test(r))return;const[o,a,s]=[0,2,4].map(l=>parseInt(r.slice(l,l+2),16)/255);return .299*o+.587*a+.114*s}let i=class extends u{constructor(){super(...arguments),this.darkSurface=!1}render(){return c`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:y}}
        .propInputData=${{settings:h}}
        @stylesApplied=${this.handleStylesApplied}
      >
        <ia-status-indicator
          slot="demo"
          style=${this.demoStyles}
        ></ia-status-indicator>

        <form slot="settings" @submit=${this.preventSubmit}>
          <button type="button" class="reset" @click=${this.reset}>
            Reset props
          </button>
        </form>
      </story-template>
    `}get demoStyles(){return this.darkSurface?"background-color: #000000;padding: 1rem":""}handleStylesApplied(e){const t=e.detail?.styles;if(typeof t!="string")return;const r=t.match(/--ia-theme-primary-text-color:\s*([^;\n]+)/)?.[1];if(!r)return;const o=S(r);o!==void 0&&(this.darkSurface=o>v)}reset(){const e=this.demoComponent;e&&(e.mode="loading",e.mediatype=void 0,e.hideDots=!1)}preventSubmit(e){e.preventDefault()}static get styles(){return p`
      fieldset {
        border: 1px solid var(--medium-gray, #999);
        margin-bottom: 1rem;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.15rem;
        padding: 0.4rem 0.6rem;
        cursor: pointer;
      }

      button.selected {
        outline: 2px solid var(--link-color, dodgerblue);
        font-weight: 700;
      }

      button small {
        font-weight: 400;
        opacity: 0.7;
      }

      label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }

      .reset {
        flex-direction: row;
      }
    `}};n([d()],i.prototype,"darkSurface",2);n([f("ia-status-indicator")],i.prototype,"demoComponent",2);i=n([m("ia-status-indicator-story")],i);export{i as IAStatusIndicatorStory};
