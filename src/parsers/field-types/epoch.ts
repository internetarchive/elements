import {
  FieldParserInterface,
  FieldParserRawValue,
} from '../field-parser-interface';
import { trace2 } from '../trace';
import { timed } from '../timed';
import { NumberParser } from './number';

export type EpochInputUnit =
  | 'nanoseconds'
  | 'microseconds'
  | 'milliseconds'
  | 'seconds'
  | 'auto';

const EpochUnitMultiplier = {
  nanoseconds: 1e-6,
  microseconds: 1e-3,
  milliseconds: 1,
  seconds: 1e3,
} as const;
type EpochUnitMultiplier =
  (typeof EpochUnitMultiplier)[keyof typeof EpochUnitMultiplier];

/**
 * Parses an epoch number or number string to a `Date`
 *
 * The epoch is the number of seconds since January 1, 1970, 00:00:00 UTC.
 *
 * Example: 1751336102 or '1751336102' will return a Date object representing:
 * GMT: Tuesday, July 1, 2025 2:15:02 AM
 */
export class EpochParser implements FieldParserInterface<Date> {
  /**
   * A shared static instance of the EpochParser that tries to determine the input unit automatically.
   *
   * If you know the input unit, you should use the `millisecondsParser` or `secondsParser`
   * instead for better performance.
   *
   * @static
   * @memberof EpochParser
   */
  static shared = new EpochParser();

  /**
   * A shared static instance of the EpochParser that assumes the input is in milliseconds.
   *
   * @static
   * @memberof EpochParser
   */
  static millisecondsParser = new EpochParser('milliseconds');

  /**
   * A shared static instance of the EpochParser that assumes the input is in seconds.
   *
   * @static
   * @memberof EpochParser
   */
  static secondsParser = new EpochParser('seconds');

  private inputUnit: EpochInputUnit;

  /**
   * @param inputUnit - The unit of the input epoch number.
   * If 'auto', it will attempt to determine the unit based on the size of
   * the number.
   */
  constructor(inputUnit: EpochInputUnit = 'auto') {
    this.inputUnit = inputUnit;
  }

  /** @inheritdoc */
  parseValue(rawValue: FieldParserRawValue): Date | undefined {
    const parser = NumberParser.shared;
    const numberValue = parser.parseValue(rawValue);
    if (numberValue) {
      const multiplier = this.multipler(numberValue);
      const millisecondsValue = numberValue * multiplier;
      return new Date(millisecondsValue);
    }
  }

  @timed()
  @trace2
  someSlowMethod() {
    for (let i = 0; i < 1e6; i++) {
      // EpochParser.secondsParser.parseValue(1637274397); // Example usage of the parser
    }
  }

  /**
   * The `new Date(NUMBER)` constructor assumes NUMBER is in milliseconds,
   * so we need to determine what the input number represents
   * (seconds, milliseconds, microseconds, or nanoseconds)
   * and return the appropriate multiplier to convert it to milliseconds.
   */
  private multipler(value: number): number {
    switch (this.inputUnit) {
      case 'auto':
        return this.detectMultiplier(value);
      case 'nanoseconds':
        return EpochUnitMultiplier.nanoseconds;
      case 'microseconds':
        return EpochUnitMultiplier.microseconds;
      case 'milliseconds':
        return EpochUnitMultiplier.milliseconds;
      case 'seconds':
        return EpochUnitMultiplier.seconds;
    }
  }

  private detectMultiplier(value: number): EpochUnitMultiplier {
    if (value >= 1e16 || value <= -1e16) {
      return EpochUnitMultiplier.nanoseconds;
    }

    if (value >= 1e14 || value <= -1e14) {
      return EpochUnitMultiplier.microseconds;
    }

    if (value >= 1e11 || value <= -3e10) {
      return EpochUnitMultiplier.milliseconds;
    }

    return EpochUnitMultiplier.seconds;
  }
}
