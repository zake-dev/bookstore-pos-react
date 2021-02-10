import React from "react";
import clsx from "clsx";

import { Button } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import Toast, { severityType } from "@components/Toast";
import { updateBookEntity } from "@db/bookDataAccess";
import { createTransactionEntities } from "@db/transactionDataAccess";

import { useStyles } from "./styles";

const ReturnButton = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { returnList, returnVendorSelected } = useGlobalState();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success" as severityType);
  const [message, setMessage] = React.useState("");

  const handleClick = async () => {
    if (!returnList.length) return;
    if (!returnVendorSelected.id) {
      setToastOpen(false);
      setSeverity("error");
      setMessage("반품처를 먼저 선택해주세요.");
      setToastOpen(true);
      return;
    }

    // Create new transaction
    await createTransactionEntities({
      type: "return",
      books: returnList,
      vendor: returnVendorSelected,
    });

    // Update book info
    for (let book of returnList) {
      book.quantity -= book.currentQuantity;
      await updateBookEntity(book);
    }

    const totalQty = returnList
      .map((book) => book.currentQuantity)
      .reduce((sum, value) => sum + value, 0);
    setToastOpen(false);
    setSeverity("success");
    setMessage(`총 ${totalQty}권의 도서를 반품했습니다.`);
    dispatch({ type: "REFRESH_RETURN_WITH", list: [] });
    setToastOpen(true);
  };

  return (
    <>
      <Button
        className={clsx(classes.button, classes.returnButton)}
        variant="contained"
        onClick={handleClick}
      >
        <div className={classes.column}>
          <AutorenewIcon className={classes.returnButtonIcon} />
          반품하기
        </div>
      </Button>
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default ReturnButton;
