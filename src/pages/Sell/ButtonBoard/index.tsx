import React from "react";
import clsx from "clsx";

import { Button } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

import { useStyles } from "./styles";

const ButtonBoard = () => {
  const classes = useStyles();

  return (
    <div className={classes.board}>
      <div className={classes.column}>
        <Button className={classes.button} variant="contained">
          <SearchIcon className={classes.buttonIcon} />
          도서검색
        </Button>
        <Button className={classes.button} variant="contained">
          <DeleteIcon className={classes.buttonIcon} />
          전체삭제
        </Button>
      </div>
      <Button
        className={clsx(classes.button, classes.sellButton)}
        variant="contained"
      >
        <div className={classes.column}>
          <CreditCardIcon className={classes.sellButtonIcon} />
          판매하기
        </div>
      </Button>
    </div>
  );
};

export default ButtonBoard;
