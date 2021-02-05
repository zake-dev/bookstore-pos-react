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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useGlobalState, useGlobalDispatch } from "@components/GlobalStates";
import BookDetailsDialog from "@components/BookDetailsDialog";
import ConfirmAlert from "@components/ConfirmAlert";
import Book from "@interfaces/Book";
import { deleteBookEntity } from "@db/bookDataAccess";

import CustomeTableHead from "./CustomTableHead";
import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const state = useGlobalState();
  const [selectedBook, setSelectedBook] = React.useState({
    isbn: "",
    title: "무제",
  } as Book);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [rowsCount, setRowsCount] = React.useState(10);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const page = state.inventoryProps.page;

  const handleChangePage = (event: any, newPage: number) => {
    dispatch({ type: "SET_INVENTORY_PAGE", page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsCount(event.target.value);
  };

  const handleEditSwitch = () => {
    dispatch({ type: "TOGGLE_INVENTORY_EDIT_MODE" });
  };

  const handleDeleteRow = async () => {
    await deleteBookEntity(selectedBook.isbn);
    const filtered = state.inventoryList.filter(
      (book) => book.isbn != selectedBook.isbn,
    );
    dispatch({ type: "SET_INVENTORY", list: filtered });
    setAlertOpen(false);
  };

  const handleEditRow = async () => {};

  return (
    <>
      <Paper className={classes.tableContainer}>
        <TableContainer>
          <MuiTable aria-label="판매" size="small">
            <CustomeTableHead />
            <TableBody>
              {state.inventoryList
                .slice(page * rowsCount, page * rowsCount + rowsCount)
                .map((book, index) => (
                  <TableRow
                    className={classes.bodyRow}
                    key={index}
                    onDoubleClick={() => {
                      setSelectedBook(book);
                      setDetailsOpen(true);
                    }}
                  >
                    <TableCell className={classes.indexCell} align="center">
                      {page * rowsCount + index + 1}
                    </TableCell>
                    <TableCell
                      className={classes.bodyCell}
                      align="left"
                      style={{ maxWidth: "12rem", textOverflow: "ellipsis" }}
                    >
                      {book.title}
                    </TableCell>
                    <TableCell
                      className={classes.bodyCell}
                      align="left"
                      style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                    >
                      {book.author}
                    </TableCell>
                    <TableCell
                      className={classes.bodyCell}
                      align="left"
                      style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                    >
                      {book.press}
                    </TableCell>
                    <TableCell
                      className={classes.bodyCell}
                      align="center"
                      style={{ maxWidth: "1rem", textOverflow: "ellipsis" }}
                    >
                      {book.agegroup}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      {book.location}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      {"\u20a9"}
                      {new Intl.NumberFormat("ko-KR").format(book.price)}
                    </TableCell>
                    <TableCell className={classes.bodyCell} align="center">
                      {book.quantity}
                    </TableCell>
                    {state.inventoryProps.isEditMode && (
                      <TableCell className={classes.bodyCell} align="center">
                        <IconButton
                          className={classes.iconButton}
                          aria-label="수정"
                          onClick={() => handleEditRow()}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          className={classes.iconButton}
                          aria-label="삭제"
                          onClick={() => {
                            setSelectedBook(book);
                            setAlertOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        {state.inventoryList.length == 0 && (
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
              checked={state.inventoryProps.isEditMode}
              onChange={handleEditSwitch}
              color="primary"
            />
            <Typography className={classes.editSwitchLabel}>관리</Typography>
          </div>

          <TablePagination
            count={state.inventoryList.length}
            rowsPerPage={rowsCount}
            rowsPerPageOptions={[5, 10, 15]}
            labelRowsPerPage="페이지당 표시할 결과"
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>

        {selectedBook.isbn && (
          <BookDetailsDialog
            isbn={selectedBook.isbn}
            open={detailsOpen}
            setOpen={setDetailsOpen}
          />
        )}
      </Paper>
      <ConfirmAlert
        title="도서삭제"
        description={`정말로 선택한 도서 "${selectedBook.title.slice(
          0,
          10,
        )}..."을(를) 삭제하시겠습니까?\n\u203b 데이터베이스 상에서 영구소실됩니다!`}
        open={alertOpen}
        setOpen={setAlertOpen}
        confirmLabel="삭제"
        cancelLabel="취소"
        handleConfirm={handleDeleteRow}
      />
    </>
  );
};

export default Table;
