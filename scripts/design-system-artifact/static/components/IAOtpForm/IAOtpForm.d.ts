import * as React from 'react';

/**
 * IAOtpForm — from ia-design-system@1.0.0.
 */
export interface IAOtpFormProps {
className?: string; id?: string; style?: React.CSSProperties; /** Default 'ready'. */ validationStatus?: 'ready' | 'loading' | 'success' | 'error'; /** The request-a-new-code button shows its loading state. */ newCodeSending?: boolean; /** Number of code boxes. Default 6. */ numPasscodeChars?: number; numericOnly?: boolean; onCodeSubmitted?: (e: CustomEvent) => void; onNewCodeRequested?: (e: CustomEvent) => void;
}

export declare const IAOtpForm: React.ComponentType<IAOtpFormProps>;
