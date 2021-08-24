import React from "react";
import { render } from "@testing-library/react";

import { MemberAvatar } from "../MemberAvatar";

describe("<MemberAvatar />", () => {
  it("renders with classes (MuiAvatar-root MuiAvatar-colorDefault)", () => {
    const { container } = render(
      <MemberAvatar
        profile={{
          id: 3223,
          firstName: "John",
          picture: null
        }}
      />
    );
    expect(container.firstChild).toHaveClass("MuiAvatar-root");
    expect(container.firstChild).toHaveClass("MuiAvatar-colorDefault");
  });

  it('renders "J" to avatar', () => {
    const { getByText } = render(
      <MemberAvatar
        profile={{
          id: 3223,
          firstName: "John",
          picture: null
        }}
      />
    );
    expect(getByText("J")).toBeTruthy();
  });

  it('renders "JD" to avatar', () => {
    const { getByText } = render(
      <MemberAvatar
        profile={{
          id: 3223,
          firstName: "John",
          lastName: "Doe",
          picture: null
        }}
      />
    );
    expect(getByText("JD")).toBeTruthy();
  });

  it('renders "D" to avatar', () => {
    const { getByText } = render(
      <MemberAvatar
        profile={{
          id: 3223,
          firstName: "John",
          lastName: "Doe",
          displayName: "Display",
          picture: null
        }}
      />
    );
    expect(getByText("D")).toBeTruthy();
  });

  it('renders "D" with medium size', () => {
    const { getByText } = render(
      <MemberAvatar
        profile={{
          id: 2548,
          firstName: "John",
          lastName: "Doe",
          displayName: "Display",
          picture: null
        }}
        size={MemberAvatar.sizes.medium}
      />
    );
    expect(getByText("D")).toHaveStyle("font-size: 1.25rem");
  });

  it("renders Avatar in Sqaure shape", () => {
    const { getByText } = render(
      <MemberAvatar
        variant="square"
        profile={{
          id: 4589,
          firstName: "John",
          lastName: "Doe",
          displayName: "Display",
          picture: null
        }}
      />
    );
    expect(getByText("D")).toHaveStyle("border-radius: 0");
  });

  describe("image", () => {
    it('renders img tag with alt text "John Doe" to image avatar', () => {
      const { getByTestId } = render(
        <MemberAvatar
          profile={{
            id: 3223,
            firstName: "John",
            lastName: "Doe",
            picture: {
              persisted: true,
              urls: {
                medium: "https://material-ui.com/static/images/avatar/1.jpg",
                thumb: "https://material-ui.com/static/images/avatar/1.jpg"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").alt).toEqual("John Doe");
    });

    it("renders micro url when size=small", () => {
      const { getByTestId } = render(
        <MemberAvatar
          size={MemberAvatar.sizes.small}
          profile={{
            id: 3223,
            picture: {
              persisted: true,
              urls: {
                micro:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=micro",
                thumb:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb",
                small:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=small",
                medium:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").src).toEqual(
        "https://material-ui.com/static/images/avatar/1.jpg?variant=micro"
      );
    });

    it("renders thumb url when size=s and micro is not available", () => {
      const { getByTestId } = render(
        <MemberAvatar
          size={MemberAvatar.sizes.small}
          profile={{
            id: 3223,
            picture: {
              persisted: true,
              urls: {
                thumb:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb",
                medium:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").src).toEqual(
        "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb"
      );
    });

    it("renders thumb url when size=m", () => {
      const { getByTestId } = render(
        <MemberAvatar
          size={MemberAvatar.sizes.medium}
          profile={{
            id: 3223,
            picture: {
              persisted: true,
              urls: {
                micro:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=micro",
                thumb:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb",
                small:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=small",
                medium:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").src).toEqual(
        "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb"
      );
    });

    it("renders thumb url when size=l", () => {
      const { getByTestId } = render(
        <MemberAvatar
          size={MemberAvatar.sizes.large}
          profile={{
            id: 3223,
            picture: {
              persisted: true,
              urls: {
                micro:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=micro",
                thumb:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb",
                small:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=small",
                medium:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").src).toEqual(
        "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb"
      );
    });

    it("renders small url when size=xl", () => {
      const { getByTestId } = render(
        <MemberAvatar
          size={MemberAvatar.sizes.extraLarge}
          profile={{
            id: 3223,
            picture: {
              persisted: true,
              urls: {
                micro:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=micro",
                thumb:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb",
                small:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=small",
                medium:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").src).toEqual(
        "https://material-ui.com/static/images/avatar/1.jpg?variant=small"
      );
    });

    it("renders medium url when size=xl and small is not available", () => {
      const { getByTestId } = render(
        <MemberAvatar
          size={MemberAvatar.sizes.extraLarge}
          profile={{
            id: 3223,
            picture: {
              persisted: true,
              urls: {
                thumb:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=thumb",
                medium:
                  "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
              }
            }
          }}
        />
      );
      expect(getByTestId("avatar-image").src).toEqual(
        "https://material-ui.com/static/images/avatar/1.jpg?variant=medium"
      );
    });
  });
});
