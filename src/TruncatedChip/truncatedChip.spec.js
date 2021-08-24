import React from "react";
import { render, fireEvent } from "@testing-library/react";

import TruncatedChip from ".";

describe("<TruncatedChip />", () => {
  const label =
    "testing long labels testing long labels testing long labels testing long labels";
  const testLabel = "testing long label...";

  it('renders "testing long label..."', () => {
    const { getByText } = render(<TruncatedChip label={label} maxChars={18} />);
    expect(getByText(testLabel)).toBeTruthy();
  });

  it("expands on hover and truncates on mouse leave", () => {
    const { getByText } = render(<TruncatedChip label={label} maxChars={18} />);
    fireEvent.mouseOver(getByText(testLabel));
    expect(getByText(label)).toBeInTheDocument();

    fireEvent.mouseLeave(getByText(label));
    expect(getByText(testLabel)).toBeInTheDocument();
  });

  it("shows custom passed truncated label", () => {
    const truncatedLabel = "Long Text goes here";
    const { getByText } = render(
      <TruncatedChip label={label} truncatedLabel={truncatedLabel} />
    );
    expect(getByText(`${truncatedLabel}...`)).toBeTruthy();
  });
});
