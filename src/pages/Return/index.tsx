import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

const Return = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <Typography>반품하기 창 확인</Typography>
    </Box>
  );
};

export default Return;
