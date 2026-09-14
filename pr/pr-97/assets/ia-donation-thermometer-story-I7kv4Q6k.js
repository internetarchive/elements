import{r as p,n as s,t as g,i as v,A as u,b as d,a as f}from"./index-BAhY5o0J.js";import{e as b}from"./query-AablizEu.js";import{m as h,s as y}from"./runtime-CCgtQBty.js";import{t as V}from"./story-template-j9TQL7TP.js";var A=Object.defineProperty,x=Object.getOwnPropertyDescriptor,a=(t,e,n,l)=>{for(var r=l>1?void 0:l?x(e,n):e,i=t.length-1,m;i>=0;i--)(m=t[i])&&(r=(l?m(e,n,r):m(r))||r);return l&&r&&A(e,n,r),r};let o=class extends v{constructor(){super(...arguments),this.goalMessageMode="amount",this.goalNearMessage=h("We’ve almost reached our goal!"),this.goalReachedMessage=h("We’ve reached our goal!"),this.label=h("Donation progress"),this.goalAmount=75e5,this.currentAmountMode="on",this.currentAmount=0,this.thermometerValueWidth=0,this.thermometerFillWidth=0,this.observedValueElement=null}render(){return d`
      <div
        class="container"
        role="progressbar"
        aria-label=${this.label}
        aria-valuemin="0"
        aria-valuemax="${this.goalAmount}"
        aria-valuenow="${this.currentAmount}"
        aria-valuetext="${this.currentAmountDisplayValue}"
      >
        <div class="thermometer-message-container">
          <div class="thermometer-container">
            <div
              class="thermometer-background ${this.thermometerValuePosition}"
            >
              <div
                class="thermometer-fill"
                style="width: ${this.percentComplete}%"
              >
                ${this.thermometerValuePosition==="value-left"?this.thermometerValueTemplate:u}
              </div>
              ${this.thermometerValuePosition==="value-right"?this.thermometerValueTemplate:u}
            </div>
          </div>
          ${this.goalMessageMode!=="off"?d`<div class="donate-goal">${this.currentGoalMessage}</div>`:u}
        </div>
      </div>
    `}get thermometerValueTemplate(){return this.currentAmountMode==="off"?u:d`
          <div class="thermometer-value">${this.currentAmountDisplayValue}</div>
        `}get thermometerValuePosition(){return this.thermometerValueWidth+10<this.thermometerFillWidth?"value-left":"value-right"}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.observeParts()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,this.observedValueElement=null}updated(){this.observeParts()}observeParts(){const t=this.resizeObserver;if(!t)return;this.thermometerFill&&t.observe(this.thermometerFill);const e=this.thermometerValue??null;e!==this.observedValueElement&&(this.observedValueElement&&t.unobserve(this.observedValueElement),e&&t.observe(e),this.observedValueElement=e)}handleResize(t){for(const e of t){const n=e.borderBoxSize?.[0]?.inlineSize??e.contentRect.width;e.target===this.thermometerFill?this.thermometerFillWidth=n:e.target===this.observedValueElement&&(this.thermometerValueWidth=n)}}get goalMessage(){return this.currentAmount>=this.goalAmount?this.goalReachedMessage:this.goalNearMessage}get currentAmountDisplayValue(){return this.formatNumber(this.currentAmount)}get goalAmountDisplayValue(){return this.formatNumber(this.goalAmount)}formatNumber(t){if(t===0)return"$0";const e="MM",l=t/1e6;return`$${l<10?Math.round((l+Number.EPSILON)*10)/10:Math.round(l)}${e}`}get currentGoalMessage(){switch(this.goalMessageMode){case"amount":return h(y`${this.goalAmountDisplayValue} goal`);case"message":return this.goalMessage;case"off":return""}}get percentComplete(){return Math.min(this.currentAmount/this.goalAmount*100,100)}static get styles(){return[V,f`
        :host {
          --donation-thermometer-height--: var(
            --ia-donation-thermometer-height,
            20px
          );
          --donation-thermometer-fill-color--: var(
            --ia-donation-thermometer-fill-color,
            #23765d
          );
          --donation-thermometer-track-color--: var(
            --ia-donation-thermometer-track-color,
            #b8f5e2
          );
          --donation-thermometer-border--: var(
            --ia-donation-thermometer-border,
            1px solid var(--donation-thermometer-fill-color--)
          );
          /* Large enough to round any height into a pill */
          --donation-thermometer-border-radius--: var(
            --ia-donation-thermometer-border-radius,
            9999px
          );
          --donation-thermometer-value-on-fill-color--: var(
            --ia-donation-thermometer-value-on-fill-color,
            var(--true-white)
          );
          --donation-thermometer-value-on-track-color--: var(
            --ia-donation-thermometer-value-on-track-color,
            var(--donation-thermometer-fill-color--)
          );
          --donation-thermometer-goal-color--: var(--primary-text-color);
          --donation-thermometer-goal-padding--: var(
            --ia-donation-thermometer-goal-padding,
            0 10px
          );

          display: block;
          height: var(--donation-thermometer-height--);
        }

        .container {
          height: 100%;
        }

        .thermometer-message-container {
          height: 100%;
          display: flex;
          align-items: center;
        }

        .thermometer-container {
          height: 100%;
          flex: 1;
        }

        .thermometer-background {
          background-color: var(--donation-thermometer-track-color--);
          padding: 0;
          height: 100%;
          border-radius: var(--donation-thermometer-border-radius--);
          border: var(--donation-thermometer-border--);
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .thermometer-fill {
          background-color: var(--donation-thermometer-fill-color--);
          text-align: right;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .thermometer-value {
          font-weight: bold;
          white-space: nowrap;
        }

        .value-left .thermometer-value {
          color: var(--donation-thermometer-value-on-fill-color--);
          padding: 0 0.5rem 0 1rem;
        }

        .value-right .thermometer-value {
          color: var(--donation-thermometer-value-on-track-color--);
          padding: 0 1rem 0 0.5rem;
        }

        .donate-goal {
          text-align: left;
          padding: var(--donation-thermometer-goal-padding--);
          text-transform: uppercase;
          font-weight: bold;
          color: var(--donation-thermometer-goal-color--);
        }
      `]}};a([s({type:String})],o.prototype,"goalMessageMode",2);a([s({type:String})],o.prototype,"goalNearMessage",2);a([s({type:String})],o.prototype,"goalReachedMessage",2);a([s({type:String})],o.prototype,"label",2);a([s({type:Number})],o.prototype,"goalAmount",2);a([s({type:String})],o.prototype,"currentAmountMode",2);a([s({type:Number})],o.prototype,"currentAmount",2);a([b(".thermometer-value")],o.prototype,"thermometerValue",2);a([b(".thermometer-fill")],o.prototype,"thermometerFill",2);a([p()],o.prototype,"thermometerValueWidth",2);a([p()],o.prototype,"thermometerFillWidth",2);o=a([g("ia-donation-thermometer")],o);var M=Object.getOwnPropertyDescriptor,$=(t,e,n,l)=>{for(var r=l>1?void 0:l?M(e,n):e,i=t.length-1,m;i>=0;i--)(m=t[i])&&(r=m(r)||r);return r};const T=[{label:"Height",cssVariable:"--ia-donation-thermometer-height",defaultValue:20,inputType:"range",min:10,max:60,unit:"px"},{label:"Border",cssVariable:"--ia-donation-thermometer-border",defaultValue:"1px solid #23765d",inputType:"text",presets:[{label:"None",value:"0",note:"donation banner"}],presetsInline:!0},{label:"Border radius",cssVariable:"--ia-donation-thermometer-border-radius",defaultValue:"9999px",inputType:"text",presets:[{label:"Square",value:"0"}],presetsInline:!0},{label:"Goal padding",cssVariable:"--ia-donation-thermometer-goal-padding",defaultValue:"0 10px",inputType:"text",presets:[{label:"Banner",value:"0 0.5rem",note:"donation banner"}],presetsInline:!0},{section:"Color",label:"Fill",cssVariable:"--ia-donation-thermometer-fill-color",defaultValue:"#23765d",inputType:"color"},{section:"Color",label:"Track",cssVariable:"--ia-donation-thermometer-track-color",defaultValue:"#b8f5e2",inputType:"color"},{section:"Color",label:"Value on fill",cssVariable:"--ia-donation-thermometer-value-on-fill-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Value on track",cssVariable:"--ia-donation-thermometer-value-on-track-color",defaultValue:"#23765d",inputType:"color"},{section:"Color",label:"Goal text",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"}],N=[{label:"Current amount",propertyName:"currentAmount",defaultValue:235e4,inputType:"number"},{label:"Goal amount",propertyName:"goalAmount",defaultValue:65e5,inputType:"number"},{label:"Show current amount",propertyName:"currentAmountMode",defaultValue:"on",inputType:"radio",radioOptions:["on","off"]},{label:"Goal text",propertyName:"goalMessageMode",defaultValue:"amount",inputType:"radio",radioOptions:["amount","message","off"]},{label:"Accessible label",propertyName:"label",defaultValue:"Donation progress"},{section:"Goal messages",label:"Near goal",propertyName:"goalNearMessage",defaultValue:"We’ve almost reached our goal!"},{section:"Goal messages",label:"Goal reached",propertyName:"goalReachedMessage",defaultValue:"We’ve reached our goal!"}];let c=class extends v{render(){return d`
      <story-template
        elementTag="ia-donation-thermometer"
        elementClassName="IADonationThermometer"
        .defaultUsageProps=${".currentAmount=${2_350_000} .goalAmount=${6_500_000}"}
        .styleInputData=${{settings:T,revertable:!0}}
        .propInputData=${{settings:N}}
      >
        <ia-donation-thermometer
          slot="demo"
          .currentAmount=${235e4}
          .goalAmount=${65e5}
        ></ia-donation-thermometer>
      </story-template>
    `}};c=$([g("ia-donation-thermometer-story")],c);export{c as IADonationThermometerStory};
