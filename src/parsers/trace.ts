/* eslint-disable @typescript-eslint/no-explicit-any */
export function trace(
  linePrefix: string = 'LOG:',
): (
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
      console.debug(linePrefix, 'Entering method', target, propertyKey, args);
      const result = originalMethod.apply(this, args);
      console.debug(
        linePrefix,
        'Exiting method',
        target,
        propertyKey,
        args,
        JSON.stringify(result),
      );
      return result;
    };
    return descriptor;
  };
}

export function trace2(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor | void {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.debug('BEEP', 'Entering method', target, propertyKey, args);
    const result = originalMethod.apply(this, args);
    console.debug(
      'BEEP',
      'Exiting method',
      target,
      propertyKey,
      args,
      JSON.stringify(result),
    );
    return result;
  };
  return descriptor;
}
