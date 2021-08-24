import MockDate from "mockdate";

import { formatDateShortVariable } from "../formatDateShortVariable";

describe("formatDateShortVariable", () => {
  beforeEach(() => {
    MockDate.set("11/22/2000");
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("displays M/D when is current year", () => {
    expect(formatDateShortVariable("2000-01-01")).toEqual("1/1");
    expect(formatDateShortVariable("2000-06-21")).toEqual("6/21");
    expect(formatDateShortVariable("2000-12-31")).toEqual("12/31");
  });

  it("displays M/D/YY when is not current year", () => {
    expect(formatDateShortVariable("2001-01-01")).toEqual("1/1/01");
    expect(formatDateShortVariable("2020-05-07")).toEqual("5/7/20");
    expect(formatDateShortVariable("1999-12-31")).toEqual("12/31/99");
    expect(formatDateShortVariable("1995-05-15")).toEqual("5/15/95");
  });
});
