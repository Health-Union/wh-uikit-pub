import moment from "moment";
import { formatDateRelative } from "./formatDateRelative";
import { formatDateRelativeShort } from "./formatDateRelativeShort";
import { formatDateShortVariable } from "./formatDateShortVariable";

export const DATE_FORMAT_TYPES = {
  compact: Symbol("compact"),
  age: Symbol("age"),
  short: Symbol("short"),
  shortReadable: Symbol("shortReadable"),
  shortVariable: Symbol("shortVariable"),
  ymd: Symbol("ymd"),
  singleDigit: Symbol("singleDigit"),
  readable: Symbol("readable"),
  relative: Symbol("relativeTime"),
  relativeShort: Symbol("relativeShort"),
  long: Symbol("long")
};

const DATE_FORMATTERS = {
  [DATE_FORMAT_TYPES.compact]: date => moment(date).format("M/D/YYYY"),
  [DATE_FORMAT_TYPES.age]: date => `${moment().diff(date, "years")} years old`,
  [DATE_FORMAT_TYPES.short]: date => moment(date).format("M/D"),
  [DATE_FORMAT_TYPES.shortReadable]: date => moment(date).format("MMMM Do"),
  [DATE_FORMAT_TYPES.shortVariable]: date => formatDateShortVariable(date),
  [DATE_FORMAT_TYPES.ymd]: date => moment(date).format("YYYY-MM-DD"),
  [DATE_FORMAT_TYPES.singleDigit]: date => moment(date).format("M/D/YY"),
  [DATE_FORMAT_TYPES.readable]: date => moment(date).format("MMMM Do, YYYY"),
  [DATE_FORMAT_TYPES.relative]: date => formatDateRelative(date),
  [DATE_FORMAT_TYPES.relativeShort]: date => formatDateRelativeShort(date),
  [DATE_FORMAT_TYPES.long]: date => moment(date).format("M/D/YYYY h:mma")
};

/**
 *
 * @param {string} date
 * @param {symbol} format
 *
 */
export function formatDate(date, format = DATE_FORMAT_TYPES.compact) {
  if (!date) return "";
  const formatter = DATE_FORMATTERS[format];
  if (!formatter) {
    throw Error("Unknown Format Provided");
  }
  return formatter(date);
}
