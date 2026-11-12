import{r as h,n as v,e as u,c as f,i as g,b as r,m as p,A as y,a as b}from"./index-CltZBY7d.js";import{M as x}from"./modal-config-Ckbblf-F.js";import{U as L,a as w,S}from"./sample-lists-backend-VOrfOYT8.js";import{l as $}from"./localized-decorator-Csk4q9BM.js";import{t as T}from"./theme-styles-oGbLh6Gt.js";import"./ia-button-CdKWUyrS.js";import"./ia-status-indicator-CRehaJHK.js";import"./modal-manager-6NzB_EDj.js";import"./story-template-DYrYw8fj.js";import"./search-type-CZG-0Jk4.js";import"./mediatype-web-BsB95giC.js";import"./syntax-highlighter-BvUVexyk.js";var E=Object.defineProperty,F=Object.getOwnPropertyDescriptor,l=(e,t,s,a)=>{for(var i=a>1?void 0:a?F(t,s):t,n=e.length-1,d;n>=0;n--)(d=e[n])&&(i=(a?d(t,s,i):d(i))||i);return a&&i&&E(t,s,i),i};let o=class extends g{constructor(){super(...arguments),this.autoFocusListName=!0,this.saving=!1,this.saveFailed=!1}willUpdate(e){e.has("userList")&&(this.saveFailed=!1)}firstUpdated(){this.autoFocusListName&&setTimeout(()=>this.listName.focus())}updated(e){e.has("userList")&&this.fillForm()}async saveListDetails(e){e.preventDefault(),this.saving=!0,this.saveFailed=!1,this.dispatchEvent(new Event("userListSaving"));const t=this.userList?.id;try{const s=await this.saveList(t,this.readFormValues());if(!s.success)throw s.error;this.handleSaveSuccess(s.success,t)}catch(s){this.handleSaveError(s,t)}}emitCloseModalEvent(e){e.preventDefault(),this.dispatchEvent(new Event("listModalClosed"))}saveList(e,t){if(!this.userListsService)throw new Error("ia-userlist-settings has no userListsService");return e?this.userListsService.updateList(e,t):this.userListsService.createList(t)}handleSaveSuccess(e,t){t||this.form.reset(),this.saving=!1,this.dispatchEvent(new CustomEvent("userListSaved",{detail:e}))}handleSaveError(e,t){this.dispatchEvent(new CustomEvent("userListError",{detail:{error:e}})),console.log("error",e),this.saving=!1,this.saveFailed=!0,this.reportError(e,t)}reportError(e,t){navigator.onLine&&window.Sentry?.captureException(e,{tags:{component:"ia-userlist-settings",operation:t?"update":"create"},extra:{listId:t,reason:e instanceof L?e.reason:void 0}})}readFormValues(){return{list_name:this.listName.value,description:this.listDescription.value,is_private:this.listPrivate.checked}}fillForm(){this.listId.value=this.userList?.id??"",this.listName.value=this.userList?.list_name??"",this.listDescription.value=this.userList?.description??"",this.listPrivate.checked=this.userList?.is_private??!1}render(){return r`
      <section class="new-list">
        <form id="user-list-form" part="form" @submit=${this.saveListDetails}>
          ${this.nameFieldTemplate} ${this.descriptionFieldTemplate}
          ${this.privateFieldTemplate} ${this.errorTemplate}
          ${this.footerTemplate}
        </form>
      </section>
    `}get nameFieldTemplate(){return r`<div class="field">
      <input type="hidden" id="id" />
      <label for="name">${p("List name*")}</label>
      <input type="text" id="name" required />
    </div>`}get descriptionFieldTemplate(){return r`<div class="field">
      <label for="description">${p("Description")}</label>
      <textarea id="description"></textarea>
    </div>`}get privateFieldTemplate(){return r`<div class="field">
      <label for="private">${p("Private list")}</label>
      <input type="checkbox" id="private" />
    </div>`}get errorTemplate(){return r`<p class="error" part="error" role="alert">
      ${this.saveFailed?p("The list could not be saved. Please try again."):y}
    </p>`}get footerTemplate(){return r`<div class="footer field">
      <ia-button
        mode="secondary"
        id="cancel"
        part="cancel-button"
        @click=${this.emitCloseModalEvent}
      >
        ${p("Cancel")}
      </ia-button>
      <ia-button
        mode="primary"
        type="submit"
        id="save-list-settings"
        part="save-button"
        .disabled=${this.saving}
      >
        ${this.saving?r`<ia-status-indicator></ia-status-indicator>`:p("Save")}
      </ia-button>
    </div>`}static get styles(){return[T,b`
        :host {
          --secondary-cta-border--: var(--secondary-cta-border);
          --color-danger--: var(--color-danger);
          --primary-cta-fill--: var(--primary-cta-fill);
          --ia-userlist-settings-width--: var(
            --ia-userlist-settings-width,
            400px
          );

          width: var(--ia-userlist-settings-width--);
          max-width: 100%;
          box-sizing: border-box;
          display: block;
          container-type: inline-size;
          padding: 15px 0 0 0;
          position: relative;
          font-size: 14px;
        }

        .field {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }

        label {
          flex: 0 0 90px;
          text-align: left;
          margin-right: 10px;
          font-weight: 700;
        }

        input[type='text'],
        textarea {
          line-height: 20px;
          padding: 5px;
          /* Fill the row beside the label, at any form width */
          flex: 1 1 auto;
          min-width: 0;
          box-sizing: border-box;
          font-family: inherit;
          font-size: inherit;
          resize: none;
          border-style: solid;
          border-radius: 4px;
          border-width: 1px;
          border-color: var(--secondary-cta-border--);
        }

        /* Inside the border, so the form's edges can't cut it off */
        input[type='text']:focus,
        textarea:focus {
          outline-width: 2px;
          outline-style: solid;
          outline-color: var(--primary-cta-fill--);
          outline-offset: -2px;
        }

        input[type='checkbox'] {
          cursor: pointer;
          margin: 0;
        }

        label[for='private'] {
          cursor: pointer;
        }

        .error {
          margin: 0;
          color: var(--color-danger--);
        }

        /* The saving indicator takes the Save button's text color */
        #save-list-settings ia-status-indicator {
          --ia-theme-primary-text-color: currentColor;
        }

        .footer {
          flex-wrap: wrap;
          gap: 10px;
          margin: 10px 0 0 0;
          /* Line up with the fields, past the label column */
          padding-left: 100px;
        }

        /* Too narrow for a label column: labels go above their fields */
        @container (max-width: 320px) {
          .field:not(.footer) {
            flex-wrap: wrap;
            gap: 5px;
          }

          label {
            flex-basis: 100%;
            margin-right: 0;
          }

          .footer {
            padding-left: 0;
          }
        }
      `]}};l([v({type:Object})],o.prototype,"userList",2);l([v({type:Object})],o.prototype,"userListsService",2);l([v({type:Boolean})],o.prototype,"autoFocusListName",2);l([h()],o.prototype,"saving",2);l([h()],o.prototype,"saveFailed",2);l([u("#user-list-form")],o.prototype,"form",2);l([u("#id")],o.prototype,"listId",2);l([u("#name")],o.prototype,"listName",2);l([u("#description")],o.prototype,"listDescription",2);l([u("#private")],o.prototype,"listPrivate",2);o=l([f("ia-userlist-settings"),$()],o);var k=Object.defineProperty,M=Object.getOwnPropertyDescriptor,m=(e,t,s,a)=>{for(var i=a>1?void 0:a?M(t,s):t,n=e.length-1,d;n>=0;n--)(d=e[n])&&(i=(a?d(t,s,i):d(i))||i);return a&&i&&k(t,s,i),i};const C=[{label:"Form width",cssVariable:"--ia-userlist-settings-width",defaultValue:"400px",inputType:"text"},{label:"Text color",cssVariable:"--ia-theme-primary-text-color",defaultValue:"#2c2c2c",inputType:"color"},{label:"Font family",cssVariable:"--ia-theme-base-font-family",defaultValue:"'Helvetica Neue', Helvetica, Arial, sans-serif",inputType:"text"},{label:"Input border color",cssVariable:"--ia-theme-secondary-cta-border",defaultValue:"#999999",inputType:"color"},{label:"Error message color",cssVariable:"--ia-theme-color-danger",defaultValue:"#e51c23",inputType:"color"},{label:"Save button fill",cssVariable:"--ia-theme-primary-cta-fill",defaultValue:"#194880",inputType:"color"},{label:"Save button text color",cssVariable:"--ia-theme-primary-cta-text-color",defaultValue:"#ffffff",inputType:"color"},{label:"Cancel button fill",cssVariable:"--ia-theme-secondary-cta-fill",defaultValue:"#333333",inputType:"color"},{label:"Cancel button text color",cssVariable:"--ia-theme-secondary-cta-text-color",defaultValue:"#ffffff",inputType:"color"}],_=6;class V{constructor(){this.failSaves=!1,this.backend=new S}async fetchApiResponse(t,s){return await new Promise(a=>setTimeout(a,500)),this.failSaves&&s?.method&&s.method!=="GET"?{success:!1,error:"Bad Request",value:"You have exceeded the maximum number of lists."}:this.backend.fetchApiResponse(t,s)}}let c=class extends g{constructor(){super(...arguments),this.existingList={id:"1",list_name:"Favorite books",description:"Books worth reading twice",is_private:!1},this.editing=!1,this.failSaves=!1,this.log=[],this.backend=new V,this.service=new w({fetchHandler:this.backend,searchService:{},userService:{}}),this.openModal=()=>{const e=new x({title:r`List settings`,headerColor:"#194880",showCloseButton:!0,showHeaderLogo:!1,closeOnBackdropClick:!0}),t=r`
      <ia-userlist-settings
        .userList=${this.editing?this.existingList:void 0}
        .userListsService=${this.service}
        @listModalClosed=${()=>{this.record("listModalClosed"),this.modalManager.closeModal()}}
        @userListSaving=${()=>this.record("userListSaving")}
        @userListSaved=${s=>{this.listSaved(s),this.modalManager.closeModal()}}
        @userListError=${s=>this.record(`userListError ${s.detail.error}`)}
      ></ia-userlist-settings>
    `;this.modalManager.showModal({config:e,customModalContent:t})},this.listSaved=e=>{if(this.record(`userListSaved ${JSON.stringify(e.detail)}`),this.editing){const{id:t,list_name:s,description:a,is_private:i}=e.detail;this.existingList={id:String(t),list_name:s,description:a,is_private:i}}}}render(){return r`
      <story-template
        elementTag="ia-userlist-settings"
        elementClassName="IAUserListSettings"
        .styleInputData=${{settings:C}}
        .customExampleUsage=${this.exampleUsage}
      >
        <div slot="demo">
          <modal-manager></modal-manager>
          <ia-userlist-settings
            .userList=${this.editing?this.existingList:void 0}
            .userListsService=${this.service}
            @listModalClosed=${()=>this.record("listModalClosed")}
            @userListSaving=${()=>this.record("userListSaving")}
            @userListSaved=${this.listSaved}
            @userListError=${e=>this.record(`userListError ${e.detail.error}`)}
          ></ia-userlist-settings>
        </div>

        <div slot="demo" class="panel">
          <div class="log-header">
            <strong>Events</strong>
            <button @click=${()=>this.log=[]}>Clear</button>
          </div>
          ${this.log.length===0?r`<p class="empty">Save or cancel to see events here.</p>`:r`<ol class="log">
                ${this.log.map(e=>r`<li><code>${e}</code></li>`)}
              </ol>`}
        </div>

        <div slot="settings">
          <fieldset>
            <legend>Form</legend>
            <label>
              <input
                type="radio"
                name="list"
                .checked=${!this.editing}
                @change=${()=>this.editing=!1}
              />
              New list (empty form)
            </label>
            <label>
              <input
                type="radio"
                name="list"
                .checked=${this.editing}
                @change=${()=>this.editing=!0}
              />
              Edit "${this.existingList.list_name}" (filled form)
            </label>
          </fieldset>
          <label>
            <input
              type="checkbox"
              .checked=${this.failSaves}
              @change=${e=>this.setFailSaves(e.target.checked)}
            />
            Make saves fail
          </label>
          <button class="open-modal" @click=${this.openModal}>
            Open in a modal
          </button>
        </div>

        <div slot="usage-notes">
          <p>
            The form for creating or editing a user list. The details page's
            Lists button and the profile page's lists tab show it inside a
            <code>modal-manager</code> modal, which supplies the "List settings"
            header and the close button. This demo shows the form on its own;
            "Open in a modal" in the settings shows it the way those pages do.
          </p>
          <p>
            Pass the list to edit as <code>userList</code> to fill the form, or
            leave it unset for an empty one to create a list. Save calls
            <code>updateList</code> when the list has an <code>id</code> and
            <code>createList</code> otherwise, on the
            <code>userListsService</code> it's handed: a
            <code>UserListsService</code> from
            <code>@internetarchive/elements/services/userlist-service</code>, or
            anything implementing <code>UserListsServiceInterface</code>. This
            demo hands it a real <code>UserListsService</code> on the service's
            sample backend, which answers in archive.org's shape and keeps lists
            in memory, so nothing is saved to archive.org. "Make saves fail"
            makes the backend refuse saves the way it refuses one over the list
            limit.
          </p>
          <p>
            Events: <code>userListSaving</code> when a save starts,
            <code>userListSaved</code> with the saved list as
            <code>detail</code>, <code>userListError</code> with the error in
            <code>detail.error</code>, and <code>listModalClosed</code> on
            Cancel. Save is disabled while a save is in progress. Saving a new
            list clears the form. A failed save shows an error message in the
            form, which clears on the next save or when
            <code>userList</code> changes; tick "Make saves fail" to see it.
            Failed saves are also reported to Sentry through
            <code>window.Sentry</code>, when the page has it, unless the browser
            is offline.
          </p>
          <p>
            Parts for styling: <code>form</code>, <code>error</code>,
            <code>cancel-button</code> and <code>save-button</code>.
          </p>
          <p>
            The List name field takes focus when the form renders. Set
            <code>.autoFocusListName=\${false}</code> to leave focus where it
            is.
          </p>
        </div>
      </story-template>
    `}get exampleUsage(){return`<ia-userlist-settings${this.editing?`
  .userList=\${${JSON.stringify(this.existingList)}}`:""}
  .userListsService=\${userListsService}
  @listModalClosed=\${closeModal}
  @userListSaved=\${(e) => listSaved(e.detail)}
  @userListError=\${(e) => showError(e.detail.error)}
></ia-userlist-settings>`}setFailSaves(e){this.failSaves=e,this.backend.failSaves=e}record(e){this.log=[e,...this.log].slice(0,_)}static get styles(){return b`
      /* offshoot's create-user-list modal, in px as archive.org's 10px root
         renders it */
      modal-manager {
        display: none;
        --modalTitleLineHeight: 45px;
        --modalTitleFontSize: 18px;
        --modalCloseButtonSize: 20px;
        --modalCloseButtonOffset: 12px;
        --modalHeaderBottomPadding: 0;
        --modalBottomPadding: 20px;
        --modalTopMargin: 50px;
        --modalBottomMargin: 25px;
        --modalWidth: 400px;
      }

      modal-manager[mode='open'] {
        display: block;
      }

      .open-modal {
        margin-top: 8px;
      }

      .panel {
        margin-top: 16px;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .log-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .log {
        margin: 8px 0 0;
        padding-left: 20px;
      }

      .log code {
        word-break: break-all;
      }

      .empty {
        margin: 8px 0 0;
        color: #666;
      }

      fieldset {
        margin-bottom: 8px;
      }

      label {
        display: block;
      }
    `}};m([h()],c.prototype,"existingList",2);m([h()],c.prototype,"editing",2);m([h()],c.prototype,"failSaves",2);m([h()],c.prototype,"log",2);m([u("modal-manager")],c.prototype,"modalManager",2);c=m([f("ia-userlist-settings-story")],c);export{c as IAUserListSettingsStory};
