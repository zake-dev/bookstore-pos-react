import React from "react";
import { TableHead, TableRow, TableCell, Checkbox } from "@material-ui/core";
import {
  useInventoryDispatch,
  useInventoryState,
} from "@reducers/InventoryStates";

import { useStyles } from "./styles";

const CustomTableHead = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { list, selected } = useInventoryState();
  const availableList = list.filter((book) => book.quantity > 0);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = availableList.map((book) => book.isbn);
      dispatch({ type: "SET_SELECTED", selected: newSelected });
      return;
    }
    dispatch({ type: "SET_SELECTED", selected: [] });
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerCell} align="center" width="3%">
          <Checkbox
            className={classes.checkbox}
            indeterminate={
              selected.length > 0 && selected.length < availableList.length
            }
            checked={
              selected.length > 0 && selected.length == availableList.length
            }
            onChange={handleSelectAllClick}
          ></Checkbox>
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="37%">
          제목
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          저자
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          출판사
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          연령대
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          서가 위치
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="10%">
          정가 (원)
        </TableCell>
        <TableCell className={classes.headerCell} align="center" width="5%">
          수량 (권)
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
