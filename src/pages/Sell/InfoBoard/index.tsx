import React from "react";
import { Card, Divider, TextField, Typography } from "@material-ui/core";

import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";

import { useStyles } from "./styles";

const InfoBoard = () => {
  const classes = useStyles();
  const { sellList, discountRate } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const handleChangeDiscount = (e: any) => {
    dispatch({ type: "SET_DISCOUNT_RATE", rate: e.target.value });
  };

  const getTotalQty = () => {
    let sum = 0;
    sellList.forEach((book) => {
      sum += book.currentQuantity;
    });
    return sum;
  };

  const getTotalPrice = () => {
    let sum = 0;
    sellList.forEach((book) => {
      sum += book.currentQuantity * book.price;
    });
    return sum * (1 - discountRate / 100);
  };

  return (
    <Card className={classes.board}>
      <div className={classes.row}>
        <Typography>할인 (%)</Typography>
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
            value={discountRate}
            onChange={handleChangeDiscount}
          />
          %
        </div>
      </div>
      <div className={classes.row}>
        <Typography>수량</Typography>
        <Typography>{getTotalQty()}</Typography>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.row}>
        <Typography className={classes.totalText} style={{ marginRight: 8 }}>
          합계금액
        </Typography>
        <Typography className={classes.totalText}>
          {`\u20a9${new Intl.NumberFormat("ko-KR").format(getTotalPrice())}`}
        </Typography>
      </div>
    </Card>
  );
};

export default InfoBoard;
