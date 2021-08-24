import React from "react";
import cx from "classnames";
import { makeStyles, Typography as MuiTypography } from "@material-ui/core";

import { variantPropSplit, variantPropCheck } from "./Typography.utils";
import {
  TYPOGRAPHY_COLORS,
  TYPOGRAPHY_VARIANT_MAPPING
} from "./Typography.constants";

const useStyles = makeStyles(theme => ({
  typographyColor: {
    color: ({ colorKeyword }) => TYPOGRAPHY_COLORS[colorKeyword]
  }
}));

export const Typography = React.forwardRef(function Typography(
  { className, variant, variantMapping, ...restProps },
  ref
) {
  const { muiVariant, colorKeyword } = variantPropSplit(variant);

  const classes = useStyles({ colorKeyword: colorKeyword });

  return (
    <MuiTypography
      variant={muiVariant}
      className={cx(classes.typographyColor, className)}
      variantMapping={variantMapping || TYPOGRAPHY_VARIANT_MAPPING}
      ref={ref}
      {...restProps}
    />
  );
});

Typography.propTypes = { variant: variantPropCheck };
