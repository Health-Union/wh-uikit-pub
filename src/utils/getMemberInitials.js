import { isEmpty, capitalize } from "lodash";

function getFirstChar(str) {
  return (str || "")[0] || "";
}

/*
 * Returns intials from member object
 */

function getMemberInitials(member = {}) {
  if (isEmpty(member)) {
    return "";
  }

  const { firstName, lastName, displayName, email } = member;
  /** If displayName then use otherwise firstName */
  let chars = getFirstChar(displayName || firstName || email);

  /** If lastName is given but no displayName let's concat firstName lastName */
  if (lastName && !displayName) {
    chars = `${chars}${getFirstChar(lastName)}`;
  }

  /** If only email is given but no displayName, firstName, lastName */
  if (email && !lastName && !firstName && !displayName)
    chars = capitalize(`${getFirstChar(email)}`);

  return chars;
}

export default getMemberInitials;
