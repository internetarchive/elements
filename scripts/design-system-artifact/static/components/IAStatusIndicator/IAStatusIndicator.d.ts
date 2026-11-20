import * as React from 'react';

/**
 * IAStatusIndicator — from ia-design-system@1.0.0.
 */
export interface IAStatusIndicatorProps {
className?: string; id?: string; style?: React.CSSProperties; /** Default 'loading'. 'ready' reserves the space without drawing. */ mode?: 'ready' | 'loading' | 'success' | 'error'; /** A media-type glyph in the middle of the loading ring instead of the dots. */ mediatype?: 'audio' | 'collection' | 'etree' | 'images' | 'search' | 'software' | 'texts' | 'tv' | 'video' | 'web'; /** An empty ring while loading. */ hideDots?: boolean; /** A custom glyph in the middle of the loading ring, in place of the dots or mediatype glyph: pass <svg slot="icon">…</svg>. */ children?: React.ReactNode; /** Accessible titles per state. */ loadingTitle?: string; successTitle?: string; errorTitle?: string;
}

export declare const IAStatusIndicator: React.ComponentType<IAStatusIndicatorProps>;
