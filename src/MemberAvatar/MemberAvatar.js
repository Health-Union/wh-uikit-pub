import React, { useMemo } from "react";
import { string, number, shape, bool } from "prop-types";

import { WHAvatar } from "../WHAvatar";

import {
  getMemberInitials,
  getMemberDisplayName,
  getProfileAvatarColor
} from "../utils";
import { getPictureUrl } from "./MemberAvatar.utils";

export const MemberAvatar = ({
  className,
  profile,
  size,
  color,
  backgroundColor: backgroundColorInput,
  ...props
}) => {
  const { id: profileId } = profile;
  const isImageAvatar = useMemo(
    () => profile.picture && profile.picture.persisted,
    [profile]
  );

  const backgroundColor = useMemo(() => {
    if (backgroundColorInput) {
      return backgroundColorInput;
    }
    if (isImageAvatar) {
      return "white";
    }
    return getProfileAvatarColor(profileId);
  }, [backgroundColorInput, isImageAvatar, profileId]);

  const initials = getMemberInitials(profile);

  const avatarProps = {
    initials,
    size,
    colors: { background: backgroundColor, text: color },
    ...(isImageAvatar && {
      photo: getPictureUrl(profile.picture, size.imageSize),
      alt: getMemberDisplayName(profile) || "Member Photo"
    }),
    ...props
  };

  return <WHAvatar {...avatarProps} />;
};

MemberAvatar.propTypes = {
  profile: shape({
    id: number.isRequired,
    firstName: string,
    lastName: string,
    displayName: string,
    picture: shape({
      persisted: bool.isRequired,
      urls: shape({
        thumb: string.isRequired,
        micro: string,
        small: string,
        medium: string.isRequired
      }).isRequired
    })
  }).isRequired,
  size: shape({
    imageSize: number.isRequired,
    fontSize: string.isRequired
  }).isRequired,
  className: string,
  color: string,
  backgroundColor: string
};

MemberAvatar.defaultProps = {
  size: WHAvatar.sizes.small
};

MemberAvatar.sizes = WHAvatar.sizes;
