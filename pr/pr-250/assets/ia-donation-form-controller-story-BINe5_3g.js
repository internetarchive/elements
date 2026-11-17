import{n as l,e as c,c as F,i as I,m as s,b as d,A as de,a as x,s as se,r as $}from"./index-Bym4URPL.js";import"./modal-manager-B2UJk2gg.js";import{C as xe,p as Pe,D as y,c as Me,a as B,f as ge,b as ze,l as Ae,d as fe,E as le,e as te,g as Ce}from"./ia-donation-edit-donation-Bb-7U6sa.js";import{t as O}from"./theme-styles-XLvUuKWS.js";import{c as K,L as ke}from"./lazy-loader-service-Cu9CHtnE.js";import{P as u}from"./promised-singleton-CI1P-FYc.js";import{M as W}from"./modal-config-Ckbblf-F.js";import{l as ce}from"./localized-decorator-CViVh4Ql.js";import{o as re}from"./story-template-CQDf0x__.js";import{i as be,a as U}from"./ia-status-indicator-CXXhFIZ5.js";import{c as Oe}from"./repeat-ACyKxJ4r.js";import{_ as _e,a as He,b as Be,c as Ve,d as Re,e as Ne,f as Ue}from"./venmo-BpXY3yB1.js";import{D as Le}from"./ia-donation-section-Bq5HaJ_w.js";import"./syntax-highlighter-B_Z4TCIF.js";import"./mediatype-web-BK2ypcoP.js";import"./directive-helpers-C4MDbWEl.js";const q={Development:"dev",Production:"prod"};class oe{constructor(e){this.email=e?.email,this.firstName=e?.firstName,this.lastName=e?.lastName}}class ae{constructor(e){this.streetAddress=e?.streetAddress,this.extendedAddress=e?.extendedAddress,this.locality=e?.locality,this.region=e?.region,this.postalCode=e?.postalCode,this.countryCodeAlpha2=e?.countryCodeAlpha2}}class qe{constructor(e){this.customer=e.customer,this.billing=e.billing}}class je{constructor(e){this.id=e.id}}class Ye{constructor(e){this.paymentProvider=e.paymentProvider,this.paymentMethodNonce=e.paymentMethodNonce,this.amount=e.amount,this.donationType=e.donationType,this.transaction_id=e.transaction_id,this.customer_id=e.customer_id,this.customer=new oe(e.customer),this.billing=new ae(e.billing),e.subscription&&(this.subscription=new je(e.subscription))}}class Ke{constructor(e){this.code=e.code,this.message=e.message}}class Ge{constructor(e){this.message=e.message;const{errors:t=[]}=e;this.errors=t.map(a=>new Ke(a))}}class Se{constructor(e){this.success=e.success,this.success?this.value=new Ye(e.value):this.value=new Ge(e.value)}}var Ze=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,ne=(o,e,t,a)=>{for(var n=a>1?void 0:a?Je(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Ze(e,t,n),n};const A={YesButton:"YesButton",PayPalUpsellSlot:"PayPalUpsellSlot"};let j=class extends I{constructor(){super(...arguments),this.yesButtonMode=A.YesButton,this.amount=5,this.currencyValidator=new xe}render(){return d`
      <h3>${s("Thank you for donating!")}</h3>
      <button @click=${this.noThanksSelected} class="cta-button" id="no-button">
        ${s("Continue")}
      </button>
      <p class="or_separator"><span>${s("or")}</span></p>
      <h3>${s("Join our Monthly Giving Circle")}</h3>
      <p class="appeal">
        ${s("Monthly support helps us reliably plan for the future.")}
      </p>
      <div class="monthly-amount">
        <h1>${s("Enter your monthly amount")}</h1>
        <div class="amount-input">
          <span class="dollar-symbol">$</span>
          <input
            id="amount-input"
            type="text"
            tabindex="0"
            aria-label=${s("Monthly amount in dollars")}
            value=${this.amount}
            @input=${this.amountChanged}
            @keydown=${this.currencyValidator.keydown}
          />
        </div>
        <div class="error ${this.error?"":"hidden"}">${this.error}</div>
      </div>

      ${this.yesButton}
    `}get yesButton(){switch(this.yesButtonMode){case A.YesButton:return d`
          <button
            class="cta-button"
            tabindex="0"
            id="yes-button"
            @click=${this.yesSelected}
            .disabled=${this.error!==void 0}
          >
            ${s("YES, I'll donate monthly")}
          </button>
        `;case A.PayPalUpsellSlot:return d`
          <div class="paypal-upsell-slot-container">
            <div
              class="paypal-upsell-slot-blocker ${this.error?"":"hidden"}"
            ></div>
            <button class="cta-button" id="paypal-cover-button">
              ${s("YES, I'll donate monthly")}
            </button>
            <slot class="paypal-upsell-slot"></slot>
          </div>
        `;default:return de}}amountChanged(o){const t=o.target.value;t.length!==0&&this.handleCustomAmountInput(t)}handleCustomAmountInput(o){const e=Pe(o);isNaN(e)?this.error=d`${s("Please enter a valid amount.")}`:this.processAmount(e)}processAmount(o){if(o>=1e4){this.error=s(d`
        To make a donation of $10,000 or more, please contact our philanthropy
        department at
        <a href="mailto:donations@archive.org">donations@archive.org</a>
      `);return}if(o<1){this.amountInput&&this.amountInput.value.length>0&&(this.error=d`${s("The minimum donation amount is $1.")}`);return}this.error=void 0,this.amount=o;const e=new CustomEvent("amountChanged",{detail:{amount:this.amount}});this.dispatchEvent(e)}yesSelected(){const o=new CustomEvent("yesSelected",{detail:{amount:this.amount}});this.dispatchEvent(o)}noThanksSelected(){this.dispatchEvent(new Event("noThanksSelected"))}static get styles(){return[O,x`
        :host {
          --donation-upsell-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-upsell-cta-color--: var(
            --ia-donation-upsell-cta-button-color,
            var(--navy-blue)
          );
          --donation-upsell-cta-disabled-color--: var(
            --ia-donation-upsell-cta-button-disabled-color,
            rgba(109, 148, 201, 0.5)
          );
          /* Shifts the amount field left a little so the dollar sign and field read as centred */
          --donation-upsell-amount-input-offset--: var(
            --ia-donation-upsell-amount-input-offset,
            calc(var(--donation-upsell-base-font-size--) * -1)
          );
          --donation-upsell-error-color--: var(--color-danger);
        }

        .monthly-amount {
          background-color: var(--true-white);
          padding: var(--padding-sm) 0.625rem;
          border-radius: 5px;
          text-align: center;
          margin-bottom: var(--padding-sm);
          margin-top: 0;
        }

        .monthly-amount h1 {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          font-weight: bold;
          text-align: center;
          line-height: 1.2em;
          margin: 0;
          padding: var(--padding-sm) 0 0 0;
        }

        .hidden {
          display: none;
        }

        h3 {
          text-align: center;
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          margin: 0 var(--donation-upsell-base-font-size--) var(--padding-sm)
            var(--donation-upsell-base-font-size--);
        }

        .appeal {
          text-align: center;
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.6);
          margin: var(--padding-sm) var(--donation-upsell-base-font-size--);
        }

        .amount-input {
          transform: translate(var(--donation-upsell-amount-input-offset--), 0);
        }

        .amount-input .dollar-symbol {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.8);
          font-weight: bold;
        }

        .amount-input input {
          width: 100px;
          text-align: center;
          border: none;
          border-bottom: 1px solid gray;
          font-weight: bold;
          font-size: calc(var(--donation-upsell-base-font-size--) * 3.4);
        }

        .cta-button {
          font-size: calc(var(--donation-upsell-base-font-size--) * 2);
          display: block;
          width: 100%;
          margin-top: var(--padding-sm);
          padding: var(--donation-upsell-base-font-size--)
            calc(var(--donation-upsell-base-font-size--) * 2);
          background-color: var(--donation-upsell-cta-color--);
          color: var(--true-white);
          border-radius: 5px;
          border: 0;
          font-weight: bold;
          line-height: normal;
          outline: none;
          cursor: pointer;
        }

        .cta-button:disabled {
          background-color: var(--donation-upsell-cta-disabled-color--);
          cursor: not-allowed;
        }

        .paypal-upsell-slot {
          text-align: center;
        }

        .paypal-upsell-slot-blocker {
          position: absolute;
          width: 100%;
          height: calc(var(--donation-upsell-base-font-size--) * 4.5);
          bottom: 0;
          z-index: 250;
          cursor: not-allowed;
          background-color: rgba(255, 255, 255, 0.5);
        }

        .paypal-upsell-slot-blocker.hidden {
          display: none;
        }

        #paypal-cover-button {
          position: absolute;
          width: 100%;
          bottom: 0;
        }

        .paypal-upsell-slot-container {
          position: relative;
        }

        .error {
          font-size: calc(var(--donation-upsell-base-font-size--) * 1.4);
          margin: var(--padding-sm) 0;
          color: var(--donation-upsell-error-color--);
        }

        .or_separator {
          position: relative;
          margin: 0 calc(var(--donation-upsell-base-font-size--) * 2);
          font-size: calc(var(--donation-upsell-base-font-size--) * 2.6);
          font-weight: bold;
          text-transform: uppercase;
          text-align: center;
        }

        .or_separator:before {
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          left: 0;
          height: 2px;
          content: '';
          background: var(--mid-gray);
        }

        .or_separator span {
          display: inline-block;
          position: relative;
          padding: 0 var(--donation-upsell-base-font-size--);
          background: #f5f5f7;
        }
      `]}};ne([l({type:String})],j.prototype,"yesButtonMode",2);ne([l({type:Number})],j.prototype,"amount",2);ne([l({type:Object})],j.prototype,"error",2);ne([c("#amount-input")],j.prototype,"amountInput",2);j=ne([F("ia-donation-upsell-modal-content")],j);class Fe{constructor(e){this.logged_in_user=e?.logged_in_user,this.referrer=e?.referrer,this.fee_amount_covered=e?.fee_amount_covered,this.origin=e?.origin}}class We{constructor(e){this.customFields=new Fe,this.paymentProvider=e.paymentProvider,this.paymentMethodNonce=e.paymentMethodNonce,this.recaptchaToken=e.recaptchaToken,this.customerId=e.customerId,this.deviceData=e.deviceData,this.upsellOnetimeTransactionId=e.upsellOnetimeTransactionId,this.bin=e.bin,this.binName=e.binName,this.amount=e.amount,this.donationType=e.donationType,this.customer=e.customer,this.billing=e.billing,e.customFields&&(this.customFields=e.customFields)}}const w={CreditCard:"Credit Card",PayPal:"PayPal",GooglePay:"Google Pay",Venmo:"Venmo",ApplePay:"Apple Pay"};class Xe{constructor(e){this.session=e.session,this.donationInfo=e.donationInfo,this.applePayInstance=e.applePayInstance,this.braintreeManager=e.braintreeManager}async onvalidatemerchant(e){return new Promise((t,a)=>{this.applePayInstance.performValidation({validationURL:e.validationURL,displayName:"Internet Archive"},(n,i)=>{n?(this.delegate?.paymentFailed(n),this.session.abort(),a(`Merchant validation error: ${n}`)):(this.session.completeMerchantValidation(i),t())})})}async oncancel(){this.delegate?.paymentCancelled()}async onpaymentauthorized(e){let t;try{t=await this.applePayInstance.tokenize({token:e.payment.token})}catch(M){this.delegate?.paymentFailed(M),this.session.completePayment(ApplePaySession.STATUS_FAILURE);return}const a=e.payment,n=a.billingContact,i=a.shippingContact,[r,m]=n?.addressLines??[],b=new ae({streetAddress:r,extendedAddress:m,locality:n?.locality,region:n?.administrativeArea,postalCode:n?.postalCode,countryCodeAlpha2:n?.countryCode}),S=new oe({email:i?.emailAddress,firstName:i?.givenName,lastName:i?.familyName});try{const M=await this.braintreeManager.submitDonation({nonce:t.nonce,paymentProvider:w.ApplePay,donationInfo:this.donationInfo,billingInfo:b,customerInfo:S});M.success?(this.delegate?.paymentComplete(M),this.session.completePayment(ApplePaySession.STATUS_SUCCESS)):(this.delegate?.paymentFailed("Failure submitting data"),this.session.completePayment(ApplePaySession.STATUS_FAILURE))}catch(M){this.delegate?.paymentFailed(M),this.session.completePayment(ApplePaySession.STATUS_FAILURE)}}}class Qe{constructor(e){this.braintreeManager=e.braintreeManager,this.applePayClient=e.applePayClient,this.applePaySessionManager=e.applePaySessionManager,this.instance=e.instancePromisedSingleton??new u({generator:async()=>{if(!this.applePaySessionManager.canMakePayments())return;const t=await this.braintreeManager.instance.get();return this.applePayClient.create({client:t})}})}async isAvailable(){try{return!!await this.instance.get()}catch{return!1}}async createPaymentRequest(e,t){const a=await this.instance.get();if(!a)throw new Error("Apple Pay is not available in this browser");const n=t.donationType===y.OneTime?"Internet Archive":"Internet Archive Monthly",i=a.createPaymentRequest({total:{label:n,amount:`${t.total}`},requiredBillingContactFields:["postalAddress"],requiredShippingContactFields:["name","email"]}),r=this.applePaySessionManager.createNewPaymentSession(i),m=new Xe({donationInfo:t,session:r,applePayInstance:a,braintreeManager:this.braintreeManager});return r.onvalidatemerchant=m.onvalidatemerchant.bind(m),r.onpaymentauthorized=m.onpaymentauthorized.bind(m),r.oncancel=m.oncancel.bind(m),r.begin(),m}}const ee=class ee{canMakePayments(){return"ApplePaySession"in window&&ApplePaySession.supportsVersion(ee.VERSION)&&ApplePaySession.canMakePayments()}createNewPaymentSession(e){return new ApplePaySession(ee.VERSION,e)}};ee.VERSION=3;let me=ee;class et extends Error{constructor(e){super(e),this.name="DonationFormError"}}const tt=new Promise(()=>{});class ot{constructor(e){this.instance=new u({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.createHostedFields(t)}}),this.emitter=K(),this.braintreeManager=e.braintreeManager,this.hostedFieldClient=e.hostedFieldClient,this.hostedFieldConfig=e.hostedFieldConfig,this.maxRetryCount=e.maxRetryCount??2,this.loadTimeout=(e.loadTimeout??6)*1e3}on(e,t){return this.emitter.on(e,t)}async createHostedFields(e,t=0){this.hostedFieldConfig.hostedFieldContainer.resetHostedFields();let a;try{const n=new Promise((r,m)=>{a=window.setTimeout(()=>{m(new et("Timeout loading Hosted Fields"))},this.loadTimeout)}),i=Promise.resolve().then(()=>this.hostedFieldClient.create({client:e,styles:this.hostedFieldConfig.hostedFieldStyle,fields:this.hostedFieldConfig.hostedFieldFieldOptions})).catch(r=>{if(r instanceof Error&&r.message.includes("Hosted Fields timed out"))return tt;throw r});return i.catch(()=>{}),await Promise.race([n,i])}catch(n){if(t>=this.maxRetryCount)throw this.emitter.emit("hostedFieldsFailed",n),n;const i=t+1;return this.emitter.emit("hostedFieldsRetry",i),this.createHostedFields(e,i)}finally{window.clearTimeout(a)}}async tokenizeHostedFields(){return(await this.instance.get())?.tokenize()}async focusField(e){await(await this.instance.get())?.focus(e)}markFieldErrors(e){this.hostedFieldConfig.hostedFieldContainer.markFieldErrors(e)}removeFieldErrors(e){this.hostedFieldConfig.hostedFieldContainer.removeFieldErrors(e)}showErrorMessage(e){this.hostedFieldConfig.hostedFieldContainer.showErrorMessage(e)}hideErrorMessage(){this.hostedFieldConfig.hostedFieldContainer.hideErrorMessage()}}class at{async isBrowserSupported(){return(await this.paymentsClient.isReadyToPay({apiVersion:2,apiVersionMinor:0,allowedPaymentMethods:[{type:"CARD",parameters:{allowedAuthMethods:["PAN_ONLY"],allowedCardNetworks:["AMEX","DISCOVER","INTERAC","JCB","MASTERCARD","VISA"]}}],existingPaymentMethodRequired:!1})).result}constructor(e){this.braintreeManager=e.braintreeManager,this.googlePayMerchantId=e.googlePayMerchantId,this.googlePayBraintreeClient=e.googlePayBraintreeClient,this.paymentsClient=e.googlePaymentsClient,this.instance=new u({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.googlePayBraintreeClient.create({client:t,googlePayVersion:2,googleMerchantId:this.googlePayMerchantId})}})}}class nt{constructor(e){this.donationInfo=e.donationInfo,this.paypalInstance=e.paypalInstance}async payment(){const t=this.donationInfo.donationType===y.OneTime?"checkout":"vault",a={flow:t,intent:"capture",enableShippingAddress:!0};return t==="checkout"?(a.amount=this.donationInfo.total,a.currency="USD"):a.billingAgreementDescription=`Subscribe to donate ${Me(this.donationInfo.total,{symbol:"$"}).format()} monthly`,this.delegate?.payPalPaymentStarted(this,a),this.paypalInstance.createPayment(a)}async onAuthorize(e){const t=await this.paypalInstance.tokenizePayment(e);return this.delegate?.payPalPaymentAuthorized(this,t),t}async onConfirm(e){const t=await this.paypalInstance.tokenizePayment(e);return this.delegate?.payPalPaymentConfirmed(this,t),t}onCancel(e){this.delegate?.payPalPaymentCancelled(this,e)}onError(e){console.error("PayPal error",e),this.delegate?.payPalPaymentError(this,e)}}class it{constructor(e){this.braintreeManager=e.braintreeManager,this.paypalClient=e.paypalClient,this.paypalButtonGenerator=e.paypalButton,this.hostingEnvironment=e.hostingEnvironment,this.instance=new u({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.paypalClient.create({client:t})}})}async renderPayPalButton(e){const t=this.hostingEnvironment===q.Development?"sandbox":"production",a=await this.instance.get();if(!a)return;const n=new nt({donationInfo:e.donationInfo,paypalInstance:a}),i=window.paypal?.FUNDING?.VENMO;return this.paypalButtonGenerator.render({env:t,style:e.style,payment:n.payment.bind(n),onAuthorize:n.onAuthorize.bind(n),onCancel:n.onCancel.bind(n),onError:n.onError.bind(n),funding:i?{disallowed:[i]}:void 0},e.selector),n}}class rt{constructor(e){this.braintreeManager=e.braintreeManager,this.venmoClient=e.venmoClient,this.venmoProfileId=e.venmoProfileId,this.instance=e.instancePromisedSingleton??new u({generator:async()=>{const t=await this.braintreeManager.instance.get();return this.venmoClient.create({client:t,profileId:this.venmoProfileId})}})}async isBrowserSupported(){return this.isMobileFirefox()?!1:(await this.instance.get())?.isBrowserSupported()??!1}async startPayment(){return(await this.instance.get()).tokenize()}isMobileFirefox(){const e=navigator.userAgent.indexOf("FxiOS")!==-1,t=navigator.userAgent.indexOf("Firefox")!==-1,a=navigator.userAgent.indexOf("Mobile")!==-1;return(t||e)&&a}}class st{constructor(e){this.creditCardHandler=new u({generator:async()=>{const t=await this.paymentClients.hostedFields.get(),a=new ot({braintreeManager:this.braintreeManager,hostedFieldClient:t,hostedFieldConfig:this.hostedFieldConfig});return a.on("hostedFieldsRetry",n=>{this.emitter.emit("hostedFieldsRetry",n)}),a.on("hostedFieldsFailed",n=>{this.emitter.emit("hostedFieldsFailed",n)}),a}}),this.applePayHandler=new u({generator:async()=>{const t=await this.paymentClients.applePay.get();return new Qe({braintreeManager:this.braintreeManager,applePayClient:t,applePaySessionManager:new me})}}),this.venmoHandler=new u({generator:async()=>{const t=await this.paymentClients.venmo.get();if(this.venmoProfileId)return new rt({braintreeManager:this.braintreeManager,venmoClient:t,venmoProfileId:this.venmoProfileId})}}),this.paypalHandler=new u({generator:async()=>{const[t,a]=await Promise.all([this.paymentClients.payPal.get(),this.paymentClients.paypalLibrary.get()]);return new it({braintreeManager:this.braintreeManager,paypalClient:t,paypalButton:a.Button,hostingEnvironment:this.hostingEnvironment})}}),this.googlePayHandler=new u({generator:async()=>{const[t,a]=await Promise.all([this.paymentClients.googlePayBraintreeClient.get(),this.paymentClients.googlePaymentsClient.get()]);return new at({braintreeManager:this.braintreeManager,googlePayMerchantId:this.googlePayMerchantId,googlePayBraintreeClient:t,googlePaymentsClient:a})}}),this.hostingEnvironment=q.Development,this.emitter=K(),this.braintreeManager=e.braintreeManager,this.venmoProfileId=e.venmoProfileId,this.googlePayMerchantId=e.googlePayMerchantId,this.paymentClients=e.paymentClients,this.hostingEnvironment=e.hostingEnvironment,this.hostedFieldConfig=e.hostedFieldConfig}on(e,t){return this.emitter.on(e,t)}}class lt{constructor(e){this.emitter=K(),this.instance=new u({generator:async()=>(await this.paymentClients.braintreeClient.get()).create({authorization:this.authorizationToken})}),this.deviceDataCollectionStarted=!1,this.authorizationToken=e.authorizationToken,this.endpointManager=e.endpointManager,this.paymentClients=e.paymentClients,this.referrer=e.referrer,this.loggedInUser=e.loggedInUser,this.origin=e.origin,this.paymentProviders=new st({braintreeManager:this,paymentClients:this.paymentClients,venmoProfileId:e.venmoProfileId,googlePayMerchantId:e.googlePayMerchantId,hostingEnvironment:e.hostingEnvironment,hostedFieldConfig:e.hostedFieldConfig}),this.paymentProviders.on("hostedFieldsRetry",t=>{this.emitter.emit("paymentProvidersHostedFieldsRetry",t)}),this.paymentProviders.on("hostedFieldsFailed",t=>{this.emitter.emit("paymentProvidersHostedFieldsFailed",t)})}on(e,t){return this.emitter.on(e,t)}async startup(){return this.collectDeviceData()}async submitDonation(e){const{amount:t,coverFees:a}=e.donationInfo,n=B.calculateTotal(t,a),i=a?B.calculateFeeAmount(t):0,r=new Fe({fee_amount_covered:i,logged_in_user:this.loggedInUser,referrer:this.referrer,origin:this.origin}),m=new We({deviceData:this.deviceData,paymentProvider:e.paymentProvider,paymentMethodNonce:e.nonce,amount:n,donationType:e.donationInfo.donationType,customer:e.customerInfo,billing:e.billingInfo,customFields:r,upsellOnetimeTransactionId:e.upsellOnetimeTransactionId,customerId:e.customerId,recaptchaToken:e.recaptchaToken,bin:e.bin,binName:e.binName}),b=await this.endpointManager.submitData(m);return new Se(b)}async submitUpsellDonation(e){const t=e.oneTimeDonationResponse,a=new B({amount:e.amount,donationType:y.Upsell,coverFees:!1});return this.submitDonation({nonce:t.paymentMethodNonce,paymentProvider:t.paymentProvider,customerId:t.customer_id,donationInfo:a,customerInfo:t.customer,billingInfo:t.billing,upsellOnetimeTransactionId:t.transaction_id})}donationSuccessful(e){this.endpointManager.donationSuccessful(e)}async collectDeviceData(){if(this.deviceDataCollectionStarted)return;this.deviceDataCollectionStarted=!0;const e=await this.instance.get();if(!e)return;const a=await(await this.paymentClients.dataCollector.get()).create({client:e,kount:!1,paypal:!0});this.deviceData=a.deviceData}setReferrer(e){this.referrer=e}setLoggedInUser(e){this.loggedInUser=e}setOrigin(e){this.origin=e}}class dt{constructor(e,t){this.braintreeClient=new u({generator:async()=>(await this.loadBraintreeScript("client"),window.braintree.client)}),this.dataCollector=new u({generator:async()=>(await this.loadBraintreeScript("data-collector"),window.braintree.dataCollector)}),this.hostedFields=new u({generator:async()=>(await this.loadBraintreeScript("hosted-fields"),window.braintree.hostedFields)}),this.venmo=new u({generator:async()=>(await this.loadBraintreeScript("venmo"),window.braintree.venmo)}),this.payPal=new u({generator:async()=>(await this.loadBraintreeScript("paypal-checkout"),window.braintree.paypalCheckout)}),this.applePay=new u({generator:async()=>(await this.loadBraintreeScript("apple-pay"),window.braintree.applePay)}),this.googlePayBraintreeClient=new u({generator:async()=>(await this.loadBraintreeScript("google-payment"),window.braintree.googlePayment)}),this.googlePaymentsClient=new u({generator:async()=>(await this.lazyLoader.loadScript({src:"https://pay.google.com/gp/p/js/pay.js"}),new google.payments.api.PaymentsClient({environment:this.environment===q.Development?"TEST":"PRODUCTION"}))}),this.recaptchaLibrary=new u({generator:()=>new Promise(a=>{window.iaDonationFormGrecaptchaLoaded=()=>{setTimeout(()=>{delete window.iaDonationFormGrecaptchaLoaded},10),a(window.grecaptcha)},this.lazyLoader.loadScript({src:"https://www.google.com/recaptcha/api.js?onload=iaDonationFormGrecaptchaLoaded&render=explicit"})})}),this.paypalLibrary=new u({generator:async()=>(await this.lazyLoader.loadScript({src:"https://www.paypalobjects.com/api/checkout.js",attributes:{"data-version-4":"","log-level":"warn"}}),window.paypal)}),this.braintreeVersion="3.62.2",this.environment=q.Development,this.lazyLoader=e,this.environment=t}async loadBraintreeScript(e){const t=this.environment===q.Production?"min.js":"js",a=`https://js.braintreegateway.com/web/${this.braintreeVersion}/js/${e}.${t}`;await this.lazyLoader.loadScript({src:a})}}class ct{constructor(e){this.hostedFieldFieldOptions=e.hostedFieldFieldOptions,this.hostedFieldStyle=e.hostedFieldStyle,this.hostedFieldContainer=e.hostedFieldContainer}}var pt=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,G=(o,e,t,a)=>{for(var n=a>1?void 0:a?ht(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&pt(e,t,n),n};let V=class extends I{constructor(){super(...arguments),this.amount=5,this.currencyType="USD",this.donationType=y.OneTime,this.confirmDonation=()=>{},this.cancelDonation=()=>{}}get formattedAmount(){return this.currencyType==="USD"?ge(this.amount):Me(this.amount,{symbol:this.currencySymbol}).format()}get confirmationText(){return s(d`
      <p>
        You are about to make a <b>${this.donationType}</b> donation of
        <b>${this.formattedAmount} ${this.currencyType}</b> to the Internet
        Archive.
      </p>
    `)}get confirmUpsellText(){return s(d`
      <p>
        You are about to begin making <b>monthly</b> donations of
        <b>${this.formattedAmount} ${this.currencyType}</b> to the Internet
        Archive. (Your first recurring contribution will be next month.)
      </p>
    `)}get confirmCTA(){return this.donationType===y.Upsell?s("Start monthly donation"):s("Complete donation")}render(){return d`
      ${this.donationType===y.Upsell?this.confirmUpsellText:this.confirmationText}

      <div class="cta-group">
        <button id="confirm" @click=${()=>this.confirmDonation()}>
          ${this.confirmCTA}
        </button>
        <button id="cancel" @click=${()=>this.cancelDonation()}>
          ${s("Cancel")}
        </button>
      </div>
    `}static get styles(){return[O,x`
        :host {
          --donation-confirm-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-confirm-cta-color--: var(
            --ia-donation-upsell-cta-button-color,
            var(--navy-blue)
          );
          --donation-confirm-cta-disabled-color--: var(
            --ia-donation-upsell-cta-button-disabled-color,
            rgba(109, 148, 201, 0.5)
          );

          display: block;
        }

        button {
          outline: none;
          cursor: pointer;
        }

        button#confirm {
          font-size: calc(var(--donation-confirm-base-font-size--) * 2);
          display: block;
          width: 100%;
          margin-top: var(--padding-sm);
          padding: var(--donation-confirm-base-font-size--)
            calc(var(--donation-confirm-base-font-size--) * 2);
          background-color: var(--donation-confirm-cta-color--);
          color: var(--true-white);
          border-radius: 5px;
          border: 0;
          font-weight: bold;
          line-height: normal;
        }

        button#cancel {
          margin-top: var(--donation-confirm-base-font-size--);
          border: 0;
          text-decoration: underline;
          background-color: transparent;
        }

        button:disabled {
          background-color: var(--donation-confirm-cta-disabled-color--);
          cursor: not-allowed;
        }
      `]}get currencySymbol(){switch(this.currencyType){case"AUD":return"AU$";case"BRL":return"R$";case"CAD":return"CA$";case"CHF":return"Fr";case"CNY":return"¥";case"CZK":return"Kč";case"DKK":return"Kr";case"EUR":return"€";case"GBP":return"£";case"HKD":return"HK$";case"HUF":return"Ft";case"ILS":return"₪";case"JPY":return"¥";case"MXN":return"MX$";case"MYR":return"RM";case"NOK":return"kr";case"PLN":return"zł";case"RUB":return"₽";case"SEK":return"kr";case"SGD":return"S$";case"THB":return"฿";case"TWD":return"NT$";default:return"$"}}};G([l({type:Number})],V.prototype,"amount",2);G([l({type:String})],V.prototype,"currencyType",2);G([l({type:String})],V.prototype,"donationType",2);G([l({attribute:!1})],V.prototype,"confirmDonation",2);G([l({attribute:!1})],V.prototype,"cancelDonation",2);V=G([F("ia-donation-confirm-modal"),ce()],V);var mt=Object.getOwnPropertyDescriptor,ut=(o,e,t,a)=>{for(var n=a>1?void 0:a?mt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=r(n)||n);return n};let ve=class extends I{render(){return d`
      <div class="container">
        <a
          href="https://help.archive.org/help/why-is-there-a-problem-processing-my-donation/"
          rel="noopener"
          target="_blank"
        >
          ${s("Questions?")}
        </a>
      </div>
    `}static get styles(){return[O,x`
        :host {
          --donation-error-modal-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-error-modal-link-top-margin--: var(
            --ia-donation-error-modal-link-top-margin,
            var(--donation-error-modal-base-font-size--)
          );
          --donation-error-modal-link-color--: var(
            --ia-donation-error-modal-link-color,
            var(--mid-gray)
          );
          --donation-error-modal-link-font-size--: var(
            --ia-donation-error-modal-link-font-size,
            calc(var(--donation-error-modal-base-font-size--) * 1.4)
          );
        }

        .container {
          margin-top: var(--donation-error-modal-link-top-margin--);
          text-align: center;
        }

        a,
        a:link,
        a:visited {
          color: var(--donation-error-modal-link-color--);
          font-size: var(--donation-error-modal-link-font-size--);
        }
      `]}};ve=ut([F("ia-donation-error-modal-content")],ve);const X={Blue:"#497fbf",Green:"#55A183",Red:"#691916"};class pe{constructor(e){this.modalManager=e.modalManager,this.braintreeManager=e.braintreeManager,this.analytics=e.analytics}closeModal(){this.modalManager.closeModal()}showProcessingModal(){const e=new W({headerColor:X.Blue,showProcessingIndicator:!0,closeOnBackdropClick:!1,showCloseButton:!1,processingImageMode:"processing",title:d`${s("Processing...")}`});this.modalManager.showModal({config:e})}showThankYouModal(e){const t=new W({showProcessingIndicator:!0,processingImageMode:"complete",headerColor:X.Green,title:d`${s("Thank You!")}`});this.modalManager.showModal({config:t});let n=`Donated-${e.successResponse.paymentProvider.replace(/\s+/g,"")}`;e.upsellSuccessResponse&&(n+="-upsell");const i=e.successResponse.donationType;this.analytics.logDonationFlowEvent(n,i),this.braintreeManager.donationSuccessful(e)}showErrorModal(e){const t=new W({headerColor:X.Red,title:d`${s("Processing error")}`,headline:d`${s("There's been a problem completing your donation.")}`,message:d`${e.message}`});this.modalManager.showModal({config:t,userClosedModalCallback:e.userClosedModalCallback,customModalContent:d`
        <ia-donation-error-modal-content></ia-donation-error-modal-content>
      `})}showConfirmationStepModal(e){const t=e.donationType===y.Upsell?s("Confirm monthly donation"):s("Complete donation"),a=new W({closeOnBackdropClick:!1,headerColor:X.Green,title:d`${t}`,message:d`
        <ia-donation-confirm-modal
          .amount=${e.amount}
          .currencyType=${e.currencyType}
          .donationType=${e.donationType}
          .confirmDonation=${e.confirmDonationCB}
          .cancelDonation=${e.cancelDonationCB}
        ></ia-donation-confirm-modal>
      `});return this.modalManager.showModal({config:a,userClosedModalCallback:e.cancelDonationCB})}showUpsellModal(e){const t=new W({headerColor:X.Green,title:d`${s("Donation received")}`,processingImageMode:"complete",showProcessingIndicator:!0}),a=pe.getDefaultUpsellAmount(e.oneTimeAmount);e.amountChanged?.(a);const n=d`
      <ia-donation-upsell-modal-content
        .amount=${a}
        .yesButtonMode=${e.ctaMode??A.YesButton}
        @yesSelected=${i=>e.yesSelected?.(i.detail.amount)}
        @noThanksSelected=${e.noSelected}
        @amountChanged=${i=>e.amountChanged?.(i.detail.amount)}
      >
        <slot name="paypal-upsell-button"></slot>
      </ia-donation-upsell-modal-content>
    `;return this.modalManager.showModal({config:t,customModalContent:n,userClosedModalCallback:e.userClosedModalCallback})}async startDonationSubmissionFlow(e){this.showProcessingModal();try{const t=await this.braintreeManager.submitDonation(e);if(t.success)this.handleSuccessfulDonationResponse(e.donationInfo,t.value);else{const a=t.value;this.showErrorModal({message:a.message})}return t}catch(t){this.showErrorModal({message:`${t}`}),console.error("error getting a response",t);return}}async upsellModalYesSelected(e,t){this.showProcessingModal();try{const a=await this.braintreeManager.submitUpsellDonation({oneTimeDonationResponse:e,amount:t});if(a.success)this.showThankYouModal({successResponse:e,upsellSuccessResponse:a.value});else{const n=a.value;this.showErrorModal({message:n.message})}return a}catch(a){this.showErrorModal({message:`${a}`}),console.error("error getting a response",a);return}}static getDefaultUpsellAmount(e){return e<=10?8:e<=25?10:e<=100?25:50}handleSuccessfulDonationResponse(e,t){switch(e.donationType){case y.OneTime:this.showUpsellModal({oneTimeAmount:t.amount,yesSelected:a=>{this.upsellModalYesSelected(t,a)},noSelected:()=>{this.showThankYouModal({successResponse:t})},userClosedModalCallback:()=>{this.showThankYouModal({successResponse:t})}});break;case y.Monthly:this.showThankYouModal({successResponse:t});break}}}class yt{constructor(e){this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager}async paymentInitiated(e,t){this.donationFlowModalManager.showProcessingModal();const a=await this.braintreeManager.paymentProviders.applePayHandler.get();this.applePayDataSource=await a.createPaymentRequest(t,e),this.applePayDataSource&&(this.applePayDataSource.delegate=this)}async modalYesSelected(e,t){this.donationFlowModalManager.showProcessingModal();try{const a=await this.braintreeManager.submitUpsellDonation({oneTimeDonationResponse:e,amount:t});if(a.success)this.donationFlowModalManager.showThankYouModal({successResponse:e,upsellSuccessResponse:a.value});else{const n=a.value;this.donationFlowModalManager.showErrorModal({message:n.message})}}catch(a){this.donationFlowModalManager.showErrorModal({message:`${a}`}),console.error("error getting a response",a)}}paymentComplete(e){if(e.success){const t=e.value;this.applePayDataSource?.donationInfo.donationType===y.OneTime?this.donationFlowModalManager.showUpsellModal({oneTimeAmount:t.amount,yesSelected:this.modalYesSelected.bind(this,t),noSelected:()=>this.donationFlowModalManager.showThankYouModal({successResponse:t}),userClosedModalCallback:()=>this.donationFlowModalManager.showThankYouModal({successResponse:t})}):this.donationFlowModalManager.showThankYouModal({successResponse:t})}else{const t=e.value;this.donationFlowModalManager.showErrorModal({message:t.message})}}paymentFailed(){this.donationFlowModalManager.showErrorModal({message:s("Payment failed")})}paymentCancelled(){this.donationFlowModalManager.closeModal()}}const z={Number:"number",CVV:"cvv",ExpirationDate:"expirationDate"};class gt{fieldFor(e){switch(e){case z.Number:return this.number;case z.CVV:return this.cvv;case z.ExpirationDate:return this.expirationDate}}markFieldErrors(e){e.forEach(t=>{const a=this.fieldFor(t);a.parentElement.error=!0})}removeFieldErrors(e){e.forEach(t=>{const a=this.fieldFor(t);a.parentElement.error=!1})}showErrorMessage(e){const t=e??"Some payment information below is missing or incorrect.";this.errorContainer.textContent=t,this.errorContainer.style.display="block"}hideErrorMessage(){this.errorContainer.style.display="none"}resetHostedFields(){[this.number,this.cvv,this.expirationDate].forEach(t=>{for(;t.firstChild;)t.firstChild.remove()})}constructor(e){this.number=e.number,this.cvv=e.cvv,this.expirationDate=e.expirationDate,this.errorContainer=e.errorContainer}}class ft{constructor(e){this.started=!1,this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager,this.recaptchaManager=e.recaptchaManager,this.emitter=K()}on(e,t){return this.emitter.on(e,t)}async startup(){if(this.started)return;this.started=!0;const e=await this.braintreeManager.paymentProviders.creditCardHandler.get(),t=await e.instance.get();t?.on("focus",a=>{const{emittedBy:n,fields:i}=a,{container:r}=i[n];r.parentElement.error=!1,e.hideErrorMessage()}),t?.on("blur",a=>{const{emittedBy:n,fields:i}=a,{container:r,isEmpty:m,isValid:b}=i[n];!m&&!b&&(r.parentElement.error=!0)}),t?.on("validityChange",a=>{const{fields:n}=a,i=n.cvv.isValid&&n.expirationDate.isValid&&n.number.isValid;this.emitter.emit("validityChanged",i)})}async tokenizeFields(){const e=await this.braintreeManager.paymentProviders.creditCardHandler.get();try{return await e.tokenizeHostedFields()}catch(t){this.handleHostedFieldTokenizationError(t);return}}async paymentInitiated(e,t,a){let n;try{n=await this.recaptchaManager.execute()}catch{this.donationFlowModalManager.showErrorModal({message:s("Recaptcha failure")});return}this.donationFlowModalManager.startDonationSubmissionFlow({nonce:e.nonce,paymentProvider:w.CreditCard,recaptchaToken:n,bin:e.details.bin,donationInfo:t,customerInfo:a.customer,billingInfo:a.billing})}async handleHostedFieldTokenizationError(e){const t=await this.braintreeManager.paymentProviders.creditCardHandler.get();switch(t.showErrorMessage(),e.code){case"HOSTED_FIELDS_FIELDS_EMPTY":t.markFieldErrors([z.Number,z.CVV,z.ExpirationDate]);break;case"HOSTED_FIELDS_FIELDS_INVALID":Object.keys(e.details.invalidFields).forEach(a=>{t.markFieldErrors([a])});break;case"HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED":t.markFieldErrors([z.CVV]);break}}}class bt{constructor(e){this.emitter=K(),this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager}on(e,t){return this.emitter.on(e,t)}async paymentInitiated(e){const t=await this.braintreeManager.paymentProviders.googlePayHandler.get(),a=await t.instance.get(),n=a.createPaymentDataRequest({emailRequired:!0,transactionInfo:{currencyCode:"USD",totalPriceStatus:"FINAL",totalPrice:`${e.total}`}}),i=n.allowedPaymentMethods[0];i.parameters.billingAddressRequired=!0,i.parameters.billingAddressParameters={format:"FULL",phoneNumberRequired:!1};try{const r=await t.paymentsClient.loadPaymentData(n),m=await a.parseResponse(r),b=r.paymentMethodData.info?.billingAddress,S=b?.name?.trim();let M=S,v="";const H=S?.lastIndexOf(" ")??-1;S&&H>0&&(M=S.substring(0,H),v=S.substring(H+1));const De=new oe({email:r.email,firstName:M,lastName:v}),Te=new ae({streetAddress:b?.address1,extendedAddress:b?.address2,locality:b?.locality,region:b?.administrativeArea,postalCode:b?.postalCode,countryCodeAlpha2:b?.countryCode});this.donationFlowModalManager.startDonationSubmissionFlow({nonce:m.nonce,paymentProvider:w.GooglePay,bin:m.details.bin,binName:m.binData.issuingBank,donationInfo:e,customerInfo:De,billingInfo:Te})}catch{this.emitter.emit("paymentCancelled"),this.donationFlowModalManager.closeModal()}}}class vt{constructor(e){this.upsellButtonDataSource=e.upsellButtonDataSource,this.oneTimePayload=e.oneTimePayload,this.oneTimeSuccessResponse=e.oneTimeSuccessResponse}}class wt{constructor(e){this.emitter=K(),this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager}updateDonationInfo(e){this.buttonDataSource&&(this.buttonDataSource.donationInfo=e)}updateUpsellDonationInfo(e){this.upsellButtonDataSourceContainer&&(this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo=e)}on(e,t){return this.emitter.on(e,t)}async payPalPaymentStarted(e,t){this.emitter.emit("payPalPaymentStarted",e,t)}async payPalPaymentAuthorized(e,t){const{donationType:a,total:n}=e.donationInfo;this.donationFlowModalManager.showConfirmationStepModal({donationType:a,amount:n,currencyType:"USD",confirmDonationCB:()=>{this.payPalPaymentConfirmed(e,t)},cancelDonationCB:()=>{this.donationFlowModalManager.closeModal(),this.payPalPaymentCancelled(e,{})}})}async payPalPaymentConfirmed(e,t){this.emitter.emit("payPalPaymentConfirmed",e,{}),this.donationFlowModalManager.showProcessingModal();const a=e.donationInfo.donationType,n=t.details,i=new oe({email:n?.email,firstName:n?.firstName,lastName:n?.lastName}),r=n?.shippingAddress,m=new ae({streetAddress:r?.line1,extendedAddress:r?.line2,locality:r?.city,region:r?.state,postalCode:r?.postalCode,countryCodeAlpha2:r?.countryCode}),b=this.upsellButtonDataSourceContainer?.oneTimeSuccessResponse.transaction_id;let S;try{S=await this.braintreeManager.submitDonation({nonce:t.nonce,paymentProvider:w.PayPal,donationInfo:e.donationInfo,customerInfo:i,billingInfo:m,upsellOnetimeTransactionId:b})}catch(v){this.donationFlowModalManager.showErrorModal({message:`${v}`}),console.error("error getting a response",v);return}if(!S.success){const v=S.value;this.donationFlowModalManager.showErrorModal({message:v.message});return}const M=S.value;switch(a){case y.OneTime:this.showUpsellModal(t,M);break;case y.Monthly:this.donationFlowModalManager.showThankYouModal({successResponse:M});break;case y.Upsell:this.upsellButtonDataSourceContainer?this.donationFlowModalManager.showThankYouModal({successResponse:this.upsellButtonDataSourceContainer.oneTimeSuccessResponse,upsellSuccessResponse:M}):this.donationFlowModalManager.showErrorModal({message:s("Error setting up monthly donation")});break}}async payPalPaymentCancelled(e,t){this.emitter.emit("payPalPaymentCancelled",e,t)}async payPalPaymentError(e,t){this.emitter.emit("payPalPaymentError",e,t),console.error("PayPalFlowHandler payment error:",e,e.donationInfo,t)}async renderPayPalButton(e){const t=await this.braintreeManager.paymentProviders.paypalHandler.get();this.buttonDataSource=await t.renderPayPalButton({selector:"#paypal-button",style:{color:"blue",label:"paypal",shape:"rect",size:"medium",tagline:!1},donationInfo:e}),this.buttonDataSource&&(this.buttonDataSource.delegate=this)}async showUpsellModal(e,t){this.donationFlowModalManager.showUpsellModal({oneTimeAmount:t.amount,amountChanged:this.upsellAmountChanged.bind(this),noSelected:()=>{this.donationFlowModalManager.showThankYouModal({successResponse:t})},ctaMode:A.PayPalUpsellSlot,userClosedModalCallback:()=>{this.donationFlowModalManager.showThankYouModal({successResponse:t})}});const a=pe.getDefaultUpsellAmount(t.amount),n=new B({amount:a,donationType:y.Upsell,coverFees:!1});this.upsellButtonDataSourceContainer||this.renderUpsellPayPalButton({donationInfo:n,oneTimePayload:e,oneTimeSuccessResponse:t})}upsellAmountChanged(e){this.upsellButtonDataSourceContainer&&(this.upsellButtonDataSourceContainer.upsellButtonDataSource.donationInfo.amount=e)}async renderUpsellPayPalButton(e){const a=await(await this.braintreeManager.paymentProviders.paypalHandler.get()).renderPayPalButton({selector:"#paypal-upsell-button",style:{color:"blue",label:"paypal",shape:"rect",size:"responsive",tagline:!1},donationInfo:e.donationInfo});a?(a.delegate=this,this.upsellButtonDataSourceContainer=new vt({upsellButtonDataSource:a,oneTimePayload:e.oneTimePayload,oneTimeSuccessResponse:e.oneTimeSuccessResponse})):console.error("error rendering paypal upsell button")}}class we{constructor(e){this.contactInfo=e.contactInfo,this.donationInfo=e.donationInfo}}class Pt{constructor(e){this.persistenceKey="venmoRestorationStateInfo",this.storageSystem=e?.storageSystem??this.getAvailableStorageSystem(()=>localStorage)??this.getAvailableStorageSystem(()=>sessionStorage)}clearState(){this.storageSystem?.removeItem(this.persistenceKey)}persistState(e,t){const a=new we({contactInfo:e,donationInfo:t}),n=JSON.stringify(a);this.storageSystem?.setItem(this.persistenceKey,n)}async getRestorationState(){const e=this.storageSystem?.getItem(this.persistenceKey);if(!e){console.error("restoreState: No stored data");return}const t=JSON.parse(e);if(!t){console.error("restoreState: Data could not be deserialized");return}return new we(t)}getAvailableStorageSystem(e){try{const t=e();return t.setItem("foo","bar"),t.removeItem("foo"),t}catch{return}}}class Mt{constructor(e){this.braintreeManager=e.braintreeManager,this.donationFlowModalManager=e.donationFlowModalManager,this.restorationStateHandler=e.restorationStateHandler??new Pt}async startup(){if((await(await this.braintreeManager.paymentProviders.venmoHandler.get())?.instance.get())?.hasTokenizationResult()){const a=await this.restorationStateHandler.getRestorationState();a?this.paymentInitiated(a.contactInfo,a.donationInfo):(console.error("no restoration info"),this.donationFlowModalManager.showErrorModal({message:s("Error restoring donation session")}))}}async paymentInitiated(e,t){this.restorationStateHandler.persistState(e,t);try{const n=await(await this.braintreeManager.paymentProviders.venmoHandler.get())?.startPayment();if(!n){this.restorationStateHandler.clearState(),this.donationFlowModalManager.showErrorModal({message:s("Error setting up the donation")});return}this.handleTokenizationResult(n,e,t)}catch(a){this.restorationStateHandler.clearState(),this.handleTokenizationError(a),this.donationFlowModalManager.showErrorModal({message:s("There was a problem loading your donation information. Please try again.")})}}async handleTokenizationResult(e,t,a){this.restorationStateHandler.clearState(),this.donationFlowModalManager.startDonationSubmissionFlow({nonce:e.nonce,paymentProvider:w.Venmo,donationInfo:a,customerInfo:t.customer,billingInfo:t.billing})}handleTokenizationError(e){switch(e.code){case"VENMO_APP_CANCELED":case"VENMO_CANCELED":break;default:console.error("Venmo tokenization error",e)}}}class Ct{async startup(){this.venmoHandler?.startup(),this.creditCardHandler?.startup()}async showUpsellModal(e){return this.donationFlowModalManager.showUpsellModal(e)}showConfirmationStepModal(e){return this.donationFlowModalManager.showConfirmationStepModal(e)}get creditCardHandler(){return this.creditCardHandlerCache??=new ft({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager,recaptchaManager:this.recaptchaManager}),this.creditCardHandlerCache}get paypalHandler(){return this.paypalHandlerCache??=new wt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.paypalHandlerCache}get applePayHandler(){return this.applePayHandlerCache??=new yt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.applePayHandlerCache}get venmoHandler(){return this.venmoHandlerCache??=new Mt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.venmoHandlerCache}get googlePayHandler(){return this.googlePayHandlerCache??=new bt({braintreeManager:this.braintreeManager,donationFlowModalManager:this.donationFlowModalManager}),this.googlePayHandlerCache}constructor(e){this.braintreeManager=e.braintreeManager,this.recaptchaManager=e.recaptchaManager,this.donationFlowModalManager=new pe({braintreeManager:this.braintreeManager,modalManager:e.modalManager,analytics:e.analytics})}}class St{constructor(e){this.isExecuting=!1,this.grecaptchaLibrary=e.grecaptchaLibrary,this.siteKey=e.siteKey}execute(){return this.isExecuting&&this.finishExecution(),this.isExecuting=!0,new Promise((e,t)=>{this.executionSuccessBlock=a=>{this.finishExecution(),e(a)},this.executionExpiredBlock=()=>{this.finishExecution(),t("expired")},this.executionErrorBlock=()=>{this.finishExecution(),t("error")},this.grecaptchaLibrary.execute()})}finishExecution(){this.isExecuting=!1,this.grecaptchaLibrary.reset()}setup(e,t,a,n){this.grecaptchaLibrary.render(e,{callback:this.responseHandler.bind(this),"expired-callback":this.expiredHandler.bind(this),"error-callback":this.errorHandler.bind(this),sitekey:this.siteKey,tabindex:t,theme:a,type:n,size:"invisible"})}responseHandler(e){this.executionSuccessBlock&&(this.executionSuccessBlock(e),this.executionSuccessBlock=void 0)}expiredHandler(){this.executionExpiredBlock&&(this.executionExpiredBlock(),this.executionExpiredBlock=void 0)}errorHandler(){this.executionErrorBlock&&(this.executionErrorBlock(),this.executionErrorBlock=void 0)}}var Ft=Object.defineProperty,It=Object.getOwnPropertyDescriptor,Z=(o,e,t,a)=>{for(var n=a>1?void 0:a?It(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Ft(e,t,n),n};const D={LeaveSpace:"leave-space",CompressSpace:"compress-space"};let R=class extends I{constructor(){super(...arguments),this.error=!1,this.required=!1,this.iconSpaceOption=D.LeaveSpace,this.requiredIndicatorSpaceOption=D.LeaveSpace}render(){return d`
      <div
        class="input-wrapper ${this.errorClass} ${this.iconSpaceOptionClass}"
      >
        <div class="icon-container">${this.icon}</div>
        <div class="required-indicator ${this.requiredIndicatorSpaceOption}">
          ${this.required?d`*`:de}
        </div>

        <slot></slot>
      </div>
    `}get errorClass(){return this.error?"error":""}get iconSpaceOptionClass(){return this.iconSpaceOption===D.CompressSpace?"compress-space":""}static get styles(){return[O,be,x`
        :host {
          --donation-badged-input-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-badged-input-border--: var(
            --ia-donation-form-input-border,
            1px solid #d9d9d9
          );
          --donation-badged-input-error-color--: var(
            --ia-donation-badged-input-error-color,
            var(--color-danger)
          );
          --donation-badged-input-icon-size--: var(
            --ia-donation-badged-input-icon-size,
            calc(var(--donation-badged-input-base-font-size--) * 2)
          );
          --donation-badged-input-icon-color--: var(
            --ia-donation-badged-input-icon-color,
            #2c2c2c
          );
          --donation-badged-input-icon-spacer-width--: var(
            --ia-donation-badged-input-icon-spacer-width,
            calc(var(--donation-badged-input-base-font-size--) * 3)
          );
          --donation-badged-input-no-icon-spacer-width--: var(
            --ia-donation-badged-input-no-icon-spacer-width,
            var(--donation-badged-input-base-font-size--)
          );
          --donation-badged-input-height--: var(
            --ia-donation-badged-input-height,
            calc(var(--donation-badged-input-base-font-size--) * 3)
          );
          --donation-badged-input-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--color-danger)
          );
          --donation-badged-input-required-margin--: var(
            --ia-donation-badged-input-required-margin,
            0 0.25rem 0 0
          );
          --donation-badged-input-required-font-size--: var(
            --ia-donation-badged-input-required-font-size,
            calc(var(--donation-badged-input-base-font-size--) * 2)
          );
        }

        .input-wrapper {
          border: var(--donation-badged-input-border--);
          height: var(--donation-badged-input-height--);
          display: flex;
          align-items: center;
        }

        .input-wrapper.error {
          box-shadow: inset 0px 0px 0px 1px
            var(--donation-badged-input-error-color--);
          border-color: var(--donation-badged-input-error-color--);
        }

        .input-wrapper.compress-space .icon-container {
          width: var(--donation-badged-input-no-icon-spacer-width--);
        }

        .icon-container {
          width: var(--donation-badged-input-icon-spacer-width--);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* The glyph takes its colour from here */
        .icon-container .ia-icon {
          width: var(--donation-badged-input-icon-size--);
          height: var(--donation-badged-input-icon-size--);
          color: var(--donation-badged-input-icon-color--);
        }

        .required-indicator {
          color: var(--donation-badged-input-required-color--);
          font-size: var(--donation-badged-input-required-font-size--);
          margin: var(--donation-badged-input-required-margin--);
        }

        .required-indicator.leave-space {
          width: 0.5em;
        }
      `]}};Z([l({type:Boolean})],R.prototype,"error",2);Z([l({type:Object})],R.prototype,"icon",2);Z([l({type:Boolean})],R.prototype,"required",2);Z([l({type:String})],R.prototype,"iconSpaceOption",2);Z([l({type:String})],R.prototype,"requiredIndicatorSpaceOption",2);R=Z([F("ia-donation-badged-input")],R);var $t=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,f=(o,e,t,a)=>{for(var n=a>1?void 0:a?Et(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&$t(e,t,n),n};let g=class extends I{constructor(){super(...arguments),this.selectedCountry="US",this.donorEmail="",this.minTwoCharPattern=".*\\S{2,}.*",this.streetAddressPattern=".*?\\S.{2,}\\S.*?",this.usZipCodePattern="^\\d{5}(-?\\d{4})?$"}updated(o){o.has("donorEmail")&&(this.emailField.value=this.donorEmail??"")}reportValidity(){return this.validateFormFields(),this.validateForm()}validateFormFields(){[{badgedInput:this.emailBadgedInput,inputField:this.emailField},{badgedInput:this.firstNameBadgedInput,inputField:this.firstNameField},{badgedInput:this.lastNameBadgedInput,inputField:this.lastNameField},{badgedInput:this.streetAddressBadgedInput,inputField:this.streetAddressField},{badgedInput:this.localityBadgedInput,inputField:this.localityField},{badgedInput:this.regionBadgedInput,inputField:this.regionField},{badgedInput:this.postalBadgedInput,inputField:this.postalCodeField}].forEach(({badgedInput:e,inputField:t})=>{e.error=!t.checkValidity()})}validateForm(){const o=this.form.reportValidity();return this.errorMessage.textContent=o?"":s("Please enter any missing or invalid contact information below"),o}focus(){this.emailField.focus()}get minTwoCharValidationMessage(){return s("Enter at least two characters")}get streetAddressValidationMessage(){return s("Enter at least four characters")}get usZipCodeValidationMessage(){return s("Enter a valid 5 or 9 digit zip/postal code")}render(){return d`
      <div id="donation-contact-form-error-message"></div>
      <form>
        <div class="row">
          ${this.generateInput({id:"donation-contact-form-email",label:s("Email"),required:!0,fieldType:"email",name:"email",autocomplete:"email",minlength:5,maxlength:255})}
        </div>

        <div class="row">
          ${this.generateInput({id:"donation-contact-form-first-name",label:s("First name"),name:"fname",required:!0,validationPattern:this.minTwoCharPattern,validationMessage:this.minTwoCharValidationMessage,maxlength:255,autocomplete:"given-name"})}
          ${this.generateInput({id:"donation-contact-form-last-name",label:s("Last name"),name:"lname",autocomplete:"family-name",required:!0,validationPattern:this.minTwoCharPattern,validationMessage:this.minTwoCharValidationMessage,maxlength:255})}
        </div>

        <div class="row">
          ${this.generateInput({id:"donation-contact-form-street-address",label:s("Address"),required:!0,autocomplete:"address-line1",name:"street-address",validationPattern:this.streetAddressPattern,validationMessage:this.streetAddressValidationMessage})}
        </div>
        <div class="row">
          ${this.generateInput({id:"donation-contact-form-locality",label:s("City"),autocomplete:"address-level2",required:!0,name:"locality",validationPattern:this.minTwoCharPattern,validationMessage:this.minTwoCharValidationMessage})}
        </div>
        <div class="row">${this.countrySelectorTemplate}</div>
        <div class="row region-postal-row">
          ${this.generateInput({id:"donation-contact-form-region",label:s("State / Province"),autocomplete:"address-level1",required:this.regionAndPostalCodeRequired,name:"region",validationPattern:this.regionAndPostalCodeRequired?this.minTwoCharPattern:void 0,validationMessage:this.regionAndPostalCodeRequired?this.minTwoCharValidationMessage:void 0})}
          ${this.generateInput({id:"donation-contact-form-postal-code",label:s("Zip / Postal Code"),autocomplete:"postal-code",required:this.regionAndPostalCodeRequired,name:"postal",validationPattern:this.regionAndPostalCodeRequired?this.usZipCodePattern:void 0,validationMessage:this.regionAndPostalCodeRequired?this.usZipCodeValidationMessage:void 0})}
        </div>
      </form>
      ${this.getStyles}
    `}get regionAndPostalCodeRequired(){return this.selectedCountry==="US"}get countrySelectorTemplate(){return d`
      <div class="field">
        <label
          for="donation-contact-form-countryCodeAlpha2"
          class="field-label"
        >
          ${s("Country")}<span class="required-asterisk"> *</span>
        </label>
        <ia-donation-badged-input
          .iconSpaceOption=${D.CompressSpace}
        >
          <select
            id="donation-contact-form-countryCodeAlpha2"
            name="country"
            autocomplete="country"
            @change=${o=>{const e=o.target.value;ze[e]&&(this.selectedCountry=e)}}
          >
            ${Oe(Ae(),([o])=>o,([o,e])=>d`
                <option value=${o} ?selected=${o===this.selectedCountry}>
                  ${e}
                </option>
              `)}
          </select>
        </ia-donation-badged-input>
      </div>
    `}createRenderRoot(){return this}inputChanged(o){this.errorMessage.textContent="";const e=o.target,t=this.querySelector(`ia-donation-badged-input.${e.id}`);t&&(t.error=!1)}generateInput(o){const e=o.required??!0,t=o.fieldType??"text";return d`
      <div class="field ${o.id}">
        <label for=${o.id} class="field-label">
          ${o.label}${e?d`<span class="required-asterisk"> *</span>`:de}
        </label>
        <ia-donation-badged-input
          class=${o.id}
          .iconSpaceOption=${D.CompressSpace}
          .requiredIndicatorSpaceOption=${D.CompressSpace}
        >
          <input
            type=${t}
            id=${o.id}
            class="donation-contact-form-input"
            name=${o.name}
            maxlength=${re(o.maxlength)}
            minlength=${re(o.minlength)}
            autocomplete=${o.autocomplete??"on"}
            pattern=${re(o.validationPattern)}
            title=${re(o.validationMessage)}
            @input=${this.inputChanged}
            ?required=${e}
          />
        </ia-donation-badged-input>
      </div>
    `}get donorContactInfo(){return new qe({billing:this.billingInfo,customer:this.contactInfo})}get billingInfo(){return new ae({streetAddress:this.streetAddressField.value,locality:this.localityField.value,region:this.regionField.value,postalCode:this.postalCodeField.value,countryCodeAlpha2:this.countryCodeAlpha2Field.value})}get contactInfo(){return new oe({email:this.emailField.value,firstName:this.firstNameField.value,lastName:this.lastNameField.value})}get getStyles(){const o=x`var(--ia-donation-badged-input-no-icon-spacer-width, calc(var(--donation-contact-base-font-size--) * 3))`;return d`
      <style>
        ia-donation-contact-form {
          --donation-contact-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-contact-row-gap--: var(
            --ia-donation-field-row-gap,
            calc(var(--donation-contact-base-font-size--) * 0.5)
          );
          --donation-contact-field-font-family--: var(
            --ia-theme-base-font-family,
            'Helvetica Neue',
            Helvetica,
            Arial,
            sans-serif
          );
          --donation-contact-field-font-size--: var(
            --ia-donation-contact-field-font-size,
            calc(var(--donation-contact-base-font-size--) * 1.4)
          );
          --donation-contact-field-font-color--: var(
            --ia-donation-form-input-font-color,
            #2c2c2c
          );
          --donation-contact-label-font-family--: var(
            --ia-donation-field-label-font-family,
            var(--donation-contact-field-font-family--)
          );
          --donation-contact-label-font-size--: var(
            --ia-donation-field-label-font-size,
            calc(var(--donation-contact-base-font-size--) * 1.4)
          );
          --donation-contact-label-color--: var(
            --ia-donation-field-label-color,
            #2c2c2c
          );
          --donation-contact-label-margin-bottom--: var(
            --ia-donation-field-label-margin-bottom,
            calc(var(--donation-contact-base-font-size--) * 0.5)
          );
          --donation-contact-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--ia-theme-color-danger, #e51c23)
          );
          --donation-contact-error-color--: var(
            --ia-theme-color-danger,
            #e51c23
          );
          --donation-contact-no-icon-field-width--: calc(
            100% - ${o}
          );
        }

        /*
          A grid, so a label that wraps to two lines in one column doesn't push
          that column's input out of line with its siblings. All labels share
          row line 1 and all inputs share row line 2, each sized to the tallest
          content on its line.
        */
        ia-donation-contact-form .row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          grid-template-rows: auto auto;
          column-gap: var(--donation-contact-row-gap--);
        }

        /*
          State / Province gives up room to Zip / Postal Code so the
          "Zip / Postal Code *" label stays on one line.
        */
        ia-donation-contact-form .row.region-postal-row {
          grid-template-columns:
            calc(60% - var(--donation-contact-base-font-size--) * 3)
            calc(40% + var(--donation-contact-base-font-size--) * 3);
        }

        ia-donation-contact-form .row + .row {
          margin-top: var(--donation-contact-row-gap--);
        }

        ia-donation-contact-form .field {
          display: contents;
        }

        ia-donation-contact-form .field-label {
          display: block;
          font-family: var(--donation-contact-label-font-family--);
          font-size: var(--donation-contact-label-font-size--);
          font-weight: bold;
          color: var(--donation-contact-label-color--);
          margin-bottom: var(--donation-contact-label-margin-bottom--);
        }

        ia-donation-contact-form .required-asterisk {
          color: var(--donation-contact-required-color--);
        }

        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-region,
        ia-donation-contact-form
          ia-donation-badged-input.donation-contact-form-postal-code {
          width: 100%;
        }

        ia-donation-contact-form #donation-contact-form-error-message {
          color: var(--donation-contact-error-color--);
          font-size: calc(var(--donation-contact-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-contact-base-font-size--) * 0.6);
        }

        ia-donation-contact-form .donation-contact-form-input {
          width: var(--donation-contact-no-icon-field-width--);
          border: 0;
          outline: 0;
          background: transparent;
          font-weight: bold;
          color: var(--donation-contact-field-font-color--);
          font-size: var(--donation-contact-field-font-size--);
          padding: 0;
          font-family: var(--donation-contact-field-font-family--);
        }

        ia-donation-contact-form #donation-contact-form-countryCodeAlpha2 {
          width: var(--donation-contact-no-icon-field-width--);
          height: 100%;
          box-sizing: border-box;
          font-weight: bold;
          font-size: var(--donation-contact-field-font-size--);
          color: var(--donation-contact-field-font-color--);
          font-family: var(--donation-contact-field-font-family--);
          border: 0;
          background: #fff;
        }
      </style>
    `}};f([c("ia-donation-badged-input.donation-contact-form-email")],g.prototype,"emailBadgedInput",2);f([c("#donation-contact-form-email")],g.prototype,"emailField",2);f([c("ia-donation-badged-input.donation-contact-form-first-name")],g.prototype,"firstNameBadgedInput",2);f([c("#donation-contact-form-first-name")],g.prototype,"firstNameField",2);f([c("ia-donation-badged-input.donation-contact-form-last-name")],g.prototype,"lastNameBadgedInput",2);f([c("#donation-contact-form-last-name")],g.prototype,"lastNameField",2);f([c("ia-donation-badged-input.donation-contact-form-postal-code")],g.prototype,"postalBadgedInput",2);f([c("#donation-contact-form-postal-code")],g.prototype,"postalCodeField",2);f([c("ia-donation-badged-input.donation-contact-form-street-address")],g.prototype,"streetAddressBadgedInput",2);f([c("#donation-contact-form-street-address")],g.prototype,"streetAddressField",2);f([c("ia-donation-badged-input.donation-contact-form-locality")],g.prototype,"localityBadgedInput",2);f([c("#donation-contact-form-locality")],g.prototype,"localityField",2);f([c("ia-donation-badged-input.donation-contact-form-region")],g.prototype,"regionBadgedInput",2);f([c("#donation-contact-form-region")],g.prototype,"regionField",2);f([c("#donation-contact-form-countryCodeAlpha2")],g.prototype,"countryCodeAlpha2Field",2);f([c("#donation-contact-form-error-message")],g.prototype,"errorMessage",2);f([c("form")],g.prototype,"form",2);f([l({type:String})],g.prototype,"selectedCountry",2);f([l({type:String})],g.prototype,"donorEmail",2);g=f([F("ia-donation-contact-form"),ce()],g);const Dt=U(_e),Tt=U(He),xt=U(Be),zt=U(Ve),At=U(Re),kt=U(Ne),Ie=U(Ue);var Ot=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,ie=(o,e,t,a)=>{for(var n=a>1?void 0:a?_t(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Ot(e,t,n),n};let Y=class extends I{get hostedFieldContainer(){return new gt({number:this.numberField,cvv:this.cvvField,expirationDate:this.expirationField,errorContainer:this.errorMessageField})}render(){return d`
      <div id="braintree-error-message"></div>
      <div class="braintree-row">
        <div class="field">
          <span class="field-label"
            >${s("Card Number")}<span class="required-asterisk">
              *</span
            ></span
          >
          <ia-donation-badged-input
            .icon=${kt}
            .requiredIndicatorSpaceOption=${D.CompressSpace}
            class="creditcard"
          >
            <div class="braintree-input" id="braintree-creditcard"></div>
          </ia-donation-badged-input>
        </div>
      </div>
      <div class="braintree-row expiration-cvv-row">
        <div class="field">
          <span class="field-label"
            >${s("Expiration (MM / YY)")}<span class="required-asterisk">
              *</span
            ></span
          >
          <ia-donation-badged-input
            .icon=${At}
            .requiredIndicatorSpaceOption=${D.CompressSpace}
            class="expiration"
          >
            <div class="braintree-input" id="braintree-expiration"></div>
          </ia-donation-badged-input>
        </div>
        <div class="field">
          <span class="field-label"
            >${s("CVC")}<span class="required-asterisk"> *</span></span
          >
          <ia-donation-badged-input
            .icon=${Ie}
            .requiredIndicatorSpaceOption=${D.CompressSpace}
            class="cvv"
          >
            <div class="braintree-input" id="braintree-cvv"></div>
          </ia-donation-badged-input>
        </div>
      </div>
      ${this.getStyles}
    `}createRenderRoot(){return this}get getStyles(){return d`
      <style>
        ia-donation-credit-card-fields {
          --donation-card-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-card-label-font-family--: var(
            --ia-donation-field-label-font-family,
            var(
              --ia-theme-base-font-family,
              'Helvetica Neue',
              Helvetica,
              Arial,
              sans-serif
            )
          );
          --donation-card-label-font-size--: var(
            --ia-donation-field-label-font-size,
            calc(var(--donation-card-base-font-size--) * 1.4)
          );
          --donation-card-label-color--: var(
            --ia-donation-field-label-color,
            #2c2c2c
          );
          --donation-card-label-margin-bottom--: var(
            --ia-donation-field-label-margin-bottom,
            calc(var(--donation-card-base-font-size--) * 0.5)
          );
          --donation-card-row-gap--: var(
            --ia-donation-field-row-gap,
            calc(var(--donation-card-base-font-size--) * 0.5)
          );
          --donation-card-required-color--: var(
            --ia-donation-badged-input-required-color,
            var(--ia-theme-color-danger, #e51c23)
          );
          --donation-card-error-color--: var(--ia-theme-color-danger, #e51c23);
        }

        ia-donation-credit-card-fields .field-label {
          display: block;
          font-family: var(--donation-card-label-font-family--);
          font-size: var(--donation-card-label-font-size--);
          font-weight: bold;
          color: var(--donation-card-label-color--);
          margin-bottom: var(--donation-card-label-margin-bottom--);
        }

        ia-donation-credit-card-fields .required-asterisk {
          color: var(--donation-card-required-color--);
        }

        /*
          A grid, so a label that wraps to two lines in one column doesn't push
          that column's input out of line with its sibling. Both labels share
          row line 1 and both inputs share row line 2.
        */
        ia-donation-credit-card-fields .braintree-row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 1fr;
          grid-template-rows: auto auto;
          column-gap: var(--donation-card-row-gap--);
        }

        /*
          The expiration column is wider than the CVC column so its
          "Expiration (MM / YY)" label stays on one line. CVC's label has
          room to spare.
        */
        ia-donation-credit-card-fields .braintree-row.expiration-cvv-row {
          grid-template-columns:
            calc(50% + var(--donation-card-base-font-size--) * 2.5)
            calc(50% - var(--donation-card-base-font-size--) * 2.5);
        }

        ia-donation-credit-card-fields .braintree-row + .braintree-row {
          margin-top: var(--donation-card-row-gap--);
        }

        ia-donation-credit-card-fields .field {
          display: contents;
        }

        ia-donation-credit-card-fields ia-donation-badged-input {
          width: 100%;
        }

        ia-donation-credit-card-fields .braintree-input {
          width: 100%;
          height: 100%;
        }

        ia-donation-credit-card-fields #braintree-error-message {
          color: var(--donation-card-error-color--);
          font-size: calc(var(--donation-card-base-font-size--) * 1.4);
          margin-bottom: calc(var(--donation-card-base-font-size--) * 0.6);
        }
      </style>
    `}};ie([c("#braintree-creditcard")],Y.prototype,"numberField",2);ie([c("#braintree-expiration")],Y.prototype,"expirationField",2);ie([c("#braintree-cvv")],Y.prototype,"cvvField",2);ie([c("#braintree-error-message")],Y.prototype,"errorMessageField",2);Y=ie([F("ia-donation-credit-card-fields")],Y);var Ht=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,$e=(o,e,t,a)=>{for(var n=a>1?void 0:a?Bt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Ht(e,t,n),n};let ue=class extends I{render(){return d`
      <h1>${this.displayTitle}</h1>
      <button @click=${this.editClicked}>${s("Edit this amount")}</button>
    `}get displayTitle(){if(!this.donationInfo)return"";const o=this.donationInfo.amount,e=o===Math.round(o)?0:2,t=ge(o,e);return this.donationInfo.donationType===y.Monthly?s(se`${t} Monthly Donation`):s(se`${t} Donation`)}editClicked(){this.dispatchEvent(new Event("editClicked"))}static get styles(){return[O,x`
        :host {
          display: flex;
          justify-content: center;
          align-content: center;
        }

        button {
          border: 0;
          background: none;
          color: var(--link-color);
          cursor: pointer;
        }
      `]}};$e([l({type:Object})],ue.prototype,"donationInfo",2);ue=$e([F("ia-donation-summary"),ce()],ue);var Vt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,J=(o,e,t,a)=>{for(var n=a>1?void 0:a?Rt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Vt(e,t,n),n};const Q={Summary:"summary",Edit:"edit"};let N=class extends I{constructor(){super(...arguments),this.mode=Q.Edit,this.amountOptions=fe,this.amountSelectionLayout=le.MultiLine,this.frequencySelectionMode=te.Button}render(){switch(this.mode){case Q.Summary:return this.donationSummaryTemplate;case Q.Edit:return this.editDonationTemplate}}get editDonationTemplate(){return d`
      <ia-donation-edit-donation
        .donationInfo=${this.donationInfo}
        .amountOptions=${this.amountOptions}
        .amountSelectionLayout=${this.amountSelectionLayout}
        .frequencySelectionMode=${this.frequencySelectionMode}
        @donationInfoChanged=${this.donationInfoChanged}
        @showSummaryClicked=${this.showSummaryClicked}
        @editDonationError=${this.editDonationError}
      >
      </ia-donation-edit-donation>
    `}get donationSummaryTemplate(){return d`
      <ia-donation-summary
        .donationInfo=${this.donationInfo}
        @editClicked=${this.summaryEditClicked}
      >
      </ia-donation-summary>
    `}donationInfoChanged(o){this.donationInfo=o.detail.donationInfo,this.dispatchEvent(new CustomEvent("donationInfoChanged",{detail:{donationInfo:this.donationInfo}}))}editDonationError(o){this.dispatchEvent(new CustomEvent("editDonationError",{detail:o.detail}))}summaryEditClicked(){this.mode=Q.Edit}showSummaryClicked(){this.mode=Q.Summary}};J([l({type:Object})],N.prototype,"donationInfo",2);J([l({type:String})],N.prototype,"mode",2);J([l({type:Array})],N.prototype,"amountOptions",2);J([l({type:String})],N.prototype,"amountSelectionLayout",2);J([l({type:String})],N.prototype,"frequencySelectionMode",2);N=J([F("ia-donation-header")],N);var Nt=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,_=(o,e,t,a)=>{for(var n=a>1?void 0:a?Ut(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Nt(e,t,n),n};const E={Loading:"loading",Available:"available",Unavailable:"unavailable"};let T=class extends I{constructor(){super(...arguments),this.donationInfoValid=!0,this.applePayMode=E.Loading,this.googlePayMode=E.Loading,this.venmoMode=E.Loading,this.payPalMode=E.Loading}render(){const o=this.paymentModeSelected?"payment-selected":"";return d`
      <div
        class="payment-container ${this.donationInfoValid?"donation-info-valid":"donation-info-invalid"} ${o}"
      >
        <div class="payment-provider-container">
          <button
            class="applepay provider-button ${this.applePayMode} ${this.paymentModeSelected==="apple"?"selected":""}"
            aria-label=${s("Pay with Apple Pay")}
            @click=${e=>{this.paymentModeSelected="apple",this.applePaySelected(e)}}
          >
            <div class="payment-image">${Dt}</div>
          </button>

          <button
            class="googlepay provider-button ${this.googlePayMode} ${this.paymentModeSelected==="google"?"selected":""}"
            aria-label=${s("Pay with Google Pay")}
            @click=${()=>{this.paymentModeSelected="google",this.googlePaySelected()}}
          >
            <div class="payment-image">${Tt}</div>
          </button>

          <button
            class="venmo provider-button ${this.venmoMode} ${this.paymentModeSelected==="venmo"?"selected":""}"
            aria-label=${s("Pay with Venmo")}
            @click=${()=>{this.paymentModeSelected="venmo",this.venmoSelected()}}
          >
            <div class="payment-image">${zt}</div>
          </button>

          <div
            class="paypal-container provider-button ${this.payPalMode} ${this.paymentModeSelected==="paypal"?"selected":""}"
          >
            <div class="payment-image">
              <button
                class="paypal-local-button"
                aria-label=${s("Pay with PayPal")}
                tabindex=${this.donationInfoValid?"-1":"0"}
                aria-hidden=${this.donationInfoValid?"true":"false"}
                @click=${()=>{this.paymentModeSelected="paypal",this.localPaypalButtonClicked()}}
              >
                ${xt}
              </button>
              <slot name="paypal-button"></slot>
            </div>
          </div>
        </div>

        <div class="credit-card-container">
          <button
            @click=${()=>{this.paymentModeSelected="cc",this.creditCardSelected()}}
            class="button-style credit-card-button ${this.paymentModeSelected==="cc"?"selected":""}"
          >
            <div class="cc-title">${s("Credit Card")}</div>
            <div class="cc-background"></div>
          </button>
        </div>
      </div>

      ${this.paymentModeSelected?d`
            <button
              id="change-payment-method"
              @click=${()=>{this.paymentModeSelected=void 0,this.dispatchEvent(new Event("resetPaymentMethod")),this.setButtonVisibility()}}
            >
              ${s("Change payment method")}
            </button>

            <slot name="credit-card-fields"></slot>
          `:de}
    `}firstUpdated(){this.dispatchEvent(new Event("firstUpdated"))}updated(o){o.has("paymentProviders")&&this.setButtonVisibility()}showPaypalButton(){this.payPalMode=E.Available}async setButtonVisibility(){const o=this.paymentProviders;if(!o)return;const e=t=>t?E.Available:E.Unavailable;o.venmoHandler.get().then(async t=>t?t.isBrowserSupported():!1).then(t=>{this.venmoMode=e(t)}).catch(t=>{console.error("venmo unavailable",t),this.venmoMode=E.Unavailable}),o.applePayHandler.get().then(t=>t.isAvailable()).then(t=>{this.applePayMode=e(t)}).catch(t=>{console.error("apple pay unavailable",t),this.applePayMode=E.Unavailable}),o.googlePayHandler.get().then(t=>t.isBrowserSupported()).then(t=>{this.googlePayMode=e(t)}).catch(t=>{console.error("google pay unavailable",t),this.googlePayMode=E.Unavailable})}googlePaySelected(){this.dispatchEvent(new Event("googlePaySelected"))}applePaySelected(o){this.dispatchEvent(new CustomEvent("applePaySelected",{detail:{originalEvent:o}}))}venmoSelected(){this.dispatchEvent(new Event("venmoSelected"))}creditCardSelected(){this.dispatchEvent(new Event("creditCardSelected"))}localPaypalButtonClicked(){this.dispatchEvent(new Event("paypalBlockerSelected"))}static get styles(){return[O,be,x`
        :host {
          --donation-selector-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-selector-button-width--: var(
            --ia-donation-payment-button-width,
            calc(var(--donation-selector-base-font-size--) * 5)
          );
          --donation-selector-button-height--: var(
            --ia-donation-payment-button-height,
            calc(var(--donation-selector-base-font-size--) * 3.2)
          );
          --donation-selector-cc-font-size--: var(
            --ia-donation-credit-card-font-size,
            calc(var(--donation-selector-base-font-size--) * 1.8)
          );
          --donation-selector-cc-font-color--: var(
            --ia-donation-credit-card-button-font-color,
            var(--mid-gray)
          );
          --donation-selector-cc-color--: var(
            --ia-donation-credit-card-button-color,
            var(--true-white)
          );
        }

        button {
          color: inherit;
          font-family: inherit;
        }

        .payment-container {
          width: 100%;
        }

        .payment-provider-container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: var(--donation-selector-base-font-size--);
          margin-bottom: var(--donation-selector-base-font-size--);
          max-width: calc(var(--donation-selector-base-font-size--) * 23);
        }

        .provider-button {
          border: 0;
          padding: 0;
          background: none;
          cursor: pointer;
          width: var(--donation-selector-button-width--);
          height: var(--donation-selector-button-height--);
        }

        .provider-button.unavailable {
          display: none;
        }

        .provider-button.loading {
          border: 1px solid #ddd;
          border-radius: 2px;
          /* Accounts for the border that goes away once the provider loads, so the layout doesn't shift */
          margin-bottom: -2px;
        }

        .provider-button.loading .payment-image {
          display: none;
        }

        .payment-image,
        .payment-image .ia-icon {
          width: 100%;
          height: 100%;
        }

        .paypal-local-button {
          position: absolute;
          border: 0;
          padding: 0;
          background: none;
          cursor: pointer;
          width: var(--donation-selector-button-width--);
          height: var(--donation-selector-button-height--);
        }

        .donation-info-valid .paypal-local-button {
          z-index: 0;
        }

        .donation-info-invalid .paypal-local-button {
          z-index: 250;
        }

        .credit-card-button {
          color: var(--donation-selector-cc-font-color--);
          background-color: var(--donation-selector-cc-color--);
          border: 1px solid var(--mid-gray);
          border-radius: 4px;
          cursor: pointer;
          margin: 0;
          padding: calc(var(--donation-selector-base-font-size--) * 0.7)
            var(--donation-selector-base-font-size--);
          width: 100%;
        }

        .credit-card-button .cc-background {
          height: calc(var(--donation-selector-base-font-size--) * 2.4);
          width: 100%;
          background-repeat: no-repeat;
          background-image: url(https://archive.org/images/cc_logos.png);
          background-position: 50% 50%;
          background-size: contain;
        }

        .credit-card-button .cc-title {
          font-size: var(--donation-selector-cc-font-size--);
          font-weight: 700;
          margin-bottom: var(--padding-sm);
        }

        button#change-payment-method {
          margin-top: 10px;
          margin-bottom: 10px;
          background: var(--true-white);
          border: 1px solid;
          border-radius: 3px;
          padding: 5px;
          cursor: pointer;
        }

        .payment-selected .provider-button:not(.selected),
        .payment-selected .credit-card-button:not(.selected) {
          display: none;
        }
      `]}};_([l({type:Boolean})],T.prototype,"donationInfoValid",2);_([l({type:Object})],T.prototype,"paymentProviders",2);_([$()],T.prototype,"applePayMode",2);_([$()],T.prototype,"googlePayMode",2);_([$()],T.prototype,"venmoMode",2);_([$()],T.prototype,"payPalMode",2);_([$()],T.prototype,"paymentModeSelected",2);T=_([F("ia-donation-payment-selector")],T);var Lt=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,Ee=(o,e,t,a)=>{for(var n=a>1?void 0:a?qt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Lt(e,t,n),n};let ye=class extends I{render(){return d`
      <div class="top-line"></div>
      <div class="total-line">${this.totalLine}</div>
    `}get totalLine(){if(!this.donationInfo)return"";const o=ge(this.donationInfo.total);return this.donationInfo.donationType===y.Monthly?s(se`Total: ${o}/month`):s(se`Total: ${o}`)}static get styles(){return[O,x`
        :host {
          --donation-total-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --donation-total-line-color--: var(
            --ia-donation-total-amount-line-color,
            var(--mid-gray)
          );
          --donation-total-line-thickness--: var(
            --ia-donation-total-amount-line-thickness,
            2px
          );
          --donation-total-vertical-spacing--: var(
            --ia-donation-total-amount-vertical-spacing,
            var(--padding-sm)
          );
          --donation-total-font-size--: var(
            --ia-donation-total-amount-font-size,
            calc(var(--donation-total-base-font-size--) * 2.6)
          );
        }

        .top-line {
          width: 100%;
          height: var(--donation-total-line-thickness--);
          background-color: var(--donation-total-line-color--);
        }

        .total-line {
          font-size: var(--donation-total-font-size--);
          font-weight: bold;
          text-align: center;
          margin-top: var(--donation-total-vertical-spacing--);
        }
      `]}};Ee([l({type:Object})],ye.prototype,"donationInfo",2);ye=Ee([F("ia-donation-total-amount"),ce()],ye);var jt=Object.defineProperty,Yt=Object.getOwnPropertyDescriptor,C=(o,e,t,a)=>{for(var n=a>1?void 0:a?Yt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&jt(e,t,n),n};let P=class extends I{constructor(){super(...arguments),this.donationInfo=Ce,this.amountOptions=fe,this.amountSelectionLayout=le.MultiLine,this.frequencySelectionMode=te.Button,this.creditCardVisible=!1,this.contactFormVisible=!1,this.donationInfoValid=!0,this.paypalButtonNeedsRender=!0,this.flowHandlersConfigured=!1}render(){return d`
      <ia-donation-header
        .amountOptions=${this.amountOptions}
        .amountSelectionLayout=${this.amountSelectionLayout}
        .frequencySelectionMode=${this.frequencySelectionMode}
        @donationInfoChanged=${this.donationInfoChanged}
        @editDonationError=${this.editDonationError}
      >
      </ia-donation-header>

      <ia-donation-section
        .badgeMode=${Le.HideBadgeLeaveSpacing}
        id="total-amount-section"
      >
        <ia-donation-total-amount .donationInfo=${this.donationInfo}>
        </ia-donation-total-amount>
      </ia-donation-section>

      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart}`}
        headline=${s("Choose a payment method")}
      >
        <ia-donation-payment-selector
          .paymentProviders=${this.braintreeManager?.paymentProviders}
          @firstUpdated=${this.paymentSelectorFirstUpdated}
          @creditCardSelected=${this.creditCardSelected}
          @venmoSelected=${this.venmoSelected}
          @applePaySelected=${this.applePaySelected}
          @googlePaySelected=${this.googlePaySelected}
          @paypalBlockerSelected=${this.paypalBlockerSelected}
          @resetPaymentMethod=${()=>{this.selectedPaymentProvider=void 0,this.contactFormVisible=!1}}
        >
          <slot name="paypal-button" slot="paypal-button"></slot>
          <div
            class="credit-card-fields ${this.creditCardVisible?"":"hidden"}"
            slot="credit-card-fields"
          >
            <slot name="braintree-hosted-fields"></slot>
          </div>
        </ia-donation-payment-selector>
      </ia-donation-section>

      <div
        class="contact-form-section ${this.contactFormVisible?"":"hidden"}"
      >
        ${this.contactFormSectionTemplate}
      </div>
    `}async showConfirmationModalDev(o){this.paymentFlowHandlers?.showConfirmationStepModal(o)}async showUpsellModalDev(o){if(this.paymentFlowHandlers?.showUpsellModal(o),o.ctaMode===A.PayPalUpsellSlot){const e=await this.braintreeManager?.paymentProviders.paypalHandler.get(),t=new B({amount:o.oneTimeAmount,donationType:y.OneTime,coverFees:!1});e?.renderPayPalButton({selector:"#paypal-upsell-button",style:{color:"blue",label:"paypal",shape:"rect",size:"responsive",tagline:!1},donationInfo:t})}}get contactFormSectionTemplate(){const o=this.selectedPaymentProvider===w.Venmo?s("Help us stay in touch"):s("Enter contact information");return d`
      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart+1}`}
        headline=${o}
        id="contactFormSection"
      >
        <slot name="contact-form"></slot>
      </ia-donation-section>

      <ia-donation-section
        .sectionBadge=${`${this.paymentSelectorNumberingStart+2}`}
      >
        <slot name="recaptcha"></slot>
        <button id="donate-button" @click=${this.donateClicked}>
          ${s("Donate")}
        </button>

        <div class="secure-process-note">
          ${Ie} ${s("Your payment will be securely processed")}
        </div>
      </ia-donation-section>
    `}get paymentSelectorNumberingStart(){return this.frequencySelectionMode===te.Button?3:2}editDonationError(){this.donationInfoValid=!1}paymentSelectorFirstUpdated(){this.paymentFlowHandlers?.paypalHandler&&this.renderPayPalButtonIfNeeded()}applePaySelected(o){if(this.selectedPaymentProvider=w.ApplePay,this.contactFormVisible=!1,this.creditCardVisible=!1,!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}const e=o.detail.originalEvent;this.donationInfo&&this.paymentFlowHandlers?.applePayHandler?.paymentInitiated(this.donationInfo,e),this.emitPaymentFlowStartedEvent()}googlePaySelected(){if(this.selectedPaymentProvider=w.GooglePay,this.contactFormVisible=!1,this.creditCardVisible=!1,!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}this.donationInfo&&this.paymentFlowHandlers?.googlePayHandler?.paymentInitiated(this.donationInfo),this.emitPaymentFlowStartedEvent()}async creditCardSelected(){if(!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}this.selectedPaymentProvider=w.CreditCard,this.contactFormVisible=!0,this.creditCardVisible=!0,this.focusCreditCardNumberField()}async venmoSelected(){if(!this.donationInfoValid){this.showInvalidDonationInfoAlert();return}this.selectedPaymentProvider=w.Venmo,this.contactFormVisible=!0,this.creditCardVisible=!1,this.focusContactForm()}paypalBlockerSelected(){this.contactFormVisible=!1,this.creditCardVisible=!1,this.showInvalidDonationInfoAlert()}async focusContactForm(){await this.updateComplete,this.contactFormSection&&this.contactForm?.focus()}async focusCreditCardNumberField(){await this.updateComplete,(await this.braintreeManager?.paymentProviders.creditCardHandler.get())?.focusField(z.Number)}async donateClicked(){if(!this.contactForm){alert(s("Please enter contact info."));return}if(!this.donationInfoValid||!this.donationInfo){this.showInvalidDonationInfoAlert();return}const o=this.contactForm.donorContactInfo;switch(this.selectedPaymentProvider){case w.CreditCard:this.handleCreditCardDonationFlow(o,this.donationInfo);break;case w.Venmo:this.handleVenmoDonationFlow(o,this.donationInfo);break}}async handleCreditCardDonationFlow(o,e){const t=this.paymentFlowHandlers?.creditCardHandler;(await this.braintreeManager?.paymentProviders.creditCardHandler.get())?.hideErrorMessage();const n=this.contactForm?.reportValidity(),i=await t?.tokenizeFields();!n||i===void 0||(this.emitPaymentFlowStartedEvent(),t?.paymentInitiated(i,e,o))}async handleVenmoDonationFlow(o,e){this.contactForm?.reportValidity()&&this.paymentFlowHandlers?.venmoHandler?.paymentInitiated(o,e)}emitPaymentFlowEvent(o,e={}){this.selectedPaymentProvider&&this.dispatchEvent(new CustomEvent(o,{detail:{paymentProvider:this.selectedPaymentProvider,...e}}))}emitPaymentFlowStartedEvent(){this.emitPaymentFlowEvent("paymentFlowStarted")}emitPaymentFlowConfirmedEvent(){this.emitPaymentFlowEvent("paymentFlowConfirmed")}emitPaymentFlowCancelledEvent(){this.emitPaymentFlowEvent("paymentFlowCancelled")}emitPaymentFlowErrorEvent(o){this.emitPaymentFlowEvent("paymentFlowError",{error:o})}showInvalidDonationInfoAlert(){alert(s("Please enter a valid donation amount."))}async renderPayPalButtonIfNeeded(){this.paypalButtonNeedsRender&&(this.paypalButtonNeedsRender=!1,this.donationInfo&&await this.paymentFlowHandlers?.paypalHandler?.renderPayPalButton(this.donationInfo),this.paymentSelector.showPaypalButton())}updated(o){o.has("donationInfo")&&this.donationInfo&&(this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo),this.donationFormHeader.donationInfo=this.donationInfo),(o.has("paymentFlowHandlers")||o.has("donationInfo"))&&this.donationInfo&&this.paymentFlowHandlers&&this.setupFlowHandlers(),o.has("donationInfoValid")&&(this.paymentSelector.donationInfoValid=this.donationInfoValid),o.has("selectedPaymentProvider")&&this.dispatchEvent(new CustomEvent("paymentProviderSelected",{detail:{paymentProvider:this.selectedPaymentProvider,previousPaymentProvider:o.get("selectedPaymentProvider")}}))}setupFlowHandlers(){this.flowHandlersConfigured||(this.flowHandlersConfigured=!0,this.bindFlowListenerEvents(),this.renderPayPalButtonIfNeeded(),this.donationInfo&&this.paymentFlowHandlers?.paypalHandler?.updateDonationInfo(this.donationInfo))}bindFlowListenerEvents(){const o=this.paymentFlowHandlers?.paypalHandler;o?.on("payPalPaymentStarted",()=>{this.selectedPaymentProvider=w.PayPal,this.emitPaymentFlowStartedEvent()}),o?.on("payPalPaymentConfirmed",()=>{this.selectedPaymentProvider=w.PayPal,this.emitPaymentFlowConfirmedEvent()}),o?.on("payPalPaymentCancelled",()=>{this.selectedPaymentProvider=w.PayPal,this.emitPaymentFlowCancelledEvent()}),o?.on("payPalPaymentError",(e,t)=>{this.selectedPaymentProvider=w.PayPal,this.emitPaymentFlowErrorEvent(t)}),this.paymentFlowHandlers?.googlePayHandler?.on("paymentCancelled",()=>{this.selectedPaymentProvider=w.GooglePay,this.emitPaymentFlowCancelledEvent()})}donationInfoChanged(o){const e=o.detail.donationInfo;this.donationInfo=new B({amount:e.amount,donationType:e.donationType,coverFees:e.coverFees}),this.donationInfoValid=!0,this.dispatchEvent(new CustomEvent("donationInfoChanged",{detail:{donationInfo:e}}))}static get styles(){return[O,be,x`
        :host {
          /*
           * The donation form was built for a 10px root font size. Sizing off
           * this base keeps it self-contained, so it looks the same whatever
           * the page's root size is. Every part of the form reads it, and the
           * two parts with their own base variable get it passed through.
           */
          --donation-form-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          --ia-donation-section-base-font-size: var(
            --donation-form-base-font-size--
          );
          --ia-donation-edit-base-font-size: var(
            --donation-form-base-font-size--
          );

          --donation-form-donate-button-font-size--: var(
            --ia-donation-form-donate-button-font-size,
            calc(var(--donation-form-base-font-size--) * 2.6)
          );
          --donation-form-donate-button-height--: var(
            --ia-donation-form-donate-button-height,
            calc(var(--donation-form-base-font-size--) * 4)
          );
          --donation-form-donate-button-color--: var(
            --ia-donation-form-donate-button-color,
            var(--mint-green)
          );
          --donation-form-donate-button-text-color--: var(
            --ia-donation-form-donate-button-text-color,
            var(--true-white)
          );
          --donation-form-donate-button-hover-color--: var(
            --ia-donation-form-donate-button-hover-color,
            #278367
          );
          --donation-form-total-top-margin--: var(
            --ia-donation-form-total-amount-top-margin,
            calc(var(--donation-form-base-font-size--) * 1.5)
          );
          --donation-form-total-bottom-margin--: var(
            --ia-donation-form-total-amount-bottom-margin,
            calc(var(--donation-form-base-font-size--) * 1.2)
          );
        }

        h1 {
          margin: 0;
          padding: 0;
        }

        .hidden {
          display: none;
        }

        .secure-process-note {
          margin-top: 0.5em;
          font-size: 0.75em;
          text-align: center;
        }

        .secure-process-note .ia-icon {
          width: calc(var(--donation-form-base-font-size--) * 1.2);
          height: calc(var(--donation-form-base-font-size--) * 1.5);
          vertical-align: bottom;
        }

        #donate-button {
          width: 100%;
          appearance: none;
          font-size: var(--donation-form-donate-button-font-size--);
          font-weight: bold;
          text-align: center;
          color: var(--donation-form-donate-button-text-color--);
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: var(--donation-form-donate-button-color--);
          padding-top: var(--padding-sm);
          padding-bottom: var(--padding-sm);
          height: var(--donation-form-donate-button-height--);
        }

        #donate-button:hover {
          background-color: var(--donation-form-donate-button-hover-color--);
        }

        #total-amount-section {
          display: block;
          margin-top: var(--donation-form-total-top-margin--);
          margin-bottom: var(--donation-form-total-bottom-margin--);
        }
      `]}};C([l({type:Object})],P.prototype,"braintreeManager",2);C([l({type:Object})],P.prototype,"paymentFlowHandlers",2);C([l({type:Object})],P.prototype,"donationRequest",2);C([l({type:Object})],P.prototype,"donationInfo",2);C([l({type:Object})],P.prototype,"contactForm",2);C([l({type:Array})],P.prototype,"amountOptions",2);C([l({type:String})],P.prototype,"amountSelectionLayout",2);C([l({type:String})],P.prototype,"frequencySelectionMode",2);C([$()],P.prototype,"creditCardVisible",2);C([$()],P.prototype,"contactFormVisible",2);C([$()],P.prototype,"donationInfoValid",2);C([$()],P.prototype,"selectedPaymentProvider",2);C([c("#contactFormSection")],P.prototype,"contactFormSection",2);C([c("ia-donation-header")],P.prototype,"donationFormHeader",2);C([c("ia-donation-payment-selector")],P.prototype,"paymentSelector",2);P=C([F("ia-donation-form")],P);var Kt=Object.defineProperty,Gt=Object.getOwnPropertyDescriptor,h=(o,e,t,a)=>{for(var n=a>1?void 0:a?Gt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Kt(e,t,n),n};let p=class extends I{constructor(){super(...arguments),this.analyticsCategory="DonationForm",this.amountOptions=fe,this.donationInfo=Ce,this.amountSelectionLayout=le.MultiLine,this.frequencySelectionMode=te.Button,this.donorEmail="",this.lazyLoaderService=new ke,this.recaptchaManagerSetup=!1}updated(o){o.has("referrer")&&this.referrer&&(this.braintreeManager?.setReferrer(this.referrer),this.logDonationFlowEvent("referrer",this.referrer)),o.has("loggedInUser")&&this.loggedInUser&&this.braintreeManager?.setLoggedInUser(this.loggedInUser),o.has("origin")&&this.origin&&(this.braintreeManager?.setOrigin(this.origin),this.logDonationFlowEvent("origin",this.origin)),(o.has("paymentClients")||o.has("braintreeAuthToken")||o.has("endpointManager")||o.has("environment"))&&(this.setupBraintreeManager(),this.setupRecaptchaManager()),o.has("recaptchaSiteKey")&&this.setupRecaptchaManager(),(o.has("braintreeManager")||o.has("recaptchaManager")||o.has("modalManager")||o.has("recaptchaElement"))&&this.setupPaymentFlowHandlers(),(o.has("environment")||o.has("lazyLoaderService"))&&this.environment&&(this.paymentClients===void 0||this.paymentClients===this.defaultPaymentClients)&&(this.defaultPaymentClients=new dt(this.lazyLoaderService,this.environment),this.paymentClients=this.defaultPaymentClients)}async showConfirmationStepDev(o){this.donationForm.showConfirmationModalDev(o)}async showUpsellModalDev(o){this.donationForm.showUpsellModalDev(o)}setupBraintreeManager(){this.braintreeManager===void 0&&this.braintreeAuthToken&&this.endpointManager&&this.paymentClients&&this.environment&&(this.braintreeManager=new lt({paymentClients:this.paymentClients,endpointManager:this.endpointManager,authorizationToken:this.braintreeAuthToken,venmoProfileId:this.venmoProfileId,googlePayMerchantId:this.googlePayMerchantId,hostedFieldConfig:this.hostedFieldConfig,hostingEnvironment:this.environment,referrer:this.referrer,loggedInUser:this.loggedInUser,origin:this.origin}),this.braintreeManager.on("paymentProvidersHostedFieldsRetry",o=>{this.dispatchEvent(new CustomEvent("paymentProvidersHostedFieldsRetry",{detail:{retryNumber:o}}))}),this.braintreeManager.on("paymentProvidersHostedFieldsFailed",o=>{this.dispatchEvent(new CustomEvent("paymentProvidersHostedFieldsFailed",{detail:{error:o}}))}))}async setupRecaptchaManager(){if(!this.recaptchaSiteKey||!this.paymentClients||this.recaptchaManagerSetup)return;this.recaptchaManagerSetup=!0;const o=await this.paymentClients.recaptchaLibrary.get();this.recaptchaManager=new St({grecaptchaLibrary:o,siteKey:this.recaptchaSiteKey})}firstUpdated(){this.configureFromQueryParams(),this.trackViewedEvent()}configureFromQueryParams(){const o=new URLSearchParams(window.location.search);let e=this.amountOptions;const t=o.get("dollarAmounts");t&&(e=t.slice(1,-1).split(",").map(H=>parseFloat(H)).filter(H=>!isNaN(H)));let a=this.donationInfo.coverFees;const n=o.get("coverFees");n&&(a=n==="true");let i=this.donationInfo.donationType;o.get("contrib_type")==="monthly"&&(i=y.Monthly);let m=this.donationInfo.amount;const b=o.get("amt");if(b){const v=Pe(b.replace(/usd|\$/gi,"").trim());v>0&&(m=v)}const S=o.get("amountLayout");if(S){const v=S;Object.values(le).includes(v)&&(this.amountSelectionLayout=v)}const M=o.get("frequencyMode");if(M){const v=M;Object.values(te).includes(v)&&(this.frequencySelectionMode=v)}this.amountOptions=e,this.donationInfo=new B({donationType:i,amount:m,coverFees:a})}setupPaymentFlowHandlers(){this.paymentFlowHandlers||!this.braintreeManager||!this.recaptchaManager||!this.modalManager||!this.recaptchaElement||(this.paymentFlowHandlers=new Ct({braintreeManager:this.braintreeManager,modalManager:this.modalManager,recaptchaManager:this.recaptchaManager,analytics:{logEvent:this.logEvent.bind(this),logDonationFlowEvent:this.logDonationFlowEvent.bind(this)}}),this.donationForm.braintreeManager=this.braintreeManager,this.donationForm.paymentFlowHandlers=this.paymentFlowHandlers,this.braintreeManager.startup(),this.paymentFlowHandlers.startup(),this.recaptchaManager.setup(this.recaptchaElement,1,"light","image"))}get hostedFieldConfig(){const o={input:{"font-size":"16px","font-family":'"Helvetica Neue", Helvetica, Arial, sans-serif',"font-weight":"700",color:"#333"},":focus":{color:"#333"},".valid":{color:"#333"},".invalid":{color:"#333"}},e={number:{selector:"#braintree-creditcard"},cvv:{selector:"#braintree-cvv"},expirationDate:{selector:"#braintree-expiration"}},t=this.creditCardFieldsElement.hostedFieldContainer;return new ct({hostedFieldStyle:o,hostedFieldFieldOptions:e,hostedFieldContainer:t})}render(){return d`
      <div class="ia-donation-form-controller-container">
        <ia-donation-form
          .braintreeManager=${this.braintreeManager}
          .contactForm=${this.contactForm}
          .amountOptions=${this.amountOptions}
          .donationInfo=${this.donationInfo}
          .amountSelectionLayout=${this.amountSelectionLayout}
          .frequencySelectionMode=${this.frequencySelectionMode}
          @donationInfoChanged=${this.donationInfoChanged}
          @paymentProviderSelected=${this.paymentProviderSelected}
          @paymentFlowStarted=${this.paymentFlowStarted}
          @paymentFlowConfirmed=${this.paymentFlowConfirmed}
          @paymentFlowCancelled=${this.paymentFlowCancelled}
          @paymentFlowError=${this.paymentFlowError}
        >
          <!--
            Braintree's hosted fields, the PayPal button and recaptcha can't
            live in a shadow root, so they render here in the light DOM and
            are slotted into the form. See
            https://github.com/braintree/braintree-web-drop-in/issues/614
            and https://github.com/paypal/paypal-checkout-components/issues/353
          -->
          <div slot="braintree-hosted-fields">
            <ia-donation-credit-card-fields></ia-donation-credit-card-fields>
          </div>

          <!-- Autofill doesn't reach into shadow DOM, so the contact form is light DOM too -->
          <div slot="contact-form">
            <ia-donation-contact-form
              .donorEmail=${this.donorEmail}
            ></ia-donation-contact-form>
          </div>

          <div slot="paypal-button">
            <div id="paypal-button"></div>
          </div>

          <slot name="recaptcha" slot="recaptcha"></slot>
        </ia-donation-form>
      </div>

      ${this.getStyles}
    `}createRenderRoot(){return this}donationInfoChanged(o){this.logEvent("DonationInfoChanged"),this.donationInfo=o.detail.donationInfo}trackViewedEvent(){this.logEvent("Viewed")}paymentProviderSelected(o){const e=o.detail.paymentProvider,t=o.detail.previousPaymentProvider,a=this.removeSpaces(e??"unset");let n=`ProviderFirstSelected-${a}`,i;t!==void 0&&(n=`ProviderChangedTo-${a}`,i=`ProviderChangedFrom-${this.removeSpaces(t)}`),this.logEvent(n,i)}paymentFlowConfirmed(o){this.logEvent("PaymentFlowConfirmed",this.removeSpaces(o.detail.paymentProvider))}paymentFlowStarted(o){this.logEvent("PaymentFlowStarted",this.removeSpaces(o.detail.paymentProvider))}paymentFlowCancelled(o){this.logEvent("PaymentFlowCancelled",this.removeSpaces(o.detail.paymentProvider))}paymentFlowError(o){const e=this.removeSpaces(o.detail.paymentProvider);this.logEvent("PaymentFlowError",`${e}-${o.detail.error}`)}removeSpaces(o){return o.replace(/\s+/g,"")}logEvent(o,e){const t={action:o,label:e,category:this.analyticsCategory};this.analyticsHandler?.sendEvent(t)}logDonationFlowEvent(o,e){const t={action:o,label:e,category:"DonationFlow"};this.analyticsHandler?.sendEventNoSampling(t)}get getStyles(){return d`
      <style>
        .ia-donation-form-controller-container {
          --donation-form-controller-base-font-size--: var(
            --ia-donation-form-base-font-size,
            10px
          );
          color: var(--ia-donation-form-text-color, #333);
          background-color: var(
            --ia-donation-form-background-color,
            transparent
          );

          --ia-donation-section-background-color: var(
            --ia-donation-form-background-color,
            transparent
          );
          --ia-donation-edit-background-color: var(
            --ia-donation-form-background-color,
            transparent
          );

          --ia-donation-section-badge-background-color: var(
            --ia-donation-form-badge-background-color,
            #333
          );
          --ia-donation-edit-badge-background-color: var(
            --ia-donation-form-badge-background-color,
            #333
          );

          --ia-donation-section-badge-font-color: var(
            --ia-donation-form-badge-text-color,
            #fff
          );
          --ia-donation-edit-badge-font-color: var(
            --ia-donation-form-badge-text-color,
            #fff
          );

          --ia-donation-edit-button-font-color: var(
            --ia-donation-form-payment-option-text-color
          );
          --ia-donation-edit-button-color: var(
            --ia-donation-form-payment-option-background-color
          );
          --ia-donation-edit-button-selected-color: var(
            --ia-donation-form-selected-option-background-color
          );
          --ia-donation-edit-button-selected-font-color: var(
            --ia-donation-form-selected-option-text-color
          );
        }

        .ia-donation-form-controller-container ia-donation-form:focus {
          outline: none;
        }

        /* The real PayPal button, kept but nearly invisible under the local one */
        .ia-donation-form-controller-container #paypal-button {
          opacity: 0.001;
          width: calc(var(--donation-form-controller-base-font-size--) * 5);
          height: calc(var(--donation-form-controller-base-font-size--) * 3);
          overflow: hidden;
        }

        .ia-donation-form-controller-container
          div[slot='braintree-hosted-fields'] {
          background-color: white;
        }
      </style>
    `}};h([l({type:String})],p.prototype,"environment",2);h([l({type:String})],p.prototype,"braintreeAuthToken",2);h([l({type:String})],p.prototype,"recaptchaSiteKey",2);h([l({type:String})],p.prototype,"venmoProfileId",2);h([l({type:String})],p.prototype,"googlePayMerchantId",2);h([l({type:String})],p.prototype,"analyticsCategory",2);h([l({type:Array})],p.prototype,"amountOptions",2);h([l({type:Object})],p.prototype,"donationInfo",2);h([l({type:String})],p.prototype,"amountSelectionLayout",2);h([l({type:String})],p.prototype,"frequencySelectionMode",2);h([l({type:String})],p.prototype,"referrer",2);h([l({type:String})],p.prototype,"loggedInUser",2);h([l({type:String})],p.prototype,"origin",2);h([l({type:String})],p.prototype,"donorEmail",2);h([l({type:Object})],p.prototype,"endpointManager",2);h([l({type:Object})],p.prototype,"analyticsHandler",2);h([l({type:Object})],p.prototype,"modalManager",2);h([l({type:Object})],p.prototype,"recaptchaElement",2);h([l({type:Object})],p.prototype,"braintreeManager",2);h([l({type:Object})],p.prototype,"recaptchaManager",2);h([l({type:Object})],p.prototype,"paymentFlowHandlers",2);h([l({type:Object})],p.prototype,"paymentClients",2);h([l({type:Object})],p.prototype,"lazyLoaderService",2);h([c("ia-donation-form")],p.prototype,"donationForm",2);h([c("ia-donation-credit-card-fields")],p.prototype,"creditCardFieldsElement",2);h([c("ia-donation-contact-form")],p.prototype,"contactForm",2);p=h([F("ia-donation-form-controller")],p);var Zt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,L=(o,e,t,a)=>{for(var n=a>1?void 0:a?Jt(e,t):e,i=o.length-1,r;i>=0;i--)(r=o[i])&&(n=(a?r(e,t,n):r(n))||n);return a&&n&&Zt(e,t,n),n};const he={braintreeAuthToken:"sandbox_x634jsj7_7zybks4ybp63pbmd",recaptchaSiteKey:"6LeTUvYUAAAAAPTvW98MaXyS8c6vxk4-9n8DI1ve",venmoProfileId:"1953896702662410263"};class Wt{constructor(e){this.onSuccess=e}async submitData(e){const t=await fetch("https://ia-petabox.archive.org/services/donations/braintree-charge.php?debug=true",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(e)});return new Se(await t.json())}donationSuccessful(e){const{successResponse:t,upsellSuccessResponse:a}=e;let n=`${t.paymentProvider} ${t.donationType} $${t.amount}, transaction ${t.transaction_id}`;a&&(n+=` + monthly upsell $${a.amount}`),this.onSuccess(n)}}class Xt{constructor(e){this.onEvent=e}sendPing(e){this.onEvent(`ping ${JSON.stringify(e)}`)}sendEvent(e){this.onEvent(`${e.category} / ${e.action} / ${e.label??""}`)}sendEventNoSampling(e){this.onEvent(`${e.category} / ${e.action} / ${e.label??""} (unsampled)`)}}const Qt=[{label:"Base font size",cssVariable:"--ia-donation-form-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{section:"Color",label:"Text",cssVariable:"--ia-donation-form-text-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Step badge",cssVariable:"--ia-donation-form-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Selected option",cssVariable:"--ia-donation-form-selected-option-background-color",defaultValue:"#f9bf3b",inputType:"color"},{section:"Color",label:"Donate button",cssVariable:"--ia-donation-form-donate-button-color",defaultValue:"#31a481",inputType:"color"},{section:"Font",label:"Label font size",cssVariable:"--ia-donation-field-label-font-size",defaultValue:14,inputType:"range",min:10,max:24,step:1,unit:"px"},{section:"Font",label:"Label color",cssVariable:"--ia-donation-field-label-color",defaultValue:"#2c2c2c",inputType:"color"},{section:"Font",label:"Field font size",cssVariable:"--ia-donation-contact-field-font-size",defaultValue:14,inputType:"range",min:10,max:24,step:1,unit:"px"},{section:"Font",label:"Field color",cssVariable:"--ia-donation-form-input-font-color",defaultValue:"#2c2c2c",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-form-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donate page"}],presetsInline:!0}],eo=[{label:"Frequency choice",propertyName:"frequencySelectionMode",defaultValue:"button",inputType:"radio",radioOptions:["button","checkbox"]},{label:"Amount layout",propertyName:"amountSelectionLayout",defaultValue:"multi-line",inputType:"radio",radioOptions:["multi-line","single-line"]},{label:"Donor email",propertyName:"donorEmail",defaultValue:""},{label:"Referrer",propertyName:"referrer",defaultValue:"elements-demo"}];let k=class extends I{constructor(){super(...arguments),this.sandboxConnected=!1,this.lastAnalyticsEvent="",this.lastSuccess="",this.endpointManager=new Wt(o=>{this.lastSuccess=o}),this.analyticsHandler=new Xt(o=>{this.lastAnalyticsEvent=o})}createRenderRoot(){return this}firstUpdated(){this.controller.modalManager=this.modalManager,this.controller.recaptchaElement=this.recaptchaElement,this.controller.analyticsHandler=this.analyticsHandler}render(){const o=this.sandboxConnected;return d`
      <style>
        ia-donation-form-controller-story ia-donation-form-controller {
          display: block;
          max-width: 34rem;
        }

        ia-donation-form-controller-story #recaptcha {
          position: absolute;
          z-index: 10;
        }

        /* The modal manager covers the page whenever it is in the DOM, so
           only show it while a modal is open */
        ia-donation-form-controller-story modal-manager {
          display: none;
          --modalBottomMargin: 10px;
          --modalWidth: 320px;
        }

        ia-donation-form-controller-story modal-manager[mode='open'] {
          display: block;
        }

        ia-donation-form-controller-story .dev-tools h4 {
          margin: 0 0 0.25rem;
        }

        ia-donation-form-controller-story .dev-tools .row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        ia-donation-form-controller-story .dev-tools dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          gap: 0.25rem 1rem;
        }

        ia-donation-form-controller-story .dev-tools dt {
          font-family: monospace;
        }

        ia-donation-form-controller-story .dev-tools dd {
          margin: 0;
          word-break: break-word;
        }

        ia-donation-form-controller-story .note {
          margin: 0.75rem 0 0;
          font-size: 0.85em;
          opacity: 0.8;
        }
      </style>

      <story-template
        elementTag="ia-donation-form-controller"
        elementClassName="IADonationFormController"
        importPath="ia-donation-form/ia-donation-form-controller"
        .defaultUsageProps=${'environment="dev"\n  braintreeAuthToken="${braintreeToken}"\n  recaptchaSiteKey="${recaptchaSiteKey}"\n  .endpointManager=${endpointManager}\n  .modalManager=${modalManager}\n  .recaptchaElement=${recaptchaElement}'}
        .styleInputData=${{settings:Qt,revertable:!0}}
        .propInputData=${{settings:eo}}
      >
        <ia-donation-form-controller
          slot="demo"
          referrer="elements-demo"
          .environment=${o?q.Development:void 0}
          .braintreeAuthToken=${o?he.braintreeAuthToken:void 0}
          .recaptchaSiteKey=${o?he.recaptchaSiteKey:void 0}
          .venmoProfileId=${o?he.venmoProfileId:void 0}
          .endpointManager=${this.endpointManager}
        ></ia-donation-form-controller>

        <div slot="settings" class="dev-tools">
          <h4>Braintree sandbox</h4>
          ${o?d`
                <p class="note">
                  Connected. Nothing is charged. Test card
                  <code>4111 1111 1111 1111</code>, any future expiry, any CVV.
                </p>
                <h4>Modals</h4>
                <div class="row">
                  <button type="button" @click=${this.showUpsell}>
                    Upsell
                  </button>
                  <button type="button" @click=${this.showPayPalUpsell}>
                    PayPal upsell
                  </button>
                  <button
                    type="button"
                    @click=${()=>this.showConfirmation(y.OneTime)}
                  >
                    Confirm one-time
                  </button>
                  <button
                    type="button"
                    @click=${()=>this.showConfirmation(y.Upsell)}
                  >
                    Confirm upsell
                  </button>
                </div>
              `:d`
                <div class="row">
                  <button
                    type="button"
                    id="connect-sandbox"
                    @click=${()=>{this.sandboxConnected=!0}}
                  >
                    Connect to the sandbox
                  </button>
                </div>
                <p class="note">
                  Loads the Braintree, PayPal, Google Pay and reCAPTCHA scripts
                  and turns on the payment buttons.
                </p>
              `}
          <h4>Events</h4>
          <dl>
            <dt>analytics</dt>
            <dd>${this.lastAnalyticsEvent||d`<i>none yet</i>`}</dd>
            <dt>donationSuccessful</dt>
            <dd>${this.lastSuccess||d`<i>none yet</i>`}</dd>
          </dl>
        </div>
      </story-template>

      <div id="recaptcha"></div>

      <modal-manager>
        <!-- The PayPal button can't live in a shadow root, so it's slotted from here -->
        <div slot="paypal-upsell-button">
          <div id="paypal-upsell-button"></div>
        </div>
      </modal-manager>
    `}showUpsell(){this.controller.showUpsellModalDev({oneTimeAmount:this.controller.donationInfo.amount,ctaMode:A.YesButton,yesSelected:o=>{this.lastSuccess=`upsell yes: $${o}`,this.modalManager.closeModal()},noSelected:()=>this.modalManager.closeModal()})}showPayPalUpsell(){this.controller.showUpsellModalDev({oneTimeAmount:this.controller.donationInfo.amount,ctaMode:A.PayPalUpsellSlot,noSelected:()=>this.modalManager.closeModal()})}showConfirmation(o){this.controller.showConfirmationStepDev({donationType:o,amount:o===y.Upsell?8:33,currencyType:"USD",cancelDonationCB:()=>{this.lastSuccess="confirmation cancelled",this.modalManager.closeModal()},confirmDonationCB:()=>{this.lastSuccess="confirmation confirmed",this.modalManager.closeModal()}})}};L([$()],k.prototype,"sandboxConnected",2);L([$()],k.prototype,"lastAnalyticsEvent",2);L([$()],k.prototype,"lastSuccess",2);L([c("ia-donation-form-controller")],k.prototype,"controller",2);L([c("modal-manager")],k.prototype,"modalManager",2);L([c("#recaptcha")],k.prototype,"recaptchaElement",2);k=L([F("ia-donation-form-controller-story")],k);export{k as IADonationFormControllerStory};
