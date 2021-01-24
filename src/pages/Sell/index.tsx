import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

const Sell = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <Typography>판매하기 창 확인</Typography>
    </Box>
  );
};

export default Sell;
