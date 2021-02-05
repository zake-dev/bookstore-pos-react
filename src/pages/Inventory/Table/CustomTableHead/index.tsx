import React from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { useGlobalState } from "@components/GlobalStates";

import { useStyles } from "./styles";

const CustomTableHead = () => {
  const classes = useStyles();
  const state = useGlobalState();

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerCell} align="center" width="3%">
          #
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
        {state.inventoryProps.isEditMode && (
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
