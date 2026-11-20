import * as React from 'react';

/**
 * IAButton — from ia-design-system@1.0.0.
 */
export interface IAButtonProps {
/** The inner <button> is ::part(button), for layout only (a width, a clamp), never restyling. */ className?: string; id?: string; /** Size with '--ia-theme-button-width' and '--ia-theme-button-height' (here or on an ancestor); '--ia-theme-button-width': '100%' is full width. */ style?: React.CSSProperties; /** The label. */ children?: React.ReactNode; /** Visual style. Default 'primary'. 'donate' is the green donate action; 'ghost' is borderless. 'transparent' is deprecated: it renders as 'ghost' and logs a warning. */ mode?: 'primary' | 'secondary' | 'danger' | 'warning' | 'donate' | 'disabled' | 'ghost' | 'transparent' | 'custom' | 'link' | 'danger-link'; /** Height: 'sm' 30px, 'md' 36px (default), 'lg' 44px. '--ia-theme-button-height' sets the 'md' height only. */ size?: 'sm' | 'md' | 'lg'; /** mode 'custom' takes its colors from --ia-button-custom-fill, --ia-button-custom-border, --ia-button-custom-text-color and their --ia-button-custom-active-* pressed states, set in style; --ia-button-transition sets its transition. */ /** Replaces the label with a loading indicator. */ loading?: boolean; /** Text shown beside the indicator while loading. */ loadingText?: string; disabled?: boolean; /** Behaves like a native button of this type inside a form. Default 'button'. */ type?: 'button' | 'submit' | 'reset'; /** Renders the button as a link. */ href?: string; openLinksNewTab?: boolean; onClick?: (e: MouseEvent) => void;
}

export declare const IAButton: React.ComponentType<IAButtonProps>;
