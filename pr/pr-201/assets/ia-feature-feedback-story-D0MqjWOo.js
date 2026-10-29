import{w as oe,r as v,n as p,e as $,c as F,i as x,b as d,m as l,A as y,a as r,d as K}from"./index-C2w7JE-6.js";import{S as se}from"./shared-resize-observer-BgPwZbAx.js";import{l as L}from"./localized-decorator-Dx2DkRI3.js";import{o as ie}from"./query-assigned-elements-abUHsGWn.js";import{o as ne}from"./style-map-BCQAGgM7.js";import"./story-template-Biway_4u.js";import"./syntax-highlighter-BazORXhu.js";import"./theme-styles-Drfiywey.js";const R=oe`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,z=oe`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;var ae=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,h=(e,t,o,i)=>{for(var s=i>1?void 0:i?pe(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(s=(i?a(t,o,s):a(s))||s);return i&&s&&ae(t,o,s),s};let c=class extends x{constructor(){super(...arguments),this.displayMode="button",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return d`
      <div id="container">
        ${this.displayMode==="vote-prompt"?this.votePromptDisplay:this.singleButtonDisplay}
      </div>
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){super.disconnectedCallback(),this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){(e??this.resizeObserver)?.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted&&this.displayMode==="button"||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=window.innerWidth,i=window.innerHeight,s=o/2,n=i/2;e.left<s?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>o&&(this.popupTopX=o-t.width),e.top<n?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.cancel(e)}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get singleButtonDisplay(){return d`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText??l("Beta")}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${R}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${z}</span
        >
      </button>
      ${this.popupTemplate}
    `}get votePromptDisplay(){return d`
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
            ${R}
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
            ${z}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            ${l("Leave a comment")}
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `}get popupTemplate(){return d`
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
                ${R}
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
                ${z}
              </label>
            </div>
            <div>
              <textarea
                placeholder=${l("Comments (optional)")}
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
                ${l("Cancel")}
              </button>
              <input
                type="submit"
                id="submit-button"
                class="cta-button"
                .value=${this.processing?l("Submitting..."):l("Submit feedback")}
                tabindex="0"
                ?disabled=${this.processing}
              />
            </div>
          </form>
        </div>
      </div>
    `}get errorTemplate(){const{error:e}=this;if(!e)return y;const t=e.kind==="noVote"?l("Please select a vote."):l("There was an error submitting your feedback."),o=e.kind==="submitFailed"&&e.detail!==void 0?d`<br />${l("Error: ")}${e.detail}`:y;return d`<div id="error">${t}${o}</div>`}get promptText(){return this.prompt??l("Do you find this feature useful?")}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="up"?void 0:"up",this.handleButtonSelection())}downvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="down"?void 0:"down",this.handleButtonSelection())}async handleButtonSelection(){this.isOpen||(await this.setupRecaptcha(),this.submit())}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){e.target instanceof Node&&(this.popup?.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.voteSubmitted||this.resetState()}async submit(e){if(e?.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error={kind:"noVote"};return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");const t=this.isOpen;this.processing=!0;try{const o=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:o})).success?(this.voteSubmitted=!0,t&&this.closePopup()):this.error={kind:"submitFailed"}}catch(o){this.error={kind:"submitFailed",detail:o instanceof Error?o.message:String(o)}}this.processing=!1}static get styles(){const e=r`var(--featureFeedbackBlueColor, #194880)`,t=r`var(--featureFeedbackDarkGrayColor, #767676)`,o=r`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,i=r`var(--featureFeedbackBackdropZindex, 5)`,s=r`var(--featureFeedbackModalZindex, 6)`,n=r`var(--featureFeedbackPopupBorderColor, ${e})`,a=r`var(--featureFeedbackSubmitButtonColor, ${e})`,m=r`var(--featureFeedbackBetaButtonBorderColor, ${e})`,C=r`var(--featureFeedbackBetaButtonTextColor, ${e})`,w=r`var(--featureFeedbackBetaButtonBackground, none)`,B=r`var(--featureFeedbackBetaButtonSvgFilter, ${o})`,T=r`var(--featureFeedbackCancelButtonColor, #515151)`,E=r`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,N=r`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,V=r`var(--featureFeedbackPromptFontWeight, bold)`,A=r`var(--featureFeedbackPromptFontSize, 1.4rem)`,_=r`var(--featureFeedbackCommentButtonFontWeight, normal)`,W=r`var(--featureFeedbackCommentButtonFontWeight, 1.4rem)`,q=r`var(--defaultColor, ${t});`,U=r`var(--defaultColorSvgFilter, ${o});`,O=r`var(--upvoteColor, #23765D);`,X=r`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,j=r`var(--downvoteColor, #720D11);`,P=r`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,Y=r`var(--unselectedColor, #CCCCCC);`,D=r`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return r`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${C};
        background: ${w};
        border: 1px solid ${m};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${B};
      }

      .beta-button-thumb.unselected svg {
        filter: ${D};
      }

      #error {
        color: red;
        font-size: 14px;
        text-align: center;
        font-weight: bold;
      }

      #popup-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${i};
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
        padding: 10px;
        background-color: ${N};
        border: 1px ${n} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${s};
        max-width: 300px;
        margin-left: 10px;
        margin-right: 10px;
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
        margin-bottom: 10px;
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      .prompt {
        display: flex;
        align-items: center;
        font-size: ${A};
        font-weight: ${V};
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
        height: 50px;
        background-color: #ffffff;
        border: 1px #2c2c2c solid;
        border-radius: 4px;
        padding: 7px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        resize: none;
      }

      #comments::placeholder {
        color: #767676;
      }

      #actions {
        display: flex;
        justify-content: center;
      }

      .cta-button {
        color: white;
        font-size: 14px;
        border-radius: 4px;
        height: 30px;
        margin: 0;
      }

      #cancel-button {
        background-color: ${T};
      }

      #submit-button {
        background-color: ${a};
        margin-left: 10px;
      }

      .vote-button {
        background-color: #ffffff;
        border: 1px solid #767676;
        border-radius: 2px;
        padding: 0;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
      }

      .vote-button svg {
        width: 15px;
        height: 15px;
      }

      .vote-button input {
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .vote-button.noselection {
        border-color: ${q};
      }

      .vote-button.noselection svg {
        filter: ${U};
      }

      .vote-button.unselected {
        border-color: ${Y};
      }

      .vote-button.unselected svg {
        filter: ${D};
      }

      .upvote-button.selected {
        border-color: ${O};
      }

      .upvote-button.selected svg {
        filter: ${X};
      }

      .downvote-button.selected {
        border-color: ${j};
      }

      .downvote-button.selected svg {
        filter: ${P};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, #4b64ff);
        font-weight: ${_};
        font-size: ${W};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `}};h([p({type:String})],c.prototype,"featureIdentifier",2);h([p({type:String})],c.prototype,"prompt",2);h([p({type:String})],c.prototype,"buttonText",2);h([p({type:String})],c.prototype,"displayMode",2);h([p({type:Object})],c.prototype,"recaptchaManager",2);h([p({type:Object})],c.prototype,"resizeObserver",2);h([p({type:Boolean})],c.prototype,"disabled",2);h([p({type:Object})],c.prototype,"featureFeedbackService",2);h([v()],c.prototype,"isOpen",2);h([v()],c.prototype,"processing",2);h([v()],c.prototype,"popupTopX",2);h([v()],c.prototype,"popupTopY",2);h([v()],c.prototype,"vote",2);h([v()],c.prototype,"voteSubmitted",2);h([v()],c.prototype,"error",2);h([v()],c.prototype,"voteNeedsChoosing",2);h([v()],c.prototype,"recaptchaWidget",2);h([$("#container")],c.prototype,"container",2);h([$("#popup")],c.prototype,"popup",2);h([$("#comments")],c.prototype,"comments",2);c=h([F("ia-feature-feedback"),L()],c);function Z(e){return"disabled"in e&&typeof e.disabled=="boolean"}function de(e){return"numbered"in e&&typeof e.numbered=="boolean"}function ue(e){return"validate"in e&&typeof e.validate=="function"}function le(e){return"response"in e&&typeof e.response=="object"&&e.response!==null&&"name"in e.response&&typeof e.response.name=="string"}class ce extends Error{}async function G(e,t,o="Operation timed out"){const i=new Promise((s,n)=>setTimeout(n,t,new ce(o)));return Promise.race([e,i])}var he=Object.defineProperty,be=Object.getOwnPropertyDescriptor,k=(e,t,o,i)=>{for(var s=i>1?void 0:i?be(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(s=(i?a(t,o,s):a(s))||s);return i&&s&&he(t,o,s),s};let g=class extends x{constructor(){super(),this.prompt="",this.value="",this.required=!1,this.disabled=!1,this.skipNumber=!1,this.visible=!0,this.internals=this.attachInternals()}static get DEFAULT_PLACEHOLDER_REQUIRED(){return l("Comments")}static get DEFAULT_PLACEHOLDER_OPTIONAL(){return l("Comments (optional)")}render(){return d`
      <div id="container">
        ${this.promptTextTemplate}${this.commentBoxTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||!!this.commentBox.value?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},l("A comment is required.")),this.internals.reportValidity()}get numbered(){return!this.skipNumber}get response(){return{name:this.prompt,comment:this.value}}get promptTextTemplate(){if(!this.prompt)return y;const e=this.numbered?d`<slot name="question-number"></slot>`:y;return d`<div id="prompt-text">${e}${this.prompt}</div>`}get commentBoxTemplate(){const e=this.required?g.DEFAULT_PLACEHOLDER_REQUIRED:g.DEFAULT_PLACEHOLDER_OPTIONAL,t=this.placeholder??e;return d`
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
    `}commentChanged(){this.disabled||(this.value=this.commentBox.value,this.value&&this.internals.setValidity({}),this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=r`var(--commentHeight, 50px)`,t=r`var(--commentResize, none)`,o=r`var(--surveyQuestionMargin, 0 0 15px 0)`,i=r`var(--featureFeedbackPromptFontWeight, bold)`,s=r`var(--featureFeedbackPromptFontSize, 1.4rem)`;return r`
      #container {
        margin: ${o};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: 5px;
        flex-grow: 1;
        font-size: ${s};
        font-weight: ${i};
      }

      #comments {
        width: 100%;
        height: ${e};
        background-color: #ffffff;
        border: 1px #2c2c2c solid;
        border-radius: 4px;
        padding: 7px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: inherit;
        resize: ${t};
      }

      #comments::placeholder {
        color: #767676;
      }

      :host(:invalid) #comments {
        box-shadow: 0 0 4px red;
      }
    `}};g.formAssociated=!0;g.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};k([p({type:String})],g.prototype,"prompt",2);k([p({type:String})],g.prototype,"value",2);k([p({type:Boolean,reflect:!0})],g.prototype,"required",2);k([p({type:Boolean,reflect:!0})],g.prototype,"disabled",2);k([p({type:Boolean,reflect:!0})],g.prototype,"skipNumber",2);k([p({type:String})],g.prototype,"placeholder",2);k([$("#comments")],g.prototype,"commentBox",2);g=k([F("ia-feature-feedback-survey-comment"),L()],g);var me=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,S=(e,t,o,i)=>{for(var s=i>1?void 0:i?ve(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(s=(i?a(t,o,s):a(s))||s);return i&&s&&me(t,o,s),s};let f=class extends x{constructor(){super(),this.prompt="",this.vote=void 0,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.showComments=!1,this.visible=!0,this.internals=this.attachInternals()}static get UPVOTE_SR_LABEL(){return l("Vote up")}static get DOWNVOTE_SR_LABEL(){return l("Vote down")}render(){return d`
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
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.vote?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A vote is required."),this.internals.checkValidity()}get numbered(){return!this.skipNumber}get response(){return{...this.commentBox?.response,name:this.prompt,rating:this.vote}}get promptTextTemplate(){if(!this.prompt)return y;const e=this.numbered?d`<slot name="question-number"></slot>`:y;return d`<div id="prompt-text">${e}${this.prompt}</div>`}get voteButtonsTemplate(){const e=this.vote==="up",t=this.vote==="down",i={"vote-button":!0,noselection:this.vote===void 0},s=K({...i,selected:e,unselected:t}),n=K({...i,selected:t,unselected:e});return d`
      <label
        id="upvote"
        class=${s}
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
        ${R}
        <span class="sr-only"
          >${f.UPVOTE_SR_LABEL}</span
        >
      </label>

      <label
        id="downvote"
        class=${n}
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
        ${z}
        <span class="sr-only"
          >${f.DOWNVOTE_SR_LABEL}</span
        >
      </label>
    `}get commentFieldTemplate(){return this.showComments?d`
      <ia-feature-feedback-survey-comment
        id="comments"
        skipNumber
        .value=${this.comment??""}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-feature-feedback-survey-comment>
    `:y}upvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.handleVoteButtonSelection("up")}downvoteButtonSelected(){this.handleVoteButtonSelection("down")}handleVoteButtonSelection(e){this.disabled||(this.vote=e,this.internals.setValidity({}),this.emitResponseChangedEvent())}commentChanged(e){e.stopPropagation(),!this.disabled&&(this.comment=this.commentBox?.value,this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=r`var(--surveyQuestionMargin, 0 0 15px 0)`,t=r`var(--featureFeedbackDarkGrayColor, #767676)`,o=r`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,i=r`var(--defaultColor, ${t})`,s=r`var(--defaultColorSvgFilter, ${o})`,n=r`var(--upvoteColor, #23765D)`,a=r`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,m=r`var(--downvoteColor, #720D11)`,C=r`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%))`,w=r`var(--unselectedColor, #CCCCCC)`,B=r`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`,T=r`var(--featureFeedbackPromptFontWeight, bold)`,E=r`var(--featureFeedbackPromptFontSize, 1.4rem)`;return r`
      #container {
        margin: ${e};
      }

      #prompt-row {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }

      #prompt-text {
        text-align: left;
        flex-grow: 1;
        font-size: ${E};
        font-weight: ${T};
      }

      .vote-button {
        background-color: #ffffff;
        border: 1px solid #767676;
        border-radius: 2px;
        margin-left: 10px;
        padding: 0;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        cursor: pointer;
      }

      .vote-button:focus-within {
        outline: 2px solid black;
        outline-offset: 1px;
      }

      .vote-button svg {
        width: 15px;
        height: 15px;
      }

      .vote-button input {
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .vote-button.noselection {
        border-color: ${i};
      }

      .vote-button.noselection svg {
        filter: ${s};
      }

      .vote-button.unselected {
        border-color: ${w};
      }

      .vote-button.unselected svg {
        filter: ${B};
      }

      #upvote.selected {
        border-color: ${n};
      }

      #upvote.selected svg {
        filter: ${a};
      }

      #downvote.selected {
        border-color: ${m};
      }

      #downvote.selected svg {
        filter: ${C};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      .vote-button.noselection[disabled],
      .vote-button.unselected[disabled] {
        border-color: ${w};
        cursor: not-allowed;
      }

      .vote-button.noselection[disabled] svg,
      .vote-button.unselected[disabled] svg {
        filter: ${B};
      }

      :host(:invalid) #upvote,
      :host(:invalid) #downvote {
        box-shadow: 0 0 4px red;
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
    `}};f.formAssociated=!0;f.shadowRootOptions={...x.shadowRootOptions,delegatesFocus:!0};S([p({type:String})],f.prototype,"prompt",2);S([p({type:String})],f.prototype,"vote",2);S([p({type:String})],f.prototype,"comment",2);S([p({type:String})],f.prototype,"commentPlaceholder",2);S([p({type:Boolean,reflect:!0})],f.prototype,"required",2);S([p({type:Boolean,reflect:!0})],f.prototype,"disabled",2);S([p({type:Boolean,reflect:!0})],f.prototype,"skipNumber",2);S([p({type:Boolean,reflect:!0})],f.prototype,"showComments",2);S([$("#comments")],f.prototype,"commentBox",2);f=S([F("ia-feature-feedback-survey-vote"),L()],f);var fe=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,Q=(e,t,o,i)=>{for(var s=i>1?void 0:i?ge(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(s=(i?a(t,o,s):a(s))||s);return i&&s&&fe(t,o,s),s};let M=class extends x{constructor(){super(...arguments),this.name="",this.visible=!1,this.disabled=!1}createRenderRoot(){return this}render(){return y}validate(){return!0}get numbered(){return!1}get response(){return{name:this.name,comment:this.value}}};Q([p({type:String,reflect:!0})],M.prototype,"name",2);Q([p({type:String,reflect:!0})],M.prototype,"value",2);M=Q([F("ia-feature-feedback-survey-extra")],M);var ye=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,b=(e,t,o,i)=>{for(var s=i>1?void 0:i?Se(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(s=(i?a(t,o,s):a(s))||s);return i&&s&&ye(t,o,s),s};let u=class extends x{constructor(){super(...arguments),this.showButtonThumbs=!1,this.showQuestionNumbers=!1,this.disabled=!1,this.submitTimeout=8e3,this.isOpen=!1,this.submissionState="idle",this.popupTopX=0,this.popupTopY=0,this.resizingElement=document.body,this.handleScroll=()=>{this.isOpen&&this.positionPopup()},this.handleEscape=e=>{e.key==="Escape"&&this.cancel(e)}}static get SUBMIT_BUTTON_NORMAL_TEXT(){return l("Submit feedback")}static get SUBMIT_BUTTON_PROCESSING_TEXT(){return l("Submitting...")}static get ERROR_MESSAGE_MISSING_REQUIRED_INPUT(){return l("Please respond to the indicated questions.")}static get ERROR_MESSAGE_SUBMIT_REQUEST_FAILED(){return l("There was an error submitting your feedback.")}render(){return d`<div id="container">${this.feedbackButtonTemplate}</div>`}willUpdate(e){if(e.has("submissionState")&&(this.isProcessing||this.isSubmitted?this.disableSlottedChildren():this.restoreSlottedChildrenDisabledStates()),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}updated(e){(e.has("showQuestionNumbers")||e.has("assignedElements"))&&this.applyQuestionNumbers();const t=e.get("submissionState");t&&(this.submissionState==="error"||t==="error")&&this.positionPopup(),e.has("isOpen")&&this.isOpen&&this.focusFirstFormElement()}disconnectedCallback(){super.disconnectedCallback(),this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disableSlottedChildren(){this.assignedElements.filter(Z).forEach(e=>{e.dataset.originallyDisabled=e.disabled?"true":"false",e.disabled=!0})}restoreSlottedChildrenDisabledStates(){this.assignedElements.filter(Z).forEach(e=>{const{originallyDisabled:t}=e.dataset;if(t===void 0)return;const o=t==="true";delete e.dataset.originallyDisabled,e.disabled=o})}handleResize(){this.isOpen&&this.positionPopup()}setupEscapeListener(){document.addEventListener("keyup",this.handleEscape)}removeEscapeListener(){document.removeEventListener("keyup",this.handleEscape)}setupScrollObserver(){document.addEventListener("scroll",this.handleScroll)}stopScrollObserver(){document.removeEventListener("scroll",this.handleScroll)}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}disconnectResizeObserver(e){(e??this.resizeObserver)?.removeObserver({handler:this,target:this.resizingElement})}getRecaptchaWidget(){if(this.recaptchaWidgetPromise)return this.recaptchaWidgetPromise;if(this.recaptchaManager)return this.recaptchaWidgetPromise=this.recaptchaManager.getRecaptchaWidget(),this.recaptchaWidgetPromise}resetSubmissionState(){this.setSubmissionState("idle"),this.error=void 0}setSubmissionState(e){this.submissionState!==e&&(this.submissionState=e,this.emitSubmissionStateChanged())}emitSubmissionStateChanged(){this.dispatchEvent(new CustomEvent("submissionStateChanged",{detail:this.submissionState}))}get isProcessing(){return this.submissionState==="processing"}get isSubmitted(){return this.submissionState==="submitted"}showPopup(){this.isSubmitted||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,this.getRecaptchaWidget())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=window.innerWidth,i=window.innerHeight,s=o/2,n=i/2,a=5,m=5;e.left<s?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX+t.width>o&&(this.popupTopX=o-t.width-a),e.top<n?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height,this.popupTopY+t.height>i&&(this.popupTopY=i-t.height-m),this.popupTopX=Math.max(a,this.popupTopX),this.popupTopY=Math.max(m,this.popupTopY)}get feedbackButtonThumbsTemplate(){return this.showButtonThumbs?d`
      <span class="beta-button-icon">${R}</span>
      <span class="beta-button-icon">${z}</span>
    `:y}get feedbackButtonCheckTemplate(){return d`<span class="beta-button-icon success">&check;</span>`}get feedbackButtonTemplate(){return d`
      <button
        id="beta-button"
        tabindex="0"
        aria-haspopup="dialog"
        ?disabled=${this.disabled}
        @click=${this.showPopup}
      >
        <span id="button-text">${this.buttonText??l("Feedback")}</span>
        ${this.isSubmitted?this.feedbackButtonCheckTemplate:this.feedbackButtonThumbsTemplate}
      </button>
      ${this.popupTemplate}
    `}get errorTemplate(){const{error:e}=this;if(!e)return y;const t=e.kind==="missingInput"?u.ERROR_MESSAGE_MISSING_REQUIRED_INPUT:u.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED,o=e.kind==="submitFailed"&&e.detail!==void 0?d`<br />${l("Error: ")}${e.detail}`:y;return d`<div id="error">${t}${o}</div>`}get popupTemplate(){const e=this.isProcessing||this.isSubmitted,t=this.isProcessing?u.SUBMIT_BUTTON_PROCESSING_TEXT:u.SUBMIT_BUTTON_NORMAL_TEXT,o=this.errorTemplate,i=ne({left:`${this.popupTopX}px`,top:`${this.popupTopY}px`}),s=n=>n.stopPropagation();return d`
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
          style=${i}
        >
          <h2 id="survey-heading" class="sr-only">${l("Feedback Survey")}</h2>
          <form
            id="form"
            ?disabled=${e}
            @click=${s}
            @keydown=${s}
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
                ${l("Cancel")}
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
    `}focusFirstFormElement(){const e=this.getRootNode();for(const t of this.assignedElements)if(t.focus(),e.activeElement===t)return;this.focusCancelButton()}focusCancelButton(){this.cancelButton.focus()}focusSubmitButton(){this.submitButton.focus()}applyQuestionNumbers(){if(!this.showQuestionNumbers){this.assignedElements.forEach(t=>{t.querySelector("[slot=question-number]")?.remove()});return}let e=1;this.assignedElements.filter(t=>de(t)&&t.numbered).forEach(t=>{let o=t.querySelector("[slot=question-number]");o||(o=document.createElement("span"),o.setAttribute("slot","question-number")),o.textContent=`${e}. `,t.append(o),e+=1})}backgroundClicked(e){e.target instanceof Node&&(this.popup?.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.isSubmitted||this.resetSubmissionState()}validate(){return this.assignedElements.filter(ue).map(e=>e.validate()).every(e=>e)}async submit(e){if(e?.preventDefault(),!this.validate()){this.error={kind:"missingInput"},this.setSubmissionState("error");return}const{surveyIdentifier:t,submitTimeout:o,featureFeedbackService:i}=this;if(this.error=void 0,!t)throw new Error("surveyIdentifier is required");if(!i)throw new Error("featureFeedbackService is required");const s=this.getRecaptchaWidget();let n;try{n=await G(s,o)}catch(m){throw new Error(`recaptchaWidget load failed: ${m}`)}if(!n)throw new Error("recaptchaWidget is required");const a=this.isOpen;this.setSubmissionState("processing");try{const m=await G(n.execute(),o);(await G(i.submitSurvey({surveyIdentifier:t,responses:this.assignedElements.filter(le).map(w=>w.response),recaptchaToken:m}),o)).success?(this.setSubmissionState("submitted"),a&&this.closePopup()):(this.error={kind:"submitFailed"},this.setSubmissionState("error"))}catch(m){this.error={kind:"submitFailed",detail:m instanceof Error?m.message:String(m)},this.setSubmissionState("error")}}static get styles(){const e=r`var(--featureFeedbackBlueColor, #194880)`,t=r`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,o=r`var(--featureFeedbackBackdropZindex, 5)`,i=r`var(--featureFeedbackModalZindex, 6)`,s=r`var(--featureFeedbackPopupMaxWidth, 300px)`,n=r`var(--featureFeedbackPopupVerticalPadding, 10px)`,a=r`var(--featureFeedbackPopupHorizontalPadding, 10px)`,m=r`
      ${n} ${a}
    `,C=r`var(--featureFeedbackPopupBorderColor, ${e})`,w=r`var(--featureFeedbackBetaButtonBorderColor, ${e})`,B=r`var(--featureFeedbackBetaButtonTextColor, ${e})`,T=r`var(--featureFeedbackBetaButtonBackground, none)`,E=r`var(--featureFeedbackBetaButtonSvgFilter, ${t})`,N=r`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,V=r`var(--featureFeedbackPopupBackgroundColor, #FBFBFD)`,A=r`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,_=r`var(--white, #fff)`,W=r`var(--primaryDisableCTAFill, #767676)`,q=r`var(--secondaryCTABorder, #999)`,U=r`var(--primaryCTAFill, #194880)`,O=r`var(--primaryCTAFillRGB, 25, 72, 128)`,X=r`var(--primaryCTABorder, #c5d1df)`,j=r`var(--secondaryCTAFill, #333)`,P=r`var(--secondaryCTAFillRGB, 51, 51, 51)`,Y=r`var(--primaryCTABorder, #979797)`,D=r`
      .ia-button {
        min-height: 3rem;
        cursor: pointer;
        color: ${_};
        line-height: normal;
        border-radius: 0.4rem;
        font-size: 1.4rem;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        border: 1px solid transparent;
        white-space: nowrap;
        appearance: auto;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        transition: all 0.1s ease 0s;
        vertical-align: middle;
        padding: 0 3rem;
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
        background-color: ${W};
        border: 1px solid ${q};
      }

      .ia-button.primary:disabled,
      .ia-button.dark:disabled {
        opacity: 0.5;
      }

      .ia-button.primary {
        background-color: ${U};
        border-color: ${X};
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
        background-color: ${j};
        border-color: ${Y};
      }
      .ia-button.dark:hover {
        background-color: rgba(${P}, 0.9);
      }
      .ia-button.dark:focus-visible {
        background-color: rgba(${P}, 0.8);
      }
      .ia-button.dark:active {
        background-color: rgba(${P}, 0.7);
      }
    `,re=r`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${B};
        border: 1px solid ${w};
        border-radius: 4px;
        padding: 1px 5px;
        background: ${T};
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
      }

      .beta-button-icon {
        line-height: 100%;
      }

      .beta-button-icon svg {
        height: 10px;
        width: 10px;
        filter: ${E};
      }

      .beta-button-icon.success {
        filter: ${A};
      }

      #error {
        margin-bottom: 10px;
        color: red;
        font-size: 14px;
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
        background-color: ${N};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        max-width: ${s};
        max-height: calc(100vh - 2 * ${n} - 10px);
        padding: ${m};
        border: 1px ${C} solid;
        border-radius: 5px;
        background-color: ${V};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${i};
        margin-left: 10px;
        margin-right: 10px;
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
        column-gap: 10px;
      }

      .cta-button {
        color: white;
        font-size: 14px;
        border-radius: 4px;
        height: 30px;
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
    `;return[D,re]}};b([p({type:String})],u.prototype,"surveyIdentifier",2);b([p({type:String})],u.prototype,"buttonText",2);b([p({type:Boolean})],u.prototype,"showButtonThumbs",2);b([p({type:Boolean})],u.prototype,"showQuestionNumbers",2);b([p({type:Boolean})],u.prototype,"disabled",2);b([p({type:Number})],u.prototype,"submitTimeout",2);b([p({type:Object})],u.prototype,"featureFeedbackService",2);b([p({type:Object})],u.prototype,"recaptchaManager",2);b([p({type:Object})],u.prototype,"resizeObserver",2);b([v()],u.prototype,"isOpen",2);b([v()],u.prototype,"submissionState",2);b([v()],u.prototype,"popupTopX",2);b([v()],u.prototype,"popupTopY",2);b([v()],u.prototype,"error",2);b([$("#container")],u.prototype,"container",2);b([$("#popup")],u.prototype,"popup",2);b([$("#cancel-button")],u.prototype,"cancelButton",2);b([$("#submit-button")],u.prototype,"submitButton",2);b([ie()],u.prototype,"assignedElements",2);u=b([F("ia-feature-feedback-survey"),L()],u);class J{constructor(t){this.options=t}async submitFeedback(t){return this.submissionOptions=t,this.options?.delay&&await this.wait(this.options.delay),this.options?.returnValue??{success:!0}}async submitSurvey(t){return this.surveySubmissionOptions=t,this.options?.delay&&await this.wait(this.options.delay),this.options?.returnValue??{success:!0}}wait(t){return new Promise(o=>setTimeout(o,t))}}class $e{async execute(){return"boop"}}class we{setTimeoutDelay(t){this.timeoutDelay=t}async getRecaptchaWidget(t){return this.getWidgetOptions=t,new $e}}var xe=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,H=(e,t,o,i)=>{for(var s=i>1?void 0:i?ke(t,o):t,n=e.length-1,a;n>=0;n--)(a=e[n])&&(s=(i?a(t,o,s):a(s))||s);return i&&s&&xe(t,o,s),s};const ee="demo-feature",Ce="demo-survey",te=800,Be=[{label:"Accent color",cssVariable:"--featureFeedbackBlueColor",defaultValue:"#194880",inputType:"color"},{label:"Popup background",cssVariable:"--featureFeedbackPopupBackgroundColor",defaultValue:"#FBFBFD",inputType:"color"},{label:"Upvote color",cssVariable:"--upvoteColor",defaultValue:"#23765D",inputType:"color"},{label:"Downvote color",cssVariable:"--downvoteColor",defaultValue:"#720D11",inputType:"color"}],Fe=[{label:"Display mode",propertyName:"displayMode",defaultValue:"button",inputType:"radio",radioOptions:["button","vote-prompt"]},{label:"Button text",propertyName:"buttonText",defaultValue:"Beta"},{label:"Prompt",propertyName:"prompt",defaultValue:"Do you find this feature useful?"},{label:"Disabled",propertyName:"disabled",defaultValue:!1,inputType:"radio",radioOptions:[!1,!0]}];let I=class extends x{constructor(){super(...arguments),this.failSubmissions=!1,this.submissionLog=[],this.recaptchaManager=new we,this.resizeObserver=new se,this.succeedingService=this.loggedService(new J({delay:te})),this.failingService=this.loggedService(new J({delay:te,returnValue:{success:!1}}))}get service(){return this.failSubmissions?this.failingService:this.succeedingService}record(e){this.submissionLog=[e,...this.submissionLog].slice(0,5)}loggedService(e){return{submitFeedback:async t=>{const o=await e.submitFeedback(t);return this.record(`Feedback: ${t.vote} on ${t.featureIdentifier}`+(t.comments?`, "${t.comments}"`:"")+(o.success?"":" (failed)")),o},submitSurvey:async t=>{const o=await e.submitSurvey(t);return this.record(`Survey ${t.surveyIdentifier}: ${t.responses.length} responses`+(o.success?"":" (failed)")),o}}}render(){return d`
      <story-template
        elementTag="ia-feature-feedback"
        elementClassName="IAFeatureFeedback"
        .styleInputData=${{settings:Be}}
        .propInputData=${{settings:Fe}}
      >
        <ia-feature-feedback
          slot="demo"
          .featureIdentifier=${ee}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        ></ia-feature-feedback>

        <ia-feature-feedback
          slot="demo"
          displayMode="vote-prompt"
          .featureIdentifier=${ee}
          .featureFeedbackService=${this.service}
          .recaptchaManager=${this.recaptchaManager}
          .resizeObserver=${this.resizeObserver}
        ></ia-feature-feedback>

        <ia-feature-feedback-survey
          slot="demo"
          showButtonThumbs
          showQuestionNumbers
          .surveyIdentifier=${Ce}
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
            ${this.submissionLog.length?this.submissionLog.map(e=>d`<li>${e}</li>`):d`<li>None yet.</li>`}
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
    `}};H([v()],I.prototype,"failSubmissions",2);H([v()],I.prototype,"submissionLog",2);I=H([F("ia-feature-feedback-story")],I);export{I as IAFeatureFeedbackStory};
