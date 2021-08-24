import getProfileAvatarColor from "../getProfileAvatarColor";
import { AVATAR_COLORS } from "../../constants";

describe("Random Color Util", () => {
  it("returns Random color", () => {
    const color = getProfileAvatarColor(2);
    expect(Object.keys(AVATAR_COLORS)).toContain(color);
  });
});
