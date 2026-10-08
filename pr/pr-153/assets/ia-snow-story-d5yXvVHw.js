import{i as c,b as u,a as d,r as g,e as r,c as f}from"./index-DpQoML9j.js";import"./story-template-B-AFmlzJ.js";var w=Object.defineProperty,h=Object.getOwnPropertyDescriptor,e=(l,n,s,i)=>{for(var t=i>1?void 0:i?h(n,s):n,p=l.length-1,a;p>=0;p--)(a=l[p])&&(t=(i?a(n,s,t):a(t))||t);return i&&t&&w(n,s,t),t};let o=class extends c{render(){return u`
      <story-template
        elementTag="ia-snow"
        elementClassName="IASnow"
        .customExampleUsage=${this.exampleUsage}
        labs
      >
        <div slot="demo">
          <ia-snow .snowConfig=${this.config}></ia-snow>
        </div>

        <div slot="settings">
          <table>
            <tr>
              <td>Color</td>
              <td><input type="color" value="#4d94b2" id="color" /></td>
            </tr>
            <tr>
              <td>Count</td>
              <td><input type="number" value="50" id="count" /></td>
            </tr>
            <tr>
              <td>Wind</td>
              <td><input type="checkbox" checked id="wind" /></td>
            </tr>
            <tr>
              <td>Rotation</td>
              <td><input type="checkbox" checked id="rotation" /></td>
            </tr>
          </table>
          <button @click=${this.setupSnowflakes}>Apply</button>
        </div>
      </story-template>
    `}get exampleUsage(){return this.config?`
      <ia-snow .snowConfig=\${${this.configString}}></ia-snow>
    `:"<ia-snow></ia-snow>"}get configString(){return JSON.stringify(this.config,null,2)}get snowflakeConfig(){return{color:this.colorInput.value,count:Number(this.countInput.value),wind:this.windInput.checked,rotation:this.rotationInput.checked}}setupSnowflakes(){this.config=this.snowflakeConfig}static get styles(){return d`
      fieldset {
        margin-top: 16px;
      }
    `}};e([g()],o.prototype,"config",2);e([r("#count")],o.prototype,"countInput",2);e([r("#wind")],o.prototype,"windInput",2);e([r("#rotation")],o.prototype,"rotationInput",2);e([r("#color")],o.prototype,"colorInput",2);o=e([f("ia-snow-story")],o);export{o as IASnowStory};
