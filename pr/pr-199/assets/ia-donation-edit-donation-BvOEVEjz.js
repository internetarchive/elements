import{r as B,n as b,e as $,c as V,i as O,m as h,A,b as u,s as R,a as z}from"./index-ClZfFVlK.js";import{l as P}from"./localized-decorator-FzD2XEva.js";import{t as K}from"./theme-styles-XLpRWGuX.js";import{D as w}from"./ia-donation-section-LlVP6keQ.js";var H={symbol:"$",separator:",",decimal:".",errorOnInvalid:!1,precision:2,pattern:"!#",negativePattern:"-!#",format:J,fromCents:!1},x=function(t){return Math.round(t)},D=function(t){return Math.pow(10,t)},U=function(t,n){return x(t/n)*n},_=/(\d)(?=(\d{3})+\b)/g,q=/(\d)(?=(\d\d)+\d\b)/g;function l(e,t){var n=this;if(!(n instanceof l))return new l(e,t);var o=Object.assign({},H,t),a=D(o.precision),i=M(e,o);n.intValue=i,n.value=i/a,o.increment=o.increment||1/a,o.useVedic?o.groups=q:o.groups=_,this.s=o,this.p=a}function M(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,o=0,a=t.decimal,i=t.errorOnInvalid,r=t.precision,s=t.fromCents,m=D(r),p=typeof e=="number",y=e instanceof l;if(y&&s)return e.intValue;if(p||y)o=y?e.value:e;else if(typeof e=="string"){var G=new RegExp("[^-\\d"+a+"]","g"),L=new RegExp("\\"+a,"g");o=e.replace(/\((.*)\)/,"-$1").replace(G,"").replace(L,"."),o=o||0}else{if(i)throw Error("Invalid Input");o=0}return s||(o*=m,o=o.toFixed(4)),n?x(o):o}function J(e,t){var n=t.pattern,o=t.negativePattern,a=t.symbol,i=t.separator,r=t.decimal,s=t.groups,m=(""+e).replace(/^-/,"").split("."),p=m[0],y=m[1];return(e.value>=0?n:o).replace("!",a).replace("#",p.replace(s,"$1"+i)+(y?r+y:""))}l.prototype={add:function(t){var n=this.intValue,o=this.s,a=this.p;return l((n+=M(t,o))/(o.fromCents?1:a),o)},subtract:function(t){var n=this.intValue,o=this.s,a=this.p;return l((n-=M(t,o))/(o.fromCents?1:a),o)},multiply:function(t){var n=this.intValue,o=this.s;return l((n*=t)/(o.fromCents?1:D(o.precision)),o)},divide:function(t){var n=this.intValue,o=this.s;return l(n/=M(t,o,!1),o)},distribute:function(t){for(var n=this.intValue,o=this.p,a=this.s,i=[],r=Math[n>=0?"floor":"ceil"](n/t),s=Math.abs(n-r*t),m=a.fromCents?1:o;t!==0;t--){var p=l(r/m,a);s-- >0&&(p=p[n>=0?"add":"subtract"](1/m)),i.push(p)}return i},dollars:function(){return~~this.value},cents:function(){var t=this.intValue,n=this.p;return~~(t%n)},format:function(t){var n=this.s;return typeof t=="function"?t(this,n):n.format(this,Object.assign({},n,t))},toString:function(){var t=this.intValue,n=this.p,o=this.s;return U(t/n,o.increment).toFixed(o.precision)},toJSON:function(){return this.value}};const Z={AF:"Afghanistan",AX:"Aland Islands",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua and Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia",BQ:"Bonaire, Saint Eustatius and Saba ",BA:"Bosnia and Herzegovina",BW:"Botswana",BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",VG:"British Virgin Islands",BN:"Brunei",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",TD:"Chad",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos Islands",CO:"Colombia",KM:"Comoros",CK:"Cook Islands",CR:"Costa Rica",HR:"Croatia",CU:"Cuba",CW:"Curacao",CY:"Cyprus",CZ:"Czech Republic",CD:"Democratic Republic of the Congo",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",TL:"East Timor",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FK:"Falkland Islands",FO:"Faroe Islands",FJ:"Fiji",FI:"Finland",FR:"France",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GM:"Gambia",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard Island and McDonald Islands",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran",IQ:"Iraq",IE:"Ireland",IM:"Isle of Man",IL:"Israel",IT:"Italy",CI:"Ivory Coast",JM:"Jamaica",JP:"Japan",JE:"Jersey",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",XK:"Kosovo",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Laos",LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macao",MK:"Macedonia",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia",MD:"Moldova",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",KP:"North Korea",MP:"Northern Mariana Islands",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",PS:"Palestinian Territory",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",CG:"Republic of the Congo",RE:"Reunion",RO:"Romania",RU:"Russia",RW:"Rwanda",BL:"Saint Barthelemy",SH:"Saint Helena",KN:"Saint Kitts and Nevis",LC:"Saint Lucia",MF:"Saint Martin",PM:"Saint Pierre and Miquelon",VC:"Saint Vincent and the Grenadines",WS:"Samoa",SM:"San Marino",ST:"Sao Tome and Principe",SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SX:"Sint Maarten",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia and the South Sandwich Islands",KR:"South Korea",SS:"South Sudan",ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard and Jan Mayen",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syria",TW:"Taiwan",TJ:"Tajikistan",TZ:"Tanzania",TH:"Thailand",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad and Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks and Caicos Islands",TV:"Tuvalu",VI:"U.S. Virgin Islands",UG:"Uganda",UA:"Ukraine",AE:"United Arab Emirates",GB:"United Kingdom",UM:"United States Minor Outlying Islands",US:"United States",UY:"Uruguay",UZ:"Uzbekistan",VU:"Vanuatu",VA:"Vatican",VE:"Venezuela",VN:"Vietnam",WF:"Wallis and Futuna",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"};let T;typeof window<"u"&&window.addEventListener("lit-localize-status",e=>{const t=e.detail;t.status==="ready"&&(T=t.readyLocale)});function E(){return T||(typeof document>"u"?"en":document.documentElement.lang||"en")}function F(e){return e==="en"||e.startsWith("en-")}function k(e,t=2){const n=E();if(F(n))return l(e,{symbol:"$",precision:t}).format();try{return new Intl.NumberFormat(n,{style:"currency",currency:"USD",minimumFractionDigits:t,maximumFractionDigits:t}).format(e)}catch{return l(e,{symbol:"$",precision:t}).format()}}function it(){const e=E(),t=Object.entries(Z);if(F(e))return t;try{const n=new Intl.DisplayNames([e],{type:"region"}),o=new Intl.Collator(e);return t.map(([a,i])=>{const r=n.of(a);return[a,r&&r!==a?r:i.trim()]}).sort((a,i)=>o.compare(a[1],i[1]))}catch{return t}}class j{keydown(t){const n=t.key;if(t.metaKey)return;switch(n){case"Tab":case"Delete":case"Backspace":case"ArrowLeft":case"ArrowRight":case"ArrowUp":case"ArrowDown":return}const o=t.target,a=o.value,i=a.slice(0,o.selectionStart??0),r=a.slice(o.selectionEnd??0),s=`${i}${n}${r}`;/^[0-9]+(\.[0-9]{0,2})?$/.test(s)||t.preventDefault()}}function W(e){const t=e.trim();if(!/^[0-9]+([.,][0-9]*)*$/.test(t))return NaN;const n=Math.max(t.lastIndexOf(","),t.lastIndexOf("."));if(n===-1)return parseFloat(t);const o=t[n],a=o===","?".":",",i=t.length-n-1,r=(s,m)=>new RegExp(`^[0-9]{1,3}(\\${m}[0-9]{3})*$`).test(s);if(i<=2){const s=t.slice(0,n);if(!(s.includes(a)?r(s,a):/^[0-9]+$/.test(s)))return NaN;const p=t.slice(n+1);return parseFloat(`${s.split(a).join("")}.${p||"0"}`)}return i===3&&o===","&&r(t,o)?parseFloat(t.split(o).join("")):NaN}const v={OneTime:"one-time",Monthly:"monthly",Upsell:"up_sell"};class S{constructor(t){this.donationType=t.donationType,this.amount=t.amount,this.coverFees=t.coverFees}get feeAmountCovered(){return this.coverFees?this.fee:0}get fee(){return S.calculateFeeAmount(this.amount)}get total(){return S.calculateTotal(this.amount,this.coverFees)}static calculateTotal(t,n){const o=n?this.calculateFeeAmount(t):0,a=t+o;return isNaN(a)?0:this.roundAmount(a)}static calculateFeeAmount(t){const n=t*.0219+.29;return isNaN(n)?0:this.roundAmount(n)}static roundAmount(t){return Math.round(t*100)/100}}const Y=[5,10,25,50,100,500,1e3],Q=new S({donationType:v.OneTime,amount:10,coverFees:!1});var X=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,c=(e,t,n,o)=>{for(var a=o>1?void 0:o?tt(t,n):t,i=e.length-1,r;i>=0;i--)(r=e[i])&&(a=(o?r(t,n,a):r(a))||a);return o&&a&&X(t,n,a),a};const C={HideNumbers:"hidenumbers",ShowNumbers:"shownumbers"},g={DonationType:"donationType",Amount:"amount"},f={ValidDonationAmount:"valid_donation_amount",InvalidDonationAmount:"invalid_donation_amount",DonationTooHigh:"donation_too_high",DonationTooLow:"donation_too_low"},I={Button:"button",Checkbox:"checkbox",Hide:"hide"},N={SingleLine:"single-line",MultiLine:"multi-line"};let d=class extends O{constructor(){super(...arguments),this.donationInfo=Q,this.stepNumberMode=C.ShowNumbers,this.amountOptions=Y,this.amountSelectionLayout=N.MultiLine,this.frequencySelectionMode=I.Button,this.customAmountMode="display",this.coverFeesCheckboxMode="display",this.amountTitleDisplayMode="default",this.customAmountSelected=!1,this.currencyValidator=new j}render(){const e=this.amountTitleDisplayMode==="default"?h("Choose an amount (USD)"):"";return u`
      ${this.frequencySelectionMode===I.Button?this.frequencyButtonsTemplate:A}

      <ia-donation-section
        sectionBadge="${this.amountSelectionSectionNumber}"
        headline=${e}
        badgeMode=${this.formSectionNumberMode}
      >
        ${this.amountTitleDisplayMode==="slot"?u`<slot name="edit-donation-amount-title"></slot>`:A}
        <ul class="amount-selector">
          ${this.presetAmountsTemplate}
          ${this.customAmountMode==="display"?u`<li class="custom-amount">${this.customAmountTemplate}</li>`:A}
        </ul>

        <div class="errors" id="amount-errors" aria-live="polite">
          ${this.error}
        </div>

        ${this.coverFeesCheckboxMode==="display"?u`<div class="checkbox-options">
              ${this.coverFeesCheckboxTemplate}
              ${this.frequencySelectionMode===I.Checkbox?this.frequencyCheckboxTemplate:A}
            </div>`:A}
      </ia-donation-section>
    `}updated(e){e.has("customAmountSelected")&&this.customAmountButton&&(this.customAmountButton.checked=this.customAmountSelected),e.has("amountOptions")&&(this.customAmountSelected=!1,this.updateSelectedDonationInfo(),this.setupAmountColumnsLayoutConfig()),e.has("amountSelectionLayout")&&this.setupAmountColumnsLayoutConfig(),e.has("donationInfo")&&this.updateSelectedDonationInfo(),e.has("defaultSelectedAmount")&&this.defaultSelectedAmount!==void 0&&(this.customAmountSelected=!1,this.donationInfo=new S({donationType:this.donationInfo.donationType,amount:this.defaultSelectedAmount,coverFees:this.donationInfo.coverFees}))}get frequencyButtonsTemplate(){return u`
      <ia-donation-section
        sectionBadge="1"
        headline=${h("Choose a frequency")}
        badgeMode=${this.formSectionNumberMode}
      >
        <ul class="frequency-selector">
          ${this.frequencyTemplate}
        </ul>
      </ia-donation-section>
    `}get frequencyCheckboxTemplate(){return u`
      <div class="checkbox-option-container">
        <input
          type="checkbox"
          id="make-this-monthly"
          @input=${this.monthlyCheckboxChecked}
          .checked=${this.donationInfo.donationType===v.Monthly}
          tabindex="0"
        />
        <label for="make-this-monthly">${h("Make this monthly")}</label>
      </div>
    `}get coverFeesCheckboxTemplate(){return u`
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
    `}get amountSelectionSectionNumber(){return this.frequencySelectionMode===I.Button?2:1}get formSectionNumberMode(){switch(this.stepNumberMode){case C.ShowNumbers:return w.ShowBadge;case C.HideNumbers:return w.HideBadge}}setupAmountColumnsLayoutConfig(){const e=this.customAmountMode==="hide"&&this.coverFeesCheckboxMode==="hide"&&this.frequencySelectionMode===I.Hide,t=this.amountOptions.length;let n=5,o=3;switch(t){case 7:n=5,o=3;break;case 6:n=4,o=2;break;case 5:n=4,o=3;break;case 4:if(e){n=4,o=0;break}n=3,o=2;break;case 3:n=2,o=1;break}this.amountSelectionLayout===N.SingleLine&&(n=t+3,o=3),this.style.setProperty("--ia-donation-edit-amount-column-count",`${n}`),this.style.setProperty("--ia-donation-edit-custom-amount-col-span",`${o}`)}updateSelectedDonationInfo(){const e=!!this.customAmountInput&&this.shadowRoot?.activeElement===this.customAmountInput;if(!this.isCustomAmount&&!(this.customAmountSelected&&e)){const t=this.shadowRoot?.querySelector(`input[type="radio"][name="${g.Amount}"][value="${this.donationInfo.amount}"]`);t&&(t.checked=!0),this.customAmountSelected=!1,this.error=void 0,this.customAmountInput&&(this.customAmountInput.value="")}else if(this.customAmountSelected=!0,!e&&this.customAmountInput){this.customAmountInput.value=this.customAmountDisplayValue;const t=this.getDonationInfoStatus(this.donationInfo.amount);this.handleDonationInfoStatus(t)}}get coverFeesText(){const e=k(this.donationInfo.fee);return h(R`I'll generously add ${e} to cover fees.`)}formatShortenedAmount(e){const t=e%1===0?0:2;return k(e,t)}get frequencyTemplate(){return u`
      <li>
        ${this.getRadioButton({group:g.DonationType,value:v.OneTime,displayText:h("One time"),checked:this.donationInfo.donationType===v.OneTime})}
      </li>

      <li>
        ${this.getRadioButton({group:g.DonationType,value:v.Monthly,displayText:h("Monthly"),checked:this.donationInfo.donationType===v.Monthly})}
      </li>
    `}get presetAmountsTemplate(){return u`
      ${this.amountOptions.map(e=>{const t=!this.customAmountSelected&&e===this.donationInfo.amount;return u`
          <li>
            ${this.getRadioButton({group:g.Amount,value:`${e}`,displayText:this.formatShortenedAmount(e),checked:t})}
          </li>
        `})}
    `}getRadioButton(e){const t=`${e.group}-${e.value}-option`;return u`
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
    `}get isCustomAmount(){return!this.amountOptions.includes(this.donationInfo.amount)}get customAmountDisplayValue(){return this.isCustomAmount?l(this.donationInfo.amount,{symbol:"",separator:""}).format():""}get customAmountTemplate(){return u`
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
          <span class="custom-amount-text">${h("Custom: $")}</span
          ><input
            type="text"
            id="custom-amount-input"
            tabindex="-1"
            aria-label=${h("Custom amount in dollars")}
            aria-describedby="amount-errors"
            value=${this.customAmountDisplayValue}
            @input=${this.customAmountChanged}
            @keydown=${this.currencyValidator.keydown}
            @focus=${this.customAmountFocused}
            @blur=${this.customAmountBlurred}
          />
        </label>
      </div>
    `}customRadioSelected(){this.customAmountInput.focus()}customAmountFocused(e){const t=e.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}customAmountBlurred(){this.updateSelectedDonationInfo()}coverFeesChecked(e){const t=e.target;this.updateDonationInfo({coverFees:t.checked})}customAmountChanged(e){const t=e.target;this.customAmountSelected=!0,this.handleCustomAmountInput(t.value)}handleCustomAmountInput(e){const t=W(e);isNaN(t)?this.dispatchEditDonationError(f.InvalidDonationAmount):this.amountChanged(t)}handleDonationInfoStatus(e){switch(e){case f.ValidDonationAmount:this.error=void 0;break;case f.DonationTooHigh:this.error=h(u`
          To make a donation of $10,000 or more, please contact our philanthropy
          department at
          <a href="mailto:donations@archive.org">donations@archive.org</a>
        `),this.dispatchEditDonationError(e);break;case f.DonationTooLow:this.customAmountInput.value.length>0&&(this.error=u`${h("Please select an amount (minimum $1)")}`),this.dispatchEditDonationError(e);break;case f.InvalidDonationAmount:this.error=u`${h("Please enter a valid donation amount")}`,this.dispatchEditDonationError(e);break}}amountChanged(e){const t=this.getDonationInfoStatus(e);this.handleDonationInfoStatus(t),t===f.ValidDonationAmount&&this.updateDonationInfo({amount:e})}getDonationInfoStatus(e){return isNaN(e)?f.InvalidDonationAmount:e>=1e4?f.DonationTooHigh:e<1?f.DonationTooLow:f.ValidDonationAmount}radioSelected(e){const t=e.target,n=t.name,{value:o}=t;switch(n){case g.Amount:this.presetAmountChanged(parseFloat(o));break;case g.DonationType:this.updateDonationInfo({donationType:o});break}}monthlyCheckboxChecked(e){const n=e.target.checked?v.Monthly:v.OneTime;this.updateDonationInfo({donationType:n})}dispatchEditDonationError(e){const t=new CustomEvent("editDonationError",{detail:{error:e}});this.dispatchEvent(t)}presetAmountChanged(e){this.error=void 0,this.customAmountSelected=!1,this.customAmountInput&&(this.customAmountInput.value=""),this.updateDonationInfo({amount:e})}updateDonationInfo(e){const t=new S({donationType:e.donationType??this.donationInfo.donationType,amount:e.amount??this.donationInfo.amount,coverFees:e.coverFees??this.donationInfo.coverFees});this.donationInfo=t;const n=new CustomEvent("donationInfoChanged",{detail:{donationInfo:t}});this.dispatchEvent(n)}static get styles(){return[K,z`
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
      `]}};c([b({type:Object})],d.prototype,"donationInfo",2);c([b({type:String})],d.prototype,"stepNumberMode",2);c([b({type:Number})],d.prototype,"defaultSelectedAmount",2);c([b({type:Array})],d.prototype,"amountOptions",2);c([b({type:String})],d.prototype,"amountSelectionLayout",2);c([b({type:String,reflect:!0})],d.prototype,"frequencySelectionMode",2);c([b({type:String,reflect:!0})],d.prototype,"customAmountMode",2);c([b({type:String,reflect:!0})],d.prototype,"coverFeesCheckboxMode",2);c([b({type:String,reflect:!0})],d.prototype,"amountTitleDisplayMode",2);c([B()],d.prototype,"error",2);c([B()],d.prototype,"customAmountSelected",2);c([$("#custom-amount-button")],d.prototype,"customAmountButton",2);c([$("#custom-amount-input")],d.prototype,"customAmountInput",2);d=c([V("ia-donation-edit-donation"),P()],d);export{j as C,v as D,N as E,S as a,Z as b,l as c,Y as d,I as e,k as f,Q as g,it as l,W as p};
