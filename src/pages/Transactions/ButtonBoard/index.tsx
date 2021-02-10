import { app, remote } from "electron";

import React from "react";
import clsx from "clsx";
import { Button, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
  useTransactionsDispatch,
  useTransactionsState,
} from "@reducers/TransactionsStates";
import ConfirmDialog from "@components/ConfirmDialog";
import Toast, { severityType } from "@components/Toast";
import { updateBookEntity } from "@db/bookDataAccess";
import {
  deleteTransactionEntity,
  getAllTransactionEntities,
} from "@db/transactionDataAccess";

import { useStyles } from "./styles";
import { resourceUsage } from "process";
import { saveDataToExcel } from "@services/Excel";

const ButtonBoard = () => {
  const classes = useStyles();
  const dispatch = useTransactionsDispatch();
  const { list, selected, isEditMode } = useTransactionsState();
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success" as severityType);

  const handleClickDeleteAll = () => {
    if (!selected.length) {
      setSeverity("error");
      setAlertMessage("기록을 먼저 선택해주세요.");
      setToastOpen(true);
      return;
    }

    setDeleteOpen(true);
  };

  const handleDeleteRows = async () => {
    for (let index of selected) {
      const transaction = list[index];
      let book = transaction.book;
      switch (transaction.type) {
        case "sell":
        case "return":
          book.quantity += transaction.quantity;
          break;
        case "register":
          book.quantity = Math.max(0, book.quantity - transaction.quantity);
          break;
      }
      await updateBookEntity(book);
      await deleteTransactionEntity(transaction);
    }

    const filtered = list.filter(
      (transaction, index) => !selected.includes(index),
    );
    dispatch({ type: "SET_LIST", list: filtered });
    setToastOpen(false);
    setAlertMessage(`입출력기록 ${selected.length}건이 삭제되었습니다.`);
    dispatch({ type: "SET_SELECTED", selected: [] });
    setDeleteOpen(false);
    setToastOpen(true);
  };

  const handleRefresh = async () => {
    const transactions = await getAllTransactionEntities({});
    dispatch({ type: "SET_LIST", list: transactions });
    dispatch({ type: "SET_SELECTED", selected: [] });
    setToastOpen(false);
    setAlertMessage(`모든 입출고기록을 불러왔습니다.`);
    setSeverity("success");
    setToastOpen(true);
  };

  const handleExport = async () => {
    const now = new Date();
    const fileName = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now
      .getDate()
      .toString()
      .padStart(2, "0")} 입출고기록.xlsx`;

    const dialog = remote.dialog;
    let dialogResult = await dialog.showSaveDialog({
      defaultPath: fileName,
      filters: [{ name: "엑셀 스프레드시트 (*.xlsx)", extensions: ["xlsx"] }],
    });

    if (!dialogResult.filePath) return;

    // Excel save
    const headers = [
      "거래날짜",
      "분류",
      "도서명",
      "저자",
      "출판사",
      "매입처",
      "정가 (원)",
      "수량 (권)",
    ];
    const data = list.map((t) => [
      new Date(t.id).toLocaleString("ko-KR"),
      t.type === "sell" ? "판매" : t.type === "register" ? "입고" : "반품",
      t.book.title,
      t.book.author,
      t.book.press,
      t.vendor,
      t.book.price.toString(),
      t.quantity.toString(),
    ]);
    saveDataToExcel(dialogResult.filePath, headers, data, "입출고기록");

    setToastOpen(false);
    setAlertMessage("엑셀파일 추출이 완료되었습니다.");
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
              onClick={handleClickDeleteAll}
            >
              <DeleteIcon className={classes.buttonIcon} />
              일괄삭제
            </Button>
          </>
        )}
        <Tooltip title="엑셀로 출력하기">
          <Button
            className={clsx(classes.button, classes.iconButton)}
            variant="contained"
            onClick={handleExport}
          >
            <GetAppIcon className={classes.downloadIcon} />
          </Button>
        </Tooltip>
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
        title="입출고기록 일괄삭제"
        description={`정말로 선택한 기록 ${selected.length}건을 삭제하시겠습니까?\n\u203b 데이터베이스 상에서 영구소실됩니다!`}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        confirmLabel="삭제하기"
        cancelLabel="취소"
        handleConfirm={handleDeleteRows}
      />
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
