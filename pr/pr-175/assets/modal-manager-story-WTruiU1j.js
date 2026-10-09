import{i as h,b as l,a as u,e as s,c as m}from"./index-BYZ6j-vZ.js";import{M as r}from"./modal-manager-DTraCG5e.js";import"./story-template-HnoAhT-4.js";import"./localized-decorator-CwGwRpBk.js";import"./icon-close-DEfgIgfd.js";import"./ia-status-indicator-QRBQ5Von.js";import"./masked-icon-DfRovw4p.js";var g=Object.defineProperty,b=Object.getOwnPropertyDescriptor,t=(e,a,n,i)=>{for(var d=i>1?void 0:i?b(a,n):a,c=e.length-1,p;c>=0;c--)(p=e[c])&&(d=(i?p(a,n,d):p(d))||d);return i&&d&&g(a,n,d),d};const w=[{label:"Backdrop color",cssVariable:"--modalBackdropColor",defaultValue:"rgba(10, 10, 10, 0.9)",inputType:"text"},{label:"Backdrop z-index",cssVariable:"--modalBackdropZindex",defaultValue:1e3,inputType:"number",min:0,step:1},{label:"Modal z-index",cssVariable:"--modalZindex",defaultValue:2e3,inputType:"number",min:0,step:1},{label:"Modal width",cssVariable:"--modalWidth",defaultValue:"32rem",inputType:"text"},{label:"Modal max width",cssVariable:"--modalMaxWidth",defaultValue:"95%",inputType:"text"},{label:"Corner radius",cssVariable:"--modalCornerRadius",defaultValue:"1rem",inputType:"text"},{label:"Border",cssVariable:"--modalBorder",defaultValue:"2px solid black",inputType:"text"},{label:"Top margin",cssVariable:"--modalTopMargin",defaultValue:"5rem",inputType:"text"},{label:"Header logo size",cssVariable:"--modalLogoSize",defaultValue:"6.5rem",inputType:"text"},{label:"Processing indicator size",cssVariable:"--processingImageSize",defaultValue:"7.5rem",inputType:"text"},{label:"Title font size",cssVariable:"--modalTitleFontSize",defaultValue:"1.8rem",inputType:"text"},{label:"Subtitle font size",cssVariable:"--modalSubtitleFontSize",defaultValue:"1.4rem",inputType:"text"},{label:"Headline font size",cssVariable:"--modalHeadlineFontSize",defaultValue:"1.6rem",inputType:"text"},{label:"Message font size",cssVariable:"--modalMessageFontSize",defaultValue:"1.4rem",inputType:"text"}],f=`<modal-manager></modal-manager>

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
<\/script>`;let o=class extends h{render(){return l`
      <story-template
        elementTag="modal-manager"
        elementClassName="IAModalManager"
        .customExampleUsage=${f}
        .styleInputData=${{settings:w}}
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
    `}};t([s("modal-manager")],o.prototype,"modalManager",2);t([s("#settings__title")],o.prototype,"titleInput",2);t([s("#settings__subtitle")],o.prototype,"subtitleInput",2);t([s("#settings__headline")],o.prototype,"headlineInput",2);t([s("#settings__message")],o.prototype,"messageInput",2);t([s("#settings__header-color")],o.prototype,"headerColorInput",2);t([s("#settings__body-color")],o.prototype,"bodyColorInput",2);t([s("#settings__show-header-logo")],o.prototype,"showHeaderLogoCheck",2);t([s("#settings__show-close-button")],o.prototype,"showCloseButtonCheck",2);t([s("#settings__close-on-backdrop")],o.prototype,"closeOnBackdropCheck",2);t([s("#settings__show-left-nav")],o.prototype,"showLeftNavCheck",2);t([s("#settings__left-nav-text")],o.prototype,"leftNavTextInput",2);t([s("#settings__show-processing")],o.prototype,"showProcessingCheck",2);t([s("#settings__processing-mode")],o.prototype,"processingModeSelect",2);t([s("#settings__custom-content")],o.prototype,"customContentCheck",2);o=t([m("modal-manager-story")],o);export{o as ModalManagerStory};
