import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

const Inventory = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <Typography>재고관리 창 확인</Typography>
    </Box>
  );
};

export default Inventory;
