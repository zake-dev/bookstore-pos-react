import React from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  useInventoryDispatch,
  useInventoryState,
} from "@reducers/InventoryStates";
import { deleteBookEntity, getAllBookEntities } from "@db/bookDataAccess";
import ConfirmAlert from "@components/ConfirmAlert";

import { useStyles } from "./styles";

const ButtonBoard = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { list, selected, isEditMode } = useInventoryState();
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleClickDeleteAll = () => {
    if (selected.length === 0) return;

    setAlertOpen(true);
  };

  const handleRefresh = async () => {
    const books = await getAllBookEntities();
    dispatch({ type: "SET_LIST", list: books });
  };

  const handleDeleteRows = async () => {
    for (let isbn of selected) await deleteBookEntity(isbn);

    const filtered = list.filter((book) => !selected.includes(book.isbn));
    dispatch({ type: "SET_LIST", list: filtered });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setAlertOpen(false);
  };

  return (
    <>
      <div className={classes.row}>
        {isEditMode && (
          <>
            <Button className={classes.button} variant="contained">
              <EditIcon className={classes.buttonIcon} />
              일괄변경
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleClickDeleteAll}
            >
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
      <ConfirmAlert
        title="도서일괄삭제"
        description={`정말로 선택한 도서 ${selected.length}권을 삭제하시겠습니까?\n\u203b 데이터베이스 상에서 영구소실됩니다!`}
        open={alertOpen}
        setOpen={setAlertOpen}
        confirmLabel="삭제"
        cancelLabel="취소"
        handleConfirm={handleDeleteRows}
      />
    </>
  );
};

export default ButtonBoard;
