import{r as T,n as h,t as z,i as E,A as S,b as s,a as N}from"./index-BENjAyBI.js";import{e as C}from"./query-B-NGWz9Q.js";import{m as l,s as O}from"./runtime-CCgtQBty.js";import{t as _}from"./story-template-DkKPLDhG.js";import{D as w}from"./ia-donation-section-WDF58LNa.js";var B={symbol:"$",separator:",",decimal:".",errorOnInvalid:!1,precision:2,pattern:"!#",negativePattern:"-!#",format:j,fromCents:!1},M=function(t){return Math.round(t)},$=function(t){return Math.pow(10,t)},q=function(t,n){return M(t/n)*n},L=/(\d)(?=(\d{3})+\b)/g,R=/(\d)(?=(\d\d)+\d\b)/g;function c(o,t){var n=this;if(!(n instanceof c))return new c(o,t);var e=Object.assign({},B,t),i=$(e.precision),a=k(o,e);n.intValue=a,n.value=a/i,e.increment=e.increment||1/i,e.useVedic?e.groups=R:e.groups=L,this.s=e,this.p=i}function k(o,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,e=0,i=t.decimal,a=t.errorOnInvalid,d=t.precision,p=t.fromCents,f=$(d),v=typeof o=="number",y=o instanceof c;if(y&&p)return o.intValue;if(v||y)e=y?o.value:o;else if(typeof o=="string"){var F=new RegExp("[^-\\d"+i+"]","g"),V=new RegExp("\\"+i,"g");e=o.replace(/\((.*)\)/,"-$1").replace(F,"").replace(V,"."),e=e||0}else{if(a)throw Error("Invalid Input");e=0}return p||(e*=f,e=e.toFixed(4)),n?M(e):e}function j(o,t){var n=t.pattern,e=t.negativePattern,i=t.symbol,a=t.separator,d=t.decimal,p=t.groups,f=(""+o).replace(/^-/,"").split("."),v=f[0],y=f[1];return(o.value>=0?n:e).replace("!",i).replace("#",v.replace(p,"$1"+a)+(y?d+y:""))}c.prototype={add:function(t){var n=this.intValue,e=this.s,i=this.p;return c((n+=k(t,e))/(e.fromCents?1:i),e)},subtract:function(t){var n=this.intValue,e=this.s,i=this.p;return c((n-=k(t,e))/(e.fromCents?1:i),e)},multiply:function(t){var n=this.intValue,e=this.s;return c((n*=t)/(e.fromCents?1:$(e.precision)),e)},divide:function(t){var n=this.intValue,e=this.s;return c(n/=k(t,e,!1),e)},distribute:function(t){for(var n=this.intValue,e=this.p,i=this.s,a=[],d=Math[n>=0?"floor":"ceil"](n/t),p=Math.abs(n-d*t),f=i.fromCents?1:e;t!==0;t--){var v=c(d/f,i);p-- >0&&(v=v[n>=0?"add":"subtract"](1/f)),a.push(v)}return a},dollars:function(){return~~this.value},cents:function(){var t=this.intValue,n=this.p;return~~(t%n)},format:function(t){var n=this.s;return typeof t=="function"?t(this,n):n.format(this,Object.assign({},n,t))},toString:function(){var t=this.intValue,n=this.p,e=this.s;return q(t/n,e.increment).toFixed(e.precision)},toJSON:function(){return this.value}};class H{keydown(t){const n=t.key;if(t.metaKey)return;switch(n){case"Tab":case"Delete":case"Backspace":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":return}const e=t.target,i=e.value,a=i.slice(0,e.selectionStart??0),d=i.slice(e.selectionEnd??0),p=`${a}${n}${d}`;/^[0-9]+(\.[0-9]{0,2})?$/.test(p)||t.preventDefault()}}const g={OneTime:"one-time",Monthly:"monthly",Upsell:"up_sell"};class A{constructor(t){this.donationType=t.donationType,this.amount=t.amount,this.coverFees=t.coverFees}get feeAmountCovered(){return this.coverFees?this.fee:0}get fee(){return A.calculateFeeAmount(this.amount)}get total(){return A.calculateTotal(this.amount,this.coverFees)}static calculateTotal(t,n){const e=n?this.calculateFeeAmount(t):0,i=t+e;return isNaN(i)?0:this.roundAmount(i)}static calculateFeeAmount(t){const n=t*.0219+.29;return isNaN(n)?0:this.roundAmount(n)}static roundAmount(t){return Math.round(t*100)/100}}const P=[5,10,25,50,100,500,1e3],U=new A({donationType:g.OneTime,amount:10,coverFees:!1});var J=Object.defineProperty,G=Object.getOwnPropertyDescriptor,u=(o,t,n,e)=>{for(var i=e>1?void 0:e?G(t,n):t,a=o.length-1,d;a>=0;a--)(d=o[a])&&(i=(e?d(t,n,i):d(i))||i);return e&&i&&J(t,n,i),i};const D={HideNumbers:"hidenumbers",ShowNumbers:"shownumbers"},b={DonationType:"donationType",Amount:"amount"},m={ValidDonationAmount:"valid_donation_amount",InvalidDonationAmount:"invalid_donation_amount",DonationTooHigh:"donation_too_high",DonationTooLow:"donation_too_low"},I={Button:"button",Checkbox:"checkbox",Hide:"hide"},x={SingleLine:"single-line",MultiLine:"multi-line"};let r=class extends E{constructor(){super(...arguments),this.donationInfo=U,this.stepNumberMode=D.ShowNumbers,this.amountOptions=P,this.amountSelectionLayout=x.MultiLine,this.frequencySelectionMode=I.Button,this.customAmountMode="display",this.coverFeesCheckboxMode="display",this.amountTitleDisplayMode="default",this.customAmountSelected=!1,this.currencyValidator=new H}render(){const o=this.amountTitleDisplayMode==="default"?l("Choose an amount (USD)"):"";return s`
      ${this.frequencySelectionMode===I.Button?this.frequencyButtonsTemplate:S}

      <ia-donation-section
        sectionBadge="${this.amountSelectionSectionNumber}"
        headline=${o}
        badgeMode=${this.formSectionNumberMode}
      >
        ${this.amountTitleDisplayMode==="slot"?s`<slot name="edit-donation-amount-title"></slot>`:S}
        <ul class="amount-selector">
          ${this.presetAmountsTemplate}
          ${this.customAmountMode==="display"?s`<li class="custom-amount">${this.customAmountTemplate}</li>`:S}
        </ul>

        <div class="errors">${this.error}</div>

        ${this.coverFeesCheckboxMode==="display"?s`<div class="checkbox-options">
              ${this.coverFeesCheckboxTemplate}
              ${this.frequencySelectionMode===I.Checkbox?this.frequencyCheckboxTemplate:S}
            </div>`:S}
      </ia-donation-section>
    `}updated(o){o.has("customAmountSelected")&&this.customAmountButton&&(this.customAmountButton.checked=this.customAmountSelected),o.has("amountOptions")&&(this.customAmountSelected=!1,this.updateSelectedDonationInfo(),this.setupAmountColumnsLayoutConfig()),o.has("amountSelectionLayout")&&this.setupAmountColumnsLayoutConfig(),o.has("donationInfo")&&this.updateSelectedDonationInfo(),o.has("defaultSelectedAmount")&&this.defaultSelectedAmount!==void 0&&(this.customAmountSelected=!1,this.donationInfo=new A({donationType:this.donationInfo.donationType,amount:this.defaultSelectedAmount,coverFees:this.donationInfo.coverFees}))}get frequencyButtonsTemplate(){return s`
      <ia-donation-section
        sectionBadge="1"
        headline=${l("Choose a frequency")}
        badgeMode=${this.formSectionNumberMode}
      >
        <ul class="frequency-selector">
          ${this.frequencyTemplate}
        </ul>
      </ia-donation-section>
    `}get frequencyCheckboxTemplate(){return s`
      <div class="checkbox-option-container">
        <input
          type="checkbox"
          id="make-this-monthly"
          @input=${this.monthlyCheckboxChecked}
          .checked=${this.donationInfo.donationType===g.Monthly}
          tabindex="0"
        />
        <label for="make-this-monthly">${l("Make this monthly")}</label>
      </div>
    `}get coverFeesCheckboxTemplate(){return s`
      <div class="checkbox-option-container">
        <input
          type="checkbox"
          id="cover-fees"
          @input=${this.coverFeesChecked}
          .checked=${this.donationInfo.coverFees}
          tabindex="0"
        />
        <label for="cover-fees">${this.coverFeesText}</label>
      </div>
    `}get amountSelectionSectionNumber(){return this.frequencySelectionMode===I.Button?2:1}get formSectionNumberMode(){switch(this.stepNumberMode){case D.ShowNumbers:return w.ShowBadge;case D.HideNumbers:return w.HideBadge}}setupAmountColumnsLayoutConfig(){const o=this.customAmountMode==="hide"&&this.coverFeesCheckboxMode==="hide"&&this.frequencySelectionMode===I.Hide,t=this.amountOptions.length;let n=5,e=3;switch(t){case 7:n=5,e=3;break;case 6:n=4,e=2;break;case 5:n=4,e=3;break;case 4:if(o){n=4,e=0;break}n=3,e=2;break;case 3:n=2,e=1;break}this.amountSelectionLayout===x.SingleLine&&(n=t+3,e=3),this.style.setProperty("--ia-donation-edit-amount-column-count",`${n}`),this.style.setProperty("--ia-donation-edit-custom-amount-col-span",`${e}`)}updateSelectedDonationInfo(){const o=!!this.customAmountInput&&this.shadowRoot?.activeElement===this.customAmountInput;if(!this.isCustomAmount&&!(this.customAmountSelected&&o)){const t=this.shadowRoot?.querySelector(`input[type="radio"][name="${b.Amount}"][value="${this.donationInfo.amount}"]`);t&&(t.checked=!0),this.customAmountSelected=!1,this.error=void 0,this.customAmountInput&&(this.customAmountInput.value="")}else if(this.customAmountSelected=!0,!o&&this.customAmountInput){this.customAmountInput.value=this.customAmountDisplayValue;const t=this.getDonationInfoStatus(this.donationInfo.amount);this.handleDonationInfoStatus(t)}}get coverFeesText(){const o=c(this.donationInfo.fee,{symbol:"$"}).format();return l(O`I'll generously add ${o} to cover fees.`)}formatShortenedAmount(o){const t=o%1===0?0:2;return c(o,{symbol:"$",precision:t}).format()}get frequencyTemplate(){return s`
      <li>
        ${this.getRadioButton({group:b.DonationType,value:g.OneTime,displayText:l("One time"),checked:this.donationInfo.donationType===g.OneTime})}
      </li>

      <li>
        ${this.getRadioButton({group:b.DonationType,value:g.Monthly,displayText:l("Monthly"),checked:this.donationInfo.donationType===g.Monthly})}
      </li>
    `}get presetAmountsTemplate(){return s`
      ${this.amountOptions.map(o=>{const t=!this.customAmountSelected&&o===this.donationInfo.amount;return s`
          <li>
            ${this.getRadioButton({group:b.Amount,value:`${o}`,displayText:this.formatShortenedAmount(o),checked:t})}
          </li>
        `})}
    `}getRadioButton(o){const t=`${o.group}-${o.value}-option`;return s`
      <div class="selection-button">
        <input
          type="radio"
          name=${o.group}
          value=${o.value}
          id=${t}
          tabindex="0"
          .checked=${o.checked}
          @change=${this.radioSelected}
          @click=${n=>{o.group===b.Amount&&parseFloat(o.value)===this.donationInfo.amount&&this.radioSelected(n)}}
        />
        <label for=${t}>${o.displayText}</label>
      </div>
    `}get isCustomAmount(){return!this.amountOptions.includes(this.donationInfo.amount)}get customAmountDisplayValue(){return this.isCustomAmount?c(this.donationInfo.amount,{symbol:""}).format():""}get customAmountTemplate(){return s`
      <div class="selection-button">
        <input
          type="radio"
          name=${b.Amount}
          value="custom"
          id="custom-amount-button"
          tabindex="0"
          @change=${this.customRadioSelected}
        />

        <label for="custom-amount-button">
          <span class="custom-amount-text">${l("Custom: $")}</span
          ><input
            type="text"
            id="custom-amount-input"
            tabindex="-1"
            aria-label=${l("Custom amount in dollars")}
            value=${this.customAmountDisplayValue}
            @input=${this.customAmountChanged}
            @keydown=${this.currencyValidator.keydown}
            @focus=${this.customAmountFocused}
            @blur=${this.customAmountBlurred}
          />
        </label>
      </div>
    `}customRadioSelected(){this.customAmountInput.focus()}customAmountFocused(o){const t=o.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}customAmountBlurred(){this.updateSelectedDonationInfo()}coverFeesChecked(o){const t=o.target;this.updateDonationInfo({coverFees:t.checked})}customAmountChanged(o){const t=o.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}handleCustomAmountInput(o){const t=parseFloat(o);isNaN(t)?this.dispatchEditDonationError(m.InvalidDonationAmount):this.amountChanged(t)}handleDonationInfoStatus(o){switch(o){case m.ValidDonationAmount:this.error=void 0;break;case m.DonationTooHigh:this.error=l(s`
          To make a donation of $10,000 or more, please contact our philanthropy
          department at
          <a href="mailto:donations@archive.org">donations@archive.org</a>
        `),this.dispatchEditDonationError(o);break;case m.DonationTooLow:this.customAmountInput.value.length>0&&(this.error=s`${l("Please select an amount (minimum $1)")}`),this.dispatchEditDonationError(o);break;case m.InvalidDonationAmount:this.error=s`${l("Please enter a valid donation amount")}`,this.dispatchEditDonationError(o);break}}amountChanged(o){const t=this.getDonationInfoStatus(o);this.handleDonationInfoStatus(t),t===m.ValidDonationAmount&&this.updateDonationInfo({amount:o})}getDonationInfoStatus(o){return isNaN(o)?m.InvalidDonationAmount:o>=1e4?m.DonationTooHigh:o<1?m.DonationTooLow:m.ValidDonationAmount}radioSelected(o){const t=o.target,n=t.name,{value:e}=t;switch(n){case b.Amount:this.presetAmountChanged(parseFloat(e));break;case b.DonationType:this.updateDonationInfo({donationType:e});break}}monthlyCheckboxChecked(o){const n=o.target.checked?g.Monthly:g.OneTime;this.updateDonationInfo({donationType:n})}dispatchEditDonationError(o){const t=new CustomEvent("editDonationError",{detail:{error:o}});this.dispatchEvent(t)}presetAmountChanged(o){this.error=void 0,this.customAmountSelected=!1,this.customAmountInput&&(this.customAmountInput.value=""),this.updateDonationInfo({amount:o})}updateDonationInfo(o){const t=new A({donationType:o.donationType??this.donationInfo.donationType,amount:o.amount??this.donationInfo.amount,coverFees:o.coverFees??this.donationInfo.coverFees});this.donationInfo=t;const n=new CustomEvent("donationInfoChanged",{detail:{donationInfo:t}});this.dispatchEvent(n)}static get styles(){return[_,N`
        :host {
          /*
           * The donation form was built for a 10px root font size. Sizing off
           * this base keeps the element self-contained, so it looks the same
           * whatever the page's root size is. Override it to rescale
           * everything, sections included.
           */
          --donation-edit-base-font-size--: var(
            --ia-donation-edit-base-font-size,
            10px
          );

          --donation-edit-button-border-color--: var(
            --ia-donation-edit-button-border-color,
            var(--mid-gray)
          );
          --donation-edit-button-grid-gap--: var(
            --ia-donation-edit-button-grid-gap,
            var(--donation-edit-base-font-size--)
          );
          --donation-edit-button-font-size--: var(
            --ia-donation-edit-button-font-size,
            calc(var(--donation-edit-base-font-size--) * 1.6)
          );
          --donation-edit-button-font-color--: var(
            --ia-donation-edit-button-font-color,
            #000
          );
          --donation-edit-button-selected-font-color--: var(
            --ia-donation-edit-button-selected-font-color,
            #000
          );
          --donation-edit-button-selected-color--: var(
            --ia-donation-edit-button-selected-color,
            #f9bf3b
          );
          --donation-edit-button-focused-outline-color--: var(
            --ia-donation-edit-button-focused-outline-color,
            #7fb3f9
          );
          --donation-edit-button-color--: var(
            --ia-donation-edit-button-color,
            var(--true-white)
          );
          --donation-edit-cover-fees-font-size--: var(
            --ia-donation-edit-cover-fees-font-size,
            calc(var(--donation-edit-base-font-size--) * 1.2)
          );
          --donation-edit-cover-fees-font-weight--: var(
            --ia-donation-edit-cover-fees-font-weight,
            bold
          );
          --donation-edit-custom-amount-width--: var(
            --ia-donation-edit-custom-amount-width,
            calc(var(--donation-edit-base-font-size--) * 4)
          );
          --donation-edit-input-font-color--: var(
            --ia-donation-edit-input-font-color,
            var(--mid-gray)
          );
          --donation-edit-input-border--: var(
            --ia-donation-edit-input-border,
            1px solid #d9d9d9
          );
          /* These two are set on the host by the element itself, from the number of amounts */
          --donation-edit-amount-column-count--: var(
            --ia-donation-edit-amount-column-count,
            5
          );
          --donation-edit-custom-amount-col-span--: var(
            --ia-donation-edit-custom-amount-col-span,
            3
          );
          --donation-edit-error-color--: var(--color-danger);

          /* Passed through to the sections */
          --ia-donation-section-base-font-size: var(
            --donation-edit-base-font-size--
          );
          --ia-donation-section-background-color: var(
            --ia-donation-edit-background-color,
            transparent
          );
          --ia-donation-section-badge-background-color: var(
            --ia-donation-edit-badge-background-color,
            var(--mid-gray)
          );
          --ia-donation-section-badge-font-color: var(
            --ia-donation-edit-badge-font-color,
            var(--true-white)
          );
        }

        .errors {
          color: var(--donation-edit-error-color--);
          font-size: calc(var(--donation-edit-base-font-size--) * 1.4);
          margin-top: var(--padding-sm);
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-gap: var(--donation-edit-button-grid-gap--);
        }

        li {
          margin: 0;
          padding: 0;
          display: inline-block;
        }

        .frequency-selector {
          grid-template-columns: repeat(2, 1fr);
        }

        .amount-selector {
          grid-template-columns: repeat(
            var(--donation-edit-amount-column-count--),
            1fr
          );
        }

        .custom-amount {
          grid-column: span var(--donation-edit-custom-amount-col-span--);
        }

        .selection-button {
          height: calc(var(--donation-edit-base-font-size--) * 3);
        }

        .selection-button label {
          padding: 0 calc(var(--donation-edit-base-font-size--) * 0.3);
          display: flex;
          cursor: pointer;
          text-align: center;
          font-size: var(--donation-edit-button-font-size--);
          font-weight: bold;
          border: 1px solid var(--donation-edit-button-border-color--);
          border-radius: 5px;
          height: 100%;
          justify-content: center;
          align-items: center;
        }

        label[for='custom-amount-button'] {
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .custom-amount-text {
          white-space: nowrap;
          margin-right: var(--padding-sm);
        }

        input[type='radio'] {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        input[type='radio'] + label {
          color: var(--donation-edit-button-font-color--);
          background-color: var(--donation-edit-button-color--);
        }

        input[type='radio']:checked + label {
          color: var(--donation-edit-button-selected-font-color--);
          background-color: var(--donation-edit-button-selected-color--);
        }

        input[type='radio']:focus + label {
          outline: 2px solid var(--donation-edit-button-focused-outline-color--);
        }

        .checkbox-options {
          margin-top: var(--donation-edit-base-font-size--);
        }

        .checkbox-option-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-option-container input {
          width: calc(var(--donation-edit-base-font-size--) * 2);
        }

        .checkbox-option-container label {
          font-size: var(--donation-edit-cover-fees-font-size--);
          font-weight: var(--donation-edit-cover-fees-font-weight--);
          flex: 1;
        }

        #custom-amount-input {
          width: var(--donation-edit-custom-amount-width--);
          font-size: var(--donation-edit-button-font-size--);
          font-weight: bold;
          color: var(--donation-edit-input-font-color--);
          padding: calc(var(--donation-edit-base-font-size--) * 0.1);
          border: var(--donation-edit-input-border--);
          appearance: none;
        }
      `]}};u([h({type:Object})],r.prototype,"donationInfo",2);u([h({type:String})],r.prototype,"stepNumberMode",2);u([h({type:Number})],r.prototype,"defaultSelectedAmount",2);u([h({type:Array})],r.prototype,"amountOptions",2);u([h({type:String})],r.prototype,"amountSelectionLayout",2);u([h({type:String,reflect:!0})],r.prototype,"frequencySelectionMode",2);u([h({type:String,reflect:!0})],r.prototype,"customAmountMode",2);u([h({type:String,reflect:!0})],r.prototype,"coverFeesCheckboxMode",2);u([h({type:String,reflect:!0})],r.prototype,"amountTitleDisplayMode",2);u([T()],r.prototype,"error",2);u([T()],r.prototype,"customAmountSelected",2);u([C("#custom-amount-button")],r.prototype,"customAmountButton",2);u([C("#custom-amount-input")],r.prototype,"customAmountInput",2);r=u([z("ia-donation-edit-donation")],r);export{H as C,g as D,x as E,A as a,I as b,c,P as d,U as e};
