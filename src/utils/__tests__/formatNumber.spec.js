import formatNumber from "../formatNumber";

describe("formatNumber util", () => {
  it("returns 1,050 of 1050 number", () => {
    expect(formatNumber(1050)).toBe("1,050");
  });
});
