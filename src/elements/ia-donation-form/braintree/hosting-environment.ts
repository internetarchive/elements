/**
 * Which set of payment endpoints to talk to. `Development` uses the Braintree,
 * PayPal and Google Pay sandboxes.
 */
export const HostingEnvironment = {
  Development: 'dev',
  Production: 'prod',
} as const;

export type HostingEnvironment =
  (typeof HostingEnvironment)[keyof typeof HostingEnvironment];
