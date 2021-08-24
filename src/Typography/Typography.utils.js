import { isNil } from "lodash";

import { MUI_VARIANTS, COLOR_KEYWORDS } from "./Typography.constants";

const EMPTY_VARIANT_CONFIG = { muiVariant: null, colorKeyword: null };

export function splitVariantString(string) {
  if (isNil(string)) {
    return EMPTY_VARIANT_CONFIG;
  }
  const splitAtIndex = string.indexOf("/");
  if (splitAtIndex === -1) {
    return { muiVariant: string, colorKeyword: null };
  }
  return {
    muiVariant: string.substr(0, splitAtIndex),
    colorKeyword: string.substr(splitAtIndex + 1)
  };
}

export function isValidVariantConfig(config) {
  if (!isNil(config.muiVariant) && !MUI_VARIANTS.includes(config.muiVariant)) {
    return false;
  }
  if (
    !isNil(config.colorKeyword) &&
    !COLOR_KEYWORDS.includes(config.colorKeyword)
  ) {
    return false;
  }
  if (isNil(config.muiVariant) && !isNil(config.colorKeyword)) {
    return false;
  }
  return true;
}

export function variantPropSplit(string) {
  const config = splitVariantString(string);
  if (!isValidVariantConfig(config)) {
    return EMPTY_VARIANT_CONFIG;
  }
  return config;
}

function reportError(invalidVariant) {
  return new Error(
    `The 'variant' prop you have provided, '${invalidVariant}', is invalid. ` +
      `It must match one of the following formats - 'muiVariant' or ` +
      `'muiVariant/color' or 'muiVariant/color/emphasis' where\n\n` +
      `\tmuiVariant is one of [${MUI_VARIANTS.join(", ")}]\n\n` +
      `\tcolor/emphasis is one of [${COLOR_KEYWORDS.join(", ")}]\n`
  );
}

export function variantPropCheck(props) {
  const config = splitVariantString(props.variant);
  if (!isValidVariantConfig(config)) {
    return reportError(props.variant);
  }
  return null;
}
