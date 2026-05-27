import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';

/**
 * Duration is a number in seconds
 */
export type Duration = number;

/**
 * Parses duration format to a `Duration` (number of seconds with decimal)
 *
 * Can parse hh:mm:ss.ms, hh:mm:ss, mm:ss, mm:ss.ms, and s.ms formats
 */
export class DurationParser implements FieldParserInterface<Duration> {
  // use a shared static instance for performance instead of
  // instantiating a new instance for every use
  static shared = new DurationParser();

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Duration | undefined {
    if (typeof rawValue === 'number') return rawValue;
    if (typeof rawValue === 'boolean') return undefined;

    const componentArray: string[] = rawValue.split(':');
    let seconds: number | undefined;
    // if there are no colons in the string, we can assume it's in sss.ms format so just parse it
    if (componentArray.length === 1) {
      seconds = this.parseNumberFormat(componentArray[0]);
    } else {
      seconds = this.parseColonSeparatedFormat(componentArray);
    }

    return seconds;
  }

  /**
   * Parse sss.ms format
   *
   * @param rawValue
   * @returns
   */
  private parseNumberFormat(rawValue: string): number | undefined {
    let seconds: number | undefined = parseFloat(rawValue);
    if (Number.isNaN(seconds)) seconds = undefined;
    return seconds;
  }

  /**
   * Parse hh:mm:ss.ms format
   *
   * @param componentArray
   * @returns
   */
  private parseColonSeparatedFormat(
    componentArray: string[],
  ): number | undefined {
    // if any of the hh:mm:ss components are NaN, just return undefined
    let hasNaNComponent = false;
    const parsedValue = componentArray
      .map((element: string, index: number) => {
        const componentValue: number = parseFloat(element);
        if (Number.isNaN(componentValue)) {
          hasNaNComponent = true;
          return 0;
        }
        const exponent: number = componentArray.length - 1 - index;
        const multiplier: number = 60 ** exponent;
        return componentValue * Math.floor(multiplier);
      })
      .reduce((a, b) => a + b, 0);

    return hasNaNComponent ? undefined : parsedValue;
  }
}
