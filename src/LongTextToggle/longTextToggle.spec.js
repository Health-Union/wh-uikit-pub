import React from "react";
import { render, fireEvent } from "@testing-library/react";

import LongTextToggle from ".";

describe("<LongTextToggle />", () => {
  const longText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const shortText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a...";

  it("renders short Text with Show more Link", () => {
    const { getByText } = render(
      <LongTextToggle maxChars={200}>{longText}</LongTextToggle>
    );
    expect(getByText(shortText)).toBeInTheDocument();
    expect(getByText("Show more")).toBeInTheDocument();
  });

  it("renders showMore and showLess links", () => {
    const { getByText } = render(
      <LongTextToggle maxChars={200}>{longText}</LongTextToggle>
    );

    fireEvent.click(getByText("Show more"));
    setTimeout(() => {
      expect(getByText("Show less")).toBeInTheDocument();
    }, 250);

    fireEvent.click(getByText("Show less"));
    setTimeout(() => {
      expect(getByText("Show more")).toBeInTheDocument();
    }, 250);
  });

  it("shows custom show more and show less labels", () => {
    const { getByText } = render(
      <LongTextToggle maxChars={200} showMoreLabel="More" showLessLabel="Less">
        {longText}
      </LongTextToggle>
    );
    const moreLink = getByText("More");
    expect(moreLink).toBeInTheDocument();
    fireEvent.click(moreLink);
    expect(getByText("Less")).toBeInTheDocument();
  });
});
