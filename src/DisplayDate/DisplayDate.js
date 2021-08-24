import React from "react";
import { string, oneOf, bool } from "prop-types";
import { Typography } from "../Typography";
import { formatDate, DATE_FORMAT_TYPES } from "../utils";

export const DisplayDate = React.forwardRef(function DisplayDate(
  { date, format, disableTypography, variant, ...props },
  ref
) {
  if (disableTypography) {
    return (
      <span ref={ref} {...props}>
        {formatDate(date, format)}
      </span>
    );
  }
  return (
    <Typography ref={ref} variant={variant} {...props}>
      {formatDate(date, format)}
    </Typography>
  );
});

DisplayDate.propTypes = {
  date: string.isRequired,
  format: oneOf(Object.values(DATE_FORMAT_TYPES)).isRequired,
  variant: string.isRequired,
  disableTypography: bool.isRequired
};

DisplayDate.defaultProps = {
  format: DATE_FORMAT_TYPES.compact,
  variant: "body1",
  disableTypography: false
};

DisplayDate.formats = DATE_FORMAT_TYPES;
