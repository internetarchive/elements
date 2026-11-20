// Stand-ins for the services the donation form, the lending bar and the item
// navigator need, so the design-system previews render without a backend.
// Adapted from the elements stories and test helpers. Never for production.

import { html, type TemplateResult } from 'lit';
import { PromisedSingleton } from '@internetarchive/promised-singleton';

import {
  MockBraintreeManager,
  MockPaymentProviders,
  MockPayPalHandler,
} from '@src/elements/ia-donation-form/braintree/test-helpers/mock-managers.test-helpers';
import type { FetchHandlerInterface } from '@src/services/fetch-handler/fetch-handler-interface';
import '@src/elements/modal-manager/modal-manager';
import '@src/elements/ia-item-navigator/menus/ia-itemnav-viewable-files-panel';
import '@src/elements/ia-item-navigator/menus/ia-itemnav-sort-files-button';
import '@src/elements/ia-item-navigator/menus/ia-itemnav-share-panel';
import { viewableFilesIcon } from '@src/elements/ia-item-navigator/menus/ia-itemnav-viewable-files-panel';
import { shareIcon } from '@src/elements/ia-item-navigator/menus/ia-itemnav-share-panel';
import '@src/elements/ia-infinite-scroller/story-support/ia-infinite-scroller-demo-tile';

/** The PayPal SDK draws its own button; here the form's own PayPal button stands in. */
class PreviewPayPalHandler extends MockPayPalHandler {
  async renderPayPalButton(): Promise<undefined> {
    return undefined;
  }
}

/** A Braintree manager whose payment methods all report as available. Payments never complete. */
export class MockDonationBraintreeManager extends MockBraintreeManager {
  constructor() {
    super();
    const providers = new MockPaymentProviders();
    providers.paypalHandler = new PromisedSingleton({
      generator: async () => new PreviewPayPalHandler(),
    });
    this.paymentProviders = providers;
  }
}

/** The donation form's invisible reCAPTCHA, answered locally. */
export class MockDonationRecaptchaManager {
  async execute(): Promise<string> {
    return 'demo-recaptcha-token';
  }

  setup(): void {}
}

/**
 * A `<modal-manager>` in `document.body`, hidden until a modal opens. The
 * donation form and the lending bar both open their dialogs through it.
 */
export function modalManager(): HTMLElement {
  const existing = document.body.querySelector<HTMLElement>('modal-manager');
  if (existing) return existing;
  const manager = document.createElement('modal-manager');
  manager.style.display = 'none';
  manager.addEventListener('modeChanged', (event) => {
    const { mode } = (event as CustomEvent<{ mode: string }>).detail;
    manager.style.display = mode === 'open' ? 'block' : 'none';
  });
  document.body.appendChild(manager);
  return manager;
}

/** Everything `IADonationFormController` needs to render with every payment button, and no Braintree. */
export function donationFormServices(): Record<string, unknown> {
  let recaptchaElement = document.getElementById('demo-recaptcha');
  if (!recaptchaElement) {
    recaptchaElement = document.createElement('div');
    recaptchaElement.id = 'demo-recaptcha';
    document.body.appendChild(recaptchaElement);
  }
  return {
    braintreeManager: new MockDonationBraintreeManager(),
    recaptchaManager: new MockDonationRecaptchaManager(),
    modalManager: modalManager(),
    recaptchaElement,
  };
}

function json(body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Answers the lending service's posts (borrow, return, renew, waitlist) with success, locally. */
export const mockLendingFetchHandler: FetchHandlerInterface = {
  fetch: async (_request, options) => {
    const body = (options as { requestInit?: RequestInit } | undefined)
      ?.requestInit?.body;
    const action = body instanceof FormData ? String(body.get('action')) : '';
    return json(
      action === 'renew_loan'
        ? { success: true, loan: { renewal: true } }
        : { success: true },
    );
  },
  fetchApiResponse: async <T>() => ({ success: true }) as T,
  fetchApiPathResponse: async <T>() => ({ success: true }) as T,
  fetchIAApiResponse: async <T>() => ({ success: true }) as T,
} as FetchHandlerInterface;

/**
 * Keeps a preview page in place: cancels the page loads the lending bar
 * starts after a borrow or return, and links clicked inside it.
 */
export function guardNavigation(): void {
  const w = window as unknown as {
    __dsNavGuard?: boolean;
    navigation?: EventTarget;
  };
  if (w.__dsNavGuard) return;
  w.__dsNavGuard = true;
  document.addEventListener(
    'click',
    (event) => {
      const link = event
        .composedPath()
        .find(
          (t): t is HTMLAnchorElement =>
            t instanceof HTMLAnchorElement && t.href !== '',
        );
      if (link) event.preventDefault();
    },
    true,
  );
  w.navigation?.addEventListener('navigate', (event) => {
    const e = event as Event & { destination: { sameDocument: boolean } };
    if (!e.destination.sameDocument && e.cancelable) e.preventDefault();
  });
}

/** A placeholder image as an SVG data URL. */
export function swatch(
  label: string,
  background: string,
  width = 800,
  height = 600,
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="${background}"/>
    <text x="${width / 2}" y="${height / 2 + 24}" font-family="sans-serif" font-size="72"
      fill="#ffffff" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Four placeholder images for `IAImageViewer`, as `{ name, title, url }`. */
export function demoImages(): { name: string; title: string; url: string }[] {
  return [
    { name: 'one.svg', title: 'First image', url: swatch('1', '#1b263b') },
    { name: 'two.svg', title: 'Second image', url: swatch('2', '#2c3e50') },
    { name: 'three.svg', title: 'Third image', url: swatch('3', '#14301a') },
    { name: 'four.svg', title: 'Fourth image', url: swatch('4', '#4a1f29') },
  ];
}

function demoFile(
  identifier: string,
  title: string,
  orig_sort: number,
  pdf = false,
) {
  return {
    title,
    file_prefix: identifier,
    file_subprefix: identifier,
    file_source: pdf ? `${identifier}.pdf` : identifier,
    url_path: `/details/${identifier}`,
    image: '',
    author: '',
    orig_sort,
  };
}

/**
 * The item navigator's side menu: viewable files (with the sort button),
 * share, and an about panel, over made-up files. Pass the result's
 * `menuContents` and `menuShortcuts` to `IAItemNavigator`.
 */
export function itemNavigatorMenus(identifier = 'demo-item'): {
  menuContents: unknown[];
  menuShortcuts: unknown[];
} {
  const files = [
    demoFile(`${identifier}-cover`, 'Front cover', 0),
    demoFile(`${identifier}-plates`, 'Plates and maps', 1),
    demoFile(`${identifier}-text`, 'Full text', 2, true),
    demoFile(`${identifier}-back`, 'Back cover', 3),
  ];
  const shared = { identifier, baseHost: 'archive.org', subPrefix: '' };
  const about: TemplateResult = html`<p style="padding: 0 1rem">
    Each menu entry supplies its own panel. The theater beside it is whatever
    the page slots in.
  </p>`;
  return {
    menuContents: [
      {
        ...shared,
        id: 'viewable-files',
        label: `Viewable Files (${files.length})`,
        icon: viewableFilesIcon,
        actionButton: html`<ia-itemnav-sort-files-button
          .fileListRaw=${files}
          sortOrderBy="default"
        ></ia-itemnav-sort-files-button>`,
        component: html`<ia-itemnav-viewable-files-panel
          baseHost="archive.org"
          subPrefix=${files[0].file_subprefix}
          .fileList=${files}
          sortOrderBy="default"
        ></ia-itemnav-viewable-files-panel>`,
      },
      {
        ...shared,
        id: 'share',
        label: 'Share this item',
        icon: shareIcon,
        component: html`<ia-itemnav-share-panel
          identifier=${identifier}
          baseHost="archive.org"
          type="item"
          .description=${'A demo item'}
        ></ia-itemnav-share-panel>`,
      },
      {
        ...shared,
        id: 'about',
        label: 'About this item',
        icon: viewableFilesIcon,
        component: about,
      },
    ],
    menuShortcuts: [
      {
        id: 'viewable-files',
        label: 'Viewable Files',
        icon: viewableFilesIcon,
      },
      { id: 'share', label: 'Share this item', icon: shareIcon },
    ],
  };
}

const TILE_COLORS = [
  '#1b263b',
  '#2c3e50',
  '#14301a',
  '#4a1f29',
  '#3d2147',
  '#00212b',
];

/** An item tile drawn with the design tokens: thumbnail, title, creator. */
function demoTile(index: number): TemplateResult {
  const n = index + 1;
  return html`<div
    style="block-size: 100%; box-sizing: border-box; display: flex; flex-direction: column; background: var(--ia-color-surface-raised); border: 1px solid var(--ia-color-border-subtle); border-radius: var(--ia-radius-sm); box-shadow: var(--ia-shadow-raised); overflow: hidden; font-family: var(--ia-font-family-base); color: var(--ia-color-text-primary)"
  >
    <img
      src=${swatch(
        String(n),
        TILE_COLORS[index % TILE_COLORS.length],
        320,
        240,
      )}
      alt=""
      style="display: block; inline-size: 100%; aspect-ratio: 4 / 3; object-fit: cover"
    />
    <div style="padding: var(--ia-space-2)">
      <div style="font-size: var(--ia-font-size-sm); font-weight: 700">
        Demo item ${n}
      </div>
      <div
        style="font-size: var(--ia-font-size-xs); color: var(--ia-color-text-secondary)"
      >
        by A. Creator
      </div>
    </div>
  </div>`;
}

/**
 * A cell provider for `IAInfiniteScroller` that draws numbered item tiles.
 * With `delayMs`, each cell shows the placeholder first, as if loading.
 */
export function demoCellProvider(delayMs = 0): {
  cellForIndex(index: number): TemplateResult | undefined;
  scroller?: { refreshCell(index: number): void };
} {
  const loaded = new Set<number>();
  const provider = {
    scroller: undefined as { refreshCell(index: number): void } | undefined,
    cellForIndex(index: number): TemplateResult | undefined {
      if (delayMs && !loaded.has(index)) {
        setTimeout(() => {
          loaded.add(index);
          provider.scroller?.refreshCell(index);
        }, delayMs);
        return undefined;
      }
      return demoTile(index);
    },
  };
  return provider;
}

/** The scroller's loading placeholder, for `placeholderCellTemplate`. */
export const demoPlaceholderCell = html`<ia-infinite-scroller-demo-placeholder></ia-infinite-scroller-demo-placeholder>`;
