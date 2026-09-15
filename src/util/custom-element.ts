/**
 * Allow for custom element classes with private constructors.
 */
type CustomElementClass = Omit<typeof HTMLElement, 'new'>;

/**
 * Class decorator factory that registers the decorated class as a custom
 * element, unless something has already claimed the tag name.
 *
 * Each element subpath is served to non-bundler consumers as a self-contained
 * bundle, so a component several elements share, such as
 * `ia-status-indicator`, is built into every entry point that imports it. A
 * page pulling in two of those subpaths therefore evaluates two copies of the
 * shared component and registers the same tag twice. `customElements.define`
 * throws on the second attempt, and because that happens while the module is
 * still evaluating it takes down the rest of the bundle with it, so the
 * element the page actually asked for never registers.
 *
 * Skipping a duplicate keeps the first copy registered and lets the rest of
 * the module finish. The copies are interchangeable: they are built from the
 * same source, and nothing narrows a shared element by class identity.
 *
 * ```ts
 * @customElement('ia-example')
 * class IAExample extends LitElement {}
 * ```
 *
 * @param tagName The tag name to register the element under.
 */
export function customElement(tagName: string) {
  return (
    classOrTarget: CustomElementClass,
    context?: ClassDecoratorContext<new () => HTMLElement>,
  ): void => {
    const define = (): void => {
      if (customElements.get(tagName)) return;
      customElements.define(tagName, classOrTarget as CustomElementConstructor);
    };

    // Standard decorators defer registration to an initializer; the legacy
    // decorators this project compiles with hand over the class directly.
    if (context) context.addInitializer(define);
    else define();
  };
}
