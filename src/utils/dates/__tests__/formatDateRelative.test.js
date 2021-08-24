import moment from "moment";
import MockDate from "mockdate";

import { formatDateRelative } from "../formatDateRelative";

describe("formatDateRelative", () => {
  beforeEach(() => {
    MockDate.set("12/28/2019");
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('returns "Today" for same day', () => {
    const date = moment()
      .add(5, "hours")
      .toISOString();
    expect(formatDateRelative(date)).toBe("Today");
  });

  it('returns "A few hours ago" for greater than 2 hours & less then 4 hours diff', () => {
    const date = moment()
      .subtract("2", "hours")
      .toISOString();
    expect(formatDateRelative(date)).toBe("A few hours ago");
  });
  it('returns "Just Now" for diff in minutes and less then 2 hours', () => {
    const date = moment()
      .subtract("30", "minutes")
      .toISOString();
    expect(formatDateRelative(date)).toBe("Just Now");
  });
  it('returns "Yesterday" for greater than 24 hours & less then 48 hours diff', () => {
    const date = moment()
      .subtract("25", "hours")
      .toISOString();
    expect(formatDateRelative(date)).toBe("Yesterday");
  });
  it('returns "This week" for greater than 48 hours but less then 168 hours diff', () => {
    const date = moment()
      .subtract("60", "hours")
      .toISOString();
    expect(formatDateRelative(date)).toBe("This week");
  });

  it('returns "This month" for greater than 7 days but less than 30 days diff', () => {
    const date = moment()
      .subtract("15", "days")
      .toISOString();
    expect(formatDateRelative(date)).toBe("This month");
  });

  it('returns "A few months ago" for greater than 1 month but less then 3 months diff', () => {
    const date = moment()
      .subtract("2", "months")
      .toISOString();
    expect(formatDateRelative(date)).toBe("A few months ago");
  });

  it('returns "within 180 days" for greater than 3 month but less then 6 months', () => {
    const date = moment()
      .subtract("4", "months")
      .toISOString();
    expect(formatDateRelative(date)).toBe("Within 180 days");
  });

  it('returns "Within this last year" for greater than 6 month but less then 12 months diff', () => {
    const date = moment()
      .subtract("7", "months")
      .toISOString();
    expect(formatDateRelative(date)).toBe("Within the last year");
  });

  it('returns "Over a year ago" for greater 1 year', () => {
    const date = moment()
      .subtract("2", "years")
      .toISOString();
    expect(formatDateRelative(date)).toBe("Over a year ago");
  });
});
