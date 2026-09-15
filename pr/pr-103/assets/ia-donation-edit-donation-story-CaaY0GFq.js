import{r as T,n as p,t as M,i as E,A as S,b as a,a as F}from"./index-f88Km5qx.js";import{e as N}from"./query-BEjakAP9.js";import{m as c,s as _}from"./runtime-CCgtQBty.js";import{t as q}from"./story-template-C5sWv9BW.js";import{D as w}from"./ia-donation-section-DxNYdfZH.js";var L={symbol:"$",separator:",",decimal:".",errorOnInvalid:!1,precision:2,pattern:"!#",negativePattern:"-!#",format:H,fromCents:!1},O=function(t){return Math.round(t)},x=function(t){return Math.pow(10,t)},R=function(t,n){return O(t/n)*n},P=/(\d)(?=(\d{3})+\b)/g,j=/(\d)(?=(\d\d)+\d\b)/g;function l(o,t){var n=this;if(!(n instanceof l))return new l(o,t);var e=Object.assign({},L,t),i=x(e.precision),s=$(o,e);n.intValue=s,n.value=s/i,e.increment=e.increment||1/i,e.useVedic?e.groups=j:e.groups=P,this.s=e,this.p=i}function $(o,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,e=0,i=t.decimal,s=t.errorOnInvalid,r=t.precision,h=t.fromCents,f=x(r),b=typeof o=="number",y=o instanceof l;if(y&&h)return o.intValue;if(b||y)e=y?o.value:o;else if(typeof o=="string"){var z=new RegExp("[^-\\d"+i+"]","g"),B=new RegExp("\\"+i,"g");e=o.replace(/\((.*)\)/,"-$1").replace(z,"").replace(B,"."),e=e||0}else{if(s)throw Error("Invalid Input");e=0}return h||(e*=f,e=e.toFixed(4)),n?O(e):e}function H(o,t){var n=t.pattern,e=t.negativePattern,i=t.symbol,s=t.separator,r=t.decimal,h=t.groups,f=(""+o).replace(/^-/,"").split("."),b=f[0],y=f[1];return(o.value>=0?n:e).replace("!",i).replace("#",b.replace(h,"$1"+s)+(y?r+y:""))}l.prototype={add:function(t){var n=this.intValue,e=this.s,i=this.p;return l((n+=$(t,e))/(e.fromCents?1:i),e)},subtract:function(t){var n=this.intValue,e=this.s,i=this.p;return l((n-=$(t,e))/(e.fromCents?1:i),e)},multiply:function(t){var n=this.intValue,e=this.s;return l((n*=t)/(e.fromCents?1:x(e.precision)),e)},divide:function(t){var n=this.intValue,e=this.s;return l(n/=$(t,e,!1),e)},distribute:function(t){for(var n=this.intValue,e=this.p,i=this.s,s=[],r=Math[n>=0?"floor":"ceil"](n/t),h=Math.abs(n-r*t),f=i.fromCents?1:e;t!==0;t--){var b=l(r/f,i);h-- >0&&(b=b[n>=0?"add":"subtract"](1/f)),s.push(b)}return s},dollars:function(){return~~this.value},cents:function(){var t=this.intValue,n=this.p;return~~(t%n)},format:function(t){var n=this.s;return typeof t=="function"?t(this,n):n.format(this,Object.assign({},n,t))},toString:function(){var t=this.intValue,n=this.p,e=this.s;return R(t/n,e.increment).toFixed(e.precision)},toJSON:function(){return this.value}};class U{keydown(t){const n=t.key;if(t.metaKey)return;switch(n){case"Tab":case"Delete":case"Backspace":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":return}const e=t.target,i=e.value,s=i.slice(0,e.selectionStart??0),r=i.slice(e.selectionEnd??0),h=`${s}${n}${r}`;/^[0-9]+(\.[0-9]{0,2})?$/.test(h)||t.preventDefault()}}const v={OneTime:"one-time",Monthly:"monthly"};class A{constructor(t){this.donationType=t.donationType,this.amount=t.amount,this.coverFees=t.coverFees}get feeAmountCovered(){return this.coverFees?this.fee:0}get fee(){return A.calculateFeeAmount(this.amount)}get total(){return A.calculateTotal(this.amount,this.coverFees)}static calculateTotal(t,n){const e=n?this.calculateFeeAmount(t):0,i=t+e;return isNaN(i)?0:this.roundAmount(i)}static calculateFeeAmount(t){const n=t*.0219+.29;return isNaN(n)?0:this.roundAmount(n)}static roundAmount(t){return Math.round(t*100)/100}}const J=[5,10,25,50,100,500,1e3],G=new A({donationType:v.OneTime,amount:10,coverFees:!1});var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,d=(o,t,n,e)=>{for(var i=e>1?void 0:e?Q(t,n):t,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(e?r(t,n,i):r(i))||i);return e&&i&&K(t,n,i),i};const D={HideNumbers:"hidenumbers",ShowNumbers:"shownumbers"},g={DonationType:"donationType",Amount:"amount"},m={ValidDonationAmount:"valid_donation_amount",InvalidDonationAmount:"invalid_donation_amount",DonationTooHigh:"donation_too_high",DonationTooLow:"donation_too_low"},C={Button:"button",Checkbox:"checkbox",Hide:"hide"},V={SingleLine:"single-line",MultiLine:"multi-line"};let u=class extends E{constructor(){super(...arguments),this.donationInfo=G,this.stepNumberMode=D.ShowNumbers,this.amountOptions=J,this.amountSelectionLayout=V.MultiLine,this.frequencySelectionMode=C.Button,this.customAmountMode="display",this.coverFeesCheckboxMode="display",this.amountTitleDisplayMode="default",this.customAmountSelected=!1,this.currencyValidator=new U}render(){const o=this.amountTitleDisplayMode==="default"?c("Choose an amount (USD)"):"";return a`
      ${this.frequencySelectionMode===C.Button?this.frequencyButtonsTemplate:S}

      <ia-donation-section
        sectionBadge="${this.amountSelectionSectionNumber}"
        headline=${o}
        badgeMode=${this.formSectionNumberMode}
      >
        ${this.amountTitleDisplayMode==="slot"?a`<slot name="edit-donation-amount-title"></slot>`:S}
        <ul class="amount-selector">
          ${this.presetAmountsTemplate}
          ${this.customAmountMode==="display"?a`<li class="custom-amount">${this.customAmountTemplate}</li>`:S}
        </ul>

        <div class="errors">${this.error}</div>

        ${this.coverFeesCheckboxMode==="display"?a`<div class="checkbox-options">
              ${this.coverFeesCheckboxTemplate}
              ${this.frequencySelectionMode===C.Checkbox?this.frequencyCheckboxTemplate:S}
            </div>`:S}
      </ia-donation-section>
    `}updated(o){o.has("customAmountSelected")&&this.customAmountButton&&(this.customAmountButton.checked=this.customAmountSelected),o.has("amountOptions")&&(this.customAmountSelected=!1,this.updateSelectedDonationInfo(),this.setupAmountColumnsLayoutConfig()),o.has("amountSelectionLayout")&&this.setupAmountColumnsLayoutConfig(),o.has("donationInfo")&&this.updateSelectedDonationInfo(),o.has("defaultSelectedAmount")&&this.defaultSelectedAmount!==void 0&&(this.customAmountSelected=!1,this.donationInfo=new A({donationType:this.donationInfo.donationType,amount:this.defaultSelectedAmount,coverFees:this.donationInfo.coverFees}))}get frequencyButtonsTemplate(){return a`
      <ia-donation-section
        sectionBadge="1"
        headline=${c("Choose a frequency")}
        badgeMode=${this.formSectionNumberMode}
      >
        <ul class="frequency-selector">
          ${this.frequencyTemplate}
        </ul>
      </ia-donation-section>
    `}get frequencyCheckboxTemplate(){return a`
      <div class="checkbox-option-container">
        <input
          type="checkbox"
          id="make-this-monthly"
          @input=${this.monthlyCheckboxChecked}
          .checked=${this.donationInfo.donationType===v.Monthly}
          tabindex="0"
        />
        <label for="make-this-monthly">${c("Make this monthly")}</label>
      </div>
    `}get coverFeesCheckboxTemplate(){return a`
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
    `}get amountSelectionSectionNumber(){return this.frequencySelectionMode===C.Button?2:1}get formSectionNumberMode(){switch(this.stepNumberMode){case D.ShowNumbers:return w.ShowBadge;case D.HideNumbers:return w.HideBadge}}setupAmountColumnsLayoutConfig(){const o=this.customAmountMode==="hide"&&this.coverFeesCheckboxMode==="hide"&&this.frequencySelectionMode===C.Hide,t=this.amountOptions.length;let n=5,e=3;switch(t){case 7:n=5,e=3;break;case 6:n=4,e=2;break;case 5:n=4,e=3;break;case 4:if(o){n=4,e=0;break}n=3,e=2;break;case 3:n=2,e=1;break}this.amountSelectionLayout===V.SingleLine&&(n=t+3,e=3),this.style.setProperty("--ia-donation-edit-amount-column-count",`${n}`),this.style.setProperty("--ia-donation-edit-custom-amount-col-span",`${e}`)}updateSelectedDonationInfo(){const o=!!this.customAmountInput&&this.shadowRoot?.activeElement===this.customAmountInput;if(!this.isCustomAmount&&!(this.customAmountSelected&&o)){const t=this.shadowRoot?.querySelector(`input[type="radio"][name="${g.Amount}"][value="${this.donationInfo.amount}"]`);t&&(t.checked=!0),this.customAmountSelected=!1,this.error=void 0,this.customAmountInput&&(this.customAmountInput.value="")}else if(this.customAmountSelected=!0,!o&&this.customAmountInput){this.customAmountInput.value=this.customAmountDisplayValue;const t=this.getDonationInfoStatus(this.donationInfo.amount);this.handleDonationInfoStatus(t)}}get coverFeesText(){const o=l(this.donationInfo.fee,{symbol:"$"}).format();return c(_`I'll generously add ${o} to cover fees.`)}formatShortenedAmount(o){const t=o%1===0?0:2;return l(o,{symbol:"$",precision:t}).format()}get frequencyTemplate(){return a`
      <li>
        ${this.getRadioButton({group:g.DonationType,value:v.OneTime,displayText:c("One time"),checked:this.donationInfo.donationType===v.OneTime})}
      </li>

      <li>
        ${this.getRadioButton({group:g.DonationType,value:v.Monthly,displayText:c("Monthly"),checked:this.donationInfo.donationType===v.Monthly})}
      </li>
    `}get presetAmountsTemplate(){return a`
      ${this.amountOptions.map(o=>{const t=!this.customAmountSelected&&o===this.donationInfo.amount;return a`
          <li>
            ${this.getRadioButton({group:g.Amount,value:`${o}`,displayText:this.formatShortenedAmount(o),checked:t})}
          </li>
        `})}
    `}getRadioButton(o){const t=`${o.group}-${o.value}-option`;return a`
      <div class="selection-button">
        <input
          type="radio"
          name=${o.group}
          value=${o.value}
          id=${t}
          tabindex="0"
          .checked=${o.checked}
          @change=${this.radioSelected}
          @click=${n=>{o.group===g.Amount&&parseFloat(o.value)===this.donationInfo.amount&&this.radioSelected(n)}}
        />
        <label for=${t}>${o.displayText}</label>
      </div>
    `}get isCustomAmount(){return!this.amountOptions.includes(this.donationInfo.amount)}get customAmountDisplayValue(){return this.isCustomAmount?l(this.donationInfo.amount,{symbol:""}).format():""}get customAmountTemplate(){return a`
      <div class="selection-button">
        <input
          type="radio"
          name=${g.Amount}
          value="custom"
          id="custom-amount-button"
          tabindex="0"
          @change=${this.customRadioSelected}
        />

        <label for="custom-amount-button">
          <span class="custom-amount-text">${c("Custom: $")}</span
          ><input
            type="text"
            id="custom-amount-input"
            tabindex="-1"
            aria-label=${c("Custom amount in dollars")}
            value=${this.customAmountDisplayValue}
            @input=${this.customAmountChanged}
            @keydown=${this.currencyValidator.keydown}
            @focus=${this.customAmountFocused}
            @blur=${this.customAmountBlurred}
          />
        </label>
      </div>
    `}customRadioSelected(){this.customAmountInput.focus()}customAmountFocused(o){const t=o.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}customAmountBlurred(){this.updateSelectedDonationInfo()}coverFeesChecked(o){const t=o.target;this.updateDonationInfo({coverFees:t.checked})}customAmountChanged(o){const t=o.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}handleCustomAmountInput(o){const t=parseFloat(o);isNaN(t)?this.dispatchEditDonationError(m.InvalidDonationAmount):this.amountChanged(t)}handleDonationInfoStatus(o){switch(o){case m.ValidDonationAmount:this.error=void 0;break;case m.DonationTooHigh:this.error=c(a`
          To make a donation of $10,000 or more, please contact our philanthropy
          department at
          <a href="mailto:donations@archive.org">donations@archive.org</a>
        `),this.dispatchEditDonationError(o);break;case m.DonationTooLow:this.customAmountInput.value.length>0&&(this.error=a`${c("Please select an amount (minimum $1)")}`),this.dispatchEditDonationError(o);break;case m.InvalidDonationAmount:this.error=a`${c("Please enter a valid donation amount")}`,this.dispatchEditDonationError(o);break}}amountChanged(o){const t=this.getDonationInfoStatus(o);this.handleDonationInfoStatus(t),t===m.ValidDonationAmount&&this.updateDonationInfo({amount:o})}getDonationInfoStatus(o){return isNaN(o)?m.InvalidDonationAmount:o>=1e4?m.DonationTooHigh:o<1?m.DonationTooLow:m.ValidDonationAmount}radioSelected(o){const t=o.target,n=t.name,{value:e}=t;switch(n){case g.Amount:this.presetAmountChanged(parseFloat(e));break;case g.DonationType:this.updateDonationInfo({donationType:e});break}}monthlyCheckboxChecked(o){const n=o.target.checked?v.Monthly:v.OneTime;this.updateDonationInfo({donationType:n})}dispatchEditDonationError(o){const t=new CustomEvent("editDonationError",{detail:{error:o}});this.dispatchEvent(t)}presetAmountChanged(o){this.error=void 0,this.customAmountSelected=!1,this.customAmountInput&&(this.customAmountInput.value=""),this.updateDonationInfo({amount:o})}updateDonationInfo(o){const t=new A({donationType:o.donationType??this.donationInfo.donationType,amount:o.amount??this.donationInfo.amount,coverFees:o.coverFees??this.donationInfo.coverFees});this.donationInfo=t;const n=new CustomEvent("donationInfoChanged",{detail:{donationInfo:t}});this.dispatchEvent(n)}static get styles(){return[q,F`
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
      `]}};d([p({type:Object})],u.prototype,"donationInfo",2);d([p({type:String})],u.prototype,"stepNumberMode",2);d([p({type:Number})],u.prototype,"defaultSelectedAmount",2);d([p({type:Array})],u.prototype,"amountOptions",2);d([p({type:String})],u.prototype,"amountSelectionLayout",2);d([p({type:String,reflect:!0})],u.prototype,"frequencySelectionMode",2);d([p({type:String,reflect:!0})],u.prototype,"customAmountMode",2);d([p({type:String,reflect:!0})],u.prototype,"coverFeesCheckboxMode",2);d([p({type:String,reflect:!0})],u.prototype,"amountTitleDisplayMode",2);d([T()],u.prototype,"error",2);d([T()],u.prototype,"customAmountSelected",2);d([N("#custom-amount-button")],u.prototype,"customAmountButton",2);d([N("#custom-amount-input")],u.prototype,"customAmountInput",2);u=d([M("ia-donation-edit-donation")],u);var W=Object.defineProperty,X=Object.getOwnPropertyDescriptor,k=(o,t,n,e)=>{for(var i=e>1?void 0:e?X(t,n):t,s=o.length-1,r;s>=0;s--)(r=o[s])&&(i=(e?r(t,n,i):r(i))||i);return e&&i&&W(t,n,i),i};const Y=[{label:"Base font size",cssVariable:"--ia-donation-edit-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Button gap",cssVariable:"--ia-donation-edit-button-grid-gap",defaultValue:"10px",inputType:"text"},{section:"Color",label:"Button",cssVariable:"--ia-donation-edit-button-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Button text",cssVariable:"--ia-donation-edit-button-font-color",defaultValue:"#000000",inputType:"color"},{section:"Color",label:"Button border",cssVariable:"--ia-donation-edit-button-border-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Selected button",cssVariable:"--ia-donation-edit-button-selected-color",defaultValue:"#f9bf3b",inputType:"color",presets:[{label:"Banner green",value:"#31a481",note:"donation banner"}],presetsInline:!0},{section:"Color",label:"Selected button text",cssVariable:"--ia-donation-edit-button-selected-font-color",defaultValue:"#000000",inputType:"color"},{section:"Color",label:"Step badge",cssVariable:"--ia-donation-edit-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-edit-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donation form"}],presetsInline:!0}],Z=[{label:"Selected amount",propertyName:"defaultSelectedAmount",defaultValue:10,inputType:"number"},{label:"Step numbers",propertyName:"stepNumberMode",defaultValue:"shownumbers",inputType:"radio",radioOptions:["shownumbers","hidenumbers"]},{label:"Frequency choice",propertyName:"frequencySelectionMode",defaultValue:"button",inputType:"radio",radioOptions:["button","checkbox","hide"]},{label:"Amount layout",propertyName:"amountSelectionLayout",defaultValue:"multi-line",inputType:"radio",radioOptions:["multi-line","single-line"]},{label:"Custom amount",propertyName:"customAmountMode",defaultValue:"display",inputType:"radio",radioOptions:["display","hide"]},{label:"Cover fees checkbox",propertyName:"coverFeesCheckboxMode",defaultValue:"display",inputType:"radio",radioOptions:["display","hide"]},{label:"Amount headline",propertyName:"amountTitleDisplayMode",defaultValue:"default",inputType:"radio",radioOptions:["default","slot"]}];let I=class extends E{render(){return a`
      <story-template
        elementTag="ia-donation-edit-donation"
        elementClassName="IADonationEditDonation"
        importPath="ia-donation-form/form-elements/ia-donation-edit-donation"
        .defaultUsageProps=${"@donationInfoChanged=${(e: CustomEvent) => console.log(e.detail.donationInfo)}"}
        .styleInputData=${{settings:Y,revertable:!0}}
        .propInputData=${{settings:Z}}
      >
        <ia-donation-edit-donation
          slot="demo"
          @donationInfoChanged=${this.handleChanged}
          @editDonationError=${this.handleError}
        >
          <p slot="edit-donation-amount-title" class="slotted-title">
            <b>Can you chip in?</b> <span>(USD)</span>
          </p>
        </ia-donation-edit-donation>

        <div slot="settings" class="readout">
          <h4>Events</h4>
          <dl>
            <dt>donationInfoChanged</dt>
            <dd>
              ${this.lastChange?a`${this.lastChange.donationType},
                    $${this.lastChange.amount}${this.lastChange.coverFees?a` + $${this.lastChange.fee} fee`:""}
                    = <b>$${this.lastChange.total}</b>`:a`<i>none yet</i>`}
            </dd>
            <dt>editDonationError</dt>
            <dd>${this.lastError??a`<i>none</i>`}</dd>
          </dl>
        </div>
      </story-template>
    `}handleChanged(o){this.lastChange=o.detail.donationInfo,this.lastError=void 0}handleError(o){this.lastError=o.detail.error}static get styles(){return F`
      ia-donation-edit-donation {
        display: block;
        max-width: 32rem;
      }

      .slotted-title {
        margin: 0 0 5px 0;
        font-size: 1.125rem;
        line-height: 1.5rem;
      }

      .readout h4 {
        margin: 0 0 0.25rem;
      }

      .readout dl {
        margin: 0;
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.25rem 1rem;
      }

      .readout dt {
        font-family: monospace;
      }

      .readout dd {
        margin: 0;
      }
    `}};k([T()],I.prototype,"lastChange",2);k([T()],I.prototype,"lastError",2);I=k([M("ia-donation-edit-donation-story")],I);export{I as IADonationEditDonationStory};
