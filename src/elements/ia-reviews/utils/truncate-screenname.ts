import { html, HTMLTemplateResult } from 'lit';

/**
 * Truncates screenname as needed to ensure we only display the correct
 * number of chars throughout site. Must be kept in sync with screenname
 * limit in Account.inc.
 *
 * Adds a title tooltip with full screenname if truncated.
 *
 * @param {string} screenname Screenname to be truncated
 * @returns {HTMLTemplateResult} String or HTML to be displayed
 */
export function truncateScreenname(
  screenname: string = '',
): HTMLTemplateResult | string {
  const SCREENNAME_MAX_LENGTH = 40;

  if (screenname.length <= SCREENNAME_MAX_LENGTH) return screenname;

  const truncatedScreenname =
    screenname.substring(0, SCREENNAME_MAX_LENGTH) + '...';
  return html`<span title="${screenname}">${truncatedScreenname}</span>`;
}
