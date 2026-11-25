import * as React from 'react';

/**
 * IAComboBox — from ia-design-system@1.0.0.
 */
export interface IAComboBoxProps {
className?: string; id?: string; style?: React.CSSProperties; /** Optional label content, e.g. <span slot="label">Language</span>. */ children?: React.ReactNode; options?: { id: string; text: string }[]; placeholder?: string; /** 'select-only' (a styled select), 'list' (type to filter, must pick an option) or 'freeform' (any text). Default 'list'. */ behavior?: 'select-only' | 'list' | 'freeform'; maxAutocompleteEntries?: number; /** How typed text filters the options. Default 'substring'. */ filter?: 'all' | 'prefix' | 'suffix' | 'substring' | 'subsequence'; caseSensitive?: boolean; sort?: boolean; wrapArrowKeys?: boolean; stayOpen?: boolean; /** Shows a clear button. */ clearable?: boolean; /** The options list is open. */ open?: boolean; disabled?: boolean; required?: boolean; /** The selected option id (or typed text in 'freeform'). */ value?: string | null; onChange?: (e: CustomEvent<string | null>) => void; onToggle?: (e: CustomEvent<boolean>) => void;
}

export declare const IAComboBox: React.ComponentType<IAComboBoxProps>;
