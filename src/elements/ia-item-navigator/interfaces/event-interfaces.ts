import {
  MenuProviderInterface,
  MenuShortcutInterface,
  MenuId,
} from './menu-interfaces';

/** Toggles Menu && Sets open panel */
export interface ToggleSideMenuOpenEvent extends CustomEvent {
  type: 'updateSideMenu';
  detail: {
    menuId: MenuId | undefined | '';
    action: 'open' | 'toggle' | '';
  };
}

/** Sets open panel */
export interface ToggleSidePanelOpenEvent extends CustomEvent {
  type: 'menuTypeSelected';
  detail: {
    id: MenuId | '';
  };
}

/** Sets menu order that is displayed */
export interface SetSideMenuContentsEvent extends CustomEvent {
  type: 'menuUpdated';
  detail: MenuProviderInterface[];
}

/** Sets menu shortcuts that is displayed */
export interface SetSideMenuShortcutsEvent extends CustomEvent {
  type: 'menuUpdated';
  detail: MenuShortcutInterface[];
}

/** Toggles fullscreen mode */
export interface ManageFullscreenEvent extends CustomEvent {
  type: 'ViewportInFullScreen';
  detail: {
    isFullScreen: boolean;
  };
}

/** Toggles loading view */
export interface LoadingStateUpdatedEvent extends CustomEvent {
  type: 'loadingStateUpdated';
  detail: {
    loaded: boolean;
  };
}
