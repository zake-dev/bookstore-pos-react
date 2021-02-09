import React from "react";
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TablePagination,
  Switch,
  Typography,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  useTransactionsDispatch,
  useTransactionsState,
} from "@reducers/TransactionsStates";
import ConfirmDialog from "@components/ConfirmDialog";
import Toast from "@components/Toast";
import {
  deleteTransactionEntity,
  getAllTransactionEntities,
} from "@db/transactionDataAccess";
import { updateBookEntity } from "@db/bookDataAccess";

import CustomeTableHead from "./CustomTableHead";
import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const dispatch = useTransactionsDispatch();
  const { list, selected, isEditMode, page } = useTransactionsState();
  const [selectedRow, setSelectedRow] = React.useState(-1);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const transactions = await getAllTransactionEntities({});
      dispatch({ type: "SET_LIST", list: transactions });
    };
    fetchData();
  }, [deleteOpen]);

  const handleChangePage = (event: any, newPage: number) => {
    dispatch({ type: "SET_PAGE", page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const handleClick = (index: number) => {
    if (!isEditMode) return;

    const selectedIndex = selected.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    dispatch({ type: "SET_SELECTED", selected: newSelected });
  };

  const handleWheel = (event: any) => {
    event.preventDefault();

    const newPage = event.deltaY > 0 ? page + 1 : page - 1;
    if (newPage < 0 || newPage >= list.length / rowsPerPage) return;
    dispatch({ type: "SET_PAGE", page: newPage });
  };

  const handleEditSwitch = () => {
    dispatch({ type: "SET_SELECTED", selected: [] });
    dispatch({ type: "TOGGLE_EDIT_MODE" });
  };

  const handleDeleteRow = async () => {
    const transaction = list[selectedRow];
    let book = transaction.book;
    switch (transaction.type) {
      case "sell":
      case "return":
        book.quantity += transaction.quantity;
        break;
      case "register":
        book.quantity -= transaction.quantity;
        break;
    }
    await updateBookEntity(book);
    await deleteTransactionEntity(transaction);
    const filtered = list.filter((transaction, index) => index !== selectedRow);
    dispatch({ type: "SET_LIST", list: filtered });
    setDeleteOpen(false);
    setAlertMessage("입출력기록 1건이 삭제되었습니다.");
    setToastOpen(true);
  };

  return (
    <>
      <Paper className={classes.tableContainer} onWheel={handleWheel}>
        <TableContainer>
          <MuiTable aria-label="입출고기록" size="small">
            <CustomeTableHead />
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction, index) => {
                  const isItemSelected = selected.includes(index);

                  return (
                    <TableRow
                      key={page * rowsPerPage + index}
                      className={classes.bodyRow}
                      hover={isEditMode}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      onClick={() => handleClick(index)}
                    >
                      <TableCell className={classes.indexCell} align="center">
                        {!isEditMode ? (
                          page * rowsPerPage + index + 1
                        ) : (
                          <Checkbox
                            className={classes.checkbox}
                            checked={isItemSelected}
                          ></Checkbox>
                        )}
                      </TableCell>
                      <TableCell
                        className={classes.bodyCell}
                        align="center"
                        style={{ maxWidth: "12rem", textOverflow: "ellipsis" }}
                      >
                        {new Date(transaction.timestamp).toLocaleString(
                          "ko-KR",
                        )}
                      </TableCell>
                      <TableCell className={classes.bodyCell} align="left">
                        {transaction.type === "sell"
                          ? "판매"
                          : transaction.type === "register"
                          ? "입고"
                          : "반품"}
                      </TableCell>
                      <TableCell
                        className={classes.bodyCell}
                        align="left"
                        style={{ maxWidth: "12rem", textOverflow: "ellipsis" }}
                      >
                        {transaction.book.title}
                      </TableCell>
                      <TableCell
                        className={classes.bodyCell}
                        align="left"
                        style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                      >
                        {transaction.book.author}
                      </TableCell>
                      <TableCell
                        className={classes.bodyCell}
                        align="left"
                        style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                      >
                        {transaction.book.press}
                      </TableCell>
                      <TableCell
                        className={classes.bodyCell}
                        align="center"
                        style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                      >
                        {transaction.vendor && transaction.vendor}
                      </TableCell>
                      <TableCell className={classes.bodyCell} align="center">
                        {"\u20a9"}
                        {new Intl.NumberFormat("ko-KR").format(
                          transaction.book.price,
                        )}
                      </TableCell>
                      <TableCell className={classes.bodyCell} align="center">
                        {transaction.quantity}
                      </TableCell>
                      <TableCell className={classes.bodyCell} align="center">
                        {transaction.book.quantity}
                      </TableCell>
                      {isEditMode && (
                        <TableCell className={classes.bodyCell} align="center">
                          <IconButton
                            className={classes.iconButton}
                            aria-label="삭제"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedRow(index);
                              setDeleteOpen(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </MuiTable>
        </TableContainer>
        {list.length == 0 && (
          <div className={classes.emptyTableContent}>
            <span className={classes.emptyTableContentText}>
              일치하는 검색결과가 없습니다
            </span>
          </div>
        )}
        <div className={classes.tableFooter}>
          <div className={classes.editSwitch}>
            <Typography className={classes.editSwitchLabel}>검색</Typography>
            <Switch
              checked={isEditMode}
              onChange={handleEditSwitch}
              color="primary"
            />
            <Typography className={classes.editSwitchLabel}>관리</Typography>
          </div>

          <TablePagination
            count={list.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
            labelRowsPerPage="페이지당 표시할 결과"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
      <ConfirmDialog
        title="입출고기록 삭제"
        description={`해당 기록을 삭제하시겠습니까?\n\u203b 재고 수량이 변동됩니다.`}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        confirmLabel="삭제하기"
        cancelLabel="취소"
        handleConfirm={handleDeleteRow}
      />
      <Toast
        open={toastOpen}
        setOpen={setToastOpen}
        severity="success"
        message={alertMessage}
      />
    </>
  );
};

export default Table;
