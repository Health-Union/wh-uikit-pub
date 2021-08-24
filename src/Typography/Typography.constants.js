export const TYPOGRAPHY_DEFAULT_COLOR_KEYWORD = "__DefaultColor__";

export const TYPOGRAPHY_COLORS = {
  [TYPOGRAPHY_DEFAULT_COLOR_KEYWORD]: "inherit",
  primary: "#6200ee",
  "primary/high-emphasis": "#6200ee",
  "primary/medium-emphasis": "#6200ee",
  "primary/disabled": "#6200ee",
  secondary: "#14c5dd",
  "secondary/high-emphasis": "#14c5dd",
  "secondary/medium-emphasis": "#14c5dd",
  "secondary/disabled": "#14c5dd",
  black: "rgba(0, 0, 0, 0.87)",
  "black/high-emphasis": "rgba(0, 0, 0, 0.87)",
  "black/medium-emphasis": "rgba(0, 0, 0, 0.6)",
  "black/disabled": "rgba(0, 0, 0, 0.38)",
  white: "#fff",
  "white/high-emphasis": "#fff",
  "white/medium-emphasis": "rgba(255, 255, 255, 0.6)",
  "white/disabled": "rgba(255, 255, 255, 0.38)"
};

export const TYPOGRAPHY_VARIANT_MAPPING = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "p",
  button: "p",
  overline: "p"
};

export const MUI_VARIANTS = Object.keys(TYPOGRAPHY_VARIANT_MAPPING);
export const COLOR_KEYWORDS = Object.keys(TYPOGRAPHY_COLORS).filter(
  keyword => keyword !== TYPOGRAPHY_DEFAULT_COLOR_KEYWORD
);
