import React from "react";
import clsx from "clsx";

import PageContainer from "@components/PageContainer";

import Table from "./Table";
import BarcodeInput from "./BarcodeInput";
import InfoBoard from "./InfoBoard";
import ButtonBoard from "./ButtonBoard";
import { useStyles } from "./styles";

const Sell = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Table />
      <div className={classes.bottomMenu}>
        <BarcodeInput />
        <InfoBoard />
        <ButtonBoard />
      </div>
    </PageContainer>
  );
};

export default Sell;
