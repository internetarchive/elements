import{i as h,b as l,a as u,e as s,c as m}from"./index-CltZBY7d.js";import{M as r}from"./modal-config-Ckbblf-F.js";import"./modal-manager-6NzB_EDj.js";import"./story-template-DYrYw8fj.js";import"./localized-decorator-Csk4q9BM.js";import"./ia-status-indicator-CRehaJHK.js";import"./theme-styles-oGbLh6Gt.js";import"./mediatype-web-BsB95giC.js";import"./syntax-highlighter-BvUVexyk.js";var g=Object.defineProperty,b=Object.getOwnPropertyDescriptor,o=(e,a,n,i)=>{for(var d=i>1?void 0:i?b(a,n):a,c=e.length-1,p;c>=0;c--)(p=e[c])&&(d=(i?p(a,n,d):p(d))||d);return i&&d&&g(a,n,d),d};const f=[{label:"Backdrop color",cssVariable:"--modalBackdropColor",defaultValue:"rgba(10, 10, 10, 0.9)",inputType:"text"},{label:"Backdrop z-index",cssVariable:"--modalBackdropZindex",defaultValue:1e3,inputType:"number",min:0,step:1},{label:"Modal z-index",cssVariable:"--modalZindex",defaultValue:2e3,inputType:"number",min:0,step:1},{label:"Modal width",cssVariable:"--modalWidth",defaultValue:"32rem",inputType:"text"},{label:"Modal max width",cssVariable:"--modalMaxWidth",defaultValue:"95%",inputType:"text"},{label:"Corner radius",cssVariable:"--modalCornerRadius",defaultValue:"1rem",inputType:"text"},{label:"Border",cssVariable:"--modalBorder",defaultValue:"2px solid black",inputType:"text"},{label:"Top margin",cssVariable:"--modalTopMargin",defaultValue:"5rem",inputType:"text"},{label:"Header logo size",cssVariable:"--modalLogoSize",defaultValue:"6.5rem",inputType:"text"},{label:"Processing indicator size",cssVariable:"--processingImageSize",defaultValue:"7.5rem",inputType:"text"},{label:"Title font size",cssVariable:"--modalTitleFontSize",defaultValue:"1.8rem",inputType:"text"},{label:"Close button size",cssVariable:"--modalCloseButtonSize",defaultValue:"2rem",inputType:"text"},{label:"Close button distance from the corner",cssVariable:"--modalCloseButtonOffset",defaultValue:"1.2rem",inputType:"text"},{label:"Subtitle font size",cssVariable:"--modalSubtitleFontSize",defaultValue:"1.4rem",inputType:"text"},{label:"Headline font size",cssVariable:"--modalHeadlineFontSize",defaultValue:"1.6rem",inputType:"text"},{label:"Message font size",cssVariable:"--modalMessageFontSize",defaultValue:"1.4rem",inputType:"text"}],w=`<modal-manager></modal-manager>

<script type="module">
  import { ModalConfig } from '@internetarchive/elements/modal-manager/modal-config';

  const manager = document.querySelector('modal-manager');
  const config = new ModalConfig();
  config.headline = html\`Success\`;
  config.message = html\`Thank you for your support!\`;

  await manager.showModal({
    config,
    customModalContent: html\`<button>Optional content</button>\`,
    userClosedModalCallback: () => console.log('closed by the user'),
  });
  manager.closeModal();
<\/script>`;let t=class extends h{render(){return l`
      <story-template
        elementTag="modal-manager"
        elementClassName="IAModalManager"
        .customExampleUsage=${w}
        .styleInputData=${{settings:f}}
      >
        <div slot="demo">
          <modal-manager></modal-manager>
          <div class="actions">
            <button @click=${this.showConfiguredModal}>Show modal</button>
            <button @click=${this.showProcessingModal}>
              Processing, then complete
            </button>
            <button @click=${this.showUnclosableModal}>
              Unclosable (closes itself)
            </button>
            <button @click=${this.showCallbackModal}>
              Closed callback opens another
            </button>
          </div>
        </div>

        <form slot="settings" @submit=${e=>e.preventDefault()}>
          <table>
            ${this.textRow("title","Title","Donation Received")}
            ${this.textRow("subtitle","Subtitle","Thanks a bunch!")}
            ${this.textRow("headline","Headline","Success")}
            ${this.textRow("message","Message","Thank you for your support!")}
            ${this.textRow("header-color","Header color","#55a183")}
            ${this.textRow("body-color","Body color","#fbfbfd")}
            ${this.checkRow("show-header-logo","Show header logo",!0)}
            ${this.checkRow("show-close-button","Show close button",!0)}
            ${this.checkRow("close-on-backdrop","Close on backdrop click",!0)}
            ${this.checkRow("show-left-nav","Show left nav button",!1)}
            ${this.textRow("left-nav-text","Left nav button text","Back")}
            ${this.checkRow("show-processing","Show processing indicator",!1)}
            <tr>
              <td>
                <label for="settings__processing-mode">Indicator mode</label>
              </td>
              <td>
                <select id="settings__processing-mode">
                  <option value="complete">complete</option>
                  <option value="processing">processing</option>
                </select>
              </td>
            </tr>
            ${this.checkRow("custom-content","Custom modal content",!1)}
          </table>
          <p>Applied when you press "Show modal".</p>
        </form>

        <div slot="usage-notes">
          <code>modal-manager</code> is meant to be a single instance on the
          page, found by tag name. Open a modal with
          <code>showModal({ config })</code> and close it with
          <code>closeModal()</code>. It sets the <code>mode</code> attribute to
          <code>open</code> or <code>closed</code>, emits
          <code>modeChanged</code>, and adds the
          <code>modal-manager-open</code> class to the body while a modal is
          showing. The manager draws its backdrop even when closed, so hide it
          while <code>mode="closed"</code>, as this demo does.
        </div>
      </story-template>
    `}textRow(e,a,n){return l`<tr>
      <td><label for="settings__${e}">${a}</label></td>
      <td><input type="text" id="settings__${e}" value=${n} /></td>
    </tr>`}checkRow(e,a,n){return l`<tr>
      <td><label for="settings__${e}">${a}</label></td>
      <td>
        <input type="checkbox" id="settings__${e}" ?checked=${n} />
      </td>
    </tr>`}showConfiguredModal(){const e=i=>i?l`${i}`:void 0,a=new r({title:e(this.titleInput.value),subtitle:e(this.subtitleInput.value),headline:e(this.headlineInput.value),message:e(this.messageInput.value),headerColor:this.headerColorInput.value,bodyColor:this.bodyColorInput.value,showHeaderLogo:this.showHeaderLogoCheck.checked,showCloseButton:this.showCloseButtonCheck.checked,closeOnBackdropClick:this.closeOnBackdropCheck.checked,showLeftNavButton:this.showLeftNavCheck.checked,leftNavButtonText:this.leftNavTextInput.value,showProcessingIndicator:this.showProcessingCheck.checked,processingImageMode:this.processingModeSelect.value}),n=this.customContentCheck.checked?l`<div style="text-align: center; margin-top: 10px;">
          <button @click=${()=>alert("You pressed a button.")}>
            I'm a button to press
          </button>
        </div>`:void 0;this.modalManager.showModal({config:a,customModalContent:n,userPressedLeftNavButtonCallback:()=>this.modalManager.closeModal()})}showProcessingModal(){const e=new r({headerColor:"#497fbf",headline:l`Processing`,showProcessingIndicator:!0,processingImageMode:"processing",showCloseButton:!1,closeOnBackdropClick:!1});this.modalManager.showModal({config:e}),setTimeout(()=>{this.modalManager.showModal({config:new r({headline:l`Complete`,showProcessingIndicator:!0,processingImageMode:"complete"})})},1500)}showUnclosableModal(){const e=new r({message:l`The user can't close this. It closes itself in 2 seconds.`,showCloseButton:!1,closeOnBackdropClick:!1});this.modalManager.showModal({config:e}),setTimeout(()=>this.modalManager.closeModal(),2e3)}showCallbackModal(){this.modalManager.showModal({config:new r({message:l`When you close this modal another will open.`}),userClosedModalCallback:()=>{this.modalManager.showModal({config:new r({message:l`I'm another modal.`,headerColor:"#497fbf"})})}})}static get styles(){return u`
      modal-manager {
        display: none;
      }

      modal-manager[mode='open'] {
        display: block;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      td {
        padding: 0.15rem 0.5rem 0.15rem 0;
      }
    `}};o([s("modal-manager")],t.prototype,"modalManager",2);o([s("#settings__title")],t.prototype,"titleInput",2);o([s("#settings__subtitle")],t.prototype,"subtitleInput",2);o([s("#settings__headline")],t.prototype,"headlineInput",2);o([s("#settings__message")],t.prototype,"messageInput",2);o([s("#settings__header-color")],t.prototype,"headerColorInput",2);o([s("#settings__body-color")],t.prototype,"bodyColorInput",2);o([s("#settings__show-header-logo")],t.prototype,"showHeaderLogoCheck",2);o([s("#settings__show-close-button")],t.prototype,"showCloseButtonCheck",2);o([s("#settings__close-on-backdrop")],t.prototype,"closeOnBackdropCheck",2);o([s("#settings__show-left-nav")],t.prototype,"showLeftNavCheck",2);o([s("#settings__left-nav-text")],t.prototype,"leftNavTextInput",2);o([s("#settings__show-processing")],t.prototype,"showProcessingCheck",2);o([s("#settings__processing-mode")],t.prototype,"processingModeSelect",2);o([s("#settings__custom-content")],t.prototype,"customContentCheck",2);t=o([m("modal-manager-story")],t);export{t as ModalManagerStory};
