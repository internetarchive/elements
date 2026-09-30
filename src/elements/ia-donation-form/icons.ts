import { html, type TemplateResult } from 'lit';

import { maskedIcon } from '@src/util/masked-icon';

import applePayUrl from './icons/apple-pay.svg';
import calendarUrl from './icons/calendar.svg';
import creditCardUrl from './icons/credit-card.svg';
import emailUrl from './icons/email.svg';
import googlePayUrl from './icons/google-pay.svg';
import localePinUrl from './icons/locale-pin.svg';
import lockUrl from './icons/lock.svg';
import paypalUrl from './icons/paypal.svg';
import userUrl from './icons/user.svg';
import venmoUrl from './icons/venmo.svg';

/**
 * Icons taken from the `@internetarchive/icon-*` packages (v1.3.4). They ship
 * as standalone `.svg` files so their path data stays out of the JS bundle.
 *
 * The single-colour field glyphs render as CSS masks (see `maskedIcon`) so
 * the host can paint them with `background-color`. The payment brand logos
 * are multicolour and render as images.
 */

/** A brand logo, drawn at the size of its container. */
const brandLogo = (url: string, alt: string): TemplateResult =>
  html`<img class="brand-logo" src=${url} alt=${alt} />`;

export const applePayLogo = brandLogo(applePayUrl, 'Apple Pay');
export const googlePayLogo = brandLogo(googlePayUrl, 'Google Pay');
export const paypalLogo = brandLogo(paypalUrl, 'PayPal');
export const venmoLogo = brandLogo(venmoUrl, 'Venmo');

export const calendarIcon = maskedIcon(calendarUrl);
export const creditCardIcon = maskedIcon(creditCardUrl);
export const emailIcon = maskedIcon(emailUrl);
export const localePinIcon = maskedIcon(localePinUrl);
export const lockIcon = maskedIcon(lockUrl);
export const userIcon = maskedIcon(userUrl);
