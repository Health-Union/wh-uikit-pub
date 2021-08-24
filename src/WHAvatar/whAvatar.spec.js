import React from "react";
import { render, wait } from "@testing-library/react";

import { WHAvatar } from "./WHAvatar";

describe("<WHAvatar />", () => {
  it("renders with classes (MuiAvatar-root MuiAvatar-colorDefault)", () => {
    const { container } = render(<WHAvatar initials="AJ" shape="circle" />);
    expect(container.firstChild).toHaveClass("MuiAvatar-root");
    expect(container.firstChild).toHaveClass("MuiAvatar-colorDefault");
  });

  it("renders AJ to avatar", () => {
    const { getByText } = render(
      <WHAvatar initials="AJ" variant="circle" size={WHAvatar.sizes.large} />
    );
    expect(getByText("AJ")).toBeTruthy();
  });

  it("renders avatar with custom colors", () => {
    const { getByText } = render(
      <WHAvatar
        initials="AJ"
        colors={{
          background: "#ffaaaa",
          text: "#000"
        }}
      />
    );
    expect(getByText("AJ")).toHaveStyle(`
      backgroundColor: '#ffaaaa',
      color: '#000'
      `);
  });

  describe("Avatar Sizes", () => {
    it("renders with small size", () => {
      const { getByText } = render(<WHAvatar initials="AJ" />);
      expect(getByText("AJ")).toHaveStyle(`
        font-size: 1.25rem;
        height: 40px;
        width: 40px;
      `);
    });

    it("renders with medium size", () => {
      const { getByText } = render(
        <WHAvatar initials="AJ" size={WHAvatar.sizes.medium} />
      );

      wait(() => {
        expect(getByText("AJ")).toHaveStyle(`
          font-size: 1.5rem;
          height: 64px;
          width: 64px;
        `);
      });
    });

    it("renders with large size", () => {
      const { getByText } = render(
        <WHAvatar initials="AJ" size={WHAvatar.sizes.large} />
      );
      wait(() => {
        expect(getByText("AJ")).toHaveStyle(`
          font-size: 3rem;
          height: 128px;
          width: 128px;
        `);
      });
    });

    it("renders with large size", () => {
      const { getByText } = render(
        <WHAvatar initials="AJ" size={WHAvatar.sizes.extraLarge} />
      );
      wait(() => {
        expect(getByText("AJ")).toHaveStyle(`
          font-size: 8rem;
          height: 256px;
          width: 256px;
        `);
      });
    });
  });

  describe("Photo Avatar", () => {
    it("renders image avatar with  alt tag as initials", () => {
      const { getByAltText } = render(
        <WHAvatar
          initials="AJ"
          photo="//placekitten.com/40/40"
          alt="Member Photo"
        />
      );
      expect(getByAltText("Member Photo")).toBeTruthy();
    });
  });
});
