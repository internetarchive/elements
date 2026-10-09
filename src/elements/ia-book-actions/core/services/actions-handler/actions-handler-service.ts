import { sentryLogs } from '../../config/sentry-events';
import log from '../log';
import type { LoanServiceResponse } from '../../../models';
import '../../../globals';

export interface ActionsHandlerServiceOptions {
  /** the lending service action, like `browse_book` or `renew_loan` */
  action: string | null;
  identifier: string;
  success?: (data: LoanServiceResponse) => void;
  error?: (data: LoanServiceResponse) => void;
}

/**
 * Helper to call loan service
 */
export default async function ActionsHandlerService(
  options: ActionsHandlerServiceOptions,
): Promise<void> {
  const option = {
    success() {},
    error() {},
    ...options,
  };

  let baseHost = '/services/loans/loan';
  const location = window?.location;

  const tokenError = 'loan token not found. please try again later.';
  const borrowError =
    'This book is not available to borrow at this time. Please try again later.';
  const erroneousActions = [
    'browse_book',
    'borrow_book',
    'create_token',
    'renew_loan',
    'return_loan',
  ];
  const searchParams = new URLSearchParams(location?.search);
  // ?error=true fails every erroneous action (e.g. simulates the book
  // already being borrowed by someone else). ?failAction=create_token (or
  // any action name) fails ONLY that action, so a renew_loan can succeed
  // and the immediately-following create_token can be made to fail,
  // reproducing the "renewed, but create_token failed" case without
  // needing a real book.
  const shouldReturnError =
    location?.hostname !== 'archive.org' &&
    erroneousActions.includes(option?.action ?? '') &&
    (searchParams.get('error') === 'true' ||
      searchParams.get('failAction') === option?.action);

  const testHostname = ['localhost', 'internetarchive.github.io'];
  let isTest = false;
  if (testHostname.includes(location.hostname)) {
    isTest = true;
    baseHost = location.href;
  }

  const formData = new FormData();
  formData.append('action', String(option.action));
  formData.append('identifier', option.identifier);

  try {
    await fetch(baseHost, {
      method: 'POST',
      body: formData,
    })
      .then(async (response): Promise<LoanServiceResponse> => {
        // intentional error on localhost
        if (shouldReturnError) {
          return {
            success: false,
            error: option?.action === 'create_token' ? tokenError : borrowError,
          };
        }

        // return success response for localhost server...
        if (isTest) {
          if (
            option?.action == 'renew_loan' ||
            option?.action == 'return_loan'
          ) {
            // wait a few seconds so that the user can see the loading state
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return {
              success: true,
              loan: { renewal: true },
            };
          }
          return {
            success: true,
            message: 'operation executed successfully!',
          };
        }

        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then((data) => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        if (!data?.error) {
          log(`[IABookActions] ✓ ${option.action} succeeded`, data);
          option?.success(data);
        } else {
          log(`[IABookActions] ✗ ${option.action} failed`, data);
          option?.error(data);
        }
      });
  } catch (error) {
    window?.Sentry?.captureException(
      `${sentryLogs.actionsHandlerService} - Error: ${error}`,
    );

    /**
     * Reports the failure through `error`. A rejected fetch (offline, dropped
     * connection) or a non-JSON body (a 405 returning HTML) lands here, and
     * a caller whose callbacks never fire would wait forever.
     *
     * For renew_loan that matters beyond a missing modal: IABookActions
     * clears its loanRenewInProgress guard from these callbacks, so without
     * one every later renewal attempt would be a no-op. Backgrounding a tab
     * on a flaky mobile connection is exactly when this fires.
     */
    log(`[IABookActions] ✗ ${option.action} threw`, error);
    option?.error?.({ error: String(error) });
  }
}
