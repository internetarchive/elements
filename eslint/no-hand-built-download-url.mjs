const MESSAGE =
  "Don't build /download/ URLs by hand. File names can contain #, ?, %, spaces and subfolders, so use downloadUrl() from '@internetarchive/elements/util/download-url/download-url'.";

/**
 * ESLint rule that flags template literals and string literals containing
 * `/download/`.
 */
export const noHandBuiltDownloadUrl = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require downloadUrl() instead of hand-built /download/ URLs.',
    },
    schema: [],
    messages: { handBuilt: MESSAGE },
  },
  create(context) {
    const check = (node, text) => {
      if (text.includes('/download/')) {
        context.report({ node, messageId: 'handBuilt' });
      }
    };
    return {
      TemplateLiteral(node) {
        for (const quasi of node.quasis) check(node, quasi.value.cooked ?? '');
      },
      Literal(node) {
        if (typeof node.value === 'string') check(node, node.value);
      },
    };
  },
};
