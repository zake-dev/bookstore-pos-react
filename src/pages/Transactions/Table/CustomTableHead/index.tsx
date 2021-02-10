import React from "react";
import { TableHead, TableRow, TableCell, Checkbox } from "@material-ui/core";
import {
  useTransactionsState,
  useTransactionsDispatch,
} from "@reducers/TransactionsStates";

import { useStyles } from "./styles";

const CustomTableHead = () => {
  const classes = useStyles();
  const dispatch = useTransactionsDispatch();
  const { list, isEditMode, selected } = useTransactionsState();

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = list.map((item, index) => index);
      dispatch({ type: "SET_SELECTED", selected: newSelected });
      return;
    }
    dispatch({ type: "SET_SELECTED", selected: [] });
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerCell} align="center" width="3%">
          {!isEditMode ? (
            "#"
          ) : (
            <Checkbox
              className={classes.checkbox}
              indeterminate={
                selected.length > 0 && selected.length < list.length
              }
              checked={selected.length > 0 && selected.length == list.length}
              onChange={handleSelectAllClick}
            ></Checkbox>
          )}
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="22%">
          거래날짜
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="5%">
          분류
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="25%">
          도서명
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          저자
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          출판사
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="8%">
          매입처
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          정가 (원)
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="5%">
          수량 (권)
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="5%">
          재고 (권)
        </TableCell>
        {isEditMode && (
          <TableCell
            className={classes.headerCell}
            align="center"
            width="5%"
          ></TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
