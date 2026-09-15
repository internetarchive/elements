import{i as p,b as o,a as c,r as u,t as b}from"./index-BENjAyBI.js";import"./ia-donation-edit-donation-CYaJpeAc.js";import"./story-template-DkKPLDhG.js";import"./query-B-NGWz9Q.js";import"./runtime-CCgtQBty.js";import"./ia-donation-section-WDF58LNa.js";var m=Object.defineProperty,f=Object.getOwnPropertyDescriptor,s=(t,a,l,n)=>{for(var e=n>1?void 0:n?f(a,l):a,r=t.length-1,d;r>=0;r--)(d=t[r])&&(e=(n?d(a,l,e):d(e))||e);return n&&e&&m(a,l,e),e};const h=[{label:"Base font size",cssVariable:"--ia-donation-edit-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{label:"Button gap",cssVariable:"--ia-donation-edit-button-grid-gap",defaultValue:"10px",inputType:"text"},{section:"Color",label:"Button",cssVariable:"--ia-donation-edit-button-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Button text",cssVariable:"--ia-donation-edit-button-font-color",defaultValue:"#000000",inputType:"color"},{section:"Color",label:"Button border",cssVariable:"--ia-donation-edit-button-border-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Selected button",cssVariable:"--ia-donation-edit-button-selected-color",defaultValue:"#f9bf3b",inputType:"color",presets:[{label:"Banner green",value:"#31a481",note:"donation banner"}],presetsInline:!0},{section:"Color",label:"Selected button text",cssVariable:"--ia-donation-edit-button-selected-font-color",defaultValue:"#000000",inputType:"color"},{section:"Color",label:"Step badge",cssVariable:"--ia-donation-edit-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-edit-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donation form"}],presetsInline:!0}],y=[{label:"Selected amount",propertyName:"defaultSelectedAmount",defaultValue:10,inputType:"number"},{label:"Step numbers",propertyName:"stepNumberMode",defaultValue:"shownumbers",inputType:"radio",radioOptions:["shownumbers","hidenumbers"]},{label:"Frequency choice",propertyName:"frequencySelectionMode",defaultValue:"button",inputType:"radio",radioOptions:["button","checkbox","hide"]},{label:"Amount layout",propertyName:"amountSelectionLayout",defaultValue:"multi-line",inputType:"radio",radioOptions:["multi-line","single-line"]},{label:"Custom amount",propertyName:"customAmountMode",defaultValue:"display",inputType:"radio",radioOptions:["display","hide"]},{label:"Cover fees checkbox",propertyName:"coverFeesCheckboxMode",defaultValue:"display",inputType:"radio",radioOptions:["display","hide"]},{label:"Amount headline",propertyName:"amountTitleDisplayMode",defaultValue:"default",inputType:"radio",radioOptions:["default","slot"]}];let i=class extends p{render(){return o`
      <story-template
        elementTag="ia-donation-edit-donation"
        elementClassName="IADonationEditDonation"
        importPath="ia-donation-form/form-elements/ia-donation-edit-donation"
        .defaultUsageProps=${"@donationInfoChanged=${(e: CustomEvent) => console.log(e.detail.donationInfo)}"}
        .styleInputData=${{settings:h,revertable:!0}}
        .propInputData=${{settings:y}}
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
              ${this.lastChange?o`${this.lastChange.donationType},
                    $${this.lastChange.amount}${this.lastChange.coverFees?o` + $${this.lastChange.fee} fee`:""}
                    = <b>$${this.lastChange.total}</b>`:o`<i>none yet</i>`}
            </dd>
            <dt>editDonationError</dt>
            <dd>${this.lastError??o`<i>none</i>`}</dd>
          </dl>
        </div>
      </story-template>
    `}handleChanged(t){this.lastChange=t.detail.donationInfo,this.lastError=void 0}handleError(t){this.lastError=t.detail.error}static get styles(){return c`
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
    `}};s([u()],i.prototype,"lastChange",2);s([u()],i.prototype,"lastError",2);i=s([b("ia-donation-edit-donation-story")],i);export{i as IADonationEditDonationStory};
