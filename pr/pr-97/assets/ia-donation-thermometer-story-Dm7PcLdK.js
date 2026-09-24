import{r as p,n as s,c as g,i as f,A as d,b as h,a as v}from"./index-BsSdrZpf.js";import{e as b}from"./query-DsSm1Enc.js";import{m as u,s as y}from"./runtime-CCgtQBty.js";import{t as V}from"./story-template-CbGFmvBQ.js";var M=Object.defineProperty,x=Object.getOwnPropertyDescriptor,l=(e,t,r,i)=>{for(var o=i>1?void 0:i?x(t,r):t,n=e.length-1,m;n>=0;n--)(m=e[n])&&(o=(i?m(t,r,o):m(o))||o);return i&&o&&M(t,r,o),o};let a=class extends f{constructor(){super(...arguments),this.goalMessageMode="amount",this.goalNearMessage=u("We’ve almost reached our goal!"),this.goalReachedMessage=u("We’ve reached our goal!"),this.label=u("Donation progress"),this.goalAmount=75e5,this.currentAmountMode="on",this.currentAmount=0,this.thermometerValueWidth=0,this.thermometerFillWidth=0,this.observedFillElement=null,this.observedValueElement=null}render(){return h`
      <div class="thermometer-message-container">
        <div class="thermometer-container">
          <div
            class="thermometer-background ${this.thermometerValuePosition}"
            style="--fill-end--: ${this.percentComplete}%"
            role="progressbar"
            aria-label="${this.label}"
            aria-valuemin="0"
            aria-valuemax="${this.progressMax}"
            aria-valuenow="${this.progressValue}"
            aria-valuetext="${this.currentAmountDisplayValue}"
          >
            <div class="thermometer-clip">
              <div class="thermometer-fill"></div>
            </div>
            ${this.thermometerValueTemplate}
          </div>
        </div>
        ${this.goalMessageMode!=="off"?h`<div class="donate-goal">${this.currentGoalMessage}</div>`:d}
      </div>
    `}get thermometerValueTemplate(){return this.currentAmountMode==="off"?d:h`
          <div class="thermometer-value">${this.currentAmountDisplayValue}</div>
        `}get thermometerValuePosition(){return this.thermometerValueWidth+10<this.thermometerFillWidth?"value-left":"value-right"}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.observeParts()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,this.observedFillElement=null,this.observedValueElement=null}updated(){this.observeParts()}observeParts(){const e=this.resizeObserver;e&&(this.observedFillElement=this.observeInPlaceOf(e,this.observedFillElement,this.thermometerFill??null),this.observedValueElement=this.observeInPlaceOf(e,this.observedValueElement,this.thermometerValue??null))}observeInPlaceOf(e,t,r){return r===t?t:(t&&e.unobserve(t),r&&e.observe(r),r)}handleResize(e){for(const t of e){const r=t.borderBoxSize?.[0]?.inlineSize??t.contentRect.width;t.target===this.observedFillElement?this.thermometerFillWidth=r:t.target===this.observedValueElement&&(this.thermometerValueWidth=r)}}get goalMessage(){return this.currentAmount>=this.goalAmount?this.goalReachedMessage:this.goalNearMessage}get currentAmountDisplayValue(){return this.formatNumber(this.currentAmount)}get goalAmountDisplayValue(){return this.formatNumber(this.goalAmount)}formatNumber(e){if(!Number.isFinite(e)||e===0)return"$0";const t="MM",i=e/1e6;return`$${i<10?Math.round((i+Number.EPSILON)*10)/10:Math.round(i)}${t}`}get currentGoalMessage(){switch(this.goalMessageMode){case"amount":return u(y`${this.goalAmountDisplayValue} goal`);case"message":return this.goalMessage;case"off":return""}}get progressMax(){return Number.isFinite(this.goalAmount)&&this.goalAmount>0?this.goalAmount:0}get progressValue(){return Number.isFinite(this.currentAmount)?Math.min(Math.max(this.currentAmount,0),this.progressMax):0}get percentComplete(){const e=this.progressMax;if(e===0||!Number.isFinite(this.currentAmount))return 0;const t=this.currentAmount/e*100;return Math.min(Math.max(t,0),100)}static get styles(){return[V,v`
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
          box-sizing: border-box;
          position: relative;
          background-color: var(--donation-thermometer-track-color--);
          height: 100%;
          border-radius: var(--donation-thermometer-border-radius--);
          border: var(--donation-thermometer-border--);
        }

        /*
         * Clips the square-ended fill to the rounded track. It covers only the
         * fill, so the label is never cut off by it.
         */
        .thermometer-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: var(--donation-thermometer-border-radius--);
        }

        .thermometer-fill {
          background-color: var(--donation-thermometer-fill-color--);
          height: 100%;
          /*
           * The fallback matters: without it a missing --fill-end-- makes the
           * declaration invalid, width resolves to auto, and the bar paints as
           * a fully funded fundraiser.
           */
          width: var(--fill-end--, 0%);
        }

        /*
         * The label is placed by offset from the end of the fill, so it is one
         * node in one position in the DOM whichever side it shows on, and it
         * never counts towards the width of the fill it is measured against.
         */
        .thermometer-value {
          position: absolute;
          top: 0;
          bottom: 0;
          left: var(--fill-end--, 0%);
          /*
           * Without this, the left offset caps the shrink-to-fit width of a
           * translated label and it collapses to its padding.
           */
          width: max-content;
          display: flex;
          align-items: center;
          font-weight: bold;
          white-space: nowrap;
        }

        /*
         * Both paddings total 1.5rem, so changing sides leaves the label the
         * same width and cannot feed back into the side it is placed on.
         */
        .value-left .thermometer-value {
          transform: translateX(-100%);
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
      `]}};l([s({type:String})],a.prototype,"goalMessageMode",2);l([s({type:String})],a.prototype,"goalNearMessage",2);l([s({type:String})],a.prototype,"goalReachedMessage",2);l([s({type:String})],a.prototype,"label",2);l([s({type:Number})],a.prototype,"goalAmount",2);l([s({type:String})],a.prototype,"currentAmountMode",2);l([s({type:Number})],a.prototype,"currentAmount",2);l([b(".thermometer-value")],a.prototype,"thermometerValue",2);l([b(".thermometer-fill")],a.prototype,"thermometerFill",2);l([p()],a.prototype,"thermometerValueWidth",2);l([p()],a.prototype,"thermometerFillWidth",2);a=l([g("ia-donation-thermometer")],a);var A=Object.getOwnPropertyDescriptor,w=(e,t,r,i)=>{for(var o=i>1?void 0:i?A(t,r):t,n=e.length-1,m;n>=0;n--)(m=e[n])&&(o=m(o)||o);return o};const N=[{label:"Height",cssVariable:"--ia-donation-thermometer-height",defaultValue:20,inputType:"range",min:10,max:60,unit:"px"},{label:"Border",cssVariable:"--ia-donation-thermometer-border",defaultValue:"1px solid #23765d",inputType:"text",presets:[{label:"None",value:"0",note:"donation banner"}],presetsInline:!0},{label:"Border radius",cssVariable:"--ia-donation-thermometer-border-radius",defaultValue:"9999px",inputType:"text",presets:[{label:"Square",value:"0"}],presetsInline:!0},{label:"Goal padding",cssVariable:"--ia-donation-thermometer-goal-padding",defaultValue:"0 10px",inputType:"text",presets:[{label:"Banner",value:"0 0.5rem",note:"donation banner"}],presetsInline:!0},{section:"Color",label:"Fill",cssVariable:"--ia-donation-thermometer-fill-color",defaultValue:"#23765d",inputType:"color"},{section:"Color",label:"Track",cssVariable:"--ia-donation-thermometer-track-color",defaultValue:"#b8f5e2",inputType:"color"},{section:"Color",label:"Value on fill",cssVariable:"--ia-donation-thermometer-value-on-fill-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Value on track",cssVariable:"--ia-donation-thermometer-value-on-track-color",defaultValue:"#23765d",inputType:"color"},{section:"Color",label:"Goal text",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"}],$=[{label:"Current amount",propertyName:"currentAmount",defaultValue:235e4,inputType:"number"},{label:"Goal amount",propertyName:"goalAmount",defaultValue:65e5,inputType:"number"},{label:"Show current amount",propertyName:"currentAmountMode",defaultValue:"on",inputType:"radio",radioOptions:["on","off"]},{label:"Goal text",propertyName:"goalMessageMode",defaultValue:"amount",inputType:"radio",radioOptions:["amount","message","off"]},{label:"Accessible label",propertyName:"label",defaultValue:"Donation progress"},{section:"Goal messages",label:"Near goal",propertyName:"goalNearMessage",defaultValue:"We’ve almost reached our goal!"},{section:"Goal messages",label:"Goal reached",propertyName:"goalReachedMessage",defaultValue:"We’ve reached our goal!"}];let c=class extends f{render(){return h`
      <story-template
        elementTag="ia-donation-thermometer"
        elementClassName="IADonationThermometer"
        .defaultUsageProps=${".currentAmount=${2_350_000} .goalAmount=${6_500_000}"}
        .styleInputData=${{settings:N,revertable:!0}}
        .propInputData=${{settings:$}}
      >
        <ia-donation-thermometer
          slot="demo"
          .currentAmount=${235e4}
          .goalAmount=${65e5}
        ></ia-donation-thermometer>
      </story-template>
    `}};c=w([g("ia-donation-thermometer-story")],c);export{c as IADonationThermometerStory};
