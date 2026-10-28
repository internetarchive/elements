import{i as r,b as d,a as p,c}from"./index-DNtv3GEw.js";import"./ia-donation-section-DfW2FBaN.js";import"./story-template-Dk3ixofl.js";import"./site-CV8P5jsN.js";/* empty css             */import"./theme-styles-CAbue2Eo.js";import"./syntax-highlighter-ByUCtUh8.js";var u=Object.getOwnPropertyDescriptor,g=(a,o,l,n)=>{for(var e=n>1?void 0:n?u(o,l):o,t=a.length-1,i;t>=0;t--)(i=a[t])&&(e=i(e)||e);return e};const f=[{label:"Base font size",cssVariable:"--ia-donation-section-base-font-size",defaultValue:10,inputType:"range",min:8,max:16,step:1,unit:"px"},{section:"Color",label:"Badge",cssVariable:"--ia-donation-section-badge-background-color",defaultValue:"#333333",inputType:"color"},{section:"Color",label:"Badge text",cssVariable:"--ia-donation-section-badge-font-color",defaultValue:"#ffffff",inputType:"color"},{section:"Color",label:"Text",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{section:"Color",label:"Background",cssVariable:"--ia-donation-section-background-color",defaultValue:"transparent",inputType:"text",presets:[{label:"Mint",value:"#d1faed",note:"donation form"}],presetsInline:!0}],m=[{label:"Badge",propertyName:"sectionBadge",defaultValue:"1"},{label:"Headline",propertyName:"headline",defaultValue:"Choose a frequency"},{label:"Badge mode",propertyName:"badgeMode",defaultValue:"showbadge",inputType:"radio",radioOptions:["showbadge","hidebadge","hidebadgeleavespacing"]}];let s=class extends r{render(){return d`
      <story-template
        elementTag="ia-donation-section"
        elementClassName="IADonationSection"
        importPath="ia-donation-form/form-elements/ia-donation-section"
        .defaultUsageProps=${'sectionBadge="1" headline="Choose a frequency"'}
        .defaultSlottedContent=${"<p>Anything slotted in lands under the headline.</p>"}
        .styleInputData=${{settings:f,revertable:!0}}
        .propInputData=${{settings:m}}
      >
        <ia-donation-section
          slot="demo"
          sectionBadge="1"
          headline="Choose a frequency"
        >
          <p class="content">
            Anything slotted in lands under the headline. The badge and headline
            scale with the base font size, the slotted content keeps the page's
            own sizing.
          </p>
        </ia-donation-section>
      </story-template>
    `}static get styles(){return p`
      .content {
        margin: 0;
        font-size: 1.44rem;
      }
    `}};s=g([c("ia-donation-section-story")],s);export{s as IADonationSectionStory};
