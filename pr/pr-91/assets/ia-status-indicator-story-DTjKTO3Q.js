import{i as p,b as u,d as c,r as d,t as m}from"./index-DK44Jzt0.js";import{e as f}from"./query-CCi7oh8v.js";import"./ia-status-indicator-BXviEdUt.js";import"./story-template-BPt1rIAW.js";import"./runtime-BjTmB3MQ.js";var b=Object.defineProperty,g=Object.getOwnPropertyDescriptor,n=(e,t,r,a)=>{for(var o=a>1?void 0:a?g(t,r):t,i=e.length-1,l;i>=0;i--)(l=e[i])&&(o=(a?l(t,r,o):l(o))||o);return a&&o&&b(t,r,o),o};const y=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem",presets:[{label:"Default",value:"1.25rem",note:"--default-icon-width"},{label:"OTP form",value:"3rem",note:"font-size-lg x 1.33"},{label:"Page",value:"4rem",note:"home, details router"},{label:"Theater",value:"5rem",note:"theater, bookreader"},{label:"Account settings",value:"6rem",note:"account settings"}]},{section:"Color",label:"Loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color",presets:[{label:"White",value:"#ffffff",note:"theater, bookreader"}]},{section:"Color",label:"Success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{section:"Color",label:"Error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],h=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Mediatype icon",propertyName:"mediatype",defaultValue:"none",inputType:"radio",radioOptions:["none","audio","collection","etree","images","search","software","texts","tv","video","web"]},{label:"Hide dots (bare ring)",propertyName:"hideDots",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}],v=.75;function S(e){const t=e.trim().replace("#",""),r=t.length===3?t.split("").map(l=>l+l).join(""):t;if(!/^[0-9a-f]{6}$/i.test(r))return;const[a,o,i]=[0,2,4].map(l=>parseInt(r.slice(l,l+2),16)/255);return .299*a+.587*o+.114*i}let s=class extends p{constructor(){super(...arguments),this.darkSurface=!1}render(){return u`
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
    `}get demoStyles(){return this.darkSurface?"background-color: #000000;padding: 1rem":""}handleStylesApplied(e){const t=e.detail?.styles;if(typeof t!="string")return;const r=t.match(/--ia-theme-primary-text-color:\s*([^;\n]+)/)?.[1];if(!r)return;const a=S(r);a!==void 0&&(this.darkSurface=a>v)}reset(){const e=this.demoComponent;e&&(e.mode="loading",e.mediatype=void 0,e.hideDots=!1)}preventSubmit(e){e.preventDefault()}static get styles(){return c`
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
    `}};n([d()],s.prototype,"darkSurface",2);n([f("ia-status-indicator")],s.prototype,"demoComponent",2);s=n([m("ia-status-indicator-story")],s);export{s as IAStatusIndicatorStory};
