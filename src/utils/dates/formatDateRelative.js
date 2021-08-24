import moment from "moment";

moment.calendarFormat = function(date) {
  const now = moment();
  const diffInDays = date.diff(now, "days");
  const diffInHours = date.diff(now, "hours");
  const diffInYears = date.diff(now, "years");
  const tomorrow = now
    .clone()
    .startOf("day")
    .add("1", "days");

  if (tomorrow.isSame(date)) {
    return "nextDay";
  }

  if (diffInDays >= 7 && diffInDays < 14) {
    return "nextWeek";
  }

  if (diffInHours <= 0 && diffInHours > -2) {
    return "justNow";
  }

  if (diffInHours <= -2 && diffInHours > -4) {
    return "fewHoursAgo";
  }

  if (
    (diffInHours <= -4 && diffInHours > -24) ||
    (diffInHours > 4 && diffInHours < 24)
  ) {
    return "today";
  }

  if (diffInHours <= -24 && diffInHours > -48) {
    return "yesterday";
  }

  if (diffInHours <= -48 && diffInHours > -168) {
    return "thisWeek";
  }

  if (diffInDays <= -7 && diffInDays > -14) {
    return "lastWeek";
  }

  if (diffInDays <= -14 && diffInDays > -30) {
    return "within30Days";
  }

  if (diffInDays <= -30 && diffInDays > -90) {
    return "fewMonthsAgo";
  }

  if (diffInDays <= -90 && diffInDays > -180) {
    return "within180Days";
  }

  if (diffInDays <= -180 && diffInDays > -365) {
    return "within1Year";
  }

  if (diffInYears < 0) {
    return "overYearAgo";
  }

  return "sameElse";
};

/**
 * Returns relative time from now
 * @param {string} date
 */
export function formatDateRelative(date) {
  if (!date) return "-";
  return moment(date).calendar(null, {
    justNow: "[Just Now]",
    fewHoursAgo: "[A few hours ago]",
    today: "[Today]",
    yesterday: "[Yesterday]",
    thisWeek: "[This week]",
    within30Days: "[This month]",
    fewMonthsAgo: "[A few months ago]",
    within180Days: "[Within 180 days]",
    within1Year: "[Within the last year]",
    overYearAgo: "[Over a year ago]",
    nextDay: "[Tomorrow]",
    nextWeek: "[Next Week] (M/D)",
    sameElse: "MM/DD/YYYY",
    lastWeek: "[Last Week] (M/D)"
  });
}
