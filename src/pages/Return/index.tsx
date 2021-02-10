import React from "react";
import PageContainer from "@components/PageContainer";

import Table from "./Table";
import InputBoard from "./InputBoard";
import VendorMenu from "./VendorMenu";
import ReturnButton from "./ReturnButton";
import { useStyles } from "./styles";

const Return = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Table />
      <div className={classes.bottomMenu}>
        <InputBoard />
        <div className={classes.row}>
          <VendorMenu />
          <ReturnButton />
        </div>
      </div>
    </PageContainer>
  );
};

export default Return;
