import{i as p,b as u,a as c,r as d,e as m,c as f}from"./index-DNtv3GEw.js";import"./ia-status-indicator-DMZX05pX.js";import"./story-template-Dk3ixofl.js";import"./site-CV8P5jsN.js";/* empty css             */import"./localized-decorator-CSlVhaib.js";import"./theme-styles-CAbue2Eo.js";import"./icon-box-DHtndm2h.js";import"./mediatype-web-YAeGNQXq.js";import"./syntax-highlighter-ByUCtUh8.js";var b=Object.defineProperty,y=Object.getOwnPropertyDescriptor,n=(e,t,r,a)=>{for(var o=a>1?void 0:a?y(t,r):t,l=e.length-1,i;l>=0;l--)(i=e[l])&&(o=(a?i(t,r,o):i(o))||o);return a&&o&&b(t,r,o),o};const g=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"2rem",presets:[{label:"Default",value:"2rem",note:"--default-icon-width"},{label:"OTP form",value:"4.8rem",note:"font-size-lg x 1.33"},{label:"Page",value:"4rem",note:"home, details router"},{label:"Theater",value:"5rem",note:"theater, bookreader"},{label:"Account settings",value:"6rem",note:"account settings"}]},{section:"Color",label:"Loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color",presets:[{label:"White",value:"#ffffff",note:"theater, bookreader"}],presetsInline:!0},{section:"Color",label:"Success",cssVariable:"--ia-theme-color-success",defaultValue:"#20705a",inputType:"color"},{section:"Color",label:"Error",cssVariable:"--ia-theme-color-danger",defaultValue:"#b8161c",inputType:"color"}],h=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Mediatype icon",propertyName:"mediatype",defaultValue:"none",inputType:"radio",radioOptions:["none","audio","collection","etree","images","search","software","texts","tv","video","web"]},{label:"Hide dots (bare ring)",propertyName:"hideDots",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]},{section:"Accessible titles",label:"Loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{section:"Accessible titles",label:"Success",propertyName:"successTitle",defaultValue:"Success"},{section:"Accessible titles",label:"Error",propertyName:"errorTitle",defaultValue:"Error"}],v=.75;function S(e){const t=e.trim().replace("#",""),r=t.length===3?t.split("").map(i=>i+i).join(""):t;if(!/^[0-9a-f]{6}$/i.test(r))return;const[a,o,l]=[0,2,4].map(i=>parseInt(r.slice(i,i+2),16)/255);return .299*a+.587*o+.114*l}let s=class extends p{constructor(){super(...arguments),this.darkSurface=!1}render(){return u`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:g,revertable:!0}}
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
    `}get demoStyles(){return this.darkSurface?"background-color: #000000;padding: 1.6rem":""}handleStylesApplied(e){const t=e.detail?.styles;if(typeof t!="string")return;if(!t){this.darkSurface=!1;return}const r=t.match(/--ia-theme-primary-text-color:\s*([^;\n]+)/)?.[1];if(!r)return;const a=S(r);a!==void 0&&(this.darkSurface=a>v)}reset(){const e=this.demoComponent;e&&(e.mode="loading",e.mediatype=void 0,e.hideDots=!1)}preventSubmit(e){e.preventDefault()}static get styles(){return c`
      fieldset {
        border: 1px solid var(--medium-gray, #999);
        margin-bottom: 1.6rem;
      }

      .row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
      }

      button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.24rem;
        padding: 0.64rem 0.96rem;
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
        gap: 0.64rem;
      }

      .reset {
        flex-direction: row;
      }
    `}};n([d()],s.prototype,"darkSurface",2);n([m("ia-status-indicator")],s.prototype,"demoComponent",2);s=n([f("ia-status-indicator-story")],s);export{s as IAStatusIndicatorStory};
