import { upperFirst } from "lodash";
/**
 * Returns Display Name String
 * @param {object} member
 */

function getMemberDisplayName(member) {
  const { firstName, lastName, displayName } = member || {};
  let name = "";
  if (displayName) {
    name = displayName;
  } else {
    name = firstName || "";
    if (lastName) name = `${name} ${lastName}`;
  }
  return name
    .split(" ")
    .map(upperFirst)
    .join(" ");
}

export default getMemberDisplayName;
