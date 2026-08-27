import{i as c,b as n,t as p}from"./index-UH9LTTFQ.js";import"./ia-status-indicator-C9bUpBT1.js";import"./story-template-DiM8sZ-z.js";import"./runtime-BjTmB3MQ.js";var u=Object.getOwnPropertyDescriptor,d=(a,r,s,l)=>{for(var e=l>1?void 0:l?u(r,s):r,t=a.length-1,o;t>=0;t--)(o=a[t])&&(e=o(e)||e);return e};const m=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],y=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Mediatype icon",propertyName:"mediatype",defaultValue:"none",inputType:"radio",radioOptions:["none","audio","collection","etree","images","search","software","texts","tv","video","web"]},{label:"Hide dots (bare ring)",propertyName:"hideDots",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let i=class extends c{render(){return n`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:m}}
        .propInputData=${{settings:y}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};i=d([p("ia-status-indicator-story")],i);export{i as IAStatusIndicatorStory};
