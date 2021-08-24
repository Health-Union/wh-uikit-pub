import getMemberInitials from "../getMemberInitials";

describe("getMemberInitials util", () => {
  it("returns JD for member object with firstName and lastName", () => {
    const member = { firstName: "John", lastName: "Doe" };
    expect(getMemberInitials(member)).toBe("JD");
  });

  it("returns J for member object with only first name", () => {
    const member = { firstName: "John" };
    expect(getMemberInitials(member)).toBe("J");
  });

  it("returns D for member object with only lastName", () => {
    const member = { lastName: "Doe" };
    expect(getMemberInitials(member)).toBe("D");
  });

  it("returns D for member object with only displayName", () => {
    const member = { displayName: "Display Name" };
    expect(getMemberInitials(member)).toBe("D");
  });

  it("returns J for member object with only email", () => {
    const member = { email: "johndoe@gmail.com" };
    expect(getMemberInitials(member)).toBe("J");
  });

  it("returns D for member object with firstName, lastName, displayName", () => {
    const member = {
      firstName: "John",
      lastName: "Doe",
      displayName: "Display Name"
    };
    expect(getMemberInitials(member)).toBe("D");
  });
});
