import React, { useEffect } from "react";
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

import Book from "@interfaces/Book";
import { getBookEntity } from "@db/bookDataAccess";
import { useGlobalState, useGlobalDispatch } from "@reducers/GlobalStates";
import BookDetailsDialog from "@components/BookDetailsDialog";

import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [isbn, setIsbn] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleDeleteRow = (index: number) => {
    dispatch({ type: "REMOVE_BOOK_FROM_SELL", index: index });
  };

  const handleQtyChange = (index: number, book: Book, value: string) => {
    let qty = parseInt(value);
    if (isNaN(qty)) return;
    if (qty > book.quantity) qty = book.quantity;
    dispatch({
      type: "UPDATE_QTY_FROM_SELL",
      index: index,
      qty: qty,
    });
  };

  const handleDoubleClickOpen = (isbn: string) => {
    setIsbn(isbn);
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      let list: Book[] = [];
      for (let book of state.sellList) {
        let previousQty = book.currentQuantity;
        let updatedBook = await getBookEntity(book.isbn);
        updatedBook.currentQuantity =
          updatedBook.quantity >= previousQty
            ? previousQty
            : updatedBook.quantity;
        list.push(updatedBook);
      }
      dispatch({ type: "REFRESH_SELL", list: list });
    };
    fetchData();
  }, []);

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
            {state.sellList.map((book, index) => (
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
                <TableCell className={classes.bodyCell} align="center">
                  <TextField
                    type="number"
                    inputProps={{
                      min: 1,
                      max: book.quantity,
                      className: classes.quantityCell,
                    }}
                    InputProps={{ disableUnderline: true }}
                    value={book.currentQuantity}
                    onChange={(event) =>
                      handleQtyChange(index, book, event.target.value)
                    }
                  />
                </TableCell>
                <TableCell className={classes.bodyCell} align="center">
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
        {state.sellList.length == 0 && (
          <div className={classes.emptyTableContent}>
            <span className={classes.emptyTableContentText}>
              목록이 비었습니다
            </span>
          </div>
        )}
      </TableContainer>
      {isbn && <BookDetailsDialog isbn={isbn} open={open} setOpen={setOpen} />}
    </>
  );
};

export default Table;
