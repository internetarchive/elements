import { nothing } from 'lit';
import log from './log';
import type { LoanRenewResult, LoanRenewTimeConfig } from '../../models';
import type { LocalCacheInterface } from '@internetarchive/local-cache';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 */
export class LoanRenewHelper {
  hasPageChanged: boolean;

  identifier: string;

  localCache: LocalCacheInterface;

  loanRenewTimeConfig: LoanRenewTimeConfig;

  // messages for auto return machenism
  loanRenewMessage = 'This book has been renewed for #time #unitsOfTime.';

  loanReturnWarning = 'Go to any other page to keep your loan active.';

  // private props
  result: LoanRenewResult = {
    texts: null,
    renewNow: false,
    renewType: '',
  };

  constructor(
    hasPageChanged: boolean,
    identifier: string,
    localCache: LocalCacheInterface,
    loanRenewTimeConfig: LoanRenewTimeConfig,
  ) {
    this.hasPageChanged = hasPageChanged;
    this.identifier = identifier;
    this.localCache = localCache;
    this.loanRenewTimeConfig = loanRenewTimeConfig;
  }

  handleLoanRenew(): Promise<LoanRenewResult> | typeof nothing {
    try {
      if (this.hasPageChanged) {
        return this.pageChanged(); // user clicked on page
      }
      return this.autoChecker(); // auto checker at last 10th minute
    } catch (error) {
      log(error);
    }

    return nothing;
  }

  /**
   * Trigger this function when user has browsed a book and change the page
   * - every time user change the page, we set current time in indexedDB
   * - also check if need to auto renew current loan
   *
   * @returns this.result
   */
  async pageChanged(): Promise<LoanRenewResult> {
    const {
      loanRenewAtLast, // 50
    } = this.loanRenewTimeConfig;
    const currentTime = new Date();
    const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

    const lastTimeFrame = this.changeTime(loanTime, loanRenewAtLast, 'sub');

    // if user viewed new page in last 10 minutes, renew immediately
    if (lastTimeFrame !== null && currentTime >= lastTimeFrame) {
      this.result = {
        texts: this.loanRenewMessage,
        renewNow: true,
        renewType: 'auto',
      };
    }

    this.setPageChangedTime();
    return this.result;
  }

  /**
   * Trigger this function when countdown hits at last 10th minute
   * - if user is active, just renew the loan at last 10th minute
   *
   * @returns this.result
   */
  async autoChecker(): Promise<LoanRenewResult> {
    const { pageChangedInLast } = this.loanRenewTimeConfig;
    const pageChangedTime: Date | undefined = await this.localCache.get(
      `${this.identifier}-pageChangedTime`,
    );

    // in last 15 min if user make any activity.
    const pageChangeTimeFrame = this.changeTime(
      new Date(),
      pageChangedInLast,
      'sub',
    ); // 15 seconds

    if (
      pageChangedTime === undefined ||
      pageChangedTime <= pageChangeTimeFrame
    ) {
      this.result = {
        texts: this.loanReturnWarning,
        renewNow: false, // not viewed
        renewType: '',
      };
    } else if (pageChangedTime >= pageChangeTimeFrame) {
      this.result = {
        texts: '',
        renewNow: true, // viewed in last time frame
        renewType: 'auto',
      };
    }

    return this.result;
  }

  /**
   * set current time in indexedDB when user viewed a new page
   */
  async setPageChangedTime(): Promise<void> {
    await this.localCache.set({
      key: `${this.identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(this.loanRenewTimeConfig.loanTotalTime),
    });
  }

  /**
   * Texts we want to show in toast template including remaining time
   * - eg. 1 minute, 2 minutes
   *
   * @param texts
   * @param secondsLeft
   *
   * @returns texts will be appear in toast template
   */
  getMessageTexts(
    texts: string | null | undefined,
    secondsLeft: number,
  ): string | undefined {
    let unitOfTime = 'minute';

    let toastTexts = texts;
    let timeLeft = secondsLeft;

    // convert time from second to minute
    timeLeft = Math.ceil(timeLeft / 60);

    // convert time from minute to hour
    if (timeLeft > 59) {
      timeLeft = 1; // 1 hour
      unitOfTime = 'hour';
    }

    // replace #time variable with remaining time
    toastTexts = toastTexts?.replace(/#time/, String(timeLeft));

    // replace #unitsOfTime variable with minute/minutes
    return toastTexts?.replace(
      /#unitsOfTime/,
      timeLeft !== 1 ? `${unitOfTime}s` : unitOfTime,
    );
  }

  /**
   * Helper function to get time difference
   *
   * @param date
   * @param seconds
   * @param op like sub, add
   *
   * @returns Date, or null when there is no date to start from
   */
  changeTime(date: Date, seconds: number, op: 'sub' | 'add'): Date;
  changeTime(
    date: Date | undefined,
    seconds: number,
    op: 'sub' | 'add',
  ): Date | null;
  changeTime(
    date: Date | undefined,
    seconds: number,
    op: 'sub' | 'add',
  ): Date | null {
    if (date === undefined) return null;

    if (op === 'sub') {
      return new Date(date.getTime() - seconds * 1000);
    }

    return new Date(date.getTime() + seconds * 1000);
  }
}
