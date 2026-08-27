import{i as u,b as c,d,r as p,t as m}from"./index-DAg32CvV.js";import{e as f}from"./query-BNYT3H6r.js";import"./ia-status-indicator-DTNUQUSM.js";import"./story-template-B-0ec1Dv.js";import"./runtime-BjTmB3MQ.js";var b=Object.defineProperty,g=Object.getOwnPropertyDescriptor,n=(e,a,l,r)=>{for(var t=r>1?void 0:r?g(a,l):a,i=e.length-1,s;i>=0;i--)(s=e[i])&&(t=(r?s(a,l,t):s(t))||t);return r&&t&&b(a,l,t),t};const h=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem",presets:[{label:"Default",value:"1.25rem",note:"--default-icon-width"},{label:"OTP form",value:"3rem",note:"font-size-lg x 1.33"},{label:"Page",value:"4rem",note:"home, details router"},{label:"Theater",value:"5rem",note:"theater, bookreader"},{label:"Account settings",value:"6rem",note:"account settings"}]},{section:"Color",label:"Loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color",presets:[{label:"White",value:"#ffffff",note:"theater, bookreader"},{label:"Black",value:"#000000",note:"on a light surface"}]},{section:"Color",label:"Success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{section:"Color",label:"Error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],y=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Mediatype icon",propertyName:"mediatype",defaultValue:"none",inputType:"radio",radioOptions:["none","audio","collection","etree","images","search","software","texts","tv","video","web"]},{label:"Hide dots (bare ring)",propertyName:"hideDots",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let o=class extends u{constructor(){super(...arguments),this.darkSurface=!1}render(){return c`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:h}}
        .propInputData=${{settings:y}}
      >
        <ia-status-indicator
          slot="demo"
          style=${this.demoStyles}
        ></ia-status-indicator>

        <form slot="settings" @submit=${this.preventSubmit}>
          <fieldset>
            <legend>Surface</legend>
            <label>
              <input
                type="checkbox"
                .checked=${this.darkSurface}
                @change=${this.handleDarkSurfaceChange}
              />
              Dark surface (pair with Color > Loading > White)
            </label>
          </fieldset>

          <button type="button" class="reset" @click=${this.reset}>
            Reset
          </button>
        </form>
      </story-template>
    `}get demoStyles(){return this.darkSurface?"background-color: #000000;padding: 1rem":""}handleDarkSurfaceChange(e){this.darkSurface=e.target.checked}reset(){this.darkSurface=!1;const e=this.demoComponent;e&&(e.mode="loading",e.mediatype=void 0,e.hideDots=!1)}preventSubmit(e){e.preventDefault()}static get styles(){return d`
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
    `}};n([p()],o.prototype,"darkSurface",2);n([f("ia-status-indicator")],o.prototype,"demoComponent",2);o=n([m("ia-status-indicator-story")],o);export{o as IAStatusIndicatorStory};
