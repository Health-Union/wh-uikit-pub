import React, { useState } from "react";
import { string, number } from "prop-types";
import { Link, makeStyles } from "@material-ui/core";
import cx from "classnames";

const LongTextToggle = ({
  children: text,
  maxChars,
  showMoreLabel,
  showLessLabel,
  transitionDuration,
  ...props
}) => {
  /**
   * State
   */

  const isLongText = text.length > maxChars;
  const [showAll, setShowAll] = useState(!isLongText);
  /**
   * Styles
   */
  const classes = makeStyles(() => ({
    toggleLink: {
      marginLeft: "5px"
    },
    hide: {
      opacity: 0,
      "max-height": 0,
      transition: `all ${transitionDuration} linear`
    },
    show: {
      display: "inline",
      opacity: 1,
      "max-height": "999em",
      transition: `all ${transitionDuration} linear`
    }
  }))();

  /**
   * Methods
   */
  const toggleShowAll = () => setShowAll(!showAll);

  const truncatedPart = text.substr(0, maxChars);
  const restPart = text.substr(maxChars);
  const moreLessLink = (
    <Link
      component="button"
      variant="body2"
      underline="none"
      onClick={toggleShowAll}
      className={classes.toggleLink}
    >
      {showAll ? showLessLabel : showMoreLabel}
    </Link>
  );
  return (
    <div {...props}>
      <div>
        {truncatedPart}
        {!showAll && "..."}
        {isLongText && !showAll && moreLessLink}
        <div
          className={cx({
            [classes.hide]: !showAll,
            [classes.show]: showAll
          })}
        >
          {restPart}
        </div>
        {isLongText && showAll && moreLessLink}
      </div>
    </div>
  );
};

LongTextToggle.propTypes = {
  /** Content is Required */
  children: string.isRequired,
  /** Maximum characters to show */
  maxChars: number.isRequired,
  /** Custom Show More link label */
  showMoreLabel: string,
  /** Custom Show Less link label */
  showLessLabel: string,
  /** Transition duration e.g .22s */
  transitionDuration: string
};

LongTextToggle.defaultProps = {
  showMoreLabel: "Show more",
  showLessLabel: "Show less",
  transitionDuration: "1s"
};

export default LongTextToggle;
