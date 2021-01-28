import React from "react";
import { Divider, TextField, Typography } from "@material-ui/core";

import { useGlobalState } from "@components/GlobalStates";

import { useStyles } from "./styles";

const InfoBoard = () => {
  const classes = useStyles();
  const state = useGlobalState();
  const [discount, setDiscount] = React.useState(0);

  const getTotalQty = () => {
    let sum = 0;
    state.sellList.forEach((book) => {
      sum += book.currentQuantity;
    });
    return sum;
  };
  const getTotalPrice = () => {
    let sum = 0;
    state.sellList.forEach((book) => {
      sum += book.currentQuantity * book.price;
    });
    return sum * (1 - discount / 100);
  };

  return (
    <div className={classes.board}>
      <div className={classes.row}>
        <Typography>Discount</Typography>
        <div>
          <TextField
            className={classes.discountField}
            type="number"
            inputProps={{
              min: 0,
              max: 100,
              step: 5,
              style: { textAlign: "right" },
            }}
            InputProps={{
              disableUnderline: true,
            }}
            value={discount}
            onChange={(e) => setDiscount((e.target as any).value)}
          />
          %
        </div>
      </div>
      <div className={classes.row}>
        <Typography>Qty.</Typography>
        <Typography>{getTotalQty()}</Typography>
      </div>
      <Divider />
      <div className={classes.row}>
        <Typography variant="h5">Total</Typography>
        <Typography variant="h5">
          {"\u20a9 "}
          {new Intl.NumberFormat("ko-KR").format(getTotalPrice())}
        </Typography>
      </div>
    </div>
  );
};

export default InfoBoard;
