import type { Plugin } from 'vite';

/** The demo's pages, in tab order, as [file, label]. */
export const PAGES: [string, string][] = [
  ['principles.html', 'Principles'],
  ['foundations.html', 'Foundations'],
  ['index.html', 'Components'],
  ['specs.html', 'Specs'],
  ['screens.html', 'Screens'],
  ['icons.html', 'Icons'],
  ['playground.html', 'Playground'],
];

const MAIN_OPEN = '<main class="doc-main" id="main">';

/**
 * Writes each page's header, tabs and sidebar column into its HTML, in dev
 * and in the build, so the page paints in its final layout. Built by script
 * instead, the page first painted without them and then jumped into place.
 * `mountChrome` in `assets/site.js` fills in the sidebar's links and wires the
 * behavior.
 */
export function docChrome(): Plugin {
  return {
    name: 'doc-chrome',
    transformIndexHtml: {
      order: 'pre',
      handler(html, { path }) {
        const page =
          path.replace(/^\//, '').replace(/\?.*$/, '') || 'index.html';
        if (!PAGES.some(([file]) => file === page)) return html;

        // The Components page has its own sidebar, inside <app-root>.
        const docPage = page !== 'index.html';
        const tabs = PAGES.map(
          ([file, label]) =>
            `<a class="ia-tab" href="${file}" data-label="${label}"${file === page ? ' aria-current="page"' : ''}>${label}</a>`,
        ).join('');
        const chrome = `
<a class="doc-skip" href="${docPage ? '#main' : '#ia-content'}">Skip to main content</a>
<header class="doc-header">
  <div class="doc-header__inner">
    ${docPage ? '<button class="doc-menu-button" type="button" aria-expanded="false" aria-controls="doc-sidebar"><span data-icon="hamburger" data-icon-size="sm"></span>Sections</button>' : ''}
    <p class="doc-header__title">Internet Archive <span>elements</span></p>
  </div>
  <nav class="doc-tabs" aria-label="Design system"><div class="ia-tabs">${tabs}</div></nav>
</header>`;

        let out = html.replace(/<body([^>]*)>/, (body) => body + chrome);
        if (docPage && out.includes(MAIN_OPEN)) {
          out = out
            .replace(
              MAIN_OPEN,
              `<div class="doc-shell">\n<nav class="doc-sidebar" id="doc-sidebar" aria-label="On this page"></nav>\n${MAIN_OPEN}`,
            )
            .replace('</main>', '</main>\n</div>');
        }
        return out;
      },
    },
  };
}
