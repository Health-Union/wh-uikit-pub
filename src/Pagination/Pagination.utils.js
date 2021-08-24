import { formatNumber } from "../utils";

export function formatViewing(currentPage, totals) {
  const viewingMin = currentPage.pageNumber
    ? currentPage.pageNumber * currentPage.pageSize - currentPage.pageSize + 1
    : "";
  const totalAllowed = currentPage.pageNumber * currentPage.pageSize;
  const viewingMax =
    totalAllowed <= totals.totalItems ? totalAllowed : totals.totalItems;

  return `Viewing ${viewingMin ? formatNumber(viewingMin) : ""}-${
    viewingMax ? formatNumber(viewingMax) : ""
  } of ${formatNumber(totals.totalItems)}`;
}
