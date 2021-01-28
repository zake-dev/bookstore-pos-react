import React from "react";

import PageContainer from "@components/PageContainer";

import Table from "./Table";
import InputBoard from "./InputBoard";
import InfoBoard from "./InfoBoard";
import SellButton from "./SellButton";
import { useStyles } from "./styles";

const Sell = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Table />
      <div className={classes.bottomMenu}>
        <InputBoard />
        <div className={classes.row}>
          <InfoBoard />
          <SellButton />
        </div>
      </div>
    </PageContainer>
  );
};

export default Sell;
