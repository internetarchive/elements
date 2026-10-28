import{n as o,c as h,i as f,b as p,a as d}from"./index-DNtv3GEw.js";import{r as m}from"./story-template-Dk3ixofl.js";import{t as b}from"./theme-styles-CAbue2Eo.js";var v=Object.defineProperty,g=Object.getOwnPropertyDescriptor,n=(t,e,s,i)=>{for(var r=i>1?void 0:i?g(e,s):e,l=t.length-1,u;l>=0;l--)(u=t[l])&&(r=(i?u(e,s,r):u(r))||r);return i&&r&&v(e,s,r),r};const y={CodeSubmitted:"codeSubmitted"},c=/^[0-9]+$/,x=/^[a-zA-Z0-9]+$/;let a=class extends f{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=c}render(){return p`
      ${[...Array(this.numChars).keys()].map(t=>p`<input
            id="OTP-input-${t}"
            part="input"
            type="text"
            autocomplete=${t===0?"one-time-code":"off"}
            inputmode=${this.numericOnly?"numeric":"text"}
            ?disabled=${this.disabled}
            @beforeinput=${this.handleInput}
            @paste=${this.handlePaste}
            @keydown=${this.handleKeydown}
          />`)}
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(t){t.has("numericOnly")&&(this.allowedChars=this.numericOnly?c:x),t.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(t){t.preventDefault();const e=t.target,s=t.data;if(!s)return;if(s.length>1){this.fillInputs(s);return}if(!this.allowedChars.test(s))return;e.value=s;const i=e.nextElementSibling;i&&i.focus(),this.submitIfInputsFilled()}handleKeydown(t){const e=t.target,s=t.key,i=e.previousElementSibling,r=e.nextElementSibling;switch(s){case"Backspace":case"Delete":if(t.preventDefault(),i&&i.focus(),e.value===""){i.value="";break}e.value="";break;case"Tab":e.select();break;case"ArrowRight":case"Right":t.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":t.preventDefault(),i&&i.focus();break}}handlePaste(t){t.preventDefault();const e=t.clipboardData?.getData("text");e&&this.fillInputs(e)}fillInputs(t){t===""&&this.clearInputs();const e=t.split("").filter(i=>this.allowedChars.test(i)).slice(0,this.numChars);if(!e||e.length===0)return;if(e.forEach((i,r)=>this.inputs[r].value=i),e.length===this.numChars){this.triggerSubmit(e.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[e.length].focus()}clearInputs(){this.inputs.forEach(t=>t.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const t=[];this.inputs.forEach(e=>{e.value&&t.push(e.value)}),t.length===this.numChars&&this.triggerSubmit(t.join(""))}triggerSubmit(t){this.dispatchEvent(new CustomEvent(y.CodeSubmitted,{detail:this.numericOnly?t:t.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[b,d`
        :host {
          --primary-text-color--: var(--primary-text-color);
          --font-size-lg--: var(--font-size-lg);
        }

        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: var(--ia-space-1--);
        }

        /* Each box is an input, so it follows the input spec: the control
           border, the default radius and the shared focus ring. */
        input {
          box-sizing: content-box;
          color: var(--primary-text-color--);
          background-color: var(--ia-color-surface-raised--);
          font-size: var(--font-size-lg--);
          width: var(--font-size-lg--);
          font-weight: var(--ia-font-weight-bold--);
          height: calc(var(--font-size-lg--) + 2rem);
          text-align: center;
          text-transform: uppercase;
          padding: 0 var(--ia-space-1--);
          border: var(--ia-border-control--);
          border-radius: var(--ia-radius-default--);
        }

        input:hover {
          border-color: var(--ia-color-text-primary--);
        }

        input:focus-visible {
          outline: var(--ia-size-focus-ring--) solid
            var(--ia-color-border-focus--);
          outline-offset: var(--ia-size-focus-ring-offset--);
        }
      `]}};n([o({type:String})],a.prototype,"prefillValue",2);n([o({type:Boolean})],a.prototype,"disabled",2);n([o({type:Number})],a.prototype,"numChars",2);n([o({type:Boolean})],a.prototype,"numericOnly",2);n([o({type:Object})],a.prototype,"allowedChars",2);n([m("input")],a.prototype,"inputs",2);a=n([h("ia-otp-input")],a);
