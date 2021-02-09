import React from "react";
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Book from "@interfaces/Book";
import { getBookEntity } from "@db/bookDataAccess";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import BookDetailsDialog from "@components/BookDetailsDialog";
import AddEditBookDialog from "@components/AddEditBookDialog";

import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const { registerList } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [isbn, setIsbn] = React.useState("");
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      let list: Book[] = [];
      for (let book of registerList) {
        let previousQty = book.currentQuantity;
        let updatedBook = await getBookEntity(book.isbn);
        updatedBook.currentQuantity = previousQty;
        list.push(updatedBook);
      }
      dispatch({ type: "REFRESH_REGISTER_WITH", list: list });
    };
    fetchData();
  }, [editOpen]);

  const handleEditRow = (index: number) => {};

  const handleDeleteRow = (index: number) => {
    dispatch({ type: "REMOVE_BOOK_FROM_REGISTER", index: index });
  };

  const handleQtyChange = (index: number, book: Book, value: string) => {
    let qty = parseInt(value);
    if (isNaN(qty)) return;
    book.currentQuantity = qty;
    dispatch({
      type: "UPDATE_BOOK_FROM_REGISTER",
      index: index,
      book: book,
    });
  };

  const handleDoubleClickOpen = (isbn: string) => {
    setIsbn(isbn);
    setDetailsOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <MuiTable aria-label="재고" size="small">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="3%"
              >
                #
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="54%"
              >
                제목
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                저자
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                출판사
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                정가 (원)
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                수량 (권)
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="3%"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registerList.map((book, index) => (
              <TableRow
                className={classes.bodyRow}
                key={index}
                onDoubleClick={() => {
                  handleDoubleClickOpen(book.isbn);
                }}
              >
                <TableCell className={classes.indexCell} align="center">
                  {index + 1}
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
                <TableCell className={classes.bodyCell} align="center">
                  {"\u20a9"}
                  {new Intl.NumberFormat("ko-KR").format(book.price)}
                </TableCell>
                <TableCell
                  className={classes.bodyCell}
                  align="center"
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <TextField
                    type="number"
                    inputProps={{
                      min: 1,
                      max: 999,
                      className: classes.quantityCell,
                    }}
                    InputProps={{ disableUnderline: true }}
                    value={book.currentQuantity}
                    onChange={(event) => {
                      handleQtyChange(index, book, event.target.value);
                    }}
                  />
                </TableCell>
                <TableCell
                  className={classes.bodyCell}
                  align="center"
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <IconButton
                    className={classes.iconButton}
                    aria-label="수정"
                    onClick={() => {
                      setIsbn(book.isbn);
                      setEditOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className={classes.iconButton}
                    aria-label="삭제"
                    onClick={() => handleDeleteRow(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
        {!registerList.length && (
          <div className={classes.emptyTableContent}>
            <span className={classes.emptyTableContentText}>
              목록이 비었습니다
            </span>
          </div>
        )}
      </TableContainer>
      <AddEditBookDialog
        open={editOpen}
        setOpen={setEditOpen}
        editMode={true}
        inventoryMode={false}
        isbn={isbn}
      />
      {isbn && (
        <BookDetailsDialog
          isbn={isbn}
          open={detailsOpen}
          setOpen={setDetailsOpen}
        />
      )}
    </>
  );
};

export default Table;
