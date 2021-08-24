const TypographyThemeDefaults = {
  // NOTE: the default font-size used by browsers
  htmlFontSize: 16,
  // NOTE: default font-family that covers most of browsers on the market
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  // NOTE: the default font-size of the Material Specification.
  fontSize: 14,
  h1: {
    fontSize: 105,
    fontWeight: 900,
    lineHeight: "normal",
    letterSpacing: -1.5
  },
  h2: {
    fontSize: 65.6,
    fontWeight: 900,
    lineHeight: "normal",
    letterSpacing: -0.5
  },
  h3: {
    fontSize: 52.5,
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "normal"
  },
  h4: {
    fontSize: 37.2,
    fontWeight: "bold",
    lineHeight: "normal",
    letterSpacing: 0.25
  },
  h5: {
    fontSize: 26.3,
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "normal"
  },
  h6: {
    fontSize: 21.9,
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: 0.25
  },
  subtitle1: {
    fontSize: 17.5,
    fontWeight: 600,
    lineHeight: 1.37,
    letterSpacing: 0.15
  },
  subtitle2: {
    fontSize: 15.3,
    fontWeight: "bold",
    lineHeight: 1.57,
    letterSpacing: 0.1
  },
  body1: {
    fontSize: 17.5,
    fontWeight: 300,
    lineHeight: 1.6,
    letterSpacing: 0.5
  },
  body2: {
    fontSize: 15.3,
    fontWeight: "normal",
    lineHeight: 1.31,
    letterSpacing: 0.25
  },
  caption: {
    fontSize: 13.1,
    fontWeight: 300,
    lineHeight: 1.22,
    letterSpacing: 0.4
  },
  overline: {
    fontSize: 13.1,
    fontWeight: "bold",
    lineHeight: 1.22,
    letterSpacing: 2
  }
};

function mergeVariant(defaults, overrides) {
  return Object.assign({}, defaults, overrides);
}

export function createTypographyTheme(input = {}) {
  const {
    htmlFontSize: htmlFontSizeInput,
    fontSize: fontSizeInput,
    fontFamily: fontFamilyInput,
    ...variantsOverrides
  } = input;

  const {
    htmlFontSize: htmlFontSizeDefault,
    fontSize: fontSizeDefault,
    fontFamily: fontFamilyDefault,
    ...variantsDefaults
  } = TypographyThemeDefaults;

  const typographyTheme = {
    htmlFontSize: htmlFontSizeInput || htmlFontSizeDefault,
    fontSize: fontSizeInput || fontSizeDefault,
    fontFamily: fontFamilyInput || fontFamilyDefault
  };

  Object.keys(variantsDefaults).forEach(variantName => {
    typographyTheme[variantName] = mergeVariant(
      variantsDefaults[variantName],
      variantsOverrides[variantName]
    );
  });

  return typographyTheme;
}
