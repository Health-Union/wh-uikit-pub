import React from "react";
import { render } from "@testing-library/react";

import MemberCard from ".";

describe("<MemberCard />", () => {
  it("renders MemberCard component with text and image", () => {
    const { getByTestId, getByText } = render(
      <MemberCard
        profile={{
          id: 2339,
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
        conditionName="Addison's Decease"
      />
    );
    expect(getByTestId("member-photo")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Addison's Decease")).toBeInTheDocument();
  });

  it("renders MemberCard component with text only ", () => {
    const { getByText } = render(
      <MemberCard
        profile={{
          id: 2339,
          firstName: "John",
          lastName: "Doe",
          picture: null
        }}
      />
    );
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("JD")).toBeInTheDocument();
  });
});
