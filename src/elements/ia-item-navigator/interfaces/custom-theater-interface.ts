import { LitElement } from 'lit';
import { MetadataResponse } from '@internetarchive/metadata-service';
import {
  MenuProviderInterface,
  MenuShortcutInterface,
} from './menu-interfaces';
import { SharedResizeObserverInterface } from './service-interfaces';

/**
 * The contract a theater host implements to feed menu providers and shortcuts
 * to the item navigator.
 */
export interface CustomTheaterInterface extends LitElement {
  baseHost?: string;
  itemMD?: MetadataResponse;
  menuProviders?: MenuProviderInterface[];
  menuShortcuts?: MenuShortcutInterface[];
  sideMenuOpen: boolean;

  signedIn?: boolean | null;

  sharedObserver?: SharedResizeObserverInterface;

  emitLoadingStatusUpdate: (loaded: boolean) => void;

  addMenuShortcut: (menuId: string) => void;
  removeMenuShortcut: (menuId: string) => void;
  sortMenuShortcuts: () => void;
  emitMenuShortcutsUpdated: () => void;
}
