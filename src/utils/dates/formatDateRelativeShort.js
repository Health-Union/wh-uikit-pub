import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%ss",
    ss: "%ss",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: "%dd",
    M: "%dm",
    MM: "%dm",
    y: "%Dy",
    yy: "%dy"
  }
});

/**
 * Returns short relative time, e.g 1h, 12h, 1d etc
 */
export function formatDateRelativeShort(date) {
  if (!date) return "-";
  return moment(date).fromNow();
}
