IAOtpForm from ia-design-system. Use via `window.IADesignSystem.IAOtpForm` (load `tokens.css`, `components/bundle.css` and `components/bundle.js`).

One-time-code form (`<ia-otp-form>`) for email sign-in codes.
Six code boxes with loading, success and error states and an "Email me another code" link.

## Props

```ts
interface IAOtpFormProps {
className?: string; id?: string; style?: React.CSSProperties; /** Default 'ready'. */ validationStatus?: 'ready' | 'loading' | 'success' | 'error'; /** The request-a-new-code button shows its loading state. */ newCodeSending?: boolean; /** Number of code boxes. Default 6. */ numPasscodeChars?: number; numericOnly?: boolean; onCodeSubmitted?: (e: CustomEvent) => void; onNewCodeRequested?: (e: CustomEvent) => void;
}
```

## Examples

### Ready

```jsx
() => <IAOtpForm />
```

### Checking

```jsx
() => <IAOtpForm validationStatus="loading" />
```

### WrongCode

```jsx
() => <IAOtpForm validationStatus="error" />
```

### Verified

```jsx
() => <IAOtpForm validationStatus="success" />
```
