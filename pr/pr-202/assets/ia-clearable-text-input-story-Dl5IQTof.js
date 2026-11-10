import{i,b as u,c as s}from"./index-DUUDOYVI.js";import"./ia-clearable-text-input-tPnD5jba.js";import"./story-template-88GwqVYB.js";import"./site-C52OdI-w.js";/* empty css             */import"./theme-styles-h1-4TUhD.js";import"./syntax-highlighter-DWynePcO.js";var p=Object.getOwnPropertyDescriptor,d=(a,l,c,r)=>{for(var e=r>1?void 0:r?p(l,c):l,t=a.length-1,o;t>=0;t--)(o=a[t])&&(e=o(e)||e);return e};const b=[{label:"Height",cssVariable:"--input-height",defaultValue:"3rem"},{label:"Text color",cssVariable:"--input-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Border color",cssVariable:"--input-border-color",defaultValue:"#666666",inputType:"color"},{label:"Border radius",cssVariable:"--input-border-radius",defaultValue:"999rem"},{label:"Font size",cssVariable:"--input-font-size",defaultValue:"1.7rem"},{label:"Clear icon background",cssVariable:"--clear-button-icon-background",defaultValue:"#2c2c2c",inputType:"color"},{label:"Clear icon color",cssVariable:"--clear-button-icon-color",defaultValue:"#ffffff",inputType:"color"}],f=[{label:"Value",propertyName:"value",defaultValue:""},{label:"Placeholder",propertyName:"placeholder",defaultValue:"Search..."},{label:"Screen reader label",propertyName:"screenReaderLabel",defaultValue:"Search the archive"},{label:"Clear button screen reader label",propertyName:"clearButtonScreenReaderLabel",defaultValue:"Clear"},{label:"Focus the field after clearing",propertyName:"focusOnClear",defaultValue:!0,inputType:"radio",radioOptions:[!0,!1]},{label:"Always show the clear button",propertyName:"forceClearButton",defaultValue:!1,inputType:"radio",radioOptions:[!0,!1]}];let n=class extends i{render(){return u`
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
    `}};n=d([s("ia-clearable-text-input-story")],n);export{n as IaClearableTextInputStory};
