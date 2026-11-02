/**
 * The analytics hooks the controller hands down to the flow handlers, so they
 * can log events in the donation form's category without knowing about the
 * analytics manager.
 */
export interface DonationEventLoggerInterface {
  /** A sampled event in the form's own category */
  logEvent(action: string, label?: string): void;
  /** An unsampled event in the `DonationFlow` category, for the money-moving steps */
  logDonationFlowEvent(action: string, label?: string): void;
}
