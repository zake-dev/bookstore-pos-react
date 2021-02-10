import React from "react";

import PageContainer from "@components/PageContainer";

import Table from "./Table";
import InputBoard from "./InputBoard";
import ButtonBoard from "./ButtonBoard";
import { useStyles } from "./styles";

const Transactions = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Table />
      <div className={classes.bottomMenu}>
        <InputBoard />
        <ButtonBoard />
      </div>
    </PageContainer>
  );
};

export default Transactions;
