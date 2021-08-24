import React from "react";
import { render, fireEvent } from "@testing-library/react";

import ChipList from ".";

describe("<ChipList />", () => {
  it("renders chips", () => {
    const { getByText } = render(
      <ChipList
        list={[
          "Education",
          "Entertainment",
          "Heath-Advocacy",
          "Heath-Online Communities"
        ]}
        limit={3}
      />
    );
    const eduChip = getByText("Education");
    const enterChip = getByText("Entertainment");
    const heatlhAdChip = getByText("Heath-Advocacy");
    const showMore = getByText("Show more");
    expect(eduChip).toBeInTheDocument();
    expect(eduChip).toHaveClass("MuiChip-label");
    expect(enterChip).toBeInTheDocument();
    expect(enterChip).toHaveClass("MuiChip-label");
    expect(heatlhAdChip).toBeInTheDocument();
    expect(heatlhAdChip).toHaveClass("MuiChip-label");
    expect(showMore).toBeInTheDocument();
  });

  it("shows all chips on click of Show more", () => {
    const { getByText, queryByText } = render(
      <ChipList
        list={[
          "Education",
          "Entertainment",
          "Heath-Advocacy",
          "Heath-Online Communities"
        ]}
        limit={3}
      />
    );
    fireEvent.click(getByText("Show more"));
    expect(getByText("Heath-Online Communities")).toBeInTheDocument();
    setTimeout(() => {
      expect(queryByText("Show more")).toHaveStyle(`opacity: 0`);
      expect(getByText("Show less")).toHaveStyle(`opacity: 0`);
    }, 1000);
  });

  it("renders bulleted chips with color red", () => {
    const { getAllByTestId } = render(
      <ChipList
        list={[
          "Education",
          "Entertainment",
          "Heath-Advocacy",
          "Heath-Online Communities"
        ]}
        limit={3}
        showBullets
        bulletColor="red"
      />
    );
    const bullets = getAllByTestId("chip-bullet");
    expect(bullets.length).toBe(4);
    bullets.forEach(e => {
      expect(e).toHaveStyle("color: red");
    });
  });

  it("renders anchor tags", () => {
    const { getByText } = render(
      <ChipList
        list={[
          { label: "Education", href: "https://google.com" },
          { label: "Entertainment", href: "https://google.com" },
          { label: "Heath-Advocacy", href: "https://google.com" },
          { label: "Heath-Online Communities", href: "https://google.com" }
        ]}
        limit={3}
      />
    );
    const eduChip = getByText("Education");
    const enterChip = getByText("Entertainment");
    const heatlhAdChip = getByText("Heath-Advocacy");
    expect(eduChip).toBeInTheDocument();
    expect(enterChip).toBeInTheDocument();
    expect(heatlhAdChip).toBeInTheDocument();
    expect(
      document.querySelectorAll('a[href="https://google.com"]').length
    ).toBe(4);
  });

  it("renders custom labels for show more/less", () => {
    const { getByText, queryByText } = render(
      <ChipList
        list={[
          "Education",
          "Entertainment",
          "Heath-Advocacy",
          "Heath-Online Communities"
        ]}
        limit={3}
        showMoreLabel="More"
        showLessLabel="Less"
      />
    );
    const moreLink = getByText("More");
    expect(moreLink).toBeInTheDocument();
    fireEvent.click(moreLink);
    setTimeout(() => {
      expect(queryByText("Less")).toHaveStyle(`opacity: 1`);
    }, 1000);
  });

  it("handles when chips are less then the provided limit", () => {
    const { getByText, queryByText } = render(
      <ChipList list={["Education", "Entertainment"]} limit={3} />
    );
    expect(getByText("Education")).toBeInTheDocument();
    expect(getByText("Entertainment")).toBeInTheDocument();
    expect(queryByText("Show more")).toBeNull();
  });
});
