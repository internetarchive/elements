import { afterEach, describe, expect, test, vi } from 'vitest';
import { GetLendingActions, bookTitles } from './get-lending-actions';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Get Lending Actions', () => {
  test('Browsable and Borrowable with purchase link', async () => {
    const lendingOptions = new GetLendingActions(
      'user',
      'identifier',
      {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
      'dummy-bwbPurchaseUrl',
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(bookTitles.available_1hr);
    expect(actions.primaryActions.length).to.equal(3);
    expect(actions.primaryActions[0]?.text).to.equal('Borrow');
    expect(actions.primaryActions[1]?.text).to.equal('Borrow for 14 days');
    expect(actions.secondaryActions[1]?.text).to.equal('Purchase at ');
  });

  test('Borrowable without user', async () => {
    const lendingOptions = new GetLendingActions(
      '',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
      },
      '',
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryActions.length).to.equal(2);
    expect(actions.primaryTitle).to.equal(bookTitles.available_14d);
    expect(actions.primaryActions[0]?.text).to.equal('Log In and Borrow');
  });

  test('Borrowing action', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
        user_has_borrowed: true,
        daysLeftOnLoan: 4,
      },
      '',
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'Your loan of this book has 4 days left.',
    );
    expect(actions.primaryActions.length).to.equal(4);
    expect(actions.primaryActions[0]?.text).to.equal('Return now');
  });

  describe('WAITLIST', () => {
    describe('`user_can_claim_waitlist = true`', () => {
      test('top of waitlist & cannot browse', async () => {
        const lendingOptions = new GetLendingActions(
          '@user',
          'identifier',
          {
            is_lendable: true,
            available_to_borrow: true,
            user_can_claim_waitlist: true,
          },
          '',
        );

        const spy = vi.spyOn(lendingOptions, 'claimWaitlistAction');
        const actions = lendingOptions.getCurrentLendingActions();

        expect(actions.primaryTitle).to.equal(bookTitles.claim_waitlist);
        expect(actions.primaryActions.length).to.equal(2);
        expect(actions.primaryActions[0]?.text).to.equal('Borrow for 14 days');
        expect(actions.primaryActions[1]?.text).to.equal('Leave Waitlist');

        expect(spy).toHaveBeenCalled();
      });
      test('top of waitlist & can browse', async () => {
        const lendingOptions = new GetLendingActions(
          '@user',
          'identifier',
          {
            is_lendable: true,
            available_to_borrow: true,
            available_to_browse: true,
            user_can_claim_waitlist: true,
          },
          '',
        );

        const spy = vi.spyOn(lendingOptions, 'claimWaitlistAction');
        const actions = lendingOptions.getCurrentLendingActions();

        expect(actions.primaryTitle).to.equal(bookTitles.claim_waitlist);
        expect(actions.primaryActions.length).to.equal(3);
        expect(actions.primaryActions[0]?.text).to.equal('Borrow for 14 days');
        expect(actions.primaryActions[1]?.text).to.equal('Borrow');
        expect(actions.primaryActions[2]?.text).to.equal('Leave Waitlist');
        expect(spy).toHaveBeenCalled();
      });
    });
    describe('`user_on_waitlist = true`', () => {
      test('on waitlist && cannot browse', async () => {
        const lendingOptions = new GetLendingActions(
          '@user',
          'identifier',
          {
            is_lendable: true,
            available_to_borrow: false,
            available_to_browse: false,
            user_can_claim_waitlist: false,
            user_on_waitlist: true,
          },
          '',
        );

        const claimSpy = vi.spyOn(lendingOptions, 'claimWaitlistAction');
        const waitlistSpy = vi.spyOn(lendingOptions, 'onWaitlistAction');
        const actions = lendingOptions.getCurrentLendingActions();

        expect(actions.primaryTitle).to.equal(bookTitles.on_waitlist);
        expect(actions.primaryActions.length).to.equal(2);
        expect(actions.primaryActions[0]?.text).to.equal('Leave Waitlist');
        expect(actions.primaryActions[1]?.text).to.equal('Borrow');
        expect(claimSpy).not.toHaveBeenCalled();
        expect(waitlistSpy).toHaveBeenCalled();
      });
      test('on waitlist && can browse', async () => {
        const lendingOptions = new GetLendingActions(
          '@user',
          'identifier',
          {
            is_lendable: true,
            available_to_borrow: false,
            available_to_browse: true,
            user_can_claim_waitlist: false,
            user_on_waitlist: true,
          },
          '',
        );

        const waitlistSpy = vi.spyOn(lendingOptions, 'onWaitlistAction');
        const actions = lendingOptions.getCurrentLendingActions();

        expect(actions.primaryTitle).to.equal(bookTitles.on_waitlist);
        expect(actions.primaryActions.length).to.equal(2);
        expect(actions.primaryActions[0]?.text).to.equal('Leave Waitlist');
        expect(actions.primaryActions[1]?.text).to.equal('Borrow');
        expect(waitlistSpy).toHaveBeenCalled();
      });
    });
  });

  test('User can access print disabled', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
        is_printdisabled: true,
        user_is_printdisabled: true,
      },
      '',
    );
    const actions = lendingOptions.getCurrentLendingActions();

    // in-case of print-disabled, we show 14 days borrow
    expect(actions.primaryTitle).to.equal(bookTitles.eligible_pd);
    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryActions[0]?.text).to.equal('Borrow for 14 days');
  });

  test('If print disabled only', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        isPrintDisabledOnly: true,
      },
      '',
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(bookTitles.available_pd);
    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryActions[0]?.text).to.equal('Borrow Unavailable');
  });

  test('If book borrow is not available', async () => {
    const lendingOptions = new GetLendingActions('@user', 'identifier', {}, '');
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(bookTitles.unavailable);
    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryActions[0]?.text).to.equal('Borrow Unavailable');
  });
});
