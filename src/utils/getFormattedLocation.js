import { startCase, lowerCase, upperCase, trim } from "lodash";
/**
 * Returns formated location
 * @param {object} location
 * @param {bool} compact
 *  */

function getFormattedLocation(location, compact) {
  const { country, city, stateProvince } = location;
  const cityLocation = city ? `${startCase(city)}, ` : "";
  const countryName = startCase(lowerCase(country.name));
  let countryCode = lowerCase(country.code || "");

  const inUS =
    countryCode === "us" ||
    countryCode === "usa" ||
    countryCode.includes("united state") ||
    countryCode.includes("america");

  countryCode = startCase(countryCode);
  const upperCaseCountryCode = upperCase(countryCode);
  const stateCode = stateProvince ? upperCase(stateProvince.code || "") : "";
  let stateLocation = "";
  let countryLocation = "";

  if (stateProvince && inUS) {
    stateLocation = `${
      compact ? stateCode : startCase(lowerCase(stateProvince.name)) || ""
    }`;
  } else {
    if (upperCaseCountryCode) {
      countryLocation = compact ? upperCaseCountryCode : countryName;
    } else {
      countryLocation = inUS ? countryCode : countryName;
    }
  }

  const formattedLocation = `${inUS ? cityLocation : ""}${
    inUS ? stateLocation : ""
  }${countryLocation}`;

  return trim(formattedLocation, ", ");
}

export default getFormattedLocation;
