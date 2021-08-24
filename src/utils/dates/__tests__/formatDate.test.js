import moment from "moment";
import MockDate from "mockdate";

import { formatDate, DATE_FORMAT_TYPES } from "../formatDate";

describe("formatDate", () => {
  beforeEach(() => {
    MockDate.set("12/28/2019");
  });

  afterEach(() => {
    MockDate.reset();
  });

  const date = "2019-08-04";

  it("returns empty string when no date given", () => {
    expect(formatDate()).toBe("");
  });

  it("throws an error when unknown format given", () => {
    expect(() => formatDate(date, "unknown")).toThrow(
      "Unknown Format Provided"
    );
  });

  it(`returns '8/4/2019' compact date for ${date} `, () => {
    expect(formatDate(date)).toBe("8/4/2019");
  });

  it(`returns short date 8/4 for ${date}`, () => {
    expect(formatDate(date, DATE_FORMAT_TYPES.short)).toBe("8/4");
  });

  it(`returns Small date 8/4/19 for ${date}`, () => {
    expect(formatDate(date, DATE_FORMAT_TYPES.singleDigit)).toBe("8/4/19");
  });

  it(`returns readable 'August 4th, 2019' for ${date}`, () => {
    expect(formatDate(date, DATE_FORMAT_TYPES.readable)).toBe(
      "August 4th, 2019"
    );
  });

  it(`returns readable 'August 4th' for ${date}`, () => {
    expect(formatDate(date, DATE_FORMAT_TYPES.shortReadable)).toBe(
      "August 4th"
    );
  });

  it(`returns age '26 years' from current date`, () => {
    const DOB = moment().subtract(26, "years");
    expect(formatDate(DOB, DATE_FORMAT_TYPES.age)).toBe("26 years old");
  });

  it(`returns age '0 years ago' from current date`, () => {
    const DOB = moment();
    expect(formatDate(DOB, DATE_FORMAT_TYPES.age)).toBe("0 years old");
  });

  it(`returns age as relative 'Tomorrow' from current date`, () => {
    const DOB = moment()
      .add(1, "days")
      .format("YYYY-MM-DD");
    expect(formatDate(DOB, DATE_FORMAT_TYPES.relative)).toBe("Tomorrow");
  });

  it(`returns 2019-08-04 for ${date}`, () => {
    expect(formatDate(date, DATE_FORMAT_TYPES.ymd)).toBe("2019-08-04");
  });

  describe("age diff", () => {
    it("returns 26 if pass 26 years old date from now", () => {
      const oldDate = moment().subtract(26, "years");
      expect(moment().diff(oldDate, "years")).toBe(26);
    });

    it("returns 0 if pass current date", () => {
      expect(moment().diff(moment(), "years")).toBe(0);
    });
  });

  describe("shortVariable", () => {
    it("returns M/D for this year date", () => {
      expect(formatDate(moment(), DATE_FORMAT_TYPES.shortVariable)).toBe(
        "12/28"
      );
    });

    it("returns M/D/YY for past year date", () => {
      expect(
        formatDate(
          moment().subtract(1, "year"),
          DATE_FORMAT_TYPES.shortVariable
        )
      ).toBe("12/28/18");
    });

    it("returns M/D/YY for next year date", () => {
      expect(
        formatDate(moment().add(1, "year"), DATE_FORMAT_TYPES.shortVariable)
      ).toBe("12/28/20");
    });
  });
});
