import { AVATAR_COLORS } from "../constants/";

/**
 * Returns random color
 */
function getProfileAvatarColor(id) {
  const color = id % Object.keys(AVATAR_COLORS).length;
  return Object.keys(AVATAR_COLORS)[color];
}

export default getProfileAvatarColor;
