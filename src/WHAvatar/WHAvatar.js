import React from "react";
import { string, number, shape } from "prop-types";
import { makeStyles, Avatar } from "@material-ui/core";
import { Person as PersonIcon } from "@material-ui/icons";
import cx from "classnames";

const SIZE_PRESETS = {
  small: {
    imageSize: 40,
    fontSize: "1.25rem"
  },
  medium: {
    imageSize: 64,
    fontSize: "1.5rem"
  },
  large: {
    imageSize: 128,
    fontSize: "3rem"
  },
  extraLarge: {
    imageSize: 256,
    fontSize: "8rem"
  }
};

const useStyles = makeStyles(() => ({
  whAvatarRoot: {
    color: ({ colors }) => colors.text,
    backgroundColor: ({ colors }) => colors.background,
    width: ({ size }) => size.imageSize,
    height: ({ size }) => size.imageSize,
    fontSize: ({ size }) => size.fontSize
  }
}));

export const WHAvatar = ({
  initials,
  photo,
  size,
  colors,
  className,
  ...props
}) => {
  const classes = useStyles({ colors, size });
  const classNameProp = cx(className, classes.whAvatarRoot);

  if (photo) {
    return (
      <Avatar
        className={classNameProp}
        src={photo}
        imgProps={{
          "data-testid": "avatar-image"
        }}
        {...props}
      />
    );
  }

  if (initials) {
    return (
      <Avatar className={classNameProp} {...props}>
        {initials}
      </Avatar>
    );
  }

  return (
    <Avatar className={classNameProp} {...props}>
      <PersonIcon />
    </Avatar>
  );
};

WHAvatar.propTypes = {
  initials: string,
  photo: string,
  size: shape({
    imageSize: number.isRequired,
    fontSize: string.isRequired
  }).isRequired,
  colors: shape({
    background: string,
    text: string
  }),
  className: string
};

WHAvatar.defaultProps = {
  size: SIZE_PRESETS.small,
  colors: {
    background: "#bdbdbd",
    text: "#fafafa"
  }
};

WHAvatar.sizes = SIZE_PRESETS;
