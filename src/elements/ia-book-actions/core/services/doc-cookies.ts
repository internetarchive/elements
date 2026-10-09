/**
 * Helper module use to get, set and remove item from cookie
 *
 * See more:
 *  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 *  https://developer.mozilla.org/User:fusionchess
 *  https://github.com/madmurphy/cookies.js
 *  This framework is released under the GNU Public License, version 3 or later.
 *  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 */

/**
 * Get specific key's value stored in cookie
 *
 * @param sKey
 */
export function getItem(sKey: string): string | null {
  if (!sKey) return null;

  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' +
            encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$',
        ),
        '$1',
      ),
    ) || null
  );
}

/**
 * Set specific key's value in cookie
 *
 * @param sKey cookie name
 * @param sValue cookie value
 * @param vEnd expire date
 * @param sPath path of current item
 * @param sDomain domain name
 * @param bSecure
 */
export function setItem(
  sKey: string,
  sValue: string | number | boolean,
  vEnd?: Date,
  sPath?: string,
  sDomain?: string,
  bSecure?: boolean,
): true {
  document.cookie =
    encodeURIComponent(sKey) +
    '=' +
    encodeURIComponent(sValue) +
    (vEnd ? `; expires=${vEnd.toUTCString()}` : '') +
    (sDomain ? `; domain=${sDomain}` : '') +
    (sPath ? `; path=${sPath}` : '') +
    (bSecure ? `; secure` : '');

  return true;
}

/**
 * Remove specific key's value from cookie
 *
 * @param sKey cookie name
 * @param sPath path of current item
 * @param sDomain
 */
export function removeItem(
  sKey: string,
  sPath?: string,
  sDomain?: string,
): boolean {
  if (!hasItem(sKey)) return false;

  document.cookie =
    encodeURIComponent(sKey) +
    `=; expires=Thu, 01 Jan 1970 00:00:00 GMT` +
    (sDomain ? `; domain=${sDomain}` : '') +
    (sPath ? `; path=${sPath}` : '');

  return true;
}

/**
 * determine if a specific cookie is exist
 *
 * @param sKey cookie name
 */
export function hasItem(sKey: string): boolean {
  const reCNameAllowed =
    /^(?:expires|max-age|path|domain|secure|samesite|httponly)$/i;

  if (!sKey || reCNameAllowed.test(sKey)) {
    return false;
  }

  return new RegExp(
    '(?:^|;\\s*)' +
      encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') +
      '\\s*\\=',
  ).test(document.cookie);
}
