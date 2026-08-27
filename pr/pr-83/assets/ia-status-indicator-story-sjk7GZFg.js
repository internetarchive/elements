import{i as c,b as n,t as u}from"./index-CSI5RELv.js";import"./ia-status-indicator-YpIzN9rB.js";import"./story-template-n9MNkuxb.js";import"./runtime-CCgtQBty.js";var p=Object.getOwnPropertyDescriptor,d=(a,r,i,l)=>{for(var e=l>1?void 0:l?p(r,i):r,t=a.length-1,o;t>=0;t--)(o=a[t])&&(e=o(e)||e);return e};const m=[{label:"Width",cssVariable:"--ia-theme-icon-width",defaultValue:"1.25rem"},{label:"Color - loading",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Color - success",cssVariable:"--ia-theme-color-success",defaultValue:"#31a481",inputType:"color"},{label:"Color - error",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"}],y=[{label:"Mode",propertyName:"mode",defaultValue:"loading",inputType:"radio",radioOptions:["ready","loading","success","error"]},{label:"Accessible title - loading",propertyName:"loadingTitle",defaultValue:"Loading..."},{label:"Loading style",propertyName:"loadingStyle",defaultValue:"ring-dots",inputType:"radio",radioOptions:["ring-dots","ring"]},{label:"Accessible title - success",propertyName:"successTitle",defaultValue:"Success"},{label:"Accessible title - error",propertyName:"errorTitle",defaultValue:"Error"}];let s=class extends c{render(){return n`
      <story-template
        elementTag="ia-status-indicator"
        elementClassName="IAStatusIndicator"
        .styleInputData=${{settings:m}}
        .propInputData=${{settings:y}}
      >
        <ia-status-indicator slot="demo"></ia-status-indicator>
      </story-template>
    `}};s=d([u("ia-status-indicator-story")],s);export{s as IAStatusIndicatorStory};
