import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Tooltip, withStyles } from "@material-ui/core";

import { DisplayDate } from "../DisplayDate";

export const RelativeTime = withStyles(theme => ({
  root: {
    display: "inline-block"
  }
}))(function RelativeTime({
  classes,
  className,
  date,
  tooltipFormat,
  disableTooltip,
  ...restProps
}) {
  if (disableTooltip) {
    return (
      <DisplayDate
        className={clsx(classes.root, className)}
        date={date}
        format={DisplayDate.formats.relative}
        {...restProps}
      />
    );
  }

  return (
    <Tooltip title={<DisplayDate date={date} format={tooltipFormat} />}>
      <DisplayDate
        className={clsx(classes.root, className)}
        date={date}
        format={DisplayDate.formats.relative}
        {...restProps}
      />
    </Tooltip>
  );
});

RelativeTime.propTypes = {
  date: PropTypes.string.isRequired,
  tooltipFormat: PropTypes.oneOf(Object.values(DisplayDate.formats)).isRequired,
  disableTooltip: PropTypes.bool.isRequired
};

RelativeTime.defaultProps = {
  tooltipFormat: DisplayDate.formats.compact,
  disableTooltip: false
};

RelativeTime.tooltipFormats = DisplayDate.formats;
