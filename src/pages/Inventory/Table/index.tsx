import React from "react";
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Switch,
  Typography,
} from "@material-ui/core";

import { useGlobalState, useGlobalDispatch } from "@components/GlobalStates";
import BookDetailsDialog from "@components/BookDetailsDialog";

import { useStyles } from "./styles";

const Table = () => {
  const classes = useStyles();
  const dispatch = useGlobalDispatch();
  const state = useGlobalState();
  const [isbn, setIsbn] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const rowsCount = 12;

  const handleDoubleClickOpen = (isbn: string) => {
    setIsbn(isbn);
    setOpen(true);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleEditSwitch = () => {
    dispatch({ type: "TOGGLE_INVENTORY_EDIT_MODE" });
  };

  return (
    <Paper className={classes.tableContainer}>
      <TableContainer>
        <MuiTable aria-label="판매" size="small">
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
                width="26%"
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
                연령대
              </TableCell>
              <TableCell
                className={classes.headerCell}
                align="center"
                width="10%"
              >
                서가 위치
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
            {state.inventoryList
              .slice(page * rowsCount, page * rowsCount + rowsCount)
              .map((book, index) => (
                <TableRow
                  key={index}
                  onDoubleClick={() => {
                    handleDoubleClickOpen(book.isbn);
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
          rowsPerPage={10}
          rowsPerPageOptions={[]}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>

      {isbn && <BookDetailsDialog isbn={isbn} open={open} setOpen={setOpen} />}
    </Paper>
  );
};

export default Table;
