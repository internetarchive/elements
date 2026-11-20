import * as React from 'react';

/**
 * IADropdown — from ia-design-system@1.0.0.
 */
export interface IADropdownProps {
className?: string; id?: string; style?: React.CSSProperties; /** The trigger's content: pass <span slot="dropdown-label">…</span>. */ children?: React.ReactNode; options?: { id: string; label: string; url?: string }[]; selectedOption?: string; /** Keep the selected option in the list. */ includeSelectedOption?: boolean; displayCaret?: boolean; open?: boolean; isDisabled?: boolean; closeOnSelect?: boolean; closeOnEscape?: boolean; closeOnBackdropClick?: boolean; openViaButton?: boolean; usePopover?: boolean; onOptionSelected?: (e: CustomEvent<{ option: { id: string; label: string } }>) => void;
}

export declare const IADropdown: React.ComponentType<IADropdownProps>;
