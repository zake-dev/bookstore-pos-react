import React from "react";
import { Dialog, Paper } from "@material-ui/core";
import { getAllBookEntities } from "@db/bookDataAccess";
import { useInventoryDispatch } from "@reducers/InventoryStates";

import Table from "./Table";
import InputBoard from "./InputBoard";
import ButtonBoard from "./ButtonBoard";
import { useStyles } from "./styles";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SearchDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { open, setOpen } = props;

  React.useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBookEntities();
      dispatch({ type: "SET_LIST", list: books });
    };
    fetchData();
  }, []);

  return (
    <Dialog
      maxWidth="xl"
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Paper className={classes.dialog}>
        <Table />
        <div className={classes.bottomMenu}>
          <InputBoard />
          <ButtonBoard setOpenDialog={setOpen} />
        </div>
      </Paper>
    </Dialog>
  );
};

export default SearchDialog;
