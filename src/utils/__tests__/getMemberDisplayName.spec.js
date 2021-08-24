import getMemberDisplayName from "../getMemberDisplayName";

describe("getMemberDisplayName util", () => {
  it("returns only firstName", () => {
    expect(
      getMemberDisplayName({
        firstName: "John",
        lastName: null,
        displayName: null
      })
    ).toBe("John");
  });

  it("returns combination first/last names when both present", () => {
    expect(
      getMemberDisplayName({
        firstName: "John",
        lastName: "Doe",
        displayName: null
      })
    ).toBe("John Doe");
  });

  it("returns displayName over first/last name combination when present", () => {
    expect(
      getMemberDisplayName({
        firstName: "John",
        lastName: "Doe",
        displayName: "Cancer John"
      })
    ).toBe("Cancer John");
  });

  it("capitalizes first letter of each name part", () => {
    expect(
      getMemberDisplayName({
        firstName: "John",
        lastName: "Doe",
        displayName: "cancer john"
      })
    ).toBe("Cancer John");
  });
});
