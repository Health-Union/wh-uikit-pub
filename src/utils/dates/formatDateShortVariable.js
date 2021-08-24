import moment from "moment";

export function formatDateShortVariable(date) {
  const momentDate = moment(date);
  if (momentDate.year() === moment().year()) {
    return momentDate.format("M/D");
  } else {
    return momentDate.format("M/D/YY");
  }
}
