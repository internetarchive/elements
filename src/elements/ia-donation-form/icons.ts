import applePay from '@src/icons/applepay';
import calendar from '@src/icons/calendar';
import creditCard from '@src/icons/credit-card';
import googlePay from '@src/icons/googlepay';
import lock from '@src/icons/lock';
import paypal from '@src/icons/paypal';
import venmo from '@src/icons/venmo';
import { iconBox } from '@src/util/icon-box';

/**
 * The form's icons, wrapped in a box the host sizes (see `iconBoxStyles`).
 * The field glyphs take their colour from the host's `color`. The payment
 * brand logos keep their own colours.
 */
export const applePayLogo = iconBox(applePay);
export const googlePayLogo = iconBox(googlePay);
export const paypalLogo = iconBox(paypal);
export const venmoLogo = iconBox(venmo);

export const calendarIcon = iconBox(calendar);
export const creditCardIcon = iconBox(creditCard);
export const lockIcon = iconBox(lock);
