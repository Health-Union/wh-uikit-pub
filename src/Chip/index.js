import React from "react";
import cx from "classnames";
import { Chip as MuiChip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  chip: {
    borderRadius: 5
  }
}));

const Chip = ({ ...props }) => {
  const classes = useStyles();

  return <MuiChip {...props} className={cx(props.className, classes.chip)} />;
};

export default Chip;
