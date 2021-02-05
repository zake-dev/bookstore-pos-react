import React from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useGlobalDispatch } from "@reducers/GlobalStates";
import {
  useInventoryDispatch,
  useInventoryState,
} from "@reducers/InventoryStates";
import { getAllBookEntities, getBookEntity } from "@db/bookDataAccess";
import Toast from "@components/Toast";

import { useStyles } from "./styles";

type Props = {
  setOpenDialog: (open: boolean) => void;
};

const ButtonBoard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const globalDispatch = useGlobalDispatch();
  const dispatch = useInventoryDispatch();
  const { selected } = useInventoryState();
  const { setOpenDialog } = props;
  const [toastOpen, setToastOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleRefresh = async () => {
    const books = await getAllBookEntities();
    dispatch({ type: "SET_LIST", list: books });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setAlertMessage(`도서 ${books.length}권을 불러왔습니다`);
    setToastOpen(true);
  };

  const handleAdd = async () => {
    selected.forEach(async (isbn) => {
      const book = await getBookEntity(isbn);
      globalDispatch({ type: "ADD_BOOK_TO_SELL", book: book });
    });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setOpenDialog(false);
  };

  return (
    <>
      <div className={classes.row}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleRefresh}
        >
          <RefreshIcon className={classes.buttonIcon} />
          전체목록 불러오기
        </Button>
        <Button
          className={clsx(classes.button, classes.sellButton)}
          variant="contained"
          onClick={handleAdd}
        >
          <ShoppingCartIcon className={classes.buttonIcon} />
          담기
        </Button>
      </div>
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity="success"
        message={alertMessage}
      />
    </>
  );
};

export default ButtonBoard;
