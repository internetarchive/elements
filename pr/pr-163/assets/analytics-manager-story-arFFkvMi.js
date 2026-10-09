import{i as d,A as m,b as g,a as u,r as c,c as v}from"./index-Cxi6Bih-.js";import"./service-template-CTxXdNum.js";import"./theme-styles-B6XJ1gfP.js";const y=`export type AnalyticsEventConfig = {
  service?: string;
};

export type AnalyticsEvent = {
  /**
   * The event category, ie. "DonatePage"
   *
   * @type {string}
   */
  category: string;

  /**
   * The event action, ie. "LinkClicked"
   *
   * @type {string}
   */
  action: string;

  /**
   * The event label, used to add specificity to the action, ie "MoreInfoLink"
   *
   * Defaults to window.location.pathname if not provided
   *
   * @type {string}
   */
  label?: string;

  /**
   * Configuration for the event, such as \`service\`
   *
   * This does not get passed to Google Analytics.
   *
   * @type {AnalyticsEventConfig}
   */
  eventConfiguration?: AnalyticsEventConfig;
};

export interface AnalyticsManagerInterface {
  /**
   * A general purpose analytics ping that takes arbitrary key-value pairs
   * and pings the analytics endpoint
   *
   * @param {Record<string, any>} values
   */
  sendPing(values: Record<string, any>): void;

  /**
   * Send a sampled event
   *
   * @param {options} AnalyticsEvent
   */
  sendEvent(options: AnalyticsEvent): void;

  /**
   * Send an unsampled event.
   *
   * **NOTE** Use sparingly as it can generate a lot of events
   * and deplete our event budget.
   *
   * @param {options} AnalyticsEvent
   */
  sendEventNoSampling(options: AnalyticsEvent): void;
}

export class AnalyticsManager implements AnalyticsManagerInterface {
  private readonly ARCHIVE_ANALYTICS_VERSION = 2;

  private readonly DEFAULT_SERVICE = 'ao_2';

  /**
   * The service for sending events without sampling
   *
   * @private
   * @memberof ArchiveAnalytics
   */
  private readonly NO_SAMPLING_SERVICE = 'ao_no_sampling';

  private readonly DEFAULT_IMAGE_URL = 'https://athena.archive.org/0.gif';

  private defaultService: string;

  private imageUrl: string;

  private imageContainer: Node;

  /**
   * Force an image ping inistead of using the sendBeacon API
   *
   * Useful to test older browser support.
   *
   * @private
   * @type {boolean}
   * @memberof ArchiveAnalytics
   */
  private requireImagePing: boolean;

  /**
   * Creates an instance of AnalyticsManager.
   * @param {{
   *   service?: string;
   *   imageUrl?: string;
   *   imageContainer?: Node;
   *   requireImagePing?: boolean;
   * }} [options]
   * @memberof AnalyticsManager
   */
  constructor(options?: {
    defaultService?: string;
    imageUrl?: string;
    imageContainer?: Node;
    requireImagePing?: boolean;
  }) {
    this.defaultService = options?.defaultService ?? this.DEFAULT_SERVICE;
    this.imageUrl = options?.imageUrl ?? this.DEFAULT_IMAGE_URL;
    this.imageContainer = options?.imageContainer ?? document.body;
    this.requireImagePing = options?.requireImagePing ?? false;
  }

  /** @inheritdoc */
  sendPing(values?: Record<string, any>) {
    const url = this.generateTrackingUrl(values).toString();
    if (this.requireImagePing) {
      this.sendPingViaImage(url);
      return;
    }

    // \`navigator\` has to be bound to ensure it does not error in some browsers
    // https://xgwang.me/posts/you-may-not-know-beacon/#it-may-throw-error%2C-be-sure-to-catch
    const send = navigator.sendBeacon && navigator.sendBeacon.bind(navigator);

    try {
      // if \`send\` is \`undefined\` it'll throw and fall back to the image ping
      send!(url);
    } catch (err) {
      this.sendPingViaImage(url);
    }
  }

  /** @inheritdoc */
  sendEvent(options: AnalyticsEvent) {
    const label =
      options.label && options.label.trim().length > 0
        ? options.label
        : window.location.pathname;
    const eventParams = {
      kind: 'event',
      ec: options.category,
      ea: options.action,
      el: label,
      cache_bust: Math.random(),
      ...options.eventConfiguration,
    };
    this.sendPing(eventParams);
  }

  /** @inheritdoc */
  sendEventNoSampling(options: AnalyticsEvent): void {
    const eventConfig = options.eventConfiguration || {};
    eventConfig.service = this.NO_SAMPLING_SERVICE;
    const newOptions = options;
    newOptions.eventConfiguration = eventConfig;
    this.sendEvent(newOptions);
  }

  /**
   * Sends a ping via Image object
   * @param {string} url Image url
   */
  private sendPingViaImage(url: string) {
    const pingImage = new Image(1, 1);
    pingImage.src = url;
    pingImage.alt = '';
    this.imageContainer.appendChild(pingImage);
  }

  /**
   * Construct complete tracking URL containing payload
   * @param {Object} params Tracking parameters to pass
   * @return {String} URL to use for tracking call
   */
  private generateTrackingUrl(params?: Record<string, any>): URL {
    const outputParams = params ?? {};
    outputParams.service = outputParams.service ?? this.defaultService;
    const url = new URL(this.imageUrl);

    // Build array of querystring parameters
    const keys = Object.keys(outputParams);
    keys.forEach((key: string) => {
      const value = outputParams[key];
      url.searchParams.append(key, value);
    });
    url.searchParams.append('version', \`\${this.ARCHIVE_ANALYTICS_VERSION}\`);
    url.searchParams.append('count', \`\${keys.length + 2}\`);
    return url;
  }
}
`,h=`import type { AnalyticsManagerInterface } from './analytics-manager';

export interface AnalyticsHelperInterface {
  /**
   * Handles tracking events passed in via \`iax\` query parameter.
   *
   * Format is \`?iax=Category|Action|Label\` // Label is optional
   * eg \`?iax=EmailCampaign|RedButtonClicked\`
   * NOTE: Uses the unsampled analytics property. Watch out for future high click links!
   *
   * @param {string}
   */
  trackIaxParameter(location: string): void;

  /**
   * Tracks a page view
   *
   * Appends several environmental values like
   * locale, timezone, referrer, and others.
   *
   * @param {{
   *     mediaType?: string;
   *     mediaLanguage?: string;
   *     primaryCollection?: string;
   *     page?: string;
   *   }} [options]
   * @memberof AnalyticsHelperInterface
   */
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void;
}

export class AnalyticsHelpers implements AnalyticsHelperInterface {
  private analyticsManager: AnalyticsManagerInterface;

  constructor(analyticsManager: AnalyticsManagerInterface) {
    this.analyticsManager = analyticsManager;
  }

  /** @inheritdoc */
  trackIaxParameter(location: string) {
    const url = new URL(location);
    const iaxParam = url.searchParams.get('iax');
    if (!iaxParam) return;
    const eventValues = iaxParam.split('|');
    const actionValue = eventValues.length >= 1 ? eventValues[1] : '';
    const labelValue = eventValues.length >= 2 ? eventValues[2] : '';

    this.analyticsManager.sendEventNoSampling({
      category: eventValues[0],
      action: actionValue,
      label: labelValue,
    });
  }

  /** @inheritdoc */
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }) {
    const event: Record<string, any> = {};

    event.kind = 'pageview';
    event.timediff = (new Date().getTimezoneOffset() / 60) * -1; // *timezone* diff from UTC
    event.locale = navigator.language;
    event.referrer = document.referrer === '' ? '-' : document.referrer;

    const { domInteractive, defaultFontSize } = this;
    if (domInteractive) {
      event.loadtime = domInteractive; // loadtime is the historical name for this event
    }
    if (defaultFontSize) {
      event.iaprop_fontSize = defaultFontSize;
    }

    if ('devicePixelRatio' in window) {
      event.iaprop_devicePixelRatio = window.devicePixelRatio;
    }

    if (options?.mediaType) {
      event.iaprop_mediaType = options.mediaType;
    }

    if (options?.mediaLanguage) {
      event.iaprop_mediaLanguage = options.mediaLanguage;
    }

    if (options?.primaryCollection) {
      event.iaprop_primaryCollection = options.primaryCollection;
    }

    if (options?.page) {
      event.page = options.page;
    }

    this.analyticsManager.sendPing(event);
  }

  /**
   * Computes the default font size of the browser.
   *
   * @returns {String|null} computed font-size with units (typically pixels)
   */
  private get defaultFontSize(): string | null {
    const style = window.getComputedStyle(document.documentElement);
    if (!style) return null;

    const fontSizeString = style.fontSize;
    // the 1.6 multiplier offsets the 10px base font size (62.5% in bootstrap)
    const fontSizeNumber = parseFloat(fontSizeString) * 1.6;
    const unit = fontSizeString.replace(/(\\d*\\.\\d+)|\\d+/, '');
    return \`\${fontSizeNumber}\${unit}\`;
  }

  /**
   * Gets the time until DOM Interactive from the performance API
   *
   * Not supported in Safari or IE
   *
   * @readonly
   * @private
   * @type {(number | undefined)}
   * @memberof AnalyticsHelpers
   */
  private get domInteractive(): number | undefined {
    if (!window.performance || !window.performance.getEntriesByType)
      return undefined;
    const performanceEntries = window.performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];
    if (performanceEntries.length === 0) return undefined;
    const entry = performanceEntries[0];
    return entry.domInteractive;
  }
}
`,f=`import {
  AnalyticsManager,
  AnalyticsManagerInterface,
  AnalyticsEvent,
} from './analytics-manager';
import {
  AnalyticsHelpers,
  AnalyticsHelperInterface,
} from './analytics-helpers';

export interface AnalyticsHandlerInterface {
  /**
   * A general purpose analytics ping that takes arbitrary key-value pairs
   * and pings the analytics endpoint
   *
   * @param {Record<string, any>} values
   */
  sendPing(values: Record<string, any>): void;

  /**
   * Send a sampled event
   *
   * @param {options} AnalyticsEvent
   */
  sendEvent(options: AnalyticsEvent): void;

  /** @deprecated use sendEvent instead */
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void;

  /**
   * Send an unsampled event.
   *
   * **NOTE** Use sparingly as it can generate a lot of events
   * and deplete our event budget.
   *
   * @param {options} AnalyticsEvent
   */
  sendEventNoSampling(options: AnalyticsEvent): void;

  /**
   * Handles tracking events passed in via \`iax\` query parameter.
   *
   * Format is \`?iax=Category|Action|Label\` // Label is optional
   * eg \`?iax=EmailCampaign|RedButtonClicked\`
   * NOTE: Uses the unsampled analytics property. Watch out for future high click links!
   *
   * @param {string}
   */
  trackIaxParameter(location: string): void;

  /**
   * Tracks a page view
   *
   * Appends several environmental values like
   * locale, timezone, referrer, and others.
   *
   * @param {{
   *     mediaType?: string;
   *     mediaLanguage?: string;
   *     primaryCollection?: string;
   *     page?: string;
   *   }} [options]
   * @memberof AnalyticsHelperInterface
   */

  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void;
}

export class AnalyticsHandler implements AnalyticsHandlerInterface {
  private analyticsBackend?: AnalyticsManagerInterface;

  private analyticsHelpers?: AnalyticsHelperInterface;

  constructor(options: { enableAnalytics: boolean }) {
    if (!options.enableAnalytics) return;
    this.analyticsBackend = new AnalyticsManager();
    this.analyticsHelpers = new AnalyticsHelpers(this.analyticsBackend);
  }

  /** @inheritdoc */
  sendPing(values: Record<string, any>): void {
    this.analyticsBackend?.sendPing(values);
  }

  /** @inheritdoc */
  sendEvent(options: AnalyticsEvent): void {
    this.analyticsBackend?.sendEvent(options);
  }

  /** @inheritdoc */
  send_event(
    category: string,
    action: string,
    label?: string,
    additionalEventParams?: object,
  ): void {
    this.sendEvent({
      category,
      action,
      label,
      eventConfiguration: additionalEventParams,
    });
  }

  /** @inheritdoc */
  sendEventNoSampling(options: AnalyticsEvent): void {
    this.analyticsBackend?.sendEventNoSampling(options);
  }

  /** @inheritdoc */
  trackIaxParameter(location: string): void {
    this.analyticsHelpers?.trackIaxParameter(location);
  }

  /** @inheritdoc */
  trackPageView(options?: {
    mediaType?: string;
    mediaLanguage?: string;
    primaryCollection?: string;
    page?: string;
  }): void {
    this.analyticsHelpers?.trackPageView(options);
  }
}
`;class b{constructor(n){this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE="ao_2",this.NO_SAMPLING_SERVICE="ao_no_sampling",this.DEFAULT_IMAGE_URL="https://athena.archive.org/0.gif",this.defaultService=n?.defaultService??this.DEFAULT_SERVICE,this.imageUrl=n?.imageUrl??this.DEFAULT_IMAGE_URL,this.imageContainer=n?.imageContainer??document.body,this.requireImagePing=n?.requireImagePing??!1}sendPing(n){const e=this.generateTrackingUrl(n).toString();if(this.requireImagePing){this.sendPingViaImage(e);return}const t=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{t(e)}catch{this.sendPingViaImage(e)}}sendEvent(n){const e=n.label&&n.label.trim().length>0?n.label:window.location.pathname,t={kind:"event",ec:n.category,ea:n.action,el:e,cache_bust:Math.random(),...n.eventConfiguration};this.sendPing(t)}sendEventNoSampling(n){const e=n.eventConfiguration||{};e.service=this.NO_SAMPLING_SERVICE;const t=n;t.eventConfiguration=e,this.sendEvent(t)}sendPingViaImage(n){const e=new Image(1,1);e.src=n,e.alt="",this.imageContainer.appendChild(e)}generateTrackingUrl(n){const e=n??{};e.service=e.service??this.defaultService;const t=new URL(this.imageUrl),a=Object.keys(e);return a.forEach(i=>{const o=e[i];t.searchParams.append(i,o)}),t.searchParams.append("version",`${this.ARCHIVE_ANALYTICS_VERSION}`),t.searchParams.append("count",`${a.length+2}`),t}}class E{constructor(n){this.analyticsManager=n}trackIaxParameter(n){const t=new URL(n).searchParams.get("iax");if(!t)return;const a=t.split("|"),i=a.length>=1?a[1]:"",o=a.length>=2?a[2]:"";this.analyticsManager.sendEventNoSampling({category:a[0],action:i,label:o})}trackPageView(n){const e={};e.kind="pageview",e.timediff=new Date().getTimezoneOffset()/60*-1,e.locale=navigator.language,e.referrer=document.referrer===""?"-":document.referrer;const{domInteractive:t,defaultFontSize:a}=this;t&&(e.loadtime=t),a&&(e.iaprop_fontSize=a),"devicePixelRatio"in window&&(e.iaprop_devicePixelRatio=window.devicePixelRatio),n?.mediaType&&(e.iaprop_mediaType=n.mediaType),n?.mediaLanguage&&(e.iaprop_mediaLanguage=n.mediaLanguage),n?.primaryCollection&&(e.iaprop_primaryCollection=n.primaryCollection),n?.page&&(e.page=n.page),this.analyticsManager.sendPing(e)}get defaultFontSize(){const n=window.getComputedStyle(document.documentElement);if(!n)return null;const e=n.fontSize,t=parseFloat(e)*1.6,a=e.replace(/(\d*\.\d+)|\d+/,"");return`${t}${a}`}get domInteractive(){if(!window.performance||!window.performance.getEntriesByType)return;const n=window.performance.getEntriesByType("navigation");return n.length===0?void 0:n[0].domInteractive}}var I=Object.defineProperty,A=Object.getOwnPropertyDescriptor,l=(r,n,e,t)=>{for(var a=t>1?void 0:t?A(n,e):n,i=r.length-1,o;i>=0;i--)(o=r[i])&&(a=(t?o(n,e,a):o(a))||a);return t&&a&&I(n,e,a),a};const P=`import { AnalyticsManager } from '@internetarchive/elements/services/analytics-manager/analytics-manager';

const analytics = new AnalyticsManager();
analytics.sendEvent({
  category: 'DonatePage',
  action: 'LinkClicked',
  label: 'MoreInfoLink',
});`,w=r=>r.replace(/^import[\s\S]*?from '[^']+';\n/gm,"").trim(),S=[y,h,f].map(w).join(`

`);let s=class extends d{constructor(){super(...arguments),this.method="sendEvent",this.category="",this.action="",this.label=""}render(){const r=this.method==="trackIaxParameter";return g`
      <service-template
        serviceName="analytics-manager"
        .usage=${P}
        .apiSource=${S}
      >
        <form slot="console" @submit=${this.run}>
          <label>
            Method
            <select @change=${this.pickMethod}>
              ${["sendEvent","sendEventNoSampling","trackIaxParameter"].map(n=>g`<option value=${n} ?selected=${n===this.method}>
                    ${n}
                  </option>`)}
            </select>
          </label>
          <label>
            Category
            <input
              type="text"
              placeholder="DonatePage"
              autocomplete="off"
              .value=${this.category}
              @input=${n=>this.category=n.target.value}
            />
          </label>
          <label>
            Action
            <input
              type="text"
              placeholder="LinkClicked"
              autocomplete="off"
              .value=${this.action}
              @input=${n=>this.action=n.target.value}
            />
          </label>
          <label>
            Label (optional)
            <input
              type="text"
              placeholder="MoreInfoLink"
              autocomplete="off"
              .value=${this.label}
              @input=${n=>this.label=n.target.value}
            />
          </label>
          <button type="submit">${r?"Track":"Send"}</button>
          <div class="result" aria-live="polite" ?hidden=${!this.result}>
            ${this.result?g`<code class="call">${this.result.call}</code>
                  <code class="output"
                    >${this.result.url.origin}${this.result.url.pathname}</code
                  >
                  <table>
                    ${[...this.result.url.searchParams].map(([n,e])=>g`<tr>
                          <th scope="row">${n}</th>
                          <td>${e}</td>
                        </tr>`)}
                  </table>`:m}
          </div>
        </form>
        <div slot="usage-notes">
          <p>
            Events go to archive.org's analytics as a tracking pixel ping. This
            page captures the ping URL instead of sending it, so nothing is
            recorded. The <code>cache_bust</code> value is random on every call.
          </p>
          <p>
            <code>trackIaxParameter</code> reads the <code>iax</code> query
            parameter of a URL (<code>?iax=Category|Action|Label</code>). Here
            it's built from the three fields.
          </p>
        </div>
      </service-template>
    `}pickMethod(r){this.method=r.target.value,this.result=void 0}run(r){r.preventDefault();const n={category:this.category,action:this.action,label:this.label||void 0};let e;const t=navigator.sendBeacon;navigator.sendBeacon=i=>(e=String(i),!0);let a;try{const i=new b;if(this.method==="trackIaxParameter"){const o=[this.category,this.action,this.label].join("|").replace(/\|+$/,""),p=`https://archive.org/?iax=${encodeURIComponent(o)}`;new E(i).trackIaxParameter(p),a=`trackIaxParameter(${JSON.stringify(p)})`}else i[this.method](n),a=`${this.method}(${JSON.stringify(n)})`}finally{navigator.sendBeacon=t}this.result=e?{call:a,url:new URL(e)}:void 0}static get styles(){return u`
      form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        font-size: 0.8rem;
      }

      input[type='text'] {
        min-width: 0;
        width: 10rem;
        max-width: 100%;
      }

      .result[hidden] {
        display: none;
      }

      .result {
        box-sizing: border-box;
        flex-basis: 100%;
        min-width: 0;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0.5rem;
        background: #fff;
        border: 1px solid #ccc;
        font-size: 0.85rem;
      }

      .call,
      .output {
        overflow-wrap: anywhere;
      }

      .output {
        font-weight: 600;
      }

      table {
        border-collapse: collapse;
        font-size: 0.8rem;
      }

      th,
      td {
        text-align: left;
        padding: 1px 8px 1px 0;
        overflow-wrap: anywhere;
      }
    `}};l([c()],s.prototype,"method",2);l([c()],s.prototype,"category",2);l([c()],s.prototype,"action",2);l([c()],s.prototype,"label",2);l([c()],s.prototype,"result",2);s=l([v("analytics-manager-story")],s);export{s as AnalyticsManagerStory};
