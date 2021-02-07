import React from "react";
import clsx from "clsx";

import { Button } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import Toast from "@components/Toast";
import { updateBookEntity } from "@db/bookDataAccess";
import { createTransactionEntities } from "@db/transactionDataAccess";

import { useStyles } from "./styles";

const RegisterButton = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { registerList } = useGlobalState();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClick = async () => {
    if (!registerList.length) return;

    // Create new transaction
    await createTransactionEntities({
      type: "register",
      books: registerList,
    });

    // Update book info
    for (let book of registerList) {
      book.quantity += book.currentQuantity;
      await updateBookEntity(book);
    }

    setMessage(`총 ${registerList.length}권의 도서를 입고했습니다.`);
    dispatch({ type: "REFRESH_REGISTER_WITH", list: [] });
    setToastOpen(true);
  };

  return (
    <>
      <Button
        className={clsx(classes.button, classes.registerButton)}
        variant="contained"
        onClick={handleClick}
      >
        <div className={classes.column}>
          <AddToPhotosIcon className={classes.registerButtonIcon} />
          입고하기
        </div>
      </Button>
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity="success"
        message={message}
      />
    </>
  );
};

export default RegisterButton;
