import getFormattedLocation from "../getFormattedLocation";

describe("getFormattedLocation util", () => {
  it("returns Boston, Massachusetts", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          },
          city: "Boston"
        },
        false
      )
    ).toBe("Boston, Massachusetts");
  });

  it("returns Massachusetts", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          }
        },
        false
      )
    ).toBe("Massachusetts");
  });

  it("returns 'United States of America'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "United States of America"
          }
        },
        false
      )
    ).toBe("United States Of America");
  });

  it("returns 'Australia'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "au",
            name: "Australia"
          },
          city: "Melbourne"
        },
        false
      )
    ).toBe("Australia");
  });

  it("returns 'Boston, MA'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          },
          city: "Boston"
        },
        true
      )
    ).toBe("Boston, MA");
  });

  it("returns 'MA'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ma",
            name: "Massachusetts"
          }
        },
        true
      )
    ).toBe("MA");
  });

  it("returns 'US'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "USA"
          }
        },
        true
      )
    ).toBe("US");
  });

  it("returns 'AU'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "au",
            name: "Australia"
          },
          city: "Melbourne"
        },
        true
      )
    ).toBe("AU");
  });

  it("returns 'New York City, NY'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "us",
            name: "USA"
          },
          stateProvince: {
            code: "ny",
            name: "New york"
          },
          city: "new york city"
        },
        true
      )
    ).toBe("New York City, NY");
  });

  it("returns 'Singapore'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "sp",
            name: "Singapore"
          }
        },
        false
      )
    ).toBe("Singapore");
  });

  it("returns 'Canada'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "ca",
            name: "Canada"
          },
          stateProvince: {
            code: "08",
            name: "Massachusetts"
          },
          city: "Quebec"
        },
        false
      )
    ).toBe("Canada");
  });

  it("returns 'CA'", () => {
    expect(
      getFormattedLocation(
        {
          country: {
            code: "ca",
            name: "Ca"
          },
          stateProvince: {
            code: "08",
            name: "Massachusetts"
          },
          city: "Quebec"
        },
        true
      )
    ).toBe("CA");
  });
});
