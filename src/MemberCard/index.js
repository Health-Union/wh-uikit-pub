import React, { useMemo } from "react";
import { string, shape, number } from "prop-types";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  makeStyles,
  Tooltip
} from "@material-ui/core";
import cx from "classnames";

import { MemberAvatar } from "../MemberAvatar";
import { Typography } from "../Typography";
import { getMemberDisplayName } from "../utils";

const useStyles = makeStyles({
  card: {
    width: ({ cardWidth }) => cardWidth,
    height: ({ cardHeight }) => cardHeight,
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  cardInner: {
    flexGrow: 1
  },
  media: {
    height: ({ hasContent, cardWidth, cardHeight }) =>
      hasContent ? cardWidth : cardHeight
  },
  mediaAvatar: {
    height: "100%"
  },
  content: {
    padding: "12px"
  },
  memberName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    color: "rgba(0, 0, 0, 0.87)"
  },
  conditionName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "clip",
    color: "rgba(0, 0, 0, 0.6)"
  }
});

function CardInner({ className, to, children }) {
  if (!to) {
    return <div className={className}>{children}</div>;
  }

  return (
    <CardActionArea className={className} component="a" href={to}>
      {children}
    </CardActionArea>
  );
}

const MemberCard = ({
  className,
  to,
  profile,
  conditionName,
  cardWidth,
  cardHeight,
  ...restProps
}) => {
  const displayName = useMemo(() => getMemberDisplayName(profile), [profile]);
  const hasContent = useMemo(
    () => Boolean(displayName) || Boolean(conditionName),
    [displayName, conditionName]
  );

  const classes = useStyles({
    hasContent,
    cardWidth,
    cardHeight
  });

  return (
    <Card className={cx(classes.card, className)} {...restProps}>
      <CardInner className={classes.cardInner} to={to}>
        <CardMedia className={classes.media} data-testid="member-photo">
          <MemberAvatar
            className={classes.mediaAvatar}
            size={{
              imageSize: cardWidth,
              fontSize: "4.5rem"
            }}
            variant="square"
            profile={profile}
          />
        </CardMedia>
        {hasContent && (
          <CardContent className={classes.content}>
            <Tooltip title={displayName} aria-label={displayName}>
              <Typography
                className={classes.memberName}
                component="h6"
                variant="body2/black/high-emphasis"
              >
                {displayName}
              </Typography>
            </Tooltip>
            {conditionName && (
              <Tooltip title={conditionName} aria-label={conditionName}>
                <Typography
                  className={classes.conditionName}
                  component="p"
                  variant="caption"
                >
                  {conditionName}
                </Typography>
              </Tooltip>
            )}
          </CardContent>
        )}
      </CardInner>
    </Card>
  );
};

MemberCard.propTypes = {
  profile: shape({
    firstName: string,
    lastName: string,
    displayName: string
  }),
  /** Condition Name */
  conditionName: string,
  cardWidth: number.isRequired,
  cardHeight: number.isRequired
};

MemberCard.defaultProps = {
  cardWidth: 120,
  cardHeight: 180
};

export default MemberCard;
