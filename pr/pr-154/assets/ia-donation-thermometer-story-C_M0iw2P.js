import{i,b as s,c as p}from"./index-DpQoML9j.js";import"./story-template-B-AFmlzJ.js";var m=Object.getOwnPropertyDescriptor,d=(t,o,u,l)=>{for(var e=l>1?void 0:l?m(o,u):o,a=t.length-1,r;a>=0;a--)(r=t[a])&&(e=r(e)||e);return e};const c=[{label:"Height",cssVariable:"--ia-donation-thermometer-height",defaultValue:20,inputType:"range",min:10,max:60,unit:"px"},{label:"Border",cssVariable:"--ia-donation-thermometer-border",defaultValue:"1px solid #23765d",inputType:"text",presets:[{label:"None",value:"0",note:"donation banner"}],presetsInline:!0},{label:"Border radius",cssVariable:"--ia-donation-thermometer-border-radius",defaultValue:"9999px",inputType:"text",presets:[{label:"Square",value:"0"}],presetsInline:!0},{label:"Goal padding",cssVariable:"--ia-donation-thermometer-goal-padding",defaultValue:"0 10px",inputType:"text",presets:[{label:"Banner",value:"0 0.5rem",note:"donation banner"}],presetsInline:!0},{section:"Color",label:"Fill",cssVariable:"--ia-donation-thermometer-fill-color",defaultValue:"#23765d",inputType:"color"},{section:"Color",label:"Track",cssVariable:"--ia-donation-thermometer-track-color",defaultValue:"#b8f5e2",inputType:"color"},{section:"Color",label:"Value on fill",cssVariable:"--ia-donation-thermometer-value-on-fill-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Value on track",cssVariable:"--ia-donation-thermometer-value-on-track-color",defaultValue:"#23765d",inputType:"color"},{section:"Color",label:"Goal text",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"}],b=[{label:"Current amount",propertyName:"currentAmount",defaultValue:235e4,inputType:"number"},{label:"Goal amount",propertyName:"goalAmount",defaultValue:65e5,inputType:"number"},{label:"Show current amount",propertyName:"currentAmountMode",defaultValue:"on",inputType:"radio",radioOptions:["on","off"]},{label:"Goal text",propertyName:"goalMessageMode",defaultValue:"amount",inputType:"radio",radioOptions:["amount","message","off"]},{label:"Accessible label",propertyName:"label",defaultValue:"Donation progress"},{section:"Goal messages",label:"Near goal",propertyName:"goalNearMessage",defaultValue:"We’ve almost reached our goal!"},{section:"Goal messages",label:"Goal reached",propertyName:"goalReachedMessage",defaultValue:"We’ve reached our goal!"}];let n=class extends i{render(){return s`
      <story-template
        elementTag="ia-donation-thermometer"
        elementClassName="IADonationThermometer"
        .defaultUsageProps=${".currentAmount=${2_350_000} .goalAmount=${6_500_000}"}
        .styleInputData=${{settings:c,revertable:!0}}
        .propInputData=${{settings:b}}
      >
        <ia-donation-thermometer
          slot="demo"
          .currentAmount=${235e4}
          .goalAmount=${65e5}
        ></ia-donation-thermometer>
      </story-template>
    `}};n=d([p("ia-donation-thermometer-story")],n);export{n as IADonationThermometerStory};
