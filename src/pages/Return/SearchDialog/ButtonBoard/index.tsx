import React from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useGlobalDispatch, useGlobalState } from "@reducers/GlobalStates";
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

type severityType = "success" | "info" | "error" | "warning" | undefined;

const ButtonBoard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const globalDispatch = useGlobalDispatch();
  const dispatch = useInventoryDispatch();
  const { returnList: list } = useGlobalState();
  const { selected } = useInventoryState();
  const { setOpenDialog } = props;
  const [toastOpen, setToastOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success" as severityType);

  const handleRefresh = async () => {
    const books = await getAllBookEntities();
    dispatch({ type: "SET_LIST", list: books });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setSeverity("success");
    setAlertMessage(`도서 ${books.length}권을 불러왔습니다.`);
    setToastOpen(true);
  };

  const handleAdd = async () => {
    // Error handling - 100권 초과 추가
    if (selected.length > 100) {
      setSeverity("error");
      setAlertMessage(
        `선택된 도서가 너무 많습니다. 100권 이하로 선택해주세요.`,
      );
      setToastOpen(true);
      return;
    }

    for (let isbn of selected) {
      const book = await getBookEntity(isbn);

      // 이미 리스트에 존재하는지 탐색
      let existingIndex = -1;
      list.forEach((book, index) => {
        if (book.isbn === isbn) {
          existingIndex = index;
          return;
        }
      });
      // 리스트에 중복도서가 존재하는 경우
      if (existingIndex !== -1) {
        let qty = Math.min(
          list[existingIndex].currentQuantity + 1,
          book.quantity,
        );
        globalDispatch({
          type: "UPDATE_QTY_FROM_RETURN",
          index: existingIndex,
          qty: qty,
        });
        continue;
      }

      globalDispatch({ type: "ADD_BOOK_TO_RETURN", book: book });
    }

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
        severity={severity}
        message={alertMessage}
      />
    </>
  );
};

export default ButtonBoard;
