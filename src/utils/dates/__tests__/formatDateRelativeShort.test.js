import moment from "moment";
import MockDate from "mockdate";

import { formatDateRelativeShort } from "../formatDateRelativeShort";

describe("formatDateRelativeShort util", () => {
  beforeEach(() => {
    MockDate.set("12/28/2019");
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("returns 1m for a date a minute ago", () => {
    expect(formatDateRelativeShort(moment().subtract("1", "minute"))).toBe(
      "1m ago"
    );
  });
  it("returns 1h for a date an hour ago", () => {
    expect(formatDateRelativeShort(moment().subtract("1", "hour"))).toBe(
      "1h ago"
    );
  });
  it("returns 1d for a date a day ago", () => {
    expect(formatDateRelativeShort(moment().subtract("1", "day"))).toBe(
      "1d ago"
    );
  });
  it("returns 2m for a date 2 month ago", () => {
    expect(formatDateRelativeShort(moment().subtract("2", "months"))).toBe(
      "2m ago"
    );
  });
  it("returns 1y for a date 1 year ago", () => {
    expect(formatDateRelativeShort(moment().subtract("1", "year"))).toBe(
      "1y ago"
    );
  });
});
