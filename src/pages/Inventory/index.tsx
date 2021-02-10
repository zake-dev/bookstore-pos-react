import React from "react";

import PageContainer from "@components/PageContainer";
import { getAllBookEntities } from "@db/bookDataAccess";
import { useInventoryDispatch } from "@reducers/InventoryStates";

import Table from "./Table";
import InputBoard from "./InputBoard";
import ButtonBoard from "./ButtonBoard";
import { useStyles } from "./styles";

const Inventory = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBookEntities();
      dispatch({ type: "SET_LIST", list: books });
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
