import React from "react";
import PageContainer from "@components/PageContainer";

import Table from "./Table";
import InputBoard from "./InputBoard";
import ButtonBoard from "./ButtonBoard";
import RegisterButton from "./RegisterButton";
import { useStyles } from "./styles";

const Register = () => {
  const classes = useStyles();

  return (
    <PageContainer>
      <Table />
      <div className={classes.bottomMenu}>
        <InputBoard />
        <div className={classes.row}>
          <ButtonBoard />
          <RegisterButton />
        </div>
      </div>
    </PageContainer>
  );
};

export default Register;
