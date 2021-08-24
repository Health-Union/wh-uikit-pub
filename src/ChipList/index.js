import React, { useState } from "react";
import {
  string,
  shape,
  arrayOf,
  oneOfType,
  number,
  bool,
  object
} from "prop-types";
import cx from "classnames";
import { Link, makeStyles } from "@material-ui/core";

import Chip from "../Chip";

const getStyleClasses = transitionDuration => {
  const hideClass = {
    opacity: 0,
    "max-height": 0,
    "font-size": 0,
    transition: `${transitionDuration} ease-in`
  };
  const showClass = {
    opacity: 1,
    "font-size": "inherit",
    "max-height": "999em",
    transition: `${transitionDuration} ease-in`
  };

  return makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: { margin: theme.spacing(0.5) },
    bullet: {
      height: "auto",
      margin: "0 0 0 5px",
      fontWeight: "200",
      verticalAlign: "middle"
    },
    link: { marginLeft: "5px" },
    hide: { ...hideClass, width: 0 },
    show: { ...showClass, width: "auto" },
    hideLink: hideClass,
    showLink: showClass
  }))();
};

const ChipList = ({
  list,
  limit,
  chipProps,
  showBullets,
  showMoreLabel,
  showLessLabel,
  className,
  bulletColor,
  transitionDuration,
  ...props
}) => {
  /**
   * State
   */
  const [showAll, setShowAll] = useState(false);
  /**
   * method
   */
  const toggleShowAll = () => setShowAll(!showAll);

  const getChipLabel = label => {
    return showBullets ? (
      <span>
        {label}
        <span
          className={classes.bullet}
          style={{
            ...(!chipProps.color && {
              color: bulletColor
            })
          }}
          data-testid="chip-bullet"
        >
          &bull;
        </span>
      </span>
    ) : (
      label
    );
  };

  /**
   * Returns list of chips,by default truncated lenght
   * Returns remaining list of rest is passed as true
   * @param {bool} rest Rest of chiplist
   */
  const getChipList = (rest = false) => {
    let chips = [];
    const upperEnd = rest || list.length < limit ? list.length : limit;
    const lowerEnd = rest ? limit : 0;

    const { className: chipClassName, ...restChipProps } = chipProps;

    for (let i = lowerEnd; i < upperEnd; i++) {
      let label = list[i];
      let href = "";
      if (typeof list[i] !== "string") {
        label = list[i].label;
        href = list[i].href;
      }
      chips.push(
        <Chip
          {...(href && { href, component: "a", clickable: true })}
          key={i}
          className={cx(classes.chip, chipClassName)}
          label={getChipLabel(label)}
          {...restChipProps}
        />
      );
    }

    return chips;
  };

  const classes = getStyleClasses(transitionDuration);

  return (
    <div {...props} className={cx(classes.root, className)}>
      <div>{getChipList()}</div>
      {list.length > limit && (
        <Link
          component="button"
          variant="body2"
          underline="none"
          onClick={toggleShowAll}
          className={cx(classes.link, {
            [classes.hide]: showAll,
            [classes.show]: !showAll
          })}
        >
          {showMoreLabel}
        </Link>
      )}
      <div
        className={cx({
          [classes.hideLink]: !showAll,
          [classes.showLink]: showAll
        })}
      >
        {getChipList(true)}
      </div>
      {list.length > limit && (
        <Link
          component="button"
          variant="body2"
          underline="none"
          onClick={toggleShowAll}
          className={cx(classes.link, {
            [classes.hideLink]: !showAll,
            [classes.showLink]: showAll
          })}
        >
          {showLessLabel}
        </Link>
      )}
    </div>
  );
};

ChipList.propTypes = {
  list: arrayOf(
    oneOfType([
      string,
      shape({
        label: string.isRequired,
        href: string.isRequired
      })
    ])
  ).isRequired,
  limit: number.isRequired,
  chipProps: object,
  showBullets: bool,
  showMoreLabel: string,
  showLessLabel: string,
  className: string,
  bulletColor: string,
  transitionDuration: string
};

ChipList.defaultProps = {
  chipProps: {},
  showBullets: false,
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
  className: "",
  bulletColor: "rgba(0, 0, 0, 0.26)",
  transitionDuration: "1s"
};

export default ChipList;
