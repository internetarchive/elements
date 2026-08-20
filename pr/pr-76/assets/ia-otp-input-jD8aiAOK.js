import{n as l,t as f,i as c,b as p,d}from"./index-DtnLQ5Nt.js";import{r as m,t as b}from"./story-template-QU8z2kI9.js";var g=Object.defineProperty,v=Object.getOwnPropertyDescriptor,a=(t,e,i,s)=>{for(var r=s>1?void 0:s?v(e,i):e,o=t.length-1,u;o>=0;o--)(u=t[o])&&(r=(s?u(e,i,r):u(r))||r);return s&&r&&g(e,i,r),r};const y={CodeSubmitted:"codeSubmitted"},h=/^[0-9]+$/,w=/^[a-zA-Z0-9]+$/;let n=class extends c{constructor(){super(...arguments),this.disabled=!1,this.numChars=6,this.numericOnly=!0,this.allowedChars=h}render(){return p`
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
    `}firstUpdated(){this.inputs[0].focus()}willUpdate(t){t.has("numericOnly")&&(this.allowedChars=this.numericOnly?h:w),t.has("prefillValue")&&this.prefillValue!==void 0&&(this.fillInputs(this.prefillValue),this.prefillValue=void 0)}handleInput(t){t.preventDefault();const e=t.target,i=t.data;if(!i)return;if(i.length>1){this.fillInputs(i);return}if(!this.allowedChars.test(i))return;e.value=i;const s=e.nextElementSibling;s&&s.focus(),this.submitIfInputsFilled()}handleKeydown(t){const e=t.target,i=t.key,s=e.previousElementSibling,r=e.nextElementSibling;switch(i){case"Backspace":case"Delete":if(t.preventDefault(),s&&s.focus(),e.value===""){s.value="";break}e.value="";break;case"Tab":e.select();break;case"ArrowRight":case"Right":t.preventDefault(),r&&r.focus();break;case"ArrowLeft":case"Left":t.preventDefault(),s&&s.focus();break}}handlePaste(t){t.preventDefault();const e=t.clipboardData?.getData("text");e&&this.fillInputs(e)}fillInputs(t){t===""&&this.clearInputs();const e=t.split("").filter(s=>this.allowedChars.test(s)).slice(0,this.numChars);if(!e||e.length===0)return;if(e.forEach((s,r)=>this.inputs[r].value=s),e.length===this.numChars){this.triggerSubmit(e.join("")),this.inputs[this.numChars-1].focus();return}this.inputs[e.length].focus()}clearInputs(){this.inputs.forEach(t=>t.value=""),this.inputs[0].focus()}submitIfInputsFilled(){const t=[];this.inputs.forEach(e=>{e.value&&t.push(e.value)}),t.length===this.numChars&&this.triggerSubmit(t.join(""))}triggerSubmit(t){this.dispatchEvent(new CustomEvent(y.CodeSubmitted,{detail:this.numericOnly?t:t.toUpperCase(),bubbles:!0,composed:!0}))}static get styles(){return[b,d`
        :host {
          --primary-text-color--: var(--primary-text-color);
          --font-size-lg--: var(--font-size-lg);
        }

        :host {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 5px;
        }

        input {
          color: var(--primary-text-color--);
          font-size: var(--font-size-lg--);
          width: var(--font-size-lg--);
          font-weight: bold;
          height: calc(var(--font-size-lg--) + 1.25rem);
          text-align: center;
          text-transform: uppercase;
          padding: 0;
        }
      `]}};a([l({type:String})],n.prototype,"prefillValue",2);a([l({type:Boolean})],n.prototype,"disabled",2);a([l({type:Number})],n.prototype,"numChars",2);a([l({type:Boolean})],n.prototype,"numericOnly",2);a([l({type:Object})],n.prototype,"allowedChars",2);a([m("input")],n.prototype,"inputs",2);n=a([f("ia-otp-input")],n);
