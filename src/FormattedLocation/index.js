import React from "react";
import { string, bool, shape } from "prop-types";

import { Typography } from "../Typography";

import { getFormattedLocation } from "../utils";

const FormattedLocation = ({
  location,
  compact,
  disableTypography,
  variant,
  ...props
}) => {
  const formattedLocation = getFormattedLocation(location, compact);

  if (disableTypography) {
    return <span {...props}>{formattedLocation}</span>;
  }

  return (
    <Typography variant={variant || "caption"} {...props}>
      {formattedLocation}
    </Typography>
  );
};

FormattedLocation.propTypes = {
  location: shape({
    country: shape({
      code: string.isRequired,
      name: string.isRequired
    }).isRequired,
    stateProvince: shape({
      code: string.isRequired,
      name: string.isRequired
    }),
    city: string
  }).isRequired,
  /** To receive short forms, like MA, LA USA etc */
  compact: bool,
  /** To disable typography usage */
  disableTypography: bool.isRequired,
  /** Typography variant prop */
  variant: string.isRequired
};

FormattedLocation.defaultProps = {
  compact: false,
  variant: "body1",
  disableTypography: false
};

export default FormattedLocation;
