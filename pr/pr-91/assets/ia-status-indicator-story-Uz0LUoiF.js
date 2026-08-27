import{i as m,b as d,d as f,r as u,t as h}from"./index-DErRMONl.js";import{e as b}from"./query-prqsnG6w.js";import"./ia-status-indicator-BTEBlYy2.js";import"./story-template-Cul8s46A.js";import"./runtime-BjTmB3MQ.js";var g=Object.defineProperty,y=Object.getOwnPropertyDescriptor,o=(e,r,l,i)=>{for(var t=i>1?void 0:i?y(r,l):r,s=e.length-1,n;s>=0;s--)(n=e[s])&&(t=(i?n(r,l,t):n(t))||t);return i&&t&&g(r,l,t),t};const w=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],S=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Mediatype icon",propertyName:"mediatype",defaultValue:"none",inputType:"radio",radioOptions:["none","audio","collection","etree","images","search","software","texts","tv","video","web"]},{label:"Hide dots (bare ring)",propertyName:"hideDots",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}],p=[{label:"Default",width:"1.25rem",note:"--default-icon-width"},{label:"OTP form",width:"3rem",note:"font-size-lg x 1.33"},{label:"Page",width:"4rem",note:"home, details router"},{label:"Theater",width:"5rem",note:"theater, bookreader"},{label:"Account settings",width:"6rem",note:"account settings"}],c=p[0].width;let a=class extends m{constructor(){super(...arguments),this.width=c,this.darkSurface=!1}render(){return d`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:w}}
        .propInputData=${{settings:S}}
      >
        <ia-status-indicator
          slot="demo"
          style=${this.demoStyles}
        ></ia-status-indicator>

        <form slot="settings" @submit=${this.preventSubmit}>
          <fieldset>
            <legend>Size</legend>
            <div class="row">
              ${p.map(e=>d`
                  <button
                    type="button"
                    class=${this.width===e.width?"selected":""}
                    title=${e.note}
                    @click=${()=>{this.width=e.width}}
                  >
                    ${e.label}
                    <small>${e.width}</small>
                  </button>
                `)}
            </div>
          </fieldset>

          <fieldset>
            <legend>Surface</legend>
            <label>
              <input
                type="checkbox"
                .checked=${this.darkSurface}
                @change=${this.handleDarkSurfaceChange}
              />
              Dark surface (white icon on black)
            </label>
          </fieldset>

          <button type="button" class="reset" @click=${this.reset}>
            Reset
          </button>
        </form>
      </story-template>
    `}get demoStyles(){const e=[`--ia-theme-icon-width: ${this.width}`];return this.darkSurface&&e.push("--ia-theme-primary-text-color: #ffffff","background-color: #000000","padding: 1rem"),e.join(";")}handleDarkSurfaceChange(e){this.darkSurface=e.target.checked}reset(){this.width=c,this.darkSurface=!1;const e=this.demoComponent;e&&(e.mode="loading",e.mediatype=void 0,e.hideDots=!1)}preventSubmit(e){e.preventDefault()}static get styles(){return f`
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
    `}};o([u()],a.prototype,"width",2);o([u()],a.prototype,"darkSurface",2);o([b("ia-status-indicator")],a.prototype,"demoComponent",2);a=o([h("ia-status-indicator-story")],a);export{a as IAStatusIndicatorStory};
