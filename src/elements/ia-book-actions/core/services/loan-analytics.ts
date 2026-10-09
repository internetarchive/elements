import { analyticsCategories } from '../config/analytics-event-and-category';
import * as Cookies from './doc-cookies';
import log from './log';
import type { LoanEventCounts } from '../../models';
import '../../globals';

/**
 * This class is used to send different GA events for loan system.
 */
export default class LoanAnanlytics {
  identifier?: string;

  /**
   * contains the counts we send to GA
   * - browse count
   * - renew count
   * - expire count
   */
  gaStats: Partial<LoanEventCounts> = {};

  lendingEventCounts: LoanEventCounts | null = null;

  /**
   * store loan stats count in cookies to remember the count we need to sent GA
   *
   * @param identifier - book id
   * @param action - user action on book
   */
  async storeLoanStatsCount(identifier: string, action = ''): Promise<void> {
    this.identifier = identifier;

    try {
      await this.getLoanStatsCount(action);

      this.sendMatrixStatsEvents(action);

      const date = new Date();
      date.setHours(date.getHours() + 2); // 2 hours

      // set new value
      await Cookies.setItem(
        this.getLoanCountStorageKey,
        JSON.stringify(this.lendingEventCounts),
        date,
        '/',
      );
    } catch (error) {
      log(error);
      // the caught error is reported as it is
      this.sendEvent('Cookies-Error-Actions', error, this.identifier);
    }
  }

  /**
   * get loan stats count from cookies for GA
   *
   * @param action browse|autorenew|etc...
   */
  async getLoanStatsCount(action: string): Promise<void> {
    const stored = await Cookies.getItem(this.getLoanCountStorageKey);
    this.lendingEventCounts =
      stored === null ? null : (JSON.parse(stored) as LoanEventCounts | null);

    this.gaStats = this.lendingEventCounts ?? {
      browse: 0,
      renew: 0,
      expire: 0,
    };

    let browse = this.lendingEventCounts?.browse ?? 0;
    let renew = this.lendingEventCounts?.renew ?? 0;
    let expire = this.lendingEventCounts?.expire ?? 0;

    // Only `browse`, `autorenew` and `return` change the counts. Any other
    // action, `browseagain` and `autoreturn` included, leaves them as stored.
    switch (action) {
      case 'browse':
        browse = browse ? Number(browse) + 1 : 1;
        this.gaStats.browse = browse;

        // reset renew and expire count
        renew = 0;
        expire = 0;
        break;

      case 'autorenew':
        renew = renew ? Number(renew) + 1 : 1;
        this.gaStats.renew = renew;
        break;

      case 'return':
        expire = expire ? Number(expire) + 1 : 1;
        this.gaStats.expire = expire;

        // reset renew and expire count
        renew = 0;
        expire = 0;
        break;
      default:
        break;
    }

    // store these counts in cookies
    this.lendingEventCounts = { browse, renew, expire };
  }

  /**
   * Send auto-renew Matrix stats events to GA
   * eg
   * - browse001-autorenew000:browse
   * - browse001-autorenew001:autorenew
   * - and so on...
   *
   * @param action
   */
  sendMatrixStatsEvents(action: string): void {
    // obtain GA category, event
    const category = analyticsCategories.browse;
    const event = `browse${this.paddedNumber(
      this.gaStats?.browse,
    )}-autorenew${this.paddedNumber(this.gaStats?.renew)}:${action}`;

    // send events
    this.sendEvent(category, event, this.identifier);
  }

  /**
   * get zero padded number
   *
   * @return 001|010
   */
  paddedNumber(number?: number): string {
    if (number) return number.toString().padStart(3, '0');

    return '000';
  }

  /**
   * get storage key for loan stats count
   */
  get getLoanCountStorageKey(): string {
    return `br-browse-${this.identifier}`;
  }

  /**
   * responsible to sent events to GA
   *
   * @param eventCategory
   * @param eventAction
   * @param label
   * @param extraParams
   */
  sendEvent(
    eventCategory: string,
    eventAction: unknown,
    label?: string,
    extraParams?: unknown,
  ): void {
    window?.archive_analytics?.send_event_no_sampling(
      eventCategory,
      eventAction,
      label || this.identifier,
      extraParams,
    );
  }
}
