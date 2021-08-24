import React from "react";
import { render } from "@testing-library/react";
import moment from "moment";
import MockDate from "mockdate";

import { RelativeTime } from "./RelativeTime";

beforeEach(() => {
  MockDate.set("12/28/2019");
});

afterEach(() => {
  MockDate.reset();
});

describe("<RelativeTime />", () => {
  it('renders "Just Now" for diff in minutes and less then 2 hours', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("30", "minutes")
          .toISOString()}
      />
    );
    expect(getByText("Just Now")).toBeTruthy();
  });

  it('renders "A few hours ago" for greater than 3 hours & less then 4 hours diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("3", "hours")
          .toISOString()}
      />
    );
    expect(getByText("A few hours ago")).toBeTruthy();
  });

  it('renders "Today" for greater than 4 hours & less then 24 hours diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("5", "hours")
          .toISOString()}
      />
    );
    expect(getByText("Today")).toBeTruthy();
  });

  it('renders "Yesterday" for greater than 24 hours & less then 48 hours diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("25", "hours")
          .toISOString()}
      />
    );
    expect(getByText("Yesterday")).toBeTruthy();
  });

  it('renders "This week" for greater than 48 hours but less then 168 hours diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("3", "days")
          .toISOString()}
      />
    );
    expect(getByText("This week")).toBeTruthy();
  });

  it('renders "This month" for greater than 7 days but less than 30 days diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("15", "days")
          .toISOString()}
      />
    );
    expect(getByText("This month")).toBeTruthy();
  });

  it('renders "A few months ago" for greater than 1 month but less then 3 months diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("2", "months")
          .toISOString()}
      />
    );
    expect(getByText("A few months ago")).toBeTruthy();
  });

  it('renders "within 180 days" for greater than 3 month but less then 6 months', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("4", "months")
          .toISOString()}
      />
    );
    expect(getByText("Within 180 days")).toBeTruthy();
  });

  it('renders "Within this last year" for greater than 6 month but less then 12 months diff', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("7", "months")
          .toISOString()}
      />
    );
    expect(getByText("Within the last year")).toBeTruthy();
  });

  it('renders "Over a year ago" for greater 1 year', () => {
    const { getByText } = render(
      <RelativeTime
        date={moment()
          .subtract("18", "months")
          .toISOString()}
      />
    );
    expect(getByText("Over a year ago")).toBeTruthy();
  });
});
