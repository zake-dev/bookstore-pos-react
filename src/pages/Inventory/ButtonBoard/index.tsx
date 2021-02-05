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
import ConfirmDialog from "@components/ConfirmDialog";
import Toast from "@components/Toast";

import EditLocationsDialog from "./EditLocationsDialog";
import { useStyles } from "./styles";

type severityType = "success" | "info" | "warning" | "error" | undefined;

const ButtonBoard = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { list, selected, isEditMode } = useInventoryState();
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success" as severityType);

  const handleClickEditAll = () => {
    if (selected.length === 0) {
      setSeverity("error");
      setAlertMessage("도서를 먼저 선택해주세요");
      setToastOpen(true);
      return;
    }

    setEditOpen(true);
  };

  const handleClickDeleteAll = () => {
    if (selected.length === 0) {
      setSeverity("error");
      setAlertMessage("도서를 먼저 선택해주세요");
      setToastOpen(true);
      return;
    }

    setDeleteOpen(true);
  };

  const handleRefresh = async () => {
    const books = await getAllBookEntities();
    dispatch({ type: "SET_LIST", list: books });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setAlertMessage(`도서 ${books.length}권을 불러왔습니다`);
    setSeverity("success");
    setToastOpen(true);
  };

  const handleDeleteRows = async () => {
    for (let isbn of selected) await deleteBookEntity(isbn);

    const filtered = list.filter((book) => !selected.includes(book.isbn));
    setAlertMessage(`도서 ${selected.length}권을 삭제했습니다`);
    dispatch({ type: "SET_LIST", list: filtered });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setDeleteOpen(false);
    setSeverity("success");
    setToastOpen(true);
  };

  return (
    <>
      <div className={classes.row}>
        {isEditMode && (
          <>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleClickEditAll}
            >
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
      <ConfirmDialog
        title="도서일괄삭제"
        description={`정말로 선택한 도서 ${selected.length}권을 삭제하시겠습니까?\n\u203b 데이터베이스 상에서 영구소실됩니다!`}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        confirmLabel="삭제하기"
        cancelLabel="취소"
        handleConfirm={handleDeleteRows}
      />
      <EditLocationsDialog open={editOpen} setOpen={setEditOpen} />
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity={severity}
        message={alertMessage}
      />
    </>
  );
};

export default ButtonBoard;
