import{i as h,b as l,a as u,e as s,c as m}from"./index-7XGT_3-R.js";import{M as c}from"./modal-config-Ckbblf-F.js";import"./modal-manager-DN1m3dZg.js";import"./story-template-CtJbg3Yh.js";import"./site-Dd4c3wYd.js";/* empty css             */import"./theme-styles-BmmUiRRg.js";import"./localized-decorator-H1hhi4ds.js";import"./ia-status-indicator-DNER3bpI.js";import"./mediatype-web-Cgyk8VqI.js";import"./syntax-highlighter-B_R_wjV7.js";var g=Object.defineProperty,b=Object.getOwnPropertyDescriptor,t=(e,a,n,i)=>{for(var d=i>1?void 0:i?b(a,n):a,r=e.length-1,p;r>=0;r--)(p=e[r])&&(d=(i?p(a,n,d):p(d))||d);return i&&d&&g(a,n,d),d};const w=[{label:"Backdrop color",cssVariable:"--modalBackdropColor",defaultValue:"rgb(0 0 0 / 0.5)",inputType:"text"},{label:"Backdrop z-index",cssVariable:"--modalBackdropZindex",defaultValue:1e3,inputType:"number",min:0,step:1},{label:"Modal z-index",cssVariable:"--modalZindex",defaultValue:2e3,inputType:"number",min:0,step:1},{label:"Modal width",cssVariable:"--modalWidth",defaultValue:"320px",inputType:"text"},{label:"Modal max width",cssVariable:"--modalMaxWidth",defaultValue:"95%",inputType:"text"},{label:"Corner radius",cssVariable:"--modalCornerRadius",defaultValue:"8px",inputType:"text"},{label:"Border",cssVariable:"--modalBorder",defaultValue:"2px solid #474747",inputType:"text"},{label:"Top margin",cssVariable:"--modalTopMargin",defaultValue:"40px",inputType:"text"},{label:"Header logo size",cssVariable:"--modalLogoSize",defaultValue:"65px",inputType:"text"},{label:"Processing indicator size",cssVariable:"--processingImageSize",defaultValue:"75px",inputType:"text"},{label:"Title font size",cssVariable:"--modalTitleFontSize",defaultValue:"16px",inputType:"text"},{label:"Subtitle font size",cssVariable:"--modalSubtitleFontSize",defaultValue:"14px",inputType:"text"},{label:"Headline font size",cssVariable:"--modalHeadlineFontSize",defaultValue:"16px",inputType:"text"},{label:"Message font size",cssVariable:"--modalMessageFontSize",defaultValue:"14px",inputType:"text"}],f=`<modal-manager></modal-manager>

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
    </tr>`}showConfiguredModal(){const e=i=>i?l`${i}`:void 0,a=new c({title:e(this.titleInput.value),subtitle:e(this.subtitleInput.value),headline:e(this.headlineInput.value),message:e(this.messageInput.value),headerColor:this.headerColorInput.value,bodyColor:this.bodyColorInput.value,showHeaderLogo:this.showHeaderLogoCheck.checked,showCloseButton:this.showCloseButtonCheck.checked,closeOnBackdropClick:this.closeOnBackdropCheck.checked,showLeftNavButton:this.showLeftNavCheck.checked,leftNavButtonText:this.leftNavTextInput.value,showProcessingIndicator:this.showProcessingCheck.checked,processingImageMode:this.processingModeSelect.value}),n=this.customContentCheck.checked?l`<div style="text-align: center; margin-top: 10px;">
          <button @click=${()=>alert("You pressed a button.")}>
            I'm a button to press
          </button>
        </div>`:void 0;this.modalManager.showModal({config:a,customModalContent:n,userPressedLeftNavButtonCallback:()=>this.modalManager.closeModal()})}showProcessingModal(){const e=new c({headerColor:"#497fbf",headline:l`Processing`,showProcessingIndicator:!0,processingImageMode:"processing",showCloseButton:!1,closeOnBackdropClick:!1});this.modalManager.showModal({config:e}),setTimeout(()=>{this.modalManager.showModal({config:new c({headline:l`Complete`,showProcessingIndicator:!0,processingImageMode:"complete"})})},1500)}showUnclosableModal(){const e=new c({message:l`The user can't close this. It closes itself in 2 seconds.`,showCloseButton:!1,closeOnBackdropClick:!1});this.modalManager.showModal({config:e}),setTimeout(()=>this.modalManager.closeModal(),2e3)}showCallbackModal(){this.modalManager.showModal({config:new c({message:l`When you close this modal another will open.`}),userClosedModalCallback:()=>{this.modalManager.showModal({config:new c({message:l`I'm another modal.`,headerColor:"#497fbf"})})}})}static get styles(){return u`
      modal-manager {
        display: none;
      }

      modal-manager[mode='open'] {
        display: block;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8rem;
      }

      td {
        padding: 0.24rem 0.8rem 0.24rem 0;
      }
    `}};t([s("modal-manager")],o.prototype,"modalManager",2);t([s("#settings__title")],o.prototype,"titleInput",2);t([s("#settings__subtitle")],o.prototype,"subtitleInput",2);t([s("#settings__headline")],o.prototype,"headlineInput",2);t([s("#settings__message")],o.prototype,"messageInput",2);t([s("#settings__header-color")],o.prototype,"headerColorInput",2);t([s("#settings__body-color")],o.prototype,"bodyColorInput",2);t([s("#settings__show-header-logo")],o.prototype,"showHeaderLogoCheck",2);t([s("#settings__show-close-button")],o.prototype,"showCloseButtonCheck",2);t([s("#settings__close-on-backdrop")],o.prototype,"closeOnBackdropCheck",2);t([s("#settings__show-left-nav")],o.prototype,"showLeftNavCheck",2);t([s("#settings__left-nav-text")],o.prototype,"leftNavTextInput",2);t([s("#settings__show-processing")],o.prototype,"showProcessingCheck",2);t([s("#settings__processing-mode")],o.prototype,"processingModeSelect",2);t([s("#settings__custom-content")],o.prototype,"customContentCheck",2);o=t([m("modal-manager-story")],o);export{o as ModalManagerStory};
