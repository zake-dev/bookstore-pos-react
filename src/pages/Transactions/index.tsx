import React from "react";

import PageContainer from "@components/PageContainer";

import Table from "./Table";
import { useStyles } from "./styles";

const Transactions = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Table />
      <div className={classes.bottomMenu}>메뉴바</div>
    </PageContainer>
  );
};

export default Transactions;
