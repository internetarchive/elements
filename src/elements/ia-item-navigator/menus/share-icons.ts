import { type TemplateResult } from 'lit';
import { maskedIcon } from '@src/util/masked-icon';

import shareUrl from './icons/share.svg';
import twitterUrl from './icons/twitter.svg';
import facebookUrl from './icons/facebook.svg';
import tumblrUrl from './icons/tumblr.svg';
import pinterestUrl from './icons/pinterest.svg';
import emailUrl from './icons/email.svg';
import linkUrl from './icons/link.svg';

/**
 * Icons taken from the `@internetarchive/icon-*` packages (v1.4.1) used by the
 * share panel. They ship as standalone `.svg` files — rather than icon package
 * dependencies or inline templates — so their path data stays out of the JS
 * bundle, and render as CSS-masked spans (see `maskedIcon`) so the panel can
 * still theme them. Icons are decorative, labelled by adjacent text.
 */

export const shareIcon: TemplateResult = maskedIcon(shareUrl);

export const twitterIcon: TemplateResult = maskedIcon(twitterUrl);

export const facebookIcon: TemplateResult = maskedIcon(facebookUrl);

export const tumblrIcon: TemplateResult = maskedIcon(tumblrUrl);

export const pinterestIcon: TemplateResult = maskedIcon(pinterestUrl);

export const emailIcon: TemplateResult = maskedIcon(emailUrl);

export const linkIcon: TemplateResult = maskedIcon(linkUrl);
