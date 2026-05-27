/* eslint-disable @typescript-eslint/no-explicit-any */
export function timed(): (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor | void {
  return function actualDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor | void {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const start = Date.now();
      const result = originalMethod.apply(this, args);
      const end = Date.now();
      const duration = end - start;
      console.debug('Method', propertyKey, `executed in ${duration}ms`, {
        target,
        args,
      });
      return result;
    };
    return descriptor;
  };
}
