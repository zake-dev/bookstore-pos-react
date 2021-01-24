import React from "react";
import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

const Register = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page}>
      <Typography>입고하기 창 확인</Typography>
    </Box>
  );
};

export default Register;
