import React from "react";
import clsx from "clsx";
import { Button, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  useInventoryDispatch,
  useInventoryState,
} from "@reducers/InventoryStates";
import { getAllBookEntities } from "@db/bookDataAccess";

import { useStyles } from "./styles";

const ButtonBoard = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { isEditMode } = useInventoryState();

  const handleRefresh = async () => {
    const books = await getAllBookEntities();
    dispatch({ type: "SET_LIST", list: books });
  };

  return (
    <div className={classes.row}>
      {isEditMode && (
        <>
          <Button className={classes.button} variant="contained">
            <EditIcon className={classes.buttonIcon} />
            일괄변경
          </Button>
          <Button className={classes.button} variant="contained">
            <DeleteIcon className={classes.buttonIcon} />
            일괄삭제
          </Button>
        </>
      )}

      <Button
        className={clsx(classes.button, classes.refreshButton)}
        variant="contained"
        onClick={handleRefresh}
      >
        <RefreshIcon className={classes.buttonIcon} />
        전체목록 불러오기
      </Button>
    </div>
  );
};

export default ButtonBoard;
