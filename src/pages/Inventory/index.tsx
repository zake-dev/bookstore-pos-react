import React from "react";

import PageContainer from "@components/PageContainer";
import { useGlobalDispatch } from "@components/GlobalStates";
import { getAllBookEntities } from "@db/bookDataAccess";

import Table from "./Table";
import InputBoard from "./InputBoard";
import ButtonBoard from "./ButtonBoard";
import { useStyles } from "./styles";

const Inventory = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBookEntities();
      dispatch({ type: "SET_INVENTORY", list: books });
    };
    fetchData();
  }, []);

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

export default Inventory;
