import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

const Transactions = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <Typography>입출고기록 창 확인</Typography>
    </Box>
  );
};

export default Transactions;
