import { msg } from '@lit/localize';
import { URLHelper } from '../config/url-helper';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category';
import type { ActionConfig, EmbedActions, LendingStatus } from '../../models';

/**
 * This class is reponsible for return different action buttons configurations.
 * e.g. If you want to render borrow button, this class will return
 * {
 *   text: 'Borrow for 14 days',
 *   className: 'primary'
 *   analyticsEvent: {
 *     category: 'category-name',
 *     action: 'action-name',
 *   }
 * }
 *
 * More details of above object keys are as follow
 * 1. text: texts displayed on the button.
 * 2. className: name of the class for buttons.
 * 3. analyticsEvent: being used to apply event tracking with google analytics
 *    it contains category name and action name to different in tracking.
 */
export default class ActionsConfig {
  userid: string;

  identifier: string;

  lendingStatus: LendingStatus;

  bwbPurchaseUrl: string;

  printDisabilityLink = '/details/printdisabled?tab=about';

  analyticsCategories = analyticsCategories;

  analyticsActions = analyticsActions;

  constructor(
    userid: string,
    identifier: string,
    lendingStatus: LendingStatus = {},
    bwbPurchaseUrl = '',
  ) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
  }

  firstBrowseConfig(): ActionConfig {
    return {
      id: 'browseBook',
      text: msg('Borrow'),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.browse,
      },
    };
  }

  browseAgainConfig(): ActionConfig {
    return {
      id: 'browseBookAgain',
      text: msg('Borrow'),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.browseAgain,
      },
    };
  }

  returnBookConfig(): ActionConfig {
    const eventCategory = this.lendingStatus.user_has_browsed
      ? this.analyticsCategories.browse
      : this.analyticsCategories.borrow;

    return {
      id: 'returnNow',
      text: msg('Return now'),
      className: 'danger',
      analyticsEvent: {
        category: eventCategory,
        action: this.analyticsActions.doneBorrowing,
      },
      borrowType: this.lendingStatus.user_has_browsed ? 'browse' : 'borrow',
    };
  }

  borrowBookConfig(disableBorrow = false): ActionConfig | null {
    const notBorrowableNorPrintDisabled =
      (!this.lendingStatus.available_to_borrow &&
        !this.lendingStatus.user_is_printdisabled) ||
      this.lendingStatus.user_has_borrowed;

    if (notBorrowableNorPrintDisabled) return null;

    return {
      id: 'borrowBook',
      text: msg('Borrow for 14 days'),
      className: 'primary',
      disabled: disableBorrow,
      analyticsEvent: {
        category: this.lendingStatus.user_has_browsed
          ? this.analyticsCategories.browse
          : this.analyticsCategories.preview,
        action: this.analyticsActions.borrow,
      },
    };
  }

  loginAndBorrowBookConfig(): ActionConfig {
    return {
      id: 'loginAndBorrow',
      text: msg('Log In and Borrow'),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.login,
      },
    };
  }

  leaveWaitlistConfig(): ActionConfig {
    return {
      id: 'leaveWaitlist',
      text: msg('Leave Waitlist'),
      className: 'dark',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistLeave,
      },
    };
  }

  loginAndWaitlistConfig(): ActionConfig {
    return {
      id: 'loginAndWaitlist',
      text: msg('Log In and Join Waitlist'),
      className: 'warning',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.login,
      },
    };
  }

  waitlistConfig(): ActionConfig | null {
    const isLoggedIn = !!this.userid;
    const lendingStatus = this.lendingStatus || {};

    // early exit if
    // - not available for waitlist
    // - book is available for borrow (14 days borrow)
    if (
      !lendingStatus.available_to_waitlist ||
      lendingStatus.available_to_borrow
    ) {
      return null;
    }

    // early exit to logged out config if user is absent
    if (!isLoggedIn) {
      return this.loginAndWaitlistConfig();
    }

    return {
      id: 'joinWaitlist',
      text: msg('Join Waitlist'),
      className: 'warning',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistJoin,
      },
    };
  }

  purchaseConfig(): ActionConfig | null {
    if (!this.bwbPurchaseUrl) return null;

    return {
      id: 'purchaseBook',
      text: msg('Purchase at '),
      subText: 'Better World Books',
      title: msg('Purchase'),
      url: this.bwbPurchaseUrl,
      target: '_blank',
      className: 'purchase dark',
      analyticsEvent: {
        category: this.analyticsCategories.bookReaderHeader,
        action: this.analyticsActions.purchase,
      },
    };
  }

  printDisabilityConfig(): ActionConfig | null {
    // if user has PD access, let just not render PD access link
    if (this.lendingStatus.user_is_printdisabled) return null;

    return {
      id: 'printDisability',
      text: msg('Print Disability Access'),
      title: msg('Print Disability Access'),
      url: this.printDisabilityLink,
      target: '_self',
      className: 'print-disability',
      analyticsEvent: {
        category: this.analyticsCategories.bookReaderHeader,
        action: this.analyticsActions.printDisability,
      },
    };
  }

  adminAccessConfig(): ActionConfig | null {
    // if book is borrowed, not showing Admin access he already have full book access
    if (this.lendingStatus.user_has_borrowed || !this.lendingStatus.isAdmin)
      return null;

    return {
      id: 'adminAccess',
      text: msg('Admin Access'),
      title: msg('You have administrative privileges to read this book'),
      className: 'danger',
      analyticsEvent: {
        category: this.analyticsCategories.adminAccess,
        action: this.analyticsActions.borrow,
      },
    };
  }

  adminOrPrintDisabledExitConfig(): ActionConfig {
    const message =
      URLHelper.getQueryParam('admin') === '1'
        ? msg('← Exit admin access mode')
        : msg('← Exit print-disabled access mode');

    return {
      id: 'exitAdminAccess',
      text: message,
      url: URLHelper.getBackHref(),
      target: '_self',
      className: 'exit-admin',
      analyticsEvent: {
        category: this.analyticsCategories.adminAccess,
        action: this.analyticsActions.doneBorrowing,
      },
    };
  }

  unavailableBookConfig(): ActionConfig {
    return {
      id: 'borrowUnavailable',
      text: msg('Borrow Unavailable'),
      className: 'primary unavailable',
      disabled: true,
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.unavailable,
      },
    };
  }

  isEmbed(title: string): EmbedActions {
    const description = `<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${title}</a>`;
    return {
      primaryTitle: description,
      primaryActions: [],
      primaryColor: '',
    };
  }
}
