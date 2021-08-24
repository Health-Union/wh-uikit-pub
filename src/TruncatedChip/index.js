import React, { useState, useEffect } from "react";
import { number, string } from "prop-types";
import Chip from "../Chip";

const TruncatedChip = ({ maxChars, label, truncatedLabel, ...props }) => {
  /**
   * State
   */
  const [truncate, setTruncate] = useState(false);
  /**
   * Methods
   */
  const toggleTruncate = () => {
    if (truncatedLabel || (maxChars && label.length > maxChars)) {
      setTruncate(!truncate);
    }
  };
  /**
   * Effects
   */
  useEffect(() => {
    toggleTruncate();
    // TODO: toggleTruncate should be wrapped into useCallback
    // and added as dependency to this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const truncated = truncate
    ? truncatedLabel
      ? `${truncatedLabel}...`
      : `${label.substr(0, maxChars)}...`
    : label;
  return (
    <Chip
      {...props}
      label={truncated}
      onMouseEnter={toggleTruncate}
      onMouseLeave={toggleTruncate}
    />
  );
};

TruncatedChip.propTypes = {
  label: string.isRequired,
  truncatedLabel: string,
  maxChars: number
};

TruncatedChip.defaultProps = {
  maxChars: 0,
  truncatedLabel: ""
};

export default TruncatedChip;
