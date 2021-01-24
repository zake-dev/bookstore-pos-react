import React from "react";
import { Box, Button, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

export const SellPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <Typography>판매기능 창 확인</Typography>
    </Box>
  );
};
