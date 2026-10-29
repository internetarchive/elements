import{i as u,b as s,c as n}from"./index-ekEBLyBf.js";import"./ia-otp-input-BkhZmf4j.js";import"./story-template-lWtl5C_0.js";import"./site-D_llw0Pu.js";/* empty css             */import"./theme-styles-Btsj0lRb.js";import"./syntax-highlighter-VVq01ILn.js";var m=Object.getOwnPropertyDescriptor,d=(e,r,i,l)=>{for(var t=l>1?void 0:l?m(r,i):r,a=e.length-1,o;a>=0;a--)(o=e[a])&&(t=o(t)||t);return t};const c=[{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font size",cssVariable:"--ia-theme-font-size-lg",defaultValue:"3.6rem",inputType:"text"}],y=[{label:"Number of characters",propertyName:"numChars",defaultValue:6,inputType:"number"},{label:"Numeric only",propertyName:"numericOnly",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Prefill value",propertyName:"prefillValue",defaultValue:""},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let p=class extends u{render(){return s`
      <story-template
        elementTag="ia-otp-input"
        elementClassName="IAOTPInput"
        .defaultUsageProps=${"@codeSubmitted=${(e: CustomEvent) => {setTimeout(() => alert('Code submitted: ' + e.detail), 250);}}"}
        .styleInputData=${{settings:c}}
        .propInputData=${{settings:y}}
      >
        <ia-otp-input
          @codeSubmitted=${e=>{setTimeout(()=>alert("Code submitted: "+e.detail),250)}}
          slot="demo"
        ></ia-otp-input>
      </story-template>
    `}};p=d([n("ia-otp-input-story")],p);export{p as IAOTPInputStory};
