import{w as re,r as m,n as d,e as S,c as F,i as k,b as c,m as u,A as y,a as r,d as Z}from"./index-7XGT_3-R.js";import{S as se}from"./shared-resize-observer-BgPwZbAx.js";import{l as L}from"./localized-decorator-H1hhi4ds.js";import{t as N}from"./theme-styles-BmmUiRRg.js";import{o as ae}from"./query-assigned-elements-BEIscXbP.js";import{o as ne}from"./style-map-CuIU6V6r.js";import"./story-template-CtJbg3Yh.js";import"./site-Dd4c3wYd.js";/* empty css             */import"./syntax-highlighter-B_R_wjV7.js";const P=re`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,R=re`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;var de=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,h=(e,t,o,s)=>{for(var i=s>1?void 0:s?ce(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(s?n(t,o,i):n(i))||i);return s&&i&&de(t,o,i),i};let p=class extends k{constructor(){super(...arguments),this.displayMode="button",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return c`
      <div id="container">
        ${this.displayMode==="vote-prompt"?this.votePromptDisplay:this.singleButtonDisplay}
      </div>
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){super.disconnectedCallback(),this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){(e??this.resizeObserver)?.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted&&this.displayMode==="button"||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=window.innerWidth,s=window.innerHeight,i=o/2,a=s/2;e.left<i?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>o&&(this.popupTopX=o-t.width),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.cancel(e)}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get singleButtonDisplay(){return c`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText??u("Beta")}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${P}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${R}</span
        >
      </button>
      ${this.popupTemplate}
    `}get votePromptDisplay(){return c`
      <form
        @submit=${this.submit}
        ?disabled=${this.processing||this.voteSubmitted}
      >
        <div class="prompt">
          <span class="prompt-text">${this.promptText}</span>
          <label
            tabindex="0"
            role="button"
            aria-pressed=${this.upvoteSelected}
            @keyup=${this.upvoteKeypressed}
            class="vote-button upvote-button ${this.upvoteButtonClass}"
          >
            <input
              type="radio"
              name="vote"
              value="up"
              @click=${this.upvoteButtonSelected}
              ?checked=${this.upvoteSelected}
            />
            ${P}
          </label>

          <label
            tabindex="0"
            role="button"
            aria-pressed=${this.downvoteSelected}
            @keyup=${this.downvoteKeypressed}
            class="vote-button downvote-button ${this.downvoteButtonClass}"
          >
            <input
              type="radio"
              name="vote"
              value="down"
              @click=${this.downvoteButtonSelected}
              ?checked=${this.downvoteSelected}
            />
            ${R}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            ${u("Leave a comment")}
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `}get popupTemplate(){return c`
      <div
        id="popup-background"
        class=${this.isOpen?"open":"closed"}
        @click=${this.backgroundClicked}
        @keyup=${this.backgroundClicked}
      >
        <div
          id="popup"
          style="left: ${this.popupTopX}px; top: ${this.popupTopY}px"
        >
          <form
            @submit=${this.submit}
            id="form"
            ?disabled=${this.processing||this.voteSubmitted}
          >
            <div class="prompt">
              <div class="prompt-text">${this.promptText}</div>
              <label
                tabindex="0"
                role="button"
                aria-pressed=${this.upvoteSelected}
                @click=${this.upvoteButtonSelected}
                @keyup=${this.upvoteKeypressed}
                class="vote-button upvote-button ${this.upvoteButtonClass} ${this.chooseVoteErrorClass}"
              >
                <input
                  type="radio"
                  name="vote"
                  value="up"
                  @click=${this.upvoteButtonSelected}
                  ?checked=${this.upvoteSelected}
                />
                ${P}
              </label>

              <label
                tabindex="0"
                role="button"
                aria-pressed=${this.downvoteSelected}
                @click=${this.downvoteButtonSelected}
                @keyup=${this.downvoteKeypressed}
                class="vote-button downvote-button ${this.downvoteButtonClass} ${this.chooseVoteErrorClass}"
              >
                <input
                  type="radio"
                  name="vote"
                  value="down"
                  @click=${this.downvoteButtonSelected}
                  ?checked=${this.downvoteSelected}
                />
                ${R}
              </label>
            </div>
            <div>
              <textarea
                placeholder=${u("Comments (optional)")}
                id="comments"
                tabindex="0"
                ?disabled=${this.processing}
              ></textarea>
            </div>
            ${this.errorTemplate}
            <div id="actions">
              <button
                @click=${this.cancel}
                id="cancel-button"
                class="cta-button"
                tabindex="0"
                ?disabled=${this.processing}
              >
                ${u("Cancel")}
              </button>
              <input
                type="submit"
                id="submit-button"
                class="cta-button"
                .value=${this.processing?u("Submitting..."):u("Submit feedback")}
                tabindex="0"
                ?disabled=${this.processing}
              />
            </div>
          </form>
        </div>
      </div>
    `}get errorTemplate(){const{error:e}=this;if(!e)return y;const t=e.kind==="noVote"?u("Please select a vote."):u("There was an error submitting your feedback."),o=e.kind==="submitFailed"&&e.detail!==void 0?c`<br />${u("Error: ")}${e.detail}`:y;return c`<div id="error">${t}${o}</div>`}get promptText(){return this.prompt??u("Do you find this feature useful?")}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="up"?void 0:"up",this.handleButtonSelection())}downvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="down"?void 0:"down",this.handleButtonSelection())}async handleButtonSelection(){this.isOpen||(await this.setupRecaptcha(),this.submit())}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){e.target instanceof Node&&(this.popup?.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.voteSubmitted||this.resetState()}async submit(e){if(e?.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error={kind:"noVote"};return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");const t=this.isOpen;this.processing=!0;try{const o=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:o})).success?(this.voteSubmitted=!0,t&&this.closePopup()):this.error={kind:"submitFailed"}}catch(o){this.error={kind:"submitFailed",detail:o instanceof Error?o.message:String(o)}}this.processing=!1}static get styles(){const e=r`var(--featureFeedbackBlueColor, var(--ia-color-action-primary-fill--))`,t=r`var(--featureFeedbackDarkGrayColor, var(--ia-color-border-strong--))`,o=r`var(--defaultColorSvgFilter, invert(43%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(89%) contrast(88%))`,s=r`var(--featureFeedbackBackdropZindex, 5)`,i=r`var(--featureFeedbackModalZindex, 6)`,a=r`var(--featureFeedbackPopupBorderColor, ${e})`,n=r`var(--featureFeedbackSubmitButtonColor, ${e})`,v=r`var(--featureFeedbackBetaButtonBorderColor, ${e})`,C=r`var(--featureFeedbackBetaButtonTextColor, ${e})`,$=r`var(--featureFeedbackBetaButtonBackground, none)`,B=r`var(--featureFeedbackBetaButtonSvgFilter, ${o})`,T=r`var(--featureFeedbackCancelButtonColor, var(--ia-color-palette-gray-700--))`,E=r`var(--featureFeedbackPopupBlockerColor, var(--ia-color-surface-scrim--))`,V=r`var(--featureFeedbackPopupBackgroundColor, var(--ia-color-surface-sunken--))`,A=r`var(--featureFeedbackPromptFontWeight, bold)`,W=r`var(--featureFeedbackPromptFontSize, var(--ia-font-size-md--))`,_=r`var(--featureFeedbackCommentButtonFontWeight, normal)`,q=r`var(--featureFeedbackCommentButtonFontWeight, var(--ia-font-size-md--))`,U=r`var(--defaultColor, ${t});`,X=r`var(--defaultColorSvgFilter, ${o});`,O=r`var(--upvoteColor, var(--ia-color-status-success--));`,j=r`var(--upvoteColorSvgFilter, invert(32%) sepia(61%) saturate(448%) hue-rotate(113deg) brightness(99%) contrast(91%));`,Y=r`var(--downvoteColor, var(--ia-color-status-danger--));`,z=r`var(--downvoteColorSvgFilter, invert(10%) sepia(66%) saturate(7048%) hue-rotate(353deg) brightness(95%) contrast(90%));`,G=r`var(--unselectedColor, var(--ia-color-border-strong--));`,D=r`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return r`
      ${N}

      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: var(--ia-font-size-sm--);
        font-weight: bold;
        font-style: italic;
        color: ${C};
        background: ${$};
        border: var(--ia-size-border-width--) solid ${v};
        border-radius: var(--ia-radius-default--);
        padding: 1px var(--ia-space-1--);
      }

      .beta-button-thumb svg {
        height: var(--ia-size-icon-xs--);
        width: var(--ia-size-icon-xs--);
        filter: ${B};
      }

      .beta-button-thumb.unselected svg {
        filter: ${D};
      }

      #error {
        color: var(--ia-color-text-danger--);
        font-size: var(--ia-font-size-md--);
        text-align: center;
        font-weight: bold;
      }

      #popup-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${s};
        background-color: ${E};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        padding: var(--ia-space-2--);
        background-color: ${V};
        border: var(--ia-size-border-width--) ${a} solid;
        border-radius: var(--ia-radius-default--);
        box-shadow: var(--ia-shadow-overlay--);
        z-index: ${i};
        max-width: 300px;
        margin-left: var(--ia-space-2--);
        margin-right: var(--ia-space-2--);
      }

      button,
      input,
      a,
      textarea {
        font-family: inherit;
      }

      button,
      input[type='submit'] {
        background: none;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
      }

      button:disabled,
      input[type='submit']:disabled {
        cursor: default;
        opacity: 0.5;
      }

      #form > div {
        margin-bottom: var(--ia-space-2--);
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      .prompt {
        display: flex;
        align-items: center;
        font-size: ${W};
        font-weight: ${A};
      }

      .prompt > label {
        flex: none;
        cursor: pointer;
      }

      .prompt-text {
        text-align: left;
      }

      #comments {
        width: 100%;
        height: var(--ia-size-control-xl--);
        background-color: var(--ia-color-surface-raised--);
        border: var(--ia-size-border-width--) var(--ia-color-border-strong--)
          solid;
        border-radius: var(--ia-radius-default--);
        padding: var(--ia-space-1--);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        resize: none;
      }

      #comments::placeholder {
        color: var(--ia-color-text-secondary--);
      }

      #actions {
        display: flex;
        justify-content: center;
      }

      .cta-button {
        color: var(--ia-color-action-primary-text--);
        font-size: var(--ia-font-size-md--);
        border-radius: var(--ia-radius-default--);
        height: var(--ia-size-control-sm--);
        margin: 0;
      }

      #cancel-button {
        background-color: ${T};
      }

      #submit-button {
        background-color: ${n};
        margin-left: var(--ia-space-2--);
      }

      .vote-button {
        background-color: var(--ia-color-action-secondary-fill--);
        border: var(--ia-size-border-width--) solid
          var(--ia-color-action-secondary-border--);
        border-radius: var(--ia-radius-sm--);
        padding: 0;
        width: var(--ia-size-control-sm--);
        height: var(--ia-size-control-sm--);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: var(--ia-space-2--);
      }

      .vote-button svg {
        width: var(--ia-size-icon-sm--);
        height: var(--ia-size-icon-sm--);
      }

      .vote-button input {
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .vote-button.noselection {
        border-color: ${U};
      }

      .vote-button.noselection svg {
        filter: ${X};
      }

      .vote-button.unselected {
        border-color: ${G};
      }

      .vote-button.unselected svg {
        filter: ${D};
      }

      .upvote-button.selected {
        border-color: ${O};
      }

      .upvote-button.selected svg {
        filter: ${j};
      }

      .downvote-button.selected {
        border-color: ${Y};
      }

      .downvote-button.selected svg {
        filter: ${z};
      }

      .vote-button.error {
        box-shadow: 0 0 4px var(--ia-color-status-danger--);
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, var(--ia-color-text-link--));
        font-weight: ${_};
        font-size: ${q};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `}};h([d({type:String})],p.prototype,"featureIdentifier",2);h([d({type:String})],p.prototype,"prompt",2);h([d({type:String})],p.prototype,"buttonText",2);h([d({type:String})],p.prototype,"displayMode",2);h([d({type:Object})],p.prototype,"recaptchaManager",2);h([d({type:Object})],p.prototype,"resizeObserver",2);h([d({type:Boolean})],p.prototype,"disabled",2);h([d({type:Object})],p.prototype,"featureFeedbackService",2);h([m()],p.prototype,"isOpen",2);h([m()],p.prototype,"processing",2);h([m()],p.prototype,"popupTopX",2);h([m()],p.prototype,"popupTopY",2);h([m()],p.prototype,"vote",2);h([m()],p.prototype,"voteSubmitted",2);h([m()],p.prototype,"error",2);h([m()],p.prototype,"voteNeedsChoosing",2);h([m()],p.prototype,"recaptchaWidget",2);h([S("#container")],p.prototype,"container",2);h([S("#popup")],p.prototype,"popup",2);h([S("#comments")],p.prototype,"comments",2);p=h([F("ia-feature-feedback"),L()],p);function J(e){return"disabled"in e&&typeof e.disabled=="boolean"}function le(e){return"numbered"in e&&typeof e.numbered=="boolean"}function ue(e){return"validate"in e&&typeof e.validate=="function"}function pe(e){return"response"in e&&typeof e.response=="object"&&e.response!==null&&"name"in e.response&&typeof e.response.name=="string"}class he extends Error{}async function Q(e,t,o="Operation timed out"){const s=new Promise((i,a)=>setTimeout(a,t,new he(o)));return Promise.race([e,s])}var be=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,x=(e,t,o,s)=>{for(var i=s>1?void 0:s?ve(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(s?n(t,o,i):n(i))||i);return s&&i&&be(t,o,i),i};let g=class extends k{constructor(){super(),this.prompt="",this.value="",this.required=!1,this.disabled=!1,this.skipNumber=!1,this.visible=!0,this.internals=this.attachInternals()}static get DEFAULT_PLACEHOLDER_REQUIRED(){return u("Comments")}static get DEFAULT_PLACEHOLDER_OPTIONAL(){return u("Comments (optional)")}render(){return c`
      <div id="container">
        ${this.promptTextTemplate}${this.commentBoxTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||!!this.commentBox.value?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},u("A comment is required.")),this.internals.reportValidity()}get numbered(){return!this.skipNumber}get response(){return{name:this.prompt,comment:this.value}}get promptTextTemplate(){if(!this.prompt)return y;const e=this.numbered?c`<slot name="question-number"></slot>`:y;return c`<div id="prompt-text">${e}${this.prompt}</div>`}get commentBoxTemplate(){const e=this.required?g.DEFAULT_PLACEHOLDER_REQUIRED:g.DEFAULT_PLACEHOLDER_OPTIONAL,t=this.placeholder??e;return c`
      <textarea
        id="comments"
        tabindex="0"
        placeholder=${t}
        aria-labelledby="prompt-text"
        aria-required=${this.required}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.commentChanged}
      ></textarea>
    `}commentChanged(){this.disabled||(this.value=this.commentBox.value,this.value&&this.internals.setValidity({}),this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=r`var(--commentHeight, var(--ia-size-control-xl--))`,t=r`var(--commentResize, none)`,o=r`var(--surveyQuestionMargin, 0 0 var(--ia-space-3--) 0)`,s=r`var(--featureFeedbackPromptFontWeight, bold)`,i=r`var(--featureFeedbackPromptFontSize, var(--ia-font-size-md--))`;return r`
      ${N}

      #container {
        margin: ${o};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: var(--ia-space-1--);
        flex-grow: 1;
        font-size: ${i};
        font-weight: ${s};
      }

      #comments {
        width: 100%;
        height: ${e};
        background-color: var(--ia-color-surface-raised--);
        border: var(--ia-size-border-width--) var(--ia-color-border-strong--)
          solid;
        border-radius: var(--ia-radius-default--);
        padding: var(--ia-space-1--);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: inherit;
        resize: ${t};
      }

      #comments::placeholder {
        color: var(--ia-color-text-secondary--);
      }

      :host(:invalid) #comments {
        box-shadow: 0 0 4px var(--ia-color-status-danger--);
      }
    `}};g.formAssociated=!0;g.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};x([d({type:String})],g.prototype,"prompt",2);x([d({type:String})],g.prototype,"value",2);x([d({type:Boolean,reflect:!0})],g.prototype,"required",2);x([d({type:Boolean,reflect:!0})],g.prototype,"disabled",2);x([d({type:Boolean,reflect:!0})],g.prototype,"skipNumber",2);x([d({type:String})],g.prototype,"placeholder",2);x([S("#comments")],g.prototype,"commentBox",2);g=x([F("ia-feature-feedback-survey-comment"),L()],g);var me=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,w=(e,t,o,s)=>{for(var i=s>1?void 0:s?fe(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(s?n(t,o,i):n(i))||i);return s&&i&&me(t,o,i),i};let f=class extends k{constructor(){super(),this.prompt="",this.vote=void 0,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.showComments=!1,this.visible=!0,this.internals=this.attachInternals()}static get UPVOTE_SR_LABEL(){return u("Vote up")}static get DOWNVOTE_SR_LABEL(){return u("Vote down")}render(){return c`
      <div id="container">
        <div
          id="prompt-row"
          role="radiogroup"
          aria-labelledby="prompt-text"
          aria-required=${this.required}
          aria-disabled=${this.disabled}
        >
          ${this.promptTextTemplate}${this.voteButtonsTemplate}
        </div>
        ${this.commentFieldTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.vote?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A vote is required."),this.internals.checkValidity()}get numbered(){return!this.skipNumber}get response(){return{...this.commentBox?.response,name:this.prompt,rating:this.vote}}get promptTextTemplate(){if(!this.prompt)return y;const e=this.numbered?c`<slot name="question-number"></slot>`:y;return c`<div id="prompt-text">${e}${this.prompt}</div>`}get voteButtonsTemplate(){const e=this.vote==="up",t=this.vote==="down",s={"vote-button":!0,noselection:this.vote===void 0},i=Z({...s,selected:e,unselected:t}),a=Z({...s,selected:t,unselected:e});return c`
      <label
        id="upvote"
        class=${i}
        ?disabled=${this.disabled}
      >
        <input
          type="radio"
          name="vote"
          value="up"
          ?checked=${e}
          ?disabled=${this.disabled}
          @click=${this.upvoteButtonSelected}
          @keydown=${this.upvoteKeyPressed}
        />
        ${P}
        <span class="sr-only"
          >${f.UPVOTE_SR_LABEL}</span
        >
      </label>

      <label
        id="downvote"
        class=${a}
        ?disabled=${this.disabled}
      >
        <input
          type="radio"
          name="vote"
          value="down"
          ?checked=${t}
          ?disabled=${this.disabled}
          @click=${this.downvoteButtonSelected}
          @keydown=${this.downvoteKeyPressed}
        />
        ${R}
        <span class="sr-only"
          >${f.DOWNVOTE_SR_LABEL}</span
        >
      </label>
    `}get commentFieldTemplate(){return this.showComments?c`
      <ia-feature-feedback-survey-comment
        id="comments"
        skipNumber
        .value=${this.comment??""}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-feature-feedback-survey-comment>
    `:y}upvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.handleVoteButtonSelection("up")}downvoteButtonSelected(){this.handleVoteButtonSelection("down")}handleVoteButtonSelection(e){this.disabled||(this.vote=e,this.internals.setValidity({}),this.emitResponseChangedEvent())}commentChanged(e){e.stopPropagation(),!this.disabled&&(this.comment=this.commentBox?.value,this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=r`var(--surveyQuestionMargin, 0 0 var(--ia-space-3--) 0)`,t=r`var(--featureFeedbackDarkGrayColor, var(--ia-color-border-strong--))`,o=r`var(--defaultColorSvgFilter, invert(43%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(89%) contrast(88%))`,s=r`var(--defaultColor, ${t})`,i=r`var(--defaultColorSvgFilter, ${o})`,a=r`var(--upvoteColor, var(--ia-color-status-success--))`,n=r`var(--upvoteColorSvgFilter, invert(32%) sepia(61%) saturate(448%) hue-rotate(113deg) brightness(99%) contrast(91%))`,v=r`var(--downvoteColor, var(--ia-color-status-danger--))`,C=r`var(--downvoteColorSvgFilter, invert(10%) sepia(66%) saturate(7048%) hue-rotate(353deg) brightness(95%) contrast(90%))`,$=r`var(--unselectedColor, var(--ia-color-border-strong--))`,B=r`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`,T=r`var(--featureFeedbackPromptFontWeight, bold)`,E=r`var(--featureFeedbackPromptFontSize, var(--ia-font-size-md--))`;return r`
      ${N}

      #container {
        margin: ${e};
      }

      #prompt-row {
        display: flex;
        align-items: center;
        margin-bottom: var(--ia-space-1--);
      }

      #prompt-text {
        text-align: left;
        flex-grow: 1;
        font-size: ${E};
        font-weight: ${T};
      }

      .vote-button {
        background-color: var(--ia-color-action-secondary-fill--);
        border: var(--ia-size-border-width--) solid
          var(--ia-color-action-secondary-border--);
        border-radius: var(--ia-radius-sm--);
        margin-left: var(--ia-space-2--);
        padding: 0;
        width: var(--ia-size-control-sm--);
        height: var(--ia-size-control-sm--);
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        cursor: pointer;
      }

      .vote-button:focus-within {
        outline: var(--ia-size-focus-ring--) solid
          var(--ia-color-border-focus--);
        outline-offset: var(--ia-size-focus-ring-offset--);
      }

      .vote-button svg {
        width: var(--ia-size-icon-sm--);
        height: var(--ia-size-icon-sm--);
      }

      .vote-button input {
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .vote-button.noselection {
        border-color: ${s};
      }

      .vote-button.noselection svg {
        filter: ${i};
      }

      .vote-button.unselected {
        border-color: ${$};
      }

      .vote-button.unselected svg {
        filter: ${B};
      }

      #upvote.selected {
        border-color: ${a};
      }

      #upvote.selected svg {
        filter: ${n};
      }

      #downvote.selected {
        border-color: ${v};
      }

      #downvote.selected svg {
        filter: ${C};
      }

      .vote-button.error {
        box-shadow: 0 0 4px var(--ia-color-status-danger--);
      }

      .vote-button.noselection[disabled],
      .vote-button.unselected[disabled] {
        border-color: ${$};
        cursor: not-allowed;
      }

      .vote-button.noselection[disabled] svg,
      .vote-button.unselected[disabled] svg {
        filter: ${B};
      }

      :host(:invalid) #upvote,
      :host(:invalid) #downvote {
        box-shadow: 0 0 4px var(--ia-color-status-danger--);
      }

      #comments {
        --surveyQuestionMargin: 0;
      }

      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        user-select: none !important;
      }
    `}};f.formAssociated=!0;f.shadowRootOptions={...k.shadowRootOptions,delegatesFocus:!0};w([d({type:String})],f.prototype,"prompt",2);w([d({type:String})],f.prototype,"vote",2);w([d({type:String})],f.prototype,"comment",2);w([d({type:String})],f.prototype,"commentPlaceholder",2);w([d({type:Boolean,reflect:!0})],f.prototype,"required",2);w([d({type:Boolean,reflect:!0})],f.prototype,"disabled",2);w([d({type:Boolean,reflect:!0})],f.prototype,"skipNumber",2);w([d({type:Boolean,reflect:!0})],f.prototype,"showComments",2);w([S("#comments")],f.prototype,"commentBox",2);f=w([F("ia-feature-feedback-survey-vote"),L()],f);var ge=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,H=(e,t,o,s)=>{for(var i=s>1?void 0:s?ye(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(s?n(t,o,i):n(i))||i);return s&&i&&ge(t,o,i),i};let M=class extends k{constructor(){super(...arguments),this.name="",this.visible=!1,this.disabled=!1}createRenderRoot(){return this}render(){return y}validate(){return!0}get numbered(){return!1}get response(){return{name:this.name,comment:this.value}}};H([d({type:String,reflect:!0})],M.prototype,"name",2);H([d({type:String,reflect:!0})],M.prototype,"value",2);M=H([F("ia-feature-feedback-survey-extra")],M);var we=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,b=(e,t,o,s)=>{for(var i=s>1?void 0:s?Se(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(s?n(t,o,i):n(i))||i);return s&&i&&we(t,o,i),i};let l=class extends k{constructor(){super(...arguments),this.showButtonThumbs=!1,this.showQuestionNumbers=!1,this.disabled=!1,this.submitTimeout=8e3,this.isOpen=!1,this.submissionState="idle",this.popupTopX=0,this.popupTopY=0,this.resizingElement=document.body,this.handleScroll=()=>{this.isOpen&&this.positionPopup()},this.handleEscape=e=>{e.key==="Escape"&&this.cancel(e)}}static get SUBMIT_BUTTON_NORMAL_TEXT(){return u("Submit feedback")}static get SUBMIT_BUTTON_PROCESSING_TEXT(){return u("Submitting...")}static get ERROR_MESSAGE_MISSING_REQUIRED_INPUT(){return u("Please respond to the indicated questions.")}static get ERROR_MESSAGE_SUBMIT_REQUEST_FAILED(){return u("There was an error submitting your feedback.")}render(){return c`<div id="container">${this.feedbackButtonTemplate}</div>`}willUpdate(e){if(e.has("submissionState")&&(this.isProcessing||this.isSubmitted?this.disableSlottedChildren():this.restoreSlottedChildrenDisabledStates()),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}updated(e){(e.has("showQuestionNumbers")||e.has("assignedElements"))&&this.applyQuestionNumbers();const t=e.get("submissionState");t&&(this.submissionState==="error"||t==="error")&&this.positionPopup(),e.has("isOpen")&&this.isOpen&&this.focusFirstFormElement()}disconnectedCallback(){super.disconnectedCallback(),this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disableSlottedChildren(){this.assignedElements.filter(J).forEach(e=>{e.dataset.originallyDisabled=e.disabled?"true":"false",e.disabled=!0})}restoreSlottedChildrenDisabledStates(){this.assignedElements.filter(J).forEach(e=>{const{originallyDisabled:t}=e.dataset;if(t===void 0)return;const o=t==="true";delete e.dataset.originallyDisabled,e.disabled=o})}handleResize(){this.isOpen&&this.positionPopup()}setupEscapeListener(){document.addEventListener("keyup",this.handleEscape)}removeEscapeListener(){document.removeEventListener("keyup",this.handleEscape)}setupScrollObserver(){document.addEventListener("scroll",this.handleScroll)}stopScrollObserver(){document.removeEventListener("scroll",this.handleScroll)}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}disconnectResizeObserver(e){(e??this.resizeObserver)?.removeObserver({handler:this,target:this.resizingElement})}getRecaptchaWidget(){if(this.recaptchaWidgetPromise)return this.recaptchaWidgetPromise;if(this.recaptchaManager)return this.recaptchaWidgetPromise=this.recaptchaManager.getRecaptchaWidget(),this.recaptchaWidgetPromise}resetSubmissionState(){this.setSubmissionState("idle"),this.error=void 0}setSubmissionState(e){this.submissionState!==e&&(this.submissionState=e,this.emitSubmissionStateChanged())}emitSubmissionStateChanged(){this.dispatchEvent(new CustomEvent("submissionStateChanged",{detail:this.submissionState}))}get isProcessing(){return this.submissionState==="processing"}get isSubmitted(){return this.submissionState==="submitted"}showPopup(){this.isSubmitted||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,this.getRecaptchaWidget())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=window.innerWidth,s=window.innerHeight,i=o/2,a=s/2,n=5,v=5;e.left<i?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX+t.width>o&&(this.popupTopX=o-t.width-n),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height,this.popupTopY+t.height>s&&(this.popupTopY=s-t.height-v),this.popupTopX=Math.max(n,this.popupTopX),this.popupTopY=Math.max(v,this.popupTopY)}get feedbackButtonThumbsTemplate(){return this.showButtonThumbs?c`
      <span class="beta-button-icon">${P}</span>
      <span class="beta-button-icon">${R}</span>
    `:y}get feedbackButtonCheckTemplate(){return c`<span class="beta-button-icon success">&check;</span>`}get feedbackButtonTemplate(){return c`
      <button
        id="beta-button"
        tabindex="0"
        aria-haspopup="dialog"
        ?disabled=${this.disabled}
        @click=${this.showPopup}
      >
        <span id="button-text">${this.buttonText??u("Feedback")}</span>
        ${this.isSubmitted?this.feedbackButtonCheckTemplate:this.feedbackButtonThumbsTemplate}
      </button>
      ${this.popupTemplate}
    `}get errorTemplate(){const{error:e}=this;if(!e)return y;const t=e.kind==="missingInput"?l.ERROR_MESSAGE_MISSING_REQUIRED_INPUT:l.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED,o=e.kind==="submitFailed"&&e.detail!==void 0?c`<br />${u("Error: ")}${e.detail}`:y;return c`<div id="error">${t}${o}</div>`}get popupTemplate(){const e=this.isProcessing||this.isSubmitted,t=this.isProcessing?l.SUBMIT_BUTTON_PROCESSING_TEXT:l.SUBMIT_BUTTON_NORMAL_TEXT,o=this.errorTemplate,s=ne({left:`${this.popupTopX}px`,top:`${this.popupTopY}px`}),i=a=>a.stopPropagation();return c`
      <div
        id="popup-background"
        class=${this.isOpen?"open":"closed"}
        @click=${this.backgroundClicked}
        @keydown=${this.backgroundClicked}
      >
        <div
          class="focus-trap"
          tabindex="0"
          @focus=${this.focusSubmitButton}
        ></div>
        <div
          id="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="survey-heading"
          style=${s}
        >
          <h2 id="survey-heading" class="sr-only">${u("Feedback Survey")}</h2>
          <form
            id="form"
            ?disabled=${e}
            @click=${i}
            @keydown=${i}
            @submit=${this.submit}
          >
            <slot id="questions-slot"></slot>
            ${o}
            <div id="actions">
              <button
                type="button"
                id="cancel-button"
                class="cta-button ia-button dark"
                tabindex="0"
                ?disabled=${e}
                @click=${this.cancel}
              >
                ${u("Cancel")}
              </button>
              <button
                type="submit"
                id="submit-button"
                class="cta-button ia-button primary"
                tabindex="0"
                ?disabled=${e}
              >
                ${t}
              </button>
            </div>
          </form>
        </div>
        <div
          class="focus-trap"
          tabindex="0"
          @focus=${this.focusFirstFormElement}
        ></div>
      </div>
    `}focusFirstFormElement(){const e=this.getRootNode();for(const t of this.assignedElements)if(t.focus(),e.activeElement===t)return;this.focusCancelButton()}focusCancelButton(){this.cancelButton.focus()}focusSubmitButton(){this.submitButton.focus()}applyQuestionNumbers(){if(!this.showQuestionNumbers){this.assignedElements.forEach(t=>{t.querySelector("[slot=question-number]")?.remove()});return}let e=1;this.assignedElements.filter(t=>le(t)&&t.numbered).forEach(t=>{let o=t.querySelector("[slot=question-number]");o||(o=document.createElement("span"),o.setAttribute("slot","question-number")),o.textContent=`${e}. `,t.append(o),e+=1})}backgroundClicked(e){e.target instanceof Node&&(this.popup?.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.isSubmitted||this.resetSubmissionState()}validate(){return this.assignedElements.filter(ue).map(e=>e.validate()).every(e=>e)}async submit(e){if(e?.preventDefault(),!this.validate()){this.error={kind:"missingInput"},this.setSubmissionState("error");return}const{surveyIdentifier:t,submitTimeout:o,featureFeedbackService:s}=this;if(this.error=void 0,!t)throw new Error("surveyIdentifier is required");if(!s)throw new Error("featureFeedbackService is required");const i=this.getRecaptchaWidget();let a;try{a=await Q(i,o)}catch(v){throw new Error(`recaptchaWidget load failed: ${v}`)}if(!a)throw new Error("recaptchaWidget is required");const n=this.isOpen;this.setSubmissionState("processing");try{const v=await Q(a.execute(),o);(await Q(s.submitSurvey({surveyIdentifier:t,responses:this.assignedElements.filter(pe).map($=>$.response),recaptchaToken:v}),o)).success?(this.setSubmissionState("submitted"),n&&this.closePopup()):(this.error={kind:"submitFailed"},this.setSubmissionState("error"))}catch(v){this.error={kind:"submitFailed",detail:v instanceof Error?v.message:String(v)},this.setSubmissionState("error")}}static get styles(){const e=r`var(--featureFeedbackBlueColor, var(--ia-color-action-primary-fill--))`,t=r`var(--defaultColorSvgFilter, invert(43%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(89%) contrast(88%))`,o=r`var(--featureFeedbackBackdropZindex, 5)`,s=r`var(--featureFeedbackModalZindex, 6)`,i=r`var(--featureFeedbackPopupMaxWidth, 300px)`,a=r`var(--featureFeedbackPopupVerticalPadding, var(--ia-space-2--))`,n=r`var(--featureFeedbackPopupHorizontalPadding, var(--ia-space-2--))`,v=r`
      ${a} ${n}
    `,C=r`var(--featureFeedbackPopupBorderColor, ${e})`,$=r`var(--featureFeedbackBetaButtonBorderColor, ${e})`,B=r`var(--featureFeedbackBetaButtonTextColor, ${e})`,T=r`var(--featureFeedbackBetaButtonBackground, none)`,E=r`var(--featureFeedbackBetaButtonSvgFilter, ${t})`,V=r`var(--featureFeedbackPopupBlockerColor, var(--ia-color-surface-scrim--))`,A=r`var(--featureFeedbackPopupBackgroundColor, var(--ia-color-surface-page--))`,W=r`var(--upvoteColorSvgFilter, invert(32%) sepia(61%) saturate(448%) hue-rotate(113deg) brightness(99%) contrast(91%))`,_=r`var(--white, var(--ia-color-action-primary-text--))`,q=r`var(--primaryDisableCTAFill, var(--ia-color-action-disabled-fill--))`,U=r`var(--secondaryCTABorder, var(--ia-color-action-disabled-border--))`,X=r`var(--primaryCTAFill, var(--ia-color-action-primary-fill--))`,O=r`var(--primaryCTAFillRGB, 25, 72, 128)`,j=r`var(--primaryCTABorder, var(--ia-color-action-primary-border--))`,Y=r`var(--secondaryCTAFill, var(--ia-color-palette-gray-800--))`,z=r`var(--secondaryCTAFillRGB, 51, 51, 51)`,G=r`var(--primaryCTABorder, var(--ia-color-action-secondary-border--))`,D=r`
      .ia-button {
        min-height: var(--ia-size-control-sm--);
        cursor: pointer;
        color: ${_};
        line-height: normal;
        border-radius: var(--ia-radius-default--);
        font-size: var(--ia-font-size-md--);
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        border: var(--ia-size-border-width--) solid transparent;
        white-space: nowrap;
        appearance: auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        transition: all 0.1s ease 0s;
        vertical-align: middle;
        padding: 0 var(--ia-space-6--);
        outline-color: ${_};
        outline-offset: -4px;
        user-select: none;
        text-decoration: none;
        width: fit-content;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
      }
      .ia-button:focus-visible {
        outline-style: double;
      }
      .ia-button:disabled {
        cursor: not-allowed;
        background-color: ${q};
        border: var(--ia-size-border-width--) solid ${U};
      }

      .ia-button.primary:disabled,
      .ia-button.dark:disabled {
        opacity: 0.5;
      }

      .ia-button.primary {
        background-color: ${X};
        border-color: ${j};
      }
      .ia-button.primary:hover {
        background-color: rgba(${O}, 0.9);
      }
      .ia-button.primary:focus-visible {
        background-color: rgba(${O}, 0.8);
      }
      .ia-button.primary:active {
        background-color: rgba(${O}, 0.7);
      }

      .ia-button.dark {
        background-color: ${Y};
        border-color: ${G};
      }
      .ia-button.dark:hover {
        background-color: rgba(${z}, 0.9);
      }
      .ia-button.dark:focus-visible {
        background-color: rgba(${z}, 0.8);
      }
      .ia-button.dark:active {
        background-color: rgba(${z}, 0.7);
      }
    `,ie=r`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: var(--ia-font-size-sm--);
        font-weight: bold;
        font-style: italic;
        color: ${B};
        border: var(--ia-size-border-width--) solid ${$};
        border-radius: var(--ia-radius-default--);
        padding: 1px var(--ia-space-1--);
        background: ${T};
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
      }

      .beta-button-icon {
        line-height: 1;
      }

      .beta-button-icon svg {
        height: var(--ia-size-icon-xs--);
        width: var(--ia-size-icon-xs--);
        filter: ${E};
      }

      .beta-button-icon.success {
        filter: ${W};
      }

      #error {
        margin-bottom: var(--ia-space-2--);
        color: var(--ia-color-text-danger--);
        font-size: var(--ia-font-size-md--);
        text-align: center;
        font-weight: bold;
      }

      #popup-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${o};
        background-color: ${V};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        max-width: ${i};
        max-height: calc(
          100vh - 2 * ${a} - var(--ia-space-2--)
        );
        padding: ${v};
        border: var(--ia-size-border-width--) ${C} solid;
        border-radius: var(--ia-radius-default--);
        background-color: ${A};
        box-shadow: var(--ia-shadow-overlay--);
        z-index: ${s};
        margin-left: var(--ia-space-2--);
        margin-right: var(--ia-space-2--);
        overflow-y: auto;
        scrollbar-width: thin;
      }

      button,
      input,
      a,
      textarea {
        font-family: inherit;
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      #actions {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: var(--ia-space-2--);
      }

      .cta-button {
        color: var(--ia-color-action-primary-text--);
        font-size: var(--ia-font-size-md--);
        border-radius: var(--ia-radius-default--);
        height: var(--ia-size-control-sm--);
        margin: 0;
      }

      .sr-only,
      .focus-trap {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        user-select: none !important;
      }
    `;return[N,D,ie]}};b([d({type:String})],l.prototype,"surveyIdentifier",2);b([d({type:String})],l.prototype,"buttonText",2);b([d({type:Boolean})],l.prototype,"showButtonThumbs",2);b([d({type:Boolean})],l.prototype,"showQuestionNumbers",2);b([d({type:Boolean})],l.prototype,"disabled",2);b([d({type:Number})],l.prototype,"submitTimeout",2);b([d({type:Object})],l.prototype,"featureFeedbackService",2);b([d({type:Object})],l.prototype,"recaptchaManager",2);b([d({type:Object})],l.prototype,"resizeObserver",2);b([m()],l.prototype,"isOpen",2);b([m()],l.prototype,"submissionState",2);b([m()],l.prototype,"popupTopX",2);b([m()],l.prototype,"popupTopY",2);b([m()],l.prototype,"error",2);b([S("#container")],l.prototype,"container",2);b([S("#popup")],l.prototype,"popup",2);b([S("#cancel-button")],l.prototype,"cancelButton",2);b([S("#submit-button")],l.prototype,"submitButton",2);b([ae()],l.prototype,"assignedElements",2);l=b([F("ia-feature-feedback-survey"),L()],l);class ee{constructor(t){this.options=t}async submitFeedback(t){return this.submissionOptions=t,this.options?.delay&&await this.wait(this.options.delay),this.options?.returnValue??{success:!0}}async submitSurvey(t){return this.surveySubmissionOptions=t,this.options?.delay&&await this.wait(this.options.delay),this.options?.returnValue??{success:!0}}wait(t){return new Promise(o=>setTimeout(o,t))}}class $e{async execute(){return"boop"}}class ke{setTimeoutDelay(t){this.timeoutDelay=t}async getRecaptchaWidget(t){return this.getWidgetOptions=t,new $e}}var xe=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,K=(e,t,o,s)=>{for(var i=s>1?void 0:s?Ce(t,o):t,a=e.length-1,n;a>=0;a--)(n=e[a])&&(i=(s?n(t,o,i):n(i))||i);return s&&i&&xe(t,o,i),i};const te="demo-feature",Be="demo-survey",oe=800,Fe=[{label:"Accent color",cssVariable:"--featureFeedbackBlueColor",defaultValue:"#194880",inputType:"color"},{label:"Popup background",cssVariable:"--featureFeedbackPopupBackgroundColor",defaultValue:"#FBFBFD",inputType:"color"},{label:"Upvote color",cssVariable:"--upvoteColor",defaultValue:"#20705a",inputType:"color"},{label:"Downvote color",cssVariable:"--downvoteColor",defaultValue:"#b8161c",inputType:"color"}],Te=[{label:"Display mode",propertyName:"displayMode",defaultValue:"button",inputType:"radio",radioOptions:["button","vote-prompt"]},{label:"Button text",propertyName:"buttonText",defaultValue:"Beta"},{label:"Prompt",propertyName:"prompt",defaultValue:"Do you find this feature useful?"},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]}];let I=class extends k{constructor(){super(...arguments),this.failSubmissions=!1,this.submissionLog=[],this.recaptchaManager=new ke,this.resizeObserver=new se,this.succeedingService=this.loggedService(new ee({delay:oe})),this.failingService=this.loggedService(new ee({delay:oe,returnValue:{success:!1}}))}get service(){return this.failSubmissions?this.failingService:this.succeedingService}record(e){this.submissionLog=[e,...this.submissionLog].slice(0,5)}loggedService(e){return{submitFeedback:async t=>{const o=await e.submitFeedback(t);return this.record(`Feedback: ${t.vote} on ${t.featureIdentifier}`+(t.comments?`, "${t.comments}"`:"")+(o.success?"":" (failed)")),o},submitSurvey:async t=>{const o=await e.submitSurvey(t);return this.record(`Survey ${t.surveyIdentifier}: ${t.responses.length} responses`+(o.success?"":" (failed)")),o}}}render(){return c`
      <story-template
        elementTag="ia-feature-feedback"
        elementClassName="IAFeatureFeedback"
        .styleInputData=${{settings:Fe}}
        .propInputData=${{settings:Te}}
      >
        <ia-feature-feedback
          slot="demo"
          .featureIdentifier=${te}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        ></ia-feature-feedback>

        <ia-feature-feedback
          slot="demo"
          displayMode="vote-prompt"
          .featureIdentifier=${te}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        ></ia-feature-feedback>

        <ia-feature-feedback-survey
          slot="demo"
          showButtonThumbs
          showQuestionNumbers
          .surveyIdentifier=${Be}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        >
          <ia-feature-feedback-survey-vote
            prompt="How do you feel about foo?"
            required
          ></ia-feature-feedback-survey-vote>
          <ia-feature-feedback-survey-extra
            name="foo"
            value="bar"
          ></ia-feature-feedback-survey-extra>
          <ia-feature-feedback-survey-vote
            prompt="How do you feel about bar?"
            showComments
            commentPlaceholder="You may enter an optional comment as well..."
          ></ia-feature-feedback-survey-vote>
          <ia-feature-feedback-survey-comment
            prompt="What does foobar mean to you?"
            placeholder="You must answer this question."
            required
          ></ia-feature-feedback-survey-comment>
        </ia-feature-feedback-survey>

        <div slot="demo" class="submissions">
          <label>
            <input
              type="checkbox"
              .checked=${this.failSubmissions}
              @change=${e=>{this.failSubmissions=e.target.checked}}
            />
            Fail submissions
          </label>
          <p class="log-title">Submissions</p>
          <ul class="log">
            ${this.submissionLog.length?this.submissionLog.map(e=>c`<li>${e}</li>`):c`<li>None yet.</li>`}
          </ul>
        </div>

        <div slot="usage-notes">
          <p>
            Nothing here talks to a server. The demo uses a mock Recaptcha
            manager and a mock feedback service that answers after a short
            delay, and each submission is added to the log.
          </p>
          <p>
            <code>displayMode</code> picks between a single button that opens a
            popup and an inline prompt with vote buttons. In
            <code>vote-prompt</code> mode a click on a vote submits right away.
          </p>
          <p>
            <code>ia-feature-feedback-survey</code> takes
            <code>ia-feature-feedback-survey-vote</code>,
            <code>ia-feature-feedback-survey-comment</code> and
            <code>ia-feature-feedback-survey-extra</code> as children. Extras
            send a fixed name and value with the responses and render nothing.
          </p>
          <p>
            Pass a <code>featureFeedbackService</code>, a
            <code>recaptchaManager</code> and a shared
            <code>resizeObserver</code> to each widget. Submissions fail without
            the first two.
          </p>
        </div>
      </story-template>
    `}static get styles(){return r`
      .submissions {
        margin-top: 1rem;
        font-size: 1.4rem;
      }

      .log-title {
        margin: 0.8rem 0 0.2rem;
        font-weight: bold;
      }

      .log {
        margin: 0;
        padding-left: 2rem;
        font-family: monospace;
        font-size: 1.2rem;
      }
    `}};K([m()],I.prototype,"failSubmissions",2);K([m()],I.prototype,"submissionLog",2);I=K([F("ia-feature-feedback-story")],I);export{I as IAFeatureFeedbackStory};
