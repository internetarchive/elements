/**
 * Console logging for the lending bar. Every line carries a fixed
 * `[ia-book-actions:<scope>]` prefix so one flow can be followed across
 * modules in DevTools. Output only happens on development and review hosts.
 */
export interface Logger {
  /** Routine progress. */
  debug: (...args: unknown[]) => void;
  /** Something failed but the bar carries on. */
  warn: (...args: unknown[]) => void;
  /** Something failed that the patron or a developer needs to know about. */
  error: (...args: unknown[]) => void;
}

const PREFIX = 'ia-book-actions';

function isLoggingHost(): boolean {
  const { hostname, host } = window.location;
  return (
    hostname === 'localhost' ||
    /^(www|cat)-[a-z0-9]+\.archive\.org$/.test(host) ||
    /\.code\.archive\.org$/.test(host) ||
    /\.dev\.archive\.org$/.test(host) ||
    /^ia-petabox-/.test(host) ||
    /^internetarchive/.test(host)
  );
}

/**
 * @param scope the module the lines come from, like `bar` or `service`
 */
export function createLogger(scope: string): Logger {
  const prefix = `[${PREFIX}:${scope}]`;
  const emit =
    (method: 'log' | 'warn' | 'error') =>
    (...args: unknown[]): void => {
      if (isLoggingHost()) console[method](prefix, ...args);
    };
  return {
    debug: emit('log'),
    warn: emit('warn'),
    error: emit('error'),
  };
}
