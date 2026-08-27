import { TemplateResult } from 'lit';

export type MenuId = string;
export interface MenuShortcutInterface {
  icon: TemplateResult;
  id: MenuId;
  label: string;
}

export interface MenuDetailsInterface extends MenuShortcutInterface {
  menuDetails?: TemplateResult;
  selected?: boolean;
  followable?: boolean;
  href?: string;
  component?: TemplateResult;
}

export interface MenuProviderInterface extends MenuDetailsInterface {
  /** archive.org item identifier. */
  identifier: string;
  baseHost: string;
  subPrefix: string;
  updated?: unknown;
  actionButton?: TemplateResult;
}
