import React from "react";
import clsx from "clsx";

import { Button } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";

import { useStyles } from "./styles";

const SellButton = () => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.button, classes.sellButton)}
      variant="contained"
    >
      <div className={classes.column}>
        <CreditCardIcon className={classes.sellButtonIcon} />
        판매하기
      </div>
    </Button>
  );
};

export default SellButton;
