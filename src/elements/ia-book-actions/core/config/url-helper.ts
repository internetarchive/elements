import { nothing } from 'lit';
import '../../globals';

export class URLHelper {
  /**
   * @return is this running in an iframe?
   */
  static isInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      window?.Sentry?.captureException(e);
      return true;
    }
  }

  /**
   * Helper to get current url with respect to parent frame
   * @global top, eg top.window.location
   */
  static getRedirectUrl(): string {
    let url: string;
    if (URLHelper.isInIframe()) {
      // are we in a frame?
      url = (window.top ?? window).location.href;
    } else {
      url = window.location.href;
    }
    return url;
  }

  /**
   * Helper function. Loads URL with consideration to parent frame.
   * @param url
   * @param tryParent (defaults to undefined)
   */
  static goToUrl(url: string, tryParent?: boolean): void {
    let ref: Location;
    if (URLHelper.isInIframe() && tryParent) {
      ref = (window.top ?? window).location;
    } else {
      ref = window.location;
    }
    if (ref.href === url) {
      ref.reload();
    } else {
      ref.href = url;
    }
  }

  static isOnStreamPage(): boolean {
    return window.location.href.indexOf('/stream/') > -1;
  }

  /**
   * Function to get the parameters from the URL
   * it returns param's value if param is defined, `nothing` otherwise
   */
  static getQueryParam(param: string): string | typeof nothing {
    const pageUrl = window.location.search.substring(1);
    const paramsUrl = pageUrl.split('&');
    for (let i = 0; i < paramsUrl.length; i += 1) {
      const pName = paramsUrl[i].split('=');
      if (pName[0] === param) {
        return pName[1];
      }
    }

    return nothing;
  }

  /**
   * Removes the admin or access query param from window href
   */
  static getBackHref(): string {
    return window.location.href.replace(/[?&]{1}(?:admin|access)=1/, '');
  }

  static formatUrl(baseHost: string, url: string): string {
    return /^https?:/.test(url) ? url : `${baseHost}${url}`;
  }
}
