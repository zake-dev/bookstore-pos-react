import React from "react";
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
} from "@material-ui/core";
import {
  useInventoryState,
  useInventoryDispatch,
} from "@reducers/InventoryStates";
import BookDetailsDialog from "@components/BookDetailsDialog";
import Book from "@interfaces/Book";

import CustomeTableHead from "./CustomTableHead";
import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const dispatch = useInventoryDispatch();
  const { list, selected, page } = useInventoryState();
  const [selectedBook, setSelectedBook] = React.useState({
    isbn: "",
    title: "",
  } as Book);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

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
    setSelectedBook(book);
    setDetailsOpen(true);
  };

  const handleWheel = (event: any) => {
    event.preventDefault();

    const newPage = event.deltaY > 0 ? page + 1 : page - 1;
    if (newPage < 0 || newPage >= list.length / rowsPerPage) return;
    dispatch({ type: "SET_PAGE", page: newPage });
  };

  const isSelected = (isbn: string) => selected.indexOf(isbn) !== -1;

  return (
    <>
      <Paper className={classes.tableContainer} onWheel={handleWheel}>
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
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      onDoubleClick={() => {
                        handleDoubleClick(book);
                      }}
                    >
                      <TableCell className={classes.indexCell} align="center">
                        <Checkbox
                          className={classes.checkbox}
                          checked={isItemSelected}
                          onClick={() => handleClick(book.isbn)}
                          disabled={book.quantity == 0}
                        ></Checkbox>
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
          <TablePagination
            count={list.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[4, 8, 12]}
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
    </>
  );
};

export default Table;
