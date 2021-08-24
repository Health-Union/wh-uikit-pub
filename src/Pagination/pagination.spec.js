import React from "react";
import { render, fireEvent, cleanup, act, wait } from "@testing-library/react";

import { Pagination } from ".";

describe("<Pagination />", () => {
  afterEach(cleanup);
  const onCurrentPageChange = jest.fn();

  it("rendres pagionation component", () => {
    const { getByText, getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 1, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    expect(getByText("Page Size:")).toBeInTheDocument();
    expect(getByTestId("page-size")).toBeInTheDocument();
    expect(getByText("Viewing 1-50 of 1,059")).toBeInTheDocument();
    expect(getByText("Page 1 of 22")).toBeInTheDocument();
    expect(getByTestId("first-page")).toBeInTheDocument();
    expect(getByTestId("previous-page")).toBeInTheDocument();
    expect(getByTestId("next-page")).toBeInTheDocument();
    expect(getByTestId("last-page")).toBeInTheDocument();
  });

  it("changes page on click of next page button", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 1, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    act(() => {
      fireEvent.click(getByTestId("next-page"));
    });
    expect(onCurrentPageChange).toBeCalledWith({ pageNumber: 2, pageSize: 50 });
  });

  it("changes page on click of last page button", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 1, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    act(() => {
      fireEvent.click(getByTestId("last-page"));
    });
    expect(onCurrentPageChange).toBeCalledWith({
      pageNumber: 22,
      pageSize: 50
    });
  });

  it("changes page on click of previous page button", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 3, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    act(() => {
      fireEvent.click(getByTestId("previous-page"));
    });
    expect(onCurrentPageChange).toBeCalledWith({ pageNumber: 2, pageSize: 50 });
  });

  it("changes page on click of first page button", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 3, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    act(() => {
      fireEvent.click(getByTestId("first-page"));
    });
    expect(onCurrentPageChange).toBeCalledWith({ pageNumber: 1, pageSize: 50 });
  });

  it("disables next page and last page buttons when current page is equal to last page", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 22, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    expect(getByTestId("last-page")).toHaveAttribute("disabled");
    expect(getByTestId("next-page")).toHaveAttribute("disabled");
  });

  it("disables previous page and first page buttons when current page is 1", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 1, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
      />
    );
    expect(getByTestId("first-page")).toHaveAttribute("disabled");
    expect(getByTestId("previous-page")).toHaveAttribute("disabled");
  });

  it("does not show page size and viewing when showPageSize and showViewing are set to false", () => {
    const { queryByText, queryByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 1, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
        showPageSize={false}
        showViewing={false}
      />
    );
    expect(queryByText("Page Size:")).toBeNull();
    expect(queryByTestId("page-size")).toBeNull();
    expect(queryByText("Viewing 1-50 of 1,050")).toBeNull();
  });

  it("shows page size options when page size select is clicked", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 1, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
        pageSizeOptions={[20, 30, 50]}
      />
    );
    act(() => {
      fireEvent.click(getByTestId("page-size"));
    });
    wait(() => {
      expect(getByTestId("page-size-20")).toBeInTheDocument();
      expect(getByTestId("page-size-30")).toBeInTheDocument();
      expect(getByTestId("page-size-50")).toBeInTheDocument();
    });
  });

  it("on click of page size option, calls onPageSizeChange", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 5, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
        pageSizeOptions={[20, 30, 50]}
      />
    );
    act(() => {
      fireEvent.click(getByTestId("page-size"));
    });
    wait(() => {
      fireEvent.click(getByTestId("page-size-30"));
      expect(onCurrentPageChange).toBeCalledWith({
        pageNumber: 5,
        pageSize: 30
      });
    });
  });

  it("renders disabled conrols", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 5, pageSize: 50 }}
        totals={{ totalItems: 1059, totalPages: 22 }}
        onCurrentPageChange={onCurrentPageChange}
        pageSizeOptions={[20, 30, 50]}
        disabled={true}
      />
    );
    expect(getByTestId("page-size")).toHaveClass("Mui-disabled");
    expect(getByTestId("first-page")).toHaveAttribute("disabled");
    expect(getByTestId("previous-page")).toHaveAttribute("disabled");
    expect(getByTestId("next-page")).toHaveAttribute("disabled");
    expect(getByTestId("last-page")).toHaveAttribute("disabled");
  });

  it("renders disabled conrols when totals is not provided", () => {
    const { getByTestId } = render(
      <Pagination
        currentPage={{ pageNumber: 5, pageSize: 50 }}
        totals={null}
        onCurrentPageChange={onCurrentPageChange}
        pageSizeOptions={[20, 30, 50]}
      />
    );
    expect(getByTestId("page-size")).toHaveClass("Mui-disabled");
    expect(getByTestId("first-page")).toHaveAttribute("disabled");
    expect(getByTestId("previous-page")).toHaveAttribute("disabled");
    expect(getByTestId("next-page")).toHaveAttribute("disabled");
    expect(getByTestId("last-page")).toHaveAttribute("disabled");
  });
});
