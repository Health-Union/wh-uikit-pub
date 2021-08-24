import React from "react";
import { startsWith } from "lodash";
import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core";

import { Typography } from "./Typography";
import {
  COLOR_KEYWORDS as COLOR_KEYWORDS_imported,
  MUI_VARIANTS as MUI_VARIANTS_imported
} from "./Typography.constants";

function excludeFileMeta(list) {
  return list.filter(elem => elem !== "__filemeta");
}

const COLOR_KEYWORDS = excludeFileMeta(COLOR_KEYWORDS_imported);
const MUI_VARIANTS = excludeFileMeta(MUI_VARIANTS_imported);

function getCardContentBackgroundColor(colorKeyword) {
  if (startsWith(colorKeyword, "white")) {
    return "teal";
  }
  return "transparent";
}

export function TypographyShowcase() {
  return (
    <Box>
      <Box p={1}>
        <Card>
          <CardHeader title="default color" />
          <CardContent>
            {MUI_VARIANTS.map(muiVariant => (
              <Box key={muiVariant}>
                <Divider style={{ margin: 5 }} />
                <Typography variant="caption">{muiVariant}</Typography>
                <Typography variant={muiVariant}>
                  The quick brown fox...
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
      {COLOR_KEYWORDS.map(colorKeyword => (
        <Box p={1} key={colorKeyword}>
          <Card>
            <CardHeader title={colorKeyword} />
            <CardContent
              style={{
                backgroundColor: getCardContentBackgroundColor(colorKeyword)
              }}
            >
              {MUI_VARIANTS.map(muiVariant => (
                <Box key={`${muiVariant}/${colorKeyword}`}>
                  <Divider style={{ margin: 5 }} />
                  <Typography variant="caption">
                    {muiVariant}/{colorKeyword}
                  </Typography>
                  <Typography variant={`${muiVariant}/${colorKeyword}`}>
                    The quick brown fox...
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
