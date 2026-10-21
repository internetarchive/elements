/* ===========================================================================
 * Shared helpers for the demo's design system pages, ported from the style
 * guide's spec site.
 *
 * Token values are read at runtime out of the generated tokens.css rather than
 * duplicated here, so every swatch, scale and ratio on these pages is the value
 * tokens/tokens.json defines. If a token changes, these pages change with it.
 * ======================================================================== */

/* Where the docs live, for links from the pages to the markdown. */
export const DOCS_URL = 'https://github.com/internetarchive/elements/blob/main/docs/';

/* ------------------------------------------------------------- chrome --- */

/** A page's sidebar entries: its groups with their sections (components.html), or its sections. */
function pageToc(root) {
  const title = el => el.querySelector(':scope > h2, :scope > .doc-section__title')?.textContent.trim();
  const entry = el => ({
    id: el.id, title: title(el),
    children: el.classList.contains('doc-group') ? [...el.querySelectorAll(':scope > .doc-section[id]')].map(entry).filter(e => e.title) : []
  });
  const groups = [...root.querySelectorAll('.doc-group[id]')];
  return (groups.length ? groups : [...root.querySelectorAll('.doc-section[id]')]).map(entry).filter(e => e.title);
}

/* Which sidebar disclosures are open, remembered across pages. */
const SIDEBAR_KEY = 'ia-style-guide-sidebar';
let sidebarOpen = {};
try { sidebarOpen = JSON.parse(localStorage.getItem(SIDEBAR_KEY)) ?? {}; } catch {}
const rememberOpen = (key, open) => {
  sidebarOpen[key] = open;
  try { localStorage.setItem(SIDEBAR_KEY, JSON.stringify(sidebarOpen)); } catch {}
};

let disclosureId = 0;
/** An entry with children: its title is a button that opens and closes the list. */
const disclosure = (key, label, inner, open) => {
  const id = `doc-nav-${++disclosureId}`;
  return `<button class="doc-sidebar__toggle" type="button" aria-expanded="${open}" aria-controls="${id}"
      data-key="${key}">${icon('caret', { size: 'xs' })}<span>${label}</span></button>
    <ul id="${id}"${open ? '' : ' hidden'}>${inner}</ul>`;
};
/** The current page's sections; a group's title opens and closes its sections. */
const tocItems = (entries, page) => entries.map(e => `<li>${e.children.length
  ? disclosure(`${page}#${e.id}`, escapeHtml(e.title), tocItems(e.children, page), sidebarOpen[`${page}#${e.id}`] ?? true)
  : `<a href="#${e.id}">${escapeHtml(e.title)}</a>`}</li>`).join('');

/**
 * Wires the header that demo/docs/chrome-plugin.ts writes into every page:
 * keeps the current tab in view on a narrow screen, and publishes the header's
 * height for what sticks under it.
 */
export function wireHeader() {
  const header = document.querySelector('.doc-header');
  if (!header) return null;

  // On a narrow screen the tabs scroll; start with the current one in view.
  const strip = header.querySelector('.ia-tabs');
  requestAnimationFrame(() => {
    const tab = strip.querySelector('[aria-current="page"]');
    if (tab && tab.offsetLeft + tab.offsetWidth > strip.clientWidth) strip.scrollLeft = tab.offsetLeft - strip.offsetLeft;
  });

  // The header wraps to two rows on narrow viewports, so anything that sticks
  // below it or scrolls to an anchor needs its measured height, not a guess.
  const syncHeight = () => document.documentElement.style.setProperty('--doc-header-h', `${header.offsetHeight}px`);
  syncHeight();
  new ResizeObserver(syncHeight).observe(header);
  return header;
}

export function mountChrome(current) {
  // The pages are tabs under the header; the sidebar lists the current page's
  // sections. The header, the sidebar and the shell around them are already in
  // the HTML (demo/docs/chrome-plugin.ts); this fills in the sidebar. A page
  // with no sections has no sidebar.
  const main = document.querySelector('main');
  const shell = main.parentElement;
  const toolbar = main.querySelector(':scope > .doc-toolbar');
  const toc = pageToc(main);
  const header = wireHeader();
  const sidebar = document.getElementById('doc-sidebar');
  if (toc.length) sidebar.innerHTML = `<ul>${tocItems(toc, current)}</ul>`;
  else {
    sidebar.remove();
    header.querySelector('.doc-menu-button')?.remove();
    shell.classList.add('doc-shell--full');
  }

  const menu = header.querySelector('.doc-menu-button');
  const setOpen = open => {
    menu?.setAttribute('aria-expanded', String(open));
    sidebar.toggleAttribute('data-open', open);
  };
  menu?.addEventListener('click', () => setOpen(menu.getAttribute('aria-expanded') !== 'true'));
  sidebar.addEventListener('click', e => {
    const toggle = e.target.closest('.doc-sidebar__toggle');
    if (toggle) {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      document.getElementById(toggle.getAttribute('aria-controls')).hidden = !open;
      rememberOpen(toggle.dataset.key, open);
    } else if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.hasAttribute('data-open')) { setOpen(false); menu.focus(); }
  });

  // Mark the section in view: the last one whose top has passed under the
  // header. At the foot of the page the last sections can't scroll that far,
  // so there the linked section wins if it is on screen, else the last one shown.
  const links = new Map([...sidebar.querySelectorAll('a[href^="#"]')].map(a => [a.hash.slice(1), a]));
  const sections = [...links.keys()].map(id => document.getElementById(id)).filter(Boolean);
  const spy = () => {
    const line = header.offsetHeight + (toolbar?.offsetHeight ?? 0) + 24;
    const onScreen = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > line; };
    let current = sections.filter(el => el.getBoundingClientRect().top <= line).pop();
    // A page that hasn't been scrolled is at its top, even when it is short
    // enough (or not yet built out enough) to count as at its foot.
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) {
      const linked = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (linked && links.has(linked.id) && onScreen(linked)) current = linked;
      else if (scrollY > 0) current = sections.filter(onScreen).pop() ?? current;
    }
    for (const a of links.values()) a.removeAttribute('aria-current');
    if (current) links.get(current.id)?.setAttribute('aria-current', 'location');
  };
  let queued = false;
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; spy(); });
  }, { passive: true });
  addEventListener('hashchange', spy);
  addEventListener('load', spy);
  spy();

  // Pad the page's end by just enough that its last section can scroll to the
  // top, so every sidebar link lands its section under the header.
  const tail = () => {
    const last = sections.at(-1);
    if (!last) return;
    main.style.paddingBlockEnd = '';
    const base = parseFloat(getComputedStyle(main).paddingBlockEnd);
    const target = last.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(last).scrollMarginBlockStart || 0);
    const extra = target - (document.documentElement.scrollHeight - innerHeight);
    if (extra > 0) main.style.paddingBlockEnd = `${base + Math.ceil(extra)}px`;
  };
  new ResizeObserver(tail).observe(main);
  addEventListener('resize', tail);
  // A link straight to a late section jumped before the padding existed.
  addEventListener('load', () => {
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  });

  // A page's sticky toolbar (specs, icons) sits under the header, so anchors
  // clear it too.
  const syncToolbar = () => {
    if (toolbar) document.documentElement.style.setProperty('--doc-toolbar-h', `${toolbar.offsetHeight}px`);
  };
  syncToolbar();
  if (toolbar) new ResizeObserver(syncToolbar).observe(toolbar);
  // Pages fill their toolbar right after this runs; measure again once they have.
  addEventListener('load', syncToolbar);

  // If tokens.css did not load, every var(--ia-*) resolves to nothing and the page
  // looks wrecked for no visible reason. Say so, in terms that name the fix.
  // Prepended last so it lands above the header, where it cannot be missed.
  if (!getComputedStyle(document.documentElement).getPropertyValue('--ia-color-text-primary')) {
    const warn = document.createElement('div');
    warn.setAttribute('role', 'alert');
    // Inline styles on purpose: this banner reports that the tokens are missing,
    // so it cannot be built out of them.
    warn.style.cssText = 'padding:16px;background:#e51c23;color:#fff;' +
      'font:14px/1.45 Helvetica,Arial,sans-serif';
    warn.innerHTML =
      '<strong>tokens.css did not load, so this page has no styling.</strong><br>' +
      'It is generated from <code>tokens/tokens.json</code>: run <code>pnpm run dev</code>, ' +
      'which builds it first.';
    document.body.prepend(warn);
  }

  hydrateIcons();

  const footer = document.createElement('footer');
  footer.className = 'doc-footer';
  footer.innerHTML = `<div class="doc-footer__inner">
    Every value on these pages is read at runtime from the tokens generated from
    <code>tokens/tokens.json</code>. Nothing here is transcribed by hand.
  </div>`;
  // In the content column, so the sticky sidebar's box runs to the page's end
  // and the footer never pushes it up under the header.
  shell.append(footer);
}

/* ------------------------------------------------------------- tokens --- */

const rootStyle = () => getComputedStyle(document.documentElement);

/** Read one token's resolved value, e.g. token('color-text-primary'). */
export const token = name => rootStyle().getPropertyValue(`--ia-${name}`).trim();

/** Every --ia-* custom property declared in tokens.css, in source order. */
export function allTokens() {
  const out = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    if (!rules) continue;
    for (const rule of rules) {
      if (!rule.style || rule.selectorText !== ':root') continue;
      for (const prop of rule.style) {
        if (!prop.startsWith('--ia-')) continue;
        const declared = rule.style.getPropertyValue(prop).trim();
        out.push({ name: prop, declared, resolved: rootStyle().getPropertyValue(prop).trim() });
      }
    }
  }
  const seen = new Set();
  return out.filter(t => !seen.has(t.name) && seen.add(t.name));
}

export const tokensMatching = prefix => allTokens().filter(t => t.name.startsWith(`--ia-${prefix}`));

/* ------------------------------------------------------------ colors --- */

/** Any CSS color -> [r, g, b], resolved by the browser so var() and hex both work. */
export function toRgb(value) {
  const probe = document.createElement('span');
  probe.style.cssText = `display:none;color:${value}`;
  document.body.append(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  const m = resolved.match(/[\d.]+/g);
  return m ? m.slice(0, 3).map(Number) : [0, 0, 0];
}

const relLuminance = rgb => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2]);
};

export function contrast(a, b) {
  const [l1, l2] = [relLuminance(toRgb(a)), relLuminance(toRgb(b))];
  return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
}

export function hexOf(value) {
  return '#' + toRgb(value).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

export function ratioBadge(fg, bg, min = 4.5) {
  const r = contrast(fg, bg);
  const pass = r >= min;
  return `<span class="doc-ratio doc-ratio--${pass ? 'pass' : 'fail'}">` +
         `${icon(pass ? 'check' : 'alert', { size: 'sm' })} ${r.toFixed(2)}:1</span>`;
}

/* ------------------------------------------------------------- icons --- */

/*
 * The icon set is lifted from archive.org, not redrawn — see
 * assets/icons.js, generated in the style guide repo by tools/make-icons.mjs.
 * Icons render through the DOM from an allowlist of shapes, so no markup from
 * the site is ever injected, and every glyph inherits currentColor.
 */
export { IA_ICONS, FONT_ICONS } from './icons.js';
import { IA_ICONS } from './icons.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// An icon that draws with a <mask> names it {uid}; each drawn icon gets its own.
let iconCount = 0;

function buildShapes(parent, shapes, uid) {
  for (const shape of shapes) {
    const el = document.createElementNS(SVG_NS, shape.tag);
    for (const [name, value] of Object.entries(shape.attrs ?? {})) el.setAttribute(name, value.replace(/\{uid\}/g, uid));
    if (shape.children?.length) buildShapes(el, shape.children, uid);
    parent.append(el);
  }
}

/** Glyphs that point along the reading direction, and so mirror in RTL. */
const DIRECTIONAL = new Set(['chevron-left', 'chevron-right']);

/** The icon as an <svg> element. */
export function iconEl(name, { size = 'md', label = '' } = {}) {
  const def = IA_ICONS[name];
  if (!def) return null;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', def.viewBox);
  svg.setAttribute('class', `ia-icon ia-icon--${size}`);
  svg.setAttribute('fill', 'currentColor');
  if (label) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', label); }
  else { svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false'); }
  // Stroke-drawn shapes carry fill="none"; they need a stroke color to show.
  svg.setAttribute('stroke', 'currentColor');
  svg.style.strokeWidth = '0';
  for (const shape of def.shapes) if (shape.attrs?.['stroke-width']) { svg.style.strokeWidth = ''; break; }
  // Rotation goes through a custom property so ia.css can reverse it: a glyph
  // that points the way the page reads mirrors under dir="rtl".
  if (def.rotate) {
    svg.classList.add('ia-icon--rotated');
    svg.style.setProperty('--_rotate', `${def.rotate}deg`);
  }
  if (DIRECTIONAL.has(name)) svg.classList.add('ia-icon--directional');
  buildShapes(svg, def.shapes, `ia-icon-${++iconCount}`);
  return svg;
}

/**
 * The icon as markup, for the template-string call sites. Built through the
 * DOM first so the same allowlist applies.
 */
export function icon(name, options) {
  const el = iconEl(name, options);
  return el ? el.outerHTML : '';
}

/**
 * A tile thumbnail. Loads the real archive.org image and falls back to the
 * media-type icon on the well — which is what the live site shows for an item
 * with no cover, so the fallback is faithful rather than a broken-image box.
 */
/**
 * The tile's media-type glyph. Tiles draw from their own set (tile-mediatype-icon),
 * which is not the topnav's — the topnav's texts icon, for one, sits smaller in
 * its box.
 */
const MEDIATYPE_ICONS = { texts: 'book', movies: 'movies', video: 'movies', audio: 'audio', etree: 'audio',
                          image: 'image', data: 'data', collection: 'collection', tv: 'tv', web: 'browser' };
export const mediatypeIcon = kind => MEDIATYPE_ICONS[kind] ?? 'data';

export function tileThumb(identifier, kind = 'texts') {
  const wrap = document.createElement('span');
  wrap.className = 'ia-tile__thumb';
  const img = document.createElement('img');
  img.className = 'ia-tile__img';
  img.alt = '';                       // the title beside it is the accessible name
  img.decoding = 'async';
  img.src = `https://archive.org/services/img/${encodeURIComponent(identifier)}`;
  img.addEventListener('error', () => {
    wrap.classList.add('ia-tile__thumb--empty');
    wrap.innerHTML = icon(mediatypeIcon(kind), { size: '2xl' });
  }, { once: true });
  wrap.append(img);
  return wrap;
}

/* ------------------------------------------------------ demo builders --- *
 * Markup shared by the components page, the screens and the principles, so
 * they never show different versions of the same thing.
 */

/** The item tile's stat row. Each stat names itself; the icons are decoration. */
export const tileStats = (kind, views, favorites, reviews) => `
  <ul class="ia-tile__stats" aria-label="Item Stats">
    <li class="ia-tile__stat" data-mediatype="${kind}">${icon(mediatypeIcon(kind), { size: 'lg' })}<span class="ia-visually-hidden">Media Type: ${kind[0].toUpperCase() + kind.slice(1)}</span></li>
    <li class="ia-tile__stat">${icon('eye', { size: 'sm' })}<span class="ia-visually-hidden">All-Time Views: </span>${views}</li>
    <li class="ia-tile__stat">${icon('star', { size: 'sm' })}<span class="ia-visually-hidden">Favorites: </span>${favorites}</li>
    <li class="ia-tile__stat">${icon('comment', { size: 'sm' })}<span class="ia-visually-hidden">Reviews: </span>${reviews}</li>
  </ul>`;

/** The collection tile's footer: one glyph beside a two-line stack. */
export const tileMeta = (items, size) => `
  <div class="ia-tile__meta">
    ${icon('collection', { size: 'lg' })}
    <div class="ia-tile__meta-text"><span class="ia-visually-hidden">Collection: </span><span>${items}</span><span>${size}</span></div>
  </div>`;

/** The search-type choices, as live's search bar lists them. */
export const SEARCH_TYPES = ['All', 'Books/Documents', 'Text Contents', 'Radio', 'TV', 'Video', 'Audio',
                             'Software', 'Images', 'Live Music', 'Collections', 'Data', 'Web Sites'];

/**
 * The search bar: search-type picker, query field, submit. `size` is 'md' (30px,
 * the topnav and search page) or 'lg' (50px, the homepage). `type: null` drops
 * the picker, for a collection's own search.
 */
export const searchBarMarkup = (id, { size = 'md', value = '', type = 'All', label = 'Search the Archive',
                                      placeholder = 'Search' } = {}) => `
  <form role="search" class="ia-search-bar${size === 'lg' ? ' ia-search-bar--lg' : ''}">
    ${type === null ? '' : `<select class="ia-dropdown ia-search-bar__type" id="${id}-type" aria-label="Search Type">
      <button><selectedcontent></selectedcontent>${icon('caret')}</button>
      ${SEARCH_TYPES.map(t => `<option${t === type ? ' selected' : ''}>${t}</option>`).join('')}
    </select>`}
    <div class="ia-search-bar__field">
      <label class="ia-visually-hidden" for="${id}-q">${label}</label>
      <input class="ia-search-bar__input" id="${id}-q" type="search" placeholder="${placeholder}" value="${value}">
      <button class="ia-search-bar__clear" type="button" aria-label="Clear Search Query">${icon('close')}</button>
    </div>
    <button class="ia-search-bar__submit" type="submit" aria-label="Search">${icon('search')}</button>
  </form>`;

/**
 * The search page's search-type strip: tabs over one results panel (D-28). The
 * same choices as the search bar's dropdown, which it must stay in sync with.
 */
export const searchTypeTabs = (id, panelId, selected = 'All') => `
  <div class="ia-tabs" role="tablist" aria-label="Search Type">
    ${SEARCH_TYPES.map((t, i) => `<button class="ia-tab" role="tab" id="${id}-${i}" aria-controls="${panelId}"
      aria-selected="${t === selected}"${t === selected ? '' : ' tabindex="-1"'} data-label="${t}">${t}</button>`).join('')}
  </div>`;

/**
 * Tab keyboard behavior with manual activation: arrows and Home/End move focus,
 * Enter or Space selects. For tabs whose selection does real work, like a search.
 */
export function wireTabs(root) {
  const tabs = [...root.querySelectorAll('[role=tab]')];
  const select = tab => {
    for (const t of tabs) { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; }
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    if (panel) panel.setAttribute('aria-labelledby', tab.id);
  };
  root.addEventListener('click', e => { const t = e.target.closest('[role=tab]'); if (t) select(t); });
  root.addEventListener('keydown', e => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next !== undefined) { e.preventDefault(); tabs[(next + tabs.length) % tabs.length].focus(); }
  });
}

/* The logo, lifted from the live topnav. Each is its own URL so the build copies it. */
export const BRAND = {
  'ia-logo-white': new URL('./brand/ia-logo-white.svg', import.meta.url).href,
  'ia-mark-dark': new URL('./brand/ia-mark-dark.svg', import.meta.url).href,
};

/*
 * [glyph, label, size]. The topnav glyphs are drawn small inside a 40-unit box;
 * the filled `audio` glyph fills its box, so it is drawn at lg (24px) to read the
 * same size as its neighbors in the same 40px slot.
 */
const TOPNAV_MEDIA = [['web', 'Wayback Machine'], ['texts', 'Texts'], ['video', 'Video'],
                      ['audio', 'Audio', 'lg'], ['software', 'Software'], ['images', 'Images']];

const TOPNAV_SUBNAV = ['About', 'Blog', 'Events', 'Projects', 'Help', 'Donate', 'Contact', 'Jobs', 'Volunteer'];

/** Drawer rows: the narrow topnav's media menu. */
export const topnavDrawerItems = () => TOPNAV_MEDIA.map(([slug, label, size = '2xl']) =>
  `<li><a class="ia-topnav__drawer-item" href="#topnav">${icon(slug, { size })}${label}</a></li>`).join('');

/** The signed-in account button and its menu, staff groups included. */
const topnavAccountMenu = (id, name) => {
  const items = labels => labels.map(l =>
    `<li role="none"><a class="ia-menu__item" role="menuitem" tabindex="-1" href="#topnav">${l}</a></li>`).join('');
  const group = (key, heading, labels) => `<li role="separator" class="ia-menu__separator"></li>
      <li role="none"><span class="ia-menu__heading" id="${id}-${key}">${heading}</span>
        <ul role="group" aria-labelledby="${id}-${key}">${items(labels)}</ul></li>`;
  return `<span class="ia-menu-anchor ia-menu-anchor--end">
    <button class="ia-topnav__link ia-topnav__account-button" type="button" aria-label="${name}, Account Menu"
            aria-haspopup="menu" aria-expanded="false" aria-controls="${id}-user-menu">
      <span class="ia-topnav__avatar" aria-hidden="true">${icon('user', { size: 'lg' })}</span>
      <span class="ia-topnav__screen-name" dir="auto">${name}</span>
    </button>
    <ul class="ia-menu ia-inverse" id="${id}-user-menu" role="menu" aria-label="Account" hidden>
      ${items(['Upload Files', 'My Uploads', 'My Loans', 'My Favorites', 'My Lists', 'My Collections',
               'My Web Archives', 'Account Settings', 'Get Help', 'Log Out'])}
      ${group('admins', 'Admins', ['Item', 'Edit XML'])}
      ${group('biblio', 'Biblio', ['Bookview', 'JP2 Zip'])}
    </ul>
  </span>`;
};

/**
 * The topnav's contents; the host is <header class="ia-topnav ia-inverse">.
 * `search: false` leaves out the search bar and its narrow-width icon, as live does on
 * the search results page, whose main content has its own bar. `user` signs in, with
 * that screen name; `openType` marks one media type's menu as open.
 */
export const topnavMarkup = (id, open = false, { search = true, user = null, openType = null } = {}) => `
  <div class="ia-topnav__bar">
    <button class="ia-topnav__link ia-topnav__icon-button" type="button" aria-label="Menu"
            aria-expanded="${open}" aria-controls="${id}-drawer">${icon('hamburger', { size: 'xl' })}</button>
    <a class="ia-topnav__brand" href="#topnav"><img class="ia-topnav__logo" src="${BRAND['ia-logo-white']}" alt="Internet Archive" width="132" height="30"></a>
    <nav class="ia-topnav__media" aria-label="Media Types"><ul>
      ${TOPNAV_MEDIA.map(([slug, label, size = '2xl']) => `<li><button class="ia-topnav__media-item" type="button" data-type="${slug}"
        aria-expanded="${slug === openType}">${icon(slug, { size })}<span class="ia-topnav__media-label">${slug === 'web' ? 'Web' : label}</span></button></li>`).join('')}
    </ul></nav>
    ${search ? `<div class="ia-topnav__search">${searchBarMarkup(id)}</div>` : ''}
    <nav class="ia-topnav__account" aria-label="Account">
      ${user ? topnavAccountMenu(id, user) : `<a class="ia-topnav__link" href="#topnav">Sign Up</a>
      <a class="ia-topnav__link" href="#topnav">Log In</a>`}
    </nav>
    <a class="ia-topnav__link ia-topnav__upload" href="#topnav" aria-label="Upload">${icon('upload', { size: 'lg' })}<span class="ia-topnav__upload-label">Upload</span></a>
    ${search ? `<a class="ia-topnav__link ia-topnav__icon-button" href="#topnav" aria-label="Search">${icon('search', { size: 'lg' })}</a>` : ''}
    <a class="ia-topnav__link ia-topnav__icon-button" href="#topnav" aria-label="${user ? `${user}, Account Menu` : 'Log In'}">${icon('user', { size: 'xl' })}</a>
  </div>
  <nav class="ia-topnav__subnav" aria-label="Site"><ul>
    ${TOPNAV_SUBNAV.map(label => `<li><a class="ia-topnav__subnav-link" href="#topnav">${label}${label === 'Donate' ? icon('donate', { size: 'sm' }) : ''}</a></li>`).join('')}
  </ul></nav>
  <nav class="ia-topnav__drawer" id="${id}-drawer" aria-label="Media Types"><ul>${topnavDrawerItems()}</ul></nav>`;

/** The sort field choices, as live lists them. */
export const SORT_OPTIONS = ['Relevance', 'All-Time Views', 'Weekly Views', 'Title', 'Date Published',
                             'Date Archived', 'Date Reviewed', 'Date Added', 'Creator'];

/**
 * A dropdown: a native <select>. The <button> is the customizable-select
 * trigger — the selected option plus the lifted caret — and is dropped by
 * browsers that do not support it.
 */
export const dropdownMarkup = (id, options, selected, attrs = '') => `
  <select class="ia-dropdown" id="${id}"${attrs ? ' ' + attrs : ''}>
    <button><selectedcontent></selectedcontent>${icon('caret')}</button>
    ${options.map(o => `<option${o === selected ? ' selected' : ''}>${o}</option>`).join('')}
  </select>`;

/**
 * The sort bar. Relevance has no direction, so the toggle is unavailable for it.
 * Sorting by Title or Creator adds the letter bar beneath it.
 */
export const sortBarMarkup = (id, field = 'Weekly Views', view = 'grid', { direction = 'desc', letter = null } = {}) => {
  const directional = field !== 'Relevance';
  const next = direction === 'asc' ? 'Descending' : 'Ascending';
  const views = [['grid', 'Grid View', 'view-grid'], ['list', 'List View', 'view-detail'],
                 ['compact', 'Compact List View', 'view-list']];
  return `
  <div class="ia-sort-bar">
    <div class="ia-sort-bar__sort">
      <button class="ia-sort-bar__direction" type="button"
              ${directional ? `data-direction="${direction}" aria-label="Change to ${next} Sort"`
                            : 'aria-disabled="true" aria-label="Sort direction is not available for relevance"'}>${icon('sort', { size: 'sm' })}</button>
      <label class="ia-sort-bar__label" for="${id}-field">Sort By:</label>
      ${dropdownMarkup(`${id}-field`, SORT_OPTIONS, field)}
    </div>
    <div class="ia-segmented ia-segmented--sm" role="radiogroup" aria-label="Result View">
      ${views.map(([key, label, glyph]) => `<button class="ia-segmented__option ia-sort-bar__view" type="button" role="radio"
              aria-checked="${key === view}"${key === view ? '' : ' tabindex="-1"'} aria-label="${label}">${icon(glyph, { size: 'lg' })}</button>`).join('')}
    </div>
  </div>${field === 'Title' || field === 'Creator' ? alphaBarMarkup(field, letter) : ''}`;
};

/** Results per letter, for the letter bar's demos; a letter with none is disabled. */
const LETTER_COUNTS = { A: 412, B: 380, C: 455, D: 260, E: 151, F: 198, G: 170, H: 240, I: 96, J: 71, K: 44, L: 205,
                        M: 330, N: 120, O: 88, P: 301, Q: 0, R: 176, S: 520, T: 610, U: 39, V: 52, W: 214, X: 0, Y: 17, Z: 0 };

/** The letter bar: one toggle per letter, under the sort bar for Title and Creator sorts. */
export const alphaBarMarkup = (field, letter = null) => `
  <ul class="ia-alpha-bar" aria-label="${field} Starting With">
    ${Object.entries(LETTER_COUNTS).map(([l, n]) => `<li><button type="button" aria-pressed="${l === letter}"
      aria-label="${l}: ${num(n)} results"${n ? '' : ' disabled'}>${l}</button></li>`).join('')}
  </ul>`;

/**
 * Facet rows: [label, count, state] where state is 'in', 'out' or absent. The
 * checkbox first, then the eye that hides the value, then the label and count.
 * `links` makes each label a link to its page, as the Collection group's are.
 */
export const facetRows = (name, rows, { links = false } = {}) => rows.map(([label, count, state], i) => `
  <div class="ia-facet-row">
    <input class="ia-choice__control" type="checkbox" id="${name}-f${i}" name="${name}" value="${label.toLowerCase()}"${state === 'in' ? ' checked' : ''}>
    <button class="ia-facet-row__hide" type="button" aria-pressed="${state === 'out'}"
            aria-label="Exclude ${label}">${icon('eye', { size: 'sm' }).replace('ia-icon ', 'ia-icon ia-facet-row__eye ')}${icon('eye-off', { size: 'sm' }).replace('ia-icon ', 'ia-icon ia-facet-row__eye-off ')}</button>
    <label class="ia-facet-row__label" for="${name}-f${i}">
      <span class="ia-choice__label">${links ? `<a href="#">${label}</a>` : label}</span>
      <span class="ia-choice__count">${num(count)}<span class="ia-visually-hidden"> items</span></span>
    </label>
  </div>`).join('');

/** A facet group: a fieldset whose legend is a collapsing toggle on narrow screens. */
export const facetGroup = (id, title, body, { open = false } = {}) => `
  <fieldset class="ia-facet-group" id="${id}">
    <legend class="ia-facet-group__legend ia-type-subsection"><button class="ia-facet-group__toggle" type="button"
      aria-expanded="${open}">${icon('caret', { size: 'sm' })}${title}</button><span class="ia-facet-group__title">${title}</span></legend>
    ${body}
  </fieldset>`;

/** The rail's head: the narrow disclosure (a heading for screen readers elsewhere), and Clear all. */
export const facetRailHeader = (bodyId, { clear = false } = {}) => `
  <div class="ia-facet-rail__header">
    <h2 class="ia-facet-rail__heading"><button class="ia-facets__toggle" type="button" aria-expanded="false"
      aria-controls="${bodyId}">${icon('caret', { size: 'sm' })}Filters</button><span class="ia-facet-rail__heading-text">Filters</span></h2>
    ${clear ? '<button class="ia-button ia-button--link ia-facet-rail__clear" type="button">Clear All Filters</button>' : ''}
  </div>`;

/**
 * The rail's behavior: the disclosures open and close, hiding a value clears
 * its checkbox and checking it un-hides it, and Clear all resets every row.
 */
export function wireFacets(root = document) {
  root.addEventListener('click', e => {
    const toggle = e.target.closest('.ia-facets__toggle, .ia-facet-group__toggle');
    if (toggle) toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
    const hide = e.target.closest('.ia-facet-row__hide');
    if (hide) {
      const hiding = hide.getAttribute('aria-pressed') !== 'true';
      hide.setAttribute('aria-pressed', String(hiding));
      if (hiding) hide.closest('.ia-facet-row').querySelector('input').checked = false;
    }
    const clear = e.target.closest('.ia-facet-rail__clear');
    if (clear) {
      const rail = clear.closest('.ia-facet-rail');
      rail.querySelectorAll('.ia-facet-row input').forEach(i => { i.checked = false; });
      rail.querySelectorAll('.ia-facet-row__hide').forEach(b => b.setAttribute('aria-pressed', 'false'));
    }
  });
  root.addEventListener('change', e => {
    if (e.target.matches('.ia-facet-row input') && e.target.checked)
      e.target.closest('.ia-facet-row').querySelector('.ia-facet-row__hide').setAttribute('aria-pressed', 'false');
  });
}

/**
 * Replace [data-icon] / [data-icon-before] placeholders with real SVG. Keeps
 * icon markup out of the page source without hand-writing <svg> everywhere.
 */
export function hydrateIcons(root = document) {
  for (const el of root.querySelectorAll('[data-icon]')) {
    el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon, { size: el.dataset.iconSize || 'md' }));
    el.removeAttribute('data-icon');
    el.removeAttribute('data-icon-size');
  }
  for (const el of root.querySelectorAll('[data-icon-before]')) {
    el.insertAdjacentHTML('afterbegin', icon(el.dataset.iconBefore, { size: el.dataset.iconSize || 'md' }) + ' ');
    el.removeAttribute('data-icon-before');
    el.removeAttribute('data-icon-size');
  }
}

/* ------------------------------------------------- component wiring --- */
/*
 * The keyboard and state behavior each spec requires, shared by every page
 * that demos the component. Each takes a root and wires what it finds inside.
 */

/** Radio groups (segmented controls, the sort bar's view switch): one tab stop,
    arrows and Home/End move the choice. Arrow direction follows the text direction. */
export function wireRadioGroups(root = document) {
  for (const group of root.querySelectorAll('[role=radiogroup]:not([data-wired])')) {
    group.dataset.wired = '';
    const radios = [...group.querySelectorAll('[role=radio]')];
    const choose = (pick, focus = true) => {
      for (const b of radios) { b.setAttribute('aria-checked', String(b === pick)); b.tabIndex = b === pick ? 0 : -1; }
      if (focus) pick.focus();
      group.dispatchEvent(new CustomEvent('change', { detail: { value: pick.dataset.value ?? pick.textContent.trim() } }));
    };
    group.addEventListener('click', e => {
      const pick = e.target.closest('[role=radio]');
      if (pick && pick.getAttribute('aria-disabled') !== 'true') choose(pick, false);
    });
    group.addEventListener('keydown', e => {
      const rtl = getComputedStyle(group).direction === 'rtl';
      const step = { ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];
      const enabled = radios.filter(r => r.getAttribute('aria-disabled') !== 'true');
      let next;
      if (step) next = enabled[(enabled.indexOf(document.activeElement) + step + enabled.length) % enabled.length];
      if (e.key === 'Home') next = enabled[0];
      if (e.key === 'End') next = enabled.at(-1);
      if (next) { e.preventDefault(); choose(next); }
    });
  }
}

/** Switches: role="switch" buttons flip aria-checked. */
export function wireSwitches(root = document) {
  for (const sw of root.querySelectorAll('.ia-switch:not([data-wired])')) {
    sw.dataset.wired = '';
    sw.addEventListener('click', () => {
      if (sw.getAttribute('aria-disabled') === 'true') return;
      sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true'));
    });
  }
}

/** Tooltips: Escape hides one without moving focus (WCAG 1.4.13); leaving re-arms it. */
export function wireTooltips(root = document) {
  for (const anchor of root.querySelectorAll('.ia-tooltip-anchor:not([data-wired])')) {
    anchor.dataset.wired = '';
    const tip = anchor.querySelector('.ia-tooltip');
    anchor.addEventListener('keydown', e => { if (e.key === 'Escape') tip.setAttribute('data-dismissed', ''); });
    for (const ev of ['pointerleave', 'focusout']) anchor.addEventListener(ev, () => tip.removeAttribute('data-dismissed'));
  }
}

/**
 * Menus: a trigger with aria-haspopup="menu" and aria-controls. Arrows and
 * Home/End move focus only and wrap; Enter, Space or a click activates and
 * closes; Escape closes and returns focus to the trigger. Down on the trigger
 * opens onto the current item. A roving tabindex keeps the menu one stop.
 */
export function wireMenus(root = document) {
  for (const trigger of root.querySelectorAll('[aria-haspopup=menu]:not([data-wired])')) {
    trigger.dataset.wired = '';
    const menu = document.getElementById(trigger.getAttribute('aria-controls'));
    const items = () => [...menu.querySelectorAll('[role^=menuitem]')];
    const open = (focusCurrent = true) => {
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      const list = items();
      const start = list.find(i => i.getAttribute('aria-checked') === 'true') ?? list[0];
      list.forEach(i => { i.tabIndex = i === start ? 0 : -1; });
      if (focusCurrent) start.focus();
    };
    const close = (refocus = true) => {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (refocus) trigger.focus();
    };
    trigger.addEventListener('click', () => (menu.hidden ? open() : close()));
    trigger.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); open(); } });
    menu.addEventListener('keydown', e => {
      const list = items(), i = list.indexOf(document.activeElement);
      const next = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: list.length - 1 }[e.key];
      if (next !== undefined) {
        e.preventDefault();
        const target = list[(next + list.length) % list.length];
        list.forEach(x => { x.tabIndex = x === target ? 0 : -1; });
        target.focus();
      } else if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') close(false);
    });
    menu.addEventListener('click', e => {
      const item = e.target.closest('[role^=menuitem]');
      if (!item) return;
      // A checkbox item toggles and leaves the menu open, so several can be set.
      if (item.getAttribute('role') === 'menuitemcheckbox') {
        item.setAttribute('aria-checked', String(item.getAttribute('aria-checked') !== 'true'));
        trigger.toggleAttribute('data-active', !!menu.querySelector('[role=menuitemcheckbox][aria-checked=true]'));
        return;
      }
      if (item.getAttribute('role') === 'menuitemradio') {
        for (const r of menu.querySelectorAll('[role=menuitemradio]')) r.setAttribute('aria-checked', String(r === item));
        const label = trigger.querySelector('[data-menu-value]');
        if (label) label.textContent = item.textContent.trim();
      }
      close();
    });
    document.addEventListener('pointerdown', e => {
      if (!menu.hidden && !menu.contains(e.target) && !trigger.contains(e.target)) close(false);
    });
  }
}

/** Carousels: previous / next move one page; each drops out at its end. */
export function wireCarousels(root = document) {
  for (const carousel of root.querySelectorAll('.ia-carousel:not([data-wired])')) {
    carousel.dataset.wired = '';
    const viewport = carousel.querySelector('.ia-carousel__viewport');
    const prev = carousel.querySelector('[data-carousel=prev]');
    const next = carousel.querySelector('[data-carousel=next]');
    const dir = () => (getComputedStyle(viewport).direction === 'rtl' ? -1 : 1);
    const sync = () => {
      const x = Math.abs(viewport.scrollLeft), max = viewport.scrollWidth - viewport.clientWidth;
      prev.hidden = x < 1;
      next.hidden = x > max - 1;
    };
    prev.addEventListener('click', () => viewport.scrollBy({ left: -viewport.clientWidth * dir() }));
    next.addEventListener('click', () => viewport.scrollBy({ left: viewport.clientWidth * dir() }));
    viewport.addEventListener('scroll', sync, { passive: true });
    new ResizeObserver(sync).observe(viewport);
    sync();
  }
}

/**
 * Validate on submit (patterns/forms.md): each failed field gets aria-invalid
 * and its message under it; a role="alert" summary in `summary` lists the
 * failures as links to their fields, and focus moves there. `checks` is
 * [fieldId, message, test(value)] — test returns true when the value is fine.
 * Returns true when everything passed.
 */
export function validateForm(summary, checks, { title = 'Please fix the following:' } = {}) {
  const failed = [];
  for (const [id, message, test] of checks) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    const bad = !test(input.value.trim());
    input.toggleAttribute('aria-invalid', bad);
    if (error) { error.hidden = !bad; error.textContent = bad ? message : ''; }
    const described = (input.getAttribute('aria-describedby') ?? '').split(' ').filter(x => x && x !== `${id}-error`);
    if (bad && error) described.push(`${id}-error`);
    if (described.length) input.setAttribute('aria-describedby', described.join(' '));
    if (bad) failed.push([id, message]);
  }
  summary.innerHTML = failed.length ? `
    <div class="ia-message ia-message--danger" role="alert"><span class="ia-message__icon">${icon('alert')}</span>
      <div class="ia-message__body"><strong>${title}</strong>
      <ul style="margin:var(--ia-space-1) 0 0;padding-inline-start:var(--ia-space-4)">${
        failed.map(([id, m]) => `<li><a class="ia-link" href="#${id}">${m}</a></li>`).join('')}</ul></div></div>` : '';
  if (failed.length) summary.focus();
  return !failed.length;
}

/** Show/hide password toggles: one fixed name, aria-pressed carries the state. */
export function wirePasswordToggles(root = document) {
  for (const t of root.querySelectorAll('.ia-password__toggle:not([data-wired])')) {
    t.dataset.wired = '';
    t.innerHTML = icon('eye').replace('ia-icon ', 'ia-icon ia-password__eye ') +
                  icon('eye-off').replace('ia-icon ', 'ia-icon ia-password__eye-off ');
    t.addEventListener('click', () => {
      const on = t.getAttribute('aria-pressed') !== 'true';
      t.setAttribute('aria-pressed', String(on));
      t.parentElement.querySelector('input').type = on ? 'text' : 'password';
    });
  }
}

/** Read more: shows the toggle only when at least four lines are hidden. */
export function wireReadMore(root = document) {
  for (const host of root.querySelectorAll('.ia-read-more:not([data-wired])')) {
    host.dataset.wired = '';
    const body = host.querySelector('.ia-read-more__body');
    const toggle = host.querySelector('.ia-read-more__toggle');
    const measure = () => {
      if (host.hasAttribute('data-expanded')) return;
      // A list collapses by rows: past twelve dt/dd pairs it gets the toggle.
      if (host.classList.contains('ia-read-more--list')) {
        host.toggleAttribute('data-overflowing', body.children.length > 24);
        return;
      }
      const line = parseFloat(getComputedStyle(body).lineHeight);
      const lines = parseFloat(getComputedStyle(host).getPropertyValue('--_lines'));
      host.toggleAttribute('data-overflowing', body.scrollHeight - lines * line >= 4 * line);
    };
    toggle.addEventListener('click', () => {
      const open = !host.hasAttribute('data-expanded');
      host.toggleAttribute('data-expanded', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? toggle.dataset.less : toggle.dataset.more;
    });
    new ResizeObserver(measure).observe(body);
    measure();
  }
}

/* -------------------------------------------------------------- utils --- */

export const escapeHtml = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export const num = n => Number(n).toLocaleString('en-US');

export function table(headings, rows, className = 'doc-table') {
  return `<div class="doc-scroll"><table class="${className}">
    <thead><tr>${headings.map(h =>
      `<th${typeof h === 'object' && h.num ? ' class="num"' : ''}>${typeof h === 'object' ? h.label : h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map((c, i) =>
      `<td${typeof headings[i] === 'object' && headings[i].num ? ' class="num"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

/** A 1280 / 375 width switch that constrains the given element. */
export function viewportSwitch(target, label = 'Preview width') {
  const wrap = document.createElement('div');
  wrap.className = 'doc-row';
  wrap.innerHTML = `
    <span id="vpl" class="doc-compare__label">${label}</span>
    <div role="radiogroup" aria-labelledby="vpl" class="ia-segmented ia-segmented--sm">
      <button class="ia-segmented__option" type="button" role="radio" aria-checked="true" data-value="full">Desktop 1280</button>
      <button class="ia-segmented__option" type="button" role="radio" aria-checked="false" tabindex="-1" data-value="375">Mobile 375</button>
    </div>`;
  wireRadioGroups(wrap);
  wrap.querySelector('[role=radiogroup]').addEventListener('change', e => {
    if (e.detail.value === '375') target.setAttribute('data-width', '375');
    else target.removeAttribute('data-width');
  });
  return wrap;
}
