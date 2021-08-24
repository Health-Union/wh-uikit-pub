import React from "react";
import { render } from "@testing-library/react";

import FormattedLocation from ".";

describe("<FormattedLocation />", () => {
  it('renders "Boston, Massachusetts"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          },
          city: "Boston"
        }}
      />
    );
    expect(getByText("Boston, Massachusetts")).toBeInTheDocument();
  });

  it('renders "Massachusetts"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          }
        }}
      />
    );
    expect(getByText("Massachusetts")).toBeInTheDocument();
  });

  it('renders "United States of America"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "United States of America"
          }
        }}
      />
    );
    expect(getByText("United States Of America")).toBeInTheDocument();
  });

  it('renders "Australia"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "au",
            name: "Australia"
          },
          city: "Melbourne"
        }}
      />
    );
    expect(getByText("Australia")).toBeInTheDocument();
  });

  it('renders "Boston, MA"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          },
          city: "Boston"
        }}
        compact
      />
    );
    expect(getByText("Boston, MA")).toBeInTheDocument();
  });

  it('renders "MA"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          }
        }}
        compact
      />
    );
    expect(getByText("MA")).toBeInTheDocument();
  });

  it('renders "US"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "USA"
          }
        }}
        compact
      />
    );
    expect(getByText("US")).toBeInTheDocument();
  });

  it('renders "AU"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "au",
            name: "Australia"
          },
          city: "Melbourne"
        }}
        compact
      />
    );
    expect(getByText("AU")).toBeInTheDocument();
  });

  // capitalize the first letter of each word in the city
  it('renders "New York City, NY"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ny",
            name: "New york"
          },
          city: "new york city"
        }}
        compact
      />
    );
    expect(getByText("New York City, NY")).toBeInTheDocument();
  });

  // convert all lower case to first letters capitalized
  it('renders "Singapore"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "sp",
            name: "Singapore"
          }
        }}
      />
    );
    expect(getByText("Singapore")).toBeInTheDocument();
  });

  // returns only the country outside the US
  it('renders "Canada"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "ca",
            name: "Canada"
          },
          stateProvince: {
            code: "08",
            name: "Massachusetts"
          },
          city: "Quebec"
        }}
      />
    );
    expect(getByText("Canada")).toBeInTheDocument();
  });

  it('renders "CA"', () => {
    const { getByText } = render(
      <FormattedLocation
        location={{
          country: {
            code: "ca",
            name: "Ca"
          },
          stateProvince: {
            code: "08",
            name: "Massachusetts"
          },
          city: "Quebec"
        }}
        compact
      />
    );
    expect(getByText("CA")).toBeInTheDocument();
  });
});
