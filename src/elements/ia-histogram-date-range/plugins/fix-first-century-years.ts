import type dayjs from 'dayjs/esm';

/**
 * dayjs's public .d.ts doesn't declare its own internal parse/init machinery
 * or the underlying Date object (`$d`), since plugins aren't meant to reach
 * into them. This plugin needs to anyway, so it's typed by hand here.
 */
interface DayjsInternal extends dayjs.Dayjs {
  $d: Date;
  parse(cfg: { date: unknown; args: unknown[] }): void;
  init(): void;
}

/**
 * As with the Date(y, m, ...) constructor, dayjs interprets years 0-99 as offsets
 * from the year 1900 instead of the actual first-century years.
 * We don't want that weird legacy behavior; we want years parsed literally.
 *
 * The maintainer of dayjs apparently refuses to address this:
 *  - https://github.com/iamkun/dayjs/pull/548#issuecomment-477660947
 *  - https://github.com/iamkun/dayjs/issues/1237
 *
 * So this plugin tries to detect the anomalous cases where the date format
 * contains a YYYY block and the parsed date has a year in the 1900-1999 range,
 * by checking whether the parsed year actually occurred in the original string.
 * If not, then we assume it was parsed incorrectly as an offset, and adjust.
 *
 * In practice this assumption could fail if the input date is invalid in some
 * way (e.g. having overflow, like a YYYY-MM-DD of "1950-22-33", which might be
 * converted to 1951-11-02 and produce a false positive). Essentially, we trade away
 * leniency for overflow dates to ensure that we handle all valid ones correctly.
 * This seems a reasonable tradeoff for our present use cases. But realistically we
 * should probably explore moving to a date lib that handles these cases properly.
 */
export default function fixFirstCenturyYears(
  _: unknown,
  dayjsClass: typeof dayjs.Dayjs,
) {
  const proto = dayjsClass.prototype as unknown as DayjsInternal;
  const oldParse = proto.parse;
  proto.parse = function (this: DayjsInternal, cfg) {
    const inputDate = cfg.date;
    const format = cfg.args[1];
    oldParse.call(this, cfg);

    const year = this.year();
    const isProblemDateRange = year >= 1900 && year < 2000;
    const isProblemStringFormat =
      typeof format === 'string' && format.includes('YYYY');
    const isProblemArrayFormat =
      Array.isArray(format) &&
      typeof format[0] === 'string' &&
      format[0].includes('YYYY');
    const isProblemFormat = isProblemStringFormat || isProblemArrayFormat;
    const missingParsedYear =
      typeof inputDate === 'string' && !inputDate.includes(`${year}`);

    if (isProblemDateRange && isProblemFormat && missingParsedYear) {
      this.$d.setFullYear(year - 1900);
      this.init(); // Re-initialize with the new date
    }
  };
}
