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
import EditIcon from "@material-ui/icons/Edit";
import {
  useInventoryState,
  useInventoryDispatch,
} from "@reducers/InventoryStates";
import BookDetailsDialog from "@components/BookDetailsDialog";
import ConfirmAlert from "@components/ConfirmAlert";
import Book from "@interfaces/Book";
import { deleteBookEntity } from "@db/bookDataAccess";

import CustomeTableHead from "./CustomTableHead";
import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { list, selected, isEditMode, page } = useInventoryState();
  const [selectedBook, setSelectedBook] = React.useState({
    isbn: "",
    title: "",
  } as Book);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: number) => {
    dispatch({ type: "SET_PAGE", page: newPage });
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
  };

  const handleClick = (isbn: string) => {
    const selectedIndex = selected.indexOf(isbn);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, isbn);
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

  const handleDoubleClick = (book: Book) => {
    if (isEditMode) return;

    setSelectedBook(book);
    setDetailsOpen(true);
  };

  const handleEditSwitch = () => {
    dispatch({ type: "SET_SELECTED", selected: [] });
    dispatch({ type: "TOGGLE_EDIT_MODE" });
  };

  const handleDeleteRow = async () => {
    await deleteBookEntity(selectedBook.isbn);
    const filtered = list.filter((book) => book.isbn != selectedBook.isbn);
    dispatch({ type: "SET_LIST", list: filtered });
    setAlertOpen(false);
  };

  const handleEditRow = async () => {};

  const isSelected = (isbn: string) => selected.indexOf(isbn) !== -1;

  return (
    <>
      <Paper className={classes.tableContainer}>
        <TableContainer>
          <MuiTable aria-label="재고" size="small">
            <CustomeTableHead />
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book, index) => {
                  const isItemSelected = isSelected(book.isbn);

                  return (
                    <TableRow
                      key={page * rowsPerPage + index}
                      className={classes.bodyRow}
                      hover={isEditMode}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      onDoubleClick={() => {
                        handleDoubleClick(book);
                      }}
                    >
                      <TableCell className={classes.indexCell} align="center">
                        {!isEditMode ? (
                          page * rowsPerPage + index + 1
                        ) : (
                          <Checkbox
                            className={classes.checkbox}
                            checked={isItemSelected}
                            onClick={() => handleClick(book.isbn)}
                          ></Checkbox>
                        )}
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
                      {isEditMode && (
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
