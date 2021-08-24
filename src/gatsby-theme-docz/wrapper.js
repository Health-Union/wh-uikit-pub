import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import { createTypographyTheme } from "../Typography";

const WHUIKitTheme = createMuiTheme({
  typography: createTypographyTheme({
    fontFamily: ["proxima-nova", "Roboto", "sans-serif"].join(", ")
  })
});

window.WHUIKitTheme = WHUIKitTheme;

export default function GatsbyThemeDoczWrapper({ children }) {
  return <MuiThemeProvider theme={WHUIKitTheme}>{children}</MuiThemeProvider>;
}
