import{i as u,b as i,c as s}from"./index-BrjT5jch.js";import"./ia-clearable-text-input-BUTF6bYL.js";import"./story-template-BxPTuijC.js";var p=Object.getOwnPropertyDescriptor,d=(a,l,n,r)=>{for(var e=r>1?void 0:r?p(l,n):l,t=a.length-1,o;t>=0;t--)(o=a[t])&&(e=o(e)||e);return e};const b=[{label:"Height",cssVariable:"--input-height",defaultValue:"3rem"},{label:"Text color",cssVariable:"--input-color",defaultValue:"#555555",inputType:"color"},{label:"Border color",cssVariable:"--input-border-color",defaultValue:"#cccccc",inputType:"color"},{label:"Border radius",cssVariable:"--input-border-radius",defaultValue:"2rem"},{label:"Font size",cssVariable:"--input-font-size",defaultValue:"1.7rem"},{label:"Clear icon background",cssVariable:"--clear-button-icon-background",defaultValue:"#2c2c2c",inputType:"color"},{label:"Clear icon color",cssVariable:"--clear-button-icon-color",defaultValue:"#ffffff",inputType:"color"}],f=[{label:"Value",propertyName:"value",defaultValue:""},{label:"Placeholder",propertyName:"placeholder",defaultValue:"Search..."},{label:"Screen reader label",propertyName:"screenReaderLabel",defaultValue:"Search the archive"},{label:"Clear button screen reader label",propertyName:"clearButtonScreenReaderLabel",defaultValue:"Clear"},{label:"Focus the field after clearing",propertyName:"focusOnClear",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Always show the clear button",propertyName:"forceClearButton",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let c=class extends u{render(){return i`
      <story-template
        elementTag="ia-clearable-text-input"
        elementClassName="IaClearableTextInput"
        .styleInputData=${{settings:b}}
        .propInputData=${{settings:f}}
      >
        <ia-clearable-text-input slot="demo"></ia-clearable-text-input>
        <div slot="usage-notes">
          <p>
            A text field with a clear button that appears once there's something
            to clear. Set <code>forceClearButton</code> to keep the button
            visible even when the field is empty.
          </p>
          <p>
            Emits <code>input</code> on every value change, including when the
            clear button empties the field, <code>clear</code> carrying the
            value the field held beforehand, and <code>submit</code> carrying
            the current value when Enter is pressed.
          </p>
          <p>
            <code>screenReaderLabel</code> is what labels the field, so it needs
            setting for the component to be accessible.
          </p>
        </div>
      </story-template>
    `}};c=d([s("ia-clearable-text-input-story")],c);export{c as IaClearableTextInputStory};
