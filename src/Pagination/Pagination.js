import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Box,
  IconButton,
  Select,
  MenuItem,
  InputBase
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";

import { Typography } from "../Typography";
import { formatViewing } from "./Pagination.utils";

const Pagination = ({
  classes,
  currentPage,
  totals,
  handlePageNumberChange,
  handlePageSizeChange,
  pageSizeOptions,
  showPageSize,
  showViewing,
  isEverythingDisabled,
  isPrevDisabled,
  isNextDisabled,
  typographyVariant
}) => (
  <Typography
    className={classes.root}
    component={Box}
    variant={typographyVariant}
  >
    {showPageSize && (
      <Box display="inline-flex" alignItems="center">
        <span>Page Size:&nbsp;</span>
        <Select
          data-testid="page-size"
          value={currentPage.pageSize}
          disabled={isEverythingDisabled}
          input={<InputBase />}
          onChange={e => handlePageSizeChange(e.target.value)}
        >
          {pageSizeOptions.map(size => (
            <MenuItem key={size} value={size} data-testid={`page-size-${size}`}>
              <Typography variant={typographyVariant} component="span">
                {size}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <span>&nbsp;</span>
      </Box>
    )}
    {showViewing && totals && (
      <Box display="inline">{formatViewing(currentPage, totals)} </Box>
    )}
    <Box display="flex" flexDirection="row" alignItems="center">
      <IconButton
        aria-label="First Page"
        size="small"
        onClick={() => handlePageNumberChange(1)}
        disabled={isPrevDisabled}
        data-testid="first-page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        aria-label="Previous Page"
        size="small"
        onClick={() => handlePageNumberChange(currentPage.pageNumber - 1)}
        disabled={isPrevDisabled}
        data-testid="previous-page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <span>
        Page {currentPage.pageNumber} of{" "}
        {totals ? totals.totalPages : "unknown"}
      </span>
      <IconButton
        aria-label="Next Page"
        size="small"
        onClick={() => handlePageNumberChange(currentPage.pageNumber + 1)}
        disabled={isNextDisabled}
        data-testid="next-page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        aria-label="Last Page"
        size="small"
        onClick={() => handlePageNumberChange(totals.totalPages)}
        disabled={isNextDisabled}
        data-testid="last-page"
      >
        <LastPage />
      </IconButton>
    </Box>
  </Typography>
);

Pagination.propTypes = {
  totals: PropTypes.shape({
    totalItems: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
  }),
  currentPage: PropTypes.shape({
    pageNumber: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired
  }).isRequired,
  handlePageNumberChange: PropTypes.func.isRequired,
  handlePageSizeChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  showPageSize: PropTypes.bool.isRequired,
  showViewing: PropTypes.bool.isRequired,
  isEverythingDisabled: PropTypes.bool.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
  typographyVariant: PropTypes.string.isRequired
};

export default withStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  }
}))(Pagination);
