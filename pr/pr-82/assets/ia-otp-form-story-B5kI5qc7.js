import{n as c,t as m,i as h,A as f,b as d,a as y}from"./index-2B1hUmLY.js";import{m as u}from"./runtime-CCgtQBty.js";import{e as g}from"./query-CcGDRnRJ.js";import{t as v}from"./story-template-BecjTO8O.js";import"./ia-status-indicator-BWKnzgyp.js";import"./ia-otp-input-twAWCjls.js";import"./ia-button-Dk9iNwLS.js";var b=Object.defineProperty,w=Object.getOwnPropertyDescriptor,r=(t,o,l,a)=>{for(var e=a>1?void 0:a?w(o,l):o,s=t.length-1,n;s>=0;s--)(n=t[s])&&(e=(a?n(o,l,e):n(e))||e);return a&&e&&b(o,l,e),e};const S={NewCodeRequested:"newCodeRequested"};let i=class extends h{constructor(){super(...arguments),this.validationStatus="ready",this.newCodeSending=!1,this.numPasscodeChars=6,this.numericOnly=!0}render(){return d`
      <div class="input-section">
        <ia-otp-input
          .numChars=${this.numPasscodeChars}
          ?numericOnly=${this.numericOnly}
          ?disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
        ></ia-otp-input>
        <ia-status-indicator
          part="status-indicator"
          .mode=${this.validationStatus}
        ></ia-status-indicator>
      </div>
      ${this.validationStatus==="error"?d`<p class="error-msg">
            ${u("The code entered is invalid or expired")}
          </p>`:f}
      ${this.resendCodeButtonTemplate}
    `}willUpdate(t){t.has("validationStatus")&&this.OTPInput&&this.validationStatus==="error"&&(this.OTPInput.prefillValue=""),t.has("newCodeSending")&&this.newCodeSending&&this.OTPInput&&(this.OTPInput.prefillValue="")}get resendCodeButtonTemplate(){return this.newCodeSending?d`<span part="new-code-message" class="new-code-msg"
          >${u("Emailing...")}</span
        >`:d`
          <ia-button
            mode="link"
            class="new-code-btn"
            part="new-code-button"
            .disabled=${this.validationStatus==="loading"||this.validationStatus==="success"}
            @click=${this.handleNewCodeRequested}
          >
            ${u("Email me another code")}
          </ia-button>
        `}async handleNewCodeRequested(){this.dispatchEvent(new CustomEvent(S.NewCodeRequested,{bubbles:!0,composed:!0})),this.OTPInput.prefillValue=""}static get styles(){return[v,y`
        :host {
          --font-size-standard--: var(--font-size-standard);
          --font-size-lg--: var(--font-size-lg);
          --color-success--: var(--color-success);
          --color-danger--: var(--color-danger);
          --link-color--: var(--link-color);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .input-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        ia-status-indicator {
          --icon-width: calc(var(--font-size-lg--) * 1.33);
        }

        .error-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--color-danger--);
          margin-bottom: -10px;
        }

        .new-code-msg {
          margin-top: 10px;
          font-size: var(--font-size-standard--);
          color: var(--link-color--);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `]}};r([c({type:String})],i.prototype,"validationStatus",2);r([c({type:Boolean})],i.prototype,"newCodeSending",2);r([c({type:Number})],i.prototype,"numPasscodeChars",2);r([c({type:Boolean})],i.prototype,"numericOnly",2);r([g("ia-otp-input")],i.prototype,"OTPInput",2);i=r([m("ia-otp-form")],i);var T=Object.getOwnPropertyDescriptor,C=(t,o,l,a)=>{for(var e=a>1?void 0:a?T(o,l):o,s=t.length-1,n;s>=0;s--)(n=t[s])&&(e=n(e)||e);return e};const O=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Input font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"2.25rem",inputType:"text"},{label:"Link and error font size",cssVariable:"--ia-theme-font-size-standard",defaultValue:"0.875rem",inputType:"text"},{label:"Link font color",cssVariable:"--ia-theme-link-color",defaultValue:"#4b64ff",inputType:"color"},{label:"Error message/indicator color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Success indicator color",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"}],P=[{label:"Validation Status",propertyName:"validationStatus",defaultValue:"ready",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"New code sending in progress",propertyName:"newCodeSending",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Number of passcode characters",propertyName:"numPasscodeChars",defaultValue:6,inputType:"number"}];let p=class extends h{render(){return d`
      <story-template
        elementTag="ia-otp-form"
        elementClassName="IAOTPForm"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}} \n  @newCodeRequested=${() => alert('New code requested')}"}
        .styleInputData=${{settings:O}}
        .propInputData=${{settings:P}}
      >
        <ia-otp-form
          slot="demo"
          @codeSubmitted=${t=>{setTimeout(()=>alert("Code submitted: "+t.detail),250)}}
          @newCodeRequested=${()=>alert("New code requested")}
        ></ia-otp-form>
        <div slot="usage-notes">
          For a typical One Time Passcode (OTP) use case, the component can be
          used like so:
          <ul>
            <li>
              The parent component sends the user a code, then displays the
              <code>ia-otp-form</code> component for code entry
            </li>
            <li>
              Once the user finishes entering a code, the component emits a
              <code>codeSubmitted</code> event with the code stored in the event
              <code>detail</code>
            </li>
            <li>
              The parent component sends that code to be verified and sets the
              <code>validationStatus</code> to <code>loading</code>
            </li>
            <li>
              Depending on the result, the parent then sets the
              <code>validationStatus</code> to <code>success</code> or
              <code>error</code> to display a success or error state
            </li>
            <li>
              If the user requests a new code from within the component, it will
              emit a <code>newCodeRequested</code> event and clear the inputs,
              and the parent can set the <code>newCodeSending</code> property to
              <code>true</code> while the code is being sent, then back to
              <code>false</code> when it is ready for entry
            </li>
          </ul>
        </div>
      </story-template>
    `}};p=C([m("ia-otp-form-story")],p);export{p as IAOTPFormStory};
