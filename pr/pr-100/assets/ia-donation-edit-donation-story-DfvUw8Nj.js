import{r as T,n as p,e as M,c as E,i as F,m as c,A as S,b as a,s as _,a as N}from"./index-ENGc3r5n.js";import{t as q}from"./story-template-Beh-_3AT.js";import{D as w}from"./ia-donation-section-B-pPD25I.js";var L={symbol:"$",separator:",",decimal:".",errorOnInvalid:!1,precision:2,pattern:"!#",negativePattern:"-!#",format:H,fromCents:!1},O=function(t){return Math.round(t)},x=function(t){return Math.pow(10,t)},R=function(t,n){return O(t/n)*n},P=/(\d)(?=(\d{3})+\b)/g,j=/(\d)(?=(\d\d)+\d\b)/g;function l(e,t){var n=this;if(!(n instanceof l))return new l(e,t);var o=Object.assign({},L,t),i=x(o.precision),s=$(e,o);n.intValue=s,n.value=s/i,o.increment=o.increment||1/i,o.useVedic?o.groups=j:o.groups=P,this.s=o,this.p=i}function $(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,o=0,i=t.decimal,s=t.errorOnInvalid,r=t.precision,h=t.fromCents,f=x(r),b=typeof e=="number",y=e instanceof l;if(y&&h)return e.intValue;if(b||y)o=y?e.value:e;else if(typeof e=="string"){var z=new RegExp("[^-\\d"+i+"]","g"),B=new RegExp("\\"+i,"g");o=e.replace(/\((.*)\)/,"-$1").replace(z,"").replace(B,"."),o=o||0}else{if(s)throw Error("Invalid Input");o=0}return h||(o*=f,o=o.toFixed(4)),n?O(o):o}function H(e,t){var n=t.pattern,o=t.negativePattern,i=t.symbol,s=t.separator,r=t.decimal,h=t.groups,f=(""+e).replace(/^-/,"").split("."),b=f[0],y=f[1];return(e.value>=0?n:o).replace("!",i).replace("#",b.replace(h,"$1"+s)+(y?r+y:""))}l.prototype={add:function(t){var n=this.intValue,o=this.s,i=this.p;return l((n+=$(t,o))/(o.fromCents?1:i),o)},subtract:function(t){var n=this.intValue,o=this.s,i=this.p;return l((n-=$(t,o))/(o.fromCents?1:i),o)},multiply:function(t){var n=this.intValue,o=this.s;return l((n*=t)/(o.fromCents?1:x(o.precision)),o)},divide:function(t){var n=this.intValue,o=this.s;return l(n/=$(t,o,!1),o)},distribute:function(t){for(var n=this.intValue,o=this.p,i=this.s,s=[],r=Math[n>=0?"floor":"ceil"](n/t),h=Math.abs(n-r*t),f=i.fromCents?1:o;t!==0;t--){var b=l(r/f,i);h-- >0&&(b=b[n>=0?"add":"subtract"](1/f)),s.push(b)}return s},dollars:function(){return~~this.value},cents:function(){var t=this.intValue,n=this.p;return~~(t%n)},format:function(t){var n=this.s;return typeof t=="function"?t(this,n):n.format(this,Object.assign({},n,t))},toString:function(){var t=this.intValue,n=this.p,o=this.s;return R(t/n,o.increment).toFixed(o.precision)},toJSON:function(){return this.value}};class U{keydown(t){const n=t.key;if(t.metaKey)return;switch(n){case"Tab":case"Delete":case"Backspace":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":return}const o=t.target,i=o.value,s=i.slice(0,o.selectionStart??0),r=i.slice(o.selectionEnd??0),h=`${s}${n}${r}`;/^[0-9]+(\.[0-9]{0,2})?$/.test(h)||t.preventDefault()}}const v={OneTime:"one-time",Monthly:"monthly"};class A{constructor(t){this.donationType=t.donationType,this.amount=t.amount,this.coverFees=t.coverFees}get feeAmountCovered(){return this.coverFees?this.fee:0}get fee(){return A.calculateFeeAmount(this.amount)}get total(){return A.calculateTotal(this.amount,this.coverFees)}static calculateTotal(t,n){const o=n?this.calculateFeeAmount(t):0,i=t+o;return isNaN(i)?0:this.roundAmount(i)}static calculateFeeAmount(t){const n=t*.0219+.29;return isNaN(n)?0:this.roundAmount(n)}static roundAmount(t){return Math.round(t*100)/100}}const J=[5,10,25,50,100,500,1e3],G=new A({donationType:v.OneTime,amount:10,coverFees:!1});var K=Object.defineProperty,Q=Object.getOwnPropertyDescriptor,d=(e,t,n,o)=>{for(var i=o>1?void 0:o?Q(t,n):t,s=e.length-1,r;s>=0;s--)(r=e[s])&&(i=(o?r(t,n,i):r(i))||i);return o&&i&&K(t,n,i),i};const D={HideNumbers:"hidenumbers",ShowNumbers:"shownumbers"},g={DonationType:"donationType",Amount:"amount"},m={ValidDonationAmount:"valid_donation_amount",InvalidDonationAmount:"invalid_donation_amount",DonationTooHigh:"donation_too_high",DonationTooLow:"donation_too_low"},C={Button:"button",Checkbox:"checkbox",Hide:"hide"},V={SingleLine:"single-line",MultiLine:"multi-line"};let u=class extends F{constructor(){super(...arguments),this.donationInfo=G,this.stepNumberMode=D.ShowNumbers,this.amountOptions=J,this.amountSelectionLayout=V.MultiLine,this.frequencySelectionMode=C.Button,this.customAmountMode="display",this.coverFeesCheckboxMode="display",this.amountTitleDisplayMode="default",this.customAmountSelected=!1,this.currencyValidator=new U}render(){const e=this.amountTitleDisplayMode==="default"?c("Choose an amount (USD)"):"";return a`
      ${this.frequencySelectionMode===C.Button?this.frequencyButtonsTemplate:S}

      <ia-donation-section
        sectionBadge="${this.amountSelectionSectionNumber}"
        headline=${e}
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
    `}updated(e){e.has("customAmountSelected")&&this.customAmountButton&&(this.customAmountButton.checked=this.customAmountSelected),e.has("amountOptions")&&(this.customAmountSelected=!1,this.updateSelectedDonationInfo(),this.setupAmountColumnsLayoutConfig()),e.has("amountSelectionLayout")&&this.setupAmountColumnsLayoutConfig(),e.has("donationInfo")&&this.updateSelectedDonationInfo(),e.has("defaultSelectedAmount")&&this.defaultSelectedAmount!==void 0&&(this.customAmountSelected=!1,this.donationInfo=new A({donationType:this.donationInfo.donationType,amount:this.defaultSelectedAmount,coverFees:this.donationInfo.coverFees}))}get frequencyButtonsTemplate(){return a`
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
    `}get amountSelectionSectionNumber(){return this.frequencySelectionMode===C.Button?2:1}get formSectionNumberMode(){switch(this.stepNumberMode){case D.ShowNumbers:return w.ShowBadge;case D.HideNumbers:return w.HideBadge}}setupAmountColumnsLayoutConfig(){const e=this.customAmountMode==="hide"&&this.coverFeesCheckboxMode==="hide"&&this.frequencySelectionMode===C.Hide,t=this.amountOptions.length;let n=5,o=3;switch(t){case 7:n=5,o=3;break;case 6:n=4,o=2;break;case 5:n=4,o=3;break;case 4:if(e){n=4,o=0;break}n=3,o=2;break;case 3:n=2,o=1;break}this.amountSelectionLayout===V.SingleLine&&(n=t+3,o=3),this.style.setProperty("--ia-donation-edit-amount-column-count",`${n}`),this.style.setProperty("--ia-donation-edit-custom-amount-col-span",`${o}`)}updateSelectedDonationInfo(){const e=!!this.customAmountInput&&this.shadowRoot?.activeElement===this.customAmountInput;if(!this.isCustomAmount&&!(this.customAmountSelected&&e)){const t=this.shadowRoot?.querySelector(`input[type="radio"][name="${g.Amount}"][value="${this.donationInfo.amount}"]`);t&&(t.checked=!0),this.customAmountSelected=!1,this.error=void 0,this.customAmountInput&&(this.customAmountInput.value="")}else if(this.customAmountSelected=!0,!e&&this.customAmountInput){this.customAmountInput.value=this.customAmountDisplayValue;const t=this.getDonationInfoStatus(this.donationInfo.amount);this.handleDonationInfoStatus(t)}}get coverFeesText(){const e=l(this.donationInfo.fee,{symbol:"$"}).format();return c(_`I'll generously add ${e} to cover fees.`)}formatShortenedAmount(e){const t=e%1===0?0:2;return l(e,{symbol:"$",precision:t}).format()}get frequencyTemplate(){return a`
      <li>
        ${this.getRadioButton({group:g.DonationType,value:v.OneTime,displayText:c("One time"),checked:this.donationInfo.donationType===v.OneTime})}
      </li>

      <li>
        ${this.getRadioButton({group:g.DonationType,value:v.Monthly,displayText:c("Monthly"),checked:this.donationInfo.donationType===v.Monthly})}
      </li>
    `}get presetAmountsTemplate(){return a`
      ${this.amountOptions.map(e=>{const t=!this.customAmountSelected&&e===this.donationInfo.amount;return a`
          <li>
            ${this.getRadioButton({group:g.Amount,value:`${e}`,displayText:this.formatShortenedAmount(e),checked:t})}
          </li>
        `})}
    `}getRadioButton(e){const t=`${e.group}-${e.value}-option`;return a`
      <div class="selection-button">
        <input
          type="radio"
          name=${e.group}
          value=${e.value}
          id=${t}
          tabindex="0"
          .checked=${e.checked}
          @change=${this.radioSelected}
          @click=${n=>{e.group===g.Amount&&parseFloat(e.value)===this.donationInfo.amount&&this.radioSelected(n)}}
        />
        <label for=${t}>${e.displayText}</label>
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
    `}customRadioSelected(){this.customAmountInput.focus()}customAmountFocused(e){const t=e.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}customAmountBlurred(){this.updateSelectedDonationInfo()}coverFeesChecked(e){const t=e.target;this.updateDonationInfo({coverFees:t.checked})}customAmountChanged(e){const t=e.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}handleCustomAmountInput(e){const t=parseFloat(e);isNaN(t)?this.dispatchEditDonationError(m.InvalidDonationAmount):this.amountChanged(t)}handleDonationInfoStatus(e){switch(e){case m.ValidDonationAmount:this.error=void 0;break;case m.DonationTooHigh:this.error=c(a`
          To make a donation of $10,000 or more, please contact our philanthropy
          department at
          <a href="mailto:donations@archive.org">donations@archive.org</a>
        `),this.dispatchEditDonationError(e);break;case m.DonationTooLow:this.customAmountInput.value.length>0&&(this.error=a`${c("Please select an amount (minimum $1)")}`),this.dispatchEditDonationError(e);break;case m.InvalidDonationAmount:this.error=a`${c("Please enter a valid donation amount")}`,this.dispatchEditDonationError(e);break}}amountChanged(e){const t=this.getDonationInfoStatus(e);this.handleDonationInfoStatus(t),t===m.ValidDonationAmount&&this.updateDonationInfo({amount:e})}getDonationInfoStatus(e){return isNaN(e)?m.InvalidDonationAmount:e>=1e4?m.DonationTooHigh:e<1?m.DonationTooLow:m.ValidDonationAmount}radioSelected(e){const t=e.target,n=t.name,{value:o}=t;switch(n){case g.Amount:this.presetAmountChanged(parseFloat(o));break;case g.DonationType:this.updateDonationInfo({donationType:o});break}}monthlyCheckboxChecked(e){const n=e.target.checked?v.Monthly:v.OneTime;this.updateDonationInfo({donationType:n})}dispatchEditDonationError(e){const t=new CustomEvent("editDonationError",{detail:{error:e}});this.dispatchEvent(t)}presetAmountChanged(e){this.error=void 0,this.customAmountSelected=!1,this.customAmountInput&&(this.customAmountInput.value=""),this.updateDonationInfo({amount:e})}updateDonationInfo(e){const t=new A({donationType:e.donationType??this.donationInfo.donationType,amount:e.amount??this.donationInfo.amount,coverFees:e.coverFees??this.donationInfo.coverFees});this.donationInfo=t;const n=new CustomEvent("donationInfoChanged",{detail:{donationInfo:t}});this.dispatchEvent(n)}static get styles(){return[q,N`
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
      `]}};d([p({type:Object})],u.prototype,"donationInfo",2);d([p({type:String})],u.prototype,"stepNumberMode",2);d([p({type:Number})],u.prototype,"defaultSelectedAmount",2);d([p({type:Array})],u.prototype,"amountOptions",2);d([p({type:String})],u.prototype,"amountSelectionLayout",2);d([p({type:String,reflect:!0})],u.prototype,"frequencySelectionMode",2);d([p({type:String,reflect:!0})],u.prototype,"customAmountMode",2);d([p({type:String,reflect:!0})],u.prototype,"coverFeesCheckboxMode",2);d([p({type:String,reflect:!0})],u.prototype,"amountTitleDisplayMode",2);d([T()],u.prototype,"error",2);d([T()],u.prototype,"customAmountSelected",2);d([M("#custom-amount-button")],u.prototype,"customAmountButton",2);d([M("#custom-amount-input")],u.prototype,"customAmountInput",2);u=d([E("ia-donation-edit-donation")],u);var W=Object.defineProperty,X=Object.getOwnPropertyDescriptor,k=(e,t,n,o)=>{for(var i=o>1?void 0:o?X(t,n):t,s=e.length-1,r;s>=0;s--)(r=e[s])&&(i=(o?r(t,n,i):r(i))||i);return o&&i&&W(t,n,i),i};const Y=[{label:"Base font size",cssVariable:"--ia-donation-edit-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Button gap",cssVariable:"--ia-donation-edit-button-grid-gap",defaultValue:"10px",inputType:"text"},{section:"Color",label:"Button",cssVariable:"--ia-donation-edit-button-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Button text",cssVariable:"--ia-donation-edit-button-font-color",defaultValue:"#000000",inputType:"color"},{section:"Color",label:"Button border",cssVariable:"--ia-donation-edit-button-border-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Selected button",cssVariable:"--ia-donation-edit-button-selected-color",defaultValue:"#f9bf3b",inputType:"color",presets:[{label:"Banner green",value:"#31a481",note:"donation banner"}],presetsInline:!0},{section:"Color",label:"Selected button text",cssVariable:"--ia-donation-edit-button-selected-font-color",defaultValue:"#000000",inputType:"color"},{section:"Color",label:"Step badge",cssVariable:"--ia-donation-edit-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-edit-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donation form"}],presetsInline:!0}],Z=[{label:"Selected amount",propertyName:"defaultSelectedAmount",defaultValue:10,inputType:"number"},{label:"Step numbers",propertyName:"stepNumberMode",defaultValue:"shownumbers",inputType:"radio",radioOptions:["shownumbers","hidenumbers"]},{label:"Frequency choice",propertyName:"frequencySelectionMode",defaultValue:"button",inputType:"radio",radioOptions:["button","checkbox","hide"]},{label:"Amount layout",propertyName:"amountSelectionLayout",defaultValue:"multi-line",inputType:"radio",radioOptions:["multi-line","single-line"]},{label:"Custom amount",propertyName:"customAmountMode",defaultValue:"display",inputType:"radio",radioOptions:["display","hide"]},{label:"Cover fees checkbox",propertyName:"coverFeesCheckboxMode",defaultValue:"display",inputType:"radio",radioOptions:["display","hide"]},{label:"Amount headline",propertyName:"amountTitleDisplayMode",defaultValue:"default",inputType:"radio",radioOptions:["default","slot"]}];let I=class extends F{render(){return a`
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
    `}handleChanged(e){this.lastChange=e.detail.donationInfo,this.lastError=void 0}handleError(e){this.lastError=e.detail.error}static get styles(){return N`
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
    `}};k([T()],I.prototype,"lastChange",2);k([T()],I.prototype,"lastError",2);I=k([E("ia-donation-edit-donation-story")],I);export{I as IADonationEditDonationStory};
