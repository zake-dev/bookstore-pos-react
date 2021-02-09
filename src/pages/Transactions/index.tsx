import React from "react";

import PageContainer from "@components/PageContainer";

import { useStyles } from "./styles";

const Transactions = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      테이블
      <div className={classes.bottomMenu}>메뉴바</div>
    </PageContainer>
  );
};

export default Transactions;
