import * as React from 'react';

/**
 * IAButton — from ia-design-system@1.0.0.
 */
export interface IAButtonProps {
/** The inner <button> is ::part(button), for layout only (a width, a clamp), never restyling. */ className?: string; id?: string; /** Size with '--ia-theme-button-width' and '--ia-theme-button-height' (here or on an ancestor); '--ia-theme-button-width': '100%' is full width. */ style?: React.CSSProperties; /** The label. */ children?: React.ReactNode; /** Visual style. Default 'primary'. 'donate' is the green donate action; 'ghost' is borderless. 'transparent' is deprecated: it renders as 'ghost' and logs a warning. */ mode?: 'primary' | 'secondary' | 'danger' | 'warning' | 'donate' | 'disabled' | 'ghost' | 'transparent' | 'custom' | 'link' | 'danger-link'; /** Height: 'sm' 30px, 'md' 36px (default), 'lg' 44px. '--ia-theme-button-height' sets the 'md' height only. */ size?: 'sm' | 'md' | 'lg'; /** mode 'custom' takes its colors from --ia-button-custom-fill, --ia-button-custom-border, --ia-button-custom-text-color and their --ia-button-custom-active-* pressed states, set in style; --ia-button-transition sets its transition. */ /** Replaces the label with a loading indicator. */ loading?: boolean; /** Text shown beside the indicator while loading. */ loadingText?: string; disabled?: boolean; /** Behaves like a native button of this type inside a form. Default 'button'. */ type?: 'button' | 'submit' | 'reset'; /** Renders the button as a link. */ href?: string; openLinksNewTab?: boolean; onClick?: (e: MouseEvent) => void;
}

export declare const IAButton: React.ComponentType<IAButtonProps>;

/**
 * IAComboBox — from ia-design-system@1.0.0.
 */
export interface IAComboBoxProps {
className?: string; id?: string; style?: React.CSSProperties; /** Optional label content, e.g. <span slot="label">Language</span>. */ children?: React.ReactNode; options?: { id: string; text: string }[]; placeholder?: string; /** 'select-only' (a styled select), 'list' (type to filter, must pick an option) or 'freeform' (any text). Default 'list'. */ behavior?: 'select-only' | 'list' | 'freeform'; maxAutocompleteEntries?: number; /** How typed text filters the options. Default 'substring'. */ filter?: 'all' | 'prefix' | 'suffix' | 'substring' | 'subsequence'; caseSensitive?: boolean; sort?: boolean; wrapArrowKeys?: boolean; stayOpen?: boolean; /** Shows a clear button. */ clearable?: boolean; /** The options list is open. */ open?: boolean; disabled?: boolean; required?: boolean; /** The selected option id (or typed text in 'freeform'). */ value?: string | null; onChange?: (e: CustomEvent<string | null>) => void; onToggle?: (e: CustomEvent<boolean>) => void;
}

export declare const IAComboBox: React.ComponentType<IAComboBoxProps>;

/**
 * IADropdown — from ia-design-system@1.0.0.
 */
export interface IADropdownProps {
className?: string; id?: string; style?: React.CSSProperties; /** The trigger's content: pass <span slot="dropdown-label">…</span>. */ children?: React.ReactNode; options?: { id: string; label: string; url?: string }[]; selectedOption?: string; /** Keep the selected option in the list. */ includeSelectedOption?: boolean; displayCaret?: boolean; open?: boolean; isDisabled?: boolean; closeOnSelect?: boolean; closeOnEscape?: boolean; closeOnBackdropClick?: boolean; openViaButton?: boolean; usePopover?: boolean; onOptionSelected?: (e: CustomEvent<{ option: { id: string; label: string } }>) => void;
}

export declare const IADropdown: React.ComponentType<IADropdownProps>;

/**
 * IADropdownSearchBar — from ia-design-system@1.0.0.
 */
export interface IADropdownSearchBarProps {
className?: string; id?: string; style?: React.CSSProperties; /** The query shown in the field. */ query?: string; /** The search types in the left dropdown, e.g. [{ id: 'all', label: 'All' }, { id: 'texts', label: 'Books/Documents' }]. */ categories?: { id: string; label: string }[]; /** The selected category id; defaults to the first. */ selectedCategory?: string; /** Default 'Search'. */ placeholder?: string; /** The narrow layout. */ useMobileView?: boolean; /** Hides the search-type dropdown. */ hideDropdown?: boolean; /** The submit button shows its loading state. */ loading?: boolean; onCategoryChanged?: (e: CustomEvent<string>) => void; onSearchRequested?: (e: CustomEvent<{ query: string; category: string }>) => void;
}

export declare const IADropdownSearchBar: React.ComponentType<IADropdownSearchBarProps>;

/**
 * IAHistogramDateRange — from ia-design-system@1.0.0.
 */
export interface IAHistogramDateRangeProps {
className?: string; id?: string; style?: React.CSSProperties; /** Result counts per bin, oldest first. */ bins?: number[]; /** The full range, e.g. '1900' and '2026' (in dateFormat). */ minDate?: string; maxDate?: string; /** The selected range; defaults to the full range. */ minSelectedDate?: string; maxSelectedDate?: string; /** Parse and display format. Default 'YYYY'. */ dateFormat?: string; /** Chart size in px. Defaults 180 × 40. */ width?: number; height?: number; /** How bar height follows the bin value. Default 'logarithmic', so small counts stay visible. */ barScaling?: 'linear' | 'logarithmic'; binSnapping?: 'none' | 'month' | 'year'; loading?: boolean; disabled?: boolean; missingDataMessage?: string; tooltipLabel?: string; /** Date format in the bar tooltips; defaults to dateFormat. */ tooltipDateFormat?: string; /** Slider handle width in px. Default 10. */ sliderWidth?: number; /** Tooltip size in px. Defaults 125 × 30. */ tooltipWidth?: number; tooltipHeight?: number; /** Debounce before the update event, in ms. Default 0. */ updateDelay?: number; /** Keep firing update events while a date input has focus. Default false. */ updateWhileFocused?: boolean; /** Content after the date inputs: pass <span slot="inputs-right-side">…</span>. */ children?: React.ReactNode; onHistogramDateRangeUpdated?: (e: CustomEvent<{ minDate: string; maxDate: string }>) => void;
}

export declare const IAHistogramDateRange: React.ComponentType<IAHistogramDateRangeProps>;

/**
 * IAOtpForm — from ia-design-system@1.0.0.
 */
export interface IAOtpFormProps {
className?: string; id?: string; style?: React.CSSProperties; /** Default 'ready'. */ validationStatus?: 'ready' | 'loading' | 'success' | 'error'; /** The request-a-new-code button shows its loading state. */ newCodeSending?: boolean; /** Number of code boxes. Default 6. */ numPasscodeChars?: number; numericOnly?: boolean; onCodeSubmitted?: (e: CustomEvent) => void; onNewCodeRequested?: (e: CustomEvent) => void;
}

export declare const IAOtpForm: React.ComponentType<IAOtpFormProps>;

/**
 * IAStatusIndicator — from ia-design-system@1.0.0.
 */
export interface IAStatusIndicatorProps {
className?: string; id?: string; style?: React.CSSProperties; /** Default 'loading'. 'ready' reserves the space without drawing. */ mode?: 'ready' | 'loading' | 'success' | 'error'; /** A media-type glyph in the middle of the loading ring instead of the dots. */ mediatype?: 'audio' | 'collection' | 'etree' | 'images' | 'search' | 'software' | 'texts' | 'tv' | 'video' | 'web'; /** An empty ring while loading. */ hideDots?: boolean; /** A custom glyph in the middle of the loading ring, in place of the dots or mediatype glyph: pass <svg slot="icon">…</svg>. */ children?: React.ReactNode; /** Accessible titles per state. */ loadingTitle?: string; successTitle?: string; errorTitle?: string;
}

export declare const IAStatusIndicator: React.ComponentType<IAStatusIndicatorProps>;













