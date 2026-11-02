/**
 * Builds the `/download/` URL for a file in an archive.org item.
 *
 * File names are user supplied and can contain anything a file system allows:
 * `#` (would start a fragment), `?` (would start a query string), `%` (would
 * be read as an escape), spaces, non-Latin characters, and `/` for files in
 * subfolders. Each path segment is encoded on its own and the `/` between
 * subfolders is kept, so `slides/Page #1?.jpg` becomes
 * `slides/Page%20%231%3F.jpg`.
 *
 * Always build download URLs with this helper. The `no-hand-built-download-url`
 * lint rule (see the README) flags template literals that contain `/download/`.
 *
 * @param identifier The item identifier.
 * @param fileName The file's path inside the item. Leave it empty for the
 *   item's download directory.
 * @param baseHost Origin to put in front of the path. Pass an empty string for
 *   a root-relative URL.
 */
export function downloadUrl(
  identifier: string,
  fileName = '',
  baseHost = 'https://archive.org',
): string {
  const path = fileName
    .split('/')
    .filter((segment, index, all) => segment !== '' || index === all.length - 1)
    .map(encodeURIComponent)
    .join('/');
  const host = baseHost.replace(/\/+$/, '');
  const item = `${host}/download/${encodeURIComponent(identifier)}`;
  return path ? `${item}/${path}` : item;
}
