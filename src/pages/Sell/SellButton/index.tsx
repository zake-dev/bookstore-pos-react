import React from "react";
import clsx from "clsx";

import { Button } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import Toast from "@components/Toast";
import { updateBookEntity } from "@db/bookDataAccess";
import { createTransactionEntities } from "@db/transactionDataAccess";

import { useStyles } from "./styles";

const SellButton = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const { sellList, discountRate } = useGlobalState();
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClick = async () => {
    if (!sellList) return;

    // Create new transaction
    await createTransactionEntities({
      type: "sell",
      books: sellList,
      discountRate: discountRate,
    });

    // Update book info
    for (let book of sellList) {
      book.quantity -= book.currentQuantity;
      await updateBookEntity(book);
    }

    setMessage(`총 ${sellList.length}권의 도서를 판매했습니다.`);
    dispatch({ type: "REFRESH_SELL_WITH", list: [] });
    setToastOpen(true);
  };

  return (
    <>
      <Button
        className={clsx(classes.button, classes.sellButton)}
        variant="contained"
        onClick={handleClick}
      >
        <div className={classes.column}>
          <CreditCardIcon className={classes.sellButtonIcon} />
          판매하기
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

export default SellButton;
