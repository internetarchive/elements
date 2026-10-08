import{i as o,b as c,a as b,r as p,c as d}from"./index-BTAXPDVy.js";import"./story-template-C6ly9hLK.js";import"./ia-clearable-text-input-rugLamg0.js";import"./localized-decorator-Be1Jx-O-.js";var m=Object.defineProperty,h=Object.getOwnPropertyDescriptor,r=(e,a,u,s)=>{for(var t=s>1?void 0:s?h(a,u):a,i=e.length-1,n;i>=0;i--)(n=e[i])&&(t=(s?n(a,u,t):n(t))||t);return s&&t&&m(a,u,t),t};const g=[{label:"Input height",cssVariable:"--input-height",defaultValue:"3rem",inputType:"text"},{label:"Border color",cssVariable:"--input-border-color",defaultValue:"#ccc",inputType:"color"},{label:"Border radius",cssVariable:"--input-border-radius",defaultValue:"2rem",inputType:"text"},{label:"Background color",cssVariable:"--input-background-color",defaultValue:"transparent",inputType:"color"},{label:"Text color",cssVariable:"--input-color",defaultValue:"#555",inputType:"color"},{label:"Focused border color",cssVariable:"--input-focused-border-color",defaultValue:"#66afe9",inputType:"color"}];let l=class extends o{constructor(){super(...arguments),this.lastInputResult="",this.lastClearResult="",this.lastSubmitResult=""}render(){return c`
      <story-template
        elementTag="ia-clearable-text-input"
        elementClassName="IaClearableTextInput"
        .styleInputData=${{settings:g}}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <ia-clearable-text-input
            .placeholder=${"Search..."}
            .screenReaderLabel=${"Search"}
            @clear=${this.onClear}
            @input=${this.onInput}
            @submit=${this.onSubmit}
          ></ia-clearable-text-input>
          <p>
            Current value (updated on each input event):
            <span id="input-result">${this.lastInputResult}</span>
          </p>
          <p ?hidden=${!this.lastClearResult}>
            Value before the last clear event:
            <span id="clear-result">${this.lastClearResult}</span>
          </p>
          <p ?hidden=${!this.lastSubmitResult}>
            Last submitted value:
            <span id="submit-result">${this.lastSubmitResult}</span>
          </p>
        </div>
      </story-template>
    `}get exampleUsage(){return`
      <ia-clearable-text-input
        .placeholder=\${'Search...'}
        .screenReaderLabel=\${'Search'}
        @clear=\${(e: CustomEvent<string>) => console.log(e.detail)}
        @submit=\${(e: CustomEvent<string>) => console.log(e.detail)}
      ></ia-clearable-text-input>
    `.replace(/\n {6}/g,`
`)}onClear(e){this.lastClearResult=e.detail}onInput(e){this.lastInputResult=e.target.value}onSubmit(e){this.lastSubmitResult=e.detail}static get styles(){return b`
      p {
        margin: 0.8rem 0 0;
      }
    `}};r([p()],l.prototype,"lastInputResult",2);r([p()],l.prototype,"lastClearResult",2);r([p()],l.prototype,"lastSubmitResult",2);l=r([d("ia-clearable-text-input-story")],l);export{l as IAClearableTextInputStory};
