import DOMPurify from 'dompurify';

const ALLOWED_TAGS = ['a'];

/**
 * Uses DOMpurify to sanitize a given review body.
 * Currently only allows a tags.
 *
 * @param {string} reviewBody The review to be sanitized
 * @returns {string} The sanitized review
 */
export default function sanitizeReviewBody(reviewBody: string): string {
  // DOMPurify is a shared singleton, so the hook is added around this one call
  // and taken off again. Leaving it registered would stack up another copy per
  // review and force these attributes onto every other caller's anchors too.
  DOMPurify.addHook('afterSanitizeAttributes', forceExternalLinkAttributes);
  try {
    return DOMPurify.sanitize(reviewBody, { ALLOWED_TAGS: ALLOWED_TAGS });
  } finally {
    DOMPurify.removeHook('afterSanitizeAttributes');
  }
}

/** Marks links as untrusted user content and opens them away from the page. */
function forceExternalLinkAttributes(node: Node): void {
  if (node.nodeName.toLowerCase() !== 'a') return;
  (node as Element).setAttribute('rel', 'ugc nofollow');
  (node as Element).setAttribute('target', '_blank');
}
