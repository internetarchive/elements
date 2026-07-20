import { TemplateResult } from 'lit';
import { MetadataResponse } from '@internetarchive/metadata-service';

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
  item: MetadataResponse;
  baseHost: string;
  subPrefix: string;
  updated?: unknown;
  actionButton?: TemplateResult;
}
