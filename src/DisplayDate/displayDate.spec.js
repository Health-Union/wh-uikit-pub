import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";
import MockDate from "mockdate";

import { DisplayDate } from ".";

beforeEach(() => {
  MockDate.set("12/28/2019");
});

afterEach(() => {
  MockDate.reset();
});

describe("<DisplayDate />", () => {
  const date = "2019-08-05";

  it("renders short  date", () => {
    const { getByText } = render(
      <DisplayDate date={date} format={DisplayDate.formats.short} />
    );
    expect(getByText("8/5")).toBeTruthy();
  });

  it("renders readable  date", () => {
    const { getByText } = render(
      <DisplayDate date={date} format={DisplayDate.formats.readable} />
    );
    expect(getByText("August 5th, 2019")).toBeTruthy();
  });

  it("renders short readable  date", () => {
    const { getByText } = render(
      <DisplayDate date={date} format={DisplayDate.formats.shortReadable} />
    );
    expect(getByText("August 5th")).toBeTruthy();
  });

  it("renders age from date", () => {
    const dob = moment().subtract(26, "years");
    const { getByText } = render(
      <DisplayDate
        date={dob.format("YYYY-MM-DD")}
        format={DisplayDate.formats.age}
      />
    );
    expect(getByText("26 years old")).toBeTruthy();
  });

  it('renders relative age "Today" for same date', () => {
    const dob = moment();
    const { getByText } = render(
      <DisplayDate
        date={dob.add(5, "hours").toISOString()}
        format={DisplayDate.formats.relative}
      />
    );
    expect(getByText("Today")).toBeTruthy();
  });

  it('renders relative age "Yesterday" for last date', () => {
    const dob = moment().subtract(1, "days");
    const { getByText } = render(
      <DisplayDate
        date={dob.format("YYYY-MM-DD")}
        format={DisplayDate.formats.relative}
      />
    );
    expect(getByText("Yesterday")).toBeTruthy();
  });

  it('renders relative age "Next Week (M/D)" date within seven days', () => {
    const dob = moment().add(9, "days");
    const { getByText } = render(
      <DisplayDate
        date={dob.format("YYYY-MM-DD")}
        format={DisplayDate.formats.relative}
      />
    );
    expect(getByText(`Next Week (${dob.format("M/D")})`)).toBeTruthy();
  });

  it('renders relative age "Last Week (M/D)" date within last seven days', () => {
    const dob = moment().subtract(8, "days");
    const { getByText } = render(
      <DisplayDate
        date={dob.format("YYYY-MM-DD")}
        format={DisplayDate.formats.relative}
      />
    );
    expect(getByText(`Last Week (${dob.format("M/D")})`)).toBeTruthy();
  });
});
