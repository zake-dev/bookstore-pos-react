import React from "react";

import { useStyles } from "./styles";

type Props = {
  children?: React.ReactNode;
};

const PageContainer: React.FC<Props> = (props) => {
  const classes = useStyles();

  return <div className={classes.page}>{props.children}</div>;
};

export default PageContainer;
