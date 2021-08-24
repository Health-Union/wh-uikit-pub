import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import Pagination from "./Pagination";

export default function PaginationContainer({
  currentPage,
  totals,
  onCurrentPageChange,
  pageSizeOptions,
  showPageSize,
  showViewing,
  disabled,
  typographyVariant
}) {
  const handlePageNumberChange = useCallback(
    updatedPageNumber =>
      onCurrentPageChange({
        pageNumber: updatedPageNumber,
        pageSize: currentPage.pageSize
      }),
    [currentPage, onCurrentPageChange]
  );

  const handlePageSizeChange = useCallback(
    updatedPageSize =>
      onCurrentPageChange({
        pageNumber: currentPage.pageNumber,
        pageSize: updatedPageSize
      }),
    [currentPage, onCurrentPageChange]
  );

  const isEverythingDisabled = useMemo(() => disabled || !totals, [
    disabled,
    totals
  ]);

  const isPrevDisabled = useMemo(
    () => isEverythingDisabled || currentPage.pageNumber <= 1,
    [isEverythingDisabled, currentPage]
  );

  const isNextDisabled = useMemo(
    () => isEverythingDisabled || totals.totalPages <= currentPage.pageNumber,
    [isEverythingDisabled, currentPage, totals]
  );

  return (
    <Pagination
      currentPage={currentPage}
      totals={totals}
      handlePageNumberChange={handlePageNumberChange}
      handlePageSizeChange={handlePageSizeChange}
      pageSizeOptions={pageSizeOptions}
      showPageSize={showPageSize}
      showViewing={showViewing}
      isEverythingDisabled={isEverythingDisabled}
      isPrevDisabled={isPrevDisabled}
      isNextDisabled={isNextDisabled}
      typographyVariant={typographyVariant}
    />
  );
}

PaginationContainer.propTypes = {
  totals: PropTypes.shape({
    totalItems: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  }),
  currentPage: PropTypes.shape({
    pageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
  }).isRequired,
  onCurrentPageChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  showPageSize: PropTypes.bool.isRequired,
  showViewing: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  typographyVariant: PropTypes.string.isRequired
};

PaginationContainer.defaultProps = {
  pageSizeOptions: [10, 25, 50],
  showPageSize: true,
  showViewing: true,
  disabled: false,
  typographyVariant: "caption"
};
