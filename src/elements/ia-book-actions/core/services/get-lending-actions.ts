import { msg, str } from '@lit/localize';
import { URLHelper } from '../config/url-helper';
import ActionsConfig from './actions-config';
import type { ActionConfig, LendingActions, LendingStatus } from '../../models';

/**
 * This is the main controller/service class helps to fetch different action buttons
 * from a lendable item.
 *
 * We are showing action button in two column
 * 1. primaryAction: contains primary action button like Browse, Borrow, Return, Waitlist etc...
 * 2. secondaryActions: container secondary action button like Admin Access, Purchase link etc...
 *
 * Response of this class contain an object as follows:-
 * {
 *   primaryTitle: '',
 *   primaryActions: [this.actionsConfig.returnBookConfig()],
 *   primaryColor: 'primary',
 *   secondaryActions: [this.actionsConfig.purchaseConfig()],
 * }
 *
 * Explanation of above fields are as follows:-
 * 1. primaryTitle: Describe current loan status of this book.
 * 2. primaryActions: Consists an array of action buttons (Browse, Borrow, Return) based on loanStatus.
 *    The action buttons configuration is coming from ActionsConfig class.
 * 3. primaryColor: Color of initial action button and dropdown button on mobile devices.
 * 4. secondaryActions: Consists an array of action buttons (Admin Acess, Purchase Link) based on availability.
 *    The action buttons configuration is coming from ActionsConfig class.
 */

/**
 * Book titles. Each one is looked up when it is read, so it follows the
 * active locale.
 */
export const bookTitles = {
  get available_1hr(): string {
    return msg('Renews automatically with continued use.');
  },
  get available_14d(): string {
    return msg('This book can be borrowed for 14 days.');
  },
  get available_pd(): string {
    return msg('Book available to patrons with print disabilities.');
  },
  get available_waitlist(): string {
    return msg('A waitlist is available.');
  },
  get admin_access(): string {
    return msg('You have administrative privileges to read this book.');
  },
  get claim_waitlist(): string {
    return msg('You are at the top of the waitlist for this book.');
  },
  get being_borrowed(): string {
    return msg('Another patron is using this book. Please check back later.');
  },
  get eligible_pd(): string {
    return msg('You are eligible for print-disabled access.');
  },
  get on_waitlist(): string {
    return msg('You are on the waitlist for this book.');
  },
  get session_expired(): string {
    return msg('Renews automatically with continued use.');
  },
  get unavailable(): string {
    return msg('This book is not available at this time.');
  },
};

/** True when both numbers are known and `count` has reached `limit`. */
function hasReached(count?: number, limit?: number): boolean {
  return count !== undefined && limit !== undefined && count >= limit;
}

export class GetLendingActions {
  userid: string;

  identifier: string;

  lendingStatus: LendingStatus;

  bwbPurchaseUrl: string;

  actionsConfig: ActionsConfig;

  constructor(
    userid: string,
    identifier: string,
    lendingStatus: LendingStatus,
    bwbPurchaseUrl: string,
  ) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.actionsConfig = new ActionsConfig(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl,
    );
  }

  onlyAdminAction(): LendingActions {
    return {
      primaryTitle: bookTitles.admin_access,
      primaryActions: [],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  adminOrPrintDisabledReadingAction(): LendingActions {
    return {
      primaryTitle: '',
      primaryActions: [],
      secondaryActions: [this.actionsConfig.adminOrPrintDisabledExitConfig()],
      borrowType: 'adminBorrowed',
    };
  }

  patronIsReadingAction(): LendingActions {
    const lendingStatus = this.lendingStatus || {};
    const disableBorrow = hasReached(
      lendingStatus.loanCount,
      lendingStatus.maxLoans,
    );

    let primaryTitleText = '';
    const isBrowsing =
      lendingStatus.user_has_browsed && !lendingStatus.browsingExpired;
    if (isBrowsing) {
      primaryTitleText = bookTitles.available_1hr;
    } else {
      primaryTitleText = msg(
        str`Your loan of this book has ${lendingStatus.daysLeftOnLoan} days left.`,
      );
    }

    return {
      primaryTitle: primaryTitleText,
      primaryActions: [
        this.actionsConfig.returnBookConfig(),
        this.actionsConfig.borrowBookConfig(disableBorrow),
        this.actionsConfig.waitlistConfig(),
        this.actionsConfig.printDisabilityConfig(),
      ],
      primaryColor: 'danger',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
      borrowType: isBrowsing ? 'browsed' : 'borrowed',
    };
  }

  claimWaitlistAction(): LendingActions {
    const lendingStatus = this.lendingStatus || {};

    const leaveWaitlist = this.actionsConfig.leaveWaitlistConfig();
    const borrowBook = this.actionsConfig.borrowBookConfig();
    const browseBook = lendingStatus.available_to_browse
      ? this.actionsConfig.firstBrowseConfig()
      : null;

    const actions = [borrowBook];
    if (browseBook) actions.push(browseBook);
    actions.push(leaveWaitlist);

    return {
      primaryTitle: bookTitles.claim_waitlist,
      primaryActions: actions,
      primaryColor: 'primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrowPrintDisabledAction(): LendingActions {
    return {
      primaryTitle: bookTitles.eligible_pd,
      primaryActions: [this.actionsConfig.borrowBookConfig()],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  onlyPrintDisabledAction(): LendingActions {
    const unavailable = !this.lendingStatus.isAdmin
      ? this.actionsConfig.unavailableBookConfig()
      : null;
    return {
      primaryTitle: bookTitles.available_pd,
      primaryActions: [unavailable],
      primaryColor: 'primary',
      secondaryActions: [],
    };
  }

  onWaitlistAction(): LendingActions {
    return {
      primaryTitle: bookTitles.on_waitlist,
      primaryActions: [
        this.actionsConfig.leaveWaitlistConfig(),
        this.actionsConfig.firstBrowseConfig(),
      ],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  // check restricted item behaviour here /activemeasuresse0000ridt
  restrictedAction(): LendingActions {
    const lendingStatus = this.lendingStatus || {};
    const anotherPatronUsing =
      lendingStatus.max_browsable_copies &&
      !lendingStatus.available_lendable_copies;
    const title = anotherPatronUsing
      ? bookTitles.being_borrowed
      : bookTitles.unavailable;

    return {
      primaryTitle: title,
      primaryActions: [this.actionsConfig.unavailableBookConfig()],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  loggedOutOptions(): LendingActions {
    const lendingStatus = this.lendingStatus || {};

    const showCantBorrowPlaceholder =
      !lendingStatus.available_to_waitlist &&
      !lendingStatus.available_to_borrow;

    const waitlist = this.actionsConfig.waitlistConfig();
    let borrow: ActionConfig | null = null;

    if (
      lendingStatus.available_to_borrow ||
      lendingStatus.available_to_browse
    ) {
      borrow = this.actionsConfig.loginAndBorrowBookConfig();
    } else if (showCantBorrowPlaceholder) {
      borrow = this.actionsConfig.unavailableBookConfig();
    }

    const printDisability = this.actionsConfig.printDisabilityConfig();

    const actions = [borrow, waitlist, printDisability].filter((action) => {
      return action !== null;
    });

    const title = lendingStatus.available_to_browse
      ? bookTitles.available_1hr
      : lendingStatus.available_to_borrow
        ? bookTitles.available_14d
        : bookTitles.unavailable;

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrow1HrAction(): LendingActions {
    const lendingStatus = this.lendingStatus || {};

    // assess borrowable state
    const browsingHasExpired =
      !lendingStatus.available_to_browse && lendingStatus.browsingExpired;
    const canBrowse = lendingStatus.available_to_browse || browsingHasExpired;
    const canBrowseAndBorrow = canBrowse && lendingStatus.available_to_borrow;

    const canBrowseHasWaitlist =
      canBrowse &&
      !lendingStatus.available_to_borrow &&
      lendingStatus.available_to_waitlist;

    const canBrowseCantBorrowCantWaitlist =
      canBrowse &&
      !lendingStatus.available_to_borrow &&
      !lendingStatus.available_to_waitlist;

    const availableCopies = lendingStatus.available_browsable_copies;
    const maxCopies = lendingStatus.max_browsable_copies;
    const allBrowsableCopiesTaken =
      availableCopies !== undefined &&
      maxCopies !== undefined &&
      availableCopies < 1 &&
      availableCopies < maxCopies;
    // end config

    const title = browsingHasExpired
      ? bookTitles.session_expired
      : !canBrowse && allBrowsableCopiesTaken
        ? bookTitles.being_borrowed
        : !canBrowse && lendingStatus.available_to_waitlist
          ? bookTitles.available_waitlist
          : bookTitles.available_1hr;

    // one hour borrow config
    const oneHrBorrow = browsingHasExpired
      ? this.actionsConfig.browseAgainConfig()
      : this.actionsConfig.firstBrowseConfig();

    const borrow = this.actionsConfig.borrowBookConfig();
    const waitlist = this.actionsConfig.waitlistConfig();
    const printDisability = this.actionsConfig.printDisabilityConfig();

    const dropdownOptions = canBrowseAndBorrow
      ? [oneHrBorrow, borrow, printDisability]
      : canBrowseHasWaitlist
        ? [oneHrBorrow, waitlist, printDisability]
        : [];
    const actions = canBrowseCantBorrowCantWaitlist
      ? [oneHrBorrow, printDisability]
      : dropdownOptions;

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrowAction(): LendingActions {
    const lendingStatus = this.lendingStatus || {};
    const isLoggedIn = !!this.userid;

    if (!isLoggedIn) {
      return this.loggedOutOptions();
    }

    if (lendingStatus.available_to_browse || lendingStatus.browsingExpired) {
      return this.borrow1HrAction();
    }

    /* Borrow 14day */
    let borrow: ActionConfig | null = null;

    const waitlist = this.actionsConfig.waitlistConfig();
    const printDisability = this.actionsConfig.printDisabilityConfig();

    const disableBorrow = hasReached(
      lendingStatus.loanCount,
      lendingStatus.maxLoans,
    );
    const cantBorrowNorWaitlist =
      !lendingStatus.available_to_borrow && !waitlist;

    if (cantBorrowNorWaitlist) {
      borrow = this.actionsConfig.unavailableBookConfig();
    } else if (lendingStatus.available_to_borrow) {
      borrow = this.actionsConfig.borrowBookConfig(disableBorrow);
    }

    const actions = [borrow, waitlist, printDisability].filter((action) => {
      return action !== null;
    });

    return {
      primaryTitle: waitlist ? bookTitles.being_borrowed : '',
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  /**
   * @deprecated
   *
   * Builds the countdown toolbar title.
   *
   * @return string innerHTML for the dialogOpts title attribute
   */
  getBrowseCountdownTitle(): string {
    const secondsRemaining = Number(this.lendingStatus.secondsLeftOnLoan);

    const borrowEndTime = new Date(+new Date() + secondsRemaining * 1000);
    let hour = borrowEndTime.getHours() % 12;
    const minute = ('' + borrowEndTime.getMinutes()).replace(
      /^(\d{1})$/,
      '0$1',
    );
    const ampm = borrowEndTime.getHours() > 11 ? ' PM' : ' AM';
    if (hour === 0) {
      hour = 12;
    }

    return 'Borrow ends at ' + hour + ':' + minute + ampm;
  }

  getCurrentLendingActions(): LendingActions {
    let lendingActions: LendingActions;
    const lendingStatus = this.lendingStatus || {};

    const isAdminReading =
      URLHelper.getQueryParam('admin') == '1' && lendingStatus.isAdmin;
    const userIsPrintdisabledReading =
      URLHelper.getQueryParam('access') == '1' &&
      lendingStatus.user_is_printdisabled;

    const patronIsReading =
      lendingStatus.user_has_borrowed ||
      (lendingStatus.user_has_browsed && !lendingStatus.browsingExpired);

    const notBorrowed =
      !lendingStatus.user_has_borrowed && !lendingStatus.user_has_browsed;
    const notBorrowable =
      !lendingStatus.available_to_borrow && !lendingStatus.available_to_browse;

    const userCanAccessPrintDisabled =
      lendingStatus.is_printdisabled && lendingStatus.user_is_printdisabled;

    const canBorrow =
      (lendingStatus.available_to_browse ||
        lendingStatus.available_to_borrow) &&
      notBorrowed &&
      !lendingStatus.user_on_waitlist;

    // sequential order of hierarchal access from lendingStatus
    // - admin or print-disabled reading
    // - partron reading (browsing/borrowing)
    // - leave waitlist
    // - can borrow print-disabled
    // - can borrow
    // - only print-disabled access
    // - is on waitlist
    // - restricted items

    if (isAdminReading || userIsPrintdisabledReading) {
      lendingActions = this.adminOrPrintDisabledReadingAction();
    } else if (lendingStatus.isAdmin && notBorrowed && notBorrowable) {
      lendingActions = this.onlyAdminAction();
    } else if (patronIsReading) {
      lendingActions = this.patronIsReadingAction();
    } else if (lendingStatus.user_can_claim_waitlist) {
      lendingActions = this.claimWaitlistAction();
    } else if (userCanAccessPrintDisabled) {
      lendingActions = this.borrowPrintDisabledAction();
    } else if (canBorrow || lendingStatus.browsingExpired) {
      lendingActions = this.borrowAction();
    } else if (lendingStatus.isPrintDisabledOnly) {
      lendingActions = this.onlyPrintDisabledAction();
    } else if (lendingStatus.user_on_waitlist) {
      lendingActions = this.onWaitlistAction();
    } else {
      lendingActions = this.restrictedAction();
    }

    return lendingActions;
  }
}
